import { useState } from "react";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlyphTracingCanvas from "@/components/GlyphTracingCanvas";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Mandombe syllabary — ALL examples are verified Kikongo Lari words from project dictionary
// glyph = accent-free Latin for Mandombe font | example/exampleMandombe from lessons.ts
interface SyllableEntry {
  glyph: string;
  label: string;
  example: string;
  exampleMandombe: string;
  meaning: string;
}

const vowels: SyllableEntry[] = [
  { glyph: "a", label: "A", example: "Ani", exampleMandombe: "Ani", meaning: "Mon, ma, mes / My, mine" },
  { glyph: "e", label: "E", example: "", exampleMandombe: "", meaning: "" },
  { glyph: "i", label: "I", example: "", exampleMandombe: "", meaning: "" },
  { glyph: "o", label: "O", example: "", exampleMandombe: "", meaning: "" },
  { glyph: "u", label: "U", example: "", exampleMandombe: "", meaning: "" },
];

const consonantGroups = [
  {
    name: "B",
    syllables: [
      { glyph: "ba", label: "BA", example: "Baka", exampleMandombe: "Baka", meaning: "Obtenir / To obtain" },
      { glyph: "be", label: "BE", example: "Benda", exampleMandombe: "Benda", meaning: "Puiser / To draw water" },
      { glyph: "bi", label: "BI", example: "Bikola", exampleMandombe: "Bikola", meaning: "Légumes / Vegetables" },
      { glyph: "bo", label: "BO", example: "Bote", exampleMandombe: "Bote", meaning: "Beau, bon / Beautiful, good" },
      { glyph: "bu", label: "BU", example: "Buka", exampleMandombe: "Buka", meaning: "Soigner / To heal" },
    ] as SyllableEntry[],
  },
  {
    name: "D",
    syllables: [
      { glyph: "de", label: "DE", example: "Dezo", exampleMandombe: "Dezo", meaning: "Haricot / Bean" },
      { glyph: "di", label: "DI", example: "Dimpa", exampleMandombe: "Dimpa", meaning: "Pain / Bread" },
      { glyph: "du", label: "DU", example: "Duka", exampleMandombe: "Duka", meaning: "Sortir / To go out" },
    ] as SyllableEntry[],
  },
  {
    name: "F",
    syllables: [
      { glyph: "fi", label: "FI", example: "Fioti", exampleMandombe: "Fiyoti", meaning: "Petit / Small" },
      { glyph: "fo", label: "FO", example: "Fofolo", exampleMandombe: "Fofolo", meaning: "Allumettes / Matches" },
      { glyph: "fu", label: "FU", example: "Futa", exampleMandombe: "Futa", meaning: "Payer / To pay" },
    ] as SyllableEntry[],
  },
  {
    name: "K",
    syllables: [
      { glyph: "ka", label: "KA", example: "Kanga", exampleMandombe: "Kanga", meaning: "Fermer / To close" },
      { glyph: "ke", label: "KE", example: "Kela", exampleMandombe: "Kela", meaning: "Protéger / To protect" },
      { glyph: "ki", label: "KI", example: "Kiese", exampleMandombe: "Kiese", meaning: "Joie / Joy" },
      { glyph: "ko", label: "KO", example: "Kola", exampleMandombe: "Kola", meaning: "Être en bonne santé / To be healthy" },
      { glyph: "ku", label: "KU", example: "Kuku", exampleMandombe: "Kuku", meaning: "Foyer / Hearth" },
    ] as SyllableEntry[],
  },
  {
    name: "L",
    syllables: [
      { glyph: "la", label: "LA", example: "Lamba", exampleMandombe: "Lamba", meaning: "Cuisiner / To cook" },
      { glyph: "le", label: "LE", example: "Lemba", exampleMandombe: "Lemba", meaning: "École initiatique Kongo / Kongo initiation school" },
      { glyph: "li", label: "LI", example: "Linzolo", exampleMandombe: "Linzolo", meaning: "Linzolo (localité)" },
      { glyph: "lo", label: "LO", example: "Longa", exampleMandombe: "Longa", meaning: "Enseigner / To teach" },
      { glyph: "lu", label: "LU", example: "Lumbu", exampleMandombe: "Lumbu", meaning: "Jour / Day" },
    ] as SyllableEntry[],
  },
  {
    name: "M",
    syllables: [
      { glyph: "ma", label: "MA", example: "Matondo", exampleMandombe: "Matondo", meaning: "Merci / Thank you" },
      { glyph: "me", label: "ME", example: "Meno", exampleMandombe: "Meno", meaning: "Moi / I, me" },
      { glyph: "mi", label: "MI", example: "Mielo", exampleMandombe: "Mielo", meaning: "Les portes / The doors" },
      { glyph: "mo", label: "MO", example: "Mona", exampleMandombe: "Mona", meaning: "Voir / To see" },
      { glyph: "mu", label: "MU", example: "Muinda", exampleMandombe: "Muinda", meaning: "Lampe / Lamp" },
    ] as SyllableEntry[],
  },
  {
    name: "N",
    syllables: [
      { glyph: "na", label: "NA", example: "Nanguna", exampleMandombe: "Nanguna", meaning: "Porter / To carry" },
      { glyph: "ne", label: "NE", example: "Nene", exampleMandombe: "Nene", meaning: "Grand / Big" },
      { glyph: "ni", label: "NI", example: "Nioka", exampleMandombe: "Nioka", meaning: "Serpent / Snake" },
      { glyph: "nu", label: "NU", example: "Nungu", exampleMandombe: "Nungu", meaning: "Piment / Pepper" },
    ] as SyllableEntry[],
  },
  {
    name: "S",
    syllables: [
      { glyph: "sa", label: "SA", example: "Sala", exampleMandombe: "Sala", meaning: "Travailler / To work" },
      { glyph: "se", label: "SE", example: "Sema", exampleMandombe: "Sema", meaning: "Bénir / To bless" },
      { glyph: "si", label: "SI", example: "Sika", exampleMandombe: "Sika", meaning: "Jouer d'un instrument / To play an instrument" },
      { glyph: "su", label: "SU", example: "Sukula", exampleMandombe: "Sukula", meaning: "Laver / To wash" },
    ] as SyllableEntry[],
  },
  {
    name: "T",
    syllables: [
      { glyph: "ta", label: "TA", example: "Tala", exampleMandombe: "Tala", meaning: "Regarder / To look" },
      { glyph: "te", label: "TE", example: "Teka", exampleMandombe: "Teka", meaning: "Puiser / To draw water" },
      { glyph: "ti", label: "TI", example: "Tinta", exampleMandombe: "Tinta", meaning: "Couleur / Color" },
      { glyph: "to", label: "TO", example: "Tonda", exampleMandombe: "Tonda", meaning: "Remercier / To thank" },
      { glyph: "tu", label: "TU", example: "Tuba", exampleMandombe: "Tuba", meaning: "Dire, parler / To say, to speak" },
    ] as SyllableEntry[],
  },
  {
    name: "V",
    syllables: [
      { glyph: "vu", label: "VU", example: "Vungula", exampleMandombe: "Vungula", meaning: "Ouvrir / To open" },
    ] as SyllableEntry[],
  },
  {
    name: "W",
    syllables: [
      { glyph: "wa", label: "WA", example: "Wanda", exampleMandombe: "Wanda", meaning: "Taper / To hit" },
      { glyph: "we", label: "WE", example: "Wela", exampleMandombe: "Wela", meaning: "Humer / To sniff" },
    ] as SyllableEntry[],
  },
  {
    name: "Y",
    syllables: [
      { glyph: "ya", label: "YA", example: "Yaya", exampleMandombe: "Yaya", meaning: "Aîné(e) / Elder sibling" },
      { glyph: "ye", label: "YE", example: "Yengo", exampleMandombe: "Yengo", meaning: "Espoir / Hope" },
      { glyph: "yi", label: "YI", example: "Yimba", exampleMandombe: "Yimba", meaning: "Chanter / To sing" },
      { glyph: "yo", label: "YO", example: "Yoka", exampleMandombe: "Yoka", meaning: "Passer / To pass" },
      { glyph: "yu", label: "YU", example: "Yulu", exampleMandombe: "Yulu", meaning: "Ciel / Sky" },
    ] as SyllableEntry[],
  },
  {
    name: "Z",
    syllables: [
      { glyph: "za", label: "ZA", example: "Zaba", exampleMandombe: "Zaba", meaning: "Savoir / To know" },
      { glyph: "ze", label: "ZE", example: "Zenga", exampleMandombe: "Zenga", meaning: "Couper / To cut" },
      { glyph: "zi", label: "ZI", example: "Zibula", exampleMandombe: "Zibula", meaning: "Ouvrir / To open" },
      { glyph: "zo", label: "ZO", example: "Zola", exampleMandombe: "Zola", meaning: "Aimer / To love" },
      { glyph: "zu", label: "ZU", example: "Zulu", exampleMandombe: "Zulu", meaning: "Ciel / Sky" },
    ] as SyllableEntry[],
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
                {selectedGlyph.example && (
                  <div className="mt-4 bg-muted/50 rounded-lg px-4 py-3 w-full">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t("mandombe.exampleWord")}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{selectedGlyph.example}</p>
                        <p className="text-sm text-muted-foreground">{selectedGlyph.meaning}</p>
                      </div>
                      <span className="font-mandombe text-2xl text-gold">{selectedGlyph.exampleMandombe}</span>
                    </div>
                  </div>
                )}
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
