import Link from "next/link";
import { site } from "@/config/site";
import { navItems } from "@/lib/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-shade">
      <div className="mx-auto grid max-w-[var(--container)] gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg">{site.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ink-muted no-underline hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="text-sm not-italic text-ink-muted">
          {site.address.street}
          <br />
          {site.address.city}, {site.address.state} {site.address.zip}
          <br />
          {site.phone}
          <br />
          {site.email}
        </address>
      </div>

      <div className="mx-auto max-w-[var(--container)] border-t border-line px-5 py-6">
        {/*
          TODO: client-supplied compliance language.
          Dedicated slot for the attorney advertising disclaimer. The text is
          the client's responsibility — do not draft it. When it arrives,
          replace the contents of the <p> below.
        */}
        <p className="text-xs text-ink-faint" data-slot="attorney-advertising-disclaimer">
          {/* Attorney advertising disclaimer goes here (client-supplied). */}
        </p>
        <p className="mt-2 text-xs text-ink-faint">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
