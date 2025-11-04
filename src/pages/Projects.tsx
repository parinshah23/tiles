import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Hotel, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// NEW: Import Firebase
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// NEW: Define a type for our Project data
type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  area: string;
  year: string;
  image: string;
  description: string;
};

const categories = ["All", "Government", "Commercial", "Residential"];

const Projects = () => {
  // NEW: State for projects and loading
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for filter (same as before)
  const [selectedCategory, setSelectedCategory] = useState("All");

  // NEW: Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const projectsCollectionRef = collection(db, "projects");
        // Optional: Order by year
        const q = query(projectsCollectionRef, orderBy("year", "desc"));
        const querySnapshot = await getDocs(q);
        
        const projectsList: Project[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Project));
        
        setAllProjects(projectsList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  // Filter logic (same as before, but uses state)
  const filteredProjects = allProjects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Residential":
        return Home;
      case "Commercial":
        return Building2;
      case "Government":
        return Hotel;
      default:
        return Building2;
    }
  };

  // NEW: Show a loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground">Loading Projects...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section (Unchanged) */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-accent">Projects</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Trusted by government, real estate leaders, and engineering giants
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/80">
              <span>• HP Government</span>
              <span>• BSBK Group</span>
              <span>• Raheja Group</span>
              <span>• Mor Raipur</span>
              <span>• Mosh Varaya</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section (Unchanged) */}
      <section className="py-12 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className="transition-smooth"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          {/* UPDATED: Map over filteredProjects from state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              return (
                <div
                  key={project.id} // Use database ID
                  className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-premium transition-elegant animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image} // Use database image URL
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-elegant"
                    />
                    {/* ... (rest of the card JSX is the same) ... */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground shadow-glow">
                        {project.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                      <Button variant="hero" size="sm" className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-elegant">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-accent mb-3">
                      <CategoryIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm text-accent font-semibold mb-2">{project.client}</p>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="font-semibold text-foreground">{project.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Area:</span>
                        <span className="font-semibold text-foreground">{project.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Year:</span>
                        <span className="font-semibold text-foreground">{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section (Unchanged) */}
      <section className="py-20 md:py-32 gradient-premium">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Ready to Start <span className="text-accent">Your Project?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you create stunning spaces with our premium tiles and expert installation services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="xl">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;

