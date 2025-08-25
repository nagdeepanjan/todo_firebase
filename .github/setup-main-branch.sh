#!/bin/bash

# Script to update local repository after setting main as default branch
# Run this script after changing the default branch to 'main' on GitHub

echo "🔄 Updating local repository to use 'main' as default branch..."

# Fetch latest changes from remote
echo "📥 Fetching latest changes..."
if ! git fetch origin; then
    echo "❌ Failed to fetch from remote. Please check your connection and try again."
    exit 1
fi

# Check if main branch exists on remote
if ! git ls-remote --exit-code --heads origin main >/dev/null 2>&1; then
    echo "❌ 'main' branch does not exist on remote. Please ensure:"
    echo "   1. The 'main' branch exists on GitHub"
    echo "   2. You have set 'main' as the default branch in GitHub settings"
    exit 1
fi

# Check if main branch exists locally
if git show-ref --verify --quiet refs/heads/main; then
    echo "✅ Local 'main' branch exists"
    # Switch to main branch
    echo "🔀 Switching to main branch..."
    git checkout main
    # Pull latest changes
    echo "⬇️ Pulling latest changes..."
    git pull origin main
else
    echo "🆕 Creating local 'main' branch..."
    if ! git checkout -b main origin/main; then
        echo "❌ Failed to create local 'main' branch"
        exit 1
    fi
fi

# Set remote HEAD to point to main
echo "🎯 Setting remote HEAD to main..."
if ! git remote set-head origin main; then
    echo "⚠️ Could not set remote HEAD (this is usually not critical)"
fi

# Set up tracking for main branch
echo "🔗 Setting up branch tracking..."
if ! git branch -u origin/main main; then
    echo "⚠️ Could not set up branch tracking (this is usually not critical)"
fi

# Update local configuration
echo "⚙️ Updating local git configuration..."
git config branch.main.remote origin
git config branch.main.merge refs/heads/main

echo ""
echo "✅ Setup complete! Your local repository now uses 'main' as the default branch."
echo ""
echo "📋 Summary of changes:"
echo "   • Remote HEAD now points to 'main'"
echo "   • Local branch 'main' tracks 'origin/main'"
echo "   • Currently on 'main' branch"
echo ""
echo "🚀 You can now continue development on the 'main' branch."

# Show current branch status
echo ""
echo "📊 Current branch status:"
git branch -vv