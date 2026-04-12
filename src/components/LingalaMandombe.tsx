import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";
import { preprocessForMandombe } from "@/lib/lari-phonetic-engine";

interface LingalaMandombeProps {
  frenchText: string;
  className?: string;
}

const stripAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const LingalaMandombe = ({ frenchText, className = "" }: LingalaMandombeProps) => {
  const { language } = useLanguage();
  const { getTranslation, isDynamic } = useTranslatedContent();

  if (language !== "ln" || !isDynamic) return null;

  const lingalaText = getTranslation(frenchText);
  if (!lingalaText || lingalaText === frenchText) return null;

  const mandombeText = preprocessForMandombe(stripAccents(lingalaText));

  return (
    <p className={`font-mandombe text-2xl text-gold/80 ${className}`}>
      🇨🇩 {mandombeText}
    </p>
  );
};

export default LingalaMandombe;
