import { useState, useEffect, FormEvent } from "react";
import { db } from "@/firebaseConfig";
import { supabase } from "@/supabaseClient";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Trash2 } from "lucide-react";

type Download = {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  fileUrl: string;
  [key: string]: any;
};

const initialFormState = {
  title: "",
  description: "",
  category: "Brochures",
};

const ManageDownloads = () => {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchDownloads = async () => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "downloads");
      const q = query(collectionRef, orderBy("title", "asc"));
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Download));
      setDownloads(list);
    } catch (err) {
      setError("Failed to fetch downloads.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !formData.title || !formData.category) {
      setError("Please fill out all fields and select a file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      // 1. Upload file to Supabase
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("asian-tiles-assets") // Your bucket name
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Get the public URL
      const { data: urlData } = supabase.storage
        .from("asian-tiles-assets")
        .getPublicUrl(fileName);
      
      const fileUrl = urlData.publicUrl;
      const fileSize = (file.size / (1024 * 1024)).toFixed(2) + " MB"; // Calculate size in MB

      // 3. Save document to Firestore
      await addDoc(collection(db, "downloads"), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        size: fileSize,
        fileUrl: fileUrl,
        format: file.type.split("/")[1]?.toUpperCase() || "File",
        downloads: 0,
        date: new Date().toISOString(),
      });

      // 4. Reset form and refetch
      setFormData(initialFormState);
      setFile(null);
      (e.target as HTMLFormElement).reset();
      fetchDownloads();

    } catch (err: any) {
      setError(`Failed to add download: ${err.message}`);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this file? (This does not delete from storage)")) return;
    try {
      await deleteDoc(doc(db, "downloads", id));
      fetchDownloads();
    } catch (err: any) {
      setError(`Failed to delete download: ${err.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ADD DOWNLOAD FORM */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add New Download</CardTitle>
          <CardDescription>Upload a new file (PDF, catalog, etc.)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">File Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="file">File (PDF, JPG, etc.)</Label>
              <Input id="file" type="file" onChange={handleFileChange} required />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Downloadable File"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* DOWNLOADS LIST */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Existing Downloads</CardTitle>
          <CardDescription>All files currently in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4}>Loading downloads...</TableCell></TableRow>
              ) : (
                downloads.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4" />
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

export default ManageDownloads;

