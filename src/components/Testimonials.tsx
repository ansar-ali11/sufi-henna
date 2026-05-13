import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Aisha Khan",
    role: "Bride • Hyderabad",
    text: "My bridal mehendi was beyond a dream. The detailing, the deep stain, the patience — every guest kept asking who my artist was. Truly royal work.",
    rating: 5,
  },
  {
    name: "Fatima Sheikh",
    role: "Eid Celebration",
    text: "I've tried many artists, but SufiMehendi feels different — calm, elegant, and the designs feel handcrafted just for me. I keep coming back.",
    rating: 5,
  },
  {
    name: "Zara Ahmed",
    role: "Engagement",
    text: "From the consultation to the final design, everything was magical. The Arabic floral pattern she designed for me was pure poetry on skin.",
    rating: 5,
  },
  {
    name: "Sana Reddy",
    role: "Mother of the Bride",
    text: "Booked for the entire bridal party — every single design was unique and stunning. Punctual, professional and absolutely worth it.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-islamic-burgundy via-[hsl(350_55%_22%)] to-islamic-teal-dark text-islamic-cream">
      {/* Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      {/* Floating mandalas */}
      <div className="absolute -top-20 -right-20 w-80 h-80 opacity-20 animate-rotate-slow pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-gold">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {[...Array(20)].map((_, i) => <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 18} 100 100)`} />)}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-islamic-gold-light text-xs md:text-sm tracking-[0.35em] uppercase mb-4 font-cormorant">
            <Sparkles className="w-4 h-4" /> Kind Words <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="font-cursive text-5xl md:text-7xl text-islamic-cream mb-4">
            Loved by Brides
          </h2>
          <p className="font-cormorant italic text-lg md:text-xl text-islamic-cream/80 max-w-2xl mx-auto">
            Stories whispered from mehendi nights, weddings, and festive evenings.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-islamic-gold/30 to-transparent blur-2xl" />

          <div className="relative rounded-[2rem] border border-islamic-gold/40 bg-islamic-cream/5 backdrop-blur-md p-8 md:p-14 text-center shadow-2xl">
            <Quote className="w-12 h-12 text-islamic-gold mx-auto mb-6 opacity-80" />

            <div key={active} className="animate-fadeInScale">
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-islamic-gold text-islamic-gold" />
                ))}
              </div>
              <p className="font-cormorant italic text-xl md:text-2xl leading-relaxed text-islamic-cream/95 mb-8">
                “{testimonials[active].text}”
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-islamic-gold/60" />
                <div>
                  <div className="font-cursive text-2xl text-islamic-gold-light">{testimonials[active].name}</div>
                  <div className="font-cormorant tracking-widest text-xs uppercase text-islamic-cream/70">{testimonials[active].role}</div>
                </div>
                <div className="h-px w-10 bg-islamic-gold/60" />
              </div>
            </div>

            {/* Controls */}
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-islamic-cream/10 hover:bg-islamic-gold hover:text-islamic-burgundy border border-islamic-gold/40 flex items-center justify-center transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-islamic-cream/10 hover:bg-islamic-gold hover:text-islamic-burgundy border border-islamic-gold/40 flex items-center justify-center transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-islamic-gold" : "w-3 bg-islamic-cream/30 hover:bg-islamic-cream/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
