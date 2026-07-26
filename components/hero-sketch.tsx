/**
 * Hero illustration: an over-the-shoulder view of someone sketching a product
 * wireframe on paper. The figure is a solid ink silhouette in the foreground,
 * cropped by the frame, with the work itself in the amber/violet accents used
 * across the site.
 */
export function HeroSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* the desk edge fades out rather than hitting the frame */}
        <linearGradient id="desk-edge" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="480" y2="0">
          <stop offset="0" stopColor="#0D0D12" stopOpacity="0" />
          <stop offset="0.2" stopColor="#0D0D12" stopOpacity="1" />
          <stop offset="0.8" stopColor="#0D0D12" stopOpacity="1" />
          <stop offset="1" stopColor="#0D0D12" stopOpacity="0" />
        </linearGradient>
        <filter id="contact-shadow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* far edge of the desk */}
      <path d="M0 198 H480" stroke="url(#desk-edge)" strokeWidth="2.5" />

      {/* contact shadow, so the sheet sits on a surface */}
      <path
        d="M224 236 L424 222 L450 330 L244 350 Z"
        fill="#0D0D12"
        opacity="0.13"
        filter="url(#contact-shadow)"
        transform="translate(6 14)"
      />

      {/* mug, sitting further back on the desk */}
      <path
        d="M56 206 h30 v26 a7 7 0 0 1 -7 7 h-16 a7 7 0 0 1 -7 -7 z"
        fill="#FFFFFF"
        stroke="#0D0D12"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M86 213 a9 9 0 0 1 0 15"
        fill="none"
        stroke="#0D0D12"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* the sheet being drawn on */}
      <path
        d="M224 236 L424 222 L450 330 L244 350 Z"
        fill="#FFFFFF"
        stroke="#0D0D12"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* the wireframe sketched on the sheet */}
      <g transform="rotate(-4 336 278)" strokeLinecap="round" fill="none">
        <path d="M260 258 H416" stroke="#D9670A" strokeWidth="2.5" />
        <path d="M260 272 H356" stroke="#D9670A" strokeWidth="2" opacity="0.5" />
        <rect x="260" y="286" width="42" height="30" stroke="#D9670A" strokeWidth="2" rx="2" />
        <rect x="312" y="280" width="42" height="36" stroke="#D9670A" strokeWidth="2" rx="2" opacity="0.75" />
        <rect x="364" y="290" width="42" height="26" stroke="#D9670A" strokeWidth="2" rx="2" opacity="0.5" />
      </g>
      <circle cx="432" cy="236" r="4.5" fill="#7433E0" />

      {/* figure, seen over the shoulder and cropped by the frame */}
      <path
        d="M100 480
           C 103 446, 112 422, 134 408
           C 148 400, 157 386, 159 372
           C 139 350, 143 302, 179 288
           C 213 274, 249 298, 247 336
           C 246 358, 235 374, 223 382
           C 234 392, 250 398, 266 398
           C 298 382, 328 350, 352 314
           C 362 306, 374 314, 368 326
           C 344 360, 314 394, 292 430
           C 300 450, 304 466, 306 480
           Z"
        fill="#0D0D12"
      />

      {/* pencil, carrying the line of the arm down onto the sheet */}
      <path d="M364 322 L340 304" stroke="#0D0D12" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M340 304 L328 295" stroke="#D9670A" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}
