/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/dvkigpfrc/image/upload/**',
          },
        ],
      },
};

export default nextConfig;
