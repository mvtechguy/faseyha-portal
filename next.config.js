/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['business.aibey.ai', 'localhost:3005']
    }
  }
}

module.exports = nextConfig
