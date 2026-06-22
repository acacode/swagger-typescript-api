import * as dns from "node:dns/promises";
import * as net from "node:net";

const MAX_REDIRECTS = 5;

export function isPrivateIpv4(ip: string): boolean {
  const match = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) {
    return false;
  }

  const octets = match.slice(1).map(Number);
  if (octets.some((octet) => octet > 255)) {
    return false;
  }

  const [a, b] = octets;

  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

export function isPrivateIpv6(ip: string): boolean {
  const normalized = ip.toLowerCase();

  if (normalized === "::" || normalized === "::1") {
    return true;
  }

  if (normalized.startsWith("fe80:")) {
    return true;
  }

  const firstHextet = normalized.split(":")[0] ?? "";
  if (firstHextet >= "fc00" && firstHextet <= "fdff") {
    return true;
  }

  const ipv4Mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (ipv4Mapped?.[1]) {
    return isPrivateIpv4(ipv4Mapped[1]);
  }

  // URL.hostname normalizes IPv4-mapped IPv6 to hex hextets
  // (e.g. ::ffff:192.168.1.1 → ::ffff:c0a8:101).
  const ipv4MappedHex = normalized.match(
    /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/,
  );
  if (ipv4MappedHex?.[1] && ipv4MappedHex?.[2]) {
    const h1 = parseInt(ipv4MappedHex[1], 16);
    const h2 = parseInt(ipv4MappedHex[2], 16);
    const ipv4 = `${(h1 >> 8) & 0xff}.${h1 & 0xff}.${(h2 >> 8) & 0xff}.${h2 & 0xff}`;
    return isPrivateIpv4(ipv4);
  }

  return false;
}

export function isPrivateIp(ip: string): boolean {
  const family = net.isIP(ip);
  if (family === 4) {
    return isPrivateIpv4(ip);
  }
  if (family === 6) {
    return isPrivateIpv6(ip);
  }
  return false;
}

function isBlockedHostname(hostname: string): boolean {
  const normalized = hostname.toLowerCase();
  return normalized === "localhost" || normalized.endsWith(".localhost");
}

async function resolveHostnameAddresses(hostname: string): Promise<string[]> {
  try {
    const records = await dns.lookup(hostname, { all: true, verbatim: true });
    return records.map((record) => record.address);
  } catch {
    return [];
  }
}

export async function isPublicRemoteHost(urlString: string): Promise<boolean> {
  let parsed: URL;

  try {
    parsed = new URL(urlString);
  } catch {
    return false;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }

  // URL.hostname wraps IPv6 literals in brackets (e.g. "[::1]"),
  // which breaks net.isIP() and dns.lookup().
  const hostname =
    parsed.hostname.startsWith("[") && parsed.hostname.endsWith("]")
      ? parsed.hostname.slice(1, -1)
      : parsed.hostname;

  if (isBlockedHostname(hostname)) {
    return false;
  }

  if (net.isIP(hostname)) {
    return !isPrivateIp(hostname);
  }

  const addresses = await resolveHostnameAddresses(hostname);
  if (addresses.length === 0) {
    return false;
  }

  return addresses.every((address) => !isPrivateIp(address));
}

export function isSameHttpOrigin(a: string, b: string | undefined): boolean {
  if (typeof b !== "string") {
    return false;
  }

  try {
    const urlA = new URL(a);
    const urlB = new URL(b);
    return urlA.protocol === urlB.protocol && urlA.host === urlB.host;
  } catch {
    return false;
  }
}

export interface RemoteSchemaFetchPolicy {
  specSourceUrl?: string;
  allowExplicitSpecUrl?: boolean;
}

export async function isRemoteSchemaFetchAllowed(
  urlString: string,
  policy: RemoteSchemaFetchPolicy,
): Promise<boolean> {
  const { specSourceUrl, allowExplicitSpecUrl = false } = policy;

  if (
    allowExplicitSpecUrl &&
    typeof specSourceUrl === "string" &&
    stripUrlHash(urlString) === stripUrlHash(specSourceUrl)
  ) {
    return true;
  }

  if (
    typeof specSourceUrl === "string" &&
    isSameHttpOrigin(urlString, specSourceUrl)
  ) {
    return true;
  }

  return isPublicRemoteHost(urlString);
}

function stripUrlHash(urlString: string): string {
  return urlString.split("#")[0] || urlString;
}

function resolveRedirectUrl(location: string, baseUrl: string): string | null {
  try {
    return new URL(location, baseUrl).toString();
  } catch {
    return null;
  }
}

export async function fetchRemoteSchemaResponse(
  urlString: string,
  init: RequestInit,
  policy: RemoteSchemaFetchPolicy,
): Promise<Response | null> {
  let currentUrl = urlString;
  let redirectCount = 0;

  while (true) {
    const allowed = await isRemoteSchemaFetchAllowed(currentUrl, {
      specSourceUrl: policy.specSourceUrl,
      allowExplicitSpecUrl: policy.allowExplicitSpecUrl && redirectCount === 0,
    });

    if (!allowed) {
      return null;
    }

    const response = await fetch(currentUrl, {
      ...init,
      redirect: "manual",
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirectCount >= MAX_REDIRECTS) {
        return null;
      }

      const redirectUrl = resolveRedirectUrl(location, currentUrl);
      if (!redirectUrl) {
        return null;
      }

      currentUrl = redirectUrl;
      redirectCount += 1;
      continue;
    }

    return response;
  }
}
