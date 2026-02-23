const KilolakaPreview = () => {
  return (
    <section id="kilolaka" className="py-24 bg-earth-deep">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl text-gold/50 mb-4">Kilolaka</p>
          <p className="text-gold font-body text-sm tracking-[0.25em] uppercase mb-3">
            Deep Knowledge
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Kilolaka
          </h2>
          <p className="text-cream/70 max-w-2xl mx-auto text-lg">
            The art of decomposing Kikongo into sacred consciousness — where
            every syllable is an energetic code.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Syllable breakdown */}
          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <p className="font-mandombe text-xl text-gold/40 mb-3">Ki-Lo-La-Ka</p>
            <h3 className="font-display text-2xl font-bold text-gold mb-6">
              Ki–Lo–La–Ka
            </h3>
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
                    <span className="font-display text-3xl font-bold text-gold">
                      {item.syllable}
                    </span>
                  </div>
                  <p className="text-cream/80 pt-2 text-sm leading-relaxed">
                    {item.meaning}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Morpheme table */}
          <div className="bg-cream/5 backdrop-blur rounded-xl p-8 border border-gold/20">
            <p className="font-mandombe text-xl text-terracotta-light/40 mb-3">B-Series</p>
            <h3 className="font-display text-2xl font-bold text-gold mb-6">
              B-Series: States of Being
            </h3>
            <div className="space-y-3">
              {[
                { morpheme: "Bi", meaning: "Inner being" },
                { morpheme: "Bu", meaning: "Being who begets life" },
                { morpheme: "Be", meaning: "Being who receives life" },
                { morpheme: "Bo", meaning: "Ascentional being" },
                { morpheme: "Ba", meaning: "Manifested being" },
              ].map((item) => (
                <div
                  key={item.morpheme}
                  className="flex items-center gap-4 bg-cream/5 rounded-lg px-4 py-3"
                >
                  <div className="min-w-[40px] text-center">
                    <span className="font-mandombe text-sm text-terracotta-light/40 block mb-1">{item.morpheme}</span>
                    <span className="font-display text-xl font-bold text-terracotta-light">
                      {item.morpheme}
                    </span>
                  </div>
                  <p className="text-cream/80 text-sm">{item.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="#premium"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors"
          >
            Explore the full Kilolaka system →
          </a>
        </div>
      </div>
    </section>
  );
};

export default KilolakaPreview;
