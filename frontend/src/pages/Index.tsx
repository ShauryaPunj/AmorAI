import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Architecture from "@/components/Architecture";
import Ethics from "@/components/Ethics";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <About />
        <HowItWorks />
        <Architecture />
        <Ethics />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
