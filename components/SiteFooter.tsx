import { BrandMark } from "@/components/BrandMark";
import { site } from "@/config/site";

/** The quiet footer bar from the deck: wordmark left, offices right. */
export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="mx-auto flex max-w-[var(--container)] flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <BrandMark variant="inline" className="text-sm" />
        <p className="text-[length:var(--text-small)] text-gray">
          {site.offices.map((office, i) => (
            <span key={office.city}>
              {i > 0 && <span aria-hidden="true"> · </span>}
              <span className="whitespace-nowrap">
                {office.city}, {site.mailingAddress.state} {office.phone}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div className="mx-auto max-w-[var(--container)] border-t border-rule px-5 py-5">
        {/*
          TODO: client-supplied compliance language.
          Dedicated slot for the attorney advertising disclaimer. Brett and
          Noah are reviewing copy under the Arkansas advertising rules — do
          not draft anything here. When their language arrives, replace the
          contents of the <p> below.
        */}
        <p
          className="text-[length:var(--text-label)] text-gray"
          data-slot="attorney-advertising-disclaimer"
        >
          {/* Attorney advertising disclaimer goes here (client-supplied). */}
        </p>
        <p className="mt-2 text-[length:var(--text-label)] text-gray">
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
