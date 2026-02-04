'use client'

import { Card } from '@/components/ui/card'
import { ExternalLink, Youtube, MessageCircle, Users, Github, FileText } from 'lucide-react'

interface QuickLink {
  id: string
  name: string
  url: string
  icon: React.ReactNode
  description: string
  color: string
  hoverColor: string
}

export default function LinksWidget() {
  const quickLinks: QuickLink[] = [
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com',
      icon: <Youtube className="w-6 h-6" />,
      description: 'Watch videos and tutorials',
      color: 'bg-red-100 dark:bg-red-900/20',
      hoverColor: 'hover:bg-red-200 dark:hover:bg-red-900/30'
    },
    {
      id: 'reddit',
      name: 'Reddit',
      url: 'https://reddit.com',
      icon: <MessageCircle className="w-6 h-6" />,
      description: 'Browse communities and discussions',
      color: 'bg-orange-100 dark:bg-orange-900/20',
      hoverColor: 'hover:bg-orange-200 dark:hover:bg-orange-900/30'
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      url: 'https://teams.microsoft.com',
      icon: <Users className="w-6 h-6" />,
      description: 'Connect with your team',
      color: 'bg-blue-100 dark:bg-blue-900/20',
      hoverColor: 'hover:bg-blue-200 dark:hover:bg-blue-900/30'
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/TLSenZ',
      icon: <Github className="w-6 h-6" />,
      description: 'Your GitHub profile',
      color: 'bg-gray-100 dark:bg-gray-700',
      hoverColor: 'hover:bg-gray-200 dark:hover:bg-gray-600'
    },
    {
      id: 'onenote',
      name: 'OneNote',
      url: 'https://onenote.com',
      icon: <FileText className="w-6 h-6" />,
      description: 'Take notes and organize',
      color: 'bg-purple-100 dark:bg-purple-900/20',
      hoverColor: 'hover:bg-purple-200 dark:hover:bg-purple-900/30'
    }
  ]

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center">
          <ExternalLink className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Quick Links
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.url)}
              className={`
                p-4 rounded-lg border border-gray-200 dark:border-gray-700
                transition-all duration-200 group
                ${link.color} ${link.hoverColor}
                hover:shadow-md hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              `}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <h3 className="font-medium text-sm text-gray-800 dark:text-white">
                  {link.name}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {link.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Click any link to open in a new tab
          </p>
        </div>
      </div>
    </Card>
  )
}