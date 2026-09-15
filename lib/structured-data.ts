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
     * No PostalAddress. The pages name cities but no street or mailing
     * address, and the JSON-LD should not claim more than they do. Restore
     * it from config/site.ts if the client asks for the address to be
     * public.
     */
    contactPoint: site.offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "office",
      areaServed: "US-AR",
      telephone: office.phone,
      name: `${office.city} office`,
    })),
    areaServed: {
      "@type": "State",
      name: "Arkansas",
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
