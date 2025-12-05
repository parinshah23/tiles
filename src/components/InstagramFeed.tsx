import { useEffect } from "react";
import { Instagram } from "lucide-react";

export const InstagramFeed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount to prevent duplicates if re-mounted
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
            <Instagram className="w-6 h-6" />
            <span>FOLLOW US</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Latest from <span className="text-accent">Instagram</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Follow @asiantiles1982 for the latest updates and inspiration
          </p>
        </div>

        {/* Elfsight Widget */}
        <div className="elfsight-app-91091b70-0da8-4744-af8d-1ce9e5c20da8" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
};
