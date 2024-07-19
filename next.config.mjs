/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.hoanghamobile.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  // https://www.facebook.com/
  // async redirects() {
  //   return [
  //     {
  //       source: '/about',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ];
  // }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/products/:slug',
  //       destination: '/',
  //     },
  //   ];
  // }
};

export default nextConfig;
