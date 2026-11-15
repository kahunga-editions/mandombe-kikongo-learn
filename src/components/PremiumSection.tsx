import { openPremiumBilling } from "@/lib/premiumBilling";
import PayPalPremiumButton from "@/components/PayPalPremiumButton";
import { Button } from "@/components/ui/button";
import { Crown, BookOpen, Headphones, ScrollText, Infinity as InfinityIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const features = [
  { icon: BookOpen, label: "Toutes les leçons et tout le vocabulaire" },
  { icon: ScrollText, label: "Tous les contes bilingues" },
  { icon: Headphones, label: "Les prononciations audio" },
  { icon: Crown, label: "Tous les modules Kilolaka" },
];

const PremiumSection = () => {
  const { user, isPremium, isAdmin, subscriptionEnd } = useAuth();
  const navigate = useNavigate();

  const manageSubscription = async () => {
    try {
      await openPremiumBilling("customer-portal");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "La gestion de l'abonnement est indisponible.");
    }
  };

  if (isPremium) {
    const lifetime = !isAdmin && !subscriptionEnd;
    return (
      <section id="premium" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-12 text-center border border-gold/30">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isAdmin && !subscriptionEnd
                ? "Votre accès administrateur est actif"
                : lifetime
                  ? "Votre accès Premium à vie est actif"
                  : "Votre accès Premium est actif"}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
              {lifetime
                ? "Tous les contenus sont débloqués, sans date d'expiration."
                : "Vous avez accès à tous les contenus."}
            </p>
            {subscriptionEnd && (
              <Button
                onClick={manageSubscription}
                className="h-auto whitespace-normal bg-gold hover:bg-gold/90 text-earth-deep px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Gérer mon abonnement
              </Button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="premium" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-earth-deep to-earth-deep/90 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <InfinityIcon className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Débloquez tout Nzo mikanda à vie
            </h2>
            <p className="text-cream/70 max-w-lg mx-auto mb-6 text-lg">
              Un seul paiement de 37 €. Aucun abonnement, aucun renouvellement.
            </p>
            <p className="text-gold font-display text-4xl font-bold mb-10">37 €</p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3 text-left text-cream/80">
                  <f.icon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">{f.label}</span>
                </div>
              ))}
            </div>

            {user ? (
              <PayPalPremiumButton />
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="h-auto whitespace-normal bg-gold hover:bg-gold/90 text-earth-deep px-8 py-4 rounded-lg text-base font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5" /> Se connecter pour débloquer Premium — 37 €
              </Button>
            )}
            <p className="text-cream/50 text-sm mt-4">
              Votre accès est activé après confirmation du paiement PayPal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
