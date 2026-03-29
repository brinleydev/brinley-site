import { motion } from "framer-motion";
import { ShoppingCart, Star, Zap, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.png";

const products = [
  {
    id: 1,
    badge: "BEST SELLER",
    badgeColor: "bg-primary text-primary-foreground",
    name: "Brinley Server V5",
    version: "QBCore · Latest",
    description:
      "Our most advanced FiveM package. 130+ scripts, fully optimized, custom UI, anti-cheat, and professional structure. Ready to launch instantly.",
    price: 125,
    originalPrice: 150,
    discount: "17% OFF",
    stats: [
      { icon: Zap, label: "0.6ms Resmon" },
      { icon: Users, label: "200+ Players" },
      { icon: Shield, label: "Anti-Cheat" },
    ],
    features: ["130+ Scripts", "Custom UI", "24/7 Support", "Free Updates"],
    youtubeId: "RRcd0XYYdIk",
    slug: "brinley-v5",
    highlight: true,
  },
  {
    id: 2,
    badge: "POPULAR",
    badgeColor: "bg-orange-500 text-white",
    name: "QBCore NoPixel 4.0",
    version: "QBCore · NoPixel Inspired",
    description:
      "Premium NoPixel 4.0-inspired full server. Advanced custom scripts, realistic economy, immersive jobs & roles, and custom vehicles.",
    price: 100,
    originalPrice: null,
    discount: null,
    stats: [
      { icon: Zap, label: "Optimized" },
      { icon: Users, label: "Full RP" },
      { icon: Shield, label: "Secure" },
    ],
    features: ["NoPixel 4.0 Style", "Custom Scripts", "Economy System", "Setup Support"],
    youtubeId: "Iuc3aKob1CE",
    slug: "nopixel-4.0",
    highlight: false,
  },
  {
    id: 3,
    badge: "CLASSIC",
    badgeColor: "bg-purple-600 text-white",
    name: "QBCore NoPixel 3.5",
    version: "QBCore · NoPixel Inspired",
    description:
      "Battle-tested NoPixel 3.5-inspired server. Fully customized framework, realistic economy, diverse jobs, and a welcoming community foundation.",
    price: 80,
    originalPrice: null,
    discount: null,
    stats: [
      { icon: Zap, label: "Stable" },
      { icon: Users, label: "Community" },
      { icon: Shield, label: "Tested" },
    ],
    features: ["NoPixel 3.5 Style", "Custom Framework", "Business System", "Full Support"],
    youtubeId: "Du3IecdYIr4",
    slug: "nopixel-3.5",
    highlight: false,
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0] & { slug: string }; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`group relative rounded-2xl border bg-card/60 backdrop-blur-xl flex flex-col overflow-hidden transition-all duration-300 ${
      product.highlight
        ? "border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.08)]"
        : "border-border/40 hover:border-primary/25"
    }`}
  >
    {/* Top glow line */}
    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent ${
      product.highlight ? "via-primary/60" : "via-primary/0 group-hover:via-primary/30"
    } transition-all duration-500`} />

    {/* Video thumbnail */}
    <div className="relative aspect-video w-full overflow-hidden bg-card/80">
      <iframe
        src={`https://www.youtube.com/embed/${product.youtubeId}`}
        title={product.name}
        className="w-full h-full block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {/* Badge */}
      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-heading font-black tracking-widest uppercase ${product.badgeColor}`}>
        {product.badge}
      </div>
      {product.discount && (
        <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-primary/20 border border-primary/40 text-primary text-[10px] font-heading font-black tracking-widest">
          {product.discount}
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1 gap-4">
      {/* Name & version */}
      <div>
        <p className="text-[10px] text-primary/60 font-heading tracking-widest uppercase mb-1">{product.version}</p>
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground font-body leading-relaxed mt-1.5">{product.description}</p>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3">
        {product.stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-heading">
            <stat.icon size={11} className="text-primary" />
            {stat.label}
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-1.5">
        {product.features.map((f, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
              <svg width="6" height="6" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4L3 5.5L6.5 2" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[11px] text-muted-foreground font-body">{f}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border/30" />

      {/* Price + CTA */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-display font-black text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm font-display text-muted-foreground/40 line-through mb-0.5">${product.originalPrice}</span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground/50 font-body">One-time · Free updates</p>
        </div>
        <Link
          to={`/checkout?product=${product.slug}`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-xs tracking-wider hover:opacity-90 transition-all glow-cyan-sm whitespace-nowrap"
        >
          <ShoppingCart size={13} />
          Buy Now
        </Link>
      </div>
    </div>
  </motion.div>
);

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover object-top opacity-[0.10] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 mb-6">
              <ShoppingCart size={12} className="text-primary" />
              <span className="text-primary font-heading text-xs tracking-widest font-semibold uppercase">Marketplace</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-4">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-body">
              Premium FiveM server packages built for performance, ready to launch. One-time payment, free updates included.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24">
        {/* Rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          {[
            { value: "3", label: "Products" },
            { value: "100+", label: "Customers" },
            { value: "4.9", label: "Rating" },
            { value: "24/7", label: "Support" },
          ].map((s, i, arr) => (
            <div key={s.label} className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-lg font-display font-bold text-primary">{s.value}</p>
                <p className="text-[10px] text-muted-foreground font-heading tracking-wider uppercase">{s.label}</p>
              </div>
              {i < arr.length - 1 && <div className="w-px h-8 bg-border/40" />}
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm text-xs text-muted-foreground font-heading">
            <Star size={11} className="text-primary fill-primary" />
            All packages include free setup support via Discord
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
