import NewGameForm from '@/components/NewGame'

export default function NewGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <NewGameForm />
      </div>
    </div>
  )
}
