import { BookOpen, Feather, Sparkles } from "lucide-react";

const paths = [
  {
    icon: BookOpen,
    title: "Vocabulary",
    titleLari: "Mazita",
    description:
      "Learn essential words and phrases in Kikongo Lari with Latin transliteration, and translations in English, French, and Portuguese.",
    items: ["Greetings & Phrases", "Family & People", "Nature & Animals", "Body & Health"],
    color: "primary" as const,
  },
  {
    icon: Feather,
    title: "Stories",
    titleLari: "Binsamu",
    description:
      "Read bilingual stories like Nsayi's adventures — immerse yourself in Kongo culture through narrative.",
    items: ["Nsayi at School", "Nsayi in the Savanna", "Cultural Tales", "Children's Stories"],
    color: "secondary" as const,
  },
  {
    icon: Sparkles,
    title: "Kilolaka",
    titleLari: "Kilolaka",
    description:
      "Explore the sacred art of decomposing Kikongo into energetic codes — language as a cosmological map.",
    items: ["Morpheme Analysis", "B & F Series", "D & G Axis", "Mandombe Script"],
    color: "accent" as const,
  },
];

const LearningPaths = () => {
  return (
    <section id="learn" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            Your Learning Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Three Paths to Mastery
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paths.map((path) => (
            <div
              key={path.title}
              className="group bg-background rounded-xl p-8 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <path.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                {path.title}
              </h3>
              <p className="text-primary font-body text-sm italic mb-4">
                {path.titleLari}
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {path.description}
              </p>
              <ul className="space-y-2">
                {path.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
