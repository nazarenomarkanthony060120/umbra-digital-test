# 🎮 Full-Stack Tic-Tac-Toe Game

A modern, enterprise-grade full-stack Tic-Tac-Toe game built with **Next.js 14**, **Express.js**, and **MongoDB**. Features component-based architecture, persistent game sessions, real-time gameplay, and beautiful UI with optional state management.

![Tic-Tac-Toe Demo](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green) ![React Query](https://img.shields.io/badge/React%20Query-5.0-red) ![Zustand](https://img.shields.io/badge/Zustand-4.0-orange)

## ✨ Features

### 🎯 Core Gameplay

- **Interactive Tic-Tac-Toe Board** - Click to place X or O with smooth animations
- **Win Detection** - Automatic winner detection with visual highlights
- **Draw Detection** - Handles tie games gracefully
- **Multi-Round Sessions** - Play multiple rounds and track comprehensive scores

### 📊 Game Management

- **Persistent Sessions** - Games saved to MongoDB with full history
- **Player Statistics** - Track wins, losses, draws, and performance metrics
- **Game History** - View all previous games with detailed information
- **Resume Games** - Continue active game sessions seamlessly
- **Real-time Updates** - Live score updates and game state synchronization

### 🎨 Modern UI/UX

- **Component-Based Architecture** - Modular, reusable React components
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Beautiful Animations** - Smooth transitions and hover effects
- **Loading States** - Professional loading indicators and skeletons
- **Error Handling** - User-friendly error messages with recovery options
- **Accessibility** - WCAG compliant design patterns

### 🚀 Advanced Technical Features

- **React Query Integration** - Advanced data fetching, caching, and synchronization
- **Zustand State Management** - Optional lightweight state management
- **Type Safety** - Full TypeScript implementation across the stack
- **API Validation** - Comprehensive input validation and sanitization
- **Error Recovery** - Robust error handling with automatic retry mechanisms
- **Development Tools** - React Query DevTools and Zustand DevTools integration
- **Performance Optimization** - Code splitting, lazy loading, and caching strategies

## 🏗️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router and Server Components
- **TypeScript** - Type-safe JavaScript with strict mode
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **TanStack React Query** - Powerful data fetching, caching, and synchronization
- **Axios** - HTTP client with interceptors and error handling
- **Zustand** - Lightweight state management (optional)

### Backend

- **Express.js** - Fast, unopinionated Node.js web framework
- **MongoDB** - Flexible document database with Mongoose ODM
- **Mongoose** - Elegant MongoDB object modeling with validation
- **TypeScript** - Type-safe server-side development
- **CORS** - Configurable cross-origin resource sharing
- **Helmet** - Security middleware for Express applications

### Architecture & Patterns

- **MVC Pattern** - Clean separation of concerns with controllers, services, and models
- **Component Architecture** - Modular, reusable React components
- **Custom Hooks** - Reusable logic with React hooks
- **RESTful API** - Standard HTTP methods and status codes
- **Error Middleware** - Centralized error handling and logging
- **Request Validation** - Input sanitization and validation middleware
- **Structured Logging** - Comprehensive request/response logging

## 🧩 Component Architecture

### Frontend Components Structure

```
frontend/src/components/
├── Home/                      # Home page components
│   ├── PageHeader.tsx         # Main title and CTA
│   ├── GameHistoryHeader.tsx  # Section header with count
│   ├── LoadingState.tsx       # Loading spinner
│   ├── ErrorState.tsx         # Error display with retry
│   ├── EmptyState.tsx         # No games message
│   ├── GameTable.tsx          # Complete games table
│   ├── GameTableHeader.tsx    # Table column headers
│   ├── GameTableRow.tsx       # Individual game row
│   ├── GameHistorySection.tsx # Main history section
│   └── index.ts               # Clean exports
├── NewGame/                   # New game page components
│   ├── PageHeader.tsx         # Page title
│   ├── PlayerInput.tsx        # Reusable input field
│   ├── StatusMessage.tsx      # Error/success messages
│   ├── ActionButtons.tsx      # Cancel/submit buttons
│   ├── GameInstructions.tsx   # How to play section
│   ├── NewGameForm.tsx        # Main form logic
│   └── index.ts               # Clean exports
├── Game/                      # Game page components
│   ├── GameHeader.tsx         # Game title & players
│   ├── PlayerStats.tsx        # Win/loss/draw stats
│   ├── GameStatus.tsx         # Current turn/game over
│   ├── GameActions.tsx        # Continue/End buttons
│   ├── ErrorMessages.tsx      # Mutation error display
│   ├── RoundCounter.tsx       # Current round display
│   ├── LoadingState.tsx       # Loading screen
│   ├── ErrorState.tsx         # Error screen with retry
│   ├── GameBoard.tsx          # Main game logic
│   ├── GameBoardWithZustand.tsx # Zustand example
│   └── index.ts               # Clean exports
└── TicTacToeBoard.tsx         # Core game board component
```

### Benefits of Component Architecture

✅ **Single Responsibility** - Each component has one clear purpose
✅ **Reusability** - Components can be used across different pages
✅ **Testability** - Easy to unit test individual components
✅ **Maintainability** - Changes are isolated and predictable
✅ **Type Safety** - Proper TypeScript interfaces for all props
✅ **Performance** - Smaller components enable better optimization

## 🗄️ State Management Options

### React Query (Primary)

Used for **server state management**:

- Data fetching and caching
- Background refetching
- Optimistic updates
- Error handling and retry logic
- Loading states

### Zustand (Optional)

Available for **client state management**:

```typescript
// Game state with persistence
const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentGame: null,
      gameHistory: [],
      // ... game logic
    }),
    { name: "game-storage" }
  )
);

// UI state for global app state
const useUIStore = create<UIState>()((set) => ({
  isLoading: false,
  notifications: [],
  theme: "light",
  // ... UI logic
}));
```

### When to Use Each:

- **React Query**: API calls, server data, caching
- **Zustand**: Client-side state, preferences, UI state
- **Local State**: Component-specific state with `useState`

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd umbra-digital-test
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

Create environment files:

**Backend** (`backend/.env`):

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tictactoe
```

**Frontend** (`frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

### 5. Run the Application

**Option A: Run Both Servers Separately**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Option B: Use Concurrent Script (if available)**

```bash
# From root directory
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health
- **React Query DevTools**: Available in development mode

## 📁 Project Structure

```
umbra-digital-test/
├── backend/                    # Express.js backend
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers (MVC)
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── errorHandler.ts # Global error handling
│   │   │   ├── logger.ts      # Request logging
│   │   │   └── validation.ts  # Input validation
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # Utility functions
│   │   └── server.ts         # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # Modular React components
│   │   │   ├── Home/         # Home page components
│   │   │   ├── NewGame/      # New game components
│   │   │   └── Game/         # Game page components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # API client with Axios
│   │   ├── providers/        # Context providers
│   │   ├── stores/           # Zustand stores (optional)
│   │   ├── types/            # TypeScript interfaces
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔌 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| `GET`  | `/health`          | Health check with system info  |
| `GET`  | `/games`           | Get all games with pagination  |
| `POST` | `/games`           | Create new game session        |
| `GET`  | `/games/:id`       | Get game by ID with validation |
| `PUT`  | `/games/:id/round` | Update game round with result  |
| `PUT`  | `/games/:id/end`   | End game session               |

### API Response Format

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Success message",
  "count": 10 // (for list endpoints)
}
```

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details",
  "stack": "Error stack trace" // (development only)
}
```

## 🎮 How to Play

1. **Start New Game**

   - Click "🚀 Start New Game" on the home page
   - Enter names for Player 1 (X) and Player 2 (O)
   - Names must be 2-20 characters and different from each other
   - Click "Start Game"

2. **Gameplay**

   - Players take turns clicking empty cells
   - Current player is highlighted in the game status
   - First player to get 3 in a row (horizontal, vertical, or diagonal) wins
   - Game automatically detects wins, losses, and draws

3. **Multiple Rounds**

   - After each round, view updated statistics
   - Choose "Continue Playing" for another round
   - Or click "End Game" to finish the session
   - Scores are tracked across all rounds in the session

4. **Game History**
   - View all previous games on the home page with detailed stats
   - Click on any game row to resume active games
   - See win/loss/draw counts for each player
   - Games show creation date and current status

## 🛠️ Development

### Available Scripts

**Backend:**

```bash
npm run dev          # Start development server with hot reload
npm run dev:watch    # Start with nodemon for file watching
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run test suite (if configured)
```

**Frontend:**

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint with type checking
npm run type-check   # Run TypeScript compiler check
```

### Code Quality & Standards

- **TypeScript Strict Mode** - Full type safety with strict compiler options
- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Consistent code formatting (if configured)
- **Component Standards** - Consistent naming and structure patterns
- **Error Boundaries** - React error boundaries for graceful error handling

### Development Tools

- **React Query DevTools** - Available in development mode for debugging queries
- **Zustand DevTools** - Browser extension for state debugging
- **MongoDB Compass** - GUI for database management and queries
- **Postman/Insomnia** - API testing and documentation
- **TypeScript Language Server** - Enhanced IDE support

### Performance Optimizations

- **Code Splitting** - Automatic code splitting with Next.js
- **Image Optimization** - Next.js Image component for optimized images
- **Caching Strategies** - React Query caching with background refetching
- **Component Memoization** - Strategic use of React.memo and useMemo
- **Bundle Analysis** - Webpack bundle analyzer for optimization

## 🔧 Configuration

### Environment Variables

**Backend:**

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

**Frontend:**

- `NEXT_PUBLIC_API_URL` - Backend API URL for client-side requests

### Database Schema

**Game Model:**

```typescript
interface Game {
  _id: ObjectId;
  player1: {
    name: string;
    wins: number;
    losses: number;
    draws: number;
  };
  player2: {
    name: string;
    wins: number;
    losses: number;
    draws: number;
  };
  totalRounds: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

## 🚨 Troubleshooting

### Common Issues

**Backend won't start:**

- ✅ Check if MongoDB is running: `mongod --version`
- ✅ Verify `MONGODB_URI` in `.env` file
- ✅ Ensure port 5000 is not in use: `lsof -i :5000`
- ✅ Check for TypeScript compilation errors

**Frontend can't connect to backend:**

- ✅ Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Check if backend server is running on correct port
- ✅ Check browser console for CORS errors
- ✅ Verify API endpoints are responding: `curl http://localhost:5000/api/health`

**Database connection issues:**

- ✅ Verify MongoDB is running and accessible
- ✅ Test connection string in MongoDB Compass
- ✅ Check firewall settings and network connectivity
- ✅ Verify database permissions and authentication

**Component/Import errors:**

- ✅ Check file paths and component exports
- ✅ Verify TypeScript compilation: `npm run type-check`
- ✅ Clear Next.js cache: `rm -rf .next`
- ✅ Restart development server

**Game ID/State errors:**

- ✅ Clear browser cache and localStorage
- ✅ Check browser console for API errors
- ✅ Verify game exists in database
- ✅ Check React Query cache in DevTools

### Debug Mode

Enable comprehensive logging:

```env
NODE_ENV=development
DEBUG=app:*
```

### Performance Issues

- ✅ Check React Query DevTools for unnecessary refetches
- ✅ Monitor component re-renders with React DevTools
- ✅ Analyze bundle size with `npm run build`
- ✅ Check database query performance

## 🧪 Testing

### Testing Strategy

- **Unit Tests** - Individual component and function testing
- **Integration Tests** - API endpoint and database testing
- **E2E Tests** - Full user journey testing
- **Type Tests** - TypeScript type checking

### Test Structure

```
tests/
├── components/        # Component unit tests
├── hooks/            # Custom hook tests
├── api/              # API integration tests
├── utils/            # Utility function tests
└── e2e/              # End-to-end tests
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow component architecture patterns**
4. **Add TypeScript types for all new code**
5. **Test your changes thoroughly**
6. **Commit with descriptive messages**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request with detailed description**

### Code Standards

- Follow existing component architecture patterns
- Use TypeScript for all new code
- Implement proper error handling
- Add JSDoc comments for complex functions
- Follow naming conventions (PascalCase for components, camelCase for functions)

### Pull Request Guidelines

- Include screenshots for UI changes
- Update documentation if needed
- Ensure all tests pass
- Add tests for new features
- Keep PRs focused and atomic

## 📈 Future Enhancements

### Planned Features

- **Real-time Multiplayer** - Socket.io integration for live gameplay
- **User Authentication** - Login/register with JWT
- **Tournaments** - Multi-player tournament brackets
- **AI Opponent** - Computer player with difficulty levels
- **Game Replays** - Step-by-step game replay functionality
- **Statistics Dashboard** - Advanced analytics and charts
- **Mobile App** - React Native mobile application
- **PWA Features** - Offline support and push notifications

### Technical Improvements

- **Microservices** - Split backend into smaller services
- **GraphQL** - Replace REST API with GraphQL
- **Redis Caching** - Add Redis for session and game caching
- **Docker** - Containerization for easy deployment
- **CI/CD Pipeline** - Automated testing and deployment
- **Monitoring** - Application performance monitoring
- **Load Testing** - Performance testing under load

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the incredible React framework and developer experience
- **TanStack** - For React Query's powerful data fetching capabilities
- **MongoDB** - For the flexible and scalable document database
- **Tailwind CSS** - For the utility-first CSS framework
- **Zustand** - For the lightweight and flexible state management
- **TypeScript Team** - For bringing type safety to JavaScript
- **Open Source Community** - For the amazing tools and libraries

---

**Built with ❤️ using modern web technologies and best practices**

_This project demonstrates enterprise-level full-stack development with React, Node.js, and MongoDB, featuring component architecture, advanced state management, and comprehensive error handling._
