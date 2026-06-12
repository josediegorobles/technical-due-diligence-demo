import type { Metadata } from "next";
import Script from "next/script";
import { CalendarDays } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { absoluteSiteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a due diligence call",
  description: "Book a Calendly call with Jose Robles for a 72h Technical Due Diligence Flash review.",
  openGraph: {
    images: [absoluteSiteUrl("/og/book.png")],
  },
  twitter: {
    images: [absoluteSiteUrl("/og/book.png")],
  },
};

export default function BookPage() {
  return (
    <main className="bg-background">
      <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_390px] lg:py-16">
        <section>
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-secondary" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Book
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Schedule the scope call
              </h1>
            </div>
          </div>
          <Card className="overflow-hidden rounded-lg bg-white">
            <CardContent className="p-0">
              <div
                className="calendly-inline-widget min-h-[780px]"
                data-url={site.calendlyUrl}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-5">
          <Card className="rounded-lg bg-white">
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold">Before the call</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Useful context: company stage, decision deadline, number of
                repositories, stack, access constraints, and whether you need a
                written report, call, or remediation plan.
              </p>
            </CardContent>
          </Card>
          <ContactForm />
        </aside>
      </div>
    </main>
  );
}
