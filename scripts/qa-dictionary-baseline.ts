/**
 * Baseline des doublons préexistants dans le corpus (au moment où la QA a
 * été introduite). La QA Vitest ne bloque que les NOUVEAUX doublons :
 * tout ce qui figure ici est toléré (et listé dans les warnings).
 *
 * Pour nettoyer le baseline : corriger l'entrée dans `src/data/lessons.ts`
 * puis retirer la ligne correspondante ci-dessous.
 *
 * Format : "<lessonId>/<bucket>|<lari original>".
 */
export const KNOWN_DUPLICATES: ReadonlySet<string> = new Set([
  "bala-ba-ngulu-bia-bitatu/phrases|Dia.",
  "bala-ba-ngulu-bia-bitatu/phrases|Duka!",
  "bala-ba-ngulu-bia-bitatu/phrases|Sala.",
  "bala-ba-ngulu-bia-bitatu/phrases|Telama.",
  "bala-ba-ngulu-bia-bitatu/phrases|Zakala.",
  "dictionary-new-vocab/vocabulary|Nzalu",
  "gratitude/phrases|Hana matondo",
  "ka-roots/vocabulary|Kala",
  "ma-food-body-time/vocabulary|Malu",
  "negation-ka-ko/vocabulary|ká nkàbílì kó",
  "s-dictionary-extended-2/phrases|Baku nsonsi",
  "s-dictionary-extended-2/phrases|Fuisa nsoni",
  "s-dictionary-extended-2/phrases|Muana nsombe",
  "s-dictionary-extended-2/phrases|Nsingu a koko",
  "s-dictionary-extended-2/phrases|Seti bo",
  "sa-dictionary-extended/vocabulary|Nsamu",
  "se-dictionary/phrases|Nsende za mbiji",
  "spiritualite-cosmologie-kongo/vocabulary|Mpemba",
  "syntaxe-avancee/vocabulary|na",
  "ta-dictionary-extended/phrases|Ntambu mia nkangabumi",
  "ta-dictionary-extended/phrases|Ntangu za zonso",
  "time-expressions/vocabulary|Lumbu tshi",
  "tolo-sleep/vocabulary|Sika",
  "tolo-sleep/vocabulary|Tuka",
  "tolo-sleep/vocabulary|Tuta",
  "tons-du-laari/vocabulary|mbangala",
  "tons-du-laari/vocabulary|mbazi",
  "verb-ba-forms/vocabulary|Yala",
  "verb-ba-forms/vocabulary|Yama",
  "verb-ba-forms/vocabulary|Yela",
  "verb-ba-forms/vocabulary|Yoka",
  "verbes-actions-etendus/vocabulary|sungamana",
]);
