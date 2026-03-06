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

    // Footer
    "footer.description": "A Casa do Saber — preservar e ensinar o Kikongo Lari e a escrita Mandombe para a diáspora Kongo e o mundo.",
    "footer.learnTitle": "Aprender",
    "footer.languagesTitle": "Línguas",
    "footer.copyright": "Honrando o saber ancestral.",
  },
};
