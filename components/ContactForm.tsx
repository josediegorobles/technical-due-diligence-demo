"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { absoluteSiteUrl, site } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [context, setContext] = useState("");

  const subject = encodeURIComponent("72h Technical Due Diligence Flash");
  const body = encodeURIComponent(
    `Hi Jose,\n\nName/company: ${name}\nEmail: ${email}\n\nContext:\n${context}\n\nPreferred timing:\n`
  );
  const href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;

  return (
    <form
      action={site.contactFormAction}
      method="POST"
      className="grid gap-4 rounded-lg border border-border bg-white p-5"
    >
      <input type="hidden" name="_subject" value="72h Technical Due Diligence Flash lead" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={absoluteSiteUrl("/book/?submitted=1")} />
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="_honey"
        tabIndex={-1}
        type="text"
      />
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="name">
          Name / company
        </label>
        <input
          id="name"
          name="name"
          className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-ring transition focus:ring-2"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name, fund, or company"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="h-11 rounded-md border border-input bg-background px-3 outline-none ring-ring transition focus:ring-2"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-semibold" htmlFor="context">
          Decision context
        </label>
        <textarea
          id="context"
          name="context"
          className="min-h-28 rounded-md border border-input bg-background px-3 py-3 outline-none ring-ring transition focus:ring-2"
          required
          value={context}
          onChange={(event) => setContext(event.target.value)}
          placeholder="Investment, acquisition, rescue, vendor handoff..."
        />
      </div>
      <Button type="submit">
        <Send className="h-4 w-4" />
        Send context
      </Button>
      <Button asChild variant="outline">
        <a href={href} className="text-sm">
          <Mail className="h-4 w-4" />
          Email {site.contactEmail}
        </a>
      </Button>
    </form>
  );
}
