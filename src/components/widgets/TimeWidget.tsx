'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Clock } from 'lucide-react'

export default function TimeWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  return (
    <Card className="text-center">
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Current Time
        </h2>
      </div>
      
      <div className="space-y-2">
        <div className="text-3xl font-bold text-gray-900 dark:text-white font-mono">
          {formatTime(time)}
        </div>
        <div className="text-lg text-gray-600 dark:text-gray-300">
          {formatDate(time)}
        </div>
      </div>
    </Card>
  )
}