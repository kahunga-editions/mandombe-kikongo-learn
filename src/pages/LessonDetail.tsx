import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { lessons } from "@/data/lessons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultipleChoice from "@/components/exercises/MultipleChoice";
import MatchingExercise from "@/components/exercises/MatchingExercise";
import FillInBlank from "@/components/exercises/FillInBlank";
import { ArrowLeft, BookOpen, Trophy } from "lucide-react";

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const lesson = lessons.find((l) => l.id === lessonId);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"learn" | "exercises">("learn");

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <h1 className="font-display text-3xl text-foreground">Lesson not found</h1>
          <Link to="/lessons" className="text-primary mt-4 inline-block">← Back to lessons</Link>
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
          {/* Header */}
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to lessons
          </Link>

          <div className="mb-8">
            <p className="font-mandombe text-6xl text-primary/40 mb-1">{lesson.titleMandombe}</p>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{lesson.icon}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {lesson.title}
              </h1>
            </div>
            <p className="text-primary font-body text-sm italic">{lesson.titleLari}</p>
            <p className="text-muted-foreground mt-2">{lesson.description}</p>
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
              <BookOpen className="w-4 h-4" /> Learn
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeTab === "exercises"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4" /> Exercises
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
              {/* Vocabulary */}
              {lesson.vocabulary && lesson.vocabulary.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Vocabulary — <span className="font-mandombe text-3xl text-primary/50">Mazita</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {lesson.vocabulary.map((item, i) => (
                      <div
                        key={i}
                        className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors"
                      >
                        <p className="font-mandombe text-2xl text-primary/40 mb-0.5">
                          {item.mandombe}
                        </p>
                        <p className="font-display text-lg font-bold text-foreground">
                          {item.lari}
                        </p>
                        <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                          <span>🇫🇷 {item.french}</span>
                          <span>🇬🇧 {item.english}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Conjugation Tables */}
              {lesson.conjugations && lesson.conjugations.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Conjugations — <span className="font-mandombe text-3xl text-primary/50">Zonza</span>
                  </h2>
                  <div className="space-y-6">
                    {lesson.conjugations.map((conj, i) => (
                      <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="bg-earth-deep px-6 py-4">
                          <p className="font-mandombe text-3xl text-gold/50 mb-0.5">
                            {conj.verbMandombe}
                          </p>
                          <h3 className="font-display text-xl font-bold text-gold">
                            {conj.verb} — {conj.meaning.en}
                          </h3>
                          <p className="text-cream/60 text-sm">{conj.tense} • {conj.meaning.fr}</p>
                        </div>
                        <div className="divide-y divide-border">
                          {conj.rows.map((row, j) => (
                            <div key={j} className="flex items-center px-6 py-3 gap-4">
                              <span className="text-sm text-muted-foreground w-20 shrink-0">
                                {row.person}
                              </span>
                              <span className="font-mandombe text-xl text-primary/40">
                                {row.mandombe}
                              </span>
                              <span className="font-display font-semibold text-foreground">
                                {row.lari}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Phrases */}
              {lesson.phrases && lesson.phrases.length > 0 && (
                <section>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Key Phrases — <span className="font-mandombe text-3xl text-primary/50">Binsamu</span>
                  </h2>
                  <div className="space-y-3">
                    {lesson.phrases.map((phrase, i) => (
                      <div
                        key={i}
                        className="bg-card rounded-lg border border-border p-4 border-l-4 border-l-primary"
                      >
                        <p className="font-mandombe text-2xl text-primary/40 mb-0.5">
                          {phrase.mandombe}
                        </p>
                        <p className="font-display text-lg font-semibold text-foreground italic">
                          {phrase.lari}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 text-sm text-muted-foreground">
                          <span>🇫🇷 {phrase.french}</span>
                          <span>🇬🇧 {phrase.english}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setActiveTab("exercises")}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Exercises →
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
                    Lesson Complete!
                  </h3>
                  <p className="text-muted-foreground">
                    You got {correctCount} out of {lesson.exercises.length} correct.
                  </p>
                </div>
              )}

              {lesson.exercises.map((exercise, i) => (
                <div
                  key={i}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
                    Exercise {i + 1} of {lesson.exercises.length}
                    {results[i] !== undefined && (
                      <span className={`ml-2 ${results[i] ? "text-green-500" : "text-destructive"}`}>
                        • {results[i] ? "Correct ✓" : "Incorrect ✗"}
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
