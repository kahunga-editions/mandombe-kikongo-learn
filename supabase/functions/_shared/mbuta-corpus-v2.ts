// Corpus validé Mbuta Matondo v2 — Nzo Mikanda
// Importé depuis mbuta-corpus-v2.json
import corpus from "./mbuta-corpus-v2.json" with { type: "json" };

type Phrase = { kikongo: string; fr: string; note?: string; exemple?: string };
type Mot = { kikongo: string; fr: string; note?: string };

interface CorpusV2 {
  meta: Record<string, string>;
  presentation: { description: string; phrases: Phrase[] };
  salutations: { description: string; phrases: Phrase[] };
  gestion_lecon: { description: string; phrases: Phrase[] };
  corrections_encouragements: { description: string; regle?: string; phrases: Phrase[] };
  questions_sur_leleve: { description: string; phrases: Phrase[] };
  vocabulaire_de_base: { description: string; mots: Mot[] };
  phrases_identite: { description: string; phrases: Phrase[] };
  phonologie: { description: string; regles: { grapheme: string; ipa: string; explication: string }[] };
  grammaire_notes: { description: string; notes: string[] };
}

const C = corpus as unknown as CorpusV2;

function fmtPhrases(phrases: Phrase[]): string {
  return phrases.map((p) => `${p.kikongo} = ${p.fr}${p.note ? ` (${p.note})` : ""}`).join("\n");
}

function fmtMots(mots: Mot[]): string {
  return mots.map((m) => `${m.kikongo} = ${m.fr}${m.note ? ` (${m.note})` : ""}`).join("\n");
}

export const MBUTA_CORPUS_V2 = `=== CORPUS VALIDÉ NZO MIKANDA — KIKONGO LARI ===
Source UNIQUE de production. Mbuta Matondo n'écrit JAMAIS un mot, une phrase ou une forme qui ne soit pas littéralement présente ci-dessous ou dans le corpus dynamique du traducteur.

[PRÉSENTATION]
${fmtPhrases(C.presentation.phrases)}

[SALUTATIONS]
${fmtPhrases(C.salutations.phrases)}

[GESTION DE LEÇON]
${fmtPhrases(C.gestion_lecon.phrases)}

[CORRECTIONS & ENCOURAGEMENTS]
Règle : ${C.corrections_encouragements.regle ?? ""}
${fmtPhrases(C.corrections_encouragements.phrases)}

[QUESTIONS SUR L'ÉLÈVE]
${fmtPhrases(C.questions_sur_leleve.phrases)}

[VOCABULAIRE DE BASE]
${fmtMots(C.vocabulaire_de_base.mots)}

[PHRASES D'IDENTITÉ]
${fmtPhrases(C.phrases_identite.phrases)}

[PHONOLOGIE — pour ta connaissance, jamais à écrire en français à l'élève]
${C.phonologie.regles.map((r) => `${r.grapheme} → /${r.ipa}/ (${r.explication})`).join("\n")}

[NOTES GRAMMATICALES — pour ta connaissance interne]
${C.grammaire_notes.notes.map((n) => `- ${n}`).join("\n")}
`;
