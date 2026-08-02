#!/usr/bin/env bun
/**
 * Recherche et corrige automatiquement les variantes erronees connues
 * (ex: "Mankondi nzololo dia" mal traduit) dans les sources du site.
 *
 * Usage:
 *   bun run scripts/fix-lari-variants.ts            # rapport seul (dry-run)
 *   bun run scripts/fix-lari-variants.ts --fix      # applique les corrections
 *   bun run scripts/fix-lari-variants.ts --fix --book  # + regenere ODT/PDF
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { spawnSync } from "child_process";
import path from "path";

const ROOT = path.resolve(import.meta.dir, "..");
const RULES_PATH = path.join(ROOT, "scripts/lari-variant-rules.json");

const TARGETS = [
  "src/data/lessons.ts",
  "supabase/functions/_shared/lessons-corpus.ts",
  "supabase/functions/_shared/dictionary.json",
  "supabase/functions/_shared/offline-fallback.ts",
  "supabase/functions/translate-lari/index.ts",
  "supabase/functions/mbuta-matondo/index.ts",
];

type PhraseRule = {
  id: string;
  lari: string;
  correct: Record<string, string>;
  wrong: Record<string, string[]>;
};
type TextRule = {
  id: string;
  description: string;
  pattern: string;
  flags?: string;
  replacement?: string;
  reportOnly?: boolean;
  skipIfLineContains?: string[];
};

const rules = JSON.parse(readFileSync(RULES_PATH, "utf8")) as {
  phraseRules: PhraseRule[];
  textRules: TextRule[];
};

const APPLY = process.argv.includes("--fix");
const BOOK = process.argv.includes("--book");

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Tolere apostrophes droites/typographiques, accents optionnels, ponctuation finale. */
function looseVariantRegex(phrase: string): RegExp {
  const body = escapeRe(phrase)
    .replace(/'/g, "['\u2019]")
    .replace(/ /g, "\\s+");
  return new RegExp(`${body}\\.?`, "gi");
}

let totalChanges = 0;
let totalWarnings = 0;

type Record_ = {
  file: string;
  ruleId: string;
  kind: "correction" | "avertissement";
  lang?: string;
  before: string;
  after: string;
  count: number;
  lines?: number[];
};
const records: Record_[] = [];
const bump = (r: Omit<Record_, "count"> & { count?: number }) => {
  const found = records.find(
    (x) => x.file === r.file && x.ruleId === r.ruleId && x.before === r.before && x.after === r.after,
  );
  if (found) found.count += r.count ?? 1;
  else records.push({ ...r, count: r.count ?? 1 });
};

for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  if (!existsSync(file)) continue;
  const before = readFileSync(file, "utf8");
  let content = before;
  const log: string[] = [];

  // --- Regles de phrases: corriger les traductions fautives sur les lignes contenant le Lari
  for (const rule of rules.phraseRules) {
    const lariRe = new RegExp(escapeRe(rule.lari).replace(/ /g, "\\s+"), "i");
    content = content
      .split("\n")
      .map((line) => {
        if (!lariRe.test(line)) return line;
        let out = line;
        for (const [lang, variants] of Object.entries(rule.wrong)) {
          const good = rule.correct[lang];
          if (!good) continue;
          for (const bad of variants) {
            const re = looseVariantRegex(bad);
            if (re.test(out)) {
              const n = out.match(looseVariantRegex(bad))?.length ?? 1;
              out = out.replace(looseVariantRegex(bad), (m) =>
                m.trimEnd().endsWith(".") ? `${good}.` : good,
              );
              log.push(`  [${rule.id}] ${lang}: "${bad}" -> "${good}"`);
              bump({
                file: rel,
                ruleId: rule.id,
                kind: "correction",
                lang,
                before: bad,
                after: good,
                count: n,
              });
            }
          }
        }
        return out;
      })
      .join("\n");
  }

  // --- Regles textuelles generiques
  for (const rule of rules.textRules) {
    const re = new RegExp(rule.pattern, rule.flags || "g");
    if (rule.reportOnly || rule.replacement === undefined) {
      const skip = rule.skipIfLineContains || [];
      const flagged = content
        .split("\n")
        .map((line, i) => ({ line, n: i + 1 }))
        .filter(({ line }) => new RegExp(rule.pattern, rule.flags || "g").test(line))
        .filter(({ line }) => !skip.some((s) => line.includes(s)));
      if (!flagged.length) continue;
      totalWarnings += flagged.length;
      log.push(`  ⚠ [${rule.id}] ${flagged.length} occurrence(s) à vérifier — ${rule.description}`);
      flagged.slice(0, 5).forEach(({ n }) => log.push(`      ligne ${n}`));
      bump({
        file: rel,
        ruleId: rule.id,
        kind: "avertissement",
        before: rule.pattern,
        after: rule.description,
        count: flagged.length,
        lines: flagged.map(({ n }) => n),
      });
      continue;
    }
    const matches = content.match(re);
    if (!matches?.length) continue;
    content = content.replace(re, rule.replacement);
    log.push(`  [${rule.id}] ${matches.length} remplacement(s)`);
    bump({
      file: rel,
      ruleId: rule.id,
      kind: "correction",
      before: rule.pattern,
      after: rule.replacement,
      count: matches.length,
      lines: [],
    });
  }


  if (content !== before) {
    totalChanges++;
    if (APPLY) writeFileSync(file, content);
  }
  if (log.length) {
    console.log(`${content !== before ? (APPLY ? "✎" : "•") : "•"} ${rel}`);
    log.forEach((l) => console.log(l));
  }
}

console.log(
  `\n${APPLY ? "Corrigé" : "Détecté"} : ${totalChanges} fichier(s) modifié(s), ${totalWarnings} avertissement(s).`,
);
if (!APPLY && totalChanges) console.log("Relance avec --fix pour appliquer.");

// ---------------------------------------------------------------- Rapports
const now = new Date();
const stamp = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
const mode = APPLY ? "corrections appliquées" : "dry-run (aucune écriture)";
const outDir = "/mnt/documents/rapports-variantes";
mkdirSync(outDir, { recursive: true });

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mdCell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

const totalOcc = records.reduce((a, r) => a + r.count, 0);
const filesTouched = [...new Set(records.map((r) => r.file))];

let md = `# Rapport de correction des variantes Lari\n\n`;
md += `- **Date** : ${now.toLocaleString("fr-FR")}\n`;
md += `- **Mode** : ${mode}\n`;
md += `- **Fichiers concernés** : ${filesTouched.length}\n`;
md += `- **Occurrences totales** : ${totalOcc}\n`;
md += `- **Fichiers modifiés** : ${totalChanges} — **avertissements** : ${totalWarnings}\n\n`;

if (!records.length) {
  md += `Aucune variante détectée. Le corpus est propre.\n`;
} else {
  for (const f of filesTouched) {
    md += `## ${f}\n\n| Règle | Type | Langue | Avant | Après | Occurrences | Lignes |\n|---|---|---|---|---|---|---|\n`;
    for (const r of records.filter((x) => x.file === f)) {
      md += `| \`${r.ruleId}\` | ${r.kind} | ${r.lang ?? "—"} | ${mdCell(r.before)} | ${mdCell(
        r.after,
      )} | ${r.count} | ${r.lines?.length ? r.lines.slice(0, 10).join(", ") : "—"} |\n`;
    }
    md += `\n`;
  }
}

const rowsHtml = filesTouched
  .map(
    (f) => `<h2>${esc(f)}</h2>
<table><thead><tr><th>Règle</th><th>Type</th><th>Langue</th><th>Avant</th><th>Après</th><th>Occ.</th><th>Lignes</th></tr></thead><tbody>
${records
  .filter((x) => x.file === f)
  .map(
    (r) => `<tr class="${r.kind}"><td><code>${esc(r.ruleId)}</code></td><td>${r.kind}</td><td>${esc(
      r.lang ?? "—",
    )}</td><td class="before">${esc(r.before)}</td><td class="after">${esc(r.after)}</td><td>${
      r.count
    }</td><td>${r.lines?.length ? esc(r.lines.slice(0, 10).join(", ")) : "—"}</td></tr>`,
  )
  .join("\n")}
</tbody></table>`,
  )
  .join("\n");

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>Rapport variantes Lari — ${esc(stamp)}</title>
<style>
:root{color-scheme:light dark}
body{font-family:ui-sans-serif,system-ui,sans-serif;margin:2rem auto;max-width:1100px;padding:0 1rem;line-height:1.5}
h1{margin-bottom:.25rem}
.meta{color:#666;margin-bottom:1.5rem}
table{border-collapse:collapse;width:100%;margin-bottom:2rem;font-size:.9rem}
th,td{border:1px solid #ddd;padding:.45rem .6rem;text-align:left;vertical-align:top}
th{background:#f4f4f5}
tr.avertissement{background:#fff8e1}
td.before{color:#b3261e}
td.after{color:#1b5e20}
code{background:#f4f4f5;padding:.1rem .3rem;border-radius:3px}
</style></head><body>
<h1>Rapport de correction des variantes Lari</h1>
<p class="meta">${now.toLocaleString("fr-FR")} — ${esc(mode)} — ${filesTouched.length} fichier(s), ${totalOcc} occurrence(s), ${totalWarnings} avertissement(s)</p>
${records.length ? rowsHtml : "<p>Aucune variante détectée. Le corpus est propre.</p>"}
</body></html>`;

const mdPath = path.join(outDir, `rapport-${stamp}.md`);
const htmlPath = path.join(outDir, `rapport-${stamp}.html`);
writeFileSync(mdPath, md);
writeFileSync(htmlPath, html);
writeFileSync(path.join(outDir, "rapport-dernier.md"), md);
writeFileSync(path.join(outDir, "rapport-dernier.html"), html);
console.log(`\n📄 Rapport : ${mdPath}\n📄 Rapport : ${htmlPath}`);

if (APPLY && BOOK) {
  console.log("\n→ Régénération ODT + PDF…");
  const r = spawnSync("python3", [path.join(ROOT, "scripts/fix-book-variants.py")], {
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
