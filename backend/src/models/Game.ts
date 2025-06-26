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
  isActive: boolean;
  createdAt: Date;
  endedAt?: Date;
}

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
});

const GameSchema = new Schema<IGame>({
  player1: { type: PlayerSchema, required: true },
  player2: { type: PlayerSchema, required: true },
  totalRounds: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
});

export const Game = mongoose.model<IGame>('Game', GameSchema);
