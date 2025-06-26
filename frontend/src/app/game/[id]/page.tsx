'use client'

import { useParams, useRouter } from 'next/navigation'
import GameBoard from '@/components/Game'
import { ErrorState } from '@/components/Game'

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.id as string

  // Handle invalid gameId
  if (!gameId || gameId === 'undefined' || gameId === 'null') {
    return (
      <ErrorState
        title="Invalid Game ID"
        message="The game ID is missing or invalid."
        onRetry={() => router.push('/')}
      />
    )
  }

  return <GameBoard gameId={gameId} />
}
