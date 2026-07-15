import type { Metadata } from "next";
import { inter, interTight, mono } from "@/lib/fonts";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Product Lab — Michael Miňovský",
    template: "%s — Product Lab"
  },
  description:
    "A working notebook of products, AI experiments and ideas by Michael Miňovský, Senior Product Manager focused on analytics, dashboards and AI-enhanced products.",
  openGraph: {
    title: "Product Lab — Michael Miňovský",
    description:
      "A working notebook of products, AI experiments and ideas by Michael Miňovský.",
    url: SITE_URL,
    siteName: "Product Lab",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Lab — Michael Miňovský",
    description:
      "A working notebook of products, AI experiments and ideas by Michael Miňovský."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
