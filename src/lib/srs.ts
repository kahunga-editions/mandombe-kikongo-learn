/**
 * SM-2 Spaced Repetition Algorithm (Anki-style)
 * Quality ratings: 0=Again, 1=Hard, 2=Good, 3=Easy
 */

export type SRSRating = 0 | 1 | 2 | 3;

export interface SRSState {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: Date;
}

export function computeNextReview(
  current: SRSState,
  quality: SRSRating
): SRSState {
  let { easeFactor, intervalDays, repetitions } = current;

  // Map 0-3 to SM-2 quality 0-5
  const q = quality === 0 ? 0 : quality === 1 ? 2 : quality === 2 ? 3 : 5;

  if (q < 3) {
    // Failed — reset
    repetitions = 0;
    intervalDays = 0;
  } else {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  // For "Hard" give a shorter interval
  if (quality === 1 && intervalDays > 1) {
    intervalDays = Math.max(1, Math.round(intervalDays * 0.5));
  }

  const nextReviewAt = new Date();
  if (quality === 0) {
    // Again: review in 1 minute (for same session), stored as now
    nextReviewAt.setMinutes(nextReviewAt.getMinutes() + 1);
  } else {
    nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);
  }

  return { easeFactor, intervalDays, repetitions, nextReviewAt };
}

export interface LocalFlashcard {
  id: string;
  front_lari: string;
  front_mandombe: string;
  front_french: string;
  front_english: string;
  front_portuguese: string;
  deck_name: string;
  created_at: string;
  // SRS state stored locally
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
}

const LOCAL_KEY = "nzo_flashcards";

export function getLocalFlashcards(): LocalFlashcard[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveLocalFlashcards(cards: LocalFlashcard[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(cards));
}

export function addLocalFlashcard(card: Omit<LocalFlashcard, "id" | "created_at" | "ease_factor" | "interval_days" | "repetitions" | "next_review_at" | "last_reviewed_at">): LocalFlashcard {
  const cards = getLocalFlashcards();
  const newCard: LocalFlashcard = {
    ...card,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    ease_factor: 2.5,
    interval_days: 0,
    repetitions: 0,
    next_review_at: new Date().toISOString(),
    last_reviewed_at: null,
  };
  cards.push(newCard);
  saveLocalFlashcards(cards);
  return newCard;
}

export function deleteLocalFlashcard(id: string) {
  const cards = getLocalFlashcards().filter((c) => c.id !== id);
  saveLocalFlashcards(cards);
}

export function reviewLocalFlashcard(id: string, quality: SRSRating) {
  const cards = getLocalFlashcards();
  const idx = cards.findIndex((c) => c.id === id);
  if (idx === -1) return;

  const card = cards[idx];
  const result = computeNextReview(
    {
      easeFactor: card.ease_factor,
      intervalDays: card.interval_days,
      repetitions: card.repetitions,
      nextReviewAt: new Date(card.next_review_at),
    },
    quality
  );

  cards[idx] = {
    ...card,
    ease_factor: result.easeFactor,
    interval_days: result.intervalDays,
    repetitions: result.repetitions,
    next_review_at: result.nextReviewAt.toISOString(),
    last_reviewed_at: new Date().toISOString(),
  };
  saveLocalFlashcards(cards);
}

export function getDueLocalFlashcards(): LocalFlashcard[] {
  const now = new Date();
  return getLocalFlashcards().filter(
    (c) => new Date(c.next_review_at) <= now
  );
}
