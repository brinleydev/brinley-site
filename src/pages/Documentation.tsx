import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Monitor,
  Terminal,
  RefreshCw,
  GraduationCap,
  ChevronRight,
  Menu,
  X,
  Zap,
  Shield,
  Car,
  Briefcase,
  Paintbrush,
  MapPin,
  Phone,
  Building2,
  Train,
  Gamepad2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Download,
  Settings,
  Database,
  Server,
  Play,
  Copy,
  Wrench,
  Bug,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const sidebarSections = [
  {
    label: "GETTING STARTED",
    items: [
      { id: "welcome", label: "Welcome", icon: Zap },
      { id: "features", label: "Features", icon: Star },
      { id: "installation", label: "Installation", icon: Monitor },
    ],
  },
  {
    label: "REFERENCE",
    items: [
      { id: "commands", label: "Commands", icon: Terminal },
      { id: "changelog", label: "Changelog", icon: RefreshCw },
    ],
  },
  {
    label: "GUIDES",
    items: [{ id: "tutorials", label: "Tutorials", icon: GraduationCap }],
  },
];

const allPages = sidebarSections.flatMap((s) => s.items);

const Documentation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePage = searchParams.get("page") || "welcome";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const setPage = (id: string) => {
    setSearchParams({ page: id });
    setSidebarOpen(false);
    window.scrollTo(0, 0);
  };

  const currentIndex = allPages.findIndex((p) => p.id === activePage);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card/50 backdrop-blur-xl border-r border-border/40 z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:sticky lg:top-0`}
      >
        <div className="p-5 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} alt="Brinley" className="h-6 w-6" />
            <span className="font-display text-xs font-black tracking-[0.2em] text-foreground">BRINLEY</span>
            <span className="text-[9px] font-heading tracking-widest text-primary/60 font-semibold">DOCS</span>
          </Link>
        </div>

        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-3 text-xs font-heading text-muted-foreground hover:text-foreground transition-colors border-b border-border/20"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {sidebarSections.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] font-heading font-bold tracking-[0.2em] text-muted-foreground/60 px-2 mb-2">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPage(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-heading font-medium transition-all duration-200 ${
                      activePage === item.id
                        ? "bg-primary/15 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                    }`}
                  >
                    <item.icon size={15} className={activePage === item.id ? "text-primary" : "opacity-50"} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-border/20 flex gap-2">
          <a
            href="https://discord.gg/MeuZy3Kd"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-colors"
          >
            <Gamepad2 size={16} />
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden sticky top-0 z-30 bg-card/70 backdrop-blur-xl border-b border-border/30 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg hover:bg-card/80 text-foreground">
            <Menu size={20} />
          </button>
          <span className="font-display text-xs font-bold tracking-widest text-foreground">BRINLEY DOCS</span>
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 py-10 md:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-heading text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-foreground">Docs</span>
            {activePage !== "welcome" && (
              <>
                <ChevronRight size={12} />
                <span className="text-primary capitalize">{activePage}</span>
              </>
            )}
          </div>

          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activePage === "welcome" && <WelcomePage onNavigate={setPage} />}
            {activePage === "features" && <FeaturesPage />}
            {activePage === "installation" && <InstallationPage />}
            {activePage === "commands" && <CommandsPage />}
            {activePage === "changelog" && <ChangelogPage />}
            {activePage === "tutorials" && <TutorialsPage />}
          </motion.div>

          {/* Prev / Next navigation */}
          <div className="flex items-center justify-between mt-16 pt-8 border-t border-border/20">
            {prevPage ? (
              <button onClick={() => setPage(prevPage.id)} className="flex flex-col items-start gap-1 group">
                <span className="text-[10px] font-heading text-muted-foreground">Previous</span>
                <span className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowLeft size={14} /> {prevPage.label}
                </span>
              </button>
            ) : <div />}
            {nextPage ? (
              <button onClick={() => setPage(nextPage.id)} className="flex flex-col items-end gap-1 group">
                <span className="text-[10px] font-heading text-muted-foreground">Next</span>
                <span className="text-sm font-heading font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {nextPage.label} <ArrowRight size={14} />
                </span>
              </button>
            ) : <div />}
          </div>
        </div>
      </main>
    </div>
  );
};

/* ─── WELCOME PAGE ─── */
const WelcomePage = ({ onNavigate }: { onNavigate: (id: string) => void }) => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 flex items-center gap-3">
      <Zap className="text-primary" size={32} /> Welcome
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-4">
      Welcome to <span className="text-foreground font-semibold">Brinley Server V5</span> — a fully custom, production-ready FiveM server built on QBCore. Designed for serious roleplay communities that demand quality, performance, and style.
    </p>
    <p className="text-muted-foreground font-body leading-relaxed mb-4">
      This package is the result of months of careful development and real-world testing. Every script, UI element, and system has been crafted to deliver an immersive and smooth gameplay experience out of the box.
    </p>
    <p className="text-muted-foreground font-body leading-relaxed mb-8">
      In this documentation, you'll find everything you need: from initial setup to advanced configuration, feature breakdowns, and a full command reference. Every section is designed to get you up and running with confidence.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { id: "features", label: "Features", desc: "Explore all built-in systems", icon: Star },
        { id: "installation", label: "Installation", desc: "Get your server running", icon: Monitor },
        { id: "commands", label: "Commands", desc: "Full command reference", icon: Terminal },
        { id: "changelog", label: "Changelog", desc: "Track updates and patches", icon: RefreshCw },
        { id: "tutorials", label: "Tutorials", desc: "Step-by-step guides", icon: GraduationCap },
      ].map((card) => (
        <button
          key={card.id}
          onClick={() => onNavigate(card.id)}
          className="flex flex-col gap-2 p-5 rounded-xl border border-border/30 bg-card/40 hover:bg-card/70 hover:border-primary/20 transition-all duration-300 text-left group"
        >
          <card.icon size={20} className="text-primary" />
          <span className="font-heading font-bold text-foreground text-sm">{card.label}</span>
          <span className="text-xs text-muted-foreground">{card.desc}</span>
        </button>
      ))}
    </div>
  </div>
);

/* ─── FEATURES PAGE ─── */
const featuresList = [
  {
    title: "Identity & Character Creation",
    icon: Shield,
    items: [
      "Streamlined identity setup with full customization",
      "Select your preferred spawn point on creation",
      "Multi-character support with individual progression",
      "Spawn system based on last known position",
      "In-game directory with locations, contacts, and maps",
    ],
  },
  {
    title: "Apparel & Outfits",
    icon: Paintbrush,
    items: [
      "Pre-built outfits for every available job",
      "Two complete clothing collections included",
      "Civilian, gang, and uniform wardrobe options",
      "Inventory-driven clothing management",
      "Easy expansion through documentation",
    ],
  },
  {
    title: "Financial Services",
    icon: Building2,
    items: [
      "Full-featured deposit and withdrawal system",
      "Direct bill payments from bank accounts",
      "Society fund contributions in one click",
      "Secure ATM access with PIN verification",
    ],
  },
  {
    title: "Vehicle Fleet & Management",
    icon: Car,
    items: [
      "300+ custom lore-friendly vehicles included",
      "Tablet-based vehicle purchasing preview",
      "Test drive system before committing to buy",
      "Job-specific dealerships with live stock tracking",
      "Showroom with full vehicle statistics display",
      "Rental contracts with point-based system",
      "Supports cars, trucks, boats, planes, and helicopters",
    ],
  },
  {
    title: "Transit Network",
    icon: Train,
    items: [
      "Working metro system across the entire map",
      "Ticket-based entry with fare enforcement",
      "Multiple destination routes available",
      "Fines issued for riding without a valid ticket",
    ],
  },
  {
    title: "Business & Commerce",
    icon: Briefcase,
    items: [
      "Customer-facing self-service ordering",
      "Staff note system for internal coordination",
      "Real estate buying and property management",
      "Additional business ventures for entrepreneurs",
      "Complete driving school with tests and licensing",
    ],
  },
  {
    title: "Law Enforcement & Dispatch",
    icon: MapPin,
    items: [
      "Advanced police dispatch integration",
      "MDT system with suspect lookups and warrants",
      "Evidence collection and processing mechanics",
      "Coordinated response protocols",
    ],
  },
  {
    title: "Communication Systems",
    icon: Phone,
    items: [
      "Fully functional in-game smartphone",
      "Messaging, contacts, and social media apps",
      "Photo gallery and camera functionality",
      "Integrated job and banking applications",
    ],
  },
];

const FeaturesPage = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
      <Star className="text-primary" size={32} /> Features
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-10">
      Brinley V5 ships with a comprehensive suite of fully integrated systems. Here's an overview of everything included in the package.
    </p>

    <div className="space-y-6">
      {featuresList.map((feature) => (
        <div key={feature.title} className="rounded-xl border border-border/30 bg-card/40 p-6">
          <h3 className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-2">
            <feature.icon size={18} className="text-primary" />
            {feature.title}
          </h3>
          <ul className="space-y-2">
            {feature.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground font-body">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/* ─── INSTALLATION PAGE ─── */
const InstallationPage = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
      <Monitor className="text-primary" size={32} /> Installation
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-10">
      Follow these steps carefully to deploy your Brinley V5 server. The entire process should take under 15 minutes.
    </p>

    <div className="space-y-6">
      {/* Step 1 */}
      <StepCard number={1} title="Download & Extract Files">
        <ul className="space-y-2">
          <StepItem>Download the package from your order confirmation email</StepItem>
          <StepItem>Extract all files to a dedicated folder on your machine</StepItem>
          <StepItem>Ensure you have at least 10GB of free disk space</StepItem>
        </ul>
      </StepCard>

      {/* Step 2 */}
      <StepCard number={2} title="Install Required Dependencies">
        <ul className="space-y-2">
          <StepItem>Install XAMPP (Apache + MySQL) or MariaDB</StepItem>
          <StepItem>Ensure Node.js is installed (v16 or higher)</StepItem>
          <StepItem>Add all required Keymaster resources to your Cfx.re account</StepItem>
        </ul>
        <InfoBox type="tip">
          Make sure all Keymaster dependencies are added before proceeding to the database import step.
        </InfoBox>
      </StepCard>

      {/* Step 3 */}
      <StepCard number={3} title="Import the Database">
        <ul className="space-y-2">
          <StepItem>Start XAMPP and ensure Apache + MySQL are running</StepItem>
          <StepItem>Open the <Code>BRINLEY.sql</Code> file with HeidiSQL or phpMyAdmin</StepItem>
          <StepItem>Execute the SQL file to populate all required tables</StepItem>
        </ul>
        <InfoBox type="warning">
          XAMPP must be running before you attempt to import the SQL file, otherwise the connection will fail.
        </InfoBox>
      </StepCard>

      {/* Step 4 */}
      <StepCard number={4} title="Configure FXServer">
        <ul className="space-y-2">
          <StepItem>Navigate to the <Code>fxserver</Code> folder</StepItem>
          <StepItem>Launch <Code>FXServer.exe</Code></StepItem>
          <StepItem>Link your Cfx.re account when prompted</StepItem>
          <StepItem>Select <strong className="text-foreground">"Existing Server Data"</strong> as deployment type</StepItem>
        </ul>
      </StepCard>

      {/* Step 5 */}
      <StepCard number={5} title="Set Server Directory">
        <ul className="space-y-2">
          <StepItem>Point FXServer to the folder containing <Code>server.cfg</Code> and <Code>resources</Code></StepItem>
          <StepItem>Select the folder and click <strong className="text-foreground">Next</strong></StepItem>
        </ul>
      </StepCard>

      {/* Step 6 */}
      <StepCard number={6} title="Launch Your Server">
        <p className="text-sm text-muted-foreground font-body mb-3">
          You're all set! Start your server and verify everything loads correctly.
        </p>
        <InfoBox type="success">
          Your Brinley V5 server should now be running. If you encounter any issues, join our Discord for support.
        </InfoBox>
      </StepCard>
    </div>
  </div>
);

/* ─── COMMANDS PAGE ─── */
const commandSections = [
  {
    title: "QBCore Admin Commands",
    subtitle: "qb-core",
    commands: [
      { cmd: "/staffpanel", desc: "Open admin menu", perm: "ADMIN" },
      { cmd: "/tp [id/x y z]", desc: "Teleport to player by ID or coordinates", perm: "ADMIN" },
      { cmd: "/tpm", desc: "Teleport to map marker", perm: "ADMIN" },
      { cmd: "/togglepvp", desc: "Toggle PVP on/off for server", perm: "ADMIN" },
      { cmd: "/addpermission [id] [perm]", desc: "Add permission to a player", perm: "GOD" },
      { cmd: "/removepermission [id] [perm]", desc: "Remove permission from a player", perm: "GOD" },
      { cmd: "/openserver", desc: "Open the server (remove whitelist)", perm: "ADMIN" },
      { cmd: "/closeserver [reason]", desc: "Close the server with optional reason", perm: "ADMIN" },
      { cmd: "/car [model]", desc: "Spawn a vehicle", perm: "ADMIN" },
      { cmd: "/dv", desc: "Delete current vehicle", perm: "ADMIN" },
      { cmd: "/dvall", desc: "Delete all vehicles on server", perm: "ADMIN" },
      { cmd: "/givemoney [id] [type] [amount]", desc: "Give money to a player", perm: "ADMIN" },
      { cmd: "/setmoney [id] [type] [amount]", desc: "Set player's money", perm: "ADMIN" },
      { cmd: "/setjob [id] [job] [grade]", desc: "Set a player's job", perm: "ADMIN" },
      { cmd: "/setgang [id] [gang] [grade]", desc: "Set a player's gang", perm: "ADMIN" },
    ],
  },
  {
    title: "EMS & Medical Commands",
    subtitle: "brinley-ambulance",
    commands: [
      { cmd: "/revive [id]", desc: "Revive a player", perm: "ADMIN" },
      { cmd: "/kill [id]", desc: "Kill a player", perm: "ADMIN" },
      { cmd: "/reviveall", desc: "Revive all players on server", perm: "ADMIN" },
      { cmd: "/healarea", desc: "Heal players in area", perm: "ADMIN" },
    ],
  },
  {
    title: "Garage & Vehicle Commands",
    subtitle: "brinley-garages",
    commands: [
      { cmd: "/garageconfig", desc: "Open garage configuration editor", perm: "ADMIN" },
      { cmd: "/restorelostcars [garage]", desc: "Restore cars from invalid garages", perm: "ADMIN" },
    ],
  },
  {
    title: "General Player Commands",
    subtitle: "general",
    commands: [
      { cmd: "/me [action]", desc: "Display roleplay action", perm: "ALL" },
      { cmd: "/ooc [message]", desc: "Out of character chat", perm: "ALL" },
      { cmd: "/report [message]", desc: "Send report to staff", perm: "ALL" },
      { cmd: "/id", desc: "Show your server ID", perm: "ALL" },
    ],
  },
];

const CommandsPage = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
      <Terminal className="text-primary" size={32} /> Commands
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-8">
      Complete reference of all available in-game commands organized by category.
    </p>

    {/* Quick nav */}
    <div className="rounded-xl border border-border/30 bg-card/40 p-5 mb-10">
      <h3 className="font-heading font-bold text-foreground text-sm mb-3 flex items-center gap-2">
        <Menu size={14} /> Quick Navigation
      </h3>
      <div className="flex flex-wrap gap-3">
        {commandSections.map((s) => (
          <a key={s.title} href={`#cmd-${s.subtitle}`} className="text-xs font-heading text-primary hover:underline flex items-center gap-1">
            <ChevronRight size={10} /> {s.title}
          </a>
        ))}
      </div>
    </div>

    <div className="space-y-10">
      {commandSections.map((section) => (
        <div key={section.title} id={`cmd-${section.subtitle}`}>
          <h2 className="font-heading font-bold text-foreground text-lg mb-1">{section.title}</h2>
          <p className="text-xs text-muted-foreground font-body mb-4">Resource: {section.subtitle}</p>

          <div className="rounded-xl border border-border/30 overflow-hidden">
            <div className="grid grid-cols-[1fr_1.5fr_auto] gap-4 px-5 py-3 bg-primary/10 border-b border-primary/20">
              <span className="text-xs font-heading font-bold text-primary">COMMAND</span>
              <span className="text-xs font-heading font-bold text-primary">DESCRIPTION</span>
              <span className="text-xs font-heading font-bold text-primary">PERMISSION</span>
            </div>
            {section.commands.map((cmd, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1.5fr_auto] gap-4 px-5 py-3 border-b border-border/10 last:border-0 hover:bg-card/40 transition-colors"
              >
                <code className="text-xs font-mono text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">{cmd.cmd}</code>
                <span className="text-xs text-muted-foreground font-body">{cmd.desc}</span>
                <span
                  className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded ${
                    cmd.perm === "GOD"
                      ? "bg-destructive/20 text-destructive"
                      : cmd.perm === "ADMIN"
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {cmd.perm}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── CHANGELOG PAGE ─── */
const ChangelogPage = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
      <RefreshCw className="text-primary" size={32} /> Changelog
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-8">
      Track all updates, improvements, and fixes for Brinley V5.
    </p>

    {/* Update schedule */}
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 mb-10">
      <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
        <Info size={16} className="text-primary" /> Update Schedule
      </h3>
      <p className="text-sm text-muted-foreground font-body mb-2">We are committed to keeping Brinley V5 fresh and stable:</p>
      <ul className="space-y-1.5">
        <li className="text-sm text-muted-foreground font-body flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <strong className="text-foreground">Monthly Updates</strong> — New features & content drops every month
          <span className="text-[10px] font-heading font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">FREE</span>
        </li>
        <li className="text-sm text-muted-foreground font-body flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <strong className="text-foreground">Bug Fixes</strong> — Issues resolved and patched regularly
          <span className="text-[10px] font-heading font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">FREE</span>
        </li>
      </ul>
    </div>

    <div className="space-y-6">
      <ChangelogEntry
        title="Content Update — April 2026"
        date="April 01, 2026"
        badge="Coming Soon"
        badgeColor="bg-amber-500/20 text-amber-400"
      >
        <p className="text-sm text-muted-foreground font-body mb-2 flex items-center gap-2">
          <Sparkles size={14} className="text-primary" /> <strong className="text-foreground">What's Coming Next:</strong>
        </p>
        <ul className="space-y-1.5">
          <ChangelogItem>New Casino System — Full experience with games & gambling</ChangelogItem>
          <ChangelogItem>Real Estate Expansion — Enhanced property management</ChangelogItem>
          <ChangelogItem>New Business Opportunities — More ways to earn and grow</ChangelogItem>
          <ChangelogItem>Driving School Overhaul — Revamped tests and licensing</ChangelogItem>
          <ChangelogItem>And much more...</ChangelogItem>
        </ul>
      </ChangelogEntry>

      <ChangelogEntry
        title="Hotfix Update"
        date="March 15, 2026"
        badge="Latest"
        badgeColor="bg-green-500/20 text-green-400"
      >
        <p className="text-sm text-muted-foreground font-body mb-2 flex items-center gap-2">
          <Wrench size={14} /> <strong className="text-foreground">Bug Fixes</strong>
        </p>
        <ul className="space-y-1.5">
          <ChangelogItem>Fixed death screen not appearing correctly</ChangelogItem>
          <ChangelogItem>Resolved hospital check-in issues</ChangelogItem>
          <ChangelogItem>Fixed ambulance job-related bugs</ChangelogItem>
          <ChangelogItem>Corrected multi-character menu reload behavior</ChangelogItem>
          <ChangelogItem>Fixed vehicle key distribution for certain jobs</ChangelogItem>
          <ChangelogItem>Resolved dealership map and catalogue display issues</ChangelogItem>
          <ChangelogItem>Fixed locker and armory access problems</ChangelogItem>
        </ul>
        <p className="text-sm text-green-400 font-body mt-3 flex items-center gap-2">
          <CheckCircle2 size={14} /> All reported bugs have been fixed.
        </p>
      </ChangelogEntry>

      <ChangelogEntry
        title="Server Launch — Fixes & Improvements"
        date="March 01, 2026"
        badge="Update"
        badgeColor="bg-primary/20 text-primary"
      >
        <p className="text-sm text-muted-foreground font-body mb-2 flex items-center gap-2">
          <Wrench size={14} /> <strong className="text-foreground">Fixed</strong>
        </p>
        <ul className="space-y-1.5">
          <ChangelogItem>Character deletion issue resolved</ChangelogItem>
          <ChangelogItem>Clothing store images now display individually</ChangelogItem>
          <ChangelogItem>Inventory ped screen-lock and F8 errors fixed</ChangelogItem>
          <ChangelogItem>Business buyer ped correctly disappears after purchase</ChangelogItem>
          <ChangelogItem>HUD no longer disappears at high vehicle speed</ChangelogItem>
          <ChangelogItem>Phone model orientation corrected</ChangelogItem>
        </ul>
      </ChangelogEntry>
    </div>
  </div>
);

/* ─── TUTORIALS PAGE ─── */
const TutorialsPage = () => (
  <div>
    <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
      <GraduationCap className="text-primary" size={32} /> Tutorials
    </h1>
    <p className="text-muted-foreground font-body leading-relaxed mb-10">
      Step-by-step guides to help you configure and customize your Brinley V5 server.
    </p>

    <div className="space-y-6">
      <TutorialCard
        title="Initial Server Configuration"
        desc="Learn how to configure your server.cfg, set your server name, max players, and basic settings."
        icon={Settings}
        steps={[
          "Open server.cfg in any text editor",
          "Set your server name with 'sv_hostname'",
          "Configure max players with 'sv_maxclients'",
          "Add your Cfx.re license key",
          "Save the file and restart your server",
        ]}
      />

      <TutorialCard
        title="Database Customization"
        desc="Guide to modifying database tables, adding custom items, and managing player data."
        icon={Database}
        steps={[
          "Connect to your MySQL database using HeidiSQL or phpMyAdmin",
          "Navigate to the items table to add new inventory items",
          "Modify job grades and salaries in the jobs table",
          "Add new vehicle entries to the vehicles table",
          "Always backup your database before making changes",
        ]}
      />

      <TutorialCard
        title="Adding Custom Vehicles"
        desc="How to add new vehicle models and configure them for your dealerships."
        icon={Car}
        steps={[
          "Place the vehicle resource in your resources folder",
          "Add 'ensure vehiclename' to your server.cfg",
          "Add the vehicle data to the vehicles SQL table",
          "Configure the vehicle in the dealership config file",
          "Restart the server and test the vehicle in-game",
        ]}
      />

      <TutorialCard
        title="Performance Optimization"
        desc="Tips and settings to keep your server running smooth at 0.8ms or lower."
        icon={Zap}
        steps={[
          "Monitor resource usage with /resmon in-game",
          "Disable unused resources to reduce overhead",
          "Optimize database queries for heavy scripts",
          "Set appropriate sync rates in your config files",
          "Keep all resources updated to their latest versions",
        ]}
      />
    </div>
  </div>
);

/* ─── REUSABLE COMPONENTS ─── */
const StepCard = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border/30 bg-card/40 p-6">
    <h3 className="font-heading font-bold text-foreground text-lg mb-4 flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-display font-bold shrink-0">
        {number}
      </span>
      {title}
    </h3>
    {children}
  </div>
);

const StepItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5 text-sm text-muted-foreground font-body">
    <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
    {children}
  </li>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="text-xs font-mono bg-primary/10 text-primary px-1.5 py-0.5 rounded">{children}</code>
);

const InfoBox = ({ type, children }: { type: "tip" | "warning" | "success"; children: React.ReactNode }) => {
  const styles = {
    tip: { bg: "bg-blue-500/10 border-blue-500/20", icon: <Info size={16} className="text-blue-400" />, label: "Tip", labelColor: "text-blue-400" },
    warning: { bg: "bg-amber-500/10 border-amber-500/20", icon: <AlertTriangle size={16} className="text-amber-400" />, label: "Important", labelColor: "text-amber-400" },
    success: { bg: "bg-green-500/10 border-green-500/20", icon: <CheckCircle2 size={16} className="text-green-400" />, label: "Success!", labelColor: "text-green-400" },
  };
  const s = styles[type];
  return (
    <div className={`mt-4 rounded-lg border ${s.bg} p-4`}>
      <p className={`text-sm font-heading font-bold ${s.labelColor} mb-1 flex items-center gap-2`}>
        {s.icon} {s.label}
      </p>
      <p className="text-sm text-muted-foreground font-body">{children}</p>
    </div>
  );
};

const ChangelogEntry = ({
  title, date, badge, badgeColor, children,
}: { title: string; date: string; badge: string; badgeColor: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border/30 bg-card/40 p-6">
    <div className="flex items-center gap-3 mb-1">
      <h3 className="font-heading font-bold text-foreground text-lg">{title}</h3>
      <span className={`text-[10px] font-heading font-bold px-2 py-0.5 rounded ${badgeColor}`}>{badge}</span>
    </div>
    <p className="text-xs text-muted-foreground font-body mb-4 flex items-center gap-1.5">
      📅 {date}
    </p>
    {children}
  </div>
);

const ChangelogItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-sm text-muted-foreground font-body">
    <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
    {children}
  </li>
);

const TutorialCard = ({
  title, desc, icon: Icon, steps,
}: { title: string; desc: string; icon: React.ElementType; steps: string[] }) => (
  <div className="rounded-xl border border-border/30 bg-card/40 p-6">
    <h3 className="font-heading font-bold text-foreground text-lg mb-2 flex items-center gap-2">
      <Icon size={18} className="text-primary" />
      {title}
    </h3>
    <p className="text-sm text-muted-foreground font-body mb-5">{desc}</p>
    <ol className="space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-body">
          <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-xs font-display text-primary shrink-0">
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  </div>
);

export default Documentation;
