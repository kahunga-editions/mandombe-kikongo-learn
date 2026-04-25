import Navbar from "@/components/Navbar";
import MbutaMatondoChat from "@/components/MbutaMatondoChat";
import { useLanguage } from "@/contexts/LanguageContext";

const MbutaMatondo = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-earth-deep text-cream">
      <Navbar />
      <main className="pt-20 pb-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="text-left">
            <p className="text-gold/70 text-xs uppercase tracking-widest mb-0.5">
              {t("mbuta.eyebrow")}
            </p>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-cream">
              {t("mbuta.title")}
            </h1>
            <p className="text-cream/50 text-sm">{t("mbuta.subtitle")}</p>
          </div>
        </div>
        <MbutaMatondoChat />
      </main>
    </div>
  );
};

export default MbutaMatondo;
