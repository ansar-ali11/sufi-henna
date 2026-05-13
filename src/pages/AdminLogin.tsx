import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) navigate("/admin/gallery");
    });
    return () => unsub();
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/gallery");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-mehendi-ivory px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5">
        <h1 className="font-cursive text-4xl text-mehendi-brown text-center">Admin Login</h1>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full bg-mehendi-gold hover:bg-mehendi-brown">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </main>
  );
};

export default AdminLogin;
