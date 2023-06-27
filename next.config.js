/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/dole-tracking',
        destination: `https://clients.ncr.dole.gov.ph/isc/api/authentication.php?getCurrentStatus=${process.env.NEXT_PUBLIC_DOLE_MONITORING_API}`,
      },

    ]
  },
};

module.exports = nextConfig;
