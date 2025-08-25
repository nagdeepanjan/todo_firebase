#!/bin/bash

# Script to update local repository after setting main as default branch
# Run this script after changing the default branch to 'main' on GitHub

echo "🔄 Updating local repository to use 'main' as default branch..."

# Fetch latest changes from remote
echo "📥 Fetching latest changes..."
git fetch origin

# Check if main branch exists locally
if git show-ref --verify --quiet refs/heads/main; then
    echo "✅ Local 'main' branch exists"
else
    echo "🆕 Creating local 'main' branch..."
    git checkout -b main origin/main
fi

# Set remote HEAD to point to main
echo "🎯 Setting remote HEAD to main..."
git remote set-head origin main

# Switch to main branch
echo "🔀 Switching to main branch..."
git checkout main

# Set up tracking for main branch
echo "🔗 Setting up branch tracking..."
git branch -u origin/main main

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