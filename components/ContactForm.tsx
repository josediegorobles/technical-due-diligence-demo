"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [context, setContext] = useState("");

  const subject = encodeURIComponent("72h Technical Due Diligence Flash");
  const body = encodeURIComponent(
    `Hi Jose,\n\nName/company: ${name}\n\nContext:\n${context}\n\nPreferred timing:\n`
  );
  const href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;

  return (
    <form className="grid gap-4 rounded-lg border border-border bg-white p-5">
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="name">
          Name / company
        </label>
        <input
          id="name"
          className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-ring transition focus:ring-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name, fund, or company"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="context">
          Decision context
        </label>
        <textarea
          id="context"
          className="min-h-28 rounded-md border border-input bg-background px-3 py-3 outline-none ring-ring transition focus:ring-2"
          value={context}
          onChange={(event) => setContext(event.target.value)}
          placeholder="Investment, acquisition, rescue, vendor handoff..."
        />
      </div>
      <Button asChild>
        <a href={href}>
          <Mail className="h-4 w-4" />
          Open email draft
        </a>
      </Button>
    </form>
  );
}
