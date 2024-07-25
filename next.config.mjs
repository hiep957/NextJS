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
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboard',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'token',
  //         },
  //       ],
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
};

export default nextConfig;
