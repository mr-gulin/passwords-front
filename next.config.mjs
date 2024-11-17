/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        version: process.env.npm_package_version,
        BASE_URL: process.env.BASE_URL,
    }
};

export default nextConfig;
