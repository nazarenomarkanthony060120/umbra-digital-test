const instructions = [
  'Player 1 plays as X, Player 2 plays as O',
  'Take turns placing your symbol on the grid',
  'First to get 3 in a row wins!',
  'Play multiple rounds and track your wins',
]

export default function GameInstructions() {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-semibold text-blue-800 mb-2">How to play:</h3>
      <ul className="text-sm text-blue-700 space-y-1">
        {instructions.map((instruction, index) => (
          <li key={index}>• {instruction}</li>
        ))}
      </ul>
    </div>
  )
}
