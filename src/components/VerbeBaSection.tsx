import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ConjEntry {
  classe: string;
  classe_fr: string;
  c: string; f: string; p: string;
  c_tr: string; f_tr: string; p_tr: string;
  c_kil: string; c_lat: string; c_fr: string;
  f_kil: string; f_lat: string; f_fr: string;
  p_kil: string; p_lat: string; p_fr: string;
}

const DATA: ConjEntry[] = [
  {"classe":"yandi","classe_fr":"il / elle","c":"we","f":"wena","p":"weri","c_tr":"il est / elle est (contracté)","f_tr":"il est / elle est","p_tr":"il était / elle était","c_kil":"Yandi wa toma we.","c_lat":"Yandi wa toma we.","c_fr":"Il est beau.","f_kil":"Yandi wa toma wena.","f_lat":"Yandi wa toma wena.","f_fr":"Il est beau.","p_kil":"Yandi wa toma weri.","p_lat":"Yandi wa toma weri.","p_fr":"Il était beau."},
  {"classe":"yandi","classe_fr":"il / elle (locatif)","c":"ke","f":"kena","p":"keri","c_tr":"il est / elle est (contracté, locatif)","f_tr":"il est / elle est (locatif)","p_tr":"il était / elle était (locatif)","c_kil":"Yandi ha zandu ke.","c_lat":"Yandi ha zandu ke.","c_fr":"Lui, il est au marché.","f_kil":"Yandi ha zandu kena.","f_lat":"Yandi ha zandu kena.","f_fr":"Lui, il est au marché.","p_kil":"Yandi ha zandu keri.","p_lat":"Yandi ha zandu keri.","p_fr":"Lui, il était au marché."},
  {"classe":"bantu","classe_fr":"les humains / les personnes","c":"be","f":"bena","p":"beri","c_tr":"ils / elles sont (contracté)","f_tr":"ils / elles sont","p_tr":"ils / elles étaient","c_kil":"Bantu ba toma be.","c_lat":"Bantu ba toma be.","c_fr":"Les humains sont beaux.","f_kil":"Bantu ba toma bena.","f_lat":"Bantu ba toma bena.","f_fr":"Les humains sont beaux.","p_kil":"Bantu ba toma beri.","p_lat":"Bantu ba toma beri.","p_fr":"Les humains étaient beaux."},
  {"classe":"lumbembemba","classe_fr":"papillon","c":"lue","f":"luena","p":"lueri","c_tr":"il est (contracté)","f_tr":"il est","p_tr":"il était","c_kil":"Lumbembemba lua toma lue.","c_lat":"Lumbembemba lua toma lue.","c_fr":"Le papillon est beau.","f_kil":"Lumbembemba lua toma luena.","f_lat":"Lumbembemba lua toma luena.","f_fr":"Le papillon est beau.","p_kil":"Lumbembemba lua toma lueri.","p_lat":"Lumbembemba lua toma lueri.","p_fr":"Le papillon était beau."},
  {"classe":"tumbembemba","classe_fr":"papillons","c":"tue","f":"tuena","p":"tueri","c_tr":"ils sont (contracté)","f_tr":"ils sont","p_tr":"ils étaient","c_kil":"Tumbembemba tua toma tue.","c_lat":"Tumbembemba tua toma tue.","c_fr":"Les papillons sont beaux.","f_kil":"Tumbembemba tua toma tuena.","f_lat":"Tumbembemba tua toma tuena.","f_fr":"Les papillons sont beaux.","p_kil":"Tumbembemba tua toma tueri.","p_lat":"Tumbembemba tua toma tueri.","p_fr":"Les papillons étaient beaux."},
  {"classe":"mapapa","classe_fr":"chaussures","c":"me","f":"mena","p":"meri","c_tr":"elles sont (contracté)","f_tr":"elles sont","p_tr":"elles étaient","c_kil":"Mapapa ma toma me.","c_lat":"Mapapa ma toma me.","c_fr":"Les chaussures sont belles.","f_kil":"Mapapa ma toma mena.","f_lat":"Mapapa ma toma mena.","f_fr":"Les chaussures sont belles.","p_kil":"Mapapa ma toma meri.","p_lat":"Mapapa ma toma meri.","p_fr":"Les chaussures étaient belles."},
  {"classe":"buishi","classe_fr":"le jour","c":"bue","f":"buena","p":"bueri","c_tr":"il est (contracté)","f_tr":"il est","p_tr":"il était","c_kil":"Buishi bua toma bue.","c_lat":"Buishi bua toma bue.","c_fr":"Le jour est beau. Il fait beau.","f_kil":"Buishi bua toma buena.","f_lat":"Buishi bua toma buena.","f_fr":"Le jour est beau. Il fait beau.","p_kil":"Buishi bua toma bueri.","p_lat":"Buishi bua toma bueri.","p_fr":"Le jour était beau. Il faisait beau."},
  {"classe":"binzu","classe_fr":"les marmites","c":"bie","f":"biena","p":"bieri","c_tr":"elles sont (contracté)","f_tr":"elles sont","p_tr":"elles étaient","c_kil":"Binzu bia toma bie.","c_lat":"Binzu bia toma bie.","c_fr":"Les marmites sont belles.","f_kil":"Binzu bia toma biena.","f_lat":"Binzu bia toma biena.","f_fr":"Les marmites sont belles.","p_kil":"Binzu bia toma bieri.","p_lat":"Binzu bia toma bieri.","p_fr":"Les marmites étaient belles."},
  {"classe":"papa","classe_fr":"chaussure","c":"die","f":"diena","p":"dieri","c_tr":"elle est (contracté)","f_tr":"elle est","p_tr":"elle était","c_kil":"Papa dia toma die.","c_lat":"Papa dia toma die.","c_fr":"La chaussure est belle.","f_kil":"Papa dia toma diena.","f_lat":"Papa dia toma diena.","f_fr":"La chaussure est belle.","p_kil":"Papa dia toma dieri.","p_lat":"Papa dia toma dieri.","p_fr":"La chaussure était belle."},
  {"classe":"kinzu","classe_fr":"marmite","c":"kie","f":"kiena","p":"kieri","c_tr":"elle est (contracté)","f_tr":"elle est","p_tr":"elle était","c_kil":"Kinzu kia toma kie.","c_lat":"Kinzu kia toma kie.","c_fr":"La marmite est belle.","f_kil":"Kinzu kia toma kiena.","f_lat":"Kinzu kia toma kiena.","f_fr":"La marmite est belle.","p_kil":"Kinzu kia toma kieri.","p_lat":"Kinzu kia toma kieri.","p_fr":"La marmite était belle."},
  {"classe":"mbua","classe_fr":"chien","c":"ye","f":"yena","p":"yeri","c_tr":"il est (contracté)","f_tr":"il est","p_tr":"il était","c_kil":"Mbua ya toma ye.","c_lat":"Mbua ya toma ye.","c_fr":"Le chien est beau.","f_kil":"Mbua ya toma yena.","f_lat":"Mbua ya toma yena.","f_fr":"Le chien est beau.","p_kil":"Mbua ya toma yeri.","p_lat":"Mbua ya toma yeri.","p_fr":"Le chien était beau."},
  {"classe":"mbua","classe_fr":"chiens","c":"ze","f":"zena","p":"zeri","c_tr":"ils sont (contracté)","f_tr":"ils sont","p_tr":"ils étaient","c_kil":"Mbua za toma ze.","c_lat":"Mbua za toma ze.","c_fr":"Les chiens sont beaux.","f_kil":"Mbua za toma zena.","f_lat":"Mbua za toma zena.","f_fr":"Les chiens sont beaux.","p_kil":"Mbua za toma zeri.","p_lat":"Mbua za toma zeri.","p_fr":"Les chiens étaient beaux."},
  {"classe":"milumba","classe_fr":"lapins","c":"mie","f":"miena","p":"mieri","c_tr":"ils sont (contracté)","f_tr":"ils sont","p_tr":"ils étaient","c_kil":"Milumba mia toma mie.","c_lat":"Milumba mia toma mie.","c_fr":"Les lapins sont beaux.","f_kil":"Milumba mia toma miena.","f_lat":"Milumba mia toma miena.","f_fr":"Les lapins sont beaux.","p_kil":"Milumba mia toma mieri.","p_lat":"Milumba mia toma mieri.","p_fr":"Les lapins étaient beaux."},
  {"classe":"kulu","classe_fr":"pied","c":"kue","f":"kuena","p":"kueri","c_tr":"il est (contracté)","f_tr":"il est","p_tr":"il était","c_kil":"Kulu kua toma kue.","c_lat":"Kulu kua toma kue.","c_fr":"Le pied est beau.","f_kil":"Kulu kua toma kuena.","f_lat":"Kulu kua toma kuena.","f_fr":"Le pied est beau.","p_kil":"Kulu kua toma kueri.","p_lat":"Kulu kua toma kueri.","p_fr":"Le pied était beau."},
  {"classe":"huma","classe_fr":"endroit","c":"he","f":"hena","p":"heri","c_tr":"il est (contracté)","f_tr":"il est","p_tr":"il était","c_kil":"Huma ha toma he.","c_lat":"Huma ha toma he.","c_fr":"L'endroit est beau.","f_kil":"Huma ha toma hena.","f_lat":"Huma ha toma hena.","f_fr":"L'endroit est beau.","p_kil":"Huma ha toma heri.","p_lat":"Huma ha toma heri.","p_fr":"L'endroit était beau."},
];

type Tense = "c" | "f" | "p";

const tenseColors: Record<Tense, string> = {
  c: "bg-amber-500/30 text-amber-300 border-amber-400/50 hover:bg-amber-500/40",
  f: "bg-emerald-500/30 text-emerald-300 border-emerald-400/50 hover:bg-emerald-500/40",
  p: "bg-blue-500/30 text-blue-300 border-blue-400/50 hover:bg-blue-500/40",
};

const tenseBadgeColors: Record<Tense, string> = {
  c: "bg-amber-500/30 text-amber-300",
  f: "bg-emerald-500/30 text-emerald-300",
  p: "bg-blue-500/30 text-blue-300",
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
                <div className={`w-3 h-3 rounded-full ${t === "c" ? "bg-amber-400" : t === "f" ? "bg-emerald-400" : "bg-blue-400"}`} />
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
                  <th className="text-center px-4 py-3 text-amber-400 font-medium">{getTenseLabel("c")}</th>
                  <th className="text-center px-4 py-3 text-emerald-300 font-medium">{getTenseLabel("f")}</th>
                  <th className="text-center px-4 py-3 text-blue-300 font-medium">{getTenseLabel("p")}</th>
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
