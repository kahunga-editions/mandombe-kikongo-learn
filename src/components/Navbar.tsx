import { useState } from "react";
import { Globe, User, LogOut, Crown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
];

const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const { user, isPremium, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handlePremiumClick = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (isPremium) {
      // Open customer portal
      try {
        const { data, error } = await supabase.functions.invoke("customer-portal");
        if (error) throw error;
        if (data?.url) window.open(data.url, "_blank");
      } catch (err) {
        console.error("Portal error:", err);
      }
      return;
    }
    // Go to checkout
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
          <span className="font-mandombe text-2xl text-gold leading-none mr-1">Nzo Mikanda</span>
          <span className="font-display text-lg font-bold text-cream/70 hidden sm:inline">Nzo Mikanda</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#learn" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">Learn</a>
          <a href="/lessons" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">Lessons</a>
          <a href="#vocabulary" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">Vocabulary</a>
          <a href="#stories" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">Stories</a>
          <a href="#kilolaka" className="text-cream/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase">Kilolaka</a>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-cream/80 hover:text-gold transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              {languages.find((l) => l.code === currentLang)?.label}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-earth-deep border border-gold/20 rounded-md shadow-lg py-1 min-w-[140px]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setCurrentLang(lang.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      currentLang === lang.code ? "text-gold bg-gold/10" : "text-cream/70 hover:text-gold hover:bg-gold/5"
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
                <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full font-semibold">Admin</span>
              )}
              <button
                onClick={handlePremiumClick}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isPremium
                    ? "bg-gold/20 text-gold hover:bg-gold/30"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground"
                }`}
              >
                <Crown className="w-4 h-4" />
                {isPremium ? "Manage Plan" : "Go Premium"}
              </button>
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
                Sign In
              </button>
              <button
                onClick={handlePremiumClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                Go Premium
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
