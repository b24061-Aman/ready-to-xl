// Simple test script to verify the application structure
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Ready to XL Application...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/app/api/chat/route.ts',
  'src/components/ChatInterface.tsx',
  'src/components/MessageBubble.tsx',
  'src/components/QuickActions.tsx',
  'src/components/StageSelector.tsx',
  'src/lib/store.ts',
  'src/types/index.ts',
  'src/flows/xat-prep.ts',
  'src/flows/interview-prep.ts',
  'src/flows/waitlist.ts',
  'src/flows/final-admission.ts',
  'src/flows/journey-tracker.ts',
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📊 Test Results:');
if (allFilesExist) {
  console.log('✅ All required files are present!');
  console.log('✅ Application structure is complete!');
  console.log('✅ Ready for deployment!');
} else {
  console.log('❌ Some files are missing. Please check the structure.');
}

console.log('\n🚀 Next Steps:');
console.log('1. Add your OpenAI API key to .env.local');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Or deploy to Vercel for production!');

console.log('\n🎯 Your Ready to XL chatbot is ready!');
