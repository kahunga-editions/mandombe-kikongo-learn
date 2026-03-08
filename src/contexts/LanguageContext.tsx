import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "fr" | "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return translations[language]?.[key] ?? translations["fr"]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    "nav.learn": "Apprendre",
    "nav.lessons": "Leçons",
    "nav.vocabulary": "Vocabulaire",
    "nav.stories": "Histoires",
    "nav.kilolaka": "Kilolaka",
    "nav.signIn": "Se connecter",
    "nav.goPremium": "Passer Premium",
    "nav.managePlan": "Gérer l'abonnement",

    // Hero
    "hero.subtitle": "Nzo Mikanda — La Maison du Savoir",
    "hero.description": "Découvrez la langue sacrée du peuple Kongo à travers le vocabulaire, les histoires et l'art ancestral du Kilolaka — avec des traductions en français, anglais et portugais.",
    "hero.startLearning": "Commencer à apprendre",
    "hero.exploreVocabulary": "Explorer le vocabulaire",

    // LearningPaths
    "paths.eyebrow": "Votre parcours d'apprentissage",
    "paths.title": "Trois voies vers la maîtrise",
    "paths.vocab.title": "Vocabulaire",
    "paths.vocab.desc": "Apprenez les mots et expressions essentiels en Kikongo Lari avec translittération latine, et traductions en français, anglais et portugais.",
    "paths.vocab.items": "Salutations & Expressions,Famille & Personnes,Nature & Animaux,Corps & Santé",
    "paths.stories.title": "Histoires",
    "paths.stories.desc": "Lisez des histoires bilingues comme les aventures de Nsayi — plongez dans la culture Kongo à travers le récit.",
    "paths.stories.items": "Nsayi à l'école,Nsayi dans la savane,Contes culturels,Histoires pour enfants",
    "paths.kilolaka.title": "Kilolaka",
    "paths.kilolaka.desc": "Explorez l'art sacré de décomposer le Kikongo en codes énergétiques — la langue comme carte cosmologique.",
    "paths.kilolaka.items": "Analyse morphémique,Séries B & F,Axe D & G,Écriture Mandombe",

    // Vocabulary
    "vocab.eyebrow": "Mazita — Vocabulaire",
    "vocab.title": "Mots et expressions essentiels",
    "vocab.subtitle": "Chaque mot est en Kikongo Lari avec traductions en français, anglais et portugais — les langues parlées à travers la diaspora Kongo.",
    "vocab.freeWords": "mots gratuits",
    "vocab.premium": "premium",
    "vocab.more": "Plus de mots",

    // Stories
    "stories.eyebrow": "Binsamu — Histoires",
    "stories.title": "Apprendre par les histoires",
    "stories.storySubtitle": "Nsayi à l'école et à la forêt",
    "stories.storyDesc": "Une bande dessinée bilingue — français, anglais et portugais",
    "stories.storyDescShort": "Nsayi at School and in the Forest",
    "stories.continue": "Continuer l'histoire de Nsayi",
    "stories.end": "Fin de l'histoire",

    // Kilolaka
    "kilolaka.eyebrow": "Connaissance profonde",
    "kilolaka.title": "Kilolaka",
    "kilolaka.subtitle": "L'art de décomposer le Kikongo en conscience sacrée — chaque syllabe est un code énergétique.",
    "kilolaka.bSeries": "Série B : États de l'être",
    "kilolaka.advanced": "Modules Kilolaka avancés",
    "kilolaka.fSeries": "Série F : Renaissance",
    "kilolaka.dSeries": "Série D : Énergie solaire & vitesse de la lumière",
    "kilolaka.gSeries": "Série G : L'élément qui engendre la vie",

    // Kilolaka meanings
    "ki.meaning": "Énergie intérieure — la vibration originelle",
    "lo.meaning": "Connaissance profonde ascensionnelle",
    "la.meaning": "Connaissance profonde manifestée",
    "ka.meaning": "Énergie manifestée — la vibration devient forme",
    "bi.meaning": "Être intérieur",
    "bu.meaning": "Être qui génère la vie",
    "be.meaning": "Être qui reçoit",
    "bo.meaning": "Être ascendant",
    "ba.meaning": "Être manifesté",
    "fi.meaning": "Renaissance intérieure",
    "fu.meaning": "Renaissance qui génère la vie",
    "fe.meaning": "Renaissance qui reçoit",
    "fo.meaning": "Renaissance ascendante",
    "fa.meaning": "Renaissance manifestée",
    "di.meaning": "Énergie solaire intérieure",
    "du.meaning": "Énergie solaire qui génère la vie",
    "de.meaning": "Énergie solaire qui reçoit",
    "do.meaning": "Énergie solaire ascendante",
    "da.meaning": "Énergie solaire manifestée",
    "gi.meaning": "Élément de vie intérieur",
    "gu.meaning": "Élément de vie qui génère la vie",
    "ge.meaning": "Élément de vie qui reçoit",
    "go.meaning": "Élément de vie ascendant",
    "ga.meaning": "Élément de vie manifesté",

    // Lessons page
    "lessons.eyebrow": "Zonza Lari — Leçons",
    "lessons.title": "Leçons interactives",
    "lessons.subtitle": "Apprenez le Kikongo Lari étape par étape avec du vocabulaire, des tableaux de conjugaison et des exercices interactifs.",
    "lessons.words": "mots",
    "lessons.conjugations": "conjugaisons",
    "lessons.exercises": "exercices",
    "lessons.backToLessons": "← Retour aux leçons",
    "lessons.notFound": "Leçon introuvable",
    "lessons.learn": "Apprendre",
    "lessons.startExercises": "Commencer les exercices →",
    "lessons.lessonComplete": "Leçon terminée !",
    "lessons.youGot": "Vous avez obtenu",
    "lessons.outOf": "sur",
    "lessons.correct": "correct",
    "lessons.exercise": "Exercice",
    "lessons.of": "sur",
    "lessons.correctLabel": "Correct ✓",
    "lessons.incorrectLabel": "Incorrect ✗",
    "exercises.checkAnswer": "Vérifier la réponse",
    "exercises.checkMatches": "Vérifier les correspondances",
    "exercises.typeAnswer": "Tapez votre réponse...",
    "exercises.correctAnswer": "La bonne réponse est :",
    "exercises.hint": "💡 Indice :",
    "exercises.upgrade": "Passer au Premium pour débloquer",

    // Dictionary
    "nav.dictionary": "Dictionnaire",
    "dict.eyebrow": "Buku dia Binsono — Dictionnaire",
    "dict.title": "Dictionnaire Kikongo Lari",
    "dict.subtitle": "Recherchez un mot en lari, français, anglais ou portugais et trouvez sa traduction instantanément.",
    "dict.searchPlaceholder": "Tapez un mot en lari, français, anglais ou portugais…",
    "dict.entries": "résultats",
    "dict.total": "mots au total",
    "dict.all": "Tous",
    "dict.noResults": "Aucun mot trouvé. Essayez une autre recherche.",

    // Footer
    "footer.description": "La Maison du Savoir — préserver et enseigner le Kikongo Lari et l'écriture Mandombe pour la diaspora Kongo et le monde.",
    "footer.learnTitle": "Apprendre",
    "footer.languagesTitle": "Langues",
    "footer.copyright": "Honorer le savoir ancestral.",
  },
  en: {
    // Navbar
    "nav.learn": "Learn",
    "nav.lessons": "Lessons",
    "nav.vocabulary": "Vocabulary",
    "nav.stories": "Stories",
    "nav.kilolaka": "Kilolaka",
    "nav.signIn": "Sign In",
    "nav.goPremium": "Go Premium",
    "nav.managePlan": "Manage Plan",

    // Hero
    "hero.subtitle": "Nzo Mikanda — The House of Knowledge",
    "hero.description": "Discover the sacred language of the Kongo people through vocabulary, stories, and the ancestral art of Kilolaka — with translations in English, French, and Portuguese.",
    "hero.startLearning": "Start Learning",
    "hero.exploreVocabulary": "Explore Vocabulary",

    // LearningPaths
    "paths.eyebrow": "Your Learning Journey",
    "paths.title": "Three Paths to Mastery",
    "paths.vocab.title": "Vocabulary",
    "paths.vocab.desc": "Learn essential words and phrases in Kikongo Lari with Latin transliteration, and translations in English, French, and Portuguese.",
    "paths.vocab.items": "Greetings & Phrases,Family & People,Nature & Animals,Body & Health",
    "paths.stories.title": "Stories",
    "paths.stories.desc": "Read bilingual stories like Nsayi's adventures — immerse yourself in Kongo culture through narrative.",
    "paths.stories.items": "Nsayi at School,Nsayi in the Savanna,Cultural Tales,Children's Stories",
    "paths.kilolaka.title": "Kilolaka",
    "paths.kilolaka.desc": "Explore the sacred art of decomposing Kikongo into energetic codes — language as a cosmological map.",
    "paths.kilolaka.items": "Morpheme Analysis,B & F Series,D & G Axis,Mandombe Script",

    // Vocabulary
    "vocab.eyebrow": "Mazita — Vocabulary",
    "vocab.title": "Essential Words & Phrases",
    "vocab.subtitle": "Each word comes in Kikongo Lari with translations in French, English and Portuguese — languages spoken across the Kongo diaspora.",
    "vocab.freeWords": "free words",
    "vocab.premium": "premium",
    "vocab.more": "More Words",

    // Stories
    "stories.eyebrow": "Binsamu — Stories",
    "stories.title": "Learn Through Stories",
    "stories.storySubtitle": "Nsayi at School and in the Forest",
    "stories.storyDesc": "A bilingual comic story — French, English & Portuguese",
    "stories.storyDescShort": "Nsayi at School and in the Forest",
    "stories.continue": "Continue Nsayi's Story",
    "stories.end": "The End",

    // Kilolaka
    "kilolaka.eyebrow": "Deep Knowledge",
    "kilolaka.title": "Kilolaka",
    "kilolaka.subtitle": "The art of decomposing Kikongo into sacred consciousness — where every syllable is an energetic code.",
    "kilolaka.bSeries": "B-Series: States of Being",
    "kilolaka.advanced": "Advanced Kilolaka Modules",
    "kilolaka.fSeries": "F-Series: Rebirth",
    "kilolaka.dSeries": "D-Series: Solar Energy & Speed of Light",
    "kilolaka.gSeries": "G-Series: The Element that Begets Life",

    // Kilolaka meanings
    "ki.meaning": "Inner energy — the origin vibration",
    "lo.meaning": "Ascensional deep knowledge",
    "la.meaning": "Manifested deep knowledge",
    "ka.meaning": "Manifested energy — vibration becomes form",
    "bi.meaning": "Inner being",
    "bu.meaning": "Being that generates life",
    "be.meaning": "Being that receives",
    "bo.meaning": "Ascending being",
    "ba.meaning": "Manifested being",
    "fi.meaning": "Inner rebirth",
    "fu.meaning": "Rebirth that generates life",
    "fe.meaning": "Rebirth that receives",
    "fo.meaning": "Ascending rebirth",
    "fa.meaning": "Manifested rebirth",
    "di.meaning": "Inner solar energy",
    "du.meaning": "Solar energy that generates life",
    "de.meaning": "Solar energy that receives",
    "do.meaning": "Ascending solar energy",
    "da.meaning": "Manifested solar energy",
    "gi.meaning": "Inner life element",
    "gu.meaning": "Life element that generates life",
    "ge.meaning": "Life element that receives",
    "go.meaning": "Ascending life element",
    "ga.meaning": "Manifested life element",

    // Lessons page
    "lessons.eyebrow": "Zonza Lari — Lessons",
    "lessons.title": "Interactive Lessons",
    "lessons.subtitle": "Learn Kikongo Lari step by step with vocabulary, conjugation tables, and interactive exercises.",
    "lessons.words": "words",
    "lessons.conjugations": "conjugations",
    "lessons.exercises": "exercises",
    "lessons.backToLessons": "← Back to lessons",
    "lessons.notFound": "Lesson not found",
    "lessons.learn": "Learn",
    "lessons.startExercises": "Start Exercises →",
    "lessons.lessonComplete": "Lesson Complete!",
    "lessons.youGot": "You got",
    "lessons.outOf": "out of",
    "lessons.correct": "correct",
    "lessons.exercise": "Exercise",
    "lessons.of": "of",
    "lessons.correctLabel": "Correct ✓",
    "lessons.incorrectLabel": "Incorrect ✗",
    "exercises.checkAnswer": "Check Answer",
    "exercises.checkMatches": "Check Matches",
    "exercises.typeAnswer": "Type your answer...",
    "exercises.correctAnswer": "The correct answer is:",
    "exercises.hint": "💡 Hint:",
    "exercises.upgrade": "Upgrade to unlock",

    // Dictionary
    "nav.dictionary": "Dictionary",
    "dict.eyebrow": "Buku dia Binsono — Dictionary",
    "dict.title": "Kikongo Lari Dictionary",
    "dict.subtitle": "Search a word in Lari, French, English or Portuguese and find its translation instantly.",
    "dict.searchPlaceholder": "Type a word in Lari, French, English or Portuguese…",
    "dict.entries": "results",
    "dict.total": "words in total",
    "dict.all": "All",
    "dict.noResults": "No word found. Try a different search.",

    // Footer
    "footer.description": "The House of Knowledge — preserving and teaching Kikongo Lari and the Mandombe script for the Kongo diaspora and the world.",
    "footer.learnTitle": "Learn",
    "footer.languagesTitle": "Languages",
    "footer.copyright": "Honoring ancestral knowledge.",
  },
  pt: {
    // Navbar
    "nav.learn": "Aprender",
    "nav.lessons": "Lições",
    "nav.vocabulary": "Vocabulário",
    "nav.stories": "Histórias",
    "nav.kilolaka": "Kilolaka",
    "nav.signIn": "Entrar",
    "nav.goPremium": "Assinar Premium",
    "nav.managePlan": "Gerir Assinatura",

    // Hero
    "hero.subtitle": "Nzo Mikanda — A Casa do Saber",
    "hero.description": "Descubra a língua sagrada do povo Kongo através do vocabulário, das histórias e da arte ancestral do Kilolaka — com traduções em português, francês e inglês.",
    "hero.startLearning": "Começar a aprender",
    "hero.exploreVocabulary": "Explorar Vocabulário",

    // LearningPaths
    "paths.eyebrow": "A sua jornada de aprendizagem",
    "paths.title": "Três caminhos para a maestria",
    "paths.vocab.title": "Vocabulário",
    "paths.vocab.desc": "Aprenda palavras e expressões essenciais em Kikongo Lari com transliteração latina, e traduções em português, francês e inglês.",
    "paths.vocab.items": "Saudações & Expressões,Família & Pessoas,Natureza & Animais,Corpo & Saúde",
    "paths.stories.title": "Histórias",
    "paths.stories.desc": "Leia histórias bilingues como as aventuras de Nsayi — mergulhe na cultura Kongo através da narrativa.",
    "paths.stories.items": "Nsayi na escola,Nsayi na savana,Contos culturais,Histórias para crianças",
    "paths.kilolaka.title": "Kilolaka",
    "paths.kilolaka.desc": "Explore a arte sagrada de decompor o Kikongo em códigos energéticos — a língua como mapa cosmológico.",
    "paths.kilolaka.items": "Análise morfológica,Séries B & F,Eixo D & G,Escrita Mandombe",

    // Vocabulary
    "vocab.eyebrow": "Mazita — Vocabulário",
    "vocab.title": "Palavras e expressões essenciais",
    "vocab.subtitle": "Cada palavra vem em Kikongo Lari com traduções em português, francês e inglês — as línguas faladas na diáspora Kongo.",
    "vocab.freeWords": "palavras gratuitas",
    "vocab.premium": "premium",
    "vocab.more": "Mais palavras",

    // Stories
    "stories.eyebrow": "Binsamu — Histórias",
    "stories.title": "Aprender através das histórias",
    "stories.storySubtitle": "Nsayi na escola e na floresta",
    "stories.storyDesc": "Uma banda desenhada bilingue — português, francês e inglês",
    "stories.storyDescShort": "Nsayi at School and in the Forest",
    "stories.continue": "Continuar a história de Nsayi",
    "stories.end": "Fim da história",

    // Kilolaka
    "kilolaka.eyebrow": "Conhecimento profundo",
    "kilolaka.title": "Kilolaka",
    "kilolaka.subtitle": "A arte de decompor o Kikongo em consciência sagrada — cada sílaba é um código energético.",
    "kilolaka.bSeries": "Série B: Estados do ser",
    "kilolaka.advanced": "Módulos Kilolaka avançados",
    "kilolaka.fSeries": "Série F: Renascimento",
    "kilolaka.dSeries": "Série D: Energia solar & velocidade da luz",
    "kilolaka.gSeries": "Série G: O elemento que gera a vida",

    // Kilolaka meanings
    "ki.meaning": "Energia interior — a vibração original",
    "lo.meaning": "Conhecimento profundo ascensional",
    "la.meaning": "Conhecimento profundo manifestado",
    "ka.meaning": "Energia manifestada — a vibração torna-se forma",
    "bi.meaning": "Ser interior",
    "bu.meaning": "Ser que gera vida",
    "be.meaning": "Ser que recebe",
    "bo.meaning": "Ser ascendente",
    "ba.meaning": "Ser manifestado",
    "fi.meaning": "Renascimento interior",
    "fu.meaning": "Renascimento que gera vida",
    "fe.meaning": "Renascimento que recebe",
    "fo.meaning": "Renascimento ascendente",
    "fa.meaning": "Renascimento manifestado",
    "di.meaning": "Energia solar interior",
    "du.meaning": "Energia solar que gera vida",
    "de.meaning": "Energia solar que recebe",
    "do.meaning": "Energia solar ascendente",
    "da.meaning": "Energia solar manifestada",
    "gi.meaning": "Elemento de vida interior",
    "gu.meaning": "Elemento de vida que gera vida",
    "ge.meaning": "Elemento de vida que recebe",
    "go.meaning": "Elemento de vida ascendente",
    "ga.meaning": "Elemento de vida manifestado",

    // Lessons page
    "lessons.eyebrow": "Zonza Lari — Lições",
    "lessons.title": "Lições interativas",
    "lessons.subtitle": "Aprenda Kikongo Lari passo a passo com vocabulário, tabelas de conjugação e exercícios interativos.",
    "lessons.words": "palavras",
    "lessons.conjugations": "conjugações",
    "lessons.exercises": "exercícios",
    "lessons.backToLessons": "← Voltar às lições",
    "lessons.notFound": "Lição não encontrada",
    "lessons.learn": "Aprender",
    "lessons.startExercises": "Começar exercícios →",
    "lessons.lessonComplete": "Lição concluída!",
    "lessons.youGot": "Acertou",
    "lessons.outOf": "de",
    "lessons.correct": "corretas",
    "lessons.exercise": "Exercício",
    "lessons.of": "de",
    "lessons.correctLabel": "Correto ✓",
    "lessons.incorrectLabel": "Incorreto ✗",
    "exercises.checkAnswer": "Verificar resposta",
    "exercises.checkMatches": "Verificar correspondências",
    "exercises.typeAnswer": "Escreva a sua resposta...",
    "exercises.correctAnswer": "A resposta correta é:",
    "exercises.hint": "💡 Dica:",
    "exercises.upgrade": "Assinar para desbloquear",

    // Dictionary
    "nav.dictionary": "Dicionário",
    "dict.eyebrow": "Buku dia Binsono — Dicionário",
    "dict.title": "Dicionário Kikongo Lari",
    "dict.subtitle": "Pesquise uma palavra em lari, francês, inglês ou português e encontre a sua tradução instantaneamente.",
    "dict.searchPlaceholder": "Escreva uma palavra em lari, francês, inglês ou português…",
    "dict.entries": "resultados",
    "dict.total": "palavras no total",
    "dict.all": "Todos",
    "dict.noResults": "Nenhuma palavra encontrada. Tente outra pesquisa.",

    // Footer
    "footer.description": "A Casa do Saber — preservar e ensinar o Kikongo Lari e a escrita Mandombe para a diáspora Kongo e o mundo.",
    "footer.learnTitle": "Aprender",
    "footer.languagesTitle": "Línguas",
    "footer.copyright": "Honrando o saber ancestral.",
  },
};

