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
 * - "tshio" s'ecrit "kio" et "tshie" s'ecrit "kie" (sinon un "e" ou une lettre
 *   latine se balade a la fin du bloc).
 * - Un « ia » final se tape tel quel (nkia, kozia, kimfinia, bimfinia). On ne
 *   passe par « iya » QUE pour JIA, WIA, PIA, RIA, HIA : ces glyphes
 *   n'existent pas dans la police (ex. tilapia -> tilapiya).
 * - Le nom propre "Paul" s'ecrit "Paulo".
 * - Apres une consonne, le "y" de la translitteration s'ecrit "i" (fyu -> fiu,
 *   kya -> kia). Le "y" initial de mot est conserve (ya, yandi) : la police
 *   le rend correctement.
 * - Jamais deux voyelles identiques a la suite (Iyaa -> Iya, Laadi -> Ladi) :
 *   la police generait une lettre latine parasite.
 * - L'apostrophe disparait (n'lemvo -> nlemvo) pour ne pas laisser le "n" seul.
 */
/**
 * Cas nommes de la suite « nje » (jamais generalises au groupe nj) :
 * - verbe etre : nje -> ngie, njena -> ngiena
 * - njeka, njevo, manjevo, njele, njelele s'ecrivent avec nz
 * La translitteration latine, elle, reste inchangee.
 */
const NJE_CASES: Record<string, string> = {
  nje: "ngie",
  njena: "ngiena",
  njeka: "nzeka",
  njevo: "nzevo",
  manjevo: "manzevo",
  njele: "nzele",
  njelele: "nzelele",
};

const applyNjeCases = (text: string): string =>
  text
    .split(" ")
    .map((w) => {
      const mapped = NJE_CASES[w.toLowerCase()];
      if (!mapped) return w;
      return w[0] === w[0].toUpperCase()
        ? mapped[0].toUpperCase() + mapped.slice(1)
        : mapped;
    })
    .join(" ");

export const cleanMandombe = (text: string): string =>
  applyNjeCases(
    STRIP_ACCENTS(text ?? "")
      .replace(/[()]/g, "")
      .replace(/[^A-Za-z ]+/g, " ")
      .replace(/([Tt])shio/g, (_m, t) => (t === "T" ? "Kio" : "kio"))
      .replace(/([Tt])shie/g, (_m, t) => (t === "T" ? "Kie" : "kie"))
      .replace(/\bPaul\b/g, "Paulo")
      .replace(/([jwprh])ia\b/gi, "$1iya")
      .replace(/([BCDFGJKLMNPQRSTVWXZbcdfgjklmnpqrstvwxz])[yY]/g, "$1i")
      .replace(/([AaEeIiOoUu])\1+/g, "$1")
      .replace(/\s+/g, " ")
      .trim(),
  );



/** Decoupe un champ Mandombe en blocs (variantes separees par | ou /). */
export const splitMandombe = (text: string): string[] =>
  (text ?? "")
    .split(/[|/]/)
    .map(cleanMandombe)
    .filter(Boolean);
