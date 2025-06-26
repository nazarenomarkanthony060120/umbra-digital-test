'use client'

import { useRouter } from 'next/navigation'
import { useGames } from '@/hooks/useGames'
import { PageHeader, GameHistorySection } from '@/components/Home'

export default function Home() {
  const router = useRouter()
  const { data: games = [], isLoading, error, refetch } = useGames()

  const handleStartNewGame = () => {
    router.push('/new-game')
  }

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`)
  }

  const handleRetry = () => {
    refetch()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <PageHeader onStartNewGame={handleStartNewGame} />

        <GameHistorySection
          games={games}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          onStartNewGame={handleStartNewGame}
          onGameClick={handleGameClick}
        />
      </div>
    </div>
  )
}
