import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ready to XL - Your AI-Powered XLRI Preparation Companion',
  description: 'Get personalized guidance for XAT preparation, interview prep, waitlist support, final admission, and journey tracking for XLRI aspirants.',
  keywords: 'XLRI, XAT, MBA preparation, interview prep, waitlist, admission, AI chatbot',
  authors: [{ name: 'Ready to XL Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Ready to XL - Your AI-Powered XLRI Preparation Companion',
    description: 'Get personalized guidance for XAT preparation, interview prep, waitlist support, final admission, and journey tracking for XLRI aspirants.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ready to XL - Your AI-Powered XLRI Preparation Companion',
    description: 'Get personalized guidance for XAT preparation, interview prep, waitlist support, final admission, and journey tracking for XLRI aspirants.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
