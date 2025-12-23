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
  webpack: (config, { isServer }) => {
    // Exclude Payload and database dependencies from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        tls: false,
        'pg-native': false,
      };
    }
    return config;
  },
}

module.exports = withPayload(nextConfig)
