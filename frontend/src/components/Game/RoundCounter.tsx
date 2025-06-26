interface RoundCounterProps {
  totalRounds: number
}

export default function RoundCounter({ totalRounds }: RoundCounterProps) {
  return (
    <div className="text-center mt-8">
      <div className="bg-white rounded-lg p-3 inline-block shadow-md">
        <span className="text-gray-600">Round: </span>
        <span className="font-bold">{totalRounds + 1}</span>
      </div>
    </div>
  )
}
