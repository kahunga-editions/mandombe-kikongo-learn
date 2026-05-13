import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Pen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlyphTracingCanvas from "@/components/GlyphTracingCanvas";
import { useLanguage } from "@/contexts/LanguageContext";

interface SyllableEntry {
  glyph: string;
  label: string;
  example: string;
  exampleMandombe: string;
  meaning: string;
}

// Canonical vowel order: i, u, e, o, a
const VOWEL_ORDER = ["i", "u", "e", "o", "a"];
// Complementary vowels (Vita + Kimpa)
const COMPLEMENTARY_VOWELS = ["ia", "ue", "io", "ua", "ui", "iu"];

// Dictionary of example words keyed by syllable (consonant+vowel)
const syllableExamples: Record<string, { example: string; exampleMandombe: string; meaning: string }> = {
  // Vowels
  i: { example: "", exampleMandombe: "", meaning: "i = Intériorité / Innerness" },
  u: { example: "", exampleMandombe: "", meaning: "u = Principe féminin / Feminine principle" },
  e: { example: "", exampleMandombe: "", meaning: "e = Réception / Reception" },
  o: { example: "", exampleMandombe: "", meaning: "o = Ascension / Ascension" },
  a: { example: "Ani", exampleMandombe: "Ani", meaning: "a = Manifestation — Ani: Mon, ma / My, mine" },

  // B-series
  bi: { example: "Bikola", exampleMandombe: "Bikola", meaning: "Légumes / Vegetables" },
  bu: { example: "Buka", exampleMandombe: "Buka", meaning: "Soigner / To heal" },
  be: { example: "Benda", exampleMandombe: "Benda", meaning: "Puiser / To draw water" },
  bo: { example: "Bote", exampleMandombe: "Bote", meaning: "Beau, bon / Beautiful, good" },
  ba: { example: "Baka", exampleMandombe: "Baka", meaning: "Obtenir / To obtain" },
  bia: { example: "", exampleMandombe: "", meaning: "" },
  bue: { example: "Bue", exampleMandombe: "Bue", meaning: "Comment, qu'est-ce que / How, what" },
  bua: { example: "", exampleMandombe: "", meaning: "" },
  bui: { example: "", exampleMandombe: "", meaning: "" },
  biu: { example: "Biu", exampleMandombe: "Biu", meaning: "" },

  // D-series
  di: { example: "Dimpa", exampleMandombe: "Dimpa", meaning: "Pain / Bread" },
  du: { example: "Duka", exampleMandombe: "Duka", meaning: "Sortir / To go out" },
  de: { example: "Dezo", exampleMandombe: "Dezo", meaning: "Haricot / Bean" },
  do: { example: "", exampleMandombe: "", meaning: "" },
  da: { example: "", exampleMandombe: "", meaning: "" },
  dia: { example: "Dia", exampleMandombe: "Dia", meaning: "Manger / To eat" },
  dio: { example: "Dio", exampleMandombe: "Dio", meaning: "Le (ex: yika dio = ajoute-le) / The, it" },
  due: { example: "", exampleMandombe: "", meaning: "" },
  dua: { example: "", exampleMandombe: "", meaning: "" },

  // F-series
  fi: { example: "Fioti", exampleMandombe: "Fiyoti", meaning: "Petit / Small" },
  fu: { example: "Futa", exampleMandombe: "Futa", meaning: "Payer / To pay" },
  fe: { example: "", exampleMandombe: "", meaning: "" },
  fo: { example: "Fofolo", exampleMandombe: "Fofolo", meaning: "Allumettes / Matches" },
  fa: { example: "", exampleMandombe: "", meaning: "" },
  fua: { example: "Fua", exampleMandombe: "Fuwa", meaning: "Mourir / To die" },

  // K-series
  ki: { example: "Kiese", exampleMandombe: "Kiese", meaning: "Joie / Joy" },
  ku: { example: "Kuku", exampleMandombe: "Kuku", meaning: "Foyer / Hearth" },
  ke: { example: "Kela", exampleMandombe: "Kela", meaning: "Protéger / To protect" },
  ko: { example: "Kola", exampleMandombe: "Kola", meaning: "Être en bonne santé / To be healthy" },
  ka: { example: "Kanga", exampleMandombe: "Kanga", meaning: "Fermer / To close" },
  kua: { example: "", exampleMandombe: "", meaning: "" },
  kui: { example: "Kuizila", exampleMandombe: "Kuizila", meaning: "Forme qui vient de venir / Form that just arrived" },

  // L-series
  li: { example: "Linzolo", exampleMandombe: "Linzolo", meaning: "Linzolo (localité)" },
  lu: { example: "Lumbu", exampleMandombe: "Lumbu", meaning: "Jour / Day" },
  le: { example: "Lemba", exampleMandombe: "Lemba", meaning: "École initiatique / Initiation school" },
  lo: { example: "Longa", exampleMandombe: "Longa", meaning: "Enseigner / To teach" },
  la: { example: "Lamba", exampleMandombe: "Lamba", meaning: "Cuisiner / To cook" },

  // M-series
  mi: { example: "Mielo", exampleMandombe: "Mielo", meaning: "Les portes / The doors" },
  mu: { example: "Muinda", exampleMandombe: "Muinda", meaning: "Lampe / Lamp" },
  me: { example: "Meno", exampleMandombe: "Meno", meaning: "Moi / I, me" },
  mo: { example: "Mona", exampleMandombe: "Mona", meaning: "Voir / To see" },
  ma: { example: "Matondo", exampleMandombe: "Matondo", meaning: "Merci / Thank you" },
  mua: { example: "Muaya", exampleMandombe: "Muwaya", meaning: "Bâillement / Yawn" },

  // N-series
  ni: { example: "Nioka", exampleMandombe: "Nioka", meaning: "Serpent / Snake" },
  nu: { example: "Nungu", exampleMandombe: "Nungu", meaning: "Piment / Pepper" },
  ne: { example: "Nene", exampleMandombe: "Nene", meaning: "Grand / Big" },
  no: { example: "", exampleMandombe: "", meaning: "" },
  na: { example: "Nanguna", exampleMandombe: "Nanguna", meaning: "Porter / To carry" },

  // S-series
  si: { example: "Sika", exampleMandombe: "Sika", meaning: "Jouer d'un instrument / To play" },
  su: { example: "Sukula", exampleMandombe: "Sukula", meaning: "Laver / To wash" },
  se: { example: "Sema", exampleMandombe: "Sema", meaning: "Bénir / To bless" },
  so: { example: "", exampleMandombe: "", meaning: "" },
  sa: { example: "Sala", exampleMandombe: "Sala", meaning: "Travailler / To work" },

  // T-series
  ti: { example: "Tinta", exampleMandombe: "Tinta", meaning: "Couleur / Color" },
  tu: { example: "Tuba", exampleMandombe: "Tuba", meaning: "Dire, parler / To say" },
  te: { example: "Teka", exampleMandombe: "Teka", meaning: "Puiser / To draw water" },
  to: { example: "Tonda", exampleMandombe: "Tonda", meaning: "Remercier / To thank" },
  ta: { example: "Tala", exampleMandombe: "Tala", meaning: "Regarder / To look" },

  // V-series
  vi: { example: "", exampleMandombe: "", meaning: "" },
  vu: { example: "Vungula", exampleMandombe: "Vungula", meaning: "Ouvrir / To open" },
  ve: { example: "", exampleMandombe: "", meaning: "" },
  vo: { example: "", exampleMandombe: "", meaning: "" },
  va: { example: "Vunga", exampleMandombe: "Vunga", meaning: "Couverture / Blanket" },

  // W-series
  wi: { example: "", exampleMandombe: "", meaning: "" },
  wu: { example: "", exampleMandombe: "", meaning: "" },
  we: { example: "Wela", exampleMandombe: "Wela", meaning: "Humer / To sniff" },
  wo: { example: "", exampleMandombe: "", meaning: "" },
  wa: { example: "Wanda", exampleMandombe: "Wanda", meaning: "Taper / To hit" },
  wuna: { example: "Wuna", exampleMandombe: "Wuna", meaning: "Mentir / To lie" },

  // Y-series
  yi: { example: "Yimba", exampleMandombe: "Yimba", meaning: "Chanter / To sing" },
  yu: { example: "Yulu", exampleMandombe: "Yulu", meaning: "Ciel / Sky" },
  ye: { example: "Yengo", exampleMandombe: "Yengo", meaning: "Espoir / Hope" },
  yo: { example: "Yoka", exampleMandombe: "Yoka", meaning: "Passer / To pass" },
  ya: { example: "Yaya", exampleMandombe: "Yaya", meaning: "Aîné(e) / Elder sibling" },

  // Z-series
  zi: { example: "Zibula", exampleMandombe: "Zibula", meaning: "Ouvrir / To open" },
  zu: { example: "Zulu", exampleMandombe: "Zulu", meaning: "Ciel / Sky" },
  ze: { example: "Zenga", exampleMandombe: "Zenga", meaning: "Couper / To cut" },
  zo: { example: "Zola", exampleMandombe: "Zola", meaning: "Aimer / To love" },
  za: { example: "Zaba", exampleMandombe: "Zaba", meaning: "Savoir / To know" },

  // Prenasalized: MB
  mbi: { example: "Mbi", exampleMandombe: "Mbi", meaning: "Le feu intérieur / The inner fire" },
  mbu: { example: "", exampleMandombe: "", meaning: "" },
  mbe: { example: "", exampleMandombe: "", meaning: "" },
  mbo: { example: "Mbo", exampleMandombe: "Mbo", meaning: "Particule du futur / Future particle" },
  mba: { example: "Mba", exampleMandombe: "Mba", meaning: "Le feu manifesté / The manifested fire" },

  // ND
  ndi: { example: "", exampleMandombe: "", meaning: "" },
  ndu: { example: "Ndumba", exampleMandombe: "Ndumba", meaning: "Jeune fille / Young girl" },
  nde: { example: "", exampleMandombe: "", meaning: "" },
  ndo: { example: "", exampleMandombe: "", meaning: "" },
  nda: { example: "Ndabu", exampleMandombe: "Ndabu", meaning: "Des cils / Eyelashes" },

  // NG
  ngi: { example: "", exampleMandombe: "", meaning: "" },
  ngu: { example: "Nguba", exampleMandombe: "Nguba", meaning: "Cacahuète, arachide / Peanut" },
  nge: { example: "Nge", exampleMandombe: "Nge", meaning: "Tu, toi, te / You" },
  ngo: { example: "", exampleMandombe: "", meaning: "" },
  nga: { example: "", exampleMandombe: "", meaning: "" },

  // MF
  mfi: { example: "Mfinda", exampleMandombe: "Mfinda", meaning: "Le bois / The wood, forest" },
  mfu: { example: "Mfuka", exampleMandombe: "Mfuka", meaning: "Dette / Debt" },
  mfe: { example: "", exampleMandombe: "", meaning: "" },
  mfo: { example: "", exampleMandombe: "", meaning: "" },
  mfa: { example: "", exampleMandombe: "", meaning: "" },

  // NK
  nki: { example: "", exampleMandombe: "", meaning: "" },
  nku: { example: "Nkunki", exampleMandombe: "Nkunki", meaning: "Une bosse / A bump" },
  nke: { example: "", exampleMandombe: "", meaning: "" },
  nko: { example: "", exampleMandombe: "", meaning: "" },
  nka: { example: "", exampleMandombe: "", meaning: "" },

  // NL
  nli: { example: "", exampleMandombe: "", meaning: "" },
  nlu: { example: "Nlumi", exampleMandombe: "Nlumi", meaning: "Époux, mari / Husband" },
  nle: { example: "Nleke", exampleMandombe: "Nleke", meaning: "Cadet(te) / Youngest" },
  nlo: { example: "Nlonga", exampleMandombe: "Nlonga", meaning: "File, alignement / Line, row" },
  nla: { example: "", exampleMandombe: "", meaning: "" },

  // MV
  mvi: { example: "Mvita", exampleMandombe: "Mvita", meaning: "Combat, guerre / War, combat" },
  mvu: { example: "Mvula", exampleMandombe: "Mvula", meaning: "Année, pluie / Year, rain" },
  mve: { example: "", exampleMandombe: "", meaning: "" },
  mvo: { example: "", exampleMandombe: "", meaning: "" },
  mva: { example: "", exampleMandombe: "", meaning: "" },

  // NS
  nsi: { example: "Nsi", exampleMandombe: "Nsi", meaning: "Terre, pays / Land, country" },
  nsu: { example: "Nsuki", exampleMandombe: "Nsuki", meaning: "Cheveux / Hair" },
  nse: { example: "Nsende", exampleMandombe: "Nsende", meaning: "Épines / Thorns" },
  nso: { example: "Nsoni", exampleMandombe: "Nsoni", meaning: "Honte / Shame" },
  nsa: { example: "Nsala", exampleMandombe: "Nsala", meaning: "Crevettes / Shrimp" },

  // NT
  nti: { example: "Ntima", exampleMandombe: "Ntima", meaning: "Le cœur / The heart" },
  ntu: { example: "Ntulu", exampleMandombe: "Ntulu", meaning: "Poitrine / Chest" },
  nte: { example: "Ntete", exampleMandombe: "Ntete", meaning: "Le premier / The first" },
  nto: { example: "Nto", exampleMandombe: "Nto", meaning: "Rivière / River" },
  nta: { example: "Ntalu", exampleMandombe: "Ntalu", meaning: "Prix, valeur / Price, value" },

  // NY
  nyi: { example: "", exampleMandombe: "", meaning: "" },
  nyu: { example: "", exampleMandombe: "", meaning: "" },
  nye: { example: "", exampleMandombe: "", meaning: "" },
  nyo: { example: "", exampleMandombe: "", meaning: "" },
  nya: { example: "Nyama", exampleMandombe: "Nyama", meaning: "Viande / Meat" },

  // SH (Mazita ma mazindinga)
  shi: { example: "Shisa", exampleMandombe: "Shisa", meaning: "Laisser, abandonner / To leave" },
  shu: { example: "", exampleMandombe: "", meaning: "" },
  she: { example: "", exampleMandombe: "", meaning: "" },
  sho: { example: "", exampleMandombe: "", meaning: "" },
  sha: { example: "", exampleMandombe: "", meaning: "" },
  shia: { example: "", exampleMandombe: "", meaning: "" },
  shue: { example: "", exampleMandombe: "", meaning: "" },
  shua: { example: "", exampleMandombe: "", meaning: "" },

  // J
  ji: { example: "Jibula", exampleMandombe: "Jibula", meaning: "Ouvrir / To open" },
  ju: { example: "", exampleMandombe: "", meaning: "" },
  je: { example: "", exampleMandombe: "", meaning: "" },
  jo: { example: "", exampleMandombe: "", meaning: "" },
  ja: { example: "Jango", exampleMandombe: "Jango", meaning: "Danse Kongo de Cuba / Kongo dance" },
  jua: { example: "", exampleMandombe: "", meaning: "" },
  jui: { example: "", exampleMandombe: "", meaning: "" },
  jiu: { example: "", exampleMandombe: "", meaning: "" },
  jue: { example: "", exampleMandombe: "", meaning: "" },

  // DJ
  dji: { example: "", exampleMandombe: "", meaning: "" },
  dju: { example: "", exampleMandombe: "", meaning: "" },
  dje: { example: "", exampleMandombe: "", meaning: "" },
  djo: { example: "", exampleMandombe: "", meaning: "" },
  dja: { example: "Djambala", exampleMandombe: "Djambala", meaning: "Commune du Pool / Town in the Pool" },

  // NZ
  nzi: { example: "", exampleMandombe: "", meaning: "" },
  nzu: { example: "", exampleMandombe: "", meaning: "" },
  nze: { example: "", exampleMandombe: "", meaning: "" },
  nzo: { example: "Nzo", exampleMandombe: "Nzo", meaning: "Maison / House" },
  nza: { example: "Nzambi", exampleMandombe: "Nzambi", meaning: "Être de la 15e dimension / Being of the 15th dimension" },

  // TSH
  tshi: { example: "Tshiba", exampleMandombe: "Tshiba", meaning: "Esprit / Spirit" },
  tshu: { example: "Tshula", exampleMandombe: "Tshula", meaning: "Crapaud / Toad" },
  tshe: { example: "", exampleMandombe: "", meaning: "" },
  tsho: { example: "", exampleMandombe: "", meaning: "" },
  tsha: { example: "", exampleMandombe: "", meaning: "" },

  // N'K (Ntentia)
  "n'ki": { example: "", exampleMandombe: "", meaning: "" },
  "n'ku": { example: "", exampleMandombe: "", meaning: "" },
  "n'ke": { example: "N'kento", exampleMandombe: "N'kento", meaning: "Femme / Woman" },
  "n'ko": { example: "", exampleMandombe: "", meaning: "" },
  "n'ka": { example: "N'kama", exampleMandombe: "N'kama", meaning: "Épouses d'un lignage / Wives of a lineage" },

  // Vita (complementary vowels)
  ia: { example: "Dia", exampleMandombe: "Dia", meaning: "Manger / To eat" },
  ue: { example: "Bue", exampleMandombe: "Bue", meaning: "Comment, qu'est-ce que / How, what" },
  io: { example: "Dio", exampleMandombe: "Dio", meaning: "Le (ex: yika dio) / The, it" },

  // Kimpa
  ui: { example: "Kuizila", exampleMandombe: "Kuizila", meaning: "Forme qui vient de venir / Form that just arrived" },
  iu: { example: "Biu", exampleMandombe: "Biu", meaning: "" },
};

// Generate syllable entries for a consonant with all vowels
function generateVowelGradation(consonant: string, includeComplementary = true): SyllableEntry[] {
  const entries: SyllableEntry[] = [];

  // Primary vowels in canonical order: i, u, e, o, a
  for (const v of VOWEL_ORDER) {
    const key = consonant.toLowerCase() + v;
    const label = consonant.toUpperCase() + v.toUpperCase();
    const data = syllableExamples[key];
    entries.push({
      glyph: key,
      label,
      example: data?.example || "",
      exampleMandombe: data?.exampleMandombe || "",
      meaning: data?.meaning || "",
    });
  }

  // Complementary vowels
  if (includeComplementary) {
    for (const cv of COMPLEMENTARY_VOWELS) {
      const key = consonant.toLowerCase() + cv;
      const data = syllableExamples[key];
      if (data) {
        entries.push({
          glyph: key,
          label: consonant.toUpperCase() + cv.toUpperCase(),
          example: data.example,
          exampleMandombe: data.exampleMandombe,
          meaning: data.meaning,
        });
      }
    }
  }

  return entries;
}

// Consonant list for basic mvuala
const basicConsonants = ["B", "D", "F", "K", "L", "M", "N", "S", "T", "V", "W", "Y", "Z"];
const prenasalizedConsonants = ["MB", "ND", "NG", "MF", "NK", "NL", "MV", "NS", "NT", "NY"];
const mazindingaConsonants = ["SH", "J", "DJ", "NZ", "TSH"];

// Vowels as standalone entries
const vowelEntries: SyllableEntry[] = VOWEL_ORDER.map(v => ({
  glyph: v,
  label: v.toUpperCase(),
  example: syllableExamples[v]?.example || "",
  exampleMandombe: syllableExamples[v]?.exampleMandombe || "",
  meaning: syllableExamples[v]?.meaning || "",
}));

// Ntentia group
const ntentiaEntries = generateVowelGradation("N'K", false);

// Vita entries
const vitaEntries: SyllableEntry[] = [
  { glyph: "ia", label: "IA", ...syllableExamples["ia"] },
  { glyph: "ue", label: "UE", ...syllableExamples["ue"] },
  { glyph: "io", label: "IO", ...syllableExamples["io"] },
];

// Kimpa entries
const kimpaEntries: SyllableEntry[] = [
  { glyph: "ui", label: "UI", ...syllableExamples["ui"] },
  { glyph: "iu", label: "IU", ...syllableExamples["iu"] },
];

// Ntalu — Numbers 0-9
const ntaluEntries: SyllableEntry[] = [
  { glyph: "0", label: "0", example: "Mpavala", exampleMandombe: "Mpavala", meaning: "Zéro / Zero" },
  { glyph: "1", label: "1", example: "Moshi", exampleMandombe: "Moshi", meaning: "Un / One" },
  { glyph: "2", label: "2", example: "Zole", exampleMandombe: "Zole", meaning: "Deux / Two" },
  { glyph: "3", label: "3", example: "Tatu", exampleMandombe: "Tatu", meaning: "Trois / Three" },
  { glyph: "4", label: "4", example: "Ya", exampleMandombe: "Ya", meaning: "Quatre / Four" },
  { glyph: "5", label: "5", example: "Tanu", exampleMandombe: "Tanu", meaning: "Cinq / Five" },
  { glyph: "6", label: "6", example: "Sambanu", exampleMandombe: "Sambanu", meaning: "Six / Six" },
  { glyph: "7", label: "7", example: "Nsambuadi", exampleMandombe: "Nsambuadi", meaning: "Sept / Seven" },
  { glyph: "8", label: "8", example: "Nana", exampleMandombe: "Nana", meaning: "Huit / Eight" },
  { glyph: "9", label: "9", example: "Vua", exampleMandombe: "Vuwa", meaning: "Neuf / Nine" },
];

type GroupDef = { name: string; label?: string; syllables: SyllableEntry[] };

// Section tabs
const sectionTabs = [
  { id: "basic", label: "Bisimba & Mvuala" },
  { id: "prenasalized", label: "Prénasalisées" },
  { id: "mazindinga", label: "Mazindinga" },
  { id: "special", label: "Vita · Kimpa · Ntalu" },
];

const MandombeScript = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("basic");
  const [activeGroup, setActiveGroup] = useState("vowels");
  const [selectedGlyph, setSelectedGlyph] = useState<SyllableEntry>(vowelEntries[0]);

  // Build groups for current section
  const sectionGroups = useMemo((): GroupDef[] => {
    switch (activeSection) {
      case "basic":
        return [
          { name: "vowels", label: "Bisimba (Voyelles)", syllables: vowelEntries },
          ...basicConsonants.map(c => ({
            name: c,
            syllables: generateVowelGradation(c),
          })),
        ];
      case "prenasalized":
        return prenasalizedConsonants.map(c => ({
          name: c,
          syllables: generateVowelGradation(c),
        }));
      case "mazindinga":
        return [
          ...mazindingaConsonants.map(c => ({
            name: c,
            label: c === "SH" ? "Mazita ma mazindinga" : undefined,
            syllables: generateVowelGradation(c),
          })),
          { name: "N'K", label: "Ntentia (apostrophe)", syllables: ntentiaEntries },
        ];
      case "special":
        return [
          { name: "VITA", label: "Vita — Voyelles complémentaires", syllables: vitaEntries },
          { name: "KIMPA", label: "Kimpa — Voyelles complémentaires", syllables: kimpaEntries },
          { name: "NTALU", label: "Ntalu — Chiffres / Numbers", syllables: ntaluEntries },
        ];
      default:
        return [];
    }
  }, [activeSection]);

  const currentSyllables = useMemo(() => {
    return sectionGroups.find(g => g.name === activeGroup)?.syllables || [];
  }, [sectionGroups, activeGroup]);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    // Will trigger useMemo recalc - set first group
    const firstGroup = (() => {
      switch (sectionId) {
        case "basic": return "vowels";
        case "prenasalized": return "MB";
        case "mazindinga": return "SH";
        case "special": return "VITA";
        default: return "vowels";
      }
    })();
    setActiveGroup(firstGroup);

    // Set first syllable
    const groups = (() => {
      switch (sectionId) {
        case "basic": return vowelEntries;
        case "prenasalized": return generateVowelGradation("MB");
        case "mazindinga": return generateVowelGradation("SH");
        case "special": return vitaEntries;
        default: return vowelEntries;
      }
    })();
    if (groups.length > 0) setSelectedGlyph(groups[0]);
  };

  const handleGroupChange = (groupName: string) => {
    setActiveGroup(groupName);
    const group = sectionGroups.find(g => g.name === groupName);
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
            <p className="text-xs text-muted-foreground/70 mt-2 italic">
              Transmis par Nlongi Wabeladio Payi à Mbanza-Ngungu
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
                  {g.name === "vowels" ? "Bisimba" : g.name}
                </button>
              ))}
            </div>

            {/* Group label if available */}
            {sectionGroups.find(g => g.name === activeGroup)?.label && (
              <p className="text-center text-sm font-semibold text-accent mb-4">
                {sectionGroups.find(g => g.name === activeGroup)?.label}
              </p>
            )}

            {/* Syllable selector — glyphs in boxes with Mandombe font */}
            <div className="flex justify-center gap-2 flex-wrap mb-10">
              {currentSyllables.map((s, idx) => (
                <button
                  key={`${s.label}-${idx}`}
                  onClick={() => setSelectedGlyph(s)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all min-w-[64px] ${
                    selectedGlyph.label === s.label && selectedGlyph.glyph === s.glyph
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/30 bg-card"
                  }`}
                >
                  <span className="font-mandombe text-2xl text-gold leading-none">{s.glyph}</span>
                  <span className="text-[10px] font-bold text-foreground">{s.label}</span>
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
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {t("mandombe.traceInstruction")}
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4 text-center italic">
                  Singini → point d'entrée du tracé
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
