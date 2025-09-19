import dynamic from 'next/dynamic'
import Head from 'next/head'

// Dynamically import ChatInterface to avoid SSR issues
const ChatInterface = dynamic(() => import('@/components/ChatInterface'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-xlri-blue mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Ready to XL...</p>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Ready to XL - AI-Powered XLRI Preparation</title>
        <meta name="description" content="Your AI-powered companion for XLRI preparation across all stages" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen">
        <ChatInterface />
      </main>
    </>
  )
}
