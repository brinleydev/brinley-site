import { motion } from "framer-motion";
import { Download, Star, Package } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.png";
import pickpocketImg from "@/assets/pickpocket.png";
import trapphoneImg from "@/assets/trapphone.png";
import loadingImg from "@/assets/loading.png";

const scripts = [
  {
    title: "[FREE] Shop System Like NoPixel 4.0",
    description:
      "A clean and modern shop system inspired by NoPixel 4.0, built to provide an immersive and efficient shopping experience for your FiveM server. This script gives players access to an interactive store menu with a smooth design and easy-to-use interface.",
    downloads: "3.6k",
    rating: "4.9",
    image: pickpocketImg,
    link: "https://github.com/brinleydev/brinley-shop",
  },
  {
    title: "[FREE] REPORT SYSTEM LIKE NOPIXEL 4.0",
    description:
      "A lightweight and modern report system inspired by NoPixel 4.0, designed to streamline player-to-staff communication. This script allows players to easily submit in-game reports, while staff members can efficiently review, manage, and respond to them in real time",
    downloads: "2.1k",
    rating: "4.9",
    image: trapphoneImg,
    link: "https://github.com/brinleydev/brinley-report",
  },
  {
    title: "[FREE] FISHING SYSTEM INSPIRED NOPIXEL 4.0",
    description:
      "An immersive fishing system inspired by NoPixel 4.0, designed to bring a fun and realistic fishing experience to your FiveM server. Players can cast their lines, catch different types of fish, and enjoy an engaging mini-game system.",
    downloads: "1.4k",
    rating: "4.2",
    image: loadingImg,
    link: "https://github.com/brinleydev/brinley-fishing",
  },
];

const ScriptCard = ({ script, index }: { script: typeof scripts[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl overflow-hidden flex flex-col group hover:border-primary/30 transition-all duration-300"
  >
    {/* Thumbnail */}
    <div className="aspect-video w-full bg-card/80 flex items-center justify-center relative overflow-hidden">
      {script.image ? (
        <img
          src={script.image}
          alt={script.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background/40 to-background/80 flex items-center justify-center">
          <Package size={48} className="text-primary/20" />
        </div>
      )}
      {/* FREE badge */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-heading font-bold tracking-widest uppercase">
        FREE
      </div>
    </div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1 gap-3">
      <h3 className="font-heading font-bold text-sm text-foreground leading-snug group-hover:text-primary transition-colors">
        {script.title}
      </h3>
      <p className="text-xs text-muted-foreground font-body leading-relaxed flex-1">
        {script.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-heading pt-2 border-t border-border/20">
        <div className="flex items-center gap-1.5">
          <Download size={11} className="text-primary" />
          {script.downloads} Downloads
        </div>
        <div className="flex items-center gap-1">
          <Star size={11} className="fill-primary text-primary" />
          {script.rating}/5
        </div>
      </div>

      {/* Download button */}
      <a
        href={script.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-xs tracking-wider hover:opacity-90 transition-all glow-cyan"
      >
        <Download size={13} />
        Download
      </a>
    </div>
  </motion.div>
);

const FreeScripts = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-heading text-xs tracking-widest uppercase font-semibold mb-3">
              Free Resources
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-black text-foreground mb-4">
              Quality <span className="text-gradient">Free Scripts</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-body">
              Explore our collection of free scripts to enhance your FiveM server. These resources are
              developed with the same quality standards as our premium products.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script, index) => (
              <ScriptCard key={script.title} script={script} index={index} />
            ))}
          </div>

          {/* More coming soon */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/30 bg-card/40 backdrop-blur-sm text-xs text-muted-foreground font-heading">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              More free scripts coming soon
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FreeScripts;
