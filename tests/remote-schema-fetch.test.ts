import { describe, expect, test } from "vitest";
import {
  isPrivateIp,
  isPrivateIpv4,
  isPrivateIpv6,
  isPublicRemoteHost,
  isRemoteSchemaFetchAllowed,
  isSameHttpOrigin,
} from "../src/util/remote-schema-fetch.js";

describe("remote-schema-fetch private IP detection", () => {
  test.each([
    "127.0.0.1",
    "10.0.0.1",
    "172.16.0.1",
    "192.168.1.1",
    "169.254.169.254",
    "0.0.0.0",
  ])("detects private IPv4 %s", (ip) => {
    expect(isPrivateIpv4(ip)).toBe(true);
    expect(isPrivateIp(ip)).toBe(true);
  });

  test.each([
    "8.8.8.8",
    "1.1.1.1",
    "93.184.216.34",
  ])("allows public IPv4 %s", (ip) => {
    expect(isPrivateIpv4(ip)).toBe(false);
    expect(isPrivateIp(ip)).toBe(false);
  });

  test.each([
    "::1",
    "fe80::1",
    "fc00::1",
    "::ffff:127.0.0.1",
  ])("detects private IPv6 %s", (ip) => {
    expect(isPrivateIpv6(ip)).toBe(true);
    expect(isPrivateIp(ip)).toBe(true);
  });
});

describe("remote-schema-fetch origin policy", () => {
  test("treats different loopback ports as different origins", () => {
    expect(
      isSameHttpOrigin(
        "http://127.0.0.1:3000/spec.json",
        "http://127.0.0.1:4000/spec.json",
      ),
    ).toBe(false);
  });

  test("allows explicit spec source URL even when it is loopback", async () => {
    await expect(
      isRemoteSchemaFetchAllowed("http://127.0.0.1:3000/spec.json", {
        specSourceUrl: "http://127.0.0.1:3000/spec.json",
        allowExplicitSpecUrl: true,
      }),
    ).resolves.toBe(true);
  });

  test("blocks cross-origin loopback $ref targets", async () => {
    await expect(
      isRemoteSchemaFetchAllowed("http://127.0.0.1:4000/internal.json", {
        specSourceUrl: "http://127.0.0.1:3000/spec.json",
      }),
    ).resolves.toBe(false);
  });

  test("allows same-origin loopback $ref targets", async () => {
    await expect(
      isRemoteSchemaFetchAllowed("http://127.0.0.1:3000/components/data.json", {
        specSourceUrl: "http://127.0.0.1:3000/spec.json",
      }),
    ).resolves.toBe(true);
  });

  test("blocks localhost hostname for cross-origin fetches", async () => {
    await expect(
      isPublicRemoteHost("http://localhost:3000/data.json"),
    ).resolves.toBe(false);
  });
});
