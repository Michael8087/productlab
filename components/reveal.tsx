"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      // No margin: the animation starts the instant any part of the card
      // crosses into the viewport, rather than waiting until it's mostly (or
      // fully) on screen — a positive margin here pre-triggers it before the
      // card is visible at all, which reads as "no animation."
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
