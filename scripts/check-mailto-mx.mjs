import { promises as dns } from "node:dns";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.argv[2] ?? "out";
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(entryPath);
      }
      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    })
  );

  return files.flat();
}

function extractMailtoAddresses(html) {
  const addresses = [];
  const mailtoPattern = /\bhref=["']mailto:([^"'?#]+)(?:[?#][^"']*)?["']/gi;

  for (const match of html.matchAll(mailtoPattern)) {
    addresses.push(decodeURIComponent(match[1]).trim());
  }

  return addresses;
}

async function assertMx(domain) {
  const records = await dns.resolveMx(domain);
  if (records.length === 0) {
    throw new Error(`No MX records found for ${domain}`);
  }
}

const htmlFiles = await collectHtmlFiles(root);
const addresses = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const address of extractMailtoAddresses(html)) {
    addresses.add(address);
  }
}

if (addresses.size === 0) {
  throw new Error(`No mailto links found under ${root}`);
}

for (const address of addresses) {
  if (!emailPattern.test(address)) {
    throw new Error(`Invalid mailto address syntax: ${address}`);
  }

  const domain = address.split("@").at(1);
  await assertMx(domain);
  console.log(`OK mailto:${address} has MX for ${domain}`);
}
