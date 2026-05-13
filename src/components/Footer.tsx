import { Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-islamic-burgundy via-[hsl(350_55%_18%)] to-islamic-teal-dark text-islamic-cream">
      {/* Pattern overlay */}
      <div className="absolute inset-0 islamic-pattern opacity-10" />

      {/* Top gold accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent" />

      {/* Decorative mandala */}
      <div className="absolute -top-20 -left-20 w-72 h-72 opacity-10 animate-rotate-slow pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-gold">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.4" />
          {[...Array(20)].map((_, i) => <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 18} 100 100)`} />)}
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top: brand statement */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-islamic-gold-light text-xs tracking-[0.35em] uppercase mb-3 font-cormorant">
            <Sparkles className="w-4 h-4" /> Royal Henna Atelier <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-cursive text-5xl md:text-6xl text-islamic-cream mb-3">
            SufiMehendi
          </h3>
          <p className="font-cormorant italic text-lg text-islamic-cream/80">
            Where every stroke whispers tradition, romance &amp; royalty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-cursive text-2xl text-islamic-gold-light mb-4">Explore</h4>
            <ul className="space-y-2 font-cormorant text-base">
              {["home", "gallery", "about", "testimonials", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item)}
                    className="text-islamic-cream/80 hover:text-islamic-gold capitalize transition-colors duration-300 tracking-wide"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center">
            <h4 className="font-cursive text-2xl text-islamic-gold-light mb-4">Signature Designs</h4>
            <ul className="space-y-2 font-cormorant text-base text-islamic-cream/80">
              <li>Bridal Mehendi</li>
              <li>Arabic &amp; Floral</li>
              <li>Festive Specials</li>
              <li>Engagement Designs</li>
              <li>Bespoke Artwork</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h4 className="font-cursive text-2xl text-islamic-gold-light mb-4">Reach Us</h4>
            <ul className="space-y-3 font-cormorant text-base text-islamic-cream/80">
              <li className="flex items-center justify-center md:justify-end gap-2">
                <MapPin className="w-4 h-4 text-islamic-gold" /> Kakinada, AP
              </li>
              <li className="flex items-center justify-center md:justify-end gap-2">
                <Phone className="w-4 h-4 text-islamic-gold" /> +91 7386146338
              </li>
              <li className="flex items-center justify-center md:justify-end gap-2">
                <Mail className="w-4 h-4 text-islamic-gold" /> info@sufimehendi.com
              </li>
            </ul>
            <div className="flex gap-3 justify-center md:justify-end mt-5">
              <a
                href="https://www.instagram.com/sufi_mehendi_86"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-islamic-gold/40 bg-islamic-cream/10 hover:bg-islamic-gold hover:text-islamic-burgundy flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Royal divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-islamic-gold/60" />
          <svg className="w-5 h-5 text-islamic-gold" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C12 2 14.5 5.5 14.5 8.5C14.5 11.5 12 14 12 14C12 14 9.5 11.5 9.5 8.5C9.5 5.5 12 2 12 2Z" />
          </svg>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-islamic-gold/60" />
        </div>

        <p className="text-center font-cormorant text-sm tracking-widest text-islamic-cream/70">
          © {new Date().getFullYear()} SufiMehendi · Crafted with <span className="text-islamic-gold">♥</span> &amp; tradition
        </p>
      </div>

      {/* Floating Instagram */}
      <a
        href="https://www.instagram.com/sufi_mehendi_86"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-islamic-burgundy via-islamic-gold to-islamic-teal-dark p-[2px] shadow-2xl z-50 hover:scale-110 transition-transform duration-300 animate-float"
        title="Follow us on Instagram"
        aria-label="Instagram"
      >
        <span className="w-full h-full rounded-full bg-background flex items-center justify-center">
          <Instagram className="w-6 h-6 text-islamic-burgundy" />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
