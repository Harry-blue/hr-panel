/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode for now
  typescript: {
    ignoreBuildErrors: false, // Ensure errors aren't ignored
  },
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v0.blob.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
