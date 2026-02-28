import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-x-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-earth-deep/70 via-earth-deep/50 to-earth-deep/90" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <p className="font-mandombe text-4xl md:text-6xl text-gold drop-shadow-lg animate-fade-in opacity-0 py-4" style={{ animationDelay: "0.1s", lineHeight: 2.2 }}>
          Nzo Mikanda
        </p>
        <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.15s" }} />
        <p className="text-gold font-body text-lg tracking-[0.3em] uppercase mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          Nzo Mikanda — The House of Knowledge
        </p>
        <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
          Discover the sacred language of the Kongo people through vocabulary,
          stories, and the ancestral art of Kilolaka — with translations in
          English, French, and Portuguese.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <a
            href="#learn"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors"
          >
            Start Learning
          </a>
          <a
            href="#vocabulary"
            className="border-2 border-gold/50 hover:border-gold text-gold px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors hover:bg-gold/10"
          >
            Explore Vocabulary
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
