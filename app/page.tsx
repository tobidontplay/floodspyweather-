"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bell, Menu, Search, Settings, User, X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

import PersistentGlobe from "@/components/persistent-globe"
import WeatherCard from "@/components/weather-card"
import NewsCard from "@/components/news-card"
import LiveFeed from "@/components/live-feed"
import TimelineViewer from "@/components/timeline-viewer"
import GlitchText from "@/components/glitch-text"
import ParticleRain from "@/components/particle-rain"
import Sidebar from "@/components/sidebar"
import LocationDetail from "@/components/location-detail"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [timeScale, setTimeScale] = useState(0)
  const [showParticles, setShowParticles] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [locationData, setLocationData] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState("globe")
  const [isLoading, setIsLoading] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Simulate loading weather data
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [newsData, setNewsData] = useState<any[]>([])

  useEffect(() => {
    // Simulate fetching data
    setWeatherData([
      { id: 1, location: "Neo Tokyo", severity: "high", type: "flood", temperature: 32, humidity: 85, windSpeed: 45 },
      {
        id: 2,
        location: "New Shanghai",
        severity: "medium",
        type: "storm",
        temperature: 28,
        humidity: 75,
        windSpeed: 30,
      },
      { id: 3, location: "Cyber Delhi", severity: "low", type: "rain", temperature: 35, humidity: 60, windSpeed: 15 },
      {
        id: 4,
        location: "Digital Lagos",
        severity: "medium",
        type: "storm",
        temperature: 30,
        humidity: 70,
        windSpeed: 25,
      },
      {
        id: 5,
        location: "Virtual Berlin",
        severity: "high",
        type: "flood",
        temperature: 26,
        humidity: 80,
        windSpeed: 40,
      },
      { id: 6, location: "Neon Cairo", severity: "medium", type: "rain", temperature: 38, humidity: 55, windSpeed: 20 },
      {
        id: 7,
        location: "Synth Sydney",
        severity: "high",
        type: "storm",
        temperature: 29,
        humidity: 78,
        windSpeed: 35,
      },
      { id: 8, location: "Quantum Rio", severity: "low", type: "rain", temperature: 33, humidity: 65, windSpeed: 18 },
    ])

    setNewsData([
      {
        id: 1,
        title: "Massive Flooding in Lower Districts",
        location: "Neo Tokyo",
        timestamp: "2077-05-15",
        source: "CyberNet News",
        category: "disaster",
      },
      {
        id: 2,
        title: "Corporate Water Reserves at Critical Levels",
        location: "New Shanghai",
        timestamp: "2077-05-14",
        source: "DataStream",
        category: "resources",
      },
      {
        id: 3,
        title: "Underground Communities Develop New Filtration Tech",
        location: "Cyber Delhi",
        timestamp: "2077-05-13",
        source: "Resistance Radio",
        category: "technology",
      },
      {
        id: 4,
        title: "Coastal Barriers Failing After Recent Storms",
        location: "Digital Lagos",
        timestamp: "2077-05-14",
        source: "Global Monitor",
        category: "infrastructure",
      },
      {
        id: 5,
        title: "Toxic Rain Levels Reach New High",
        location: "Virtual Berlin",
        timestamp: "2077-05-15",
        source: "EuroNet",
        category: "weather",
      },
      {
        id: 6,
        title: "Desert Reclamation Project Shows Promise",
        location: "Neon Cairo",
        timestamp: "2077-05-12",
        source: "AfriTech News",
        category: "technology",
      },
      {
        id: 7,
        title: "Underwater Districts Report Power Failures",
        location: "Synth Sydney",
        timestamp: "2077-05-15",
        source: "Pacific Grid",
        category: "infrastructure",
      },
      {
        id: 8,
        title: "Rainforest Protection Drones Deployed",
        location: "Quantum Rio",
        timestamp: "2077-05-13",
        source: "EcoWatch",
        category: "environment",
      },
    ])
  }, [])

  // Handle location selection
  useEffect(() => {
    if (selectedLocation) {
      setIsLoading(true)

      // Simulate loading location data
      setTimeout(() => {
        setLocationData({
          name: selectedLocation,
          population: Math.floor(Math.random() * 15 + 5) + " million",
          status: Math.random() > 0.5 ? "critical" : "stable",
          waterLevel: Math.floor(Math.random() * 100),
          airQuality: Math.floor(Math.random() * 100),
          temperature: Math.floor(Math.random() * 15 + 25),
          rainfall: Math.floor(Math.random() * 200),
          forecast: Math.random() > 0.5 ? "deteriorating" : "improving",
          controlStatus: Math.random() > 0.7 ? "corporate" : "independent",
          threatLevel: Math.floor(Math.random() * 5) + 1,
        })

        setActiveTab("location")
        setIsLoading(false)
      }, 1000)
    } else {
      setLocationData(null)
    }
  }, [selectedLocation])

  const handleCloseLocation = () => {
    setSelectedLocation(null)
    setLocationData(null)
    setActiveTab("globe")
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const location = weatherData.find((item) => item.location.toLowerCase().includes(searchQuery.toLowerCase()))
      if (location) {
        setSelectedLocation(location.location)
        toast({
          title: "Location Found",
          description: `Navigating to ${location.location}`,
        })
      } else {
        toast({
          title: "Location Not Found",
          description: "No matching location found in the database",
          variant: "destructive",
        })
      }
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread alerts that require attention",
    })
  }

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "System settings panel will be available in the next update",
    })
  }

  const handleProfileClick = () => {
    toast({
      title: "User Profile",
      description: "User profile management will be available in the next update",
    })
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {showParticles && <ParticleRain />}

      <header className="border-b border-purple-900/50 backdrop-blur-sm bg-black/30 z-10 sticky top-0">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 text-purple-400" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-purple-500 font-bold text-2xl">FLOOD</span>
              <GlitchText text="SPY" className="text-2xl font-bold text-cyan-400" />
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search locations or events..."
              className="pl-8 bg-purple-950/30 border-purple-700/50 text-white placeholder:text-purple-400/70 focus-visible:ring-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                    <Bell className="h-5 w-5 text-purple-400" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-cyan-500 text-[10px]">
                      3
                    </Badge>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications (3)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
                    <Settings className="h-5 w-5 text-purple-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleProfileClick}>
                    <User className="h-5 w-5 text-purple-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>User Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} onSelectLocation={setSelectedLocation} />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Persistent Globe - centered on the page */}
          <div className="fixed inset-x-0 mx-auto top-[73px] bottom-[37px] w-2/3 max-w-3xl z-0 hidden lg:flex justify-center items-center pointer-events-auto">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none"></div>
            <PersistentGlobe
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              timeScale={timeScale}
              className="h-full w-full"
            />
          </div>

          <Tabs defaultValue="globe" value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col relative z-10">
            <div className="border-b border-purple-900/50 backdrop-blur-sm bg-black/30 px-4 z-10">
              <TabsList className="bg-transparent border-b-0">
                <TabsTrigger
                  value="globe"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
                >
                  Global View
                </TabsTrigger>
                {selectedLocation && (
                  <TabsTrigger
                    value="location"
                    className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
                  >
                    {selectedLocation}
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="archive"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
                >
                  News Archive
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
                >
                  Live Updates
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-purple-900/20 data-[state=active]:text-cyan-400"
                >
                  Timeline
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="globe" className="flex-1 p-0 m-0 flex flex-col overflow-hidden">
              <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
                <div className="w-full lg:w-2/3 h-[300px] md:h-auto relative">
                  {/* Globe Controls */}
                  <div
                    className={`absolute top-4 left-4 z-10 transition-opacity duration-300 ${
                      showControls ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="bg-black/50 backdrop-blur-sm p-2 rounded-md border border-purple-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Label htmlFor="time-scale" className="text-xs text-purple-300">
                          Time Scale:
                        </Label>
                        <Slider
                          id="time-scale"
                          value={[timeScale]}
                          onValueChange={(value) => setTimeScale(value[0])}
                          max={100}
                          step={1}
                          className="w-32"
                        />
                        <span className="text-xs text-cyan-400">{timeScale > 0 ? `+${timeScale}h` : "Now"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="particles" className="text-xs text-purple-300">
                          Particles:
                        </Label>
                        <Switch id="particles" checked={showParticles} onCheckedChange={setShowParticles} />
                      </div>
                    </div>
                  </div>

                  {/* Toggle Controls Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleControls}
                    className="absolute top-4 right-4 z-10 bg-black/50 border-purple-900/50 text-purple-400 hover:text-cyan-400"
                  >
                    {showControls ? <X className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                  </Button>

                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mb-4">
                          <GlitchText text="ACCESSING DATA" className="text-xl font-bold text-cyan-400" />
                        </div>
                        <div className="w-48 h-1 bg-purple-900/50 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 animate-pulse" style={{ width: "60%" }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Globe (only visible on smaller screens) */}
                  <div className="lg:hidden h-full flex justify-center items-center">
                    <div className="relative w-full h-full flex justify-center items-center">
                      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/80 pointer-events-none"></div>
                      <div className="relative z-0">
                        <PersistentGlobe
                          selectedLocation={selectedLocation}
                          setSelectedLocation={setSelectedLocation}
                          timeScale={timeScale}
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/3 bg-black/40 backdrop-blur-md border-l border-purple-900/50 overflow-hidden flex flex-col relative z-20">
                  <div className="p-4 border-b border-purple-900/50 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold text-cyan-400">Weather Alerts</h2>
                      <p className="text-xs text-purple-300">Real-time monitoring of severe conditions</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleCloseLocation}
                            className="text-purple-400 hover:text-red-400"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Close location view</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="grid gap-4">
                      {weatherData
                        .filter((item) => !selectedLocation || item.location === selectedLocation)
                        .map((item) => (
                          <WeatherCard key={item.id} data={item} />
                        ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>

            {selectedLocation && (
              <TabsContent value="location" className="flex-1 p-0 m-0 overflow-hidden">
                <LocationDetail
                  location={selectedLocation}
                  data={locationData}
                  onClose={handleCloseLocation}
                  weatherData={weatherData.find((w) => w.location === selectedLocation)}
                  newsData={newsData.filter((n) => n.location === selectedLocation)}
                />
              </TabsContent>
            )}

            <TabsContent value="archive" className="flex-1 p-4 m-0 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:pr-[33%]">
                {newsData
                  .filter((item) => !selectedLocation || item.location === selectedLocation)
                  .map((item) => (
                    <NewsCard key={item.id} data={item} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="live" className="flex-1 p-0 m-0 overflow-hidden">
              <div className="w-full lg:pr-[33%]">
                <LiveFeed selectedLocation={selectedLocation} />
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="flex-1 p-0 m-0 overflow-hidden">
              <div className="w-full lg:pr-[33%]">
                <TimelineViewer selectedLocation={selectedLocation} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="border-t border-purple-900/50 backdrop-blur-sm bg-black/30 py-2 px-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xs text-purple-400">
            <span className="text-cyan-400">FLOODSPY</span> v2.077.3 | SYS.STATUS:{" "}
            <span className="text-green-400">ONLINE</span>
          </div>
          <div className="text-xs text-purple-400">
            DATA REFRESH: <span className="text-cyan-400">12:43:21</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
