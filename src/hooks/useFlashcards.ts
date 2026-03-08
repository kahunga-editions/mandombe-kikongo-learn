import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  type SRSRating,
  type LocalFlashcard,
  computeNextReview,
  getLocalFlashcards,
  saveLocalFlashcards,
  addLocalFlashcard,
  deleteLocalFlashcard,
  reviewLocalFlashcard,
  getDueLocalFlashcards,
} from "@/lib/srs";

export interface Flashcard {
  id: string;
  front_lari: string;
  front_mandombe: string;
  front_french: string;
  front_english: string;
  front_portuguese: string;
  deck_name: string;
  created_at: string;
  // SRS
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
}

export function useFlashcards() {
  const { user } = useAuth();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    if (user) {
      // Fetch from cloud
      const { data: fcData } = await supabase
        .from("flashcards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const { data: reviewData } = await supabase
        .from("flashcard_reviews")
        .select("*")
        .eq("user_id", user.id);

      const reviewMap = new Map(
        (reviewData || []).map((r: any) => [r.flashcard_id, r])
      );

      const merged: Flashcard[] = (fcData || []).map((fc: any) => {
        const review = reviewMap.get(fc.id);
        return {
          id: fc.id,
          front_lari: fc.front_lari,
          front_mandombe: fc.front_mandombe,
          front_french: fc.front_french,
          front_english: fc.front_english,
          front_portuguese: fc.front_portuguese,
          deck_name: fc.deck_name,
          created_at: fc.created_at,
          ease_factor: review?.ease_factor ?? 2.5,
          interval_days: review?.interval_days ?? 0,
          repetitions: review?.repetitions ?? 0,
          next_review_at: review?.next_review_at ?? fc.created_at,
          last_reviewed_at: review?.last_reviewed_at ?? null,
        };
      });

      // Sync local cards to cloud if any exist
      const localCards = getLocalFlashcards();
      if (localCards.length > 0) {
        for (const lc of localCards) {
          const { data: inserted } = await supabase
            .from("flashcards")
            .insert({
              user_id: user.id,
              front_lari: lc.front_lari,
              front_mandombe: lc.front_mandombe,
              front_french: lc.front_french,
              front_english: lc.front_english,
              front_portuguese: lc.front_portuguese,
              deck_name: lc.deck_name,
            })
            .select()
            .single();

          if (inserted) {
            await supabase.from("flashcard_reviews").upsert({
              user_id: user.id,
              flashcard_id: inserted.id,
              ease_factor: lc.ease_factor,
              interval_days: lc.interval_days,
              repetitions: lc.repetitions,
              next_review_at: lc.next_review_at,
              last_reviewed_at: lc.last_reviewed_at,
            });

            merged.push({
              ...inserted,
              ease_factor: lc.ease_factor,
              interval_days: lc.interval_days,
              repetitions: lc.repetitions,
              next_review_at: lc.next_review_at,
              last_reviewed_at: lc.last_reviewed_at,
            });
          }
        }
        saveLocalFlashcards([]);
      }

      setCards(merged);
    } else {
      // Local only
      setCards(getLocalFlashcards());
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addCard = useCallback(
    async (card: {
      front_lari: string;
      front_mandombe: string;
      front_french: string;
      front_english: string;
      front_portuguese: string;
      deck_name: string;
    }) => {
      if (user) {
        const { data } = await supabase
          .from("flashcards")
          .insert({ ...card, user_id: user.id })
          .select()
          .single();

        if (data) {
          await supabase.from("flashcard_reviews").insert({
            user_id: user.id,
            flashcard_id: data.id,
          });

          const newCard: Flashcard = {
            ...data,
            ease_factor: 2.5,
            interval_days: 0,
            repetitions: 0,
            next_review_at: data.created_at,
            last_reviewed_at: null,
          };
          setCards((prev) => [newCard, ...prev]);
        }
      } else {
        const newCard = addLocalFlashcard(card);
        setCards((prev) => [newCard, ...prev]);
      }
    },
    [user]
  );

  const removeCard = useCallback(
    async (id: string) => {
      if (user) {
        await supabase.from("flashcards").delete().eq("id", id);
      } else {
        deleteLocalFlashcard(id);
      }
      setCards((prev) => prev.filter((c) => c.id !== id));
    },
    [user]
  );

  const reviewCard = useCallback(
    async (id: string, quality: SRSRating) => {
      const card = cards.find((c) => c.id === id);
      if (!card) return;

      const result = computeNextReview(
        {
          easeFactor: card.ease_factor,
          intervalDays: card.interval_days,
          repetitions: card.repetitions,
          nextReviewAt: new Date(card.next_review_at),
        },
        quality
      );

      if (user) {
        await supabase.from("flashcard_reviews").upsert({
          user_id: user.id,
          flashcard_id: id,
          ease_factor: result.easeFactor,
          interval_days: result.intervalDays,
          repetitions: result.repetitions,
          next_review_at: result.nextReviewAt.toISOString(),
          last_reviewed_at: new Date().toISOString(),
        });
      } else {
        reviewLocalFlashcard(id, quality);
      }

      setCards((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ease_factor: result.easeFactor,
                interval_days: result.intervalDays,
                repetitions: result.repetitions,
                next_review_at: result.nextReviewAt.toISOString(),
                last_reviewed_at: new Date().toISOString(),
              }
            : c
        )
      );
    },
    [user, cards]
  );

  const dueCards = cards.filter(
    (c) => new Date(c.next_review_at) <= new Date()
  );

  return { cards, dueCards, loading, addCard, removeCard, reviewCard, refetch: fetchCards };
}
