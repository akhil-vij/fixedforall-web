import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static HTML only: no API routes, server actions or middleware. The output in out/ runs on any host.
  output: 'export',
  // Images are pre-sized WebP/AVIF; static export can't use the image optimiser.
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
};

export default createMDX()(nextConfig);
