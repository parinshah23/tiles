import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "Excellent quality paver blocks. We used them for our society driveway and they look fantastic. Highly durable and great finish.",
    date: "2 months ago"
  },
  {
    name: "Amit Patel",
    rating: 5,
    text: "Asian Tiles provided the best service. The team was very helpful in selecting the right design for our garden pathway. Timely delivery too.",
    date: "1 month ago"
  },
  {
    name: "Suresh Singh",
    rating: 5,
    text: "Very happy with the precast boundary walls. Strong, sturdy and good looking. Definitely recommend them for any construction needs.",
    date: "3 weeks ago"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            What Our <span className="text-accent">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say about our quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-smooth flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
                <span className="ml-auto text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                "{review.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                  alt="Google"
                  className="w-4 h-4"
                />
                <span className="text-xs font-medium text-muted-foreground">Posted on Google</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://maps.app.goo.gl/HudbXU8cxDk6trzM7?g_st=aw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="gap-2 group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                alt="Google"
                className="w-5 h-5"
              />
              Rate us on Google
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
