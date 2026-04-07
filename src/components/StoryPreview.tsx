import PremiumGate from "@/components/PremiumGate";
import { useLanguage } from "@/contexts/LanguageContext";
import nsayiPanel1 from "@/assets/nsayi-panel-1.jpg";
import nsayiPanel2 from "@/assets/nsayi-panel-2.jpg";
import nsayiPanel3 from "@/assets/nsayi-panel-3.jpg";
import nsayiPanel4 from "@/assets/nsayi-panel-4.jpg";
import nsayiPanel5 from "@/assets/nsayi-panel-5.jpg";
import nsayiPanel6 from "@/assets/nsayi-panel-6.jpg";
import nsayiPanel7 from "@/assets/nsayi-panel-7.jpg";
import nsayiPanel8 from "@/assets/nsayi-panel-8.jpg";
import nsayiPanel9 from "@/assets/nsayi-panel-9.jpg";
import nsayiPanel10 from "@/assets/nsayi-panel-10.jpg";
import nsayiPanel11 from "@/assets/nsayi-panel-11.jpg";
import nsayiPanel12 from "@/assets/nsayi-panel-12.jpg";
import nsayiPanel13 from "@/assets/nsayi-panel-13.jpg";
import nsayiPanel14 from "@/assets/nsayi-panel-14.jpg";
import nsayiPanel15 from "@/assets/nsayi-panel-15.jpg";
import nsayiPanel16 from "@/assets/nsayi-panel-16.jpg";
import nsayiPanel17 from "@/assets/nsayi-panel-17.jpg";
import nsayiPanel18 from "@/assets/nsayi-panel-18.jpg";
import nsayiPanel19 from "@/assets/nsayi-panel-19.jpg";
import nsayiPanel20 from "@/assets/nsayi-panel-20.jpg";
import nsayiPanel21 from "@/assets/nsayi-panel-21.jpg";
import nsayiPanel22 from "@/assets/nsayi-panel-22.jpg";
import nsayiPanel23 from "@/assets/nsayi-panel-23.jpg";
import nsayiPanel24 from "@/assets/nsayi-panel-24.jpg";
import nsayiPanel25 from "@/assets/nsayi-panel-25.jpg";

/* ── Story data – texte fidèle au PDF ── */

const storyPanels = [
  {
    image: nsayiPanel1,
    lari: "Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda.",
    french: "Il était une fois, dans le Kongo, il y a très longtemps, une petite fille nommée Nsayi et sa meilleure amie Sunda.",
  },
  {
    image: nsayiPanel2,
    lari: "Ha tshimoshi beri kuenda ku nzo mikanda, ntangu ya yingi beri yokesa ha tshimoshi, mu kue longoke bima bia mona na mu kue sakane ku mbaji nzo mikanda.",
    french: "Nsayi et Sunda allaient à l'école ensemble et passaient de merveilleuses journées en apprenant de nouvelles choses et en jouant dans la cour de l'école.",
  },
  {
    image: nsayiPanel3,
    lari: "Mu ntama, bantu bo ba lombo ba na taLuLu tshiya ntangu, ntangu beri talaka mu zaba buishi.",
    french: "Avant, les gens qui n'avaient pas de montres, utilisaient le soleil pour savoir l'heure qu'il était.",
  },
  {
    image: nsayiPanel4,
    lari: "Tshibuka tshia ntangu beri tala : bula tshini tshiyau bueri ba hana ntangu.",
    french: "Ils regardaient la position du soleil dans le ciel pour estimer l'heure en se basant sur la longueur de leur ombre.",
  },
  {
    image: nsayiPanel5,
    lari: "Tala tshini tshia tshiri tshia fioti, ntangu ya kala ku nzo mikanda yi fueni kue bale ba.",
    french: "Si l'ombre était proche de toi, tu savais qu'il fallait repartir pour l'école, pour les écoliers par exemple.",
  },
  {
    image: nsayiPanel6,
    lari: "Mu zaba ntangu, bantu zulu kua beri tala : ntangu ya mana ba ha mbata n'tu au ba zaba ti buishi bueka kati kati.",
    french: "Par exemple, si le soleil était haut dans le ciel, juste au-dessus de leur tête, ils savaient qu'il était environ midi.",
  },
  {
    image: nsayiPanel7,
    lari: "Nsayi nzo mikanda ya ka tomo zolo.",
    french: "Nsayi était une petite fille qui aimait beaucoup l'école.",
  },
  {
    image: nsayiPanel8,
    lari: "Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu.",
    french: "Elle adorait lire des livres et écrire des histoires.",
  },
  {
    image: nsayiPanel9,
    lari: "Weri tomo wirikila mieri longesa ba milongi miandi, mboko keri tsoneka mi mingi mu mikanda miandi.",
    french: "En classe, elle écoutait attentivement ses professeurs et prenait des notes dans son cahier.",
  },
  {
    image: nsayiPanel10,
    lari: "Bu keri kala kuna nzo andi ntangu ya yingi keri bonga mu tanga ma buku na mu tsoneka binsamu bia ba nduku zandi.",
    french: "Lorsqu'elle rentrait chez elle, elle passait des heures à lire et à écrire des histoires pour ses amis.",
  },
  {
    image: nsayiPanel11,
    lari: "Tata 'ndi na mama'ndi mpe mikanda mia bishi kanda beri mu sarisa.",
    french: "Ses parents aussi lui faisaient faire des lettres pour la famille.",
  },
  {
    image: nsayiPanel12,
    lari: "Weri nandi ka mbuki lumbu ngati ka buka bala ba ha hata diandi.",
    french: "Elle rêvait de devenir médecin un jour et de soigner les enfants de son village.",
  },
  {
    image: nsayiPanel13,
    lari: "Nsayi wa tomo zolo mu kue zebe ku mukobo ba na Sunda.",
    french: "Nsayi aimait beaucoup aller dans la savane avec Sunda.",
  },
  {
    image: nsayiPanel14,
    lari: "Ntangu za zonso zi beri kuenda kuna ngula nsayiyeri mu baka mu bio bia bionsoni bi keri kue mone na bia nzenza bi ka lembo toko mona.",
    french: "Chaque fois qu'elles y allaient, elles prenaient plaisir à explorer et à découvrir de nouvelles choses.",
  },
  {
    image: nsayiPanel15,
    lari: "Diambu di ka tomo zolo, ni tsha kua buwa. Nsunga buwa bu ba tshele ngabu na ngabu ya ka tomo zolo, na luhu lua buo bu keri tshiya ka.",
    french: "Une de ses activités favorites était de ramasser des champignons. Elle aimait l'odeur des champignons frais et le goût de ceux qu'elle ramassait.",
  },
  {
    image: nsayiPanel16,
    lari: "Ntangu ya yingi keri yokesa mu kue tombe na mu kue tshe buwa.",
    french: "Elle passait des heures à chercher les meilleurs champignons et à les ramasser avec soin.",
  },
  {
    image: nsayiPanel17,
    lari: "Bu keri baka buwa bua buingi, mbo keri kabila mpe ba ndiku zandi.",
    french: "Quand elle en ramassait beaucoup, elle partageait aussi avec ses amis.",
  },
  {
    image: nsayiPanel18,
    lari: "Nsayi buwa bu moshi keri tomo zomo mu tsha tshina bu tsheri fuana.",
    french: "Nsayi avait un champignon préféré qu'elle aimait beaucoup ramasser dans la savane quand c'était la saison.",
  },
  {
    image: nsayiPanel19,
    lari: "Buwa buo nkumbu nsempela bua mua mbuaki bue.",
    french: "Il s'appelle « nsempela » et a une couleur orangée vif.",
  },
  {
    image: nsayiPanel20,
    lari: "Bua toma bue, Nsayi bua keri zolo mu kue tsha na Sunda na mu kue bua kabi kue ba ndiku zandi.",
    french: "Il est délicieux, Nsayi adorait le ramasser avec Sunda et le partager avec ses amis.",
  },
  {
    image: nsayiPanel21,
    lari: "Bu keri kue yunga ku mukobo na Sunda, ntangu ya yingi beri yokesa mu kue tombe buva na malombo ma bina.",
    french: "Lorsqu'elle allait dans la savane avec Sunda, elles passaient toujours beaucoup de temps à chercher des champignons et à ramasser des fruits selon les saisons.",
  },
  {
    image: nsayiPanel22,
    lari: "Kue yandi, nsempela luhu lua yandi kaka lueri nandi, ntangu za zaonso nkatika nsakati lueri mu taka.",
    french: "Pour elle, « nsempela » avait une saveur unique et était un délice à chaque fois.",
  },
  {
    image: nsayiPanel23,
    lari: "Nsayi wa tomo zolo mpe mu kue zebe ku sangi mu kue tshe bikola na malombo.",
    french: "Nsayi adorait également passer du temps à explorer la forêt pour y ramasser des légumes et des fruits.",
  },
  {
    image: nsayiPanel24,
    lari: "Bikola bi ka tomo zolo ni musekeni, wua keri zolo ni wa muamba ngaji.",
    french: "Parmi ses légumes préférés se trouvait le musekeni, une plante comestible dont les jeunes feuilles étaient délicieuses surtout cuites dans la sauce de palme.",
  },
  {
    image: nsayiPanel25,
    lari: "Nsayi wa tomo zolo mpe ntinia.",
    french: "Nsayi aimait aussi le ntinia, une liane dont on mange les extrémités tendres comme un légume après l'avoir fait bouillir.",
  },
];

const StoryPreview = () => {
  const { t } = useLanguage();

  const layouts: Array<"wide" | "left" | "right"> = ["wide", "right", "left"];

  return (
    <section id="stories" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl md:text-4xl text-gold mb-6">Binsamu</p>
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            {t("stories.eyebrow")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("stories.title")}
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Story title card */}
          <div className="bg-earth-deep rounded-t-2xl p-6 md:p-8 border border-border border-b-0">
            <p className="font-mandombe text-2xl md:text-3xl text-gold/80 mb-6">
              Nsayi ku nzo mikanda na sangi
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gold mb-1">
              {t("stories.storySubtitle")}
            </h3>
            <p className="text-cream/80 text-sm mb-1">{t("stories.storyDescShort")}</p>
            <p className="text-cream/60 text-xs">{t("stories.storyDesc")}</p>
          </div>

          {/* Comic strip panels */}
          <div className="bg-background border border-border border-t-0 rounded-b-2xl overflow-hidden">
            {/* FREE: Panels 1-3 */}
            <div className="p-4 md:p-6 space-y-6">
              {storyPanels.slice(0, 3).map((panel, i) => (
                <ComicPanel
                  key={i}
                  image={panel.image}
                  panelNumber={i + 1}
                  layout={layouts[i % 3]}
                  lari={panel.lari}
                  french={panel.french}
                />
              ))}
            </div>

            {/* PREMIUM: Panels 4-25 */}
            <div className="px-4 md:px-6 pb-6">
              <PremiumGate label={t("stories.continue")}>
                <div className="space-y-6">
                  {storyPanels.slice(3).map((panel, i) => (
                    <ComicPanel
                      key={i + 3}
                      image={panel.image}
                      panelNumber={i + 4}
                      layout={layouts[(i + 3) % 3]}
                      lari={panel.lari}
                      french={panel.french}
                    />
                  ))}

                  {/* Story ending */}
                  <div className="text-center py-6 border-t border-border">
                    <p className="font-mandombe text-3xl text-gold/60 mb-2">Nsamu wusukidi</p>
                    <p className="font-display text-lg text-foreground italic">{t("stories.end")}</p>
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

const ComicPanel = ({
  image,
  panelNumber,
  layout,
  lari,
  french,
}: {
  image: string;
  panelNumber: number;
  layout: "wide" | "left" | "right";
  lari: string;
  french: string;
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
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-gold text-earth-deep flex items-center justify-center font-bold text-sm shadow-lg">
          {panelNumber}
        </div>
      </div>

      {/* Text side */}
      <div className={`p-4 md:p-6 flex flex-col justify-center space-y-3 ${isWide ? "" : ""}`}>
        {/* Mandombe script (Lari text rendered in Mandombe font) */}
        <div className="bg-earth-deep/5 dark:bg-earth-deep/20 rounded-lg p-3 border border-gold/20">
          <p className="font-mandombe text-lg md:text-xl text-gold leading-relaxed">{lari}</p>
        </div>

        {/* Lari (Latin script) */}
        <p className="text-foreground text-sm font-medium">
          <span className="text-gold font-bold">Lari:</span> {lari}
        </p>

        {/* French */}
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">FR:</span> {french}
        </p>
      </div>
    </div>
  );
};

export default StoryPreview;
