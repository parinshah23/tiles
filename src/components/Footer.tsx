import { Facebook, Instagram, Linkedin, Twitter, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Asian Tiles</h3>
            <p className="text-primary-foreground/80 leading-relaxed mb-4">
              Most Trusted Paver Blocks & Precast Products Manufacturer since 1982. ISI Licensed Certified. Built to last and designed to inspire.
            </p>
            <div className="space-y-2 text-primary-foreground/80 mb-4">
              <p className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+919893258000" className="hover:text-accent transition-smooth">+91 98932 58000</a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+919755384111" className="hover:text-accent transition-smooth">+91 97553 84111</a>
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-accent font-bold text-2xl">180+</p>
                <p className="text-primary-foreground/70">Happy Clients</p>
              </div>
              <div>
                <p className="text-accent font-bold text-2xl">40+</p>
                <p className="text-primary-foreground/70">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },

                { name: "About Us", path: "/about" },
                { name: "Downloads", path: "/downloads" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-smooth"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Products</h4>
            <ul className="space-y-2">
              {[
                "Paver Blocks",
                "Precast Products",
                "Contemporary Tiles",
                "Pyramid Design",
                "Windoor Products",
                "Outdoor Pavers",
              ].map((product) => (
                <li key={product}>
                  <Link
                    to="/products"
                    className="text-primary-foreground/80 hover:text-accent transition-smooth"
                  >
                    {product}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-primary-foreground/80 mb-4">
              Follow us on social media for the latest updates and inspiration.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-smooth"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/70 text-sm">
              © {currentYear} Asian Tiles. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-smooth">
                Terms of Service
              </a>
              <div className="flex items-center gap-2 ml-4 border-l border-primary-foreground/20 pl-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/ISI_mark.svg/1200px-ISI_mark.svg.png"
                  alt="ISI Certified"
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-smooth bg-white rounded-sm p-0.5"
                />
                <span className="text-xs text-primary-foreground/70">ISI Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
