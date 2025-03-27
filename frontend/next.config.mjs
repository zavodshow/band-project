/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    // config.module.rules.push({
    //   test: /\.css$/, // Target CSS files
    //   include: [
    //     /node_modules\/react-datepicker/, // Include react-datepicker styles
    //     /node_modules\/swiper/, // Include swiper styles
    //   ],
    //   use: [
    //     "style-loader", // Inject styles into the DOM
    //     "css-loader", // Resolve @import and url() in CSS
    //     "postcss-loader", // Optional but useful for advanced CSS features
    //   ],
    // });

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
    domains: ["localhost", "109.196.100.122", "109.196.100.122:8000", "zavodshow.ru", "www.zavodshow.ru"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zavodshow.ru",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.zavodshow.ru",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "109.196.100.122",
        port: "8000",
        pathname: "/storage/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/uploads/**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
