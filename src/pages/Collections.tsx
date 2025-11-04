import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Eye, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// NEW: Import Firebase
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// NEW: Define a type for our Collection data
type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  products: number;
  priceRange: string;
  badge?: string; // Optional field
};

const Collections = () => {
  // NEW: State for collections and loading
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: Fetch collections from Firestore
  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true);
      try {
        const collectionsRef = collection(db, "collections");
        // Optional: Order by name
        const q = query(collectionsRef, orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        
        const collectionsList: Collection[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Collection));
        
        setAllCollections(collectionsList);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
      setIsLoading(false);
    };

    fetchCollections();
  }, []);

  // NEW: Show a loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground">Loading Collections...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section (Unchanged) */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={allCollections[0]?.image || "https://via.placeholder.com/1600x900"}
            alt="Designer Collections"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5" />
              <span>PREMIUM COLLECTIONS</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight">
              Designer <span className="text-accent">Collections</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Curated selections of premium tiles that define luxury and style
            </p>
          </div>
        </div>
        {/* ... (your hero JSX) ... */}
      </section>

      {/* Collections Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {/* UPDATED: Map over allCollections from state */}
            {allCollections.map((collection, index) => (
              <div
                key={collection.id} // Use database ID
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative group ${index % 2 === 1 ? "lg:order-2" : ""}`}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-premium">
                    <img
                      src={collection.image} // Use database image URL
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-elegant"
                    />
                  </div>
                  {collection.badge && (
                    <Badge className="absolute top-6 right-6 bg-accent text-accent-foreground shadow-glow">
                      {collection.badge}
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                      {collection.name}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {collection.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-8 text-foreground">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Products</p>
                      <p className="text-2xl font-bold">{collection.products}+</p>
                    </div>
                    <div className="h-12 w-px bg-border" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                      <p className="text-xl font-bold text-accent">{collection.priceRange}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/products">
                      <Button variant="hero" size="lg" className="group">
                        <Eye className="mr-2" />
                        View Collection
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" size="lg">
                        Request Catalog
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Showroom CTA (Unchanged) */}
      <section className="py-20 md:py-32 gradient-premium">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Experience Our Virtual Showroom
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Explore our collections in an immersive 360° environment. See how different tiles look in real room settings and visualize your dream space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" className="group">
                <Eye className="mr-2" />
                Launch Virtual Tour
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Link to="/products">
                <Button variant="outline" size="xl">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
       {/* ... (your CTA JSX) ... */}
      </section>

      {/* Quality Range Section (Unchanged) */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container mx-auto px-4">
                  <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                      Quality Products for <span className="text-accent">Every Project</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      From residential to commercial applications, find the perfect product range for your needs
                    </p>
                  </div>
        
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: "Standard Range", desc: "Durable products for everyday applications" },
                      { title: "Premium Range", desc: "Enhanced designs for refined projects" },
                      { title: "Designer Range", desc: "Signature collections for exceptional spaces" },
                    ].map((tier, index) => (
                      <div
                        key={tier.title}
                        className="bg-background rounded-xl p-8 shadow-elegant hover:shadow-premium transition-elegant text-center"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">{tier.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{tier.desc}</p>
                        <Link to="/products">
                          <Button variant="outline" size="lg" className="mt-6">
                            Explore Range
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
        {/* ... (your Quality Range JSX) ... */}
      </section>
    </Layout>
  );
};

export default Collections;
