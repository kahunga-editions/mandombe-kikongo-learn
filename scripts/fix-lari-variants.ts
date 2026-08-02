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
              out = out.replace(looseVariantRegex(bad), (m) =>
                m.trimEnd().endsWith(".") ? `${good}.` : good,
              );
              log.push(`  [${rule.id}] ${lang}: "${bad}" -> "${good}"`);
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
      continue;
    }
    const matches = content.match(re);
    if (!matches?.length) continue;
    content = content.replace(re, rule.replacement);
    log.push(`  [${rule.id}] ${matches.length} remplacement(s)`);
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

if (APPLY && BOOK) {
  console.log("\n→ Régénération ODT + PDF…");
  const r = spawnSync("python3", [path.join(ROOT, "scripts/fix-book-variants.py")], {
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
