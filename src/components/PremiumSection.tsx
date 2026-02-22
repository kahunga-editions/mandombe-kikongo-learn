import { Crown, BookOpen, Headphones, ScrollText } from "lucide-react";

const features = [
  { icon: BookOpen, label: "Full vocabulary with 500+ words" },
  { icon: ScrollText, label: "Complete bilingual stories" },
  { icon: Headphones, label: "Audio pronunciations" },
  { icon: Crown, label: "Advanced Kilolaka modules" },
];

const PremiumSection = () => {
  return (
    <section id="premium" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-earth-deep to-earth-deep/90 rounded-2xl p-12 text-center relative overflow-hidden">
          {/* decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Unlock the Full Experience
            </h2>
            <p className="text-cream/70 max-w-lg mx-auto mb-10 text-lg">
              Get unlimited access to all lessons, stories, audio, and the complete
              Kilolaka cosmological guide.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 text-left text-cream/80"
                >
                  <f.icon className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-sm">{f.label}</span>
                </div>
              ))}
            </div>

            <button className="bg-gold hover:bg-gold/90 text-earth-deep px-10 py-4 rounded-lg text-lg font-bold transition-colors">
              Coming Soon — Join the Waitlist
            </button>
            <p className="text-cream/50 text-sm mt-4">
              Be the first to know when premium launches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
