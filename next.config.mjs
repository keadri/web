/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Web/' : '',
};

export default nextConfig; 