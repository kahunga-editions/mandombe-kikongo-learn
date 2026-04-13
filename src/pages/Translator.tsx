import { useState, useCallback } from "react";
import { ArrowRightLeft, Languages, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MandombeSpeaker from "@/components/MandombeSpeaker";
import { useLanguage } from "@/contexts/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SourceLang = "fr" | "en" | "pt" | "es" | "it" | "ln" | "el" | "ko" | "de" | "lari";

interface TranslationResult {
  translation: string;
  mandombe: string;
  ipa: string;
  notes: string;
}

const langLabels: Record<SourceLang, string> = {
  fr: "Français",
  en: "English",
  pt: "Português",
  es: "Español",
  it: "Italiano",
  ln: "Lingála",
  el: "Ελληνικά",
  ko: "한국어",
  de: "Deutsch",
  lari: "Kikongo Lari",
};

const Translator = () => {
  const { t } = useLanguage();
  const [sourceLang, setSourceLang] = useState<SourceLang>("fr");
  const [targetLang, setTargetLang] = useState<SourceLang>("lari");
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"source" | "target" | null>(null);

  const copyToClipboard = useCallback(async (text: string, side: "source" | "target") => {
    await navigator.clipboard.writeText(text);
    setCopied(side);
    toast.success(t("translator.copied") || "Copié !");
    setTimeout(() => setCopied(null), 2000);
  }, [t]);

  const swap = useCallback(() => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result) {
      setInputText(result.translation);
      setResult(null);
    }
  }, [sourceLang, targetLang, result]);

  const translate = useCallback(async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    const direction = `${sourceLang}-to-${targetLang}`;
    const notesLang = sourceLang === "lari" ? targetLang : sourceLang;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-lari`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text: inputText.trim(), direction, notesLang }),
        }
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Erreur ${response.status}`);
      }

      const data: TranslationResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  }, [inputText, sourceLang, targetLang]);

  const targetIsLari = targetLang === "lari";
  const lariText = targetIsLari ? result?.translation : inputText;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-primary font-medium text-sm tracking-widest uppercase mb-2">
              {t("translator.eyebrow")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t("translator.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("translator.subtitle")}
            </p>
          </div>

          {/* Language selector bar */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Select value={sourceLang} onValueChange={(v) => setSourceLang(v as SourceLang)}>
              <SelectTrigger className="w-[160px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(langLabels) as SourceLang[])
                  .filter((l) => l !== targetLang)
                  .map((l) => (
                    <SelectItem key={l} value={l}>{langLabels[l]}</SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={swap}
              className="rounded-full border border-border hover:bg-accent"
              aria-label="Swap languages"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>

            <Select value={targetLang} onValueChange={(v) => setTargetLang(v as SourceLang)}>
              <SelectTrigger className="w-[160px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(langLabels) as SourceLang[])
                  .filter((l) => l !== sourceLang)
                  .map((l) => (
                    <SelectItem key={l} value={l}>{langLabels[l]}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Translation panels */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Input panel */}
            <div className="bg-card rounded-xl border border-border p-5 flex flex-col">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {langLabels[sourceLang]}
              </p>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t("translator.placeholder")}
                className="flex-1 min-h-[180px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-foreground text-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    translate();
                  }
                }}
              />
              <div className="flex justify-between items-center mt-3">
                {inputText.trim() && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(inputText, "source")}
                    className="h-8 w-8"
                    aria-label="Copy source text"
                  >
                    {copied === "source" ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
                <div className="ml-auto">
                  <Button
                    onClick={translate}
                    disabled={isLoading || !inputText.trim()}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Languages className="w-4 h-4" />
                    )}
                    {t("translator.translate")}
                  </Button>
                </div>
              </div>
            </div>

            {/* Result panel */}
            <div className="bg-card rounded-xl border border-border p-5 flex flex-col">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {langLabels[targetLang]}
              </p>

              {error && (
                <div className="flex items-start gap-2 text-destructive mb-3">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {isLoading && (
                <div className="flex-1 flex items-center justify-center min-h-[180px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}

              {result && !isLoading && (
                <div className="flex-1 min-h-[180px]">
                  {/* Translation text */}
                  <p className="text-lg text-foreground mb-4">{result.translation}</p>

                  {/* Mandombe rendering */}
                  {result.mandombe && (
                    <div className="flex items-center gap-2 mb-3">
                      <p className="font-mandombe text-3xl text-primary leading-relaxed">
                        {result.mandombe}
                      </p>
                      {lariText && <MandombeSpeaker lariText={lariText} />}
                    </div>
                  )}

                  {/* IPA */}
                  {result.ipa && (
                    <p className="text-sm font-mono text-muted-foreground mb-3">
                      /{result.ipa}/
                    </p>
                  )}

                  {/* Notes */}
                  {result.notes && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">ℹ </span>
                        {result.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!result && !isLoading && !error && (
                <div className="flex-1 flex items-center justify-center min-h-[180px] text-muted-foreground text-sm">
                  {t("translator.hint")}
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6 max-w-lg mx-auto">
            {t("translator.disclaimer")}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Translator;
