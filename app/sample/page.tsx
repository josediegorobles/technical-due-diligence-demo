import type { Metadata } from "next";

import { MdxRenderer } from "@/components/MdxRenderer";
import { readContentFile } from "@/lib/content";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sample technical due diligence report",
  description: "A fictional sample report showing format, depth, and senior engineering judgment.",
  openGraph: {
    images: [absoluteSiteUrl("/og/sample.png")],
  },
  twitter: {
    images: [absoluteSiteUrl("/og/sample.png")],
  },
};

export default async function SamplePage() {
  const document = await readContentFile("sample-report.md");

  return (
    <main className="bg-white">
      <div className="container py-12 md:py-16">
        <div className="mb-8 rounded-lg border border-border bg-background p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Sample report
          </p>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Fictional sample material. The real review is scoped to your repository,
            access level, and decision context.
          </p>
        </div>
        <MdxRenderer source={document.content} />
      </div>
    </main>
  );
}
