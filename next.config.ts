import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'demo.vendure.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'vendure-demo-2.onrender.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
