"use client"

import { useEffect, useRef } from "react"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }> = []

    const particleCount = 50 // Reduced from 80
    const connectionDistance = 150
    const mouse = { x: 0, y: 0 }
    const mouseRadius = 200

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5, // Smaller particles
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.15)" // More transparent trail
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Mouse interaction - particles move away from cursor
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy)

        if (distanceToMouse < mouseRadius) {
          const force = (mouseRadius - distanceToMouse) / mouseRadius
          particle.vx += (dx / distanceToMouse) * force * 0.5
          particle.vy += (dy / distanceToMouse) * force * 0.5
        }

        // Apply velocity with damping
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.98 // Damping
        particle.vy *= 0.98

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle - more subtle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 255, 218, 0.3)" // Reduced opacity from 0.6
        ctx.fill()

        // Draw connections - more subtle
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const opacity = (1 - distance / connectionDistance) * 0.15 // Reduced from 0.3
            ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`
            ctx.lineWidth = 0.5 // Thinner lines
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener("resize", setCanvasSize)
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-bg" />
}
