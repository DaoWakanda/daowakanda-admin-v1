/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for Module not found: Can't resolve fs.
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/auth/log-in',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
