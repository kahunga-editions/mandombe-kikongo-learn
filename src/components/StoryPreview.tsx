const StoryPreview = () => {
  return (
    <section id="stories" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            Binsamu — Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn Through Stories
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-2xl border border-border overflow-hidden">
          <div className="bg-earth-deep p-6">
            <h3 className="font-display text-2xl font-bold text-gold mb-1">
              Nsayi à l'école et à la forêt
            </h3>
            <p className="text-cream/70 text-sm">
              A bilingual story — French & Kikongo Lari
            </p>
          </div>
          <div className="p-8 space-y-8">
            {/* Excerpt 1 */}
            <div className="space-y-3">
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-display text-lg text-foreground italic">
                  Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana
                  n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda.
                </p>
              </div>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">FR:</span> Il
                était une fois, dans le Kongo, il y a très longtemps, une petite
                fille nommée Nsayi et sa meilleure amie Sunda.
              </p>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">EN:</span> Once
                upon a time, in the Kongo, long ago, a little girl named Nsayi
                and her best friend Sunda.
              </p>
            </div>

            {/* Excerpt 2 */}
            <div className="space-y-3">
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-display text-lg text-foreground italic">
                  Nsayi nzo mikanda ya ka tomo zolo.
                </p>
              </div>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">FR:</span> Nsayi
                était une petite fille qui aimait beaucoup l'école.
              </p>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">EN:</span> Nsayi
                was a little girl who loved school very much.
              </p>
            </div>

            {/* Excerpt 3 */}
            <div className="space-y-3">
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="font-display text-lg text-foreground italic">
                  Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka
                  binsamu.
                </p>
              </div>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">FR:</span> Elle
                adorait lire des livres et écrire des histoires.
              </p>
              <p className="text-muted-foreground pl-4">
                <span className="font-semibold text-foreground">EN:</span> She
                loved reading books and writing stories.
              </p>
            </div>
          </div>
          <div className="bg-muted/50 px-8 py-4 text-center">
            <a href="#premium" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Read the full story →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryPreview;
