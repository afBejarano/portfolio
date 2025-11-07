import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-4 font-sans text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl">
          Contact
        </h2>
        <div className="mb-12 h-1 w-24 bg-accent"></div>
        
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Mail className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Get In Touch
                  </h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  I'm currently open to new opportunities in graphics engineering, rendering pipelines, and game engine
                  development. Whether you have a project in mind or want to discuss graphics programming, feel free to reach
                  out!
                </p>
                <Button size="lg" className="w-full bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] text-foreground hover:opacity-90 transition-opacity" asChild>
                  <a href="mailto:andres.bf@hotmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Send Email
                  </a>
                </Button>
                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                  andres.bf@hotmail.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#7B68EE]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#7B68EE]/20 p-2">
                    <MapPin className="h-5 w-5 text-[#7B68EE]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#7B68EE] to-[#00E6B8] bg-clip-text text-transparent">
                    Location
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 text-[#00E6B8] flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Bogotá, Colombia</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-[#7B68EE] flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">(+57) 317 371 9024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Social Links */}
          <div className="space-y-6">
            <Card className="border-[#00E6B8]/30 bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-[#00E6B8]/20 p-2">
                    <Github className="h-5 w-5 text-[#00E6B8]" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-[#00E6B8] to-[#7B68EE] bg-clip-text text-transparent">
                    Connect Online
                  </h3>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  Check out my work on GitHub or connect with me on LinkedIn. I'm always interested in discussing graphics engineering projects and opportunities.
                </p>
                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-[#00E6B8]/30 bg-[#00E6B8]/10 text-[#00E6B8] hover:bg-[#00E6B8]/20 hover:border-[#00E6B8]/50 transition-all" 
                    asChild
                  >
                    <a href="https://github.com/afBejarano" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-5 w-5" />
                      GitHub Profile
                    </a>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full border-[#7B68EE]/30 bg-[#7B68EE]/10 text-[#7B68EE] hover:bg-[#7B68EE]/20 hover:border-[#7B68EE]/50 transition-all" 
                    asChild
                  >
                    <a href="https://linkedin.com/in/andres-bejarano" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-5 w-5" />
                      LinkedIn Profile
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <footer className="mt-24 border-t border-border pt-8 text-center">
        <p className="font-mono text-sm text-muted-foreground">
          © 2025 Andres Bejarano · Graphics Engineer · Built with Next.js & Tailwind CSS
        </p>
      </footer>
    </section>
  )
}
