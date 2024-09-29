/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
