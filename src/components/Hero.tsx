import { Sparkles, ChevronDown } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with rich royal overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--islamic-burgundy) / 0.88), hsl(var(--islamic-teal-dark) / 0.85)), url('https://images.unsplash.com/photo-1610117048930-ff5092976aaa?q=80&w=2000')`,
        }}
      />

      {/* Subtle paisley pattern overlay */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-screen islamic-pattern" />

      {/* Decorative rotating mandalas */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] opacity-20 animate-rotate-slow pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-gold">
          {[...Array(24)].map((_, i) => (
            <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 15} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] opacity-20 animate-rotate-slow pointer-events-none" style={{ animationDirection: "reverse" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-gold-light">
          {[...Array(24)].map((_, i) => (
            <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 15} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Floating ornaments */}
      <div className="absolute top-24 right-12 w-20 h-20 border border-islamic-gold/40 rounded-full animate-float" />
      <div className="absolute bottom-32 left-12 w-14 h-14 border border-islamic-gold/40 rounded-full animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-islamic-cream">
        <div className="max-w-4xl mx-auto space-y-7 animate-fadeInUp">
          {/* Eyebrow tag */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-islamic-gold/50 bg-islamic-burgundy/30 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-islamic-gold-light" />
            <span className="font-cormorant tracking-[0.35em] text-xs md:text-sm uppercase text-islamic-gold-light">
              Royal Henna Atelier
            </span>
            <Sparkles className="w-4 h-4 text-islamic-gold-light" />
          </div>

          {/* Headline */}
          <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] text-islamic-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            SufiMehendi
          </h1>

          {/* Gold divider with motif */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 md:w-32 bg-gradient-to-r from-transparent via-islamic-gold to-islamic-gold" />
            <svg className="w-8 h-8 text-islamic-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 14.5 5.5 14.5 8.5C14.5 11.5 12 14 12 14C12 14 9.5 11.5 9.5 8.5C9.5 5.5 12 2 12 2Z" />
              <circle cx="12" cy="18" r="2" />
            </svg>
            <div className="h-px w-24 md:w-32 bg-gradient-to-l from-transparent via-islamic-gold to-islamic-gold" />
          </div>

          {/* Tagline */}
          <p className="font-cormorant italic text-2xl md:text-3xl lg:text-4xl text-islamic-cream/95 max-w-3xl mx-auto leading-snug">
            Where every stroke tells a story of <span className="text-islamic-gold-light">tradition, romance &amp; royalty.</span>
          </p>
          <p className="text-base md:text-lg text-islamic-cream/80 max-w-xl mx-auto font-light tracking-wide">
            Bridal • Arabic • Festive • Contemporary Henna Designs
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => scrollTo("gallery")}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-islamic-gold via-islamic-gold-light to-islamic-gold text-islamic-burgundy font-cormorant text-lg font-semibold tracking-wider shadow-2xl hover:shadow-[0_15px_40px_-10px_hsl(var(--islamic-gold)/0.7)] hover:scale-105 transition-all duration-500"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Explore Gallery
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-islamic-gold/70 text-islamic-cream hover:bg-islamic-cream hover:text-islamic-burgundy font-cormorant text-lg tracking-wider transition-all duration-500"
            >
              Book Your Session
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo("gallery")}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 text-islamic-gold-light/80 hover:text-islamic-gold animate-float"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-7 h-7" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
