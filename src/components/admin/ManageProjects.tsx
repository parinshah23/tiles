import { useState, useEffect, FormEvent } from "react";
import { db } from "../../firebaseConfig"; // Use relative path
import { supabase } from "../../supabaseClient"; // Use relative path
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { Button } from "../ui/button"; // Use relative path
import { Input } from "../ui/input"; // Use relative path
import { Textarea } from "../ui/textarea"; // Use relative path
import { Label } from "../ui/label"; // Use relative path
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"; // Use relative path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"; // Use relative path
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"; // Use relative path

// Define the shape of a Project
type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  [key: string]: any; // Allow other fields
};

// Define the initial state for our form
const initialFormState = {
  title: "",
  client: "",
  category: "Government",
  location: "",
  area: "",
  year: "2024",
  description: "",
  image: "",
};

const ManageProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // 1. FETCH ALL PROJECTS
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projectsCollection = collection(db, "projects");
      const q = query(projectsCollection, orderBy("title", "asc"));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Project));
      setProjects(projectsList);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects. Check security rules.");
    }
    setLoading(false);
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
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

  // 3. HANDLE FORM SUBMIT (CREATE PROJECT)
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
      const newProject = {
        ...formData,
        image: imageUrl,
      };

      // 4. Save project document to Firestore
      await addDoc(collection(db, "projects"), newProject);

      // 5. Reset form and refetch projects
      setFormData(initialFormState);
      setFile(null);
      if (e.target instanceof HTMLFormElement) {
        e.target.reset(); // Reset file input
      }
      fetchProjects(); // Refresh the list

    } catch (err: any) {
      console.error(err);
      setError(`Failed to add project: ${err.message}`);
    }
    setUploading(false);
  };

  // 4. HANDLE DELETE PROJECT
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects(); // Refresh the list
    } catch (err: any) {
      console.error(err);
      setError(`Failed to delete project: ${err.message}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ADD PROJECT FORM */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>Fill out the form to add a new project.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="image">Project Image</Label>
              <Input id="image" type="file" onChange={handleFileChange} accept="image/*" required />
            </div>

            <div>
              <Label htmlFor="client">Client Name</Label>
              <Input id="client" name="client" value={formData.client} onChange={handleChange} required />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select name="category" onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="area">Area</Label>
              <Input id="area" name="area" placeholder="e.g. 50,000 sq.ft" value={formData.area} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="year">Year</Label>
              <Input id="year" name="year" value={formData.year} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Add Project"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* PROJECTS LIST */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
          <CardDescription>A list of all projects currently in the database.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5}>Loading projects...</TableCell></TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <img src={project.image} alt={project.title} className="w-12 h-12 object-cover rounded-md" />
                    </TableCell>
                    <TableCell>{project.title}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2" disabled>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)}>
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

export default ManageProjects;

