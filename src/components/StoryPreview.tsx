import PremiumGate from "@/components/PremiumGate";
import { useLanguage } from "@/contexts/LanguageContext";
import storyPanel1 from "@/assets/story-panel-1.jpg";
import storyPanel2 from "@/assets/story-panel-2.jpg";
import storyPanel3 from "@/assets/story-panel-3.jpg";
import storyPanel4 from "@/assets/story-panel-7.jpg";
import storyPanel5 from "@/assets/story-panel-8.jpg";
import storyPanel6 from "@/assets/story-panel-9.jpg";
import storyPanel7 from "@/assets/story-panel-10.jpg";
import storyPanel8 from "@/assets/story-panel-11.jpg";
import storyPanel9 from "@/assets/story-panel-12.jpg";
import storyPanel10 from "@/assets/story-panel-13.jpg";
import storyPanel11 from "@/assets/story-panel-14.jpg";
import storyPanel12 from "@/assets/story-panel-15.jpg";
import storyPanel13 from "@/assets/story-panel-16.jpg";
import storyPanel14 from "@/assets/story-panel-17.jpg";

const StoryPreview = () => {
  return (
    <section id="stories" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl md:text-4xl text-gold mb-6">Binsamu</p>
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
            <p className="font-mandombe text-2xl md:text-3xl text-gold/80 mb-6">
              Nsayi ku nzo mikanda na sangi
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gold mb-1">
              Nsayi à l'école et à la forêt
            </h3>
            <p className="text-cream/80 text-sm mb-1">Nsayi at School and in the Forest</p>
            <p className="text-cream/60 text-xs">A bilingual comic story — French, English & Portuguese</p>
          </div>

          {/* Comic strip panels */}
          <div className="bg-background border border-border border-t-0 rounded-b-2xl overflow-hidden">
            {/* FREE: Panels 1-3 */}
            <div className="p-4 md:p-6 space-y-6">
              {/* Panel 1 */}
              <ComicPanel
                image={storyPanel1}
                panelNumber={1}
                layout="wide"
                mandombe="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muwana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
                lari="Lumbu tshi moshi, mu ntangu ya ntama, ku nsi ya Kongo, muana n'Kento beri ta nkumbu Nsayi na ndiku'andi Sunda."
                french="Il était une fois, dans le Kongo, il y a très longtemps, une petite fille nommée Nsayi et sa meilleure amie Sunda."
                english="Once upon a time, in the Kongo, long ago, a little girl named Nsayi and her best friend Sunda."
                portuguese="Era uma vez, no Kongo, há muito tempo, uma menina chamada Nsayi e a sua melhor amiga Sunda."
              />

              {/* Panel 2 */}
              <ComicPanel
                image={storyPanel2}
                panelNumber={2}
                layout="right"
                mandombe="Nsayi nzo mikanda ya ka tomo zolo. Mabuku ma ka zolo mu tanga, weri zolo mpe mu kuwe nsoneka binsamu."
                lari="Nsayi nzo mikanda ya ka tomo zolo. Mabuku ma ka zolo mu tanga, weri zolo mpe mu kue tsoneka binsamu."
                french="Nsayi était une petite fille qui aimait beaucoup l'école. Elle adorait lire des livres et écrire des histoires."
                english="Nsayi was a little girl who loved school very much. She loved reading books and writing stories."
                portuguese="Nsayi era uma menina que adorava a escola. Ela adorava ler livros e escrever histórias."
              />

              {/* Panel 3 */}
              <ComicPanel
                image={storyPanel3}
                panelNumber={3}
                layout="left"
                mandombe="Ka wa yoka malonguki, ka nsoneka mu kaye kandi. Ka zolo tomo mu longa bintu biya mpa."
                lari="Ka wa yoka malonguki, ka tsoneka mu kaye kandi. Ka zolo tomo mu longa bintu bia mpa."
                french="Elle écoutait ses professeurs, prenait des notes dans son cahier. Elle aimait beaucoup apprendre de nouvelles choses."
                english="She listened to her teachers, took notes in her notebook. She loved learning new things."
                portuguese="Ela ouvia os seus professores, tomava notas no seu caderno. Adorava aprender coisas novas."
              />
            </div>

            {/* PREMIUM: Panels 4-14 */}
            <div className="px-4 md:px-6 pb-6">
              <PremiumGate label="Continue Nsayi's Story">
                <div className="space-y-6">
                  {/* Panel 4 */}
                  <ComicPanel
                    image={storyPanel4}
                    panelNumber={4}
                    layout="wide"
                    mandombe="Mu ntangu ya ntama, bantu ba beri tanga ntangu na nta'ntangu. Ba beri tala kisembi kiya muntu mu zaba ntangu."
                    lari="Mu ntangu ya ntama, bantu ba beri tanga ntangu na nta'ntangu. Ba beri tala kisembi kia muntu mu zaba ntangu."
                    french="Dans le temps ancien, les gens lisaient l'heure avec le soleil. Ils regardaient l'ombre d'une personne pour connaître l'heure."
                    english="In the old days, people told time by the sun. They looked at a person's shadow to know the time."
                    portuguese="Antigamente, as pessoas liam as horas pelo sol. Olhavam para a sombra de uma pessoa para saber as horas."
                    mandombeBubble={{ text: "Ba beri tala kisembi!", latin: "Ba beri tala kisembi!", speaker: "Nsayi" }}
                  />

                  {/* Panel 5 */}
                  <ComicPanel
                    image={storyPanel5}
                    panelNumber={5}
                    layout="right"
                    mandombe="Nsayi ka nsonekanga binsamu mu kaye kandi. Ka vandaka ntangu ya nene mu tanga na mu nsoneka. Ka sepelaka tomo mu kaba binsamu biyandi na bandiku'andi."
                    lari="Nsayi ka tsonekanga binsamu mu kaye kandi. Ka vandaka ntangu ya nene mu tanga na mu tsoneka. Ka sepelaka tomo mu kaba binsamu biandi na bandiku'andi."
                    french="Nsayi écrivait des histoires dans son cahier. Elle passait des heures à lire et à écrire. Elle aimait beaucoup partager ses histoires avec ses amis."
                    english="Nsayi wrote stories in her notebook. She spent hours reading and writing. She loved sharing her stories with her friends."
                    portuguese="Nsayi escrevia histórias no seu caderno. Passava horas a ler e a escrever. Adorava partilhar as suas histórias com os amigos."
                  />

                  {/* Panel 6 */}
                  <ComicPanel
                    image={storyPanel6}
                    panelNumber={6}
                    layout="left"
                    mandombe="Bambuta bandi ba ka tubilanga mu nsoneka mikanda mu dibundu. Nsayi ka nsonekanga mikanda mu bise na bankaka."
                    lari="Bambuta bandi ba ka tubilanga mu tsoneka mikanda mu dibundu. Nsayi ka tsonekanga mikanda mu bise na bankaka."
                    french="Ses parents lui demandaient d'écrire des lettres pour la famille. Nsayi écrivait des lettres pour les grands-parents et d'autres proches."
                    english="Her parents asked her to write letters for the family. Nsayi wrote letters for grandparents and other relatives."
                    portuguese="Os pais pediam-lhe para escrever cartas para a família. Nsayi escrevia cartas para os avós e outros parentes."
                    mandombeBubble={{ text: "Nsoneka mukanda mu bise!", latin: "Tsoneka mukanda mu bise!", speaker: "Mama" }}
                  />

                  {/* Panel 7 */}
                  <ComicPanel
                    image={storyPanel7}
                    panelNumber={7}
                    layout="wide"
                    mandombe="Nsayi ka lota mu kituka nganga. Ka zolele mu buka bana ba vata diyandi. Ndoto andi ya weri nene tomo."
                    lari="Nsayi ka lota mu kituka nganga. Ka zolele mu buka bana ba vata diandi. Ndoto andi ya weri nene tomo."
                    french="Nsayi rêvait de devenir médecin. Elle voulait soigner les enfants de son village. Son rêve était très grand."
                    english="Nsayi dreamed of becoming a doctor. She wanted to heal the children of her village. Her dream was very big."
                    portuguese="Nsayi sonhava em tornar-se médica. Queria curar as crianças da sua aldeia. O seu sonho era muito grande."
                    mandombeBubble={{ text: "Meno ni zolele mu kituka nganga!", latin: "Meno ni zolele mu kituka nganga!", speaker: "Nsayi" }}
                  />

                  {/* Panel 8 */}
                  <ComicPanel
                    image={storyPanel8}
                    panelNumber={8}
                    layout="right"
                    mandombe="Nsayi na Sunda ba zolele mu kwenda ku nseke. Nseke ya beri na bintu biya mbote — miti, bifulu, na binyama."
                    lari="Nsayi na Sunda ba zolele mu kwenda ku ntseke. Ntseke ya beri na bintu bia mbote — miti, bifulu, na binyama."
                    french="Nsayi et Sunda aimaient aller dans la savane. La savane était pleine de belles choses — des arbres, des fleurs et des animaux."
                    english="Nsayi and Sunda loved going to the savanna. The savanna was full of beautiful things — trees, flowers, and animals."
                    portuguese="Nsayi e Sunda adoravam ir à savana. A savana estava cheia de coisas bonitas — árvores, flores e animais."
                  />

                  {/* Panel 9 */}
                  <ComicPanel
                    image={storyPanel9}
                    panelNumber={9}
                    layout="left"
                    mandombe="Kisalu kiyandi kiya tomo zolo: mu bonga buwa, bwa nsempela. Nsempela ya beri na luvunu ya mbote tomo, rangi andi ya weri ya pembe na ngiyelo."
                    lari="Kisalu kiandi kia tomo zolo: mu bonga buwa, bwa nsempela. Nsempela ya beri na luvunu ya mbote tomo, rangi andi ya weri ya pembe na ngielo."
                    french="Son activité préférée : cueillir des champignons, surtout les nsempela orange vif. Les nsempela avaient une saveur unique, un vrai régal."
                    english="Her favorite activity: picking mushrooms, especially the bright orange nsempela. The nsempela had a unique flavor, a true delight."
                    portuguese="A sua atividade preferida: apanhar cogumelos, especialmente os nsempela laranja vivos. Os nsempela tinham um sabor único, uma verdadeira delícia."
                    mandombeBubble={{ text: "Tala buwa biya nsempela!", latin: "Tala buwa bia nsempela!", speaker: "Sunda" }}
                  />

                  {/* Panel 10 */}
                  <ComicPanel
                    image={storyPanel10}
                    panelNumber={10}
                    layout="wide"
                    mandombe="Nsempela ya beri buwa ya mbote tomo mu nseke. Luvunu andi ya beri ya nsoni na ya mbote. Konso lumbu ba bongele nsempela, ya beri lujingu ya mbote."
                    lari="Nsempela ya beri buwa ya mbote tomo mu ntseke. Luvunu andi ya beri ya nsoni na ya mbote. Konso lumbu ba bongele nsempela, ya beri luzingu ya mbote."
                    french="Le nsempela était le meilleur champignon de la savane. Sa saveur était douce et délicieuse. Chaque fois qu'on cueillait les nsempela, c'était un plaisir."
                    english="The nsempela was the best mushroom of the savanna. Its flavor was sweet and delicious. Every time they picked nsempela, it was a delight."
                    portuguese="O nsempela era o melhor cogumelo da savana. O seu sabor era doce e delicioso. Cada vez que apanhavam nsempela, era um prazer."
                  />

                  {/* Panel 11 */}
                  <ComicPanel
                    image={storyPanel11}
                    panelNumber={11}
                    layout="right"
                    mandombe="Ba bongele mpe ma mbuma na ndunda mu nseke. Mu ntangu ya mvula, nseke ya beri na bintu biya nene — ma mbuma na ndunda biya ya ntangu."
                    lari="Ba bongele mpe ma mbuma na ndunda mu ntseke. Mu ntangu ya mvula, ntseke ya beri na bintu bia nene — ma mbuma na ndunda bia ya ntangu."
                    french="Elles cueillaient aussi des fruits et des légumes dans la savane. Pendant la saison des pluies, la savane offrait des fruits et légumes de saison."
                    english="They also picked fruits and vegetables in the savanna. During the rainy season, the savanna offered seasonal fruits and vegetables."
                    portuguese="Também apanhavam frutas e legumes na savana. Durante a estação das chuvas, a savana oferecia frutas e legumes da época."
                  />

                  {/* Panel 12 */}
                  <ComicPanel
                    image={storyPanel12}
                    panelNumber={12}
                    layout="left"
                    mandombe="Ndunda andi ya tomo zolo ya beri musekeni. Musekeni ya beri ya mbote tomo mu lambu na mafuta ma ndinga. Luvunu andi ya beri ya nsoni."
                    lari="Ndunda andi ya tomo zolo ya beri musekeni. Musekeni ya beri ya mbote tomo mu lambu na mafuta ma ndinga. Luvunu andi ya beri ya nsoni."
                    french="Son légume préféré était le musekeni. Le musekeni était délicieux cuit dans la sauce à l'huile de palme. Sa saveur était exquise."
                    english="Her favorite vegetable was the musekeni. The musekeni was delicious cooked in palm oil sauce. Its flavor was exquisite."
                    portuguese="O seu legume preferido era o musekeni. O musekeni era delicioso cozinhado em molho de óleo de palma. O seu sabor era requintado."
                    mandombeBubble={{ text: "Musekeni ya mbote tomo!", latin: "Musekeni ya mbote tomo!", speaker: "Nsayi" }}
                  />

                  {/* Panel 13 */}
                  <ComicPanel
                    image={storyPanel13}
                    panelNumber={13}
                    layout="right"
                    mandombe="Ka zolo mpe ntiniya. Ntiniya ya beri nti ya nsinga na matiti ma leke. Matiti ma ntiniya ma beri ma mbote mu diya."
                    lari="Ka zolo mpe ntinia. Ntinia ya beri nti ya nsinga na matiti ma leke. Matiti ma ntinia ma beri ma mbote mu dia."
                    french="Elle aimait aussi la ntinia. La ntinia était une liane aux pointes tendres. Les feuilles de ntinia étaient bonnes à manger."
                    english="She also loved the ntinia. The ntinia was a vine with tender tips. The ntinia leaves were good to eat."
                    portuguese="Ela também adorava a ntinia. A ntinia era uma trepadeira de pontas tenras. As folhas de ntinia eram boas para comer."
                  />

                  {/* Panel 14 */}
                  <ComicPanel
                    image={storyPanel14}
                    panelNumber={14}
                    layout="wide"
                    mandombe="Nsayi ka kabanga bintu biyonso na bandiku'andi. Ka sepelaka tomo mu kaba bileyi na binsamu na bantu ba beri pena na yandi."
                    lari="Nsayi ka kabanga bintu bionso na bandiku'andi. Ka sepelaka tomo mu kaba bilei na binsamu na bantu ba beri pena na yandi."
                    french="Nsayi partageait tout avec ses amis. Elle aimait partager la nourriture et les histoires avec les gens proches d'elle."
                    english="Nsayi shared everything with her friends. She loved sharing food and stories with the people close to her."
                    portuguese="Nsayi partilhava tudo com os seus amigos. Adorava partilhar comida e histórias com as pessoas próximas dela."
                  />

                  {/* Story ending */}
                  <div className="text-center py-6 border-t border-border">
                    <p className="font-mandombe text-3xl text-gold/60 mb-2">Nsamu wusukidi</p>
                    <p className="font-display text-lg text-foreground italic">Fin de l'histoire — The End — Fim da história</p>
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

interface MandombeBubble {
  text: string;
  latin: string;
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
  portuguese,
  mandombeBubble,
}: {
  image: string;
  panelNumber: number;
  layout: "wide" | "left" | "right";
  mandombe: string;
  lari: string;
  french: string;
  english: string;
  portuguese: string;
  mandombeBubble?: MandombeBubble;
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
        {/* Mandombe speech bubble */}
        {mandombeBubble && (
           <div className="absolute bottom-4 left-3 right-3 md:right-auto md:max-w-[80%]">
            <div className="bg-earth-deep rounded-2xl px-5 py-4 border-2 border-gold shadow-xl relative">
              <p className="font-mandombe text-2xl md:text-3xl text-gold leading-snug tracking-wide">
                {mandombeBubble.text}
              </p>
              <div className="mt-3 pt-2 border-t border-gold/30">
                <p className="text-xs text-cream/70 italic">
                  {mandombeBubble.latin}
                </p>
                <p className="text-[10px] text-gold/80 font-semibold mt-1">— {mandombeBubble.speaker}</p>
              </div>
              {/* Bubble tail */}
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-earth-deep border-b-2 border-r-2 border-gold rotate-45" />
            </div>
          </div>
        )}
      </div>

      {/* Text side */}
      <div className={`p-5 md:p-6 space-y-4 bg-card ${isRight ? "md:order-1" : ""}`}>
        <div className="bg-earth-deep/10 rounded-xl p-4 border border-gold/30">
          <p className="font-mandombe text-2xl md:text-3xl text-primary leading-relaxed tracking-wide">{mandombe}</p>
        </div>
        <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
          <p className="font-display text-base text-foreground italic leading-relaxed">{lari}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">FR:</span> {french}
        </p>
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">EN:</span> {english}
        </p>
        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">PT:</span> {portuguese}
        </p>
      </div>
    </div>
  );
};

export default StoryPreview;