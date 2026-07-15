import Link from "next/link";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: (props) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...(props as any)}
      width={1200}
      height={720}
      className="rounded-xl border border-line"
      sizes="(min-width: 768px) 42rem, 100vw"
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-amber-400 pl-5 italic text-ink-soft"
      {...props}
    />
  ),
  hr: () => <hr className="border-line" />
};
