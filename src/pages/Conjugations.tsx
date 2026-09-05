import { useMemo, useState } from "react";
import { Search, Layers } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import MandombeSpeaker from "@/components/MandombeSpeaker";
import { cleanMandombe } from "@/lib/mandombeText";
import { useLanguage } from "@/contexts/LanguageContext";
import { lessons } from "@/data/lessons";
import { conjugationSeries } from "@/data/conjugationSeries";
import { verbeBaData } from "@/data/verbeBa";

interface FlatTable {
  lessonId: string;
  lessonTitle: string;
  verb: string;
  verbMandombe: string;
  meaning: string;
  tense: string;
  isExpression: boolean;
  rows: { person: string; lari: string; mandombe: string; gloss?: string; note?: string }[];
}

const Conjugations = () => {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const [query, setQuery] = useState("");

  const tables = useMemo<FlatTable[]>(() => {
    const out: FlatTable[] = [];
    for (const lesson of lessons) {
      if (!lesson?.conjugations) continue;
      for (const table of lesson.conjugations) {
        // Le verbe etre ne se conjugue pas par personne : il a sa propre section.
        if (table.verb === "Ba" && /Être|To be/i.test(table.meaning?.fr || table.meaning?.en || "")) continue;
        out.push({
          lessonId: lesson.id,
          lessonTitle: (isFr ? lesson.titleFr : lesson.title) || lesson.title,
          verb: table.verb,
          verbMandombe: table.verbMandombe || table.verb,
          meaning: (isFr ? table.meaning?.fr : table.meaning?.en) || table.meaning?.fr || "",
          tense: (isFr ? table.tenseFr : table.tense) || table.tense,
          isExpression: table.kind === "expression",
          rows: (table.rows || []).map((r) => ({
            person: r.person,
            lari: r.lari,
            mandombe: r.mandombe || r.lari,
            gloss: (isFr ? r.fr : r.en) || r.fr,
            note: (r as { note?: string }).note,
          })),
        });
      }
    }
    return out;
  }, [isFr]);


  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (t: FlatTable) =>
      !q ||
      t.verb.toLowerCase().includes(q) ||
      t.meaning.toLowerCase().includes(q) ||
      t.tense.toLowerCase().includes(q) ||
      t.rows.some((r) => r.lari.toLowerCase().includes(q));

    const map = new Map<string, FlatTable[]>();
    for (const t of tables) {
      if (!match(t)) continue;
      const key = `${t.verb}|${t.meaning}`;
      const arr = map.get(key) || [];
      arr.push(t);
      map.set(key, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [tables, query]);

  const series = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conjugationSeries;
    return conjugationSeries.filter(
      (s) =>
        s.pattern.toLowerCase().includes(q) ||
        s.rows.some((r) => r.lari.toLowerCase().includes(q) || r.fr.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        path="/conjugations"
        title={isFr ? "Conjugaisons du kikongo lari | Nzo Mikanda" : "Kikongo Lari conjugations | Nzo Mikanda"}
        description={
          isFr
            ? "Tables de conjugaison du kikongo lari en Mandombe : présent, passé, futur, impératif et séries de personnes."
            : "Kikongo Lari conjugation tables in Mandombe script: present, past, future, imperative and person series."
        }
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20">
        <header className="max-w-3xl mx-auto text-center">
          <span className="font-mandombe text-5xl md:text-6xl text-gold block">Mpila ya vanga</span>
          <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold text-foreground">
            {isFr ? "Conjugaisons" : "Conjugations"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {isFr
              ? "Toutes les tables de conjugaison du kikongo lari, écrites en Mandombe, avec la prononciation."
              : "Every Kikongo Lari conjugation table, written in Mandombe, with pronunciation."}
          </p>
        </header>

        <div className="max-w-xl mx-auto mt-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isFr ? "Chercher un verbe, un temps, une forme…" : "Search a verb, a tense, a form…"}
            className="pl-9"
          />
        </div>

        <section className="max-w-5xl mx-auto mt-16">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              {isFr ? "Le verbe être dans tous ses états" : "The verb to be in all its states"}
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground">
            {isFr
              ? "Le verbe être ne se conjugue pas par personne : il s'accorde avec la classe du nom. Forme contractée, forme pleine, passé."
              : "The verb to be is not conjugated by person: it agrees with the noun class. Contracted form, full form, past."}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {verbeBaData.map((e, i) => (
              <article key={`${e.classe}-${i}`} className="bg-card border border-border rounded-2xl p-5">
                <ul className="divide-y divide-border/60">
                  {(["c", "f", "p"] as const).map((t) => (
                    <li key={t} className="py-4">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {t === "c"
                          ? isFr ? "Présent (forme courte)" : "Present (short form)"
                          : t === "f"
                            ? isFr ? "Présent" : "Present"
                            : isFr ? "Passé" : "Past"}
                      </span>
                      <div className="font-mandombe block w-full mt-2 mb-3 text-2xl md:text-3xl text-gold break-words">
                        {cleanMandombe(e[`${t}_kil`])}
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-foreground/80">{e[`${t}_lat`]}</span>
                        <MandombeSpeaker lariText={e[`${t}_lat`]} />
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground italic">{e[`${t}_fr`]}</div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto mt-16 space-y-10">
          {grouped.map(([key, group]) => (
            <article key={key} className="bg-card border border-border rounded-2xl p-6">
              <div className="font-mandombe block w-full text-4xl md:text-5xl text-gold break-words">
                {cleanMandombe(group[0].verbMandombe)}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-foreground/80">{group[0].verb}</h2>
                <MandombeSpeaker lariText={group[0].verb} />
                {group[0].isExpression && (
                  <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {isFr ? "Expression" : "Expression"}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{group[0].meaning}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {group.map((table, ti) => (
                  <div key={`${key}-${table.tense}-${ti}`} className="rounded-xl border border-border/70 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">{table.tense}</h3>
                    <ul className="mt-3 divide-y divide-border/60">
                      {table.rows.map((row, ri) => (
                        <li key={ri} className="py-3">
                          <div className="text-xs uppercase tracking-wide text-muted-foreground">{row.person}</div>
                          <div className="font-mandombe block w-full text-3xl md:text-4xl text-gold break-words">
                            {cleanMandombe(row.mandombe)}
                          </div>
                          <div className="mt-1 flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-foreground/80">{row.lari}</span>
                            <MandombeSpeaker lariText={row.lari} />
                          </div>
                          {row.gloss && <div className="mt-1 text-sm text-muted-foreground">{row.gloss}</div>}
                          {row.note && <div className="text-xs text-muted-foreground italic">{row.note}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>


        {series.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                {isFr ? "Séries de personnes" : "Person series"}
              </h2>
            </div>
            <p className="mt-2 text-muted-foreground">
              {isFr
                ? "La même phrase déclinée avec les marqueurs ni, tu, ka, lu, ba."
                : "The same sentence across the markers ni, tu, ka, lu, ba."}
            </p>

            <div className="mt-6 grid gap-6">
              {series.map((s) => (
                <article key={s.pattern} className="bg-card border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">{s.pattern}</h3>
                  <ul className="mt-4 grid gap-4 md:grid-cols-2">
                    {s.rows.map((row, ri) => (
                      <li key={ri} className="rounded-xl border border-border/70 p-4">
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">{row.person}</div>
                        <div className="font-mandombe block w-full text-3xl md:text-4xl text-gold break-words">
                          {cleanMandombe(row.lari)}
                        </div>
                        <div className="mt-1 flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-foreground/80">{row.lari}</span>
                          <MandombeSpeaker lariText={row.lari} />
                        </div>
                        <div className="text-sm text-muted-foreground">{isFr ? row.fr : row.en || row.fr}</div>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {grouped.length === 0 && series.length === 0 && (
          <p className="text-center text-muted-foreground mt-16">
            {isFr ? "Aucune conjugaison trouvée." : "No conjugation found."}
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Conjugations;
