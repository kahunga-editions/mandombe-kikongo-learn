import { useState } from "react";
import { FUNDING, PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { capturePayPalPremiumOrder, createPayPalPremiumOrder } from "@/lib/premiumBilling";

const clientId = import.meta.env.VITE_LOVABLE_CONNECTOR_PAYPAL_CLIENT_ID;

const PayPalPremiumButton = () => {
  const { checkSubscription } = useAuth();
  const [processing, setProcessing] = useState(false);

  if (!clientId) {
    return (
      <p role="alert" className="text-sm text-cream/80 text-center">
        Le paiement PayPal est momentanément indisponible. Réessayez dans quelques instants.
      </p>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <PayPalScriptProvider options={{ clientId, currency: "EUR", intent: "capture", components: "buttons" }}>
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          disabled={processing}
          style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal", height: 48 }}
          createOrder={async () => {
            setProcessing(true);
            try {
              return await createPayPalPremiumOrder();
            } catch (error) {
              setProcessing(false);
              throw error;
            }
          }}
          onApprove={async (data) => {
            try {
              const result = await capturePayPalPremiumOrder(data.orderID);
              if (!result.verified) {
                toast.info("PayPal confirme encore votre paiement. Votre accès sera activé après confirmation.");
                return;
              }
              await checkSubscription();
              toast.success("Paiement confirmé : votre accès Premium à vie est actif.");
            } catch (error) {
              console.error("PayPal capture failed:", error);
              toast.error(error instanceof Error ? error.message : "Le paiement n'a pas pu être confirmé.");
            } finally {
              setProcessing(false);
            }
          }}
          onCancel={() => {
            setProcessing(false);
            toast.info("Paiement annulé. Aucun accès n'a été débloqué.");
          }}
          onError={(error) => {
            setProcessing(false);
            console.error("PayPal button failed:", error);
            toast.error("Le paiement PayPal n'a pas abouti. Réessayez.");
          }}
        />
      </PayPalScriptProvider>
      <p aria-live="polite" className="mt-3 text-center text-sm text-cream/60">
        {processing ? "Confirmation du paiement en cours…" : "Paiement unique de 37 € • accès à vie • sans abonnement"}
      </p>
    </div>
  );
};

export default PayPalPremiumButton;
