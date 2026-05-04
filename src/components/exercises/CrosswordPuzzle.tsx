import { useState, useMemo, useCallback, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MandombeSpeaker from "@/components/MandombeSpeaker";

// ===== Legacy schema (kept for existing lessons) =====
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

// ===== New pilot schema (rectangular + trilingual + Mandombe + illustration) =====
export interface CrosswordPilotClue {
  num: number;
  direction: "across" | "down";
  row: number;
  col: number;
  answer: string;
  mandombe: string;
  fr: string;
  en: string;
  pt: string;
}

export interface CrosswordPilot {
  id: string;
  titleFr: string;
  titleEn: string;
  titlePt: string;
  rows: number;
  cols: number;
  illustration?: string;
  illustrationAlt?: string;
  clues: CrosswordPilotClue[];
}

interface Props {
  question?: CrosswordQuestion;
  pilot?: CrosswordPilot;
  onComplete?: (correct: boolean) => void;
}

const CrosswordPuzzle = ({ question, pilot, onComplete }: Props) => {
  const { language, t } = useLanguage();

  // Normalize either schema into a unified shape
  const normalized = useMemo(() => {
    if (pilot) {
      return {
        rows: pilot.rows,
        cols: pilot.cols,
        title: language === "en" ? pilot.titleEn : language === "pt" ? pilot.titlePt : pilot.titleFr,
        illustration: pilot.illustration,
        illustrationAlt: pilot.illustrationAlt,
        clues: pilot.clues.map((c) => ({
          num: c.num,
          row: c.row,
          col: c.col,
          direction: c.direction,
          answer: c.answer,
          mandombe: c.mandombe,
          fr: c.fr,
          en: c.en,
          pt: c.pt,
        })),
        storageKey: `crossword.${pilot.id}`,
        trilingual: true as const,
      };
    }
    if (question) {
      const q = question;
      const sorted = [...q.clues].sort((a, b) => (a.row - b.row) || (a.col - b.col));
      const used = new Set<string>();
      let n = 0;
      const numByPos: Record<string, number> = {};
      sorted.forEach((c) => {
        const k = `${c.row}-${c.col}`;
        if (!used.has(k)) {
          n += 1;
          numByPos[k] = n;
          used.add(k);
        }
      });
      const title =
        language === "fr"
          ? q.titleFr || q.title || "Mots croises"
          : language === "pt"
            ? q.titlePt || q.title || "Palavras cruzadas"
            : q.title || "Crossword";
      return {
        rows: q.gridSize,
        cols: q.gridSize,
        title,
        illustration: undefined as string | undefined,
        illustrationAlt: undefined as string | undefined,
        clues: q.clues.map((c) => ({
          num: numByPos[`${c.row}-${c.col}`] || 0,
          row: c.row,
          col: c.col,
          direction: c.direction,
          answer: c.answer,
          mandombe: "",
          fr: c.clueFr || c.clue,
          en: c.clue,
          pt: c.cluePt || c.clue,
        })),
        storageKey: undefined as string | undefined,
        trilingual: false as const,
      };
    }
    return null;
  }, [pilot, question, language]);

  if (!normalized) return null;

  const { rows, cols, title, illustration, illustrationAlt, clues, storageKey, trilingual } = normalized;

  const { cellMap, numberedCells } = useMemo(() => {
    const map: Record<string, { clueIndices: number[] }> = {};
    const numbered: Record<string, number> = {};
    clues.forEach((clue, idx) => {
      numbered[`${clue.row}-${clue.col}`] = clue.num;
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        const key = `${r}-${c}`;
        if (!map[key]) map[key] = { clueIndices: [] };
        map[key].clueIndices.push(idx);
      }
    });
    return { cellMap: map, numberedCells: numbered };
  }, [clues]);

  const [grid, setGrid] = useState<Record<string, string>>(() => {
    if (typeof window === "undefined" || !storageKey) return {};
    try {
      const raw = window.localStorage.getItem(`${storageKey}.grid`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      window.localStorage.setItem(`${storageKey}.grid`, JSON.stringify(grid));
    }
  }, [grid, storageKey]);

  const handleCellChange = useCallback(
    (key: string, value: string) => {
      if (submitted) return;
      const char = value.slice(-1).toUpperCase();
      setGrid((prev) => ({ ...prev, [key]: char }));
      if (char && selectedCell) {
        const [r, c] = key.split("-").map(Number);
        const right = `${r}-${c + 1}`;
        const down = `${r + 1}-${c}`;
        if (cellMap[right]) setSelectedCell(right);
        else if (cellMap[down]) setSelectedCell(down);
      }
    },
    [submitted, cellMap, selectedCell],
  );

  const isAllCorrect = () =>
    clues.every((clue) => {
      for (let i = 0; i < clue.answer.length; i++) {
        const r = clue.direction === "down" ? clue.row + i : clue.row;
        const c = clue.direction === "across" ? clue.col + i : clue.col;
        if ((grid[`${r}-${c}`] || "").toUpperCase() !== clue.answer[i].toUpperCase()) return false;
      }
      return true;
    });

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete?.(isAllCorrect());
  };

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

  const renderClueLine = (clue: typeof clues[number]) => (
    <li key={`${clue.direction}-${clue.num}`} className="space-y-1 border-l-2 border-border/40 pl-3">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-bold text-foreground">{clue.num}.</span>
        {trilingual && (
          <span className="font-mandombe text-2xl leading-none text-foreground" lang="kg-Mand">
            {clue.mandombe}
          </span>
        )}
        {submitted && (
          <span className="font-display font-bold text-foreground tracking-wide">{clue.answer}</span>
        )}
        {trilingual && submitted && (
          <MandombeSpeaker lariText={clue.answer.toLowerCase()} className="ml-1" />
        )}
      </div>
      {trilingual ? (
        <div className="grid gap-0.5 text-xs text-muted-foreground sm:grid-cols-3">
          <span><span className="font-semibold text-foreground/80">FR</span> · {clue.fr}</span>
          <span><span className="font-semibold text-foreground/80">EN</span> · {clue.en}</span>
          <span><span className="font-semibold text-foreground/80">PT</span> · {clue.pt}</span>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          {language === "fr" ? clue.fr : language === "pt" ? clue.pt : clue.en}
        </div>
      )}
    </li>
  );

  return (
    <div className="space-y-4">
      <h4 className="font-display text-lg font-bold text-foreground">{title}</h4>

      <div className="flex justify-center overflow-x-auto">
        <div
          className="grid gap-0"
          style={{
            gridTemplateColumns: `repeat(${cols}, 2.5rem)`,
            gridTemplateRows: `repeat(${rows}, 2.5rem)`,
          }}
        >
          {Array.from({ length: rows * cols }).map((_, idx) => {
            const r = Math.floor(idx / cols);
            const c = idx % cols;
            const key = `${r}-${c}`;
            const isActive = !!cellMap[key];
            const number = numberedCells[key];
            const status = getCellStatus(key);

            if (!isActive) return <div key={key} className="h-10 w-10 bg-transparent" />;

            return (
              <div
                key={key}
                className={`relative h-10 w-10 border border-border/50 ${
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
                  <span className="absolute left-0.5 top-0 text-[9px] font-bold leading-none text-muted-foreground">
                    {number}
                  </span>
                )}
                <input
                  type="text"
                  maxLength={2}
                  value={grid[key] || ""}
                  onChange={(e) => handleCellChange(key, e.target.value)}
                  onFocus={() => setSelectedCell(key)}
                  className="h-full w-full bg-transparent text-center font-display text-lg font-bold uppercase text-foreground outline-none"
                  disabled={submitted}
                />
                {submitted && status === "correct" && (
                  <CheckCircle className="absolute -right-1 -top-1 h-3 w-3 text-green-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {illustration && (
        <div className="flex justify-center">
          <img
            src={illustration}
            alt={illustrationAlt || ""}
            loading="lazy"
            width={320}
            height={320}
            className="h-auto w-64 rounded-lg border border-border/40 object-cover shadow-sm"
          />
        </div>
      )}

      <div className="grid gap-6 text-sm sm:grid-cols-2">
        <div>
          <h5 className="mb-2 font-display font-bold text-foreground">
            {language === "fr" ? "Horizontal →" : language === "pt" ? "Horizontal →" : "Across →"}
          </h5>
          <ul className="space-y-3">{acrossClues.map(renderClueLine)}</ul>
        </div>
        <div>
          <h5 className="mb-2 font-display font-bold text-foreground">
            {language === "fr" ? "Vertical ↓" : language === "pt" ? "Vertical ↓" : "Down ↓"}
          </h5>
          <ul className="space-y-3">{downClues.map(renderClueLine)}</ul>
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("exercises.checkAnswer")}
        </button>
      )}

      {submitted && (
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {isAllCorrect() ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-green-500">
                {language === "fr" ? "Parfait !" : language === "pt" ? "Perfeito!" : "Perfect!"}
              </span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-destructive" />
              <span className="font-semibold text-destructive">
                {language === "fr"
                  ? "Certaines reponses sont incorrectes."
                  : language === "pt"
                    ? "Algumas respostas estao incorretas."
                    : "Some answers are incorrect."}
              </span>
              <button
                onClick={handleReveal}
                className="ml-2 rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80"
              >
                {language === "fr" ? "Voir les reponses" : language === "pt" ? "Ver respostas" : "Show answers"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CrosswordPuzzle;
