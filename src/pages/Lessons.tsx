import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { lessons } from "@/data/lessons";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Lessons = () => {
  const { isPremium } = useAuth();
  const { language, t } = useLanguage();

  const getLessonTitle = (lesson: typeof lessons[0]) => {
    if (language === "fr") return lesson.titleFr || lesson.title;
    if (language === "pt") return lesson.titlePt || lesson.title;
    return lesson.title;
  };

  const getLessonDescription = (lesson: typeof lessons[0]) => {
    if (language === "fr") return lesson.descriptionFr || lesson.description;
    if (language === "pt") return lesson.descriptionPt || lesson.description;
    return lesson.description;
  };

  const getLevelLabel = (level: "beginner" | "intermediate" | "advanced") => {
    return levelLabels[level][language] || levelLabels[level].en;
  };

  return (
    <div className="min-h-screen bg-background">
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lessons.map((lesson) => {
              const isLocked = lesson.level === "advanced" && !isPremium;

              if (isLocked) {
                return (
                  <div
                    key={lesson.id}
                    className="relative bg-card rounded-xl border border-border overflow-hidden opacity-75"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{lesson.icon}</span>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lesson.level]}`}>
                          {getLevelLabel(lesson.level)}
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="font-mandombe text-2xl text-gold/60 block">{lesson.titleMandombe}</p>
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
                      <span className="text-4xl">{lesson.icon}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lesson.level]}`}>
                        {getLevelLabel(lesson.level)}
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="font-mandombe text-2xl text-gold block">{lesson.titleMandombe}</p>
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
