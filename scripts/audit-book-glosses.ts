/**
 * Garde-fou : compare les gloses ecrites en dur dans les scripts du livre
 * (sections Prononciation, Mode d'emploi...) avec dictionary.json.
 * Toute glose inventee ou divergente est signalee.
 *
 * Usage : bunx tsx scripts/audit-book-glosses.ts
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

type Entry = { lari?: string; fr?: string; french?: string; note?: string };
const dict = JSON.parse(
  fs.readFileSync(path.join(ROOT, "supabase/functions/_shared/dictionary.json"), "utf8"),
) as Entry[];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z ]/g, "").trim();

const byLari = new Map<string, string[]>();
for (const e of dict) {
  const key = norm(String(e.lari ?? ""));
  if (!key) continue;
  const fr = String(e.fr ?? e.french ?? "");
  if (!fr) continue;
  byLari.set(key, [...(byLari.get(key) ?? []), fr]);
}

// Tuples ("Mand", "Lari", "fr", "en", "/ipa/") des scripts de generation du livre.
const TUPLE = /\("([A-Za-z' ]+)",\s*"([A-Za-z' ]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"(\/[^"]*\/[^"]*)"\)/g;

const problems: string[] = [];
let checked = 0;

for (const file of fs.readdirSync(path.join(ROOT, "scripts"))) {
  if (!/^build-dictionary-odt.*\.py$/.test(file)) continue;
  const src = fs.readFileSync(path.join(ROOT, "scripts", file), "utf8");
  let m: RegExpExecArray | null;
  while ((m = TUPLE.exec(src))) {
    const [, , lari, fr] = m;
    const senses = byLari.get(norm(lari));
    checked++;
    if (!senses) {
      problems.push(`${file}\t${lari}\tabsent de dictionary.json (glose "${fr}" non verifiable)`);
      continue;
    }
    const flat = norm(senses.join(" "));
    const ok = norm(fr)
      .split(/\s+/)
      .some((w) => w.length > 3 && flat.includes(w));
    if (!ok) {
      problems.push(`${file}\t${lari}\tlivre: "${fr}"\tdico: "${senses.join(" ; ")}"`);
    }
  }
}

fs.mkdirSync(path.join(ROOT, "reports"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "reports/book-glosses-audit.txt"), problems.join("\n"));
console.log(`${checked} gloses verifiees, ${problems.length} a controler.`);
console.log(problems.join("\n"));
