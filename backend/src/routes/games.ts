import express, { Request, Response } from 'express';
import { Game, IGame } from '../models/Game';

const router = express.Router();

// Get all games (for home page)
router.get('/', async (req: Request, res: Response) => {
  try {
    const games = await Game.find().sort({ createdAt: -1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Create new game
router.post('/', async (req: Request, res: Response) => {
  try {
    const { player1Name, player2Name } = req.body;

    if (!player1Name || !player2Name) {
      return res.status(400).json({ error: 'Both player names are required' });
    }

    const newGame = new Game({
      player1: { name: player1Name, wins: 0, losses: 0, draws: 0 },
      player2: { name: player2Name, wins: 0, losses: 0, draws: 0 },
      totalRounds: 0,
      isActive: true
    });

    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Update game result after a round
router.put('/:id/round', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { winner } = req.body; // 'player1', 'player2', or 'draw'

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Update round results
    game.totalRounds += 1;

    if (winner === 'player1') {
      game.player1.wins += 1;
      game.player2.losses += 1;
    } else if (winner === 'player2') {
      game.player2.wins += 1;
      game.player1.losses += 1;
    } else if (winner === 'draw') {
      game.player1.draws += 1;
      game.player2.draws += 1;
    }

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update game' });
  }
});

// End game session
router.put('/:id/end', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    game.isActive = false;
    game.endedAt = new Date();

    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: 'Failed to end game' });
  }
});

// Get single game by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

export default router; 