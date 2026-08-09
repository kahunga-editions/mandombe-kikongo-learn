/**
 * Audit : detecte tout melange latin / Mandombe dans le corpus.
 * Regle absolue : un champ `mandombe` ne contient que des lettres et des espaces.
 *
 * Usage : bunx tsx scripts/audit-mandombe-latin.ts
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const BAD = /[^A-Za-z ]/;

type Hit = { source: string; lari: string; mandombe: string; chars: string };
const hits: Hit[] = [];

const check = (source: string, lari: string, mandombe: string) => {
  if (!mandombe) return;
  const chars = Array.from(new Set(mandombe.split("").filter((c) => BAD.test(c))));
  if (chars.length) hits.push({ source, lari, mandombe, chars: chars.join(" ") });
};

// 1. dictionary.json
const dictPath = path.join(ROOT, "supabase/functions/_shared/dictionary.json");
for (const e of JSON.parse(fs.readFileSync(dictPath, "utf8")) as any[]) {
  check("dictionary.json", e.lari, e.mandombe);
}

// 2. lessons.ts + corpus TS (analyse textuelle des paires lari/mandombe)
for (const rel of ["src/data/lessons.ts", "supabase/functions/_shared/lessons-corpus.ts"]) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, "utf8");
  const re = /mandombe:\s*"((?:[^"\\]|\\.)*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const value = m[1].replace(/\\"/g, '"');
    const line = src.slice(0, m.index).split("\n").length;
    check(`${rel}:${line}`, "", value);
  }
}

const report = hits
  .map((h) => `${h.source}\t${h.chars}\t${h.mandombe}`)
  .join("\n");

fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "reports/mandombe-latin-audit.txt"), report);
console.log(`${hits.length} champs Mandombe contiennent du latin parasite.`);
console.log(report.split("\n").slice(0, 30).join("\n"));
