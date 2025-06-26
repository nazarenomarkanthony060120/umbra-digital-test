export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Diagonals
]

export function checkWinner(board: (string | null)[]): string | null {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

export function isBoardFull(board: (string | null)[]): boolean {
  return board.every(cell => cell !== null)
}

export function isGameOver(board: (string | null)[]): boolean {
  return checkWinner(board) !== null || isBoardFull(board)
}

export function getGameResult(
  board: (string | null)[]
): 'player1' | 'player2' | 'draw' | null {
  const winner = checkWinner(board)

  if (winner === 'X') {
    return 'player1'
  } else if (winner === 'O') {
    return 'player2'
  } else if (isBoardFull(board)) {
    return 'draw'
  }

  return null
}

export function createEmptyBoard(): (string | null)[] {
  return Array(9).fill(null)
}

export function makeMove(
  board: (string | null)[],
  position: number,
  player: 'X' | 'O'
): (string | null)[] {
  if (board[position] !== null) {
    throw new Error('Position already occupied')
  }

  const newBoard = [...board]
  newBoard[position] = player
  return newBoard
}

export function getNextPlayer(currentPlayer: 'X' | 'O'): 'X' | 'O' {
  return currentPlayer === 'X' ? 'O' : 'X'
}
