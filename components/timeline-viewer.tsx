"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Play, Pause, SkipBack, SkipForward } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import { useToast } from "@/hooks/use-toast"

// Sample timeline events
const TIMELINE_EVENTS = [
  {
    id: 1,
    title: "Major Flooding in Lower Districts",
    date: "2077-05-15",
    time: "14:32",
    location: "Neo Tokyo",
    category: "disaster",
    description: "Massive flooding overwhelmed the lower districts after corporate water reservoir failure.",
  },
  {
    id: 2,
    title: "Water Rationing Implemented",
    date: "2077-05-14",
    time: "08:15",
    location: "Neo Tokyo",
    category: "resources",
    description: "City officials announced immediate water rationing following reservoir contamination.",
  },
  {
    id: 3,
    title: "Protest Against Corporate Water Control",
    date: "2077-05-13",
    time: "19:45",
    location: "Neo Tokyo",
    category: "social",
    description: "Citizens gathered to protest corporate monopolization of water resources.",
  },
  {
    id: 4,
    title: "New Filtration Technology Announced",
    date: "2077-05-12",
    time: "11:20",
    location: "Neo Tokyo",
    category: "technology",
    description: "Revolutionary water filtration technology unveiled by independent research collective.",
  },
  {
    id: 5,
    title: "Toxic Rain Warning Issued",
    date: "2077-05-11",
    time: "05:30",
    location: "Neo Tokyo",
    category: "weather",
    description: "Authorities warned citizens to remain indoors due to highly acidic precipitation.",
  },
  {
    id: 6,
    title: "Corporate Water Reserves at Critical Levels",
    date: "2077-05-14",
    time: "10:15",
    location: "New Shanghai",
    category: "resources",
    description: "Corporate water reserves have reached critically low levels, prompting emergency measures.",
  },
  {
    id: 7,
    title: "Underground Communities Develop New Filtration Tech",
    date: "2077-05-13",
    time: "13:45",
    location: "Cyber Delhi",
    category: "technology",
    description: "Independent communities have developed innovative water filtration technology.",
  },
  {
    id: 8,
    title: "Coastal Barriers Failing After Recent Storms",
    date: "2077-05-14",
    time: "16:20",
    location: "Digital Lagos",
    category: "infrastructure",
    description: "Coastal protection barriers are showing signs of failure after recent severe weather events.",
  },
  {
    id: 9,
    title: "Toxic Rain Levels Reach New High",
    date: "2077-05-15",
    time: "09:10",
    location: "Virtual Berlin",
    category: "weather",
    description: "Toxic rain levels have reached unprecedented concentrations, triggering health alerts.",
  },
  {
    id: 10,
    title: "Desert Reclamation Project Shows Promise",
    date: "2077-05-12",
    time: "14:45",
    location: "Neon Cairo",
    category: "technology",
    description: "New desert reclamation technology shows promising results in early trials.",
  },
  {
    id: 11,
    title: "Underwater Districts Report Power Failures",
    date: "2077-05-15",
    time: "11:30",
    location: "Synth Sydney",
    category: "infrastructure",
    description: "Underwater residential districts experiencing widespread power failures due to saltwater intrusion.",
  },
  {
    id: 12,
    title: "Rainforest Protection Drones Deployed",
    date: "2077-05-13",
    time: "08:50",
    location: "Quantum Rio",
    category: "environment",
    description: "Autonomous drones deployed to monitor and protect remaining rainforest regions.",
  },
]

export default function TimelineViewer({ selectedLocation }: { selectedLocation: string | null }) {
  const [currentDate, setCurrentDate] = useState("2077-05-15")
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeScale, setTimeScale] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [filteredEvents, setFilteredEvents] = useState(TIMELINE_EVENTS)
  const { toast } = useToast()

  // Filter events based on selected location
  useEffect(() => {
    if (selectedLocation) {
      const locationEvents = TIMELINE_EVENTS.filter((event) => event.location === selectedLocation)
      setFilteredEvents(locationEvents)
      // Reset selected event if it's not in the filtered list
      if (selectedEvent && !locationEvents.find((e) => e.id === selectedEvent)) {
        setSelectedEvent(null)
      }
    } else {
      setFilteredEvents(TIMELINE_EVENTS)
    }
  }, [selectedLocation, selectedEvent])

  // Handle date navigation
  const navigateDate = (direction: "prev" | "next") => {
    const dates = ["2077-05-11", "2077-05-12", "2077-05-13", "2077-05-14", "2077-05-15"]
    const currentIndex = dates.indexOf(currentDate)

    if (direction === "prev" && currentIndex > 0) {
      setCurrentDate(dates[currentIndex - 1])
    } else if (direction === "next" && currentIndex < dates.length - 1) {
      setCurrentDate(dates[currentIndex + 1])
    }

    // Filter events by the new date
    const dateEvents = filteredEvents.filter((event) => event.date === currentDate)
    if (dateEvents.length > 0 && (!selectedEvent || !dateEvents.find((e) => e.id === selectedEvent))) {
      setSelectedEvent(dateEvents[0].id)
    }
  }

  // Handle playback controls
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)

    if (!isPlaying) {
      toast({
        title: "Timeline Playback",
        description: `Playing timeline at ${timeScale}x speed`,
      })
    }
  }

  const handleSkipBack = () => {
    navigateDate("prev")
  }

  const handleSkipForward = () => {
    navigateDate("next")
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "disaster":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "resources":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "technology":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
      case "social":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "weather":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "infrastructure":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50"
      case "environment":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  return (
    <div className="flex flex-col h-full relative z-0">
      <div className="p-4 border-b border-purple-900/50 backdrop-blur-sm bg-black/30">
        <h2 className="text-lg font-bold text-cyan-400">Timeline Explorer</h2>
        <p className="text-xs text-purple-300">
          {selectedLocation ? `Historical events for ${selectedLocation}` : "Historical events and weather patterns"}
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 border-r border-purple-900/50 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-purple-900/50 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-400 hover:text-cyan-400"
              onClick={() => navigateDate("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-cyan-400" />
              <GlitchText text={currentDate} className="text-sm font-mono" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-400 hover:text-cyan-400"
              onClick={() => navigateDate("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className={`border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-200 hover:bg-purple-950/30 ${selectedEvent === event.id ? "ring-1 ring-cyan-500" : ""}`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-medium text-white">{event.title}</h3>
                        <Badge className={`${getCategoryColor(event.category)} uppercase text-xs ml-2 shrink-0`}>
                          {event.category}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-purple-300">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-purple-400" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-purple-400" />
                          {event.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="mb-4 text-cyan-400 text-lg">No historical data</div>
                  <p className="text-sm text-purple-300">No events found for this location</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6 flex items-center justify-center">
            {selectedEvent ? (
              <div className="w-full max-w-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-lg mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GlitchText
                      text={filteredEvents.find((e) => e.id === selectedEvent)?.title || ""}
                      className="text-2xl font-bold text-white text-center px-6"
                    />
                  </div>
                </div>

                <div className="bg-black/60 backdrop-blur-sm border border-purple-900/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-cyan-400">
                        {filteredEvents.find((e) => e.id === selectedEvent)?.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-purple-300 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          {filteredEvents.find((e) => e.id === selectedEvent)?.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-purple-400" />
                          {filteredEvents.find((e) => e.id === selectedEvent)?.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-purple-400" />
                          {filteredEvents.find((e) => e.id === selectedEvent)?.location}
                        </div>
                      </div>
                    </div>

                    <Badge
                      className={`${getCategoryColor(filteredEvents.find((e) => e.id === selectedEvent)?.category || "")} uppercase text-xs`}
                    >
                      {filteredEvents.find((e) => e.id === selectedEvent)?.category}
                    </Badge>
                  </div>

                  <p className="text-gray-300 mb-4">
                    {filteredEvents.find((e) => e.id === selectedEvent)?.description}
                    <br />
                    <br />
                    Additional details and analysis of this event reveal patterns consistent with corporate negligence
                    and infrastructure failure. Environmental impact assessments indicate long-term contamination of
                    groundwater supplies and displacement of lower-district residents.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-purple-900/20 border border-purple-900/50 rounded-md p-3 text-center">
                      <div className="text-xs text-purple-300 mb-1">Impact Level</div>
                      <div className="text-lg font-bold text-cyan-400">Severe</div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-900/50 rounded-md p-3 text-center">
                      <div className="text-xs text-purple-300 mb-1">Affected Area</div>
                      <div className="text-lg font-bold text-cyan-400">42 km²</div>
                    </div>
                    <div className="bg-purple-900/20 border border-purple-900/50 rounded-md p-3 text-center">
                      <div className="text-xs text-purple-300 mb-1">Recovery Status</div>
                      <div className="text-lg font-bold text-red-400">Critical</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-purple-300">
                <div className="mb-2 text-cyan-400 text-lg">Select an event from the timeline</div>
                <p className="text-sm">Explore historical events and their impact on environmental conditions</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-purple-900/50 backdrop-blur-sm bg-black/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-400 hover:text-cyan-400"
                onClick={handleSkipBack}
              >
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-purple-400 hover:text-cyan-400 border-purple-900/50 bg-purple-950/20 hover:bg-purple-950/30"
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-purple-400 hover:text-cyan-400"
                onClick={handleSkipForward}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-purple-300 whitespace-nowrap">Time Scale:</span>
              <Slider
                value={[timeScale]}
                onValueChange={(value) => setTimeScale(value[0])}
                max={5}
                step={1}
                className="w-full"
              />
              <span className="text-xs text-cyan-400 whitespace-nowrap">{timeScale}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
