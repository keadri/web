/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  // 根据环境设置不同的配置
  ...(process.env.NODE_ENV === 'production' 
    ? {
        basePath: '/Web',
        assetPrefix: '/Web',
      }
    : {})
};

export default nextConfig; 