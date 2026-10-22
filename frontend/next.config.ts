import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Reuse the installed Tailwind loader without replacing Next.js CSS handling.
  webpack(config) {
    config.module.rules.push({
      oneOf: [
        {
          test: /\.css$/i,
          enforce: "pre",
          use: ["@tailwindcss/turbopack"],
        },
      ],
    });
    return config;
  },
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
