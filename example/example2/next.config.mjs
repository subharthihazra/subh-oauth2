/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames for https
        port: "", // No specific port
      },
      {
        protocol: "http",
        hostname: "**", // Allows all hostnames for http
        port: "", // No specific port
      },
    ],
  },
};

export default nextConfig;
