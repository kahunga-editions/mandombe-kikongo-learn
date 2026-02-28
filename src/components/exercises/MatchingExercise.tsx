import { useState, useMemo } from "react";
import type { MatchingQuestion } from "@/data/lessons";
import { CheckCircle } from "lucide-react";

interface Props {
  question: MatchingQuestion;
  onComplete: (correct: boolean) => void;
}

const MatchingExercise = ({ question, onComplete }: Props) => {
  const shuffledRight = useMemo(
    () => [...question.pairs].sort(() => Math.random() - 0.5),
    [question]
  );

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleLeftClick = (i: number) => {
    if (submitted || i in matches) return;
    setSelectedLeft(i);
  };

  const handleRightClick = (shuffledIdx: number) => {
    if (submitted || selectedLeft === null) return;
    const rightValue = shuffledRight[shuffledIdx].right;
    // Check if this right is already matched
    const alreadyMatched = Object.values(matches).some(
      (mi) => shuffledRight[mi]?.right === rightValue
    );
    if (alreadyMatched) return;

    setMatches((prev) => ({ ...prev, [selectedLeft]: shuffledIdx }));
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = question.pairs.every((pair, i) => {
      const matchedIdx = matches[i];
      return matchedIdx !== undefined && shuffledRight[matchedIdx].right === pair.right;
    });
    onComplete(allCorrect);
  };

  const allMatched = Object.keys(matches).length === question.pairs.length;

  return (
    <div className="space-y-4">
      <p className="font-display text-lg font-semibold text-foreground">
        {question.instruction}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {question.pairs.map((pair, i) => {
            const isMatched = i in matches;
            let cls = "border-border";
            if (submitted && isMatched) {
              cls = shuffledRight[matches[i]].right === pair.right
                ? "border-green-500 bg-green-500/10"
                : "border-destructive bg-destructive/10";
            } else if (selectedLeft === i) {
              cls = "border-primary bg-primary/5";
            } else if (isMatched) {
              cls = "border-secondary bg-secondary/10";
            }

            return (
              <button
                key={i}
                onClick={() => handleLeftClick(i)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${cls}`}
              >
                <span className="font-mandombe text-2xl text-gold block mb-3">{pair.left}</span>
                <span className="text-foreground">{pair.left}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {shuffledRight.map((item, i) => {
            const isUsed = Object.values(matches).includes(i);
            return (
              <button
                key={i}
                onClick={() => handleRightClick(i)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                  isUsed
                    ? "border-secondary/40 bg-secondary/5 opacity-60"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-foreground">{item.right}</span>
                {submitted && isUsed && (
                  <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allMatched}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check Matches
        </button>
      )}
    </div>
  );
};

export default MatchingExercise;
