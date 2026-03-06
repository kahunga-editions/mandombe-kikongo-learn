import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-earth-deep border-t border-gold/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-gold mb-3">
              Nzo Mikanda
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-cream/80 uppercase tracking-wider mb-3">
              {t("footer.learnTitle")}
            </h4>
            <ul className="space-y-2">
              <li><a href="#vocabulary" className="text-cream/50 hover:text-gold text-sm transition-colors">{t("nav.vocabulary")}</a></li>
              <li><a href="#stories" className="text-cream/50 hover:text-gold text-sm transition-colors">{t("nav.stories")}</a></li>
              <li><a href="#kilolaka" className="text-cream/50 hover:text-gold text-sm transition-colors">{t("nav.kilolaka")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-cream/80 uppercase tracking-wider mb-3">
              {t("footer.languagesTitle")}
            </h4>
            <ul className="space-y-2">
              <li className="text-cream/50 text-sm">Français</li>
              <li className="text-cream/50 text-sm">English</li>
              <li className="text-cream/50 text-sm">Português</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-6 text-center">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Nzo Mikanda. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
