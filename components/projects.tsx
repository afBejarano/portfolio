"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const projects = [
  {
    title: "1.3 Engine",
    description:
      "Modern Vulkan 1.3 graphics engine built with C++20 and LightweightVK wrapper. Features component-based architecture, 10+ post-processing effects, cross-platform asset pipeline, and ImGui overlay for real-time debugging and controls.",
    tags: ["Vulkan 1.3", "C++20", "LightweightVK", "ECS", "Post-Processing"],
    images: ["/1.3/1.png", "/1.3/2.png", "/1.3/3.png", "/1.3/4.png", "/1.3/5.png"],
    github: "https://github.com/danguard96/1.3-engine",
  },
  {
    title: "Mixed Engine",
    description:
      "Sophisticated Vulkan-based 3D graphics engine in C++20 with component-based architecture. Features PBR materials, multi-light system, cubemap skybox, and 14 distinct post-processing effects.",
    tags: ["Vulkan", "C++20", "GLSL", "PBR", "CMake"],
    images: ["/mixed/1.png", "/mixed/2.png", "/mixed/3.png", "/mixed/4.png", "/mixed/5.png", "/mixed/6.png", "/mixed/7.png", "/mixed/8.png", "/mixed/9.png"],
    github: "https://github.com/afBejarano/mixed-engine",
  },
  {
    title: "Three-Dimensional Vulkan Engine",
    description:
      "3D engine using Vulkan API with GLSL shaders for high-performance graphics. Features AI-driven NPCs with pathfinding, dynamic actor maps, and multiplayer support.",
    tags: ["Vulkan", "GLSL", "AI", "Multiplayer"],
    images: ["/capstone/1.png", "/capstone/2.png", "/capstone/3.png", "/capstone/4.png", "/capstone/5.png", "/capstone/6.png"],
    github: "https://github.com/danguard96/CapstoneProject",
  },
  {
    title: "Unity Tag Game",
    description:
      "2D top-view PVE game using Unity Engine with maze-like levels. Features Breadth First Search pathfinding algorithm and advanced visual effects.",
    tags: ["Unity", "C#", "2D", "AI"],
    images: ["/ai/1.png", "/ai/2.png", "/ai/3.png"],
    github: "#",
  },
]


export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Featured Projects
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border bg-card transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/20"
            >
              <div className="aspect-video overflow-hidden bg-muted relative">
                <Carousel className="h-full w-full">
                  <CarouselContent className="h-full">
                    {project.images.map((image, imgIndex) => (
                      <CarouselItem key={imgIndex} className="h-full">
                        <div className="h-full w-full">
                          <img
                            src={image}
                            alt={`${project.title} - Image ${imgIndex + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2 bg-background/80 hover:bg-background" />
                      <CarouselNext className="right-2 bg-background/80 hover:bg-background" />
                    </>
                  )}
                </Carousel>
              </div>
              <CardHeader>
                <CardTitle className="text-balance text-lg text-card-foreground">{project.title}</CardTitle>
                <CardDescription className="text-pretty text-sm leading-relaxed">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="border border-accent/30 font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {project.github !== "#" && (
                  <Button variant="ghost" size="sm" className="text-accent hover:text-accent" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
