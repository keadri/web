/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './app/image-loader.ts',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Web/' : '',
  trailingSlash: true,
};

export default nextConfig; 