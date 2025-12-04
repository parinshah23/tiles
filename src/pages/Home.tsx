import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ClientLogos } from "@/components/ClientLogos";
import { ProcessFlow } from "@/components/ProcessFlow";
import { About } from "@/components/About";
import { InstagramFeed } from "@/components/InstagramFeed";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LazyImage } from "@/components/LazyImage";
import marbleGraniteImg from "@/assets/marble-granite.jpg";

const Home = () => {
    return (
        <Layout>
            <Hero />

            <About />

            <InstagramFeed />

            <ClientLogos />

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
                                <LazyImage
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
