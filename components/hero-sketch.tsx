import Image from "next/image";

// The artwork carries its own warm background, so the edges are feathered to
// stop it reading as a rectangle on the page. Multiply keeps the paper blending
// with whatever sits behind it rather than punching out a white block.
const edgeFade =
  "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)";

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
        mixBlendMode: "multiply",
        maskImage: edgeFade,
        maskComposite: "intersect",
        WebkitMaskImage: edgeFade,
        WebkitMaskComposite: "source-in"
      }}
    />
  );
}
