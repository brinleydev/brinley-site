const messages = [
  "🔥 LIMITED TIME — 20% OFF all packages",
  "🚀 130+ Scripts included",
  "💎 Premium FiveM Server V5 — Now Available",
];

const track = [...messages, ...messages, ...messages];

const AnnouncementBar = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-7 overflow-hidden flex items-center border-b border-primary/20"
      style={{ background: "hsl(var(--background))" }}
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10"
        style={{ background: "linear-gradient(to right, hsl(var(--background)), transparent)" }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10"
        style={{ background: "linear-gradient(to left, hsl(var(--background)), transparent)" }}
      />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {track.map((msg, i) => (
          <span
            key={i}
            className="inline-flex items-center font-heading font-semibold text-[11px] tracking-[0.15em] uppercase px-8"
            style={{ color: "hsl(var(--primary))" }}
          >
            {msg}
            <span className="ml-8 opacity-30" style={{ color: "hsl(var(--primary))" }}>|</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementBar;
