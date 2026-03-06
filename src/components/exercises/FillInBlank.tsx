import { useState } from "react";
import type { FillInBlankQuestion } from "@/data/lessons";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  question: FillInBlankQuestion;
  onComplete: (correct: boolean) => void;
}

const FillInBlank = ({ question, onComplete }: Props) => {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();
  const isCorrect = answer.trim().toLowerCase() === question.blank.toLowerCase();

  const hint = language === "pt"
    ? (question.hintPt || question.hint)
    : question.hint;

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setSubmitted(true);
    onComplete(isCorrect);
  };

  return (
    <div className="space-y-4">
      <div>
        {question.sentenceMandombe && (
          <p className="font-mandombe text-4xl text-gold mb-6">
            {question.sentenceMandombe}
          </p>
        )}
        <p className="font-display text-lg font-semibold text-foreground">
          {question.sentence}
        </p>
      </div>

      {hint && (
        <div className="text-sm text-muted-foreground italic">
          <p>{t("exercises.hint")} {hint}</p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={t("exercises.typeAnswer")}
          className={`flex-1 px-4 py-3 rounded-lg border text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
            submitted
              ? isCorrect
                ? "border-green-500"
                : "border-destructive"
              : "border-input"
          }`}
        />
        {submitted && (
          isCorrect
            ? <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
            : <XCircle className="w-6 h-6 text-destructive shrink-0" />
        )}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!answer.trim()}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("exercises.checkAnswer")}
        </button>
      )}

      {submitted && !isCorrect && (
        <p className="text-sm text-muted-foreground">
          {t("exercises.correctAnswer")} <strong className="text-foreground">{question.blank}</strong>
        </p>
      )}
    </div>
  );
};

export default FillInBlank;
