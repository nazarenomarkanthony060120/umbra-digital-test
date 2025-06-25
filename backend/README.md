# Tic-Tac-Toe Backend API

A RESTful API built with Express.js, TypeScript, and MongoDB following MVC architecture and Node.js best practices.

## 🏗️ Architecture Overview

This backend follows the **Model-View-Controller (MVC)** pattern with proper separation of concerns:

```
src/
├── config/          # Configuration files
│   └── database.ts  # MongoDB connection setup
├── controllers/     # Route handlers (Controller layer)
│   └── gameController.ts
├── models/          # Data models (Model layer)
│   └── Game.ts
├── routes/          # API routes definition
│   └── games.ts
├── services/        # Business logic layer
│   └── gameService.ts
├── middleware/      # Custom middleware
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── validation.ts
├── utils/           # Utility functions
│   └── ApiError.ts
└── server.ts        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Configure the following variables:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/tictactoe
   ```

3. **Start the server:**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📡 API Endpoints

### Health Check

- **GET** `/health` - Server health status

### Games API

- **GET** `/api/games` - Get all games
- **POST** `/api/games` - Create a new game
- **GET** `/api/games/:id` - Get a specific game
- **PUT** `/api/games/:id/round` - Update game round result
- **PUT** `/api/games/:id/end` - End a game session

## 🏛️ Architecture Components

### Controllers (`/controllers`)

Handle HTTP requests and responses. Controllers are responsible for:

- Extracting data from requests
- Calling appropriate services
- Returning properly formatted responses
- Error handling delegation

### Services (`/services`)

Contain business logic and interact with models. Services handle:

- Data validation and processing
- Complex business operations
- Database interactions
- Error generation

### Models (`/models`)

Define data structures and database schemas:

- MongoDB schemas using Mongoose
- TypeScript interfaces
- Data validation rules

### Middleware (`/middleware`)

Custom middleware for cross-cutting concerns:

- **Error Handler**: Global error handling and formatting
- **Logger**: Request/response logging
- **Validation**: Input validation for routes

### Routes (`/routes`)

Define API endpoints and their middleware:

- Route definitions
- Middleware application
- Controller method binding

## 🔧 Error Handling

The application implements comprehensive error handling:

### Custom ApiError Class

```typescript
class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
}
```

### Global Error Middleware

- Handles all types of errors
- Provides consistent error responses
- Logs errors in development
- Sanitizes error details in production

### Error Types Handled

- **ApiError**: Custom application errors
- **ValidationError**: Mongoose validation errors
- **CastError**: Invalid MongoDB ObjectId
- **MongoServerError**: Database-level errors

## 📊 Logging

### Request Logging

- Logs all incoming requests
- Tracks response times
- Shows status codes with emojis
- IP address tracking

### Error Logging

- Detailed error information
- Stack traces in development
- Request context preservation

## 🛡️ Validation

### Request Validation Middleware

- **validateCreateGame**: Validates game creation data
- **validateUpdateRound**: Validates round update data
- **validateGameId**: Validates MongoDB ObjectId format

### Validation Rules

- Player names required and unique
- Name length limits (50 characters)
- Proper data types
- ObjectId format validation

## 🗄️ Database Schema

### Game Model

```typescript
interface IGame {
  player1: IPlayer;
  player2: IPlayer;
  totalRounds: number;
  isActive: boolean;
  createdAt: Date;
  endedAt?: Date;
}

interface IPlayer {
  name: string;
  wins: number;
  losses: number;
  draws: number;
}
```

## 🔄 Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful",
  "count": 10
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error description"
  }
}
```

## 📝 Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 🚨 Environment Variables

| Variable      | Description               | Default                               |
| ------------- | ------------------------- | ------------------------------------- |
| `NODE_ENV`    | Environment mode          | `development`                         |
| `PORT`        | Server port               | `5000`                                |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/tictactoe` |

## 🏗️ Best Practices Implemented

1. **Separation of Concerns**: Clear separation between routes, controllers, services, and models
2. **Error Handling**: Comprehensive error handling with custom error classes
3. **Validation**: Input validation at multiple levels
4. **Logging**: Structured logging for debugging and monitoring
5. **Type Safety**: Full TypeScript implementation
6. **Database Management**: Proper connection handling and graceful shutdown
7. **Security**: Input sanitization and error message sanitization
8. **Documentation**: Clear API documentation and code comments

## 🔒 Security Features

- Input validation and sanitization
- Error message sanitization in production
- Request size limits
- CORS configuration
- Proper error logging without sensitive data exposure

## 🚀 Deployment

The application is production-ready with:

- Graceful shutdown handling
- Proper error handling
- Environment-based configuration
- Health check endpoint
- Connection pooling and error recovery
