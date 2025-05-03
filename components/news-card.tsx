"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, ExternalLink, MapPin, Share2 } from "lucide-react"
import GlitchText from "@/components/glitch-text"
import { useToast } from "@/hooks/use-toast"

interface NewsCardProps {
  data: {
    id: number
    title: string
    location: string
    timestamp: string
    source: string
    category: string
  }
}

export default function NewsCard({ data }: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const { toast } = useToast()

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "disaster":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "resources":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "technology":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
      case "infrastructure":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "weather":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "environment":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/50"
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removed from saved items" : "Saved to your collection",
      description: isSaved
        ? "The article has been removed from your saved items"
        : "The article has been saved to your collection",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Article",
      description: "Sharing functionality will be available in the next update",
    })
  }

  const handleView = () => {
    toast({
      title: "View Full Article",
      description: "Full article view will be available in the next update",
    })
  }

  return (
    <Card
      className="border border-purple-900/50 bg-black/60 backdrop-blur-sm overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-40 bg-gradient-to-br from-purple-900/50 to-cyan-900/50 relative overflow-hidden">
        <div
          className={`absolute inset-0 bg-[url('/placeholder.svg?height=400&width=600')] bg-cover bg-center transition-all duration-500 ${isHovered ? "scale-110 opacity-40" : "opacity-20"}`}
        ></div>

        <div className="absolute top-2 right-2">
          <Badge className={`${getCategoryColor(data.category)} uppercase text-xs`}>{data.category}</Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
          {isHovered ? (
            <GlitchText text={data.title} className="text-lg font-bold text-white" />
          ) : (
            <h3 className="text-lg font-bold text-white">{data.title}</h3>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3 text-sm">
          <MapPin className="h-4 w-4 text-cyan-400" />
          <span className="text-purple-300">{data.location}</span>
        </div>

        <p className="text-sm text-gray-300 mb-3">
          The ongoing environmental crisis has reached a critical point, with significant implications for local
          communities and infrastructure...
        </p>

        <div className="flex items-center justify-between text-xs text-purple-300">
          <div>
            Source: <span className="text-cyan-400">{data.source}</span>
          </div>
          <div>{data.timestamp}</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`${isSaved ? "text-cyan-400" : "text-purple-400"} hover:text-cyan-400 hover:bg-purple-950/30`}
          onClick={handleSave}
        >
          <Bookmark className="h-4 w-4 mr-1" />
          {isSaved ? "Saved" : "Save"}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-purple-400 hover:text-cyan-400 hover:bg-purple-950/30"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="text-purple-400 hover:text-cyan-400 hover:bg-purple-950/30"
          onClick={handleView}
        >
          <ExternalLink className="h-4 w-4 mr-1" />
          View
        </Button>
      </CardFooter>
    </Card>
  )
}
