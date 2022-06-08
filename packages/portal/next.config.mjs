import { dirname, join, resolve } from 'path';
import { pkgUpSync } from 'pkg-up';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const require = createRequire(import.meta.url);

      config.plugins.push(new webpack.ProvidePlugin({
        $config: resolve(join(__dirname, './portal.config.js')),
      }));

      config.plugins.push(new webpack.DefinePlugin({
        $packageJson: JSON.stringify(require(pkgUpSync())),
      }));
    }

    config.infrastructureLogging = { level: "error" };
    
    return config;
  },
};

export default nextConfig;
