import { Award, CheckCircle2, Palette, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Serving Beyond Expectation since 1982",
    description: "40+ years of trust and excellence in paver blocks and precast products",
  },
  {
    icon: Award,
    title: "ISI Licensed Certified Manufacturer",
    description: "Government certified quality assurance for all our products",
  },
  {
    icon: Palette,
    title: "Diverse Range of Designs",
    description: "Contemporary, pyramid, and custom designs for every aesthetic",
  },
  {
    icon: CheckCircle2,
    title: "Affordable Quality Without Compromising",
    description: "Premium quality products at competitive prices",
  },
  {
    icon: Shield,
    title: "Secure, Satisfaction Guaranteed",
    description: "Backed by our commitment to quality and customer satisfaction",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 md:py-32 gradient-premium">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="text-accent">Asian Tiles</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your trusted partner in creating beautiful, lasting spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="relative bg-card rounded-2xl p-8 shadow-elegant hover:shadow-premium hover:-translate-y-2 transition-all duration-500 group animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-smooth" />

              {/* Icon with Glow */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-accent-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-smooth">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
