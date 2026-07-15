import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  narrow = false
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-6 md:px-10",
        narrow ? "max-w-prose" : "max-w-content",
        className
      )}
    >
      {children}
    </div>
  );
}
