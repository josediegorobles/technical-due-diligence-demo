"use client";

import { CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { trackGoal } from "@/lib/telemetry";

export function TrackedCalendlyLink() {
  return (
    <Button asChild variant="outline">
      <a
        href={site.calendlyUrl}
        onClick={() => trackGoal("Calendly Clicked", { source: "book_page_direct_link" })}
        rel="noreferrer"
        target="_blank"
      >
        <CalendarCheck className="h-4 w-4" />
        Open Calendly directly
      </a>
    </Button>
  );
}
