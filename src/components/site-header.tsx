"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "@/components/container";
import { LogoMark } from "@/components/logo-mark";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  const isActive = (link: { href: string; owns?: string[] }) =>
    link.href === "/"
      ? pathname === "/"
      : [link.href, ...(link.owns ?? [])].some((p) => pathname.startsWith(p));

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Mubien home" className="group flex items-center gap-2.5">
          <LogoMark className="h-7 w-7 text-accent transition-colors group-hover:text-accent-strong" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Mubien
          </span>
          <span aria-hidden className="h-4 w-px bg-line" />
          <span className="max-w-28 text-[0.68rem] leading-[1.15] text-muted sm:max-w-none sm:text-xs">
            clarity for what comes next
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                isActive(link)
                  ? "bg-accent-soft text-accent-strong"
                  : "text-muted hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink hover:bg-sunken md:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav id="mobile-navigation" aria-label="Mobile navigation">
            <Container className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-base",
                    isActive(link)
                      ? "text-accent-strong"
                      : "text-ink hover:bg-sunken"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </nav>
        </div>
      )}
    </header>
  );
}
