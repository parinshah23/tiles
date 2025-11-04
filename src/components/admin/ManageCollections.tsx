import { useState, useEffect, FormEvent } from "react";
import { db } from "../../firebaseConfig"; // Use relative path
import { supabase } from "../../supabaseClient"; // Use relative path
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "../ui/button"; // Use relative path
import { Input } from "../ui/input"; // Use relative path
import { Textarea } from "../ui/textarea"; // Use relative path
import { Label } from "../ui/label"; // Use relative path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"; // Use relative path
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; // Use relative path

// Define the shape of a Collection
type Collection = {
  id: string;
  name: string;
  description: string;
  image: string;
  [key: string]: any; // Allow other fields
};

// Define the initial state for our form
const initialFormState = {
  name: "",
  description: "",
  image: "",
  products: 0,
  priceRange: "₹0-0/sq.ft",
  badge: "",
};

const ManageCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 1. FETCH ALL COLLECTIONS
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const collectionsCollection = collection(db, "collections");
      const q = query(collectionsCollection, orderBy("name", "asc"));
      const querySnapshot = await getDocs(q);
      const collectionsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Collection));
      setCollections(collectionsList);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch collections. Check security rules.");
    }
    setLoading(false);
  };

  // Fetch collections on component mount
  useEffect(() => {
    fetchCollections();
  }, []);

  // 2. HANDLE FORM INPUT CHANGES
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 3. HANDLE FORM SUBMIT (CREATE COLLECTION)
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
      const newCollection = {
        ...formData,
        image: imageUrl,
        products: Number(formData.products),
      };

      // 4. Save collection document to Firestore
      await addDoc(collection(db, "collections"), newCollection);

      // 5. Reset form and refetch collections
      setFormData(initialFormState);
      setFile(null);
      if (e.target instanceof HTMLFormElement) {
        e.target.reset(); // Reset file input
      }
      fetchCollections(); // Refresh the list

    } catch (err: any) {
      console.error(err);
      setError(`Failed to add collection: ${err.message}`);
    }
    setUploading(false);
  };

  // 4. HANDLE DELETE COLLECTION
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this collection?")) return;

    try {
      await deleteDoc(doc(db, "collections", id));
      fetchCollections(); // Refresh the list
    } catch (err: any) {
      console.error(err);
      setError(`Failed to delete collection: ${err.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ADD COLLECTION FORM */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add New Collection</CardTitle>
          <CardDescription>Fill out the form to add a new collection.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Collection Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="image">Collection Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} accept="image/*" required />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            
            <div>
              <Label htmlFor="products">No. of Products</Label>
              <Input id="products" name="products" type="number" value={formData.products} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="priceRange">Price Range</Label>
              <Input id="priceRange" name="priceRange" placeholder="e.g. ₹85-150/sq.ft" value={formData.priceRange} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="badge">Badge (optional)</Label>
              <Input id="badge" name="badge" placeholder="e.g. Bestseller" value={formData.badge} onChange={handleChange} />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Collection"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* COLLECTIONS LIST */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Existing Collections</CardTitle>
          <CardDescription>A list of all collections currently in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}>Loading collections...</TableCell></TableRow>
              ) : (
                collections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell>
                      <img src={collection.image} alt={collection.name} className="w-12 h-12 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>{collection.name}</TableCell>
                    <TableCell>{collection.description}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" disabled>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(collection.id)}>
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

export default ManageCollections;

