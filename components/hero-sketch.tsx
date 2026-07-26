export function HeroSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* desk */}
      <path
        d="M40 372 H440"
        stroke="#0D0D12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M64 372 V400 M420 372 V400"
        stroke="#0D0D12"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* paper on the desk */}
      <rect
        x="96"
        y="300"
        width="150"
        height="106"
        rx="4"
        transform="rotate(-4 96 300)"
        stroke="#0D0D12"
        strokeWidth="2.5"
      />
      {/* sketch lines on the paper — a little dashboard/product doodle */}
      <g transform="rotate(-4 96 300)" stroke="#D9670A" strokeWidth="2" strokeLinecap="round">
        <path d="M114 328 H222" />
        <path d="M114 348 H190" opacity="0.6" />
        <rect x="114" y="362" width="30" height="26" rx="2" />
        <rect x="152" y="352" width="30" height="36" rx="2" opacity="0.7" />
        <rect x="190" y="368" width="30" height="20" rx="2" opacity="0.5" />
      </g>
      <circle cx="222" cy="322" r="4" fill="#7433E0" />

      {/* pencil */}
      <path
        d="M188 296 L246 254"
        stroke="#0D0D12"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M246 254 L258 246"
        stroke="#D9670A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* chair back, suggested with a simple line */}
      <path
        d="M330 250 V352"
        stroke="#0D0D12"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* figure: seated, leaning over the desk, sketching */}
      {/* torso + leather jacket collar */}
      <path
        d="M258 372
           C 256 330, 268 300, 300 288
           C 322 280, 340 286, 348 306
           C 354 322, 350 350, 344 372"
        stroke="#0D0D12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* jacket zip line */}
      <path
        d="M304 300 L296 372"
        stroke="#0D0D12"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* near arm, reaching down to the pencil */}
      <path
        d="M300 292 C 274 292, 244 296, 200 302"
        stroke="#0D0D12"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* neck */}
      <path d="M314 264 C 312 272, 310 280, 308 288" stroke="#0D0D12" strokeWidth="3" strokeLinecap="round" />

      {/* head, tilted down toward the paper */}
      <circle cx="322" cy="236" r="34" stroke="#0D0D12" strokeWidth="3" />

      {/* short hair */}
      <path
        d="M290 224
           C 292 200, 312 190, 328 192
           C 346 194, 356 206, 354 222"
        stroke="#0D0D12"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* glasses */}
      <rect x="296" y="238" width="22" height="16" rx="4" stroke="#0D0D12" strokeWidth="2.5" />
      <rect x="326" y="238" width="22" height="16" rx="4" stroke="#0D0D12" strokeWidth="2.5" />
      <path d="M318 244 H326" stroke="#0D0D12" strokeWidth="2.5" />
      <path d="M296 244 L286 240" stroke="#0D0D12" strokeWidth="2.5" strokeLinecap="round" />

      {/* beard */}
      <path
        d="M300 252 C 302 274, 314 286, 324 286 C 334 286, 344 276, 348 254"
        stroke="#0D0D12"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* dashed measuring / thinking lines around the sketch — small "building" motif */}
      <g stroke="#7433E0" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.55">
        <path d="M96 262 H246" />
        <path d="M262 214 V300" />
      </g>

      {/* small accent nodes, echoing dashboards/AI product work */}
      <circle cx="96" cy="262" r="3.5" fill="#D9670A" />
      <circle cx="246" cy="262" r="3.5" fill="#7433E0" />
      <circle cx="262" cy="214" r="3.5" fill="#D9670A" />
    </svg>
  );
}
