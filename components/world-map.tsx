"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import GlitchText from "@/components/glitch-text"

// Sample data points for weather events
const LOCATIONS = [
  {
    name: "Neo Tokyo",
    position: [1.5, 0.5, 0],
    severity: "high",
    color: "#ff0055",
    population: "18.5 million",
    events: 12,
    alerts: 3,
  },
  {
    name: "New Shanghai",
    position: [-1, 0.8, 0.5],
    severity: "medium",
    color: "#00ccff",
    population: "24.2 million",
    events: 8,
    alerts: 2,
  },
  {
    name: "Cyber Delhi",
    position: [0, -1, 1],
    severity: "low",
    color: "#00ff88",
    population: "19.7 million",
    events: 5,
    alerts: 1,
  },
  {
    name: "Digital Lagos",
    position: [-0.5, -0.8, -1],
    severity: "medium",
    color: "#ffcc00",
    population: "15.3 million",
    events: 7,
    alerts: 2,
  },
  {
    name: "Virtual Berlin",
    position: [0.8, 1, -0.5],
    severity: "high",
    color: "#ff00cc",
    population: "8.9 million",
    events: 10,
    alerts: 4,
  },
  {
    name: "Neon Cairo",
    position: [0.3, -1.2, -0.7],
    severity: "medium",
    color: "#00ffcc",
    population: "12.1 million",
    events: 6,
    alerts: 1,
  },
  {
    name: "Synth Sydney",
    position: [1.2, -0.5, -0.8],
    severity: "high",
    color: "#ff3300",
    population: "9.8 million",
    events: 9,
    alerts: 3,
  },
  {
    name: "Quantum Rio",
    position: [0.7, -0.7, 1.2],
    severity: "low",
    color: "#33ff00",
    population: "11.4 million",
    events: 4,
    alerts: 0,
  },
]

// Weather patterns data
const WEATHER_PATTERNS = [
  { type: "storm", position: [0, 0.5, 2.1], rotation: [0, 0, 0], radius: 0.3, color: "#00ccff", opacity: 0.6 },
  {
    type: "hurricane",
    position: [-1.5, -0.8, 1.5],
    rotation: [Math.PI / 4, 0, 0],
    radius: 0.4,
    color: "#ff00cc",
    opacity: 0.4,
  },
  {
    type: "flood",
    position: [1.8, -0.2, 1],
    rotation: [Math.PI / 3, Math.PI / 6, 0],
    size: 0.8,
    color: "#00ffaa",
    opacity: 0.3,
  },
  {
    type: "drought",
    position: [0.5, 1.8, 0.5],
    rotation: [Math.PI / 5, 0, 0],
    size: 0.6,
    color: "#ff6600",
    opacity: 0.5,
  },
  {
    type: "toxicRain",
    position: [-1.2, 0.8, -1.5],
    rotation: [0, Math.PI / 3, 0],
    radius: 0.5,
    color: "#cc00ff",
    opacity: 0.4,
  },
]

// Add error handling for the texture creation
function createFallbackTexture() {
  // Create a simple colored texture as fallback
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext("2d")
  if (context) {
    context.fillStyle = "#0a1a2a"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Add a grid pattern
    context.strokeStyle = "#1a3a5a"
    context.lineWidth = 1
    for (let i = 0; i < 8; i++) {
      const pos = (i / 8) * canvas.width
      context.beginPath()
      context.moveTo(pos, 0)
      context.lineTo(pos, canvas.height)
      context.stroke()

      context.beginPath()
      context.moveTo(0, pos)
      context.lineTo(canvas.width, pos)
      context.stroke()
    }
  }

  return new THREE.CanvasTexture(canvas)
}

interface WorldMapProps {
  setSelectedLocation: (location: string | null) => void
  timeScale: number
  selectedLocation: string | null
  activeLayer: string
}

export default function WorldMap({ setSelectedLocation, timeScale, selectedLocation, activeLayer }: WorldMapProps) {
  const globeRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [rotationSpeed, setRotationSpeed] = useState(0.001)

  // Create textures procedurally instead of loading external files
  const earthTexture = useMemo(() => {
    try {
      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 512
      const context = canvas.getContext("2d")
      if (context) {
        // Create a dark blue base
        context.fillStyle = "#0a1a2a"
        context.fillRect(0, 0, canvas.width, canvas.height)

        // Add some noise for continents
        for (let i = 0; i < 5000; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const radius = Math.random() * 5 + 1
          const hue = Math.random() * 30 + 140 // blue-green hues
          context.fillStyle = `hsla(${hue}, 70%, 20%, 0.3)`
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }

        // Add grid lines
        context.strokeStyle = "#1a3a5a"
        context.lineWidth = 1

        // Longitude lines
        for (let i = 0; i < 24; i++) {
          const x = (i / 24) * canvas.width
          context.beginPath()
          context.moveTo(x, 0)
          context.lineTo(x, canvas.height)
          context.stroke()
        }

        // Latitude lines
        for (let i = 0; i < 12; i++) {
          const y = (i / 12) * canvas.height
          context.beginPath()
          context.moveTo(0, y)
          context.lineTo(canvas.width, y)
          context.stroke()
        }
      }

      return new THREE.CanvasTexture(canvas)
    } catch (error) {
      console.error("Error creating earth texture:", error)
      return createFallbackTexture()
    }
  }, [])

  // Create a simple cloud texture
  const cloudTexture = useMemo(() => {
    try {
      const canvas = document.createElement("canvas")
      canvas.width = 1024
      canvas.height = 512
      const context = canvas.getContext("2d")
      if (context) {
        context.fillStyle = "#ffffff"

        // Create cloud-like patterns
        for (let i = 0; i < 1000; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const radius = Math.random() * 10 + 5
          context.globalAlpha = Math.random() * 0.2
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fill()
        }
      }

      return new THREE.CanvasTexture(canvas)
    } catch (error) {
      console.error("Error creating cloud texture:", error)
      return createFallbackTexture()
    }
  }, [])

  // Slow down rotation when hovering
  useEffect(() => {
    if (hovered || selectedLocation) {
      setRotationSpeed(0.0001)
    } else {
      setRotationSpeed(0.001)
    }
  }, [hovered, selectedLocation])

  // Rotate the globe
  useFrame(({ clock }) => {
    if (globeRef.current) {
      // Use clock.getElapsedTime() for smoother continuous rotation
      globeRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed * 0.5

      // Apply a gentle wobble for more dynamic movement
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.03
    }
  })

  // Focus camera on selected location
  useEffect(() => {
    if (selectedLocation && globeRef.current) {
      const location = LOCATIONS.find((loc) => loc.name === selectedLocation)
      if (location) {
        // Find the mesh for this location
        const locationMesh = globeRef.current.children.find(
          (child) => child.userData.name === selectedLocation,
        ) as THREE.Mesh

        if (locationMesh) {
          // Get world position of the location
          const worldPos = new THREE.Vector3()
          locationMesh.getWorldPosition(worldPos)

          // Animate globe rotation to focus on the location
          const targetRotation = Math.atan2(worldPos.x, worldPos.z)

          gsap.to(globeRef.current.rotation, {
            y: -targetRotation,
            duration: 1.5,
            ease: "power2.inOut",
          })
        }
      }
    }
  }, [selectedLocation])

  return (
    <group ref={globeRef}>
      {/* Base globe with earth texture */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={earthTexture} color="#1a3a5a" specular={new THREE.Color(0x333333)} shininess={5} />
      </mesh>

      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshPhongMaterial map={cloudTexture} transparent={true} opacity={0.4} depthWrite={false} />
      </mesh>

      {/* Grid overlay */}
      <mesh>
        <sphereGeometry args={[2.03, 36, 36]} />
        <meshBasicMaterial color="#00ffff" wireframe={true} transparent={true} opacity={0.1} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#00ffff" transparent={true} opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Location markers */}
      {LOCATIONS.map((location, index) => (
        <group
          key={index}
          position={[location.position[0] * 2, location.position[1] * 2, location.position[2] * 2]}
          userData={{ name: location.name }}
        >
          <mesh
            onPointerOver={() => setHovered(location.name)}
            onPointerOut={() => setHovered(null)}
            onClick={() => setSelectedLocation(location.name)}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={location.color} emissive={location.color} emissiveIntensity={2} />
          </mesh>

          {/* Pulse effect for severe locations */}
          {(location.severity === "high" || location.name === selectedLocation) && (
            <PulseEffect color={location.color} />
          )}

          {/* Location label */}
          {(hovered === location.name || selectedLocation === location.name) && (
            <Html position={[0, 0.2, 0]} center distanceFactor={10} occlude>
              <div className="bg-black/80 backdrop-blur-md border border-purple-900/50 p-2 rounded-md w-48">
                <div className="text-center mb-1">
                  <GlitchText text={location.name} className="font-bold text-cyan-400" />
                </div>

                {activeLayer === "standard" && (
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-300">Status:</span>
                    <span className="text-white">
                      {location.severity === "high"
                        ? "Critical"
                        : location.severity === "medium"
                          ? "Warning"
                          : "Stable"}
                    </span>
                  </div>
                )}

                {activeLayer === "weather" && (
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-300">Weather:</span>
                    <span className="text-white">
                      {location.severity === "high"
                        ? "Severe Storms"
                        : location.severity === "medium"
                          ? "Heavy Rain"
                          : "Light Precipitation"}
                    </span>
                  </div>
                )}

                {activeLayer === "population" && (
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-300">Population:</span>
                    <span className="text-white">{location.population}</span>
                  </div>
                )}

                {activeLayer === "risk" && (
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-purple-300">Risk Level:</span>
                    <Badge
                      className={`${
                        location.severity === "high"
                          ? "bg-red-500/20 text-red-400 border-red-500/50"
                          : location.severity === "medium"
                            ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                            : "bg-green-500/20 text-green-400 border-green-500/50"
                      }`}
                    >
                      {location.severity === "high" ? "High" : location.severity === "medium" ? "Medium" : "Low"}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-between text-xs">
                  <span className="text-purple-300">Events:</span>
                  <span className="text-white">{location.events}</span>
                </div>

                <div className="flex justify-between text-xs">
                  <span className="text-purple-300">Alerts:</span>
                  <span className="text-white">{location.alerts}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedLocation(location.name)}
                  className="w-full mt-2 text-xs h-7 bg-purple-950/30 border-purple-900/50 text-cyan-400 hover:bg-purple-900/30"
                >
                  View Details
                </Button>
              </div>
            </Html>
          )}
        </group>
      ))}

      {/* Weather pattern overlays */}
      <WeatherPatterns activeLayer={activeLayer} timeScale={timeScale} />
    </group>
  )
}

function PulseEffect({ color }: { color: string }) {
  const pulseRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2
      pulseRef.current.scale.set(scale, scale, scale)

      // Fade opacity based on scale
      const material = pulseRef.current.material as THREE.MeshBasicMaterial
      material.opacity = Math.max(0, 0.5 - (scale - 1) * 2)
    }
  })

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color={color} transparent={true} opacity={0.5} />
    </mesh>
  )
}

function WeatherPatterns({ activeLayer, timeScale }: { activeLayer: string; timeScale: number }) {
  const patternsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (patternsRef.current) {
      // Rotate weather patterns independently from the globe
      patternsRef.current.rotation.y = clock.getElapsedTime() * 0.05

      // Apply time scale to show future predictions
      if (timeScale > 0) {
        // Simulate weather pattern movement based on time scale
        patternsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * (timeScale / 100)
        patternsRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.1) * (timeScale / 100)
      }
    }
  })

  // Only show weather patterns in weather layer or if time scale is active
  const showPatterns = activeLayer === "weather" || timeScale > 0

  return (
    <group ref={patternsRef} visible={showPatterns}>
      {WEATHER_PATTERNS.map((pattern, index) => (
        <group key={index} position={pattern.position} rotation={pattern.rotation}>
          {pattern.type === "storm" || pattern.type === "hurricane" || pattern.type === "toxicRain" ? (
            <mesh>
              <torusGeometry args={[pattern.radius, 0.05, 16, 100]} />
              <meshBasicMaterial color={pattern.color} transparent opacity={pattern.opacity} />
            </mesh>
          ) : (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[pattern.size, pattern.size]} />
              <meshBasicMaterial color={pattern.color} transparent opacity={pattern.opacity} side={THREE.DoubleSide} />
            </mesh>
          )}

          {/* Add animated particles for weather effects */}
          <SimpleWeatherParticles type={pattern.type} color={pattern.color} />
        </group>
      ))}
    </group>
  )
}

// Simplified weather particles component that doesn't rely on accessing geometry attributes
function SimpleWeatherParticles({ type, color }: { type: string; color: string }) {
  // Create a fixed set of particles based on the weather type
  const count = type === "storm" || type === "hurricane" ? 50 : 30
  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      if (type === "storm" || type === "hurricane") {
        // Circular pattern
        const radius = type === "hurricane" ? 0.4 : 0.3
        const angle = (i / count) * Math.PI * 2
        const spread = 0.05
        pos.push(
          Math.cos(angle) * radius + (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          Math.sin(angle) * radius + (Math.random() - 0.5) * spread,
        )
      } else {
        // Area pattern
        const size = type === "flood" ? 0.8 : 0.6
        pos.push((Math.random() - 0.5) * size, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * size)
      }
    }
    return new Float32Array(pos)
  }, [type, count])

  // Individual particle refs for animation
  const particlesRef = useRef<THREE.Group>(null)
  const particleRefs = useRef<THREE.Mesh[]>([])

  // Animate particles
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime()

      particleRefs.current.forEach((particle, i) => {
        if (!particle) return

        if (type === "storm") {
          // Rain-like movement
          particle.position.y -= 0.01
          if (particle.position.y < -0.2) particle.position.y = 0.2
        } else if (type === "hurricane") {
          // Spiral movement
          const angle = time * 2 + (i / count) * Math.PI * 2
          const radius = 0.4 * (0.8 + Math.sin(i) * 0.2)
          particle.position.x = Math.cos(angle) * radius
          particle.position.z = Math.sin(angle) * radius
        } else if (type === "toxicRain") {
          // Slow falling movement
          particle.position.y -= 0.005
          if (particle.position.y < -0.2) particle.position.y = 0.2
        } else {
          // Subtle floating movement
          particle.position.y = Math.sin(time * 0.5 + i) * 0.02
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: count }).map((_, i) => {
        const idx = i * 3
        return (
          <mesh
            key={i}
            ref={(el) => {
              if (el) particleRefs.current[i] = el
            }}
            position={[positions[idx], positions[idx + 1], positions[idx + 2]]}
          >
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}
