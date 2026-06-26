// Lightweight Lari → { mandombe, fr } lookup used by the pronunciation panel.
// Imports the shared dictionary JSON co-located with edge functions.
import raw from "../../supabase/functions/_shared/dictionary.json";

type Entry = { lari: string; fr?: string; french?: string; mandombe?: string };

const list = raw as Entry[];

function normKey(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

const index = new Map<string, Entry>();
for (const e of list) {
  if (!e?.lari) continue;
  const k = normKey(e.lari);
  if (k && !index.has(k)) index.set(k, e);
}

export function lookupLari(lari: string): { mandombe?: string; fr?: string } | null {
  if (!lari) return null;
  const k = normKey(lari);
  const exact = index.get(k);
  if (exact) return { mandombe: exact.mandombe, fr: exact.fr ?? exact.french };

  // Try first lexical word
  const first = k.split(" ")[0];
  if (first && first !== k) {
    const partial = index.get(first);
    if (partial) return { mandombe: partial.mandombe, fr: partial.fr ?? partial.french };
  }
  return null;
}
