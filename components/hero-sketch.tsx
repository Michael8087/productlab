import Image from "next/image";

// The paper the sketch was drawn on is baked into the file's alpha channel now
// — only the pencil itself carries any opacity — so the drawing sits straight
// on the page with no rectangle showing, whatever is behind it. Filters and
// blend modes are deliberately absent: multiply was a no-op inside the
// animated wrapper's stacking context, which is what left the box visible.
export function HeroSketch({ className }: { className?: string }) {
  return (
    <Image
      src="/hero-sketch.png"
      alt="A pencil sketch of someone at a desk, laying out a product flow from problem and users through to MVP and iteration"
      width={820}
      height={662}
      priority
      className={className}
    />
  );
}
