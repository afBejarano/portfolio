import { Badge } from "@/components/ui/badge"
import { Code2, Cpu, Layers, Palette, Wrench, Zap } from "lucide-react"

const skillCategories = [
  {
    title: "Graphics APIs",
    icon: Cpu,
    skills: ["Vulkan", "OpenGL", "DirectX", "WebGL"],
  },
  {
    title: "Shading Languages",
    icon: Code2,
    skills: ["GLSL", "HLSL", "ShaderLab", "Cg"],
  },
  {
    title: "Game Engines",
    icon: Layers,
    skills: ["Unity", "Unreal Engine", "Custom Engines"],
  },
  {
    title: "Programming Languages",
    icon: Zap,
    skills: ["C++", "C#", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Specialties",
    icon: Palette,
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div key={index} className="space-y-4 rounded-lg border border-border bg-card/50 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-2">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-mono text-base font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-accent/30 font-mono text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
