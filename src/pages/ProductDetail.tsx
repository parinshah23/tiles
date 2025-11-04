import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Heart, Share2, Ruler, Package, Award, Truck } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Use relative path
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

// Type matches our Firestore document
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  finish: string;
  inStock: boolean;
  image: string; // <-- FIX: It's a single string
  images: string[]; // <-- It might ALSO have an images array
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  [key:string]: any;
};

// Mock related products (can be fetched later)
const relatedProducts:any[] = [ // Changed to any[] to match usage
  // { id: 2, name: "Similar Wood Finish", image: "...", price: 48 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, wishlist, addToWishlist, removeFromWishlist } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // FIX: Create a state for the gallery images
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productDocRef = doc(db, "products", id);
        const docSnap = await getDoc(productDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const productData = {
            id: docSnap.id,
            ...data,
          } as Product;
          
          setProduct(productData);

          // --- FIX FOR IMAGES ---
          // Check if an 'images' array exists (for old products)
          if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            setGalleryImages(data.images);
          } 
          // Otherwise, use the single 'image' (for new products)
          else if (data.image) {
            setGalleryImages([data.image]);
          }
          // --- END FIX ---

        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleWishlistToggle = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!product) return;
    
    const isWishlisted = wishlist.some(item => item.productId === product.id);
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = user && product && wishlist.some(item => item.productId === product.id);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Loading Product...</h1>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <Link to="/products">
            <Button variant="link">Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        {/* ... (Your existing Breadcrumb JSX) ... */}
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-accent">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-accent">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-premium">
                <img
                  src={galleryImages[selectedImage]} // <-- FIX: Use galleryImages state
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/600x600/222/fff?text=Image+Missing")}
                />
              </div>
              {/* Only show gallery if there's more than one image */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {galleryImages.map((image, index) => ( // <-- FIX: Use galleryImages state
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
                        selectedImage === index
                          ? "border-accent"
                          : "border-transparent hover:border-muted"
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-3">{product.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold text-accent">
                    ₹{product.price}<span className="text-lg text-muted-foreground">/sq.ft</span>
                  </div>
                  {product.inStock && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      In Stock
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Ruler className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-semibold">{product.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Package className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Finish</p>
                    <p className="font-semibold">{product.finish}</p>
                  </div>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Quantity (sq.ft)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-32"
                  />
                </div>

                <div className="flex gap-3">
                  <Link to="/contact" className="flex-1">
                    <Button variant="hero" size="lg" className="w-full">
                      Request Quote
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleWishlistToggle}
                    className={isWishlisted ? "text-accent" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                </div>
                

                <Link to="/contact" className="block">
                <Button variant="outline" size="lg" className="w-full">
                  Request Sample
                </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                 {/* ... (Your existing Trust Badges JSX) ... */}
                <div className="text-center">
                  <Award className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Premium Quality</p>
                </div>
                <div className="text-center">
                  <Truck className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Fast Delivery</p>
                </div>
                <div className="text-center">
                  <Package className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Secure Packaging</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <Tabs defaultValue="features" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="mt-6 bg-card p-8 rounded-xl">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features && product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                      <p className="text-foreground">{feature}</p>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6 bg-card p-8 rounded-xl">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground">{key}</span>
                      <span className="font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="care" className="mt-6 bg-card p-8 rounded-xl">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">Care & Maintenance</h3>
                <div className="prose prose-lg">
                  <p className="text-foreground">Regular cleaning with mild detergent and water is sufficient for daily maintenance. Avoid using harsh chemicals or abrasive cleaners.</p>
                  <ul className="space-y-2 mt-4">
                    <li className="text-foreground">Sweep or vacuum regularly to remove dirt and debris</li>
                    <li className="text-foreground">Clean spills immediately to prevent staining</li>
                    <li className="text-foreground">Use pH-neutral cleaning products</li>
                    <li className="text-foreground">Avoid dragging heavy furniture across tiles</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-premium transition-elegant"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-elegant"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{item.name}</h3>
                    <p className="text-xl font-bold text-accent">₹{item.price}/sq.ft</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;

