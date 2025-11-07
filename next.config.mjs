/** @type {import('next').NextConfig} */
// Use basePath only for production builds (GitHub Pages)
// For local development, set NEXT_PUBLIC_BASE_PATH='' or leave unset
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/portfolio' : '')

const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration for project page
  basePath: basePath,
  trailingSlash: true,
}

export default nextConfig
