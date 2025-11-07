"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Layers, Gamepad2, FileCode, Wrench, Settings } from "lucide-react"

const skillCategories = [
  {
    title: "Graphics APIs",
    icon: Layers,
    color: "mint",
    skills: ["Vulkan", "OpenGL", "WebGL"],
  },
  {
    title: "Shading Languages",
    icon: Code,
    color: "purple",
    skills: ["GLSL", "HLSL", "ShaderLab", "Cg"],
  },
  {
    title: "Game Engines",
    icon: Gamepad2,
    color: "mint",
    skills: ["Unity", "Unreal Engine", "Custom Engines"],
  },
  {
    title: "Programming Languages",
    icon: FileCode,
    color: "purple",
    skills: ["C++", "C#", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Specialties",
    icon: Settings,
    color: "mint",
    skills: [
      "Rendering Pipelines",
      "Shader Development",
      "Asset Validation",
      "Performance Optimization",
      "VR/AR",
      "Tool Development",
    ],
  },
  {
    title: "Infrastructure & Tools",
    icon: Wrench,
    color: "slate",
    skills: ["Git", "GitLab CI", "Jenkins", "Docker", "GCP", "AWS"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Skills & Toolset
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>

        {/* Skills Grid - Standardized Card Layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isMint = category.color === "mint"
            const isPurple = category.color === "purple"
            const isSlate = category.color === "slate"
            
            const borderColor = isMint 
              ? "border-[#00E6B8]/30" 
              : isPurple 
              ? "border-[#7B68EE]/30" 
              : "border-[#5A6482]/30"
            
            const iconBg = isMint
              ? "bg-[#00E6B8]/20"
              : isPurple
              ? "bg-[#7B68EE]/20"
              : "bg-[#5A6482]/20"
            
            const iconColor = isMint
              ? "text-[#00E6B8]"
              : isPurple
              ? "text-[#7B68EE]"
              : "text-[#5A6482]"
            
            const titleGradient = isMint
              ? "bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent"
              : isPurple
              ? "bg-gradient-to-r from-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent"
              : "bg-gradient-to-r from-[#5A6482] to-[#7B68EE] bg-clip-text text-transparent"
            
            const badgeBorder = isMint
              ? "border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8]"
              : isPurple
              ? "border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE]"
              : "border-[#5A6482]/30 bg-[#5A6482]/10 text-[#5A6482]"

            return (
              <Card
                key={category.title}
                className={`group relative overflow-hidden border-2 transition-all duration-300 ${borderColor} bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm hover:border-opacity-60 hover:shadow-xl hover:shadow-[#00E6B8]/10`}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full pointer-events-none"></div>

                <CardContent className="p-6">
                  {/* Category Header */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`rounded-full ${iconBg} p-2`}>
                      <Icon className={`h-5 w-5 ${iconColor}`} />
                    </div>
                    <h3 className={`text-xl font-bold ${titleGradient}`}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`border font-mono text-xs transition-all hover:scale-105 hover:shadow-md ${badgeBorder}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
