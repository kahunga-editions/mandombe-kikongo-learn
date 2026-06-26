// Client-side port of supabase/functions/_shared/lari-syllables.ts.
// Pure, dependency-free — used by PronunciationCheck offline mode.

const ONSET_CLUSTERS = [
  "tsh", "nzw", "nsw", "nkw", "ngw", "mbw", "mpw",
  "mb", "mp", "nd", "nt", "nk", "ng", "nz", "ns",
  "ts", "sh", "kw", "gw", "bw", "pw", "tw", "dw",
  "fw", "vw", "lw", "mw", "nw", "sw", "zw",
];
const VOWELS = new Set(["a", "e", "i", "o", "u"]);
const isVowel = (c: string) => VOWELS.has(c);

export function syllabify(word: string): string[] {
  const w = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const out: string[] = [];
  let i = 0;
  while (i < w.length) {
    if (!/[a-z]/.test(w[i])) { i++; continue; }
    let matched = "";
    for (const cl of ONSET_CLUSTERS) {
      if (w.startsWith(cl, i) && i + cl.length < w.length && isVowel(w[i + cl.length])) {
        if (cl.length > matched.length) matched = cl;
      }
    }
    let onset = "";
    if (matched) { onset = matched; i += matched.length; }
    else if (!isVowel(w[i])) { onset = w[i]; i++; }
    let nucleus = "";
    if (isVowel(w[i])) {
      nucleus = w[i]; i++;
      if (i < w.length && w[i] === nucleus) { nucleus += w[i]; i++; }
    }
    if (!nucleus) {
      if (out.length) out[out.length - 1] += onset;
      else out.push(onset);
      continue;
    }
    out.push(onset + nucleus);
  }
  return out.filter(Boolean);
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const v0 = new Array(b.length + 1);
  const v1 = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) v0[j] = j;
  for (let i = 0; i < a.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < b.length; j++) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= b.length; j++) v0[j] = v1[j];
  }
  return v1[b.length];
}

function sylSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const m = Math.max(a.length, b.length);
  if (!m) return 1;
  return 1 - levenshtein(a, b) / m;
}

export type SyllableCell = {
  expected: string | null;
  heard: string | null;
  status: "ok" | "near" | "wrong" | "missing" | "extra";
};

export function alignSyllables(expected: string[], heard: string[]): SyllableCell[] {
  const n = expected.length, m = heard.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const sub = 1 - sylSimilarity(expected[i - 1], heard[j - 1]);
      dp[i][j] = Math.min(dp[i - 1][j - 1] + sub, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
    }
  }
  const cells: SyllableCell[] = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const sub = 1 - sylSimilarity(expected[i - 1], heard[j - 1]);
      if (Math.abs(dp[i][j] - (dp[i - 1][j - 1] + sub)) < 1e-9) {
        const sim = 1 - sub;
        const status: SyllableCell["status"] = sim === 1 ? "ok" : sim >= 0.5 ? "near" : "wrong";
        cells.push({ expected: expected[i - 1], heard: heard[j - 1], status });
        i--; j--; continue;
      }
    }
    if (i > 0 && (j === 0 || Math.abs(dp[i][j] - (dp[i - 1][j] + 1)) < 1e-9)) {
      cells.push({ expected: expected[i - 1], heard: null, status: "missing" });
      i--; continue;
    }
    cells.push({ expected: null, heard: heard[j - 1], status: "extra" });
    j--;
  }
  return cells.reverse();
}

export type CoachIssue = { expected: string; heard: string; tip: string };

const RULES: Array<{ match: (e: string, h: string) => boolean; tip: string }> = [
  { match: (e, h) => /j/.test(e) && /(^|[^j])z|dz/.test(h) && !/j/.test(h),
    tip: "Le j Lari se prononce comme dans Julien (/ʒ/), pas /z/ ni /dz/." },
  { match: (e, h) => /sh/.test(e) && (/ts/.test(h) || (/s/.test(h) && !/sh/.test(h))),
    tip: "sh = comme shoes en anglais (/ʃ/), pas /s/ ni /ts/." },
  { match: (e, h) => /g/.test(e) && /(j|dj)/.test(h) && !/g/.test(h),
    tip: "g est toujours dur en Lari, comme dans gare." },
  { match: (e, h) => { const m = e.match(/^(n[zskdgt])/); return !!m && !h.startsWith(m[1]); },
    tip: "Garde la nasale n avant la consonne (ex. nzila, nsoneka)." },
  { match: (e, h) => /^m[bp]/.test(e) && !/^m[bp]/.test(h),
    tip: "Garde le m avant b ou p (ex. mbote, mpila)." },
  { match: (e, h) => /([aeiou])\1/.test(e) && !/([aeiou])\1/.test(h),
    tip: "Allonge bien la voyelle (double-la)." },
  { match: (e, h) => /ts/.test(e) && !/ts/.test(h) && /t/.test(h),
    tip: "ts est une affriquée — souffle bien le s après le t." },
];

function deriveTip(expected: string, heard: string): string {
  for (const r of RULES) if (r.match(expected.toLowerCase(), heard.toLowerCase())) return r.tip;
  return `Travaille la syllabe « ${expected} » — tu as dit « ${heard} ».`;
}

export function buildIssues(cells: SyllableCell[]): CoachIssue[] {
  const issues: CoachIssue[] = [];
  for (const c of cells) {
    if (c.status === "ok") continue;
    const expected = c.expected ?? "";
    const heard = c.heard ?? "(rien)";
    if (c.status === "missing") issues.push({ expected, heard: "(omis)", tip: `Tu as oublié la syllabe « ${expected} ».` });
    else if (c.status === "extra") issues.push({ expected: "(en trop)", heard, tip: `Syllabe ajoutée : « ${heard} ».` });
    else issues.push({ expected, heard, tip: deriveTip(expected, heard) });
  }
  const seen = new Set<string>();
  const unique: CoachIssue[] = [];
  for (const i of issues) {
    if (seen.has(i.tip)) continue;
    seen.add(i.tip); unique.push(i);
    if (unique.length >= 3) break;
  }
  return unique;
}

export type Diagnostic = {
  expectedSyllables: string[];
  heardSyllables: string[];
  cells: SyllableCell[];
  issues: CoachIssue[];
  score: number;
  verdict: "excellent" | "good" | "retry";
};

export function diagnose(expected: string, heard: string): Diagnostic {
  const expWords = expected.toLowerCase().split(/\s+/).filter(Boolean);
  const heardWords = heard.toLowerCase().split(/\s+/).filter(Boolean);
  const expSyls = expWords.flatMap((w) => syllabify(w));
  const heardSyls = heardWords.flatMap((w) => syllabify(w));
  const cells = alignSyllables(expSyls, heardSyls);
  const okCount = cells.filter((c) => c.status === "ok").length;
  const nearCount = cells.filter((c) => c.status === "near").length;
  const total = Math.max(expSyls.length, cells.length);
  const score = total ? (okCount + 0.5 * nearCount) / total : 0;
  const verdict: Diagnostic["verdict"] = score >= 0.85 ? "excellent" : score >= 0.6 ? "good" : "retry";
  return { expectedSyllables: expSyls, heardSyllables: heardSyls, cells, issues: buildIssues(cells), score, verdict };
}

// ---------- Web Speech API wrapper (offline-friendly on Chrome/Edge) -----

export function isWebSpeechSupported(): boolean {
  if (typeof window === "undefined") return false;
  // @ts-expect-error vendor prefix
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function recognizeOnce(lang = "fr-FR"): Promise<string> {
  return new Promise((resolve, reject) => {
    // @ts-expect-error vendor prefix
    const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) { reject(new Error("Web Speech non disponible (utilise Chrome ou Edge).")); return; }
    const rec = new Ctor();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.continuous = false;
    let resolved = false;
    rec.onresult = (e: any) => {
      resolved = true;
      const text = e.results?.[0]?.[0]?.transcript ?? "";
      resolve(text);
    };
    rec.onerror = (e: any) => { if (!resolved) reject(new Error(e.error || "speech error")); };
    rec.onend = () => { if (!resolved) reject(new Error("Aucune parole détectée.")); };
    try { rec.start(); } catch (err) { reject(err as Error); }
  });
}
