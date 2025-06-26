interface ErrorMessagesProps {
  updateError?: Error | null
  endGameError?: Error | null
}

export default function ErrorMessages({
  updateError,
  endGameError,
}: ErrorMessagesProps) {
  if (!updateError && !endGameError) return null

  return (
    <div className="mt-4 space-y-2">
      {updateError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
          <p className="text-red-700 text-sm">
            Failed to update game: {updateError.message}
          </p>
        </div>
      )}

      {endGameError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 max-w-md mx-auto">
          <p className="text-red-700 text-sm">
            Failed to end game: {endGameError.message}
          </p>
        </div>
      )}
    </div>
  )
}
