export interface VocabItem {
  lari: string;
  mandombe: string; // accent-free for Mandombe font rendering
  french: string;
  english: string;
  portuguese?: string;
}

export interface ConjugationTable {
  verb: string;
  verbMandombe: string;
  meaning: { fr: string; en: string };
  tense: string;
  rows: { person: string; lari: string; mandombe: string }[];
}

export interface MultipleChoiceQuestion {
  type: "multiple-choice";
  question: string;
  questionMandombe?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface MatchingQuestion {
  type: "matching";
  instruction: string;
  pairs: { left: string; right: string }[];
}

export interface FillInBlankQuestion {
  type: "fill-in-blank";
  sentence: string;
  sentenceMandombe?: string;
  blank: string;
  hint?: string;
}

export type Exercise = MultipleChoiceQuestion | MatchingQuestion | FillInBlankQuestion;

export interface Lesson {
  id: string;
  title: string;
  titleLari: string;
  titleMandombe: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  icon: string;
  vocabulary?: VocabItem[];
  conjugations?: ConjugationTable[];
  phrases?: { lari: string; mandombe: string; french: string; english: string }[];
  exercises: Exercise[];
}

export const lessons: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings & Introductions",
    titleLari: "Mbote na Meno",
    titleMandombe: "Mbote na Meno",
    description: "Learn how to greet people, introduce yourself, and ask about someone's well-being in Kikongo Lari.",
    level: "beginner",
    icon: "👋",
    vocabulary: [
      { lari: "Mbote", mandombe: "Mbote", french: "Bonjour", english: "Hello" },
      { lari: "Lumbu kia kibote", mandombe: "Lumbu kia kibote", french: "Bonne journée", english: "Have a nice day" },
      { lari: "Mpimpa ya mbote", mandombe: "Mpimpa ya mbote", french: "Bonne nuit", english: "Good night" },
      { lari: "Lala bua mbote", mandombe: "Lala bua mbote", french: "Dors bien", english: "Sleep well" },
      { lari: "Nkumbu", mandombe: "Nkumbu", french: "Nom", english: "Name" },
      { lari: "Meno", mandombe: "Meno", french: "Je, moi", english: "I, me" },
      { lari: "Ani", mandombe: "Ani", french: "Mon, ma", english: "My, mine" },
      { lari: "Mpangi", mandombe: "Mpangi", french: "Frère, soeur", english: "Brother, sister" },
      { lari: "Ndinku", mandombe: "Ndinku", french: "Ami(e)", english: "Friend" },
    ],
    phrases: [
      { lari: "Mbote mpangi, nkumbu aku nani?", mandombe: "Mbote mpangi, nkumbu aku nani?", french: "Bonjour frère, quel est ton nom ?", english: "Hello brother, what is your name?" },
      { lari: "Mbote aku mpangi", mandombe: "Mbote aku mpangi", french: "Bonjour à toi frère", english: "Hello to you brother" },
      { lari: "Ta kuambileno", mandombe: "Ta kuambileno", french: "Bonjour à vous", english: "Good morning to you all" },
      { lari: "Kolele?", mandombe: "Kolele?", french: "Ça va ?", english: "How are you?" },
      { lari: "Nkolele", mandombe: "Nkolele", french: "Je vais bien", english: "I'm fine" },
      { lari: "Meno, mpe nkolele", mandombe: "Meno, mpe nkolele", french: "Moi aussi, je vais bien", english: "I'm also fine" },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "How do you say 'Hello' in Kikongo Lari?",
        options: ["Matondo", "Mbote", "Nkolele", "Mpangi"],
        correctIndex: 1,
        explanation: "Mbote is the standard greeting in Kikongo Lari.",
      },
      {
        type: "multiple-choice",
        question: "What does 'Kolele?' mean?",
        questionMandombe: "Kolele?",
        options: ["What is your name?", "How are you?", "Good night", "Thank you"],
        correctIndex: 1,
      },
      {
        type: "matching",
        instruction: "Match the Kikongo Lari greetings with their English translations.",
        pairs: [
          { left: "Mbote", right: "Hello" },
          { left: "Nkolele", right: "I'm fine" },
          { left: "Mpimpa ya mbote", right: "Good night" },
          { left: "Nkumbu", right: "Name" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Mbote mpangi, ___ aku nani?",
        sentenceMandombe: "Mbote mpangi, ___ aku nani?",
        blank: "nkumbu",
        hint: "This word means 'name'",
      },
      {
        type: "multiple-choice",
        question: "How would you respond to 'Kolele?' if you are doing well?",
        options: ["Mbote", "Matondo", "Nkolele", "Lumbu kia kibote"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "gratitude",
    title: "Gratitude — Matondo",
    titleLari: "Matondo",
    titleMandombe: "Matondo",
    description: "Learn to express gratitude and conjugate the verb 'tondele' (to thank) in present, past, future, and imperative.",
    level: "beginner",
    icon: "🙏",
    vocabulary: [
      { lari: "Matondo", mandombe: "Matondo", french: "Merci", english: "Thank you" },
      { lari: "Ntondele", mandombe: "Ntondele", french: "Je te remercie", english: "I thank you" },
      { lari: "Ntondele bua buingi", mandombe: "Ntondele bua buingi", french: "Je te remercie beaucoup", english: "I thank you very much" },
      { lari: "Matondo kua nzambi", mandombe: "Matondo kua nzambi", french: "Je te remercie infiniment", english: "Thank you from the bottom of my heart" },
    ],
    conjugations: [
      {
        verb: "Tondele",
        verbMandombe: "Tondele",
        meaning: { fr: "Remercier", en: "To thank" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "ni tondele", mandombe: "ni tondele" },
          { person: "Tu", lari: "tondele", mandombe: "tondele" },
          { person: "Il/Elle", lari: "tondele", mandombe: "tondele" },
          { person: "Nous", lari: "tu tondele", mandombe: "tu tondele" },
          { person: "Vous", lari: "lu tondele", mandombe: "lu tondele" },
          { person: "Ils/Elles", lari: "ba tondele", mandombe: "ba tondele" },
        ],
      },
      {
        verb: "Tondele",
        verbMandombe: "Tondele",
        meaning: { fr: "Remercier", en: "To thank" },
        tense: "Past",
        rows: [
          { person: "Je", lari: "na tondele", mandombe: "na tondele" },
          { person: "Tu", lari: "wa tondele", mandombe: "wa tondele" },
          { person: "Il/Elle", lari: "wa tondele", mandombe: "wa tondele" },
          { person: "Nous", lari: "tua tondele", mandombe: "tua tondele" },
          { person: "Vous", lari: "lua tondele", mandombe: "lua tondele" },
          { person: "Ils/Elles", lari: "ba tondele", mandombe: "ba tondele" },
        ],
      },
      {
        verb: "Tonda",
        verbMandombe: "Tonda",
        meaning: { fr: "Remercier (futur)", en: "To thank (future)" },
        tense: "Future",
        rows: [
          { person: "Je", lari: "mbo ni tonda", mandombe: "mbo ni tonda" },
          { person: "Tu", lari: "mbo tonda", mandombe: "mbo tonda" },
          { person: "Il/Elle", lari: "mbo ka tonda", mandombe: "mbo ka tonda" },
          { person: "Nous", lari: "mbo tu tonda", mandombe: "mbo tu tonda" },
          { person: "Vous", lari: "mbo lu tonda", mandombe: "mbo lu tonda" },
          { person: "Ils/Elles", lari: "mbo ba tonda", mandombe: "mbo ba tonda" },
        ],
      },
    ],
    phrases: [
      { lari: "Ni ku tondele", mandombe: "Ni ku tondele", french: "Je te remercie", english: "I thank you" },
      { lari: "Hana matondo", mandombe: "Hana matondo", french: "Remercie", english: "Thank (imperative)" },
      { lari: "Ta hana matondo", mandombe: "Ta hana matondo", french: "Remercions", english: "Let's thank" },
      { lari: "Mbo ni vutula matondo kue Ta Malonga", mandombe: "Mbo ni vutula matondo kue Ta Malonga", french: "Je remercierai Ta Malonga", english: "I will thank Ta Malonga" },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "How do you say 'Thank you' in Kikongo Lari?",
        options: ["Mbote", "Matondo", "Ntondele", "Nkolele"],
        correctIndex: 1,
      },
      {
        type: "multiple-choice",
        question: "What is the future tense marker in Kikongo Lari?",
        options: ["na", "ta", "mbo", "ba"],
        correctIndex: 2,
        explanation: "'Mbo' is placed before the subject pronoun to form the future tense.",
      },
      {
        type: "fill-in-blank",
        sentence: "___ ni tonda (I will thank)",
        sentenceMandombe: "___ ni tonda",
        blank: "mbo",
        hint: "This is the future tense marker",
      },
      {
        type: "matching",
        instruction: "Match the conjugation with its meaning.",
        pairs: [
          { left: "na tondele", right: "I thanked" },
          { left: "mbo ni tonda", right: "I will thank" },
          { left: "ni tondele", right: "I thank" },
          { left: "ba tondele", right: "They thank" },
        ],
      },
      {
        type: "multiple-choice",
        question: "How would you say 'They will thank' in Kikongo Lari?",
        options: ["ba tondele", "mbo ba tonda", "ba ba tonda", "lu tondele"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "survival-verbs",
    title: "Survival Verbs",
    titleLari: "Zonza Lari",
    titleMandombe: "Zonza Lari",
    description: "Master the essential verbs: to be (ba), to do (sa), to eat (dia), to drink (nua), to be able (lenda), to take (bonga), and to know (zaba).",
    level: "intermediate",
    icon: "💪",
    conjugations: [
      {
        verb: "Ba",
        verbMandombe: "Ba",
        meaning: { fr: "Être", en: "To be" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "nje(na)", mandombe: "nje(na)" },
          { person: "Tu", lari: "we(na)", mandombe: "we(na)" },
          { person: "Il/Elle", lari: "ke(na)", mandombe: "ke(na)" },
          { person: "Nous", lari: "tue(na)", mandombe: "tue(na)" },
          { person: "Vous", lari: "lue(na)", mandombe: "lue(na)" },
          { person: "Ils/Elles", lari: "be(na)", mandombe: "be(na)" },
        ],
      },
      {
        verb: "Sa",
        verbMandombe: "Sa",
        meaning: { fr: "Faire", en: "To do/make" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "ni ta sa", mandombe: "ni ta sa" },
          { person: "Tu", lari: "ta sa", mandombe: "ta sa" },
          { person: "Il/Elle", lari: "ka ta sa", mandombe: "ka ta sa" },
          { person: "Nous", lari: "tu ta sa", mandombe: "tu ta sa" },
          { person: "Vous", lari: "lu ta sa", mandombe: "lu ta sa" },
          { person: "Ils/Elles", lari: "ba ta sa", mandombe: "ba ta sa" },
        ],
      },
      {
        verb: "Dia",
        verbMandombe: "Dia",
        meaning: { fr: "Manger", en: "To eat" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "ni ta dia", mandombe: "ni ta dia" },
          { person: "Tu", lari: "ta dia", mandombe: "ta dia" },
          { person: "Il/Elle", lari: "ka ta dia", mandombe: "ka ta dia" },
          { person: "Nous", lari: "tu ta dia", mandombe: "tu ta dia" },
          { person: "Vous", lari: "lu ta dia", mandombe: "lu ta dia" },
          { person: "Ils/Elles", lari: "ba ta dia", mandombe: "ba ta dia" },
        ],
      },
      {
        verb: "Nua",
        verbMandombe: "Nua",
        meaning: { fr: "Boire", en: "To drink" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "ni ta nua", mandombe: "ni ta nua" },
          { person: "Tu", lari: "ta nua", mandombe: "ta nua" },
          { person: "Il/Elle", lari: "ka ta nua", mandombe: "ka ta nua" },
          { person: "Nous", lari: "tu ta nua", mandombe: "tu ta nua" },
          { person: "Vous", lari: "lu ta nua", mandombe: "lu ta nua" },
          { person: "Ils/Elles", lari: "ba ta nua", mandombe: "ba ta nua" },
        ],
      },
      {
        verb: "Lenda",
        verbMandombe: "Lenda",
        meaning: { fr: "Pouvoir", en: "To be able" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "ndendi", mandombe: "ndendi" },
          { person: "Tu", lari: "lendi", mandombe: "lendi" },
          { person: "Il/Elle", lari: "lendi", mandombe: "lendi" },
          { person: "Nous", lari: "tu lendi", mandombe: "tu lendi" },
          { person: "Vous", lari: "lu lendi", mandombe: "lu lendi" },
          { person: "Ils/Elles", lari: "ba lendi", mandombe: "ba lendi" },
        ],
      },
      {
        verb: "Bonga",
        verbMandombe: "Bonga",
        meaning: { fr: "Prendre", en: "To take" },
        tense: "Past",
        rows: [
          { person: "Je", lari: "mbongele", mandombe: "mbongele" },
          { person: "Tu", lari: "bongele", mandombe: "bongele" },
          { person: "Il/Elle", lari: "bongele", mandombe: "bongele" },
          { person: "Nous", lari: "tu bongele", mandombe: "tu bongele" },
          { person: "Vous", lari: "lu bongele", mandombe: "lu bongele" },
          { person: "Ils/Elles", lari: "ba bongele", mandombe: "ba bongele" },
        ],
      },
      {
        verb: "Zaba",
        verbMandombe: "Zaba",
        meaning: { fr: "Savoir", en: "To know" },
        tense: "Present",
        rows: [
          { person: "Je", lari: "nzebi", mandombe: "nzebi" },
          { person: "Tu", lari: "zebi", mandombe: "zebi" },
          { person: "Il/Elle", lari: "zebi", mandombe: "zebi" },
          { person: "Nous", lari: "tu zebi", mandombe: "tu zebi" },
          { person: "Vous", lari: "lu zebi", mandombe: "lu zebi" },
          { person: "Ils/Elles", lari: "ba zebi", mandombe: "ba zebi" },
        ],
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "What does the verb 'Dia' mean?",
        questionMandombe: "Dia",
        options: ["To drink", "To eat", "To be", "To do"],
        correctIndex: 1,
      },
      {
        type: "multiple-choice",
        question: "How do you say 'I can' (I am able) in Kikongo Lari?",
        options: ["nzebi", "ndendi", "nje", "ni ta sa"],
        correctIndex: 1,
      },
      {
        type: "matching",
        instruction: "Match each verb with its meaning.",
        pairs: [
          { left: "Ba", right: "To be" },
          { left: "Sa", right: "To do" },
          { left: "Dia", right: "To eat" },
          { left: "Nua", right: "To drink" },
          { left: "Zaba", right: "To know" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "Mbo ni ___ (I will eat)",
        sentenceMandombe: "Mbo ni ___",
        blank: "dia",
        hint: "The verb meaning 'to eat'",
      },
      {
        type: "multiple-choice",
        question: "What is the present progressive structure in Kikongo Lari? (e.g., 'I am eating')",
        options: ["mbo + pronoun + verb", "pronoun + ta + verb", "na + verb", "pronoun + verb + ko"],
        correctIndex: 1,
        explanation: "The present progressive uses the marker 'ta' between the subject pronoun and the verb: ni ta dia = I am eating.",
      },
      {
        type: "fill-in-blank",
        sentence: "Ka ___ sa (He is doing)",
        sentenceMandombe: "Ka ___ sa",
        blank: "ta",
        hint: "The present progressive marker",
      },
    ],
  },
  {
    id: "time-expressions",
    title: "Expressing Time — Ntangu",
    titleLari: "Ntangu",
    titleMandombe: "Ntangu",
    description: "Learn to talk about time: today, tomorrow, yesterday, next week, last night, and more.",
    level: "intermediate",
    icon: "⏰",
    vocabulary: [
      { lari: "Lumbu tshi", mandombe: "Lumbu tshi", french: "Aujourd'hui", english: "Today" },
      { lari: "Mbaji", mandombe: "Mbaji", french: "Demain", english: "Tomorrow" },
      { lari: "Mazono", mandombe: "Mazono", french: "Hier", english: "Yesterday" },
      { lari: "Pari tshi", mandombe: "Pari tshi", french: "Ce matin", english: "This morning" },
      { lari: "Bele mpimpa", mandombe: "Bele mpimpa", french: "La nuit dernière", english: "Last night" },
      { lari: "Lumingu lu kwiza", mandombe: "Lumingu lu kwiza", french: "La semaine prochaine", english: "Next week" },
      { lari: "Ngonda yi kwiza", mandombe: "Ngonda yi kwiza", french: "Le mois prochain", english: "Next month" },
      { lari: "Mvula yi kwiza", mandombe: "Mvula yi kwiza", french: "L'année prochaine", english: "Next year" },
      { lari: "Bilumbu bia bianso", mandombe: "Bilumbu bia bianso", french: "Tous les jours", english: "Every day" },
      { lari: "Mpimpa za jingi", mandombe: "Mpimpa za jingi", french: "Plusieurs nuits", english: "Several nights" },
      { lari: "Mpe", mandombe: "Mpe", french: "Aussi", english: "Also" },
    ],
    phrases: [
      { lari: "Mpimpa beto ka tu seke ko", mandombe: "Mpimpa beto ka tu seke ko", french: "La nuit dernière nous ne pouvions pas dormir", english: "Last night we couldn't sleep" },
      { lari: "Ni luaka ka kue bele", mandombe: "Ni luaka ka kue bele", french: "Il s'inquiète", english: "He is worried" },
      { lari: "Kang'eno vungula", mandombe: "Kang'eno vungula", french: "Fermez à clef", english: "Lock the door" },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "How do you say 'Tomorrow' in Kikongo Lari?",
        options: ["Mazono", "Lumbu tshi", "Mbaji", "Pari tshi"],
        correctIndex: 2,
      },
      {
        type: "matching",
        instruction: "Match the time expressions.",
        pairs: [
          { left: "Lumbu tshi", right: "Today" },
          { left: "Mbaji", right: "Tomorrow" },
          { left: "Mazono", right: "Yesterday" },
          { left: "Bele mpimpa", right: "Last night" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "___ lu kwiza (Next week)",
        sentenceMandombe: "___ lu kwiza",
        blank: "lumingu",
        hint: "This word means 'week'",
      },
      {
        type: "multiple-choice",
        question: "What does 'Bilumbu bia bianso' mean?",
        questionMandombe: "Bilumbu bia bianso",
        options: ["Last night", "Next month", "Every day", "This morning"],
        correctIndex: 2,
      },
      {
        type: "multiple-choice",
        question: "How do you say 'Yesterday' in Kikongo Lari?",
        options: ["Mbaji", "Pari tshi", "Mazono", "Bele mpimpa"],
        correctIndex: 2,
      },
    ],
  },
  {
    id: "house-activities",
    title: "House Activities — Bisalu bia mu Nzo",
    titleLari: "Bisalu bia mu Nzo",
    titleMandombe: "Bisalu bia mu Nzo",
    description: "Learn vocabulary and sentences about daily house activities: cooking, cutting, preparing, reading, and going to work.",
    level: "intermediate",
    icon: "🏠",
    vocabulary: [
      { lari: "Lamba", mandombe: "Lamba", french: "Cuisiner", english: "To cook" },
      { lari: "Zenga", mandombe: "Zenga", french: "Couper", english: "To cut" },
      { lari: "Mbala", mandombe: "Mbala", french: "Patates", english: "Potatoes" },
      { lari: "Nzo", mandombe: "Nzo", french: "Maison", english: "House" },
      { lari: "Bisalu", mandombe: "Bisalu", french: "Activités", english: "Activities" },
    ],
    phrases: [
      { lari: "Lamba ni ta lamba", mandombe: "Lamba ni ta lamba", french: "Je suis en train de cuisiner", english: "I'm cooking" },
      { lari: "Mbala ni ta zenga", mandombe: "Mbala ni ta zenga", french: "Je coupe les patates", english: "I'm cutting potatoes" },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "What does 'Lamba' mean?",
        questionMandombe: "Lamba",
        options: ["To cut", "To cook", "To read", "To go"],
        correctIndex: 1,
      },
      {
        type: "matching",
        instruction: "Match the activities.",
        pairs: [
          { left: "Lamba", right: "To cook" },
          { left: "Zenga", right: "To cut" },
          { left: "Nzo", right: "House" },
          { left: "Mbala", right: "Potatoes" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "___ ni ta lamba (I'm cooking)",
        sentenceMandombe: "___ ni ta lamba",
        blank: "lamba",
        hint: "The verb that means 'to cook'",
      },
      {
        type: "multiple-choice",
        question: "How do you express the present progressive in 'I'm cutting'?",
        options: ["ni zenga", "ni ta zenga", "mbo ni zenga", "na zenga"],
        correctIndex: 1,
        explanation: "The progressive uses 'ta' marker: ni ta zenga.",
      },
    ],
  },
  {
    id: "mandombe-dictionary",
    title: "Mandombe Dictionary",
    titleLari: "Nkanda Mandombe",
    titleMandombe: "Nkanda Mandombe",
    description: "Explore essential Kikongo Lari vocabulary written in Mandombe script. Learn words starting with 'Bi-' and their deep cosmological meanings.",
    level: "advanced",
    icon: "📖",
    vocabulary: [
      { lari: "Bibungu", mandombe: "Bibungu", french: "Mottes de terre", english: "Clods of earth" },
      { lari: "Bifu", mandombe: "Bifu", french: "Habitudes", english: "Habits" },
      { lari: "Biba", mandombe: "Biba", french: "Esprits des morts", english: "Spirits of the dead" },
      { lari: "Bika", mandombe: "Bika", french: "Arrêter, permettre", english: "To stop, to allow" },
      { lari: "Bilongo", mandombe: "Bilongo", french: "Nourriture en général", english: "Food in general" },
      { lari: "Bidia", mandombe: "Bidia", french: "Médicament", english: "Medicine" },
      { lari: "Bima", mandombe: "Bima", french: "Choses, outils", english: "Things, tools" },
      { lari: "Bimba", mandombe: "Bimba", french: "Goûter, savourer", english: "To taste, to enjoy food" },
    ],
    phrases: [
      { lari: "/bi/ means the multiplication of the inner being", mandombe: "Bi", french: "/bi/ signifie la multiplication de l'être intérieur", english: "/bi/ means the multiplication of the inner being" },
      { lari: "/i:/ is the primal sound of Mandombe", mandombe: "i", french: "/i:/ est le son primordial du Mandombe", english: "/i:/ is the primal sound of Mandombe" },
    ],
    exercises: [
      {
        type: "multiple-choice",
        question: "What does 'Bilongo' mean?",
        questionMandombe: "Bilongo",
        options: ["Medicine", "Spirits", "Food in general", "Habits"],
        correctIndex: 2,
      },
      {
        type: "matching",
        instruction: "Match the Bi- words with their meanings.",
        pairs: [
          { left: "Bifu", right: "Habits" },
          { left: "Bima", right: "Things, tools" },
          { left: "Bidia", right: "Medicine" },
          { left: "Bimba", right: "To taste" },
        ],
      },
      {
        type: "fill-in-blank",
        sentence: "___ means the multiplication of the inner being",
        blank: "bi",
        hint: "A two-letter syllable prefix",
      },
      {
        type: "multiple-choice",
        question: "What is the singular form of 'Bima'?",
        options: ["Kima/Tshima", "Bika", "Bifu", "Bilongo"],
        correctIndex: 0,
        explanation: "Kima (also vocalized as Tshima) is the singular of Bima.",
      },
    ],
  },
];
