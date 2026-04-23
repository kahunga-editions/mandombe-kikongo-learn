import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie-consent-v1";
const CLARITY_PROJECT_ID = "wgdu8yeaw5";

type Consent = "accepted" | "declined" | null;

export const getConsent = (): Consent => {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "accepted" || v === "declined" ? v : null;
};

const loadClarity = () => {
  if (typeof window === "undefined") return;
  if ((window as any).clarity) return;
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = "https://www.clarity.ms/tag/" + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c === null) {
      setVisible(true);
    } else if (c === "accepted") {
      loadClarity();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    loadClarity();
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[100] bg-earth-deep border border-gold/30 rounded-xl shadow-2xl p-5"
    >
      <button
        onClick={decline}
        aria-label="Fermer"
        className="absolute top-2 right-2 text-cream/50 hover:text-cream transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      <h2 className="font-display text-lg text-gold mb-2">🍪 Cookies & confidentialité</h2>
      <p className="text-sm text-cream/80 leading-relaxed mb-4">
        Nous utilisons <strong>Microsoft Clarity</strong> pour analyser anonymement les sessions
        (replays, heatmaps) et améliorer Nzo Mikanda. Aucune donnée personnelle n'est vendue.
        {" "}
        <a href="/privacy" className="text-gold underline hover:text-gold/80">
          En savoir plus
        </a>
        .
      </p>
      <div className="flex gap-2">
        <Button onClick={accept} className="flex-1 bg-gold text-earth-deep hover:bg-gold/90">
          Accepter
        </Button>
        <Button onClick={decline} variant="outline" className="flex-1 border-gold/30 text-cream hover:bg-gold/10">
          Refuser
        </Button>
      </div>
    </div>
  );
};
