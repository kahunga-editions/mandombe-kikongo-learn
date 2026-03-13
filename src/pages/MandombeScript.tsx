import { useState } from "react";
import { ChevronLeft, ChevronRight, Pen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlyphTracingCanvas from "@/components/GlyphTracingCanvas";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SyllableEntry {
  glyph: string;
  label: string;
  example: string;
  exampleMandombe: string;
  meaning: string;
}

// Vowels in canonical dimensionalization order: i, u, e, o, a
const vowels: SyllableEntry[] = [
  { glyph: "i", label: "I", example: "", exampleMandombe: "", meaning: "i = Intériorité / Innerness" },
  { glyph: "u", label: "U", example: "", exampleMandombe: "", meaning: "u = Principe féminin / Feminine principle" },
  { glyph: "e", label: "E", example: "", exampleMandombe: "", meaning: "e = Réception / Reception" },
  { glyph: "o", label: "O", example: "", exampleMandombe: "", meaning: "o = Ascension / Ascension" },
  { glyph: "a", label: "A", example: "Ani", exampleMandombe: "Ani", meaning: "a = Manifestation — Ani: Mon, ma / My, mine" },
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
      { glyph: "le", label: "LE", example: "Lemba", exampleMandombe: "Lemba", meaning: "École initiatique / Initiation school" },
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
      { glyph: "si", label: "SI", example: "Sika", exampleMandombe: "Sika", meaning: "Jouer d'un instrument / To play" },
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
      { glyph: "tu", label: "TU", example: "Tuba", exampleMandombe: "Tuba", meaning: "Dire, parler / To say" },
    ] as SyllableEntry[],
  },
  {
    name: "V",
    syllables: [
      { glyph: "va", label: "VA", example: "Vunga", exampleMandombe: "Vunga", meaning: "Couverture / Blanket" },
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

// Prenasalized consonants
const prenasalizedGroups = [
  {
    name: "MB",
    syllables: [
      { glyph: "mba", label: "MBA", example: "Mba", exampleMandombe: "Mba", meaning: "Le feu manifesté / The manifested fire" },
      { glyph: "mbi", label: "MBI", example: "Mbi", exampleMandombe: "Mbi", meaning: "Le feu intérieur / The inner fire" },
    ] as SyllableEntry[],
  },
  {
    name: "ND",
    syllables: [
      { glyph: "ndu", label: "NDU", example: "Ndumba", exampleMandombe: "Ndumba", meaning: "Jeune fille / Young girl" },
    ] as SyllableEntry[],
  },
  {
    name: "NG",
    syllables: [
      { glyph: "ngu", label: "NGU", example: "Nguba", exampleMandombe: "Nguba", meaning: "Cacahuète, arachide / Peanut" },
      { glyph: "nge", label: "NGE", example: "Nge", exampleMandombe: "Nge", meaning: "Tu, toi, te / You" },
      { glyph: "ngu", label: "NGU (2)", example: "Ngumba", exampleMandombe: "Ngumba", meaning: "Porc-épic / Porcupine" },
    ] as SyllableEntry[],
  },
  {
    name: "MF",
    syllables: [
      { glyph: "mfi", label: "MFI", example: "Mfinda", exampleMandombe: "Mfinda", meaning: "Le bois / The wood, forest" },
      { glyph: "mfu", label: "MFU", example: "Mfuka", exampleMandombe: "Mfuka", meaning: "Dette, dette énergétique / Debt, energetic debt" },
    ] as SyllableEntry[],
  },
  {
    name: "NK",
    syllables: [
      { glyph: "nku", label: "NKU", example: "Nkunki", exampleMandombe: "Nkunki", meaning: "Une bosse / A bump" },
      { glyph: "nku", label: "NKU (2)", example: "Nkuba", exampleMandombe: "Nkuba", meaning: "Défaite, raclée / Defeat" },
      { glyph: "nku", label: "NKU (3)", example: "Nkuala", exampleMandombe: "Nkuala", meaning: "Natte / Mat" },
    ] as SyllableEntry[],
  },
  {
    name: "NL",
    syllables: [
      { glyph: "nle", label: "NLE", example: "Nleke", exampleMandombe: "Nleke", meaning: "Cadet(te), plus jeune / Youngest" },
      { glyph: "nlu", label: "NLU", example: "Nlumi", exampleMandombe: "Nlumi", meaning: "Époux, mari / Husband" },
      { glyph: "nlo", label: "NLO", example: "Nlonga", exampleMandombe: "Nlonga", meaning: "File, alignement / Line, row" },
    ] as SyllableEntry[],
  },
  {
    name: "MV",
    syllables: [
      { glyph: "mvi", label: "MVI", example: "Mvita", exampleMandombe: "Mvita", meaning: "Combat, guerre / War, combat" },
      { glyph: "mvu", label: "MVU", example: "Mvukani", exampleMandombe: "Mvukani", meaning: "Réunion / Meeting" },
      { glyph: "mvu", label: "MVU (2)", example: "Mvula", exampleMandombe: "Mvula", meaning: "Année, pluie, âge / Year, rain, age" },
      { glyph: "mvu", label: "MVU (3)", example: "Mvutu", exampleMandombe: "Mvutu", meaning: "Réponse / Answer" },
    ] as SyllableEntry[],
  },
  {
    name: "NS",
    syllables: [
      { glyph: "nsa", label: "NSA", example: "Nsala", exampleMandombe: "Nsala", meaning: "Crevettes, écrevisses / Shrimp" },
      { glyph: "nsa", label: "NSA (2)", example: "Nsaka", exampleMandombe: "Nsaka", meaning: "Le jeu / The game" },
      { glyph: "nsa", label: "NSA (3)", example: "Nsa", exampleMandombe: "Nsa", meaning: "Acidité / Acidity" },
      { glyph: "nse", label: "NSE", example: "Nsende", exampleMandombe: "Nsende", meaning: "Épines / Thorns" },
      { glyph: "nsi", label: "NSI", example: "Nsi", exampleMandombe: "Nsi", meaning: "Terre, pays, dimension / Land, country" },
      { glyph: "nso", label: "NSO", example: "Nsoni", exampleMandombe: "Nsoni", meaning: "Honte / Shame" },
      { glyph: "nsu", label: "NSU", example: "Nsuki", exampleMandombe: "Nsuki", meaning: "Cheveux / Hair" },
    ] as SyllableEntry[],
  },
  {
    name: "NT",
    syllables: [
      { glyph: "nta", label: "NTA", example: "Ntalu", exampleMandombe: "Ntalu", meaning: "Prix, valeur, chiffres / Price, value" },
      { glyph: "nte", label: "NTE", example: "Ntete", exampleMandombe: "Ntete", meaning: "Le premier / The first" },
      { glyph: "nti", label: "NTI", example: "Ntima", exampleMandombe: "Ntima", meaning: "Le cœur / The heart" },
      { glyph: "nto", label: "NTO", example: "Nto", exampleMandombe: "Nto", meaning: "Rivière / River" },
      { glyph: "ntu", label: "NTU", example: "Ntulu", exampleMandombe: "Ntulu", meaning: "Poitrine / Chest" },
    ] as SyllableEntry[],
  },
  {
    name: "NY",
    syllables: [
      { glyph: "nya", label: "NYA", example: "Nyama", exampleMandombe: "Nyama", meaning: "Viande / Meat" },
    ] as SyllableEntry[],
  },
];

// Mazita ma mazindinga — Migratory characters
const mazindingaGroup = [
  {
    name: "SH",
    label: "Mazita ma mazindinga",
    syllables: [
      { glyph: "shi", label: "SHI", example: "Shisa", exampleMandombe: "Shisa", meaning: "Laisser, abandonner / To leave" },
    ] as SyllableEntry[],
  },
  {
    name: "J",
    syllables: [
      { glyph: "ji", label: "JI", example: "Jibula", exampleMandombe: "Jibula", meaning: "Ouvrir / To open" },
      { glyph: "ji", label: "JI (2)", example: "Jimbakana", exampleMandombe: "Jimbakana", meaning: "Oublier / To forget" },
      { glyph: "ja", label: "JA", example: "Jango", exampleMandombe: "Jango", meaning: "Danse Kongo de Cuba / Kongo dance from Cuba" },
    ] as SyllableEntry[],
  },
  {
    name: "DJ",
    syllables: [
      { glyph: "dja", label: "DJA", example: "Djambala", exampleMandombe: "Djambala", meaning: "Commune du Pool, Kongo Mfua / Town in the Pool" },
    ] as SyllableEntry[],
  },
  {
    name: "NZ",
    syllables: [
      { glyph: "nzo", label: "NZO", example: "Nzo", exampleMandombe: "Nzo", meaning: "Maison / House" },
      { glyph: "nza", label: "NZA", example: "Nzambi", exampleMandombe: "Nzambi", meaning: "Être de la 15e dimension / Being of the 15th dimension" },
    ] as SyllableEntry[],
  },
  {
    name: "TSH",
    syllables: [
      { glyph: "tshi", label: "TSHI", example: "Tshiba", exampleMandombe: "Tshiba", meaning: "Esprit, être sans corps / Spirit, being without body" },
      { glyph: "tshu", label: "TSHU", example: "Tshula", exampleMandombe: "Tshula", meaning: "Crapaud / Toad" },
    ] as SyllableEntry[],
  },
];

// N'K — Ntentia (apostrophe)
const ntentiaGroup = [
  {
    name: "N'K",
    label: "Ntentia (apostrophe)",
    syllables: [
      { glyph: "n'ke", label: "N'KE", example: "N'kento", exampleMandombe: "N'kento", meaning: "Femme / Woman" },
      { glyph: "n'ka", label: "N'KA", example: "N'kama", exampleMandombe: "N'kama", meaning: "Épouses d'un lignage / Wives of a lineage" },
    ] as SyllableEntry[],
  },
];

// Vita — Complementary vowels
const vitaGroup = [
  {
    name: "VITA",
    label: "Vita — Voyelles complémentaires",
    syllables: [
      { glyph: "ia", label: "IA", example: "Dia", exampleMandombe: "Dia", meaning: "Manger / To eat" },
      { glyph: "ue", label: "UE", example: "Bue", exampleMandombe: "Bue", meaning: "Comment, qu'est-ce que / How, what" },
      { glyph: "io", label: "IO", example: "Dio", exampleMandombe: "Dio", meaning: "Le (ex: yika dio = ajoute-le) / The, it" },
    ] as SyllableEntry[],
  },
];

// Kimpa — Complementary vowels
const kimpaGroup = [
  {
    name: "KIMPA",
    label: "Kimpa — Voyelles complémentaires",
    syllables: [
      { glyph: "ui", label: "UI", example: "Kuizila", exampleMandombe: "Kuizila", meaning: "Forme qui vient de venir / Form that just arrived" },
      { glyph: "iu", label: "IU", example: "Biu", exampleMandombe: "Biu", meaning: "" },
    ] as SyllableEntry[],
  },
];

// Ntalu — Numbers 0-9
const ntaluGroup = [
  {
    name: "NTALU",
    label: "Ntalu — Chiffres / Numbers",
    syllables: [
      { glyph: "0", label: "0", example: "Mpavala", exampleMandombe: "Mpavala", meaning: "Zéro / Zero" },
      { glyph: "1", label: "1", example: "Moshi", exampleMandombe: "Moshi", meaning: "Un / One" },
      { glyph: "2", label: "2", example: "Zole", exampleMandombe: "Zole", meaning: "Deux / Two" },
      { glyph: "3", label: "3", example: "Tatu", exampleMandombe: "Tatu", meaning: "Trois / Three" },
      { glyph: "4", label: "4", example: "Ya", exampleMandombe: "Ya", meaning: "Quatre / Four" },
      { glyph: "5", label: "5", example: "Tanu", exampleMandombe: "Tanu", meaning: "Cinq / Five" },
      { glyph: "6", label: "6", example: "Sambanu", exampleMandombe: "Sambanu", meaning: "Six / Six" },
      { glyph: "7", label: "7", example: "Nsambuadi", exampleMandombe: "Nsambuadi", meaning: "Sept / Seven" },
      { glyph: "8", label: "8", example: "Nana", exampleMandombe: "Nana", meaning: "Huit / Eight" },
      { glyph: "9", label: "9", example: "Vua", exampleMandombe: "Vua", meaning: "Neuf / Nine" },
    ] as SyllableEntry[],
  },
];

// Combine all special groups into a flat structure for navigation
type GroupDef = { name: string; label?: string; syllables: SyllableEntry[] };

const allSpecialGroups: GroupDef[] = [
  ...prenasalizedGroups,
  ...mazindingaGroup,
  ...ntentiaGroup,
  ...vitaGroup,
  ...kimpaGroup,
  ...ntaluGroup,
];

const allGroupDefs: GroupDef[] = [
  { name: "vowels", label: "Mazita (Voyelles)", syllables: vowels },
  ...consonantGroups,
  ...allSpecialGroups,
];

// Section categories for tab organization
const sectionTabs = [
  { id: "basic", label: "Mazita & Consonnes" },
  { id: "prenasalized", label: "Prénasalisées" },
  { id: "mazindinga", label: "Mazindinga" },
  { id: "special", label: "Vita · Kimpa · Ntalu" },
];

const getSectionGroups = (sectionId: string): GroupDef[] => {
  switch (sectionId) {
    case "basic":
      return [{ name: "vowels", label: "Mazita (Voyelles)", syllables: vowels }, ...consonantGroups];
    case "prenasalized":
      return prenasalizedGroups;
    case "mazindinga":
      return [...mazindingaGroup, ...ntentiaGroup];
    case "special":
      return [...vitaGroup, ...kimpaGroup, ...ntaluGroup];
    default:
      return [];
  }
};

const MandombeScript = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("basic");
  const [activeGroup, setActiveGroup] = useState("vowels");
  const [selectedGlyph, setSelectedGlyph] = useState<SyllableEntry>(vowels[0]);

  const sectionGroups = getSectionGroups(activeSection);

  const currentSyllables =
    allGroupDefs.find((g) => g.name === activeGroup)?.syllables || [];

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const groups = getSectionGroups(sectionId);
    if (groups.length > 0) {
      setActiveGroup(groups[0].name);
      setSelectedGlyph(groups[0].syllables[0]);
    }
  };

  const handleGroupChange = (groupName: string) => {
    setActiveGroup(groupName);
    const group = allGroupDefs.find((g) => g.name === groupName);
    if (group && group.syllables.length > 0) {
      setSelectedGlyph(group.syllables[0]);
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

          <div className="max-w-5xl mx-auto">
            {/* Section tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {sectionTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleSectionChange(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeSection === tab.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Section description for mazindinga */}
            {activeSection === "mazindinga" && (
              <div className="text-center mb-4 bg-accent/10 rounded-lg px-4 py-3 max-w-xl mx-auto">
                <p className="text-sm text-muted-foreground italic">
                  <span className="font-semibold text-foreground">Mazita ma mazindinga</span> — Caractères migratoires
                </p>
              </div>
            )}

            {/* Group navigation */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-8">
              {sectionGroups.map((g) => (
                <button
                  key={g.name}
                  onClick={() => handleGroupChange(g.name)}
                  className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                    activeGroup === g.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {g.name === "vowels" ? t("mandombe.vowels") : g.name}
                </button>
              ))}
            </div>

            {/* Group label if available */}
            {allGroupDefs.find((g) => g.name === activeGroup)?.label && (
              <p className="text-center text-sm font-semibold text-accent mb-4">
                {allGroupDefs.find((g) => g.name === activeGroup)?.label}
              </p>
            )}

            {/* Syllable selector — glyphs in boxes */}
            <div className="flex justify-center gap-3 flex-wrap mb-10">
              {currentSyllables.map((s, idx) => (
                <button
                  key={`${s.label}-${idx}`}
                  onClick={() => setSelectedGlyph(s)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all min-w-[72px] ${
                    selectedGlyph.label === s.label && selectedGlyph.example === s.example
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
                {currentSyllables.filter((s) => s.example).map((s, idx) => (
                  <div
                    key={`${s.label}-${idx}`}
                    className="bg-card rounded-xl border border-border p-4 text-center hover:border-primary/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedGlyph(s)}
                  >
                    <p className="font-mandombe text-2xl text-gold mb-1">{s.exampleMandombe}</p>
                    <p className="font-semibold text-sm text-foreground">{s.example}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.meaning}</p>
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
