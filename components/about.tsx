export function About() {
  return (
    <section id="about" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          About Me
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>
        <div className="grid gap-12">
          <div className="space-y-6">
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              Software Engineer with 4+ years of experience specializing in graphics engineering, tool development, and
              rendering pipelines. My background spans both enterprise applications and game engine graphics, with deep
              expertise in C++, C#, Vulkan, Unity, and Unreal Engine.
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              I've built a custom Vulkan-based 3D engine achieving ~30% faster rendering performance, developed asset
              validation modules for production pipelines, and created VR applications published at academic
              conferences. My work combines technical depth in shader development and GPU optimization with practical
              experience in CI/CD automation and scalable software architecture.
            </p>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground">
              Currently working as a Software Developer Specialist at Scotiabank while continuing graphics engineering
              consulting. I hold a B.Eng. in Computer & Information Systems from Universidad de los Andes and a
              Post-Graduate Certificate in UX Design from Humber College. Fluent in English and Spanish.
            </p>
            <div className="space-y-4 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">Rendering & Shaders</span>
                  <span className="font-mono text-accent">95%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[95%] rounded-full bg-gradient-to-r from-accent to-accent/80"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">Vulkan & Graphics APIs</span>
                  <span className="font-mono text-accent">90%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-chart-2 to-chart-2/80"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-mono text-muted-foreground">Unity & Unreal</span>
                  <span className="font-mono text-accent">92%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-accent to-chart-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
