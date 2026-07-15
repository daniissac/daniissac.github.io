import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:article -- "Article title"');
  process.exit(1);
}

const slug = title
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error("The title must contain at least one letter or number.");
  process.exit(1);
}

const now = new Date();
const publishedDate = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");
const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const articlePath = join(repositoryRoot, "src", "data", "writing", `${slug}.md`);

if (existsSync(articlePath)) {
  console.error(`Article already exists: ${articlePath}`);
  process.exit(1);
}

const article = `---
title: ${JSON.stringify(title)}
description: "TODO: Summarize the reader problem and practical outcome."
publishedDate: ${publishedDate}
tags:
  - Networking
draft: true
featured: false
---

Open with the reader's question, why it matters, and what they will be able to understand or do afterward.

## What is happening

Explain the behavior before naming tools or products.

## What can be observed

Identify the packets, logs, telemetry, commands, or symptoms that provide evidence.

## How to reason about it

Build the mental model step by step and connect each claim to observable behavior.

## Practical checks

Provide reproducible commands, tests, or troubleshooting questions.

## Limits and edge cases

State where the model stops being sufficient and what can make the result misleading.

## Key takeaways

Close with the few ideas the reader should retain.
`;

mkdirSync(dirname(articlePath), { recursive: true });
writeFileSync(articlePath, article, "utf8");

console.log(`Created: ${articlePath}`);
console.log(`Preview: /writing/${slug}/`);
