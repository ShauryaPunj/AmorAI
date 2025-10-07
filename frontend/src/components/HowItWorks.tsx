import { Mic, FileText, ScanLine, Brain, ClipboardCheck, Zap } from "lucide-react";
import { useState } from "react";

const HowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const steps = [
    {
      icon: Mic,
      title: "Voice ASR",
      description: "Advanced speech recognition captures patient symptoms and medical history",
      color: "from-primary/20 to-primary/5"
    },
    {
      icon: FileText,
      title: "Report OCR",
      description: "Intelligent text extraction from medical documents and lab reports",
      color: "from-primary-glow/20 to-primary-glow/5"
    },
    {
      icon: ScanLine,
      title: "Imaging AI",
      description: "Deep learning analysis of X-rays, MRIs, and diagnostic scans",
      color: "from-accent/20 to-accent/5"
    }
  ];

  return (
    <section className="py-32 px-4 relative particle-bg">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-gradient">
            How It Works
          </h2>
          <div className="flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20 perspective-card">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transform: isHovered ? "translateZ(40px) rotateY(5deg)" : "translateZ(0) rotateY(0deg)",
                  transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(100%+1rem)] w-8 z-0">
                    <div className="flex items-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/50 animate-pulse-slow"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div 
                  className="glass-card p-10 rounded-3xl transition-all duration-700 relative overflow-hidden h-full holographic"
                  style={{
                    boxShadow: isHovered 
                      ? "0 20px 60px rgba(0, 123, 131, 0.4), 0 0 40px rgba(0, 123, 131, 0.2)" 
                      : "0 8px 32px rgba(11, 16, 33, 0.4)",
                  }}
                >
                  {/* Animated background gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div className="relative mb-8">
                      <div 
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-glow/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          boxShadow: isHovered ? "0 0 30px rgba(0, 123, 131, 0.5)" : "none",
                        }}
                      >
                        <Icon 
                          className="w-10 h-10 text-primary transition-all duration-500 group-hover:scale-110"
                          style={{
                            filter: isHovered ? "drop-shadow(0 0 10px rgba(0, 123, 131, 0.8))" : "none",
                          }}
                        />
                      </div>
                      
                      {/* Orbit animation */}
                      {isHovered && (
                        <div className="absolute inset-0 animate-spin-slow">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary absolute top-0 left-1/2 -translate-x-1/2" />
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-secondary group-hover:text-gradient transition-all duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Processing flow */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-6 glass-card p-6 rounded-full">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary/50 animate-pulse-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
            <Zap className="w-8 h-8 text-primary animate-glow" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary/50 animate-pulse-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Reasoning output */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto perspective-card">
          <div className="glass-card p-10 rounded-3xl hover:scale-105 transition-all duration-500 holographic relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Brain className="w-14 h-14 text-primary mx-auto mb-6 animate-float group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-secondary text-center">
              Reasoning Engine
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center text-lg">
              Multi-modal data synthesized through advanced LangGraph agents with persistent memory
            </p>
          </div>

          <div className="glass-card p-10 rounded-3xl hover:scale-105 transition-all duration-500 holographic relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <ClipboardCheck className="w-14 h-14 text-primary mx-auto mb-6 animate-float group-hover:scale-110 transition-transform duration-500" style={{ animationDelay: '0.5s' }} />
            <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4 text-secondary text-center">
              Care Plans
            </h3>
            <p className="text-muted-foreground leading-relaxed text-center text-lg">
              Comprehensive clinical recommendations delivered as JSON and PDF reports
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
