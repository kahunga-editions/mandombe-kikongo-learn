/**
 * Cœur de la QA dictionnaire — sans I/O, partagé entre le script CLI
 * (scripts/qa-dictionary.ts) et les tests Vitest (src/test/qa-dictionary.test.ts).
 */

export interface VocabEntry {
  lari: string;
  mandombe?: string;
  french?: string;
  english?: string;
  portuguese?: string;
  note?: string;
}

export interface LessonLike {
  id: string;
  vocabulary?: VocabEntry[];
  phrases?: VocabEntry[];
}

export interface CorpusV2Like {
  vocabulary?: { kikongo?: { lari?: string; french?: string }[] };
}

export interface QAReport {
  errors: string[];
  warnings: string[];
  stats: { lessons: number; vocab: number; phrases: number; corpusV2: number };
}

/** Normalise une clé Lari pour la déduplication : lower, NFD, sans diacritiques,
 *  apostrophes/espaces multiples écrasés. */
export function normalizeLari(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/[?!.,;:]+$/g, "")
    .trim();
}

const SMART_QUOTES = /[’‘“”]/;

export function runDictionaryQA(
  lessons: LessonLike[],
  corpusV2?: CorpusV2Like,
  knownDuplicates?: ReadonlySet<string>,
): QAReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  let vocabCount = 0;
  let phraseCount = 0;

  // Map: clé normalisée -> première occurrence (lessonId, lari, french)
  const globalSeen = new Map<string, { lessonId: string; lari: string; french: string }>();

  for (const lesson of lessons) {
    const localSeen = new Set<string>();
    const buckets: { name: "vocabulary" | "phrases"; entries: VocabEntry[] }[] = [
      { name: "vocabulary", entries: lesson.vocabulary ?? [] },
      { name: "phrases", entries: lesson.phrases ?? [] },
    ];

    for (const { name, entries } of buckets) {
      for (const entry of entries) {
        if (name === "vocabulary") vocabCount++;
        else phraseCount++;

        if (!entry?.lari || !entry.lari.trim()) {
          errors.push(`[${lesson.id}/${name}] entrée sans \`lari\`.`);
          continue;
        }

        const fr = (entry.french ?? "").trim();
        const en = (entry.english ?? "").trim();
        if (!fr) errors.push(`[${lesson.id}/${name}] "${entry.lari}" : champ \`french\` manquant.`);
        if (!en) errors.push(`[${lesson.id}/${name}] "${entry.lari}" : champ \`english\` manquant.`);

        if (name === "vocabulary" && !entry.mandombe) {
          warnings.push(`[${lesson.id}] "${entry.lari}" : translittération \`mandombe\` manquante.`);
        }

        for (const [field, val] of Object.entries({
          lari: entry.lari, mandombe: entry.mandombe, french: entry.french,
          english: entry.english, portuguese: entry.portuguese,
        })) {
          if (typeof val === "string" && SMART_QUOTES.test(val)) {
            errors.push(`[${lesson.id}/${name}] "${entry.lari}" : guillemet typographique interdit dans \`${field}\`.`);
          }
        }

        const key = normalizeLari(entry.lari);
        if (!key) continue;

        if (localSeen.has(key)) {
          const tag = `${lesson.id}/${name}|${entry.lari}`;
          const msg = `[${lesson.id}/${name}] doublon local : "${entry.lari}".`;
          if (knownDuplicates?.has(tag)) warnings.push("(baseline) " + msg);
          else errors.push(msg);
        }
        localSeen.add(key);

        const prev = globalSeen.get(key);
        if (prev) {
          if (prev.french && fr && prev.french.trim().toLowerCase() !== fr.toLowerCase()) {
            errors.push(
              `Doublon cross-leçon avec FR divergent : "${entry.lari}" → ` +
              `[${prev.lessonId}] "${prev.french}" vs [${lesson.id}] "${fr}".`
            );
          } else {
            warnings.push(`Doublon cross-leçon : "${entry.lari}" déjà dans ${prev.lessonId}.`);
          }
        } else {
          globalSeen.set(key, { lessonId: lesson.id, lari: entry.lari, french: fr });
        }
      }
    }
  }

  // Cohérence avec corpus v2
  let corpusCount = 0;
  if (corpusV2?.vocabulary?.kikongo) {
    const corpusSeen = new Map<string, string>();
    for (const m of corpusV2.vocabulary.kikongo) {
      if (!m?.lari) continue;
      corpusCount++;
      const key = normalizeLari(m.lari);
      if (!key) continue;

      if (corpusSeen.has(key)) {
        errors.push(`[corpus-v2] doublon : "${m.lari}".`);
      } else {
        corpusSeen.set(key, m.french ?? "");
      }

      const main = globalSeen.get(key);
      if (main && m.french && main.french &&
          main.french.trim().toLowerCase() !== m.french.trim().toLowerCase()) {
        warnings.push(
          `[cohérence] "${m.lari}" diverge : lessons="${main.french}" vs corpus-v2="${m.french}".`
        );
      }
    }
  }

  return {
    errors, warnings,
    stats: { lessons: lessons.length, vocab: vocabCount, phrases: phraseCount, corpusV2: corpusCount },
  };
}
