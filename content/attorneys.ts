/**
 * Attorney profiles.
 *
 * Both entries are now the attorneys' own words. Noah's were revised in the
 * September review; Brett's credential sheet arrived on 16 September and is
 * loaded verbatim, so his page is no longer held back as a draft.
 *
 * Publication titles and case names carry `*...*` markers, rendered as real
 * italics by lib/emphasis.tsx — legal convention, and the site ships an
 * italic face for exactly this.
 *
 * Neither attorney has an approach quote: the client removed Noah's, and
 * Brett declined to write one.
 *
 * The 450+ appeals figure on the homepage is FIRM-WIDE — never attribute it
 * to either attorney personally.
 *
 * Headshots are the studio shots delivered 21 September, used at their
 * native 720×928 rather than cropped to the 4:5 the placeholders assumed —
 * re-encoding a professional portrait to save 28 pixels is not worth the
 * quality. Both are the same ratio, which is what actually keeps the two
 * pages consistent. Any later replacement should match 720×928, or change
 * these numbers to whatever it really is: they are declared here so the
 * browser reserves the right box and the swap cannot shift layout.
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
    headshot: {
      src: "/images/attorneys/brett-watson.jpg",
      alt: "Portrait of Brett D. Watson",
      width: 720,
      height: 928,
    },
    /* Client-approved homepage line (September review). NOTE: it reads
       "Chair", while Brett's own credential sheet says "Co-Chair" — see the
       Publications section below, where his wording is used. */
    homeCredential:
      "Appellate counsel in hundreds of cases. Co-Chair, Drafting Committee, *Handling Appeals in Arkansas*.",
    /* Brett's own words from his credential sheet, verbatim. He declined to
       supply an approach quote or a personal note, so this page carries
       neither — same as Noah's, whose quote the client removed. */
    intro: [
      "Brett has handled hundreds of appeals in state and federal courts. He has counseled clients on litigation strategy in high-stakes cases at both the trial and appellate levels. He has authored amicus briefs, and he has represented and advised clients on many election-related issues, including ballot initiatives, Ethics Commission matters, state and federal campaign finance, nonprofit activities, and candidate eligibility.",
    ],
    /*
     * Sequenced to match Noah's page, which the client ordered explicitly,
     * using Brett's own groupings from his sheet. His "Notable cases"
     * heading is deliberately absent — he wrote "We are not doing this
     * section," and Noah had the equivalent removed from his own page.
     *
     * The Federalist Society membership on his sheet is omitted at the
     * client's instruction.
     */
    sections: [
      {
        heading: "Clerkship",
        items: [
          "The Honorable Susan Webber Wright, United States District Court for the Eastern District of Arkansas (2002–2003)",
        ],
      },
      {
        heading: "Education",
        items: [
          "University of Arkansas at Little Rock William H. Bowen School of Law (2002)",
          "Harding University (1991)",
        ],
      },
      {
        heading: "Experience",
        items: [
          "Brett D. Watson, Attorney at Law, PLLC (2011–2026)",
          "Anderson, Murphy & Hopkins, LLP (2003–2006, 2006–2010)",
          "Williams & Anderson PLC (2006)",
          "Former Special Justice to the Arkansas Supreme Court",
          "Former adjunct law professor at the University of Arkansas at Little Rock William H. Bowen School of Law on Insurance Law and Law and Economics",
        ],
      },
      {
        heading: "Professional Memberships",
        items: [
          "Arkansas Supreme Court Civil Practice Committee (Member)",
          "Arkansas Judicial Discipline and Disability Commission (Commissioner)",
          "Arkansas Bar Association Board of Trustees (Trustee)",
          "Arkansas Bar Association (Member)",
          "The Arkansas Lawyer Editorial Board (Member)",
        ],
      },
      {
        heading: "Publications & Presentations",
        items: [
          "Co-Chair, Drafting Committee, *Handling Appeals in Arkansas* (since 2014)",
          "Presented numerous CLEs throughout Arkansas on appellate practice and legal writing",
          "Moderated panels at the Arkansas Bar Association annual convention with Arkansas Supreme Court Justices and Arkansas Court of Appeals judges",
          "Brett D. Watson and Frank Arey, *Check Your Text. No, Not Your Phone, Your Arkansas Constitution*, 61 Arkansas Lawyer, No. 2, Spring 2026, at 26",
          "Brett D. Watson, *The English Common Law: Still Weighty after All These Years*, 58 Arkansas Lawyer, No. 3, Summer 2023, at 24",
          "Brett D. Watson, *More than Words: Tailoring Your Appellate Brief to Today’s Judicial Reader*, 57 Arkansas Lawyer, No. 4, Fall 2022, at 14",
          "Brett D. Watson, *How to Ask a Judge to Recuse from a Case: What to Do and What Not to Do*, 57 Arkansas Lawyer, No. 3, Summer 2022, at 20",
          "Brett D. Watson and Tory Hodges Lewis, *Arkansas Precedent on the Law of Precedents: Where Have We Been and Where Are We Now?*, 57 Arkansas Lawyer, No. 1, Winter 2022, at 10",
        ],
      },
      {
        heading: "Recognition",
        items: [
          "Arkansas Bar Association Golden Gavel Award (2022)",
          "Arkansas Bar Association Maurice Cathey Award (2022)",
        ],
      },
      {
        heading: "Bar & Court Admissions",
        items: [
          "Supreme Court of the United States",
          "United States Court of Appeals for the Eighth Circuit",
          "All Arkansas state and federal courts",
          "United States District Courts for the Eastern District of Texas and the Northern District of Texas",
        ],
      },
    ],
  },
  {
    slug: "noah-watson",
    name: "Noah P. Watson",
    headshot: {
      src: "/images/attorneys/noah-watson.jpg",
      alt: "Portrait of Noah P. Watson",
      width: 720,
      height: 928,
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
