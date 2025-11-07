# Push Instructions for GitHub Pages

Your code is ready! You just need to push it to GitHub. Here are your options:

## Option 1: Push via Command Line (with GitHub CLI or Personal Access Token)

### Using GitHub CLI (if installed):
```bash
gh auth login
git push -u origin main
```

### Using Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Create a new token with `workflow` and `repo` scopes
3. When prompted for password, use the token instead

```bash
git push -u origin main
# Username: afBejarano
# Password: [paste your token]
```

## Option 2: Push via GitHub Desktop

1. Download GitHub Desktop from https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select `/Users/andsnake/Downloads/code`
5. Click "Publish repository" or "Push origin"

## Option 3: Push via VS Code

1. Open the project in VS Code
2. Click the Source Control icon (left sidebar)
3. Click "..." → "Push"
4. Sign in with GitHub when prompted

## After Pushing:

1. **Go to your repository**: https://github.com/afBejarano/portfolio
2. **Click Settings** (top menu)
3. **Scroll to Pages** (left sidebar)
4. **Under Source**, select: **GitHub Actions**
5. **Save**

The workflow will automatically:
- Build your Next.js site
- Deploy to GitHub Pages
- Your site will be live at: **https://afbejarano.github.io/portfolio/**

## Important Notes:

- The `basePath: '/portfolio'` is already configured in `next.config.mjs`
- The workflow file is ready in `.github/workflows/deploy.yml`
- All files are committed and ready to push


