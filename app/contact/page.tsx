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
            TODO: client-supplied intake language.
            Slot for whatever engagement wording the firm requires (e.g. the
            no-attorney-client-relationship note). Brett and Noah own all
            compliance language — do not draft it.
          */}
          <p
            className="support mb-8 max-w-[var(--measure)] text-[length:var(--text-small)] text-gray"
            data-slot="client-intake-language"
          >
            [Client-supplied intake language appears here.]
          </p>
          <ContactForm />
        </div>

        <aside aria-label="Offices" className="grid content-start gap-8">
          {site.offices.map((office) => (
            <div key={office.city}>
              <h2 className="label label-kicker border-b border-rule pb-2 text-accent">
                {office.city}
              </h2>
              <p className="support mt-3 text-[length:var(--text-small)]">
                {office.attorney}
                <br />
                <a href={`tel:+1${office.phone.replace(/\D/g, "")}`} className="link">
                  {office.phone}
                </a>
              </p>
            </div>
          ))}
          <div>
            <h2 className="label label-kicker border-b border-rule pb-2 text-accent">
              Mailing Address
            </h2>
            <address className="support mt-3 text-[length:var(--text-small)] not-italic">
              {site.mailingAddress.line1}
              <br />
              {site.mailingAddress.city}, {site.mailingAddress.state}{" "}
              {site.mailingAddress.zip}
            </address>
          </div>
        </aside>
      </div>
    </>
  );
}
