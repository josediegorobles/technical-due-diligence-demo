import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { ImageResponse } from "@vercel/og";

const size = {
  width: 1200,
  height: 630,
};

const site = {
  author: "Jose Robles",
  service: "72h Technical Due Diligence Flash",
};

const pages = [
  {
    file: "home.png",
    title: "Technical risk before the decision",
    subtitle: site.service,
  },
  {
    file: "sample.png",
    title: "Sample due diligence report",
    subtitle: "Format, risk matrix, recommendations, and 30/60/90-day plan.",
  },
  {
    file: "methodology.png",
    title: "Due diligence methodology",
    subtitle:
      "Repository, architecture, security, testing, dependency, and delivery review.",
  },
  {
    file: "book.png",
    title: "Book the 72h review",
    subtitle: "Scope the repository, deadline, decision, and deliverables.",
  },
  {
    file: "case-studies.png",
    title: "Due diligence case studies",
    subtitle: "Anonymized sample evidence for a scoped 72h review.",
  },
];

function el(type, props, ...children) {
  return React.createElement(type, props, ...children);
}

function createImage({ title, subtitle }) {
  return el(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f2ea",
        color: "#172033",
        padding: "64px",
        fontFamily: "Arial, sans-serif",
      },
    },
    el(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
        },
      },
      el("span", null, site.author),
      el("span", { style: { color: "#bd5726" } }, "72h review")
    ),
    el(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 28 } },
      el("div", {
        style: {
          width: 120,
          height: 10,
          background: "#2f7d70",
          borderRadius: 999,
        },
      }),
      el(
        "h1",
        {
          style: {
            margin: 0,
            maxWidth: 930,
            fontSize: 76,
            lineHeight: 0.98,
            letterSpacing: 0,
            fontWeight: 800,
          },
        },
        title
      ),
      el(
        "p",
        { style: { margin: 0, maxWidth: 820, fontSize: 32, lineHeight: 1.3 } },
        subtitle
      )
    ),
    el(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "2px solid #d8cfc0",
          paddingTop: 28,
          fontSize: 26,
        },
      },
      el("span", null, "Founders, VCs, business angels"),
      el("span", null, "EU + USA")
    )
  );
}

const outputDir = path.join(process.cwd(), "public", "og");
await mkdir(outputDir, { recursive: true });

await Promise.all(
  pages.map(async (page) => {
    const response = new ImageResponse(createImage(page), size);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(path.join(outputDir, page.file), buffer);
  })
);

console.log(`Generated ${pages.length} OG images in public/og`);
