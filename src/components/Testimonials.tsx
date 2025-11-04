import { Star } from "lucide-react";
import { useState, useEffect } from "react";
// NEW: Import Firebase
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

// NEW: Define a type for our Testimonial data
type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export const Testimonials = () => {
  // NEW: State for testimonials and loading
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: Fetch testimonials from Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const testimonialsCollectionRef = collection(db, "testimonials");
        // Get the 4 most recent testimonials
        const q = query(testimonialsCollectionRef, limit(4)); 
        const querySnapshot = await getDocs(q);
        
        const testimonialsList: Testimonial[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Testimonial));
        
        setAllTestimonials(testimonialsList);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
      setIsLoading(false);
    };

    fetchTestimonials();
  }, []);
  
  // Optional: Show a shimmer/loading effect
  if (isLoading) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Client <span className="text-accent">Experiences</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Loading testimonials...
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Client <span className="text-accent">Experiences</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trusted by 180+ clients including government, real estate, and engineering sectors
          </p>
        </div>

        {/* UPDATED: Map over allTestimonials from state */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id} // Use database ID
              className="relative bg-card rounded-2xl p-8 shadow-elegant hover:shadow-premium hover:-translate-y-2 transition-all duration-500 animate-fade-in-up overflow-hidden group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* ... (rest of the card JSX is the same) ... */}
              <div className="absolute top-4 right-4 text-8xl text-accent/5 font-serif leading-none group-hover:text-accent/10 transition-smooth">"</div>
              
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-accent text-accent group-hover:scale-110 transition-transform" 
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-6 italic relative z-10 text-sm">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border/50 pt-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-bold shadow-glow">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-smooth">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
