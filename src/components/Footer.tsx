import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { MessageCircle, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <img src={logo} alt="Brinley Development" className="h-7 w-7" />
              <div>
                <span className="font-display text-sm font-bold text-foreground block">Brinley Development</span>
                <span className="text-[11px] text-primary font-heading">Premium FiveM Servers</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-4 max-w-[260px]">
              High-quality FiveM server packages with clean design, optimized performance, and dedicated support.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://discord.gg/MeuZy3Kd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/watch?v=RRcd0XYYdIk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-card/80 border border-border/40 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-heading">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Reviews</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-heading">
              <li><a href="#product" className="hover:text-primary transition-colors">FiveM Package</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">All Features</a></li>
              <li><a href="https://discord.gg/MeuZy3Kd" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">24/7 Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground font-heading">
              <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted-foreground/50">
            © 2026 Brinley Development. All rights reserved.
          </p>
          <p className="text-[11px] text-muted-foreground/40">
            Premium FiveM Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
