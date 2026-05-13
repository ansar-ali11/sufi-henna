import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

const galleryItems = [
  {
    id: 1,
    title: "Royal Bridal Mehendi",
    image: "https://images.unsplash.com/photo-1610117048930-ff5092976aaa?q=80&w=800",
    category: "Bridal",
    description: "Intricate bridal designs for your special day",
  },
  {
    id: 2,
    title: "Elegant Arabic Flow",
    image: "https://images.unsplash.com/photo-1598513239239-d3d3a9000e66?q=80&w=800",
    category: "Arabic",
    description: "Flowing Arabic patterns with bold strokes",
  },
  {
    id: 3,
    title: "Festive Celebration",
    image: "https://images.unsplash.com/photo-1610117049304-b7386add2f6c?q=80&w=800",
    category: "Festival",
    description: "Perfect for Eid, Diwali & celebrations",
  },
  {
    id: 4,
    title: "Minimal Elegance",
    image: "https://images.unsplash.com/photo-1623146339642-e949ddeea1b2?q=80&w=800",
    category: "Minimal",
    description: "Contemporary designs with traditional roots",
  },
  {
    id: 5,
    title: "Traditional Bridal",
    image: "https://images.unsplash.com/photo-1614021422985-5ffbfb2e6c6a?q=80&w=800",
    category: "Bridal",
    description: "Full hand coverage with paisley motifs",
  },
  {
    id: 6,
    title: "Floral Paradise",
    image: "https://images.unsplash.com/photo-1610117049044-8794b5eb4bcc?q=80&w=800",
    category: "Festival",
    description: "Delicate floral motifs and patterns",
  },
  {
    id: 7,
    title: "Arabic Mandala",
    image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=800",
    category: "Arabic",
    description: "Bold mandala with Arabic elements",
  },
  {
    id: 8,
    title: "Simple & Sweet",
    image: "https://images.unsplash.com/photo-1600002415506-dd06090d3480?q=80&w=800",
    category: "Minimal",
    description: "Perfect for everyday occasions",
  },
];

const categories = ["All", "Bridal", "Arabic", "Festival", "Minimal"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string | number>>(new Set());
  const [items, setItems] = useState(galleryItems);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (!snap.empty) {
          setItems(
            snap.docs.map((d) => {
              const data = d.data() as any;
              return {
                id: d.id as any,
                title: data.title || "Untitled",
                image: data.image,
                category: data.category || "Bridal",
                description: data.description || "",
              };
            })
          );
        }
      },
      () => {}
    );
    return () => unsub();
  }, []);

  const filteredItems = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const handleImageLoad = (id: string | number) => {
    setImagesLoaded((prev) => new Set(prev).add(id));
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-mehendi-ivory via-mehendi-beige/30 to-mehendi-ivory relative overflow-hidden">
      {/* Decorative Mandala Background */}
      <div className="absolute top-0 left-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full text-mehendi-brown">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 30} 100 100)`}/>
          ))}
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 rotate-45">
        <svg viewBox="0 0 200 200" className="w-full h-full text-mehendi-gold">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-mehendi-gold text-sm tracking-widest uppercase mb-4">
            <Sparkles className="w-4 h-4" />
            Artistry Collection
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="font-cursive text-5xl md:text-7xl text-mehendi-brown mb-4">
            Our Gallery
          </h2>
          <p className="font-cormorant text-xl md:text-2xl text-mehendi-sage max-w-2xl mx-auto italic">
            Discover the art of henna through our curated collection of handcrafted designs
          </p>
          
          {/* Decorative Floral Divider */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-mehendi-gold to-transparent" />
            <svg className="w-8 h-8 text-mehendi-gold" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 14.5 5.5 14.5 8.5C14.5 11.5 12 14 12 14C12 14 9.5 11.5 9.5 8.5C9.5 5.5 12 2 12 2Z"/>
              <path d="M12 14C12 14 17 11 20 14C23 17 20 22 20 22C20 22 15 19 12 22C9 19 4 22 4 22C4 22 1 17 4 14C7 11 12 14 12 14Z" opacity="0.7"/>
            </svg>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-mehendi-gold to-transparent" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-cormorant text-lg tracking-wide transition-all duration-500 border-2 ${
                activeCategory === category
                  ? "bg-mehendi-gold text-white border-mehendi-gold shadow-lg shadow-mehendi-gold/30 scale-105"
                  : "bg-white/80 text-mehendi-brown border-mehendi-beige hover:border-mehendi-gold hover:bg-mehendi-gold/10 hover:scale-105"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg hover:shadow-2xl hover:shadow-mehendi-gold/20 transition-all duration-500"
              onClick={() => openLightbox(index)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Image Container with varying heights for masonry effect */}
              <div className={`relative overflow-hidden ${
                index % 4 === 0 ? 'aspect-[3/4]' : 
                index % 4 === 1 ? 'aspect-square' : 
                index % 4 === 2 ? 'aspect-[4/5]' : 
                'aspect-[3/4]'
              }`}>
                {/* Skeleton loader */}
                {!imagesLoaded.has(item.id) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-mehendi-beige to-mehendi-ivory animate-pulse" />
                )}
                
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  onLoad={() => handleImageLoad(item.id)}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    imagesLoaded.has(item.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Gold Border Reveal on Hover */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-mehendi-gold/60 rounded-2xl md:rounded-3xl transition-all duration-500 pointer-events-none" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-mehendi-gold/20 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md">
                  <span className="text-xs font-semibold text-mehendi-brown tracking-wider uppercase">
                    {item.category}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-mehendi-brown/90 via-mehendi-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-cursive text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
                    <p className="text-mehendi-beige text-sm md:text-base font-light">{item.description}</p>
                    
                    {/* View Button */}
                    <div className="mt-4 inline-flex items-center gap-2 text-mehendi-gold text-sm font-medium">
                      <span>View Design</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-mehendi-gold/0 group-hover:border-mehendi-gold rounded-tr-lg transition-all duration-500 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-mehendi-gold/0 group-hover:border-mehendi-gold rounded-bl-lg transition-all duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="font-cormorant text-xl text-mehendi-sage mb-6 italic">
            Ready to get your dream mehendi design?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-mehendi-gold to-mehendi-brown text-white font-semibold rounded-full shadow-xl hover:shadow-2xl hover:shadow-mehendi-gold/40 hover:scale-105 transition-all duration-500"
          >
            <Sparkles className="w-5 h-5" />
            Book Your Session
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-mehendi-brown/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 md:left-8 p-3 md:p-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-50"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 md:right-8 p-3 md:p-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 z-50"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[currentImage]?.image.replace('w=800', 'w=1600')}
              alt={filteredItems[currentImage]?.title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-mehendi-brown to-transparent rounded-b-2xl">
              <span className="text-mehendi-gold text-sm uppercase tracking-widest mb-2 block">
                {filteredItems[currentImage]?.category}
              </span>
              <h3 className="font-cursive text-3xl md:text-4xl text-white mb-2">
                {filteredItems[currentImage]?.title}
              </h3>
              <p className="text-white/80 font-light">
                {filteredItems[currentImage]?.description}
              </p>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white text-sm">
                {currentImage + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
