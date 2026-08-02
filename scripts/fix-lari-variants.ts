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
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
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

type Sample = { line: number; before: string; after: string };
type Record_ = {
  file: string;
  ruleId: string;
  kind: "correction" | "avertissement";
  lang?: string;
  before: string;
  after: string;
  count: number;
  lines?: number[];
  samples?: Sample[];
};
const records: Record_[] = [];
const bump = (r: Omit<Record_, "count"> & { count?: number }) => {
  const found = records.find(
    (x) => x.file === r.file && x.ruleId === r.ruleId && x.before === r.before && x.after === r.after,
  );
  if (found) {
    found.count += r.count ?? 1;
    if (r.samples?.length) found.samples = [...(found.samples ?? []), ...r.samples];
    if (r.lines?.length) found.lines = [...(found.lines ?? []), ...r.lines];
  } else records.push({ ...r, count: r.count ?? 1 });
};

/** Snapshots avant/apres pour generer le patch unifie. */
const fileSnapshots: { rel: string; before: string; after: string }[] = [];



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
      .map((line, idx) => {
        if (!lariRe.test(line)) return line;
        let out = line;
        for (const [lang, variants] of Object.entries(rule.wrong)) {
          const good = rule.correct[lang];
          if (!good) continue;
          for (const bad of variants) {
            const re = looseVariantRegex(bad);
            if (re.test(out)) {
              const n = out.match(looseVariantRegex(bad))?.length ?? 1;
              const lineBefore = out;
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
                lines: [idx + 1],
                samples: [{ line: idx + 1, before: lineBefore.trim(), after: out.trim() }],
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
        samples: flagged.map(({ line, n }) => ({ line: n, before: line.trim(), after: line.trim() })),
      });

      continue;
    }
    const matches = content.match(re);
    if (!matches?.length) continue;
    const samples: Sample[] = [];
    const hitLines: number[] = [];
    content = content
      .split("\n")
      .map((line, idx) => {
        const lineRe = new RegExp(rule.pattern, rule.flags || "g");
        if (!lineRe.test(line)) return line;
        const next = line.replace(new RegExp(rule.pattern, rule.flags || "g"), rule.replacement!);
        if (next === line) return line;
        hitLines.push(idx + 1);
        samples.push({ line: idx + 1, before: line.trim(), after: next.trim() });
        return next;
      })
      .join("\n");
    log.push(`  [${rule.id}] ${matches.length} remplacement(s)`);
    bump({
      file: rel,
      ruleId: rule.id,
      kind: "correction",
      before: rule.pattern,
      after: rule.replacement,
      count: matches.length,
      lines: hitLines,
      samples,
    });

  }


  if (content !== before) {
    totalChanges++;
    fileSnapshots.push({ rel, before, after: content });
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
    const withSamples = records.filter((x) => x.file === f && x.samples?.length);
    if (withSamples.length) {
      md += `### Diffs — ${f}\n\n`;
      for (const r of withSamples) {
        for (const s of r.samples!.slice(0, 20)) {
          md += `- \`${r.ruleId}\` — [${f}:${s.line}](${f}#L${s.line})\n\n`;
          md += `  \`\`\`diff\n  - ${mdCell(s.before)}\n  + ${mdCell(s.after)}\n  \`\`\`\n\n`;
        }
      }
    }
  }
}

// --- Diff mot a mot (LCS) pour surligner precisement les changements
function wordDiff(a: string, b: string): { del: string; ins: string } {
  const A = a.split(/(\s+)/);
  const B = b.split(/(\s+)/);
  const m = A.length,
    n = B.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  let i = 0,
    j = 0;
  let del = "",
    ins = "";
  while (i < m && j < n) {
    if (A[i] === B[j]) {
      del += esc(A[i]);
      ins += esc(B[j]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      del += `<del>${esc(A[i++])}</del>`;
    } else {
      ins += `<ins>${esc(B[j++])}</ins>`;
    }
  }
  while (i < m) del += `<del>${esc(A[i++])}</del>`;
  while (j < n) ins += `<ins>${esc(B[j++])}</ins>`;
  return { del, ins };
}

const diffBlock = (r: Record_) => {
  const samples = r.samples?.slice(0, 20) ?? [];
  if (!samples.length) return "";
  return samples
    .map((s) => {
      const abs = path.join(ROOT, r.file);
      const vscode = `vscode://file${abs}:${s.line}`;
      const cursor = `cursor://file${abs}:${s.line}`;
      const { del, ins } = wordDiff(s.before, s.after);
      return `<div class="diff">
  <div class="diff-head">
    <a class="loc" href="${esc(vscode)}" title="Ouvrir dans VS Code">${esc(r.file)}:${s.line}</a>
    <a class="alt" href="${esc(cursor)}" title="Ouvrir dans Cursor">Cursor</a>
    <button class="copy" data-loc="${esc(r.file)}:${s.line}">Copier le chemin</button>
  </div>
  <pre class="del"><span class="gutter">-</span>${del}</pre>
  <pre class="ins"><span class="gutter">+</span>${ins}</pre>
</div>`;
    })
    .join("\n");
};

const rowsHtml = filesTouched
  .map(
    (f) => `<h2>${esc(f)}</h2>
<table><thead><tr><th>Règle</th><th>Type</th><th>Langue</th><th>Avant</th><th>Après</th><th>Occ.</th><th>Lignes</th></tr></thead><tbody>
${records
  .filter((x) => x.file === f)
  .map((r) => {
    const diffs = diffBlock(r);
    const row = `<tr class="${r.kind}"><td><code>${esc(r.ruleId)}</code></td><td>${r.kind}</td><td>${esc(
      r.lang ?? "—",
    )}</td><td class="before">${esc(r.before)}</td><td class="after">${esc(r.after)}</td><td>${
      r.count
    }</td><td>${
      r.lines?.length
        ? r.lines
            .slice(0, 10)
            .map(
              (n) =>
                `<a class="linkline" href="vscode://file${esc(path.join(ROOT, r.file))}:${n}">${n}</a>`,
            )
            .join(", ")
        : "—"
    }</td></tr>`;
    const detail = diffs
      ? `<tr class="detailrow"><td colspan="7"><details><summary>Voir le diff (${
          r.samples!.length
        } occurrence(s))</summary>${diffs}</details></td></tr>`
      : "";
    return row + "\n" + detail;
  })
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
summary{cursor:pointer;font-weight:600;padding:.2rem 0}
.diff{margin:.6rem 0 1rem;border:1px solid #e4e4e7;border-radius:6px;overflow:hidden}
.diff-head{display:flex;gap:.75rem;align-items:center;background:#fafafa;padding:.35rem .6rem;font-size:.8rem;border-bottom:1px solid #e4e4e7}
.diff-head a{color:#1a73e8;text-decoration:none}
.diff-head a:hover{text-decoration:underline}
.diff pre{margin:0;padding:.35rem .6rem;white-space:pre-wrap;word-break:break-word;font-size:.82rem;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.diff pre.del{background:#fdecea}
.diff pre.ins{background:#e8f5e9}
.gutter{display:inline-block;width:1.2em;opacity:.6;user-select:none}
del{background:#f8c9c4;text-decoration:none}
ins{background:#b7e1bd;text-decoration:none}
button.copy{margin-left:auto;font-size:.75rem;cursor:pointer;border:1px solid #d4d4d8;background:#fff;border-radius:4px;padding:.15rem .5rem}
a.linkline{color:#1a73e8;text-decoration:none}
a.linkline:hover{text-decoration:underline}
</style></head><body>
<h1>Rapport de correction des variantes Lari</h1>
<p class="meta">${now.toLocaleString("fr-FR")} — ${esc(mode)} — ${filesTouched.length} fichier(s), ${totalOcc} occurrence(s), ${totalWarnings} avertissement(s)</p>
${records.length ? rowsHtml : "<p>Aucune variante détectée. Le corpus est propre.</p>"}
<script>
document.querySelectorAll("button.copy").forEach(function(b){
  b.addEventListener("click", function(){
    navigator.clipboard.writeText(b.dataset.loc || "");
    var t = b.textContent; b.textContent = "Copié !";
    setTimeout(function(){ b.textContent = t; }, 1200);
  });
});
</script>
</body></html>`;


const mdPath = path.join(outDir, `rapport-${stamp}.md`);
const htmlPath = path.join(outDir, `rapport-${stamp}.html`);
writeFileSync(mdPath, md);
writeFileSync(htmlPath, html);
writeFileSync(path.join(outDir, "rapport-dernier.md"), md);
writeFileSync(path.join(outDir, "rapport-dernier.html"), html);
console.log(`\n📄 Rapport : ${mdPath}\n📄 Rapport : ${htmlPath}`);

// ------------------------------------------------- Patch unifie (.patch)
/** Diff ligne a ligne (LCS) -> hunks unifies avec 3 lignes de contexte. */
function unifiedDiff(rel: string, before: string, after: string, ctx = 3): string {
  const A = before.split("\n");
  const B = after.split("\n");
  const m = A.length,
    n = B.length;
  // LCS en O(m*n) memoire compacte (Uint32 rows)
  const dp: Uint32Array[] = Array.from({ length: m + 1 }, () => new Uint32Array(n + 1));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  type Op = { t: " " | "-" | "+"; s: string; a: number; b: number };
  const ops: Op[] = [];
  let i = 0,
    j = 0;
  while (i < m && j < n) {
    if (A[i] === B[j]) ops.push({ t: " ", s: A[i], a: i++, b: j++ });
    else if (dp[i + 1][j] >= dp[i][j + 1]) ops.push({ t: "-", s: A[i], a: i++, b: j });
    else ops.push({ t: "+", s: B[j], a: i, b: j++ });
  }
  while (i < m) ops.push({ t: "-", s: A[i], a: i++, b: j });
  while (j < n) ops.push({ t: "+", s: B[j], a: i, b: j++ });

  const changed = ops.map((o) => o.t !== " ");
  if (!changed.some(Boolean)) return "";

  // Regroupe les changements en hunks avec contexte
  const groups: [number, number][] = [];
  for (let k = 0; k < ops.length; k++) {
    if (!changed[k]) continue;
    let start = Math.max(0, k - ctx);
    let end = k;
    while (end + 1 < ops.length) {
      let next = end + 1;
      while (next < ops.length && !changed[next]) next++;
      if (next < ops.length && next - end <= ctx * 2) end = next;
      else break;
    }
    end = Math.min(ops.length - 1, end + ctx);
    const last = groups[groups.length - 1];
    if (last && start <= last[1] + 1) last[1] = Math.max(last[1], end);
    else groups.push([start, end]);
    k = end;
  }

  let out = `diff --git a/${rel} b/${rel}\n--- a/${rel}\n+++ b/${rel}\n`;
  for (const [start, end] of groups) {
    const slice = ops.slice(start, end + 1);
    const aStart = (slice.find((o) => o.t !== "+")?.a ?? slice[0].a) + 1;
    const bStart = (slice.find((o) => o.t !== "-")?.b ?? slice[0].b) + 1;
    const aCount = slice.filter((o) => o.t !== "+").length;
    const bCount = slice.filter((o) => o.t !== "-").length;
    out += `@@ -${aStart},${aCount} +${bStart},${bCount} @@\n`;
    for (const o of slice) out += `${o.t}${o.s}\n`;
  }
  return out;
}

let patch = `# Patch genere le ${now.toISOString()} — ${mode}\n`;
patch += `# Fichiers: ${fileSnapshots.length} — occurrences: ${totalOcc}\n`;
patch += `# Application: git apply rapport-${stamp}.patch  (ou: patch -p1 < ...)\n`;
for (const s of fileSnapshots) patch += unifiedDiff(s.rel, s.before, s.after);

const patchPath = path.join(outDir, `rapport-${stamp}.patch`);
writeFileSync(patchPath, patch);
writeFileSync(path.join(outDir, "rapport-dernier.patch"), patch);
console.log(`🩹 Patch  : ${patchPath}`);

if (APPLY && BOOK) {
  console.log("\n→ Régénération ODT + PDF…");
  const r = spawnSync("python3", [path.join(ROOT, "scripts/fix-book-variants.py")], {
    stdio: "inherit",
  });
  if (r.status !== 0) process.exit(r.status ?? 1);
}
