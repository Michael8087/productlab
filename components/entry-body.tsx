import { MDXRemote } from "next-mdx-remote/rsc";
import type { Entry } from "@/lib/types";
import { Container } from "./container";
import { mdxComponents } from "./mdx-components";
import { mdxOptions } from "@/lib/mdx";
import { Reveal } from "./reveal";

export function EntryBody({ entry }: { entry: Entry }) {
  return (
    <article className="pb-16 pt-14 md:pb-24">
      <Container narrow>
        <Reveal className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-medium prose-h2:mt-12 prose-h2:text-xl">
          <div className="hl">
            <MDXRemote source={entry.content} components={mdxComponents} options={mdxOptions} />
          </div>
        </Reveal>
      </Container>
    </article>
  );
}
