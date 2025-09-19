# Ready to XL - AI-Powered XLRI Preparation Companion

A comprehensive GPT-powered chatbot web application designed to help XLRI aspirants across 5 key stages of their MBA journey.

## Features

### 🎯 5 Key Stages
- **XAT Preparation**: Master the Xavier Aptitude Test with personalized guidance
- **Interview Preparation**: Ace PI, GD, WAT, and case studies
- **Waitlist Support**: Navigate the waitlist process with expert advice
- **Final Admission**: Onboard to XLRI successfully
- **Journey Tracker**: Track progress and achieve your goals

### 🤖 AI-Powered
- GPT-4 powered responses with stage-specific expertise
- Contextual conversations based on user's current stage
- Intelligent flow switching between stages
- Personalized guidance and recommendations

### 💻 Modern Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Zustand with persistence
- **AI Integration**: OpenAI GPT-4 API
- **Deployment**: Vercel-ready configuration

### 🎨 XLRI-Themed UI
- Clean, aspirant-friendly interface
- XLRI color scheme (blue, white, gold)
- Responsive design for all devices
- Intuitive stage switching

## Quick Start

### Prerequisites
- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ready-to-xl
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your OpenAI API key in Vercel environment variables
4. Deploy!

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
NEXT_PUBLIC_APP_NAME=Ready to XL
NEXT_PUBLIC_APP_DESCRIPTION=Your AI-powered XLRI preparation companion
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/chat/          # OpenAI API integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── MessageBubble.tsx  # Message display component
│   ├── QuickActions.tsx   # Quick action buttons
│   └── StageSelector.tsx  # Stage selection component
├── flows/                 # Stage-specific flow modules
│   ├── xat-prep.ts       # XAT preparation flow
│   ├── interview-prep.ts  # Interview preparation flow
│   ├── waitlist.ts       # Waitlist support flow
│   ├── final-admission.ts # Final admission flow
│   └── journey-tracker.ts # Journey tracking flow
├── lib/                   # Utility libraries
│   ├── store.ts          # Zustand store
│   ├── errorHandler.ts   # Error handling utilities
│   └── localStorage.ts   # Local storage utilities
└── types/                 # TypeScript type definitions
    └── index.ts          # Main type definitions
```

## Key Features Explained

### Stage-Specific Flows
Each stage has its own flow module with:
- Specialized prompts for GPT-4
- Stage-specific questions and guidance
- Contextual conversation flows
- Progress tracking

### State Management
- Zustand store for global state
- Persistent storage with localStorage
- Progress tracking across stages
- User preference management

### Error Handling
- Comprehensive error handling for API calls
- User-friendly error messages
- Retry mechanisms for transient errors
- Graceful degradation

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- XLRI brand colors and typography
- Accessible interface design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Ready to XL** - Your AI-powered companion for the XLRI journey! 🚀
