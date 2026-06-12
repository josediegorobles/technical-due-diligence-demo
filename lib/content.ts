import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");
const caseStudyRoot = path.join(contentRoot, "case-studies");

export type MarkdownDocument = {
  content: string;
  data: Record<string, unknown>;
};

export type CaseStudy = {
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  href: string;
};

export async function readContentFile(fileName: string): Promise<MarkdownDocument> {
  const raw = await fs.readFile(path.join(contentRoot, fileName), "utf8");
  const parsed = matter(raw);

  return {
    content: parsed.content,
    data: parsed.data,
  };
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const entries = await fs
    .readdir(caseStudyRoot, { withFileTypes: true })
    .catch(() => []);
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  if (markdownFiles.length === 0) {
    const placeholder = await readContentFile("case-study-placeholder.md");
    return [
      {
        slug: "coming-soon",
        title: String(placeholder.data.title ?? "Coming soon"),
        excerpt: String(
          placeholder.data.excerpt ??
            "Book a call to discuss whether a 72h technical due diligence review fits your decision."
        ),
        status: String(placeholder.data.status ?? "Coming soon"),
        href: "/book",
      },
    ];
  }

  return Promise.all(
    markdownFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(caseStudyRoot, fileName), "utf8");
      const parsed = matter(raw);

      return {
        slug,
        title: String(parsed.data.title ?? slug),
        excerpt: String(parsed.data.excerpt ?? ""),
        status: String(parsed.data.status ?? "Published"),
        href: "/book",
      };
    })
  );
}
