// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.hizliresim.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;