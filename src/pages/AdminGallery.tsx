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
import { Trash2, LogOut } from "lucide-react";

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
          // target under ~900KB to stay safely below Firestore 1MB doc limit
          const TARGET_BYTES = 900 * 1024;
          const MAX_DIM = 1600;
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
          // base64 length * 0.75 ≈ bytes
          const byteSize = (s: string) => Math.ceil((s.length - (s.indexOf(",") + 1)) * 0.75);

          while (byteSize(dataUrl) > TARGET_BYTES && quality > 0.3) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
          // if still too big, downscale further
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
      await addDoc(collection(db, "gallery"), { ...form, createdAt: serverTimestamp() });
      setForm({ title: "", category: "Bridal", description: "", image: "" });
      toast({ title: "Design added" });
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
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
    <main className="min-h-screen bg-mehendi-ivory py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-cursive text-4xl text-mehendi-brown">Manage Gallery</h1>
          <Button variant="outline" onClick={() => signOut(auth)}>
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>

        <form onSubmit={onAdd} className="bg-white rounded-2xl shadow p-6 space-y-4 mb-10">
          <h2 className="font-semibold text-lg text-mehendi-brown">Add a new design</h2>
          <p className="text-sm text-muted-foreground">
            Pick an image from your device — it will be auto-compressed to fit Firestore's 1MB limit.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <select
              className="h-10 rounded-md border border-input bg-background px-3"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="md:col-span-2 space-y-2">
              <Input type="file" accept="image/*" onChange={onFile} disabled={compressing} />
              {compressing && <p className="text-xs text-muted-foreground">Compressing image...</p>}
              {form.image && (
                <div className="flex items-center gap-3">
                  <img src={form.image} alt="preview" className="w-20 h-20 object-cover rounded-md border" />
                  <button
                    type="button"
                    className="text-xs text-destructive underline"
                    onClick={() => setForm({ ...form, image: "" })}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <Input
              className="md:col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <Button type="submit" disabled={saving} className="bg-mehendi-gold hover:bg-mehendi-brown">
            {saving ? "Adding..." : "Add Design"}
          </Button>
        </form>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it) => (
            <div key={it.id} className="bg-white rounded-xl overflow-hidden shadow group">
              <img src={it.image} alt={it.title} className="w-full aspect-square object-cover" />
              <div className="p-3 flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-mehendi-brown">{it.title}</p>
                  <p className="text-xs text-muted-foreground">{it.category}</p>
                </div>
                <Button size="icon" variant="ghost" onClick={() => onDelete(it.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center py-10">No designs yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminGallery;
