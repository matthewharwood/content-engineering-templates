#!/bin/bash

# Build script for Deno Deploy
echo "Building Storybook..."

# Install Node if needed (Deno Deploy has it)
cd ui

# Install dependencies
npm ci

# Build Storybook
npm run build-storybook

echo "Storybook build complete!"