import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { verbeBaData, type ConjEntry } from "@/data/verbeBa";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DATA = verbeBaData;



type Tense = "c" | "f" | "p";

const tenseColors: Record<Tense, string> = {
  c: "bg-amber-100 text-amber-800 border-amber-400 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-500 dark:hover:bg-amber-900/60",
  f: "bg-emerald-100 text-emerald-800 border-emerald-400 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-500 dark:hover:bg-emerald-900/60",
  p: "bg-blue-100 text-blue-800 border-blue-400 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-500 dark:hover:bg-blue-900/60",
};

const tenseBadgeColors: Record<Tense, string> = {
  c: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  f: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  p: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
};

const tenseLabels: Record<Tense, { fr: string; en: string; pt: string }> = {
  c: { fr: "Présent contracté", en: "Contracted present", pt: "Presente contraído" },
  f: { fr: "Présent plein", en: "Full present", pt: "Presente pleno" },
  p: { fr: "Passé", en: "Past", pt: "Passado" },
};

const VerbeBaSection = () => {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<{ entry: ConjEntry; tense: Tense } | null>(null);

  const getTenseLabel = (tense: Tense) => {
    return tenseLabels[tense][language === "pt" ? "pt" : language === "en" ? "en" : "fr"];
  };

  const getForm = (entry: ConjEntry, tense: Tense) => entry[tense];
  const getTranslation = (entry: ConjEntry, tense: Tense) => entry[`${tense}_tr`];
  const getKifuani = (entry: ConjEntry, tense: Tense) => ({
    mandombe: entry[`${tense}_kil`],
    latin: entry[`${tense}_lat`],
    french: entry[`${tense}_fr`],
  });

  return (
    <section id="verbe-ba" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            BA= · {language === "en" ? "The verb \"to be\" in Kilari" : language === "pt" ? "O verbo \"ser/estar\" em Kilari" : "Le verbe « être » en Kilari"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === "en"
              ? "Click on a verb form to see the translation and kifuani (example)"
              : language === "pt"
              ? "Clique em uma forma verbal para ver a tradução e o kifuani (exemplo)"
              : "Cliquez sur une forme verbale pour voir la traduction et le kifuani"}
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            {(["c", "f", "p"] as Tense[]).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${t === "c" ? "bg-amber-600 dark:bg-amber-400" : t === "f" ? "bg-emerald-600 dark:bg-emerald-400" : "bg-blue-600 dark:bg-blue-400"}`} />
                <span className="text-sm text-muted-foreground">{getTenseLabel(t)}</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    {language === "en" ? "Pronoun / Noun" : language === "pt" ? "Pronome / Substantivo" : "Pronom / Substantif"}
                  </th>
                  <th className="text-center px-4 py-3 text-amber-700 dark:text-amber-400 font-medium">{getTenseLabel("c")}</th>
                  <th className="text-center px-4 py-3 text-emerald-700 dark:text-emerald-300 font-medium">{getTenseLabel("f")}</th>
                  <th className="text-center px-4 py-3 text-blue-700 dark:text-blue-300 font-medium">{getTenseLabel("p")}</th>
                </tr>
              </thead>
              <tbody>
                {DATA.map((entry, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-mandombe text-2xl text-foreground mb-3">{entry.classe}</div>
                      <div className="text-xs text-muted-foreground">{entry.classe_fr}</div>
                    </td>
                    {(["c", "f", "p"] as Tense[]).map((tense) => (
                      <td key={tense} className="text-center px-2 py-3">
                        <button
                          onClick={() => setSelected({ entry, tense })}
                          className={`inline-flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all cursor-pointer ${tenseColors[tense]}`}
                        >
                          <span className="font-mandombe text-3xl">{getForm(entry, tense)}</span>
                          <span className="text-[10px] opacity-70">{getForm(entry, tense)}</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="bg-card border-border max-w-md">
          {selected && (() => {
            const { entry, tense } = selected;
            const kif = getKifuani(entry, tense);
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="font-mandombe text-4xl text-foreground">{getForm(entry, tense)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${tenseBadgeColors[tense]}`}>
                      {getTenseLabel(tense)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {language === "en" ? "Pronoun / Noun" : "Pronom / Substantif"}
                    </div>
                    <div className="text-foreground font-medium">
                      <span className="font-mandombe text-2xl mr-2">{entry.classe}</span>
                      <span className="text-muted-foreground">({entry.classe_fr})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {language === "en" ? "Latin form" : "Forme latine"}
                    </div>
                    <div className="text-foreground font-bold tracking-wide text-lg">{getForm(entry, tense)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {language === "en" ? "Translation" : "Traduction"}
                    </div>
                    <div className="text-foreground">{getTranslation(entry, tense)}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Kifuani</div>
                    <div className="font-mandombe text-2xl text-foreground">{kif.mandombe}</div>
                    <div className="text-sm text-foreground/80 italic">{kif.latin}</div>
                    <div className="text-sm text-muted-foreground">{kif.french}</div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VerbeBaSection;
