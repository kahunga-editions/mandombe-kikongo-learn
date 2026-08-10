// Exporte le corpus complet du livre : entrées (vocabulaire + phrases des leçons
// + dictionnaire hors-ligne) et annexe des conjugaisons rencontrées.
// Usage: bun run scripts/export-book-data.ts /tmp/dico.json /tmp/conjugaisons.json
import { lessons } from "../src/data/lessons";
import offline from "../supabase/functions/_shared/dictionary.json";

const OUT_ENTRIES = process.argv[2] ?? "/tmp/dico.json";
const OUT_CONJ = process.argv[3] ?? "/tmp/conjugaisons.json";

type Entry = {
  lari: string;
  mandombe?: string;
  french: string;
  english?: string;
  note?: string;
  category?: string;
  kind: "vocabulary" | "phrase" | "dictionary";
};

const entries: Entry[] = [];
const seen = new Set<string>();

const key = (lari: string, fr: string) =>
  `${lari.toLowerCase().trim()}|${fr.toLowerCase().trim()}`;

function push(e: Entry) {
  if (!e.lari?.trim() || !e.french?.trim()) return;
  const k = key(e.lari, e.french);
  if (seen.has(k)) return;
  seen.add(k);
  entries.push(e);
}

type Conj = {
  verb: string;
  verbMandombe?: string;
  meaning: string;
  meaningFr?: string;
  meaningEn?: string;
  tense: string;
  rows: { person: string; lari: string; mandombe: string }[];
  lesson: string;
};
const conjugations: Conj[] = [];
const seenConj = new Set<string>();

for (const lesson of lessons as any[]) {
  const cat = lesson.titleFr || lesson.title || "";
  for (const v of lesson.vocabulary ?? []) {
    push({
      lari: v.lari,
      mandombe: v.mandombe,
      french: v.french,
      english: v.english,
      note: v.note,
      category: cat,
      kind: "vocabulary",
    });
  }
  for (const p of lesson.phrases ?? []) {
    push({
      lari: p.lari,
      mandombe: p.mandombe,
      french: p.french,
      english: p.english,
      note: p.note,
      category: cat,
      kind: "phrase",
    });
  }
  for (const c of lesson.conjugations ?? []) {
    const k = `${c.verb}|${c.tense}`.toLowerCase();
    if (seenConj.has(k)) continue;
    seenConj.add(k);
    conjugations.push({
      verb: c.verb,
      verbMandombe: c.verbMandombe,
      meaning: c.meaning?.fr || c.meaning?.en || "",
      meaningFr: c.meaning?.fr || "",
      meaningEn: c.meaning?.en || "",
      tense: c.tenseFr || c.tense,
      rows: (c.rows ?? []).map((r: any) => ({
        person: r.person,
        lari: r.lari,
        mandombe: r.mandombe,
      })),
      lesson: cat,
    });
  }
}

for (const d of offline as any[]) {
  push({
    lari: d.lari,
    mandombe: d.mandombe,
    french: d.fr ?? d.french,
    english: d.en ?? d.english,
    note: d.note,
    category: d.category,
    kind: "dictionary",
  });
}

// Corrections validées du traducteur (table translation_corrections)
const SB_URL = "https://zckjqudeoodfxikhdfvh.supabase.co";
const SB_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpja2pxdWRlb29kZnhpa2hkZnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MDY0MjAsImV4cCI6MjA4NzM4MjQyMH0.TOLUKkoTIaxcUD2-Yp-nNkl0w2RReTrmpFfs1mGX8pk";

const isShortLemma = (s: string) => {
  const t = (s ?? "").trim();
  if (!t || t.length > 60) return false;
  if (t.split(/\s+/).length > 8) return false;
  return true;
};

try {
  const res = await fetch(`${SB_URL}/functions/v1/export-corrections`, {
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "x-service-token": process.env.TTS_SERVICE_TOKEN ?? "",
    },
  });
  const json: any = res.ok ? await res.json() : {};
  const rows: any[] = json.corrections ?? [];

  let added = 0;
  for (const c of rows) {
    let lari = "";
    let french = "";
    let english = "";
    if (c.target_lang === "lari") {
      lari = c.corrected_translation;
      if (c.source_lang === "en") english = c.source_text;
      else french = c.source_text;
    } else if (c.source_lang === "lari") {
      lari = c.source_text;
      if (c.target_lang === "en") english = c.corrected_translation;
      else french = c.corrected_translation;
    } else continue;
    if (!isShortLemma(lari) || !isShortLemma(french || english)) continue;
    const before = entries.length;
    push({
      lari,
      mandombe: c.corrected_mandombe || undefined,
      french: french || english,
      english: english || undefined,
      category: "Traducteur",
      kind: "dictionary",
    });
    if (entries.length > before) added++;
  }
  console.log(`Corrections traducteur ajoutées: ${added}/${rows.length}`);
} catch (e) {
  console.warn("Corrections traducteur non récupérées:", e);
}



conjugations.sort((a, b) =>
  a.verb.localeCompare(b.verb, "fr") || a.tense.localeCompare(b.tense, "fr")
);

await Bun.write(OUT_ENTRIES, JSON.stringify(entries));
await Bun.write(OUT_CONJ, JSON.stringify(conjugations));
console.log(
  `Entrées: ${entries.length} (vocab ${entries.filter((e) => e.kind === "vocabulary").length}, ` +
    `phrases ${entries.filter((e) => e.kind === "phrase").length}, ` +
    `dico ${entries.filter((e) => e.kind === "dictionary").length}) · ` +
    `Conjugaisons: ${conjugations.length} tableaux`
);
