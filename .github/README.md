# GitHub Configuration

This directory contains GitHub-specific configuration files for the repository.

## Default Branch Configuration

To set `main` as the default branch for this repository, follow these steps:

### Option 1: Through GitHub Web Interface (Recommended)

1. Go to your repository on GitHub: `https://github.com/nagdeepanjan/todo_firebase`
2. Click on **Settings** tab
3. In the left sidebar, click on **General**
4. Scroll down to the **Default branch** section
5. Click the pencil icon next to the current default branch
6. Select `main` from the dropdown
7. Click **Update** and confirm the change

### Option 2: Using GitHub CLI

If you have GitHub CLI installed:

```bash
gh repo edit nagdeepanjan/todo_firebase --default-branch main
```

### Option 3: Using Git Commands (Local Setup)

After changing the default branch on GitHub, update your local repository:

```bash
# Fetch the latest changes
git fetch origin

# Set the remote HEAD to point to main
git remote set-head origin main

# Switch to main branch locally
git checkout main

# Set main as your default local branch
git config branch.main.remote origin
git config branch.main.merge refs/heads/main
```

## Post-Change Cleanup

After setting `main` as the default branch, you may want to:

1. **Update any CI/CD pipelines** that reference the old default branch
2. **Update branch protection rules** to apply to `main` instead of the previous default
3. **Update documentation** that references the old default branch
4. **Notify collaborators** about the branch change

## Branch Protection (Optional)

Consider setting up branch protection rules for the `main` branch:

1. Go to **Settings** → **Branches**
2. Click **Add rule**
3. Enter `main` as the branch name pattern
4. Configure protection settings as needed:
   - Require pull request reviews
   - Require status checks
   - Restrict pushes to matching branches
   - Require linear history