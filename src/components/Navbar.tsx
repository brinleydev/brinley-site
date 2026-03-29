import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#reviews" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isFreeScriptsPage = location.pathname === "/free-scripts";
  const isProductsPage = location.pathname === "/products";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string, label: string) => {
    setActiveLink(label);
    setIsOpen(false);
    if (isHomePage) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-7 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-card/70 backdrop-blur-2xl border border-border/40 shadow-[0_8px_32px_hsl(var(--background)/0.5)]"
            : "bg-card/30 backdrop-blur-xl border border-border/20"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <img src={logo} alt="Brinley" className="h-7 w-7" />
            <div className="flex items-baseline gap-1">
              <span className="font-display text-sm font-black tracking-[0.2em] text-foreground">BRINLEY</span>
              <span className="hidden sm:inline text-[10px] font-heading tracking-[0.15em] text-primary/60 font-semibold">DEV</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href, link.label)}
                className={`relative px-3.5 py-1.5 text-[13px] font-heading font-medium rounded-lg transition-all duration-300 ${
                  activeLink === link.label && isHomePage
                    ? "text-primary-foreground bg-primary/90"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                }`}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/products"
              className={`relative px-3.5 py-1.5 text-[13px] font-heading font-medium rounded-lg transition-all duration-300 ${
                isProductsPage
                  ? "text-primary-foreground bg-primary/90"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/80"
              }`}
            >
              Products
            </Link>
            <Link
              to="/free-scripts"
              className={`relative px-3.5 py-1.5 text-[13px] font-heading font-medium rounded-lg transition-all duration-300 ${
                isFreeScriptsPage
                  ? "text-primary-foreground bg-primary/90"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/80"
              }`}
            >
              Free Scripts
            </Link>
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href="https://discord.gg/MeuZy3Kd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[12px] font-heading font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-all duration-300 flex items-center gap-1"
            >
              Discord <ArrowUpRight size={10} className="opacity-40" />
            </a>
            <Link
              to="/docs"
              className="px-3 py-1.5 text-[12px] font-heading font-semibold text-muted-foreground hover:text-foreground rounded-lg hover:bg-card/60 transition-all duration-300 flex items-center gap-1"
            >
              Docs <ArrowUpRight size={10} className="opacity-40" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground p-1.5 rounded-lg hover:bg-card/60 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border/20 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-0.5">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href, link.label)}
                    className={`py-2.5 px-3 text-sm font-heading font-medium rounded-lg transition-colors text-left ${
                      activeLink === link.label && isHomePage
                        ? "text-primary-foreground bg-primary/90"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <Link
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-3 text-sm font-heading font-medium rounded-lg transition-colors ${
                    isProductsPage ? "text-primary-foreground bg-primary/90" : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/free-scripts"
                  onClick={() => setIsOpen(false)}
                  className={`py-2.5 px-3 text-sm font-heading font-medium rounded-lg transition-colors ${
                    isFreeScriptsPage ? "text-primary-foreground bg-primary/90" : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                  }`}
                >
                  Free Scripts
                </Link>
                <div className="h-px bg-border/20 my-2" />
                <a
                  href="https://discord.gg/MeuZy3Kd"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 text-sm font-heading font-medium text-muted-foreground hover:text-foreground hover:bg-card/60 rounded-lg transition-colors flex items-center gap-2"
                >
                  Discord <ArrowUpRight size={12} className="opacity-40" />
                </a>
                <Link
                  to="/docs"
                  onClick={() => setIsOpen(false)}
                  className="py-2.5 px-3 text-sm font-heading font-medium text-muted-foreground hover:text-foreground hover:bg-card/60 rounded-lg transition-colors flex items-center gap-2"
                >
                  Docs <ArrowUpRight size={12} className="opacity-40" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
