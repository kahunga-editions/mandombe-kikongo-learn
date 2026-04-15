/**
 * G2P (Grapheme-to-Phoneme) engine for Kikongo / Lari
 * Based on the Nzo Mikanda corpus phonological rules
 */

// Prenasalized consonants — greedy match (longest first)
const MULTI_GRAPHS: string[] = [
  "nkia", "nki",
  "mbv", "mpf",
  "ndj", "tch",
  "mb", "mp", "mf", "mv", "mw",
  "nd", "nt", "ng", "nk", "nz", "ns",
  "ny", "nl", "nj",
  "ts", "dz", "pf", "bv", "bf",
  "dj", "sh", "ch", "gn",
  "aa", "ee", "ii", "oo", "uu",
];

// Phoneme → IPA mapping
const IPA_MAP: Record<string, string> = {
  // Special clusters (must be before nk/ng)
  nkia: "ntʃa", nki: "ntʃi",
  // Prenasalized
  mb: "ᵐb", mp: "ᵐp", mf: "ɱf", mv: "ɱv", mw: "ᵐw",
  nd: "ⁿd", nt: "ⁿt",
  ng: "ᵑɡ", nk: "ᵑk", nz: "ⁿz", ns: "ⁿs",
  ny: "ɲ", nl: "ⁿl", nj: "ⁿdʒ",
  ndj: "ⁿdʒ", tch: "tʃ",
  mbv: "ᵐbv", mpf: "ᵐpf",
  // Affricates
  ts: "t͡s", dz: "d͡z", pf: "p͡f", bv: "b͡v", bf: "b͡f",
  dj: "dʒ", gn: "ɲ",
  // Fricatives & others
  sh: "ʃ", ch: "t͡ʃ",
  // Simple consonants
  b: "b", d: "d", f: "f", g: "g",
  j: "ʒ", k: "k", l: "l", m: "m", n: "n",
  p: "p", r: "r", s: "s", t: "t",
  v: "v", w: "w", y: "j", z: "z",
  h: "h",
  // Vowels
  a: "a", e: "e", i: "i", o: "o", u: "u",
  // Long vowels
  aa: "aː", ee: "eː", ii: "iː", oo: "oː", uu: "uː",
};

/**
 * Tokenise a word into phoneme tokens using greedy longest-match.
 */
export function tokenise(word: string): string[] {
  const tokens: string[] = [];
  const lower = word.toLowerCase().trim();
  let i = 0;

  while (i < lower.length) {
    let matched = false;

    for (const mg of MULTI_GRAPHS) {
      if (lower.startsWith(mg, i)) {
        tokens.push(mg);
        i += mg.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      const ch = lower[i];
      if (/[a-z]/.test(ch)) {
        tokens.push(ch);
      }
      i++;
    }
  }

  return tokens;
}

/**
 * Convert a Lari word to its phoneme tokens.
 */
export function g2pWord(word: string): string[] {
  return tokenise(word);
}

/**
 * Convert phoneme tokens to IPA transcription string.
 */
export function phonemesToIpa(phonemes: string[]): string {
  return phonemes.map((p) => IPA_MAP[p] || p).join("");
}

/**
 * Full pipeline: Lari text → IPA transcription
 */
export function lariToIpa(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((w) => phonemesToIpa(g2pWord(w))).join(" ");
}
