#!/bin/bash

# HelpPro Netlify Deployment Script
echo "🚀 HelpPro Netlify Deployment Script"
echo "====================================="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI is ready"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if already logged in
echo "🔐 Checking Netlify login status..."
if netlify status &> /dev/null
then
    echo "✅ Already logged in to Netlify"
else
    echo "📝 Please login to Netlify..."
    netlify login
fi

echo ""
echo "📦 Building production files..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi

echo ""
echo "🚀 Deploying to Netlify..."
echo ""
echo "⚠️  IMPORTANT: After deployment, set environment variables:"
echo "   1. Go to your site on netlify.com"
echo "   2. Site settings → Environment variables"
echo "   3. Add:"
echo "      - VITE_SUPABASE_URL"
echo "      - VITE_SUPABASE_PUBLISHABLE_KEY"
echo "      - VITE_SUPABASE_PROJECT_ID"
echo "   4. Trigger redeploy from dashboard"
echo ""

# Deploy to Netlify
netlify deploy --prod --dir=dist

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Configure environment variables on Netlify dashboard"
    echo "   2. Trigger redeploy from dashboard"
    echo "   3. Test your live site!"
else
    echo "❌ Deployment failed. Check errors above."
    exit 1
fi
