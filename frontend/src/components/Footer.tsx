import { Github, FileText, Users, Presentation, Mail, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const links = [
    { icon: Github, label: "GitHub", href: "#", description: "View source code" },
    { icon: FileText, label: "Documentation", href: "#", description: "Technical docs" },
    { icon: Users, label: "Team", href: "#", description: "Meet the builders" },
    { icon: Presentation, label: "Pitch Deck", href: "#", description: "Full presentation" }
  ];

  const social = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Mail, href: "#" }
  ];

  return (
    <footer className="py-24 px-4 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Main links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-8 px-6 glass-card border-border/50 hover:border-primary/50 hover:glow-primary transition-all duration-500 flex flex-col items-center gap-4 group perspective-card"
                asChild
              >
                <a href={link.href} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <span className="text-base font-heading font-semibold text-secondary block mb-1">
                      {link.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {link.description}
                    </span>
                  </div>
                </a>
              </Button>
            );
          })}
        </div>

        {/* Brand section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-block glass-card px-8 py-4 rounded-full">
            <p className="text-3xl md:text-4xl font-heading font-bold text-gradient">
              Agentic Health OS
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Building the future of autonomous healthcare through responsible AI innovation
          </p>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            {social.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  className="w-12 h-12 rounded-xl glass-card border border-border/50 hover:border-primary/50 flex items-center justify-center hover:glow-primary transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground/80 text-center md:text-left">
            © 2025 Agentic Health OS. Built for the future of healthcare.
          </p>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>•</span>
            <span className="glass-card px-3 py-1 rounded-full text-xs">
              Hackathon Project
            </span>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </footer>
  );
};

export default Footer;
