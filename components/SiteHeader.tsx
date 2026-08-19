"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/config/site";
import { navItems } from "@/lib/nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-[var(--container)] items-center justify-between gap-6 px-5 py-4">
        <Link
          href="/"
          className="font-heading text-lg tracking-wide text-ink no-underline"
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} current={pathname === item.href}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-sm">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open && (
        <nav aria-label="Main" id="mobile-nav" className="border-t border-line md:hidden">
          <ul className="px-5 py-3">
            {navItems.map((item) => (
              <li key={item.href} className="py-2">
                <NavLink
                  href={item.href}
                  current={pathname === item.href}
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
        "text-sm no-underline hover:underline " +
        (current ? "text-ink font-semibold" : "text-ink-muted")
      }
    >
      {children}
    </Link>
  );
}
