import { useState } from "react";
import { Globe, User, LogOut, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage, Language } from "@/contexts/LanguageContext";

const languages: { code: Language; label: string }[] = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "it", label: "Italiano" },
  { code: "ln", label: "Lingála" },
  { code: "el", label: "Ελληνικά" },
  { code: "ko", label: "한국어" },
  { code: "de", label: "Deutsch" },
];

const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isPremium, isAdmin, subscriptionEnd, signOut } = useAuth();
  const navigate = useNavigate();

  const handlePremiumClick = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (isPremium) {
      try {
        const { data, error } = await supabase.functions.invoke("customer-portal");
        if (error) throw error;
        if (data?.url) window.open(data.url, "_blank");
      } catch (err) {
        console.error("Portal error:", err);
      }
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-earth-deep/95 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <span className="font-mandombe text-3xl md:text-4xl text-gold leading-none mr-2">Nzo Mikanda</span>
          <span className="font-display text-lg font-bold text-cream/70 hidden sm:inline">Nzo Mikanda</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#learn" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.learn")}</a>
          <a href="/lessons" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.lessons")}</a>
          <a href="#vocabulary" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.vocabulary")}</a>
          <a href="/dictionary" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.dictionary")}</a>
          <a href="/flashcards" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.flashcards")}</a>
          <a href="/mandombe" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.mandombe")}</a>
          <a href="/translator" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.translator")}</a>
          <a href="/mbuta-matondo" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase flex items-center gap-1">👨‍🏫 {t("nav.mbuta")}</a>
          <a href="/mvita" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase flex items-center gap-1">⚔️ Mvita za Ndinga</a>
          
          <a href="#stories" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.stories")}</a>
          <a href="#kilolaka" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">{t("nav.kilolaka")}</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-cream/80 hover:text-gold transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              {languages.find((l) => l.code === language)?.label}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-earth-deep border border-gold/20 rounded-md shadow-lg py-1 min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === lang.code ? "text-gold bg-gold/10" : "text-cream/70 hover:text-gold hover:bg-gold/5"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <>
                  <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full font-semibold">Admin</span>
                  <a href="/admin/corrections" className="text-xs text-gold/70 hover:text-gold transition-colors font-medium">Corrections</a>
                </>
              )}
              {!(isAdmin && !isPremium) && !(isAdmin && isPremium && !subscriptionEnd) ? (
                <button
                  onClick={handlePremiumClick}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    isPremium
                      ? "bg-gold/20 text-gold hover:bg-gold/30"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  {isPremium ? t("nav.managePlan") : t("nav.goPremium")}
                </button>
              ) : null}
              <button
                onClick={signOut}
                className="text-cream/60 hover:text-cream transition-colors p-2"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/auth")}
                className="text-cream/80 hover:text-gold transition-colors text-sm font-medium flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                {t("nav.signIn")}
              </button>
              <button
                onClick={handlePremiumClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                {t("nav.goPremium")}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
