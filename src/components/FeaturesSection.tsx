import { motion } from "framer-motion";
import { Cpu, Users, ShieldCheck, Palette, LifeBuoy, ArrowUpCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const features = [
  {
    icon: Cpu,
    title: "Ultra Optimized",
    description: "Sub-1ms resmon with intelligent resource management for silky smooth gameplay.",
  },
  {
    icon: Users,
    title: "Massive Scale",
    description: "Engineered for 200+ concurrent players without compromising server performance.",
  },
  {
    icon: ShieldCheck,
    title: "Built-In Security",
    description: "Advanced anti-cheat and exploit protection keeping your community safe.",
  },
  {
    icon: Palette,
    title: "Custom Interface",
    description: "Unique, modern UI/UX designed to give your server a professional identity.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated Support",
    description: "Direct access to our team via private Discord with fast response times.",
  },
  {
    icon: ArrowUpCircle,
    title: "Monthly Updates",
    description: "Regular content drops with new scripts, fixes, and improvements included free.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Same hero background */}
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-top opacity-[0.12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 max-w-xl"
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-2 font-semibold">What's Inside</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
            Everything you need to run a <span className="text-gradient">top-tier server</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 hover:border-primary/25 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-body">{feature.description}</p>
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
