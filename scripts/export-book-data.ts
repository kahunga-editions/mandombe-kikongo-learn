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
