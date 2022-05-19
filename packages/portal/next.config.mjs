/** @type {import('next').NextConfig} */

import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      const __dirname = dirname(fileURLToPath(import.meta.url));

      config.plugins.push(new webpack.ProvidePlugin({
        __portalConfig: resolve(join(__dirname, './portal.config.js')),
      }));
    }

    config.infrastructureLogging = { level: "error" };
    
    return config;
  },
}

export default nextConfig
