import { openPremiumBilling } from "@/lib/premiumBilling";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ReactNode } from "react";

interface PremiumGateProps {
  children: ReactNode;
  label?: string;
}

const PremiumGate = ({ children, label = "Premium Content" }: PremiumGateProps) => {
  const { user, isPremium, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <>{children}</>;

  if (isPremium) return <>{children}</>;

  const handleClick = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    // User is logged in but not premium → checkout
    try {
      await openPremiumBilling("create-checkout");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Le paiement est indisponible.");
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none blur-sm opacity-50">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-earth-deep/60 backdrop-blur-sm rounded-xl">
        <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center mb-4">
          <Lock className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-display text-xl font-bold text-cream mb-2">{label}</h3>
        <p className="text-cream/70 text-sm mb-4 max-w-xs text-center">
          {user ? "Upgrade to Premium to unlock this content" : "Sign in and go Premium to unlock"}
        </p>
        <Button
          onClick={handleClick}
          className="pointer-events-auto bg-gold hover:bg-gold/90 text-earth-deep px-6 py-2.5 rounded-lg font-bold transition-colors"
        >
          {user ? "Go Premium — $9.99/mo" : "Sign In to Unlock"}
        </Button>
      </div>
    </div>
  );
};

export default PremiumGate;
