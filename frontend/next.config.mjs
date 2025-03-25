/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.(mp4|webm|ogg|avi|mkv)$/,
      type: "asset/resource",
    });

    return config;
  },
  images: {
    domains: ["localhost", "109.196.100.122"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "109.196.100.122",
        port: "8000",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;
