import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface RecognitionItem {
  mandombe: string;
  lari: string;
  distractors: string[];
  french: string;
  english?: string;
  portuguese?: string;
  mode: "glyph-to-latin" | "latin-to-glyph";
}

interface MandombeRecognitionProps {
  question: {
    type: "mandombe-recognition";
    title?: string;
    titleFr?: string;
    titlePt?: string;
    items: RecognitionItem[];
  };
  onComplete: (correct: boolean) => void;
}

const MandombeRecognition = ({ question, onComplete }: MandombeRecognitionProps) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = question.items[currentIndex];

  const title = language === "fr" ? (question.titleFr || question.title) :
    language === "pt" ? (question.titlePt || question.title) : question.title;

  const hint = language === "en" ? (item?.english || item?.french) :
    language === "pt" ? (item?.portuguese || item?.french) : item?.french;

  // Shuffle options once per item
  const options = useMemo(() => {
    if (!item) return [];
    const all = [item.lari, ...item.distractors];
    // Fisher-Yates shuffle
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentIndex, item?.lari]);

  if (!item) return null;

  const isCorrect = selected === item.lari;

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const correct = option === item.lari;
    if (correct) setScore((s) => s + 1);

    // Auto-advance after delay
    setTimeout(() => {
      if (currentIndex < question.items.length - 1) {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      } else {
        setFinished(true);
        const finalScore = correct ? score + 1 : score;
        onComplete(finalScore >= Math.ceil(question.items.length / 2));
      }
    }, 1200);
  };

  if (finished) {
    return (
      <div className="text-center py-6">
        <p className="text-4xl mb-2">{score === question.items.length ? "🎉" : "📝"}</p>
        <p className="font-display text-xl font-bold text-foreground">
          {score} / {question.items.length}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {language === "fr" ? "Exercice terminé" : language === "pt" ? "Exercício concluído" : "Exercise complete"}
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h3 className="font-display text-lg font-bold text-foreground mb-4">{title}</h3>
      )}

      {/* Progress */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex) / question.items.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {currentIndex + 1}/{question.items.length}
        </span>
      </div>

      {/* Question display */}
      <div className="text-center mb-6">
        {item.mode === "glyph-to-latin" ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {language === "fr" ? "Quel mot correspond à ce glyphe ?" :
                language === "pt" ? "Qual palavra corresponde a este glifo?" :
                  "Which word matches this glyph?"}
            </p>
            <p className="font-mandombe text-6xl md:text-7xl text-gold mb-3">{item.mandombe}</p>
            <p className="text-sm text-muted-foreground italic">💡 {hint}</p>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {language === "fr" ? "Quel glyphe correspond à ce mot ?" :
                language === "pt" ? "Qual glifo corresponde a esta palavra?" :
                  "Which glyph matches this word?"}
            </p>
            <p className="font-display text-3xl font-bold text-foreground mb-3">{item.lari}</p>
            <p className="text-sm text-muted-foreground italic">💡 {hint}</p>
          </>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, i) => {
          const isThis = selected === option;
          const isAnswer = option === item.lari;
          let btnClass = "border-border hover:border-primary/50 text-foreground";
          if (selected) {
            if (isAnswer) btnClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
            else if (isThis) btnClass = "border-destructive bg-destructive/10 text-destructive";
            else btnClass = "border-border text-muted-foreground opacity-50";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={!!selected}
              className={`rounded-xl border-2 p-4 transition-all ${btnClass} ${
                !selected ? "hover:shadow-md cursor-pointer" : "cursor-default"
              }`}
            >
              {item.mode === "glyph-to-latin" ? (
                <span className="font-display text-lg font-semibold">{option}</span>
              ) : (
                <span className="font-mandombe text-4xl text-gold">{option}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MandombeRecognition;
