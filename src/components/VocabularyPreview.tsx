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
  note?: string;
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
      { lari: "Bakala", french: "Un homme, un mari", english: "A man, a husband", portuguese: "Um homem, um marido" },
      { lari: "Babakala", french: "Des hommes, des maris", english: "Men, husbands", portuguese: "Homens, maridos" },
      { lari: "Ngudi", french: "La mère", english: "Mother", portuguese: "Mãe", note: "Aussi écrit Nguri. Terme formel pour la mère." },
      { lari: "Mama", french: "Maman ; par politesse, toute femme", english: "Mom; by courtesy, any woman", portuguese: "Mamã; por cortesia, qualquer mulher" },
      { lari: "Bamama", french: "Les mamans ; par politesse, les femmes", english: "Moms; by courtesy, the women", portuguese: "As mamãs; por cortesia, as mulheres" },
      { lari: "Tata", french: "Le père ; par politesse, tout homme", english: "Father; by courtesy, any man", portuguese: "Pai; por cortesia, qualquer homem" },
      { lari: "Batata", french: "Les pères ; par politesse, les hommes", english: "Fathers; by courtesy, the men", portuguese: "Os pais; por cortesia, os homens" },
      { lari: "Mpangi", french: "Le cadet, la cadette, le petit frère, la petite sœur", english: "Younger sibling, the youngest", portuguese: "Caçula, irmão/irmã mais novo(a)" },
      { lari: "Nkazi", french: "Le frère", english: "Brother", portuguese: "Irmão", note: "Aussi écrit Nkaji." },
      { lari: "Ngua Nkaji", french: "L'oncle maternel", english: "Maternal uncle", portuguese: "Tio materno" },
      { lari: "Nzari", french: "Beau-frère / belle-sœur", english: "Brother-in-law / sister-in-law", portuguese: "Cunhado/a", note: "Comme le fleuve (nzari), car ils font continuer la lignée. Pluriel : Banzari (peu usité)." },
      { lari: "Nkueji", french: "Homme marié dans la famille (pièce rapportée)", english: "Man married into the family", portuguese: "Homem casado na família", note: "S'applique aux hommes seulement. Pluriel : Bankueji." },
      { lari: "Kinkueji", french: "Alliance entre deux familles par le mariage", english: "Alliance between two families through marriage", portuguese: "Aliança entre duas famílias pelo casamento" },
    ],
  },
  {
    id: "animals",
    label: "Animals",
    lariLabel: "Bibulu",
    image: vocabAnimals,
    words: [
      { lari: "Tshibulu / Kibulu", french: "Un animal", english: "An animal", portuguese: "Um animal", note: "Singulier de Bibulu." },
      { lari: "Bibulu", french: "Les animaux", english: "Animals", portuguese: "Animais" },
      { lari: "Mbuma", french: "Chat", english: "Cat", portuguese: "Gato" },
      { lari: "Mbua", french: "Chien", english: "Dog", portuguese: "Cão" },
      { lari: "Mulumba", french: "Lapin", english: "Rabbit", portuguese: "Coelho" },
      { lari: "Milumba", french: "Lapins", english: "Rabbits", portuguese: "Coelhos" },
      { lari: "Nsusu", french: "Poule", english: "Hen", portuguese: "Galinha" },
      { lari: "Nkombo", french: "Chèvre", english: "Goat", portuguese: "Cabra" },
    ],
    premiumWords: [
      { lari: "Ngo mbulu", french: "Lion", english: "Lion", portuguese: "Leão" },
      { lari: "Ngo", french: "Léopard", english: "Leopard", portuguese: "Leopardo" },
      { lari: "Ngo zulu", french: "Aigle", english: "Eagle", portuguese: "Águia" },
      { lari: "Mbemba", french: "Aigle royal", english: "Royal eagle", portuguese: "Águia real" },
      { lari: "Ngombe", french: "Bœuf", english: "Ox / Cow", portuguese: "Boi / Vaca" },
      { lari: "Ngulu", french: "Cochon", english: "Pig", portuguese: "Porco" },
      { lari: "Ngulu mushitu", french: "Sanglier", english: "Wild boar", portuguese: "Javali" },
      { lari: "Buluku", french: "Âne", english: "Donkey", portuguese: "Burro" },
      { lari: "Mabuluku", french: "Ânes", english: "Donkeys", portuguese: "Burros" },
      { lari: "Kindongo / Tshindongo", french: "Mouton", english: "Sheep", portuguese: "Ovelha" },
      { lari: "Bindongo", french: "Moutons", english: "Sheep (pl.)", portuguese: "Ovelhas" },
      { lari: "Nkabi", french: "Antilope", english: "Antelope", portuguese: "Antílope" },
      { lari: "Nguvu", french: "Hippopotame", english: "Hippopotamus", portuguese: "Hipopótamo", note: "Aussi le nom d'une sorte d'igname." },
      { lari: "Nzau", french: "Éléphant", english: "Elephant", portuguese: "Elefante" },
      { lari: "Ngandu", french: "Crocodile", english: "Crocodile", portuguese: "Crocodilo" },
      { lari: "Mfuenge", french: "Renard", english: "Fox", portuguese: "Raposa" },
      { lari: "Kimbungu / Tshimbungu", french: "Hyène", english: "Hyena", portuguese: "Hiena" },
      { lari: "Bimbungu", french: "Hyènes", english: "Hyenas", portuguese: "Hienas" },
      { lari: "Mpari", french: "Écureuil", english: "Squirrel", portuguese: "Esquilo" },
      { lari: "Mbende", french: "Rat rayé", english: "Striped rat", portuguese: "Rato listrado" },
      { lari: "Mpuku", french: "Rat(s)", english: "Rat(s)", portuguese: "Rato(s)" },
      { lari: "Tutu", french: "Souris", english: "Mouse", portuguese: "Rato pequeno" },
      { lari: "Matutu", french: "Souris (pl.)", english: "Mice", portuguese: "Ratos pequenos" },
      { lari: "Nioka", french: "Serpent", english: "Snake", portuguese: "Serpente" },
      { lari: "Mboma", french: "Boa", english: "Boa", portuguese: "Jiboia" },
      { lari: "Mpiri", french: "Vipère", english: "Viper", portuguese: "Víbora" },
      { lari: "Bembe", french: "Pigeon", english: "Pigeon", portuguese: "Pombo" },
      { lari: "Mabembe", french: "Pigeons", english: "Pigeons", portuguese: "Pombos" },
      { lari: "Nkelele", french: "Pintade", english: "Guinea fowl", portuguese: "Galinha-d'angola" },
      { lari: "Nkusu", french: "Perroquet", english: "Parrot", portuguese: "Papagaio" },
      { lari: "Tshaku", french: "Perroquet (mot d'enfant)", english: "Parrot (child's word)", portuguese: "Papagaio (palavra infantil)" },
      { lari: "Nsongi", french: "Colibri", english: "Hummingbird", portuguese: "Beija-flor" },
      { lari: "Lembe", french: "Cigogne", english: "Stork", portuguese: "Cegonha" },
      { lari: "Malembe", french: "Cigognes", english: "Storks", portuguese: "Cegonhas" },
      { lari: "Lubebende", french: "Hirondelle", english: "Swallow", portuguese: "Andorinha" },
      { lari: "Tubebende", french: "Hirondelles", english: "Swallows", portuguese: "Andorinhas" },
      { lari: "Tumbembemba", french: "Papillons", english: "Butterflies", portuguese: "Borboletas" },
      { lari: "Tunguenia", french: "Caméléons", english: "Chameleons", portuguese: "Camaleões" },
      { lari: "Tshihala", french: "Lézard", english: "Lizard", portuguese: "Lagarto" },
      { lari: "Bihala", french: "Lézards", english: "Lizards", portuguese: "Lagartos" },
      { lari: "Tshishalala / Kishalala", french: "Gecko", english: "Gecko", portuguese: "Lagartixa" },
      { lari: "Bishalala", french: "Geckos", english: "Geckos", portuguese: "Lagartixas" },
      { lari: "Ngembo", french: "Roussette", english: "Fruit bat", portuguese: "Morcego-frugívoro" },
      { lari: "Lumfikini", french: "Chauve-souris", english: "Bat", portuguese: "Morcego" },
      { lari: "Tumfikini", french: "Chauves-souris", english: "Bats", portuguese: "Morcegos" },
      { lari: "Tshimpete / Kimpete", french: "Poisson", english: "Fish", portuguese: "Peixe" },
      { lari: "Bimpete", french: "Poissons", english: "Fish (pl.)", portuguese: "Peixes" },
      { lari: "Mbiji mamba", french: "Poisson (lit. créature de l'eau)", english: "Fish (lit. creature of water)", portuguese: "Peixe (lit. criatura da água)" },
      { lari: "Ngola", french: "Poisson-chat", english: "Catfish", portuguese: "Bagre" },
      { lari: "N'tondia / Mutondia", french: "Anguille", english: "Eel", portuguese: "Enguia" },
      { lari: "Mitondia", french: "Anguilles", english: "Eels", portuguese: "Enguias" },
      { lari: "Mpangu", french: "Grenouille", english: "Frog", portuguese: "Rã" },
      { lari: "Tshula", french: "Crapaud", english: "Toad", portuguese: "Sapo" },
      { lari: "Biula", french: "Crapauds", english: "Toads", portuguese: "Sapos" },
      { lari: "Taka", french: "Têtard", english: "Tadpole", portuguese: "Girino" },
      { lari: "Nkodia Nkuata", french: "Escargot", english: "Snail", portuguese: "Caracol" },
      { lari: "Nzimbu", french: "Cauris", english: "Cowrie shells", portuguese: "Búzios" },
      { lari: "Bodia", french: "Tique", english: "Tick", portuguese: "Carrapato" },
      { lari: "Mabodia", french: "Tiques", english: "Ticks", portuguese: "Carrapatos" },
      { lari: "Nsombe", french: "Larve du palmier", english: "Palm tree larva", portuguese: "Larva de palmeira" },
      { lari: "Nianji", french: "Mouche", english: "Fly", portuguese: "Mosca" },
      { lari: "Lubu", french: "Moustique", english: "Mosquito", portuguese: "Mosquito" },
      { lari: "Mbu", french: "Moustiques", english: "Mosquitoes", portuguese: "Mosquitos" },
      { lari: "Weka", french: "Taon", english: "Horsefly", portuguese: "Mutuca" },
      { lari: "Maweka", french: "Taons", english: "Horseflies", portuguese: "Mutucas" },
      { lari: "Nioshi", french: "Abeille", english: "Bee", portuguese: "Abelha" },
      { lari: "Lumpunguzala", french: "Libellule", english: "Dragonfly", portuguese: "Libélula" },
      { lari: "Tumpunguzala", french: "Libellules", english: "Dragonflies", portuguese: "Libélulas" },
      { lari: "Muntudia", french: "Sangsue", english: "Leech", portuguese: "Sanguessuga" },
      { lari: "Mintudia", french: "Sangsues", english: "Leeches", portuguese: "Sanguessugas" },
      { lari: "Lunama", french: "Limace", english: "Slug", portuguese: "Lesma" },
      { lari: "Tunama", french: "Limaces", english: "Slugs", portuguese: "Lesmas" },
      { lari: "Ngongolo", french: "Mille-pattes", english: "Millipede", portuguese: "Centopeias" },
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
      {word.note && <p className="text-muted-foreground/70 italic text-xs mt-2">💡 {word.note}</p>}
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
