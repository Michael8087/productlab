import Image from "next/image";

// Multiply drops the sketch's near-white paper so the hero gradient shows
// through it; the feathered edges then hide the warm tint the artwork carries
// in its own background, which would otherwise read as a darker rectangle.
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
