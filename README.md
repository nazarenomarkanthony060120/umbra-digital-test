# Tic-Tac-Toe Game

A full-stack Tic-Tac-Toe game built with Next.js + TypeScript + Tailwind CSS for the frontend and Express.js + MongoDB for the backend.

## Features

### 🏠 Home Page

- Display list of all previous game sessions
- Shows player names, results, scores, and game statistics
- "Start New Game" button to initiate new sessions

### 🎮 New Game Session

- Input fields for Player 1 and Player 2 names
- Validation to ensure different names
- Beautiful, responsive UI

### 🎯 Gameplay

- Classic 3x3 Tic-Tac-Toe grid
- Real-time turn indicators
- Visual feedback for wins (highlighting winning cells)
- Round-by-round score tracking
- Win/Loss/Draw statistics for both players

### 📊 Game Management

- Continue playing multiple rounds
- Stop and save game session anytime
- Persistent game data storage
- Game history tracking

## Tech Stack

### Frontend

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

### Backend

- **Express.js** - Web server
- **MongoDB** - Database
- **Mongoose** - ODM
- **TypeScript** - Type safety

## Project Structure

```
umbra-digital-test/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── new-game/
│   │   │   │   └── page.tsx       # New game setup
│   │   │   └── game/
│   │   │       └── [id]/
│   │   │           └── page.tsx   # Game play page
│   │   ├── components/
│   │   │   └── TicTacToeBoard.tsx # Game board component
│   │   ├── types/
│   │   │   └── game.ts            # TypeScript definitions
│   │   ├── lib/
│   │   │   └── api.ts             # API utilities
│   │   └── utils/
│   │       └── gameLogic.ts       # Game logic utilities
│   └── package.json
└── backend/
    ├── src/
    │   ├── models/
    │   │   └── Game.ts             # Game data model
    │   ├── routes/
    │   │   └── games.ts            # API routes
    │   ├── config/
    │   │   └── database.ts         # Database connection
    │   └── server.ts               # Express server
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tic-tac-toe
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**

   - **Local MongoDB:** Make sure MongoDB is running on your system
   - **MongoDB Atlas:** Update `MONGODB_URI` with your Atlas connection string

5. **Run the backend server:**
   ```bash
   npm run dev
   ```
   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   Create a `.env.local` file in the frontend directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the frontend development server:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

## API Endpoints

### Games API (`/api/games`)

- **GET `/`** - Get all games
- **POST `/`** - Create new game
  ```json
  {
    "player1Name": "Alice",
    "player2Name": "Bob"
  }
  ```
- **GET `/:id`** - Get single game by ID
- **PUT `/:id/round`** - Update game result after round
  ```json
  {
    "winner": "player1" | "player2" | "draw"
  }
  ```
- **PUT `/:id/end`** - End game session

### Health Check

- **GET `/api/health`** - Server health check

## Game Rules

1. **Players:** Two players take turns (Player 1 = X, Player 2 = O)
2. **Objective:** Get three of your symbols in a row (horizontally, vertically, or diagonally)
3. **Rounds:** Play multiple rounds in a single game session
4. **Scoring:** Track wins, losses, and draws for each player
5. **Session:** Continue playing or stop to save the game session

## Development

### Running in Development

1. **Start the backend:**

   ```bash
   cd backend && npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd frontend && npm run dev
   ```

### Building for Production

1. **Build the backend:**

   ```bash
   cd backend && npm run build
   ```

2. **Build the frontend:**
   ```bash
   cd frontend && npm run build
   ```

### Starting Production Servers

1. **Start the backend:**

   ```bash
   cd backend && npm start
   ```

2. **Start the frontend:**
   ```bash
   cd frontend && npm start
   ```

## Usage

1. **Home Page:** View game history and click "Start New Game"
2. **New Game:** Enter player names and click "Start Game"
3. **Gameplay:** Take turns clicking on the grid cells
4. **After each round:** Choose "Continue" for another round or "Stop" to end the session
5. **Game ends:** Session is saved and you return to the home page

## Features Highlights

- 🎯 **Interactive Gameplay:** Smooth, responsive game board with visual feedback
- 📊 **Statistics Tracking:** Comprehensive win/loss/draw tracking
- 💾 **Data Persistence:** All games saved to MongoDB
- 🎨 **Modern UI:** Beautiful, gradient backgrounds with card-based layouts
- 📱 **Responsive Design:** Works on desktop and mobile devices
- ⚡ **Real-time Updates:** Instant score updates after each round
- 🚦 **Error Handling:** Graceful error handling with user-friendly messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is for educational/demonstration purposes.
