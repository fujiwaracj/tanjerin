import createJITI from 'jiti';

const jiti = createJITI(new URL(import.meta.url).pathname)

jiti("./env")

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
