import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const steps = [
  {
    number: "01",
    title: "Purchase",
    description: "Click Buy Now and complete your one-time $125 payment securely.",
  },
  {
    number: "02",
    title: "Download",
    description: "Get instant access to all server files, documentation, and our Discord.",
  },
  {
    number: "03",
    title: "Launch",
    description: "Follow the setup guide, configure your server, and go live in minutes.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.10]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-heading text-sm tracking-widest uppercase mb-2 font-semibold">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight mb-4">
              From purchase to <span className="text-gradient">launch in minutes</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md font-body">
              No complicated setup. Buy once, download instantly, and deploy your premium FiveM server with full documentation and ongoing support.
            </p>
          </motion.div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-5 items-start group"
              >
                <div className="shrink-0 w-12 h-12 rounded-lg border border-primary/20 bg-card/60 backdrop-blur-xl flex items-center justify-center font-display text-sm font-bold text-primary group-hover:bg-primary/10 transition-colors">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
