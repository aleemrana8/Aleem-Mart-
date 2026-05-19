/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'via.placeholder.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' },
      ],
    },
    {
      source: '/:path*.(jpg|jpeg|png|gif|ico|svg|webp|avif)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
};

module.exports = nextConfig;
