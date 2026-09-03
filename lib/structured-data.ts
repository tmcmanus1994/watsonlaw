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
    address: {
      "@type": "PostalAddress",
      streetAddress: site.mailingAddress.line1,
      addressLocality: site.mailingAddress.city,
      addressRegion: site.mailingAddress.state,
      postalCode: site.mailingAddress.zip,
      addressCountry: "US",
    },
    contactPoint: site.offices.map((office) => ({
      "@type": "ContactPoint",
      contactType: "office",
      areaServed: "US-AR",
      telephone: office.phone,
      name: `${office.city} office`,
    })),
    areaServed: "US",
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
