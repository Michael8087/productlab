import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0D0D12",
          soft: "#3A3A42"
        },
        paper: "#FFFFFF",
        mist: "#F7F7F5",
        line: {
          DEFAULT: "#E7E7E4",
          strong: "#D3D3CE"
        },
        muted: "#75757D",
        amber: {
          50: "#FEF3E2",
          100: "#FCE3BE",
          400: "#D97F17",
          500: "#B45309",
          600: "#94420A",
          700: "#7A3608"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      maxWidth: {
        content: "72rem",
        prose: "42rem"
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "#0D0D12",
            "--tw-prose-headings": "#0D0D12",
            "--tw-prose-links": "#B45309",
            "--tw-prose-bold": "#0D0D12",
            "--tw-prose-quotes": "#3A3A42",
            "--tw-prose-code": "#0D0D12",
            "--tw-prose-hr": "#E7E7E4",
            "--tw-prose-bullets": "#D3D3CE",
            "--tw-prose-quote-borders": "#E7E7E4",
            maxWidth: "none",
            a: { textDecoration: "none", borderBottom: "1px solid #FCE3BE", fontWeight: "500" },
            "a:hover": { borderBottomColor: "#B45309" },
            "code::before": { content: "none" },
            "code::after": { content: "none" }
          }
        }
      })
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
