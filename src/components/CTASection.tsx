import { motion } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const CTASection = () => {
  return (
    <section className="relative py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto relative">
        {/* Card with background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-primary/20"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.15]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />
          </div>

          {/* Glow accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Content */}
          <div className="relative z-10 text-center py-16 md:py-20 px-6">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Ready to Launch Your Server?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 text-sm md:text-base">
              Get in touch with us on Discord and we'll help you find the perfect setup for your community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://discord.gg/MeuZy3Kd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all duration-300 glow-cyan-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Contact on Discord
              </a>
              <a
                href="#product"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border/60 text-foreground font-heading font-semibold text-sm hover:border-primary/40 hover:bg-card/40 transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4" />
                View Package
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
