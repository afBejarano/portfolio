import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center pt-16">
      <div className="relative z-10 max-w-5xl px-4 text-center">
        <h1 className="mb-6 font-sans text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl lg:text-7xl">
          <span className="text-balance">Andres Bejarano</span>
        </h1>
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-accent sm:text-3xl lg:text-4xl">
          Graphics Engineer
        </h2>
        <p className="mx-auto mb-4 max-w-2xl font-mono text-sm text-muted-foreground sm:text-base">
          Vulkan | Unity | Unreal | Real-time Rendering | Shader Development
        </p>
        <p className="mx-auto mb-12 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Crafting interactive graphics and visual systems with 4+ years of experience in rendering pipelines, custom
          shaders, and performance optimization. Specializing in Vulkan, Unity, and Unreal Engine development.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="border-2 border-accent bg-transparent font-mono text-accent hover:bg-accent/10"
          >
            <a href="#projects">VIEW PROJECTS &gt;&gt;</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-2 border-muted-foreground/30 font-mono hover:border-accent bg-transparent"
          >
            <a href="#contact">GET IN TOUCH</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
