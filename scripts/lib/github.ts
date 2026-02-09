import { consola } from "consola";

export interface GitHubIssue {
  number: number;
  title: string;
  created_at: string;
  user: { login: string } | null;
  state: string;
  pull_request?: unknown;
}

export interface GitHubComment {
  id: number;
  user: { login: string } | null;
  body: string;
  created_at: string;
}

export interface GitHubReaction {
  id: number;
  user: { login: string } | null;
  content: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const GITHUB_REPOSITORY_OWNER = process.env.GITHUB_REPOSITORY_OWNER;
export const GITHUB_REPOSITORY_NAME = process.env.GITHUB_REPOSITORY_NAME;

if (!GITHUB_TOKEN) {
  consola.error("Error: GITHUB_TOKEN environment variable is required");
  process.exit(1);
}

if (!GITHUB_REPOSITORY_OWNER || !GITHUB_REPOSITORY_NAME) {
  consola.error(
    "Error: GITHUB_REPOSITORY_OWNER and GITHUB_REPOSITORY_NAME environment variables are required",
  );
  process.exit(1);
}

export const API_BASE = `https://api.github.com/repos/${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}`;

const HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export async function fetchGitHub<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: { ...HEADERS, ...options.headers },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function getNextPageUrl(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const match = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
  return match?.[1] ?? null;
}

export async function fetchAllPages<T>(url: string): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response = await fetch(nextUrl, { headers: HEADERS });

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const page = (await response.json()) as T[];
    results.push(...page);
    nextUrl = getNextPageUrl(response.headers.get("link"));
  }

  return results;
}

export async function getIssueComments(
  issueNumber: number,
): Promise<GitHubComment[]> {
  const url = `${API_BASE}/issues/${issueNumber}/comments?per_page=100`;
  return fetchAllPages<GitHubComment>(url);
}
