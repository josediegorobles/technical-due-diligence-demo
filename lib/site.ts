export const site = {
  name: "72h Technical Due Diligence Flash",
  author: "Jose Robles",
  repo: "technical-due-diligence-demo",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://josediegorobles.github.io/technical-due-diligence-demo",
  description:
    "Fast, senior technical due diligence for founders, VCs, and business angels before investment, acquisition, rescue, or agency handoff decisions.",
  calendlyUrl: "https://calendly.com/jd-robles",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@josediegorobles.com",
};

export function withBasePath(path: string) {
  const basePath = process.env.GITHUB_ACTIONS === "true" ? `/${site.repo}` : "";
  return `${basePath}${path}`;
}

export function absoluteSiteUrl(path: string) {
  return `${site.url.replace(/\/$/, "")}${path}`;
}
