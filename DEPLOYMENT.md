# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Step-by-Step Instructions

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `portfolio` or `my-portfolio`)
5. Choose Public or Private (Public is required for free GitHub Pages)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### 3. Connect Local Repository to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

### 5. Deploy

The GitHub Actions workflow will automatically:
- Build your Next.js static export
- Deploy to GitHub Pages
- Update automatically on every push to `main` branch

### 6. Access Your Site

After the workflow completes (usually 2-3 minutes), your site will be available at:
- `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

If you're using a project page (repository name in URL), you may need to update `next.config.mjs`:

```javascript
basePath: '/YOUR_REPO_NAME',
trailingSlash: true,
```

## Manual Deployment

If you want to deploy manually:

```bash
npm run build
# The output will be in the /out directory
# You can manually upload this to GitHub Pages
```

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (20.x)

### Images not loading
- Make sure images are in the `public/` directory
- Verify image paths are correct (should start with `/`)

### 404 errors
- If using a project page (not user/organization page), uncomment `basePath` in `next.config.mjs`
- Ensure `.nojekyll` file exists (it's already created)

### Workflow not running
- Check that GitHub Pages is set to use "GitHub Actions" as source
- Verify the workflow file is in `.github/workflows/deploy.yml`
- Check Actions tab for any error messages

## Updating Your Site

Simply push changes to the `main` branch:

```bash
git add .
git commit -m "Update portfolio"
git push
```

The workflow will automatically rebuild and redeploy your site.

