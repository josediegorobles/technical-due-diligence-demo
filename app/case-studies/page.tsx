import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCaseStudies } from "@/lib/content";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technical due diligence case studies",
  description: "Case study shell for 72h Technical Due Diligence Flash examples.",
  openGraph: {
    images: [absoluteSiteUrl("/og/case-studies.png")],
  },
  twitter: {
    images: [absoluteSiteUrl("/og/case-studies.png")],
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <main className="bg-background">
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Case studies
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Real examples will live here when they can be shared.
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            No fabricated outcomes. Until a publishable case study is approved,
            this section stays explicit about what is coming.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Card key={study.slug} className="rounded-lg bg-white">
              <CardHeader>
                <p className="text-sm font-semibold text-secondary">{study.status}</p>
                <CardTitle>{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{study.excerpt}</p>
                <Link
                  href={study.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Book a call <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
