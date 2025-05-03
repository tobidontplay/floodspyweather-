"use client"

import { useState, useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, Camera, MapPin, MessageSquare, Send, UserCheck } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import { useToast } from "@/hooks/use-toast"

// Sample live feed data
const INITIAL_FEED = [
  {
    id: 1,
    type: "alert",
    content: "EMERGENCY ALERT: Flood barriers failing in sector 7G of Neo Tokyo. Evacuation recommended.",
    timestamp: "12:42:15",
    severity: "high",
    location: "Neo Tokyo",
  },
  {
    id: 2,
    type: "social",
    user: {
      name: "CyberRunner",
      avatar: "/placeholder-user.jpg",
    },
    content: "Water levels rising in the lower district. Anyone else seeing this? #FloodWatch",
    location: "New Shanghai",
    timestamp: "12:38:01",
    verified: true,
  },
  {
    id: 3,
    type: "update",
    content: "Weather system predicts 85% chance of severe thunderstorms in the next 6 hours.",
    timestamp: "12:35:22",
    severity: "medium",
    location: "Neo Tokyo",
  },
  {
    id: 4,
    type: "social",
    user: {
      name: "DataDrifter",
      avatar: "/placeholder-user.jpg",
    },
    content:
      "Corporate water filtration systems offline in sectors 3-5. Anyone have alternative sources? #ResourceCrisis",
    location: "Cyber Delhi",
    timestamp: "12:30:45",
    verified: false,
  },
  {
    id: 5,
    type: "alert",
    content: "INFRASTRUCTURE ALERT: Power grid instability detected in eastern districts due to water damage.",
    timestamp: "12:25:18",
    severity: "medium",
    location: "Neo Tokyo",
  },
]

function FeedItem({ item, onReply }: { item: any; onReply: (id: number) => void }) {
  const [glitching, setGlitching] = useState(false)

  // Randomly trigger glitch effect
  useEffect(() => {
    if (item.type === "alert" && item.severity === "high") {
      const interval = setInterval(() => {
        setGlitching(true)
        setTimeout(() => setGlitching(false), 500)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [item])

  // Get severity color
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

  if (item.type === "alert") {
    return (
      <div
        className={`border border-purple-900/50 bg-black/60 backdrop-blur-sm rounded-md p-3 ${glitching ? "translate-x-[1px]" : ""}`}
      >
        <div className="flex items-start gap-3">
          <div className="bg-red-900/30 p-2 rounded-md">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <Badge className={`${getSeverityColor(item.severity)} uppercase text-xs`}>{item.severity} alert</Badge>
              <span className="text-xs text-purple-300">{item.timestamp}</span>
            </div>
            {glitching ? (
              <GlitchText text={item.content} className="text-sm text-white" />
            ) : (
              <p className="text-sm text-white">{item.content}</p>
            )}
            {item.location && (
              <div className="flex items-center gap-1 mt-1 text-xs text-purple-300">
                <MapPin className="h-3 w-3 text-purple-400" />
                {item.location}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (item.type === "social") {
    return (
      <div className="border border-purple-900/50 bg-black/60 backdrop-blur-sm rounded-md p-3">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
            <AvatarFallback>{item.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="font-medium text-sm">{item.user.name}</span>
                {item.verified && <UserCheck className="h-3 w-3 text-cyan-400" />}
              </div>
              <span className="text-xs text-purple-300">{item.timestamp}</span>
            </div>
            <p className="text-sm mt-1">{item.content}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-purple-300">
                <MapPin className="h-3 w-3 text-purple-400" />
                {item.location}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-purple-400 hover:text-cyan-400 hover:bg-purple-950/30 px-2"
                onClick={() => onReply(item.id)}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-purple-900/50 bg-black/60 backdrop-blur-sm rounded-md p-3">
      <div className="flex justify-between items-start">
        <p className="text-sm">{item.content}</p>
        <span className="text-xs text-purple-300 ml-2">{item.timestamp}</span>
      </div>
      {item.location && (
        <div className="flex items-center gap-1 mt-1 text-xs text-purple-300">
          <MapPin className="h-3 w-3 text-purple-400" />
          {item.location}
        </div>
      )}
    </div>
  )
}

export default function LiveFeed({ selectedLocation }: { selectedLocation: string | null }) {
  const [feed, setFeed] = useState(INITIAL_FEED)
  const [message, setMessage] = useState("")
  const [filteredFeed, setFilteredFeed] = useState(INITIAL_FEED)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const { toast } = useToast()

  // Filter feed based on selected location
  useEffect(() => {
    if (selectedLocation) {
      setFilteredFeed(feed.filter((item) => !item.location || item.location === selectedLocation))
    } else {
      setFilteredFeed(feed)
    }
  }, [feed, selectedLocation])

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const locations = [
          "Neo Tokyo",
          "New Shanghai",
          "Cyber Delhi",
          "Digital Lagos",
          "Virtual Berlin",
          "Neon Cairo",
          "Synth Sydney",
          "Quantum Rio",
        ]
        const randomLocation = locations[Math.floor(Math.random() * locations.length)]

        // Only add messages for the selected location or if no location is selected
        if (!selectedLocation || selectedLocation === randomLocation) {
          const newMessage = {
            id: Date.now(),
            type: Math.random() > 0.5 ? "alert" : "social",
            content:
              Math.random() > 0.5
                ? "WEATHER UPDATE: Atmospheric pressure dropping rapidly in coastal regions."
                : "Just witnessed drone rescue operations in the flooded market district. Impressive tech! #RescueBots",
            timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
            severity: Math.random() > 0.5 ? "medium" : "low",
            location: randomLocation,
            user:
              Math.random() > 0.5
                ? {
                    name: "NeonShadow",
                    avatar: "/placeholder-user.jpg",
                  }
                : {
                    name: "GridWalker",
                    avatar: "/placeholder-user.jpg",
                  },
            verified: Math.random() > 0.7,
          }

          setFeed((prev) => [newMessage, ...prev].slice(0, 20))
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [selectedLocation])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        type: "social",
        user: {
          name: "User",
          avatar: "/placeholder-user.jpg",
        },
        content: message,
        location: selectedLocation || "Your Location",
        timestamp: new Date().toLocaleTimeString("en-US", { hour12: false }),
        verified: true,
      }

      setFeed((prev) => [newMessage, ...prev])
      setMessage("")

      if (replyingTo) {
        toast({
          title: "Reply Sent",
          description: "Your reply has been posted to the feed",
        })
        setReplyingTo(null)
      }
    }
  }

  const handleReply = (id: number) => {
    const item = feed.find((item) => item.id === id)
    if (item && item.type === "social") {
      setReplyingTo(id)
      setMessage(`@${item.user.name} `)
    }
  }

  const handleCameraClick = () => {
    toast({
      title: "Camera Access",
      description: "Camera functionality will be available in the next update",
    })
  }

  return (
    <div className="flex flex-col h-full relative z-0">
      <div className="p-4 border-b border-purple-900/50 backdrop-blur-sm bg-black/30">
        <h2 className="text-lg font-bold text-cyan-400">Live Updates</h2>
        <p className="text-xs text-purple-300">
          {selectedLocation
            ? `Real-time feed from ${selectedLocation}`
            : "Real-time feed from citizens and emergency systems"}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {filteredFeed.length > 0 ? (
            filteredFeed.map((item) => <FeedItem key={item.id} item={item} onReply={handleReply} />)
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 text-cyan-400 text-lg">No live updates for {selectedLocation}</div>
              <p className="text-sm text-purple-300">Check back later or subscribe to alerts</p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-purple-900/50 backdrop-blur-sm bg-black/30">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 border-purple-900/50 bg-purple-950/20 text-purple-400 hover:text-cyan-400 hover:bg-purple-950/30"
            onClick={handleCameraClick}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              replyingTo
                ? "Type your reply..."
                : selectedLocation
                  ? `Report from ${selectedLocation}...`
                  : "Report your situation..."
            }
            className="bg-purple-950/20 border-purple-900/50 text-white placeholder:text-purple-400/70 focus-visible:ring-cyan-500"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            variant="outline"
            size="icon"
            className="shrink-0 border-purple-900/50 bg-purple-950/20 text-purple-400 hover:text-cyan-400 hover:bg-purple-950/30"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-purple-300 flex items-center justify-between">
          <span>
            {replyingTo ? "Replying to message" : "Citizen reporting system active"}
            {replyingTo && (
              <Button
                variant="link"
                size="sm"
                className="text-xs text-cyan-400 p-0 h-auto"
                onClick={() => {
                  setReplyingTo(null)
                  setMessage("")
                }}
              >
                Cancel
              </Button>
            )}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Connected
          </span>
        </div>
      </div>
    </div>
  )
}
