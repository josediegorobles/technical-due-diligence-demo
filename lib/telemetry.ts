"use client";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

const optInKey = "tddFlashTelemetryOptIn";

export function hasTelemetryOptIn(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(optInKey) === "true";
}

export function setTelemetryOptIn(enabled: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(optInKey, enabled ? "true" : "false");
}

export function trackGoal(eventName: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined" || !hasTelemetryOptIn()) {
    return;
  }

  if (typeof window.plausible === "function") {
    window.plausible(eventName, props ? { props } : undefined);
  }
}
