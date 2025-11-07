# GitHub Pages Deployment Checklist

## ✅ Already Configured:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Next.js static export configuration
- ✅ `.nojekyll` file (prevents Jekyll processing)
- ✅ Build script in `package.json`
- ✅ BasePath configuration for project pages

## 🔧 Steps You Need to Complete:

### 1. Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for GitHub Pages"
git push -u origin main
```

### 2. Enable GitHub Pages (IMPORTANT!)
1. Go to your repository on GitHub: `https://github.com/afBejarano/portfolio`
2. Click **Settings** (top menu)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select: **GitHub Actions** (NOT "Deploy from a branch")
5. Click **Save**

### 3. Verify Repository is Public
- GitHub Pages free tier requires public repositories
- If your repo is private, you'll need GitHub Pro or make it public

### 4. Wait for Deployment
- Go to the **Actions** tab in your repository
- You should see "Deploy to GitHub Pages" workflow running
- Wait 2-3 minutes for it to complete
- Check for any errors in the workflow logs

### 5. Access Your Site
After deployment completes, your site will be available at:
- `https://afbejarano.github.io/portfolio/`

## 🔍 Troubleshooting:

### Workflow Not Running?
- Check that GitHub Pages source is set to **GitHub Actions** (not a branch)
- Verify the workflow file exists at `.github/workflows/deploy.yml`
- Check the Actions tab for any error messages

### 404 Errors?
- Verify `basePath: '/portfolio'` matches your repository name in `next.config.mjs`
- Make sure `trailingSlash: true` is set
- Check that the build completed successfully in Actions

### Build Fails?
- Check Actions tab for specific error messages
- Verify Node.js version (should be 20)
- Ensure all dependencies are in `package.json`

### Images/Assets Not Loading?
- Verify assets are in the `public/` directory
- Check that paths start with `/` (not relative paths)
- Clear browser cache and try again

## 📝 Notes:
- The workflow automatically runs on every push to `main` branch
- You can also manually trigger it from the Actions tab
- First deployment may take longer (3-5 minutes)
- Subsequent deployments are usually faster (2-3 minutes)

