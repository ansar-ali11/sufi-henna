import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, IndianRupee, Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const contactInfo = [
  {
    icon: MapPin,
    title: "Location",
    detail: "Kakinada, Andhra Pradesh",
  },
  {
    icon: Phone,
    title: "Phone",
    detail: "+91 7386146338",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "info@sufimehendi.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon-Sat: Flexible Times",
  },
  {
    icon: IndianRupee,
    title: "Prices",
    detail: "In Person Deal",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    event: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS Configuration - Replace with your actual values from https://emailjs.com
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          event_date: formData.date,
          event_name: formData.event,
          contact_number: formData.contact,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Booking Request Sent! ✓",
        description: "Thank you for your interest. We'll contact you soon.",
      });

      setFormData({
        name: "",
        email: "",
        date: "",
        event: "",
        contact: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-royal-pattern relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-30 pointer-events-none" />

      {/* Decorative mandala */}
      <div className="absolute top-10 right-10 w-48 h-48 opacity-10 animate-rotate-slow pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full text-islamic-burgundy">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          {[...Array(18)].map((_, i) => <line key={i} x1="100" y1="10" x2="100" y2="190" stroke="currentColor" strokeWidth="0.3" transform={`rotate(${i * 20} 100 100)`} />)}
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 text-islamic-gold text-xs md:text-sm tracking-[0.35em] uppercase mb-4 font-cormorant">
            <Sparkles className="w-4 h-4" /> Reserve Your Date <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="font-cursive text-5xl md:text-7xl gradient-text mb-4">
            Contact &amp; Booking
          </h2>
          <p className="font-cormorant italic text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto mt-4">
            Let’s create something timeless for your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-4 animate-fadeInUp">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group p-5 rounded-2xl card-royal hover:-translate-y-1 transition-all duration-500 flex items-center gap-4"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-islamic-burgundy via-islamic-gold to-islamic-teal-dark p-[2px] flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <Icon className="w-6 h-6 text-islamic-burgundy group-hover:text-islamic-gold transition-colors" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-cursive text-2xl text-islamic-burgundy leading-none mb-1">{item.title}</h3>
                    <p className="font-cormorant text-base text-foreground/75">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-3 animate-fadeInUp">
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-islamic-gold/30 via-transparent to-islamic-burgundy/20 blur-xl opacity-70" />
              <div className="relative rounded-[1.75rem] card-royal p-8 md:p-10">
                <div className="text-center mb-6">
                  <h3 className="font-cursive text-3xl md:text-4xl text-islamic-burgundy">
                    Book Your Mehendi Session
                  </h3>
                  <div className="divider-royal mt-3">
                    <Sparkles className="w-4 h-4 text-islamic-gold" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 h-12 px-4 rounded-xl bg-background font-cormorant text-base"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 h-12 px-4 rounded-xl bg-background font-cormorant text-base"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="contact"
                      type="tel"
                      placeholder="Contact Number"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 h-12 px-4 rounded-xl bg-background font-cormorant text-base"
                    />
                    <Input
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 h-12 px-4 rounded-xl bg-background font-cormorant text-base"
                    />
                  </div>
                  <Input
                    name="event"
                    placeholder="Event (Wedding, Eid, Engagement…)"
                    value={formData.event}
                    onChange={handleChange}
                    required
                    className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 h-12 px-4 rounded-xl bg-background font-cormorant text-base"
                  />
                  <Textarea
                    name="message"
                    placeholder="Tell us about your design vision…"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="border-2 border-islamic-gold/30 focus-visible:border-islamic-gold focus-visible:ring-islamic-gold/40 px-4 py-3 rounded-xl bg-background font-cormorant text-base resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-full bg-gradient-to-r from-islamic-burgundy via-islamic-gold to-islamic-teal-dark hover:opacity-95 text-islamic-cream font-cormorant text-lg tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      "Sending…"
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        <Send className="w-4 h-4" /> Reserve My Date
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
