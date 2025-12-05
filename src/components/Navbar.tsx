import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import asianTilesLogo from "@/assets/asian-tiles-logo.png";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Get user from our hook
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },

    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-card/95 backdrop-blur-xl shadow-elegant border-b border-border/50"
        : "bg-primary/40 backdrop-blur-md"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Asian Tiles Home">
            <img
              src={asianTilesLogo}
              alt="Asian Tiles - Built to last and designed to inspire"
              className="h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-smooth"
              loading="eager"
              width="120"
              height="64"
            />
          </Link>

          {/* Desktop Navigation with Indicator */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-2 hover:text-accent transition-smooth font-medium group ${isActive(link.href)
                  ? "text-accent"
                  : isScrolled
                    ? "text-foreground"
                    : "text-primary-foreground"
                  }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 ${isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>

                <Button variant="outline" size="lg" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="lg"
                    className={
                      isScrolled
                        ? "text-foreground hover:text-accent"
                        : "text-primary-foreground hover:text-accent"
                    }
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="premium"
                    size="lg"
                    className="shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Quote</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden touch-target p-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-card/95 backdrop-blur-xl rounded-xl mt-2 shadow-premium">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-foreground hover:text-accent transition-smooth font-medium py-2 ${isActive(link.href) ? "text-accent" : ""
                    }`}
                >
                  {link.name}
                </Link>
              ))}


              {user ? (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="premium" size="lg" className="w-full shadow-glow">
                      Get Quote / Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav >
  );
};

