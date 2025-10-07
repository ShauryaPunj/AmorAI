import { Button } from "@/components/ui/button";
import { Activity, Brain, FileText, Play } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-medical-ai.jpg";

const Hero = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const icons = [
    { Icon: Activity, label: "Listens", color: "from-primary to-primary-glow" },
    { Icon: FileText, label: "Reads", color: "from-primary-glow to-accent" },
    { Icon: Brain, label: "Reasons", color: "from-accent to-primary" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden perspective-card">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse-slow opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(0, 123, 131, 0.4) 0%, transparent 70%)",
            animation: "morph 8s ease-in-out infinite, float 6s ease-in-out infinite",
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse-slow opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(0, 123, 131, 0.6) 0%, transparent 70%)",
            animation: "morph 10s ease-in-out infinite reverse, float 8s ease-in-out infinite",
            animationDelay: "1s",
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Hero image background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="container max-w-7xl mx-auto text-center relative z-10">
        {/* Animated icon sequence */}
        <div className="mb-12 flex justify-center gap-12 perspective-card">
          {icons.map((item, index) => {
            const Icon = item.Icon;
            const isActive = activeIcon === index;
            return (
              <div
                key={index}
                className="relative transition-all duration-700"
                style={{
                  transform: isActive 
                    ? "scale(1.2) translateZ(50px) rotateY(0deg)" 
                    : "scale(0.85) translateZ(0px) rotateY(10deg)",
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                <div 
                  className={`p-8 rounded-3xl glass-card holographic relative overflow-hidden ${
                    isActive ? "glow-primary" : ""
                  }`}
                  style={{
                    transform: isActive ? "translateZ(30px)" : "translateZ(0px)",
                  }}
                >
                  {/* Inner glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse-slow" />
                  )}
                  
                  <Icon 
                    className={`w-16 h-16 relative z-10 transition-all duration-500 ${
                      isActive ? "text-primary drop-shadow-[0_0_15px_rgba(0,123,131,0.8)]" : "text-primary/60"
                    }`}
                    style={{
                      filter: isActive ? "drop-shadow(0 0 20px rgba(0, 123, 131, 0.6))" : "none",
                    }}
                  />
                </div>
                <p 
                  className={`mt-4 text-lg font-heading font-semibold transition-all duration-500 ${
                    isActive ? "text-secondary text-xl" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main heading with advanced effects */}
        <div className="mb-8 relative">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold mb-6 leading-tight relative"
            style={{
              transform: `perspective(1000px) translateZ(${mousePosition.y * 2}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <span className="text-gradient block">Agentic Health OS</span>
          </h1>
          <div className="absolute inset-0 blur-2xl opacity-30 text-gradient">
            <span className="text-7xl md:text-8xl lg:text-9xl font-heading font-bold">
              Agentic Health OS
            </span>
          </div>
        </div>

        <p className="text-3xl md:text-4xl font-heading font-medium mb-6 text-secondary/90 animate-fade-in">
          Listens. Reads. Sees. Reasons.
        </p>

        <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-4xl mx-auto leading-relaxed animate-fade-in">
          The world's first agentic multimodal healthcare copilot. 
          An autonomous digital clinician for safer first-level triage.
        </p>

        {/* CTA buttons with enhanced effects */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
          <Button 
            size="lg" 
            className="group text-xl px-12 py-8 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transition-all duration-500 glow-primary font-heading relative overflow-hidden transform hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Triage
              <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="text-xl px-12 py-8 border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-500 font-heading glass-card transform hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10">Watch Demo</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
