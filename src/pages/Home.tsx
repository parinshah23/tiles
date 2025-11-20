import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ProcessFlow } from "@/components/ProcessFlow";
import { About } from "@/components/About";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import floorTilesImg from "@/assets/floor-tiles.jpg";
import wallTilesImg from "@/assets/wall-tiles.jpg";
import marbleGraniteImg from "@/assets/marble-granite.jpg";
import designerCollectionImg from "@/assets/designer-collection.jpg";

const featuredCategories = [
  {
    title: "Paver Blocks",
    description: "Durable concrete paver blocks for all applications",
    image: floorTilesImg,
    link: "/products?category=paver",
  },
  {
    title: "Precast Products",
    description: "High-quality precast concrete solutions",
    image: wallTilesImg,
    link: "/products?category=precast",
  },
  {
    title: "Contemporary Tiles",
    description: "Modern tile designs for urban spaces",
    image: marbleGraniteImg,
    link: "/products?category=contemporary",
  },
  {
    title: "Pyramid Design Tiles",
    description: "Unique pyramid pattern tiles",
    image: designerCollectionImg,
    link: "/products?category=pyramid",
  },
  {
    title: "Windoor Products",
    description: "Specialized window and door solutions",
    image: floorTilesImg,
    link: "/products?category=windoor",
  },
  {
    title: "Outdoor Pavers",
    description: "Weather-resistant outdoor paving solutions",
    image: wallTilesImg,
    link: "/products?category=outdoor",
  },
];

const Home = () => {
  return (
    <Layout>
      <Hero />

      <About />

      {/* Featured Categories */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Unique Featured <span className="text-accent">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our diverse range of paver blocks, tiles, and precast products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCategories.map((category, index) => (
              <Link
                key={category.title}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl shadow-elegant hover:shadow-premium hover:-translate-y-2 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                  />
                </div>

                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent opacity-85 group-hover:opacity-95 transition-smooth" />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform group-hover:translate-y-[-8px] transition-transform duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-0.5 bg-accent" />
                    <ArrowRight className="w-5 h-5 text-accent group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-accent transition-smooth">{category.title}</h3>
                  <p className="text-sm text-primary-foreground/90">{category.description}</p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <Eye className="w-6 h-6 text-accent" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button variant="hero" size="lg" className="group shadow-glow hover:shadow-premium hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  View All Products
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ProcessFlow />

      {/* Virtual Showroom CTA */}
      <section className="py-20 md:py-32 gradient-premium">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl shadow-premium overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
                  <Eye className="w-5 h-5" />
                  <span>VIRTUAL SHOWROOM</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  Explore Our Showroom Virtually
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experience our complete range of paver blocks, tiles, and precast products from the comfort of your home. Quality you can trust, innovation you can see.
                </p>
                <div>
                  <Link to="/products">
                    <Button variant="default" size="lg" className="group">
                      <Eye className="mr-2" />
                      View Products
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="aspect-square lg:aspect-auto">
                <img
                  src={marbleGraniteImg}
                  alt="Asian Tiles virtual showroom - Premium paver blocks showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let our experts help you choose the perfect tiles for your dream project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="bg-accent hover:bg-accent/90">
                Get Free Quote
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="outline" size="xl" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
