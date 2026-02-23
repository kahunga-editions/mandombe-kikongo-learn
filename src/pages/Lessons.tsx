import { Link } from "react-router-dom";
import { lessons } from "@/data/lessons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const levelColors = {
  beginner: "bg-green-500/10 text-green-700 border-green-500/30",
  intermediate: "bg-secondary/10 text-secondary border-secondary/30",
  advanced: "bg-primary/10 text-primary border-primary/30",
};

const Lessons = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="font-mandombe text-4xl text-primary/50 mb-2">Zonza Lari</p>
            <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
              Zonza Lari — Lessons
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Interactive Lessons
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Learn Kikongo Lari step by step with vocabulary, conjugation tables, and interactive exercises — all rendered in Mandombe script.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                to={`/lessons/${lesson.id}`}
                className="group bg-card rounded-xl border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{lesson.icon}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lesson.level]}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <p className="font-mandombe text-2xl text-primary/40 mb-2">
                    {lesson.titleMandombe}
                  </p>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h2>
                  <p className="text-primary font-body text-sm italic mb-3">
                    {lesson.titleLari}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {lesson.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    {lesson.vocabulary && (
                      <span>{lesson.vocabulary.length} words</span>
                    )}
                    {lesson.conjugations && (
                      <span>{lesson.conjugations.length} conjugations</span>
                    )}
                    <span>{lesson.exercises.length} exercises</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lessons;
