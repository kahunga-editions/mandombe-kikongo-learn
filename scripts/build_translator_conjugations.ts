/**
 * Génère supabase/functions/_shared/conjugations-corpus.ts depuis les données
 * de conjugaison de l'app (verbes de survie, séries, verbe « ba », leçons).
 * Lancer : bun scripts/build_translator_conjugations.ts
 */
import { writeFileSync } from "node:fs";
import { survivalVerbs } from "../src/data/survivalVerbs";
import { conjugationSeries } from "../src/data/conjugationSeries";
import { verbeBaData } from "../src/data/verbeBa";
import { lessons } from "../src/data/lessons";

interface Form {
  lari: string;
  fr: string;
  en?: string;
  verb?: string;
  tense?: string;
  person?: string;
  note?: string;
}

const forms: Form[] = [];
const seen = new Set<string>();

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_'’.,;:!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const push = (f: Form) => {
  if (!f.lari?.trim() || !f.fr?.trim()) return;
  const key = norm(f.lari) + "|" + norm(f.fr);
  if (seen.has(key)) return;
  seen.add(key);
  forms.push({
    lari: f.lari.trim(),
    fr: f.fr.trim(),
    en: f.en?.trim() || undefined,
    verb: f.verb?.trim() || undefined,
    tense: f.tense?.trim() || undefined,
    person: f.person?.trim() || undefined,
    note: f.note?.trim() || undefined,
  });
};

// 1. Leçons
for (const lesson of lessons as any[]) {
  for (const table of lesson?.conjugations || []) {
    for (const r of table.rows || []) {
      push({
        lari: r.lari,
        fr: r.fr,
        en: r.en,
        verb: table.verb,
        tense: table.tenseFr || table.tense,
        person: r.person,
        note: r.note,
      });
    }
  }
}

// 2. Verbes de survie
for (const v of survivalVerbs) {
  for (const t of v.tenses) {
    for (const r of t.rows) {
      push({
        lari: r.lari,
        fr: r.fr,
        en: r.en,
        verb: `${v.verb} (${v.meaning})`,
        tense: t.rule ? `${t.tense} · ${t.rule}` : t.tense,
        person: r.person,
        note: r.note,
      });
    }
  }
}

// 3. Séries conjuguées
for (const s of conjugationSeries) {
  for (const r of s.rows) {
    push({
      lari: r.lari,
      fr: r.fr,
      en: r.en,
      verb: s.verb || s.pattern,
      tense: s.pattern,
      person: r.person,
    });
  }
}

// 4. Verbe « ba » par classe nominale
for (const e of verbeBaData as any[]) {
  const triples: Array<[string, string, string]> = [
    [e.c_lat ?? e.c, e.c_fr, "Présent (forme courte)"],
    [e.f_lat ?? e.f, e.f_fr, "Présent"],
    [e.p_lat ?? e.p, e.p_fr, "Passé"],
  ];
  for (const [lari, fr, tense] of triples) {
    push({ lari, fr, verb: "Ba (être)", tense, person: e.classe_fr || e.classe });
  }
}

const lines = forms.map((f) => {
  const meta = [f.verb, f.tense, f.person].filter(Boolean).join(" · ");
  const note = f.note ? ` [note : ${f.note}]` : "";
  return `- "${f.lari}" = "${f.fr}"${f.en ? ` / EN: "${f.en}"` : ""}${meta ? ` (${meta})` : ""}${note}`;
});

const out = `// Généré par scripts/build_translator_conjugations.ts — ne pas éditer à la main.
export interface ConjugationForm {
  lari: string;
  fr: string;
  en?: string;
  verb?: string;
  tense?: string;
  person?: string;
  note?: string;
}

export const CONJUGATION_FORMS: ConjugationForm[] = ${JSON.stringify(forms, null, 2)};

export const CONJUGATION_CORPUS_BLOCK = [
  "",
  "## Conjugaisons validées (AUTORITÉ MAXIMALE — même statut que les corrections expert)",
  "Ces formes proviennent des tableaux de conjugaison validés de l'application.",
  "Si la phrase à traduire correspond à l'une d'elles (ou en contient une), tu DOIS reprendre la forme lari VERBATIM.",
  "N'invente jamais une autre forme conjuguée que celles listées ici ou attestées dans le corpus.",
  ${JSON.stringify(lines).slice(1, -1) ? "..." + JSON.stringify(lines) : "[]"},
].flat().join("\\n");

const normalizeKey = (s: string): string =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[-_'’.,;:!?]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();

const byLari = new Map<string, ConjugationForm>();
const byFr = new Map<string, ConjugationForm>();
for (const f of CONJUGATION_FORMS) {
  const kl = normalizeKey(f.lari);
  const kf = normalizeKey(f.fr);
  if (kl && !byLari.has(kl)) byLari.set(kl, f);
  if (kf && !byFr.has(kf)) byFr.set(kf, f);
}

/** Correspondance exacte avec une forme conjuguée validée, dans les deux sens. */
export function findConjugationMatch(
  text: string,
  direction: "to-lari" | "from-lari",
): ConjugationForm | null {
  const key = normalizeKey(text);
  if (!key) return null;
  return (direction === "to-lari" ? byFr.get(key) : byLari.get(key)) || null;
}
`;

writeFileSync("supabase/functions/_shared/conjugations-corpus.ts", out, "utf8");
console.log(`OK — ${forms.length} formes écrites.`);
