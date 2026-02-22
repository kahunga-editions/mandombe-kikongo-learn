import { Volume2 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import vocabGreetings from "@/assets/vocab-greetings.jpg";
import vocabFamily from "@/assets/vocab-family.jpg";
import vocabAnimals from "@/assets/vocab-animals.jpg";
import vocabNature from "@/assets/vocab-nature.jpg";
import vocabBody from "@/assets/vocab-body.jpg";
import vocabActions from "@/assets/vocab-actions.jpg";
import vocabFood from "@/assets/vocab-food.jpg";

interface VocabEntry {
  lari: string;
  french: string;
  english: string;
  portuguese: string;
}

interface VocabCategory {
  id: string;
  label: string;
  lariLabel: string;
  image: string;
  words: VocabEntry[];
}

const categories: VocabCategory[] = [
  {
    id: "greetings",
    label: "Greetings",
    lariLabel: "Mbote",
    image: vocabGreetings,
    words: [
      { lari: "Mbote zêno", french: "Bonjour à vous", english: "Hello to you (plural)", portuguese: "Olá a vocês" },
      { lari: "Mbote aku", french: "Bonjour à toi", english: "Hello to you (singular)", portuguese: "Olá a você" },
      { lari: "Mbote zawu", french: "Bonjour à eux", english: "Hello to them", portuguese: "Olá a eles" },
      { lari: "Batata mbote zawu", french: "Bonjour aux parents", english: "Hello to the parents", portuguese: "Olá aos pais" },
      { lari: "Lu kolele?", french: "Vous allez bien ?", english: "Are you well?", portuguese: "Estão bem?" },
      { lari: "Vumbukidi?", french: "Tu vas bien ? / Bien réveillé(e) ?", english: "How are you? / Did you sleep well?", portuguese: "Como está? / Dormiu bem?" },
      { lari: "Lu vumbukidi?", french: "Vous allez bien ?", english: "How are you? (plural)", portuguese: "Como estão?" },
      { lari: "Shama", french: "Sois en bonne santé", english: "Be healthy", portuguese: "Tenha saúde" },
      { lari: "Chemi?", french: "Ça va ?", english: "How's it going?", portuguese: "Tudo bem?" },
      { lari: "Lu chemi", french: "Vous allez bien", english: "Are you doing well", portuguese: "Estão bem" },
      { lari: "Sikama", french: "Tenir bon", english: "To hold on", portuguese: "Aguentar firme" },
    ],
  },
  {
    id: "family",
    label: "People & Family",
    lariLabel: "Kanda",
    image: vocabFamily,
    words: [
      { lari: "Muntu", french: "Un humain", english: "Human", portuguese: "Humano" },
      { lari: "Bantu", french: "Des humains", english: "Humans", portuguese: "Humanos" },
      { lari: "Muana", french: "Enfant", english: "Child", portuguese: "Criança" },
      { lari: "Bala", french: "Enfants", english: "Children", portuguese: "Crianças" },
      { lari: "Mutekolo", french: "Petit-enfant", english: "Grandchild", portuguese: "Neto/Neta" },
      { lari: "Batekolo", french: "Petits-enfants", english: "Grandchildren", portuguese: "Netos" },
      { lari: "Nkaka", french: "Grand-père / Grand-mère", english: "Grandfather / Grandmother", portuguese: "Avô / Avó" },
      { lari: "Bankaka", french: "Grands-parents", english: "Grandparents", portuguese: "Avós" },
      { lari: "N'kento", french: "Femme", english: "Woman", portuguese: "Mulher" },
      { lari: "Bakento", french: "Femmes", english: "Women", portuguese: "Mulheres" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    lariLabel: "Binyama",
    image: vocabAnimals,
    words: [
      { lari: "Mbuma", french: "Chat", english: "Cat", portuguese: "Gato" },
      { lari: "Mbua", french: "Chien", english: "Dog", portuguese: "Cão" },
      { lari: "Mulumba", french: "Lapin", english: "Rabbit", portuguese: "Coelho" },
      { lari: "Mbulu", french: "Chacal", english: "Jackal", portuguese: "Chacal" },
      { lari: "Lumbembemba", french: "Papillon", english: "Butterfly", portuguese: "Borboleta" },
      { lari: "Lunguenia", french: "Caméléon", english: "Chameleon", portuguese: "Camaleão" },
      { lari: "Nsombe", french: "Larve du palmier", english: "Palm tree larva", portuguese: "Larva de palmeira" },
      { lari: "Malembe", french: "Cigogne", english: "Stork", portuguese: "Cegonha" },
      { lari: "Boria", french: "Tique", english: "Tick", portuguese: "Carrapato" },
    ],
  },
  {
    id: "nature",
    label: "Nature",
    lariLabel: "Nza",
    image: vocabNature,
    words: [
      { lari: "Mutoto", french: "La Terre", english: "The Earth", portuguese: "A Terra" },
      { lari: "Muti", french: "Arbre", english: "Tree", portuguese: "Árvore" },
      { lari: "Miti", french: "Arbres", english: "Trees", portuguese: "Árvores" },
      { lari: "Lukaya", french: "Feuille", english: "Leaf", portuguese: "Folha" },
      { lari: "Makaya", french: "Feuilles", english: "Leaves", portuguese: "Folhas" },
      { lari: "Lumbuetete", french: "Étoile", english: "Star", portuguese: "Estrela" },
      { lari: "Mbuetete", french: "Étoiles", english: "Stars", portuguese: "Estrelas" },
      { lari: "Luwa", french: "Champignon", english: "Mushroom", portuguese: "Cogumelo" },
      { lari: "Bifulu", french: "Fleurs", english: "Flowers", portuguese: "Flores" },
      { lari: "Kifulu", french: "Fleur", english: "Flower", portuguese: "Flor" },
    ],
  },
  {
    id: "body",
    label: "Body",
    lariLabel: "Nitu",
    image: vocabBody,
    words: [
      { lari: "Mulembo", french: "Doigt", english: "Finger", portuguese: "Dedo" },
      { lari: "Milembo", french: "Doigts", english: "Fingers", portuguese: "Dedos" },
      { lari: "Kulu", french: "Pied", english: "Foot", portuguese: "Pé" },
      { lari: "Malu", french: "Pieds", english: "Feet", portuguese: "Pés" },
      { lari: "Kutu", french: "Oreille", english: "Ear", portuguese: "Orelha" },
      { lari: "Makutu", french: "Oreilles", english: "Ears", portuguese: "Orelhas" },
      { lari: "Kikoba", french: "Lèvre", english: "Lip", portuguese: "Lábio" },
      { lari: "Bibanga", french: "Mentons", english: "Chins", portuguese: "Queixos" },
      { lari: "Mutshila", french: "Queue d'un animal", english: "Tail", portuguese: "Cauda" },
    ],
  },
  {
    id: "actions",
    label: "Actions & Objects",
    lariLabel: "Bisalu",
    image: vocabActions,
    words: [
      { lari: "Sala", french: "Faire, travailler, construire", english: "To do, to work, to build", portuguese: "Fazer, trabalhar, construir" },
      { lari: "Mbutukulu", french: "Naissance", english: "Birth", portuguese: "Nascimento" },
      { lari: "Mulele", french: "Pagne", english: "Loincloth", portuguese: "Pano" },
      { lari: "Kiamvu", french: "Pont", english: "Bridge", portuguese: "Ponte" },
      { lari: "Kizongo", french: "Coup de fusil", english: "Gunshot", portuguese: "Tiro" },
      { lari: "Kuku", french: "Pierre du foyer", english: "Hearthstone", portuguese: "Pedra da lareira" },
      { lari: "Zu", french: "Bruit, voix, langue", english: "Noise, voice, language", portuguese: "Barulho, voz, língua" },
      { lari: "Bindukulu", french: "Clé", english: "Key", portuguese: "Chave" },
    ],
  },
  {
    id: "food",
    label: "Food & Drink",
    lariLabel: "Bidia",
    image: vocabFood,
    words: [
      { lari: "Bidia", french: "Nourriture", english: "Food", portuguese: "Comida" },
      { lari: "Madia", french: "Nourritures", english: "Foods", portuguese: "Comidas" },
      { lari: "Lala dia nsa", french: "Citron", english: "Lemon", portuguese: "Limão" },
      { lari: "Lubo", french: "Onctuosité d'une sauce", english: "Creaminess of a sauce", portuguese: "Cremosidade de um molho" },
      { lari: "Bidisa", french: "Faire bouillir", english: "To make something boil", portuguese: "Fazer ferver" },
      { lari: "Bidima", french: "Brûler intensément", english: "To burn intensely", portuguese: "Queimar intensamente" },
    ],
  },
];

const VocabularyPreview = () => {
  return (
    <section id="vocabulary" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            Mazita — Vocabulary
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Essential Words & Phrases
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each word comes in Kikongo Lari with translations in French, English
            and Portuguese — languages spoken across the Kongo diaspora.
          </p>
        </div>

        <Tabs defaultValue="greetings" className="max-w-6xl mx-auto">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-center mb-10">
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="px-4 py-2 rounded-full border border-border bg-card data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary font-body text-sm transition-all"
              >
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              {/* Category header with illustration */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-card rounded-2xl border border-border">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {cat.lariLabel}
                  </h3>
                  <p className="text-muted-foreground font-body">
                    {cat.label} — {cat.words.length} words
                  </p>
                </div>
              </div>

              {/* Word cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.words.map((word, i) => (
                  <div
                    key={i}
                    className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group"
                  >
                    <p
                      className="text-2xl mb-1 text-primary/80 leading-relaxed"
                      style={{ fontFamily: "'Masono Mandombe', sans-serif" }}
                    >
                      {word.lari}
                    </p>
                    <h4 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                      {word.lari}
                      <Volume2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                    </h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-muted-foreground">
                        <span className="inline-block w-6 text-xs font-bold text-primary/70">FR</span>
                        {word.french}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="inline-block w-6 text-xs font-bold text-primary/70">EN</span>
                        {word.english}
                      </p>
                      <p className="text-muted-foreground">
                        <span className="inline-block w-6 text-xs font-bold text-primary/70">PT</span>
                        {word.portuguese}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12">
          <a
            href="#premium"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            Unlock the full dictionary →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VocabularyPreview;
