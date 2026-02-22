import { Volume2 } from "lucide-react";

interface VocabEntry {
  lari: string;
  french: string;
  english: string;
  portuguese: string;
  category: string;
}

const sampleVocab: VocabEntry[] = [
  { lari: "Mbote zêno", french: "Bonjour à vous", english: "Hello to you (plural)", portuguese: "Olá a vocês", category: "Greetings" },
  { lari: "Vumbukidi?", french: "Tu vas bien ?", english: "How are you?", portuguese: "Como você está?", category: "Greetings" },
  { lari: "Shama", french: "Sois en bonne santé", english: "Be healthy", portuguese: "Tenha saúde", category: "Greetings" },
  { lari: "Muana", french: "Enfant", english: "Child", portuguese: "Criança", category: "Family" },
  { lari: "Nkaka", french: "Grand-père / Grand-mère", english: "Grandfather / Grandmother", portuguese: "Avô / Avó", category: "Family" },
  { lari: "Muti", french: "Arbre", english: "Tree", portuguese: "Árvore", category: "Nature" },
  { lari: "Lumbuetete", french: "Étoile", english: "Star", portuguese: "Estrela", category: "Nature" },
  { lari: "Lumbembemba", french: "Papillon", english: "Butterfly", portuguese: "Borboleta", category: "Nature" },
];

const VocabularyPreview = () => {
  return (
    <section id="vocabulary" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.25em] uppercase mb-3">
            Mazita — Vocabulary
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Essential Words & Phrases
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Each word comes in Kikongo Lari with translations in three languages
            spoken across the Kongo diaspora.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {sampleVocab.map((word, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group"
            >
              <span className="text-xs font-body uppercase tracking-wider text-gold font-semibold">
                {word.category}
              </span>
              <h3 className="font-display text-xl font-bold text-foreground mt-2 mb-3 flex items-center gap-2">
                {word.lari}
                <Volume2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
              </h3>
              <div className="space-y-1.5 text-sm">
                <p className="text-muted-foreground">
                  <span className="inline-block w-6 text-xs font-bold text-primary/70">FR</span>
                  {word.french}
                </p>
                <p className="text-muted-foreground">
                  <span className="inline-block w-6 text-xs font-bold text-primary/70">EN</span>
                  {word.english}
                </p>
                <p className="text-muted-foreground">
                  <span className="inline-block w-6 text-xs font-bold text-primary/70">PT</span>
                  {word.portuguese}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#premium"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
          >
            See all vocabulary →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VocabularyPreview;
