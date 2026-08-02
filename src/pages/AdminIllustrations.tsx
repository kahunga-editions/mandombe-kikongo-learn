import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clipboard, Download, Loader2, Trash2, Upload } from "lucide-react";

const BUCKET = "book-illustrations";
const FOLDER = "letters";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SLOTS: { id: string; label: string }[] = [
  { id: "cover", label: "Couverture" },
  ...LETTERS.map((l) => ({ id: l, label: `Lettre ${l}` })),
  { id: "hash", label: "Autres (#)" },
];

type SlotState = Record<string, { url: string; updatedAt: string } | undefined>;

const AdminIllustrations = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [images, setImages] = useState<SlotState>({});
  const [selected, setSelected] = useState<string>("cover");
  const [busy, setBusy] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [zipping, setZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/");
  }, [loading, isAdmin, navigate]);

  const refresh = useCallback(async () => {
    setFetching(true);
    const { data, error } = await supabase.storage.from(BUCKET).list(FOLDER, { limit: 100 });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      setFetching(false);
      return;
    }
    const next: SlotState = {};
    const files = (data || []).filter((f) => f.name && !f.name.startsWith("."));
    if (files.length) {
      const paths = files.map((f) => `${FOLDER}/${f.name}`);
      const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 3600);
      (signed || []).forEach((s, i) => {
        const slot = files[i].name.replace(/\.[^.]+$/, "");
        if (s.signedUrl) {
          next[slot] = {
            url: s.signedUrl,
            updatedAt: files[i].updated_at || files[i].created_at || "",
          };
        }
      });
    }
    setImages(next);
    setFetching(false);
  }, [toast]);

  useEffect(() => {
    if (isAdmin) refresh();
  }, [isAdmin, refresh]);

  const uploadBlob = useCallback(
    async (slot: string, blob: Blob) => {
      if (!blob.type.startsWith("image/")) {
        toast({ title: "Format non supporté", description: "Colle une image.", variant: "destructive" });
        return;
      }
      setBusy(slot);
      const ext = blob.type === "image/jpeg" ? "jpg" : blob.type === "image/webp" ? "webp" : "png";
      // On nettoie les autres extensions du meme slot pour eviter les doublons.
      await supabase.storage
        .from(BUCKET)
        .remove(["png", "jpg", "webp"].filter((e) => e !== ext).map((e) => `${FOLDER}/${slot}.${e}`));
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(`${FOLDER}/${slot}.${ext}`, blob, { upsert: true, contentType: blob.type });
      setBusy(null);
      if (error) {
        toast({ title: "Envoi impossible", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Illustration enregistrée", description: SLOTS.find((s) => s.id === slot)?.label });
      refresh();
    },
    [refresh, toast],
  );

  // Coller depuis le presse-papier (Ctrl/Cmd + V) vers le slot selectionne.
  useEffect(() => {
    if (!isAdmin) return;
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items || []).find((i) => i.type.startsWith("image/"));
      if (!item) return;
      const file = item.getAsFile();
      if (!file) return;
      e.preventDefault();
      uploadBlob(selected, file);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [isAdmin, selected, uploadBlob]);

  const onDrop = (slot: string) => (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadBlob(slot, file);
  };

  const removeSlot = async (slot: string) => {
    setBusy(slot);
    await supabase.storage
      .from(BUCKET)
      .remove(["png", "jpg", "webp"].map((e) => `${FOLDER}/${slot}.${e}`));
    setBusy(null);
    refresh();
  };

  const downloadZip = async () => {
    setZipping(true);
    try {
      const zip = new JSZip();
      for (const slot of Object.keys(images)) {
        const entry = images[slot];
        if (!entry) continue;
        const res = await fetch(entry.url);
        const blob = await res.blob();
        const ext = blob.type === "image/jpeg" ? "jpg" : blob.type === "image/webp" ? "webp" : "png";
        zip.file(`${slot}.${ext}`, blob);
      }
      const out = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(out);
      a.download = "illustrations-buku-dia-binsono.zip";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      toast({ title: "Export impossible", description: String(err), variant: "destructive" });
    }
    setZipping(false);
  };

  if (loading || !isAdmin) return null;

  const filled = Object.keys(images).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-28 max-w-6xl">
        <header className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Illustrations du livre</h1>
          <p className="text-muted-foreground max-w-2xl">
            Sélectionne une case, puis colle ton image avec <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">Ctrl/Cmd + V</kbd>.
            Tu peux aussi glisser-déposer un fichier sur une case. {filled} / {SLOTS.length} remplies.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-4 h-4 mr-2" /> Choisir un fichier
          </Button>
          <Button variant="outline" onClick={downloadZip} disabled={zipping || !filled}>
            {zipping ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Télécharger le ZIP
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadBlob(selected, f);
              e.target.value = "";
            }}
          />
        </div>

        {fetching ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" /> Chargement…
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SLOTS.map((slot) => {
              const img = images[slot.id];
              const isSelected = selected === slot.id;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => setSelected(slot.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onDrop(slot.id)}
                  className={`relative text-left rounded-xl border-2 border-dashed p-3 transition-colors ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-sm">{slot.label}</span>
                    {img && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`Supprimer ${slot.label}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSlot(slot.id);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && removeSlot(slot.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="aspect-[4/3] rounded-lg bg-muted/40 flex items-center justify-center overflow-hidden">
                    {busy === slot.id ? (
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    ) : img ? (
                      <img src={img.url} alt={`Illustration ${slot.label}`} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clipboard className="w-3.5 h-3.5" /> Coller ici
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminIllustrations;
