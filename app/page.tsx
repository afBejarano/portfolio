import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { ShaderShowcase } from "@/components/shader-showcase"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { ParticleBackground } from "@/components/particle-background"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <ParticleBackground />
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <ShaderShowcase />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}
