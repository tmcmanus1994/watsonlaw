import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.serviceArea}.`,
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

        <aside aria-label="Direct lines" className="grid content-start gap-8">
          {/*
            No office list and no mailing address: the firm presents a region
            only (site.serviceArea) until Brett and Noah decide how they want
            location shown. The address still lives in config/site.ts.
          */}
          <div>
            <h2 className="label label-kicker border-b border-rule pb-2 text-accent">
              By Telephone
            </h2>
            <ul className="mt-3 grid gap-4">
              {site.contacts.map((contact) => (
                <li key={contact.phone} className="support text-[length:var(--text-small)]">
                  {contact.attorney}
                  <br />
                  <a href={`tel:+1${contact.phone.replace(/\D/g, "")}`} className="link">
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label label-kicker border-b border-rule pb-2 text-accent">
              Location
            </h2>
            <p className="support mt-3 text-[length:var(--text-small)]">
              {site.serviceArea}
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
