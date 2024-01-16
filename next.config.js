/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['bookem-shared'],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
