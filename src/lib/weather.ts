import axios from 'axios'
import { WeatherData } from './weather-types'

const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5'

export async function getWeatherData(city: string): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY
    
    if (!apiKey) {
      console.warn('OpenWeather API key not found')
      return null
    }

    const response = await axios.get<WeatherData>(
      `${WEATHER_API_BASE}/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return null
  }
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}