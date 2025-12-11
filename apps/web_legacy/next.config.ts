import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@repo/ui', 'react-native', 'react-native-svg', 'nativewind', 'react-native-css-interop'],
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
    }
    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      ...(config.resolve.extensions || []),
    ]
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
