# 🚀 Ready to XL - Deployment Guide

## Quick Deployment to Vercel

### Step 1: Prepare Your Repository
```bash
# Navigate to the project directory
cd /Users/akanshasharma/ready-to-xl

# Initialize git repository
git init
git add .
git commit -m "Initial commit: Ready to XL - AI-powered XLRI preparation chatbot"

# Create a new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/ready-to-xl.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import your GitHub repository** (`ready-to-xl`)
5. **Configure Environment Variables:**
   - Click on "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your_openai_api_key_here`
6. **Click "Deploy"**

### Step 3: Get Your Live URL
- Vercel will provide you with a live URL like: `https://ready-to-xl-xxx.vercel.app`
- Your app will be live in 2-3 minutes!

## Alternative: Manual Deployment

### Prerequisites
- Node.js 18+ installed
- OpenAI API key

### Steps
```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local and add your OpenAI API key

# Build the application
npm run build

# Start the production server
npm start
```

## Environment Variables Required

Create a `.env.local` file with:
```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_NAME=Ready to XL
NEXT_PUBLIC_APP_DESCRIPTION=Your AI-powered XLRI preparation companion
```

## Features Included

✅ **5 AI-Powered Stages:**
- XAT Preparation
- Interview Preparation  
- Waitlist Support
- Final Admission
- Journey Tracker

✅ **Modern UI/UX:**
- Responsive design
- Smooth animations
- XLRI color scheme
- Mobile-optimized

✅ **Advanced Features:**
- GPT-4 powered responses
- Stage-specific expertise
- Flow switching
- Progress tracking
- Error handling
- Local storage

## Testing Checklist

- [ ] All 5 stages load correctly
- [ ] Stage switching works
- [ ] Chat interface responds
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] Loading states
- [ ] Animations work smoothly

## Support

If you encounter any issues:
1. Check your OpenAI API key
2. Ensure all dependencies are installed
3. Check the browser console for errors
4. Verify environment variables are set

---

**Your Ready to XL chatbot is ready to help XLRI aspirants! 🎓**
