import { motion } from "framer-motion";
import { Star } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const reviews = [
  {
    name: "Mkz.",
    initials: "MK",
    date: "Janvier 2026",
    text: "Brinley V5 server is amazing 🔥 Smooth, optimized, well-made and ready to use. One of the best FiveM packages I've tried. Highly recommended!",
  },
  {
    name: "Swearty",
    initials: "SW",
    date: "Janvier 2026",
    text: "Very high-quality work. Everything is well-structured, optimized, and easy to integrate. The files meet professional standards and reflect strong experience and attention to detail. Smooth performance and clear organization made the setup straightforward. Overall, a reliable seller and a great purchase",
  },
  {
    name: "Eagle 🦅",
    initials: "EG",
    date: "Janvier 2026",
    text: "Very helpful And Quick respond. The Best of The best.",
  },
  {
    name: "Mr Slayer 47",
    initials: "MS",
    date: "Février 2026",
    text: "Very good server and pretty good support 10/10 💯",
  },
  {
    name: "𝐀𝐙†𝐑𝐎",
    initials: "AZ",
    date: "Février 2026",
    text: "Amazing service, excellent quality server, very helpful and always willing to help. Highly recommended!",
  },
  {
    name: "Lily",
    initials: "LY",
    date: "Février 2026",
    text: "I'm very satisfied with the service. The developer showed strong technical skills, clear communication, and great attention to detail. Everything was delivered on schedule and exceeded my expectations",
  },
  {
    name: "RΩGΣR",
    initials: "RG",
    date: "Février 2026",
    text: "That's very good support. I wish him a good day and peace.",
  },
  {
    name: "JYNX7rs",
    initials: "JX",
    date: "Février 2026",
    text: "Very solid server, well optimized, and easy to use. Fast support when needed. Highly recommended 💯",
  },
  {
    name: "IKACHI x",
    initials: "IK",
    date: "Mars 2026",
    text: "Amazing, very kind and helpful @Brinley +rep thank you! I appreciate bro ❤️",
  },
  {
    name: "TARIQ ⵣ",
    initials: "TQ",
    date: "Mars 2026",
    text: "the product is great, good quality, fast support",
  },
  {
    name: "! ʜᴀᴅɪ ⁺₊𝄞⋆",
    initials: "HD",
    date: "Mars 2026",
    text: "Great server, quick support when needed would highly recommend",
  },
  {
    name: "TRUE ACROBAT",
    initials: "TA",
    date: "Mars 2026",
    text: "Highly recommended great help with setup ⭐️⭐️⭐️⭐️⭐️",
  },
];

// Distinct colors for avatars matching the reference image style
const avatarColors = [
  "bg-orange-600",
  "bg-blue-600",
  "bg-red-700",
  "bg-purple-700",
  "bg-teal-600",
  "bg-green-700",
  "bg-yellow-600",
  "bg-pink-700",
  "bg-indigo-600",
  "bg-cyan-700",
  "bg-rose-600",
  "bg-amber-600",
];

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(count)].map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
    ))}
  </div>
);

const ReviewCard = ({ review, index }) => (
  <motion.div
    key={review.name}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.07 }}
    className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl p-5 flex flex-col min-w-[240px] max-w-[300px] flex-shrink-0"
  >
    <Stars />
    <p className="text-sm text-secondary-foreground leading-relaxed mb-5 flex-1 font-body">
      <span className="text-foreground font-semibold not-italic">"</span>
      {review.text}
      <span className="text-foreground font-semibold not-italic">"</span>
    </p>
    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/30">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}
      >
        {review.initials}
      </div>
      <div className="min-w-0">
        <p className="font-heading font-bold text-sm text-foreground truncate">{review.name}</p>
        <p className="text-xs text-primary/70">{review.date}</p>
      </div>
    </div>
  </motion.div>
);

const ReviewsSection = () => {
  const half = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, half);
  const row2 = reviews.slice(half);

  return (
    <section id="reviews" className="py-24 md:py-32 relative overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-bottom opacity-[0.10]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/92 to-background" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 px-4"
        >
          <p className="text-primary font-heading text-sm tracking-widest uppercase mb-2 font-semibold">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Trusted by <span className="text-gradient">server owners</span>
          </h2>
        </motion.div>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4 overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-4 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...row1, ...row1].map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} index={i % row1.length} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
          {/* Right fade */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-4 px-6"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...row2, ...row2].map((review, i) => (
              <ReviewCard key={`r2-${i}`} review={review} index={(i % row2.length) + half} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
