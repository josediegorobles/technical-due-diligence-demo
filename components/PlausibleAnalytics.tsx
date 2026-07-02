"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { site } from "@/lib/site";
import { hasTelemetryOptIn, setTelemetryOptIn } from "@/lib/telemetry";

export function PlausibleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(hasTelemetryOptIn());
  }, []);

  return (
    <>
      {enabled ? (
        <Script
          defer
          data-domain={site.plausibleDomain}
          src={site.plausibleScriptSrc}
          strategy="afterInteractive"
        />
      ) : null}
      <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <input
          checked={enabled}
          className="h-4 w-4 rounded border-border accent-secondary"
          onChange={(event) => {
            const isEnabled = event.target.checked;
            setTelemetryOptIn(isEnabled);
            setEnabled(isEnabled);
          }}
          type="checkbox"
        />
        Anonymous analytics
      </label>
    </>
  );
}
