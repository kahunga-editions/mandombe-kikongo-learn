import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslatedContent } from "@/hooks/useTranslatedContent";

interface LingalaMandombeProps {
  frenchText: string;
  className?: string;
}

/**
 * Renders the Lingala translation of a French text in Mandombe script.
 * Only visible when language is set to "ln" (Lingála).
 */
const stripAccents = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const LingalaMandombe = ({ frenchText, className = "" }: LingalaMandombeProps) => {
  const { language } = useLanguage();
  const { getTranslation, isDynamic } = useTranslatedContent();

  if (language !== "ln" || !isDynamic) return null;

  const lingalaText = getTranslation(frenchText);
  if (!lingalaText || lingalaText === frenchText) return null;

  return (
    <p className={`font-mandombe text-2xl text-gold/80 ${className}`}>
      🇨🇩 {stripAccents(lingalaText)}
    </p>
  );
};

export default LingalaMandombe;
