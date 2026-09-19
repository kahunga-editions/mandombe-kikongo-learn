import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import MandombeSpeaker from "@/components/MandombeSpeaker";
import { cleanMandombe } from "@/lib/mandombeText";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";
import { lessons } from "@/data/lessons";
import { survivalVerbs } from "@/data/survivalVerbs";

interface FlatTable {
  lessonId: string;
  lessonTitle: string;
  verb: string;
  verbMandombe: string;
  meaning: string;
  tense: string;
  isExpression: boolean;
  rows: { person: string; lari: string; mandombe: string; fr?: string; en?: string; note?: string; verbForm?: string }[];
}

interface SearchResult {
  id: string;
  verb: string;
  meaning: string;
  tense: string;
  person: string;
  lari: string;
  mandombe: string;
  fr?: string;
  en?: string;
  note?: string;
  verbForm?: string;
}

/** Pronoms possessifs / personnels qui terminent souvent une phrase : jamais la forme verbale. */
const PRONOUN_ENDINGS = new Set([
  "nani",
  "naku",
  "nandi",
  "neto",
  "neno",
  "nau",
  "mono",
  "ngeye",
  "iandi",
  "yandi",
  "beto",
  "beno",
  "bau",
]);

/** Comparaison souple : minuscules, sans accents, espaces compactés. */
const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_'’.,;:!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const languageNames = {
  fr: "français",
  en: "English",
  pt: "português",
  es: "español",
  it: "italiano",
  ln: "Lingála",
  el: "ελληνικά",
  ko: "한국어",
  de: "Deutsch",
};

/** Met en évidence la forme verbale au sein d'une phrase Mandombe. */


function HighlightedMandombe({
  text,
  verb,
  className = "",
}: {
  text: string;
  verb?: string;
  className?: string;
}) {
  const cleaned = cleanMandombe(text);
  const target = verb ? cleanMandombe(verb) : "";

  if (!target) {
    return <span className={className}>{cleaned}</span>;
  }

  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(^|[^a-zA-Z])(${escaped})([^a-zA-Z]|$)`, "ig");
  let lastMatch: { prefix: string; match: string; suffix: string } | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned)) !== null) {
    lastMatch = {
      prefix: cleaned.slice(0, m.index + m[1].length),
      match: m[2],
      suffix: cleaned.slice(m.index + m[0].length - m[3].length),
    };
  }

  if (!lastMatch) {
    const words = cleaned.split(" ").filter(Boolean);
    const last = words[words.length - 1];
    if (last && last.toLowerCase() === target.toLowerCase()) {
      const prefixWords = words.slice(0, -1);
      lastMatch = {
        prefix: prefixWords.join(" ") + (prefixWords.length ? " " : ""),
        match: last,
        suffix: "",
      };
    }
  }

  if (!lastMatch) {
    return <span className={className}>{cleaned}</span>;
  }

  return (
    <span className={className}>
      {lastMatch.prefix}
      <span className="inline rounded bg-verb px-1 font-bold text-verb-foreground">
        {lastMatch.match}
      </span>
      {lastMatch.suffix}
    </span>
  );
}

const Conjugations = () => {
  const { language } = useLanguage();
  const { getTranslation, isTranslating } = useTranslatedContent({ alwaysDynamic: true });
  const isFr = language === "fr";
  const [query, setQuery] = useState("");
  const [showSelectedTranslation, setShowSelectedTranslation] = useState(false);

  const translatedGloss = (fr?: string, en?: string) => {
    if (!fr) return en || "";
    if (!showSelectedTranslation || language === "fr") return fr;
    if (language === "en" && en) return en;
    return getTranslation(fr);
  };

  const tables = useMemo<FlatTable[]>(() => {
    const out: FlatTable[] = [];
    for (const lesson of lessons) {
      if (!lesson?.conjugations) continue;
      for (const table of lesson.conjugations) {
        if (table.kind === "expression") continue;
        // Le verbe etre se conjugue par personne : ses tables sont affichees comme les autres.
        // C'est aux 3es personnes que la forme s'accorde avec la classe du nom.

        out.push({
          lessonId: lesson.id,
          lessonTitle: (isFr ? lesson.titleFr : lesson.title) || lesson.title,
          verb: table.verb,
          verbMandombe: table.verbMandombe || table.verb,
          meaning: (isFr ? table.meaning?.fr : table.meaning?.en) || table.meaning?.fr || "",
          tense: (isFr ? table.tenseFr : table.tense) || table.tense,
          isExpression: false,
          rows: (table.rows || []).map((r) => {
            const mandombeText = r.mandombe || r.lari;
            const mandombeClean = cleanMandombe(mandombeText);
            const words = mandombeClean.split(" ").filter(Boolean);
            const explicit = (r as { verbForm?: string }).verbForm;
            const last = words.length ? words[words.length - 1] : undefined;
            // Les expressions se terminent souvent par un pronom (nani, naku, nandi...) :
            // on ne devine pas la forme verbale dans ce cas.
            const guessed = last && !PRONOUN_ENDINGS.has(last.toLowerCase()) ? last : undefined;
            return {
              person: r.person,
              lari: r.lari,
              mandombe: mandombeText,
              fr: r.fr,
              en: r.en,
              note: (r as { note?: string }).note,
              verbForm: explicit || (table.kind === "expression" ? undefined : guessed),
            };
          }),

        });
      }
    }

    // Corpus « Zonza Lari — verbes de survie » : six personnes, trois temps.
    // On ne re-affiche pas une forme deja presente dans une lecon.
    const seen = new Set<string>();
    for (const t of out) for (const r of t.rows) seen.add(norm(r.lari));
    for (const v of survivalVerbs) {
      for (const t of v.tenses) {
        const rows = t.rows.filter((r) => !seen.has(norm(r.lari)));
        if (!rows.length) continue;
        out.push({
          lessonId: "zonza-lari",
          lessonTitle: isFr ? "Zonza Lari — verbes de survie" : "Zonza Lari — survival verbs",
          verb: v.verb,
          verbMandombe: v.verb.replace(/dj/g, "j").replace(/Dj/g, "J"),
          meaning: isFr && v.note ? `${v.meaning} — ${v.note}` : isFr ? v.meaning : v.meaningEn,
          tense: isFr && t.rule ? `${t.tense} · ${t.rule}` : isFr ? t.tense : t.tenseEn,
          isExpression: false,
          rows: rows.map((r) => ({
            person: r.person,
            lari: r.lari,
            mandombe: r.mandombe || r.lari,
            fr: r.fr,
            en: r.en,
            note: r.note,
            verbForm: r.verbForm,
          })),
        });
      }
    }
    return out;
  }, [isFr]);


  const searchResults = useMemo<SearchResult[]>(() => {
    const q = norm(query);
    if (!q) return [];

    const results: SearchResult[] = [];
    tables.forEach((table, tableIndex) => {
      table.rows.forEach((row, rowIndex) => {
        const rowText = [
          table.verb,
          table.meaning,
          table.tense,
          row.person,
          row.lari,
          row.fr,
          row.en,
          row.note,
        ]
          .filter(Boolean)
          .map((value) => norm(value || ""));

        if (!rowText.some((value) => value.includes(q))) return;

        results.push({
          id: `${table.lessonId}-${tableIndex}-${rowIndex}`,
          verb: table.verb,
          meaning: table.meaning,
          tense: table.tense,
          person: row.person,
          lari: row.lari,
          mandombe: row.mandombe,
          fr: row.fr,
          en: row.en,
          note: row.note,
          verbForm: row.verbForm,
        });
      });
    });

    return results;
  }, [tables, query]);



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

        <div className="max-w-xl mx-auto mt-4 flex items-center justify-center gap-3">
          <Switch
            id="conjugation-translation"
            checked={showSelectedTranslation}
            onCheckedChange={setShowSelectedTranslation}
            disabled={language === "fr"}
            aria-label={`Afficher la traduction en ${languageNames[language]}`}
          />
          <label htmlFor="conjugation-translation" className="text-sm text-muted-foreground">
            {language === "fr"
              ? "Traduction française"
              : `${showSelectedTranslation ? "Traduction" : "Traduire"} · ${languageNames[language]}`}
            {showSelectedTranslation && isTranslating ? "…" : ""}
          </label>
        </div>

        {query.trim() && (
          <section aria-live="polite" className="max-w-3xl mx-auto mt-8">
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {isFr
                    ? `${searchResults.length} résultat${searchResults.length > 1 ? "s" : ""} pour « ${query.trim()} »`
                    : `${searchResults.length} result${searchResults.length > 1 ? "s" : ""} for “${query.trim()}”`}
                </p>
                <ul className="mt-3 space-y-3">
                  {searchResults.map((result) => (
                    <li key={result.id} className="border border-border bg-card rounded-lg px-5 py-4">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted-foreground">
                        <span className="font-semibold text-primary">{result.verb}</span>
                        <span>{result.tense}</span>
                      </div>
                      <div className="font-mandombe mt-3 mb-3 block w-full break-words text-3xl text-gold [overflow-wrap:anywhere] md:text-4xl">
                        <HighlightedMandombe text={result.mandombe} verb={result.verbForm} />
                      </div>
                      <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="text-base font-medium text-foreground">{result.lari}</span>
                        <MandombeSpeaker lariText={result.lari} />
                      </div>
                      {(result.fr || result.en) && (
                        <div className="mt-1 text-base text-muted-foreground">{translatedGloss(result.fr, result.en)}</div>
                      )}
                      {result.note && <div className="mt-1 text-xs italic text-muted-foreground">{result.note}</div>}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="py-10 text-center" role="status">
                <SearchX className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden="true" />
                <p className="mt-3 font-medium text-foreground">
                  {isFr
                    ? `Aucun verbe trouvé pour « ${query.trim()} ».`
                    : `No verb found for “${query.trim()}”.`}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isFr
                    ? "Vérifiez l'orthographe ou essayez l'infinitif du verbe."
                    : "Check the spelling or try the verb's infinitive form."}
                </p>
              </div>
            )}
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Conjugations;
