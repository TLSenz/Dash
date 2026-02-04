'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getWeatherData, getWeatherIconUrl, getWindDirection } from '@/lib/weather'
import { WeatherData } from '@/lib/weather-types'
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Thermometer,
  Eye,
  RefreshCw,
  MapPin
} from 'lucide-react'

const CITY = 'Neuenegg'

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherData(CITY)
      setWeather(data)
    } catch (err) {
      setError('Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000)
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

  if (error || !weather) {
    return (
      <Card>
        <div className="text-center py-8">
          <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error || 'Weather data unavailable'}
          </p>
          <Button onClick={fetchWeather} variant="primary" size="sm">
            Try Again
          </Button>
        </div>
      </Card>
    )
  }

  const weatherIcon = getWeatherIconUrl(weather.weather[0].icon)
  const temperature = Math.round(weather.main.temp)
  const feelsLike = Math.round(weather.main.feels_like)
  const humidity = weather.main.humidity
  const windSpeed = weather.wind.speed
  const windDirection = getWindDirection(weather.wind.deg)
  const visibility = weather.visibility / 1000 // Convert to km

  return (
    <Card>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Cloud className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Weather
            </h2>
          </div>
          <Button 
            onClick={fetchWeather} 
            variant="ghost" 
            size="sm"
            className="p-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{weather.name}, {weather.sys.country}</span>
        </div>

        {/* Main Weather Display */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Image 
              src={weatherIcon} 
              alt={weather.weather[0].description}
              width={64}
              height={64}
            />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {temperature}°C
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Feels like {feelsLike}°C
          </p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 rounded p-2">
            <div className="flex items-center">
              <Thermometer className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-gray-600 dark:text-gray-300">Min/Max</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {Math.round(weather.main.temp_min)}°/{Math.round(weather.main.temp_max)}°
            </span>
          </div>

          <div className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-900/20 rounded p-2">
            <div className="flex items-center">
              <Droplets className="w-4 h-4 text-cyan-600 mr-1" />
              <span className="text-gray-600 dark:text-gray-300">Humidity</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-2">
            <div className="flex items-center">
              <Wind className="w-4 h-4 text-gray-600 mr-1" />
              <span className="text-gray-600 dark:text-gray-300">Wind</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {windSpeed}m/s {windDirection}
            </span>
          </div>

          <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded p-2">
            <div className="flex items-center">
              <Eye className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-gray-600 dark:text-gray-300">Visibility</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
              {visibility}km
            </span>
          </div>
        </div>

        {/* Sunrise/Sunset */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="font-medium">Sunrise: </span>
            {new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div>
            <span className="font-medium">Sunset: </span>
            {new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </Card>
  )
}