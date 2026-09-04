"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/lib/nav";

/**
 * On the homepage the header sits over the hero photograph in paper;
 * everywhere else it's a quiet paper bar with a hairline. Nav is Libre
 * Franklin caps; the active page carries the underline (oxblood on paper,
 * paper over photography — per the deck).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/";

  /*
   * The publishing tool has its own navigation, and a marketing nav sitting
   * above it is a trap: clicking "Home" mid-post would discard unsaved work.
   * Keep the site chrome off /keystatic entirely.
   */
  if (pathname.startsWith("/keystatic")) return null;

  return (
    <header
      className={
        overHero
          ? "absolute inset-x-0 top-0 z-10 text-paper [--nav-underline:var(--color-paper)]"
          : "border-b border-rule bg-paper text-ink [--nav-underline:var(--color-accent)]"
      }
    >
      <div className="mx-auto flex max-w-[var(--container)] items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="no-underline text-current">
          {/* The animated mark is paper-coloured and reads over the hero
              photograph, so it runs on the homepage only. */}
          <BrandMark
            variant="mark"
            withLottie={overHero}
            className="text-[0.72rem] md:text-[0.8rem]"
          />
          <span className="sr-only">Home</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  current={
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="label label-nav md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Main"
          id="mobile-nav"
          className="border-y border-rule bg-paper text-ink md:hidden [--nav-underline:var(--color-accent)]"
        >
          <ul className="px-5 py-3">
            {navItems.map((item) => (
              <li key={item.href} className="py-2.5">
                <NavLink
                  href={item.href}
                  current={
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function NavLink({
  href,
  current,
  onClick,
  children,
}: {
  href: string;
  current: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={
        "label label-nav inline-block border-b-2 pb-0.5 no-underline text-current " +
        (current
          ? "border-[var(--nav-underline)]"
          : "border-transparent hover:border-[var(--nav-underline)]")
      }
    >
      {children}
    </Link>
  );
}
