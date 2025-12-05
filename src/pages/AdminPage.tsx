import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageProducts from "@/components/admin/ManageProducts";
import ManageProjects from "@/components/admin/ManageProjects";

import ManageDownloads from "@/components/admin/ManageDownloads"; // 1. Import new component

const AdminPage = () => {
  return (
    <Layout>
      <div className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Manage your website's content
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>

              <TabsTrigger value="downloads">Downloads</TabsTrigger> {/* 2. Add new tab */}
            </TabsList>

            <TabsContent value="products" className="mt-6">
              <ManageProducts />
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <ManageProjects />
            </TabsContent>



            {/* 3. Add new tab content */}
            <TabsContent value="downloads" className="mt-6">
              <ManageDownloads />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;

