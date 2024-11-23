/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        version: process.env.npm_package_version,
    },
    reactStrictMode: false,
};

export default nextConfig;
