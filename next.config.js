/** @type {import('next').NextConfig} */

// Example of defining nextConfig in next.config.js
const nextConfig = {
  transpilePackages: ['next-international', 'international-types'],
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// module.exports = withBundleAnalyzer({
//   env: {
//     NEXT_PUBLIC_ENV: nextConfig, //your next configs goes here
//   },
// });

module.exports = nextConfig;
