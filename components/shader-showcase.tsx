"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const shaders = [
  {
    id: "original",
    title: "Original",
    description: "Clean output without post-processing effects.",
    technique: "Base Pass",
  },
  {
    id: "crt-dynamic",
    title: "CRT Dynamic",
    description: "Retro CRT monitor effect with scanlines, color separation, and dynamic distortion.",
    technique: "Scanline + Color Separation + Distortion",
  },
  {
    id: "grayscale",
    title: "Grayscale",
    description: "Monochrome conversion using luminance weighting for natural grayscale.",
    technique: "Luminance Conversion",
  },
  {
    id: "chromab",
    title: "Chromatic Aberration",
    description: "RGB channel separation simulating lens distortion for cinematic look.",
    technique: "Channel Offset + Radial Distortion",
  },
  {
    id: "dream",
    title: "Dream",
    description: "Surreal warping effect with color pulsing and rainbow tinting for ethereal visuals.",
    technique: "UV Warping + Color Pulse + Rainbow Tint",
  },
  {
    id: "glitch",
    title: "Glitch",
    description: "Digital corruption with RGB displacement, block displacement, and scanline artifacts.",
    technique: "RGB Split + Block Displacement + Scanlines",
  },
  {
    id: "posterization",
    title: "Posterization",
    description: "Color quantization effect reducing color palette to 5 distinct levels.",
    technique: "Color Quantization",
  },
  {
    id: "pixelation",
    title: "Pixelation",
    description: "Low-resolution pixelation effect for retro gaming aesthetic.",
    technique: "Pixel Sampling",
  },
  {
    id: "fog",
    title: "Noise/Fog",
    description: "Procedural noise overlay with temporal variation for atmospheric effects.",
    technique: "Multi-Layer Noise + Temporal Variation",
  },
]

function ShaderCanvas({ activeShader }: { activeShader: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      const dpr = window.devicePixelRatio || 1
      const newWidth = rect.width * dpr
      const newHeight = rect.height * dpr
      
      if (canvas.width !== newWidth || canvas.height !== newHeight) {
        canvas.width = newWidth
        canvas.height = newHeight
        // Reset transformation matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }
    }

    // Initial resize
    resizeCanvas()
    
    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    // Create base texture with geometric shapes
    const createBaseTexture = () => {
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = 512
      tempCanvas.height = 512
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return null

      tempCtx.fillStyle = "#1a1a2e"
      tempCtx.fillRect(0, 0, 512, 512)

      tempCtx.fillStyle = "#ff0077"
      tempCtx.fillRect(50, 50, 150, 150)

      tempCtx.fillStyle = "#00ffff"
      tempCtx.beginPath()
      tempCtx.moveTo(256, 50)
      tempCtx.lineTo(406, 200)
      tempCtx.lineTo(256, 200)
      tempCtx.closePath()
      tempCtx.fill()

      tempCtx.fillStyle = "#00ff88"
      tempCtx.beginPath()
      tempCtx.arc(128, 350, 80, 0, Math.PI * 2)
      tempCtx.fill()

      tempCtx.fillStyle = "#8b5cf6"
      tempCtx.fillRect(300, 300, 150, 100)

      tempCtx.strokeStyle = "#ffffff"
      tempCtx.lineWidth = 8
      tempCtx.beginPath()
      tempCtx.moveTo(0, 256)
      tempCtx.lineTo(512, 256)
      tempCtx.stroke()
      tempCtx.beginPath()
      tempCtx.moveTo(256, 0)
      tempCtx.lineTo(256, 512)
      tempCtx.stroke()

      return tempCanvas
    }

    const baseTexture = createBaseTexture()
    if (!baseTexture) return

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      
      if (w === 0 || h === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      // Resize canvas if dimensions changed
      const dpr = window.devicePixelRatio || 1
      const physicalWidth = w * dpr
      const physicalHeight = h * dpr
      
      if (canvas.width !== physicalWidth || canvas.height !== physicalHeight) {
        canvas.width = physicalWidth
        canvas.height = physicalHeight
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)
      }
      
      timeRef.current += 0.05

      // Draw base texture scaled to canvas (using logical coordinates)
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(baseTexture, 0, 0, w, h)

      // Reset transform to get image data in physical pixels
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      // Get image data using physical pixel dimensions
      const imageData = ctx.getImageData(0, 0, physicalWidth, physicalHeight)
      const data = imageData.data
      // Restore scale for next frame
      ctx.scale(dpr, dpr)

      // Apply shader effects
      if (activeShader === "crt-dynamic") {
        // CRT effect with scanlines and color separation
        for (let y = 0; y < physicalHeight; y++) {
          const logicalY = y / dpr
          const scanline = Math.floor(logicalY / 4)
          const offset = Math.sin(timeRef.current * 2 + logicalY * 0.01) * 2
          for (let x = 0; x < physicalWidth; x++) {
            const idx = (y * physicalWidth + x) * 4
            const mod = scanline % 4
            if (mod === 0) {
              data[idx] = Math.min(255, data[idx] * 1.5) // Red channel
            } else if (mod === 1) {
              data[idx + 1] = Math.min(255, data[idx + 1] * 1.5) // Green channel
            } else if (mod === 2) {
              data[idx + 2] = Math.min(255, data[idx + 2] * 1.5) // Blue channel
            }
            data[idx + 3] = 220
          }
        }
      } else if (activeShader === "grayscale") {
        // Grayscale conversion
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
          data[i] = gray
          data[i + 1] = gray
          data[i + 2] = gray
        }
      } else if (activeShader === "chromab") {
        // Chromatic aberration
        const aberration = 3 * dpr
        for (let y = 0; y < physicalHeight; y++) {
          for (let x = 0; x < physicalWidth; x++) {
            const idx = (y * physicalWidth + x) * 4
            const rIdx = Math.max(0, Math.min(physicalWidth - 1, x + aberration)) * 4 + y * physicalWidth * 4
            const bIdx = Math.max(0, Math.min(physicalWidth - 1, x - aberration)) * 4 + y * physicalWidth * 4
            if (rIdx < data.length && bIdx >= 0) {
              data[idx] = imageData.data[rIdx]
              data[idx + 2] = imageData.data[bIdx + 2]
            }
          }
        }
      } else if (activeShader === "dream") {
        // Dream effect with warping and color pulsing
        const pulse = Math.sin(timeRef.current * 3) * 0.1 + 0.9
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * pulse * 1.1)
          data[i + 1] = Math.min(255, data[i + 1] * pulse * 1.2)
          data[i + 2] = Math.min(255, data[i + 2] * pulse * 1.3)
        }
      } else if (activeShader === "glitch") {
        // Glitch effect - RGB split and block displacement
        for (let y = 0; y < physicalHeight; y++) {
          const logicalY = y / dpr
          const block = Math.floor(logicalY / 20)
          const blockNoise = Math.sin(block * 0.1 + timeRef.current * 5)
          
          for (let x = 0; x < physicalWidth; x++) {
            const idx = (y * physicalWidth + x) * 4
            
            // RGB split glitch - consistent per scanline
            const rgbOffset = Math.sin(logicalY * 0.1 + timeRef.current * 2) * 2 * dpr
            
            // Block displacement glitch
            if (blockNoise > 0.8) {
              const offset = Math.sin(timeRef.current * 10 + logicalY) * 10 * dpr
              const srcX = Math.max(0, Math.min(physicalWidth - 1, Math.floor(x + offset)))
              const srcIdx = (y * physicalWidth + srcX) * 4
              
              // RGB split
              const rX = Math.max(0, Math.min(physicalWidth - 1, Math.floor(x + rgbOffset)))
              const bX = Math.max(0, Math.min(physicalWidth - 1, Math.floor(x - rgbOffset)))
              const rIdx = (y * physicalWidth + rX) * 4
              const bIdx = (y * physicalWidth + bX) * 4
              
              data[idx] = imageData.data[rIdx] // Red from offset
              data[idx + 1] = imageData.data[srcIdx + 1] // Green from displaced
              data[idx + 2] = imageData.data[bIdx + 2] // Blue from offset
              
              // Random color inversion
              if (Math.random() > 0.98) {
                data[idx] = 255 - data[idx]
                data[idx + 1] = 255 - data[idx + 1]
                data[idx + 2] = 255 - data[idx + 2]
              }
            } else {
              // Normal RGB split without displacement
              const rX = Math.max(0, Math.min(physicalWidth - 1, Math.floor(x + rgbOffset)))
              const bX = Math.max(0, Math.min(physicalWidth - 1, Math.floor(x - rgbOffset)))
              const rIdx = (y * physicalWidth + rX) * 4
              const bIdx = (y * physicalWidth + bX) * 4
              const srcIdx = (y * physicalWidth + x) * 4
              
              data[idx] = imageData.data[rIdx]
              data[idx + 1] = imageData.data[srcIdx + 1]
              data[idx + 2] = imageData.data[bIdx + 2]
            }
          }
        }
      } else if (activeShader === "posterization") {
        // Posterization
        const levels = 5
        for (let i = 0; i < data.length; i += 4) {
          const gray = (data[i] + data[i + 1] + data[i + 2]) / 3
          const level = Math.floor((gray / 255) * levels)
          const value = (level / levels) * 255
          data[i] = value * 0.9
          data[i + 1] = value * 1.1
          data[i + 2] = value * 0.95
        }
      } else if (activeShader === "pixelation") {
        // Pixelation - create new image data
        const pixelSize = 8 * dpr
        const pixelatedData = ctx.createImageData(physicalWidth, physicalHeight)
        for (let y = 0; y < physicalHeight; y += pixelSize) {
          for (let x = 0; x < physicalWidth; x += pixelSize) {
            let r = 0, g = 0, b = 0, count = 0
            for (let py = 0; py < pixelSize && y + py < physicalHeight; py++) {
              for (let px = 0; px < pixelSize && x + px < physicalWidth; px++) {
                const idx = ((y + py) * physicalWidth + (x + px)) * 4
                r += imageData.data[idx]
                g += imageData.data[idx + 1]
                b += imageData.data[idx + 2]
                count++
              }
            }
            r = Math.floor(r / count)
            g = Math.floor(g / count)
            b = Math.floor(b / count)
            // Fill pixelated area
            for (let py = 0; py < pixelSize && y + py < physicalHeight; py++) {
              for (let px = 0; px < pixelSize && x + px < physicalWidth; px++) {
                const idx = ((y + py) * physicalWidth + (x + px)) * 4
                pixelatedData.data[idx] = r
                pixelatedData.data[idx + 1] = g
                pixelatedData.data[idx + 2] = b
                pixelatedData.data[idx + 3] = 255
              }
            }
          }
        }
        // Reset transform before putImageData (pixelation)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.putImageData(pixelatedData, 0, 0)
        ctx.scale(dpr, dpr)
      } else if (activeShader === "fog") {
        // Fog/Noise effect
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 50
          data[i] = Math.max(0, Math.min(255, data[i] + noise))
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
        }
      }

      // Reset transform before putImageData (uses physical pixels)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      if (activeShader !== "pixelation") {
        ctx.putImageData(imageData, 0, 0)
      } else {
        ctx.putImageData(pixelatedData, 0, 0)
      }
      // Restore scale for next frame
      ctx.scale(dpr, dpr)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [activeShader])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
      }}
    />
  )
}

export function ShaderShowcase() {
  const [activeShader, setActiveShader] = useState("original")
  const [fps, setFps] = useState(0)
  const [frameTime, setFrameTime] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const performanceRef = useRef({ frameCount: 0, lastTime: performance.now() })

  useEffect(() => {
    const updatePerformance = () => {
      const now = performance.now()
      const delta = now - performanceRef.current.lastTime
      performanceRef.current.frameCount++
      performanceRef.current.lastTime = now

      const currentFps = Math.round(1000 / delta)
      setFps(currentFps)
      setFrameTime(delta)

      if (performance.memory) {
        const usedMB = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        setMemoryUsage(usedMB)
      }

      requestAnimationFrame(updatePerformance)
    }
    const id = requestAnimationFrame(updatePerformance)
    return () => cancelAnimationFrame(id)
  }, [])

  const currentShader = shaders.find((s) => s.id === activeShader) || shaders[0]

  return (
    <section id="shaders" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Live Shader Demonstrations
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main shader display */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-lg transition-all hover:border-accent hover:shadow-accent/20">
              <div className="aspect-video overflow-hidden bg-[#0a0a0a] relative">
                <ShaderCanvas activeShader={activeShader} />
              </div>
              <div className="border-t border-border bg-card/50 p-6">
                <h3 className="mb-2 text-xl font-bold text-card-foreground">{currentShader.title}</h3>
                <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {currentShader.description}
                </p>
                <Badge variant="secondary" className="border border-accent/30 font-mono text-xs">
                  {currentShader.technique}
                </Badge>
              </div>
            </div>

            {/* Shader selection buttons */}
            <div className="grid grid-cols-3 gap-2">
              {shaders.map((shader) => (
                <Button
                  key={shader.id}
                  onClick={() => setActiveShader(shader.id)}
                  variant={activeShader === shader.id ? "default" : "outline"}
                  size="sm"
                  className={
                    activeShader === shader.id
                      ? "border-accent bg-accent text-accent-foreground hover:bg-accent/90"
                      : "border-border hover:border-accent hover:bg-accent/10 text-xs"
                  }
                >
                  {shader.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <Card className="border-border bg-card/50">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-bold text-card-foreground">Performance Analytics</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Frame Rate</span>
                    <span className={fps >= 50 ? "text-green-500" : fps >= 30 ? "text-yellow-500" : "text-red-500"}>
                      {fps} FPS
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        fps >= 50 ? "bg-green-500" : fps >= 30 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min((fps / 60) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Frame Time</span>
                    <span className={frameTime <= 16.67 ? "text-green-500" : frameTime <= 33.33 ? "text-yellow-500" : "text-red-500"}>
                      {frameTime.toFixed(1)} ms
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${
                        frameTime <= 16.67 ? "bg-green-500" : frameTime <= 33.33 ? "bg-yellow-500" : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min((frameTime / 16.67) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                {memoryUsage > 0 && (
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span className={memoryUsage < 100 ? "text-green-500" : memoryUsage < 200 ? "text-yellow-500" : "text-red-500"}>
                        {memoryUsage} MB
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all ${
                          memoryUsage < 100 ? "bg-green-500" : memoryUsage < 200 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.min((memoryUsage / 300) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Active Shader</span>
                    <span className="font-mono text-accent">{currentShader.title}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
