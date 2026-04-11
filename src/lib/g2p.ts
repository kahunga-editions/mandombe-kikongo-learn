/**
 * G2P (Grapheme-to-Phoneme) engine for Kikongo / Lari
 * Based on André Jacquot's "Études linguistiques laadi" phonological rules
 * and the lari_g2p.py reference implementation.
 */

// Prenasalized consonants — greedy match (longest first)
const MULTI_GRAPHS: string[] = [
  "mbv", "mpf",
  "mb", "mp", "nd", "nt", "ng", "nk", "nz", "ns",
  "ts", "dz", "pf", "bv",
  "sh", "ch",
  "aa", "ee", "ii", "oo", "uu",
];

// Phoneme → IPA mapping
const IPA_MAP: Record<string, string> = {
  // Prenasalized
  mb: "ᵐb", mp: "ᵐp", nd: "ⁿd", nt: "ⁿt",
  ng: "ᵑg", nk: "ᵑk", nz: "ⁿz", ns: "ⁿs",
  mbv: "ᵐbv", mpf: "ᵐpf",
  // Affricates
  ts: "t͡s", dz: "d͡z", pf: "p͡f", bv: "b͡v",
  // Fricatives & others
  sh: "ʃ", ch: "t͡ʃ",
  // Simple consonants
  b: "b", d: "d", f: "f", g: "g",
  k: "k", l: "l", m: "m", n: "n",
  p: "p", r: "r", s: "s", t: "t",
  v: "v", w: "w", y: "j", z: "z",
  h: "h",
  // Vowels
  a: "a", e: "e", i: "i", o: "o", u: "u",
  // Long vowels
  aa: "aː", ee: "eː", ii: "iː", oo: "oː", uu: "uː",
};

// Phoneme → Bantu-friendly spelling for TTS (Lingala/Zulu compatible)
// These are kept as-is since Bantu languages share these clusters
// Phoneme → Zulu-compatible spelling for TTS (eleven_v3 with language_code: "zu")
// Zulu shares Bantu prenasals and CV structure with Lari.
// Key adaptations based on Jacquot's phonological rules:
// - 'ns' → 'nts' (Jacquot: initial ns = /nts/)
// - 'u' stays 'u' (Zulu /u/ = correct, not French /y/)
// - 'e' stays 'e' (Zulu open vowels match Lari)
const BANTU_MAP: Record<string, string> = {
  mb: "mb", mp: "mp", nd: "nd", nt: "nt",
  ng: "ng", nk: "nk", nz: "nz", ns: "nts",
  mbv: "mbv", mpf: "mpf",
  ts: "ts", dz: "dz", pf: "pf", bv: "bv",
  sh: "sh", ch: "ch",
  b: "b", d: "d", f: "f", g: "g",
  k: "k", l: "l", m: "m", n: "n",
  p: "p", r: "r", s: "s", t: "t",
  v: "v", w: "w", y: "y", z: "z",
  h: "h",
  a: "a", e: "e", i: "i", o: "o", u: "u",
  aa: "aa", ee: "ee", ii: "ii", oo: "oo", uu: "uu",
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

    // Try longest multigraph first
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
      // Skip non-letter characters (hyphens, apostrophes, spaces)
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
 * Convert phoneme tokens to Bantu-friendly spelling for TTS.
 * Since Lingala/Zulu share most Lari phonemes natively,
 * this is mostly identity with minor adjustments.
 */
export function phonemesToBantu(phonemes: string[]): string {
  return phonemes.map((p) => BANTU_MAP[p] || p).join("");
}

/**
 * Full pipeline: Lari text → IPA transcription
 */
export function lariToIpa(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((w) => phonemesToIpa(g2pWord(w))).join(" ");
}

/**
 * Full pipeline: Lari text → Bantu-friendly TTS text
 */
export function lariToBantu(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((w) => phonemesToBantu(g2pWord(w))).join(" ");
}
