import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  enabled: boolean;
  onToggle: (val: boolean) => void;
}

const LariLingalaToggle = ({ enabled, onToggle }: Props) => {
  const { language } = useLanguage();

  if (language !== "ln") return null;

  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
        enabled
          ? "bg-primary/10 border-primary text-primary"
          : "bg-card border-border text-muted-foreground hover:border-primary/40"
      }`}
    >
      <span>🇨🇬 Lari ↔ Lingala 🇨🇩</span>
      <span className="font-mandombe text-lg text-gold">Mandombe</span>
    </button>
  );
};

export default LariLingalaToggle;
