/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Enable Server Actions
    appDir: true, // Ensure app directory works inside src/
  },
};

module.exports = nextConfig;
