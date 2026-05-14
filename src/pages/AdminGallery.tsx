import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Trash2, LogOut, Upload, Sparkles, ImagePlus, Flower2 } from "lucide-react";
import IslamicPattern from "@/components/IslamicPattern";

interface GalleryDoc {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const categories = ["Bridal", "Arabic", "Festival", "Minimal"];

const AdminGallery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryDoc[]>([]);
  const [form, setForm] = useState({ title: "", category: "Bridal", description: "", image: "" });
  const [saving, setSaving] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const TARGET_BYTES = 700 * 1024;
          const MAX_DIM = 1280;
          let { width, height } = img;
          if (width > MAX_DIM || height > MAX_DIM) {
            const scale = Math.min(MAX_DIM / width, MAX_DIM / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Canvas unsupported"));
          ctx.drawImage(img, 0, 0, width, height);

          let quality = 0.9;
          let dataUrl = canvas.toDataURL("image/jpeg", quality);
          const byteSize = (s: string) => Math.ceil((s.length - (s.indexOf(",") + 1)) * 0.75);

          while (byteSize(dataUrl) > TARGET_BYTES && quality > 0.3) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
          while (byteSize(dataUrl) > TARGET_BYTES && (canvas.width > 600 || canvas.height > 600)) {
            canvas.width = Math.round(canvas.width * 0.85);
            canvas.height = Math.round(canvas.height * 0.85);
            const c2 = canvas.getContext("2d")!;
            c2.drawImage(img, 0, 0, canvas.width, canvas.height);
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
          resolve(dataUrl);
        };
        img.onerror = () => reject(new Error("Invalid image"));
        img.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Read failed"));
      reader.readAsDataURL(file);
    });

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image", variant: "destructive" });
      return;
    }
    setCompressing(true);
    try {
      const dataUrl = await compressImage(file);
      setForm((f) => ({ ...f, image: dataUrl }));
      toast({ title: "Image ready", description: "Compressed and ready to save." });
    } catch (err: any) {
      toast({ title: "Compression failed", description: err.message, variant: "destructive" });
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate("/admin/login");
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    });
    return () => unsub();
  }, []);

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) {
      toast({ title: "Title and image are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const approxBytes = new Blob([JSON.stringify(form)]).size;
      if (approxBytes > 1_000_000) {
        throw new Error(
          `Image too large after compression (~${Math.round(approxBytes / 1024)}KB). Try a smaller photo.`
        );
      }
      await addDoc(collection(db, "gallery"), { ...form, createdAt: serverTimestamp() });
      setForm({ title: "", category: "Bridal", description: "", image: "" });
      toast({ title: "Design added ✨" });
    } catch (err: any) {
      console.error("[AdminGallery] addDoc failed:", err);
      toast({
        title: "Failed to save",
        description: err?.message || "Check Firestore rules allow authenticated writes to 'gallery'.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this design?")) return;
    await deleteDoc(doc(db, "gallery", id));
    toast({ title: "Deleted" });
  };

  return (
    <main className="relative min-h-screen bg-royal-pattern overflow-hidden">
      {/* Decorative Islamic pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] text-islamic-gold">
        <IslamicPattern />
      </div>

      {/* Floating ornamental blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-islamic-gold/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-islamic-burgundy/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-islamic-teal/20 blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 animate-fadeInUp">
          <div>
            <div className="divider-royal mb-3 justify-start">
              <Sparkles className="w-4 h-4 text-islamic-gold" />
              <span className="text-xs uppercase tracking-[0.3em] text-islamic-gold font-semibold">Admin Studio</span>
            </div>
            <h1 className="font-cursive text-5xl md:text-6xl text-royal leading-tight">
              Mehendi Gallery
            </h1>
            <p className="font-cormorant italic text-muted-foreground mt-1">
              Curate timeless henna artistry ✦ for your beautiful brides
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => signOut(auth)}
            className="border-islamic-gold/50 text-islamic-burgundy hover:bg-islamic-gold/10 backdrop-blur-sm"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </header>

        {/* Add Design Card */}
        <form
          onSubmit={onAdd}
          className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-islamic-gold via-islamic-burgundy to-islamic-teal shadow-elegant mb-12 animate-fadeInScale"
        >
          <div className="rounded-3xl bg-card/95 backdrop-blur-xl p-6 md:p-8 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-islamic-gold to-islamic-burgundy flex items-center justify-center shadow-gold">
                <Flower2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-playfair text-2xl text-islamic-burgundy">Add a New Design</h2>
                <p className="text-xs text-muted-foreground font-cormorant italic">
                  Auto-compressed to fit beautifully — under 1MB.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Design title (e.g. Royal Bridal Jaal)"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-background/60 border-islamic-gold/30 focus-visible:ring-islamic-gold"
              />
              <select
                className="h-10 rounded-md border border-islamic-gold/30 bg-background/60 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-islamic-gold"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {/* Upload zone */}
              <div className="md:col-span-2">
                <label
                  htmlFor="file-upload"
                  className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-smooth p-8 text-center ${
                    form.image
                      ? "border-islamic-teal/40 bg-islamic-teal/5"
                      : "border-islamic-gold/40 bg-gradient-to-br from-islamic-gold/5 to-islamic-burgundy/5 hover:border-islamic-gold hover:shadow-gold"
                  }`}
                >
                  {form.image ? (
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={form.image}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded-2xl border-2 border-islamic-gold/50 shadow-elegant"
                      />
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-islamic-teal-dark font-medium">Image ready ✨</span>
                        <button
                          type="button"
                          className="text-xs text-destructive underline"
                          onClick={(e) => {
                            e.preventDefault();
                            setForm({ ...form, image: "" });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-islamic-gold to-islamic-gold-light flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
                        <ImagePlus className="w-7 h-7 text-islamic-burgundy" />
                      </div>
                      <div>
                        <p className="font-playfair text-lg text-islamic-burgundy">
                          {compressing ? "Compressing your art..." : "Tap to upload from device"}
                        </p>
                        <p className="text-xs text-muted-foreground font-cormorant italic mt-1">
                          JPG, PNG — auto-optimized for elegance
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFile}
                    disabled={compressing}
                    className="hidden"
                  />
                </label>
              </div>

              <Input
                className="md:col-span-2 bg-background/60 border-islamic-gold/30 focus-visible:ring-islamic-gold"
                placeholder="A short, lovely description..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={saving || compressing}
              className="w-full md:w-auto bg-gradient-to-r from-islamic-burgundy to-islamic-gold hover:opacity-90 text-primary-foreground shadow-gold transition-smooth"
            >
              <Upload className="w-4 h-4 mr-2" />
              {saving ? "Adding to gallery..." : "Add to Gallery"}
            </Button>
          </div>
        </form>

        {/* Gallery grid */}
        <section>
          <div className="divider-royal mb-6">
            <Flower2 className="w-4 h-4 text-islamic-gold" />
            <span className="font-playfair text-islamic-burgundy uppercase tracking-[0.3em] text-xs">
              Your Collection · {items.length}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((it) => (
              <div
                key={it.id}
                className="group relative rounded-2xl overflow-hidden card-royal transition-smooth hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-islamic-gold/90 text-islamic-burgundy text-xs font-semibold backdrop-blur-sm shadow-md">
                    {it.category}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(it.id)}
                    className="absolute top-3 right-3 bg-background/80 hover:bg-destructive hover:text-destructive-foreground backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4 bg-gradient-card">
                  <p className="font-playfair text-lg text-islamic-burgundy leading-tight">{it.title}</p>
                  {it.description && (
                    <p className="text-sm text-muted-foreground font-cormorant italic mt-1 line-clamp-2">
                      {it.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Flower2 className="w-12 h-12 text-islamic-gold/50 mx-auto mb-4 animate-float" />
                <p className="font-cursive text-3xl text-islamic-burgundy/70">No designs yet</p>
                <p className="text-sm text-muted-foreground font-cormorant italic mt-1">
                  Begin your beautiful collection above ✦
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminGallery;
