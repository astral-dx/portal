/** @type {import('next').NextConfig} */

import { pkgUpSync } from 'pkg-up';
import { createRequire } from 'module';

import portalConfig from './portal.config.js';

const require = createRequire(import.meta.url);
const packageJson = require(pkgUpSync());

const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    portalConfig,
    packageJson,
  },
};

export default nextConfig
