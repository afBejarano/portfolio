import { Button } from "@/components/ui/button"
import { Mail, Linkedin } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-6 font-mono text-sm text-accent">
          <span className="mr-2">04.</span>What's Next?
        </h2>
        <h3 className="mb-6 text-balance text-4xl font-bold text-foreground sm:text-5xl">Get In Touch</h3>
        <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground">
          I'm currently open to new opportunities in graphics engineering, rendering pipelines, and game engine
          development. Whether you have a project in mind or want to discuss graphics programming, feel free to reach
          out!
        </p>
        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <a href="mailto:andres.bf@hotmail.com">
              <Mail className="mr-2 h-5 w-5" />
              andres.bf@hotmail.com
            </a>
          </Button>
          <Button size="lg" variant="outline" className="border-accent/30 hover:border-accent bg-transparent" asChild>
            <a href="https://linkedin.com/in/andres-bejarano" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Bogotá, Colombia · (+57) 317 371 9024 · (+1) 647 771 0262
        </p>
      </div>
      <footer className="mt-24 border-t border-border pt-8 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          © 2025 Andres Bejarano · Graphics Engineer · Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </section>
  )
}
