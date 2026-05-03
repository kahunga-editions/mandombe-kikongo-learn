// Leçons validées Mbuta Matondo — corpus narratif Nzo Mikanda / Ntu Kanda
import lecon00 from "./mbuta-lecon-00.json" with { type: "json" };
import lecon03 from "./mbuta-lecon-03.json" with { type: "json" };
import leconRestaurant from "./mbuta-lecon-restaurant.json" with { type: "json" };
import leconEcole from "./mbuta-lecon-ecole.json" with { type: "json" };
import leconHotel from "./mbuta-lecon-hotel.json" with { type: "json" };
import leconSePresenter from "./mbuta-lecon-se-presenter.json" with { type: "json" };
import leconKuNzariMungua from "./mbuta-lecon-ku-nzari-mungua.json" with { type: "json" };
import leconKuZandu from "./mbuta-lecon-ku-zandu.json" with { type: "json" };
import leconKuNzo from "./mbuta-lecon-ku-nzo.json" with { type: "json" };
import leconNzoEmotions from "./mbuta-lecon-nzo-emotions.json" with { type: "json" };
import leconNzoJournee from "./mbuta-lecon-nzo-journee.json" with { type: "json" };
import conjZololo from "./mbuta-conjugaisons-zololo.json" with { type: "json" };
import conjZololoManisa from "./mbuta-conjugaisons-zololo-manisa.json" with { type: "json" };

type Reponse = { mbuta: string; correct: boolean };
type Echange = {
  id: string;
  mbuta: string;
  subtitle: string;
  note?: string;
  reponses: Reponse[];
  reponse_correcte_mbuta: string;
  reponse_correcte_subtitle: string;
  reponse_incorrecte_mbuta: string;
  reponse_incorrecte_subtitle: string;
};
type Lecon = {
  lecon_id: string;
  titre_mbuta?: string;
  titre_subtitle?: string;
  sources?: string[];
  echanges: Echange[];
  ouverture?: { mbuta: string; subtitle: string };
  cloture?: { mbuta: string; subtitle: string };
};

type ConjEntry = { fr: string; kikongo: string };
type Conjugaison = {
  verbe: string;
  traduction: string;
  source?: string;
  paradigmes: Record<string, ConjEntry[]>;
};

const LECONS: Lecon[] = [
  lecon00 as unknown as Lecon,
  lecon03 as unknown as Lecon,
  leconRestaurant as unknown as Lecon,
  leconEcole as unknown as Lecon,
  leconHotel as unknown as Lecon,
  leconSePresenter as unknown as Lecon,
  leconKuNzariMungua as unknown as Lecon,
  leconKuZandu as unknown as Lecon,
  leconKuNzo as unknown as Lecon,
  leconNzoEmotions as unknown as Lecon,
  leconNzoJournee as unknown as Lecon,
];

const CONJUGAISONS: Conjugaison[] = [
  conjZololo as unknown as Conjugaison,
  conjZololoManisa as unknown as Conjugaison,
];

function fmtLecon(l: Lecon): string {
  const lines: string[] = [];
  lines.push(`### LEÇON ${l.lecon_id} — ${l.titre_subtitle ?? ""}`.trim());
  if (l.sources?.length) lines.push(`Sources : ${l.sources.join(", ")}`);
  if (l.ouverture) {
    lines.push(`Ouverture : ${l.ouverture.mbuta} = ${l.ouverture.subtitle}`);
  }
  for (const e of l.echanges) {
    lines.push(`\n[${e.id}] ${e.mbuta} = ${e.subtitle}${e.note ? ` (${e.note})` : ""}`);
    if (!e.reponses || e.reponses.length === 0) {
      lines.push(`RÉPONSE LIBRE — l'apprenant tape sa propre réponse, NE PAS proposer de QCM (pas de <choices>).`);
    } else {
      const correct = e.reponses.findIndex((r) => r.correct);
      lines.push(
        `QCM (correct=${correct}) : ${e.reponses.map((r) => r.mbuta).join(" | ")}`
      );
    }
    lines.push(`Si bonne réponse : ${e.reponse_correcte_mbuta}`);
    lines.push(`Si mauvaise réponse : ${e.reponse_incorrecte_mbuta}`);
  }
  if (l.cloture) {
    lines.push(`\nClôture : ${l.cloture.mbuta} = ${l.cloture.subtitle}`);
  }
  return lines.join("\n");
}

function fmtConjugaison(c: Conjugaison): string {
  const lines: string[] = [];
  lines.push(`### VERBE ${c.verbe} — ${c.traduction}`);
  if (c.source) lines.push(`Source : ${c.source}`);
  for (const [paradigme, entries] of Object.entries(c.paradigmes ?? {})) {
    lines.push(`\n[${paradigme}]`);
    for (const e of entries) {
      lines.push(`${e.fr} = ${e.kikongo}`);
    }
  }
  return lines.join("\n");
}

export const MBUTA_LECONS = `=== LEÇONS NARRATIVES VALIDÉES — NZO MIKANDA ===
Ces leçons sont scriptées. Tu peux les utiliser intégralement et littéralement comme support d'enseignement (ouverture, échanges, QCM, clôture). Toutes les phrases ci-dessous sont attestées et autorisées.

${LECONS.map(fmtLecon).join("\n\n")}

=== PARADIGMES VERBAUX VALIDÉS ===
Tu peux piocher littéralement dans ces conjugaisons attestées.

${CONJUGAISONS.map(fmtConjugaison).join("\n\n")}
`;
