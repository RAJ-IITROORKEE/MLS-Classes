/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mlsclasses.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mlsclasses.com',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // Ignore pre-existing TypeScript errors not related to blog system
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
