import type { Configuration } from 'webpack'; // Import the correct type
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config?.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[js|ts|jsx|tsx]$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  // ... other Next.js config
};

export default nextConfig;