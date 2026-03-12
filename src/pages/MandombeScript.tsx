import { useState } from "react";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlyphTracingCanvas from "@/components/GlyphTracingCanvas";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Mandombe syllabary organized by consonant groups
// Each entry: [latin text for font rendering, display label, example word from dictionary, meaning key]
const vowels = [
  { glyph: "a", label: "A", example: "Ayi", meaning: "Non / No" },
  { glyph: "e", label: "E", example: "Eyi", meaning: "Oui / Yes" },
  { glyph: "i", label: "I", example: "Inga", meaning: "Oui / Yes" },
  { glyph: "o", label: "O", example: "Okele", meaning: "Bien / Well" },
  { glyph: "u", label: "U", example: "Usika", meaning: "Arriver / To arrive" },
];

const consonantGroups = [
  {
    name: "B",
    syllables: [
      { glyph: "ba", label: "BA", example: "Baka", meaning: "Obtenir / To obtain" },
      { glyph: "be", label: "BE", example: "Beto", meaning: "Nous / We" },
      { glyph: "bi", label: "BI", example: "Bidia", meaning: "Nourriture / Food" },
      { glyph: "bo", label: "BO", example: "Bote", meaning: "Beau / Beautiful" },
      { glyph: "bu", label: "BU", example: "Buka", meaning: "Frapper / To hit" },
    ],
  },
  {
    name: "D",
    syllables: [
      { glyph: "da", label: "DA", example: "Dama", meaning: "Damer / To pack down" },
      { glyph: "de", label: "DE", example: "Deka", meaning: "S'agripper / To grip" },
      { glyph: "di", label: "DI", example: "Dia", meaning: "Manger / To eat" },
      { glyph: "do", label: "DO", example: "Doko", meaning: "Souiller / To soil" },
      { glyph: "du", label: "DU", example: "Duka", meaning: "Être triste / To be sad" },
    ],
  },
  {
    name: "F",
    syllables: [
      { glyph: "fa", label: "FA", example: "Fula", meaning: "Souffler / To blow" },
      { glyph: "fe", label: "FE", example: "Fela", meaning: "Faucher / To mow" },
      { glyph: "fi", label: "FI", example: "Fia", meaning: "Cacher / To hide" },
      { glyph: "fo", label: "FO", example: "Foka", meaning: "Forer / To drill" },
      { glyph: "fu", label: "FU", example: "Fula", meaning: "Souffler / To blow" },
    ],
  },
  {
    name: "G",
    syllables: [
      { glyph: "ga", label: "GA", example: "Gata", meaning: "S'ancrer / To anchor" },
      { glyph: "ge", label: "GE", example: "Genga", meaning: "Flotter / To float" },
      { glyph: "gi", label: "GI", example: "Gita", meaning: "Être lourd / To be heavy" },
      { glyph: "go", label: "GO", example: "Goma", meaning: "Clou / Nail" },
      { glyph: "gu", label: "GU", example: "Guba", meaning: "Engendrer / To beget" },
    ],
  },
  {
    name: "K",
    syllables: [
      { glyph: "ka", label: "KA", example: "Kanga", meaning: "Fermer / To close" },
      { glyph: "ke", label: "KE", example: "Kele", meaning: "Être / To be" },
      { glyph: "ki", label: "KI", example: "Kiese", meaning: "Joie / Joy" },
      { glyph: "ko", label: "KO", example: "Kota", meaning: "Entrer / To enter" },
      { glyph: "ku", label: "KU", example: "Kuba", meaning: "Frapper / To hit" },
    ],
  },
  {
    name: "L",
    syllables: [
      { glyph: "la", label: "LA", example: "Lamba", meaning: "Cuisiner / To cook" },
      { glyph: "le", label: "LE", example: "Leka", meaning: "Dormir / To sleep" },
      { glyph: "li", label: "LI", example: "Linga", meaning: "Aimer / To love" },
      { glyph: "lo", label: "LO", example: "Longa", meaning: "Enseigner / To teach" },
      { glyph: "lu", label: "LU", example: "Lumbu", meaning: "Jour / Day" },
    ],
  },
  {
    name: "M",
    syllables: [
      { glyph: "ma", label: "MA", example: "Mama", meaning: "Maman / Mother" },
      { glyph: "me", label: "ME", example: "Meno", meaning: "Moi / Me" },
      { glyph: "mi", label: "MI", example: "Miso", meaning: "Yeux / Eyes" },
      { glyph: "mo", label: "MO", example: "Mono", meaning: "Moi / I" },
      { glyph: "mu", label: "MU", example: "Mutu", meaning: "Personne / Person" },
    ],
  },
  {
    name: "N",
    syllables: [
      { glyph: "na", label: "NA", example: "Nkumbu", meaning: "Nom / Name" },
      { glyph: "ne", label: "NE", example: "Nene", meaning: "Grand / Big" },
      { glyph: "ni", label: "NI", example: "Nitu", meaning: "Corps / Body" },
      { glyph: "no", label: "NO", example: "Ntoto", meaning: "Terre / Earth" },
      { glyph: "nu", label: "NU", example: "Nuni", meaning: "Oiseau / Bird" },
    ],
  },
  {
    name: "S",
    syllables: [
      { glyph: "sa", label: "SA", example: "Sala", meaning: "Travailler / To work" },
      { glyph: "se", label: "SE", example: "Seka", meaning: "Dormir / To sleep" },
      { glyph: "si", label: "SI", example: "Simba", meaning: "Tenir / To hold" },
      { glyph: "so", label: "SO", example: "Soba", meaning: "Laver / To wash" },
      { glyph: "su", label: "SU", example: "Sula", meaning: "Pardonner / To forgive" },
    ],
  },
  {
    name: "T",
    syllables: [
      { glyph: "ta", label: "TA", example: "Tata", meaning: "Papa / Father" },
      { glyph: "te", label: "TE", example: "Tela", meaning: "Créer / To create" },
      { glyph: "ti", label: "TI", example: "Tiya", meaning: "Feu / Fire" },
      { glyph: "to", label: "TO", example: "Tonda", meaning: "Aimer / To love" },
      { glyph: "tu", label: "TU", example: "Tuba", meaning: "Parler / To speak" },
    ],
  },
  {
    name: "V",
    syllables: [
      { glyph: "va", label: "VA", example: "Vana", meaning: "Donner / To give" },
      { glyph: "ve", label: "VE", example: "Vela", meaning: "Aiguiser / To sharpen" },
      { glyph: "vi", label: "VI", example: "Vioka", meaning: "Passer / To pass" },
      { glyph: "vo", label: "VO", example: "Vova", meaning: "Parler / To speak" },
      { glyph: "vu", label: "VU", example: "Vunda", meaning: "Dormir / To sleep" },
    ],
  },
  {
    name: "W",
    syllables: [
      { glyph: "wa", label: "WA", example: "Wonso", meaning: "Tout / All" },
      { glyph: "we", label: "WE", example: "Wele", meaning: "Briller / To shine" },
    ],
  },
  {
    name: "Y",
    syllables: [
      { glyph: "ya", label: "YA", example: "Yala", meaning: "Gouverner / To govern" },
      { glyph: "ye", label: "YE", example: "Yeka", meaning: "Apprendre / To learn" },
      { glyph: "yi", label: "YI", example: "Yimba", meaning: "Chanter / To sing" },
      { glyph: "yo", label: "YO", example: "Yoya", meaning: "Écouter / To listen" },
      { glyph: "yu", label: "YU", example: "Yuna", meaning: "Entendre / To hear" },
    ],
  },
  {
    name: "Z",
    syllables: [
      { glyph: "za", label: "ZA", example: "Zaba", meaning: "Savoir / To know" },
      { glyph: "ze", label: "ZE", example: "Zeba", meaning: "Voyager / To travel" },
      { glyph: "zi", label: "ZI", example: "Zinga", meaning: "Vivre / To live" },
      { glyph: "zo", label: "ZO", example: "Zonza", meaning: "Parler / To speak" },
      { glyph: "zu", label: "ZU", example: "Zulu", meaning: "Ciel / Sky" },
    ],
  },
];

const MandombeScript = () => {
  const { t } = useLanguage();
  const [activeGroup, setActiveGroup] = useState("vowels");
  const [selectedGlyph, setSelectedGlyph] = useState(vowels[0]);

  const currentSyllables = activeGroup === "vowels"
    ? vowels
    : consonantGroups.find((g) => g.name === activeGroup)?.syllables || [];

  const allGroups = ["vowels", ...consonantGroups.map((g) => g.name)];
  const currentGroupIndex = allGroups.indexOf(activeGroup);

  const navigateGroup = (dir: -1 | 1) => {
    const newIdx = currentGroupIndex + dir;
    if (newIdx >= 0 && newIdx < allGroups.length) {
      const newGroup = allGroups[newIdx];
      setActiveGroup(newGroup);
      const syllables = newGroup === "vowels"
        ? vowels
        : consonantGroups.find((g) => g.name === newGroup)?.syllables || [];
      setSelectedGlyph(syllables[0]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <p className="font-mandombe text-3xl md:text-4xl text-gold mb-2 block">Nsonokono Mandombe</p>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gold/70 font-body text-xs tracking-[0.35em] uppercase mb-4">
              {t("mandombe.eyebrow")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("mandombe.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              {t("mandombe.subtitle")}
            </p>
          </div>

          {/* Group navigation */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateGroup(-1)}
                disabled={currentGroupIndex === 0}
                className="text-muted-foreground"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-wrap justify-center gap-1.5">
                <button
                  onClick={() => { setActiveGroup("vowels"); setSelectedGlyph(vowels[0]); }}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    activeGroup === "vowels"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {t("mandombe.vowels")}
                </button>
                {consonantGroups.map((g) => (
                  <button
                    key={g.name}
                    onClick={() => { setActiveGroup(g.name); setSelectedGlyph(g.syllables[0]); }}
                    className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                      activeGroup === g.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {g.name}-
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateGroup(1)}
                disabled={currentGroupIndex === allGroups.length - 1}
                className="text-muted-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Syllable selector */}
            <div className="flex justify-center gap-3 flex-wrap mb-10">
              {currentSyllables.map((s) => (
                <button
                  key={s.label}
                  onClick={() => setSelectedGlyph(s)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[72px] ${
                    selectedGlyph.label === s.label
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/30 bg-card"
                  }`}
                >
                  <span className="font-mandombe text-3xl text-gold leading-none">{s.glyph}</span>
                  <span className="text-xs font-bold text-foreground">{s.label}</span>
                </button>
              ))}
            </div>

            {/* Main learning area */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Glyph display */}
              <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">{t("mandombe.reference")}</p>
                <div className="w-48 h-48 flex items-center justify-center bg-cream dark:bg-background rounded-xl border border-border mb-6">
                  <span className="font-mandombe text-[120px] text-foreground leading-none">{selectedGlyph.glyph}</span>
                </div>
                <p className="font-display text-2xl font-bold text-foreground mb-1">{selectedGlyph.label}</p>
                <div className="mt-4 bg-muted/50 rounded-lg px-4 py-3 w-full">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("mandombe.exampleWord")}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{selectedGlyph.example}</p>
                      <p className="text-sm text-muted-foreground">{selectedGlyph.meaning}</p>
                    </div>
                    <span className="font-mandombe text-2xl text-gold">{selectedGlyph.example}</span>
                  </div>
                </div>
              </div>

              {/* Tracing canvas */}
              <div className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4">
                  <Pen className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">{t("mandombe.practice")}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  {t("mandombe.traceInstruction")}
                </p>
                <GlyphTracingCanvas glyph={selectedGlyph.glyph} label={selectedGlyph.label} />
              </div>
            </div>

            {/* Full word practice */}
            <div className="mt-12 max-w-4xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">
                {t("mandombe.wordPractice")}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {currentSyllables.map((s) => (
                  <div
                    key={s.label}
                    className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedGlyph(s)}
                  >
                    <p className="font-mandombe text-2xl text-gold mb-1">{s.example}</p>
                    <p className="font-semibold text-sm text-foreground">{s.example}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MandombeScript;
