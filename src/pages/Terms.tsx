import { motion } from "framer-motion";
import {
  RefreshCcw, CreditCard, ShieldCheck, Headphones,
  Wrench, Bug, Server, Users, Ban, FileCheck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.png";

const sections = [
  {
    icon: RefreshCcw,
    number: "01",
    title: "Refund Policy",
    items: [
      { text: "All purchases are considered final and non-refundable.", highlight: false },
      { text: "Refunds may only be reviewed in rare cases where we are unable to deliver the purchased product.", highlight: false },
      { text: "Chargebacks or disputes without contacting us first will result in a permanent blacklist.", highlight: true },
    ],
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Payment Policy",
    items: [
      { text: "Full payment must be completed before delivery of any product or service.", highlight: false },
      { text: "We only accept payments through official methods provided by Brinley Development.", highlight: false },
      { text: "Any attempt to bypass payment systems will result in denial of service.", highlight: true },
    ],
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Product Usage",
    items: [
      { text: "All servers, scripts, and resources are for personal use only.", highlight: false },
      { text: "Reselling, sharing, leaking, or redistributing any files is strictly forbidden.", highlight: true },
      { text: "Violation will lead to access removal and possible legal action.", highlight: true },
    ],
  },
  {
    icon: Headphones,
    number: "04",
    title: "Support Policy",
    items: [
      { text: "Support is provided only for original, unmodified versions of our products.", highlight: false },
      { text: "We are not responsible for issues caused by third-party scripts, unauthorized edits, or poor hosting performance.", highlight: false },
      { text: "Support response times may vary depending on workload.", highlight: false },
    ],
  },
  {
    icon: Wrench,
    number: "05",
    title: "Custom Orders",
    items: [
      { text: "Custom work is available at an additional cost.", highlight: false },
      { text: "Once a custom service is delivered, any extra changes will be treated as a new request.", highlight: false },
    ],
  },
  {
    icon: Bug,
    number: "06",
    title: "Bug Reporting",
    items: [
      { text: "Bugs must be reported with clear proof — video, screenshots, or logs.", highlight: false },
      { text: "We will fix verified issues as soon as possible.", highlight: false },
      { text: "We are not responsible for bugs caused by external modifications.", highlight: false },
    ],
  },
  {
    icon: Server,
    number: "07",
    title: "Hosting & Downtime",
    items: [
      { text: "We are not responsible for downtime caused by hosting providers, VPS issues, or network problems.", highlight: false },
      { text: "We recommend using high-quality hosting for best performance.", highlight: false },
    ],
  },
  {
    icon: Users,
    number: "08",
    title: "Community Conduct",
    items: [
      { text: "Respectful communication is required at all times.", highlight: false },
      { text: "Any form of toxicity, harassment, or abuse will result in an immediate ban without warning.", highlight: true },
    ],
  },
  {
    icon: Ban,
    number: "09",
    title: "Termination",
    items: [
      { text: "We reserve the right to suspend or terminate services if any of these terms are violated.", highlight: true },
    ],
  },
];

const TermsCard = ({ section, index }: { section: typeof sections[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07 }}
    className="group relative rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl p-6 hover:border-primary/30 transition-all duration-300"
    style={{ boxShadow: "0 0 0 0 hsl(var(--primary)/0)" }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 30px hsl(var(--primary)/0.07)")}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 0 0 hsl(var(--primary)/0)")}
  >
    {/* Top glow line on hover */}
    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />

    {/* Header */}
    <div className="flex items-center gap-4 mb-5">
      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/15 transition-colors">
        <section.icon size={20} strokeWidth={1.8} />
      </div>
      <div className="flex items-baseline gap-2.5">
        <span className="text-[11px] font-heading font-bold text-primary/50 tracking-widest">{section.number}</span>
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
          {section.title}
        </h3>
      </div>
    </div>

    {/* Items */}
    <ul className="space-y-3">
      {section.items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
          <p className={`text-sm leading-relaxed font-body ${item.highlight ? "text-primary/90 font-semibold" : "text-muted-foreground"}`}>
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Terms = () => {
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
              <FileCheck size={12} className="text-primary" />
              <span className="text-primary font-heading text-xs tracking-widest font-semibold uppercase">Legal</span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-body">
              By purchasing any FiveM server, scripts, or services from Brinley Development, you agree to the following terms and conditions.
            </p>
            <p className="text-muted-foreground/40 text-xs font-heading mt-3 tracking-wider">Last updated — 2026</p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((section, index) => (
            <TermsCard key={section.title} section={section} index={index} />
          ))}
        </div>

        {/* Agreement box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 relative rounded-2xl overflow-hidden border border-primary/30"
          style={{ boxShadow: "0 0 60px hsl(var(--primary)/0.08), inset 0 0 60px hsl(var(--primary)/0.03)" }}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.12]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />
          </div>
          {/* Top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          <div className="relative z-10 py-14 px-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-6"
              style={{ boxShadow: "0 0 24px hsl(var(--primary)/0.2)" }}
            >
              <FileCheck size={24} className="text-primary" />
            </div>
            <h2 className="font-display font-black text-2xl md:text-3xl text-foreground mb-3">
              Agreement
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto font-body mb-6">
              By purchasing or using our services, you confirm that you have read, understood, and agreed to these Terms of Service.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary/10 border border-primary/25">
              <span className="text-primary font-display font-bold text-sm tracking-wider">
                By purchasing, you agree to these terms
              </span>
            </div>
            <p className="text-muted-foreground/50 text-xs font-heading mt-6 tracking-widest uppercase">
              Thank you for choosing Brinley Development ❤️
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
