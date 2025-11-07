import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to get asset path with basePath
// For GitHub Pages, basePath is '/portfolio' in production
// This works with Next.js static export where basePath is baked into the build
export function getAssetPath(path: string): string {
  // Get basePath from environment variable (set during build)
  // For static export, this is available at build time
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // If basePath is set and path doesn't already include it, prepend it
  if (basePath && !normalizedPath.startsWith(basePath)) {
    return `${basePath}${normalizedPath}`
  }
  
  return normalizedPath
}
