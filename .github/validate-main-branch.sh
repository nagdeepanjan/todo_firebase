#!/bin/bash

# Script to validate that main is set up as the default branch
echo "🔍 Validating main branch setup..."

# Check if main branch exists locally
if git show-ref --verify --quiet refs/heads/main; then
    echo "✅ Local 'main' branch exists"
else
    echo "❌ Local 'main' branch does not exist"
    echo "   Run .github/setup-main-branch.sh to set up the main branch"
    exit 1
fi

# Check if we're currently on main
current_branch=$(git branch --show-current)
if [ "$current_branch" = "main" ]; then
    echo "✅ Currently on 'main' branch"
else
    echo "⚠️ Currently on '$current_branch' branch (not main)"
fi

# Check if main tracks origin/main
upstream=$(git rev-parse --abbrev-ref main@{upstream} 2>/dev/null)
if [ "$upstream" = "origin/main" ]; then
    echo "✅ Local 'main' branch tracks 'origin/main'"
else
    echo "⚠️ Local 'main' branch does not track 'origin/main'"
    echo "   Current upstream: ${upstream:-none}"
fi

# Check if remote HEAD points to main
remote_head=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null)
if [ "$remote_head" = "refs/remotes/origin/main" ]; then
    echo "✅ Remote HEAD points to 'main'"
else
    echo "⚠️ Remote HEAD does not point to 'main'"
    echo "   Current remote HEAD: ${remote_head:-none}"
fi

# Show current status
echo ""
echo "📊 Current repository status:"
echo "   Current branch: $(git branch --show-current)"
echo "   Remote URL: $(git remote get-url origin)"
echo "   Available branches:"
git branch -a | grep -E "(main|HEAD)" | head -5

echo ""
echo "🎯 To complete the setup:"
echo "   1. Set 'main' as default branch on GitHub (see .github/README.md)"
echo "   2. Run .github/setup-main-branch.sh to update local repository"
echo "   3. Run this script again to validate the setup"