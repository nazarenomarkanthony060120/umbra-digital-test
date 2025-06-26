'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCreateGame } from '@/hooks/useGames'
import PageHeader from './PageHeader'
import PlayerInput from './PlayerInput'
import StatusMessage from './StatusMessage'
import ActionButtons from './ActionButtons'
import GameInstructions from './GameInstructions'

export default function NewGameForm() {
  const [player1Name, setPlayer1Name] = useState('')
  const [player2Name, setPlayer2Name] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)
  const router = useRouter()

  const createGameMutation = useCreateGame()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset validation error
    setValidationError(null)

    // Client-side validation
    if (!player1Name.trim() || !player2Name.trim()) {
      setValidationError('Both player names are required')
      return
    }

    if (player1Name.trim() === player2Name.trim()) {
      setValidationError('Players must have different names')
      return
    }

    // Create the game
    createGameMutation.mutate(
      {
        player1Name: player1Name.trim(),
        player2Name: player2Name.trim(),
      },
      {
        onSuccess: game => {
          // Navigate to the game page
          router.push(`/game/${game._id}`)
        },
        onError: error => {
          setValidationError(
            error instanceof Error
              ? error.message
              : 'Failed to create game. Please try again.'
          )
        },
      }
    )
  }

  const handleCancel = () => {
    router.push('/')
  }

  // Get error message
  const errorMessage =
    validationError ||
    (createGameMutation.error instanceof Error
      ? createGameMutation.error.message
      : null)

  const isLoading = createGameMutation.isPending
  const isFormDisabled = isLoading || !player1Name.trim() || !player2Name.trim()

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <PageHeader
        title="🎮 New Game"
        subtitle="Enter player names to start playing"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <PlayerInput
          id="player1"
          label="Player 1 (X)"
          value={player1Name}
          onChange={setPlayer1Name}
          placeholder="Enter Player 1 name"
          disabled={isLoading}
        />

        <PlayerInput
          id="player2"
          label="Player 2 (O)"
          value={player2Name}
          onChange={setPlayer2Name}
          placeholder="Enter Player 2 name"
          disabled={isLoading}
        />

        {errorMessage && <StatusMessage type="error" message={errorMessage} />}

        {createGameMutation.isSuccess && (
          <StatusMessage
            type="success"
            message="Game created! Redirecting..."
          />
        )}

        <ActionButtons
          onCancel={handleCancel}
          onSubmit={() => {}} // Form submission handled by form onSubmit
          isLoading={isLoading}
          isFormDisabled={isFormDisabled}
        />
      </form>

      <GameInstructions />
    </div>
  )
}
