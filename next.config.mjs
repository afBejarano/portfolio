/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration for project page
  basePath: '/portfolio',
  trailingSlash: true,
}

export default nextConfig
