import { Layers, Cpu, FileOutput, ArrowRight } from "lucide-react";
import neuralNetworkImg from "@/assets/neural-network.jpg";

const Architecture = () => {
  const layers = [
    { 
      icon: Layers, 
      title: "Inputs", 
      items: ["Voice Streams", "Medical Documents", "Diagnostic Images"],
      color: "from-primary/20 to-transparent"
    },
    { 
      icon: Cpu, 
      title: "Perception", 
      items: ["ASR Models", "OCR Pipeline", "Vision AI"],
      color: "from-primary-glow/20 to-transparent"
    },
    { 
      icon: Cpu, 
      title: "Reasoning", 
      items: ["LangGraph Orchestration", "Multi-Agent System", "Memory Store"],
      color: "from-accent/20 to-transparent"
    },
    { 
      icon: FileOutput, 
      title: "Output", 
      items: ["Structured JSON", "Clinical PDF", "Interactive Dashboard"],
      color: "from-primary/20 to-transparent"
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${neuralNetworkImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-gradient">
            System Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A layered pipeline processing multimodal medical data through perception, reasoning, and output generation
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative mb-16">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <div key={index} className="relative group perspective-card">
                {/* Connection arrow */}
                {index < layers.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-20 items-center">
                    <ArrowRight className="w-6 h-6 text-primary animate-pulse-slow" />
                  </div>
                )}

                <div 
                  className="glass-card p-8 rounded-3xl transition-all duration-700 h-full relative overflow-hidden holographic group-hover:scale-105"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${layer.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Icon container */}
                    <div className="relative mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-glow/10 flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{
                          boxShadow: "0 8px 20px rgba(0, 123, 131, 0.3)",
                        }}
                      >
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 animate-ping opacity-0 group-hover:opacity-100" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-heading font-semibold mb-6 text-secondary text-center group-hover:text-gradient transition-all duration-300">
                      {layer.title}
                    </h3>
                    
                    <ul className="space-y-3">
                      {layer.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="text-sm text-muted-foreground flex items-start gap-3 group-hover:translate-x-1 transition-transform duration-300"
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0 animate-pulse-slow" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Data flow visualization */}
        <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto holographic">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold text-secondary mb-3">
              Real-Time Data Pipeline
            </h3>
            <p className="text-muted-foreground">
              Continuous processing with millisecond-level latency monitoring
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            {[
              "Input Validation",
              "Feature Extraction",
              "Multi-Modal Fusion",
              "Agent Reasoning",
              "Quality Assurance",
              "Output Generation"
            ].map((stage, i) => (
              <div 
                key={i}
                className="glass-card px-6 py-3 rounded-full text-sm font-medium text-secondary hover:bg-primary/10 transition-all duration-300 hover:scale-105 cursor-default"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" style={{ animationDelay: `${i * 0.2}s` }} />
                  {stage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
