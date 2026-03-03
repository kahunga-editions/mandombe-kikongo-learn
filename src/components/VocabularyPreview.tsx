import { Volume2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PremiumGate from "@/components/PremiumGate";

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
  premiumWords?: VocabEntry[];
}

const categories: VocabCategory[] = [
  {
    id: "greetings",
    label: "Greetings",
    lariLabel: "Mbote",
    image: vocabGreetings,
    words: [
      { lari: "Mbote zeno", french: "Bonjour à vous", english: "Hello to you (plural)", portuguese: "Olá a vocês" },
      { lari: "Mbote aku", french: "Bonjour à toi", english: "Hello to you (singular)", portuguese: "Olá a você" },
      { lari: "Mbote zawu", french: "Bonjour à eux", english: "Hello to them", portuguese: "Olá a eles" },
      { lari: "Lu kolele?", french: "Vous allez bien ?", english: "Are you well?", portuguese: "Estão bem?" },
      { lari: "Shama", french: "Sois en bonne santé", english: "Be healthy", portuguese: "Tenha saúde" },
      { lari: "Sikama", french: "Tenir bon", english: "To hold on", portuguese: "Aguentar firme" },
    ],
    premiumWords: [
      { lari: "Batata mbote zawu", french: "Bonjour aux parents", english: "Hello to the parents", portuguese: "Olá aos pais" },
      { lari: "Vumbukidi?", french: "Tu vas bien ? / Bien réveillé(e) ?", english: "How are you? / Did you sleep well?", portuguese: "Como está? / Dormiu bem?" },
      { lari: "Lu vumbukidi?", french: "Vous allez bien ?", english: "How are you? (plural)", portuguese: "Como estão?" },
      { lari: "Chemi?", french: "Ça va ?", english: "How's it going?", portuguese: "Tudo bem?" },
      { lari: "Lu chemi", french: "Vous allez bien", english: "Are you doing well", portuguese: "Estão bem" },
      { lari: "Vutuka mbote", french: "Bon retour", english: "Welcome back", portuguese: "Bem-vindo de volta" },
      { lari: "Matondo ma mingi", french: "Merci beaucoup", english: "Thank you very much", portuguese: "Muito obrigado" },
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
      { lari: "Nkaka", french: "Grand-père / Grand-mère", english: "Grandfather / Grandmother", portuguese: "Avô / Avó" },
      { lari: "N'kento", french: "Femme", english: "Woman", portuguese: "Mulher" },
    ],
    premiumWords: [
      { lari: "Mutekolo", french: "Petit-enfant", english: "Grandchild", portuguese: "Neto/Neta" },
      { lari: "Batekolo", french: "Petits-enfants", english: "Grandchildren", portuguese: "Netos" },
      { lari: "Bankaka", french: "Grands-parents", english: "Grandparents", portuguese: "Avós" },
      { lari: "Bakento", french: "Femmes", english: "Women", portuguese: "Mulheres" },
      { lari: "Yakala", french: "Homme / mari", english: "Man / husband", portuguese: "Homem / marido" },
      { lari: "Mama", french: "Mère", english: "Mother", portuguese: "Mãe" },
      { lari: "Tata", french: "Père", english: "Father", portuguese: "Pai" },
      { lari: "Mpangi", french: "Frère / sœur", english: "Brother / sister", portuguese: "Irmão / irmã" },
      { lari: "Nkazi", french: "Tante maternelle", english: "Maternal aunt", portuguese: "Tia materna" },
      { lari: "Ngudi", french: "Oncle maternel", english: "Maternal uncle", portuguese: "Tio materno" },
      { lari: "Kinkwezi", french: "Beau-frère / belle-sœur", english: "In-law sibling", portuguese: "Cunhado/a" },
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
    ],
    premiumWords: [
      { lari: "Lunguenia", french: "Caméléon", english: "Chameleon", portuguese: "Camaleão" },
      { lari: "Nsombe", french: "Larve du palmier", english: "Palm tree larva", portuguese: "Larva de palmeira" },
      { lari: "Malembe", french: "Cigogne", english: "Stork", portuguese: "Cegonha" },
      { lari: "Boria", french: "Tique", english: "Tick", portuguese: "Carrapato" },
      { lari: "Nkosi", french: "Lion", english: "Lion", portuguese: "Leão" },
      { lari: "Nzau", french: "Éléphant", english: "Elephant", portuguese: "Elefante" },
      { lari: "Ngando", french: "Crocodile", english: "Crocodile", portuguese: "Crocodilo" },
      { lari: "Nzimbu", french: "Escargot / coquillage", english: "Snail / shell", portuguese: "Caracol / concha" },
      { lari: "Susu", french: "Poule", english: "Hen", portuguese: "Galinha" },
      { lari: "Nkombo", french: "Chèvre", english: "Goat", portuguese: "Cabra" },
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
      { lari: "Lukaya", french: "Feuille", english: "Leaf", portuguese: "Folha" },
      { lari: "Lumbuetete", french: "Étoile", english: "Star", portuguese: "Estrela" },
      { lari: "Kifulu", french: "Fleur", english: "Flower", portuguese: "Flor" },
    ],
    premiumWords: [
      { lari: "Miti", french: "Arbres", english: "Trees", portuguese: "Árvores" },
      { lari: "Makaya", french: "Feuilles", english: "Leaves", portuguese: "Folhas" },
      { lari: "Mbuetete", french: "Étoiles", english: "Stars", portuguese: "Estrelas" },
      { lari: "Buwa", french: "Champignon", english: "Mushroom", portuguese: "Cogumelo" },
      { lari: "Bifulu", french: "Fleurs", english: "Flowers", portuguese: "Flores" },
      { lari: "Mamba", french: "Eau", english: "Water", portuguese: "Água" },
      { lari: "Mvula", french: "Pluie", english: "Rain", portuguese: "Chuva" },
      { lari: "Ntangu", french: "Soleil / temps", english: "Sun / time", portuguese: "Sol / tempo" },
      { lari: "Ngonda", french: "Lune / mois", english: "Moon / month", portuguese: "Lua / mês" },
      { lari: "Tolo", french: "Montagne", english: "Mountain", portuguese: "Montanha" },
    ],
  },
  {
    id: "body",
    label: "Body",
    lariLabel: "Nitu",
    image: vocabBody,
    words: [
      { lari: "Mulembo", french: "Doigt", english: "Finger", portuguese: "Dedo" },
      { lari: "Kulu", french: "Pied", english: "Foot", portuguese: "Pé" },
      { lari: "Kutu", french: "Oreille", english: "Ear", portuguese: "Orelha" },
      { lari: "Kikoba", french: "Lèvre", english: "Lip", portuguese: "Lábio" },
    ],
    premiumWords: [
      { lari: "Milembo", french: "Doigts", english: "Fingers", portuguese: "Dedos" },
      { lari: "Malu", french: "Pieds", english: "Feet", portuguese: "Pés" },
      { lari: "Makutu", french: "Oreilles", english: "Ears", portuguese: "Orelhas" },
      { lari: "Bibanga", french: "Mentons", english: "Chins", portuguese: "Queixos" },
      { lari: "Mutshila", french: "Queue d'un animal", english: "Tail", portuguese: "Cauda" },
      { lari: "Ntu", french: "Tête", english: "Head", portuguese: "Cabeça" },
      { lari: "Meso", french: "Yeux", english: "Eyes", portuguese: "Olhos" },
      { lari: "Mbembo", french: "Nez", english: "Nose", portuguese: "Nariz" },
      { lari: "Nua", french: "Bouche", english: "Mouth", portuguese: "Boca" },
      { lari: "Luboko", french: "Bras / main", english: "Arm / hand", portuguese: "Braço / mão" },
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
      { lari: "Zu", french: "Bruit, voix, langue", english: "Noise, voice, language", portuguese: "Barulho, voz, língua" },
    ],
    premiumWords: [
      { lari: "Kiamvu", french: "Pont", english: "Bridge", portuguese: "Ponte" },
      { lari: "Kizongo", french: "Coup de fusil", english: "Gunshot", portuguese: "Tiro" },
      { lari: "Kuku", french: "Pierre du foyer", english: "Hearthstone", portuguese: "Pedra da lareira" },
      { lari: "Bindukulu", french: "Clé", english: "Key", portuguese: "Chave" },
      { lari: "Tanga", french: "Lire", english: "To read", portuguese: "Ler" },
      { lari: "Soneka", french: "Écrire", english: "To write", portuguese: "Escrever" },
      { lari: "Yimba", french: "Chanter", english: "To sing", portuguese: "Cantar" },
      { lari: "Bina", french: "Danser", english: "To dance", portuguese: "Dançar" },
    ],
  },
  {
    id: "food",
    label: "Food & Drink",
    lariLabel: "Bidia",
    image: vocabFood,
    words: [
      { lari: "Bidia", french: "Nourriture", english: "Food", portuguese: "Comida" },
      { lari: "Lala dia nsa", french: "Citron", english: "Lemon", portuguese: "Limão" },
      { lari: "Bidisa", french: "Faire bouillir", english: "To make something boil", portuguese: "Fazer ferver" },
    ],
    premiumWords: [
      { lari: "Madia", french: "Nourritures", english: "Foods", portuguese: "Comidas" },
      { lari: "Lubo", french: "Onctuosité d'une sauce", english: "Creaminess of a sauce", portuguese: "Cremosidade de um molho" },
      { lari: "Bidima", french: "Brûler intensément", english: "To burn intensely", portuguese: "Queimar intensamente" },
      { lari: "Lamba", french: "Cuisiner", english: "To cook", portuguese: "Cozinhar" },
      { lari: "Mbala", french: "Patates", english: "Potatoes", portuguese: "Batatas" },
      { lari: "Makemba", french: "Bananes plantain", english: "Plantain bananas", portuguese: "Bananas da terra" },
      { lari: "Nguba", french: "Arachide", english: "Peanut", portuguese: "Amendoim" },
      { lari: "Malavu", french: "Vin de palme", english: "Palm wine", portuguese: "Vinho de palma" },
      { lari: "Mamba", french: "Eau", english: "Water", portuguese: "Água" },
    ],
  },
];

const WordCard = ({ word }: { word: VocabEntry }) => (
  <div className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group">
    <p className="font-mandombe text-3xl text-gold leading-relaxed mb-4">{word.lari}</p>
    <h4 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
      {word.lari}
      <Volume2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
    </h4>
    <div className="space-y-1.5 text-sm">
      <p className="text-muted-foreground"><span className="inline-block w-6 text-xs font-bold text-primary/70">FR</span>{word.french}</p>
      <p className="text-muted-foreground"><span className="inline-block w-6 text-xs font-bold text-primary/70">GB</span>{word.english}</p>
      <p className="text-muted-foreground"><span className="inline-block w-6 text-xs font-bold text-primary/70">PT</span>{word.portuguese}</p>
    </div>
  </div>
);

const VocabularyPreview = () => {
  return (
    <section id="vocabulary" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mandombe text-3xl md:text-4xl text-gold mb-6">Mazita</p>
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">Mazita — Vocabulary</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Essential Words & Phrases</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each word comes in Kikongo Lari with translations in French, English and Portuguese — languages spoken across the Kongo diaspora.
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
              <div className="flex items-center gap-6 mb-8 p-6 bg-card rounded-2xl border border-border">
                <img src={cat.image} alt={cat.label} className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover" />
                <div>
                  <p className="font-mandombe text-2xl text-gold leading-normal mb-4">{cat.lariLabel}</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">{cat.lariLabel}</h3>
                  <p className="text-muted-foreground font-body">
                    {cat.label} — {cat.words.length} free words{cat.premiumWords ? ` + ${cat.premiumWords.length} premium` : ""}
                  </p>
                </div>
              </div>

              {/* Free words */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.words.map((word, i) => (
                  <WordCard key={i} word={word} />
                ))}
              </div>

              {/* Premium words */}
              {cat.premiumWords && cat.premiumWords.length > 0 && (
                <div className="mt-8">
                  <PremiumGate label={`${cat.premiumWords.length} More ${cat.label} Words`}>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cat.premiumWords.map((word, i) => (
                        <WordCard key={i} word={word} />
                      ))}
                    </div>
                  </PremiumGate>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default VocabularyPreview;
