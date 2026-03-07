import { useState, useMemo, useCallback } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CrosswordClue {
  answer: string;
  clue: string;
  clueFr?: string;
  cluePt?: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

export interface CrosswordQuestion {
  type: "crossword";
  title?: string;
  titleFr?: string;
  titlePt?: string;
  gridSize: number;
  clues: CrosswordClue[];
}

interface Props {
  question: CrosswordQuestion;
  onComplete: (correct: boolean) => void;
}

const CrosswordPuzzle = ({ question, onComplete }: Props) => {
  const { language, t } = useLanguage();
  const { gridSize, clues } = question;

  const title = language === "fr"
    ? (question.titleFr || question.title || "Mots croisés")
    : language === "pt"
      ? (question.titlePt || question.title || "Palavras cruzadas")
      : (question.title || "Crossword");

  // Build a grid map of which cells are active
  const { cellMap, numberedCells } = useMemo(() => {
    const map: Record<string, { clueIndices: number[] }> = {};
    const numbered: Record<string, number> = {};
    let num = 1;

    // Sort clues by position for consistent numbering
    const sorted = [...clues].sort((a, b) => a.row !== b.row ? a.row - b.row : a.col - b.col);
    const usedPositions = new Set<string>();

    sorted.forEach((clue, ci) => {
      const posKey = `${clue.row}-${clue.col}`;
      if (!usedPositions.has(posKey)) {
        numbered[posKey] = num++;
        usedPositions.add(posKey);
      }

      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        const key = `${r}-${c}`;
        if (!map[key]) map[key] = { clueIndices: [] };
        map[key].clueIndices.push(ci);
      }
    });

    return { cellMap: map, numberedCells: numbered };
  }, [clues]);

  const [grid, setGrid] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  const handleCellChange = useCallback((key: string, value: string) => {
    if (submitted) return;
    const char = value.slice(-1).toUpperCase();
    setGrid((prev) => ({ ...prev, [key]: char }));

    // Auto-advance to next cell
    if (char && selectedCell) {
      const [r, c] = key.split("-").map(Number);
      // Try right first, then down
      const nextRight = `${r}-${c + 1}`;
      const nextDown = `${r + 1}-${c}`;
      if (cellMap[nextRight]) setSelectedCell(nextRight);
      else if (cellMap[nextDown]) setSelectedCell(nextDown);
    }
  }, [submitted, cellMap, selectedCell]);

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = clues.every((clue) => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        const key = `${r}-${c}`;
        if ((grid[key] || "").toUpperCase() !== clue.answer[i].toUpperCase()) return false;
      }
      return true;
    });
    onComplete(allCorrect);
  };

  // Reveal all correct answers on the grid
  const handleReveal = () => {
    const revealed: Record<string, string> = {};
    clues.forEach((clue) => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        revealed[`${r}-${c}`] = clue.answer[i].toUpperCase();
      }
    });
    setGrid(revealed);
  };

  const getClueText = (clue: CrosswordClue) => {
    if (language === "fr") return clue.clueFr || clue.clue;
    if (language === "pt") return clue.cluePt || clue.clue;
    return clue.clue;
  };

  const getCellStatus = (key: string) => {
    if (!submitted) return "";
    const indices = cellMap[key]?.clueIndices || [];
    for (const ci of indices) {
      const clue = clues[ci];
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        if (`${r}-${c}` === key) {
          if ((grid[key] || "").toUpperCase() === clue.answer[i].toUpperCase()) return "correct";
          return "wrong";
        }
      }
    }
    return "";
  };

  const acrossClues = clues.filter((c) => c.direction === "across");
  const downClues = clues.filter((c) => c.direction === "down");

  return (
    <div className="space-y-4">
      <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>

      {/* Grid */}
      <div className="flex justify-center overflow-x-auto">
        <div
          className="grid gap-0 border border-border"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 2.5rem)`,
            gridTemplateRows: `repeat(${gridSize}, 2.5rem)`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
            const r = Math.floor(idx / gridSize);
            const c = idx % gridSize;
            const key = `${r}-${c}`;
            const isActive = !!cellMap[key];
            const number = numberedCells[key];
            const status = getCellStatus(key);

            if (!isActive) {
              return <div key={key} className="w-10 h-10 bg-earth-deep" />;
            }

            return (
              <div
                key={key}
                className={`w-10 h-10 relative border border-border/50 ${
                  selectedCell === key ? "ring-2 ring-primary" : ""
                } ${
                  status === "correct"
                    ? "bg-green-500/10"
                    : status === "wrong"
                      ? "bg-destructive/10"
                      : "bg-card"
                }`}
                onClick={() => setSelectedCell(key)}
              >
                {number && (
                  <span className="absolute top-0 left-0.5 text-[9px] text-muted-foreground font-bold leading-none">
                    {number}
                  </span>
                )}
                <input
                  type="text"
                  maxLength={2}
                  value={grid[key] || ""}
                  onChange={(e) => handleCellChange(key, e.target.value)}
                  onFocus={() => setSelectedCell(key)}
                  className="w-full h-full text-center font-display font-bold text-foreground bg-transparent outline-none text-lg uppercase"
                  disabled={submitted}
                />
                {submitted && status === "correct" && (
                  <CheckCircle className="absolute -top-1 -right-1 w-3 h-3 text-green-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Clues */}
      <div className="grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <h5 className="font-display font-bold text-foreground mb-2">
            {language === "fr" ? "Horizontal →" : language === "pt" ? "Horizontal →" : "Across →"}
          </h5>
          <ul className="space-y-1.5 text-muted-foreground">
            {acrossClues.map((clue, i) => (
              <li key={i}>
                <span className="font-bold text-foreground">{numberedCells[`${clue.row}-${clue.col}`]}.</span>{" "}
                {getClueText(clue)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-display font-bold text-foreground mb-2">
            {language === "fr" ? "Vertical ↓" : language === "pt" ? "Vertical ↓" : "Down ↓"}
          </h5>
          <ul className="space-y-1.5 text-muted-foreground">
            {downClues.map((clue, i) => (
              <li key={i}>
                <span className="font-bold text-foreground">{numberedCells[`${clue.row}-${clue.col}`]}.</span>{" "}
                {getClueText(clue)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90"
        >
          {t("exercises.checkAnswer")}
        </button>
      )}

      {submitted && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            {clues.every((clue) => {
              for (let i = 0; i < clue.answer.length; i++) {
                const r = clue.direction === "down" ? clue.row + i : clue.row;
                const c = clue.direction === "across" ? clue.col + i : clue.col;
                if ((grid[`${r}-${c}`] || "").toUpperCase() !== clue.answer[i].toUpperCase()) return false;
              }
              return true;
            }) ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-semibold">
                  {language === "fr" ? "Parfait !" : language === "pt" ? "Perfeito!" : "Perfect!"}
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-semibold">
                  {language === "fr" ? "Certaines réponses sont incorrectes." : language === "pt" ? "Algumas respostas estão incorretas." : "Some answers are incorrect."}
                </span>
                <button
                  onClick={handleReveal}
                  className="ml-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors hover:bg-accent/80"
                >
                  {language === "fr" ? "Voir les réponses" : language === "pt" ? "Ver respostas" : "Show answers"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrosswordPuzzle;
