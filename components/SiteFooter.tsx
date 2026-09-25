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
          {/* The firm's one-line description sat under the wordmark until
              the client removed it — same reason as the hero kicker. */}
          <BrandMark variant="inline" className="text-sm" />
        </div>

        <div>
          <p className="label label-caption border-b border-rule pb-2 text-gray">
            Offices
          </p>
          {/* City, attorney, number. No street address — the client has not
              asked for one to be shown.

              The place is set as a kicker label in oxblood above the name
              and number, the way /contact sets its office headings. Noah
              asked for the two to be told apart on 25 September: in one
              undifferentiated stack, "North Little Rock, AR" read as part
              of the same run of text as the attorney and the phone. The
              state is spelled out here for the same reason — this is a
              colophon, not an envelope. */}
          <ul className="mt-4 grid gap-5">
            {site.offices.map((office) => (
              <li key={office.city}>
                <p className="label label-kicker text-accent">
                  {office.city}, {site.stateName}
                </p>
                <p className="support mt-2 text-[length:var(--text-small)]">
                  {office.attorney}
                  <br />
                  <a
                    href={`tel:+1${office.phone.replace(/\D/g, "")}`}
                    className="link text-gray"
                  >
                    {office.phone}
                  </a>
                </p>
              </li>
            ))}
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
          No attorney advertising disclaimer. This was an empty slot waiting
          on client language; on 16 September they answered "No advertising
          disclaimer needed." That is their call to make under the Arkansas
          rules, not ours — do not add one back without them asking.
        */}
        <p className="support mt-2 text-[length:var(--text-label)] text-gray md:mt-0 md:whitespace-nowrap">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
