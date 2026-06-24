import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const files = [
  ...(await markdownFiles("content")),
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

async function markdownFiles(dir) {
  const entries = await readdir(path.join(process.cwd(), dir), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await markdownFiles(relative)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(relative);
    }
  }

  return files;
}
