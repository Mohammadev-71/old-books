import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.CORS_URL ? [process.env.CORS_URL] : [],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);