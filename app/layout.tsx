import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";

import "./globals.css";
import { Button } from "@/components/ui/button";
import { absoluteSiteUrl, site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: absoluteSiteUrl("/og/home.png"),
        width: 1200,
        height: 630,
        alt: `${site.name} by ${site.author}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [absoluteSiteUrl("/og/home.png")],
  },
};

const navItems = [
  { href: "/sample", label: "Sample" },
  { href: "/methodology", label: "Methodology" },
  { href: "/case-studies", label: "Case studies" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between gap-4">
            <Link href="/" className="font-semibold tracking-tight">
              TDD Flash
            </Link>
            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button asChild size="default">
              <Link href="/book">Book call</Link>
            </Button>
          </div>
        </header>
        {children}
        <footer className="border-t border-border bg-white">
          <div className="container flex flex-col gap-3 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>{site.author} - {site.name}</p>
            <div className="flex gap-4">
              <Link href="/sample" className="hover:text-foreground">
                Sample report
              </Link>
              <Link href="/book" className="hover:text-foreground">
                Calendly
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
