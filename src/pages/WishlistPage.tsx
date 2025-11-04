import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Eye } from "lucide-react";

const WishlistPage = () => {
  // Get wishlist data and removal function from our hook
  const { wishlist, removeFromWishlist } = useAuth();

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary to-secondary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              My <span className="text-accent">Wishlist</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Your favorite products, all in one place.
            </p>
          </div>
        </div>
      </div>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {wishlist.length === 0 ? (
            // Show this if the wishlist is empty
            <div className="text-center max-w-lg mx-auto">
              <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                Your wishlist is empty.
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Browse our products and click the heart icon to save items for later.
              </p>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Start Browsing
                </Button>
              </Link>
            </div>
          ) : (
            // Show the wishlist items
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-elegant hover:shadow-premium transition-smooth">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = "https://placehold.co/600x600/222/fff?text=Image+Missing")}
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-accent font-medium mb-1">{item.category}</p>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 truncate">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold text-accent mb-4">₹{item.price}/sq.ft</p>
                    <div className="flex gap-2">
                      <Link to={`/products/${item.productId}`} className="flex-1">
                        <Button variant="premium" size="sm" className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromWishlist(item.productId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default WishlistPage;

