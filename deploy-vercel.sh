#!/bin/bash

# HelpPro Vercel Deployment Script
echo "🚀 HelpPro Vercel Deployment Script"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"
echo ""

# Navigate to project directory
cd "$(dirname "$0")"

# Check if already logged in
echo "🔐 Checking Vercel login status..."
if vercel whoami &> /dev/null
then
    echo "✅ Already logged in to Vercel"
else
    echo "📝 Please login to Vercel..."
    vercel login
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
echo "🚀 Deploying to Vercel..."
echo ""
echo "⚠️  IMPORTANT: After deployment, set environment variables:"
echo "   1. Go to your project on vercel.com"
echo "   2. Settings → Environment Variables"
echo "   3. Add:"
echo "      - VITE_SUPABASE_URL"
echo "      - VITE_SUPABASE_PUBLISHABLE_KEY"
echo "      - VITE_SUPABASE_PROJECT_ID"
echo "   4. Redeploy: vercel --prod"
echo ""

# Deploy to Vercel
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Configure environment variables on Vercel dashboard"
    echo "   2. Run: vercel --prod (to redeploy with env vars)"
    echo "   3. Test your live site!"
else
    echo "❌ Deployment failed. Check errors above."
    exit 1
fi
