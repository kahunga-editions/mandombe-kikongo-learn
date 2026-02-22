const Footer = () => {
  return (
    <footer className="bg-earth-deep border-t border-gold/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-gold mb-3">
              Nzo Mikanda
            </h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              The House of Knowledge — preserving and teaching Kikongo Lari
              and the Mandombe script for the Kongo diaspora and the world.
            </p>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-cream/80 uppercase tracking-wider mb-3">
              Learn
            </h4>
            <ul className="space-y-2">
              <li><a href="#vocabulary" className="text-cream/50 hover:text-gold text-sm transition-colors">Vocabulary</a></li>
              <li><a href="#stories" className="text-cream/50 hover:text-gold text-sm transition-colors">Stories</a></li>
              <li><a href="#kilolaka" className="text-cream/50 hover:text-gold text-sm transition-colors">Kilolaka</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-cream/80 uppercase tracking-wider mb-3">
              Languages
            </h4>
            <ul className="space-y-2">
              <li className="text-cream/50 text-sm">English</li>
              <li className="text-cream/50 text-sm">Français</li>
              <li className="text-cream/50 text-sm">Português</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-6 text-center">
          <p className="text-cream/40 text-sm">
            © {new Date().getFullYear()} Nzo Mikanda. Honoring ancestral knowledge.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
