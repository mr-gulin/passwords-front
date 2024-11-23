/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        version: process.env.npm_package_version,
        BASE_URL: process.env.BASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        API_URL: process.env.API_URL,
    },
    reactStrictMode: false,
};

export default nextConfig;
