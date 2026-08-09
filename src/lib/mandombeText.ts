/**
 * REGLE ABSOLUE : aucune lettre latine, aucun chiffre et aucune ponctuation latine
 * ne doit se promener a l'interieur ou a cote immediat d'un bloc Mandombe.
 *
 * Les champs `mandombe` du corpus contiennent la translitteration qui est rendue
 * avec la police Mandombe. Toute ponctuation latine (| / , . ? ! : - ' ( ))
 * s'affiche donc comme un caractere latin au milieu des glyphes : on la retire.
 *
 * Les variantes separees par | ou / deviennent des blocs Mandombe distincts.
 */

const STRIP_ACCENTS = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Nettoie un bloc Mandombe : lettres et espaces uniquement. */
export const cleanMandombe = (text: string): string =>
  STRIP_ACCENTS(text ?? "")
    .replace(/[()]/g, "")
    .replace(/[^A-Za-z ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Decoupe un champ Mandombe en blocs (variantes separees par | ou /). */
export const splitMandombe = (text: string): string[] =>
  (text ?? "")
    .split(/[|/]/)
    .map(cleanMandombe)
    .filter(Boolean);
