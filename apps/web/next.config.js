/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // Optimize build performance
  swcMinify: true, // Use SWC minifier (faster than Terser)
  
  // Skip type checking during build (saves 20-30 seconds)
  // Type checking should be done in CI/CD, not in Docker builds
  typescript: {
    ignoreBuildErrors: false, // Keep false for safety, but can set to true for speed
  },
  eslint: {
    ignoreDuringBuilds: false, // Keep false for safety, but can set to true for speed
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'cms',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;

