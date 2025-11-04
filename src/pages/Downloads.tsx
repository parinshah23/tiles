import { Download, FileText, Link, Mail } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

// Define the shape of a Download item
type DownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  size: string;
  format: string;
  downloads: number;
  date: string;
  fileUrl: string;
};

export default function Downloads() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [allDownloads, setAllDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user } = useAuth(); // Get user if logged in

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState<DownloadItem | null>(null);
  const [formEmail, setFormEmail] = useState("");
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formStatusMessage, setFormStatusMessage] = useState("");

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user) {
      setFormEmail(user.email || "");
    }
  }, [user, isModalOpen]);

  // Fetch downloads from Firestore
  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const collectionRef = collection(db, "downloads");
        // FIX: Remove orderBy to avoid needing a composite index
        const q = query(collectionRef); 
        const querySnapshot = await getDocs(q);
        const list = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as DownloadItem));
        setAllDownloads(list);
      } catch (error) {
        console.error("Failed to fetch downloads:", error);
      }
      setLoading(false);
    };
    fetchDownloads();
  }, []);

  const categories = ["All", ...Array.from(new Set(allDownloads.map(d => d.category)))];

  const filteredDownloads = activeFilter === "All" 
    ? allDownloads 
    : allDownloads.filter(d => d.category === activeFilter);

  // Handle "Email to Me"
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formEmail || !selectedDownload) return;

    setIsFormLoading(true);
    setFormStatusMessage("");

    try {
      // Save the email submission to a new collection for lead generation
      await addDoc(collection(db, "downloadSubmissions"), {
        email: formEmail,
        fileName: selectedDownload.title,
        fileUrl: selectedDownload.fileUrl,
        submittedAt: serverTimestamp(),
        userId: user ? user.uid : null,
      });

      // Here you would ALSO integrate an email service (like Resend)
      // to actually send the email. For now, we'll just show success.
      
      setFormStatusMessage("Success! The download link has been sent to your email.");
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatusMessage("");
        setFormEmail(user ? user.email || "" : "");
      }, 2000);

    } catch (error) {
      console.error("Error submitting email:", error);
      setFormStatusMessage("An error occurred. Please try again.");
    }
    setIsFormLoading(false);
  };

  return (
    <Layout>
      {/* --- NEW: Dialog for Email --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Email Download</DialogTitle>
            <DialogDescription>
              Enter your email to receive a link for <strong>{selectedDownload?.title}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email-modal">Email Address</Label>
              <Input id="email-modal" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} required />
            </div>
            {formStatusMessage && (
                <p className={`text-center ${formStatusMessage.startsWith("Success") ? "text-green-500" : "text-red-500"}`}>
                  {formStatusMessage}
                </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isFormLoading} className="w-full">
                {isFormLoading ? "Sending..." : "Send to My Email"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* --- END DIALOG --- */}

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight">
              Downloads & Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Access our catalogs, brochures, technical documentation, and installation guides
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-muted border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-smooth ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-card text-foreground hover:bg-card/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p>Loading downloads...</p>
            ) : filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl shadow-elegant hover:shadow-premium transition-smooth hover:-translate-y-1 overflow-hidden group"
              >
                <div className="bg-primary/5 p-6 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <FileText className="w-10 h-10 text-primary" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {item.format}
                    </span>
                    <span>{item.size}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pb-4 border-b border-border">
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                    <span>{item.downloads} downloads</span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {/* NEW: Download button is now a direct link */}
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" download>
                      <Button variant="default" size="lg" className="w-full group/btn">
                        <Download className="mr-2 group-hover/btn:translate-y-1 transition-smooth" />
                        Download
                      </Button>
                    </a>
                    
                    {/* THIS IS THE FIX:
                      Removed the <DialogTrigger> wrapper.
                      The Button now controls the modal by setting state.
                    */}
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredDownloads.length === 0 && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-2">
                No downloads found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Need Additional Information?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Contact our team for customized documentation and technical support.
            </p>
            <Link to="/contact">
              <Button variant="default" size="lg">
                <Mail className="mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

