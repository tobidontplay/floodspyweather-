"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import WorldMap from "@/components/world-map"

interface GlobeInterfaceProps {
  setSelectedLocation: (location: string | null) => void
  timeScale: number
  selectedLocation: string | null
}

export default function GlobeInterface({ setSelectedLocation, timeScale, selectedLocation }: GlobeInterfaceProps) {
  const [activeLayer, setActiveLayer] = useState<"standard" | "weather" | "population" | "risk">("standard")
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5])
  const [zoomLevel, setZoomLevel] = useState(5)

  const handleZoomIn = () => {
    if (zoomLevel > 3) {
      setZoomLevel(zoomLevel - 0.5)
    }
  }

  const handleZoomOut = () => {
    if (zoomLevel < 8) {
      setZoomLevel(zoomLevel + 0.5)
    }
  }

  useEffect(() => {
    setCameraPosition([0, 0, zoomLevel])
  }, [zoomLevel])

  return (
    <div className="w-full h-full relative">
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-black/50 border-purple-900/50 text-purple-400 hover:text-cyan-400"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-black/50 border-purple-900/50 text-purple-400 hover:text-cyan-400"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm p-2 rounded-md border border-purple-900/50 flex gap-2">
          <Button
            variant={activeLayer === "standard" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("standard")}
            className={`text-xs ${activeLayer === "standard" ? "bg-purple-900/50 text-cyan-400" : "text-purple-400"}`}
          >
            Standard
          </Button>
          <Button
            variant={activeLayer === "weather" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("weather")}
            className={`text-xs ${activeLayer === "weather" ? "bg-purple-900/50 text-cyan-400" : "text-purple-400"}`}
          >
            Weather
          </Button>
          <Button
            variant={activeLayer === "population" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("population")}
            className={`text-xs ${activeLayer === "population" ? "bg-purple-900/50 text-cyan-400" : "text-purple-400"}`}
          >
            Population
          </Button>
          <Button
            variant={activeLayer === "risk" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveLayer("risk")}
            className={`text-xs ${activeLayer === "risk" ? "bg-purple-900/50 text-cyan-400" : "text-purple-400"}`}
          >
            Risk
          </Button>
        </div>
      </div>

      <Canvas>
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <WorldMap
          setSelectedLocation={setSelectedLocation}
          timeScale={timeScale}
          selectedLocation={selectedLocation}
          activeLayer={activeLayer}
        />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} minDistance={3} maxDistance={8} />
      </Canvas>
    </div>
  )
}
