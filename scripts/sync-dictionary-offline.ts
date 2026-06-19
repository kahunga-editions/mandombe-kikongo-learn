// Extrait vocab + phrases de src/data/lessons.ts vers
// supabase/functions/_shared/dictionary.json pour le fallback hors-ligne du traducteur.
// Usage: deno run --allow-read --allow-write scripts/sync-dictionary-offline.ts
import { lessons } from "../src/data/lessons.ts";

const out: { lari: string; fr: string; mandombe?: string; note?: string }[] = [];
const seen = new Set<string>();
for (const lesson of lessons as any[]) {
  if (!lesson) continue;
  const add = (lari?: string, fr?: string, mandombe?: string, note?: string) => {
    if (!lari || !fr) return;
    const k = lari.toLowerCase().trim();
    if (!k || seen.has(k)) return;
    seen.add(k);
    out.push({ lari: lari.trim(), fr: fr.trim(), mandombe, note });
  };
  for (const v of lesson.vocabulary || []) add(v.lari, v.french, v.mandombe, v.note);
  for (const p of lesson.phrases || []) add(p.lari, p.french, p.mandombe, p.note);
}
await Deno.writeTextFile(
  "supabase/functions/_shared/dictionary.json",
  JSON.stringify(out),
);
console.log(`Synced ${out.length} dictionary entries.`);
