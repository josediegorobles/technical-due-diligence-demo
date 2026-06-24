import { readFile } from "node:fs/promises";
import path from "node:path";

const files = [
  "content/case-study-sample.md",
  "scripts/generate-og.mjs",
];

const blocked = [
  /coming soon/i,
  /intentionally a placeholder/i,
];

let failed = false;

for (const file of files) {
  const content = await readFile(path.join(process.cwd(), file), "utf8");
  for (const pattern of blocked) {
    if (pattern.test(content)) {
      console.error(`${file} contains blocked draft copy: ${pattern}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}
