import { useState } from "react";
import type { MultipleChoiceQuestion } from "@/data/lessons";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import TranslationSpeaker from "@/components/TranslationSpeaker";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";

interface Props {
  question: MultipleChoiceQuestion;
  onComplete: (correct: boolean) => void;
  showLingala?: boolean;
}

const MultipleChoice = ({ question, onComplete, showLingala = false }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();
  const { getTranslation } = useTranslatedContent();

  const handleSelect = (index: number) => {
    if (submitted) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    onComplete(selected === question.correctIndex);
  };

  // Pick text based on language
  const questionText = language === "fr"
    ? (question.questionFr || question.question)
    : language === "pt"
      ? (question.questionPt || question.question)
      : question.question;

  const options = language === "fr"
    ? (question.optionsFr || question.options)
    : language === "pt"
      ? (question.optionsPt || question.options)
      : question.options;

  const explanation = language === "fr"
    ? (question.explanationFr || question.explanation)
    : language === "pt"
      ? (question.explanationPt || question.explanation)
      : question.explanation;

  return (
     <div className="space-y-4">
      <div>
        {question.questionMandombe && (
          <p className="font-mandombe text-4xl text-gold mb-6">
            {question.questionMandombe}
          </p>
        )}
        <p className="font-display text-lg font-semibold text-foreground">
          {questionText}
        </p>
        {showLingala && (
          <div className="mt-2 font-mandombe text-2xl text-gold/80 border-t border-gold/10 pt-2 flex items-center gap-1">
            🇨🇩 {getTranslation(question.questionFr || question.question)}
            <TranslationSpeaker text={getTranslation(question.questionFr || question.question)} lang="ln" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        {options.map((option, i) => {
          let borderClass = "border-border hover:border-primary/40";
          if (submitted) {
            if (i === question.correctIndex) borderClass = "border-green-500 bg-green-500/10";
            else if (i === selected) borderClass = "border-destructive bg-destructive/10";
          } else if (i === selected) {
            borderClass = "border-primary bg-primary/5";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${borderClass} flex items-center justify-between`}
            >
              <span className="text-sm text-foreground">{option}</span>
              {submitted && i === question.correctIndex && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {submitted && i === selected && i !== question.correctIndex && (
                <XCircle className="w-5 h-5 text-destructive" />
              )}
            </button>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("exercises.checkAnswer")}
        </button>
      )}

      {submitted && explanation && (
        <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
          <p>💡 {explanation}</p>
          {showLingala && (
            <p className="mt-2 font-mandombe text-xl text-gold/80">
              🇨🇩 {getTranslation(question.explanationFr || question.explanation || "")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MultipleChoice;
