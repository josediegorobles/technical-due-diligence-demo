import { CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Lite",
    price: "From $1,500",
    description: "Focused review of one repository or product area.",
    items: ["Executive summary", "Risk matrix", "Priority fixes"],
  },
  {
    name: "Full",
    price: "From $4,500",
    description: "Broader review across codebase, process, architecture, and delivery risk.",
    items: ["Full written report", "Architecture and CI review", "30/60/90-day plan"],
  },
  {
    name: "Review + Call + Plan",
    price: "From $8,000",
    description: "Written review, walkthrough call, and prioritized remediation roadmap.",
    items: ["Founder/investor briefing", "Action plan", "Follow-up decision support"],
  },
];

export function PricingTable() {
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="container">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Pick the review depth that matches the decision.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Starting prices, scoped on call. Final scope depends on repository
            size, access, urgency, and whether interviews or remediation planning
            are included.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex h-full flex-col rounded-lg">
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <p className="pt-3 text-4xl font-semibold">{tier.price}</p>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="mt-auto space-y-3">
                {tier.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
