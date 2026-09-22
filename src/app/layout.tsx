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
    default: "Mubien · A calmer way to explore AI",
    template: "%s · Mubien",
  },
  description:
    "Independent work by Mubien on building with AI, evaluating its limits, and designing meaningful oversight as systems become more capable.",
  keywords: [
    "AI",
    "Claude Code",
    "learn AI",
    "build with AI",
    "AI governance",
    "AI learning",
    "AI limitations",
    "AI ethics",
    "responsible AI",
    "recursive self-improvement",
    "AI tools",
    "Mubien",
  ],
  authors: [{ name: "Mubien" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "en_US",
    title: "Mubien · A calmer way to explore AI",
    description:
      "Building useful AI, testing its assumptions, and exploring meaningful oversight with calm, clarity, and depth.",
    siteName: "Mubien",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubien · A calmer way to explore AI",
    description:
      "Building useful AI, testing its assumptions, and exploring meaningful oversight with calm, clarity, and depth.",
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
