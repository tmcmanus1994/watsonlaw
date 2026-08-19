import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} in ${site.address.city}, ${site.address.state}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact" />
      <div className="mx-auto grid max-w-[var(--container)] gap-12 px-5 py-16 md:grid-cols-[1fr_minmax(0,20rem)]">
        <div>
          {/*
            TODO: client-supplied intake language.
            The paragraph below is a placeholder slot for whatever intake or
            engagement wording the firm requires (e.g. "contacting the firm
            does not create an attorney-client relationship"). Do not draft
            it — it comes from the client.
          */}
          <p
            className="mb-8 max-w-[var(--measure)] text-sm text-ink-muted"
            data-slot="client-intake-language"
          >
            [Client-supplied intake language appears here.]
          </p>
          <ContactForm />
        </div>

        <aside className="text-sm text-ink-muted">
          <h2 className="font-heading text-lg text-ink">The office</h2>
          <address className="mt-3 not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="mt-3">
            {site.phone}
            <br />
            {site.email}
          </p>
        </aside>
      </div>
    </>
  );
}
