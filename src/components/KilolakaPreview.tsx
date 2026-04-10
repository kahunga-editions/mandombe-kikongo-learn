import { useState } from "react";
import PremiumGate from "@/components/PremiumGate";
import { useLanguage } from "@/contexts/LanguageContext";

const KilolakaPreview = () => {
  const { t } = useLanguage();
  const [showGrid, setShowGrid] = useState(false);

  return (
    <section id="kilolaka" className="py-24 bg-earth-deep">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl text-gold/50 mb-4">Kilolaka</p>
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">{t("kilolaka.eyebrow")}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">{t("kilolaka.title")}</h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            {t("kilolaka.subtitle")}
          </p>
        </div>

        {/* Free preview: Ki-Lo-La-Ka + B-Series */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <p className="font-mandombe text-xl text-gold/40 mb-3">Ki-Lo-La-Ka</p>
            <h3 className="font-display text-2xl font-bold text-gold mb-6">Ki–Lo–La–Ka</h3>
            <div className="space-y-4">
              {[
                { syllable: "Ki", key: "ki" },
                { syllable: "Lo", key: "lo" },
                { syllable: "La", key: "la" },
                { syllable: "Ka", key: "ka" },
              ].map((item) => (
                <div key={item.syllable} className="flex gap-4 items-start">
                  <div className="min-w-[60px] text-center">
                    <span className="font-mandombe text-3xl text-gold block mb-2">{item.syllable}</span>
                    <span className="font-display text-3xl font-bold text-gold">{item.syllable}</span>
                  </div>
                  <p className="text-cream/80 pt-2 text-sm leading-relaxed">{t(`${item.key}.meaning`)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <h3 className="font-display text-2xl font-bold text-gold mb-6">{t("kilolaka.bSeries")}</h3>
            <div className="space-y-3">
              {[
                { morpheme: "Bi", key: "bi" },
                { morpheme: "Bu", key: "bu" },
                { morpheme: "Be", key: "be" },
                { morpheme: "Bo", key: "bo" },
                { morpheme: "Ba", key: "ba" },
              ].map((item) => (
                <div key={item.morpheme} className="flex items-center gap-4 bg-cream/5 rounded-lg px-4 py-3">
                  <div className="min-w-[40px] text-center">
                    <span className="font-mandombe text-2xl text-terracotta-light block mb-2">{item.morpheme}</span>
                    <span className="font-display text-xl font-bold text-terracotta-light">{item.morpheme}</span>
                  </div>
                  <p className="text-cream/80 text-sm">{t(`${item.key}.meaning`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium: F, D, G series */}
        <div className="max-w-4xl mx-auto mt-8">
          <PremiumGate label={t("kilolaka.advanced")}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* F-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <h3 className="font-display text-xl font-bold text-gold mb-4">{t("kilolaka.fSeries")}</h3>
                <div className="space-y-3">
                  {["fi", "fu", "fe", "fo", "fa"].map((key) => (
                    <div key={key} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-2xl text-gold block mb-2">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                        <span className="font-display text-lg font-bold text-gold">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{t(`${key}.meaning`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* D-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <h3 className="font-display text-xl font-bold text-gold mb-4">{t("kilolaka.dSeries")}</h3>
                <div className="space-y-3">
                  {["di", "du", "de", "do", "da"].map((key) => (
                    <div key={key} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-2xl text-gold block mb-2">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                        <span className="font-display text-lg font-bold text-gold">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{t(`${key}.meaning`)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* G-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <h3 className="font-display text-xl font-bold text-gold mb-4">{t("kilolaka.gSeries")}</h3>
                <div className="space-y-3">
                  {["gi", "gu", "ge", "go", "ga"].map((key) => (
                    <div key={key} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-2xl text-gold block mb-2">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                        <span className="font-display text-lg font-bold text-gold">{key.charAt(0).toUpperCase() + key.charAt(1)}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{t(`${key}.meaning`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PremiumGate>
        </div>

        {/* Interactive Kilolaka Grid */}
        <div className="max-w-6xl mx-auto mt-12 text-center">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fef86c]/20 to-[#fea9af]/20 border border-gold/30 rounded-xl text-gold font-display text-lg font-bold hover:from-[#fef86c]/30 hover:to-[#fea9af]/30 transition-all duration-300"
          >
            <span className="font-mandombe text-2xl">Kilolaka</span>
            <span>{showGrid ? "▲ Fermer" : "▼ Explorer la Grille complète du Kilolaka"}</span>
          </button>

          {showGrid && (
            <div className="mt-6 rounded-xl overflow-hidden border border-gold/20" style={{ height: '70vh' }}>
              <iframe
                src="/kilolaka_grille.html"
                title="Grille interactive du Kilolaka"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KilolakaPreview;
