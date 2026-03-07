import { useState, useMemo } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface WordSearchClue {
  word: string;
  clue: string;
  clueFr?: string;
  cluePt?: string;
  row: number;
  col: number;
  direction: "across" | "down" | "diagonal";
}

export interface WordSearchQuestion {
  type: "word-search";
  title?: string;
  titleFr?: string;
  titlePt?: string;
  gridSize: number;
  words: WordSearchClue[];
  fillerLetters: string; // A flat string of filler letters row by row
}

interface Props {
  question: WordSearchQuestion;
  onComplete: (correct: boolean) => void;
}

const WordSearchPuzzle = ({ question, onComplete }: Props) => {
  const { language, t } = useLanguage();
  const { gridSize, words, fillerLetters } = question;

  const title = language === "fr"
    ? (question.titleFr || question.title || "Mots fléchés")
    : language === "pt"
      ? (question.titlePt || question.title || "Caça-palavras")
      : (question.title || "Word Search");

  // Build grid with words placed + fillers
  const grid = useMemo(() => {
    const g: string[][] = [];
    // Fill with filler letters first
    for (let r = 0; r < gridSize; r++) {
      g[r] = [];
      for (let c = 0; c < gridSize; c++) {
        const idx = r * gridSize + c;
        g[r][c] = (fillerLetters[idx] || "X").toUpperCase();
      }
    }
    // Place words
    words.forEach((w) => {
      for (let i = 0; i < w.word.length; i++) {
        let r = w.row, c = w.col;
        if (w.direction === "across") c += i;
        else if (w.direction === "down") r += i;
        else { r += i; c += i; } // diagonal
        if (r < gridSize && c < gridSize) {
          g[r][c] = w.word[i].toUpperCase();
        }
      }
    });
    return g;
  }, [gridSize, words, fillerLetters]);

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [foundWords, setFoundWords] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);

  // All cells that belong to a word
  const wordCells = useMemo(() => {
    const map: Record<string, number[]> = {};
    words.forEach((w, wi) => {
      for (let i = 0; i < w.word.length; i++) {
        let r = w.row, c = w.col;
        if (w.direction === "across") c += i;
        else if (w.direction === "down") r += i;
        else { r += i; c += i; }
        const key = `${r}-${c}`;
        if (!map[key]) map[key] = [];
        map[key].push(wi);
      }
    });
    return map;
  }, [words]);

  const handleCellClick = (r: number, c: number) => {
    if (submitted) return;
    const key = `${r}-${c}`;
    const next = new Set(selectedCells);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedCells(next);

    // Check if any word is fully selected
    words.forEach((w, wi) => {
      if (foundWords.has(wi)) return;
      let allSelected = true;
      for (let i = 0; i < w.word.length; i++) {
        let wr = w.row, wc = w.col;
        if (w.direction === "across") wc += i;
        else if (w.direction === "down") wr += i;
        else { wr += i; wc += i; }
        if (!next.has(`${wr}-${wc}`)) { allSelected = false; break; }
      }
      if (allSelected) {
        setFoundWords((prev) => new Set([...prev, wi]));
      }
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete(foundWords.size === words.length);
  };

  const getClueText = (w: WordSearchClue) => {
    if (language === "fr") return w.clueFr || w.clue;
    if (language === "pt") return w.cluePt || w.clue;
    return w.clue;
  };

  const isCellInFoundWord = (r: number, c: number) => {
    const key = `${r}-${c}`;
    const indices = wordCells[key] || [];
    return indices.some((wi) => foundWords.has(wi));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">
        {language === "fr"
          ? "Cliquez sur les lettres pour trouver les mots cachés."
          : language === "pt"
            ? "Clique nas letras para encontrar as palavras escondidas."
            : "Click on letters to find the hidden words."}
      </p>

      {/* Grid */}
      <div className="flex justify-center overflow-x-auto">
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 2.25rem)`,
            gridTemplateRows: `repeat(${gridSize}, 2.25rem)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r}-${c}`;
              const isSelected = selectedCells.has(key);
              const isFound = isCellInFoundWord(r, c);

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  className={`w-9 h-9 flex items-center justify-center rounded text-sm font-display font-bold uppercase transition-all ${
                    isFound
                      ? "bg-green-500/20 text-green-600 border border-green-500/40"
                      : isSelected
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-card text-foreground border border-border hover:border-primary/30"
                  }`}
                  disabled={submitted}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Word list / clues */}
      <div className="space-y-1.5">
        <h5 className="font-display font-bold text-foreground text-sm mb-2">
          {language === "fr" ? "Mots à trouver :" : language === "pt" ? "Palavras a encontrar:" : "Words to find:"}
        </h5>
        {words.map((w, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            {foundWords.has(i) ? (
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
            ) : (
              <span className="w-4 h-4 rounded-full border border-border shrink-0" />
            )}
            <span className={`${foundWords.has(i) ? "line-through text-muted-foreground" : "text-foreground"}`}>
              {getClueText(w)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          {foundWords.size}/{words.length} {language === "fr" ? "trouvés" : language === "pt" ? "encontradas" : "found"}
        </span>
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-primary/90"
          >
            {t("exercises.checkAnswer")}
          </button>
        )}
      </div>

      {submitted && (
        <div className="flex items-center gap-2 text-sm">
          {foundWords.size === words.length ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-semibold">
                {language === "fr" ? "Tous les mots trouvés !" : language === "pt" ? "Todas as palavras encontradas!" : "All words found!"}
              </span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-destructive" />
              <span className="text-destructive font-semibold">
                {language === "fr" ? `${words.length - foundWords.size} mot(s) manquant(s).` : language === "pt" ? `${words.length - foundWords.size} palavra(s) em falta.` : `${words.length - foundWords.size} word(s) missing.`}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default WordSearchPuzzle;
