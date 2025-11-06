import { useState, useEffect, FormEvent } from "react";
import { toast, useToast } from "@/components/ui/use-toast";
import { db } from "@/firebaseConfig";
import { supabase } from "@/supabaseClient";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Define Product type
type Product = {
  id: string;
  name: string;
  category: string;
  dimensions: string;
  area: string;
  thickness: string;
  coverage: string;
  image: string;
};

// Initial form state
const initialFormState = {
  name: "",
  category: "Automatic Machine made Concrete Pavers",
  dimensions: "",
  area: "",
  thickness: "",
  coverage: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(
        (docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Product)
      );
      setProducts(list);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!file) {
    setError("Please upload an image.");
    return;
  }

  setUploading(true);
  setError("");

  try {
    // Upload image to Supabase
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    const { error: uploadError } = await supabase.storage
      .from("asian-tiles-assets")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("asian-tiles-assets")
      .getPublicUrl(fileName);

    const productData = {
      ...formData,
      image: urlData.publicUrl,
    };

    // Add product to Firestore
    await addDoc(collection(db, "products"), productData);

    // ✅ Clear form
    setFormData({
      name: "",
      category: "",
      dimensions: "",
      area: "",
      thickness: "",
      coverage: "",
    });
    setFile(null);

    // ✅ Reset the HTML form (clears file input too)
    if (e.target instanceof HTMLFormElement) e.target.reset();

    // ✅ Show toast success message
    toast({
      title: "Product Added ✅",
      description: `${formData.name || "New product"} has been added successfully.`,
      duration: 3000,
    });

    // Refresh products
    fetchProducts();
  } catch (err: any) {
    console.error(err);
    setError(`Error adding product: ${err.message}`);
    toast({
      title: "Error Adding Product ❌",
      description: err.message || "Please try again.",
      variant: "destructive",
    });
  }

  setUploading(false);
};


  // Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  // Open edit modal
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      dimensions: product.dimensions,
      area: product.area,
      thickness: product.thickness,
      coverage: product.coverage,
    });
    setEditModalOpen(true);
  };

  // Update existing product
  const handleUpdateProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setUploading(true);
    setError("");

    try {
      let imageUrl = editingProduct.image;

      // Upload new image if selected
      if (file) {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        const { error: uploadError } = await supabase.storage
          .from("asian-tiles-assets")
          .upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("asian-tiles-assets")
          .getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      const updatedData = {
        ...formData,
        image: imageUrl,
      };

      await updateDoc(doc(db, "products", editingProduct.id), updatedData);
      setEditModalOpen(false);
      setEditingProduct(null);
      setFile(null);
      fetchProducts();
    } catch (err: any) {
      setError(`Error updating product: ${err.message}`);
    }

    setUploading(false);
  };

  const { toast } = useToast();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Add Product */}
      <Card className="lg:col-span-1">
  <CardHeader>
    <CardTitle>Add Product</CardTitle>
    <CardDescription>Fill out the details below.</CardDescription>
  </CardHeader>
  <CardContent>
    <form onSubmit={handleAddProduct} className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label>Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      <div>
        <Label>Category</Label>
        <Select
          onValueChange={(v) => setFormData({ ...formData, category: v })}
          value={formData.category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            <SelectItem value="Floor Tiles">Floor Tiles</SelectItem>
            <SelectItem value="Roof Tiles">Roof Tiles</SelectItem>
            <SelectItem value="Stone Series">Stone Series</SelectItem>
            <SelectItem value="Alloy Series">Alloy Series</SelectItem>
            <SelectItem value="PaverBlock 60mm">PaverBlock 60mm</SelectItem>
            <SelectItem value="PaverBlock 80mm">PaverBlock 80mm</SelectItem>
            <SelectItem value="Automatic Machine made Concrete Pavers">
              Automatic Machine made Concrete Pavers
            </SelectItem>
            <SelectItem value="Concrete Products">Concrete Products</SelectItem>
            <SelectItem value="Cover Block">Cover Block</SelectItem>
            <SelectItem value="Manhole Cover Block">Manhole Cover Block</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Dimensions</Label>
        <Input
          value={formData.dimensions}
          onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
          placeholder="e.g. 200x100mm"
        />
      </div>

      <div>
        <Label>Area</Label>
        <Input
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          placeholder="e.g. 1.5 sq.ft"
        />
      </div>

      <div>
        <Label>Thickness</Label>
        <Input
          value={formData.thickness}
          onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
          placeholder="e.g. 60mm"
        />
      </div>

      <div>
        <Label>Coverage per sqft</Label>
        <Input
          value={formData.coverage}
          onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
          placeholder="e.g. 8 pieces"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full" disabled={uploading}>
        {uploading ? "Adding..." : "Add Product"}
      </Button>
    </form>
  </CardContent>
</Card>
      {/* Product List */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Existing Products</CardTitle>
          <CardDescription>Manage your product catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Thickness</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8}>Loading...</TableCell>
                </TableRow>
              ) : (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover" />
                    </TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell>{p.dimensions}</TableCell>
                    <TableCell>{p.area}</TableCell>
                    <TableCell>{p.thickness}</TableCell>
                    <TableCell>{p.coverage}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => handleEditClick(p)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="ml-2"
                        onClick={() => handleDelete(p.id)}
                      >
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

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the product details below.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <p className="text-xs text-gray-500 mt-1">
                Current image will remain unless replaced.
              </p>
            </div>

            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(v) => setFormData({ ...formData, category: v })}
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  <SelectItem value="Floor Tiles">Floor Tiles</SelectItem>
                  <SelectItem value="Roof Tiles">Roof Tiles</SelectItem>
                  <SelectItem value="Stone Series">Stone Series</SelectItem>
                  <SelectItem value="Alloy Series">Alloy Series</SelectItem>
                  <SelectItem value="PaverBlock 60mm">PaverBlock 60mm</SelectItem>
                  <SelectItem value="PaveBlock 80mm">PaverBlock 80mm</SelectItem>
                  <SelectItem value="Automatic Machine made Concrete Pavers">Automatic Machine made Concrete Pavers</SelectItem>
                  <SelectItem value="Concrete Products">Concrete Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Dimensions</Label>
              <Input
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              />
            </div>

            <div>
              <Label>Area</Label>
              <Input
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>

            <div>
              <Label>Thickness</Label>
              <Input
                value={formData.thickness}
                onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
              />
            </div>

            <div>
              <Label>Coverage per sqft</Label>
              <Input
                value={formData.coverage}
                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Saving..." : "Update Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageProducts;
