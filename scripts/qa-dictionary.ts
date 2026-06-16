/**
 * QA automatique du dictionnaire / corpus Kikongo Lari.
 *
 * Vérifie :
 *  1. Pas de doublons (clé = lari normalisé) à l'intérieur d'une même leçon
 *     ni à travers tout le corpus (vocabulary + phrases).
 *  2. Chaque entrée a au minimum : `lari`, `french`, `english`.
 *  3. Présence d'une translittération (`mandombe`) pour les entrées de vocab.
 *  4. Pas de guillemets typographiques (’ “ ”) dans les champs texte
 *     — contrainte projet : apostrophes droites uniquement.
 *  5. Cohérence entre `src/data/lessons.ts` et
 *     `supabase/functions/_shared/mbuta-corpus-v2.json` :
 *     toute entrée présente dans les deux doit avoir la même traduction FR.
 *
 * Usage :
 *   bun run scripts/qa-dictionary.ts
 *   # exit code 1 en cas d'erreur (utilisable en CI / pre-commit)
 *
 * Les mêmes vérifications tournent aussi sous Vitest :
 *   src/test/qa-dictionary.test.ts
 */
// @ts-ignore — résolu au runtime via bun/tsx
import { lessons } from "../src/data/lessons.ts";
import { runDictionaryQA } from "./qa-dictionary-core";
import corpusV2 from "../supabase/functions/_shared/mbuta-corpus-v2.json" assert { type: "json" };

const { errors, warnings, stats } = runDictionaryQA(lessons as any, corpusV2 as any);

console.log(`\n=== QA Dictionnaire ===`);
console.log(`Leçons analysées : ${stats.lessons}`);
console.log(`Entrées vocab    : ${stats.vocab}`);
console.log(`Entrées phrases  : ${stats.phrases}`);
console.log(`Corpus v2 (kk)   : ${stats.corpusV2}`);
console.log(`Warnings         : ${warnings.length}`);
console.log(`Errors           : ${errors.length}`);

for (const w of warnings) console.warn("⚠️  " + w);
for (const e of errors) console.error("❌ " + e);

if (errors.length > 0) {
  console.error(`\n❌ QA échouée : ${errors.length} erreur(s).`);
  process.exit(1);
}
console.log("\n✅ QA OK.");
