import { motion } from "framer-motion";
import { ArrowDown, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-center scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/40 to-background/70" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="h-28" />

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">

            {/* Version pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary font-heading text-xs tracking-widest font-semibold uppercase">
                  V5 — Now Available
                </span>
              </div>
            </motion.div>

            {/* Title & description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="font-display font-black leading-none">
                <span className="text-5xl md:text-6xl text-foreground block">Introducing</span>
                <span className="text-5xl md:text-6xl text-gradient block mt-1">BRINLEY SERVER V5</span>
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed mt-4 max-w-sm font-body">
                A premium FiveM QBCore package built for performance,
                packed with 130+ scripts, custom UI, and anti-cheat —
                ready to launch your community.
              </p>
            </motion.div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

              {/* LEFT: Video */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-8 rounded-xl overflow-hidden"
              >
                <div className="aspect-video w-full h-full">
                  <iframe
                    src="https://www.youtube.com/embed/RRcd0XYYdIk"
                    title="Brinley Development — Server Preview"
                    className="w-full h-full block"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              {/* RIGHT: Pricing card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-4 flex"
              >
                <div className="w-full rounded-2xl border border-border/40 bg-card/80 backdrop-blur-xl p-5 flex flex-col gap-3">

                  {/* Price block */}
                  <div className="relative">
                    {/* 20% OFF badge */}
                    <div className="absolute -top-1 right-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary text-primary-foreground font-display font-black text-[11px] tracking-widest uppercase shadow-[0_0_16px_hsl(var(--primary)/0.4)]">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1L6.12 3.62L9 4.06L7 6.01L7.47 9L5 7.62L2.53 9L3 6.01L1 4.06L3.88 3.62L5 1Z" fill="currentColor"/>
                      </svg>
                      20% OFF
                    </div>

                    <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-2">
                      Limited time price
                    </p>

                    {/* Prices */}
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-display font-black text-foreground">$125</span>
                      <div className="flex flex-col mb-1">
                        <span className="text-sm font-display font-bold text-muted-foreground/50 line-through leading-none">
                          $150
                        </span>
                        <span className="text-[10px] text-primary font-heading font-semibold tracking-wider">
                          You save $25
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground font-body mt-1">
                      One-time payment · Free updates
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm tracking-wider hover:opacity-90 transition-all glow-cyan"
                  >
                    <ShoppingCart size={16} />
                    BUY NOW
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-border/30" />

                  {/* Checklist */}
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Fully optimized QBCore Roleplay server",
                      "High FPS & smooth gameplay",
                      "Clean & professional structure",
                      "Modern UI & immersive RP experience",
                      "Ready-to-use package for server owners",
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        className="flex items-start gap-2.5"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-xs text-muted-foreground font-body leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust indicators */}
                  <div className="mt-auto pt-3 border-t border-border/20 flex items-center gap-4 text-xs text-muted-foreground font-heading flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Instant delivery
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Free updates
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      24/7 support
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 lg:w-8/12"
            >
              <div className="glass-strong rounded-xl px-6 py-3 flex items-center justify-around text-center">
                {[
                  { value: "130+", label: "Scripts" },
                  { value: "0.6ms", label: "Resmon" },
                  { value: "200+", label: "Players" },
                  { value: "24/7", label: "Support" },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className="flex items-center gap-8">
                    <div>
                      <p className="text-lg font-display font-bold text-primary">{stat.value}</p>
                      <p className="text-[10px] text-muted-foreground font-heading tracking-wider uppercase">{stat.label}</p>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-8 bg-border/50" />}
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="pb-8 flex justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <ArrowDown className="text-primary/40" size={20} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
