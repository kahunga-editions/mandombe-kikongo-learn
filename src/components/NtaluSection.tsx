import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NtaluEntry {
  classe: string;
  classe_label: string;
  exemple: string;
  exemple_fr: string;
  pluriel?: string;
  pluriel_fr?: string;
  nums: {
    [key: string]: {
      form: string;
      kif_kil: string;
      kif_lat: string;
      kif_fr: string;
    } | null;
  };
}

const DATA: NtaluEntry[] = [
  {
    classe: "mu/ba", classe_label: "Classe mu/ba", exemple: "muntu", exemple_fr: "personne", pluriel: "bantu", pluriel_fr: "personnes",
    nums: {
      "1": { form: "mu moshi", kif_kil: "Muntu mu moshi ku nsaba we.", kif_lat: "Muntu mu moshi ku nsaba we.", kif_fr: "Une seule personne est au jardin." },
      "2": { form: "bole", kif_kil: "Bantu bole ku nsaba be.", kif_lat: "Bantu bole ku nsaba be.", kif_fr: "Les deux personnes sont au jardin." },
      "3": { form: "ba tatu", kif_kil: "Bantu ba tatu ku nsaba be.", kif_lat: "Bantu ba tatu ku nsaba be.", kif_fr: "Trois personnes sont au jardin." },
      "4": { form: "ba ya", kif_kil: "Bantu ba ya ku nsaba be.", kif_lat: "Bantu ba ya ku nsaba be.", kif_fr: "Quatre personnes sont au jardin." },
      "5": { form: "ba tanu", kif_kil: "Bantu ba tanu ku nsaba be.", kif_lat: "Bantu ba tanu ku nsaba be.", kif_fr: "Cinq personnes sont au jardin." },
      "35": { form: "makumatatu na ba tanu", kif_kil: "Bantu makumatatu na ba tanu ku nsaba be.", kif_lat: "Bantu makumatatu na ba tanu ku nsaba be.", kif_fr: "Trente-cinq personnes sont au jardin." },
    }
  },
  {
    classe: "mu/mi", classe_label: "Classe mu/mi", exemple: "mulele", exemple_fr: "pagne", pluriel: "milele", pluriel_fr: "pagnes",
    nums: {
      "1": null,
      "2": { form: "miole", kif_kil: "Milele miole ku nsaba mie.", kif_lat: "Milele miole ku nsaba mie.", kif_fr: "Deux pagnes sont au jardin." },
      "3": { form: "mi tatu", kif_kil: "Milele mi tatu ku nsaba mie.", kif_lat: "Milele mi tatu ku nsaba mie.", kif_fr: "Trois pagnes sont au jardin." },
      "4": { form: "mi ya", kif_kil: "Milele mi ya ku nsaba mie.", kif_lat: "Milele mi ya ku nsaba mie.", kif_fr: "Quatre pagnes sont au jardin." },
      "5": { form: "mi tanu", kif_kil: "Milele mi tanu ku nsaba mie.", kif_lat: "Milele mi tanu ku nsaba mie.", kif_fr: "Cinq pagnes sont au jardin." },
      "35": { form: "makumatatu na mi tanu", kif_kil: "Milele makumatatu na mi tanu ku nsaba mie.", kif_lat: "Milele makumatatu na mi tanu ku nsaba mie.", kif_fr: "Trente-cinq pagnes sont au jardin." },
    }
  },
  {
    classe: "di/ma", classe_label: "Classe di/ma", exemple: "ba", exemple_fr: "palmier", pluriel: "maba", pluriel_fr: "palmiers",
    nums: {
      "1": { form: "di moshi", kif_kil: "Ba di moshi ku nsaba die.", kif_lat: "Ba di moshi ku nsaba die.", kif_fr: "Un seul palmier est au jardin." },
      "2": { form: "mole", kif_kil: "Maba mole ku nsaba me.", kif_lat: "Maba mole ku nsaba me.", kif_fr: "Deux palmiers sont au jardin." },
      "3": { form: "ma tatu", kif_kil: "Maba ma tatu ku nsaba me.", kif_lat: "Maba ma tatu ku nsaba me.", kif_fr: "Trois palmiers sont au jardin." },
      "4": { form: "ma ya", kif_kil: "Maba ma ya ku nsaba me.", kif_lat: "Maba ma ya ku nsaba me.", kif_fr: "Quatre palmiers sont au jardin." },
      "5": { form: "ma tanu", kif_kil: "Maba ma tanu ku nsaba me.", kif_lat: "Maba ma tanu ku nsaba me.", kif_fr: "Cinq palmiers sont au jardin." },
      "35": { form: "makumatatu na ma tanu", kif_kil: "Maba makumatatu na ma tanu ku nsaba me.", kif_lat: "Maba makumatatu na ma tanu ku nsaba me.", kif_fr: "Trente-cinq palmiers sont au jardin." },
    }
  },
  {
    classe: "ki/bi", classe_label: "Classe ki/bi", exemple: "kifulu", exemple_fr: "chaise", pluriel: "bifulu", pluriel_fr: "chaises",
    nums: {
      "1": { form: "ki moshi", kif_kil: "Kifulu ki moshi ku nsaba kie.", kif_lat: "Kifulu ki moshi ku nsaba kie.", kif_fr: "Une seule chaise est au jardin." },
      "2": { form: "biole", kif_kil: "Bifulu biole ku nsaba bie.", kif_lat: "Bifulu biole ku nsaba bie.", kif_fr: "Deux chaises sont au jardin." },
      "3": { form: "bi tatu", kif_kil: "Bifulu bi tatu ku nsaba bie.", kif_lat: "Bifulu bi tatu ku nsaba bie.", kif_fr: "Trois chaises sont au jardin." },
      "4": { form: "bi ya", kif_kil: "Bifulu bi ya ku nsaba bie.", kif_lat: "Bifulu bi ya ku nsaba bie.", kif_fr: "Quatre chaises sont au jardin." },
      "5": { form: "bi tanu", kif_kil: "Bifulu bi tanu ku nsaba bie.", kif_lat: "Bifulu bi tanu ku nsaba bie.", kif_fr: "Cinq chaises sont au jardin." },
      "35": { form: "makumatatu na bi tanu", kif_kil: "Bifulu makumatatu na bi tanu ku nsaba bie.", kif_lat: "Bifulu makumatatu na bi tanu ku nsaba bie.", kif_fr: "Trente-cinq chaises sont au jardin." },
    }
  },
  {
    classe: "n'", classe_label: "Classe n'", exemple: "ngo", exemple_fr: "panthère", pluriel: "ngo", pluriel_fr: "panthères",
    nums: {
      "1": { form: "moshi", kif_kil: "Ngo moshi ku nsaba ye.", kif_lat: "Ngo moshi ku nsaba ye.", kif_fr: "Une panthère est au jardin." },
      "2": { form: "zole", kif_kil: "Ngo zole ku nsaba ze.", kif_lat: "Ngo zole ku nsaba ze.", kif_fr: "Deux panthères sont au jardin." },
      "3": { form: "tatu", kif_kil: "Ngo tatu ku nsaba ze.", kif_lat: "Ngo tatu ku nsaba ze.", kif_fr: "Trois panthères sont au jardin." },
      "4": { form: "ya", kif_kil: "Ngo ya ku nsaba ze.", kif_lat: "Ngo ya ku nsaba ze.", kif_fr: "Quatre panthères sont au jardin." },
      "5": { form: "tanu", kif_kil: "Ngo tanu ku nsaba ze.", kif_lat: "Ngo tanu ku nsaba ze.", kif_fr: "Cinq panthères sont au jardin." },
      "35": { form: "makumatatu na tanu", kif_kil: "Ngo makumatatu na tanu ku nsaba ze.", kif_lat: "Ngo makumatatu na tanu ku nsaba ze.", kif_fr: "Trente-cinq panthères sont au jardin." },
    }
  },
  {
    classe: "lu/tu", classe_label: "Classe lu/tu", exemple: "lumbembemba", exemple_fr: "papillon", pluriel: "tumpungunzala", pluriel_fr: "papillons",
    nums: {
      "1": { form: "lu moshi", kif_kil: "Lumbembemba lu moshi ku nsaba lue.", kif_lat: "Lumbembemba lu moshi ku nsaba lue.", kif_fr: "Un seul papillon est au jardin." },
      "2": { form: "tuole", kif_kil: "Tumpungunzala tuole ku nsaba tue.", kif_lat: "Tumpungunzala tuole ku nsaba tue.", kif_fr: "Deux papillons sont au jardin." },
      "3": { form: "tu tatu", kif_kil: "Tumpungunzala tu tatu ku nsaba tue.", kif_lat: "Tumpungunzala tu tatu ku nsaba tue.", kif_fr: "Trois papillons sont au jardin." },
      "4": { form: "tu ya", kif_kil: "Tumpungunzala tu ya ku nsaba tue.", kif_lat: "Tumpungunzala tu ya ku nsaba tue.", kif_fr: "Quatre papillons sont au jardin." },
      "5": { form: "tu tanu", kif_kil: "Tumpungunzala tu tanu ku nsaba tue.", kif_lat: "Tumpungunzala tu tanu ku nsaba tue.", kif_fr: "Cinq papillons sont au jardin." },
      "35": { form: "makumatatu na tu tanu", kif_kil: "Tumpungunzala makumatatu na tu tanu ku nsaba tue.", kif_lat: "Tumpungunzala makumatatu na tu tanu ku nsaba tue.", kif_fr: "Trente-cinq papillons sont au jardin." },
    }
  },
  {
    classe: "bu", classe_label: "Classe bu", exemple: "buatu", exemple_fr: "pirogue", pluriel: "matu", pluriel_fr: "pirogues",
    nums: {
      "1": { form: "bu moshi", kif_kil: "Buatu bu moshi ku mamba bue.", kif_lat: "Buatu bu moshi ku mamba bue.", kif_fr: "Une seule pirogue est sur l'eau." },
      "2": null, "3": null, "4": null, "5": null, "35": null,
    }
  },
  {
    classe: "ku", classe_label: "Classe ku", exemple: "koko", exemple_fr: "main",
    nums: {
      "1": { form: "ku moshi", kif_kil: "Koko ku moshi kue.", kif_lat: "Koko ku moshi kue.", kif_fr: "Une seule main." },
      "2": null, "3": null, "4": null, "5": null, "35": null,
    }
  },
];

const NUM_KEYS = ["1", "2", "3", "4", "5", "35"];

const numPalette: Record<string, { bg: string; border: string; dot: string }> = {
  "1":  { bg: "#fea347", border: "#e8922e", dot: "#d07b1a" },
  "2":  { bg: "#f88e55", border: "#e07a3e", dot: "#c56a2e" },
  "3":  { bg: "#ffcb60", border: "#e6b44a", dot: "#c89a30" },
  "4":  { bg: "#ffdab9", border: "#e6c4a0", dot: "#c8a880" },
  "5":  { bg: "#f5c1b4", border: "#d9a89a", dot: "#b8887a" },
  "35": { bg: "#e8a090", border: "#d08878", dot: "#b07060" },
};

const TEXT_COLOR = "#5a3e2b";

const NtaluSection = () => {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<{ entry: NtaluEntry; numKey: string } | null>(null);

  return (
    <section id="ntalu" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
            NTALU · {language === "en" ? "Number agreement in Kilari" : language === "pt" ? "Acordo numérico em Kilari" : "L'accord des nombres en Kilari"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === "en"
              ? "Click on a number form to see the example (kifuani)"
              : language === "pt"
              ? "Clique em uma forma numérica para ver o exemplo (kifuani)"
              : "Cliquez sur une forme numérique pour voir le kifuani (exemple)"}
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6">
            {NUM_KEYS.map((k) => (
              <div key={k} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${dotColors[k]}`} />
                <span className="text-sm text-muted-foreground">{k}</span>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">
                    {language === "en" ? "Noun class" : language === "pt" ? "Classe nominal" : "Classe nominale"}
                  </th>
                  {NUM_KEYS.map((k) => (
                    <th key={k} className="text-center px-4 py-3">
                      <span className="font-mandombe text-2xl text-gold block mb-1">{k}</span>
                      <span className="text-muted-foreground font-medium text-xs">{k}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DATA.map((entry, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3">
                      <div className="font-bold text-foreground">{entry.classe}</div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-mandombe text-lg">{entry.exemple}</span>
                        {entry.pluriel && <> / <span className="font-mandombe text-lg">{entry.pluriel}</span></>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.exemple_fr}{entry.pluriel_fr && ` / ${entry.pluriel_fr}`}
                      </div>
                    </td>
                    {NUM_KEYS.map((numKey) => {
                      const cell = entry.nums[numKey];
                      if (!cell) return <td key={numKey} className="text-center px-2 py-3 text-muted-foreground/30">—</td>;
                      return (
                        <td key={numKey} className="text-center px-2 py-3">
                          <button
                            onClick={() => setSelected({ entry, numKey })}
                            className={`inline-flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all cursor-pointer ${numColors[numKey]}`}
                          >
                            <span className="font-mandombe text-xl">{cell.form}</span>
                            <span className="text-[10px] opacity-70">{cell.form}</span>
                          </button>
                        </td>
                      );
                    })}
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
            const { entry, numKey } = selected;
            const cell = entry.nums[numKey];
            if (!cell) return null;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="font-mandombe text-3xl text-foreground">{cell.form}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${numBadgeColors[numKey]}`}>
                      {numKey}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {language === "en" ? "Noun class" : "Classe nominale"}
                    </div>
                    <div className="text-foreground font-medium">
                      {entry.classe} — {entry.exemple} ({entry.exemple_fr})
                      {entry.pluriel && <> / {entry.pluriel} ({entry.pluriel_fr})</>}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      {language === "en" ? "Number form" : "Forme numérique"}
                    </div>
                    <div className="text-foreground font-bold tracking-wide text-lg">{cell.form}</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Kifuani</div>
                    <div className="font-mandombe text-2xl text-foreground">{cell.kif_kil}</div>
                    <div className="text-sm text-foreground/80 italic">{cell.kif_lat}</div>
                    <div className="text-sm text-muted-foreground">{cell.kif_fr}</div>
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

export default NtaluSection;
