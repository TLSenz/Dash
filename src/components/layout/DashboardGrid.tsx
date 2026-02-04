import TimeWidget from '@/components/widgets/TimeWidget'
import GitHubWidget from '@/components/widgets/GitHubWidget'
import WeatherWidget from '@/components/widgets/WeatherWidget'
import TodoWidget from '@/components/widgets/TodoWidget'
import LinksWidget from '@/components/widgets/LinksWidget'

export default function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Time Widget - Top left */}
      <div className="lg:col-span-1">
        <TimeWidget />
      </div>
      
      {/* GitHub Widget - Takes 2 columns */}
      <div className="lg:col-span-2">
        <GitHubWidget />
      </div>
      
      {/* Weather Widget */}
      <div className="lg:col-span-1">
        <WeatherWidget />
      </div>
      
      {/* Todo Widget - Takes 2 columns */}
      <div className="lg:col-span-2">
        <TodoWidget />
      </div>
      
      {/* Links Widget - Takes full width */}
      <div className="lg:col-span-3">
        <LinksWidget />
      </div>
    </div>
  )
}