import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tiles.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium paver blocks and precast products showcase"
          className="w-full h-full object-cover scale-105 animate-[scale_20s_ease-in-out_infinite] brightness-75"
        />
        <div className="absolute inset-0 gradient-hero" />

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Enhanced Badge with Glow */}
          <div className="inline-flex items-center gap-3 bg-accent/90 backdrop-blur-sm px-6 py-3 rounded-full text-accent-foreground shadow-glow group hover:shadow-premium transition-smooth border border-accent">
            <div className="w-2 h-2 rounded-full bg-accent-foreground animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">ISI Licensed Certified | Since 1982</span>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight">
            Built to last and{" "}
            <span className="relative inline-block">
              <span className="text-accent relative z-10">designed to inspire</span>
              <span className="absolute inset-0 bg-accent/20 blur-2xl" />
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-2xl mx-auto font-medium">
            Most Trusted Paver Blocks & Precast Products Manufacturer
          </p>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            We&apos;ve built our reputation on delivering exceptional quality, reliability, and unmatched service
          </p>

          {/* CTA Buttons with Enhanced Styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="group relative overflow-hidden shadow-glow hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
                <span className="relative z-10 flex items-center">
                  Request Quote
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="xl" className="glass-card border-primary-foreground/30 text-primary-foreground hover:bg-white/30 hover:-translate-y-1 transition-all duration-300">
                View Products
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            {[
              { value: "40+", label: "Years" },
              { value: "180+", label: "Clients" },
              { value: "ISI", label: "Certified" }
            ].map((stat, i) => (
              <div key={i} className="bg-card/90 backdrop-blur-md px-6 py-3 rounded-xl hover:bg-card transition-smooth shadow-elegant border border-accent/20">
                <div className="text-2xl md:text-3xl font-display font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};
