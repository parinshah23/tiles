import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";

// Import all your pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

import Projects from "./pages/Projects";
import AboutPage from "./pages/AboutPage";
import Downloads from "./pages/Downloads";
import ContactPage from "./pages/ContactPage";
import RoofTiles from "./pages/RoofTiles";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import WishlistPage from "./pages/WishlistPage"; // <-- 1. IMPORT WISHLIST PAGE

// Import the guard components
import AdminRoute from "./components/AdminRoute";
import AuthRoute from "./components/AuthRoute"; // <-- 2. IMPORT AUTH GUARD

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/roof-tiles" element={<RoofTiles />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* 3. ADD THE PROTECTED USER ROUTE */}
          <Route element={<AuthRoute />}>
            <Route path="/wishlist" element={<WishlistPage />} />
            {/* You can add more user-only pages here, like /profile */}
          </Route>

          {/* Protected Admin Route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

