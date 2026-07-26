import Image from "next/image";

// The sketch sits on the hero's warm gradient, so its edges are feathered
// rather than left as a hard rectangle against the background.
const edgeFade =
  "linear-gradient(to right, transparent, #000 7%, #000 93%, transparent), linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent)";

export function HeroSketch({ className }: { className?: string }) {
  return (
    <Image
      src="/hero-sketch.png"
      alt="A pencil sketch of someone at a desk, laying out a product flow from problem and users through to MVP and iteration"
      width={820}
      height={662}
      priority
      className={className}
      style={{
        maskImage: edgeFade,
        maskComposite: "intersect",
        WebkitMaskImage: edgeFade,
        WebkitMaskComposite: "source-in"
      }}
    />
  );
}
