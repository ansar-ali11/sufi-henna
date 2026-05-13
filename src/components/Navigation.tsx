import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_ITEMS = ["home", "gallery", "about", "testimonials", "contact"];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl shadow-[0_8px_30px_-10px_hsl(var(--islamic-burgundy)/0.2)] border-b border-islamic-gold/30 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 group"
        >
          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-islamic-burgundy via-islamic-gold to-islamic-teal-dark shadow-md group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-4 h-4 text-islamic-cream" />
            <span className="absolute inset-0 rounded-full border border-islamic-gold/60" />
          </span>
          <span className="flex flex-col leading-none text-left">
            <span className="font-cursive text-2xl md:text-3xl gradient-text">
              SufiMehendi
            </span>
            <span className="font-cormorant tracking-[0.3em] text-[10px] md:text-xs text-islamic-burgundy/80 uppercase">
              Royal Henna Artistry
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="relative px-4 py-2 font-cormorant text-base lg:text-lg tracking-wider capitalize text-foreground hover:text-islamic-burgundy transition-colors group"
            >
              {item}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 group-hover:w-3/4 h-px bg-gradient-to-r from-transparent via-islamic-gold to-transparent transition-all duration-500" />
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="ml-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-islamic-burgundy to-islamic-teal-dark text-islamic-cream font-cormorant tracking-wide shadow-lg hover:shadow-[0_10px_30px_-8px_hsl(var(--islamic-gold)/0.6)] hover:scale-105 transition-all duration-500 border border-islamic-gold/40"
          >
            <Sparkles className="w-4 h-4 text-islamic-gold-light" />
            Book Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="md:hidden relative w-12 h-12 rounded-full bg-gradient-to-br from-islamic-burgundy via-islamic-gold to-islamic-teal-dark p-[2px] shadow-lg hover:scale-105 transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-islamic-burgundy" />
            ) : (
              <Menu className="w-5 h-5 text-islamic-burgundy" />
            )}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-background via-islamic-cream to-background border-t border-islamic-gold/40 shadow-2xl animate-fadeInUp">
          <div className="absolute inset-0 islamic-pattern opacity-20 pointer-events-none" />
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2 relative z-10">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="group flex items-center justify-between text-left font-cormorant text-lg tracking-wider capitalize py-4 px-5 rounded-2xl border border-islamic-gold/30 bg-card/80 hover:bg-gradient-to-r hover:from-islamic-burgundy hover:to-islamic-teal-dark hover:text-islamic-cream hover:border-islamic-gold transition-all duration-500 shadow-sm"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-islamic-gold group-hover:scale-150 transition-transform" />
                  {item}
                </span>
                <Sparkles className="w-4 h-4 text-islamic-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
