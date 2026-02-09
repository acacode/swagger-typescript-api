#!/usr/bin/env bun

import { consola } from "consola";
import type {
  GitHubComment,
  GitHubIssue,
  GitHubReaction,
} from "./lib/github.js";
import {
  API_BASE,
  fetchAllPages,
  fetchGitHub,
  GITHUB_REPOSITORY_NAME,
  GITHUB_REPOSITORY_OWNER,
  getIssueComments,
} from "./lib/github.js";

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

async function getOpenIssuesOlderThan3Days(): Promise<GitHubIssue[]> {
  const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS);
  const url = `${API_BASE}/issues?state=open&per_page=100&sort=created&direction=asc`;

  const issues = await fetchAllPages<GitHubIssue>(url);

  return issues.filter((issue) => {
    if (issue.pull_request) return false;
    return new Date(issue.created_at) < threeDaysAgo;
  });
}

async function getCommentReactions(
  commentId: number,
): Promise<GitHubReaction[]> {
  const url = `${API_BASE}/issues/comments/${commentId}/reactions?per_page=100`;
  return fetchAllPages<GitHubReaction>(url);
}

async function closeIssue(issueNumber: number, reason: string): Promise<void> {
  await fetchGitHub(`${API_BASE}/issues/${issueNumber}/labels`, {
    method: "POST",
    body: JSON.stringify({ labels: ["duplicate"] }),
  });

  await fetchGitHub(`${API_BASE}/issues/${issueNumber}`, {
    method: "PATCH",
    body: JSON.stringify({
      state: "closed",
      state_reason: "not_planned",
    }),
  });

  await fetchGitHub(`${API_BASE}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: JSON.stringify({
      body: reason,
    }),
  });
}

async function hasActivityAfterComment(
  issue: GitHubIssue,
  botCommentDate: Date,
): Promise<boolean> {
  const comments = await getIssueComments(issue.number);

  const laterComments = comments.filter((comment) => {
    if (comment.user?.login.endsWith("[bot]")) return false;
    const commentDate = new Date(comment.created_at);
    return commentDate > botCommentDate;
  });

  return laterComments.length > 0;
}

async function hasCreatorThumbsDown(
  issue: GitHubIssue,
  botComment: GitHubComment,
): Promise<boolean> {
  if (!issue.user) {
    return false;
  }

  const reactions = await getCommentReactions(botComment.id);

  return reactions.some(
    (reaction) =>
      reaction.content === "-1" && reaction.user?.login === issue.user?.login,
  );
}

async function main(): Promise<void> {
  consola.info("Starting auto-close duplicates script...");
  consola.info(
    `Repository: ${GITHUB_REPOSITORY_OWNER}/${GITHUB_REPOSITORY_NAME}`,
  );

  const issues = await getOpenIssuesOlderThan3Days();
  consola.info(`Found ${issues.length} open issues older than 3 days`);

  let processedCount = 0;
  let closedCount = 0;

  for (const issue of issues) {
    processedCount++;
    consola.info(`Processing issue #${issue.number}: ${issue.title}`);

    const comments = await getIssueComments(issue.number);

    const botComment = comments.find(
      (comment) =>
        comment.user?.login === "github-actions[bot]" &&
        comment.body.includes("<!-- ai-duplicate-check -->"),
    );

    if (!botComment) {
      consola.info(`  No duplicate bot comment found, skipping`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    const botCommentDate = new Date(botComment.created_at);
    const now = new Date();
    const timeSinceComment = now.getTime() - botCommentDate.getTime();

    if (timeSinceComment < THREE_DAYS_MS) {
      consola.info(`  Bot comment is less than 3 days old, skipping`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    const hasActivity = await hasActivityAfterComment(issue, botCommentDate);
    if (hasActivity) {
      consola.info(`  Has activity after bot comment, skipping`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    const hasThumbsDown = await hasCreatorThumbsDown(issue, botComment);
    if (hasThumbsDown) {
      consola.info(`  Creator reacted with thumbs down, skipping`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      continue;
    }

    consola.info(`  Closing issue #${issue.number} as duplicate`);
    await closeIssue(
      issue.number,
      "This issue has been automatically closed as a duplicate. It was marked as a duplicate over 3 days ago with no further activity. If you believe this was closed in error, please comment and we'll re-evaluate.",
    );

    closedCount++;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  consola.info("\n=== Summary ===");
  consola.info(`Processed issues: ${processedCount}`);
  consola.info(`Closed issues: ${closedCount}`);
}

try {
  await main();
} catch (error) {
  consola.error("Error running auto-close script:", error);
  process.exit(1);
}
