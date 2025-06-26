interface ErrorStateProps {
  error: Error | null
  onRetry: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-red-700 font-medium mb-2">Failed to load games</p>
        <p className="text-red-600 text-sm">
          {error instanceof Error ? error.message : 'An error occurred'}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  )
}
