import path from "path";
import type { Configuration } from "webpack";

const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
    qualities: [90],
  },

  webpack: (config: Configuration): Configuration => {
    if (config.resolve && config.resolve.alias) {
      (config.resolve.alias as Record<string, string>)['@'] = path.resolve(__dirname);
    }
    return config;
  },
};

export default nextConfig;
