interface GameHistoryHeaderProps {
  gameCount: number
  isLoading: boolean
}

export default function GameHistoryHeader({
  gameCount,
  isLoading,
}: GameHistoryHeaderProps) {
  return (
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
      📊 Game History
      {!isLoading && (
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({gameCount} games)
        </span>
      )}
    </h2>
  )
}
