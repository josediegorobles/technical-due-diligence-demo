import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileJson,
  FileText,
  Gauge,
  LockKeyhole,
} from "lucide-react";

import { Hero } from "@/components/Hero";
import { PricingTable } from "@/components/PricingTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { absoluteSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fast technical due diligence for investment decisions",
  description: site.description,
  openGraph: {
    images: [absoluteSiteUrl("/og/home.png")],
  },
  twitter: {
    images: [absoluteSiteUrl("/og/home.png")],
  },
};

const outcomes = [
  {
    title: "Know what can break the deal",
    body: "Architecture, delivery, security, dependency, and maintainability risk translated into business impact.",
    icon: Gauge,
  },
  {
    title: "Avoid a theatrical audit",
    body: "A focused senior review designed for decisions that need useful evidence in days, not weeks.",
    icon: FileText,
  },
  {
    title: "Leave with a plan",
    body: "Clear recommendations and a 30/60/90-day path for stabilization, takeover, or investment follow-up.",
    icon: LockKeyhole,
  },
];

const fit = [
  "Pre-seed to Series A technical check",
  "Acquisition or asset purchase review",
  "Troubled project rescue before adding budget",
  "Agency handoff or legacy codebase takeover",
];

const evidencePacks = [
  {
    name: "Tokio",
    repo: "tokio-rs/tokio",
    score: "46/100",
    href: "https://github.com/josediegorobles/rust-technical-audit-toolkit/tree/main/docs/audit-packs/tokio",
  },
  {
    name: "Axum",
    repo: "tokio-rs/axum",
    score: "46/100",
    href: "https://github.com/josediegorobles/rust-technical-audit-toolkit/tree/main/docs/audit-packs/axum",
  },
  {
    name: "Ratatui",
    repo: "ratatui/ratatui",
    score: "47/100",
    href: "https://github.com/josediegorobles/rust-technical-audit-toolkit/tree/main/docs/audit-packs/ratatui",
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="bg-white py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Problem to service
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              The business question is simple. The codebase rarely is.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Before you write the check, take over the repository, or fund the
              rescue, you need to know whether technical risk is manageable,
              expensive, or a blocker.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {outcomes.map((outcome) => (
              <Card key={outcome.title} className="rounded-lg">
                <CardHeader>
                  <outcome.icon className="h-8 w-8 text-secondary" />
                  <CardTitle className="text-lg leading-snug">{outcome.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {outcome.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Built for founders and investors who need a clear technical view.
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              The review is intentionally practical: repository analysis,
              architecture assessment, dependency review, CI/testing maturity,
              security smell detection, and senior engineering judgment.
            </p>
          </div>
          <div className="grid gap-3">
            {fit.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-white p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Evidence packs
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                See the delivery format before booking.
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Public sample packs show the structure used in a fast technical review:
              executive report, scorecard, evidence JSON, risk register, review
              questions, and methodology.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {evidencePacks.map((pack) => (
              <Link
                key={pack.repo}
                href={pack.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-lg border border-border bg-background p-5 transition hover:border-secondary hover:bg-white"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">
                      {pack.repo}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold">{pack.name}</h3>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition group-hover:text-secondary" />
                </div>
                <div className="mt-6 grid grid-cols-[auto_1fr] gap-3 text-sm">
                  <Gauge className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Heuristic scorecard: {pack.score}</span>
                  <FileJson className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Evidence and risk register included</span>
                  <FileText className="mt-0.5 h-4 w-4 text-accent" />
                  <span>Executive report and review questions</span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-6 text-muted-foreground">
            These samples are heuristic triage outputs from public repositories, not
            complete audits or judgments on those projects.
          </p>
        </div>
      </section>

      <PricingTable />

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Need the technical read this week?</h2>
            <p className="mt-2 max-w-2xl text-primary-foreground/80">
              Book a short call to confirm scope, access, and whether a
              decision-oriented review fits your timeline.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link href="/book">
              Book a Calendly slot <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
