import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "The Firm",
  description: `About ${site.name} — ${site.description}`,
};

export default function FirmPage() {
  return (
    <>
      <PageIntro
        title="The Firm"
        lede="[Placeholder lede — firm story copy arrives with the client intake.]"
      />
      <div className="mx-auto max-w-[var(--container)] px-5 py-16">
        <div className="prose">
          <p>
            [Placeholder — the firm narrative is drafted from the client
            intake. Structure only.] Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
            aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt, neque porro quisquam est qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <p>
            Meet <Link href="/attorneys">the attorneys</Link> or read about{" "}
            <Link href="/practice">our practice</Link>.
          </p>
        </div>
      </div>
    </>
  );
}
