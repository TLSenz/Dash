'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getGitHubStats } from '@/lib/github'
import { GitHubStats } from '@/lib/types'
import { 
  Github, 
  Star, 
  GitBranch, 
  Users, 
  ExternalLink,
  RefreshCw,
  Calendar
} from 'lucide-react'

export default function GitHubWidget() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getGitHubStats()
      setStats(data)
    } catch (err) {
      setError('Failed to fetch GitHub data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </Card>
    )
  }

  if (error || !stats?.user) {
    return (
      <Card>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error || 'No GitHub data available'}</p>
          <Button onClick={fetchStats} variant="primary">
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  const openPRs = stats.pullRequests.filter(pr => pr.state === 'open')
  const closedPRs = stats.pullRequests.filter(pr => pr.state === 'closed')

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Github className="w-6 h-6 text-gray-800 dark:text-white mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              GitHub Stats - {stats.user.login}
            </h2>
          </div>
          <Button 
            onClick={fetchStats} 
            variant="ghost" 
            size="sm"
            className="p-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Image 
            src={stats.user.avatar_url} 
            alt={stats.user.login}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {stats.user.name || stats.user.login}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {stats.user.bio || 'No bio available'}
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Stars</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <GitBranch className="w-4 h-4 text-blue-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Total Forks</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.user.followers}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Followers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-purple-500 mr-1" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {stats.commits.length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Recent Commits</p>
          </div>
        </div>

        {/* Recent Repos */}
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
            Recent Repositories
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {stats.repos.slice(0, 5).map(repo => (
              <div key={repo.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex-1">
                  <a 
                    href={repo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    {repo.name}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {repo.language || 'No language'}
                  </p>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center">
                    <GitBranch className="w-3 h-3 mr-1" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull Requests Overview */}
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
            Pull Requests
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {openPRs.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Open PRs</p>
            </div>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                {closedPRs.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Closed PRs</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}