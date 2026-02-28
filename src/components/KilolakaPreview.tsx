import PremiumGate from "@/components/PremiumGate";

const KilolakaPreview = () => {
  return (
    <section id="kilolaka" className="py-24 bg-earth-deep">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl text-gold/50 mb-4">Kilolaka</p>
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">Deep Knowledge</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Kilolaka</h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            The art of decomposing Kikongo into sacred consciousness — where every syllable is an energetic code.
          </p>
        </div>

        {/* Free preview: Ki-Lo-La-Ka + B-Series */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <p className="font-mandombe text-xl text-gold/40 mb-3">Ki-Lo-La-Ka</p>
            <h3 className="font-display text-2xl font-bold text-gold mb-6">Ki–Lo–La–Ka</h3>
            <div className="space-y-4">
              {[
                { syllable: "Ki", meaning: "Inner energy — the origin vibration" },
                { syllable: "Lo", meaning: "Ascensional deep knowledge" },
                { syllable: "La", meaning: "Manifested deep knowledge" },
                { syllable: "Ka", meaning: "Manifested energy — vibration becomes form" },
              ].map((item) => (
                <div key={item.syllable} className="flex gap-4 items-start">
                  <div className="min-w-[60px] text-center">
                    <span className="font-mandombe text-lg text-gold/40 block mb-1">{item.syllable}</span>
                    <span className="font-display text-3xl font-bold text-gold">{item.syllable}</span>
                  </div>
                  <p className="text-cream/80 pt-2 text-sm leading-relaxed">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <p className="font-mandombe text-xl text-terracotta-light/40 mb-3">B-Series</p>
            <h3 className="font-display text-2xl font-bold text-gold mb-6">B-Series: States of Being</h3>
            <div className="space-y-3">
              {[
                { morpheme: "Bi", meaning: "Inner being" },
                { morpheme: "Bu", meaning: "Being who begets life" },
                { morpheme: "Be", meaning: "Being who receives life" },
                { morpheme: "Bo", meaning: "Ascentional being" },
                { morpheme: "Ba", meaning: "Manifested being" },
              ].map((item) => (
                <div key={item.morpheme} className="flex items-center gap-4 bg-cream/5 rounded-lg px-4 py-3">
                  <div className="min-w-[40px] text-center">
                    <span className="font-mandombe text-sm text-terracotta-light/40 block mb-1">{item.morpheme}</span>
                    <span className="font-display text-xl font-bold text-terracotta-light">{item.morpheme}</span>
                  </div>
                  <p className="text-cream/80 text-sm">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Premium: F, D, G series */}
        <div className="max-w-4xl mx-auto mt-8">
          <PremiumGate label="Advanced Kilolaka Modules">
            <div className="grid md:grid-cols-3 gap-6">
              {/* F-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <p className="font-mandombe text-xl text-gold/40 mb-3">F-Series</p>
                <h3 className="font-display text-xl font-bold text-gold mb-4">F-Series: Rebirth</h3>
                <div className="space-y-3">
                  {[
                    { morpheme: "Fi", meaning: "Inner rebirth — hidden renewal" },
                    { morpheme: "Fu", meaning: "Rebirth that generates" },
                    { morpheme: "Fe", meaning: "Rebirth that receives" },
                    { morpheme: "Fo", meaning: "Ascending rebirth" },
                    { morpheme: "Fa", meaning: "Manifested rebirth" },
                  ].map((item) => (
                    <div key={item.morpheme} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-sm text-gold/40 block mb-1">{item.morpheme}</span>
                        <span className="font-display text-lg font-bold text-gold">{item.morpheme}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* D-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <p className="font-mandombe text-xl text-gold/40 mb-3">D-Series</p>
                <h3 className="font-display text-xl font-bold text-gold mb-4">D-Series: Solar Energy & Speed of Light</h3>
                <div className="space-y-3">
                  {[
                    { morpheme: "Di", meaning: "Inner solar energy — essence of light" },
                    { morpheme: "Du", meaning: "Solar energy that creates" },
                    { morpheme: "De", meaning: "Solar energy that absorbs" },
                    { morpheme: "Do", meaning: "Ascending solar energy" },
                    { morpheme: "Da", meaning: "Manifested solar energy" },
                  ].map((item) => (
                    <div key={item.morpheme} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-sm text-gold/40 block mb-1">{item.morpheme}</span>
                        <span className="font-display text-lg font-bold text-gold">{item.morpheme}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* G-Series */}
              <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
                <p className="font-mandombe text-xl text-gold/40 mb-3">G-Series</p>
                <h3 className="font-display text-xl font-bold text-gold mb-4">G-Series: The Element that Begets Life</h3>
                <div className="space-y-3">
                  {[
                    { morpheme: "Gi", meaning: "Inner life element — seed of existence" },
                    { morpheme: "Gu", meaning: "Life element that begets" },
                    { morpheme: "Ge", meaning: "Life element that nurtures" },
                    { morpheme: "Go", meaning: "Ascending life element" },
                    { morpheme: "Ga", meaning: "Manifested life element" },
                  ].map((item) => (
                    <div key={item.morpheme} className="flex items-center gap-3 bg-cream/5 rounded-lg px-3 py-2">
                      <div className="min-w-[40px] text-center">
                        <span className="font-mandombe text-sm text-gold/40 block mb-1">{item.morpheme}</span>
                        <span className="font-display text-lg font-bold text-gold">{item.morpheme}</span>
                      </div>
                      <p className="text-cream/80 text-xs">{item.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PremiumGate>
        </div>
      </div>
    </section>
  );
};

export default KilolakaPreview;
