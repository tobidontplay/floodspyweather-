"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  intensity?: number
  duration?: number
}

export default function GlitchText({ text, className = "", intensity = 3, duration = 100 }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Update display text when prop changes
    setDisplayText(text)
  }, [text])

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        glitchEffect()
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [text])

  const glitchEffect = () => {
    if (isGlitching) return

    setIsGlitching(true)

    let iterations = 0
    const maxIterations = intensity

    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        // Create glitched version
        return text
          .split("")
          .map((char, index) => {
            // Randomly replace characters
            if (Math.random() < 0.3) {
              const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\`~"
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join("")
      })

      iterations++

      if (iterations >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, duration)
  }

  return (
    <span className={`inline-block ${className} ${isGlitching ? "text-cyan-400" : ""}`} onMouseEnter={glitchEffect}>
      {displayText}
    </span>
  )
}
