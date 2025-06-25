interface TicTacToeBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
  winningCells?: number[];
}

export default function TicTacToeBoard({
  board,
  onCellClick,
  disabled = false,
  winningCells = [],
}: TicTacToeBoardProps) {
  const getCellClassName = (index: number) => {
    const baseClasses = `
      w-24 h-24 border-2 border-gray-400 rounded-lg 
      flex items-center justify-center text-4xl font-bold 
      transition-all duration-200 cursor-pointer
      hover:bg-gray-50 hover:scale-105
      active:scale-95
    `.trim();

    const disabledClasses =
      disabled || board[index] !== null ? "cursor-not-allowed opacity-60" : "";
    const winningClasses = winningCells.includes(index)
      ? "bg-green-100 border-green-400"
      : "";

    return `${baseClasses} ${disabledClasses} ${winningClasses}`;
  };

  const getCellContent = (index: number) => {
    const value = board[index];
    if (value === "X") {
      return <span className="text-blue-600">❌</span>;
    } else if (value === "O") {
      return <span className="text-red-600">⭕</span>;
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (disabled || board[index] !== null) return;
    onCellClick(index);
  };

  return (
    <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto p-4 bg-white rounded-xl shadow-lg">
      {board.map((_, index) => (
        <button
          key={index}
          className={getCellClassName(index)}
          onClick={() => handleCellClick(index)}
          disabled={disabled || board[index] !== null}
          aria-label={`Cell ${index + 1}, ${board[index] || "empty"}`}
        >
          {getCellContent(index)}
        </button>
      ))}
    </div>
  );
}
