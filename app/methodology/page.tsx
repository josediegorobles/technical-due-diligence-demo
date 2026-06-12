import type { Metadata } from "next";

import { MdxRenderer } from "@/components/MdxRenderer";
import { readContentFile } from "@/lib/content";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical due diligence methodology",
  description: "How the 72h Technical Due Diligence Flash review identifies practical business risk.",
  openGraph: {
    images: [absoluteSiteUrl("/og/methodology.png")],
  },
  twitter: {
    images: [absoluteSiteUrl("/og/methodology.png")],
  },
};

export default async function MethodologyPage() {
  const document = await readContentFile("methodology.md");

  return (
    <main className="bg-white">
      <div className="container py-12 md:py-16">
        <div className="mb-8 rounded-lg border border-border bg-background p-5">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Methodology
          </p>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Practical technical review focused on investment, acquisition, rescue,
            maintainability, and delivery decisions.
          </p>
        </div>
        <MdxRenderer source={document.content} />
      </div>
    </main>
  );
}
