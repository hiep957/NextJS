/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.hoanghamobile.com'],
    domains: ['blog.estudyme.com']
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
};

export default nextConfig;
