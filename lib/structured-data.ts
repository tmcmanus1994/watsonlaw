import { site } from "@/config/site";
import type { Attorney } from "@/content/attorneys";

export function legalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    /*
     * No PostalAddress. The firm presents a region rather than an address
     * (site.serviceArea), and emitting a locality here would let a search
     * result show a city the pages themselves never name. Restore the
     * PostalAddress block from config/site.ts if the client asks for the
     * mailing address to be public.
     */
    contactPoint: site.contacts.map((contact) => ({
      "@type": "ContactPoint",
      contactType: "legal service",
      areaServed: "US-AR",
      telephone: contact.phone,
      name: contact.attorney,
    })),
    areaServed: {
      "@type": "AdministrativeArea",
      name: site.serviceArea,
    },
  };
}

export function attorneyJsonLd(attorney: Attorney) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: attorney.name,
    url: `${site.url}/attorneys/${attorney.slug}`,
    worksFor: {
      "@type": "LegalService",
      name: site.name,
      url: site.url,
    },
  };
}
