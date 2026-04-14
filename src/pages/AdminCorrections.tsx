import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Pencil, Check, Trash2, Search, X } from "lucide-react";

interface Correction {
  id: string;
  source_text: string;
  source_lang: string;
  target_lang: string;
  corrected_translation: string;
  corrected_mandombe: string | null;
  corrected_ipa: string | null;
  notes: string | null;
  created_at: string | null;
}

const AdminCorrections = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [corrections, setCorrections] = useState<Correction[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Correction>>({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/");
  }, [loading, isAdmin, navigate]);

  const fetchCorrections = async () => {
    setFetching(true);
    let query = supabase.from("translation_corrections").select("*").order("created_at", { ascending: false });
    if (search.trim()) {
      query = query.ilike("source_text", `%${search.trim()}%`);
    }
    const { data, error } = await query;
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setCorrections(data || []);
    }
    setFetching(false);
  };

  useEffect(() => {
    if (isAdmin) fetchCorrections();
  }, [isAdmin]);

  const handleSearch = () => fetchCorrections();

  const startEdit = (c: Correction) => {
    setEditingId(c.id);
    setEditData({ corrected_translation: c.corrected_translation, corrected_mandombe: c.corrected_mandombe || "", corrected_ipa: c.corrected_ipa || "", notes: c.notes || "" });
  };

  const saveEdit = async (id: string) => {
    const { error } = await supabase.from("translation_corrections").update({
      corrected_translation: editData.corrected_translation!,
      corrected_mandombe: editData.corrected_mandombe || "",
      corrected_ipa: editData.corrected_ipa || "",
      notes: editData.notes || "",
    }).eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Correction mise à jour" });
      setEditingId(null);
      fetchCorrections();
    }
  };

  const deleteCorrection = async (id: string) => {
    const { error } = await supabase.from("translation_corrections").delete().eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Correction supprimée" });
      fetchCorrections();
    }
  };

  if (loading || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-2xl font-bold mb-6">Corrections de traduction</h1>

        <div className="flex gap-2 mb-6 max-w-md">
          <Input placeholder="Rechercher par texte source…" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <Button size="icon" variant="outline" onClick={handleSearch}><Search className="w-4 h-4" /></Button>
          {search && <Button size="icon" variant="ghost" onClick={() => { setSearch(""); setTimeout(fetchCorrections, 0); }}><X className="w-4 h-4" /></Button>}
        </div>

        {fetching ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : corrections.length === 0 ? (
          <p className="text-muted-foreground">Aucune correction trouvée.</p>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Langues</TableHead>
                  <TableHead>Traduction</TableHead>
                  <TableHead>Mandombe</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {corrections.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">{c.source_text}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{c.source_lang} → {c.target_lang}</TableCell>
                    <TableCell>
                      {editingId === c.id ? (
                        <Input value={editData.corrected_translation || ""} onChange={(e) => setEditData((p) => ({ ...p, corrected_translation: e.target.value }))} className="h-8 text-sm" />
                      ) : c.corrected_translation}
                    </TableCell>
                    <TableCell>
                      {editingId === c.id ? (
                        <Input value={editData.corrected_mandombe || ""} onChange={(e) => setEditData((p) => ({ ...p, corrected_mandombe: e.target.value }))} className="h-8 text-sm font-mandombe" />
                      ) : <span className="font-mandombe">{c.corrected_mandombe}</span>}
                    </TableCell>
                    <TableCell>
                      {editingId === c.id ? (
                        <Input value={editData.notes || ""} onChange={(e) => setEditData((p) => ({ ...p, notes: e.target.value }))} className="h-8 text-sm" />
                      ) : <span className="text-xs text-muted-foreground">{c.notes}</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {editingId === c.id ? (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => saveEdit(c.id)}><Check className="w-4 h-4 text-green-500" /></Button>
                            <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="w-4 h-4" /></Button>
                          </>
                        ) : (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => startEdit(c)}><Pencil className="w-4 h-4" /></Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Supprimer cette correction ?</AlertDialogTitle>
                                  <AlertDialogDescription>« {c.source_text} » → « {c.corrected_translation} » sera supprimé définitivement.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteCorrection(c.id)}>Supprimer</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminCorrections;
