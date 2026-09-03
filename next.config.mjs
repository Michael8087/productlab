/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    // Static export has no server to run Next's on-demand image optimizer,
    // so images are served as-is (already reasonably sized source files).
    unoptimized: true
  }
};

export default nextConfig;
