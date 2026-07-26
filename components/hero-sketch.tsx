import Image from "next/image";

// The artwork ships with a warm tinted paper baked in. Desaturating it and
// lifting the highlights pushes that paper to white, and multiply then drops
// the white entirely, so the drawing sits on the page with no visible edges.
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
        filter: "grayscale(1) contrast(1.06) brightness(1.12)",
        mixBlendMode: "multiply"
      }}
    />
  );
}
