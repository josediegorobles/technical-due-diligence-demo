import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, TimerReset } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const signals = [
  "Architecture risk",
  "Security smells",
  "Testing gaps",
  "Dependency exposure",
  "Delivery fragility",
];

export function Hero() {
  return (
    <section className="border-b border-border bg-background">
      <div className="container grid gap-10 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-border bg-white px-3 py-1 text-sm text-muted-foreground">
            <TimerReset className="h-4 w-4 text-secondary" />
            72h Technical Due Diligence Flash
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            Know the technical risk before the check, rescue, or handoff.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
            A senior full-stack review for founders, VCs, and business angels who
            need a practical view of codebase health, architecture risk, delivery
            confidence, and the next 90 days.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/book">
                Book a call <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sample">
                View sample report <FileText className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Typical starting points: $1,500-$8,000, scoped on call.
          </p>
        </div>

        <Card className="rounded-lg bg-white shadow-soft">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Review output
                </p>
                <h2 className="mt-1 text-2xl font-semibold">Decision-ready risk map</h2>
              </div>
              <ShieldCheck className="h-10 w-10 text-accent" />
            </div>
            <div className="mt-6 grid gap-3">
              {signals.map((signal, index) => (
                <div
                  key={signal}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-md border border-border p-3"
                >
                  <span className="text-sm font-semibold text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="font-medium">{signal}</span>
                  <span className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
                    scored
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-md bg-primary p-4 text-primary-foreground">
              <p className="text-sm font-semibold">What you get</p>
              <p className="mt-2 text-sm leading-6 text-primary-foreground/85">
                Executive summary, risk matrix, maintainability and security
                observations, recommendations, and a 30/60/90-day plan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
