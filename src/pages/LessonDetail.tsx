import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { lessons } from "@/data/lessons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MandombeSpeaker from "@/components/MandombeSpeaker";
import MultipleChoice from "@/components/exercises/MultipleChoice";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import FillInBlank from "@/components/exercises/FillInBlank";
import CrosswordPuzzle from "@/components/exercises/CrosswordPuzzle";
import WordSearchPuzzle from "@/components/exercises/WordSearchPuzzle";
import MandombeRecognition from "@/components/exercises/MandombeRecognition";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = (lessons || []).filter(Boolean).find((l) => l.id === lessonId);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"learn" | "exercises">("learn");
  const { language, t } = useLanguage();
  const { getTranslation, isDynamic } = useTranslatedContent();

  const tr = (fr: string, en: string, pt?: string) => {
    if (isDynamic) return getTranslation(fr);
    if (language === "en") return en;
    if (language === "pt") return pt || en;
    return fr;
  };

  // Get lesson text in the right language
  const getLessonTitle = () => {
    if (!lesson) return "";
    if (isDynamic) return getTranslation(lesson.titleFr || lesson.title, lesson.title);
    if (language === "fr") return lesson.titleFr || lesson.title;
    if (language === "pt") return lesson.titlePt || lesson.title;
    return lesson.title;
  };

  const getLessonDescription = () => {
    if (!lesson) return "";
    if (isDynamic) return getTranslation(lesson.descriptionFr || lesson.description, lesson.description);
    if (language === "fr") return lesson.descriptionFr || lesson.description;
    if (language === "pt") return lesson.descriptionPt || lesson.description;
    return lesson.description;
  };

  const getConjMeaning = (meaning: { fr: string; en: string; pt?: string }) => {
    if (isDynamic) return getTranslation(meaning.fr);
    if (language === "fr") return meaning.fr;
    if (language === "pt") return meaning.pt || meaning.fr;
    return meaning.en;
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="font-display text-3xl text-foreground">{t("lessons.notFound")}</h1>
          <Link to="/lessons" className="text-primary mt-4 inline-block">{t("lessons.backToLessons")}</Link>
        </div>
      </div>
    );
  }

  const handleExerciseComplete = (index: number, correct: boolean) => {
    setResults((prev) => ({ ...prev, [index]: correct }));
  };

  const completedCount = Object.keys(results).length;
  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> {t("lessons.backToLessons")}
          </Link>

          <div className="mb-8">
            <p className="font-mandombe text-3xl md:text-4xl text-gold mb-4">{lesson.titleMandombe}</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{lesson.icon}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {getLessonTitle()}
              </h1>
            </div>
            <p className="text-primary font-body text-sm italic">{lesson.titleLari}</p>
            <p className="text-muted-foreground mt-2">{getLessonDescription()}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 bg-muted rounded-lg p-1">
            <button
              onClick={() => setActiveTab("learn")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "learn"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BookOpen className="w-4 h-4" /> {t("lessons.learn")}
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "exercises"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4" /> {t("lessons.exercises")}
              {completedCount > 0 && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {correctCount}/{lesson.exercises.length}
                </span>
              )}
            </button>
          </div>

          {/* Learn Tab */}
          {activeTab === "learn" && (
            <div className="space-y-10">
              {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {tr("Vocabulaire", "Vocabulary", "Vocabulário")} — <span className="font-mandombe text-4xl text-gold">Mazita</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.vocabulary.map((item, i) => {
                      const translation = isDynamic 
                        ? getTranslation(item.french, item.english)
                        : language === "en" ? item.english : language === "pt" ? (item.portuguese || item.english) : item.french;
                      const flag = language === "en" ? "🇬🇧" : language === "pt" ? "🇵🇹" : language === "it" ? "🇮🇹" : language === "ln" ? "🇨🇩" : language === "el" ? "🇬🇷" : language === "ko" ? "🇰🇷" : "🇫🇷";
                      return (
                        <div
                          key={i}
                          className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/30 transition-colors"
                        >
                          {item.image && (
                            <img src={item.image} alt={item.lari} loading="lazy" className="w-full h-32 object-cover" />
                          )}
                          <div className="p-4">
                          <p className="font-mandombe text-3xl text-gold mb-4">{item.mandombe}</p>
                          <div className="flex items-center gap-2">
                            <p className="font-display text-lg font-bold text-foreground">{item.lari}</p>
                            <MandombeSpeaker lariText={item.lari} />
                          </div>
                          <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{flag} {translation}</span>
                          </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {lesson.syntax && lesson.syntax.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {tr("Syntaxe", "Syntax", "Sintaxe")} — <span className="font-mandombe text-4xl text-gold">Mitindu</span>
                  </h2>
                  <div className="space-y-8">
                    {lesson.syntax.map((block, bi) => {
                      const blockTitle = language === "fr" ? (block.titleFr || block.title) : language === "pt" ? (block.titlePt || block.title) : block.title;
                      const blockDesc = language === "fr" ? (block.descriptionFr || block.description) : language === "pt" ? (block.descriptionPt || block.description) : block.description;
                      const blockPattern = language === "fr" ? (block.patternFr || block.pattern) : language === "pt" ? (block.patternPt || block.pattern) : block.pattern;

                      return (
                        <div key={bi} className="bg-card rounded-xl border border-border overflow-hidden">
                          <div className="bg-earth-deep px-6 py-4">
                            <h3 className="font-display text-xl font-bold text-gold">{blockTitle}</h3>
                            <p className="text-cream/80 text-sm mt-1 leading-relaxed">{blockDesc}</p>
                            {blockPattern && (
                              <div className="mt-3 bg-background/10 rounded-lg px-4 py-2 border border-gold/20">
                                <p className="text-xs text-cream/50 uppercase tracking-wider mb-1">{tr("Formule", "Pattern", "Fórmula")}</p>
                                <p className="font-display font-semibold text-gold text-sm">{blockPattern}</p>
                              </div>
                            )}
                          </div>

                          <div className="divide-y divide-border">
                            {block.groups.map((group, gi) => {
                              const groupTitle = isDynamic ? getTranslation(group.titleFr || group.title, group.title) : language === "fr" ? (group.titleFr || group.title) : language === "pt" ? (group.titlePt || group.title) : group.title;
                              const groupDesc = isDynamic ? getTranslation(group.descriptionFr || group.description || "", group.description) : language === "fr" ? (group.descriptionFr || group.description) : language === "pt" ? (group.descriptionPt || group.description) : group.description;
                              const groupNote = isDynamic ? (group.noteFr ? getTranslation(group.noteFr) : group.note) : language === "fr" ? (group.noteFr || group.note) : language === "pt" ? (group.notePt || group.note) : group.note;
                              const flag = language === "en" ? "🇬🇧" : language === "pt" ? "🇵🇹" : language === "it" ? "🇮🇹" : language === "ln" ? "🇨🇩" : language === "el" ? "🇬🇷" : language === "ko" ? "🇰🇷" : "🇫🇷";

                              return (
                                <div key={gi} className="px-6 py-5">
                                  {group.titleMandombe && (
                                    <p className="font-mandombe text-gold text-lg mb-0.5">{group.titleMandombe}</p>
                                  )}
                                  <h4 className="font-display text-lg font-bold text-foreground mb-1">{groupTitle}</h4>
                                  {groupDesc && (
                                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{groupDesc}</p>
                                  )}
                                  <div className="space-y-2">
                                    {group.examples.map((ex, ei) => {
                                      const translation = isDynamic ? getTranslation(ex.french, ex.english) : language === "en" ? ex.english : language === "pt" ? (ex.portuguese || ex.english) : ex.french;
                                      return (
                                        <div key={ei} className="bg-muted/30 rounded-lg px-4 py-3 border border-border/50">
                                          {ex.mandombe && (
                                            <p className="font-mandombe text-3xl text-gold mb-2">{ex.mandombe}</p>
                                          )}
                                          <div className="flex items-center gap-2">
                                            <p className="font-display font-semibold text-foreground">{ex.lari}</p>
                                            <MandombeSpeaker lariText={ex.lari} />
                                          </div>
                                          <p className="text-sm text-muted-foreground mt-0.5">{flag} {translation}</p>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {groupNote && (
                                    <p className="mt-3 text-sm italic text-accent-foreground/70 border-t border-border pt-3">
                                      ⚠️ {groupNote}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {lesson.conjugations && lesson.conjugations.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {tr("Conjugaisons", "Conjugations", "Conjugações")} — <span className="font-mandombe text-4xl text-gold">Zonza</span>
                  </h2>
                  <div className="space-y-6">
                    {lesson.conjugations.map((conj, i) => (
                      <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="bg-earth-deep px-6 py-4">
                          <p className="font-mandombe text-4xl text-gold mb-4">{conj.verbMandombe}</p>
                          <h3 className="font-display text-xl font-bold text-gold">
                            {conj.verb} — {getConjMeaning(conj.meaning)}
                          </h3>
                          <p className="text-cream/60 text-sm">
                            {language === "fr" ? (conj.tenseFr || conj.tense) : language === "pt" ? (conj.tensePt || conj.tense) : conj.tense}
                          </p>
                        </div>
                        <div className="divide-y divide-border">
                          {conj.rows.map((row, j) => (
                            <div key={j} className="flex items-start px-6 py-3 gap-6">
                              <span className="text-sm text-muted-foreground w-20 shrink-0 pt-1">{row.person}</span>
                              <div className="flex flex-col flex-1">
                                <span className="font-mandombe text-2xl text-gold leading-tight">{row.mandombe}</span>
                                <div className="flex items-center gap-1 mt-1">
                                  <MandombeSpeaker lariText={row.lari} className="shrink-0" />
                                  <span className="font-display font-semibold text-foreground">{row.lari}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {lesson.phrases && lesson.phrases.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {tr("Phrases clés", "Key Phrases", "Frases-chave")} — <span className="font-mandombe text-4xl text-gold">Bambuka</span>
                  </h2>
                  <div className="space-y-3">
                    {lesson.phrases.map((phrase, i) => {
                      const translation = isDynamic ? getTranslation(phrase.french, phrase.english) : language === "en" ? phrase.english : language === "pt" ? (phrase.portuguese || phrase.english) : phrase.french;
                      const flag = language === "en" ? "🇬🇧" : language === "pt" ? "🇵🇹" : language === "it" ? "🇮🇹" : language === "ln" ? "🇨🇩" : language === "el" ? "🇬🇷" : language === "ko" ? "🇰🇷" : "🇫🇷";
                      return (
                        <div
                          key={i}
                          className="bg-card rounded-lg border border-border p-4 border-l-4 border-l-primary"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <p className="font-mandombe text-3xl text-gold">{phrase.mandombe}</p>
                            <MandombeSpeaker lariText={phrase.lari} />
                          </div>
                          <p className="font-display text-lg font-semibold text-foreground italic">{phrase.lari}</p>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{flag} {translation}</span>
                          </div>
                          {phrase.note && (
                            <p className="mt-2 text-sm italic text-accent-foreground/70 border-t border-border pt-2">
                              💡 {phrase.note}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab("exercises")}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  {t("lessons.startExercises")}
                </button>
              </div>
            </div>
          )}

          {/* Exercises Tab */}
          {activeTab === "exercises" && (
            <div className="space-y-8">
              {completedCount === lesson.exercises.length && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <Trophy className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {t("lessons.lessonComplete")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("lessons.youGot")} {correctCount} {t("lessons.outOf")} {lesson.exercises.length} {t("lessons.correct")}.
                  </p>
                </div>
              )}

              {lesson.exercises.map((exercise, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                    {t("lessons.exercise")} {i + 1} {t("lessons.of")} {lesson.exercises.length}
                    {results[i] !== undefined && (
                      <span className={`ml-2 ${results[i] ? "text-green-500" : "text-destructive"}`}>
                        • {results[i] ? t("lessons.correctLabel") : t("lessons.incorrectLabel")}
                      </span>
                    )}
                  </p>

                  {exercise.type === "multiple-choice" && (
                    <MultipleChoice
                      question={exercise}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                  {exercise.type === "matching" && (
                    <MatchingExercise
                      question={exercise}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                  {exercise.type === "fill-in-blank" && (
                    <FillInBlank
                      question={exercise}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                  {exercise.type === "crossword" && (
                    <CrosswordPuzzle
                      question={exercise}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                  {exercise.type === "word-search" && (
                    <WordSearchPuzzle
                      question={exercise}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                  {exercise.type === "mandombe-recognition" && (
                    <MandombeRecognition
                      question={exercise as any}
                      onComplete={(correct) => handleExerciseComplete(i, correct)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetail;
