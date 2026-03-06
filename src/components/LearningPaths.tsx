import { BookOpen, Feather, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LearningPaths = () => {
  const { t } = useLanguage();

  const paths = [
    {
      icon: BookOpen,
      title: t("paths.vocab.title"),
      titleLari: "Mazita",
      description: t("paths.vocab.desc"),
      items: t("paths.vocab.items").split(","),
      color: "primary" as const,
    },
    {
      icon: Feather,
      title: t("paths.stories.title"),
      titleLari: "Binsamu",
      description: t("paths.stories.desc"),
      items: t("paths.stories.items").split(","),
      color: "secondary" as const,
    },
    {
      icon: Sparkles,
      title: t("paths.kilolaka.title"),
      titleLari: "Kilolaka",
      description: t("paths.kilolaka.desc"),
      items: t("paths.kilolaka.items").split(","),
      color: "accent" as const,
    },
  ];

  return (
    <section id="learn" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            {t("paths.eyebrow")}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            {t("paths.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paths.map((path) => (
            <div
              key={path.titleLari}
              className="group bg-background rounded-xl p-8 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <path.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
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
