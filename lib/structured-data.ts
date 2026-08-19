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
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: "US",
  };
}

export function attorneyJsonLd(attorney: Attorney) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: attorney.name,
    url: `${site.url}/attorneys/${attorney.slug}`,
    image: `${site.url}${attorney.headshot.src}`,
    worksFor: {
      "@type": "LegalService",
      name: site.name,
      url: site.url,
    },
  };
}
