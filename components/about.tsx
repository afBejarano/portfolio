import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, GraduationCap, Award, Languages, Code, Rocket } from "lucide-react"

export function About() {
  return (
    <section id="about" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          About Me
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>
        
        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Professional Background */}
          <div className="space-y-8">
            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Briefcase className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Professional Background
                  </h3>
                </div>
                <p className="mb-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  Software Engineer with <span className="font-semibold text-[#00E6B8]">3+ years of experience</span> specializing in graphics engineering, tool development, and rendering pipelines. My background spans both enterprise applications and game engine graphics.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-[#00E6B8]">▸</span>
                    <div>
                      <p className="font-semibold text-foreground">Software Developer Specialist</p>
                      <p className="text-xs text-muted-foreground">Scotiabank · Current</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-[#00E6B8]">▸</span>
                    <div>
                      <p className="font-semibold text-foreground">Graphics Engineering Consultant</p>
                      <p className="text-xs text-muted-foreground">Freelance · Ongoing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7B68EE]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#7B68EE]/20 p-2">
                    <Rocket className="h-5 w-5 text-[#7B68EE]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent">
                    Key Achievements
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-[#00E6B8]/30 bg-[#00E6B8]/10 p-4">
                    <p className="mb-2 font-semibold text-foreground">Custom Vulkan Engine</p>
                    <p className="text-sm text-muted-foreground">
                      Built a 3D engine achieving <span className="font-semibold text-[#00E6B8]">~30% faster rendering performance</span>
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#7B68EE]/30 bg-[#7B68EE]/10 p-4">
                    <p className="mb-2 font-semibold text-foreground">VR Applications</p>
                    <p className="text-sm text-muted-foreground">
                      Created VR applications <span className="font-semibold text-[#7B68EE]">published at academic conferences</span>
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#00E6B8]/30 bg-[#00E6B8]/10 p-4">
                    <p className="mb-2 font-semibold text-foreground">Production Tools</p>
                    <p className="text-sm text-muted-foreground">
                      Developed asset validation modules for <span className="font-semibold text-[#00E6B8]">production pipelines</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Education & Expertise */}
          <div className="space-y-8">
            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <GraduationCap className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Education
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-[#00E6B8]/50 pl-4">
                    <p className="font-semibold text-foreground">B.Eng. Computer & Information Systems</p>
                    <p className="text-sm text-muted-foreground">Universidad de los Andes</p>
                  </div>
                  <div className="border-l-2 border-[#7B68EE]/50 pl-4">
                    <p className="font-semibold text-foreground">Post-Graduate Certificate in UX Design</p>
                    <p className="text-sm text-muted-foreground">Humber College</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#7B68EE]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#7B68EE]/20 p-2">
                    <Code className="h-5 w-5 text-[#7B68EE]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent">
                    Core Expertise
                  </h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Deep expertise in <span className="font-semibold text-foreground">C++, C#, Vulkan, Unity, and Unreal Engine</span>. Combining technical depth in shader development and GPU optimization with practical experience in CI/CD automation and scalable software architecture.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] font-mono text-xs">
                    C++
                  </Badge>
                  <Badge variant="secondary" className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] font-mono text-xs">
                    C#
                  </Badge>
                  <Badge variant="secondary" className="border border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE] font-mono text-xs">
                    Vulkan
                  </Badge>
                  <Badge variant="secondary" className="border border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE] font-mono text-xs">
                    Unity
                  </Badge>
                  <Badge variant="secondary" className="border border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] font-mono text-xs">
                    Unreal
                  </Badge>
                  <Badge variant="secondary" className="border border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE] font-mono text-xs">
                    GLSL
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Languages className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Languages
                  </h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 rounded-lg border border-[#00E6B8]/30 bg-[#00E6B8]/10 p-3 text-center">
                    <p className="font-semibold text-foreground">English</p>
                    <p className="text-xs text-muted-foreground">Fluent</p>
                  </div>
                  <div className="flex-1 rounded-lg border border-[#7B68EE]/30 bg-[#7B68EE]/10 p-3 text-center">
                    <p className="font-semibold text-foreground">Spanish</p>
                    <p className="text-xs text-muted-foreground">Native</p>
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
