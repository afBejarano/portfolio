"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, FileText } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { getAssetPath } from "@/lib/utils"

const projects = [
  {
    title: "1.3 Engine",
    year: "2024",
    description:
      "Modern Vulkan 1.3 graphics engine built with C++20 and LightweightVK wrapper. Features component-based architecture, 10+ post-processing effects, cross-platform asset pipeline, and ImGui overlay for real-time debugging and controls.",
    tags: ["Vulkan 1.3", "C++20", "LightweightVK", "ECS", "Post-Processing"],
    images: ["/1.3/1.png", "/1.3/2.png", "/1.3/3.png", "/1.3/4.png", "/1.3/5.png"],
    github: "https://github.com/danguard96/1.3-engine",
  },
  {
    title: "Mixed Engine",
    year: "2024",
    description:
      "Sophisticated Vulkan-based 3D graphics engine in C++20 with component-based architecture. Features PBR materials, multi-light system, cubemap skybox, and 14 distinct post-processing effects.",
    tags: ["Vulkan", "C++20", "GLSL", "PBR", "CMake"],
    images: ["/mixed/1.png", "/mixed/2.png", "/mixed/3.png", "/mixed/4.png", "/mixed/5.png", "/mixed/6.png", "/mixed/7.png", "/mixed/8.png", "/mixed/9.png"],
    github: "https://github.com/afBejarano/mixed-engine",
  },
  {
    title: "Three-Dimensional Vulkan Engine",
    year: "2023",
    description:
      "3D engine using Vulkan API with GLSL shaders for high-performance graphics. Features AI-driven NPCs with pathfinding, dynamic actor maps, and multiplayer support.",
    tags: ["Vulkan", "GLSL", "AI", "Multiplayer"],
    images: ["/capstone/1.png", "/capstone/2.png", "/capstone/3.png", "/capstone/4.png", "/capstone/5.png", "/capstone/6.png"],
    github: "https://github.com/danguard96/CapstoneProject",
  },
  {
    title: "¡Juéguelo!",
    year: "2021",
    description:
      "A mosaic of microgames inspired by WarioWare and Mario Party, showcasing traditional games from Colombia. Each microgame represents a real game traditionally played in Colombia. Built with Unity 2D as a graduation project for Systems and Computing Engineering at Universidad de los Andes.",
    tags: ["Unity", "C#", "2D", "Educational", "Colombia"],
    images: [
      "/jueguelo/1.png",
      "/jueguelo/2.png",
      "/jueguelo/3.png"
    ],
    github: "#",
    demo: "https://k1ngdedede.itch.io/jueguelo",
  },
  {
    title: "Escape Room VR",
    year: "2020",
    description:
      "Unity VR playground designed for ADD and ADHD diagnosis and treatment. An immersive escape room experience that conducts psychological training through games, collecting user data while providing an engaging 3-puzzle challenge in virtual reality.",
    tags: ["Unity", "C#", "VR", "Oculus Quest", "Psychology"],
    images: ["/vr/demo.png"],
    github: "https://github.com/afBejarano/EscapeRoomVR",
    paper: "https://repositorio.uniandes.edu.co/server/api/core/bitstreams/3dd17fed-e0b3-422d-96c9-9ec66cfa7307/content",
  },
].reverse()


export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Featured Projects
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>
        
        {/* Enhanced Timeline Layout - Centered Container */}
        <div className="relative mx-auto max-w-6xl">
          {/* Vertical Timeline Line on the left */}
          <div className="absolute left-8 hidden h-full w-1 -translate-x-1/2 transform md:block">
            <div className="h-full w-full bg-gradient-to-b from-[#00E6B8] via-[#7B68EE] to-[#00E6B8] opacity-30"></div>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-[#00E6B8] via-[#7B68EE] to-[#00E6B8] opacity-50 animate-pulse"></div>
          </div>
          
          <div className="space-y-8 md:space-y-10">
            {projects.map((project, index) => {
              return <ProjectCard key={index} project={project} />
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    })
  }, [api])

  const handleLeftClick = () => {
    if (canScrollPrev) {
      api?.scrollPrev()
    }
  }

  const handleRightClick = () => {
    if (canScrollNext) {
      api?.scrollNext()
    }
  }

  return (
    <div className="relative flex items-start">
      {/* Timeline Node on the left */}
      <div className="absolute left-8 z-20 hidden -translate-x-1/2 transform md:block">
        {/* Outer glow ring */}
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#00E6B8] to-[#7B68EE] opacity-20 blur-md"></div>
        {/* Main node */}
        <div className="relative h-6 w-6 rounded-full border-4 border-background bg-gradient-to-br from-[#00E6B8] to-[#7B68EE] shadow-lg shadow-[#00E6B8]/50">
          {/* Inner pulse */}
          <div className="absolute inset-0 rounded-full bg-[#00E6B8] opacity-50 animate-ping"></div>
        </div>
        {/* Year label */}
        <div className="absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap">
          <span className="rounded-full border-2 border-[#00E6B8]/40 bg-gradient-to-br from-[#00E6B8]/20 to-[#7B68EE]/20 px-4 py-2 text-base font-bold text-[#00E6B8] backdrop-blur-sm shadow-lg shadow-[#00E6B8]/20">
            {project.year}
          </span>
        </div>
      </div>
      
      {/* Project Content - Right side of timeline */}
      <div className="relative ml-0 w-full md:ml-24 md:w-[calc(100%-6rem)]">
        <Card className="group relative overflow-hidden border-2 border-[#5A6482]/30 bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-sm transition-all duration-500 hover:border-[#00E6B8]/50 hover:shadow-2xl hover:shadow-[#00E6B8]/20">
          {/* Glow effect on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00E6B8]/10 via-[#7B68EE]/10 to-[#00E6B8]/10 rounded-lg opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
          
          <div className="flex flex-col md:flex-row">
            {/* Project Image - Left side - Fixed aspect ratio with clickable sides */}
            <div className="relative w-full aspect-video overflow-hidden bg-muted md:w-1/2 md:aspect-video">
              <Carousel setApi={setApi} className="h-full w-full">
                <CarouselContent className="h-full">
                  {project.images.map((image, imgIndex) => (
                    <CarouselItem key={imgIndex} className="h-full">
                      <div className="h-full w-full">
                        <img
                          src={getAssetPath(image)}
                          alt={`${project.title} - Image ${imgIndex + 1}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Clickable left side with shadow indicator */}
              {project.images.length > 1 && canScrollPrev && (
                <div
                  onClick={handleLeftClick}
                  className="absolute left-0 top-0 z-10 h-full w-1/3 cursor-pointer bg-gradient-to-r from-black/20 via-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-50"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[#00E6B8]/20 p-2 backdrop-blur-sm shadow-lg shadow-[#00E6B8]/30">
                    <svg className="h-6 w-6 text-[#00E6B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Clickable right side with shadow indicator */}
              {project.images.length > 1 && canScrollNext && (
                <div
                  onClick={handleRightClick}
                  className="absolute right-0 top-0 z-10 h-full w-1/3 cursor-pointer bg-gradient-to-l from-black/20 via-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-50"
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[#00E6B8]/20 p-2 backdrop-blur-sm shadow-lg shadow-[#00E6B8]/30">
                    <svg className="h-6 w-6 text-[#00E6B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Image counter indicator */}
              {project.images.length > 1 && (
                <div className="absolute bottom-2 right-2 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {current + 1} / {project.images.length}
                </div>
              )}
            </div>
                        
                        {/* Text/Buttons/Tags - Right side */}
                        <div className="flex flex-1 flex-col">
                          <CardHeader className="space-y-4">
                            <div>
                              <CardTitle className="mb-2 text-balance text-xl font-bold bg-gradient-to-r from-[#00E6B8] via-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent">
                                {project.title}
                              </CardTitle>
                              <CardDescription className="text-pretty text-sm leading-relaxed text-muted-foreground">
                                {project.description}
                              </CardDescription>
                            </div>
                            
                            {/* Technologies - Always Visible */}
                            <div className="pt-2">
                              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00E6B8]">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="secondary"
                                    className="border border-[#00E6B8]/40 bg-gradient-to-br from-[#00E6B8]/10 to-[#7B68EE]/10 text-[#00E6B8] font-mono text-xs transition-all hover:border-[#00E6B8]/60 hover:bg-[#00E6B8]/20"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardHeader>
                          
                          {/* Action Buttons - Always Visible */}
                          <CardContent className="mt-auto pt-0">
                            <div className="flex flex-wrap gap-2 border-t border-[#5A6482]/20 pt-4">
                              {project.github !== "#" && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] hover:bg-[#00E6B8]/20 hover:border-[#00E6B8]/50 transition-all" 
                                  asChild
                                >
                                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    View Code
                                  </a>
                                </Button>
                              )}
                              {project.demo && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="border border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE] hover:bg-[#7B68EE]/20 hover:border-[#7B68EE]/50 transition-all" 
                                  asChild
                                >
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Play Game
                                  </a>
                                </Button>
                              )}
                              {project.paper && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] hover:bg-[#00E6B8]/20 hover:border-[#00E6B8]/50 transition-all" 
                                  asChild
                                >
                                  <a href={project.paper} target="_blank" rel="noopener noreferrer">
                                    <FileText className="mr-2 h-4 w-4" />
                                    View Paper
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
