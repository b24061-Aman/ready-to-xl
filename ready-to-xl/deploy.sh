#!/bin/bash

echo "🚀 Deploying Ready to XL to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Deploy to Vercel
echo "📦 Building and deploying..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app is now live on Vercel!"
