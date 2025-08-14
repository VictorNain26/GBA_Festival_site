/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable image optimization for better performance
  // All assets are local, so we configure for optimal local image handling
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for local images
  },
};

module.exports = nextConfig;
