import illustration from "@/assets/crosswords/mc-01-bakala.jpg";
import type { CrosswordPilot } from "@/components/exercises/CrosswordPuzzle";

export const mc01Bakala: CrosswordPilot = {
  id: "mc-01-bakala",
  titleFr: "Mots croises - Bakala ye Bakentu",
  titleEn: "Crossword - Men and Women",
  titlePt: "Palavras cruzadas - Homens e Mulheres",
  illustration,
  illustrationAlt: "Bakala - homme",
  rows: 13,
  cols: 9,
  clues: [
    // Verticals
    { num: 1, direction: "down",  row: 0, col: 8, answer: "NGELA",   mandombe: "ngela",   fr: "argent",        en: "money",  pt: "dinheiro" },
    { num: 2, direction: "down",  row: 6, col: 0, answer: "BAKALA",  mandombe: "bakala",  fr: "hommes",        en: "men",    pt: "homens" },
    { num: 3, direction: "down",  row: 6, col: 2, answer: "BAKENTO", mandombe: "bakentu", fr: "femmes",        en: "women",  pt: "mulheres" },
    { num: 6, direction: "down",  row: 7, col: 5, answer: "KALA",    mandombe: "kala",    fr: "refuser, nier", en: "to refuse, to deny", pt: "recusar, negar" },
    // Horizontals
    { num: 4, direction: "across", row: 1, col: 1, answer: "BAKALA",  mandombe: "bakala",  fr: "homme",                       en: "man",                              pt: "homem" },
    { num: 5, direction: "across", row: 3, col: 1, answer: "MUKENTO", mandombe: "mukentu", fr: "femme",                       en: "woman",                            pt: "mulher" },
    { num: 7, direction: "across", row: 5, col: 4, answer: "BAKA",    mandombe: "baka",    fr: "gagner, atteindre, attraper", en: "to win, to reach, to catch",       pt: "ganhar, alcancar, apanhar" },
  ],
};
