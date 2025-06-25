export interface Player {
  name: string;
  wins: number;
  losses: number;
  draws: number;
}

export interface Game {
  _id: string;
  player1: Player;
  player2: Player;
  totalRounds: number;
  createdAt: string;
  endedAt?: string;
  isActive: boolean;
}

export type GameResult = 'player1' | 'player2' | 'draw';

export interface GameState {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  winner: GameResult | null;
  isGameOver: boolean;
}

export interface NewGameData {
  player1Name: string;
  player2Name: string;
} 