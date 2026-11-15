import PayPalPremiumButton from "@/components/PayPalPremiumButton";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface TranslatorPaywallProps {
  variant?: "full" | "inline";
  reason?: "quota" | "auth";
}

const TranslatorPaywall = ({ variant = "full", reason = "quota" }: TranslatorPaywallProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
          : "Un paiement unique de 37 € débloque le traducteur, le dictionnaire et tout le site à vie."}
      </p>

      {user ? (
        <PayPalPremiumButton />
      ) : (
        <Button
          onClick={() => navigate("/auth?next=/translator")}
          className="h-auto whitespace-normal bg-gold hover:bg-gold/90 text-earth-deep px-6 py-3 rounded-xl font-bold transition-colors"
        >
          Se connecter pour continuer
        </Button>
      )}
      <p className="mt-5 text-xs text-cream/50">Paiement unique, sans abonnement.</p>
    </div>
  );
};

export default TranslatorPaywall;
