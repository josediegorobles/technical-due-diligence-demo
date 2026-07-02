import { createReadStream } from "node:fs";
import { cp, mkdir, rm, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";

const repo = "technical-due-diligence-demo";
const sourceDir = path.resolve("out");
const rootDir = path.resolve(".link-check");
const servedDir = path.join(rootDir, repo);

const contentTypes = new Map([
  [".css", "text/css"],
  [".html", "text/html; charset=utf-8"],
  [".js", "application/javascript"],
  [".json", "application/json"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

function send(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "text/plain; charset=utf-8" });
  response.end(body);
}

async function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?").at(0) ?? "/");
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(rootDir, normalized);

  if (!filePath.startsWith(rootDir)) {
    return null;
  }

  const fileStat = await stat(filePath).catch(() => null);
  if (fileStat?.isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  return filePath;
}

await rm(rootDir, { force: true, recursive: true });
await mkdir(servedDir, { recursive: true });
await cp(sourceDir, servedDir, { recursive: true });

const server = createServer(async (request, response) => {
  const filePath = await resolveFile(request.url ?? "/");

  if (!filePath) {
    send(response, 404, "Not found");
    return;
  }

  const fileStat = await stat(filePath).catch(() => null);
  if (!fileStat?.isFile()) {
    send(response, 404, "Not found");
    return;
  }

  const contentType = contentTypes.get(path.extname(filePath)) ?? "application/octet-stream";
  response.writeHead(200, { "content-type": contentType });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const startUrl = `http://127.0.0.1:${port}/${repo}/`;

const linkinatorArgs = [
  "node_modules/linkinator/build/src/cli.js",
  startUrl,
  "--recurse",
  "--skip",
  "^mailto:",
  "--timeout",
  "20000",
  "--retry-errors",
  "--retry-errors-count",
  "2",
];

const child = spawn(process.execPath, linkinatorArgs, { stdio: "inherit" });
const code = await new Promise((resolve) => child.on("close", resolve));

server.close();
await rm(rootDir, { force: true, recursive: true });

process.exit(code ?? 1);
