interface ActionButtonsProps {
  onCancel: () => void
  onSubmit: () => void
  isLoading: boolean
  isFormDisabled: boolean
  submitText?: string
  loadingText?: string
}

export default function ActionButtons({
  onCancel,
  onSubmit,
  isLoading,
  isFormDisabled,
  submitText = '🚀 Start Game',
  loadingText = 'Creating...',
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        disabled={isLoading}
      >
        Cancel
      </button>
      <button
        type="submit"
        onClick={onSubmit}
        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        disabled={isFormDisabled}
      >
        {isLoading ? (
          <>
            <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            {loadingText}
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  )
}
