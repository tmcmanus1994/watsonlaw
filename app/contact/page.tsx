import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — offices in ${site.offices
    .map((o) => o.city)
    .join(" and ")}, Arkansas.`,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro kicker={site.name} title="Contact" />
      <div className="mx-auto grid max-w-[var(--container)] gap-12 px-5 py-[var(--space-section-sm)] md:grid-cols-[1fr_minmax(0,20rem)] md:py-[var(--space-section)]">
        <div>
          {/*
            The client's own intake wording, supplied in the September
            review and printed verbatim — this slot was a placeholder until
            then. Note it does NOT include the no-attorney-client-
            relationship language; if they want that, it is theirs to write.
          */}
          <p
            className="support mb-8 max-w-[var(--measure)] text-[length:var(--text-small)] text-gray"
            data-slot="client-intake-language"
          >
            If you have any questions or comments, please contact us through
            this form, email us at{" "}
            <a href={`mailto:${site.contactEmail}`} className="link">
              {site.contactEmail}
            </a>
            , or give us a call at the numbers below. We look forward to
            hearing from you.
          </p>
          <ContactForm />
        </div>

        <aside aria-label="Offices" className="grid content-start gap-8">
          {/*
            Two offices, each with the attorney who answers it. Still no
            street or mailing address: the client asked for the cities back
            but has not said whether an address should appear.
          */}
          {site.offices.map((office) => (
            <div key={office.city}>
              <h2 className="label label-kicker border-b border-rule pb-2 text-accent">
                {office.city}
              </h2>
              <p className="support mt-3 text-[length:var(--text-small)]">
                {office.attorney}
                <br />
                <a
                  href={`tel:+1${office.phone.replace(/\D/g, "")}`}
                  className="link"
                >
                  {office.phone}
                </a>
              </p>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
