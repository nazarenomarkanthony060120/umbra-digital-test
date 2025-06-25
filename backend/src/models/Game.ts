import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayer {
  name: string;
  wins: number;
  losses: number;
  draws: number;
}

export interface IGame extends Document {
  player1: IPlayer;
  player2: IPlayer;
  totalRounds: number;
  createdAt: Date;
  endedAt?: Date;
  isActive: boolean;
}

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 }
});

const GameSchema = new Schema<IGame>({
  player1: { type: PlayerSchema, required: true },
  player2: { type: PlayerSchema, required: true },
  totalRounds: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  isActive: { type: Boolean, default: true }
});

export const Game = mongoose.model<IGame>('Game', GameSchema); 