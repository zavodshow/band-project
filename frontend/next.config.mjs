/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/, // Match .pdf files
      type: "asset/resource", // Handle PDFs as static assets
    });

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|avi|mkv)$/, // Match video formats
      type: "asset/resource", // Handle videos as static assets
    });

    return config;
  },
  images: {
    domains: ["localhost", "109.196.100.122"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "109.196.100.122",
        port: "", // Remove port specification
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "", // Remove port specification
        pathname: "/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;