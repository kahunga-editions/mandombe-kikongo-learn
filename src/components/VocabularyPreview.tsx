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
import vocabNumbers from "@/assets/vocab-numbers.jpg";
import vocabColors from "@/assets/vocab-colors.jpg";

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
      { lari: "Ndumba", french: "La jeune fille", english: "Young woman, girl", portuguese: "A jovem, rapariga" },
      { lari: "Bandumba", french: "Les jeunes filles", english: "Young women, girls", portuguese: "As jovens, raparigas" },
      { lari: "Toko", french: "Le jeune homme", english: "Young man", portuguese: "O jovem, rapaz" },
      { lari: "Buko", french: "Femme de l'oncle maternel / Belle-mère (maman du mari ou de la femme)", english: "Maternal uncle's wife / Mother-in-law", portuguese: "Esposa do tio materno / Sogra", note: "Pluriel : Mako" },
      { lari: "Mako", french: "Les belles-mères / Les femmes des oncles maternels", english: "Mothers-in-law / Maternal uncles' wives", portuguese: "As sogras / Esposas dos tios maternos" },
      { lari: "Matoko", french: "Les jeunes hommes", english: "Young men", portuguese: "Os jovens, rapazes" },
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
      { lari: "Ngumbi", french: "Perdrix", english: "Partridge", portuguese: "Perdiz" },
      { lari: "Nkala", french: "Crabe", english: "Crab", portuguese: "Caranguejo" },
      { lari: "Kinienia / Tshinienia", french: "Fourmi", english: "Ant", portuguese: "Formiga" },
      { lari: "Binienia", french: "Fourmis", english: "Ants", portuguese: "Formigas" },
      { lari: "Tsibubu / Kibubu", french: "Gorille", english: "Gorilla", portuguese: "Gorila" },
      { lari: "Bibubu", french: "Gorilles", english: "Gorillas", portuguese: "Gorilas" },
      { lari: "Kivuadangu / Tshivuadangu", french: "Canard", english: "Duck", portuguese: "Pato" },
      { lari: "Bivuadangu", french: "Canards", english: "Ducks", portuguese: "Patos" },
      { lari: "Mfulu", french: "Tortue", english: "Turtle / Tortoise", portuguese: "Tartaruga" },
      { lari: "Nkumbi", french: "Un gros rat", english: "A large rat", portuguese: "Um rato grande" },
      { lari: "Kuti", french: "Hibou", english: "Owl", portuguese: "Coruja" },
      { lari: "Mpakasa", french: "Buffle", english: "Buffalo", portuguese: "Búfalo" },
      { lari: "Mbambi", french: "Iguane, dragon", english: "Iguana, dragon", portuguese: "Iguana, dragão" },
      { lari: "Mpese", french: "Cafard", english: "Cockroach", portuguese: "Barata" },
      { lari: "Kumbi", french: "Voiture", english: "Car", portuguese: "Carro" },
      { lari: "Makumbi", french: "Voitures", english: "Cars", portuguese: "Carros" },
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
      { lari: "Ntu", french: "Tête", english: "Head", portuguese: "Cabeça" },
      { lari: "Disu", french: "Œil", english: "Eye", portuguese: "Olho" },
      { lari: "Meso", french: "Yeux", english: "Eyes", portuguese: "Olhos" },
      { lari: "Mbombo", french: "Nez", english: "Nose", portuguese: "Nariz" },
      { lari: "Nua", french: "Bouche", english: "Mouth", portuguese: "Boca" },
      { lari: "Kutu", french: "Oreille", english: "Ear", portuguese: "Orelha" },
      { lari: "Koko", french: "Main, bras", english: "Hand, arm", portuguese: "Mão, braço" },
      { lari: "Kulu", french: "Pied", english: "Foot", portuguese: "Pé" },
    ],
    premiumWords: [
      // Head & Face
      { lari: "Nsuki", french: "Cheveux", english: "Hair", portuguese: "Cabelo" },
      { lari: "Mbunzu", french: "Front", english: "Forehead", portuguese: "Testa" },
      { lari: "Ntumpa", french: "Fontanelle", english: "Fontanelle", portuguese: "Fontanela" },
      { lari: "Nse", french: "Sourcil", english: "Eyebrow", portuguese: "Sobrancelha" },
      { lari: "Lulabu", french: "Cil", english: "Eyelash", portuguese: "Cílio" },
      { lari: "Ndabu", french: "Cils", english: "Eyelashes", portuguese: "Cílios" },
      { lari: "Makutu", french: "Oreilles", english: "Ears", portuguese: "Orelhas" },
      { lari: "Bundi", french: "Joue, tempe", english: "Cheek, temple", portuguese: "Bochecha, têmpora" },
      { lari: "Mabundi", french: "Tempes, joues", english: "Temples, cheeks", portuguese: "Têmporas, bochechas" },
      { lari: "Kikoba", french: "Lèvre", english: "Lip", portuguese: "Lábio" },
      { lari: "Mfinini", french: "Gencives", english: "Gums", portuguese: "Gengivas" },
      { lari: "Banga", french: "Mâchoire", english: "Jaw", portuguese: "Mandíbula" },
      { lari: "Mabanga", french: "Mâchoire (pl.)", english: "Jaws", portuguese: "Mandíbulas" },
      { lari: "Tshibanga", french: "Menton", english: "Chin", portuguese: "Queixo" },
      { lari: "Bibanga", french: "Mentons", english: "Chins", portuguese: "Queixos" },
      { lari: "Yevo / Yelo", french: "Barbe", english: "Beard", portuguese: "Barba" },
      { lari: "Kiyelo / Tshiyelo", french: "Barbe", english: "Beard", portuguese: "Barba" },
      { lari: "Biyelo", french: "Barbes", english: "Beards", portuguese: "Barbas" },
      // Neck & Torso
      { lari: "Nsingu", french: "Cou", english: "Neck", portuguese: "Pescoço" },
      { lari: "Koshi", french: "Nuque", english: "Nape", portuguese: "Nuca" },
      { lari: "Hembo", french: "Épaule", english: "Shoulder", portuguese: "Ombro" },
      { lari: "Mahembo", french: "Épaules", english: "Shoulders", portuguese: "Ombros" },
      { lari: "Ntulu", french: "Poitrine", english: "Chest", portuguese: "Peito" },
      { lari: "Beni", french: "Sein", english: "Breast", portuguese: "Seio" },
      { lari: "Mabeni", french: "Seins", english: "Breasts", portuguese: "Seios" },
      { lari: "Nima", french: "Dos", english: "Back", portuguese: "Costas" },
      { lari: "Moyo", french: "Ventre", english: "Belly", portuguese: "Barriga" },
      { lari: "Nkumba", french: "Nombril", english: "Navel", portuguese: "Umbigo" },
      { lari: "Luketo", french: "Reins", english: "Lower back, kidneys", portuguese: "Rins, lombar" },
      { lari: "Suku", french: "Postérieur", english: "Posterior, backside", portuguese: "Traseiro" },
      { lari: "Tuku", french: "Fesse", english: "Buttock", portuguese: "Nádega" },
      { lari: "Mataku", french: "Fesses", english: "Buttocks", portuguese: "Nádegas" },
      // Arms & Hands
      { lari: "Nima koko", french: "Dos de la main", english: "Back of the hand", portuguese: "Dorso da mão" },
      { lari: "Mbata", french: "Paume", english: "Palm", portuguese: "Palma" },
      { lari: "Lembo / Mulembo", french: "Doigt", english: "Finger", portuguese: "Dedo" },
      { lari: "Milembo", french: "Doigts", english: "Fingers", portuguese: "Dedos" },
      { lari: "Luzala", french: "Ongle", english: "Nail", portuguese: "Unha" },
      { lari: "Nzala", french: "Ongles", english: "Nails", portuguese: "Unhas" },
      // Legs & Feet
      { lari: "Koto", french: "Genou", english: "Knee", portuguese: "Joelho" },
      { lari: "Makoto", french: "Genoux", english: "Knees", portuguese: "Joelhos" },
      { lari: "Ntanga", french: "Mollet", english: "Calf", portuguese: "Panturrilha" },
      { lari: "Mitanga", french: "Mollets", english: "Calves", portuguese: "Panturrilhas" },
      { lari: "Tshinkoso", french: "Talon", english: "Heel", portuguese: "Calcanhar" },
      { lari: "Binkoso", french: "Talons", english: "Heels", portuguese: "Calcanhares" },
      { lari: "Malu", french: "Pieds", english: "Feet", portuguese: "Pés" },
      // Internal organs & Tissues
      { lari: "Ntima", french: "Cœur", english: "Heart", portuguese: "Coração" },
      { lari: "Mitima", french: "Cœurs", english: "Hearts", portuguese: "Corações" },
      { lari: "Sakafulu", french: "Poumon", english: "Lung", portuguese: "Pulmão" },
      { lari: "Tshifundu", french: "Estomac", english: "Stomach", portuguese: "Estômago" },
      { lari: "Midia", french: "Entrailles", english: "Entrails", portuguese: "Entranhas" },
      { lari: "Nkanda", french: "Peau", english: "Skin", portuguese: "Pele" },
      { lari: "Yisi", french: "Os", english: "Bone", portuguese: "Osso" },
      { lari: "Biyisi", french: "Os (pluriel)", english: "Bones", portuguese: "Ossos" },
      { lari: "Tidi", french: "Tendon", english: "Tendon", portuguese: "Tendão" },
      { lari: "Matidi", french: "Tendons", english: "Tendons", portuguese: "Tendões" },
      { lari: "Muelo", french: "Chakra", english: "Chakra", portuguese: "Chakra" },
      { lari: "Mielo", french: "Chakras", english: "Chakras", portuguese: "Chakras" },
      // Reproductive
      { lari: "Sondo", french: "Clitoris", english: "Clitoris", portuguese: "Clitóris" },
      { lari: "Mbula", french: "Vagin", english: "Vagina", portuguese: "Vagina" },
      { lari: "Kata", french: "Testicule", english: "Testicle", portuguese: "Testículo" },
      { lari: "Makata", french: "Testicules", english: "Testicles", portuguese: "Testículos" },
      { lari: "Mvia", french: "Pénis", english: "Penis", portuguese: "Pénis" },
      { lari: "Sutu", french: "Pénis non circoncis", english: "Uncircumcised penis", portuguese: "Pénis não circuncidado" },
      // Fluids
      { lari: "Menga", french: "Sang", english: "Blood", portuguese: "Sangue" },
      { lari: "Tiafuta", french: "Sueur", english: "Sweat", portuguese: "Suor" },
      { lari: "Masuba", french: "Urines", english: "Urine", portuguese: "Urina" },
      { lari: "Maluma", french: "Sperme", english: "Sperm", portuguese: "Esperma" },
      { lari: "Mante", french: "Salive", english: "Saliva", portuguese: "Saliva" },
      { lari: "Tuvi", french: "Selles, caca", english: "Feces", portuguese: "Fezes" },
      // Other
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
      { lari: "Mafuta ma nioshi", french: "Miel", english: "Honey", portuguese: "Mel" },
    ],
  },
  {
    id: "numbers",
    label: "Numbers",
    lariLabel: "Ntalu",
    image: vocabNumbers,
    words: [
      { lari: "Mpavala", french: "Zéro", english: "Zero", portuguese: "Zero" },
      { lari: "Moshi", french: "Un (1)", english: "One (1)", portuguese: "Um (1)" },
      { lari: "Zole", french: "Deux (2)", english: "Two (2)", portuguese: "Dois (2)" },
      { lari: "Tatu", french: "Trois (3)", english: "Three (3)", portuguese: "Três (3)" },
      { lari: "Ya", french: "Quatre (4)", english: "Four (4)", portuguese: "Quatro (4)" },
      { lari: "Tanu", french: "Cinq (5)", english: "Five (5)", portuguese: "Cinco (5)" },
      { lari: "Sambanu", french: "Six (6)", english: "Six (6)", portuguese: "Seis (6)" },
      { lari: "Nsambuadi", french: "Sept (7)", english: "Seven (7)", portuguese: "Sete (7)" },
      { lari: "Nana / Mpomo", french: "Huit (8)", english: "Eight (8)", portuguese: "Oito (8)" },
      { lari: "Vua", french: "Neuf (9)", english: "Nine (9)", portuguese: "Nove (9)" },
      { lari: "Kumi", french: "Dix (10)", english: "Ten (10)", portuguese: "Dez (10)" },
    ],
    premiumWords: [
      { lari: "Kumi na moshi", french: "Onze (11)", english: "Eleven (11)", portuguese: "Onze (11)" },
      { lari: "Kumi na zole", french: "Douze (12)", english: "Twelve (12)", portuguese: "Doze (12)" },
      { lari: "Kumi na tatu", french: "Treize (13)", english: "Thirteen (13)", portuguese: "Treze (13)" },
      { lari: "Kumi na ya", french: "Quatorze (14)", english: "Fourteen (14)", portuguese: "Catorze (14)" },
      { lari: "Kumi na tanu", french: "Quinze (15)", english: "Fifteen (15)", portuguese: "Quinze (15)" },
      { lari: "Kumi na sambanu", french: "Seize (16)", english: "Sixteen (16)", portuguese: "Dezesseis (16)" },
      { lari: "Kumi na nsambuadi", french: "Dix-sept (17)", english: "Seventeen (17)", portuguese: "Dezessete (17)" },
      { lari: "Kumi na nana", french: "Dix-huit (18)", english: "Eighteen (18)", portuguese: "Dezoito (18)" },
      { lari: "Kumi na vua", french: "Dix-neuf (19)", english: "Nineteen (19)", portuguese: "Dezanove (19)" },
      { lari: "Makumole", french: "Vingt (20)", english: "Twenty (20)", portuguese: "Vinte (20)" },
      { lari: "Makumole na moshi", french: "Vingt-et-un (21)", english: "Twenty-one (21)", portuguese: "Vinte e um (21)" },
      { lari: "Makumole na zole", french: "Vingt-deux (22)", english: "Twenty-two (22)", portuguese: "Vinte e dois (22)" },
      { lari: "Makumole na tatu", french: "Vingt-trois (23)", english: "Twenty-three (23)", portuguese: "Vinte e três (23)" },
      { lari: "Makumole na ya", french: "Vingt-quatre (24)", english: "Twenty-four (24)", portuguese: "Vinte e quatro (24)" },
      { lari: "Makumole na tanu", french: "Vingt-cinq (25)", english: "Twenty-five (25)", portuguese: "Vinte e cinco (25)" },
      { lari: "Makumole na sambanu", french: "Vingt-six (26)", english: "Twenty-six (26)", portuguese: "Vinte e seis (26)" },
      { lari: "Makumole na nsambuadi", french: "Vingt-sept (27)", english: "Twenty-seven (27)", portuguese: "Vinte e sete (27)" },
      { lari: "Makumole na nana", french: "Vingt-huit (28)", english: "Twenty-eight (28)", portuguese: "Vinte e oito (28)" },
      { lari: "Makumole na vua", french: "Vingt-neuf (29)", english: "Twenty-nine (29)", portuguese: "Vinte e nove (29)" },
      { lari: "Makumatatu", french: "Trente (30)", english: "Thirty (30)", portuguese: "Trinta (30)" },
      { lari: "Makumatatu na moshi", french: "Trente-et-un (31)", english: "Thirty-one (31)", portuguese: "Trinta e um (31)" },
      { lari: "Makumatatu na zole", french: "Trente-deux (32)", english: "Thirty-two (32)", portuguese: "Trinta e dois (32)" },
      { lari: "Makumatatu na tatu", french: "Trente-trois (33)", english: "Thirty-three (33)", portuguese: "Trinta e três (33)" },
      { lari: "Makumatatu na ya", french: "Trente-quatre (34)", english: "Thirty-four (34)", portuguese: "Trinta e quatro (34)" },
      { lari: "Makumatatu na tanu", french: "Trente-cinq (35)", english: "Thirty-five (35)", portuguese: "Trinta e cinco (35)" },
      { lari: "Makumatatu na sambanu", french: "Trente-six (36)", english: "Thirty-six (36)", portuguese: "Trinta e seis (36)" },
      { lari: "Makumatu na nsambuadi", french: "Trente-sept (37)", english: "Thirty-seven (37)", portuguese: "Trinta e sete (37)" },
      { lari: "Makumatu na nana", french: "Trente-huit (38)", english: "Thirty-eight (38)", portuguese: "Trinta e oito (38)" },
      { lari: "Makumatu na vua", french: "Trente-neuf (39)", english: "Thirty-nine (39)", portuguese: "Trinta e nove (39)" },
      { lari: "Makumaya", french: "Quarante (40)", english: "Forty (40)", portuguese: "Quarenta (40)" },
      { lari: "Makumaya na moshi", french: "Quarante-et-un (41)", english: "Forty-one (41)", portuguese: "Quarenta e um (41)" },
      { lari: "Makumaya na zole", french: "Quarante-deux (42)", english: "Forty-two (42)", portuguese: "Quarenta e dois (42)" },
      { lari: "Makumaya na tatu", french: "Quarante-trois (43)", english: "Forty-three (43)", portuguese: "Quarenta e três (43)" },
      { lari: "Makumaya na ya", french: "Quarante-quatre (44)", english: "Forty-four (44)", portuguese: "Quarenta e quatro (44)" },
      { lari: "Makumaya na tanu", french: "Quarante-cinq (45)", english: "Forty-five (45)", portuguese: "Quarenta e cinco (45)" },
      { lari: "Makumaya na sambanu", french: "Quarante-six (46)", english: "Forty-six (46)", portuguese: "Quarenta e seis (46)" },
      { lari: "Makumaya ya nsambuadi", french: "Quarante-sept (47)", english: "Forty-seven (47)", portuguese: "Quarenta e sete (47)" },
      { lari: "Makumaya ya nana", french: "Quarante-huit (48)", english: "Forty-eight (48)", portuguese: "Quarenta e oito (48)" },
      { lari: "Makumaya na vua", french: "Quarante-neuf (49)", english: "Forty-nine (49)", portuguese: "Quarenta e nove (49)" },
      { lari: "Makumatanu", french: "Cinquante (50)", english: "Fifty (50)", portuguese: "Cinquenta (50)" },
      { lari: "Makumatanu na moshi", french: "Cinquante-et-un (51)", english: "Fifty-one (51)", portuguese: "Cinquenta e um (51)" },
      { lari: "Makumatanu na zole", french: "Cinquante-deux (52)", english: "Fifty-two (52)", portuguese: "Cinquenta e dois (52)" },
      { lari: "Makumatanu na tatu", french: "Cinquante-trois (53)", english: "Fifty-three (53)", portuguese: "Cinquenta e três (53)" },
      { lari: "Makumatanu na ya", french: "Cinquante-quatre (54)", english: "Fifty-four (54)", portuguese: "Cinquenta e quatro (54)" },
      { lari: "Makumatanu na tanu", french: "Cinquante-cinq (55)", english: "Fifty-five (55)", portuguese: "Cinquenta e cinco (55)" },
      { lari: "Makumatanu na sambanu", french: "Cinquante-six (56)", english: "Fifty-six (56)", portuguese: "Cinquenta e seis (56)" },
      { lari: "Makumatanu na nsambuadi", french: "Cinquante-sept (57)", english: "Fifty-seven (57)", portuguese: "Cinquenta e sete (57)" },
      { lari: "Makumatanu na nana", french: "Cinquante-huit (58)", english: "Fifty-eight (58)", portuguese: "Cinquenta e oito (58)" },
      { lari: "Makumatanu na vua", french: "Cinquante-neuf (59)", english: "Fifty-nine (59)", portuguese: "Cinquenta e nove (59)" },
      { lari: "Makumasambanu", french: "Soixante (60)", english: "Sixty (60)", portuguese: "Sessenta (60)" },
      { lari: "Makumasambanu na moshi", french: "Soixante-et-un (61)", english: "Sixty-one (61)", portuguese: "Sessenta e um (61)" },
      { lari: "Makumasambanu na zole", french: "Soixante-deux (62)", english: "Sixty-two (62)", portuguese: "Sessenta e dois (62)" },
      { lari: "Makusamasambanu na tatu", french: "Soixante-trois (63)", english: "Sixty-three (63)", portuguese: "Sessenta e três (63)" },
      { lari: "Makumasambanu na ya", french: "Soixante-quatre (64)", english: "Sixty-four (64)", portuguese: "Sessenta e quatro (64)" },
      { lari: "Makumasambanu na tanu", french: "Soixante-cinq (65)", english: "Sixty-five (65)", portuguese: "Sessenta e cinco (65)" },
      { lari: "Makumasambanu na sambanu", french: "Soixante-six (66)", english: "Sixty-six (66)", portuguese: "Sessenta e seis (66)" },
      { lari: "Makumasambanu na nsambuadi", french: "Soixante-sept (67)", english: "Sixty-seven (67)", portuguese: "Sessenta e sete (67)" },
      { lari: "Makumasambanu na nana", french: "Soixante-huit (68)", english: "Sixty-eight (68)", portuguese: "Sessenta e oito (68)" },
      { lari: "Makumasambanu na vua", french: "Soixante-neuf (69)", english: "Sixty-nine (69)", portuguese: "Sessenta e nove (69)" },
      { lari: "Lusambuadi", french: "Soixante-dix (70)", english: "Seventy (70)", portuguese: "Setenta (70)" },
      { lari: "Lusambuadi na moshi", french: "Soixante-et-onze (71)", english: "Seventy-one (71)", portuguese: "Setenta e um (71)" },
      { lari: "Lusambuadi na zole", french: "Soixante-douze (72)", english: "Seventy-two (72)", portuguese: "Setenta e dois (72)" },
      { lari: "Lusambuadi na tatu", french: "Soixante-treize (73)", english: "Seventy-three (73)", portuguese: "Setenta e três (73)" },
      { lari: "Lusambuadi na ya", french: "Soixante-quatorze (74)", english: "Seventy-four (74)", portuguese: "Setenta e quatro (74)" },
      { lari: "Lusambuadi na tanu", french: "Soixante-quinze (75)", english: "Seventy-five (75)", portuguese: "Setenta e cinco (75)" },
      { lari: "Lusambuadi na sambanu", french: "Soixante-seize (76)", english: "Seventy-six (76)", portuguese: "Setenta e seis (76)" },
      { lari: "Lusambuadi na nsambuadi", french: "Soixante-dix-sept (77)", english: "Seventy-seven (77)", portuguese: "Setenta e sete (77)" },
      { lari: "Lusambuadi na nana", french: "Soixante-dix-huit (78)", english: "Seventy-eight (78)", portuguese: "Setenta e oito (78)" },
      { lari: "Lusambuadi na vua", french: "Soixante-dix-neuf (79)", english: "Seventy-nine (79)", portuguese: "Setenta e nove (79)" },
      { lari: "Lunana", french: "Quatre-vingts (80)", english: "Eighty (80)", portuguese: "Oitenta (80)" },
      { lari: "Lunana na moshi", french: "Quatre-vingt-un (81)", english: "Eighty-one (81)", portuguese: "Oitenta e um (81)" },
      { lari: "Lunana na zole", french: "Quatre-vingt-deux (82)", english: "Eighty-two (82)", portuguese: "Oitenta e dois (82)" },
      { lari: "Lunana na tatu", french: "Quatre-vingt-trois (83)", english: "Eighty-three (83)", portuguese: "Oitenta e três (83)" },
      { lari: "Lunana na ya", french: "Quatre-vingt-quatre (84)", english: "Eighty-four (84)", portuguese: "Oitenta e quatro (84)" },
      { lari: "Lunana na tanu", french: "Quatre-vingt-cinq (85)", english: "Eighty-five (85)", portuguese: "Oitenta e cinco (85)" },
      { lari: "Lunana na sambanu", french: "Quatre-vingt-six (86)", english: "Eighty-six (86)", portuguese: "Oitenta e seis (86)" },
      { lari: "Lunana na nsambuadi", french: "Quatre-vingt-sept (87)", english: "Eighty-seven (87)", portuguese: "Oitenta e sete (87)" },
      { lari: "Lunana na nana", french: "Quatre-vingt-huit (88)", english: "Eighty-eight (88)", portuguese: "Oitenta e oito (88)" },
      { lari: "Lunana na vua", french: "Quatre-vingt-neuf (89)", english: "Eighty-nine (89)", portuguese: "Oitenta e nove (89)" },
      { lari: "Luvua", french: "Quatre-vingt-dix (90)", english: "Ninety (90)", portuguese: "Noventa (90)" },
      { lari: "Luvua na moshi", french: "Quatre-vingt-onze (91)", english: "Ninety-one (91)", portuguese: "Noventa e um (91)" },
      { lari: "Luvua na zole", french: "Quatre-vingt-douze (92)", english: "Ninety-two (92)", portuguese: "Noventa e dois (92)" },
      { lari: "Luvua na tatu", french: "Quatre-vingt-treize (93)", english: "Ninety-three (93)", portuguese: "Noventa e três (93)" },
      { lari: "Luvua na ya", french: "Quatre-vingt-quatorze (94)", english: "Ninety-four (94)", portuguese: "Noventa e quatro (94)" },
      { lari: "Luvua na tanu", french: "Quatre-vingt-quinze (95)", english: "Ninety-five (95)", portuguese: "Noventa e cinco (95)" },
      { lari: "Luvua na sambanu", french: "Quatre-vingt-seize (96)", english: "Ninety-six (96)", portuguese: "Noventa e seis (96)" },
      { lari: "Luvua na nsambuadi", french: "Quatre-vingt-dix-sept (97)", english: "Ninety-seven (97)", portuguese: "Noventa e sete (97)" },
      { lari: "Luvua na nana", french: "Quatre-vingt-dix-huit (98)", english: "Ninety-eight (98)", portuguese: "Noventa e oito (98)" },
      { lari: "Luvua na vua", french: "Quatre-vingt-dix-neuf (99)", english: "Ninety-nine (99)", portuguese: "Noventa e nove (99)" },
      { lari: "Nkama", french: "Cent (100)", english: "One hundred (100)", portuguese: "Cem (100)" },
      { lari: "Nkama na moshi", french: "Cent un (101)", english: "One hundred and one (101)", portuguese: "Cento e um (101)" },
      { lari: "Nkama zole", french: "Deux cents (200)", english: "Two hundred (200)", portuguese: "Duzentos (200)" },
      { lari: "Nkama tatu", french: "Trois cents (300)", english: "Three hundred (300)", portuguese: "Trezentos (300)" },
      { lari: "Nkama ya", french: "Quatre cents (400)", english: "Four hundred (400)", portuguese: "Quatrocentos (400)" },
      { lari: "Nkama tanu", french: "Cinq cents (500)", english: "Five hundred (500)", portuguese: "Quinhentos (500)" },
      { lari: "Nkama sambanu", french: "Six cents (600)", english: "Six hundred (600)", portuguese: "Seiscentos (600)" },
      { lari: "Nkama nsambuadi", french: "Sept cents (700)", english: "Seven hundred (700)", portuguese: "Setecentos (700)" },
      { lari: "Nkama nana", french: "Huit cents (800)", english: "Eight hundred (800)", portuguese: "Oitocentos (800)" },
      { lari: "Nkama vua", french: "Neuf cents (900)", english: "Nine hundred (900)", portuguese: "Novecentos (900)" },
      { lari: "Funda", french: "Mille (1 000)", english: "One thousand (1,000)", portuguese: "Mil (1.000)" },
      { lari: "Mafunda mole", french: "Deux mille (2 000)", english: "Two thousand (2,000)", portuguese: "Dois mil (2.000)" },
      { lari: "Mafunda matatu", french: "Trois mille (3 000)", english: "Three thousand (3,000)", portuguese: "Três mil (3.000)" },
      { lari: "Mafunda maya", french: "Quatre mille (4 000)", english: "Four thousand (4,000)", portuguese: "Quatro mil (4.000)" },
      { lari: "Mafunda matanu", french: "Cinq mille (5 000)", english: "Five thousand (5,000)", portuguese: "Cinco mil (5.000)" },
      { lari: "Mafunda masambanu", french: "Six mille (6 000)", english: "Six thousand (6,000)", portuguese: "Seis mil (6.000)" },
      { lari: "Mafunda nsambuadi", french: "Sept mille (7 000)", english: "Seven thousand (7,000)", portuguese: "Sete mil (7.000)" },
      { lari: "Mafunda nana", french: "Huit mille (8 000)", english: "Eight thousand (8,000)", portuguese: "Oito mil (8.000)" },
      { lari: "Mafunda vua", french: "Neuf mille (9 000)", english: "Nine thousand (9,000)", portuguese: "Nove mil (9.000)" },
      { lari: "Mafunda kumi", french: "Dix mille (10 000)", english: "Ten thousand (10,000)", portuguese: "Dez mil (10.000)" },
      { lari: "Mafunda makumole", french: "Vingt mille (20 000)", english: "Twenty thousand (20,000)", portuguese: "Vinte mil (20.000)" },
      { lari: "Mafunda makumatatu", french: "Trente mille (30 000)", english: "Thirty thousand (30,000)", portuguese: "Trinta mil (30.000)" },
      { lari: "Mafunda makumaya", french: "Quarante mille (40 000)", english: "Forty thousand (40,000)", portuguese: "Quarenta mil (40.000)" },
      { lari: "Mafunda makumatanu", french: "Cinquante mille (50 000)", english: "Fifty thousand (50,000)", portuguese: "Cinquenta mil (50.000)" },
      { lari: "Mafunda makumasambanu", french: "Soixante mille (60 000)", english: "Sixty thousand (60,000)", portuguese: "Sessenta mil (60.000)" },
      { lari: "Mafunda lusambuadi", french: "Soixante-dix mille (70 000)", english: "Seventy thousand (70,000)", portuguese: "Setenta mil (70.000)" },
      { lari: "Mafunda lunana", french: "Quatre-vingt mille (80 000)", english: "Eighty thousand (80,000)", portuguese: "Oitenta mil (80.000)" },
      { lari: "Mafunda luvua", french: "Quatre-vingt-dix mille (90 000)", english: "Ninety thousand (90,000)", portuguese: "Noventa mil (90.000)" },
      { lari: "Mafunda nkama", french: "Cent mille (100 000)", english: "One hundred thousand (100,000)", portuguese: "Cem mil (100.000)" },
      { lari: "Mafunda nkama na makumatanu", french: "Cent cinquante mille (150 000)", english: "One hundred fifty thousand (150,000)", portuguese: "Cento e cinquenta mil (150.000)" },
      { lari: "Mafunda nkama zole", french: "Deux cent mille (200 000)", english: "Two hundred thousand (200,000)", portuguese: "Duzentos mil (200.000)" },
      { lari: "Mafunda nkama zole na makumatanu", french: "Deux cent cinquante mille (250 000)", english: "Two hundred fifty thousand (250,000)", portuguese: "Duzentos e cinquenta mil (250.000)" },
      { lari: "Mafunda nkama tatu", french: "Trois cent mille (300 000)", english: "Three hundred thousand (300,000)", portuguese: "Trezentos mil (300.000)" },
      { lari: "Mafunda nkama tatu na makumatanu", french: "Trois cent cinquante mille (350 000)", english: "Three hundred fifty thousand (350,000)", portuguese: "Trezentos e cinquenta mil (350.000)" },
      { lari: "Mafunda nkama ya", french: "Quatre cent mille (400 000)", english: "Four hundred thousand (400,000)", portuguese: "Quatrocentos mil (400.000)" },
      { lari: "Mafunda nkama ya na makumatanu", french: "Quatre cent cinquante mille (450 000)", english: "Four hundred fifty thousand (450,000)", portuguese: "Quatrocentos e cinquenta mil (450.000)" },
      { lari: "Mafunda nkama tanu", french: "Cinq cent mille (500 000)", english: "Five hundred thousand (500,000)", portuguese: "Quinhentos mil (500.000)" },
      { lari: "Mafunda nkama sambanu", french: "Six cent mille (600 000)", english: "Six hundred thousand (600,000)", portuguese: "Seiscentos mil (600.000)" },
      { lari: "Mafunda nkama nsambuadi", french: "Sept cent mille (700 000)", english: "Seven hundred thousand (700,000)", portuguese: "Setecentos mil (700.000)" },
      { lari: "Mafunda nkama nsambuadi na makumatanu", french: "Sept cent cinquante mille (750 000)", english: "Seven hundred fifty thousand (750,000)", portuguese: "Setecentos e cinquenta mil (750.000)" },
      { lari: "Mafunda nkama nana", french: "Huit cent mille (800 000)", english: "Eight hundred thousand (800,000)", portuguese: "Oitocentos mil (800.000)" },
      { lari: "Mafunda nkama vua", french: "Neuf cent mille (900 000)", english: "Nine hundred thousand (900,000)", portuguese: "Novecentos mil (900.000)" },
      { lari: "Biaji biole", french: "Deux millions (2 000 000)", english: "Two million (2,000,000)", portuguese: "Dois milhões (2.000.000)" },
      { lari: "Biaji bitatu", french: "Trois millions (3 000 000)", english: "Three million (3,000,000)", portuguese: "Três milhões (3.000.000)" },
      { lari: "Biaji biya", french: "Quatre millions (4 000 000)", english: "Four million (4,000,000)", portuguese: "Quatro milhões (4.000.000)" },
      { lari: "Biaji bitanu", french: "Cinq millions (5 000 000)", english: "Five million (5,000,000)", portuguese: "Cinco milhões (5.000.000)" },
      { lari: "Biaji bisalbanu", french: "Six millions (6 000 000)", english: "Six million (6,000,000)", portuguese: "Seis milhões (6.000.000)" },
      { lari: "Biaji nsambuadi", french: "Sept millions (7 000 000)", english: "Seven million (7,000,000)", portuguese: "Sete milhões (7.000.000)" },
      { lari: "Biaji nana", french: "Huit millions (8 000 000)", english: "Eight million (8,000,000)", portuguese: "Oito milhões (8.000.000)" },
      { lari: "Biaji vua", french: "Neuf millions (9 000 000)", english: "Nine million (9,000,000)", portuguese: "Nove milhões (9.000.000)" },
      { lari: "Biaji kumi", french: "Dix millions (10 000 000)", english: "Ten million (10,000,000)", portuguese: "Dez milhões (10.000.000)" },
      { lari: "Biaji makumole", french: "Vingt millions (20 000 000)", english: "Twenty million (20,000,000)", portuguese: "Vinte milhões (20.000.000)" },
      { lari: "Biaji makumatatu", french: "Trente millions (30 000 000)", english: "Thirty million (30,000,000)", portuguese: "Trinta milhões (30.000.000)" },
      { lari: "Biaji makumaya", french: "Quarante millions (40 000 000)", english: "Forty million (40,000,000)", portuguese: "Quarenta milhões (40.000.000)" },
      { lari: "Biaji makumatanu", french: "Cinquante millions (50 000 000)", english: "Fifty million (50,000,000)", portuguese: "Cinquenta milhões (50.000.000)" },
      { lari: "Biaji makumasambanu", french: "Soixante millions (60 000 000)", english: "Sixty million (60,000,000)", portuguese: "Sessenta milhões (60.000.000)" },
      { lari: "Biaji lusambuadi", french: "Soixante-dix millions (70 000 000)", english: "Seventy million (70,000,000)", portuguese: "Setenta milhões (70.000.000)" },
      { lari: "Biaji lunana", french: "Quatre-vingts millions (80 000 000)", english: "Eighty million (80,000,000)", portuguese: "Oitenta milhões (80.000.000)" },
      { lari: "Biaji luvua", french: "Quatre-vingt-dix millions (90 000 000)", english: "Ninety million (90,000,000)", portuguese: "Noventa milhões (90.000.000)" },
      { lari: "Biaji nkama", french: "Cent millions (100 000 000)", english: "One hundred million (100,000,000)", portuguese: "Cem milhões (100.000.000)" },
      { lari: "Biaji nkama tanu", french: "Cinq cents millions (500 000 000)", english: "Five hundred million (500,000,000)", portuguese: "Quinhentos milhões (500.000.000)" },
      { lari: "Biaji nkama sambanu", french: "Six cents millions (600 000 000)", english: "Six hundred million (600,000,000)", portuguese: "Seiscentos milhões (600.000.000)" },
      { lari: "Biaji nkama nsambuadi", french: "Sept cents millions (700 000 000)", english: "Seven hundred million (700,000,000)", portuguese: "Setecentos milhões (700.000.000)" },
      { lari: "Biaji nkama nsambuadi na makumatanu", french: "Sept cent cinquante millions (750 000 000)", english: "Seven hundred fifty million (750,000,000)", portuguese: "Setecentos e cinquenta milhões (750.000.000)" },
      { lari: "Biaji nkama nana", french: "Huit cents millions (800 000 000)", english: "Eight hundred million (800,000,000)", portuguese: "Oitocentos milhões (800.000.000)" },
      { lari: "Biaji nkama vua", french: "Neuf cents millions (900 000 000)", english: "Nine hundred million (900,000,000)", portuguese: "Novecentos milhões (900.000.000)" },
      { lari: "Biaji nkama vua na makumatanu", french: "Neuf cent cinquante millions (950 000 000)", english: "Nine hundred fifty million (950,000,000)", portuguese: "Novecentos e cinquenta milhões (950.000.000)" },
      { lari: "Funda dia biaji", french: "Un milliard (1 000 000 000)", english: "One billion (1,000,000,000)", portuguese: "Um bilhão (1.000.000.000)" },
    ],
  },
  {
    id: "colors",
    label: "Colors",
    lariLabel: "Tinta",
    image: vocabColors,
    words: [
      { lari: "Tinta", french: "Couleur", english: "Color", portuguese: "Cor" },
      { lari: "Mpembe", french: "Blanc", english: "White", portuguese: "Branco" },
      { lari: "Ndombi", french: "Noir", english: "Black", portuguese: "Preto" },
      { lari: "Mpilu", french: "Violet", english: "Purple / Violet", portuguese: "Violeta / Roxo" },
      { lari: "Mbuaki", french: "Rouge", english: "Red", portuguese: "Vermelho" },
      { lari: "Ngizu", french: "Vert", english: "Green", portuguese: "Verde" },
      { lari: "Ngumbudi", french: "Indigo", english: "Indigo", portuguese: "Índigo" },
      { lari: "Tundu", french: "Jaune", english: "Yellow", portuguese: "Amarelo" },
      { lari: "Mbudi", french: "Bleu", english: "Blue", portuguese: "Azul" },
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
