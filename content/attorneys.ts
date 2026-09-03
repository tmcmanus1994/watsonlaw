/**
 * Attorney profiles, from the client intake (Part 4).
 *
 * Brett's entry is `draft: true` — his confirmed credential sheet hasn't
 * arrived. His page renders a clean credentials-only state; nothing beyond
 * the two confirmed credentials may be published for him. (The 400+ appeals
 * figure is FIRM-WIDE — never attribute it to either attorney personally.)
 *
 * Noah's intro is assembled strictly from intake facts — no invented
 * history or characterization. Flag any wording change for client review.
 *
 * Headshots shoot the week of Sept 14: replace the placeholder PNGs in
 * /public/images/attorneys at the same 4:5 ratio (800×1000); dimensions are
 * locked here so the swap cannot shift layout.
 */

export type Attorney = {
  slug: string;
  name: string;
  draft?: boolean;
  headshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Approved deck copy for the homepage credentials strip (verbatim). */
  homeCredential: string;
  /** Short factual intro paragraphs (facts from intake only). */
  intro: string[];
  /** Credential sections rendered as labeled lists. */
  sections: { heading: string; items: string[] }[];
  /** First-person line on approach, verbatim from intake. */
  approach?: string;
};

export const attorneys: Attorney[] = [
  {
    slug: "brett-watson",
    name: "Brett D. Watson",
    draft: true,
    headshot: {
      src: "/images/attorneys/brett-watson.png",
      alt: "Portrait of Brett D. Watson (photograph forthcoming)",
      width: 800,
      height: 1000,
    },
    homeCredential:
      "Former Special Justice, Arkansas Supreme Court. Chair, drafting committee, Arkansas Bar Association appellate handbook.",
    intro: [],
    sections: [
      {
        heading: "Appointments & Service",
        items: [
          "Former Special Justice, Arkansas Supreme Court",
          "Chair, drafting committee, Arkansas Bar Association appellate handbook",
        ],
      },
    ],
  },
  {
    slug: "noah-watson",
    name: "Noah P. Watson",
    headshot: {
      src: "/images/attorneys/noah-watson.png",
      alt: "Portrait of Noah P. Watson (photograph forthcoming)",
      width: 800,
      height: 1000,
    },
    homeCredential:
      "Former Deputy Solicitor General of Arkansas. Law clerk, U.S. Court of Appeals for the Eighth Circuit.",
    intro: [
      "Noah P. Watson practices appellate and constitutional litigation. Before entering private practice, he served in the Arkansas Attorney General’s Office as Deputy Solicitor General, as Deputy Attorney General for the Opinions and Freedom of Information Act Division, and as Senior Assistant Attorney General in the Special Litigation Section.",
      "He clerked for the Honorable Lavenski R. Smith of the United States Court of Appeals for the Eighth Circuit. He is a graduate of Washington University in St. Louis School of Law and Harding University.",
    ],
    sections: [
      {
        heading: "Education",
        items: [
          "Washington University in St. Louis School of Law",
          "Harding University",
        ],
      },
      {
        heading: "Clerkship",
        items: [
          "The Honorable Lavenski R. Smith, United States Court of Appeals for the Eighth Circuit",
        ],
      },
      {
        heading: "Government Service — Arkansas Attorney General’s Office",
        items: [
          "Deputy Solicitor General",
          "Deputy Attorney General, Opinions and Freedom of Information Act Division",
          "Senior Assistant Attorney General, Special Litigation Section",
        ],
      },
      {
        heading: "Bar & Court Admissions",
        items: [
          "State of Arkansas",
          "Supreme Court of the United States",
          "U.S. Courts of Appeals for the Eighth, Tenth, and D.C. Circuits",
          "U.S. District Courts for the Eastern District of Arkansas, Western District of Arkansas, and Northern District of Oklahoma",
        ],
      },
      {
        heading: "Notable Cases",
        items: [
          "Arkansas United v. Thurston, No. 25-890 (2026)",
          "Fayetteville Public Library v. Crawford County, No. 25-1146 (8th Cir. 2026)",
          "Hanna v. Jester, No. 26-543 (Ark. 2026)",
          "Jackson v. Ark. Dep’t of Educ., 60CV-23-3267 (Pulaski Cnty. Cir. Ct. 2023)",
        ],
      },
      {
        heading: "Publications",
        items: [
          "“Yes Harm, No Foul”: Recalibrating Qualified Immunity, 64 Wash. U. J.L. & Pol’y 231 (2021)",
        ],
      },
      {
        heading: "Professional Memberships",
        items: [
          "Arkansas Bar Association",
          "Pulaski County Bar Association",
          "Henry Woods Inn of Court",
        ],
      },
    ],
    approach:
      "I perform careful research of the law and clear, precise analysis in briefing. That’s because the best briefs are not only the one that’s right on the law but also easy for the reader to understand.",
  },
];

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}
