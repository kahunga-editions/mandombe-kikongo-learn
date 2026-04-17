/**
 * ============================================================
 * MOTEUR PHONÉTIQUE LARI (LAADI) — v2
 * Basé sur : Jacquot (1971/1982) + analyse acoustique
 *            Émission "Yiza ta moka" — Denis Malanda
 * ============================================================
 */

const PRENASALIZED: string[] = [
  'ndj', 'tch',
  'mb', 'mp', 'mf', 'mv', 'mw',
  'nd', 'nt', 'ns', 'nz', 'nk',
  'ng', 'ny', 'nl', 'nj',
  'bv', 'pf', 'bf',
  'dj', 'ch', 'sh', 'gn',
];

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);
const DIPHTONGS = new Set(['ia', 'ie', 'io', 'iu', 'ua', 'ue', 'ui', 'ai', 'au']);

/**
 * Découpe un mot lari en syllabes phonologiques.
 * Structure canonique (Jacquot §2.2) : (C)V ou (CC)V
 */
export function syllabify(word: string): string[] {
  const w = word.toLowerCase().trim();
  const syllables: string[] = [];
  let i = 0;

  const clusters = [...PRENASALIZED].sort((a, b) => b.length - a.length);

  while (i < w.length) {
    let onset = '';
    let nucleus = '';

    // Onset: longest cluster first
    let found = false;
    for (const cluster of clusters) {
      if (w.substring(i).startsWith(cluster)) {
        onset = cluster;
        i += cluster.length;
        found = true;
        break;
      }
    }
    if (!found && i < w.length && !VOWELS.has(w[i])) {
      onset = w[i];
      i++;
    }

    // Nucleus: vowel(s)
    if (i < w.length && VOWELS.has(w[i])) {
      nucleus = w[i];
      i++;
      // Long vowel
      if (i < w.length && w[i] === nucleus) {
        nucleus += w[i];
        i++;
      }
      // Diphthong
      else if (
        i < w.length &&
        VOWELS.has(w[i]) &&
        nucleus.length === 1 &&
        DIPHTONGS.has(nucleus + w[i])
      ) {
        nucleus += w[i];
        i++;
      }
    }

    if (onset || nucleus) {
      syllables.push(onset + nucleus);
    } else {
      i++; // safety
    }
  }

  return syllables.filter(s => s.length > 0);
}

// ============================================================
// RÈGLES TTS POUR ELEVEN LABS
// ============================================================

interface PhoneticRule {
  from: RegExp;
  to: string;
  note: string;
}

const ELEVENLABS_RULES: PhoneticRule[] = [
  // ŋ vélaire (n') + k
  { from: /n'ki/g, to: 'nkhi', note: 'ŋki → nkhi' },
  { from: /n'ke/g, to: 'nkhe', note: 'ŋke → nkhe' },
  { from: /n'k([aouAOU])/g, to: 'nk$1', note: 'ŋk + post → nk' },

  // ŋ vélaire (n') + g
  { from: /n'g([iIeE])/g, to: 'ngh$1', note: 'ŋg + ant → ngh' },
  { from: /n'g([aouAOU])/g, to: 'ng$1', note: 'ŋg + post → ng' },

  // ŋ + other consonants
  { from: /n's([aeiouAEIOU])/g, to: 'nhs$1', note: 'ŋs → nhs' },
  { from: /n'z([aeiouAEIOU])/g, to: 'nhz$1', note: 'ŋz → nhz' },
  { from: /n't([iI])/g, to: 'nhti', note: 'ŋti → nhti' },
  { from: /n'v([aeiouAEIOU])/g, to: 'nhv$1', note: 'ŋv → nhv' },
  { from: /n'd([iI])/g, to: 'nhdi', note: 'ŋdi → nhdi' },

  // nj → ndj (affriquée prénasalisée)
  { from: /mpangi/g, to: 'mpan-ghi', note: 'mpangi : g dur' },
  { from: /nj([aeiouAEIOU])/g, to: 'ndj$1', note: 'nj → ndj' },

  // G dur devant i/e
  { from: /ngi/g, to: 'nghi', note: 'ngi → nghi' },
  { from: /nge/g, to: 'nghe', note: 'nge → nghe' },
  { from: /\bgi/g, to: 'guî', note: 'gi initial → guî' },
  { from: /\bge/g, to: 'guê', note: 'ge initial → guê' },

  // H aspiré (comme "hâche" en français)
  { from: /\bh([aeiouAEIOU])/g, to: "h'$1", note: 'h aspiré' },
];

// ============================================================
// OVERRIDES PHONÉTIQUES MOT PAR MOT (côté client)
// ============================================================
const PHONETIC_OVERRIDES: Record<string, string> = {
  "mosi": "moshi",
  "nkenke": "ntshntshe",
  "ngiena": "ndjena",
  "ngiele": "ndjele",
  "nkila": "ntshila",
  "tola": "tôla",
  "mama": "mâma",
  "sala": "sâla",
  "njijiri": "ndjîdjiri",
  "nzijiri": "ndjîdjiri",
  "nkumbu": "nkoumbou",
  "tshibuka": "tshibouka",
  "bilongo": "bilôngo",
  "mululu": "moulooulou",
  "mupepe": "moupépé",
  "nanguka": "nangouka",
  "ndendi": "ndéndi",
  "buzitu": "bouzitou",
  "tshivumu": "tshivoumou",
  "tshibuki": "tshibouki",
  "kinsangu": "kinsangou",
  "tshinkoso": "tshinkôsso",
  "saleno": "saléno",
  
  "tatika": "tatika",
  "yarika": "yarika",
  "lumfikini": "loumfikini",
  "mazono": "mazôno",
  "pi": "pii",
  "fyu": "fyuu",
  "nye": "nyee",
  "ti": "tii",
  "wa": "waa",
  "nsi": "tsii",
  
};

/**
 * Applique les règles de prononciation pour ElevenLabs.
 */
export function preprocessForElevenLabs(text: string): string {
  // Step 1: word-level overrides
  let result = text.replace(/\b[\w']+\b/g, (word) => {
    const lower = word.toLowerCase();
    return PHONETIC_OVERRIDES[lower] || word;
  });
  // Step 2: regex rules
  for (const rule of ELEVENLABS_RULES) {
    result = result.replace(rule.from, rule.to);
  }
  return result;
}

// ============================================================
// PRÉTRAITEMENT POUR LA POLICE MANDOMBE
// ============================================================

/**
 * Prépare le texte pour l'affichage avec la police Mandombe.
 * nj → n + ZWJ + dj (sépare le nasal de l'affriquée)
 */
export function preprocessForMandombe(text: string): string {
  let result = text;

  // nj → n + ZWJ + dj
  result = result.replace(/nj([aeiouAEIOU])/g, 'n\u200Ddj$1');

  // Ponctuation Mandombe (espaces requis pour les ligatures)
  result = result.replace(/\./g, ' . ');
  result = result.replace(/,/g, ' , ');
  result = result.replace(/\?/g, ' ? ');
  result = result.replace(/!/g, ' ! ');
  result = result.replace(/;/g, ' ; ');
  result = result.replace(/:/g, ' : ');

  // Nettoyer espaces multiples
  result = result.replace(/ +/g, ' ').trim();

  return result;
}

// ============================================================
// FONCTION PRINCIPALE
// ============================================================

export interface LariTextResult {
  display: string;
  tts: string;
  mandombe: string;
  syllables: string[][];
}

/**
 * Traite un texte lari pour toutes les sorties simultanément.
 */
export function processLariText(text: string): LariTextResult {
  const words = text.trim().split(/\s+/);
  return {
    display: text,
    tts: preprocessForElevenLabs(text),
    mandombe: preprocessForMandombe(text),
    syllables: words.map(w => syllabify(w)),
  };
}
