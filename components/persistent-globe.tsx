"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import WorldMap from "@/components/world-map"

interface PersistentGlobeProps {
  selectedLocation: string | null
  setSelectedLocation: (location: string | null) => void
  timeScale: number
  className?: string
}

export default function PersistentGlobe({
  selectedLocation,
  setSelectedLocation,
  timeScale,
  className = "",
}: PersistentGlobeProps) {
  const [zoomLevel, setZoomLevel] = useState(5)
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5])
  const [activeLayer, setActiveLayer] = useState<"standard" | "weather" | "population" | "risk">("standard")
  const { toast } = useToast()

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
    <div className={`relative pointer-events-auto ${className}`}>
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
