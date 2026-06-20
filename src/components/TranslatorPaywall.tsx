import { Crown, Infinity, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TranslatorPaywallProps {
  variant?: "full" | "inline";
  reason?: "quota" | "auth";
}

/**
 * Shown when a non-premium / non-lifetime user has used all 11 free translations,
 * or when an unauthenticated user tries to use the translator/dictionary.
 */
const TranslatorPaywall = ({ variant = "full", reason = "quota" }: TranslatorPaywallProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goLifetime = async () => {
    if (!user) {
      navigate("/auth?next=/translator");
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("create-lifetime-checkout");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la création du paiement");
    }
  };

  const goPremium = async () => {
    if (!user) {
      navigate("/auth?next=/translator");
      return;
    }
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors de la création du paiement");
    }
  };

  const padding = variant === "inline" ? "p-6" : "p-10";

  return (
    <div className={`relative rounded-2xl border border-gold/30 bg-gradient-to-br from-earth-deep to-earth-deep/90 ${padding} text-center`}>
      <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
        {reason === "auth" ? <Lock className="w-7 h-7 text-gold" /> : <Crown className="w-7 h-7 text-gold" />}
      </div>
      <h3 className="font-display text-2xl font-bold text-cream mb-2">
        {reason === "auth"
          ? "Connectez-vous pour utiliser le traducteur"
          : "Vous avez utilisé vos 11 traductions gratuites"}
      </h3>
      <p className="text-cream/70 max-w-md mx-auto mb-6">
        {reason === "auth"
          ? "Créez un compte gratuit pour bénéficier de 11 traductions offertes, puis débloquez l'accès illimité."
          : "Débloquez le traducteur et le dictionnaire à vie pour 19,99 $, ou passez à Premium pour tout débloquer."}
      </p>

      <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
        <button
          onClick={goLifetime}
          className="flex flex-col items-center justify-center gap-1 bg-gold hover:bg-gold/90 text-earth-deep px-5 py-4 rounded-xl font-bold transition-colors"
        >
          <span className="flex items-center gap-2">
            <Infinity className="w-5 h-5" /> Accès à vie — 19,99 $
          </span>
          <span className="text-xs font-medium opacity-80">
            Traducteur + Dictionnaire pour toujours
          </span>
        </button>
        <button
          onClick={goPremium}
          className="flex flex-col items-center justify-center gap-1 border border-gold/50 text-cream hover:bg-gold/10 px-5 py-4 rounded-xl font-bold transition-colors"
        >
          <span className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-gold" /> Premium — 9,99 $/mois
          </span>
          <span className="text-xs font-medium opacity-80">
            Tout le contenu du site
          </span>
        </button>
      </div>

      {!user && (
        <p className="mt-5 text-xs text-cream/50">
          Vous serez invité à vous connecter avant le paiement.
        </p>
      )}
    </div>
  );
};

export default TranslatorPaywall;
