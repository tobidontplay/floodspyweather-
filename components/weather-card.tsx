"use client"

import { useState, useEffect } from "react"
import { Cloud, Droplets, Thermometer, Wind } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GlitchText from "@/components/glitch-text"

interface WeatherCardProps {
  data: {
    id: number
    location: string
    severity: string
    type: string
    temperature: number
    humidity: number
    windSpeed: number
  }
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const [glitching, setGlitching] = useState(false)

  // Randomly trigger glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitching(true)
        setTimeout(() => setGlitching(false), 1000)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Determine severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
    }
  }

  // Determine weather icon
  const getWeatherIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplets className="h-5 w-5 text-cyan-400" />
      case "storm":
        return <Cloud className="h-5 w-5 text-purple-400" />
      case "rain":
        return <Droplets className="h-5 w-5 text-blue-400" />
      default:
        return <Cloud className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <Card
      className={`border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden transition-all duration-300 ${glitching ? "translate-x-[1px] translate-y-[1px]" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            {glitching ? (
              <GlitchText text={data.location} className="text-lg font-bold text-cyan-400" />
            ) : (
              <h3 className="text-lg font-bold text-cyan-400">{data.location}</h3>
            )}
            <p className="text-xs text-purple-300">Weather Alert System</p>
          </div>
          <Badge className={`${getSeverityColor(data.severity)} uppercase text-xs`}>{data.severity}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-3">
          {getWeatherIcon(data.type)}
          <span className="text-sm capitalize">{data.type} warning</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center p-2 bg-purple-900/20 rounded-md border border-purple-900/30">
            <Thermometer className="h-4 w-4 text-red-400 mb-1" />
            <span className="text-lg font-mono text-white">{data.temperature}°</span>
            <span className="text-xs text-purple-300">Temp</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-purple-900/20 rounded-md border border-purple-900/30">
            <Droplets className="h-4 w-4 text-blue-400 mb-1" />
            <span className="text-lg font-mono text-white">{data.humidity}%</span>
            <span className="text-xs text-purple-300">Humid</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-purple-900/20 rounded-md border border-purple-900/30">
            <Wind className="h-4 w-4 text-cyan-400 mb-1" />
            <span className="text-lg font-mono text-white">{data.windSpeed}</span>
            <span className="text-xs text-purple-300">Wind</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-purple-900/30 flex justify-between items-center">
          <div className="text-xs text-purple-300">
            Updated: <span className="text-cyan-400">12m ago</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}
