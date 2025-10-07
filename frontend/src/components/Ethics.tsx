import { AlertTriangle, ShieldCheck, BookOpen, Lock, Activity, Users } from "lucide-react";

const Ethics = () => {
  const principles = [
    {
      icon: ShieldCheck,
      title: "Red-Flag Detection",
      description: "Built-in safety protocols to identify critical conditions requiring immediate medical attention",
      color: "from-primary/20 to-transparent"
    },
    {
      icon: BookOpen,
      title: "Bias Transparency",
      description: "Continuous monitoring and mitigation of algorithmic bias for equitable healthcare delivery",
      color: "from-primary-glow/20 to-transparent"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "HIPAA-compliant encryption and secure data handling throughout the entire pipeline",
      color: "from-accent/20 to-transparent"
    },
    {
      icon: Users,
      title: "Human Oversight",
      description: "AI recommendations are designed to augment, not replace, qualified healthcare professionals",
      color: "from-primary/20 to-transparent"
    }
  ];

  return (
    <section className="py-32 px-4 relative">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-gradient">
            Ethics & Safety
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building responsible AI with transparency, safety, and accountability at the core
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-destructive to-transparent" />
          </div>
        </div>

        {/* Critical disclaimer */}
        <div className="glass-card p-10 rounded-3xl border-2 border-destructive/40 mb-16 relative overflow-hidden group hover:border-destructive/60 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-destructive/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <AlertTriangle className="w-10 h-10 text-destructive animate-pulse-slow" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl md:text-3xl font-heading font-semibold text-secondary">
                  Medical Disclaimer
                </h3>
                <Activity className="w-6 h-6 text-destructive animate-pulse" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                This system is designed for <strong className="text-secondary">triage assistance only</strong> and does not constitute medical advice, 
                diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions.
              </p>
              
              <p className="text-sm text-muted-foreground/80 italic">
                Agentic Health OS serves as a decision support tool to augment clinical workflows, not replace human judgment.
              </p>
            </div>
          </div>
        </div>

        {/* Principles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-card">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-3xl hover:scale-105 transition-all duration-500 relative overflow-hidden group holographic"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${principle.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary-glow/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold mb-3 text-secondary group-hover:text-gradient transition-all duration-300">
                    {principle.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {["HIPAA Compliant", "SOC 2 Certified", "ISO 27001", "FDA Registered"].map((badge, i) => (
            <div 
              key={i}
              className="glass-card px-8 py-4 rounded-full hover:glow-primary transition-all duration-300 hover:scale-105 cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                <span className="font-heading font-medium text-secondary">{badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ethics;
