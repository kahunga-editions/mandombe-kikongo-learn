import PremiumGate from "@/components/PremiumGate";
import storyPanel1 from "@/assets/story-panel-1.jpg";
import storyPanel2 from "@/assets/story-panel-2.jpg";
import storyPanel3 from "@/assets/story-panel-3.jpg";
import storyPanel4 from "@/assets/story-panel-4.jpg";
import storyPanel5 from "@/assets/story-panel-5.jpg";
import storyPanel6 from "@/assets/story-panel-6.jpg";

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

        <div className="max-w-5xl mx-auto">
          {/* Story title card */}
          <div className="bg-earth-deep rounded-t-2xl p-6 md:p-8 border border-border border-b-0">
            <p className="font-mandombe text-3xl md:text-4xl text-gold/50 mb-4">
              Nsayi ku nzo mikanda na sangi
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gold mb-1">
              Nsayi à l'école et à la forêt
            </h3>
            <p className="text-cream/80 text-sm mb-1">Nsayi at School and in the Forest</p>
            <p className="text-cream/60 text-xs">A bilingual comic story — French & Kikongo Lari</p>
          </div>

          {/* Comic strip panels */}
          <div className="bg-background border border-border border-t-0 rounded-b-2xl overflow-hidden">
            {/* FREE: Panels 1-3 */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Panel 1 – Introduction */}
              <ComicPanel
                image={storyPanel1}
                panelNumber={1}
                layout="wide"
                mandombe="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
                lari="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
                french="Il était une fois, dans le Kongo, il y a très longtemps, une petite fille nommée Nsayi et sa meilleure amie Sunda."
                english="Once upon a time, in the Kongo, long ago, a little girl named Nsayi and her best friend Sunda."
              />

              {/* Panel 2 – School */}
              <ComicPanel
                image={storyPanel2}
                panelNumber={2}
                layout="right"
                mandombe="Nsayi nzo mikanda ya ka tomo zolo. Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu."
                lari="Nsayi nzo mikanda ya ka tomo zolo. Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu."
                french="Nsayi était une petite fille qui aimait beaucoup l'école. Elle adorait lire des livres et écrire des histoires."
                english="Nsayi was a little girl who loved school very much. She loved reading books and writing stories."
              />

              {/* Panel 3 – Entering the forest */}
              <ComicPanel
                image={storyPanel3}
                panelNumber={3}
                layout="left"
                mandombe="Lumbu moshi, Nsayi na Sunda ba kwenda ku sangi. Ba mona miti ya nene na bifulu bia mbote."
                lari="Lumbu moshi, Nsayi na Sunda ba kwenda ku sangi. Ba mona miti ya nene na bifulu bia mbote."
                french="Un jour, Nsayi et Sunda partirent dans la forêt. Elles virent de grands arbres et de belles fleurs."
                english="One day, Nsayi and Sunda went into the forest. They saw tall trees and beautiful flowers."
              />
            </div>

            {/* PREMIUM: Panels 4-6 */}
            <div className="px-4 md:px-6 pb-6">
              <PremiumGate label="Continue Nsayi's Story">
                <div className="space-y-6">
                  {/* Panel 4 – Meeting the elder */}
                  <ComicPanel
                    image={storyPanel4}
                    panelNumber={4}
                    layout="wide"
                    mandombe="Mu sangi, ba kumana na nkaka muntu ya ntinu. Ka yambula zawu: 'Beno, bala bami, meno ni zolele ku longa beno.'"
                    lari="Mu sangi, ba kumana na nkaka muntu ya ntinu. Ka yambula zawu: 'Beno, bala bami, meno ni zolele ku longa beno.'"
                    french="Dans la forêt, elles rencontrèrent un ancien sage. Il leur dit: 'Mes enfants, je veux vous enseigner.'"
                    english="In the forest, they met a wise elder. He told them: 'My children, I want to teach you.'"
                    speechBubble={{ text: "Beno, bala bami, meno ni zolele ku longa beno.", speaker: "Elder" }}
                  />

                  {/* Panel 5 – The sacred tree */}
                  <ComicPanel
                    image={storyPanel5}
                    panelNumber={5}
                    layout="right"
                    mandombe="Nkaka ka longa zawu ma nkumbu ya miti na binyama. 'Tala muti yai,' ka tubidi, 'nkumbu andi Nsanda — muti ya longo.'"
                    lari="Nkaka ka longa zawu ma nkumbu ya miti na binyama. 'Tala muti yai,' ka tubidi, 'nkumbu andi Nsanda — muti ya longo.'"
                    french="L'ancien leur enseigna les noms des arbres et des animaux. 'Regardez cet arbre,' dit-il, 'son nom est Nsanda — l'arbre sacré.'"
                    english="The elder taught them the names of trees and animals. 'Look at this tree,' he said, 'its name is Nsanda — the sacred tree.'"
                    speechBubble={{ text: "Nkumbu andi Nsanda — muti ya longo.", speaker: "Elder" }}
                  />

                  {/* Panel 6 – Return home */}
                  <ComicPanel
                    image={storyPanel6}
                    panelNumber={6}
                    layout="wide"
                    mandombe="Na mpimpa, Nsayi na Sunda ba vutuka ku nzo. Nsayi ka lala na ndoto ya mbote — ndoto ya sangi, ya miti, na ya nkaka ya ntinu."
                    lari="Na mpimpa, Nsayi na Sunda ba vutuka ku nzo. Nsayi ka lala na ndoto ya mbote — ndoto ya sangi, ya miti, na ya nkaka ya ntinu."
                    french="Le soir, Nsayi et Sunda rentrèrent à la maison. Nsayi s'endormit avec de beaux rêves — des rêves de la forêt, des arbres et du sage ancien."
                    english="In the evening, Nsayi and Sunda returned home. Nsayi fell asleep with beautiful dreams — dreams of the forest, the trees, and the wise elder."
                  />

                  {/* Story ending */}
                  <div className="text-center py-6 border-t border-border">
                    <p className="font-mandombe text-2xl text-primary/40 mb-2">Nsamu wusukidi</p>
                    <p className="font-display text-lg text-foreground italic">Fin de l'histoire — The End</p>
                  </div>
                </div>
              </PremiumGate>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Comic Panel Component ── */

interface SpeechBubble {
  text: string;
  speaker: string;
}

const ComicPanel = ({
  image,
  panelNumber,
  layout,
  mandombe,
  lari,
  french,
  english,
  speechBubble,
}: {
  image: string;
  panelNumber: number;
  layout: "wide" | "left" | "right";
  mandombe: string;
  lari: string;
  french: string;
  english: string;
  speechBubble?: SpeechBubble;
}) => {
  const isWide = layout === "wide";
  const isRight = layout === "right";

  return (
    <div
      className={`rounded-xl overflow-hidden border-2 border-foreground/10 shadow-md ${
        isWide ? "" : "md:grid md:grid-cols-2"
      }`}
    >
      {/* Image side */}
      <div className={`relative ${isRight ? "md:order-2" : ""}`}>
        <img
          src={image}
          alt={`Story panel ${panelNumber}`}
          className={`w-full object-cover ${isWide ? "h-56 md:h-72" : "h-56 md:h-full"}`}
          loading="lazy"
        />
        {/* Panel number badge */}
        <span className="absolute top-3 left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow">
          {panelNumber}
        </span>
        {/* Speech bubble */}
        {speechBubble && (
          <div className="absolute bottom-3 left-3 right-3 md:right-auto md:max-w-[70%]">
            <div className="bg-background/95 backdrop-blur-sm rounded-xl px-4 py-2 border border-border shadow-lg relative">
              <p className="text-xs text-muted-foreground font-bold mb-0.5">{speechBubble.speaker}</p>
              <p className="font-display text-sm text-foreground italic leading-snug">
                "{speechBubble.text}"
              </p>
              {/* Bubble tail */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-background/95 border-b border-r border-border rotate-45" />
            </div>
          </div>
        )}
      </div>

      {/* Text side */}
      <div className={`p-5 md:p-6 space-y-3 bg-card ${isRight ? "md:order-1" : ""}`}>
        <p className="font-mandombe text-sm text-primary/30 leading-relaxed">{mandombe}</p>
        <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
          <p className="font-display text-base text-foreground italic leading-relaxed">{lari}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">FR:</span> {french}
        </p>
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">EN:</span> {english}
        </p>
      </div>
    </div>
  );
};

export default StoryPreview;
