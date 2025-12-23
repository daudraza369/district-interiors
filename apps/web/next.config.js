/** @type {import('next').NextConfig} */
const { withPayload } = require('@payloadcms/next/withPayload')

const nextConfig = {
  // Your existing Next.js config
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = withPayload(nextConfig)
