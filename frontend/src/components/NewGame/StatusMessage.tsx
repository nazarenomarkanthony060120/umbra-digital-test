interface StatusMessageProps {
  type: 'error' | 'success'
  message: string
}

export default function StatusMessage({ type, message }: StatusMessageProps) {
  const isError = type === 'error'

  return (
    <div
      className={`${
        isError
          ? 'bg-red-50 border-red-200 text-red-700'
          : 'bg-green-50 border-green-200 text-green-700'
      } border rounded-lg p-3`}
    >
      <p className="text-sm">{message}</p>
    </div>
  )
}
