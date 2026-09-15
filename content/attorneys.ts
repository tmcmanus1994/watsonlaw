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
  /**
   * First-person line on approach. Both attorneys' quotes were removed at
   * the client's request in the September review; the field and its
   * rendering stay in case they want one back.
   */
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
    /* Client's wording, September review. The asterisks mark the
       publication title for italics — see lib/emphasis.ts. */
    homeCredential:
      "Appellate counsel in hundreds of cases. Chair, Drafting Committee, *Handling Appeals in Arkansas*.",
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
      "Noah P. Watson served as the Deputy Solicitor General of Arkansas, and in various other positions at the Arkansas Attorney General’s office, where his practice involved high-profile appeals, complex constitutional and election litigation, and multistate amicus briefing. He has argued multiple cases before the Eighth Circuit, the Arkansas Supreme Court, and the Arkansas Court of Appeals, as well as before federal and Arkansas trial courts.",
      "He clerked for the Honorable Lavenski R. Smith of the United States Court of Appeals for the Eighth Circuit. He is a graduate of Washington University in St. Louis School of Law and Harding University.",
    ],
    /*
     * Order set by the client in the September review: clerkship, education,
     * government service, memberships, publications, admissions. A "Notable
     * Cases" section listing four matters was removed at their request.
     */
    sections: [
      {
        heading: "Clerkship",
        items: [
          "The Honorable Lavenski R. Smith, United States Court of Appeals for the Eighth Circuit",
        ],
      },
      {
        heading: "Education",
        items: [
          "Washington University in St. Louis School of Law",
          "Harding University",
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
        heading: "Professional Memberships",
        items: [
          "Arkansas Bar Association",
          "Pulaski County Bar Association",
          "Eighth Circuit Bar Association",
          "Judge Henry Woods American Inn of Court",
        ],
      },
      {
        heading: "Publications",
        items: [
          "“Yes Harm, No Foul”: Recalibrating Qualified Immunity, 64 Wash. U. J.L. & Pol’y 231 (2021)",
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
    ],
  },
];

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}
