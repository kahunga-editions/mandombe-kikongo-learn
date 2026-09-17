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
  mandombe?: string;
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
    mandombe: f.mandombe?.trim() || undefined,
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
        mandombe: r.mandombe,
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
        mandombe: r.mandombe,
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

const out = `// Généré par scripts/build_translator_conjugations.ts — ne pas éditer à la main.
export interface ConjugationForm {
  lari: string;
  mandombe?: string;
  fr: string;
  en?: string;
  verb?: string;
  tense?: string;
  person?: string;
  note?: string;
}

export const CONJUGATION_FORMS: ConjugationForm[] = ${JSON.stringify(forms, null, 2)};

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

function formatForm(f: ConjugationForm): string {
  const meta = [f.verb, f.tense, f.person].filter(Boolean).join(" · ");
  const note = f.note ? " [note : " + f.note + "]" : "";
  const en = f.en ? ' / EN: "' + f.en + '"' : "";
  return '- "' + f.lari + '" = "' + f.fr + '"' + en + (meta ? " (" + meta + ")" : "") + note;
}

/**
 * Bloc de prompt listant les conjugaisons validées pertinentes pour le texte
 * donné (recouvrement lexical), limité pour rester raisonnable en taille.
 */
export function buildConjugationsBlock(text: string, limit = 60): string {
  const key = normalizeKey(text);
  const tokens = key.split(" ").filter((t) => t.length >= 3);
  if (tokens.length === 0) return "";
  const scored: Array<{ f: ConjugationForm; score: number }> = [];
  for (const f of CONJUGATION_FORMS) {
    const hay = normalizeKey([f.lari, f.fr, f.en || "", f.verb || ""].join(" "));
    let score = 0;
    for (const t of tokens) if (hay.includes(t)) score += t.length;
    if (score > 0) scored.push({ f, score });
  }
  if (scored.length === 0) return "";
  scored.sort((a, b) => b.score - a.score);
  const lines = scored.slice(0, limit).map((s) => formatForm(s.f));
  return [
    "",
    "## Conjugaisons validées (AUTORITÉ MAXIMALE — même statut que les corrections expert)",
    "Ces formes proviennent des tableaux de conjugaison validés de l'application.",
    "Si la phrase à traduire correspond à l'une d'elles (ou en contient une), tu DOIS reprendre la forme lari VERBATIM.",
    "N'invente jamais une autre forme conjuguée que celles listées ici ou attestées dans le corpus.",
    ...lines,
    "",
  ].join("\\n");
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

/** Recherche structurée réservée aux conjugaisons attestées. */
export function findConjugations(filters: {
  query?: string;
  verb?: string;
  tense?: string;
  person?: string;
}, limit = 60): ConjugationForm[] {
  const query = normalizeKey(filters.query || "");
  const verb = normalizeKey(filters.verb || "");
  const tense = normalizeKey(filters.tense || "");
  const person = normalizeKey(filters.person || "");

  return CONJUGATION_FORMS.filter((f) => {
    if (verb && !normalizeKey(f.verb || "").includes(verb)) return false;
    if (tense && !normalizeKey(f.tense || "").includes(tense)) return false;
    if (person && !normalizeKey(f.person || "").includes(person)) return false;
    if (!query) return true;
    return normalizeKey([f.lari, f.fr, f.en || "", f.verb || "", f.tense || "", f.person || ""].join(" ")).includes(query);
  }).slice(0, limit);
}
`;

writeFileSync("supabase/functions/_shared/conjugations-corpus.ts", out, "utf8");
console.log(`OK — ${forms.length} formes écrites.`);
