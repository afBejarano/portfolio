"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Palette, Code } from "lucide-react"

const shaders = [
  {
    id: "original",
    title: "Original",
    description: "Clean output without post-processing effects.",
    technique: "Base Pass",
    details: "The base rendering pass without any post-processing effects applied. This serves as the reference output for comparing shader effects.",
    useCases: ["Reference", "Performance Baseline", "Clean Output"],
  },
  {
    id: "crt-dynamic",
    title: "CRT Dynamic",
    description: "Retro CRT monitor effect with scanlines, color separation, and dynamic distortion.",
    technique: "Scanline + Color Separation + Distortion",
    details: "Simulates classic CRT monitors using alternating scanlines, RGB channel separation, and time-based distortion. Perfect for retro gaming aesthetics and nostalgic visual styles.",
    useCases: ["Retro Games", "Vintage Aesthetics", "Nostalgic UI"],
  },
  {
    id: "grayscale",
    title: "Grayscale",
    description: "Monochrome conversion using luminance weighting for natural grayscale.",
    technique: "Luminance Conversion",
    details: "Converts color images to grayscale using the standard luminance formula (0.299*R + 0.587*G + 0.114*B) which matches human eye sensitivity to different color channels.",
    useCases: ["Artistic Effects", "Focus Enhancement", "Memory Optimization"],
  },
  {
    id: "chromab",
    title: "Chromatic Aberration",
    description: "RGB channel separation simulating lens distortion for cinematic look.",
    technique: "Channel Offset + Radial Distortion",
    details: "Mimics camera lens chromatic aberration by offsetting red and blue channels radially from the center. Creates a cinematic, dream-like quality often used in film and high-end games.",
    useCases: ["Cinematic Effects", "Dream Sequences", "Visual Impact"],
  },
  {
    id: "dream",
    title: "Dream",
    description: "Surreal warping effect with color pulsing and rainbow tinting for ethereal visuals.",
    technique: "UV Warping + Color Pulse + Rainbow Tint",
    details: "Combines UV coordinate warping with time-based color pulsing and rainbow tinting to create ethereal, dream-like visuals. The effect uses sine waves for smooth, organic motion.",
    useCases: ["Fantasy Games", "Dream Sequences", "Surreal Art"],
  },
  {
    id: "glitch",
    title: "Glitch",
    description: "Digital corruption with RGB displacement, block displacement, and scanline artifacts.",
    technique: "RGB Split + Block Displacement + Scanlines",
    details: "Simulates digital corruption through RGB channel splitting, random block displacement, and scanline artifacts. The effect uses sine waves for consistent per-scanline RGB offsets and random color inversions for added chaos.",
    useCases: ["Cyberpunk", "Error States", "Transitions"],
  },
  {
    id: "posterization",
    title: "Posterization",
    description: "Color quantization effect reducing color palette to 5 distinct levels.",
    technique: "Color Quantization",
    details: "Reduces the color palette by quantizing RGB values into discrete levels. This creates a stylized, poster-like appearance with distinct color bands, similar to vintage printing techniques.",
    useCases: ["Artistic Styling", "Performance Optimization", "Visual Distinction"],
  },
  {
    id: "pixelation",
    title: "Pixelation",
    description: "Low-resolution pixelation effect for retro gaming aesthetic.",
    technique: "Pixel Sampling",
    details: "Downsamples the image by averaging pixel values within blocks, then upscales to create a pixelated effect. The pixel size is device-pixel-ratio aware for consistent appearance across displays.",
    useCases: ["Retro Games", "8-bit Aesthetics", "Performance Mode"],
  },
  {
    id: "fog",
    title: "Noise/Fog",
    description: "Procedural noise overlay with temporal variation for atmospheric effects.",
    technique: "Multi-Layer Noise + Temporal Variation",
    details: "Applies procedural noise to each pixel with random variation, creating an atmospheric fog or film grain effect. The noise is regenerated each frame for temporal variation.",
    useCases: ["Atmospheric Effects", "Film Grain", "Mood Enhancement"],
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

      tempCtx.fillStyle = "#0F111A"
      tempCtx.fillRect(0, 0, 512, 512)

      // Mint accent
      tempCtx.fillStyle = "#00E6B8"
      tempCtx.fillRect(50, 50, 150, 150)

      // Lavender accent
      tempCtx.fillStyle = "#7B68EE"
      tempCtx.beginPath()
      tempCtx.moveTo(256, 50)
      tempCtx.lineTo(406, 200)
      tempCtx.lineTo(256, 200)
      tempCtx.closePath()
      tempCtx.fill()

      // Mint circle
      tempCtx.fillStyle = "#00E6B8"
      tempCtx.beginPath()
      tempCtx.arc(128, 350, 80, 0, Math.PI * 2)
      tempCtx.fill()

      // Lavender rectangle
      tempCtx.fillStyle = "#7B68EE"
      tempCtx.fillRect(300, 300, 150, 100)

      // Light slate gray lines
      tempCtx.strokeStyle = "#D0D4EA"
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
      if (activeShader === "pixelation") {
        // Pixelation already handled above with its own putImageData
      } else {
        ctx.putImageData(imageData, 0, 0)
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

  const currentShader = shaders.find((s) => s.id === activeShader) || shaders[0]

  return (
    <section id="shaders" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Live Shader Demonstrations
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Canvas Display - Left Column */}
          <div className="lg:col-span-1">
            <Card className="group relative overflow-hidden border-2 border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm transition-all duration-500 hover:border-[#00E6B8]/50 hover:shadow-xl hover:shadow-[#00E6B8]/20">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none"></div>
              
              <div className="relative aspect-square overflow-hidden bg-[#0F111A]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00E6B8]/5 via-transparent to-[#7B68EE]/5 pointer-events-none"></div>
                <ShaderCanvas activeShader={activeShader} />
              </div>
              
              <CardContent className="p-6 border-t border-[#00E6B8]/20">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Palette className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    {currentShader.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {currentShader.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Shader Selection - Middle Column */}
          <div className="lg:col-span-1">
            <Card className="border-[#7B68EE]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#7B68EE]/20 p-2">
                    <Sparkles className="h-5 w-5 text-[#7B68EE]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent">
                    Shader Library
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {shaders.map((shader) => {
                    const isActive = activeShader === shader.id
                    return (
                      <button
                        key={shader.id}
                        onClick={() => setActiveShader(shader.id)}
                        className={`relative group/btn overflow-hidden rounded-lg border-2 p-3 text-left text-xs font-semibold transition-all duration-300 ${
                          isActive
                            ? "border-[#00E6B8] bg-gradient-to-br from-[#00E6B8]/20 to-[#7B68EE]/20 text-[#00E6B8] shadow-lg shadow-[#00E6B8]/20"
                            : "border-[#5A6482]/30 bg-card/50 text-muted-foreground hover:border-[#00E6B8]/50 hover:bg-[#00E6B8]/10 hover:text-[#00E6B8]"
                        }`}
                      >
                        {/* Shine effect on active */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                        )}
                        <div className="relative z-10 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                          <span>{shader.title}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technique Details - Right Column */}
          <div className="lg:col-span-1">
            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm h-full">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Code className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Technique Details
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00E6B8]"></span>
                      Technique
                    </h4>
                    <div className="rounded-lg border border-[#00E6B8]/30 bg-[#00E6B8]/10 p-3">
                      <Badge variant="secondary" className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] font-mono text-xs">
                        {currentShader.technique}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#5A6482]/20">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00E6B8]"></span>
                      Implementation
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {currentShader.details}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-[#5A6482]/20">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#7B68EE]"></span>
                      Use Cases
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentShader.useCases.map((useCase, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] font-mono text-xs"
                        >
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
