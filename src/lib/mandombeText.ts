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

/**
 * Nettoie un bloc Mandombe : lettres et espaces uniquement.
 * - Apres une consonne, le "y" de la translitteration s'ecrit "i" (fyu -> fiu,
 *   kya -> kia). Le "y" initial de mot est conserve (ya, yandi) : la police
 *   le rend correctement.
 * - Jamais deux voyelles identiques a la suite (Iyaa -> Iya) : la police
 *   generait une lettre latine parasite.
 */
export const cleanMandombe = (text: string): string =>
  STRIP_ACCENTS(text ?? "")
    .replace(/[()]/g, "")
    .replace(/[^A-Za-z ]+/g, " ")
    .replace(/([BCDFGJKLMNPQRSTVWXZbcdfgjklmnpqrstvwxz])[yY]/g, "$1i")
    .replace(/([AaEeIiOoUu])\1+/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

/** Decoupe un champ Mandombe en blocs (variantes separees par | ou /). */
export const splitMandombe = (text: string): string[] =>
  (text ?? "")
    .split(/[|/]/)
    .map(cleanMandombe)
    .filter(Boolean);
