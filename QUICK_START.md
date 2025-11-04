# Quick Start: Deploy to GitHub Pages

## Step 1: Initialize Git (if not done)

```bash
git init
git add .
git commit -m "Initial commit - Portfolio ready for GitHub Pages"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** check "Initialize this repository with a README"
5. Click "Create repository"

## Step 3: Push to GitHub

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save

## Step 5: Wait for Deployment

1. Go to **Actions** tab in your repository
2. Wait for the workflow to complete (2-3 minutes)
3. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Important Notes

- If your repository name is NOT `YOUR_USERNAME.github.io`, you need to update `next.config.mjs`:
  - Uncomment and set `basePath: '/YOUR_REPO_NAME'`
  - Uncomment `trailingSlash: true`

## Troubleshooting

- **Build fails?** Check the Actions tab for error messages
- **404 errors?** Make sure to set `basePath` if using a project repository
- **Images not loading?** Verify images are in the `public/` directory

