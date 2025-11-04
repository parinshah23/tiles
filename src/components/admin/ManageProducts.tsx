import { useState, useEffect, FormEvent } from "react";
import { db } from "@/firebaseConfig"; // Use @/ alias
import { supabase } from "@/supabaseClient"; // Use @/ alias
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Define the shape of a Product
type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  [key: string]: any; // Allow other fields
};

// Define the initial state for our form
const initialFormState = {
  name: "",
  description: "",
  price: 0,
  size: "200x100mm",
  finish: "Natural",
  thickness: "60mm",
  material: "Concrete",
  category: "Paver Blocks",
  inStock: true,
  features: "", // We'll split this by commas
  specifications: "", // We'll parse this as JSON
};

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 1. FETCH ALL PRODUCTS
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsCollection = collection(db, "products");
      const q = query(productsCollection, orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Product));
      setProducts(productsList);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products. Check security rules and component paths.");
    }
    setLoading(false);
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. HANDLE FORM INPUT CHANGES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 3. HANDLE FORM SUBMIT (CREATE PRODUCT)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // 1. Upload image to Supabase
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("asian-tiles-assets") // Your bucket name
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: urlData } = supabase.storage
        .from("asian-tiles-assets")
        .getPublicUrl(fileName);
      
      const imageUrl = urlData.publicUrl;

      // 3. Prepare data for Firestore
      let specs = {};
      try {
        specs = JSON.parse(formData.specifications || "{}");
      } catch (jsonError) {
        throw new Error("Specifications field is not valid JSON.");
      }

      const newProduct = {
        ...formData,
        price: Number(formData.price), // Ensure price is a number
        image: imageUrl,
        features: formData.features.split(",").map(f => f.trim()).filter(f => f), // Convert comma-separated string to array
        specifications: specs, // Convert string to JSON object
        inStock: Boolean(formData.inStock),
      };

      // 4. Save product document to Firestore
      await addDoc(collection(db, "products"), newProduct);

      // 5. Reset form and refetch products
      setFormData(initialFormState);
      setFile(null);
      if (e.target instanceof HTMLFormElement) {
        e.target.reset(); // Reset file input
      }
      fetchProducts(); // Refresh the list

    } catch (err: any) {
      console.error(err);
      setError(`Failed to add product: ${err.message}`);
    }
    setUploading(false);
  };

  // 4. HANDLE DELETE PRODUCT
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts(); // Refresh the list
    } catch (err: any) {
      console.error(err);
      setError(`Failed to delete product: ${err.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ADD PRODUCT FORM */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Fill out the form to add a new product to the catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} accept="image/*" required />
            </div>

            <div>
              <Label htmlFor="price">Price (per sq.ft)</Label>
              <Input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paver Blocks">Paver Blocks</SelectItem>
                  <SelectItem value="Precast Products">Precast Products</SelectItem>
                  <SelectItem value="Contemporary Tiles">Contemporary Tiles</SelectItem>
                  <SelectItem value="Pyramid Design">Pyramid Design</SelectItem>
                  <SelectItem value="Windoor Products">Windoor Products</SelectItem>
                  <SelectItem value="Outdoor Pavers">Outdoor Pavers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Input id="features" name="features" placeholder="e.g. Anti-slip, Water resistant" value={formData.features} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="specifications">Specifications (JSON format)</Label>
              <Textarea id="specifications" name="specifications" placeholder='e.g. {"Thickness": "10mm"}' value={formData.specifications} onChange={handleChange} />
            </div>
            
            {/* Add more fields for size, finish, etc. as needed */}
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Product"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* PRODUCTS LIST */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <CardDescription>A list of all products currently in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5}>Loading products...</TableCell></TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₹{product.price}/sq.ft</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" disabled>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProducts;

