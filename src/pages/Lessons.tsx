import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { Lock, Loader2, Search, X } from "lucide-react";
import { lessons } from "@/data/lessons";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";
import LingalaMandombe from "@/components/LingalaMandombe";
import familyKinshipIcon from "@/assets/family-kinship.png";

const lessonIconImages: Record<string, string> = {
  "termes-de-parente": familyKinshipIcon,
};

const renderLessonIcon = (lesson: { id: string; icon: string }, sizeClass = "w-14 h-14") => {
  const img = lessonIconImages[lesson.id];
  if (img) {
    return (
      <img
        src={img}
        alt=""
        loading="lazy"
        width={512}
        height={512}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-gold/30`}
      />
    );
  }
  return <span className="text-4xl">{lesson.icon}</span>;
};

const levelColors = {
  beginner: "bg-green-500/10 text-green-700 border-green-500/30",
  intermediate: "bg-secondary/10 text-secondary border-secondary/30",
  advanced: "bg-primary/10 text-primary border-primary/30",
};

const levelLabels = {
  beginner: { fr: "débutant", en: "beginner", pt: "iniciante" },
  intermediate: { fr: "intermédiaire", en: "intermediate", pt: "intermediário" },
  advanced: { fr: "avancé", en: "advanced", pt: "avançado" },
};

type LessonMatch = {
  field: "title" | "description" | "vocabulary" | "phrase";
  lari: string;
  translation: string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const Lessons = () => {
  const { isPremium } = useAuth();
  const { language, t } = useLanguage();
  const { getTranslation, isDynamic, isTranslating } = useTranslatedContent();
  const [query, setQuery] = useState("");

  const getLessonTitle = (lesson: typeof lessons[0]) => {
    if (isDynamic) return getTranslation(lesson.titleFr || lesson.title, lesson.title);
    if (language === "fr") return lesson.titleFr || lesson.title;
    if (language === "pt") return lesson.titlePt || lesson.title;
    return lesson.title;
  };

  const getLessonDescription = (lesson: typeof lessons[0]) => {
    if (isDynamic) return getTranslation(lesson.descriptionFr || lesson.description, lesson.description);
    if (language === "fr") return lesson.descriptionFr || lesson.description;
    if (language === "pt") return lesson.descriptionPt || lesson.description;
    return lesson.description;
  };

  const getLevelLabel = (level: "beginner" | "intermediate" | "advanced") => {
    return levelLabels[level][language] || levelLabels[level].en;
  };

  const q = norm(query);

  // Build a match per lesson (first best hit) — searches vocabulary, phrases, titles, descriptions.
  const { filteredLessons, matches } = useMemo(() => {
    if (!q) return { filteredLessons: lessons, matches: {} as Record<string, LessonMatch> };

    const found: Record<string, LessonMatch> = {};
    const list: typeof lessons = [];

    for (const lesson of lessons) {
      let match: LessonMatch | null = null;

      for (const v of lesson.vocabulary ?? []) {
        const hay = [v.lari, v.french, v.english, v.portuguese, v.note].filter(Boolean).map((x) => norm(String(x)));
        if (hay.some((h) => h.includes(q))) {
          const translation =
            language === "fr" ? v.french : language === "pt" ? v.portuguese ?? v.french : v.english;
          match = { field: "vocabulary", lari: v.lari, translation: translation || v.french };
          break;
        }
      }

      if (!match) {
        for (const p of lesson.phrases ?? []) {
          const hay = [p.lari, p.french, p.english, p.portuguese].filter(Boolean).map((x) => norm(String(x)));
          if (hay.some((h) => h.includes(q))) {
            const translation =
              language === "fr" ? p.french : language === "pt" ? p.portuguese ?? p.french : p.english;
            match = { field: "phrase", lari: p.lari, translation: translation || p.french };
            break;
          }
        }
      }

      if (!match) {
        const titleHay = [lesson.title, lesson.titleFr, lesson.titlePt, lesson.titleLari]
          .filter(Boolean)
          .map((x) => norm(String(x)));
        if (titleHay.some((h) => h.includes(q))) {
          match = { field: "title", lari: lesson.titleLari, translation: getLessonTitle(lesson) };
        }
      }

      if (!match) {
        const descHay = [lesson.description, lesson.descriptionFr, lesson.descriptionPt]
          .filter(Boolean)
          .map((x) => norm(String(x)));
        if (descHay.some((h) => h.includes(q))) {
          match = { field: "description", lari: "", translation: getLessonDescription(lesson) };
        }
      }

      if (match) {
        found[lesson.id] = match;
        list.push(lesson);
      }
    }

    return { filteredLessons: list, matches: found };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, language, isDynamic]);


  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Leçons — Kikongo Lari et Mandombe | Nzo Mikanda"
        description="Leçons progressives de Kikongo Lari et de l'écriture Mandombe : grammaire, vocabulaire, conjugaison et exercices interactifs."
        path="/lessons"
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
           <div className="text-center mb-16">
            <div className="mb-8">
              <p className="font-mandombe text-3xl md:text-4xl text-gold mb-2 block">Zonza Lari</p>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gold/70 font-body text-xs tracking-[0.35em] uppercase mb-4">
              {t("lessons.eyebrow")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("lessons.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              {t("lessons.subtitle")}
           </p>
           {isDynamic && isTranslating && (
             <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4">
               <Loader2 className="w-4 h-4 animate-spin" />
               <span>{t("lessons.translating") || "Traduction en cours…"}</span>
             </div>
           )}
          </div>

          {/* Barre de recherche : indexe vocabulaire, phrases, titres, descriptions */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  language === "fr"
                    ? "Rechercher un mot ou une phrase : merci, manger, hello…"
                    : language === "pt"
                    ? "Procurar uma palavra ou frase: obrigado, comer…"
                    : "Search a word or phrase: thanks, eat, hello…"
                }
                aria-label="Search lessons"
                className="w-full pl-12 pr-12 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            {q && (
              <p className="text-center text-xs text-muted-foreground mt-3">
                {filteredLessons.length}{" "}
                {filteredLessons.length <= 1
                  ? language === "fr" ? "leçon trouvée" : language === "pt" ? "lição encontrada" : "lesson found"
                  : language === "fr" ? "leçons trouvées" : language === "pt" ? "lições encontradas" : "lessons found"}
              </p>
            )}
          </div>

          {q && filteredLessons.length === 0 && (
            <div className="max-w-xl mx-auto text-center py-12 text-muted-foreground">
              {language === "fr"
                ? "Aucune leçon ne contient ce terme. Essaie un autre mot."
                : language === "pt"
                ? "Nenhuma lição contém este termo."
                : "No lesson contains this term."}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredLessons.map((lesson) => {
              const isLocked = lesson.level === "advanced" && !isPremium;

              if (isLocked) {
                return (
                  <div
                    key={lesson.id}
                    className="relative bg-card rounded-xl border border-border overflow-hidden opacity-75"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        {renderLessonIcon(lesson)}
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lesson.level]}`}>
                          {getLevelLabel(lesson.level)}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="font-mandombe text-2xl text-gold/60 block">{lesson.titleMandombe}</p>
                        <LingalaMandombe frenchText={lesson.titleFr || lesson.title} className="text-xl text-gold/50" />
                      </div>
                      <h2 className="font-display text-lg font-bold text-foreground mb-1">{getLessonTitle(lesson)}</h2>
                      <p className="text-primary/70 font-body text-xs italic mb-3">{lesson.titleLari}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{getLessonDescription(lesson)}</p>
                    </div>
                    <div className="absolute inset-0 bg-earth-deep/50 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                        <Lock className="w-6 h-6 text-gold" />
                      </div>
                      <p className="text-cream font-display font-bold text-lg">Premium</p>
                      <p className="text-cream/60 text-xs mt-1">{t("exercises.upgrade")}</p>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={lesson.id}
                  to={`/lessons/${lesson.id}`}
                  className="group bg-card rounded-xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      {renderLessonIcon(lesson)}
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lesson.level]}`}>
                        {getLevelLabel(lesson.level)}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="font-mandombe text-2xl text-gold block">{lesson.titleMandombe}</p>
                      <LingalaMandombe frenchText={lesson.titleFr || lesson.title} className="text-xl" />
                    </div>
                    <h2 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {getLessonTitle(lesson)}
                    </h2>
                    <p className="text-primary/70 font-body text-xs italic mb-3">{lesson.titleLari}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{getLessonDescription(lesson)}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      {lesson.vocabulary && <span>{lesson.vocabulary.length} {t("lessons.words")}</span>}
                      {lesson.conjugations && <span>{lesson.conjugations.length} {t("lessons.conjugations")}</span>}
                      <span>{lesson.exercises.length} {t("lessons.exercises")}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lessons;
