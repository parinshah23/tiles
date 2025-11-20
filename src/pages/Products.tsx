import { useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Search, SlidersHorizontal, Eye, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

// Type matches Firestore documents
type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  dimensions?: string;
  area?: string;
  thickness?: string;
  coverage?: string;
  [key: string]: any;
};

const Products = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const { user, wishlist, addToWishlist, removeFromWishlist } = useAuth();

  // ✅ Fetch products and categories dynamically
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setIsLoading(true);
      try {
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);

        const productsList: Product[] = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Product)
        );

        // ✅ Extract unique categories
        const categorySet = new Set<string>();
        productsList.forEach((p) => {
          if (p.category) categorySet.add(p.category);
        });

        setAllProducts(productsList);
        setCategories(["All", ...Array.from(categorySet).sort()]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      setIsLoading(false);
    };

    fetchProductsAndCategories();
  }, []);

  // ✅ Wishlist handling
  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    const isWishlisted = wishlist.some((item) => item.productId === product.id);

    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // ✅ Filter products by search + category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Our <span className="text-accent">Product Catalog</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              ISI Certified paver blocks, tiles, and precast products since 1982
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="bg-card p-6 rounded-xl shadow-elegant sticky top-24">
                <h3 className="text-xl font-display font-bold text-foreground mb-4">Filters</h3>

                {/* ✅ Dynamic Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-smooth ${selectedCategory === category
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-muted"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Product Grid */}
              {isLoading ? (
                <p>Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p>No products found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isWishlisted =
                      user && wishlist.some((item) => item.productId === product.id);

                    return (
                      <div
                        key={product.id}
                        className="group bg-card rounded-xl overflow-hidden shadow-elegant hover:shadow-premium transition-elegant"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-elegant"
                            onError={(e) =>
                            (e.currentTarget.src =
                              "https://placehold.co/600x600/222/fff?text=Image+Missing")
                            }
                          />
                          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-smooth">
                            <button
                              onClick={(e) => handleWishlistToggle(e, product)}
                              className={`w-10 h-10 rounded-full bg-card shadow-elegant flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-smooth ${isWishlisted ? "text-accent" : "text-foreground"
                                }`}
                            >
                              <Heart
                                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                              />
                            </button>
                            <Link to={`/products/${product.id}`}>
                              <button className="w-10 h-10 rounded-full bg-card shadow-elegant flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-smooth">
                                <Eye className="w-5 h-5" />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-sm text-accent font-medium mb-1">
                            {product.category}
                          </p>
                          <h3 className="text-lg font-display font-bold text-foreground mb-2">
                            {product.name}
                          </h3>
                          <div className="flex flex-col text-sm text-muted-foreground">
                            <span>Dimensions: {product.dimensions || "—"}</span>
                            <span>Thickness: {product.thickness || "—"}</span>
                            <span>Coverage: {product.coverage || "—"}</span>
                          </div>
                          <div className="flex justify-end mt-3">
                            <Link to={`/products/${product.id}`}>
                              <Button variant="premium" size="sm">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
