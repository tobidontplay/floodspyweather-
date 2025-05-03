"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Calendar,
  Clock,
  CloudRain,
  Droplets,
  FileText,
  MapPin,
  Thermometer,
  Users,
  Wind,
} from "lucide-react"
import GlitchText from "@/components/glitch-text"
import NewsCard from "@/components/news-card"

interface LocationDetailProps {
  location: string
  data: any
  onClose: () => void
  weatherData: any
  newsData: any[]
}

export default function LocationDetail({ location, data, onClose, weatherData, newsData }: LocationDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!data) return null

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "stable":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
    }
  }

  // Get threat level color
  const getThreatColor = (level: number) => {
    if (level >= 4) return "text-red-400"
    if (level >= 3) return "text-amber-400"
    if (level >= 2) return "text-yellow-400"
    return "text-green-400"
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-purple-900/50 backdrop-blur-sm bg-black/30 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="text-purple-400 hover:text-cyan-400">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <GlitchText text={location} className="text-xl font-bold text-cyan-400" />
          <div className="flex items-center gap-2 text-xs text-purple-300">
            <MapPin className="h-3 w-3" />
            <span>Population: {data.population}</span>
            <Badge className={getStatusColor(data.status)}>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-purple-900/50 backdrop-blur-sm bg-black/30 px-4">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="weather"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
            >
              Weather
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
            >
              News
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="flex-1 p-0 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-4 border-b border-purple-900/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white">Status Overview</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid gap-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-purple-300">Water Level</span>
                          <span className="text-sm text-white">{data.waterLevel}%</span>
                        </div>
                        <Progress
                          value={data.waterLevel}
                          className="h-2 bg-purple-900/30"
                          indicatorClassName={
                            data.waterLevel > 70 ? "bg-red-400" : data.waterLevel > 40 ? "bg-amber-400" : "bg-cyan-400"
                          }
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-purple-300">Air Quality</span>
                          <span className="text-sm text-white">{data.airQuality}%</span>
                        </div>
                        <Progress
                          value={data.airQuality}
                          className="h-2 bg-purple-900/30"
                          indicatorClassName={
                            data.airQuality > 70 ? "bg-green-400" : data.airQuality > 40 ? "bg-amber-400" : "bg-red-400"
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-purple-300">Temperature</span>
                          </div>
                          <div className="text-xl font-mono text-white">{data.temperature}°C</div>
                        </div>

                        <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                          <div className="flex items-center gap-2 mb-1">
                            <CloudRain className="h-4 w-4 text-blue-400" />
                            <span className="text-sm text-purple-300">Rainfall</span>
                          </div>
                          <div className="text-xl font-mono text-white">{data.rainfall} mm</div>
                        </div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm text-purple-300">Forecast</span>
                          </div>
                          <Badge
                            className={
                              data.forecast === "deteriorating"
                                ? "bg-red-500/20 text-red-400 border-red-500/50"
                                : "bg-green-500/20 text-green-400 border-green-500/50"
                            }
                          >
                            {data.forecast.charAt(0).toUpperCase() + data.forecast.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-4 border-b border-purple-900/50">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white">Population Data</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid gap-4">
                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-purple-300">Total Population</span>
                        </div>
                        <div className="text-xl font-mono text-white">{data.population}</div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="h-4 w-4 text-amber-400" />
                          <span className="text-sm text-purple-300">Control Status</span>
                        </div>
                        <div className="text-xl font-mono text-white capitalize">{data.controlStatus}</div>
                        <div className="text-xs text-purple-300 mt-1">
                          {data.controlStatus === "corporate"
                            ? "Area under corporate governance and resource control"
                            : "Area maintains independent governance structure"}
                        </div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-sm text-purple-300">Threat Level</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-6 w-6 rounded-sm flex items-center justify-center ${level <= data.threatLevel ? getThreatColor(level) : "text-gray-700"} border ${level <= data.threatLevel ? "border-purple-500" : "border-gray-700"}`}
                            >
                              {level}
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-purple-300 mt-2">
                          {data.threatLevel >= 4
                            ? "Critical: Immediate action required"
                            : data.threatLevel >= 3
                              ? "Severe: High risk to population"
                              : data.threatLevel >= 2
                                ? "Elevated: Monitor situation closely"
                                : "Moderate: Standard protocols in effect"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden md:col-span-2">
                  <CardHeader className="p-4 border-b border-purple-900/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white">Recent Events</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="flex gap-4 p-3 bg-purple-900/20 rounded-md border border-purple-900/30"
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-black/50 rounded-md flex items-center justify-center">
                            {item === 1 ? (
                              <Droplets className="h-6 w-6 text-cyan-400" />
                            ) : item === 2 ? (
                              <Wind className="h-6 w-6 text-purple-400" />
                            ) : (
                              <AlertTriangle className="h-6 w-6 text-amber-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium text-white">
                                {item === 1
                                  ? "Water Purification System Failure"
                                  : item === 2
                                    ? "High Velocity Wind Damage"
                                    : "Resource Distribution Disruption"}
                              </h4>
                              <Badge
                                className={
                                  item === 1
                                    ? "bg-red-500/20 text-red-400 border-red-500/50"
                                    : item === 2
                                      ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                                      : "bg-purple-500/20 text-purple-400 border-purple-500/50"
                                }
                              >
                                {item === 1 ? "Critical" : item === 2 ? "Warning" : "Notice"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-300 mt-1">
                              {item === 1
                                ? "Main water purification system in sectors 3-5 has failed due to power fluctuations."
                                : item === 2
                                  ? "Wind speeds exceeding 120 km/h have caused structural damage to outer districts."
                                  : "Corporate resource distribution networks experiencing disruptions in lower sectors."}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-purple-300">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>2077-05-{15 - item}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{item === 1 ? "14:32" : item === 2 ? "08:15" : "19:45"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="weather" className="flex-1 p-0 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weather visualization would go here */}
                <div className="md:col-span-2 h-64 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-lg border border-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <GlitchText text="Weather Visualization" className="text-xl font-bold text-cyan-400 mb-2" />
                    <p className="text-sm text-purple-300">Interactive weather patterns for {location}</p>
                  </div>
                </div>

                {/* Weather data cards */}
                <Card className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-4 border-b border-purple-900/50">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white">Current Conditions</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Thermometer className="h-4 w-4 text-red-400" />
                          <span className="text-sm text-purple-300">Temperature</span>
                        </div>
                        <div className="text-xl font-mono text-white">{data.temperature}°C</div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-purple-300">Humidity</span>
                        </div>
                        <div className="text-xl font-mono text-white">{weatherData?.humidity || 65}%</div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Wind className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm text-purple-300">Wind Speed</span>
                        </div>
                        <div className="text-xl font-mono text-white">{weatherData?.windSpeed || 30} km/h</div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-1">
                          <CloudRain className="h-4 w-4 text-purple-400" />
                          <span className="text-sm text-purple-300">Precipitation</span>
                        </div>
                        <div className="text-xl font-mono text-white">{data.rainfall} mm</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-purple-900/20 rounded-md border border-purple-900/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-purple-300">Weather Alerts</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Flood Warning</span>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Air Quality Alert</span>
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">Toxic Rain Warning</span>
                          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/50">Inactive</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-4 border-b border-purple-900/50">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-lg font-bold text-white">Forecast & Trends</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm text-purple-300">5-Day Forecast</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((day) => (
                            <div key={day} className="text-center">
                              <div className="text-xs text-purple-300">Day {day}</div>
                              <div className="my-2">
                                {day === 1 ? (
                                  <CloudRain className="h-6 w-6 text-cyan-400 mx-auto" />
                                ) : day === 2 ? (
                                  <CloudRain className="h-6 w-6 text-red-400 mx-auto" />
                                ) : day === 3 ? (
                                  <Droplets className="h-6 w-6 text-blue-400 mx-auto" />
                                ) : day === 4 ? (
                                  <Wind className="h-6 w-6 text-purple-400 mx-auto" />
                                ) : (
                                  <CloudRain className="h-6 w-6 text-amber-400 mx-auto" />
                                )}
                              </div>
                              <div className="text-xs font-mono text-white">{data.temperature - 2 + day}°C</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm text-purple-300">Water Level Trend</span>
                        </div>
                        <div className="h-24 flex items-end gap-1">
                          {[65, 70, 75, 85, 80, 90, 85].map((level, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-cyan-400/30 rounded-t-sm relative"
                              style={{ height: `${level}%` }}
                            >
                              {i === 6 && (
                                <div className="absolute -right-2 top-0 h-full w-0.5 bg-red-400 animate-pulse"></div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-purple-300">
                          <span>7 Days Ago</span>
                          <span>Now</span>
                        </div>
                      </div>

                      <div className="bg-purple-900/20 rounded-md p-3 border border-purple-900/30">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            <span className="text-sm text-purple-300">Forecast Status</span>
                          </div>
                          <Badge
                            className={
                              data.forecast === "deteriorating"
                                ? "bg-red-500/20 text-red-400 border-red-500/50"
                                : "bg-green-500/20 text-green-400 border-green-500/50"
                            }
                          >
                            {data.forecast.charAt(0).toUpperCase() + data.forecast.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-xs text-purple-300 mt-2">
                          {data.forecast === "deteriorating"
                            ? "Weather conditions expected to worsen over the next 72 hours. Prepare accordingly."
                            : "Weather conditions expected to stabilize over the next 72 hours."}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="news" className="flex-1 p-4 m-0 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsData && newsData.length > 0 ? (
              newsData.map((item) => <NewsCard key={item.id} data={item} />)
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="mb-4 text-cyan-400 text-lg">No news stories found for {location}</div>
                <p className="text-sm text-purple-300">Check back later for updates</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="flex-1 p-0 m-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-black/60 backdrop-blur-sm border border-purple-900/50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">Historical Overview</h3>
                  <p className="text-sm text-gray-300">
                    {location} has experienced significant environmental changes over the past decade, with increasing
                    frequency of extreme weather events and resource scarcity. The area has been subject to corporate
                    control since 2071, following the Great Resource Wars that reshaped global power structures.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-purple-900/50"></div>

                  <div className="space-y-6 relative">
                    {[2077, 2076, 2075, 2074, 2073].map((year) => (
                      <div key={year} className="ml-10 relative">
                        <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-cyan-400 border-2 border-black"></div>
                        <div className="bg-black/60 backdrop-blur-sm border border-purple-900/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="h-5 w-5 text-cyan-400" />
                            <h3 className="text-lg font-bold text-white">{year}</h3>
                          </div>

                          <div className="space-y-3">
                            <div className="flex gap-3">
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/50 h-fit mt-0.5">
                                {year === 2077
                                  ? "MAY"
                                  : year === 2076
                                    ? "NOV"
                                    : year === 2075
                                      ? "AUG"
                                      : year === 2074
                                        ? "FEB"
                                        : "JUL"}
                              </Badge>
                              <div>
                                <h4 className="font-medium text-white">
                                  {year === 2077
                                    ? "Major Flooding in Lower Districts"
                                    : year === 2076
                                      ? "Corporate Water Control Established"
                                      : year === 2075
                                        ? "Toxic Rain Crisis"
                                        : year === 2074
                                          ? "Resource Riots"
                                          : "Infrastructure Collapse"}
                                </h4>
                                <p className="text-sm text-gray-300 mt-1">
                                  {year === 2077
                                    ? "Massive flooding overwhelmed the lower districts after corporate water reservoir failure."
                                    : year === 2076
                                      ? "MegaCorp established complete control over water distribution systems."
                                      : year === 2075
                                        ? "Unprecedented toxic rain event caused widespread contamination and health crisis."
                                        : year === 2074
                                          ? "Civil unrest erupted over inequitable resource distribution."
                                          : "Critical infrastructure systems failed after sustained environmental degradation."}
                                </p>
                              </div>
                            </div>

                            {year === 2077 && (
                              <div className="flex gap-3">
                                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50 h-fit mt-0.5">
                                  MAR
                                </Badge>
                                <div>
                                  <h4 className="font-medium text-white">Water Rationing Implemented</h4>
                                  <p className="text-sm text-gray-300 mt-1">
                                    City officials announced immediate water rationing following reservoir
                                    contamination.
                                  </p>
                                </div>
                              </div>
                            )}

                            {year === 2076 && (
                              <div className="flex gap-3">
                                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50 h-fit mt-0.5">
                                  JUN
                                </Badge>
                                <div>
                                  <h4 className="font-medium text-white">Underground Resistance Formed</h4>
                                  <p className="text-sm text-gray-300 mt-1">
                                    Citizens organized underground resistance movement against corporate control.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
