'use client'

import { useRouter } from 'next/navigation'

interface ErrorStateProps {
  error?: Error | null
  onRetry: () => void
  title?: string
  message?: string
}

export default function ErrorState({
  error,
  onRetry,
  title = 'Game Not Found',
  message,
}: ErrorStateProps) {
  const router = useRouter()

  const displayMessage =
    message ||
    (error instanceof Error
      ? error.message
      : "The game you're looking for doesn't exist.")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{displayMessage}</p>
        <div className="space-x-4">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
