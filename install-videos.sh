#!/bin/bash

echo "========================================="
echo "Installing Git LFS to get video files"
echo "========================================="
echo ""

# Check if git-lfs is already installed
if command -v git-lfs &> /dev/null; then
    echo "✓ Git LFS is already installed"
    git lfs version
else
    echo "Git LFS is not installed. Please install it using one of these methods:"
    echo ""
    echo "Option 1 - Using Homebrew (recommended):"
    echo "  brew install git-lfs"
    echo ""
    echo "Option 2 - Manual installation:"
    echo "  Visit: https://git-lfs.github.com/"
    echo "  Or run: curl -s https://raw.githubusercontent.com/git-lfs/git-lfs/main/install.sh | bash"
    echo ""
    read -p "Press Enter after installing Git LFS, or Ctrl+C to cancel..."
fi

echo ""
echo "Initializing Git LFS..."
git lfs install

echo ""
echo "Pulling video files from Git LFS..."
git lfs pull

echo ""
echo "Checking video files..."
ls -lh public/*.{mp4,webm,mov} 2>/dev/null | head -5

echo ""
echo "========================================="
echo "Done! Restart your dev server to see videos."
echo "========================================="

