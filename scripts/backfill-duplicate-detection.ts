#!/usr/bin/env bun

import { consola } from "consola";
import type { GitHubIssue } from "./lib/github.js";
import {
  API_BASE,
  fetchAllPages,
  fetchGitHub,
  GITHUB_REPOSITORY_NAME,
  GITHUB_REPOSITORY_OWNER,
  getIssueComments,
} from "./lib/github.js";

const DAYS_BACK = Number.parseInt(process.env.DAYS_BACK ?? "90", 10);
const DRY_RUN = process.env.DRY_RUN !== "false";

async function getOpenIssuesInRange(daysBack: number): Promise<GitHubIssue[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysBack);
  const since = startDate.toISOString();

  const url = `${API_BASE}/issues?state=open&since=${since}&per_page=100&sort=created&direction=asc`;
  const issues = await fetchAllPages<GitHubIssue>(url);
  return issues.filter((issue) => !issue.pull_request);
}

async function hasDuplicateDetectionComment(
  issueNumber: number,
): Promise<boolean> {
  const comments = await getIssueComments(issueNumber);

  return comments.some((comment) =>
    comment.body.includes(
      "This issue will be automatically closed as a duplicate in 3 days.",
    ),
  );
}

async function triggerWorkflow(issueNumber: number): Promise<void> {
  const url = `${API_BASE}/actions/workflows/dedupe-issues.yml/dispatches`;

  await fetchGitHub(url, {
    method: "POST",
    body: JSON.stringify({
      ref: "main",
      inputs: {
        issue_number: issueNumber.toString(),
      },
    }),
  });
}

async function main(): Promise<void> {
  consola.info("Starting backfill duplicate detection script...");
  consola.info(
    `Repository: ${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}`,
  );
  consola.info(`Days back: ${DAYS_BACK}`);
  consola.info(`Dry run: ${DRY_RUN}`);

  const issues = await getOpenIssuesInRange(DAYS_BACK);
  consola.info(
    `Found ${issues.length} open issues in the past ${DAYS_BACK} days`,
  );

  let processedCount = 0;
  let triggeredCount = 0;

  for (const issue of issues) {
    processedCount++;
    consola.info(`Processing issue #${issue.number}: ${issue.title}`);

    const hasComment = await hasDuplicateDetectionComment(issue.number);

    if (hasComment) {
      consola.info(`  Already has duplicate detection comment, skipping`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    if (DRY_RUN) {
      consola.info(
        `  [DRY RUN] Would trigger workflow for issue #${issue.number}`,
      );
      triggeredCount++;
    } else {
      consola.info(`  Triggering workflow for issue #${issue.number}`);
      await triggerWorkflow(issue.number);
      triggeredCount++;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  consola.info("\n=== Summary ===");
  consola.info(`Processed issues: ${processedCount}`);
  consola.info(
    `${DRY_RUN ? "Would trigger" : "Triggered"} workflows: ${triggeredCount}`,
  );
}

try {
  await main();
} catch (error) {
  consola.error("Error running backfill script:", error);
  process.exit(1);
}
