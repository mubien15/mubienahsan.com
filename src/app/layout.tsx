import type { Metadata, Viewport } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubscribePopup } from "@/components/subscribe-popup";

// Bold geometric sans for headlines: confident, warm, high x-height.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Clean, tight sans for UI + body.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://mubienahsan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mubien Ahsan · Learning & building with AI, in public",
    template: "%s · Mubien Ahsan",
  },
  description:
    "You do not need a computer science degree to build with AI. Free guides that start from zero, the apps I have shipped, and my work on AI governance — auditing, assurance and the ethics of deploying these systems.",
  alternates: { canonical: "/" },
  keywords: [
    "AI",
    "Claude Code",
    "learn AI",
    "build with AI",
    "AI governance",
    "AI auditing",
    "AI assurance",
    "AI ethics",
    "responsible AI",
    "EU AI Act",
    "ISO 42001",
    "Mubien Ahsan",
  ],
  authors: [{ name: "Mubien Ahsan" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    title: "Mubien Ahsan · Learning & building with AI, in public",
    description:
      "AI courses made for beginners, the apps I've shipped, and serious work on AI governance, auditing and ethics.",
    siteName: "Mubien Ahsan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubien Ahsan · Learning & building with AI, in public",
    description:
      "AI courses made for beginners, the apps I've shipped, and serious work on AI governance, auditing and ethics.",
  },
};

// Everyone sees the same warm light theme, whatever their device is set to.
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f9f1e4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SubscribePopup />
      </body>
    </html>
  );
}
