import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useFlashcards, type Flashcard } from "@/hooks/useFlashcards";
import type { SRSRating } from "@/lib/srs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Trash2, RotateCcw, Brain, Layers, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type View = "decks" | "review" | "create" | "browse";

const Flashcards = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cards, dueCards, loading, addCard, removeCard, reviewCard } = useFlashcards();
  const [view, setView] = useState<View>("decks");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // Create form
  const [form, setForm] = useState({
    front_lari: "",
    front_mandombe: "",
    front_french: "",
    front_english: "",
    front_portuguese: "",
    deck_name: "default",
  });

  const handleCreate = async () => {
    if (!form.front_lari.trim()) return;
    await addCard(form);
    setForm({ front_lari: "", front_mandombe: "", front_french: "", front_english: "", front_portuguese: "", deck_name: "default" });
    setCreateOpen(false);
  };

  const handleRate = async (quality: SRSRating) => {
    const card = dueCards[reviewIndex];
    if (!card) return;
    await reviewCard(card.id, quality);
    setShowBack(false);
    if (reviewIndex >= dueCards.length - 1) {
      setView("decks");
      setReviewIndex(0);
    } else {
      setReviewIndex((i) => i + 1);
    }
  };

  const currentCard = dueCards[reviewIndex];

  const decks = Array.from(new Set(cards.map((c) => c.deck_name)));
  const totalDue = dueCards.length;

  const ratingButtons: { label: Record<string, string>; quality: SRSRating; color: string }[] = [
    { label: { fr: "À revoir", en: "Again", pt: "Rever" }, quality: 0, color: "bg-destructive text-destructive-foreground" },
    { label: { fr: "Difficile", en: "Hard", pt: "Difícil" }, quality: 1, color: "bg-orange-500 text-white" },
    { label: { fr: "Bien", en: "Good", pt: "Bem" }, quality: 2, color: "bg-emerald-600 text-white" },
    { label: { fr: "Facile", en: "Easy", pt: "Fácil" }, quality: 3, color: "bg-sky-600 text-white" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-1">
              {t("flashcards.eyebrow")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              {t("flashcards.title")}
            </h1>
            <p className="text-muted-foreground mt-2">{t("flashcards.subtitle")}</p>
          </div>
        </div>

        {!user && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6 text-sm text-muted-foreground">
            {t("flashcards.localWarning")}
          </div>
        )}

        {/* Main views */}
        {view === "decks" && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Layers className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{cards.length}</p>
                <p className="text-xs text-muted-foreground">{t("flashcards.totalCards")}</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Brain className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-foreground">{totalDue}</p>
                <p className="text-xs text-muted-foreground">{t("flashcards.dueToday")}</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
                <p className="text-2xl font-bold text-foreground">
                  {cards.filter((c) => c.repetitions > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">{t("flashcards.learned")}</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Plus className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">
                  {cards.filter((c) => c.repetitions === 0).length}
                </p>
                <p className="text-xs text-muted-foreground">{t("flashcards.newCards")}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  setReviewIndex(0);
                  setShowBack(false);
                  setView("review");
                }}
                disabled={totalDue === 0}
                className="gap-2"
              >
                <Brain className="w-4 h-4" />
                {t("flashcards.startReview")} ({totalDue})
              </Button>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    {t("flashcards.createCard")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t("flashcards.createCard")}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 mt-2">
                    <div>
                      <label className="text-sm font-medium text-foreground">Lari *</label>
                      <Input
                        value={form.front_lari}
                        onChange={(e) => setForm((f) => ({ ...f, front_lari: e.target.value }))}
                        placeholder="Ex: Mbote"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Mandombe</label>
                      <Input
                        value={form.front_mandombe}
                        onChange={(e) => setForm((f) => ({ ...f, front_mandombe: e.target.value }))}
                        placeholder="Ex: Mbote"
                        className="font-mandombe"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Français</label>
                      <Input
                        value={form.front_french}
                        onChange={(e) => setForm((f) => ({ ...f, front_french: e.target.value }))}
                        placeholder="Ex: Bonjour"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">English</label>
                      <Input
                        value={form.front_english}
                        onChange={(e) => setForm((f) => ({ ...f, front_english: e.target.value }))}
                        placeholder="Ex: Hello"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Português</label>
                      <Input
                        value={form.front_portuguese}
                        onChange={(e) => setForm((f) => ({ ...f, front_portuguese: e.target.value }))}
                        placeholder="Ex: Olá"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">{t("flashcards.deck")}</label>
                      <Input
                        value={form.deck_name}
                        onChange={(e) => setForm((f) => ({ ...f, deck_name: e.target.value }))}
                        placeholder="default"
                      />
                    </div>
                    <Button onClick={handleCreate} className="w-full" disabled={!form.front_lari.trim()}>
                      {t("flashcards.add")}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={() => setView("browse")} className="gap-2">
                <Layers className="w-4 h-4" />
                {t("flashcards.browse")}
              </Button>
            </div>
          </div>
        )}

        {/* Review mode */}
        {view === "review" && currentCard && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setView("decks")} className="gap-1 mb-2">
              <ChevronLeft className="w-4 h-4" />
              {t("flashcards.backToDecks")}
            </Button>

            <div className="text-center text-sm text-muted-foreground mb-2">
              {reviewIndex + 1} / {dueCards.length}
            </div>

            {/* Card */}
            <div
              className="bg-card border border-border rounded-2xl p-8 md:p-12 min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setShowBack(true)}
            >
              {!showBack ? (
                <div className="text-center space-y-3">
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {currentCard.front_lari}
                  </p>
                  {currentCard.front_mandombe && (
                    <p className="font-mandombe text-2xl text-primary">
                      {currentCard.front_mandombe}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-6">
                    {t("flashcards.tapToReveal")}
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <p className="font-display text-2xl font-bold text-foreground mb-2">
                    {currentCard.front_lari}
                  </p>
                  {currentCard.front_mandombe && (
                    <p className="font-mandombe text-xl text-primary">
                      {currentCard.front_mandombe}
                    </p>
                  )}
                  <div className="border-t border-border pt-4 space-y-2">
                    {currentCard.front_french && (
                      <p className="text-lg text-foreground">🇫🇷 {currentCard.front_french}</p>
                    )}
                    {currentCard.front_english && (
                      <p className="text-lg text-foreground">🇬🇧 {currentCard.front_english}</p>
                    )}
                    {currentCard.front_portuguese && (
                      <p className="text-lg text-foreground">🇵🇹 {currentCard.front_portuguese}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Rating buttons */}
            {showBack && (
              <div className="flex flex-wrap justify-center gap-3">
                {ratingButtons.map((btn) => (
                  <button
                    key={btn.quality}
                    onClick={() => handleRate(btn.quality)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-105 ${btn.color}`}
                  >
                    {btn.label[useLanguage().language] || btn.label.en}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Review complete */}
        {view === "review" && !currentCard && (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              {t("flashcards.allDone")}
            </h2>
            <p className="text-muted-foreground">{t("flashcards.comeBack")}</p>
            <Button onClick={() => setView("decks")}>{t("flashcards.backToDecks")}</Button>
          </div>
        )}

        {/* Browse cards */}
        {view === "browse" && (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setView("decks")} className="gap-1 mb-2">
              <ChevronLeft className="w-4 h-4" />
              {t("flashcards.backToDecks")}
            </Button>

            {cards.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t("flashcards.noCards")}</p>
            ) : (
              <div className="grid gap-3">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-card border border-border rounded-xl p-4 flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-foreground text-lg truncate">
                        {card.front_lari}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {card.front_french || card.front_english || card.front_portuguese}
                      </p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>📦 {card.deck_name}</span>
                        <span>
                          🔄 {card.repetitions}x
                        </span>
                        <span>
                          📅 {new Date(card.next_review_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Flashcards;
