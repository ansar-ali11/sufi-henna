import { Heart, Star, Users, Award, Sparkles } from "lucide-react";

const features = [
  { icon: Heart, title: "Passionate Artistry", description: "Trained in heritage Indian and contemporary henna techniques." },
  { icon: Star, title: "Premium Natural Henna", description: "Hand-prepared with the finest organic ingredients for rich stains." },
  { icon: Users, title: "Bespoke Designs", description: "Every motif hand-drawn to suit your story, attire and occasion." },
  { icon: Award, title: "Trusted by Brides", description: "Beloved across weddings, festivals and royal celebrations." },
];

const stats = [
  { number: "500+", label: "Brides Adorned" },
  { number: "10+", label: "Years of Craft" },
  { number: "50+", label: "Signature Designs" },
  { number: "5★", label: "Client Rating" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-royal-pattern relative overflow-hidden">
      {/* Decorative paisley corners */}
      <div className="absolute top-10 left-10 w-40 h-40 opacity-10 animate-rotate-slow pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-burgundy">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {[...Array(16)].map((_, i) => <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 22.5} 100 100)`} />)}
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 animate-rotate-slow pointer-events-none" style={{ animationDirection: "reverse" }}>
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-teal-dark">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.6" />
          {[...Array(16)].map((_, i) => <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.4" transform={`rotate(${i * 22.5} 100 100)`} />)}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-islamic-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-4 font-cormorant">
            <Sparkles className="w-4 h-4" /> Our Story <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="font-cursive text-5xl md:text-7xl gradient-text mb-4">
            About SufiMehendi
          </h2>
          <div className="divider-royal mt-6">
            <svg className="w-7 h-7 text-islamic-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 14.5 5.5 14.5 8.5C14.5 11.5 12 14 12 14C12 14 9.5 11.5 9.5 8.5C9.5 5.5 12 2 12 2Z" />
            </svg>
          </div>
        </div>

        {/* Two-column heritage story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto mb-20">
          <div className="relative animate-slideInLeft">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-islamic-gold/40 to-islamic-burgundy/30 blur-2xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-islamic-gold/40 shadow-elegant">
              <img
                src="https://images.unsplash.com/photo-1610117048930-ff5092976aaa?q=80&w=1200"
                alt="Royal bridal mehendi artistry"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-islamic-burgundy/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-islamic-cream">
                <p className="font-cursive text-3xl">Heritage. Romance. Royalty.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-slideInRight">
            <h3 className="font-cursive text-4xl md:text-5xl text-islamic-burgundy">
              An Art Passed Through Generations
            </h3>
            <p className="font-cormorant text-lg md:text-xl leading-relaxed text-foreground/85">
              SufiMehendi was born from a devotion to the timeless craft of henna — weaving
              royal Indian motifs, Persian florals and contemporary minimalism into designs
              made just for you.
            </p>
            <p className="font-cormorant text-lg md:text-xl leading-relaxed text-foreground/85">
              From intricate bridal hands that tell a love story, to graceful Arabic strokes
              for festive evenings — every design is hand-drawn with patience, prayer, and
              precision.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Bridal", "Arabic", "Festive", "Minimal", "Custom"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 rounded-full border border-islamic-gold/50 text-islamic-burgundy font-cormorant text-sm tracking-widest bg-islamic-cream/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl card-royal animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="font-cursive text-4xl md:text-5xl gradient-text mb-1">{s.number}</div>
              <div className="font-cormorant tracking-widest text-xs md:text-sm uppercase text-islamic-burgundy/80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-7 rounded-3xl card-royal hover:-translate-y-2 transition-all duration-500 animate-fadeInUp text-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-islamic-burgundy via-islamic-gold to-islamic-teal-dark p-[2px] group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <Icon className="w-7 h-7 text-islamic-burgundy group-hover:text-islamic-gold transition-colors" />
                  </div>
                </div>
                <h3 className="font-cursive text-2xl text-islamic-burgundy mb-2">{feature.title}</h3>
                <p className="font-cormorant text-base text-foreground/75 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
