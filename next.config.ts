import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'
const nextConfig: NextConfig = {
  webpack: (config: WebpackConfigContext['webpack']) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[js|ts|jsx|tsx]$/,
      use: ['@svgr/webpack']
    })
    return config
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  }
}

export default nextConfig
