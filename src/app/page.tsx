import DashboardGrid from '@/components/layout/DashboardGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Work Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your personal productivity hub
          </p>
        </header>
        
        <DashboardGrid />
      </div>
    </main>
  )
}