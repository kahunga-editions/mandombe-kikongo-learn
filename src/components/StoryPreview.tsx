import PremiumGate from "@/components/PremiumGate";

const StoryPreview = () => {
  return (
    <section id="stories" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl text-primary/60 mb-4">Binsamu</p>
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            Binsamu — Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn Through Stories
          </h2>
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-2xl border border-border overflow-hidden">
          {/* Story header */}
          <div className="bg-earth-deep p-6">
            <p className="font-mandombe text-3xl md:text-4xl text-gold/50 mb-4">
              Nsayi ku nzo mikanda na sangi
            </p>
            <h3 className="font-display text-2xl font-bold text-gold mb-1">
              Nsayi à l'école et à la forêt
            </h3>
            <p className="text-cream/80 text-sm mb-1">Nsayi at School and in the Forest</p>
            <p className="text-cream/60 text-xs">A bilingual story — French & Kikongo Lari</p>
          </div>

          {/* Free excerpt */}
          <div className="p-8 space-y-8">
            <StoryExcerpt
              mandombe="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
              lari="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
              french="Il était une fois, dans le Kongo, il y a très longtemps, une petite fille nommée Nsayi et sa meilleure amie Sunda."
              english="Once upon a time, in the Kongo, long ago, a little girl named Nsayi and her best friend Sunda."
            />
            <StoryExcerpt
              mandombe="Nsayi nzo mikanda ya ka tomo zolo."
              lari="Nsayi nzo mikanda ya ka tomo zolo."
              french="Nsayi était une petite fille qui aimait beaucoup l'école."
              english="Nsayi was a little girl who loved school very much."
            />
            <StoryExcerpt
              mandombe="Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu."
              lari="Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu."
              french="Elle adorait lire des livres et écrire des histoires."
              english="She loved reading books and writing stories."
            />
          </div>

          {/* Premium continuation */}
          <div className="px-8 pb-8">
            <PremiumGate label="Continue Nsayi's Story">
              <div className="space-y-8">
                <StoryExcerpt
                  mandombe="Lumbu moshi, Nsayi na Sunda ba kwenda ku sangi. Ba mona miti ya nene na bifulu bia mbote."
                  lari="Lumbu moshi, Nsayi na Sunda ba kwenda ku sangi. Ba mona miti ya nene na bifulu bia mbote."
                  french="Un jour, Nsayi et Sunda partirent dans la forêt. Elles virent de grands arbres et de belles fleurs."
                  english="One day, Nsayi and Sunda went into the forest. They saw tall trees and beautiful flowers."
                />
                <StoryExcerpt
                  mandombe="Mu sangi, ba kumana na nkaka muntu ya ntinu. Ka yambula zawu: 'Beno, bala bami, meno ni zolele ku longa beno.'"
                  lari="Mu sangi, ba kumana na nkaka muntu ya ntinu. Ka yambula zawu: 'Beno, bala bami, meno ni zolele ku longa beno.'"
                  french="Dans la forêt, elles rencontrèrent un ancien sage. Il leur dit: 'Mes enfants, je veux vous enseigner.'"
                  english="In the forest, they met a wise elder. He told them: 'My children, I want to teach you.'"
                />
                <StoryExcerpt
                  mandombe="Nkaka ka longa zawu ma nkumbu ya miti na binyama. 'Tala muti yai,' ka tubidi, 'nkumbu andi Nsanda — muti ya longo.'"
                  lari="Nkaka ka longa zawu ma nkumbu ya miti na binyama. 'Tala muti yai,' ka tubidi, 'nkumbu andi Nsanda — muti ya longo.'"
                  french="L'ancien leur enseigna les noms des arbres et des animaux. 'Regardez cet arbre,' dit-il, 'son nom est Nsanda — l'arbre sacré.'"
                  english="The elder taught them the names of trees and animals. 'Look at this tree,' he said, 'its name is Nsanda — the sacred tree.'"
                />
                <StoryExcerpt
                  mandombe="Nsayi ka vanga kiese: 'Matondo nkaka! Meno mbo ni tanga mpe ni soneka binsamu ya sangi yai.'"
                  lari="Nsayi ka vanga kiese: 'Matondo nkaka! Meno mbo ni tanga mpe ni soneka binsamu ya sangi yai.'"
                  french="Nsayi s'exclama joyeusement: 'Merci grand-père! Je lirai et j'écrirai des histoires sur cette forêt.'"
                  english="Nsayi exclaimed joyfully: 'Thank you grandfather! I will read and write stories about this forest.'"
                />
                <StoryExcerpt
                  mandombe="Na mpimpa, Nsayi na Sunda ba vutuka ku nzo. Nsayi ka lala na ndoto ya mbote — ndoto ya sangi, ya miti, na ya nkaka ya ntinu."
                  lari="Na mpimpa, Nsayi na Sunda ba vutuka ku nzo. Nsayi ka lala na ndoto ya mbote — ndoto ya sangi, ya miti, na ya nkaka ya ntinu."
                  french="Le soir, Nsayi et Sunda rentrèrent à la maison. Nsayi s'endormit avec de beaux rêves — des rêves de la forêt, des arbres et du sage ancien."
                  english="In the evening, Nsayi and Sunda returned home. Nsayi fell asleep with beautiful dreams — dreams of the forest, the trees, and the wise elder."
                />
              </div>
            </PremiumGate>
          </div>
        </div>
      </div>
    </section>
  );
};

const StoryExcerpt = ({
  mandombe,
  lari,
  french,
  english,
}: {
  mandombe: string;
  lari: string;
  french: string;
  english: string;
}) => (
  <div className="space-y-3">
    <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
      <p className="font-mandombe text-base text-primary/40 mb-3">{mandombe}</p>
      <p className="font-display text-lg text-foreground italic">{lari}</p>
    </div>
    <p className="text-muted-foreground pl-4">
      <span className="font-semibold text-foreground">FR:</span> {french}
    </p>
    <p className="text-muted-foreground pl-4">
      <span className="font-semibold text-foreground">EN:</span> {english}
    </p>
  </div>
);

export default StoryPreview;
