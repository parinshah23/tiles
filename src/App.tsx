import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";

// Import critical components immediately
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AdminRoute from "./components/AdminRoute";
import AuthRoute from "./components/AuthRoute";

// Lazy load non-critical pages for code splitting
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Downloads = lazy(() => import("./pages/Downloads"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const RoofTiles = lazy(() => import("./pages/RoofTiles"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<PageLoader />}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="/products/:id"
            element={
              <Suspense fallback={<PageLoader />}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageLoader />}>
                <Projects />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="/downloads"
            element={
              <Suspense fallback={<PageLoader />}>
                <Downloads />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="/roof-tiles"
            element={
              <Suspense fallback={<PageLoader />}>
                <RoofTiles />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            }
          />

          {/* Protected User Route */}
          <Route element={<AuthRoute />}>
            <Route
              path="/wishlist"
              element={
                <Suspense fallback={<PageLoader />}>
                  <WishlistPage />
                </Suspense>
              }
            />
          </Route>

          {/* Protected Admin Route */}
          <Route element={<AdminRoute />}>
            <Route
              path="/admin"
              element={
                <Suspense fallback={<PageLoader />}>
                  <AdminPage />
                </Suspense>
              }
            />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

