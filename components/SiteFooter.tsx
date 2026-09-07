"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/config/site";
import { navItems } from "@/lib/nav";

/**
 * The footer as a colophon: wordmark and the firm's one-line description
 * on the left, the offices and the site map on the right, each under a
 * caption label on a hairline. Quiet, but complete — a reader who reaches
 * the bottom of any page finds a phone number and every other page.
 */
export function SiteFooter() {
  const pathname = usePathname();
  // The publishing tool gets no site chrome — see SiteHeader.
  if (pathname.startsWith("/keystatic")) return null;

  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto grid max-w-[var(--container)] gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:py-16">
        <div>
          <BrandMark variant="inline" className="text-sm" />
          <p className="support mt-4 max-w-xs text-[length:var(--text-small)] text-gray">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="label label-caption border-b border-rule pb-2 text-gray">
            Offices
          </p>
          <ul className="mt-4 grid gap-4">
            {site.offices.map((office) => (
              <li key={office.city} className="support text-[length:var(--text-small)]">
                <span className="text-ink">
                  {office.city}, {site.mailingAddress.state}
                </span>
                <br />
                <a
                  href={`tel:+1${office.phone.replace(/\D/g, "")}`}
                  className="link text-gray"
                >
                  {office.phone}
                </a>
              </li>
            ))}
            <li className="support text-[length:var(--text-small)] text-gray">
              {site.mailingAddress.line1}, {site.mailingAddress.city},{" "}
              {site.mailingAddress.state} {site.mailingAddress.zip}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <p className="label label-caption border-b border-rule pb-2 text-gray">
            Site
          </p>
          <ul className="mt-4 grid gap-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-quiet support text-[length:var(--text-small)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-[var(--container)] border-t border-rule px-5 py-5 md:flex md:items-baseline md:justify-between md:gap-8">
        {/*
          TODO: client-supplied compliance language.
          Dedicated slot for the attorney advertising disclaimer. Brett and
          Noah are reviewing copy under the Arkansas advertising rules — do
          not draft anything here. When their language arrives, replace the
          contents of the <p> below.
        */}
        <p
          className="support text-[length:var(--text-label)] text-gray"
          data-slot="attorney-advertising-disclaimer"
        >
          {/* Attorney advertising disclaimer goes here (client-supplied). */}
        </p>
        <p className="support mt-2 text-[length:var(--text-label)] text-gray md:mt-0 md:whitespace-nowrap">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
