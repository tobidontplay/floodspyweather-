"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Bell,
  Calendar,
  Cloud,
  Droplets,
  FileText,
  Home,
  Map,
  MessageSquare,
  Settings,
  Users,
  X,
} from "lucide-react"
import GlitchText from "@/components/glitch-text"
import { useToast } from "@/hooks/use-toast"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
  onSelectLocation?: (location: string) => void
}

// Sample locations for the sidebar
const LOCATIONS = [
  "Neo Tokyo",
  "New Shanghai",
  "Cyber Delhi",
  "Digital Lagos",
  "Virtual Berlin",
  "Neon Cairo",
  "Synth Sydney",
  "Quantum Rio",
]

export default function Sidebar({ open, setOpen, onSelectLocation }: SidebarProps) {
  const { toast } = useToast()

  const handleLocationSelect = (location: string) => {
    if (onSelectLocation) {
      onSelectLocation(location)
      setOpen(false) // Close sidebar on mobile after selection
    }
  }

  const handleMenuClick = (menu: string) => {
    toast({
      title: `${menu} Selected`,
      description: `${menu} functionality will be available in the next update`,
    })
  }

  return (
    <div
      className={`fixed inset-0 z-20 lg:relative lg:z-0 transition-all duration-300 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />

      <aside className="relative h-full w-64 bg-black border-r border-purple-900/50 flex flex-col">
        <div className="p-4 border-b border-purple-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-cyan-400" />
            <GlitchText text="FLOODSPY" className="text-lg font-bold text-purple-400" />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-4 w-4 text-purple-400" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-purple-300 uppercase tracking-wider">Main</h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Dashboard")}
                >
                  <Home className="h-4 w-4 mr-3 text-purple-400" />
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Map View")}
                >
                  <Map className="h-4 w-4 mr-3 text-purple-400" />
                  Map View
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Alerts")}
                >
                  <Bell className="h-4 w-4 mr-3 text-purple-400" />
                  Alerts
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Timeline")}
                >
                  <Calendar className="h-4 w-4 mr-3 text-purple-400" />
                  Timeline
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-purple-300 uppercase tracking-wider">Weather</h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Forecast")}
                >
                  <Cloud className="h-4 w-4 mr-3 text-purple-400" />
                  Forecast
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Flood Zones")}
                >
                  <Droplets className="h-4 w-4 mr-3 text-purple-400" />
                  Flood Zones
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Analytics")}
                >
                  <BarChart3 className="h-4 w-4 mr-3 text-purple-400" />
                  Analytics
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-purple-300 uppercase tracking-wider">News</h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Archives")}
                >
                  <FileText className="h-4 w-4 mr-3 text-purple-400" />
                  Archives
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Social Feed")}
                >
                  <MessageSquare className="h-4 w-4 mr-3 text-purple-400" />
                  Social Feed
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Citizen Reports")}
                >
                  <Users className="h-4 w-4 mr-3 text-purple-400" />
                  Citizen Reports
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-purple-300 uppercase tracking-wider">Locations</h3>
              <div className="mt-2 space-y-1">
                {LOCATIONS.map((location) => (
                  <Button
                    key={location}
                    variant="ghost"
                    className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <Map className="h-4 w-4 mr-3 text-purple-400" />
                    {location}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="px-4 text-xs font-semibold text-purple-300 uppercase tracking-wider">System</h3>
              <div className="mt-2 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-cyan-400 hover:bg-purple-950/30"
                  onClick={() => handleMenuClick("Settings")}
                >
                  <Settings className="h-4 w-4 mr-3 text-purple-400" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-purple-900/50">
          <div className="bg-purple-950/30 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-cyan-400">SYSTEM STATUS</h3>
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <div className="text-xs text-purple-300 space-y-1">
              <div className="flex justify-between">
                <span>Data Feed:</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between">
                <span>Weather Sensors:</span>
                <span className="text-green-400">87% Active</span>
              </div>
              <div className="flex justify-between">
                <span>Social Monitoring:</span>
                <span className="text-amber-400">Limited</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
