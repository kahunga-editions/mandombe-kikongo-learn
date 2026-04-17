// AUTO-GÉNÉRÉ par scripts/sync-corpus.ts depuis src/data/lessons.ts.
// NE PAS ÉDITER À LA MAIN — relancer `bun run scripts/sync-corpus.ts`.
// Source de vérité côté serveur pour les tools de Mbuta Matondo.

export interface LessonSummary {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  topic: string;
  vocab: { lari: string; french: string }[];
  exercises: { type: string; question: string; answer?: string }[];
}

export const LESSONS_CORPUS: LessonSummary[] = [
  {
    "id": "greetings",
    "title": "Salutations et présentations",
    "level": "beginner",
    "topic": "salutations",
    "vocab": [
      {
        "lari": "Mbote",
        "french": "Bonjour"
      },
      {
        "lari": "Lumbu kia kibote",
        "french": "Bonne journée"
      },
      {
        "lari": "Mpimpa ya mbote",
        "french": "Bonne nuit"
      },
      {
        "lari": "Lala bubote",
        "french": "Dors bien"
      },
      {
        "lari": "Seka bubote",
        "french": "Dors bien"
      },
      {
        "lari": "Tolo tua tu bote",
        "french": "Bonne nuit (sommeil)"
      },
      {
        "lari": "Nkokela",
        "french": "Soir"
      },
      {
        "lari": "Nkokela kua",
        "french": "À ce soir"
      },
      {
        "lari": "Mbaji kua",
        "french": "À demain"
      },
      {
        "lari": "Ntangu ka kua",
        "french": "À un autre moment, à bientôt"
      },
      {
        "lari": "Nkumbu",
        "french": "Nom"
      },
      {
        "lari": "Meno",
        "french": "Je, moi"
      },
      {
        "lari": "Ani",
        "french": "Mon, ma, mes"
      },
      {
        "lari": "Aku",
        "french": "Ton, ta, tes, le tien, les tiens"
      },
      {
        "lari": "Andi",
        "french": "Son, sa, ses, le sien, la sienne, les siennes"
      },
      {
        "lari": "Awu",
        "french": "Leur, leurs"
      },
      {
        "lari": "Mpangi",
        "french": "Cadet, petit frère, petite soeur, le plus jeune"
      },
      {
        "lari": "Yaya",
        "french": "Grand frère, grande soeur, aîné(e)"
      },
      {
        "lari": "Kibushi",
        "french": "La soeur"
      },
      {
        "lari": "Nkaji",
        "french": "Le frère (en général)"
      },
      {
        "lari": "Ndiku",
        "french": "Ami(e)"
      },
      {
        "lari": "Mbote mpangi, nkumbu aku nani?",
        "french": "Bonjour petit frère/petite soeur, quel est ton nom ?"
      },
      {
        "lari": "Mbote aku mpangi",
        "french": "Bonjour à toi petit frère/petite soeur"
      },
      {
        "lari": "Ta kuambileno",
        "french": "Bonjour à vous"
      },
      {
        "lari": "Kolele?",
        "french": "Ça va ?"
      },
      {
        "lari": "Nkolele",
        "french": "Je vais bien"
      },
      {
        "lari": "Meno, mpe nkolele",
        "french": "Moi aussi, je vais bien"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "How do you say 'Hello' in Kikongo Lari?",
        "answer": "Mbote"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kolele?' mean?",
        "answer": "How are you?"
      },
      {
        "type": "matching",
        "question": "Match the Kikongo Lari greetings with their English translations.",
        "answer": "Mbote=Hello, Nkolele=I'm fine, Mpimpa ya mbote=Good night, Nkumbu=Name"
      },
      {
        "type": "matching",
        "question": "Match the farewell expressions with their translations.",
        "answer": "Nkokela kua=See you tonight, Mbaji kua=See you tomorrow, Ntangu ka kua=See you soon, Nkokela=Evening"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbote mpangi, ___ aku nani?",
        "answer": "nkumbu"
      },
      {
        "type": "multiple-choice",
        "question": "How would you respond to 'Kolele?' if you are doing well?",
        "answer": "Nkolele"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Greetings & Introductions"
      }
    ]
  },
  {
    "id": "gratitude",
    "title": "La gratitude — Ntondolo",
    "level": "beginner",
    "topic": "gratitude",
    "vocab": [
      {
        "lari": "Ntondolo",
        "french": "Gratitude"
      },
      {
        "lari": "Matondo",
        "french": "Merci"
      },
      {
        "lari": "Tonda",
        "french": "Remercier"
      },
      {
        "lari": "Vutula matondo",
        "french": "Remercier"
      },
      {
        "lari": "Vutula",
        "french": "Se retourner, renvoyer"
      },
      {
        "lari": "Hana matondo",
        "french": "Remercie (impératif)"
      },
      {
        "lari": "Mpila ya vuturila matondo",
        "french": "La façon de dire merci"
      },
      {
        "lari": "Ntondele",
        "french": "Je te remercie"
      },
      {
        "lari": "Ntondele bua buingi",
        "french": "Je te remercie beaucoup"
      },
      {
        "lari": "Matondo ma sakila",
        "french": "Merci infiniment"
      },
      {
        "lari": "Ni ku tondele",
        "french": "Je te remercie"
      },
      {
        "lari": "Hana matondo",
        "french": "Remercie"
      },
      {
        "lari": "Ta hana matondo",
        "french": "Remercions"
      },
      {
        "lari": "Mbo ni vutula matondo kue Ta Malonga",
        "french": "Je remercierai Ta Malonga"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "How do you say 'Thank you' in Kikongo Lari?",
        "answer": "Matondo"
      },
      {
        "type": "multiple-choice",
        "question": "What is the future tense marker in Kikongo Lari?",
        "answer": "mbo"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ni tonda (I will thank)",
        "answer": "mbo"
      },
      {
        "type": "matching",
        "question": "Match the conjugation with its meaning.",
        "answer": "na tondele=I thanked, mbo ni tonda=I will thank, ni tondele=I thank, ba tondele=They thank"
      },
      {
        "type": "multiple-choice",
        "question": "How would you say 'They will thank' in Kikongo Lari?",
        "answer": "mbo ba tonda"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Gratitude — Ntondolo"
      }
    ]
  },
  {
    "id": "survival-verbs",
    "title": "Verbes de survie",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does the verb 'Dia' mean?",
        "answer": "To eat"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'I can' (I am able) in Kikongo Lari?",
        "answer": "ndendi"
      },
      {
        "type": "matching",
        "question": "Match each verb with its meaning.",
        "answer": "Ba=To be, Sa=To do, Dia=To eat, Nua=To drink"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbo ni ___ (I will eat)",
        "answer": "dia"
      },
      {
        "type": "multiple-choice",
        "question": "What is the present progressive structure in Kikongo Lari? (e.g., 'I am eating')",
        "answer": "pronoun + ta + verb"
      },
      {
        "type": "fill-in-blank",
        "question": "Ka ___ sa (He is doing)",
        "answer": "ta"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Survival Verbs"
      }
    ]
  },
  {
    "id": "time-expressions",
    "title": "Exprimer le temps — Ntangu",
    "level": "intermediate",
    "topic": "time",
    "vocab": [
      {
        "lari": "Lumbu tshi",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Mbaji",
        "french": "Demain"
      },
      {
        "lari": "Mazono",
        "french": "Hier"
      },
      {
        "lari": "Pari tshi",
        "french": "Ce matin"
      },
      {
        "lari": "Bele mpimpa",
        "french": "La nuit dernière"
      },
      {
        "lari": "Lumingu lu kwiza",
        "french": "La semaine prochaine"
      },
      {
        "lari": "Ngonda yi kwiza",
        "french": "Le mois prochain"
      },
      {
        "lari": "Mvula yi kwiza",
        "french": "L'année prochaine"
      },
      {
        "lari": "Bilumbu bia bianso",
        "french": "Tous les jours"
      },
      {
        "lari": "Mpimpa za jingi",
        "french": "Plusieurs nuits"
      },
      {
        "lari": "Mpe",
        "french": "Aussi"
      },
      {
        "lari": "Mvula",
        "french": "Année"
      },
      {
        "lari": "Mvula ya yokele",
        "french": "L'année passée"
      },
      {
        "lari": "Muvu",
        "french": "Saison"
      },
      {
        "lari": "Muvu ya yokele",
        "french": "L'an passé"
      },
      {
        "lari": "Mvu",
        "french": "Saison"
      },
      {
        "lari": "Mvu wa nguba",
        "french": "La saison des arachides"
      },
      {
        "lari": "Mvu wa nsafu",
        "french": "La saison des safoux"
      },
      {
        "lari": "Ngonda",
        "french": "Mois"
      },
      {
        "lari": "Ngonda yi kuiza",
        "french": "Le mois à venir"
      },
      {
        "lari": "Lumingu",
        "french": "Semaine"
      },
      {
        "lari": "Lumingu lua yokele",
        "french": "La semaine dernière"
      },
      {
        "lari": "Lumbu tshi",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Lolo",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Laki",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Mpimpa beto ka tu seke ko",
        "french": "La nuit dernière nous ne pouvions pas dormir"
      },
      {
        "lari": "Ni luaka ka kue bele",
        "french": "Il s'inquiète"
      },
      {
        "lari": "Kangeno vungula",
        "french": "Fermez à clef"
      },
      {
        "lari": "Lumbu tshi ku zandu mbele",
        "french": "Aujourd'hui je suis allée faire mes courses"
      },
      {
        "lari": "Lolo muini we ku",
        "french": "Aujourd'hui, il y a du soleil"
      },
      {
        "lari": "Laki di mvula ye ku",
        "french": "Aujourd'hui, il pleut"
      },
      {
        "lari": "Lumbu tshi njele kuna nzo",
        "french": "Aujourd'hui je vais à la maison"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "How do you say 'Tomorrow' in Kikongo Lari?",
        "answer": "Mbaji"
      },
      {
        "type": "matching",
        "question": "Match the time expressions.",
        "answer": "Lumbu tshi=Today, Mbaji=Tomorrow, Mazono=Yesterday, Bele mpimpa=Last night"
      },
      {
        "type": "fill-in-blank",
        "question": "___ lu kwiza (Next week)",
        "answer": "lumingu"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bilumbu bia bianso' mean?",
        "answer": "Every day"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Hier' en Kikongo Lari ?",
        "answer": "Mazono"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mvula' ?",
        "answer": "Year"
      },
      {
        "type": "matching",
        "question": "Associez les mots du temps à leur signification.",
        "answer": "Mvula=Year, Muvu=Season, Ngonsa=Month, Lumbu=Day"
      },
      {
        "type": "fill-in-blank",
        "question": "___ signifie 'année'",
        "answer": "mvula"
      }
    ]
  },
  {
    "id": "time-advanced",
    "title": "Mazuji na Mbaji — Avant-hier & Après-demain",
    "level": "intermediate",
    "topic": "time",
    "vocab": [
      {
        "lari": "Mazuji",
        "french": "Avant-hier"
      },
      {
        "lari": "Muna mbaji",
        "french": "Après-demain"
      },
      {
        "lari": "Lumbu tshatshi",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Lumbu ki",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Lumbu liaki",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Nkokela",
        "french": "Le soir"
      },
      {
        "lari": "Mu pari",
        "french": "Le matin"
      },
      {
        "lari": "Ha manima",
        "french": "À la fin, par la suite"
      },
      {
        "lari": "Mboko",
        "french": "Ensuite, après"
      },
      {
        "lari": "Mini mia mbangala",
        "french": "Les chaleurs de mbangala"
      },
      {
        "lari": "Mvula za jingi",
        "french": "Plusieurs années"
      },
      {
        "lari": "N'mvu mia mingi",
        "french": "Plusieurs années (variante)"
      },
      {
        "lari": "Mazuji ku Mfua NA yele",
        "french": "Avant-hier j'étais à Mfua"
      },
      {
        "lari": "Mazuji ku Mfua nge wele",
        "french": "Avant-hier tu étais à Mfua"
      },
      {
        "lari": "Mazuji ku Mfua yandi bele",
        "french": "Avant-hier il/elle était à Mfua"
      },
      {
        "lari": "Mazuji ku Mfua beto tuele",
        "french": "Avant-hier nous étions à Mfua"
      },
      {
        "lari": "Mazuji ku Mfua beno luele",
        "french": "Avant-hier vous étiez à Mfua"
      },
      {
        "lari": "Mazuji ku Mfua bau bele",
        "french": "Avant-hier ils/elles étaient à Mfua"
      },
      {
        "lari": "Mbaji ku zandu NI kwenda",
        "french": "Demain j'irai au marché"
      },
      {
        "lari": "Mbaji ku Pointe-Noire nge kwiza",
        "french": "Demain tu viendras à Pointe-Noire"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mazuji' ?",
        "answer": "The day before yesterday"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'après-demain' en Kikongo Lari ?",
        "answer": "Muna mbaji"
      },
      {
        "type": "multiple-choice",
        "question": "Dans la phrase 'Mazuji ku Mfua NA yele', qu'indique 'yele' ?",
        "answer": "I was"
      },
      {
        "type": "matching",
        "question": "Associez les expressions temporelles avancées à leur signification.",
        "answer": "Mazuji=The day before yesterday, Muna mbaji=The day after tomorrow, Ha manima=In the end, Mboko=Then, afterwards"
      },
      {
        "type": "matching",
        "question": "Associez les expressions de moment de la journée.",
        "answer": "Nkokela=The evening, Mu pari=In the morning, Mvula za jingi=Several years, Mini mia mbangala=The mbangala heat"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ku Mfua NA yele (Avant-hier j'étais à Mfua)",
        "answer": "mazuji"
      },
      {
        "type": "fill-in-blank",
        "question": "Duka wa dukidi mazono mu ___ ? (Où es-tu sorti hier soir ?)",
        "answer": "nkokela"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Mazuji na Mbaji"
      }
    ]
  },
  {
    "id": "action-verbs-vula",
    "title": "Vula, Djoka, Diata — Verbes d'action",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Vula",
        "french": "Défaire"
      },
      {
        "lari": "Vula kinkuti",
        "french": "Défaire un habit"
      },
      {
        "lari": "Vula nsuki",
        "french": "Défaire les cheveux"
      },
      {
        "lari": "Vula vula",
        "french": "Surtout"
      },
      {
        "lari": "Sa",
        "french": "Mettre, faire"
      },
      {
        "lari": "Shiri",
        "french": "Mettre, faire (variante)"
      },
      {
        "lari": "Djoka",
        "french": "Courir, s'échapper"
      },
      {
        "lari": "Djokele",
        "french": "S'est échappé(e)"
      },
      {
        "lari": "Diata",
        "french": "Marcher, écraser"
      },
      {
        "lari": "Pinzumuka",
        "french": "Glisser des mains"
      },
      {
        "lari": "Burika",
        "french": "Se casser"
      },
      {
        "lari": "Budika",
        "french": "Se casser (variante)"
      },
      {
        "lari": "Duka",
        "french": "Sortir"
      },
      {
        "lari": "Dukidi",
        "french": "Sorti(e)"
      },
      {
        "lari": "Ngantu",
        "french": "De peur que"
      },
      {
        "lari": "Nganti",
        "french": "De peur que (variante)"
      },
      {
        "lari": "Fueti",
        "french": "Devoir (obligation)"
      },
      {
        "lari": "Kelaka",
        "french": "Qui garde"
      },
      {
        "lari": "Nsuki ni ta vula",
        "french": "Je défais les cheveux"
      },
      {
        "lari": "Nsuki zani mvuridi",
        "french": "Mes cheveux sont défaits"
      },
      {
        "lari": "Nge fueti zaba ti",
        "french": "Tu dois savoir que"
      },
      {
        "lari": "Ambe tshima tsho tsha mambu",
        "french": "C'est bien dommage"
      },
      {
        "lari": "Fueti kue tsha kele",
        "french": "Il faut que ce soit là"
      },
      {
        "lari": "Ngati tshi djokele",
        "french": "De peur que ça s'échappe"
      },
      {
        "lari": "Ni ka shiri",
        "french": "Je vais le mettre / faire"
      },
      {
        "lari": "We keti St Pierre kelaka muelo zulu",
        "french": "C'est comme St Pierre qui garde la porte du ciel"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Vula' ?",
        "answer": "To undo"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime 'Fueti' ?",
        "answer": "Obligation (must)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ngantu' ?",
        "answer": "Lest, for fear that"
      },
      {
        "type": "matching",
        "question": "Associez les verbes d'action à leur signification.",
        "answer": "Vula=To undo, Djoka=To run / escape, Diata=To walk / crush, Duka=To go out"
      },
      {
        "type": "matching",
        "question": "Associez les expressions à leur signification.",
        "answer": "Pinzumuka=To slip from hands, Burika=To break, Fueti=Must, Kelaka=Who guards"
      },
      {
        "type": "fill-in-blank",
        "question": "Nge ___ zaba ti (Tu dois savoir que)",
        "answer": "fueti"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Vula, Djoka, Diata"
      }
    ]
  },
  {
    "id": "house-activities",
    "title": "Activités de la maison — Bisalu bia mu Nzo",
    "level": "intermediate",
    "topic": "house",
    "vocab": [
      {
        "lari": "Lamba",
        "french": "Cuisiner"
      },
      {
        "lari": "Zenga",
        "french": "Couper"
      },
      {
        "lari": "Mbala",
        "french": "Patates"
      },
      {
        "lari": "Nzo",
        "french": "Maison"
      },
      {
        "lari": "Bisalu",
        "french": "Activités"
      },
      {
        "lari": "Tshima | Bima",
        "french": "Une chose | Les choses"
      },
      {
        "lari": "Kati",
        "french": "La chambre, l'intérieur"
      },
      {
        "lari": "Mvungula",
        "french": "La clef"
      },
      {
        "lari": "Muinda",
        "french": "La lampe"
      },
      {
        "lari": "Muelo",
        "french": "Une porte"
      },
      {
        "lari": "Mielo",
        "french": "Les portes"
      },
      {
        "lari": "Meza",
        "french": "La table"
      },
      {
        "lari": "Nkuala",
        "french": "La natte, le tapis"
      },
      {
        "lari": "Fofolo",
        "french": "Boîte d'allumettes"
      },
      {
        "lari": "Mbele",
        "french": "Un couteau"
      },
      {
        "lari": "Mbuata",
        "french": "Une bouteille"
      },
      {
        "lari": "Nsinga",
        "french": "Le fil"
      },
      {
        "lari": "Nkuni",
        "french": "Bois de chauffe"
      },
      {
        "lari": "Lamba ni ta lamba",
        "french": "Je suis en train de cuisiner"
      },
      {
        "lari": "Mbala ni ta zenga",
        "french": "Je coupe les patates"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Lamba' ?",
        "answer": "To cook"
      },
      {
        "type": "matching",
        "question": "Associez les activités.",
        "answer": "Lamba=To cook, Zenga=To cut, Nzo=House, Mbala=Potatoes"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ni ta lamba (Je suis en train de cuisiner)",
        "answer": "lamba"
      },
      {
        "type": "multiple-choice",
        "question": "Comment exprimer le présent progressif dans 'Je coupe' ?",
        "answer": "ni ta zenga"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mvungula' ?",
        "answer": "The key"
      },
      {
        "type": "matching",
        "question": "Associez les objets de la maison.",
        "answer": "Mvungula=Key, Muinda=Lamp, Mbele=Knife, Meza=Table"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nkuni' ?",
        "answer": "Firewood"
      },
      {
        "type": "fill-in-blank",
        "question": "___ est le mot Lari pour 'une porte'",
        "answer": "muelo"
      }
    ]
  },
  {
    "id": "mandombe-dictionary",
    "title": "Mots en Bi-",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Bidia",
        "french": "Aliment, nourriture"
      },
      {
        "lari": "Bilongo",
        "french": "Médicaments"
      },
      {
        "lari": "Bima",
        "french": "Choses, outils"
      },
      {
        "lari": "Bimba",
        "french": "Goûter, savourer"
      },
      {
        "lari": "Bika",
        "french": "Abandonner, renoncer"
      },
      {
        "lari": "Bifu",
        "french": "Habitudes"
      },
      {
        "lari": "Biba",
        "french": "Esprits des morts"
      },
      {
        "lari": "Bibungu",
        "french": "Mottes de terre"
      },
      {
        "lari": "Bidiki | Bibidiki",
        "french": "Brique"
      },
      {
        "lari": "Bidila",
        "french": "Ourlet, natte"
      },
      {
        "lari": "Bidima",
        "french": "Flamber, être ardent"
      },
      {
        "lari": "Bidissa",
        "french": "Faire bouillir"
      },
      {
        "lari": "Bidunga",
        "french": "Consternation, bouche bée"
      },
      {
        "lari": "Bibindukulu",
        "french": "Menottes"
      },
      {
        "lari": "Bibila",
        "french": "Hématome"
      },
      {
        "lari": "Bikala",
        "french": "Feu, défunt"
      },
      {
        "lari": "Bikinkita",
        "french": "Bravoure, courage"
      },
      {
        "lari": "Bikinda",
        "french": "Tombe, cimetière"
      },
      {
        "lari": "Bikula",
        "french": "Prophétiser, prédire"
      },
      {
        "lari": "Bikonko bitatu",
        "french": "Triangle"
      },
      {
        "lari": "Bingi",
        "french": "Nombreux"
      },
      {
        "lari": "Binga",
        "french": "Chasser, traquer"
      },
      {
        "lari": "Binsangu",
        "french": "Nouvelles, annonces"
      },
      {
        "lari": "Bisambanu",
        "french": "Six"
      },
      {
        "lari": "Biakati",
        "french": "Entrailles, intestins"
      },
      {
        "lari": "Bi signifie la multiplication de l'etre interieur",
        "french": "/bi/ signifie la multiplication de l'être intérieur"
      },
      {
        "lari": "Nzo ka biadila",
        "french": "Il a hérité la maison"
      },
      {
        "lari": "Beno ngatu lu zonzesz mababa.",
        "french": "Vous risqueriez de faire parler les muets"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bilongo' mean?",
        "answer": "Medicine"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bidia' mean?",
        "answer": "Food in general"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bikinkita' mean?",
        "answer": "Bravery, courage"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bikinda' mean?",
        "answer": "Tomb, cemetery"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Biala' mean?",
        "answer": "To be consecrated, crowned"
      },
      {
        "type": "multiple-choice",
        "question": "What number does 'Bisambanu' represent?",
        "answer": "Six"
      },
      {
        "type": "matching",
        "question": "Match the Bi- nouns with their meanings.",
        "answer": "Bifu=Habits, Bima=Things, tools, Bidia=Food, Bilongo=Medicine"
      },
      {
        "type": "matching",
        "question": "Match these Bi- words with their English meanings.",
        "answer": "Bibindulu=Forgiveness, Bingula=A call, Bikula=To prophesy, Biadila=Heir"
      }
    ]
  },
  {
    "id": "ba-verbs-dictionary",
    "title": "Verbes et actions en Ba-",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Baka",
        "french": "Obtenir, gagner, acquérir"
      },
      {
        "lari": "Bakala | Babakala",
        "french": "Mâle, homme, époux"
      },
      {
        "lari": "Bakisa",
        "french": "Aider, assister, secourir"
      },
      {
        "lari": "Bakula",
        "french": "Expliquer, répondre"
      },
      {
        "lari": "Bala",
        "french": "Enfants"
      },
      {
        "lari": "Baluka",
        "french": "Tourner, retourner"
      },
      {
        "lari": "Balula",
        "french": "Traduire, retourner"
      },
      {
        "lari": "Bamba",
        "french": "Coudre, raccommoder"
      },
      {
        "lari": "Bambuka",
        "french": "Se souvenir"
      },
      {
        "lari": "Bambula",
        "french": "Rappeler, penser à"
      },
      {
        "lari": "Bandumuka",
        "french": "Fuir, détaler"
      },
      {
        "lari": "Bangala",
        "french": "Être déterminé, autoritaire"
      },
      {
        "lari": "Banza",
        "french": "Penser, réfléchir"
      },
      {
        "lari": "Buka",
        "french": "Soigner, traiter"
      },
      {
        "lari": "Bula",
        "french": "Casser, jouer"
      },
      {
        "lari": "Burisa",
        "french": "Faire casser"
      },
      {
        "lari": "Burisa matari",
        "french": "Faire casser des cailloux"
      },
      {
        "lari": "Bumba",
        "french": "Embrasser, enlacer"
      },
      {
        "lari": "Badika",
        "french": "Penser, méditer"
      },
      {
        "lari": "Bakana",
        "french": "Se disputer, se chamailler"
      },
      {
        "lari": "Bagukila / Bahukila",
        "french": "Tomber amoureux, admirer"
      },
      {
        "lari": "Balabala",
        "french": "Route, rue, chemin"
      },
      {
        "lari": "Mbalu",
        "french": "Cheval"
      },
      {
        "lari": "Bandu",
        "french": "Origine, genèse"
      },
      {
        "lari": "Kangama",
        "french": "Colle"
      },
      {
        "lari": "Bambuka moyo",
        "french": "Se rappeler quelque chose"
      },
      {
        "lari": "Baku nsatu",
        "french": "Avoir faim"
      },
      {
        "lari": "Baku nkesi",
        "french": "Se fâcher"
      },
      {
        "lari": "Balumuna ntinu",
        "french": "Courir à toute vitesse"
      },
      {
        "lari": "Bamba mulele",
        "french": "Coudre un pagne"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Baka' mean?",
        "answer": "To obtain, to gain"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bambuka' mean?",
        "answer": "To remember"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Buka' mean?",
        "answer": "To heal, to treat"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bandumuka' mean?",
        "answer": "To flee, to escape"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Banza' mean?",
        "answer": "To think, to reflect"
      },
      {
        "type": "matching",
        "question": "Match the Ba- verbs with their meanings.",
        "answer": "Baka=To obtain, Bamba=To sew, Bambuka=To remember, Banza=To think"
      },
      {
        "type": "matching",
        "question": "Match these Ba- expressions with their meanings.",
        "answer": "Baku nsatu=To be hungry, Baku nkesi=To get angry, Bambuka moyo=To recall, Balumuna ntinu=To run fast"
      },
      {
        "type": "fill-in-blank",
        "question": "___ moyo means 'to recall something'",
        "answer": "bambuka"
      }
    ]
  },
  {
    "id": "bo-bu-glossary",
    "title": "Vocabulaire en Bo- et Bu-",
    "level": "advanced",
    "topic": "bo",
    "vocab": [
      {
        "lari": "Bote",
        "french": "Beau, bon, joli"
      },
      {
        "lari": "Boka",
        "french": "Se développer, prospérer"
      },
      {
        "lari": "Bola",
        "french": "Oignon"
      },
      {
        "lari": "Boma",
        "french": "Crainte, peur"
      },
      {
        "lari": "Bomba",
        "french": "Adorer, supplier"
      },
      {
        "lari": "Bota",
        "french": "Cogner, frapper"
      },
      {
        "lari": "Boteka",
        "french": "Plonger, baptiser"
      },
      {
        "lari": "Bulu",
        "french": "Trou, fossé"
      },
      {
        "lari": "Buka",
        "french": "Soigner, traiter"
      },
      {
        "lari": "Kibuki",
        "french": "Médecin"
      },
      {
        "lari": "Bumuntu",
        "french": "Humanité, bonté"
      },
      {
        "lari": "Bumama",
        "french": "Maternité"
      },
      {
        "lari": "Bumba",
        "french": "Embrasser"
      },
      {
        "lari": "Bulunda",
        "french": "Économie"
      },
      {
        "lari": "Bukulu",
        "french": "Ancien, vieux"
      },
      {
        "lari": "Buhulu",
        "french": "Bêtise, idiotie"
      },
      {
        "lari": "Buyumba",
        "french": "Bêtise, idiotie"
      },
      {
        "lari": "Buzoba",
        "french": "Bêtise, idiotie"
      },
      {
        "lari": "Bukuluntu",
        "french": "Droit d'aînesse, maturité"
      },
      {
        "lari": "Tshikumbi | Bikumbi",
        "french": "Vierge | Vierges"
      },
      {
        "lari": "Kikumbi | Bikumbi",
        "french": "Rite de passage | Rites de passage"
      },
      {
        "lari": "Bote kena",
        "french": "C'est beau / bon"
      },
      {
        "lari": "Bumuntu bua muntu",
        "french": "L'humanité de l'être humain"
      },
      {
        "lari": "Bukulu ba kanda",
        "french": "Les anciens du clan"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bote' mean?",
        "answer": "Beautiful, good"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kibuki' mean?",
        "answer": "Doctor"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bumuntu' mean?",
        "answer": "Humanity, goodness"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kikumbi' refer to?",
        "answer": "A coming-of-age ritual"
      },
      {
        "type": "matching",
        "question": "Match the Bo-/Bu- words with their meanings.",
        "answer": "Bote=Beautiful, Boma=Fear, Buka=To heal, Bumama=Motherhood"
      },
      {
        "type": "matching",
        "question": "Match the derived words.",
        "answer": "Buka=To heal, Kibuki=Doctor, Kumbi=Virgin, Kikumbi=Coming-of-age ritual"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'humanity, goodness' in Kikongo Lari",
        "answer": "bumuntu"
      },
      {
        "type": "fill-in-blank",
        "question": "The word for 'doctor' in Kikongo Lari is ___",
        "answer": "kibuki"
      }
    ]
  },
  {
    "id": "ba-conjugation",
    "title": "Conjugaison de « Être » — Ba",
    "level": "advanced",
    "topic": "conjugaison",
    "vocab": [
      {
        "lari": "Kiese",
        "french": "Content(e), heureux(se), la joie"
      },
      {
        "lari": "Diela",
        "french": "Intelligent"
      },
      {
        "lari": "Mpasi",
        "french": "Difficile, douloureux"
      },
      {
        "lari": "Mbote",
        "french": "Bon, bien"
      },
      {
        "lari": "Mbi",
        "french": "Mauvais"
      },
      {
        "lari": "Nene",
        "french": "Grand"
      },
      {
        "lari": "Fioti",
        "french": "Petit"
      },
      {
        "lari": "Wa wasa ngiena",
        "french": "Je suis bien portant(e)"
      },
      {
        "lari": "Nkolele kwani",
        "french": "Je vais bien"
      },
      {
        "lari": "Mu kiese wena",
        "french": "Tu es content"
      },
      {
        "lari": "Kiese kie naku",
        "french": "Tu es dans la joie"
      },
      {
        "lari": "Mu kiese we(na)",
        "french": "Tu es dans la joie"
      },
      {
        "lari": "Mu nsayi we(na)",
        "french": "Tu es dans la joie"
      },
      {
        "lari": "Mayela me nandi",
        "french": "Il/Elle est intelligent(e)"
      },
      {
        "lari": "Ka tuena ba wasa ko",
        "french": "Nous ne sommes pas en bonne santé"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « je suis » avec le verbe ba ?",
        "answer": "ngiena"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Wa wasa ngiena » ?",
        "answer": "I am doing well / I am in good health"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Ka tuena ba wasa ko » ?",
        "answer": "We are not healthy"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle phrase signifie « Tu es dans la joie » ?",
        "answer": "Mu kiese we(na)"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Il/Elle est intelligent(e) » en Kikongo Lari ?",
        "answer": "Mayela me nandi"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Ka bena mu kiese ko » ?",
        "answer": "They are not happy"
      },
      {
        "type": "fill-in-blank",
        "question": "Kiese ___ (Tu es content)",
        "answer": "wena"
      },
      {
        "type": "fill-in-blank",
        "question": "Wa wasa ___ (Je suis bien portant(e))",
        "answer": "ngiena"
      }
    ]
  },
  {
    "id": "imperative-commands",
    "title": "Impératif et ordres — Tuma",
    "level": "advanced",
    "topic": "imperative",
    "vocab": [
      {
        "lari": "Kanga",
        "french": "Fermer, verrouiller"
      },
      {
        "lari": "Vungula",
        "french": "Ouvrir"
      },
      {
        "lari": "Lala",
        "french": "Dormir"
      },
      {
        "lari": "Duka",
        "french": "Sortir"
      },
      {
        "lari": "Diata",
        "french": "Marcher"
      },
      {
        "lari": "Djoka",
        "french": "Courir, fuir"
      },
      {
        "lari": "Lomba",
        "french": "Demander"
      },
      {
        "lari": "Tala",
        "french": "Regarder"
      },
      {
        "lari": "Kwiza",
        "french": "Venir"
      },
      {
        "lari": "Yimba",
        "french": "Chanter"
      },
      {
        "lari": "Kangeno vungula",
        "french": "Fermez à clef"
      },
      {
        "lari": "Lala bubote",
        "french": "Dors bien"
      },
      {
        "lari": "Duka na nsi",
        "french": "Sors dehors"
      },
      {
        "lari": "Diata mbote",
        "french": "Marche bien"
      },
      {
        "lari": "Kwiza fulu",
        "french": "Viens ici"
      },
      {
        "lari": "Ta lomba",
        "french": "Demandons"
      },
      {
        "lari": "Ta diata",
        "french": "Marchons"
      },
      {
        "lari": "Lu tala",
        "french": "Regardez"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Kanga' mean?",
        "answer": "To close/lock"
      },
      {
        "type": "multiple-choice",
        "question": "Which sentence is an imperative (command)?",
        "answer": "Diata mbote"
      },
      {
        "type": "fill-in-blank",
        "question": "___ bua mbote (Sleep well)",
        "answer": "lala"
      },
      {
        "type": "fill-in-blank",
        "question": "Kwiza ___ (Come here)",
        "answer": "fulu"
      },
      {
        "type": "matching",
        "question": "Match the commands with their meanings.",
        "answer": "Kangeno vungula=Lock the door, Lala bubote=Sleep well, Kwiza fulu=Come here, Diata mbote=Walk carefully"
      },
      {
        "type": "multiple-choice",
        "question": "What would you say? It's bedtime — what do you tell the children?",
        "answer": "Lala bubote"
      },
      {
        "type": "multiple-choice",
        "question": "What would you say? You want everyone to come together and walk.",
        "answer": "Ta diata"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Imperative & Commands — Tuma"
      }
    ]
  },
  {
    "id": "travel-places",
    "title": "Voyages et lieux — Zeba",
    "level": "advanced",
    "topic": "travel",
    "vocab": [
      {
        "lari": "Zeba",
        "french": "Voyager, se promener"
      },
      {
        "lari": "Kwenda",
        "french": "Aller"
      },
      {
        "lari": "Kwiza",
        "french": "Venir"
      },
      {
        "lari": "Mona",
        "french": "Voir"
      },
      {
        "lari": "Mpumbu",
        "french": "Kinshasa (nom traditionnel)"
      },
      {
        "lari": "Matadi",
        "french": "Matadi"
      },
      {
        "lari": "Mfua",
        "french": "Mfua (capitale)"
      },
      {
        "lari": "Linzolo",
        "french": "Linzolo, localité près de Mfua"
      },
      {
        "lari": "Kinkala",
        "french": "Kinkala"
      },
      {
        "lari": "Lubomo",
        "french": "Dolisie (Loubomo)"
      },
      {
        "lari": "Mazuji",
        "french": "Avant-hier"
      },
      {
        "lari": "Mbaji",
        "french": "Demain"
      },
      {
        "lari": "Mazuji ku Mpumbu na bele",
        "french": "Avant-hier je suis allé à Kinshasa"
      },
      {
        "lari": "Mbaji ku Lubomo tu kwenda",
        "french": "Demain nous irons à Dolisie"
      },
      {
        "lari": "Ku Matadi wa bele",
        "french": "Tu es allé à Matadi"
      },
      {
        "lari": "Ku Mfua ka bele",
        "french": "Il est allé à Mfua"
      },
      {
        "lari": "Na kwizi ku Linzolo",
        "french": "Je suis venu de Linzolo"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Mazuji ku Mpumbu na bele' mean?",
        "answer": "The day before yesterday I went to Kinshasa"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'Tomorrow we will go to Dolisie'?",
        "answer": "Mbaji ku Lubomo tu kwenda"
      },
      {
        "type": "fill-in-blank",
        "question": "Ku Matadi ___ bele (You went to Matadi)",
        "answer": "wa"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ku Mpumbu ni kwenda (Tomorrow I will go to Kinshasa)",
        "answer": "mbaji"
      },
      {
        "type": "matching",
        "question": "Match the travel sentences with their translations.",
        "answer": "ku Mpumbu na bele=I went to Kinshasa, ku Mfua ka bele=He went to Brazzaville, mbaji ku Lubomo tu kwenda=Tomorrow we'll go to Dolisie, na kwizi ku Linzolo=I came from Linzolo"
      },
      {
        "type": "multiple-choice",
        "question": "Plan your trip: You want to say 'They went to Mbamu'. Which is correct?",
        "answer": "ku Mbamu ba bele"
      },
      {
        "type": "multiple-choice",
        "question": "Plan your trip: You'll go to Kinkala tomorrow. Which sentence?",
        "answer": "Mbaji ku Kinkala ni kwenda"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Travel & Places — Zeba"
      }
    ]
  },
  {
    "id": "bi-verbs-sounds",
    "title": "Verbes en Bi- : Son, feu et force",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Bieka",
        "french": "Bénir, consacrer, mettre à part"
      },
      {
        "lari": "Sema",
        "french": "Bénir"
      },
      {
        "lari": "Bieko",
        "french": "Béni, saint, sacré"
      },
      {
        "lari": "Tumbu",
        "french": "Béni, saint, sacré"
      },
      {
        "lari": "Bielangana",
        "french": "Résonner (cloche, tam-tam)"
      },
      {
        "lari": "Bietana",
        "french": "Sonner, se faire entendre"
      },
      {
        "lari": "Bietasa",
        "french": "Entrechoquer, faire résonner"
      },
      {
        "lari": "Biemba",
        "french": "Tabasser, frapper durement"
      },
      {
        "lari": "Biembeka",
        "french": "Charger, faire en grand"
      },
      {
        "lari": "Biemboka",
        "french": "Résonner au rythme du tam-tam"
      },
      {
        "lari": "Bidima",
        "french": "Flamber, être ardent"
      },
      {
        "lari": "Bidimissa",
        "french": "Attiser le feu"
      },
      {
        "lari": "Bidissa",
        "french": "Faire bouillir"
      },
      {
        "lari": "Bila",
        "french": "Bouillir, bouillonner"
      },
      {
        "lari": "Biota",
        "french": "Assener des coups, attaquer"
      },
      {
        "lari": "Bioka",
        "french": "Éructer, roter"
      },
      {
        "lari": "Biole",
        "french": "Deux (pour les choses)"
      },
      {
        "lari": "Bika",
        "french": "Prédire, deviner, saluer"
      },
      {
        "lari": "Bikanu",
        "french": "Se lâcher, ne plus se fréquenter"
      },
      {
        "lari": "Bikana",
        "french": "Se saluer"
      },
      {
        "lari": "Bimba",
        "french": "Goûter, déguster, savourer"
      },
      {
        "lari": "Bimbisa",
        "french": "Faire goûter, donner un avant-goût"
      },
      {
        "lari": "Bididika",
        "french": "Entasser, empiler"
      },
      {
        "lari": "Bidika",
        "french": "Accumuler, multiplier"
      },
      {
        "lari": "Bifiengo",
        "french": "Instrument de chasse (pipeau)"
      },
      {
        "lari": "Nzungu yi bididi",
        "french": "La marmite bout"
      },
      {
        "lari": "Bila bu bila ngo",
        "french": "Rugir comme le léopard"
      },
      {
        "lari": "Wa dia bioka wa lembo bioka mfuekene",
        "french": "Savoir s'arrêter quand on est satisfait. Mfuekene = un glouton, quelqu'un qui mange sans partager, qui s'empiffre"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bieka' mean?",
        "answer": "To bless, to consecrate"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bielangana' mean?",
        "answer": "To resonate (bell, drum)"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Biemba' mean?",
        "answer": "To beat up, to strike hard"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bidimissa' mean?",
        "answer": "To stoke the fire"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Nzungu yi bididi' mean?",
        "answer": "The pot is boiling"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bikana' mean?",
        "answer": "To greet each other"
      },
      {
        "type": "multiple-choice",
        "question": "What is a 'Bifiengo'?",
        "answer": "A hunting instrument (pipe whistle)"
      },
      {
        "type": "matching",
        "question": "Match the Bi- sound verbs with their meanings.",
        "answer": "Bielangana=To resonate, Bietana=To ring, Bietasa=To clash together, Biemboka=Drum rhythm"
      }
    ]
  },
  {
    "id": "ba-advanced-verbs",
    "title": "Verbes avancés et expressions en Ba-",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Baba",
        "french": "Muet; carbonisé; croûte"
      },
      {
        "lari": "Mababa",
        "french": "Muets, croûtes (pluriel)"
      },
      {
        "lari": "Babuka",
        "french": "Être frappé, asséner un coup"
      },
      {
        "lari": "Babula / Labula",
        "french": "Cligner de l'œil"
      },
      {
        "lari": "Babumuka",
        "french": "Être surpris"
      },
      {
        "lari": "Papumuka",
        "french": "Être surpris"
      },
      {
        "lari": "Susumuka",
        "french": "Être surpris"
      },
      {
        "lari": "Babisa",
        "french": "Faire brûler, trop griller"
      },
      {
        "lari": "Babonso",
        "french": "Tout le monde"
      },
      {
        "lari": "Babu",
        "french": "Fait de frapper à l'improviste"
      },
      {
        "lari": "Badi",
        "french": "Légume, amarante"
      },
      {
        "lari": "Badika",
        "french": "Penser, méditer, prendre conscience"
      },
      {
        "lari": "Badisa",
        "french": "Durcir, fortifier, augmenter"
      },
      {
        "lari": "Bafu | Mabafu",
        "french": "Petite hache (pirogues, sculpture)"
      },
      {
        "lari": "Bafuka",
        "french": "Être enlevé, décollé, se détacher"
      },
      {
        "lari": "Bafuna",
        "french": "Forcer pour ouvrir"
      },
      {
        "lari": "Bagu / Bahu",
        "french": "Capturé, attrapé"
      },
      {
        "lari": "Baguka / Bahuka",
        "french": "Être pris, attrapé; découvrir"
      },
      {
        "lari": "Bagukisa / Bahukisa",
        "french": "Pousser la séduction à l'admiration"
      },
      {
        "lari": "Bakama",
        "french": "Être surpris, se faire appréhender"
      },
      {
        "lari": "Bakamasa",
        "french": "Secouer énergiquement"
      },
      {
        "lari": "Bakasa",
        "french": "Chercher querelle"
      },
      {
        "lari": "Bakasana",
        "french": "S'entraider, s'assister"
      },
      {
        "lari": "Bakila",
        "french": "Tirer profit, gagner"
      },
      {
        "lari": "Bakitina / Bakishina",
        "french": "Dominer, avoir le dessus / Harceler"
      },
      {
        "lari": "Beno ngatu lu zonzesz mababa.",
        "french": "N'abusez pas de notre patience"
      },
      {
        "lari": "Banda moyo",
        "french": "Bas-ventre"
      },
      {
        "lari": "Banda",
        "french": "Le sud, le bas de"
      },
      {
        "lari": "Tandu",
        "french": "Le haut, le nord"
      },
      {
        "lari": "Londe",
        "french": "En haut de, en hauteur"
      },
      {
        "lari": "Wa ku bandakana wa ku mona mfuilu",
        "french": "Celui qui t'est proche assistera à ta mort"
      },
      {
        "lari": "Bandakana",
        "french": "Être près de, être présent"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Babumuka' mean?",
        "answer": "To be surprised"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Babonso' mean?",
        "answer": "Everyone, everybody"
      },
      {
        "type": "multiple-choice",
        "question": "What is a 'Bafu'?",
        "answer": "A small axe for carving"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bakitina' mean?",
        "answer": "To dominate, to prevail"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bakasana' mean?",
        "answer": "To help each other"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Baki' mean?",
        "answer": "Owner, winner"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bakuka' mean?",
        "answer": "To elucidate, to solve"
      },
      {
        "type": "matching",
        "question": "Match the Ba- verbs of surprise and force.",
        "answer": "Babumuka=To be surprised, Babuka=To be struck, Bakamasa=To shake vigorously, Bakasa=To pick a fight"
      }
    ]
  },
  {
    "id": "bu-abstract-concepts",
    "title": "Concepts abstraits et états en Bu-",
    "level": "advanced",
    "topic": "bu",
    "vocab": [
      {
        "lari": "Budzoki",
        "french": "Être entreprenant, perspicace"
      },
      {
        "lari": "Budzia",
        "french": "Quiétude, tranquillité"
      },
      {
        "lari": "Budzulu",
        "french": "Impatience, hyperactivité"
      },
      {
        "lari": "Budzua",
        "french": "Découragement, déception"
      },
      {
        "lari": "Bunsana",
        "french": "Découragement, déception"
      },
      {
        "lari": "Bufioti",
        "french": "Fait d'être étriqué"
      },
      {
        "lari": "Bufwazi",
        "french": "Gaspillage"
      },
      {
        "lari": "Bufwao",
        "french": "Veuvage"
      },
      {
        "lari": "Bukadi",
        "french": "Jalousie masculine"
      },
      {
        "lari": "Kimpala",
        "french": "Jalousie"
      },
      {
        "lari": "Bukaka",
        "french": "Solitude, tristesse"
      },
      {
        "lari": "Buleke",
        "french": "Jeunesse, adolescence"
      },
      {
        "lari": "Bulembe",
        "french": "Lenteur"
      },
      {
        "lari": "Bulemvo",
        "french": "Humilité, obéissance, respect"
      },
      {
        "lari": "Bulenga",
        "french": "Paresse, nonchalance, oisiveté"
      },
      {
        "lari": "Bulombi",
        "french": "Caractère de ce qui est noir"
      },
      {
        "lari": "Bulunda",
        "french": "Économie"
      },
      {
        "lari": "Bulungi",
        "french": "Anniversaire, fête en mémoire"
      },
      {
        "lari": "Bumbangi",
        "french": "Témoignage"
      },
      {
        "lari": "Bumbaki",
        "french": "Fraude, escroquerie"
      },
      {
        "lari": "Bumbanda",
        "french": "Fait d'être coépouse (polygamie)"
      },
      {
        "lari": "Bumpofo",
        "french": "Lourdeur, paresse, mollesse"
      },
      {
        "lari": "Bumpoto",
        "french": "Oisiveté, fainéantise"
      },
      {
        "lari": "Bumputu",
        "french": "Pauvreté"
      },
      {
        "lari": "Mputu",
        "french": "Pauvre"
      },
      {
        "lari": "Bulemvo bua muntu",
        "french": "L'humilité de l'être humain"
      },
      {
        "lari": "Bumputu ka kena kiese ko",
        "french": "La pauvreté n'est pas une joie"
      },
      {
        "lari": "Bumuntu bua moyo",
        "french": "La bonté du cœur"
      },
      {
        "lari": "Budzia kena mu ntima",
        "french": "La tranquillité est dans le cœur"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bulemvo' mean?",
        "answer": "Humility, obedience, respect"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bumputu' mean?",
        "answer": "Poverty"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Budzoki' mean?",
        "answer": "Being enterprising, perceptive"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bukaka' mean?",
        "answer": "Solitude, sadness"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bumpula' mean?",
        "answer": "Greediness, gluttony"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bumpwana' mean?",
        "answer": "Childhood, immaturity"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Budzia' mean?",
        "answer": "Quietude, tranquility"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bumbangi' mean?",
        "answer": "Testimony, witness"
      }
    ]
  },
  {
    "id": "bi-nature-culture",
    "title": "Bi- Nature, culture et objets",
    "level": "intermediate",
    "topic": "bi",
    "vocab": [
      {
        "lari": "Bideki",
        "french": "Plante (famille Luminaceae)"
      },
      {
        "lari": "Bidekadeka",
        "french": "Plante (famille Poaceae)"
      },
      {
        "lari": "Bifubu",
        "french": "Liane flexible"
      },
      {
        "lari": "Bifuku",
        "french": "Chenilles en groupe"
      },
      {
        "lari": "Bikola",
        "french": "Mélange de plantes (fumigation); légume"
      },
      {
        "lari": "Bikekele",
        "french": "Arbuste (famille Olacaceae)"
      },
      {
        "lari": "Binkambula",
        "french": "Plante (famille Tiliaceae) dont l'écorce sert à faire des ficelles"
      },
      {
        "lari": "Binkila",
        "french": "Genre de vin de table"
      },
      {
        "lari": "Banga",
        "french": "Petite liane (vannerie, alcool)"
      },
      {
        "lari": "Bibanga",
        "french": "Petites lianes (pluriel)"
      },
      {
        "lari": "Bongwa",
        "french": "Sorte de lézard"
      },
      {
        "lari": "Bononongo",
        "french": "Espèce de serpent"
      },
      {
        "lari": "Bukungolo",
        "french": "Champignon comestible"
      },
      {
        "lari": "Bugusu",
        "french": "Espèce de champignon"
      },
      {
        "lari": "Bulundu",
        "french": "Espèce de champignon"
      },
      {
        "lari": "Binokena",
        "french": "Insecte du manguier dont les sécrétions peuvent rendre aveugle"
      },
      {
        "lari": "Binkubudi",
        "french": "Puces de poule"
      },
      {
        "lari": "Bifubuzuka",
        "french": "Éruption cutanée (pieds)"
      },
      {
        "lari": "Bikandu",
        "french": "Protecteur des champs (piège mystique)"
      },
      {
        "lari": "Bikakudi",
        "french": "Objet de délivrance"
      },
      {
        "lari": "Bikuta",
        "french": "Objet pour calmer un bébé"
      },
      {
        "lari": "Bidiki | Bibidiki",
        "french": "Brique"
      },
      {
        "lari": "Bidila",
        "french": "Ourlet, natte"
      },
      {
        "lari": "Biko",
        "french": "Petit paquet"
      },
      {
        "lari": "Bikonko bitatu",
        "french": "Triangle"
      },
      {
        "lari": "Nsatu bikululu",
        "french": "Avoir faim est quotidien"
      },
      {
        "lari": "Bikua bie naku?",
        "french": "Combien d'ignames as-tu ?"
      },
      {
        "lari": "Budisa bibidiki",
        "french": "Faisons fabriquer des briques"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What is a 'Bikandu'?",
        "answer": "A mystical field protector"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Bipidi'?",
        "answer": "Food sent to the fiancée"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bingi' mean?",
        "answer": "Numerous, many"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Bukungolo'?",
        "answer": "An edible mushroom"
      },
      {
        "type": "multiple-choice",
        "question": "What is a 'Banga'?",
        "answer": "A small vine used in basketry"
      },
      {
        "type": "multiple-choice",
        "question": "What are 'Bipopo'?",
        "answer": "Scarifications or vaccines"
      },
      {
        "type": "matching",
        "question": "Match the Bi- plants and natural elements.",
        "answer": "Banga=Small vine, Bifubu=Flexible vine, Bikola=Plant mixture, Bukungolo=Edible mushroom"
      },
      {
        "type": "matching",
        "question": "Match the Bi- animals and creatures.",
        "answer": "Bongwa=Lizard, Bononongo=Snake, Bifuku=Caterpillars, Binokena=Mango tree insect"
      }
    ]
  },
  {
    "id": "ba-movement-body",
    "title": "Ba- Mouvement, corps et transformation",
    "level": "advanced",
    "topic": "ba",
    "vocab": [
      {
        "lari": "Baluka",
        "french": "Virer, tourner, retourner"
      },
      {
        "lari": "Balukila",
        "french": "Se retourner vers quelqu'un"
      },
      {
        "lari": "Balukisa",
        "french": "Mouvement rotatif, tourner"
      },
      {
        "lari": "Balumuka",
        "french": "Hausser le ton, gronder"
      },
      {
        "lari": "Balumuna",
        "french": "Courir vite"
      },
      {
        "lari": "Baluzula",
        "french": "Se retourner dans tous les sens"
      },
      {
        "lari": "Bandumuka",
        "french": "Fuir, détaler, s'échapper"
      },
      {
        "lari": "Bandumuna",
        "french": "Détaler, courir vite"
      },
      {
        "lari": "Bandalala",
        "french": "Se courber, se pencher"
      },
      {
        "lari": "Bandama",
        "french": "Se courber, s'incliner"
      },
      {
        "lari": "Bandidila",
        "french": "Dompter, dominer, persévérer"
      },
      {
        "lari": "Bangala",
        "french": "Faire preuve d'autorité, vaincre"
      },
      {
        "lari": "Bamatana",
        "french": "Être collé, être pris"
      },
      {
        "lari": "Bamatasa",
        "french": "Coller, joindre, appliquer"
      },
      {
        "lari": "Kangama",
        "french": "Colle"
      },
      {
        "lari": "Bambakana",
        "french": "Argumenter"
      },
      {
        "lari": "Bamvuka",
        "french": "Se décaper, se décoller tout seul"
      },
      {
        "lari": "Bamvusa",
        "french": "Éclater, ouvrir par effraction"
      },
      {
        "lari": "Bamvuzuka",
        "french": "Se fendiller, se disloquer"
      },
      {
        "lari": "Basa",
        "french": "Fendre"
      },
      {
        "lari": "Basu | Bibasu",
        "french": "Fendre, fondre"
      },
      {
        "lari": "Basuka",
        "french": "Se fendre"
      },
      {
        "lari": "Bandamunwa",
        "french": "Étonnement, bouche bée"
      },
      {
        "lari": "Bandi-bandi",
        "french": "Complètement fermé, bouché"
      },
      {
        "lari": "Banda",
        "french": "Mare d'eau, lac, étang (aussi : le sud, le bas de)"
      },
      {
        "lari": "Balumuna ntinu",
        "french": "Courir à toute vitesse"
      },
      {
        "lari": "Bindakasa",
        "french": "Croiser les pieds; entrelacer"
      },
      {
        "lari": "Bunda ntulu",
        "french": "Bomber le torse"
      },
      {
        "lari": "Botana kopa",
        "french": "Être soûl"
      },
      {
        "lari": "Bambalakana",
        "french": "Longer, côtoyer; éviter"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Balumuna ntinu' mean?",
        "answer": "To run at full speed"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bandumuka' mean?",
        "answer": "To flee, to escape"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bangala' mean?",
        "answer": "To show authority, to triumph"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bandakasa' mean?",
        "answer": "To catch red-handed"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bunda ntulu' mean?",
        "answer": "To puff out one's chest"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Binga' mean?",
        "answer": "To hunt collectively"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kangama' mean?",
        "answer": "Glue"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Binduzuka' mean?",
        "answer": "To disappear, to scatter"
      }
    ]
  },
  {
    "id": "bia-sacred-governance",
    "title": "Sacré et gouvernance — Série Bia",
    "level": "advanced",
    "topic": "bia",
    "vocab": [
      {
        "lari": "Bia",
        "french": "Élu, promu"
      },
      {
        "lari": "Biala",
        "french": "Être consacré, couronné, ordonné"
      },
      {
        "lari": "Biala kimfumu",
        "french": "Devenir chef"
      },
      {
        "lari": "Biadika",
        "french": "Être consacré, couronné; élire"
      },
      {
        "lari": "Biadikila",
        "french": "Léguer, investir"
      },
      {
        "lari": "Biadila",
        "french": "Héritier; s'approprier"
      },
      {
        "lari": "Biadisa",
        "french": "Couronner, ordonner, investir"
      },
      {
        "lari": "Biadisi",
        "french": "Celui qui ordonne, celui qui consacre"
      },
      {
        "lari": "Biakati",
        "french": "Entrailles, intestins, tripes"
      },
      {
        "lari": "Bianga",
        "french": "Appeler, faire venir, convoquer"
      },
      {
        "lari": "Biangula",
        "french": "Appeler à voix haute"
      },
      {
        "lari": "Bingula",
        "french": "Un appel"
      },
      {
        "lari": "Biangusu",
        "french": "Appeler, choisir, être élu, accepter"
      },
      {
        "lari": "Biampamba",
        "french": "Les choses, les biens"
      },
      {
        "lari": "Bibanzulu",
        "french": "Les pensées, les soupçons"
      },
      {
        "lari": "Bibindulu",
        "french": "Pardon"
      },
      {
        "lari": "Kingunza",
        "french": "Ordre initiatique Kongo visant à maîtriser le ki (énergie intérieure) en se connectant à l'énergie féminine (ngu) du cosmos (nza)"
      },
      {
        "lari": "Nzo ka biadila",
        "french": "Il a hérité la maison"
      },
      {
        "lari": "Biala kinganga kia Nzambi",
        "french": "Devenir prêtre"
      },
      {
        "lari": "Biangula nkumbu aku",
        "french": "Appelle ton nom à voix haute"
      },
      {
        "lari": "Nkia mvu(la) wa biala?",
        "french": "Quand as-tu été consacré ?"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Biala kimfumu' mean?",
        "answer": "To become chief"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Biadila' mean?",
        "answer": "Heir; to appropriate"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bianga' mean?",
        "answer": "To call, to summon, to convene"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bibindulu' mean?",
        "answer": "Forgiveness, pardon"
      },
      {
        "type": "multiple-choice",
        "question": "Who is a 'Biadisi'?",
        "answer": "The one who ordains or consecrates"
      },
      {
        "type": "matching",
        "question": "Match the Bia- governance terms.",
        "answer": "Biala=To be consecrated, Biadika=To elect, Biadisa=To crown, Biadila=Heir"
      },
      {
        "type": "matching",
        "question": "Match the calling and summoning vocabulary.",
        "answer": "Bianga=To summon, Biangula=To call loudly, Bingula=A call, Biangusu=To be elected"
      },
      {
        "type": "fill-in-blank",
        "question": "___ kimfumu means 'to become chief'",
        "answer": "biala"
      }
    ]
  },
  {
    "id": "bi-plants-creatures",
    "title": "Plantes, créatures et objets — Série Bi",
    "level": "intermediate",
    "topic": "bi",
    "vocab": [
      {
        "lari": "Bideka",
        "french": "Plantes d'ornementation en général"
      },
      {
        "lari": "Bidekadeka",
        "french": "Plante de la famille des Poaceae"
      },
      {
        "lari": "Bidiki | Bibidiki",
        "french": "Brique"
      },
      {
        "lari": "Nkuala",
        "french": "Natte"
      },
      {
        "lari": "Bibila",
        "french": "Hématome, sang coagulé suite à un choc"
      },
      {
        "lari": "Bifubu",
        "french": "Espèce de liane flexible"
      },
      {
        "lari": "Bifuku",
        "french": "Chenilles vivant en groupe"
      },
      {
        "lari": "Bikekele",
        "french": "Plante comestible"
      },
      {
        "lari": "Bitshinda",
        "french": "Cimetière, nécropole"
      },
      {
        "lari": "Bikola",
        "french": "Légumes à feuille, plantes pour fumigation"
      },
      {
        "lari": "Bikonko bitatu",
        "french": "Triangle"
      },
      {
        "lari": "Bikuta",
        "french": "Objet pour calmer un bébé"
      },
      {
        "lari": "Binkambula",
        "french": "Plante de la famille des Tiliaceae dont l'écorce sert à faire des ficelles"
      },
      {
        "lari": "Binkila",
        "french": "Genre de vin de table"
      },
      {
        "lari": "Binokena",
        "french": "Insecte du manguier dont les sécrétions peuvent rendre aveugle"
      },
      {
        "lari": "Binsangu",
        "french": "Nouvelle, annonce, popularité"
      },
      {
        "lari": "Bipopo",
        "french": "Scarification au niveau des joues"
      },
      {
        "lari": "Tshikonko",
        "french": "Le coin"
      },
      {
        "lari": "Bikonko",
        "french": "Les coins"
      },
      {
        "lari": "Nzenze",
        "french": "Le grillon"
      },
      {
        "lari": "Ntunga",
        "french": "La tique"
      },
      {
        "lari": "Lunguenia | Tunguenia",
        "french": "Caméléon(s)"
      },
      {
        "lari": "Lukami | Nkami",
        "french": "Fourmi rouge"
      },
      {
        "lari": "Ngonda",
        "french": "Les règles"
      },
      {
        "lari": "Mundengué | Minengue",
        "french": "Le corossol(s)"
      },
      {
        "lari": "Budisa bibidiki",
        "french": "Faisons fabriquer des briques"
      },
      {
        "lari": "Nsangu za mbote",
        "french": "Les bonnes nouvelles"
      },
      {
        "lari": "Bikonko bitatu bia bi nene",
        "french": "Un grand triangle"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Bitshinda' ?",
        "answer": "A cemetery"
      },
      {
        "type": "multiple-choice",
        "question": "Que sont les 'Bifuku' ?",
        "answer": "Caterpillars living in groups"
      },
      {
        "type": "matching",
        "question": "Associez les plantes et objets naturels.",
        "answer": "Bideka=Ornamental plants, Bikekele=Edible plant, Binkambula=Tiliaceae plant (bark for string), Bifubu=Flexible liana"
      },
      {
        "type": "matching",
        "question": "Associez les objets du quotidien.",
        "answer": "Bidiki=Brick, Nkuala=Mat, Bikuta=Baby calming object, Bipopo=Scarification on cheeks"
      },
      {
        "type": "fill-in-blank",
        "question": "___ bitatu signifie 'triangle' en Kikongo Lari",
        "answer": "bikonko"
      },
      {
        "type": "fill-in-blank",
        "question": "___ signifie 'nouvelle, annonce' en Kikongo Lari",
        "answer": "binsangu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Plants, Creatures & Objects — Bi Series"
      }
    ]
  },
  {
    "id": "ba-emotions-disputes",
    "title": "Émotions, actions et disputes — Série Ba",
    "level": "intermediate",
    "topic": "ba",
    "vocab": [
      {
        "lari": "Baba",
        "french": "Muet; être carbonisé; croûte"
      },
      {
        "lari": "Babuka",
        "french": "Être frappé, asséner un coup"
      },
      {
        "lari": "Babumuka",
        "french": "Être surpris"
      },
      {
        "lari": "Babula / Labula",
        "french": "Cligner de l'oeil"
      },
      {
        "lari": "Babisa",
        "french": "Être cuit avec une croûte, faire brûler"
      },
      {
        "lari": "Babonso",
        "french": "Tout le monde"
      },
      {
        "lari": "Bakana",
        "french": "Se disputer, se chamailler"
      },
      {
        "lari": "Bakasa",
        "french": "Chercher querelle, disputer"
      },
      {
        "lari": "Bakasana",
        "french": "S'entraider, s'assister"
      },
      {
        "lari": "Bakisa",
        "french": "Aider, assister, porter secours"
      },
      {
        "lari": "Bakitina / Bakishina",
        "french": "Dominer, avoir le dessus"
      },
      {
        "lari": "Bakala | Babakala",
        "french": "Mâle, garçon, homme; mari"
      },
      {
        "lari": "Baki | Bibaki",
        "french": "Possesseur, vainqueur"
      },
      {
        "lari": "Bakila",
        "french": "Tirer profit, gagner"
      },
      {
        "lari": "Bakuka",
        "french": "Avoir élucidé, trouver une solution"
      },
      {
        "lari": "Bakula",
        "french": "Expliquer, donner une réponse à un proverbe"
      },
      {
        "lari": "Bamatana",
        "french": "Être collé, être pris"
      },
      {
        "lari": "Bamatasa",
        "french": "Coller, joindre, appliquer"
      },
      {
        "lari": "Bamika",
        "french": "Boucher des fissures, crépir"
      },
      {
        "lari": "Kangama",
        "french": "Colle"
      },
      {
        "lari": "Baku nkesi",
        "french": "Se fâcher"
      },
      {
        "lari": "Baku nsatu",
        "french": "Avoir faim"
      },
      {
        "lari": "Babonso ba kwiza",
        "french": "Tout le monde va venir"
      },
      {
        "lari": "Bakana na mpangi",
        "french": "Se disputer avec un cadet"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bakana' mean?",
        "answer": "To argue, to quarrel"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bakisa' mean?",
        "answer": "To help, to assist, to rescue"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Babumuka' mean?",
        "answer": "To be surprised"
      },
      {
        "type": "multiple-choice",
        "question": "What is a 'Bakala'?",
        "answer": "A male, boy, man; husband"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bakuka' mean?",
        "answer": "To have solved, to find a solution"
      },
      {
        "type": "matching",
        "question": "Match the Ba- dispute and help verbs.",
        "answer": "Bakana=To quarrel, Bakasa=To pick a fight, Bakisa=To help, Bakasana=To help each other"
      },
      {
        "type": "matching",
        "question": "Match the Ba- physical action verbs.",
        "answer": "Babuka=To be struck, Babula=To wink, Bamatasa=To glue, Bamika=To plaster"
      },
      {
        "type": "fill-in-blank",
        "question": "___ nkesi means 'to get angry'",
        "answer": "baku"
      }
    ]
  },
  {
    "id": "bo-physical-world",
    "title": "Monde physique et actions — Série Bo",
    "level": "intermediate",
    "topic": "bo",
    "vocab": [
      {
        "lari": "Bota",
        "french": "Cogner, frapper, jeter à terre"
      },
      {
        "lari": "Botana",
        "french": "Heurter, se cogner, buter"
      },
      {
        "lari": "Botasa",
        "french": "Heurter, cogner, entrechoquer"
      },
      {
        "lari": "Bote",
        "french": "Beau, bon, joli, acceptable"
      },
      {
        "lari": "Boteka",
        "french": "Plonger, immerger; baptiser"
      },
      {
        "lari": "Botonga",
        "french": "Réduire en bouillie"
      },
      {
        "lari": "Boka",
        "french": "Se développer, prospérer, réussir"
      },
      {
        "lari": "Bokesa",
        "french": "Faire prospérer, augmenter, fructifier"
      },
      {
        "lari": "Bola",
        "french": "Oignon"
      },
      {
        "lari": "Bole",
        "french": "Deux"
      },
      {
        "lari": "Boma",
        "french": "Crainte, peur"
      },
      {
        "lari": "Bomba",
        "french": "Adorer, supplier"
      },
      {
        "lari": "Bombe",
        "french": "Cendre"
      },
      {
        "lari": "Bondama",
        "french": "Être trempé, être mouillé"
      },
      {
        "lari": "Bondeka",
        "french": "Faire macérer, tremper, plonger"
      },
      {
        "lari": "Bondolela",
        "french": "Supplier ardemment, implorer"
      },
      {
        "lari": "Boboka",
        "french": "S'affaler, s'effondrer"
      },
      {
        "lari": "Bongota",
        "french": "Parler avec une grosse voix"
      },
      {
        "lari": "Bote kena",
        "french": "C'est beau / bon"
      },
      {
        "lari": "Bole bantu",
        "french": "Deux personnes"
      },
      {
        "lari": "Boka na bisalu",
        "french": "Prospérer dans le travail"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Bote' mean?",
        "answer": "Beautiful, good, pretty"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Boka' mean?",
        "answer": "To develop, to prosper, to succeed"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bondolela' mean?",
        "answer": "To beg ardently, to implore"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Boteka' mean?",
        "answer": "To plunge, to immerse; to baptize"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Bola'?",
        "answer": "Onion"
      },
      {
        "type": "matching",
        "question": "Match the Bo- striking and motion verbs.",
        "answer": "Bota=To hit, to strike, Botana=To bump, to collide, Botasa=To knock together, Botonga=To reduce to mush"
      },
      {
        "type": "matching",
        "question": "Match the Bo- water and spiritual verbs.",
        "answer": "Bondama=To be soaked, Bondeka=To steep, to soak, Bondolela=To implore, Bomba=To worship"
      },
      {
        "type": "fill-in-blank",
        "question": "___ kena means 'it is beautiful / good'",
        "answer": "bote"
      }
    ]
  },
  {
    "id": "bu-social-spiritual",
    "title": "Vie sociale et spirituelle — Série Bu",
    "level": "advanced",
    "topic": "bu",
    "vocab": [
      {
        "lari": "Buntuadi",
        "french": "Alliance, entente, union communautaire"
      },
      {
        "lari": "Bunzambi",
        "french": "Déité, divinité; comportement pieux"
      },
      {
        "lari": "Bunsonga",
        "french": "Sagesse, bon sens, bonne éducation"
      },
      {
        "lari": "Bunsunga",
        "french": "Intelligence, valeur humaine"
      },
      {
        "lari": "Bunsompi",
        "french": "Habitude d'emprunter, dénuement"
      },
      {
        "lari": "Bunsuza",
        "french": "Adultère, luxure, infidélité"
      },
      {
        "lari": "Bunsuiki",
        "french": "Corruption, pot-de-vin"
      },
      {
        "lari": "Buntete",
        "french": "Fait d'être le premier, priorité"
      },
      {
        "lari": "Buntidi",
        "french": "Mauvais caractère, entêtement, sauvagerie"
      },
      {
        "lari": "Buntoko",
        "french": "Beauté, jeunesse, élégance"
      },
      {
        "lari": "Bunene",
        "french": "Grandeur, largeur, volume, importance"
      },
      {
        "lari": "Bunfunya",
        "french": "Malveillance"
      },
      {
        "lari": "Bunkuta",
        "french": "Peur, crainte, inquiétude, frayeur"
      },
      {
        "lari": "Bunkunzu",
        "french": "Crudité; fait d'être vert, non mûr; vivant"
      },
      {
        "lari": "Bunkundubulu",
        "french": "Nudité"
      },
      {
        "lari": "Bunutnu",
        "french": "Vieillesse"
      },
      {
        "lari": "Bunganga",
        "french": "Savoir du nganga, médecine Kongo"
      },
      {
        "lari": "Bukuluntu",
        "french": "Ancienneté, droit d'aînesse, maturité"
      },
      {
        "lari": "Bukungolo",
        "french": "Espèce de champignon comestible"
      },
      {
        "lari": "Bunzadi",
        "french": "Parenté par alliance"
      },
      {
        "lari": "Bunsonga bua muntu",
        "french": "La sagesse de l'être humain"
      },
      {
        "lari": "Buntuadi bua kanda",
        "french": "L'union du clan"
      },
      {
        "lari": "Buntoko bua ntoko",
        "french": "La beauté de la jeunesse"
      },
      {
        "lari": "Bunene bua Nzambi",
        "french": "La grandeur de Dieu"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Buntuadi' mean?",
        "answer": "Alliance, agreement, communal union"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bunsonga' mean?",
        "answer": "Wisdom, good sense, good upbringing"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Buntoko' mean?",
        "answer": "Beauty, youthfulness, elegance"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bunsuiki' mean?",
        "answer": "Corruption, bribery"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bunganga' mean?",
        "answer": "Knowledge of the nganga, Kongo medicine"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Bukuluntu' mean?",
        "answer": "Seniority, birthright, maturity"
      },
      {
        "type": "matching",
        "question": "Match the Bu- virtues and wisdom.",
        "answer": "Bunsonga=Wisdom, Bunsunga=Intelligence, Buntoko=Beauty, elegance, Bukuluntu=Seniority"
      },
      {
        "type": "matching",
        "question": "Match the Bu- vices and negative traits.",
        "answer": "Bunsuza=Adultery, Bunsuiki=Corruption, Buntidi=Stubbornness, Bunfunya=Malice"
      }
    ]
  },
  {
    "id": "fi-fu-verbs",
    "title": "Fi- / Fu- — Verbes, actions et transformations",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Finkakasa",
        "french": "Rapprocher, serrer, compresser"
      },
      {
        "lari": "Finkakana",
        "french": "Se rapprocher"
      },
      {
        "lari": "Finkana",
        "french": "Se serrer, se tasser"
      },
      {
        "lari": "Finkila",
        "french": "Fusil artisanal léger / Activer le feu"
      },
      {
        "lari": "Finkisa",
        "french": "Faire rapprocher, reculer"
      },
      {
        "lari": "Fiona",
        "french": "Effiler, se glisser"
      },
      {
        "lari": "Fionena",
        "french": "S'effiler"
      },
      {
        "lari": "Fiongonena",
        "french": "Questionner, chercher à savoir"
      },
      {
        "lari": "Fiononoka",
        "french": "S'introduire, se faufiler"
      },
      {
        "lari": "Fiotoka",
        "french": "Se dégonfler, se rétrécir, se faner"
      },
      {
        "lari": "Fioti",
        "french": "Petit, peu"
      },
      {
        "lari": "Fiotesa",
        "french": "Diminuer"
      },
      {
        "lari": "Fiotona",
        "french": "Injurier, insulter"
      },
      {
        "lari": "Fisa",
        "french": "Déguster, exploiter, siroter"
      },
      {
        "lari": "Fisuka",
        "french": "Être démis, fouler"
      },
      {
        "lari": "Fisumuka",
        "french": "Jaillir"
      },
      {
        "lari": "Fitula",
        "french": "Décalotter, ouvrir"
      },
      {
        "lari": "Fiyia",
        "french": "Sucer, déguster"
      },
      {
        "lari": "Fofolo",
        "french": "Allumettes, boîte d'allumettes"
      },
      {
        "lari": "Fokola",
        "french": "S'asseoir avec aisance"
      },
      {
        "lari": "Fusa",
        "french": "Extraire en creusant, moisir, périmer"
      },
      {
        "lari": "Fusuka",
        "french": "Jaillir, sourdre, être rongé"
      },
      {
        "lari": "Fusumuka",
        "french": "Jaillir d'un trou, abonder"
      },
      {
        "lari": "Futa",
        "french": "Payer, rembourser, rémunérer"
      },
      {
        "lari": "Futakana",
        "french": "Être froissé, chiffonné"
      },
      {
        "lari": "Finkakasa bantu",
        "french": "Rapproche les gens"
      },
      {
        "lari": "Futa mbongo",
        "french": "Paye l'argent"
      },
      {
        "lari": "Futumuka na ntoto",
        "french": "Germer de la terre"
      },
      {
        "lari": "Finkisa lumbu",
        "french": "Repousser la date"
      },
      {
        "lari": "Fioti fioti",
        "french": "Petit à petit"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Futa' mean?",
        "answer": "To pay, reimburse"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Finkakasa' mean?",
        "answer": "To bring closer, tighten, compress"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Futumuka' mean?",
        "answer": "To germinate, sprout"
      },
      {
        "type": "matching",
        "question": "Match the Fi- verbs to their meanings.",
        "answer": "Finkakana=To come closer, Fiotoka=To deflate, shrink, Fiongonena=To question, Fiononoka=To sneak in"
      },
      {
        "type": "matching",
        "question": "Match the Fu- verbs to their meanings.",
        "answer": "Futa=To pay, Futila=To rent, Futama=To be folded, Futuka=To swell"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to pay, reimburse, remunerate'",
        "answer": "futa"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to bring closer, tighten, compress'",
        "answer": "finkakasa"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'small, little' in Kikongo Lari",
        "answer": "fioti"
      }
    ]
  },
  {
    "id": "ha-hu-roots",
    "title": "Ha- / Hu- — Lieux, actions et séparation",
    "level": "intermediate",
    "topic": "ha",
    "vocab": [
      {
        "lari": "Ha",
        "french": "Ici, dessus"
      },
      {
        "lari": "Habu",
        "french": "Être fêlé, ébréché"
      },
      {
        "lari": "Habuka",
        "french": "Être ébréché, entamé"
      },
      {
        "lari": "Hala",
        "french": "Lézard, margouillat / Creuser, gratter / Une branche"
      },
      {
        "lari": "Hambana",
        "french": "Se séparer, chacun de son côté"
      },
      {
        "lari": "Hambuka",
        "french": "S'isoler, s'écarter"
      },
      {
        "lari": "Hambula",
        "french": "Écarter, isoler, mettre à part"
      },
      {
        "lari": "Hana",
        "french": "Donner, accorder, distribuer"
      },
      {
        "lari": "Handa",
        "french": "S'initier à un rite"
      },
      {
        "lari": "Hangama",
        "french": "Se tenir debout solidement, être en garde"
      },
      {
        "lari": "Haula",
        "french": "Écarter, entrebâiller"
      },
      {
        "lari": "Hata",
        "french": "Un village"
      },
      {
        "lari": "Mahata",
        "french": "Villages (pluriel)"
      },
      {
        "lari": "Heka",
        "french": "Effleurer du bassin pendant la danse du Wala"
      },
      {
        "lari": "Hema",
        "french": "Haleter, souffler, être impatient"
      },
      {
        "lari": "Hemba",
        "french": "Se moucher"
      },
      {
        "lari": "Hundu",
        "french": "Trou, orifice, ouverture"
      },
      {
        "lari": "Humbu",
        "french": "Un abcès, un furoncle"
      },
      {
        "lari": "Huma",
        "french": "Un lieu, une place / Souffler, se reposer"
      },
      {
        "lari": "Hana mono mamba",
        "french": "Donne-moi de l'eau"
      },
      {
        "lari": "Hambana bua njila",
        "french": "Se séparer au carrefour"
      },
      {
        "lari": "Hangama na ntima",
        "french": "Se tenir ferme de cœur"
      },
      {
        "lari": "Hata dia bakulu",
        "french": "Le village des ancêtres"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Hana' mean?",
        "answer": "To give, grant, distribute"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Hata' mean?",
        "answer": "A village"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Hangama' mean?",
        "answer": "To stand firm, be on guard"
      },
      {
        "type": "matching",
        "question": "Match the Ha-/Hu- words to their meanings.",
        "answer": "Hambana=To separate, Hundu=Hole, opening, Huma=A place / To rest, Handa=To be initiated"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'a village' in Kikongo Lari",
        "answer": "hata"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to give, grant, distribute'",
        "answer": "hana"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to separate, each going their own way'",
        "answer": "hambana"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ha- / Hu- — Places, Actions & Separation"
      }
    ]
  },
  {
    "id": "ka-roots",
    "title": "Ka- — Racines d'action et de communauté",
    "level": "intermediate",
    "topic": "ka",
    "vocab": [
      {
        "lari": "Kaba",
        "french": "Donner, partager, diviser, distribuer"
      },
      {
        "lari": "Kabakana",
        "french": "Être empêché, annihilé"
      },
      {
        "lari": "Kabu",
        "french": "Don, partage, magnificence"
      },
      {
        "lari": "Kaka",
        "french": "Seulement, absolument"
      },
      {
        "lari": "Kakama",
        "french": "Être obstrué, barré, empêché"
      },
      {
        "lari": "Kala",
        "french": "Nier, refuser, éluder, contredire"
      },
      {
        "lari": "Kala",
        "french": "Braise de foyer, charbon"
      },
      {
        "lari": "Kalanga",
        "french": "Frire, griller"
      },
      {
        "lari": "Kama",
        "french": "Titre des belles-filles d'un lignage"
      },
      {
        "lari": "Kamuna",
        "french": "Comprimer, presser pour extraire un liquide"
      },
      {
        "lari": "Kambila",
        "french": "Intercepter, couper la route"
      },
      {
        "lari": "Kana",
        "french": "Décider, projeter une action négative"
      },
      {
        "lari": "Kanda",
        "french": "Étirer, masser, frotter / Le matrilignage, la famille"
      },
      {
        "lari": "Kanga",
        "french": "Lier, fermer, attacher, amarrer"
      },
      {
        "lari": "Kangama",
        "french": "Être lié, attaché, se coaguler"
      },
      {
        "lari": "Kaba biloko na bantu",
        "french": "Partager les choses avec les gens"
      },
      {
        "lari": "Kanda ya bakulu",
        "french": "La famille des ancêtres"
      },
      {
        "lari": "Kanga nzo",
        "french": "Fermer la maison"
      },
      {
        "lari": "Kalanga mbisi",
        "french": "Griller le poisson"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Kaba' mean?",
        "answer": "To share, divide, distribute"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Kanda'?",
        "answer": "The matrilineage, the family"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kanga' mean?",
        "answer": "To tie, close, attach"
      },
      {
        "type": "matching",
        "question": "Match the Ka- words to their meanings.",
        "answer": "Kaba=To share, Kala=To deny / Ember, Kalanga=To fry, grill, Kamuna=To squeeze out"
      },
      {
        "type": "matching",
        "question": "Match these Ka- concepts.",
        "answer": "Kabu=Gift, magnificence, Kama=Daughters-in-law title, Kangama=To be tied, Kakama=To be blocked"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'the matrilineage, the family' in Kikongo Lari",
        "answer": "kanda"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to fry, to grill'",
        "answer": "kalanga"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to tie, close, attach, moor'",
        "answer": "kanga"
      }
    ]
  },
  {
    "id": "ko-ku-roots",
    "title": "Ko- / Ku- — Santé, croissance et mouvement",
    "level": "intermediate",
    "topic": "ko",
    "vocab": [
      {
        "lari": "Kola",
        "french": "Être en bonne santé / Retirer, cueillir / Tousser"
      },
      {
        "lari": "Koma",
        "french": "Clouer, enfoncer"
      },
      {
        "lari": "Komba",
        "french": "Balayer, nettoyer"
      },
      {
        "lari": "Kota",
        "french": "Frapper, toquer / Entrer, pénétrer"
      },
      {
        "lari": "Konta",
        "french": "Compter, peser, calculer"
      },
      {
        "lari": "Kopa",
        "french": "Un verre"
      },
      {
        "lari": "Kotana",
        "french": "Marcher fièrement"
      },
      {
        "lari": "Kotisa",
        "french": "Faire entrer, introduire, importer"
      },
      {
        "lari": "Kubula",
        "french": "Secouer, battre pour nettoyer"
      },
      {
        "lari": "Kuku",
        "french": "Foyer, âtre, cuisine"
      },
      {
        "lari": "Kula",
        "french": "Croître, grandir / Libérer, racheter / Loin"
      },
      {
        "lari": "Kulu",
        "french": "Vieux, ancien / Un pied, une jambe"
      },
      {
        "lari": "Kuma",
        "french": "Endroit, lieu, place"
      },
      {
        "lari": "Kumi",
        "french": "Dix"
      },
      {
        "lari": "Kuna",
        "french": "Planter, semer, enfouir"
      },
      {
        "lari": "Kunga",
        "french": "Gémir, pousser des cris plaintifs"
      },
      {
        "lari": "Kuta",
        "french": "Se taire, être calme / Ancienne monnaie"
      },
      {
        "lari": "Kutu",
        "french": "Une oreille"
      },
      {
        "lari": "Kuwa",
        "french": "Entendre, suivre des conseils"
      },
      {
        "lari": "Kua",
        "french": "Combien ? / Une igname"
      },
      {
        "lari": "Kuabula",
        "french": "Détacher, défaire, décrocher"
      },
      {
        "lari": "Kuanga",
        "french": "Abattre, couper, trancher"
      },
      {
        "lari": "Kuela",
        "french": "Se marier"
      },
      {
        "lari": "Kuelana",
        "french": "S'unir par le mariage"
      },
      {
        "lari": "Kuenda",
        "french": "Aller, partir"
      },
      {
        "lari": "Kula na nzala",
        "french": "Grandir dans la faim"
      },
      {
        "lari": "Kuela na luzolo",
        "french": "Se marier par amour"
      },
      {
        "lari": "Kuenda na njila",
        "french": "Aller sur le chemin"
      },
      {
        "lari": "Komba nzo",
        "french": "Balayer la maison"
      },
      {
        "lari": "Kuwa malongi",
        "french": "Écouter les leçons"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Kuela' mean?",
        "answer": "To marry"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Kuenda' mean?",
        "answer": "To go, to leave"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Kutu'?",
        "answer": "An ear"
      },
      {
        "type": "matching",
        "question": "Match the Ko-/Ku- words to their meanings.",
        "answer": "Kola=To be healthy, Komba=To sweep, Kuna=To plant, Kuwa=To hear"
      },
      {
        "type": "matching",
        "question": "Match these Ko-/Ku- nouns.",
        "answer": "Kuku=Hearth, kitchen, Kopa=A glass, Kuma=Place, location, Kumi=Ten"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to go, to leave' in Kikongo Lari",
        "answer": "kuenda"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to marry'",
        "answer": "kuela"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to sweep, to clean'",
        "answer": "komba"
      }
    ]
  },
  {
    "id": "la-le-lo-roots",
    "title": "La- / Le- / Lo- — Langue, apprentissage et société",
    "level": "advanced",
    "topic": "la",
    "vocab": [
      {
        "lari": "Laba",
        "french": "Prendre, dérober"
      },
      {
        "lari": "Laka",
        "french": "Le cou, la gorge"
      },
      {
        "lari": "Lala",
        "french": "Une orange / Dormir, être couché"
      },
      {
        "lari": "Landa",
        "french": "Suivre"
      },
      {
        "lari": "Landana",
        "french": "Se suivre l'un l'autre"
      },
      {
        "lari": "Landi",
        "french": "Successeur, héritier"
      },
      {
        "lari": "Nlandu|Milandu",
        "french": "Enfant né après les jumeaux, enfants nés après les jumeaux"
      },
      {
        "lari": "Leba",
        "french": "Cajoler, caresser, attendrir"
      },
      {
        "lari": "Lebika",
        "french": "Armer un fusil, tendre un piège"
      },
      {
        "lari": "Nleke, Muleke|Baleke",
        "french": "Un enfant, un cadet / une cadette, des cadets / cadettes"
      },
      {
        "lari": "Lema",
        "french": "Être brûlant de fièvre, flamber"
      },
      {
        "lari": "Lembana",
        "french": "Manquer, échouer, abandonner, râter"
      },
      {
        "lari": "Lemba",
        "french": "Ancienne école initiatique Kongo"
      },
      {
        "lari": "Lulendo|Tulendo",
        "french": "Fierté, orgueil, pouvoir"
      },
      {
        "lari": "Lenga",
        "french": "Flatter, amadouer, attendrir"
      },
      {
        "lari": "Lenzo",
        "french": "Éclat, rayon de lumière"
      },
      {
        "lari": "Loba",
        "french": "Pécher"
      },
      {
        "lari": "Lobola",
        "french": "Cracher, rejeter quelque chose qu'on a dans la bouche"
      },
      {
        "lari": "Loka",
        "french": "Nuire"
      },
      {
        "lari": "Lola",
        "french": "Aboyer"
      },
      {
        "lari": "Lomba",
        "french": "Demander, quémander / Noircir, mûrir"
      },
      {
        "lari": "Londa",
        "french": "Raccommoder, rapiécer, restaurer"
      },
      {
        "lari": "Londe",
        "french": "Une colline, le nord, la hauteur"
      },
      {
        "lari": "Longa",
        "french": "Instruire, enseigner, conseiller"
      },
      {
        "lari": "Longi",
        "french": "Un conseil, une instruction"
      },
      {
        "lari": "Longa bana",
        "french": "Enseigner aux enfants"
      },
      {
        "lari": "Landa mono",
        "french": "Suis-moi"
      },
      {
        "lari": "Londa biloko",
        "french": "Réparer les choses"
      },
      {
        "lari": "Lemba dia Bakulu",
        "french": "L'école initiatique des ancêtres"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Longa' mean?",
        "answer": "To instruct, teach, advise"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Loso'?",
        "answer": "Rice"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Landa' mean?",
        "answer": "To follow"
      },
      {
        "type": "matching",
        "question": "Match the La-/Le-/Lo- words to their meanings.",
        "answer": "Longa=To teach, Lomba=To ask, to beg, Londa=To mend, Leba=To cajole"
      },
      {
        "type": "matching",
        "question": "Match these L- nouns and concepts.",
        "answer": "Landi=Successor, heir, Leke=A child, a youth, Lemba=Initiation school, Lendo=Pride, power"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to instruct, teach, advise'",
        "answer": "longa"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'rice' in Kikongo Lari",
        "answer": "loso"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'to follow' in Kikongo Lari",
        "answer": "landa"
      }
    ]
  },
  {
    "id": "lu-nouns",
    "title": "Lu- — Noms, corps et concepts abstraits",
    "level": "advanced",
    "topic": "lu",
    "vocab": [
      {
        "lari": "Luba",
        "french": "Peuple du Kasai et du Katanga"
      },
      {
        "lari": "Lubaku",
        "french": "Revenu, richesse, capacité financière"
      },
      {
        "lari": "Lubamba",
        "french": "Baguette, tige de rotin"
      },
      {
        "lari": "Lubata",
        "french": "Une tape, une gifle"
      },
      {
        "lari": "Lubu|Mbu",
        "french": "Un moustique, des moustiques"
      },
      {
        "lari": "Ludiatulu, Ndiatulu",
        "french": "Comportement, façon d'être, manière d'agir"
      },
      {
        "lari": "Ludimi|Tudimi",
        "french": "La langue, les langues (organe)"
      },
      {
        "lari": "Ndinga",
        "french": "La langue (idiome)"
      },
      {
        "lari": "Zu|Mazu",
        "french": "La langue, la voix"
      },
      {
        "lari": "Zonza",
        "french": "Parler"
      },
      {
        "lari": "Nzonzolo",
        "french": "La façon de parler"
      },
      {
        "lari": "Zinga",
        "french": "Enrouler"
      },
      {
        "lari": "Jinga",
        "french": "Enrouler"
      },
      {
        "lari": "Jika",
        "french": "Enterrer, inhumer"
      },
      {
        "lari": "Jiku",
        "french": "Frissonnant, frissonné"
      },
      {
        "lari": "Jiku|Majiku",
        "french": "L'âtre, endroit où l'on fait le feu ; un foyer"
      },
      {
        "lari": "Jimbakana",
        "french": "Oublier, perdre, omettre"
      },
      {
        "lari": "Zimbakana",
        "french": "Oublier, disparaître, être perdu"
      },
      {
        "lari": "Zakasa",
        "french": "Asseoir quelqu'un, asseoir un enfant sur une chaise haute"
      },
      {
        "lari": "Zabana",
        "french": "Se connaître mutuellement"
      },
      {
        "lari": "Zabisa",
        "french": "Informer, faire savoir"
      },
      {
        "lari": "Zabikisa",
        "french": "Informer, tenir au courant"
      },
      {
        "lari": "Zimi|Mazimi",
        "french": "Une grossesse"
      },
      {
        "lari": "Jimi|Majimi",
        "french": "Une grossesse ; enceinte"
      },
      {
        "lari": "Zeka",
        "french": "Tourner, tordre, visser"
      },
      {
        "lari": "Lumbu kia mbote",
        "french": "Un bon jour"
      },
      {
        "lari": "Lukaya ya nti",
        "french": "Une feuille d'arbre"
      },
      {
        "lari": "Lulendo ya kanda",
        "french": "La fierté du clan"
      },
      {
        "lari": "Nlumi na nkaji",
        "french": "Le mari et la femme"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What is 'Lukaya'?",
        "answer": "A leaf / A banknote"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Lulendo' mean?",
        "answer": "Self-esteem, pride, sense of power"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Lumbembemba'?",
        "answer": "A butterfly"
      },
      {
        "type": "matching",
        "question": "Match the Lu- body & nature words.",
        "answer": "Ludimi=The tongue, Luketo=The hip, waist, Luse=The face, Lukubi=A smell"
      },
      {
        "type": "matching",
        "question": "Match the Lu- abstract & social concepts.",
        "answer": "Lufua=Death, Lufutu=Payment, salary, Lumoni=Clairvoyance, Lusansu=Education, childcare"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'a butterfly' in Kikongo Lari",
        "answer": "lumbembemba"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'the face' in Kikongo Lari",
        "answer": "luse"
      },
      {
        "type": "fill-in-blank",
        "question": "___ means 'a husband'",
        "answer": "nlumi"
      }
    ]
  },
  {
    "id": "ma-days-time",
    "title": "Mots en Ma-, jours et expressions de temps",
    "level": "beginner",
    "topic": "ma",
    "vocab": [
      {
        "lari": "Lumingu",
        "french": "Dimanche"
      },
      {
        "lari": "Nsila",
        "french": "Lundi"
      },
      {
        "lari": "Misila",
        "french": "Mardi"
      },
      {
        "lari": "Mpika",
        "french": "Mercredi"
      },
      {
        "lari": "Nkoyi",
        "french": "Jeudi"
      },
      {
        "lari": "Bukonzo",
        "french": "Vendredi"
      },
      {
        "lari": "Sabala",
        "french": "Samedi"
      },
      {
        "lari": "Mpimpa",
        "french": "La nuit"
      },
      {
        "lari": "Buisi",
        "french": "La nuit"
      },
      {
        "lari": "Pari",
        "french": "Le matin"
      },
      {
        "lari": "Suka",
        "french": "Le matin"
      },
      {
        "lari": "Ntangu",
        "french": "Midi"
      },
      {
        "lari": "Nkokila",
        "french": "Le soir"
      },
      {
        "lari": "Luaza",
        "french": "Le bruit, le vacarme"
      },
      {
        "lari": "Lueka",
        "french": "La moitié, le flanc, un morceau"
      },
      {
        "lari": "Mabanza",
        "french": "Les pensées (pluriel)"
      },
      {
        "lari": "Mafuta",
        "french": "La graisse"
      },
      {
        "lari": "Makangu",
        "french": "Un amant, une maîtresse"
      },
      {
        "lari": "Makoko",
        "french": "Croûte de plaie"
      },
      {
        "lari": "Mala",
        "french": "Loin, au loin"
      },
      {
        "lari": "Malavu",
        "french": "Le vin de palme"
      },
      {
        "lari": "Malela",
        "french": "Porte-parole de chef"
      },
      {
        "lari": "Malembe",
        "french": "Doucement, lentement"
      },
      {
        "lari": "Mamba",
        "french": "Liquide, eau, jus"
      },
      {
        "lari": "Mana",
        "french": "Finir, achever / Élan, énergie, ruse"
      },
      {
        "lari": "Lumingu kia mbote",
        "french": "Bon dimanche"
      },
      {
        "lari": "Pari ya mbote",
        "french": "Bon matin"
      },
      {
        "lari": "Nkokila ya mbote",
        "french": "Bonsoir"
      },
      {
        "lari": "Malembe malembe",
        "french": "Doucement, doucement"
      },
      {
        "lari": "Mana bisalu",
        "french": "Finir le travail"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What day is 'Lumingu'?",
        "answer": "Sunday"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Ntangu' mean?",
        "answer": "Noon / Midday"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Mamba' mean?",
        "answer": "Liquid, water, juice"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Malembe' mean?",
        "answer": "Gently, slowly"
      },
      {
        "type": "matching",
        "question": "Match the days of the week.",
        "answer": "Lumingu=Sunday, Nsila=Monday, Mpika=Wednesday, Nkoyi=Thursday"
      },
      {
        "type": "matching",
        "question": "Match the time expressions.",
        "answer": "Mpimpa=The night, Pari=The morning, Ntangu=Noon, Nkokila=The evening"
      },
      {
        "type": "matching",
        "question": "Match these Ma- words to their meanings.",
        "answer": "Mafuta=Fat, oil, Malavu=Palm wine, Mamba=Water, liquid, Manga=A mango"
      },
      {
        "type": "fill-in-blank",
        "question": "___ is the Kikongo Lari word for Sunday",
        "answer": "lumingu"
      }
    ]
  },
  {
    "id": "verb-ba-forms",
    "title": "Les secrets du verbe BA",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Kue",
        "french": "Où ?"
      },
      {
        "lari": "Kaka",
        "french": "Les autres"
      },
      {
        "lari": "Kifua|Bifua",
        "french": "Forme, formes"
      },
      {
        "lari": "Kumbi | Makumbi",
        "french": "Voiture | Voitures"
      },
      {
        "lari": "Tshikuku",
        "french": "Cuisine"
      },
      {
        "lari": "Mulunga",
        "french": "Bracelet"
      },
      {
        "lari": "Milunga",
        "french": "Bracelets"
      },
      {
        "lari": "Vunga",
        "french": "Couverture"
      },
      {
        "lari": "Mavunga",
        "french": "Couvertures"
      },
      {
        "lari": "Mapapa",
        "french": "Chaussures"
      },
      {
        "lari": "Yaka",
        "french": "Manioc"
      },
      {
        "lari": "Yaka (yaKA)",
        "french": "Attraper au vol"
      },
      {
        "lari": "Yakisa",
        "french": "Offrir à la vente"
      },
      {
        "lari": "Yala",
        "french": "Couvrir (un lit), dresser (une table)"
      },
      {
        "lari": "Yala",
        "french": "Régner, présider, être un chef"
      },
      {
        "lari": "Yama",
        "french": "Sentir une douleur vive"
      },
      {
        "lari": "Yama",
        "french": "Crier, appeler"
      },
      {
        "lari": "Yambula",
        "french": "Laisser faire, cesser, libérer (un prisonnier), laisser"
      },
      {
        "lari": "Yamuna",
        "french": "Réchauffer (pour la nourriture)"
      },
      {
        "lari": "Yandi",
        "french": "Elle, lui"
      },
      {
        "lari": "Yandula",
        "french": "Faire revenir, faire chauffer doucement, mettre sur le feu rapidement"
      },
      {
        "lari": "Yanika",
        "french": "Faire chauffer au soleil, exposer"
      },
      {
        "lari": "Yika",
        "french": "Ajouter"
      },
      {
        "lari": "Yuku",
        "french": "S'habituer, être habitué(e)"
      },
      {
        "lari": "Yangasa",
        "french": "Étendre"
      },
      {
        "lari": "Kumbi kue diena?",
        "french": "Où est la voiture ?"
      },
      {
        "lari": "Tshikuku mala tshe(na).",
        "french": "La cuisine est loin."
      },
      {
        "lari": "Mulunga kue we(na)?",
        "french": "Où est le bracelet ?"
      },
      {
        "lari": "Milunga kue miena?",
        "french": "Où sont les bracelets ?"
      },
      {
        "lari": "Vunga kue die(na)?",
        "french": "Où est la couverture ?"
      },
      {
        "lari": "Mavunga kue mena?",
        "french": "Où sont les couvertures ?"
      },
      {
        "lari": "Mapapa kue mena?",
        "french": "Où sont les chaussures ?"
      },
      {
        "lari": "Mayaka kue mena?",
        "french": "Où sont les maniocs ?"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "In the basic conjugation of BA, what is the 3rd person singular form?",
        "answer": "ke(na)"
      },
      {
        "type": "multiple-choice",
        "question": "What form of BA is used with 'Mfulu' (bed, singular)?",
        "answer": "yena"
      },
      {
        "type": "multiple-choice",
        "question": "What form of BA is used with 'Mfulu' (beds, plural)?",
        "answer": "zena"
      },
      {
        "type": "multiple-choice",
        "question": "What form of BA is used with 'Mabuku' (books)?",
        "answer": "mena"
      },
      {
        "type": "matching",
        "question": "Match each noun with the correct form of BA used in the 3rd person.",
        "answer": "Nkumbi (car)=diena, Mabuku (books)=mena, Ngombe (ox)=ye(na), Bitunga (baskets)=bie(na)"
      },
      {
        "type": "matching",
        "question": "Match singular and plural forms of BA.",
        "answer": "Mfulu (sg.) → yena=Mfulu (pl.) → zena, Mulunga (sg.) → we(na)=Milunga (pl.) → miena, Nkangabumi (sg.) → yena=Nkangabumi (pl.) → zena, Yaka (sg.) → die(na)=Mayaka (pl.) → mena"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkumbi kue ___? (Where is the car?)",
        "answer": "diena"
      },
      {
        "type": "fill-in-blank",
        "question": "Mavunga kue ___? (Where are the blankets?)",
        "answer": "mena"
      }
    ]
  },
  {
    "id": "tolo-sleep",
    "title": "Le sommeil — Tolo",
    "level": "beginner",
    "topic": "tolo",
    "vocab": [
      {
        "lari": "Tolo",
        "french": "Sommeil"
      },
      {
        "lari": "Ndozi / Ndoji",
        "french": "Un rêve, un songe"
      },
      {
        "lari": "Matompa",
        "french": "La maladie du sommeil"
      },
      {
        "lari": "Ngozi",
        "french": "Les ronflements"
      },
      {
        "lari": "Nimba",
        "french": "Somnoler, sommeiller"
      },
      {
        "lari": "Muaya",
        "french": "Un bâillement"
      },
      {
        "lari": "Ta muaya",
        "french": "Bâiller"
      },
      {
        "lari": "Lala",
        "french": "Dormir, se coucher, passer la nuit"
      },
      {
        "lari": "Seka",
        "french": "Se coucher, être couché"
      },
      {
        "lari": "Lalama",
        "french": "S'étendre, se coucher"
      },
      {
        "lari": "Lalumuka",
        "french": "S'allonger, s'étirer"
      },
      {
        "lari": "Lambalala",
        "french": "Se coucher, faire la sieste"
      },
      {
        "lari": "Lambirika",
        "french": "Mettre en position couchée, étendre, coucher"
      },
      {
        "lari": "Sekesa",
        "french": "Étendre, coucher"
      },
      {
        "lari": "Yalama",
        "french": "Être étendu, couché"
      },
      {
        "lari": "Vumbuka",
        "french": "Réveiller"
      },
      {
        "lari": "Wukula",
        "french": "Bercer"
      },
      {
        "lari": "Yiba / Djuana",
        "french": "Avoir des rapports sexuels"
      },
      {
        "lari": "Mfulu",
        "french": "Un lit"
      },
      {
        "lari": "Vunga",
        "french": "Une couverture"
      },
      {
        "lari": "Mavunga",
        "french": "Couvertures"
      },
      {
        "lari": "Lukuba",
        "french": "Un coussin"
      },
      {
        "lari": "Tukuba",
        "french": "Coussins"
      },
      {
        "lari": "Mulele wa mfulu",
        "french": "Un drap"
      },
      {
        "lari": "Milele mia mfulu",
        "french": "Des draps"
      },
      {
        "lari": "Tolo tue nani",
        "french": "J'ai sommeil"
      },
      {
        "lari": "Tolo tue naku",
        "french": "Tu as sommeil"
      },
      {
        "lari": "Tolo tue nandi",
        "french": "Il/elle a sommeil"
      },
      {
        "lari": "Tolo tue neto",
        "french": "Nous avons sommeil"
      },
      {
        "lari": "Tolo tue neno",
        "french": "Vous avez sommeil"
      },
      {
        "lari": "Tolo tue nawu",
        "french": "Ils/elles ont sommeil"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Tolo' mean?",
        "answer": "Sleep"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'I am sleepy' in Kikongo Lari?",
        "answer": "Tolo tue nani"
      },
      {
        "type": "matching",
        "question": "Match each form with its meaning.",
        "answer": "Tolo tue nani=I am sleepy, Tolo tue naku=You are sleepy, Tolo tue nandi=He/she is sleepy, Tolo tue neto=We are sleepy"
      },
      {
        "type": "fill-in-blank",
        "question": "Tolo tue ___ (I am sleepy)",
        "answer": "nani"
      },
      {
        "type": "fill-in-blank",
        "question": "Tolo tue ___ (They are sleepy)",
        "answer": "nawu"
      },
      {
        "type": "multiple-choice",
        "question": "What is the literal meaning of 'Tolo tue nani'?",
        "answer": "Sleep is with me"
      },
      {
        "type": "matching",
        "question": "Match the sleep-related verbs with their meanings.",
        "answer": "Lala=To sleep, to lie down, Seka=To lie down, to be lying down, Lambalala=To take a nap, Vumbuka=To wake up"
      },
      {
        "type": "matching",
        "question": "Match the bedtime vocabulary with their translations.",
        "answer": "Mfulu=A bed, Vunga=A blanket, Ndozi=A dream, Muaya=A yawn"
      }
    ]
  },
  {
    "id": "nsatu-lemina-hunger-thirst",
    "title": "Faim et soif — Nsatu na Lemina",
    "level": "beginner",
    "topic": "nsatu",
    "vocab": [
      {
        "lari": "Nsatu",
        "french": "Faim"
      },
      {
        "lari": "Lemina",
        "french": "Soif"
      },
      {
        "lari": "Mpuina",
        "french": "Grande soif, passion, envie"
      },
      {
        "lari": "Mante",
        "french": "Salive"
      },
      {
        "lari": "Munua",
        "french": "La bouche"
      },
      {
        "lari": "Minua",
        "french": "Les bouches"
      },
      {
        "lari": "Ngombe",
        "french": "Bœuf"
      },
      {
        "lari": "Banga",
        "french": "La mâchoire"
      },
      {
        "lari": "Nfinini",
        "french": "Les gencives"
      },
      {
        "lari": "Moyo",
        "french": "Le ventre"
      },
      {
        "lari": "Mabundi",
        "french": "Les joues"
      },
      {
        "lari": "Bikola",
        "french": "Légumes"
      },
      {
        "lari": "Loso",
        "french": "Le riz"
      },
      {
        "lari": "Tshikua|Bikua",
        "french": "Igname(s)"
      },
      {
        "lari": "Ntoba",
        "french": "Les feuilles de manioc"
      },
      {
        "lari": "Mbala",
        "french": "Patate douce"
      },
      {
        "lari": "Nungu",
        "french": "Piment (pluriel)"
      },
      {
        "lari": "Lunungu",
        "french": "Piment (singulier)"
      },
      {
        "lari": "N'uandu, Muwandu|Miwandu",
        "french": "Pois d'angole"
      },
      {
        "lari": "Tshintu|Bintu",
        "french": "Ananas"
      },
      {
        "lari": "Dinkondi|Mankondi",
        "french": "Banane(s)"
      },
      {
        "lari": "Lala",
        "french": "Orange (singulier)"
      },
      {
        "lari": "Malala",
        "french": "Oranges (pluriel)"
      },
      {
        "lari": "Nsaba",
        "french": "Jardin"
      },
      {
        "lari": "Nsafu",
        "french": "Le safou"
      },
      {
        "lari": "Nsatu ye nani",
        "french": "J'ai faim"
      },
      {
        "lari": "Nsatu ye naku",
        "french": "Tu as faim"
      },
      {
        "lari": "Nsatu ye nandi",
        "french": "Il/elle a faim"
      },
      {
        "lari": "Nsatu ye neto",
        "french": "Nous avons faim"
      },
      {
        "lari": "Nsatu ye neno",
        "french": "Vous avez faim"
      },
      {
        "lari": "Nsatu ye nawu",
        "french": "Ils/elles ont faim"
      },
      {
        "lari": "Mante ma dia",
        "french": "Bon appétit"
      },
      {
        "lari": "Dia bubote",
        "french": "Mange bien / Bon appétit"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Nsatu' mean?",
        "answer": "Hunger"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'I am hungry' in Kikongo Lari?",
        "answer": "Nsatu ye nani"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Mante ma dia' mean?",
        "answer": "Bon appétit"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Lemina' mean?",
        "answer": "Thirst"
      },
      {
        "type": "matching",
        "question": "Match the food items with their translations.",
        "answer": "Loso=Rice, Ntoba=Cassava leaves, Mbala=Sweet potato, Dinkondi=Banana"
      },
      {
        "type": "matching",
        "question": "Match the body parts with their translations.",
        "answer": "Munua=The mouth, Banga=The jaw, Moyo=The belly, Mabundi=The cheeks"
      },
      {
        "type": "matching",
        "question": "Match each hunger/thirst form with its meaning.",
        "answer": "Nsatu ye nani=I am hungry, Lemina die nani=I am thirsty, Nsatu ye nawu=They are hungry, Mpuina ye nandi=He/she is thirsty"
      },
      {
        "type": "fill-in-blank",
        "question": "Nsatu ye ___ (I am hungry)",
        "answer": "nani"
      }
    ]
  },
  {
    "id": "animals-vocab",
    "title": "Les animaux — Bibulu",
    "level": "beginner",
    "topic": "animals",
    "vocab": [
      {
        "lari": "Tshibulu / Kibulu",
        "french": "Un animal"
      },
      {
        "lari": "Bibulu",
        "french": "Les animaux"
      },
      {
        "lari": "Ngo mbulu",
        "french": "Lion"
      },
      {
        "lari": "Ngo",
        "french": "Léopard"
      },
      {
        "lari": "Ngumbi",
        "french": "Perdrix"
      },
      {
        "lari": "Nkala",
        "french": "Crabe"
      },
      {
        "lari": "Kinienia / Tshinienia",
        "french": "Fourmi"
      },
      {
        "lari": "Binienia",
        "french": "Fourmis"
      },
      {
        "lari": "Tshibubu, Kibubu|Bibubu",
        "french": "Gorille(s)"
      },
      {
        "lari": "Kivuadangu / Tshivuadangu",
        "french": "Canard"
      },
      {
        "lari": "Bivuadangu",
        "french": "Canards"
      },
      {
        "lari": "Nsusu",
        "french": "Poule"
      },
      {
        "lari": "Ngandu",
        "french": "Crocodile"
      },
      {
        "lari": "Nguvu",
        "french": "Hippopotame"
      },
      {
        "lari": "Mpangu",
        "french": "Grenouille"
      },
      {
        "lari": "Nioka",
        "french": "Serpent"
      },
      {
        "lari": "Nkabi",
        "french": "Antilope"
      },
      {
        "lari": "Mfulu",
        "french": "Tortue"
      },
      {
        "lari": "Nkumbi",
        "french": "Un gros rat"
      },
      {
        "lari": "Kuti",
        "french": "Hibou"
      },
      {
        "lari": "Mpakasa",
        "french": "Buffle"
      },
      {
        "lari": "Mbambi",
        "french": "Iguane, dragon"
      },
      {
        "lari": "Mpese",
        "french": "Cafard"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What is the Kikongo Lari word for 'partridge'?",
        "answer": "Ngumbi"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'crab' in Kikongo Lari?",
        "answer": "Nkala"
      },
      {
        "type": "multiple-choice",
        "question": "What is the plural of 'Kinienia' (ant)?",
        "answer": "Binienia"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'gorilla' in Kikongo Lari?",
        "answer": "Tsibubu / Kibubu"
      },
      {
        "type": "multiple-choice",
        "question": "What is the Kikongo Lari word for 'duck'?",
        "answer": "Kivuadangu"
      },
      {
        "type": "matching",
        "question": "Match each Kikongo Lari animal name with its English translation.",
        "answer": "Ngumbi=Partridge, Nkala=Crab, Tsibubu=Gorilla, Kivuadangu=Duck"
      },
      {
        "type": "matching",
        "question": "Match each animal with its plural form.",
        "answer": "Kinienia=Binienia, Kibubu=Bibubu, Kivuadangu=Bivuadangu, Ngo=Ngo"
      },
      {
        "type": "fill-in-blank",
        "question": "The plural of Kinienia (ant) is ___",
        "answer": "Binienia"
      }
    ]
  },
  {
    "id": "numbers",
    "title": "Les nombres — Ntalu",
    "level": "beginner",
    "topic": "nombres",
    "vocab": [
      {
        "lari": "Mpavala",
        "french": "Zéro (0)"
      },
      {
        "lari": "Moshi",
        "french": "Un (1)"
      },
      {
        "lari": "Zole",
        "french": "Deux (2)"
      },
      {
        "lari": "Tatu",
        "french": "Trois (3)"
      },
      {
        "lari": "Ya",
        "french": "Quatre (4)"
      },
      {
        "lari": "Tanu",
        "french": "Cinq (5)"
      },
      {
        "lari": "Sambanu",
        "french": "Six (6)"
      },
      {
        "lari": "Nsambuadi",
        "french": "Sept (7)"
      },
      {
        "lari": "Nana / Mpomo",
        "french": "Huit (8)"
      },
      {
        "lari": "Vua",
        "french": "Neuf (9)"
      },
      {
        "lari": "Kumi",
        "french": "Dix (10)"
      },
      {
        "lari": "Makumole",
        "french": "Vingt (20)"
      },
      {
        "lari": "Makumatatu",
        "french": "Trente (30)"
      },
      {
        "lari": "Makumaya",
        "french": "Quarante (40)"
      },
      {
        "lari": "Makumatanu",
        "french": "Cinquante (50)"
      },
      {
        "lari": "Makumasambanu",
        "french": "Soixante (60)"
      },
      {
        "lari": "Lusambuadi",
        "french": "Soixante-dix (70)"
      },
      {
        "lari": "Lunana",
        "french": "Quatre-vingts (80)"
      },
      {
        "lari": "Luvua",
        "french": "Quatre-vingt-dix (90)"
      },
      {
        "lari": "Nkama",
        "french": "Cent (100)"
      },
      {
        "lari": "Funda",
        "french": "Mille (1 000)"
      },
      {
        "lari": "Funda dia biaji",
        "french": "Un milliard (1 000 000 000)"
      },
      {
        "lari": "Kumi na moshi",
        "french": "Onze (11)"
      },
      {
        "lari": "Makumole na tanu",
        "french": "Vingt-cinq (25)"
      },
      {
        "lari": "Nkama na moshi",
        "french": "Cent un (101)"
      },
      {
        "lari": "Nkama zole",
        "french": "Deux cents (200)"
      },
      {
        "lari": "Mafunda kumi",
        "french": "Dix mille (10 000)"
      },
      {
        "lari": "Biaji biole",
        "french": "Deux millions (2 000 000)"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Match the Kikongo Lari numbers with their values.",
        "answer": "Moshi=1, Tanu=5, Kumi=10, Nkama=100"
      },
      {
        "type": "multiple-choice",
        "question": "What is 'Zole' in Kikongo Lari?",
        "answer": "2"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 70 in Kikongo Lari?",
        "answer": "Lusambuadi"
      },
      {
        "type": "fill-in-blank",
        "question": "Kumi na ___ = 13",
        "answer": "tatu"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Makumatatu' mean?",
        "answer": "30"
      },
      {
        "type": "matching",
        "question": "Match the tens with their Kikongo Lari names.",
        "answer": "Makumole=20, Makumaya=40, Lunana=80, Luvua=90"
      },
      {
        "type": "fill-in-blank",
        "question": "___ = 1,000,000,000 (one billion)",
        "answer": "Funda dia biaji"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 100 in Kikongo Lari?",
        "answer": "Nkama"
      }
    ]
  },
  {
    "id": "counting",
    "title": "Compter — Ntalu",
    "level": "intermediate",
    "topic": "nombres",
    "vocab": [
      {
        "lari": "Mabola",
        "french": "Oignons"
      },
      {
        "lari": "Konko|Makonko",
        "french": "Sauterelle, sauterelles"
      },
      {
        "lari": "Mapapa",
        "french": "Chaussures"
      },
      {
        "lari": "Ndongo",
        "french": "Mouton (sing.)"
      },
      {
        "lari": "Bindongo",
        "french": "Moutons (plur.)"
      },
      {
        "lari": "Nkangabumi",
        "french": "Araignée"
      },
      {
        "lari": "Ngombe",
        "french": "Bœuf"
      },
      {
        "lari": "Ngulu",
        "french": "Cochon"
      },
      {
        "lari": "Bitunga",
        "french": "Paniers (plur.)"
      },
      {
        "lari": "Nlele|Milele",
        "french": "Pagne, pagnes"
      },
      {
        "lari": "mabola ma ya",
        "french": "quatre oignons"
      },
      {
        "lari": "makonko ma tatu",
        "french": "trois sauterelles"
      },
      {
        "lari": "makonko ma ya",
        "french": "quatre sauterelles"
      },
      {
        "lari": "konko di moshi",
        "french": "une sauterelle"
      },
      {
        "lari": "mabola nsambuadi",
        "french": "sept oignons"
      },
      {
        "lari": "mapapa nsambuadi",
        "french": "sept chaussures"
      },
      {
        "lari": "mabola nkama",
        "french": "cent oignons"
      },
      {
        "lari": "makonko mole",
        "french": "deux sauterelles"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Match each Lari expression to its English translation.",
        "answer": "mabola ma ya=four onions, makonko ma tatu=three grasshoppers, konko di moshi=one grasshopper, ngulu tatu=three pigs"
      },
      {
        "type": "multiple-choice",
        "question": "Which particle is used in 'makonko ___ tatu' (three grasshoppers)?",
        "answer": "ma"
      },
      {
        "type": "fill-in-blank",
        "question": "konko ___ moshi = one grasshopper",
        "answer": "di"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'two grasshoppers' in Kikongo Lari? (with euphony)",
        "answer": "makonko mole"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'two oxen' in Kikongo Lari?",
        "answer": "ngombe zole"
      },
      {
        "type": "fill-in-blank",
        "question": "bindongo ___ = two sheep (with euphony)",
        "answer": "biole"
      },
      {
        "type": "matching",
        "question": "Match each expression to its translation. These nouns are invariable in the plural.",
        "answer": "nkangabumi moshi=one spider, nkangabumi zole=two spiders, ngombe moshi=one ox, ngulu zole=two pigs"
      },
      {
        "type": "fill-in-blank",
        "question": "bitunga makumatatu na ___ tanu = 35 baskets",
        "answer": "bi"
      }
    ]
  },
  {
    "id": "body-parts",
    "title": "Le corps humain — Nitu",
    "level": "intermediate",
    "topic": "body",
    "vocab": [
      {
        "lari": "Ntu",
        "french": "Tête"
      },
      {
        "lari": "Nsuki",
        "french": "Cheveux"
      },
      {
        "lari": "Mbunzu",
        "french": "Front"
      },
      {
        "lari": "Ntumpa",
        "french": "Fontanelle"
      },
      {
        "lari": "Disu",
        "french": "Œil"
      },
      {
        "lari": "Meso",
        "french": "Yeux"
      },
      {
        "lari": "Nse",
        "french": "Sourcil"
      },
      {
        "lari": "Lulabu",
        "french": "Cil"
      },
      {
        "lari": "Ndabu",
        "french": "Cils"
      },
      {
        "lari": "Mbombo",
        "french": "Nez"
      },
      {
        "lari": "Kutu",
        "french": "Oreille"
      },
      {
        "lari": "Makutu",
        "french": "Oreilles"
      },
      {
        "lari": "Nua",
        "french": "Bouche"
      },
      {
        "lari": "Kikoba|Bikoba",
        "french": "Lèvre, lèvres"
      },
      {
        "lari": "Bundi",
        "french": "Joue, tempe"
      },
      {
        "lari": "Mabundi",
        "french": "Tempes, joues"
      },
      {
        "lari": "Mfimfini",
        "french": "Gencives"
      },
      {
        "lari": "Banga",
        "french": "Mâchoire"
      },
      {
        "lari": "Mabanga",
        "french": "Mâchoire (pl.)"
      },
      {
        "lari": "Tshibanga",
        "french": "Menton"
      },
      {
        "lari": "Bibanga",
        "french": "Mentons"
      },
      {
        "lari": "Yevo / Yelo",
        "french": "Barbe"
      },
      {
        "lari": "Kiyelo / Tshiyelo",
        "french": "Barbe"
      },
      {
        "lari": "Biyelo",
        "french": "Barbes"
      },
      {
        "lari": "Nsingu",
        "french": "Cou"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Match each body part to its English translation (Head & Face).",
        "answer": "Ntu=Head, Disu=Eye, Mbombo=Nose, Kutu=Ear"
      },
      {
        "type": "multiple-choice",
        "question": "What is the plural of 'Disu' (eye)?",
        "answer": "Meso"
      },
      {
        "type": "fill-in-blank",
        "question": "The forehead in Lari is called ___.",
        "answer": "Mbunzu"
      },
      {
        "type": "matching",
        "question": "Match each singular form to its plural.",
        "answer": "Hembo (shoulder)=Mahembo, Koto (knee)=Makoto, Kutu (ear)=Makutu, Taku (buttock)=Mataku"
      },
      {
        "type": "multiple-choice",
        "question": "What does 'Koko' mean?",
        "answer": "Hand / arm"
      },
      {
        "type": "fill-in-blank",
        "question": "La paume de la main se dit ___ en Lari. (The palm is called ___ in Lari.)",
        "answer": "Mbata"
      },
      {
        "type": "matching",
        "question": "Match each Lari word to the correct organ.",
        "answer": "Ntima=Heart, Sakafulu=Lung, Tshifundu=Stomach, Nkanda=Skin"
      },
      {
        "type": "multiple-choice",
        "question": "What is the plural of 'Yisi' (bone)?",
        "answer": "Biyisi"
      }
    ]
  },
  {
    "id": "colors",
    "title": "Les couleurs — Tinta",
    "level": "beginner",
    "topic": "colors",
    "vocab": [
      {
        "lari": "Tinta",
        "french": "Couleur"
      },
      {
        "lari": "Mpembe",
        "french": "Blanc"
      },
      {
        "lari": "Ndombi",
        "french": "Noir"
      },
      {
        "lari": "Mpilu",
        "french": "Violet"
      },
      {
        "lari": "Mbuaki",
        "french": "Rouge"
      },
      {
        "lari": "Ngizu",
        "french": "Vert"
      },
      {
        "lari": "Ngumbudi",
        "french": "Indigo"
      },
      {
        "lari": "Ntundu",
        "french": "Jaune"
      },
      {
        "lari": "Mbudi",
        "french": "Bleu"
      },
      {
        "lari": "Wolo",
        "french": "Or"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "What does 'Tinta' mean in Kikongo Lari?",
        "answer": "Color"
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'Red' (Rouge) in Kikongo Lari?",
        "answer": "Mbuaki"
      },
      {
        "type": "multiple-choice",
        "question": "What color is 'Mpembe'?",
        "answer": "White / Blanc"
      },
      {
        "type": "multiple-choice",
        "question": "What color is 'Ndombi'?",
        "answer": "Black / Noir"
      },
      {
        "type": "fill-in-blank",
        "question": "How do you say 'Yellow' (Jaune) in Kikongo Lari? ___",
        "answer": "Ntundu"
      },
      {
        "type": "fill-in-blank",
        "question": "How do you say 'Green' (Vert) in Kikongo Lari? ___",
        "answer": "Ngizu"
      },
      {
        "type": "fill-in-blank",
        "question": "Translate 'Blue' (Bleu) into Kikongo Lari: ___",
        "answer": "Mbudi"
      },
      {
        "type": "matching",
        "question": "Match each Kikongo Lari color with its English/French translation.",
        "answer": "Mpembe=White / Blanc, Ndombi=Black / Noir, Mbuaki=Red / Rouge, Ntundu=Yellow / Jaune"
      }
    ]
  },
  {
    "id": "negation",
    "title": "La négation — KA…KO",
    "level": "intermediate",
    "topic": "négation",
    "vocab": [
      {
        "lari": "Zulu",
        "french": "Ciel"
      },
      {
        "lari": "Mbudi",
        "french": "Bleu"
      },
      {
        "lari": "Manga",
        "french": "Mangue"
      },
      {
        "lari": "Mbuaki",
        "french": "Mûr / Rouge"
      },
      {
        "lari": "Mulele",
        "french": "Pagne"
      },
      {
        "lari": "Milele",
        "french": "Pagnes (pluriel)"
      },
      {
        "lari": "Ntundu",
        "french": "Jaune"
      },
      {
        "lari": "Mutindu",
        "french": "La façon"
      },
      {
        "lari": "Mitindu",
        "french": "Les façons"
      },
      {
        "lari": "Kala",
        "french": "Dire non, refuser"
      },
      {
        "lari": "Mutindu wa karila",
        "french": "La façon de dire non"
      },
      {
        "lari": "Zulu dia mbudi diena.",
        "french": "Le ciel est bleu."
      },
      {
        "lari": "Zulu ka diena dia mbudi ko.",
        "french": "Le ciel n'est pas bleu."
      },
      {
        "lari": "Manga ya mbuaki.",
        "french": "La mangue est mûre."
      },
      {
        "lari": "Manga ka yena ya mbuaki ko.",
        "french": "La mangue n'est pas mûre."
      },
      {
        "lari": "Manga ya mbuaki yena.",
        "french": "La mangue est rouge."
      },
      {
        "lari": "Manga za mbuaki zena.",
        "french": "Les mangues sont rouges."
      },
      {
        "lari": "Manga ka zena za mbuaki ko.",
        "french": "Les mangues ne sont pas rouges."
      },
      {
        "lari": "Mulele wa ntundu wena.",
        "french": "Le pagne est jaune."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "How do you negate a nominal sentence in Kikongo Lari?",
        "answer": "KA … KO"
      },
      {
        "type": "multiple-choice",
        "question": "How do you negate a verb (action) in Kikongo Lari?",
        "answer": "KA … A … KO"
      },
      {
        "type": "fill-in-blank",
        "question": "Negate: 'Zulu dia mbudi diena.' → Zulu ___ diena dia mbudi ko.",
        "answer": "ka"
      },
      {
        "type": "multiple-choice",
        "question": "What is the negative form of 'Manga ya mbuaki.' (The mango is ripe)?",
        "answer": "Manga ka yena ya mbuaki ko."
      },
      {
        "type": "fill-in-blank",
        "question": "Negate: 'Mulele wa ntundu wena.' → Mulele ka ___ wa ntundu ko.",
        "answer": "wena"
      },
      {
        "type": "multiple-choice",
        "question": "What is the negative form of 'Manga za mbuaki zena.' (The mangoes are red)?",
        "answer": "Manga ka zena za mbuaki ko."
      },
      {
        "type": "multiple-choice",
        "question": "How do you say 'You don't understand' (2nd person singular)?",
        "answer": "Ku wiri a ko."
      },
      {
        "type": "matching",
        "question": "Match each affirmative sentence with its negation.",
        "answer": "Zulu dia mbudi diena.=Zulu ka diena dia mbudi ko., Manga ya mbuaki.=Manga ka yena ya mbuaki ko., Mulele wa ntundu wena.=Mulele ka wena wa ntundu ko., Milele mia ntundu miena.=Milele ka miena mia ntund"
      }
    ]
  },
  {
    "id": "lufua",
    "title": "La mort",
    "level": "intermediate",
    "topic": "lufua",
    "vocab": [
      {
        "lari": "Lufua",
        "french": "La mort"
      },
      {
        "lari": "Mfumbi",
        "french": "Albinos"
      },
      {
        "lari": "Mvumbi",
        "french": "Cadavre"
      },
      {
        "lari": "Mpiema",
        "french": "La tombe"
      },
      {
        "lari": "Fua",
        "french": "Mourir"
      },
      {
        "lari": "Bitshinda",
        "french": "Les cimetières"
      },
      {
        "lari": "Bantu bafua",
        "french": "Les morts"
      },
      {
        "lari": "Kunaka",
        "french": "Ascension"
      },
      {
        "lari": "Bantu ba moyo",
        "french": "Les vivants"
      },
      {
        "lari": "Mpiema moshi",
        "french": "Une tombe"
      },
      {
        "lari": "Mpiema zole",
        "french": "Deux tombes"
      },
      {
        "lari": "Mpiema tatu",
        "french": "Trois tombes"
      },
      {
        "lari": "Mpiema makumatatu na tanu",
        "french": "35 tombes"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mvumbi' ?",
        "answer": "A corpse"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Je suis mort(e)' en kikongo lari ?",
        "answer": "Mfuidi"
      },
      {
        "type": "matching",
        "question": "Associez chaque terme lari à sa signification :",
        "answer": "Mfumbi=Albino, Mpiema=Grave, Kunaka=Ascension, Bantu ba moyo=The living"
      },
      {
        "type": "fill-in-blank",
        "question": "Mpiema ___ = Deux tombes",
        "answer": "zole"
      },
      {
        "type": "fill-in-blank",
        "question": "'Ils/elles sont mort(e)s' en lari : ___ fuidi",
        "answer": "Ba"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Death"
      }
    ]
  },
  {
    "id": "ba-advanced-verbs-4",
    "title": "Ba- Profit, entraide et verbes sociaux",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Bakila",
        "french": "Tirer profit, gagner"
      },
      {
        "lari": "Baka",
        "french": "Gagner, obtenir"
      },
      {
        "lari": "Bakasana",
        "french": "S'entraider, s'assister"
      },
      {
        "lari": "Salasana",
        "french": "S'entraider, se donner un coup de main mutuel"
      },
      {
        "lari": "Bakishina",
        "french": "Harceler"
      },
      {
        "lari": "Mbakisa",
        "french": "Aide-moi"
      },
      {
        "lari": "Nsaba",
        "french": "Jardin"
      },
      {
        "lari": "Ndandu",
        "french": "Bénédiction, bénéfice"
      },
      {
        "lari": "Ngela",
        "french": "Argent"
      },
      {
        "lari": "Nleke | Baleke",
        "french": "Un(e) cadet(te), plus jeune"
      },
      {
        "lari": "Bakento",
        "french": "Les femmes"
      },
      {
        "lari": "Nkesi / Nkeshi",
        "french": "La colère"
      },
      {
        "lari": "Longoka",
        "french": "Apprendre"
      },
      {
        "lari": "Nlongi | Milongi",
        "french": "Enseignant(e)"
      },
      {
        "lari": "Mpeho",
        "french": "L'ombre"
      },
      {
        "lari": "Thsifu, Kifu | Bifu",
        "french": "L'habitude"
      },
      {
        "lari": "Tshikoyi | Bikoyi",
        "french": "Une plainte"
      },
      {
        "lari": "Tshikua, Kikua | Bikua",
        "french": "Une igname"
      },
      {
        "lari": "Mukala | Mikala",
        "french": "Tombe, tombeau"
      },
      {
        "lari": "Mbo bakila ngela",
        "french": "Tu vas gagner de l'argent"
      },
      {
        "lari": "Mbo baka ngela",
        "french": "Tu vas gagner de l'argent"
      },
      {
        "lari": "Ba na nsaba, mbo bakila yo ndandu",
        "french": "Fais un jardin, tu en tireras du bénéfice"
      },
      {
        "lari": "Mbakisa mu lamba",
        "french": "Aide-moi à cuisiner"
      },
      {
        "lari": "Tu fueti salasana",
        "french": "Nous devons nous entraider"
      },
      {
        "lari": "Ta salasana",
        "french": "Entraidons-nous"
      },
      {
        "lari": "Ka tu bakishinandi baleke",
        "french": "N'harcelons pas les plus jeunes !"
      },
      {
        "lari": "Ka lu bakishinandi baleke",
        "french": "N'harcelez pas les plus jeunes !"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Bakila » ?",
        "answer": "To profit, to gain"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Salasana » ?",
        "answer": "To help each other"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Bakishina » ?",
        "answer": "To harass, to bully"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mbakisa mu lamba » ?",
        "answer": "Help me cook"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Ka lu bakishinandi baleke » ?",
        "answer": "Don't bully the younger ones!"
      },
      {
        "type": "matching",
        "question": "Associez les verbes en Ba- à leur signification.",
        "answer": "Bakila=To profit, to gain, Baka=To gain, to obtain, Bakasana=To help each other, Bakishina=To harass, to bully"
      },
      {
        "type": "matching",
        "question": "Associez ces phrases à leur traduction.",
        "answer": "Tu fueti salasana=We must help each other, Ta salasana=Let's help each other, Mbakisa mu lamba=Help me cook, Mbo bakila ngela=You will earn money"
      },
      {
        "type": "fill-in-blank",
        "question": "Tu fueti ___ = Nous devons nous entraider",
        "answer": "salasana"
      }
    ]
  },
  {
    "id": "active-passive-voice",
    "title": "Voix active et passive — Baka / Baku",
    "level": "intermediate",
    "topic": "active",
    "vocab": [
      {
        "lari": "Baka",
        "french": "Attraper"
      },
      {
        "lari": "Baku",
        "french": "Être attrapé"
      },
      {
        "lari": "Tomo",
        "french": "Suffisamment"
      },
      {
        "lari": "Dia",
        "french": "Manger"
      },
      {
        "lari": "Ngati / Ngatu",
        "french": "Pour que"
      },
      {
        "lari": "Wa",
        "french": "Tu (selon le contexte)"
      },
      {
        "lari": "Lembo",
        "french": "Ne pas"
      },
      {
        "lari": "Nsatu",
        "french": "La faim"
      },
      {
        "lari": "Nkesi / Nkeshi",
        "french": "La colère"
      },
      {
        "lari": "Dzuna",
        "french": "Se calmer"
      },
      {
        "lari": "Bubote",
        "french": "Bien"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Baka » ?",
        "answer": "To catch"
      },
      {
        "type": "multiple-choice",
        "question": "Comment forme-t-on la voix passive en Kikongo Lari ?",
        "answer": "Change suffix from -a to -u"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie littéralement « Baku nsatu » ?",
        "answer": "To be caught by hunger (to go hungry)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « ngati » (ou « ngatu ») ?",
        "answer": "So that / In order to"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot lari à sa signification",
        "answer": "Baka=To catch, Baku=To be caught, Tomo=Enough, Lembo=Not"
      },
      {
        "type": "fill-in-blank",
        "question": "Tomo ___, ngatu wa lembo baku nsatu = Mange suffisamment pour ne pas avoir faim",
        "answer": "dia"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ngatu wa lembo baku nkeshi = Calme-toi pour ne pas être en colère",
        "answer": "dzuna"
      },
      {
        "type": "fill-in-blank",
        "question": "Dia ___ = Mange bien",
        "answer": "bubote"
      }
    ]
  },
  {
    "id": "daily-chores-water-wood",
    "title": "Tâches quotidiennes — Bois, eau et cueillette",
    "level": "beginner",
    "topic": "daily",
    "vocab": [
      {
        "lari": "Nkuni",
        "french": "Bois de chauffage / bois de cuisson"
      },
      {
        "lari": "Basa",
        "french": "Fendre"
      },
      {
        "lari": "Tomba",
        "french": "Chercher"
      },
      {
        "lari": "Buwa",
        "french": "Champignons"
      },
      {
        "lari": "Mamba",
        "french": "Eau"
      },
      {
        "lari": "Teka",
        "french": "Puiser de l'eau (à la source, à la rivière) / vendre"
      },
      {
        "lari": "Benda",
        "french": "Puiser de l'eau dans un puits"
      },
      {
        "lari": "Vueta",
        "french": "Puiser de l'eau avec un récipient à grande ouverture (arrosoir, seau)"
      },
      {
        "lari": "Losa",
        "french": "Jeter, perdre"
      },
      {
        "lari": "Basa nkuni",
        "french": "Fendre du bois pour le chauffage"
      },
      {
        "lari": "Nkuni ni kue tomba",
        "french": "Je vais chercher du bois de cuisson"
      },
      {
        "lari": "Buwa ni kue tomba",
        "french": "Je vais chercher des champignons"
      },
      {
        "lari": "Mamba ni kue teka",
        "french": "Je vais puiser de l'eau"
      },
      {
        "lari": "Mamba ni kue vueta",
        "french": "Je vais prendre de l'eau avec un récipient"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Nkuni » ?",
        "answer": "Firewood"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre « Teka », « Benda » et « Vueta » ?",
        "answer": "Teka = from source/river, Benda = from well, Vueta = with wide container"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Losa » ?",
        "answer": "To throw / to lose"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Il/elle a jeté de l'eau » en kikongo lari ?",
        "answer": "Mamba ka losele"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime « ni kue » dans la phrase « Nkuni ni kue tomba » ?",
        "answer": "Immediate future (I'm going to...)"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot lari à sa signification",
        "answer": "Nkuni=Firewood, Basa=To split, Tomba=To fetch, Buwa=Mushrooms"
      },
      {
        "type": "matching",
        "question": "Associez la conjugaison de « Losa » (passé) à la bonne personne",
        "answer": "Mamba ndosele=I (je), Mamba losele=You (tu), Mamba ka losele=He/She, Mamba tu losele=We"
      },
      {
        "type": "fill-in-blank",
        "question": "___ nkuni = Fendre du bois",
        "answer": "basa"
      }
    ]
  },
  {
    "id": "buyumba-demonstratives",
    "title": "Pronoms démonstratifs et classes nominales — Buyumba",
    "level": "intermediate",
    "topic": "buyumba",
    "vocab": [
      {
        "lari": "Buyumba",
        "french": "Idiotie, bêtise"
      },
      {
        "lari": "Tshiyumba",
        "french": "Un idiot"
      },
      {
        "lari": "Biyumba",
        "french": "Des idiots"
      },
      {
        "lari": "Buhulu",
        "french": "Bêtise, idiotie"
      },
      {
        "lari": "Buzoba",
        "french": "Bêtise, idiotie"
      },
      {
        "lari": "Muana",
        "french": "Enfant"
      },
      {
        "lari": "N'kento",
        "french": "Femme"
      },
      {
        "lari": "Bakento",
        "french": "Femmes"
      },
      {
        "lari": "Bakala",
        "french": "Homme"
      },
      {
        "lari": "Babakala",
        "french": "Hommes"
      },
      {
        "lari": "N'kaka",
        "french": "Grand-mère / Grand-père"
      },
      {
        "lari": "Hata",
        "french": "Village"
      },
      {
        "lari": "Mahata",
        "french": "Villages"
      },
      {
        "lari": "Lumbu",
        "french": "Jour"
      },
      {
        "lari": "Bilumbu",
        "french": "Jours"
      },
      {
        "lari": "Tshifulu",
        "french": "Fleur"
      },
      {
        "lari": "Bifulu",
        "french": "Fleurs"
      },
      {
        "lari": "Kumbi | Makumbi",
        "french": "Voiture | Voitures"
      },
      {
        "lari": "Mongo",
        "french": "Montagne"
      },
      {
        "lari": "Miongo",
        "french": "Montagnes"
      },
      {
        "lari": "Papumuka! Bika buyumba.",
        "french": "Secoue-toi ! Laisse ta bêtise !"
      },
      {
        "lari": "Bika buhulu!",
        "french": "Laisse ta bêtise !"
      },
      {
        "lari": "Bika buzoba!",
        "french": "Laisse ta bêtise !"
      },
      {
        "lari": "Muana wu ka wena tshiyumba a ko.",
        "french": "Cet enfant n'est pas un idiot."
      },
      {
        "lari": "Muana wu ka tshiyumba a ko.",
        "french": "Cet enfant n'est pas bête."
      },
      {
        "lari": "Lumbu tshi, lumbu tshi ba sa bakento nsangu.",
        "french": "Aujourd'hui, c'est la journée des femmes."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le démonstratif correct pour « Muana » (enfant) ?",
        "answer": "Muana wu"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le démonstratif correct pour « Hata » (village) ?",
        "answer": "Hata di"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de « Tshiyumba » (un idiot) ?",
        "answer": "Biyumba"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Bika buyumba ! » ?",
        "answer": "Stop your foolishness!"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le démonstratif correct pour « Lumbu » (jour) ?",
        "answer": "Lumbu tshi"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom à son pronom démonstratif correct",
        "answer": "Muana ___=wu, Hata ___=di, N'kaka ___=yi, Lumbu ___=tshi"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom à sa forme plurielle",
        "answer": "Hata=Mahata, Lumbu=Bilumbu, Tshifulu=Bifulu, Kumbi=Makumbi"
      },
      {
        "type": "fill-in-blank",
        "question": "Muana ___ ka wena tshiyumba a ko. = Cet enfant n'est pas un idiot.",
        "answer": "wu"
      }
    ]
  },
  {
    "id": "food-mudjiri",
    "title": "Nourriture : Mudjiri et cuisine",
    "level": "beginner",
    "topic": "food",
    "vocab": [
      {
        "lari": "Mudjiri",
        "french": "Baselle rouge (épinard tropical)"
      },
      {
        "lari": "Lamba",
        "french": "Préparer, faire la cuisine"
      },
      {
        "lari": "Masangu",
        "french": "Maïs"
      },
      {
        "lari": "Sangu",
        "french": "Épis de maïs"
      },
      {
        "lari": "Mbala",
        "french": "Patate douce"
      },
      {
        "lari": "Musa | Misa",
        "french": "Oseille (légume)"
      },
      {
        "lari": "Nkokela",
        "french": "Ce soir"
      },
      {
        "lari": "Mbaji",
        "french": "Demain"
      },
      {
        "lari": "Mudjiri ni lamba",
        "french": "Je vais préparer la baselle rouge."
      },
      {
        "lari": "Nkokela masangu tu dia.",
        "french": "Ce soir, nous allons manger du maïs."
      },
      {
        "lari": "Mbaji musa ni lamba na mbala.",
        "french": "Demain je vais préparer de l'oseille avec des patates douces."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mudjiri » ?",
        "answer": "Tropical spinach"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Nous allons préparer la baselle rouge » en lari ?",
        "answer": "Mudjiri tu lamba"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre « sangu » et « masangu » ?",
        "answer": "Sangu = corn cob, Masangu = maize (general)"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot lari à sa signification.",
        "answer": "Mudjiri=Tropical spinach, Lamba=To cook, Masangu=Maize, Mbala=Sweet potato"
      },
      {
        "type": "fill-in-blank",
        "question": "Mudjiri ___ lamba = Nous allons préparer la baselle rouge.",
        "answer": "tu"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkokela ___ tu dia. = Ce soir, nous allons manger du maïs.",
        "answer": "masangu"
      },
      {
        "type": "fill-in-blank",
        "question": "Mudjiri ___ lamba = Il/elle va préparer la baselle rouge.",
        "answer": "ka"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Food: Mudjiri & Cooking"
      }
    ]
  },
  {
    "id": "kinitu-lenda-mbo",
    "title": "Kinitu, Lenda & Mbo — Aura, pouvoir et futur",
    "level": "advanced",
    "topic": "kinitu",
    "vocab": [
      {
        "lari": "Kinitu",
        "french": "Champ de tore, champ aurique"
      },
      {
        "lari": "Tala",
        "french": "Si (conditionnel)"
      },
      {
        "lari": "Tala lumbu",
        "french": "Si un jour"
      },
      {
        "lari": "Duka",
        "french": "Sortir"
      },
      {
        "lari": "Dukila",
        "french": "Sortir de, à travers"
      },
      {
        "lari": "Dukisa",
        "french": "Faire sortir quelqu'un de quelque part"
      },
      {
        "lari": "Buki | Mbuki",
        "french": "Un médecin | Des médecins, ceux qui soignent"
      },
      {
        "lari": "Nzo za bilongo",
        "french": "Une pharmacie"
      },
      {
        "lari": "Kalaka | Makalaka",
        "french": "Un érudit | Des érudits"
      },
      {
        "lari": "Laka | Malaka",
        "french": "La gorge | Les gorges"
      },
      {
        "lari": "Lenda",
        "french": "Pouvoir (verbe), être capable de"
      },
      {
        "lari": "Lulendo",
        "french": "Pouvoir, puissance, orgueil, possibilité, facilité d'exécuter"
      },
      {
        "lari": "Mbo",
        "french": "Particule du futur"
      },
      {
        "lari": "Nsayi",
        "french": "La joie"
      },
      {
        "lari": "Baka",
        "french": "Attraper, prendre"
      },
      {
        "lari": "Tanga",
        "french": "Lire, compter"
      },
      {
        "lari": "Nzo mikanda",
        "french": "L'école (litt. maison des livres)"
      },
      {
        "lari": "Nzo mikanda makalaka yi dukisa",
        "french": "L'école produit des érudits"
      },
      {
        "lari": "Tala lumbu, ndendi tanga kinitu kiaku, mbo ni ba mu nsayi",
        "french": "Si un jour je peux lire ton aura, je serai content"
      },
      {
        "lari": "Tala lumbu ndendi tanga kinitu kiaku, nsayi mbo yi ku mbaka",
        "french": "Si un jour je peux lire ton aura, la joie m'attrapera"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Kinitu » ?",
        "answer": "Toric/auric field"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le rôle de « Mbo » dans une phrase lari ?",
        "answer": "It marks the future tense"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Dukisa » ?",
        "answer": "To make someone come out"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « je peux » en kikongo lari ?",
        "answer": "Ndendi"
      },
      {
        "type": "matching",
        "question": "Associez les mots lari à leur signification.",
        "answer": "Kinitu=Auric field, Duka=To go out, Buki=A healer, Nsayi=Joy"
      },
      {
        "type": "matching",
        "question": "Associez les formes conjuguées de « Lenda » (pouvoir).",
        "answer": "Ndendi=I can, Lendi=You can / He can, Tu lendi=We can, Lu lendi=You (pl.) can"
      },
      {
        "type": "fill-in-blank",
        "question": "___ signifie « si » en kikongo lari",
        "answer": "tala"
      },
      {
        "type": "fill-in-blank",
        "question": "Nzo mikanda makalaka yi ___. = L'école produit des érudits.",
        "answer": "dukisa"
      }
    ]
  },
  {
    "id": "sa-verb-doing",
    "title": "Le verbe « Sa » — Faire, durer",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Sa",
        "french": "Faire"
      },
      {
        "lari": "Shiri",
        "french": "A fait (contexte : a duré, a séjourné)"
      },
      {
        "lari": "Mukaka",
        "french": "Plein, entier"
      },
      {
        "lari": "Ku",
        "french": "Au, à (préposition de lieu)"
      },
      {
        "lari": "Hata",
        "french": "Village"
      },
      {
        "lari": "Ku hata",
        "french": "Au village"
      },
      {
        "lari": "Mvula",
        "french": "La pluie / l'année"
      },
      {
        "lari": "Lolo",
        "french": "Aujourd'hui"
      },
      {
        "lari": "Ngonda",
        "french": "Le mois"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Lolo mvula ye ku » ?",
        "answer": "Today, it is raining"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie le verbe « Sa » dans la phrase « Ngonda ya mukaka ka shiri ku hata » ?",
        "answer": "To last / to stay"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mukaka » ?",
        "answer": "Full, whole"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « j'ai fait » (passé composé de Sa) ?",
        "answer": "Nsiri"
      },
      {
        "type": "matching",
        "question": "Associez la conjugaison à la personne correcte",
        "answer": "Nsiri=I did, Siri=You did (singular), Ka sidi=He/She did, Ba siri=They did"
      },
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Mukaka=Full, whole, Ku hata=At the village, Lolo=Today, Mvula=Rain / Year"
      },
      {
        "type": "fill-in-blank",
        "question": "___ mvula ye ku (Aujourd'hui, il pleut)",
        "answer": "Lolo"
      },
      {
        "type": "fill-in-blank",
        "question": "Ngonda ya ___ ka shiri ku hata (Un mois entier au village)",
        "answer": "mukaka"
      }
    ]
  },
  {
    "id": "ntangu-za-ka",
    "title": "Parfois j'aime bien… — Ntangu za ka",
    "level": "intermediate",
    "topic": "ntangu",
    "vocab": [
      {
        "lari": "Ntangu za ka(ka)",
        "french": "Parfois, quelquefois"
      },
      {
        "lari": "Kidukia|Bidukia",
        "french": "La tourterelle"
      },
      {
        "lari": "Matshinu",
        "french": "La danse"
      },
      {
        "lari": "Dimpa|Mampa",
        "french": "Le pain, les pains"
      },
      {
        "lari": "Kintu|Bintu",
        "french": "L'ananas, les ananas"
      },
      {
        "lari": "Diki|Meki",
        "french": "L'œuf, les œufs"
      },
      {
        "lari": "Nzololo",
        "french": "J'aime bien"
      },
      {
        "lari": "Ntangu za ka matshinu ma nzololo",
        "french": "Parfois j'aime bien la danse"
      },
      {
        "lari": "Ntangu za ka dimpa dia nzololo",
        "french": "Parfois j'aime le pain"
      },
      {
        "lari": "Ntangu za ka lamba kua nzololo",
        "french": "Parfois j'aime bien cuisiner"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Ntangu za ka » ?",
        "answer": "Sometimes"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle particule nominale est utilisée avec « dimpa » (pain) ?",
        "answer": "dia"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Parfois j'aime les ananas » (pluriel) ?",
        "answer": "Ntangu za ka bintu bia nzololo"
      },
      {
        "type": "multiple-choice",
        "question": "Quel mot est inséré entre le verbe à l'infinitif et « nzololo » ?",
        "answer": "kua"
      },
      {
        "type": "multiple-choice",
        "question": "Comment conjugue-t-on « zololo » à la première personne du pluriel ?",
        "answer": "Tu zololo"
      },
      {
        "type": "matching",
        "question": "Associez chaque phrase lari à sa signification",
        "answer": "Ntangu za ka matshinu ma nzololo=Sometimes I like dancing, Ntangu za ka lamba kua nzololo=Sometimes I like cooking, Ntangu za ka dimpa dia nzololo=Sometimes I like bread, Ntangu za ka dia kua nzololo="
      },
      {
        "type": "fill-in-blank",
        "question": "Ntangu za ka meki ___ nzololo (Parfois j'aime les œufs)",
        "answer": "ma"
      },
      {
        "type": "fill-in-blank",
        "question": "Ntangu za ka ___ kia nzololo (Parfois j'aime l'ananas)",
        "answer": "kintu"
      }
    ]
  },
  {
    "id": "proverbes-particules",
    "title": "Proverbes et particules nominales",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Sala",
        "french": "Travailler"
      },
      {
        "lari": "Mpashi",
        "french": "La difficulté, la douleur"
      },
      {
        "lari": "Kua",
        "french": "Seulement (ici)"
      },
      {
        "lari": "Kuena",
        "french": "Être (qualifie une idée)"
      },
      {
        "lari": "Kue",
        "french": "Abréviation de kuena"
      },
      {
        "lari": "Yelesa",
        "french": "Grandir"
      },
      {
        "lari": "Fua",
        "french": "L'héritage"
      },
      {
        "lari": "Mafua",
        "french": "Les héritages (pluriel)"
      },
      {
        "lari": "Yika",
        "french": "Ajouter, augmenter, accroître"
      },
      {
        "lari": "Dio",
        "french": "Particule nominale (éloignement)"
      },
      {
        "lari": "Di",
        "french": "Particule nominale (proximité)"
      },
      {
        "lari": "Hata",
        "french": "Le village"
      },
      {
        "lari": "Mahata",
        "french": "Les villages (pluriel)"
      },
      {
        "lari": "Toma",
        "french": "Beau, belle"
      },
      {
        "lari": "Nkondi",
        "french": "La statuette"
      },
      {
        "lari": "Mankondi",
        "french": "Les bananes (pluriel)"
      },
      {
        "lari": "Mbuaki",
        "french": "Mûr, mûre"
      },
      {
        "lari": "Sala kua kue mpashi, yelesa ka kuena mpashi ko",
        "french": "Il n'y a que le travail qui est difficile (grandir n'est pas difficile, c'est la nature qui le fait)"
      },
      {
        "lari": "Wa dia fua, yika dio",
        "french": "Si tu manges l'héritage, augmente-le"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie le proverbe « Sala kua kue mpashi, yelesa ka kuena mpashi ko » ?",
        "answer": "Only work is difficult, growing up is not"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « mpashi » ?",
        "answer": "Difficulty, pain"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre « di » et « dio » ?",
        "answer": "Di = proximity, Dio = distance"
      },
      {
        "type": "fill-in-blank",
        "question": "___ kua kue mpashi (Seul ___ est difficile)",
        "answer": "Sala"
      },
      {
        "type": "fill-in-blank",
        "question": "Wa dia fua, ___ dio (Si tu manges l'héritage, ___-le)",
        "answer": "yika"
      },
      {
        "type": "fill-in-blank",
        "question": "Hata ___ dia toma die (Ce village-là est beau)",
        "answer": "dio"
      },
      {
        "type": "fill-in-blank",
        "question": "Dinkondi ___ dia mbuaki dje (Cette banane-ci est mûre)",
        "answer": "di"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot lari à sa signification",
        "answer": "Sala=To work, Mpashi=Difficulty, Fua=Inheritance, Yika=To increase"
      }
    ]
  },
  {
    "id": "bambuka-shimba",
    "title": "Bambuka & Shimba — Mémoire et obligation",
    "level": "intermediate",
    "topic": "bambuka",
    "vocab": [
      {
        "lari": "Bambuka",
        "french": "Se rappeler, se souvenir"
      },
      {
        "lari": "Shimba",
        "french": "Retenir, tenir"
      },
      {
        "lari": "Fueti",
        "french": "Devoir (obligation)"
      },
      {
        "lari": "Fueni",
        "french": "Devoir (obligation, variante)"
      },
      {
        "lari": "Bashimba",
        "french": "Nom du deuxième jumeau"
      },
      {
        "lari": "Banzuzi",
        "french": "Nom du premier jumeau"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mi mfueti bambuka » ?",
        "answer": "What I must remember"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle forme signifie « Ce qu'ils/elles doivent retenir » ?",
        "answer": "Mi ba fueni shimba"
      },
      {
        "type": "matching",
        "question": "Associez chaque conjugaison à sa signification",
        "answer": "Mi mfueti bambuka=What I must remember, Mi ka fueti bambuka=What he/she must remember, Mi tu fueni shimba=What we must retain, Mi lu fueni shimba=What you (pl.) must retain"
      },
      {
        "type": "fill-in-blank",
        "question": "Mi ___ fueti bambuka = Ce dont nous devons nous rappeler",
        "answer": "tu"
      },
      {
        "type": "fill-in-blank",
        "question": "Mi ba fueni ___ = Ce qu'ils/elles doivent retenir",
        "answer": "shimba"
      },
      {
        "type": "multiple-choice",
        "question": "Dans la tradition Kongo, quel nom donne-t-on au premier jumeau à naître ?",
        "answer": "Banzuzi"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie le verbe « shimba » ?",
        "answer": "To retain, to hold"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Bambuka & Shimba — Memory & Obligation"
      }
    ]
  },
  {
    "id": "mungua-seasoning",
    "title": "Mungua — Le sel et l'assaisonnement",
    "level": "intermediate",
    "topic": "mungua",
    "vocab": [
      {
        "lari": "Mungua",
        "french": "Le sel"
      },
      {
        "lari": "Tua",
        "french": "Taper, frapper"
      },
      {
        "lari": "Tuiri",
        "french": "Bien salé (participe passé de Tua)"
      },
      {
        "lari": "Mungua nduri",
        "french": "Trop salé (excès de sel)"
      },
      {
        "lari": "Madia",
        "french": "La nourriture"
      },
      {
        "lari": "Lunda",
        "french": "Conserver"
      },
      {
        "lari": "Ndunda",
        "french": "Légumes"
      },
      {
        "lari": "Mankondi ma koko",
        "french": "Les bananes plantains"
      },
      {
        "lari": "Tshintu|Bintu",
        "french": "Ananas"
      },
      {
        "lari": "Buwa",
        "french": "Les champignons"
      },
      {
        "lari": "Meki",
        "french": "Les œufs"
      },
      {
        "lari": "Nguba",
        "french": "Les cacahuètes"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel marqueur de classe complète : « Nguba ___ tuiri mungua » ?",
        "answer": "zi"
      },
      {
        "type": "multiple-choice",
        "question": "Quel marqueur de classe complète : « Buwa ___ tuiri mungua » ?",
        "answer": "bu"
      },
      {
        "type": "fill-in-blank",
        "question": "Madia ___ tuiri mungua (La nourriture est bien salée)",
        "answer": "ma"
      },
      {
        "type": "fill-in-blank",
        "question": "Loso ___ tuiri mungua (Le riz est bien salé)",
        "answer": "lu"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom d'aliment à son marqueur de classe pour « tuiri mungua »",
        "answer": "Nguba=zi, Tshintu=tshi, Loso=lu, Meki=ma"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le bon démonstratif dans : « Dinkondi mungua nduri ___ » ?",
        "answer": "die(na)"
      },
      {
        "type": "fill-in-blank",
        "question": "Buwa mungua nduri ___ (Les champignons sont trop salés)",
        "answer": "bue(na)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « tuiri » ?",
        "answer": "Well salted (past participle of Tua)"
      }
    ]
  },
  {
    "id": "fruits-tastes",
    "title": "Le Goût des choses",
    "level": "intermediate",
    "topic": "fruits",
    "vocab": [
      {
        "lari": "Lala | Malala",
        "french": "orange | oranges"
      },
      {
        "lari": "Nsa",
        "french": "Acidité"
      },
      {
        "lari": "Nduri",
        "french": "Amère / Amer"
      },
      {
        "lari": "Nzeki nzeki",
        "french": "Sucré (fruits & plantes)"
      },
      {
        "lari": "Muniche | Miniche",
        "french": "Canne à sucre | Cannes à sucre"
      },
      {
        "lari": "Mamba",
        "french": "Eau / Jus"
      },
      {
        "lari": "Dimpa | Mampa",
        "french": "Pain | Pains"
      },
      {
        "lari": "Bikola",
        "french": "Légumes"
      },
      {
        "lari": "Buwa",
        "french": "Champignons (pl.)"
      },
      {
        "lari": "Luwa",
        "french": "Champignon (sg.)"
      },
      {
        "lari": "Lutundu | Ntundu",
        "french": "Ntundu (fruit sauvage jaune orangé) sg. | pl."
      },
      {
        "lari": "Lusafu | Nsafu",
        "french": "Safou sg. | Safous pl."
      },
      {
        "lari": "Bote",
        "french": "Bon / Bonne"
      },
      {
        "lari": "Mankondi",
        "french": "Bananes"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Lala dia nsa » ?",
        "answer": "The lemon (sour orange)"
      },
      {
        "type": "multiple-choice",
        "question": "Que décrit « nzeki nzeki » ?",
        "answer": "Sweetness (for fruits & plants)"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle phrase a le même sens que « Dimpa dia di bote die(na) » ?",
        "answer": "Dimpa dia di bote"
      },
      {
        "type": "matching",
        "question": "Associez le nom avec son accord correct pour « bon ».",
        "answer": "Dimpa=dia di bote, Mampa=ma ma bote, Bikola=bia bi bote, Buwa=bua bu bote"
      },
      {
        "type": "matching",
        "question": "Associez chaque forme singulière avec son pluriel.",
        "answer": "Lala=Malala, Dimpa=Mampa, Luwa=Buwa, Lusafu=Nsafu"
      },
      {
        "type": "fill-in-blank",
        "question": "Bikola ___ bi bote.",
        "answer": "bia"
      },
      {
        "type": "fill-in-blank",
        "question": "Lala dia ___ = le citron",
        "answer": "nsa"
      },
      {
        "type": "fill-in-blank",
        "question": "Mamba ma ___, ma ma bote.",
        "answer": "miniche"
      }
    ]
  },
  {
    "id": "ya-yaya-verbs",
    "title": "Ya / Yaya — Cuisson, brûlure et douleur",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Ya",
        "french": "Être cuit / Brûler"
      },
      {
        "lari": "Yiri",
        "french": "Est cuit(e) / Est brûlé(e)"
      },
      {
        "lari": "Yaya",
        "french": "Douleur d'une plaie ouverte"
      },
      {
        "lari": "Bima",
        "french": "Nourriture"
      },
      {
        "lari": "Loso",
        "french": "Riz"
      },
      {
        "lari": "Masangu",
        "french": "Maïs"
      },
      {
        "lari": "Mbala",
        "french": "Patate"
      },
      {
        "lari": "Nzo",
        "french": "Maison"
      },
      {
        "lari": "Mukobo",
        "french": "Savane"
      },
      {
        "lari": "Mputa",
        "french": "Plaie"
      },
      {
        "lari": "Lumfimfini | Mfimfini",
        "french": "Gencive | Gencives"
      },
      {
        "lari": "Ludimi",
        "french": "Langue"
      },
      {
        "lari": "Meso",
        "french": "Yeux"
      },
      {
        "lari": "Mbombo",
        "french": "Nez"
      },
      {
        "lari": "Malu",
        "french": "Pieds"
      },
      {
        "lari": "Kulu",
        "french": "Pied"
      },
      {
        "lari": "Mulembo | Milembo",
        "french": "Doigt | Doigts"
      },
      {
        "lari": "Mukumba | Mikumba",
        "french": "Nombril | Nombrils"
      },
      {
        "lari": "Koto | Makoto",
        "french": "Genou | Genoux"
      },
      {
        "lari": "Dinu | Meno",
        "french": "Dent | Dents"
      },
      {
        "lari": "Tshikoba | Bikoba",
        "french": "Lèvre | Lèvres"
      },
      {
        "lari": "Bima bi yiri.",
        "french": "La nourriture est cuite."
      },
      {
        "lari": "Loso lu yiri.",
        "french": "Le riz est cuit."
      },
      {
        "lari": "Masangu ma yiri.",
        "french": "Le maïs est cuit."
      },
      {
        "lari": "Mbala ji yiri.",
        "french": "Les patates sont cuites."
      },
      {
        "lari": "Nzo yi yiri.",
        "french": "La maison est brûlée."
      },
      {
        "lari": "Mukobo wu yiri.",
        "french": "La savane est brûlée."
      },
      {
        "lari": "Mputa yaya yi ta yaya.",
        "french": "La plaie me fait mal."
      },
      {
        "lari": "Meso yaya ma ta yaya.",
        "french": "Mes yeux me font mal."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le préfixe de classe correct dans : « Loso ___ yiri » ?",
        "answer": "lu"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie le verbe « ya » ?",
        "answer": "To be cooked / To burn"
      },
      {
        "type": "fill-in-blank",
        "question": "Bima ___ yiri.",
        "answer": "bi"
      },
      {
        "type": "fill-in-blank",
        "question": "Nzo ___ yiri.",
        "answer": "yi"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime spécifiquement « yaya » ?",
        "answer": "Pain from an open wound"
      },
      {
        "type": "fill-in-blank",
        "question": "Kulu yaya ___ ta yaya.",
        "answer": "ku"
      },
      {
        "type": "matching",
        "question": "Associez chaque partie du corps à son préfixe de classe dans la construction « yaya »",
        "answer": "Mputa yaya ___=yi, Ludimi yaya ___=lu, Meso yaya ___=ma, Koto yaya ___=di"
      },
      {
        "type": "multiple-choice",
        "question": "Pourquoi le Kikongo Lari utilise-t-il le passé pour exprimer le présent ?",
        "answer": "The Kongo view this existence as already past, like stars already dead"
      }
    ]
  },
  {
    "id": "yoya-yuna",
    "title": "Yoya, Yuna, Futikila & Luzolo",
    "level": "intermediate",
    "topic": "yoya",
    "vocab": [
      {
        "lari": "Yoya",
        "french": "Être bien mûr"
      },
      {
        "lari": "Yuna",
        "french": "Retirer la peau d'un animal, écorcher"
      },
      {
        "lari": "Wiri",
        "french": "Participe passé (état accompli)"
      },
      {
        "lari": "Bintu",
        "french": "Ananas (pluriel)"
      },
      {
        "lari": "Manga",
        "french": "Mangues"
      },
      {
        "lari": "Malala",
        "french": "Oranges"
      },
      {
        "lari": "Malala ma nsa",
        "french": "Citrons"
      },
      {
        "lari": "Mulumba",
        "french": "Lapin"
      },
      {
        "lari": "Tshiyimba, Kiyimba, Yimba | Biyimba",
        "french": "Morve"
      },
      {
        "lari": "Futikila",
        "french": "Être enrhumé(e)"
      },
      {
        "lari": "Luzolo",
        "french": "Amour"
      },
      {
        "lari": "Zololo",
        "french": "Aimer, vouloir"
      },
      {
        "lari": "Muana",
        "french": "Enfant"
      },
      {
        "lari": "Bintu bi wiri yoya.",
        "french": "Les ananas sont bien mûrs."
      },
      {
        "lari": "Bintu bi bi wiri yoya.",
        "french": "Ces ananas sont bien mûrs."
      },
      {
        "lari": "Manga ji/zi wiri yoya.",
        "french": "Les mangues sont bien mûres."
      },
      {
        "lari": "Manga ji ji wiri yoya.",
        "french": "Ces mangues sont bien mûres."
      },
      {
        "lari": "Malala ma wiri yoya.",
        "french": "Les oranges sont bien mûres."
      },
      {
        "lari": "Malala ma ma wiri yoya.",
        "french": "Ces oranges sont bien mûres."
      },
      {
        "lari": "Malala ma nsa ma wiri yoya.",
        "french": "Les citrons sont bien mûrs."
      },
      {
        "lari": "Malala ma nsa ma ma wiri yoya.",
        "french": "Ces citrons sont bien mûrs."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Ces mangues sont bien mûres » ?",
        "answer": "Manga ji ji wiri yoya."
      },
      {
        "type": "fill-in-blank",
        "question": "Malala ___ wiri yoya. (Les oranges sont bien mûres.)",
        "answer": "ma"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mulumba njunini » ?",
        "answer": "I skinned a rabbit."
      },
      {
        "type": "matching",
        "question": "Associez chaque fruit à son marqueur de classe",
        "answer": "Bintu=bi, Manga=ji/zi, Malala=ma"
      },
      {
        "type": "fill-in-blank",
        "question": "Mulumba ___ yunini. (Il/elle a écorché un lapin.)",
        "answer": "ka"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre « Bintu bi wiri yoya » et « Bintu bi bi wiri yoya » ?",
        "answer": "The first is general ('the'), the second is demonstrative ('these')."
      },
      {
        "type": "fill-in-blank",
        "question": "Mulumba ___ yunini. (Ils/elles ont écorché un lapin.)",
        "answer": "ba"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Muana tshiyimba we » ?",
        "answer": "The child has a runny nose."
      }
    ]
  },
  {
    "id": "zeza-zezesa",
    "title": "Zeza et Zezesa — Desserrer et relâcher",
    "level": "intermediate",
    "topic": "zeza",
    "vocab": [
      {
        "lari": "Zeza",
        "french": "Desserrer, relâcher"
      },
      {
        "lari": "Zezesa",
        "french": "Desserrer quelque chose (trop serré)"
      },
      {
        "lari": "Zezele",
        "french": "Est desserré / sont desserrés"
      },
      {
        "lari": "Kanga",
        "french": "Attacher"
      },
      {
        "lari": "Nsuki | —",
        "french": "Les cheveux"
      },
      {
        "lari": "Tshinkuti, Kinkuti | Binkuti",
        "french": "Habit, vêtement | Habits, vêtements"
      },
      {
        "lari": "Mulele | Milele",
        "french": "Pagne | Pagnes"
      },
      {
        "lari": "Mapapa | —",
        "french": "Chaussures"
      },
      {
        "lari": "Tambala, Tshitambala, Kitambala | Bitambala",
        "french": "Foulard, mouchoir de tête | Foulards"
      },
      {
        "lari": "Mfumbu | —",
        "french": "Légume sauvage (emblème Kongo)"
      },
      {
        "lari": "Nsuki ji zezele.",
        "french": "Les cheveux sont desserrés."
      },
      {
        "lari": "Binkuti bi zezele.",
        "french": "Les habits sont desserrés."
      },
      {
        "lari": "Tshinkuti tshi zezele.",
        "french": "L'habit est desserré."
      },
      {
        "lari": "Mapapa ma zezele.",
        "french": "Les chaussures sont desserrées."
      },
      {
        "lari": "Kanga mulele, wu zezele.",
        "french": "Attache le pagne, il s'est desserré."
      },
      {
        "lari": "Kanga mapapa, ma zezele.",
        "french": "Attache les chaussures, elles sont desserrées."
      },
      {
        "lari": "Kanga nsuki, ji zezele.",
        "french": "Attache tes cheveux, ils sont desserrés."
      },
      {
        "lari": "Kanga tshinkuti, tshi zezele.",
        "french": "Attache ton habit, il est desserré."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel marqueur de classe utilise-t-on avec « Nsuki » (cheveux) ?",
        "answer": "ji"
      },
      {
        "type": "fill-in-blank",
        "question": "Binkuti ___ zezele. (Les habits sont desserrés.)",
        "answer": "bi"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime « zezele » ?",
        "answer": "A resulting state (loosened)"
      },
      {
        "type": "fill-in-blank",
        "question": "Kanga mapapa, ___ zezele. (Attache les chaussures, elles sont desserrées.)",
        "answer": "ma"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Kanga » dans la phrase « Kanga nsuki, ji zezele » ?",
        "answer": "Tie / Fasten"
      },
      {
        "type": "fill-in-blank",
        "question": "Kanga mulele, ___ zezele. (Attache le pagne, il s'est desserré.)",
        "answer": "wu"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom à son marqueur de classe correct utilisé avec « zezele »",
        "answer": "Nsuki (cheveux)=ji, Binkuti (habits)=bi, Tshinkuti (habit)=tshi, Mapapa (chaussures)=ma"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre « zeza » et « zezesa » ?",
        "answer": "Zeza = come loose (intransitive), Zezesa = loosen something (causative/transitive)"
      }
    ]
  },
  {
    "id": "zaza-teketa",
    "title": "Zaza & Teketa — Trembloter et trembler",
    "level": "intermediate",
    "topic": "zaza",
    "vocab": [
      {
        "lari": "Zaza",
        "french": "Trembloter, être en émoi, trembler d'excitation"
      },
      {
        "lari": "Teketa",
        "french": "Trembler"
      },
      {
        "lari": "Mfuekene",
        "french": "Glouton (invariable)"
      },
      {
        "lari": "Mu bungu",
        "french": "À cause de"
      },
      {
        "lari": "Madia",
        "french": "La nourriture"
      },
      {
        "lari": "Dinteketa | Manteketa",
        "french": "Fourmis rouges comestibles acidulées"
      },
      {
        "lari": "Ntela",
        "french": "Arbre sacré (= dis-moi, révèle-moi)"
      },
      {
        "lari": "Zaza ni ta zaza mu bungu dia madia.",
        "french": "Je suis en train de trembloter à cause de la nourriture."
      },
      {
        "lari": "Zaza ta zaza mu bungu dia madia.",
        "french": "Tu es en train de trembloter à cause de la nourriture."
      },
      {
        "lari": "Zaza ka ta zaza mu bungu dia madia.",
        "french": "Il/elle est en train de trembloter à cause de la nourriture."
      },
      {
        "lari": "Zaza tu ta zaza mu bungu dia madia.",
        "french": "Nous sommes en train de trembloter à cause de la nourriture."
      },
      {
        "lari": "Zaza lu ta zaza mu bungu dia madia.",
        "french": "Vous êtes en train de trembloter à cause de la nourriture."
      },
      {
        "lari": "Zaza ba ta zaza mu bungu dia madia.",
        "french": "Ils/elles sont en train de trembler à cause de la nourriture."
      },
      {
        "lari": "Mfuekene zaza ka ta zaza mu bungu dia madia.",
        "french": "Le glouton est en train de trembler à cause de la nourriture."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Zaza » ?",
        "answer": "To tremble, to quiver with excitement"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mfuekene » ?",
        "answer": "A glutton"
      },
      {
        "type": "fill-in-blank",
        "question": "Zaza ___ ta zaza mu bungu dia madia. (Je suis en train de trembloter à cause de la nourriture.)",
        "answer": "ni"
      },
      {
        "type": "fill-in-blank",
        "question": "Zaza ___ ta zaza mu bungu dia madia. (Il/elle est en train de trembloter à cause de la nourriture.)",
        "answer": "ka"
      },
      {
        "type": "fill-in-blank",
        "question": "Zaza ___ ta zaza mu bungu dia madia. (Nous sommes en train de trembloter à cause de la nourriture.)",
        "answer": "tu"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mu bungu » ?",
        "answer": "Because of"
      },
      {
        "type": "multiple-choice",
        "question": "Pourquoi les fourmis rouges comestibles sont-elles appelées « Manteketa » ?",
        "answer": "Because they seem to tremble when they move"
      },
      {
        "type": "multiple-choice",
        "question": "À quoi sert l'arbre « Ntela » dans la tradition Kongo ?",
        "answer": "To reveal the truth and elucidate situations"
      }
    ]
  },
  {
    "id": "yala",
    "title": "Yala — Étendre, Étaler",
    "level": "intermediate",
    "topic": "yala",
    "vocab": [
      {
        "lari": "Yala",
        "french": "Étendre, étaler"
      },
      {
        "lari": "Njila",
        "french": "Chemin, route"
      },
      {
        "lari": "Nkuala",
        "french": "Natte"
      },
      {
        "lari": "Vunga",
        "french": "Couverture"
      },
      {
        "lari": "Mala",
        "french": "Loin"
      },
      {
        "lari": "Hata",
        "french": "Village"
      },
      {
        "lari": "Ha",
        "french": "Au niveau de, à"
      },
      {
        "lari": "Ha ma hambu",
        "french": "À l'intersection"
      },
      {
        "lari": "Yalavunga ka mala ko na Tshinkala, mu njila ya Mfua.",
        "french": "Yalavunga n'est pas loin de Kinkala, sur la route de Mfua."
      },
      {
        "lari": "Hata die mpe ha ma hambu ma njila ya Boko na Kinkala.",
        "french": "Ce village est à l'intersection de la route de Boko et Kinkala."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Yala » ?",
        "answer": "To spread / extend"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce qu'un « Nkuala » ?",
        "answer": "A mat"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkuala ___ ta yala. (Je suis en train d'étendre une natte.)",
        "answer": "ni"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkuala ___ ta yala. (Il/elle est en train d'étendre une natte.)",
        "answer": "ka"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkuala ___ ta yala. (Nous sommes en train d'étendre une natte.)",
        "answer": "tu"
      },
      {
        "type": "multiple-choice",
        "question": "Où se trouve Yalavunga ?",
        "answer": "Near Kinkala, on the road to Mfua"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot lari à sa signification",
        "answer": "Yala=To spread / extend, Nkuala=Mat, Vunga=Blanket, Njila=Path / road"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkuala ___ yala. (Tu es en train d'étendre une natte.)",
        "answer": "ta"
      }
    ]
  },
  {
    "id": "yela",
    "title": "Yela — Essayer / Tester",
    "level": "beginner",
    "topic": "yela",
    "vocab": [
      {
        "lari": "Yela",
        "french": "Essayer, tester"
      },
      {
        "lari": "Sukula",
        "french": "Laver"
      },
      {
        "lari": "Luse / Tuse",
        "french": "Visage(s)"
      },
      {
        "lari": "Luto / Tuto",
        "french": "Cuillère(s)"
      },
      {
        "lari": "Tshinkuti",
        "french": "Habit, vêtement"
      },
      {
        "lari": "Mapapa",
        "french": "Chaussures"
      },
      {
        "lari": "Moko",
        "french": "Mains"
      },
      {
        "lari": "Mbombo",
        "french": "Nez"
      },
      {
        "lari": "Mulele",
        "french": "Pagne"
      },
      {
        "lari": "Tuti | Matuti",
        "french": "Nuage(s)"
      },
      {
        "lari": "Bembe / Mabembe",
        "french": "Pigeon(s)"
      },
      {
        "lari": "Nsusu",
        "french": "Poulet"
      },
      {
        "lari": "Nkombo",
        "french": "Chèvre"
      },
      {
        "lari": "Lumfikini / Tumfikini",
        "french": "Chauve-souris (sg/pl)"
      },
      {
        "lari": "Sangi / Masangi",
        "french": "Forêt(s)"
      },
      {
        "lari": "Tshitunga / Bitunga",
        "french": "Panier(s)"
      },
      {
        "lari": "Yela tshinkuti.",
        "french": "Essaie l'habit."
      },
      {
        "lari": "Yela mu dia.",
        "french": "Essaie de manger."
      },
      {
        "lari": "Yela mu luata.",
        "french": "Essaie de t'habiller."
      },
      {
        "lari": "Yela mu yebela.",
        "french": "Essaie de te laver."
      },
      {
        "lari": "Sukula luse.",
        "french": "Lave le visage."
      },
      {
        "lari": "Sukula luse luaku.",
        "french": "Lave ton visage."
      },
      {
        "lari": "Mu sukula luse.",
        "french": "Lave-lui son visage."
      },
      {
        "lari": "Mu sukula mapapa.",
        "french": "Lave-lui ses chaussures."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Yela' ?",
        "answer": "To try / test"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mu sukula luse' ?",
        "answer": "Wash his/her face (for them)"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le préfixe possessif pour 'Luse' (visage) ?",
        "answer": "lu-"
      },
      {
        "type": "fill-in-blank",
        "question": "Yela ___ dia — Essaie de manger.",
        "answer": "mu"
      },
      {
        "type": "fill-in-blank",
        "question": "Luse ___ — Mon visage.",
        "answer": "luani"
      },
      {
        "type": "fill-in-blank",
        "question": "Tuto ___ — Ses cuillères.",
        "answer": "tuandi"
      },
      {
        "type": "fill-in-blank",
        "question": "Nsusu ___ — Ce poulet là-bas.",
        "answer": "yine"
      },
      {
        "type": "matching",
        "question": "Associez chaque expression possessive à sa signification.",
        "answer": "Luse luani=Mon visage, Tuto tuaku=Tes cuillères, Luse luandi=Son visage, Tuto tueto=Nos cuillères"
      }
    ]
  },
  {
    "id": "fatigue-nkolo",
    "title": "La fatigue — N'kolo / Mukolo",
    "level": "beginner",
    "topic": "fatigue",
    "vocab": [
      {
        "lari": "N'kolo / Mukolo",
        "french": "La fatigue"
      },
      {
        "lari": "Mpungi",
        "french": "Un klaxon, une trompette"
      },
      {
        "lari": "N'kolo we nani.",
        "french": "Je suis fatigué(e)."
      },
      {
        "lari": "N'kolo we naku.",
        "french": "Tu es fatigué(e)."
      },
      {
        "lari": "N'kolo we nandi.",
        "french": "Il/Elle est fatigué(e)."
      },
      {
        "lari": "N'kolo we neto.",
        "french": "Nous sommes fatigué(e)s."
      },
      {
        "lari": "N'kolo we neno.",
        "french": "Vous êtes fatigué(e)s."
      },
      {
        "lari": "N'kolo we nawu.",
        "french": "Ils/Elles sont fatigué(e)s."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Je suis fatigué(e) » en kikongo lari ?",
        "answer": "N'kolo we nani."
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « N'kolo we nawu » ?",
        "answer": "They are tired."
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce qu'un « Mpungi » ?",
        "answer": "A horn / trumpet"
      },
      {
        "type": "fill-in-blank",
        "question": "N'kolo we ___. (Tu es fatigué(e).)",
        "answer": "naku"
      },
      {
        "type": "fill-in-blank",
        "question": "N'kolo we ___. (Nous sommes fatigué(e)s.)",
        "answer": "neto"
      },
      {
        "type": "matching",
        "question": "Associez chaque phrase lari à sa signification.",
        "answer": "N'kolo we nani=I am tired, N'kolo we naku=You are tired, N'kolo we nandi=He/She is tired, N'kolo we neto=We are tired"
      },
      {
        "type": "crossword",
        "question": "Crossword — Fatigue & Vocabulary"
      },
      {
        "type": "crossword",
        "question": "Crossword — Fatigue & Vocabulary"
      }
    ]
  },
  {
    "id": "fu-fi-dictionary",
    "title": "Verbes et noms en Fu- & Fi-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Finga",
        "french": "Injurier"
      },
      {
        "lari": "Fisuka",
        "french": "Se tordre un membre, se fouler"
      },
      {
        "lari": "Fuki",
        "french": "Ténacité, diligence, persévérance"
      },
      {
        "lari": "Futika",
        "french": "Plier, rompre"
      },
      {
        "lari": "Funda",
        "french": "Un paquet"
      },
      {
        "lari": "Fumu",
        "french": "Tabac"
      },
      {
        "lari": "Funana",
        "french": "Se multiplier"
      },
      {
        "lari": "Mfumba, Mufumba | Mifumba",
        "french": "Une roue"
      },
      {
        "lari": "Fua",
        "french": "Mourir, être mort"
      },
      {
        "lari": "Fiantakana",
        "french": "Maigrir, s'affaisser"
      },
      {
        "lari": "Fidila",
        "french": "Mener, conduire"
      },
      {
        "lari": "Fila",
        "french": "Conduire, mener, escorter"
      },
      {
        "lari": "Fiela",
        "french": "Mener des investigations"
      },
      {
        "lari": "Fumpa",
        "french": "Déborder quand ça bout"
      },
      {
        "lari": "Funda (v.)",
        "french": "Accuser, comparaître en justice"
      },
      {
        "lari": "Funda nkata",
        "french": "S'asseoir en tailleur"
      },
      {
        "lari": "Fuana",
        "french": "Suffire, être suffisant"
      },
      {
        "lari": "Fuanana",
        "french": "Être égal à, convenir avec"
      },
      {
        "lari": "Fuemba",
        "french": "Se moucher"
      },
      {
        "lari": "Fueni",
        "french": "Il faut, on doit, il suffit de"
      },
      {
        "lari": "Fuika",
        "french": "À bon prix, obtenir par chance"
      },
      {
        "lari": "Fuila",
        "french": "Envie de, désir"
      },
      {
        "lari": "Habuka",
        "french": "Être ébréché"
      },
      {
        "lari": "Hemba",
        "french": "Se moucher"
      },
      {
        "lari": "Huma",
        "french": "Un endroit, un lieu"
      }
    ],
    "exercises": [
      {
        "type": "crossword",
        "question": "Crossword — Fu- & Fi- Vocabulary"
      },
      {
        "type": "word-search",
        "question": "Word Search — Fu- & Fi- Vocabulary"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Fu- & Fi- Verbs & Nouns"
      }
    ]
  },
  {
    "id": "interrogative-bue-nki-kue",
    "title": "Mots interrogatifs — Bue, Nki, Kue",
    "level": "intermediate",
    "topic": "interrogative",
    "vocab": [
      {
        "lari": "Bue",
        "french": "Qu'est-ce que, comment"
      },
      {
        "lari": "Nki",
        "french": "Pourquoi / Qu'est-ce que ?"
      },
      {
        "lari": "Kue",
        "french": "Où"
      },
      {
        "lari": "Ku",
        "french": "À (préposition de lieu)"
      },
      {
        "lari": "Keti",
        "french": "Ou (conjonction)"
      },
      {
        "lari": "Kota",
        "french": "Entrer"
      },
      {
        "lari": "Dila",
        "french": "Pleurer"
      },
      {
        "lari": "Dia",
        "french": "Manger"
      },
      {
        "lari": "Dirila",
        "french": "Forme progressive interrogative de Dila (pleurer)"
      },
      {
        "lari": "Tele",
        "french": "Dire (au passé)"
      },
      {
        "lari": "Mu nkia bungu",
        "french": "Pour quelle raison"
      },
      {
        "lari": "Bungu | Mabungu",
        "french": "Raison, motif"
      },
      {
        "lari": "Tshibungu | Bibungu",
        "french": "Des mottes de terre"
      },
      {
        "lari": "Nkia",
        "french": "Quelle (se prononce /ntshia/)"
      },
      {
        "lari": "Nzo mikanda",
        "french": "École"
      },
      {
        "lari": "Bue ntele?",
        "french": "Qu'ai-je dit ?"
      },
      {
        "lari": "Bue tele?",
        "french": "Qu'as-tu dit ?"
      },
      {
        "lari": "Bue ka tele?",
        "french": "Qu'a-t-elle dit ?"
      },
      {
        "lari": "Bue tu tele?",
        "french": "Qu'avons-nous dit ?"
      },
      {
        "lari": "Bue lu tele?",
        "french": "Qu'avez-vous dit ?"
      },
      {
        "lari": "Bue ba tele?",
        "french": "Qu'ont-ils dit ?"
      },
      {
        "lari": "Nki ni ta dirila?",
        "french": "Pourquoi je pleure ?"
      },
      {
        "lari": "Nki ta dirila?",
        "french": "Pourquoi tu pleures ?"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Bue ka tele ? » ?",
        "answer": "What did she say?"
      },
      {
        "type": "multiple-choice",
        "question": "Dans « Nki ta dia ? », que signifie NKI ?",
        "answer": "What"
      },
      {
        "type": "multiple-choice",
        "question": "Dans « Nki ta dila ? », que signifie NKI ?",
        "answer": "Why"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Kue ta kuenda ? » ?",
        "answer": "Where are you going?"
      },
      {
        "type": "matching",
        "question": "Associez les mots interrogatifs à leur signification.",
        "answer": "Bue=What did...say?, Nki (+ infinitif)=What?, Nki (+ progressif)=Why?, Kue=Where?"
      },
      {
        "type": "matching",
        "question": "Associez les questions Kikongo Lari à leur traduction française.",
        "answer": "Bue tele?=What did you say?, Nki ta dirila?=Why are you crying?, Nki ta dia?=What are you eating?, Kue ta kuenda?=Where are you going?"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ka tele ? = Qu'a-t-elle dit ?",
        "answer": "bue"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ta kuenda ? = Où vas-tu ?",
        "answer": "kue"
      }
    ]
  },
  {
    "id": "vu-ho-fu-cooking",
    "title": "Vu- / Ho- / Fu- — Cuisine, réveil et artisanat",
    "level": "intermediate",
    "topic": "vu",
    "vocab": [
      {
        "lari": "Vumbula",
        "french": "Réveiller quelqu'un"
      },
      {
        "lari": "Vumbuka",
        "french": "Se réveiller"
      },
      {
        "lari": "Vumbukila",
        "french": "Se réveiller pour une action précise"
      },
      {
        "lari": "Vumba",
        "french": "Cuire sous la cendre"
      },
      {
        "lari": "Muvumba",
        "french": "Papillote cuite sous la cendre"
      },
      {
        "lari": "Vuaza",
        "french": "Pétrir, mélanger"
      },
      {
        "lari": "Hota",
        "french": "Pétrir"
      },
      {
        "lari": "Fufu",
        "french": "Plat à base de manioc, banane ou igname pilé et cuit"
      },
      {
        "lari": "Mvuala",
        "french": "Consonnes"
      },
      {
        "lari": "Kisimba",
        "french": "Voyelle"
      },
      {
        "lari": "Mazita",
        "french": "Syllables, caractères"
      },
      {
        "lari": "Bisinsu",
        "french": "Signes de ponctuation"
      },
      {
        "lari": "Tshinsunsu",
        "french": "Punaise"
      },
      {
        "lari": "Kinsekua",
        "french": "Punaise de lit"
      },
      {
        "lari": "Yinama",
        "french": "Se pencher pour observer"
      },
      {
        "lari": "Yinamana",
        "french": "Se pencher sur"
      },
      {
        "lari": "Yama",
        "french": "Gronder"
      },
      {
        "lari": "Semba",
        "french": "Blâmer, réprimander"
      },
      {
        "lari": "Ndabu",
        "french": "Des cils"
      },
      {
        "lari": "Bola",
        "french": "Pourrir, être mouillé"
      },
      {
        "lari": "Tshiba | Biba",
        "french": "Couvercle d'une casserole"
      },
      {
        "lari": "Nkama | Mikama",
        "french": "La digue"
      },
      {
        "lari": "Bubolo",
        "french": "La fainéantise"
      },
      {
        "lari": "Hakimosi",
        "french": "Ensemble"
      },
      {
        "lari": "BA",
        "french": "Être, exister, habiter"
      }
    ],
    "exercises": [
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Vu- / Ho- / Fu- — Cooking, Waking & Crafting"
      }
    ]
  },
  {
    "id": "bubolo-laziness",
    "title": "Bubolo — La paresse et ses conséquences",
    "level": "intermediate",
    "topic": "bubolo",
    "vocab": [
      {
        "lari": "Bubolo",
        "french": "La fainéantise, la paresse"
      },
      {
        "lari": "Nsatu",
        "french": "La faim"
      },
      {
        "lari": "Fua",
        "french": "Mourir"
      },
      {
        "lari": "Mana sa",
        "french": "Être (condition)"
      },
      {
        "lari": "Mbo",
        "french": "Particule du futur"
      },
      {
        "lari": "Mu kua bubolo mbo ka fua nsatu",
        "french": "Le paresseux va mourir de faim."
      }
    ],
    "exercises": [
      {
        "type": "fill-in-blank",
        "question": "Le ___ va mourir de faim",
        "answer": "bubolo"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Bubolo — Laziness & Consequences"
      }
    ]
  },
  {
    "id": "maba-palm-trees",
    "title": "Maba — Les palmiers et le malafoutier",
    "level": "intermediate",
    "topic": "maba",
    "vocab": [
      {
        "lari": "Ba | Maba",
        "french": "Palmier(s)"
      },
      {
        "lari": "Musongi | N'songi | Misongi",
        "french": "Le malafoutier"
      },
      {
        "lari": "Baka",
        "french": "Tailler, entretenir les palmiers"
      },
      {
        "lari": "Lupangu | Tupangu",
        "french": "Parcelle(s)"
      },
      {
        "lari": "Senga",
        "french": "Visiter, rendre visite"
      },
      {
        "lari": "Pari",
        "french": "Matin"
      },
      {
        "lari": "Nkokela",
        "french": "Soir"
      },
      {
        "lari": "Kibaka | Bibaka",
        "french": "Le mur"
      },
      {
        "lari": "Bibiriki",
        "french": "Des briques"
      },
      {
        "lari": "Tshihala",
        "french": "Un lézard"
      },
      {
        "lari": "Maba ma tatu me ku lupangu luani.",
        "french": "Il y a 3 palmiers dans ma parcelle."
      },
      {
        "lari": "N'songi maba ka ta baka.",
        "french": "Le malafoutier taille les palmiers."
      },
      {
        "lari": "Musongi maba pari na nkokela ka senga mo.",
        "french": "Le malafoutier visite ses palmiers matin et soir."
      },
      {
        "lari": "Musongi ba diandi pari na nkokela ka senga dio.",
        "french": "Le malafoutier visite son palmier matin et soir."
      },
      {
        "lari": "Mbuta Wabeladio Payi pakudungu na pelekete ka mona mu kibaka kia bibiriki.",
        "french": "Mbuta Wabeladio Payi a vu le pakudungu et le pelekete sur un mur de briques."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Musongi maba' ?",
        "answer": "A palm wine tapper"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Maba — Palm Trees & The Malafoutier"
      }
    ]
  },
  {
    "id": "wuna-lying",
    "title": "Wuna — Mentir et la tromperie",
    "level": "intermediate",
    "topic": "wuna",
    "vocab": [
      {
        "lari": "Wuna",
        "french": "Mentir"
      },
      {
        "lari": "Bumbaki",
        "french": "Le mensonge, l'escroquerie"
      },
      {
        "lari": "Mbaki",
        "french": "L'escroc"
      },
      {
        "lari": "Ngungu",
        "french": "Le menteur"
      }
    ],
    "exercises": [
      {
        "type": "fill-in-blank",
        "question": "Il m'a menti.",
        "answer": "ngunini"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ngungu' ?",
        "answer": "The liar"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Wuna — Lying & Deception"
      }
    ]
  },
  {
    "id": "locations-positions",
    "title": "Mbuka — Les lieux, les endroits",
    "level": "beginner",
    "topic": "locations",
    "vocab": [
      {
        "lari": "Ku banda",
        "french": "En bas de, au bas de"
      },
      {
        "lari": "Ku nkia",
        "french": "Sous"
      },
      {
        "lari": "Ha ntandu",
        "french": "Au-dessus de"
      },
      {
        "lari": "Meza",
        "french": "La table"
      },
      {
        "lari": "Mfulu",
        "french": "Le lit"
      },
      {
        "lari": "Nkuala",
        "french": "La natte"
      },
      {
        "lari": "Buku",
        "french": "Le livre"
      },
      {
        "lari": "Mabuku",
        "french": "Les livres"
      },
      {
        "lari": "Vungula",
        "french": "La clef"
      },
      {
        "lari": "Vunga",
        "french": "La couverture"
      },
      {
        "lari": "Mavunga",
        "french": "Les couvertures"
      },
      {
        "lari": "Mbuma",
        "french": "Le chat"
      },
      {
        "lari": "Mulumba",
        "french": "Le lapin"
      },
      {
        "lari": "Milumba",
        "french": "Les lapins"
      },
      {
        "lari": "Lupungunzala",
        "french": "La libellule"
      },
      {
        "lari": "Tupungunzala",
        "french": "Les libellules"
      },
      {
        "lari": "Tshihala",
        "french": "Le lézard"
      },
      {
        "lari": "Bihala",
        "french": "Les lézards"
      },
      {
        "lari": "Tshula",
        "french": "Le crapaud"
      },
      {
        "lari": "Biula",
        "french": "Les crapauds"
      },
      {
        "lari": "Tshisari",
        "french": "Le travailleur"
      },
      {
        "lari": "Bisari",
        "french": "Les travailleurs"
      },
      {
        "lari": "Nsaba",
        "french": "Le jardin"
      },
      {
        "lari": "Lukaya",
        "french": "La feuille"
      },
      {
        "lari": "Njila",
        "french": "Le chemin"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Le livre est sous le lit' ?",
        "answer": "Buku ku nkia mfulu diena"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la copule au passé pour les noms de classe 5 ?",
        "answer": "dieri"
      },
      {
        "type": "fill-in-blank",
        "question": "Tshula ___ lukaya tshena. (Le crapaud est SUR la feuille)",
        "answer": "ha"
      },
      {
        "type": "matching",
        "question": "Reliez chaque préposition à son sens.",
        "answer": "Ku nkia=Under / beneath, Ku banda=Below / at the bottom of, Ha ntandu=Above / on top, -eri=Past tense copula"
      },
      {
        "type": "fill-in-blank",
        "question": "Vungula ku nkia nkuala ___. (La clef ÉTAIT sous la natte — passé)",
        "answer": "yeri"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le sens profond de NZARI (le nom du fleuve Kongo) ?",
        "answer": "Universe of the Inner Sun"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Mbuka — Locations & Positions"
      }
    ]
  },
  {
    "id": "wuinda-mbata",
    "title": "Le verbe Wuinda — Donner une gifle",
    "level": "intermediate",
    "topic": "wuinda",
    "vocab": [
      {
        "lari": "Wuinda",
        "french": "Gifler, donner une gifle"
      },
      {
        "lari": "Mbata",
        "french": "Gifle, claque"
      },
      {
        "lari": "Wuinda mbata",
        "french": "Donner une gifle"
      },
      {
        "lari": "Banda mbata",
        "french": "Gifler, frapper"
      },
      {
        "lari": "Muntu",
        "french": "Quelqu'un, une personne"
      },
      {
        "lari": "Mbaji",
        "french": "Demain"
      },
      {
        "lari": "Mbo",
        "french": "Particule du futur"
      },
      {
        "lari": "Mbaji mbo ni wuinda muntu mbata",
        "french": "Demain, je giflerai quelqu'un"
      },
      {
        "lari": "Muntu ba wuindiri mbata",
        "french": "Ils ont giflé quelqu'un"
      },
      {
        "lari": "Mbata ka ku wuindiri",
        "french": "Il t'a giflé(e)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle est la particule du futur en Kikongo Lari ?",
        "answer": "Mbo"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Il m'a giflé(e)' en Kikongo Lari ?",
        "answer": "Mbata ka nguindiri"
      },
      {
        "type": "matching",
        "question": "Reliez chaque phrase à sa traduction.",
        "answer": "Mbo ni wuinda muntu mbata=I will slap someone, Mbata tu mu wuindiri=We slapped him/her, Muntu nguidiri mbata=I slapped someone, Mbo ba wuinda muntu mbata=They will slap someone"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbo ___ wuinda muntu mbata (Nous giflerons quelqu'un)",
        "answer": "tu"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbaji ___ ni wuinda muntu mbata (Demain, je giflerai quelqu'un)",
        "answer": "mbo"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle phrase signifie 'Tu as giflé quelqu'un' ?",
        "answer": "Muntu wuindiri mbata"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – The Verb Wuinda — Giving a Slap"
      }
    ]
  },
  {
    "id": "ha-ndeko",
    "title": "Ha Ndeko — À côté de",
    "level": "intermediate",
    "topic": "ha",
    "vocab": [
      {
        "lari": "Ha ndeko",
        "french": "À côté (de)"
      },
      {
        "lari": "Mamba",
        "french": "L'eau (sous-entendu la rivière)"
      },
      {
        "lari": "Nto",
        "french": "La rivière"
      },
      {
        "lari": "Nzo mikanda",
        "french": "L'école"
      },
      {
        "lari": "Mundele | Mindele",
        "french": "Le Blanc | Les Blancs (sing./pl. classe mu-/mi-)"
      },
      {
        "lari": "Bamindele",
        "french": "Les Blancs (classe ba-)"
      },
      {
        "lari": "Muntu | Bantu",
        "french": "Personne | Personnes"
      },
      {
        "lari": "N'ti, Muti | Miti",
        "french": "Arbre(s)"
      },
      {
        "lari": "Ba | Maba",
        "french": "Palmier | Palmiers"
      },
      {
        "lari": "Nka muana we?",
        "french": "Quel enfant ?"
      },
      {
        "lari": "Mpu",
        "french": "Le chapeau"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ha ndeko' ?",
        "answer": "Next to, beside"
      },
      {
        "type": "fill-in-blank",
        "question": "Nzo ani ha ndeko nto ___. (Ma maison est à côté de la rivière)",
        "answer": "yena"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle copule utilise-t-on avec les noms propres ?",
        "answer": "ke(na)"
      },
      {
        "type": "matching",
        "question": "Reliez chaque sujet à sa copule correcte.",
        "answer": "Nzo (maison)=ye(na), Muntu (personne)=we(na), Bantu (personnes)=be(na), Ta Masamba=ke(na)"
      },
      {
        "type": "fill-in-blank",
        "question": "Bantu ha ndeko nti ___. (Les personnes sont à côté de l'arbre)",
        "answer": "bena"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ha Ndeko — Next to, Beside"
      }
    ]
  },
  {
    "id": "ku-nima-miti",
    "title": "Ku (Ma)nima na Nkumba za Miti — Derrière et les noms d'arbres",
    "level": "intermediate",
    "topic": "ku",
    "vocab": [
      {
        "lari": "Ku nima",
        "french": "Derrière"
      },
      {
        "lari": "Kuna",
        "french": "Planter"
      },
      {
        "lari": "Nikuna",
        "french": "Essayer de faire bouger quelque chose"
      },
      {
        "lari": "Ko",
        "french": "Il y a (pour le lieu uniquement)"
      },
      {
        "lari": "Mulala | Milala",
        "french": "Un oranger | Des orangers"
      },
      {
        "lari": "Mumanga | Mimanga",
        "french": "Un manguier | Des manguiers"
      },
      {
        "lari": "Musafu | Misafu",
        "french": "Le safoutier | Les safoutiers"
      },
      {
        "lari": "Musavoka | Misavoka",
        "french": "L'avocatier | Les avocatiers"
      },
      {
        "lari": "Munkondi | Minkondi",
        "french": "Un bananier | Des bananiers"
      },
      {
        "lari": "Mukokoti | Mikokoti",
        "french": "Un cocotier | Des cocotiers"
      },
      {
        "lari": "Mupapaayi | Mipapaayi",
        "french": "Un papayer | Des papayers"
      },
      {
        "lari": "Ngiele kuna nzo",
        "french": "Je m'en vais chez moi"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ku nima' ?",
        "answer": "Behind"
      },
      {
        "type": "matching",
        "question": "Reliez les noms d'arbres à leurs traductions.",
        "answer": "Mulala=Orange tree, Mumanga=Mango tree, Musafu=Safou tree, Munkondi=Banana tree"
      },
      {
        "type": "fill-in-blank",
        "question": "Ku nima nzo mulala ___ ko. (Il y a un oranger derrière la maison)",
        "answer": "wena"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime 'ko' dans les phrases de localisation ?",
        "answer": "There is (existence)"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ku (Ma)nima na Nkumba za Miti — Behind & Tree Names"
      }
    ]
  },
  {
    "id": "mu-kati-mu",
    "title": "Mu kati na Mu — Dans, à l'intérieur de",
    "level": "intermediate",
    "topic": "mu",
    "vocab": [
      {
        "lari": "Mu kati",
        "french": "Dans, à l'intérieur"
      },
      {
        "lari": "Mu",
        "french": "Dans, à l'intérieur de"
      },
      {
        "lari": "Nguya",
        "french": "Le sanglier"
      },
      {
        "lari": "Ntebe",
        "french": "La boue"
      },
      {
        "lari": "Tshinzu, Kinzu | Binzu",
        "french": "La marmite en terre cuite | Les marmites"
      },
      {
        "lari": "Madia",
        "french": "La nourriture"
      },
      {
        "lari": "Loso",
        "french": "Le riz"
      },
      {
        "lari": "Dimpa",
        "french": "Le pain"
      },
      {
        "lari": "Mapapayi",
        "french": "Les papayes"
      },
      {
        "lari": "Buwa",
        "french": "Les champignons"
      },
      {
        "lari": "Bikola",
        "french": "Les légumes"
      },
      {
        "lari": "Madezo",
        "french": "Les haricots"
      },
      {
        "lari": "Bintu",
        "french": "Les ananas"
      },
      {
        "lari": "Lambila",
        "french": "Cuire (pour quelqu'un)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mu kati' ?",
        "answer": "Inside, within"
      },
      {
        "type": "fill-in-blank",
        "question": "Madia ___ ba lambila mu kinzu matoma me. (La nourriture QUI cuit...)",
        "answer": "ma"
      },
      {
        "type": "matching",
        "question": "Reliez chaque nom à son pronom démonstratif correct.",
        "answer": "Madia=ma, Loso=lu, Dimpa=di, Buwa=bu"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est l'accord de l'adjectif de qualité pour 'Buwa' ?",
        "answer": "bubote"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Mu kati na Mu — Inside, Within"
      }
    ]
  },
  {
    "id": "zonzeka-kutika",
    "title": "Zonzeka na Kutika — Ranger",
    "level": "intermediate",
    "topic": "zonzeka",
    "vocab": [
      {
        "lari": "Zonzeka",
        "french": "Ranger en entassant, ranger, regrouper, réunir"
      },
      {
        "lari": "Kutika",
        "french": "Ranger"
      },
      {
        "lari": "Vunga | Mavunga",
        "french": "La couverture | Les couvertures"
      },
      {
        "lari": "Binkuti",
        "french": "Les habits"
      },
      {
        "lari": "Lukuba",
        "french": "Le coussin"
      },
      {
        "lari": "Kumbi",
        "french": "La voiture"
      },
      {
        "lari": "Mulele | Milele",
        "french": "Le pagne | Les pagnes"
      },
      {
        "lari": "Buku | Mabuku",
        "french": "Le livre | Les livres"
      },
      {
        "lari": "Zonzeka mabuku maku.",
        "french": "Range tes livres."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Zonzeka' ?",
        "answer": "To stack / to tidy up"
      },
      {
        "type": "fill-in-blank",
        "question": "Vunga diani dia ___. (J'ai rangé ma couverture — passé)",
        "answer": "nkutikiri"
      },
      {
        "type": "matching",
        "question": "Reliez chaque personne à ce qu'elle a rangé.",
        "answer": "Vunga diani=I tidied my blanket, Binkuti biaku=You tidied your clothes, Lukuba luto=We tidied our cushion, Milele miawu=They tidied their loincloths"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Zonzeka na Kutika — Tidying Up"
      }
    ]
  },
  {
    "id": "kani-conditional",
    "title": "Kani — Si j'avais (Conditionnel)",
    "level": "intermediate",
    "topic": "kani",
    "vocab": [
      {
        "lari": "Kani",
        "french": "Si (conditionnel)"
      },
      {
        "lari": "Nzundu",
        "french": "Le marteau"
      },
      {
        "lari": "Na",
        "french": "Et, avec"
      },
      {
        "lari": "Yo",
        "french": "Pronom se rapportant au singulier"
      },
      {
        "lari": "Zo",
        "french": "Pronom se rapportant au pluriel"
      },
      {
        "lari": "Lala | Malala",
        "french": "Une orange | Des oranges"
      },
      {
        "lari": "Tshintu | Bintu",
        "french": "Un ananas | Des ananas"
      },
      {
        "lari": "Matu",
        "french": "Des pirogues"
      },
      {
        "lari": "Lunguba",
        "french": "Une arachide"
      },
      {
        "lari": "Mulele | Milele",
        "french": "Un pagne | Des pagnes"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Kani' ?",
        "answer": "If (conditional)"
      },
      {
        "type": "fill-in-blank",
        "question": "Kani nzundu ___ na yo. (Si j'avais un marteau)",
        "answer": "njieri"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'yo' et 'zo' ?",
        "answer": "yo = singular, zo = plural"
      },
      {
        "type": "matching",
        "question": "Reliez chaque nom à son pronom de rappel.",
        "answer": "Malala (oranges)=mo, Lala (orange)=dio, Tshintu (pineapple)=tsho, Mulele (loincloth)=wo"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Kani — If I Had (Conditional)"
      }
    ]
  },
  {
    "id": "dictionary-new-vocab",
    "title": "Vocabulaire étendu — V, W, Y, T, N, L, F, Z, M",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Wasa",
        "french": "Guérir"
      },
      {
        "lari": "Yuza",
        "french": "Arracher avec les racines"
      },
      {
        "lari": "Vua",
        "french": "Neuf"
      },
      {
        "lari": "Vuadangu",
        "french": "Le canard"
      },
      {
        "lari": "Mvuala",
        "french": "Le bâton"
      },
      {
        "lari": "Mvuama",
        "french": "Riche"
      },
      {
        "lari": "Vuanda",
        "french": "Demeure, habiter"
      },
      {
        "lari": "Vuele",
        "french": "Le sac"
      },
      {
        "lari": "Vuata",
        "french": "La brasse"
      },
      {
        "lari": "Vimba",
        "french": "Enfler"
      },
      {
        "lari": "Kivimba",
        "french": "Une enflure"
      },
      {
        "lari": "Mvinda",
        "french": "Un ourlet"
      },
      {
        "lari": "Mvimbi mbukidi",
        "french": "La varicelle"
      },
      {
        "lari": "Mvindu",
        "french": "La saleté"
      },
      {
        "lari": "Vingana",
        "french": "Être échangé"
      },
      {
        "lari": "Vinza",
        "french": "Oindre, enduire"
      },
      {
        "lari": "Mvinzulu",
        "french": "L'onction"
      },
      {
        "lari": "Mvinzingila",
        "french": "Le rond, la boule"
      },
      {
        "lari": "Mvivi",
        "french": "Éruption cutanée"
      },
      {
        "lari": "Voka",
        "french": "Le bosquet"
      },
      {
        "lari": "Mvu",
        "french": "L'année"
      },
      {
        "lari": "M'vu",
        "french": "Les cheveux blancs"
      },
      {
        "lari": "Vuka",
        "french": "Échapper"
      },
      {
        "lari": "Vuku + verbe",
        "french": "On a failli (+ verbe)"
      },
      {
        "lari": "Vula",
        "french": "Surpasser / Détacher, détruire"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez le vocabulaire à sa signification.",
        "answer": "Mvuala=The stick, Mvuama=Rich, Widikila=To listen, Luwilukulu=The faith"
      },
      {
        "type": "matching",
        "question": "Reliez les animaux et termes naturels.",
        "answer": "Nzobo=The civet, Weka=Tsetse fly, Mvula=The rain, Vuadangu=The duck"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Widikila' ?",
        "answer": "To listen, to believe"
      },
      {
        "type": "fill-in-blank",
        "question": "___ signifie 'la foi' en Kikongo Lari",
        "answer": "luwilukulu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Extended Vocabulary — V, W, Y, T, N, L, F, Z, M"
      }
    ]
  },
  {
    "id": "biyungila-locatives",
    "title": "Les insectes et les particules locatives (ku, ha, mu)",
    "level": "intermediate",
    "topic": "biyungila",
    "vocab": [
      {
        "lari": "Kiyungila | Biyungila",
        "french": "Insecte(s)"
      },
      {
        "lari": "Nsaba",
        "french": "Jardin"
      },
      {
        "lari": "Ku",
        "french": "À, au (locatif)"
      },
      {
        "lari": "Ha",
        "french": "À (surface, proximité)"
      },
      {
        "lari": "Mu",
        "french": "Dans, à l'intérieur de"
      },
      {
        "lari": "Mamba",
        "french": "L'eau"
      },
      {
        "lari": "Lami | Malami",
        "french": "Fil(s) de fer"
      },
      {
        "lari": "Zangama",
        "french": "Être de grande taille"
      },
      {
        "lari": "Muntu",
        "french": "Personne"
      },
      {
        "lari": "Ku mbaji",
        "french": "Dehors"
      },
      {
        "lari": "Ko",
        "french": "Particule finale (correspond à ku)"
      },
      {
        "lari": "Ho",
        "french": "Particule finale (correspond à ha)"
      },
      {
        "lari": "Mo",
        "french": "Particule finale (correspond à mu)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle particule finale correspond à l'ouverture 'ku' ?",
        "answer": "ko"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Biyungila' ?",
        "answer": "The insects"
      },
      {
        "type": "fill-in-blank",
        "question": "Au jardin, il y a beaucoup d'insectes. Particule finale ?",
        "answer": "ko"
      },
      {
        "type": "fill-in-blank",
        "question": "À la maison, il y avait beaucoup d'insectes. Particule finale ?",
        "answer": "ho"
      },
      {
        "type": "fill-in-blank",
        "question": "Dans l'eau il y avait beaucoup d'insectes. Particule finale ?",
        "answer": "mo"
      },
      {
        "type": "matching",
        "question": "Reliez la particule locative à sa signification.",
        "answer": "Ku=At, to (a place), Ha=At (surface, proximity), Mu=In, inside, Nsaba=Garden"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Où est le fil de fer ?' en lari ?",
        "answer": "Lami kue die(na)?"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Insects & Locative Particles (ku, ha, mu)"
      }
    ]
  },
  {
    "id": "mbongo-zibika-yema",
    "title": "Mbongo, Zibika, Yema na Yengo",
    "level": "intermediate",
    "topic": "mbongo",
    "vocab": [
      {
        "lari": "Mbongo",
        "french": "(Avoir ses) règles / Argent"
      },
      {
        "lari": "Zibika",
        "french": "Fermer, boucher"
      },
      {
        "lari": "Buyelele",
        "french": "La finesse, la vivacité, la sagacité"
      },
      {
        "lari": "Mfuenge",
        "french": "Le renard"
      },
      {
        "lari": "Yema",
        "french": "Téter"
      },
      {
        "lari": "Yemeka",
        "french": "Allaiter"
      },
      {
        "lari": "Yengo",
        "french": "L'espoir"
      },
      {
        "lari": "Yengo dia mpamba",
        "french": "Un espoir déçu"
      },
      {
        "lari": "Buna",
        "french": "Rien"
      },
      {
        "lari": "Mpamba",
        "french": "Vide"
      },
      {
        "lari": "Zelokele",
        "french": "Avoir eu ses règles (passé)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ku mbongo kena' ?",
        "answer": "She has her period"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mfuenge buyelele bue nandi' ?",
        "answer": "The fox is cunning"
      },
      {
        "type": "fill-in-blank",
        "question": "___ nzo. (Fermer la maison)",
        "answer": "zibika"
      },
      {
        "type": "fill-in-blank",
        "question": "Yengo dia ___ / mpamba. (J'ai espéré pour rien)",
        "answer": "buna"
      },
      {
        "type": "matching",
        "question": "Reliez les expressions lari à leurs significations.",
        "answer": "Zibika=To close, Yemeka=To breastfeed, Buyelele=Cunning, sagacity, Yengo=Frustrated hope"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'yema' et 'yemeka' ?",
        "answer": "Yema = to suckle, Yemeka = to breastfeed"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Mbongo, Zibika, Yema na Yengo"
      }
    ]
  },
  {
    "id": "ka-dictionary",
    "title": "Mots et verbes en Ka-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Ka",
        "french": "Mais"
      },
      {
        "lari": "Karila",
        "french": "Recommencer, refaire un acte, revenir sur ses pas"
      },
      {
        "lari": "Karisa",
        "french": "Renvoyer, venger, rendre, rapporter, remettre, restituer"
      },
      {
        "lari": "Kakasi | Bikakasi",
        "french": "Amertume"
      },
      {
        "lari": "Kakuka",
        "french": "Être libéré, délivré, recevoir du secours, être protégé"
      },
      {
        "lari": "Kala",
        "french": "Revenir, rebrousser chemin"
      },
      {
        "lari": "Kaluka",
        "french": "Devenir, se transformer, changer"
      },
      {
        "lari": "Kalula",
        "french": "Retourner à plusieurs reprises, mettre sens dessus-dessous"
      },
      {
        "lari": "Kama",
        "french": "Dégager de la chaleur, être fiévreux"
      },
      {
        "lari": "Kamisa",
        "french": "Faire frissonner de peur"
      },
      {
        "lari": "Kamu | Makamu",
        "french": "Fièvre"
      },
      {
        "lari": "Kamisi | Bikamisi",
        "french": "Celui qui fait frissonner"
      },
      {
        "lari": "Kanda | Makanda",
        "french": "Famille"
      },
      {
        "lari": "Laka",
        "french": "La gorge"
      },
      {
        "lari": "Kangala",
        "french": "Voyager, se promener"
      },
      {
        "lari": "Djieta",
        "french": "Voyager"
      },
      {
        "lari": "Yunga",
        "french": "Voyager, se promener"
      },
      {
        "lari": "Kangu",
        "french": "Alliance, union, contrat"
      },
      {
        "lari": "Kangula",
        "french": "Délier, défaire, dénouer"
      },
      {
        "lari": "Kanguzula",
        "french": "Ligoter, fagoter, attacher fortement"
      },
      {
        "lari": "Kani",
        "french": "Non, certainement pas"
      },
      {
        "lari": "Kabakasa",
        "french": "Empêcher (qu'un projet se concrétise)"
      },
      {
        "lari": "Patakasa",
        "french": "Empêcher (la concrétisation d'un projet)"
      },
      {
        "lari": "Kabana",
        "french": "Partager avec quelqu'un, se séparer, divorcer"
      },
      {
        "lari": "Kabasana",
        "french": "Se répartir les tâches, se séparer"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Ka- à leurs significations.",
        "answer": "Karila=To start over, Kakuka=To be freed, Kaluka=To become, to change, Kangula=To untie"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Kaluka zoba' ?",
        "answer": "To become foolish"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ signifie revenir, rebrousser chemin.",
        "answer": "Kala"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ka- Words & Verbs"
      }
    ]
  },
  {
    "id": "fu-dictionary-extended",
    "title": "Verbes et noms en Fu- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Fua | Mafua",
        "french": "Un héritage, patrimoine, bien"
      },
      {
        "lari": "Fumfumuka",
        "french": "Tomber en poussière, s'effriter"
      },
      {
        "lari": "Fusa",
        "french": "Tomber en poussière"
      },
      {
        "lari": "Fumfukuta",
        "french": "Tâtonner, chercher à l'aveuglette"
      },
      {
        "lari": "Fumfuta",
        "french": "Commencer à pousser (cheveux, plumes, poils)"
      },
      {
        "lari": "Fumfutu",
        "french": "Sale, poussiéreux"
      },
      {
        "lari": "Fumpa",
        "french": "Mousser, déborder, enfoncer dans, gaspiller"
      },
      {
        "lari": "Fumpa ngela",
        "french": "Donner de l'argent en abondance"
      },
      {
        "lari": "Fumpisa",
        "french": "Jaillir, laisser déborder, fournir mais gaspiller"
      },
      {
        "lari": "Fumuna",
        "french": "Venir en grand nombre, en foule"
      },
      {
        "lari": "Funa",
        "french": "Augmenter, abonder"
      },
      {
        "lari": "Fuembisa",
        "french": "Faire dégager les narines bouchées, moucher quelqu'un (un bébé)"
      },
      {
        "lari": "Hembisa",
        "french": "Moucher quelqu'un (souvent un bébé)"
      },
      {
        "lari": "Fuemena",
        "french": "Se fâcher contre quelqu'un"
      },
      {
        "lari": "Fuemesa",
        "french": "Mettre en colère, fâcher"
      },
      {
        "lari": "Fuenga",
        "french": "Se moucher, pleurnicher"
      },
      {
        "lari": "Fuesa",
        "french": "Bruit de pet étouffé, péter en essayant d'étouffer le pet"
      },
      {
        "lari": "Fuetesa",
        "french": "S'énerver, mettre en colère"
      },
      {
        "lari": "Fweti",
        "french": "Devoir, falloir / Mépris, haine, envie"
      },
      {
        "lari": "Fuetoka",
        "french": "Respirer péniblement"
      },
      {
        "lari": "Fuema",
        "french": "Ruminer, être en colère, se fâcher"
      },
      {
        "lari": "Fuetola",
        "french": "Faire respirer avec peine"
      },
      {
        "lari": "Fuetoso",
        "french": "Haine, mépris, envie"
      },
      {
        "lari": "Fuambala",
        "french": "Crasseux, sale, dégoûtant"
      },
      {
        "lari": "Fuzuka",
        "french": "Changer de couleur"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Fu- à leurs significations.",
        "answer": "Fumfumuka=To crumble to dust, Fumpa=To foam, to overflow, Fuemena=To get angry, Fundumuna=To plough, to uncover"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Fumpa ngela' ?",
        "answer": "To give money in abundance"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ signifie respirer péniblement.",
        "answer": "Fuetoka"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Fu- Verbs & Nouns (Extended)"
      }
    ]
  },
  {
    "id": "kongo-languages-dictionary",
    "title": "Famille des langues Kongo",
    "level": "beginner",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Kikongo",
        "french": "Code cosmique du nza"
      },
      {
        "lari": "Kisundi",
        "french": "Langue kongo parlée par les Sundi"
      },
      {
        "lari": "Kidondo",
        "french": "Langue kongo parlée par les Dondo"
      },
      {
        "lari": "Kikamba",
        "french": "Langue kongo parlée par les Kamba"
      },
      {
        "lari": "Kikuni",
        "french": "Langue kongo parlée par les Kuni"
      },
      {
        "lari": "Kivili",
        "french": "Langue kongo parlée par les Vili"
      },
      {
        "lari": "Kiyombe",
        "french": "Langue kongo parlée par les Yombe"
      },
      {
        "lari": "Kibembe",
        "french": "Langue kongo parlée par les Bembe"
      },
      {
        "lari": "Kikenge",
        "french": "Langue kongo parlée par les Kenge"
      },
      {
        "lari": "Kivangala",
        "french": "Langue kongo parlée par les Vangala"
      },
      {
        "lari": "Ibali",
        "french": "Langue kongo parlée par les Bali"
      },
      {
        "lari": "Ifumu",
        "french": "Langue kongo parlée par les Fumu"
      },
      {
        "lari": "Iwunu",
        "french": "Langue kongo parlée par les Owumu"
      },
      {
        "lari": "Iyaa",
        "french": "Langue kongo parlée par l'ancienne école initiatique Muya"
      },
      {
        "lari": "Etye",
        "french": "Langue kongo parlée par les Batye"
      },
      {
        "lari": "Hekayi",
        "french": "Langue kongo parlée par les Bakayi"
      },
      {
        "lari": "Enjyunjyu",
        "french": "Langue kongo parlée par les Anjyunjyu"
      },
      {
        "lari": "Kikukua",
        "french": "Langue kongo parlée par les Akukua"
      },
      {
        "lari": "Ipunu",
        "french": "Langue kongo parlée par les Punu"
      },
      {
        "lari": "Ilumbu",
        "french": "Langue kongo parlée par les Lumbu"
      },
      {
        "lari": "Ibuisi",
        "french": "Langue kongo parlée par les Buisi"
      },
      {
        "lari": "Koyo",
        "french": "Langue kongo parlée par les Akoyo"
      },
      {
        "lari": "Akua",
        "french": "Langue kongo parlée par les Akua"
      },
      {
        "lari": "Mboshi",
        "french": "Langue kongo parlée par les Mboshi"
      },
      {
        "lari": "Likuala",
        "french": "Langue kongo parlée par les Likuala"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez le nom de la langue au groupe ethnique qui la parle.",
        "answer": "Kisundi=Sundi, Kivili=Vili, Kibembe=Bembe, Ipunu=Punu"
      },
      {
        "type": "multiple-choice",
        "question": "Que représente 'Kikongo' dans la tradition Kongo ?",
        "answer": "The cosmic code of nza"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Kongo Language Family"
      }
    ]
  },
  {
    "id": "t-dictionary",
    "title": "Mots et verbes en T-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Tua",
        "french": "Frapper"
      },
      {
        "lari": "Tuala",
        "french": "Apporter, amener"
      },
      {
        "lari": "Tualakasa",
        "french": "Entraîner"
      },
      {
        "lari": "Ntuari",
        "french": "Communauté de bénéfice et d'entraide"
      },
      {
        "lari": "Tuasi",
        "french": "Un abcès"
      },
      {
        "lari": "Tuayi",
        "french": "La serviette"
      },
      {
        "lari": "Tuika",
        "french": "Charger sur la tête de quelqu'un"
      },
      {
        "lari": "Tuila",
        "french": "Élever un animal"
      },
      {
        "lari": "Kituizi",
        "french": "Animal domestique"
      },
      {
        "lari": "Tuma",
        "french": "Furoncle / Le flot, la vague"
      },
      {
        "lari": "Ntumbi",
        "french": "Le mulot"
      },
      {
        "lari": "Ntuntubila",
        "french": "La colline"
      },
      {
        "lari": "Nturila",
        "french": "Le plant"
      },
      {
        "lari": "Nselomo",
        "french": "L'éclair"
      },
      {
        "lari": "Kintombo",
        "french": "Martin-pêcheur"
      },
      {
        "lari": "Ntoto",
        "french": "La terre"
      },
      {
        "lari": "Tina",
        "french": "Éviter"
      },
      {
        "lari": "Ntindu",
        "french": "La façon, la couleur"
      },
      {
        "lari": "Tinguka",
        "french": "Boîter"
      },
      {
        "lari": "Tinguna",
        "french": "Tromper, manquer à ses promesses"
      },
      {
        "lari": "Ntinu",
        "french": "La vitesse"
      },
      {
        "lari": "Tiri",
        "french": "L'artère, la veine"
      },
      {
        "lari": "Tiya",
        "french": "Le feu"
      },
      {
        "lari": "Kitoko",
        "french": "L'élégance"
      },
      {
        "lari": "Tola",
        "french": "Médire de quelqu'un qui est absent"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en T- à leurs significations.",
        "answer": "Tuala=To bring, Ntongua=The brain, Teleka=To cook, Tiya=Fire"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Baka tolo' ?",
        "answer": "To sleep"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ signifie frapper.",
        "answer": "Tua"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – T- Words & Verbs"
      }
    ]
  },
  {
    "id": "v-dictionary-extended",
    "title": "Mots et verbes en V- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Vutula",
        "french": "Restituer, rendre"
      },
      {
        "lari": "Mvuri",
        "french": "Une sorte d'antilope"
      },
      {
        "lari": "Vutu",
        "french": "De nouveau"
      },
      {
        "lari": "Luvunu",
        "french": "Le mensonge"
      },
      {
        "lari": "Mvungila",
        "french": "La suie"
      },
      {
        "lari": "Mvunga",
        "french": "La toge"
      },
      {
        "lari": "Vunduka",
        "french": "Gonfler"
      },
      {
        "lari": "Vuna",
        "french": "Déraciner"
      },
      {
        "lari": "Vumina",
        "french": "Obéir avec respect"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en V- à leurs significations.",
        "answer": "Vutula=To return, to give back, Luvunu=The lie, Vunduka=To swell, Vuna=To uproot"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – V- Words & Verbs (Extended)"
      }
    ]
  },
  {
    "id": "y-dictionary-extended",
    "title": "Mots et verbes en Y- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Yetana",
        "french": "Errer"
      },
      {
        "lari": "Luyi",
        "french": "Gifle"
      },
      {
        "lari": "Yidika",
        "french": "Fabriquer, créer, arranger"
      },
      {
        "lari": "Yikama",
        "french": "Augmenter"
      },
      {
        "lari": "Yindula",
        "french": "Se déplacer"
      },
      {
        "lari": "Yoka",
        "french": "Excéder, surpasser (avec un /o:/ long)"
      },
      {
        "lari": "Yeta",
        "french": "Faire le marché"
      },
      {
        "lari": "Yubula",
        "french": "Muer (pour un serpent) / L'écorce"
      },
      {
        "lari": "Yuki",
        "french": "La carafe, la cruche"
      },
      {
        "lari": "Yuku",
        "french": "S'habituer"
      },
      {
        "lari": "Yuluka",
        "french": "Grimper"
      },
      {
        "lari": "Yuma",
        "french": "Sec / Se dessécher"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Y- à leurs significations.",
        "answer": "Yidika=To make, to create, Yuluka=To climb, Yeta=To do the market, Yuku=To get used to"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Yubula' ?",
        "answer": "To molt (snake) / The bark"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Y- Words & Verbs (Extended)"
      }
    ]
  },
  {
    "id": "nza-cosmology-dictionary",
    "title": "Nza — Cosmologie et termes spirituels",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Nza",
        "french": "Cosmos manifesté dans la tradition Kongo, univers"
      },
      {
        "lari": "Nzi",
        "french": "Univers des potentialités dans la tradition Kongo, univers non manifesté"
      },
      {
        "lari": "Nzina",
        "french": "Le neuvième corps du muntu dans la tradition Kongo"
      },
      {
        "lari": "Singini",
        "french": "Vortex"
      },
      {
        "lari": "Muela | Miela",
        "french": "L'âme, la matrice de l'âme, le souffle, haleine, l'air"
      },
      {
        "lari": "Nsinu",
        "french": "La reine dans la tradition Kongo (titre exclusivement féminin)"
      },
      {
        "lari": "Bidjimu",
        "french": "Image, ressemblance"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'Nza' et 'Nzi' dans la tradition Kongo ?",
        "answer": "Nza = manifested cosmos, Nzi = unmanifested universe"
      },
      {
        "type": "matching",
        "question": "Reliez les termes spirituels à leurs significations.",
        "answer": "Muela=Soul, breath, air, Singini=Vortex, Nzina=Ninth body of the muntu, Nsinu=Queen (feminine title)"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Nza — Cosmology & Spiritual Terms"
      }
    ]
  },
  {
    "id": "z-dictionary-extended",
    "title": "Mots en Z- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Nzuzi",
        "french": "Chat tigre, diminutif de Banzuzi (nom donné à l'un des jumeaux)"
      },
      {
        "lari": "Nzuengi",
        "french": "Fil de fer"
      },
      {
        "lari": "Lami | Malami",
        "french": "Fil de fer"
      },
      {
        "lari": "Yuma | Mayuma",
        "french": "La dispute"
      },
      {
        "lari": "Yumana",
        "french": "Se disputer"
      },
      {
        "lari": "Yundula",
        "french": "Nourrir, élever"
      },
      {
        "lari": "Sansa",
        "french": "Nourrir, élever"
      },
      {
        "lari": "Yunuka",
        "french": "S'écorcher (le genou)"
      },
      {
        "lari": "Nzanda",
        "french": "Beaucoup, une grande quantité"
      },
      {
        "lari": "Munjanda | Minjanda",
        "french": "Les franges des habits"
      },
      {
        "lari": "Zandu | Mazandu",
        "french": "Le marché"
      },
      {
        "lari": "Zanga | Mazanga",
        "french": "Étang, lac, marais, marécage"
      },
      {
        "lari": "Zanza | Mazanza",
        "french": "Un nid"
      },
      {
        "lari": "Kinzembele | Binzembele",
        "french": "Boucle d'oreille"
      },
      {
        "lari": "Nzenze",
        "french": "Grillon"
      },
      {
        "lari": "Nzenza",
        "french": "L'étranger"
      },
      {
        "lari": "Yangalala",
        "french": "Se réjouir, exulter"
      },
      {
        "lari": "Yangi",
        "french": "La pagaille"
      },
      {
        "lari": "Yaula",
        "french": "Gémir, soupirer, se plaindre"
      },
      {
        "lari": "Yayana",
        "french": "Se tromper"
      },
      {
        "lari": "Yelekesa",
        "french": "Égaliser"
      },
      {
        "lari": "Delakasa",
        "french": "Égaliser"
      },
      {
        "lari": "Yembe",
        "french": "Insecte qui ressemble à une mouche rouge"
      },
      {
        "lari": "Mutu beni",
        "french": "Le téton"
      },
      {
        "lari": "Mitu mia mabeni",
        "french": "Les tétons"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots à leurs significations.",
        "answer": "Zandu=The market, Nzenza=The stranger, Yangalala=To rejoice, Yumana=To argue"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Nzuzi' ?",
        "answer": "A tiger cat / Twin name"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Z- Words (Extended)"
      }
    ]
  },
  {
    "id": "lu-dictionary-extended",
    "title": "Mots en Lu- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Fundisa",
        "french": "Juger"
      },
      {
        "lari": "Lufundusulu | Tufundusulu",
        "french": "Tribunal, lieu de jugement et de confession"
      },
      {
        "lari": "Lufungulu",
        "french": "Confession, aveu"
      },
      {
        "lari": "Fungusa",
        "french": "Faire avouer"
      },
      {
        "lari": "Lufungusulu | Tufungusulu",
        "french": "Un aveu, action de confier les erreurs qu'on a à se reprocher"
      },
      {
        "lari": "Lufunia",
        "french": "Endurance, force physique, effort"
      },
      {
        "lari": "Lufutu | Tufutu",
        "french": "Virulence, colère, complication, poussière soulevée par les pieds, agitation / Difficulté à grandir, lenteur"
      },
      {
        "lari": "Lukaka | Tukaka",
        "french": "Pangolin"
      },
      {
        "lari": "Lukalafuanda",
        "french": "Force physique, effort"
      },
      {
        "lari": "Lukandu | Tukandu",
        "french": "L'arc-en-ciel"
      },
      {
        "lari": "Lukombo | Tukombo",
        "french": "Un balai"
      },
      {
        "lari": "Kotana",
        "french": "Être orgueilleux, vantard"
      },
      {
        "lari": "Luatisa",
        "french": "Faire habiller, couvrir"
      },
      {
        "lari": "Lualuna",
        "french": "Plus loin, celui/celle-là, là-bas"
      },
      {
        "lari": "Luayi",
        "french": "Morceau d'étoffe, serviette, mouchoir"
      },
      {
        "lari": "Luaza",
        "french": "Vacarme, bruit, réprimande, reproche, dispute"
      },
      {
        "lari": "Lueka | Tueka",
        "french": "Un côté, environ, sens, orientation"
      },
      {
        "lari": "Luekesa",
        "french": "Inciser, blesser (moralement)"
      },
      {
        "lari": "Luekesana",
        "french": "Se blesser"
      },
      {
        "lari": "Luenda",
        "french": "Un autel en pierre"
      },
      {
        "lari": "Luengana",
        "french": "Se faire entendre, retentir"
      },
      {
        "lari": "Bietana",
        "french": "Sonner"
      },
      {
        "lari": "Luengasa",
        "french": "Faire entendre, comprendre, instruire, prévenir, informer, être attentif"
      },
      {
        "lari": "Luengisa",
        "french": "Rendre prudent(e), rendre intelligent(e), conseiller, faire comprendre"
      },
      {
        "lari": "Luika",
        "french": "Équiper, habiller, lever le deuil"
      },
      {
        "lari": "Mu lukalafuanda",
        "french": "Avec force, vigoureusement"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Lu- à leurs significations.",
        "answer": "Lukaka=Pangolin, Lukandu=The rainbow, Lukombo=A broom, Luzonzo=Conversation"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Lufundusulu' ?",
        "answer": "A tribunal, place of judgement"
      },
      {
        "type": "fill-in-blank",
        "question": "___ est le mot Lari pour 'ciseaux'.",
        "answer": "luziolo"
      },
      {
        "type": "multiple-choice",
        "question": "À quoi fait référence 'Luanga' ?",
        "answer": "The hot season from September to mid-May"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Lu- Words (Extended)"
      }
    ]
  },
  {
    "id": "ts-dictionary",
    "title": "Mots en Ts-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Tsika",
        "french": "Inviter / Bientôt"
      },
      {
        "lari": "Nselomo",
        "french": "L'éclair (prononcer ntselomo)"
      },
      {
        "lari": "Tseki tseki",
        "french": "Blanc brillant"
      },
      {
        "lari": "Ntsari",
        "french": "Le mépris"
      },
      {
        "lari": "Tsala",
        "french": "Éparpiller, étendre, vider, défaire / Mépriser"
      },
      {
        "lari": "Tsamuna",
        "french": "Renverser, verser"
      },
      {
        "lari": "Ntsamina",
        "french": "Clarté sidérale"
      },
      {
        "lari": "Tsaka",
        "french": "Tondre"
      },
      {
        "lari": "Tsaba",
        "french": "Nager, bêcher, piocher"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Ts- à leurs significations.",
        "answer": "Tsika=To invite / Soon, Tsala=To scatter / To despise, Tsaba=To swim, to dig, Tsaka=To shear"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Ntsamina' ?",
        "answer": "Starlight, sidereal brightness"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ts- Words"
      }
    ]
  },
  {
    "id": "ta-dictionary-extended",
    "title": "Mots en Ta- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Tima",
        "french": "Creuser"
      },
      {
        "lari": "Ntantu",
        "french": "L'ennemi"
      },
      {
        "lari": "Ntangu",
        "french": "Le soleil, temps, heure, horloge"
      },
      {
        "lari": "Ntangu za zonso",
        "french": "Toujours"
      },
      {
        "lari": "Ntangu a mbata",
        "french": "Midi"
      },
      {
        "lari": "Ntangu a nsinsa",
        "french": "L'après-midi"
      },
      {
        "lari": "Tanga",
        "french": "Compter"
      },
      {
        "lari": "Nkunga",
        "french": "Chanter"
      },
      {
        "lari": "Matanga",
        "french": "Banquet, festin"
      },
      {
        "lari": "Lutangu",
        "french": "Le nombre, l'énumération, le compte"
      },
      {
        "lari": "Tanda",
        "french": "Maigrir"
      },
      {
        "lari": "Kintala",
        "french": "Branche"
      },
      {
        "lari": "Tambika",
        "french": "Envoyer"
      },
      {
        "lari": "Ntambu",
        "french": "Le piège"
      },
      {
        "lari": "Ntambu mia nkangabumi",
        "french": "Une toile d'araignée"
      },
      {
        "lari": "Tambula",
        "french": "Recevoir, accepter, répondre, admettre"
      },
      {
        "lari": "Tamuna",
        "french": "Écarter, étendre"
      },
      {
        "lari": "Ntandu",
        "french": "La maigreur"
      },
      {
        "lari": "Tabika",
        "french": "Coûter"
      },
      {
        "lari": "Tabi",
        "french": "Il faut…"
      },
      {
        "lari": "Taba",
        "french": "Le chiffon"
      },
      {
        "lari": "Dinta",
        "french": "La peinture"
      },
      {
        "lari": "Nta",
        "french": "Un piège spécialement conçu pour les ngembo (roussettes)"
      },
      {
        "lari": "Buta",
        "french": "Un fusil"
      },
      {
        "lari": "Ta mbila",
        "french": "Appeler"
      },
      {
        "lari": "Ntambu mia nkangabumi",
        "french": "Une toile d'araignée"
      },
      {
        "lari": "Ntangu za zonso",
        "french": "Toujours"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Ta- à leurs significations.",
        "answer": "Tambula=To receive, to accept, Tabika=To cost, Ntambu=The trap, Lutangu=The number, the count"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ntangu a mbata' ?",
        "answer": "Noon, midday"
      },
      {
        "type": "fill-in-blank",
        "question": "'___ mia nkangabumi' signifie 'une toile d'araignée'.",
        "answer": "ntambu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ta- Words (Extended)"
      }
    ]
  },
  {
    "id": "s-dictionary-extended-2",
    "title": "Mots en S- (étendu 2)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Nsuiri",
        "french": "Le serpent cracheur"
      },
      {
        "lari": "Nsuenga",
        "french": "Se rétrécir, aller en diminuant"
      },
      {
        "lari": "Sueka",
        "french": "Cacher"
      },
      {
        "lari": "Suasuana",
        "french": "Se mettre en désordre"
      },
      {
        "lari": "Suama",
        "french": "Se cacher"
      },
      {
        "lari": "Nsualu",
        "french": "La promptitude, rapidité, vitesse"
      },
      {
        "lari": "Nsua",
        "french": "Le venin du serpent / L'autorisation"
      },
      {
        "lari": "Sutula",
        "french": "Plier, détacher"
      },
      {
        "lari": "Susumba",
        "french": "Sursauter"
      },
      {
        "lari": "Kinsunsu",
        "french": "Punaise des bois"
      },
      {
        "lari": "Nsunsu",
        "french": "Une bouchée (de manioc)"
      },
      {
        "lari": "Nsunia",
        "french": "La chair, la viande"
      },
      {
        "lari": "Sumuna",
        "french": "Arracher un piquet"
      },
      {
        "lari": "Sumuka",
        "french": "Commettre une erreur"
      },
      {
        "lari": "Disumu",
        "french": "La réincarnation dans la tradition Kongo, le péché (chrétien)"
      },
      {
        "lari": "Sumika",
        "french": "Enfoncer des piquets"
      },
      {
        "lari": "Sumbuka",
        "french": "Enjamber, saigner de nouveau"
      },
      {
        "lari": "Busumbu",
        "french": "Le danger"
      },
      {
        "lari": "Sumba",
        "french": "Acheter"
      },
      {
        "lari": "Suluka",
        "french": "Avorter"
      },
      {
        "lari": "Nsula",
        "french": "Le poisson électrique"
      },
      {
        "lari": "Binsukulu",
        "french": "Sorte d'aubergines"
      },
      {
        "lari": "Suku",
        "french": "L'arrière-train"
      },
      {
        "lari": "Mansukina",
        "french": "La fin"
      },
      {
        "lari": "Sukia",
        "french": "Grande queue de certains oiseaux"
      },
      {
        "lari": "Baku nsonsi",
        "french": "Avoir honte"
      },
      {
        "lari": "Fuisa nsoni",
        "french": "Faire honte"
      },
      {
        "lari": "Seti bo",
        "french": "Attends un peu"
      },
      {
        "lari": "Nsingu a koko",
        "french": "Le poignet"
      },
      {
        "lari": "Muana nsombe",
        "french": "Le nouveau-né"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en S- à leurs significations.",
        "answer": "Sumba=To buy, Suka=To finish, Sueka=To hide, Songa=To show"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Disumu' dans la tradition Kongo ?",
        "answer": "Reincarnation / Sin"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' est le mot Lari pour 'la hache'.",
        "answer": "soka"
      },
      {
        "type": "matching",
        "question": "Reliez ces mots S- du corps et de la nature.",
        "answer": "Nsingu=The neck, Nsoni=Shame, Nsuiri=Spitting cobra, Nsombe=Palm worm (edible)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Seti bo' ?",
        "answer": "Wait a moment"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – S- Words (Extended 2)"
      }
    ]
  },
  {
    "id": "se-dictionary",
    "title": "Mots en Se-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Sengola",
        "french": "Tourner (les yeux) vers le haut"
      },
      {
        "lari": "Sengoka",
        "french": "Coucher sur le dos"
      },
      {
        "lari": "Nsengo",
        "french": "La pioche"
      },
      {
        "lari": "Sengo",
        "french": "Le fer"
      },
      {
        "lari": "Nsenga",
        "french": "Palétuvier"
      },
      {
        "lari": "Senda",
        "french": "Récompenser"
      },
      {
        "lari": "Lusende",
        "french": "Une épine"
      },
      {
        "lari": "Nsende za mbiji",
        "french": "Les arêtes (du poisson)"
      },
      {
        "lari": "Lusemo | Tusemo",
        "french": "La bénédiction"
      },
      {
        "lari": "Masembo",
        "french": "La réprimande"
      },
      {
        "lari": "Semba",
        "french": "Punir, réprimander"
      },
      {
        "lari": "Kisemba",
        "french": "L'ergot"
      },
      {
        "lari": "Nselele",
        "french": "Les termites"
      },
      {
        "lari": "Sekola",
        "french": "Verser à boire, transvaser"
      },
      {
        "lari": "Kinsekua",
        "french": "La punaise"
      },
      {
        "lari": "Nsela",
        "french": "La dame-jeanne"
      },
      {
        "lari": "Sekesa",
        "french": "Affûter, limer"
      },
      {
        "lari": "Seha",
        "french": "Rire"
      },
      {
        "lari": "Sehela",
        "french": "Se moquer"
      },
      {
        "lari": "Tuseho",
        "french": "Le rire"
      },
      {
        "lari": "Seke",
        "french": "Un moineau"
      },
      {
        "lari": "Seba",
        "french": "Couper en petits morceaux"
      },
      {
        "lari": "Sempo",
        "french": "Convenable, soulevant, soulevé"
      },
      {
        "lari": "Sempola",
        "french": "Soulever"
      },
      {
        "lari": "Sempoka",
        "french": "Être soulevé"
      },
      {
        "lari": "Nsende za mbiji",
        "french": "Les arêtes du poisson"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Se- à leurs significations.",
        "answer": "Seha=To laugh, Sehela=To mock, Senda=To reward, Sengo=Iron"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Nselele' ?",
        "answer": "Termites"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Se- Words"
      }
    ]
  },
  {
    "id": "sa-dictionary",
    "title": "Mots en Sa-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Kisasala",
        "french": "La nageoire"
      },
      {
        "lari": "Kisari",
        "french": "Le travailleur"
      },
      {
        "lari": "Kisanu",
        "french": "Un peigne"
      },
      {
        "lari": "Sansi",
        "french": "Boîte à musique avec des lamelles"
      },
      {
        "lari": "Sarila",
        "french": "Travailler pour quelqu'un, servir"
      },
      {
        "lari": "Nsania",
        "french": "L'éponge"
      },
      {
        "lari": "Nsanga",
        "french": "Collier de perles"
      },
      {
        "lari": "Nsa | Musa",
        "french": "L'oseille"
      },
      {
        "lari": "Nsabi",
        "french": "Serrure, cadenas"
      },
      {
        "lari": "Sabu",
        "french": "Le passage d'une rivière"
      },
      {
        "lari": "Safula",
        "french": "Offenser"
      },
      {
        "lari": "Nsaka",
        "french": "L'amusement, le jeu"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Sa- à leurs significations.",
        "answer": "Sarila=To work for someone, Nsabi=Lock, padlock, Sansi=Thumb piano, Nsaka=Fun, play"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Nsanga' ?",
        "answer": "A pearl necklace"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Sa- Words"
      }
    ]
  },
  {
    "id": "fu-dictionary-extended-2",
    "title": "Mots en Fu- (étendu 2)",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Bungula",
        "french": "Abonder, augmenter"
      },
      {
        "lari": "Fundana",
        "french": "Se dénoncer, s'accuser"
      },
      {
        "lari": "Fuambala",
        "french": "Crasseux, sale, dégoûtant"
      },
      {
        "lari": "Fuzuka",
        "french": "Changer de couleur"
      },
      {
        "lari": "Lumputu",
        "french": "Le français en tant que langue, par extension n'importe quelle langue d'Europe"
      },
      {
        "lari": "Fuanisa",
        "french": "Faire ressembler, comparer, faire le plein"
      },
      {
        "lari": "Lufuku",
        "french": "Une épidémie"
      },
      {
        "lari": "Futusulu",
        "french": "Remboursement"
      },
      {
        "lari": "Futa",
        "french": "Enfumer (avec un /u:/ long)"
      },
      {
        "lari": "Futisila",
        "french": "Payer un loyer pour un tiers"
      },
      {
        "lari": "Fuakama",
        "french": "Bouillir en débordant"
      },
      {
        "lari": "Sampa",
        "french": "Bouillir en débordant"
      },
      {
        "lari": "Fuka",
        "french": "Être décimé"
      },
      {
        "lari": "Fukila",
        "french": "Mourir en grand nombre"
      },
      {
        "lari": "Futika",
        "french": "Fuir, prendre ses jambes à son cou, plier, retrousser"
      },
      {
        "lari": "Futikisa",
        "french": "Faire plier, faire emballer"
      },
      {
        "lari": "Mfutulu",
        "french": "Un paiement"
      },
      {
        "lari": "Fundasana",
        "french": "Se dénoncer l'un l'autre, s'accuser réciproquement"
      },
      {
        "lari": "Fundi | Madundi",
        "french": "Chenille du palmier (comestible)"
      },
      {
        "lari": "Fundumuna",
        "french": "Labourer, retourner la terre, mettre à nu, déballer, exhumer"
      },
      {
        "lari": "Fungila",
        "french": "Manquer de, être raté"
      },
      {
        "lari": "Fungisa",
        "french": "Faire avorter, faire rater (une cuisson, une réunion)"
      },
      {
        "lari": "Fungu | Mafungu",
        "french": "Le rhume, la morve, sorte de hibou"
      },
      {
        "lari": "Fumpa ngela",
        "french": "Donner de l'argent en abondance"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Fu- à leurs significations.",
        "answer": "Futika=To flee, Fundumuna=To plough, to exhume, Fuzuka=To change color, Fuakama=To boil over"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Fundana' ?",
        "answer": "To denounce oneself"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' signifie 'un paiement' en Lari.",
        "answer": "mfutulu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Fu- Words (Extended 2)"
      }
    ]
  },
  {
    "id": "ki-ku-la-ba-ko-dictionary",
    "title": "Mots en Ki-, Ku-, La-, Ba-, Ko-",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Mupupuku",
        "french": "Sorte de palétuvier Kongo"
      },
      {
        "lari": "Kibakala | Tshibakala",
        "french": "La virilité"
      },
      {
        "lari": "Kulumbisa",
        "french": "Conduire très vite"
      },
      {
        "lari": "Heka",
        "french": "Alors, contrairement à"
      },
      {
        "lari": "Sarisa",
        "french": "Faire travailler"
      },
      {
        "lari": "Zitisana",
        "french": "Se respecter"
      },
      {
        "lari": "Sadisi",
        "french": "Chef, patron(ne), celui/celle qui fait travailler"
      },
      {
        "lari": "Kilenga | Tshilenga | Bilenga",
        "french": "Oisif, paresseux, fainéant"
      },
      {
        "lari": "Lenga buzoba",
        "french": "Abrutir"
      },
      {
        "lari": "Lenga nkusa",
        "french": "Maudire"
      },
      {
        "lari": "Kilo | Thsilo | Bilo",
        "french": "Groupement"
      },
      {
        "lari": "Loba",
        "french": "Pêcher"
      },
      {
        "lari": "Kilobi | Tshilobi | Bilobi",
        "french": "Pêcheur, chercheur"
      },
      {
        "lari": "Tsilonda | Bilonda",
        "french": "Sorte de criquet"
      },
      {
        "lari": "Kilongiki | Tshilongiki | Bilongiki",
        "french": "Un apprenant, élève, étudiant(e)"
      },
      {
        "lari": "Kilongisi | Thsilongisi | Bilongisi",
        "french": "Enseignant(e), professeur, initiateur"
      },
      {
        "lari": "Kilongokelo | Thilongokelo | Bilongokelo",
        "french": "Lieu d'apprentissage"
      },
      {
        "lari": "Kimangu | Tshimangu | Bimangu",
        "french": "Merveille, miracle"
      },
      {
        "lari": "Mpiku",
        "french": "Miracle, merveille, phénomène"
      },
      {
        "lari": "Mpandu",
        "french": "Miracle"
      },
      {
        "lari": "Mpindu",
        "french": "Prodige, merveille"
      },
      {
        "lari": "Kuma",
        "french": "Quelque part, endroit, lieu"
      },
      {
        "lari": "Kuakua",
        "french": "Combien"
      },
      {
        "lari": "Latuka",
        "french": "Courir vite"
      },
      {
        "lari": "Latula",
        "french": "Faire courir"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots à leurs significations.",
        "answer": "Kilongiki=Learner, student, Kilongisi=Teacher, professor, Kilongokelo=Place of learning, Sadisi=Boss, chief"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Kuakua' ?",
        "answer": "How much / how many"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' signifie un lieu d'apprentissage en kikongo lari.",
        "answer": "kilongokelo"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce qu'un 'Mubaku' ?",
        "answer": "A type of fox"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Ki-, Ku-, La-, Ba-, Ko- Words"
      }
    ]
  },
  {
    "id": "fundisa-luika-munkua-dictionary",
    "title": "Fundisa, Luika na Munkua",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Fundisa",
        "french": "Juger"
      },
      {
        "lari": "Lufundusulu | Tufundusulu",
        "french": "Tribunal, lieu de jugement et de confession"
      },
      {
        "lari": "Lufungulu",
        "french": "Confession, aveu"
      },
      {
        "lari": "Fungula",
        "french": "Avouer"
      },
      {
        "lari": "Fungusa",
        "french": "Faire avouer"
      },
      {
        "lari": "Lufungusulu | Tufungusulu",
        "french": "Un aveu, action de confier les erreurs qu'on a à se reprocher"
      },
      {
        "lari": "Lufunia",
        "french": "Endurance, force physique, effort"
      },
      {
        "lari": "Lufutu | Tufutu",
        "french": "Virulence, colère, complication, poussière soulevée par les pieds, agitation"
      },
      {
        "lari": "Lufutu",
        "french": "Difficulté à grandir, à pousser, lenteur"
      },
      {
        "lari": "Lukaka | Tukaka",
        "french": "Pangolin"
      },
      {
        "lari": "Lukalafuanda",
        "french": "Force physique, effort"
      },
      {
        "lari": "Mu lukalafuanda",
        "french": "Avec force, vigoureusement"
      },
      {
        "lari": "Luika",
        "french": "La pilosité fournie"
      },
      {
        "lari": "Lokana",
        "french": "S'entre-maudire"
      },
      {
        "lari": "Loka",
        "french": "Maudire"
      },
      {
        "lari": "Luyi | Mayi",
        "french": "Une petite gifle"
      },
      {
        "lari": "Yirika",
        "french": "Faire, arranger, créer, fabriquer"
      },
      {
        "lari": "Ndekela",
        "french": "Étincelle"
      },
      {
        "lari": "Ndekela tiya",
        "french": "Une étincelle de feu"
      },
      {
        "lari": "Yila",
        "french": "Se coucher (le soleil)"
      },
      {
        "lari": "Yilulu",
        "french": "Rester longtemps dans un état, dans un endroit"
      },
      {
        "lari": "Mbangu",
        "french": "Panier avec un couvercle"
      },
      {
        "lari": "Yimina",
        "french": "Défendre, empêcher, refuser quelque chose"
      },
      {
        "lari": "Yina",
        "french": "Demander plus"
      },
      {
        "lari": "Yindula",
        "french": "Déplacer, changer de place"
      },
      {
        "lari": "Munkua ntshi",
        "french": "Celui à qui appartient la chose"
      },
      {
        "lari": "Munkua kumbi",
        "french": "Celui à qui appartient la voiture"
      },
      {
        "lari": "Munkua nzo",
        "french": "Celui à qui appartient la maison"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots à leurs significations.",
        "answer": "Fundisa=To judge, Lufundusulu=Court, tribunal, Fungula=To confess, Munkua=Owner, possessor"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Munkua nzo' ?",
        "answer": "The house owner"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' signifie 'juger' en kikongo lari.",
        "answer": "fundisa"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Fundisa, Luika na Munkua"
      }
    ]
  },
  {
    "id": "kongo-languages-extended",
    "title": "Langues Kongo (étendu)",
    "level": "intermediate",
    "topic": "kongo",
    "vocab": [
      {
        "lari": "Kihangala",
        "french": "Langue parlée par les Hangala"
      },
      {
        "lari": "Makua",
        "french": "Langue Kongo parlée par les Makua"
      },
      {
        "lari": "Kikuyu",
        "french": "Langue parlée par les Kikuyu"
      },
      {
        "lari": "Kiteke",
        "french": "Langue Kongo parlée par les Teke"
      },
      {
        "lari": "Kilari",
        "french": "Langue Kongo parlée par les Lari"
      },
      {
        "lari": "Lusoga",
        "french": "Langue Kongo parlée en Ouganda"
      },
      {
        "lari": "Rutoro",
        "french": "Langue Kongo parlée en Ouganda"
      },
      {
        "lari": "Luganda",
        "french": "Langue Kongo parlée en Ouganda"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les langues Kongo à leurs peuples.",
        "answer": "Kilari=Lari, Kiteke=Teke, Kihangala=Hangala, Luganda=Uganda"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Kongo Languages (Extended)"
      }
    ]
  },
  {
    "id": "sa-dictionary-extended",
    "title": "Mots en Sa- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Saki dia fumu",
        "french": "La feuille de tabac"
      },
      {
        "lari": "Saki dia lufua",
        "french": "L'agonie"
      },
      {
        "lari": "Tata dia nasakila",
        "french": "Père nourricier"
      },
      {
        "lari": "Nsaku",
        "french": "La route"
      },
      {
        "lari": "Sakumuna",
        "french": "Rendre prospère, bénir ; présenter un enfant pour la première fois en public deux mois après sa naissance"
      },
      {
        "lari": "Sala",
        "french": "Rester (le premier /a:/ est long)"
      },
      {
        "lari": "Lusala",
        "french": "La plume"
      },
      {
        "lari": "Munsala",
        "french": "Crevette"
      },
      {
        "lari": "Salu",
        "french": "Le travail"
      },
      {
        "lari": "Kisalulu",
        "french": "Outil, instrument"
      },
      {
        "lari": "Kisama",
        "french": "Termitière du sol argileux"
      },
      {
        "lari": "Nsamba",
        "french": "Incisions"
      },
      {
        "lari": "Mbele",
        "french": "Un rasoir"
      },
      {
        "lari": "Nsambi",
        "french": "La guitare"
      },
      {
        "lari": "Nsambi ya mputu",
        "french": "Un harmonium"
      },
      {
        "lari": "Sambila",
        "french": "Activer le mbi (tradition Kongo), prier (tradition abrahamique)"
      },
      {
        "lari": "Nsambu",
        "french": "Travailler dans le monde manifesté pour atteindre le mbu (tradition Kongo) ; une prière (tradition abrahamique)"
      },
      {
        "lari": "Sambula",
        "french": "Aiguiser, réaffûter"
      },
      {
        "lari": "Lusampa | Sampa",
        "french": "La crinière"
      },
      {
        "lari": "Nsamu",
        "french": "Sept"
      },
      {
        "lari": "Nsamu",
        "french": "L'affaire, l'histoire (avec un /a/ court)"
      },
      {
        "lari": "Nsamu wa nuikila",
        "french": "La calomnie"
      },
      {
        "lari": "Kinsamu",
        "french": "Le conte, la fable, la parodie"
      },
      {
        "lari": "Sana",
        "french": "Peigner"
      },
      {
        "lari": "Nsana",
        "french": "L'orphelin (avec un /a:/ long)"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Sa- à leurs significations.",
        "answer": "Sambila=To pray / to activate mbi, Sanduku dia mvumbi=The coffin, Kisalulu=Tool, instrument, Salu=Work, labor"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Saki dia fumu' ?",
        "answer": "The tobacco leaf"
      },
      {
        "type": "fill-in-blank",
        "question": "'Sa ___ ko' signifie 'tu peux toujours rêver…'",
        "answer": "thiminu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Sa- Words (Extended)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nsakusu' ?",
        "answer": "Forge bellows"
      },
      {
        "type": "multiple-choice",
        "question": "Que provoque 'Sansamasa' ?",
        "answer": "To frighten, to surprise"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = intercéder",
        "answer": "Sambilila"
      },
      {
        "type": "matching",
        "question": "Reliez chaque mot en Sa- à sa signification.",
        "answer": "Sakusa=To blow with a bellows, Sansamana=To be frightened, Sambulika=To spread by contagion, Nsabila=Woven palm-leaf basket"
      }
    ]
  },
  {
    "id": "n-dictionary-extended",
    "title": "Mots en N- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Ngitu",
        "french": "Si jamais…, afin que"
      },
      {
        "lari": "Nunungu",
        "french": "Le grain de piment"
      },
      {
        "lari": "Nuna",
        "french": "Vieillir"
      },
      {
        "lari": "Nukuta",
        "french": "Sentir (une odeur)"
      },
      {
        "lari": "Nuka",
        "french": "Une odeur"
      },
      {
        "lari": "Ntama",
        "french": "Depuis longtemps"
      },
      {
        "lari": "Nsinsa",
        "french": "Identique"
      },
      {
        "lari": "Nsieti",
        "french": "Comme ; le même que"
      },
      {
        "lari": "Nsiana",
        "french": "Comme"
      },
      {
        "lari": "Ku nsi",
        "french": "Par terre, dessous"
      },
      {
        "lari": "Nsi",
        "french": "Dimension, pays, terre"
      },
      {
        "lari": "Nsi ya lutambi",
        "french": "La plante du pied"
      },
      {
        "lari": "Nona",
        "french": "Becqueter"
      },
      {
        "lari": "Noko",
        "french": "La rosée"
      },
      {
        "lari": "Bunokena",
        "french": "La faiblesse"
      },
      {
        "lari": "Noka",
        "french": "Défaillir (avec un /o:/ long) ; pleuvoir (avec un /o/ court)"
      },
      {
        "lari": "Nkia ngu | Ntshia ngu",
        "french": "Voilà pourquoi"
      },
      {
        "lari": "Nkia | Ntshia",
        "french": "C'est pourquoi ; quel, quelle… (+ substantif)"
      },
      {
        "lari": "Nki | Nthsi",
        "french": "Quoi"
      },
      {
        "lari": "Mu nki | Mu ntshi",
        "french": "Pourquoi"
      },
      {
        "lari": "Nkatika",
        "french": "Véritablement"
      },
      {
        "lari": "Nkari",
        "french": "Le commerce"
      },
      {
        "lari": "Kia nkari",
        "french": "Âpre"
      },
      {
        "lari": "Nioshi",
        "french": "L'abeille"
      },
      {
        "lari": "Nionga",
        "french": "Murmurer"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en N- à leurs significations.",
        "answer": "Ninga=Yes, Ngana=Proverb, parable, Nioshi=The bee, Noka=To faint / to rain"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Niansi ya ntu' ?",
        "answer": "The louse"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' signifie 'véritablement' en kikongo lari.",
        "answer": "nkatika"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – N- Words (Extended)"
      }
    ]
  },
  {
    "id": "mu-dictionary-extended",
    "title": "Mots en Mu- (étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Muifi",
        "french": "Le voleur"
      },
      {
        "lari": "Muisi",
        "french": "La fumée"
      },
      {
        "lari": "Muisa",
        "french": "Faire voir"
      },
      {
        "lari": "Muini",
        "french": "La chaleur du soleil ; alors, c'est pourquoi"
      },
      {
        "lari": "Muingiri",
        "french": "Le noyau"
      },
      {
        "lari": "Muinga",
        "french": "Tige d'herbe sèche"
      },
      {
        "lari": "Muinda",
        "french": "La lampe"
      },
      {
        "lari": "Muika",
        "french": "Le poil"
      },
      {
        "lari": "Muekese",
        "french": "Le piquant"
      },
      {
        "lari": "Muatu",
        "french": "Une chose dont on a oublié le nom"
      },
      {
        "lari": "Muasi",
        "french": "Ouvert"
      },
      {
        "lari": "Muangasa",
        "french": "Éparpiller, répandre, disperser"
      },
      {
        "lari": "Muanga",
        "french": "Ensemencer"
      },
      {
        "lari": "Muandala",
        "french": "Scolopendre"
      },
      {
        "lari": "Muna hata",
        "french": "Fille/fils adoptive/f"
      },
      {
        "lari": "Muana wa n'kento",
        "french": "La fille"
      },
      {
        "lari": "Muana wa bakala",
        "french": "Le garçon"
      },
      {
        "lari": "Muamba",
        "french": "La sauce"
      },
      {
        "lari": "Miniala",
        "french": "Grenouilles"
      },
      {
        "lari": "Muaka",
        "french": "Asperger"
      },
      {
        "lari": "Musi | Muishi | Bis | Bishi",
        "french": "Habitant d'un endroit, membre d'une même famille"
      },
      {
        "lari": "Muntu wa sumba",
        "french": "Un salarié"
      },
      {
        "lari": "Muntu | Bantu",
        "french": "Être humain"
      },
      {
        "lari": "Mungua",
        "french": "Le sel"
      },
      {
        "lari": "Mungi",
        "french": "Le brouillard"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Reliez les mots en Mu- à leurs significations.",
        "answer": "Muntu=Human being, Muifi=The thief, Muamba=The sauce, Mungua=Salt"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Muana wa bakala' ?",
        "answer": "The boy"
      },
      {
        "type": "fill-in-blank",
        "question": "'___' signifie 'Dimanche' en kikongo lari.",
        "answer": "lumingu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Mu- Words (Extended)"
      }
    ]
  },
  {
    "id": "mubaku-kota-lesson",
    "title": "Mubaku wu dia nsusu",
    "level": "intermediate",
    "topic": "mubaku",
    "vocab": [
      {
        "lari": "Mubaku | Mibaku",
        "french": "Une sorte de renard"
      },
      {
        "lari": "Kota",
        "french": "Entrer"
      },
      {
        "lari": "Kotela",
        "french": "Entrer par"
      },
      {
        "lari": "Hata | Mahata",
        "french": "Village"
      },
      {
        "lari": "Ku",
        "french": "Dans (+ lieu)"
      },
      {
        "lari": "Nsusu",
        "french": "Poule"
      },
      {
        "lari": "Mu baka",
        "french": "Pour avoir"
      },
      {
        "lari": "Yokesela",
        "french": "Passer, vivre (du temps)"
      },
      {
        "lari": "Bumuana",
        "french": "L'enfance"
      },
      {
        "lari": "Mubaku wu dia nsusu.",
        "french": "Le renard qui mange les poules."
      },
      {
        "lari": "Ngela za zingi ze nandi.",
        "french": "Elle a beaucoup d'argent."
      },
      {
        "lari": "Nsusu mubaku wa diri zo.",
        "french": "Les poules ont été mangées par le renard."
      },
      {
        "lari": "Mubaku wa kotele ku hata.",
        "french": "Le renard est entré dans le village."
      },
      {
        "lari": "Bumuana ku Mbamu na yokesela buo.",
        "french": "J'ai passé mon enfance à Mbamu."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mubaku wu dia nsusu' ?",
        "answer": "The fox that eats the hens"
      },
      {
        "type": "fill-in-blank",
        "question": "___ kotele ku hata. (Elle est entrée dans le village)",
        "answer": "wa"
      },
      {
        "type": "matching",
        "question": "Reliez les formes conjuguées à la bonne personne.",
        "answer": "Na kotele ku hata=I entered, Wa kotele ku hata=He/she entered, Ta kotele ku hata=We entered, Lua kotele ku hata=You (pl.) entered"
      },
      {
        "type": "fill-in-blank",
        "question": "Ku hata ___ ta kota. (Elle est en train d'entrer dans le village)",
        "answer": "ka"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Mubaku wu dia nsusu"
      }
    ]
  },
  {
    "id": "yengo-yetela-yilulu-lesson",
    "title": "Yengo, Yetela na Yilulu",
    "level": "intermediate",
    "topic": "yengo",
    "vocab": [
      {
        "lari": "Yengo",
        "french": "L'espoir"
      },
      {
        "lari": "Yengo dia mpamba",
        "french": "Un espoir déçu"
      },
      {
        "lari": "Yetana",
        "french": "Se promener sans but"
      },
      {
        "lari": "Yestela | Yetela",
        "french": "Se chauffer, se mettre près du feu, se réchauffer"
      },
      {
        "lari": "Yilulu",
        "french": "Rester longtemps dans un état ou un endroit"
      },
      {
        "lari": "Tunga nzo",
        "french": "Construire une maison"
      },
      {
        "lari": "Mu ntangu yine",
        "french": "En ces temps-là"
      },
      {
        "lari": "Nzo yine",
        "french": "Cette maison-là"
      },
      {
        "lari": "Mbiji yina",
        "french": "Ce gibier-là"
      },
      {
        "lari": "Nsusu yina",
        "french": "Cette poule-là"
      },
      {
        "lari": "Yirika tiya",
        "french": "Allumer le feu !"
      },
      {
        "lari": "Buishi bu yiridi",
        "french": "Le jour se couche"
      },
      {
        "lari": "Buishi",
        "french": "Le jour, le temps"
      },
      {
        "lari": "Yetana ka ta yetana.",
        "french": "Elle se promène sans but."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Yengo dia mpamba' ?",
        "answer": "A disappointed hope"
      },
      {
        "type": "fill-in-blank",
        "question": "Yetela ___ ta yetela. (Elle se met près du feu)",
        "answer": "ka"
      },
      {
        "type": "matching",
        "question": "Reliez les formes conjuguées de 'yilulu' à leurs significations.",
        "answer": "Njele yilulu ku mamba=I spent a long time at the river, Tuele yilulu ku mamba=We spent a long time at the river, Bele yilulu ku mamba=They spent a long time at the river, Wele yilulu ku mamba=You spen"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'En ces temps-là' en kikongo lari ?",
        "answer": "Mu ntangu yine"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Yengo, Yetela na Yilulu"
      }
    ]
  },
  {
    "id": "luika-munkua-lesson",
    "title": "Luika na Munkua",
    "level": "intermediate",
    "topic": "luika",
    "vocab": [
      {
        "lari": "Luika",
        "french": "La pilosité fournie"
      },
      {
        "lari": "Munkua | Bankua",
        "french": "Possesseur"
      },
      {
        "lari": "Kakasi",
        "french": "Amer, amère"
      },
      {
        "lari": "Ka",
        "french": "Mais"
      },
      {
        "lari": "Munkua ntshi",
        "french": "Celui à qui appartient la chose."
      },
      {
        "lari": "Munkua kumbi",
        "french": "Celui à qui appartient la voiture."
      },
      {
        "lari": "Munkua nzo",
        "french": "Celui à qui appartient la maison."
      }
    ],
    "exercises": [
      {
        "type": "fill-in-blank",
        "question": "Luika lue ___. (Il/elle est bien velu(e))",
        "answer": "nandi"
      },
      {
        "type": "matching",
        "question": "Reliez les pronoms possessifs aux bonnes personnes.",
        "answer": "Luika lue nani=I am hairy, Luika lue naku=You are hairy, Luika lue nandi=He/she is hairy, Luika lue neto=We are hairy"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Munkua nzo' ?",
        "answer": "The house owner"
      },
      {
        "type": "fill-in-blank",
        "question": "Luika ___ nani. (J'étais bien velu(e) — passé)",
        "answer": "lueri"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Luika na Munkua"
      }
    ]
  },
  {
    "id": "nitu-mb-extended",
    "title": "Corps, insectes & nature (Nitu, Mb-)",
    "level": "intermediate",
    "topic": "nitu",
    "vocab": [
      {
        "lari": "Nitu",
        "french": "Le corps"
      },
      {
        "lari": "Mbula n'kama",
        "french": "Sorte de grillon, insecte"
      },
      {
        "lari": "Mbula nkalu",
        "french": "La guêpe maçonne"
      },
      {
        "lari": "Mbulu",
        "french": "Le chacal"
      },
      {
        "lari": "Mbumbungu",
        "french": "Le sable fin blanc"
      },
      {
        "lari": "Mbungi",
        "french": "Repère des fourmis, puits de connaissance, érudition, source, base, point de départ"
      },
      {
        "lari": "Kikulu, tshikulu",
        "french": "Culture, ancestralité"
      },
      {
        "lari": "Mbulumbulu",
        "french": "Le soldat, le défenseur"
      },
      {
        "lari": "Mbangu",
        "french": "Le panier avec un couvercle"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme lari à sa signification",
        "answer": "Nitu=The body, Mbulu=The jackal, Mbungi=Well of knowledge, Kikulu=Culture, ancestrality"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mbumbungu' ?",
        "answer": "Fine white sand"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Body, Insects & Nature (Nitu, Mb-)"
      }
    ]
  },
  {
    "id": "meka-menga-mf-dict",
    "title": "Cris, sang & sensations (Meka, Menga, Mf-)",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Meka",
        "french": "Bêler (pour un mouton), crier"
      },
      {
        "lari": "Mekana",
        "french": "Bêler, crier longtemps"
      },
      {
        "lari": "Mekono",
        "french": "Le bêlement, cri, manière de crier"
      },
      {
        "lari": "Menga",
        "french": "Le sang, embryon, lignée, descendance, postérité, menstrues"
      },
      {
        "lari": "Ngonda",
        "french": "Les règles, menstrues"
      },
      {
        "lari": "Bimuaka",
        "french": "Les semences, graines"
      },
      {
        "lari": "Mfietokoso",
        "french": "Le harcèlement, embêtement, tracasserie"
      },
      {
        "lari": "Mfietoso",
        "french": "L'interrogatoire, harcèlement"
      },
      {
        "lari": "Mfivi",
        "french": "Les gencives"
      },
      {
        "lari": "Mfimfi",
        "french": "Fourmis noires dont la piqûre provoque des maux de tête"
      },
      {
        "lari": "Mfimfiki",
        "french": "Le guili-guili, chatouillement"
      },
      {
        "lari": "Sa mfiki",
        "french": "Chatouiller"
      },
      {
        "lari": "Mfumfula",
        "french": "La poussière, débris, miettes"
      },
      {
        "lari": "Mfumfula za mabaya",
        "french": "La sciure"
      },
      {
        "lari": "Nkumbu",
        "french": "Nom initiatique donné entre 6-7 mois, nom"
      },
      {
        "lari": "Mfumfuta",
        "french": "La poussière"
      },
      {
        "lari": "Mfumfutila",
        "french": "La croissance"
      },
      {
        "lari": "Mfula",
        "french": "Le sens du vent, l'orientation"
      },
      {
        "lari": "Mfutununu",
        "french": "Bouder"
      },
      {
        "lari": "Ndundu",
        "french": "L'albinos"
      },
      {
        "lari": "Mpolomfumfu",
        "french": "L'albinos"
      },
      {
        "lari": "Mfumfu",
        "french": "La voracité"
      },
      {
        "lari": "Mfunda",
        "french": "Poussière, saleté, moisissure, crasse"
      },
      {
        "lari": "Mfutusulu",
        "french": "Le remboursement, fait de faire payer"
      },
      {
        "lari": "Mfuokoko",
        "french": "Le pli, repli"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme lari à sa signification",
        "answer": "Menga=Blood, lineage, Mfivi=Gums, Mfimfiki=Tickling, Ndundu=Albino"
      },
      {
        "type": "fill-in-blank",
        "question": "Mfumfula za ___ = La sciure",
        "answer": "mabaya"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Cries, Blood & Sensations (Meka, Menga, Mf-)"
      }
    ]
  },
  {
    "id": "minza-mp-dict",
    "title": "Expressions, tissus & intelligence (Minza, Mp-)",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Minza",
        "french": "Faire la grimace, la moue"
      },
      {
        "lari": "Mataba",
        "french": "Des chiffons"
      },
      {
        "lari": "Minzanda",
        "french": "Des chiffons, lambeaux"
      },
      {
        "lari": "Minjioka",
        "french": "Brûler"
      },
      {
        "lari": "Minzu",
        "french": "Envoûtant, entrouvert, faisant la moue"
      },
      {
        "lari": "Minzuna",
        "french": "Entrouvrir, retrousser les lèvres"
      },
      {
        "lari": "Mpakanu",
        "french": "Fait de lacérer, déchirer"
      },
      {
        "lari": "Mpambu",
        "french": "L'intelligence, savoir-faire, capacité"
      },
      {
        "lari": "Ngangu",
        "french": "L'intelligence"
      },
      {
        "lari": "Mayela",
        "french": "L'intelligence"
      },
      {
        "lari": "Mposa",
        "french": "L'épervier, mensonge"
      },
      {
        "lari": "Mpoza",
        "french": "L'admiration, étonnement, séduction, nostalgie, extase"
      },
      {
        "lari": "Lumoni",
        "french": "La vision"
      },
      {
        "lari": "Nzitukulu",
        "french": "Ébahi, émerveillé"
      },
      {
        "lari": "Mpungi",
        "french": "Pointe, corne, ivoire d'éléphant travaillée pour produire des sons"
      },
      {
        "lari": "Mpua",
        "french": "Le piège"
      },
      {
        "lari": "Mpuana",
        "french": "Ami(e), camarade, chéri(e), copain/copine"
      },
      {
        "lari": "Nzabakani",
        "french": "Ami(e), camarade, copain/copine"
      },
      {
        "lari": "Nguala",
        "french": "Ami(e), camarade, copain/copine, chéri(e)"
      },
      {
        "lari": "Nduku",
        "french": "Ami(e), camarade, copain/copine"
      },
      {
        "lari": "Mpana",
        "french": "Nouveau, récent"
      },
      {
        "lari": "Pasula",
        "french": "Déchirer"
      },
      {
        "lari": "Mpatakani",
        "french": "Trou inaccessible, ennui, complication"
      },
      {
        "lari": "Mpatakasu",
        "french": "Confusion, échec, fait de contrecarrer"
      },
      {
        "lari": "Mpatanga",
        "french": "Gros, grossier, lourd, très large"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme lari à sa signification",
        "answer": "Ngangu=Intelligence, Mpuana=Friend, darling, Mpoza=Admiration, ecstasy, Pasula=To tear"
      },
      {
        "type": "multiple-choice",
        "question": "Quel mot signifie 'intelligence' en Kikongo Lari ?",
        "answer": "Mpambu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Expressions, Cloth & Intelligence (Minza, Mp-)"
      }
    ]
  },
  {
    "id": "mu-extended-dict-3",
    "title": "Habitudes, fruits & personnes (Mu- étendu)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Muboba|miboba",
        "french": "L'habitude de brader, de casser les prix"
      },
      {
        "lari": "Mubobela|mibobela",
        "french": "La pourriture, fumier"
      },
      {
        "lari": "Mubolo",
        "french": "Le paresseux"
      },
      {
        "lari": "Mudjoki|midjoki",
        "french": "La mèche de cheveux"
      },
      {
        "lari": "Kidjodjo",
        "french": "La mèche de cheveux"
      },
      {
        "lari": "Mufide|mifide",
        "french": "La mangue très mûre, appétissante"
      },
      {
        "lari": "Fimpa",
        "french": "Flairer"
      },
      {
        "lari": "Mufimpi|mifimpi",
        "french": "Personne qui a du flair"
      },
      {
        "lari": "Fimba",
        "french": "Embrasser"
      },
      {
        "lari": "Mukambakani|mikambakani",
        "french": "Le croisement, angine, inflammation de la gorge"
      },
      {
        "lari": "Mfundu",
        "french": "Le secret"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme lari à sa signification",
        "answer": "Mubolo=Lazy one, Fimba=To embrace, Mufide=Very ripe mango, Fimpa=To sniff"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Habits, Fruits & People (Mu- Extended)"
      }
    ]
  },
  {
    "id": "ma-food-body-time",
    "title": "Nourriture, corps & temps (Ma-)",
    "level": "beginner",
    "topic": "ma",
    "vocab": [
      {
        "lari": "Maji",
        "french": "La graisse, l'huile"
      },
      {
        "lari": "Baku malavu",
        "french": "Se saoûler"
      },
      {
        "lari": "Malaki",
        "french": "Festivité dans les villages"
      },
      {
        "lari": "Mama",
        "french": "Maman"
      },
      {
        "lari": "Malu",
        "french": "Vite"
      },
      {
        "lari": "Malu",
        "french": "Les jambes, les pieds"
      },
      {
        "lari": "Longo",
        "french": "L'union"
      },
      {
        "lari": "Ngolo",
        "french": "La force, puissance"
      },
      {
        "lari": "Mamba ma nti",
        "french": "La sève"
      },
      {
        "lari": "Mambu",
        "french": "L'amende"
      },
      {
        "lari": "Manga nsengo",
        "french": "Les grosses guêpes"
      },
      {
        "lari": "Mante",
        "french": "La salive"
      },
      {
        "lari": "Manteka",
        "french": "Le beurre"
      },
      {
        "lari": "Ku mantu",
        "french": "En avant"
      },
      {
        "lari": "Matu",
        "french": "Les pirogues"
      },
      {
        "lari": "Masua",
        "french": "Le bateau"
      },
      {
        "lari": "Maza",
        "french": "L'eau"
      },
      {
        "lari": "Mazuji",
        "french": "Avant-hier"
      },
      {
        "lari": "Mboko",
        "french": "Ensuite, après"
      },
      {
        "lari": "Mena",
        "french": "Germer"
      },
      {
        "lari": "Bi mene mena",
        "french": "Les végétaux"
      },
      {
        "lari": "Meno",
        "french": "Moi"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Maji=Fat, oil, Ngolo=Strength, Mante=Saliva, Maza=Water"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Baku malavu' ?",
        "answer": "To get drunk"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Food, Body & Time (Ma-)"
      }
    ]
  },
  {
    "id": "lo-fruits-sewing",
    "title": "Fruits, couture & apprentissage (Lo-)",
    "level": "intermediate",
    "topic": "lo",
    "vocab": [
      {
        "lari": "Lombo",
        "french": "Le fruit (en général)"
      },
      {
        "lari": "Londa",
        "french": "Coudre, raccommoder"
      },
      {
        "lari": "Longa",
        "french": "Conseiller"
      },
      {
        "lari": "Nlonga",
        "french": "La rangée, le rang"
      },
      {
        "lari": "Longesa",
        "french": "Enseigner"
      },
      {
        "lari": "Nlongi",
        "french": "Le conseil"
      },
      {
        "lari": "Bilongo",
        "french": "Les médicaments, les remèdes"
      },
      {
        "lari": "Longoka",
        "french": "Étudier, apprendre"
      },
      {
        "lari": "Losela",
        "french": "Pondre"
      },
      {
        "lari": "Losoka",
        "french": "Se perdre"
      },
      {
        "lari": "Lobola mante",
        "french": "Cracher"
      },
      {
        "lari": "Nlolo",
        "french": "Le corossolier sauvage"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Lombo=Fruit, Londa=To sew, Longesa=To teach, Longoka=To study"
      },
      {
        "type": "fill-in-blank",
        "question": "Lobola ___ = Cracher",
        "answer": "mante"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Fruits, Sewing & Learning (Lo-)"
      }
    ]
  },
  {
    "id": "bileko-la-dict",
    "title": "Richesse, durée & ponts (Bileko, La-)",
    "level": "intermediate",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Bileko",
        "french": "Objets de valeur, richesse"
      },
      {
        "lari": "Leboka",
        "french": "Se faner"
      },
      {
        "lari": "Lalu",
        "french": "Le pont de liane"
      },
      {
        "lari": "Lambula",
        "french": "Allonger, étendre (la main, les jambes)"
      },
      {
        "lari": "Lambalala",
        "french": "Se coucher"
      },
      {
        "lari": "Nlambula",
        "french": "Le cadeau"
      },
      {
        "lari": "Lamina",
        "french": "Durer longtemps, vivre"
      },
      {
        "lari": "Lamu",
        "french": "Durer, la vie"
      },
      {
        "lari": "Lamuna",
        "french": "Trancher une discussion"
      },
      {
        "lari": "Bulawuka",
        "french": "La folie"
      },
      {
        "lari": "Lapi",
        "french": "Le crayon"
      },
      {
        "lari": "Leho",
        "french": "La dispute"
      },
      {
        "lari": "Lari",
        "french": "Long filet de pêche"
      },
      {
        "lari": "Lebeka",
        "french": "Tendre (un piège)"
      },
      {
        "lari": "Nlele",
        "french": "Étoffe, drap, pagne"
      },
      {
        "lari": "Bulelo",
        "french": "Endroit glissant"
      },
      {
        "lari": "Lema",
        "french": "S'enflammer"
      },
      {
        "lari": "Lembama",
        "french": "Se calmer, s'apaiser"
      },
      {
        "lari": "Bulembe",
        "french": "Doucement, lentement"
      },
      {
        "lari": "Lembo",
        "french": "La nasse"
      },
      {
        "lari": "Nguya za meso",
        "french": "Les lunettes"
      },
      {
        "lari": "Lungueri",
        "french": "La médisance"
      },
      {
        "lari": "Sa lungueri",
        "french": "Médire"
      },
      {
        "lari": "Lemesa",
        "french": "Attiser"
      },
      {
        "lari": "Lemvokela",
        "french": "Obéir"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Nlambula=Gift, Lambalala=To lie down, Bulawuka=Madness, Lapi=Pencil"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Lamu' ?",
        "answer": "To last, life"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Wealth, Duration & Bridges (Bileko, La-)"
      }
    ]
  },
  {
    "id": "hambu-b-extended",
    "title": "Séparation, coutumes & héritage (Hambu, B-)",
    "level": "advanced",
    "topic": "hambu",
    "vocab": [
      {
        "lari": "Hambu",
        "french": "La bifurcation"
      },
      {
        "lari": "Hambula",
        "french": "Séparer"
      },
      {
        "lari": "Hambana",
        "french": "Se séparer"
      },
      {
        "lari": "Batoka",
        "french": "S'abaisser"
      },
      {
        "lari": "Bishi nsi",
        "french": "Les autochtones"
      },
      {
        "lari": "Bela",
        "french": "Haïr, détester"
      },
      {
        "lari": "Mbevo",
        "french": "Le malade"
      },
      {
        "lari": "Mbekele",
        "french": "Le nain"
      },
      {
        "lari": "Bemba",
        "french": "Toucher"
      },
      {
        "lari": "Mbemba",
        "french": "L'aigle"
      },
      {
        "lari": "Betola",
        "french": "Abaisser"
      },
      {
        "lari": "Biala",
        "french": "Devenir chef"
      },
      {
        "lari": "Biamvu",
        "french": "Les ponts"
      },
      {
        "lari": "Biarila",
        "french": "Hériter"
      },
      {
        "lari": "Kieta|bieta",
        "french": "Défaut du corps"
      },
      {
        "lari": "Bika",
        "french": "Saluer; laisser, lâcher"
      },
      {
        "lari": "Mbiki",
        "french": "L'oracle"
      },
      {
        "lari": "Bimbu|bibimbu",
        "french": "La dette"
      },
      {
        "lari": "Binda",
        "french": "La hernie"
      },
      {
        "lari": "Birisa",
        "french": "Faire bouillir"
      },
      {
        "lari": "Bishi hata",
        "french": "Les villageois"
      },
      {
        "lari": "Kimburika-malenge",
        "french": "La luciole"
      },
      {
        "lari": "Buramu",
        "french": "L'aîné"
      },
      {
        "lari": "Butikila",
        "french": "Se gargariser"
      },
      {
        "lari": "Kibutisi",
        "french": "La sage-femme"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Mbemba=Eagle, Butuka=To be born, Kibutisi=Midwife, Biarila=To inherit"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Kimburika-malenge' ?",
        "answer": "Firefly"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Separation, Customs & Heritage (Hambu, B-)"
      }
    ]
  },
  {
    "id": "nk-animals-nature",
    "title": "Animaux, nature & outils (Nk-)",
    "level": "intermediate",
    "topic": "nk",
    "vocab": [
      {
        "lari": "Koto|bikoto",
        "french": "Le bec"
      },
      {
        "lari": "Kamika",
        "french": "Barrer un ruisseau"
      },
      {
        "lari": "Nkampa",
        "french": "Le tissu pourpre"
      },
      {
        "lari": "Ngongolo",
        "french": "Le mille-pattes"
      },
      {
        "lari": "Ngundu-nua",
        "french": "Le rossignol"
      },
      {
        "lari": "Ngunga",
        "french": "La cloche, l'heure"
      },
      {
        "lari": "Nguri",
        "french": "La mère"
      },
      {
        "lari": "Munguanvula",
        "french": "La cigale"
      },
      {
        "lari": "Nguara",
        "french": "La perdrix des bois"
      },
      {
        "lari": "Ngoto",
        "french": "Le sac"
      },
      {
        "lari": "Ngumba",
        "french": "Le porc-épic"
      },
      {
        "lari": "Nkala-nseke",
        "french": "Le scorpion"
      },
      {
        "lari": "Nkalu",
        "french": "La grande calebasse"
      },
      {
        "lari": "Kalu|bikalu",
        "french": "L'échelle, l'escalier"
      },
      {
        "lari": "Kambakana",
        "french": "Se mettre en travers"
      },
      {
        "lari": "Kambakasa",
        "french": "Croiser"
      },
      {
        "lari": "Nkami",
        "french": "Les fourmis rouges"
      },
      {
        "lari": "Nkafi",
        "french": "La pagaie, la rame"
      },
      {
        "lari": "Kaka",
        "french": "Seul; barrer un chemin"
      },
      {
        "lari": "Tshia kaka",
        "french": "L'autre"
      },
      {
        "lari": "Kua kaka",
        "french": "Ailleurs"
      },
      {
        "lari": "Kaka|bikaka",
        "french": "La chouette"
      },
      {
        "lari": "Nkaka",
        "french": "Entier; grand-mère/grand-père maternel(le)"
      },
      {
        "lari": "Nkalala",
        "french": "L'amande palmiste"
      },
      {
        "lari": "Nkakama",
        "french": "Le fourré"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme animal/nature",
        "answer": "Ngongolo=Millipede, Ngumba=Porcupine, Nkala-nseke=Scorpion, Kaka|bikaka=Owl"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nkafi' ?",
        "answer": "Paddle, oar"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Animals, Nature & Tools (Nk-)"
      }
    ]
  },
  {
    "id": "ku-extended-dict-2",
    "title": "Lieux, actions & communauté (Ku-)",
    "level": "advanced",
    "topic": "vocabulaire",
    "vocab": [
      {
        "lari": "Kubama",
        "french": "Se préparer"
      },
      {
        "lari": "Kubuka",
        "french": "Éclater"
      },
      {
        "lari": "Kuka",
        "french": "Devenir complet"
      },
      {
        "lari": "Kikuku",
        "french": "La cuisine"
      },
      {
        "lari": "Nkuku",
        "french": "La ronce"
      },
      {
        "lari": "Lunkukuma",
        "french": "Le bégaiement"
      },
      {
        "lari": "Kono",
        "french": "Entamé; l'angle, le coin"
      },
      {
        "lari": "Munkono",
        "french": "Le coup de poing"
      },
      {
        "lari": "Na konzi-konzi",
        "french": "Entièrement raconté"
      },
      {
        "lari": "Kopa",
        "french": "Gobelet, verre, tasse"
      },
      {
        "lari": "Kosakasa",
        "french": "Écraser (avec le pied)"
      },
      {
        "lari": "Koteka",
        "french": "Le couteau de poche"
      },
      {
        "lari": "Kungu",
        "french": "Sorte de fougère"
      },
      {
        "lari": "Nkunda-nkunda",
        "french": "Le gui"
      },
      {
        "lari": "Nkunga",
        "french": "La chanson"
      },
      {
        "lari": "Makungu",
        "french": "Battements de mains (3 fois) pour exprimer la gratitude"
      },
      {
        "lari": "Nkunku",
        "french": "Le morceau"
      },
      {
        "lari": "Kunzi",
        "french": "Un poteau"
      },
      {
        "lari": "Nkunzi",
        "french": "Cru"
      },
      {
        "lari": "Kurika",
        "french": "Ajouter"
      },
      {
        "lari": "Kurisa",
        "french": "Faire grandir"
      },
      {
        "lari": "Kusa",
        "french": "Badigeonner"
      },
      {
        "lari": "Bunkuta",
        "french": "La peur"
      },
      {
        "lari": "Ba na bunkuta",
        "french": "Avoir peur"
      },
      {
        "lari": "Bukuta",
        "french": "Croquer"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Konkota=To knock, Bunkuta=Fear, Nkunga=Song, Kukusa=To rub against"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Konkota' ?",
        "answer": "To knock on the door"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Places, Actions & Community (Ku-)"
      }
    ]
  },
  {
    "id": "nkaba-ka-extended",
    "title": "Manioc, cola & famille (Nkaba, Ka-)",
    "level": "advanced",
    "topic": "nkaba",
    "vocab": [
      {
        "lari": "Nkaba",
        "french": "Racine de manioc; antilope ordinaire"
      },
      {
        "lari": "Kabila",
        "french": "Partager, distribuer"
      },
      {
        "lari": "Kabisa",
        "french": "Empêcher"
      },
      {
        "lari": "Kabu",
        "french": "Le cadeau, don"
      },
      {
        "lari": "Nkabu",
        "french": "La dureté du cœur, l'envie"
      },
      {
        "lari": "Kabukila",
        "french": "Convoiter"
      },
      {
        "lari": "Kanku",
        "french": "Ciseau large pour tailler les palmiers"
      },
      {
        "lari": "Nka tanga",
        "french": "La crampe"
      },
      {
        "lari": "Katu",
        "french": "À contrecœur"
      },
      {
        "lari": "Katula",
        "french": "Enlever, jeter"
      },
      {
        "lari": "Kani muntu",
        "french": "Personne"
      },
      {
        "lari": "Koba",
        "french": "Opaque"
      },
      {
        "lari": "Buko",
        "french": "Belle-fille, gendre"
      },
      {
        "lari": "Kolela",
        "french": "Supporter courageusement"
      },
      {
        "lari": "Nkobo",
        "french": "Brousse avec de grandes herbes"
      },
      {
        "lari": "Nkeshi sa nitu",
        "french": "La douleur"
      },
      {
        "lari": "Fuila tshari",
        "french": "Avoir pitié"
      },
      {
        "lari": "Kiakuka",
        "french": "Se déchirer"
      },
      {
        "lari": "Minkiela",
        "french": "L'aurore"
      },
      {
        "lari": "Kikata",
        "french": "Le paralytique"
      },
      {
        "lari": "Kati",
        "french": "Bien que, même si"
      },
      {
        "lari": "Kaula",
        "french": "Pousser des cris d'étonnement"
      },
      {
        "lari": "Nguri ya nkazi",
        "french": "L'oncle maternel"
      },
      {
        "lari": "Kazuna",
        "french": "Arracher avec les dents"
      },
      {
        "lari": "Luke",
        "french": "L'écharpe rouge"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Kabila=To share, Kabukila=To covet, Kakula=To save, rescue, Minkiela=Dawn"
      },
      {
        "type": "fill-in-blank",
        "question": "Nguri ya ___ = L'oncle maternel",
        "answer": "nkazi"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Manioc, Cola & Family (Nkaba, Ka-)"
      }
    ]
  },
  {
    "id": "lubula-nludi-l-ext",
    "title": "Sagesse, toit & nature (Lubula, Nludi, L-)",
    "level": "intermediate",
    "topic": "lubula",
    "vocab": [
      {
        "lari": "Lubula",
        "french": "Rendre intelligent(e)"
      },
      {
        "lari": "Nludi",
        "french": "Le toit"
      },
      {
        "lari": "Nluku",
        "french": "La moelle"
      },
      {
        "lari": "Lukula",
        "french": "Arracher complètement"
      },
      {
        "lari": "Nlumba",
        "french": "Le lapin"
      },
      {
        "lari": "Lungi",
        "french": "Le gardien"
      },
      {
        "lari": "Lungila",
        "french": "La chaleur, atmosphère lourde"
      },
      {
        "lari": "Lungu",
        "french": "Être dans l'embarras"
      },
      {
        "lari": "Lungusu",
        "french": "Le harcèlement"
      },
      {
        "lari": "Kilunzi",
        "french": "L'âme"
      },
      {
        "lari": "Luvua",
        "french": "Quatre-vingt-dix (90)"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le mot lari à sa signification",
        "answer": "Nludi=Roof, Nlumba=Rabbit, Kilunzi=Soul, Lubula=To make intelligent"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Wisdom, Roof & Nature (Lubula, Nludi, L-)"
      }
    ]
  },
  {
    "id": "kua-ambo-interrogatives",
    "title": "Quantités & interrogatifs (Kua, Ambo)",
    "level": "intermediate",
    "topic": "kua",
    "vocab": [
      {
        "lari": "Kua",
        "french": "Combien"
      },
      {
        "lari": "Ambo",
        "french": "Particule interrogative (sans équivalent en français)"
      },
      {
        "lari": "Zandu|mazandu",
        "french": "Le marché"
      },
      {
        "lari": "Nsaba",
        "french": "Le jardin"
      },
      {
        "lari": "Mvula",
        "french": "La pluie; l'âge"
      },
      {
        "lari": "Mapapa",
        "french": "Les chaussures"
      },
      {
        "lari": "Tshinkuti",
        "french": "Le vêtement"
      },
      {
        "lari": "Binkuti",
        "french": "Les vêtements"
      },
      {
        "lari": "Nzangu",
        "french": "Le nzangu (jeu traditionnel)"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez l'interrogatif à sa signification",
        "answer": "Kua=How many/much, Ambo=Interrogative particle, Na(ni)=Who / Whose, Kue=Where"
      },
      {
        "type": "fill-in-blank",
        "question": "Mvula ___ ze naku ? (Quel âge as-tu ?)",
        "answer": "kua"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ambo kue wa tuka ?' ?",
        "answer": "Where do you come from?"
      },
      {
        "type": "fill-in-blank",
        "question": "Lala di dia ___ ? (À qui appartient cette orange ?)",
        "answer": "na(ni)"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Il y a beaucoup d'arbres dans ce jardin' ?",
        "answer": "Ku nsaba ku miti mia mingi mie(na) ku"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Quantities & Interrogatives (Kua, Ambo)"
      }
    ]
  },
  {
    "id": "boissons-drinks",
    "title": "Boissons & breuvages (Nua na Malavu)",
    "level": "beginner",
    "topic": "boissons",
    "vocab": [
      {
        "lari": "Nua",
        "french": "Boire"
      },
      {
        "lari": "Malavu",
        "french": "Le vin de palme"
      },
      {
        "lari": "Maza",
        "french": "L'eau"
      },
      {
        "lari": "Mamba",
        "french": "L'eau (liquide, jus)"
      },
      {
        "lari": "Mamba ma nti",
        "french": "La sève"
      },
      {
        "lari": "Baku malavu",
        "french": "Se saoûler"
      },
      {
        "lari": "Botana",
        "french": "Boire du vin, heurter"
      },
      {
        "lari": "Lobola mante",
        "french": "Cracher"
      },
      {
        "lari": "Mante",
        "french": "La salive"
      },
      {
        "lari": "Manteka",
        "french": "Le beurre"
      },
      {
        "lari": "Maji",
        "french": "La graisse, l'huile"
      },
      {
        "lari": "Kopa",
        "french": "Le gobelet, verre, tasse"
      },
      {
        "lari": "Mbungu",
        "french": "La coupe (pour boire)"
      },
      {
        "lari": "Sekola",
        "french": "Verser à boire, transvaser"
      },
      {
        "lari": "Munsie",
        "french": "La canne à sucre"
      },
      {
        "lari": "Sukari",
        "french": "Le sucre"
      },
      {
        "lari": "Nsombe",
        "french": "Le ver du palmier (comestible)"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez le terme lari de boisson/liquide à sa signification",
        "answer": "Nua=To drink, Malavu=Palm wine, Maza=Water, Kopa=Cup, glass"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Baku malavu' ?",
        "answer": "To get drunk"
      },
      {
        "type": "fill-in-blank",
        "question": "Hana mono ___. (Donne-moi de l'eau.)",
        "answer": "mamba"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Kopa' ?",
        "answer": "Cup, glass"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Drinks & Beverages (Nua na Malavu)"
      }
    ]
  },
  {
    "id": "mui-mots-nouveaux",
    "title": "Verbes et noms en Mui-",
    "level": "intermediate",
    "topic": "mui",
    "vocab": [
      {
        "lari": "muisisa",
        "french": "en faire voir à quelqu'un"
      },
      {
        "lari": "muisa",
        "french": "faire voir, faire sentir"
      },
      {
        "lari": "potesa",
        "french": "faire voir, faire sentir"
      },
      {
        "lari": "muisu",
        "french": "fait d'en faire voir à quelqu'un"
      },
      {
        "lari": "Muisu mpashi",
        "french": "être maltraité"
      },
      {
        "lari": "muisunu",
        "french": "démonstration, présentation, prétexte pour faire souffrir"
      },
      {
        "lari": "muisusu",
        "french": "fait de souffrir"
      },
      {
        "lari": "muivi",
        "french": "voleur"
      },
      {
        "lari": "muizu",
        "french": "arrivée, venue"
      },
      {
        "lari": "nkuizulu",
        "french": "arrivée"
      },
      {
        "lari": "muonso",
        "french": "partout"
      },
      {
        "lari": "muanzi",
        "french": "souche, racine, fibre, filament, corps étranger"
      },
      {
        "lari": "singini",
        "french": "souche, racine, vortex"
      },
      {
        "lari": "Mua nzievo",
        "french": "barbichette"
      },
      {
        "lari": "muatu",
        "french": "un tel"
      },
      {
        "lari": "kingandi",
        "french": "un tel, une telle"
      },
      {
        "lari": "muaumu",
        "french": "dedans, ici, là-dedans"
      },
      {
        "lari": "mue",
        "french": "éclairant, éclairé"
      },
      {
        "lari": "muekese",
        "french": "l'épine du porc-épic, dard, épine"
      }
    ],
    "exercises": [
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Muisisa, Muivi, Muanzi..."
      }
    ]
  },
  {
    "id": "nouvelles-entrees-2",
    "title": "Nouvelle série de vocabulaire",
    "level": "intermediate",
    "topic": "nouvelles",
    "vocab": [
      {
        "lari": "ngansua",
        "french": "chenille rousse comestible"
      },
      {
        "lari": "nsende",
        "french": "l'épine"
      },
      {
        "lari": "nsalulu",
        "french": "le fonctionnement, la manière de travailler"
      },
      {
        "lari": "Tshindongo tshia mbakala",
        "french": "mouton"
      },
      {
        "lari": "Kindongo kia mbakala",
        "french": "mouton"
      },
      {
        "lari": "kebo",
        "french": "briquet, pierre à feu, silex"
      },
      {
        "lari": "kedima",
        "french": "briller, étinceler"
      },
      {
        "lari": "ndekela",
        "french": "l'étincelle"
      },
      {
        "lari": "kela",
        "french": "balle de fusil, plomb, grenaille, étincelle, éclat"
      },
      {
        "lari": "Kela dia mungua",
        "french": "grain de sable"
      },
      {
        "lari": "Kela menga",
        "french": "sacrifier quelqu'un, libation de sang"
      },
      {
        "lari": "lemvokela",
        "french": "pardonner"
      },
      {
        "lari": "kelana",
        "french": "se trahir, se livrer"
      },
      {
        "lari": "wirikila",
        "french": "obéir"
      },
      {
        "lari": "kesa",
        "french": "circoncire"
      },
      {
        "lari": "kesoka",
        "french": "être circoncis"
      },
      {
        "lari": "kifuani",
        "french": "exemple"
      },
      {
        "lari": "Keso die nandi",
        "french": "Il a été circoncis."
      },
      {
        "lari": "Sutu die nandi",
        "french": "Il n'est pas circoncis."
      },
      {
        "lari": "kesesa",
        "french": "faire circoncire"
      },
      {
        "lari": "muwakila",
        "french": "l'écho"
      },
      {
        "lari": "ngunia",
        "french": "des lunettes"
      },
      {
        "lari": "nsekoso",
        "french": "oiseaux tisserands qui aiment nicher sur les bambous"
      },
      {
        "lari": "tieri",
        "french": "sorte de guêpe dont les larves sont comestibles"
      },
      {
        "lari": "magansengo",
        "french": "sorte de guêpes dont la piqûre peut faire doubler de volume"
      }
    ],
    "exercises": []
  },
  {
    "id": "kikongo-nouvelles-entrees-2024",
    "title": "Nouvelles entrées Kikongo",
    "level": "intermediate",
    "topic": "kikongo",
    "vocab": [
      {
        "lari": "Muana nsusu",
        "french": "Un poussin"
      },
      {
        "lari": "Tshibuka",
        "french": "Un endroit"
      },
      {
        "lari": "Mbuka",
        "french": "Le lieu"
      },
      {
        "lari": "Nkusu",
        "french": "Un perroquet"
      },
      {
        "lari": "Luyalu",
        "french": "La gouvernance"
      },
      {
        "lari": "Mutshila Mamba",
        "french": "La Queue de l'eau (nom d'un village du Kongo Mfua)"
      },
      {
        "lari": "Sosa",
        "french": "Chercher"
      },
      {
        "lari": "Funda na nkama nsambuadi na nsambuadi",
        "french": "1707"
      },
      {
        "lari": "Mzansi",
        "french": "Nom kikongo de l'Afrique du Sud"
      },
      {
        "lari": "Bimpete",
        "french": "Poissons"
      },
      {
        "lari": "Bimpete karingu",
        "french": "Poissons grillés"
      },
      {
        "lari": "Nkunzu",
        "french": "Cru(e)"
      },
      {
        "lari": "Lukuni | Nkuni",
        "french": "Bois de chauffage"
      },
      {
        "lari": "Ngana nkuni",
        "french": "Donne-moi du bois de chauffage"
      },
      {
        "lari": "Hana",
        "french": "Donne"
      },
      {
        "lari": "Hana mungua",
        "french": "Donne le sel"
      },
      {
        "lari": "Ngana mungua",
        "french": "Donne-moi le sel"
      },
      {
        "lari": "Tshitari (a court)",
        "french": "Une cascade"
      },
      {
        "lari": "Tshitari (a long)",
        "french": "Miroir"
      },
      {
        "lari": "Makenko",
        "french": "Les entailles"
      },
      {
        "lari": "Sungamana",
        "french": "Regarder avec étonnement"
      },
      {
        "lari": "Muana mbua",
        "french": "Un chiot"
      },
      {
        "lari": "Meki ma binienia",
        "french": "Des œufs de fourmis"
      },
      {
        "lari": "Meki",
        "french": "Des œufs"
      },
      {
        "lari": "Binienia",
        "french": "Fourmis"
      }
    ],
    "exercises": [
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Nouvelles entrées Kikongo"
      }
    ]
  },
  {
    "id": "mandombe-terminologie",
    "title": "Terminologie Mandombe",
    "level": "advanced",
    "topic": "mandombe",
    "vocab": [
      {
        "lari": "kisimba",
        "french": "voyelle, se combine avec la mvuala (consonne)"
      },
      {
        "lari": "mvuala",
        "french": "consonne ; bâton de guérison confié à un nganga (thérapeute énergétique de la tradition Kongo)"
      },
      {
        "lari": "mahazanza",
        "french": "méta-univers"
      },
      {
        "lari": "nkenge",
        "french": "nom d'un mahanza, position d'une kisimba et mvuala en mandombe"
      },
      {
        "lari": "Nsona",
        "french": "nom d'un mahanza, position d'une kisimba et mvuala en mandombe"
      },
      {
        "lari": "konzo",
        "french": "nom d'un mahanza, position d'une kisimba et mvuala en mandombe"
      },
      {
        "lari": "nkandu",
        "french": "nom d'un mahanza, position d'une kisimba et mvuala en mandombe"
      },
      {
        "lari": "zita",
        "french": "union d'une mvuala (consonne) et d'une kisimba (voyelle), syllabe"
      },
      {
        "lari": "nkoma-nkoma",
        "french": "voyelle complémentaire dans la nomenclature mandombe (ia, ue, io)"
      },
      {
        "lari": "kimpa",
        "french": "voyelle complémentaire dans la nomenclature mandombe (ui, iu)"
      },
      {
        "lari": "bisinsu",
        "french": "signe de ponctuation"
      },
      {
        "lari": "Mvuala za mpamba",
        "french": "consonnes simples"
      },
      {
        "lari": "Mvuala ya mpamba",
        "french": "consonne simple"
      },
      {
        "lari": "Mvuala za piluka",
        "french": "consonnes composées"
      },
      {
        "lari": "Mvuala ya piluka",
        "french": "consonne composée"
      },
      {
        "lari": "Mvuala za mpimpita",
        "french": "consonnes complexes"
      },
      {
        "lari": "Mvuala ya mpimpa",
        "french": "consonne complexe"
      },
      {
        "lari": "Mvuala za lambuka",
        "french": "consonnes prolongées"
      },
      {
        "lari": "Mvuala za kimbangu",
        "french": "groupe consonantique"
      },
      {
        "lari": "Mvuala za mazindinga",
        "french": "consonnes migratoires"
      }
    ],
    "exercises": [
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Kisimba, Mvuala, Zita..."
      }
    ]
  },
  {
    "id": "verbes-actions-etendus",
    "title": "Verbes & Actions (étendu)",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "fomba",
        "french": "avoir bonne mine, avoir un bon teint, être pleine d'énergie"
      },
      {
        "lari": "nsululu",
        "french": "personne pâle par manque de vitalité"
      },
      {
        "lari": "defa",
        "french": "emprunter"
      },
      {
        "lari": "defesa",
        "french": "prêter"
      },
      {
        "lari": "kinkasa",
        "french": "bouger, mettre en désordre, perturber, désorganiser, bousculer"
      },
      {
        "lari": "palangasa",
        "french": "désorganiser, bouger, bousculer, perturber"
      },
      {
        "lari": "nimba",
        "french": "tuer, assassiner ; somnoler"
      },
      {
        "lari": "n'kelo",
        "french": "préparation végétale obtenue en écrasant des feuilles pour en extraire le jus à usage thérapeutique"
      },
      {
        "lari": "kinimbi",
        "french": "tueur, assassin"
      },
      {
        "lari": "kinkenene",
        "french": "dégoût, répulsion"
      },
      {
        "lari": "kinkento",
        "french": "féminité"
      },
      {
        "lari": "fumba",
        "french": "courber ; réprimande"
      },
      {
        "lari": "fumbama",
        "french": "ployer, se plier, se courber, céder sous le poids, se pencher"
      },
      {
        "lari": "fumfula",
        "french": "tituber, chanceler, vaciller sur ses jambes"
      },
      {
        "lari": "fuma",
        "french": "coin d'une chambre, angle des murs"
      },
      {
        "lari": "fulamana",
        "french": "dormir sur le ventre, se prostrer"
      },
      {
        "lari": "fulamasa",
        "french": "faire coucher sur le ventre"
      },
      {
        "lari": "dekakana",
        "french": "marcher de travers"
      },
      {
        "lari": "dekele",
        "french": "démarche des personnes"
      },
      {
        "lari": "dekodeko",
        "french": "sans force, sans résistance, instable, influençable"
      },
      {
        "lari": "buimi",
        "french": "avarice, égoïsme, égocentrisme"
      },
      {
        "lari": "lukokoto",
        "french": "avarice, égoïsme, égocentrisme"
      },
      {
        "lari": "lunomo",
        "french": "avarice, égoïsme, égocentrisme"
      },
      {
        "lari": "buota",
        "french": "malaxer, moudre, pétrir, frapper, jeter à terre avec force, empirer (pour une maladie)"
      },
      {
        "lari": "buotana",
        "french": "se cogner, être cogné, être joint"
      },
      {
        "lari": "Buedi ntama",
        "french": "autrefois"
      },
      {
        "lari": "Buedi ntete",
        "french": "au début, jadis"
      },
      {
        "lari": "Ha manima",
        "french": "à la fin, par la suite"
      },
      {
        "lari": "Mu pari",
        "french": "le matin, dans la matinée"
      },
      {
        "lari": "Lumingu lua yokele",
        "french": "la semaine passée, dernière"
      },
      {
        "lari": "Kaluka zoba",
        "french": "s'abêtir"
      },
      {
        "lari": "Muina djiki",
        "french": "convoiter"
      },
      {
        "lari": "Muina nsayi",
        "french": "être dans la joie"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « buota » en Kikongo Lari ?",
        "answer": "Malaxer, pétrir, frapper"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « vuama » ?",
        "answer": "Être riche, être bien établi"
      },
      {
        "type": "multiple-choice",
        "question": "Quel mot signifie « se souvenir » ?",
        "answer": "bambuka"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « koseka » ?",
        "answer": "Raccourcir"
      },
      {
        "type": "matching",
        "question": "Associez chaque verbe Lari à sa traduction.",
        "answer": "sosa=chercher, keba=faire attention, komba=balayer, teka=vendre"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot Mandombe à son sens.",
        "answer": "fomba=avoir bonne mine, nimba=tuer ; somnoler, defa=emprunter, defesa=prêter"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe glyph"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Mandombe — Hidden Verbs"
      }
    ]
  },
  {
    "id": "nature-animaux-objets-etendus",
    "title": "Nature, Animaux & Objets (étendu)",
    "level": "intermediate",
    "topic": "nature",
    "vocab": [
      {
        "lari": "nsumba",
        "french": "poisson-chat"
      },
      {
        "lari": "ngola",
        "french": "le poisson-chat, le silure"
      },
      {
        "lari": "make",
        "french": "sorte de poisson d'eau douce"
      },
      {
        "lari": "lembe",
        "french": "cigogne"
      },
      {
        "lari": "munkiobo",
        "french": "ver de terre"
      },
      {
        "lari": "munganga",
        "french": "corbeau"
      },
      {
        "lari": "mushikimbila",
        "french": "requin"
      },
      {
        "lari": "minsala",
        "french": "les crevettes"
      },
      {
        "lari": "nkusu",
        "french": "un perroquet"
      },
      {
        "lari": "muana mbua",
        "french": "un chiot"
      },
      {
        "lari": "muana nsusu",
        "french": "un poussin"
      },
      {
        "lari": "bimpete",
        "french": "poissons"
      },
      {
        "lari": "binienia",
        "french": "fourmis"
      },
      {
        "lari": "munturia",
        "french": "sangsue"
      },
      {
        "lari": "musonia",
        "french": "plante herbacée dont les jeunes pousses peuvent provoquer de petites blessures au contact"
      },
      {
        "lari": "mbulu",
        "french": "chacal"
      },
      {
        "lari": "mbula nkama",
        "french": "sorte de grillon, insecte"
      },
      {
        "lari": "mbula nkalu",
        "french": "guêpe maçonne"
      },
      {
        "lari": "mpolo",
        "french": "poussière, cendre"
      },
      {
        "lari": "mbumbungu",
        "french": "sable fin blanc"
      },
      {
        "lari": "mbungi",
        "french": "repère des fourmis sur terre, puits de connaissance, érudition, source, point de départ"
      },
      {
        "lari": "tisama",
        "french": "une termitière"
      },
      {
        "lari": "kikuku",
        "french": "termitière ; la cuisine"
      },
      {
        "lari": "nsende",
        "french": "les épines, les arêtes de poisson"
      },
      {
        "lari": "makaya",
        "french": "feuilles"
      },
      {
        "lari": "Kanga mankondi",
        "french": "un régime de bananes"
      },
      {
        "lari": "Ngana nkuni",
        "french": "Donne-moi du bois de chauffage"
      },
      {
        "lari": "Ku nima",
        "french": "dans le dos, derrière"
      },
      {
        "lari": "Ku manima",
        "french": "en arrière"
      },
      {
        "lari": "Ma landila",
        "french": "en arrière, en retard"
      },
      {
        "lari": "Mafunda ma tanu na nkama moshi na kumi",
        "french": "5110 (km, distance entre la terre et la lune)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « nsumba » ?",
        "answer": "Poisson-chat"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « panier » en Lari ?",
        "answer": "kitunga"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « menga » ?",
        "answer": "Sang"
      },
      {
        "type": "multiple-choice",
        "question": "Quel mot désigne « le coude » ?",
        "answer": "tshinkoso tia koko"
      },
      {
        "type": "matching",
        "question": "Associez chaque animal à sa traduction.",
        "answer": "mushikimbila=requin, nkusu=perroquet, mbulu=chacal, munganga=corbeau"
      },
      {
        "type": "matching",
        "question": "Associez chaque partie du corps à sa traduction.",
        "answer": "lutambi=le pied, bunda=la cuisse, nitu=le corps, tshivumu=le ventre"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Nature & Animals"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Mandombe — Animals & Nature"
      }
    ]
  },
  {
    "id": "tradition-kongo-societe",
    "title": "Tradition Kongo & Société",
    "level": "intermediate",
    "topic": "tradition",
    "vocab": [
      {
        "lari": "mbawu",
        "french": "la conscience du feu dans la tradition Kongo"
      },
      {
        "lari": "mba",
        "french": "le feu manifesté dans la tradition Kongo"
      },
      {
        "lari": "nza dia kenza",
        "french": "le monde astral dans la tradition Kongo"
      },
      {
        "lari": "nza kingunda",
        "french": "le monde des émotions dans la tradition Kongo"
      },
      {
        "lari": "simbi",
        "french": "esprits"
      },
      {
        "lari": "mahasimbi",
        "french": "grands esprits"
      },
      {
        "lari": "walesa",
        "french": "homme dieu"
      },
      {
        "lari": "lowa",
        "french": "être du soleil"
      },
      {
        "lari": "ntemo",
        "french": "la lumière du nza (cosmos manifesté), une conscience dans la tradition Kongo"
      },
      {
        "lari": "kinkeko",
        "french": "particule qui permet de comprendre la structure énergétique du mbi (feu intérieur)"
      },
      {
        "lari": "bukongo",
        "french": "sagesse kongo"
      },
      {
        "lari": "ntuni",
        "french": "voûte céleste"
      },
      {
        "lari": "kintamina",
        "french": "l'espace"
      },
      {
        "lari": "ntela",
        "french": "la maturité"
      },
      {
        "lari": "kinzo",
        "french": "art d'organiser et d'aménager l'espace domestique pour préserver l'énergie vitale"
      },
      {
        "lari": "adi",
        "french": "conscience divine de la lumière dans la tradition Kongo"
      },
      {
        "lari": "nsi ya ya",
        "french": "quatrième dimension"
      },
      {
        "lari": "bena nsilulu",
        "french": "les enfants de la prophétie (dans la tradition Kongo)"
      },
      {
        "lari": "lema",
        "french": "l'esprit"
      },
      {
        "lari": "banzayi",
        "french": "les initiés de la tradition Kongo, les savants"
      },
      {
        "lari": "mpungu mvuaza",
        "french": "rituel de protection pour brouiller les pistes"
      },
      {
        "lari": "kibakala",
        "french": "la virilité ; énergie masculine intérieure"
      },
      {
        "lari": "kilenga",
        "french": "oisif, paresseux, fainéant"
      },
      {
        "lari": "kilo",
        "french": "groupement"
      },
      {
        "lari": "kikulu",
        "french": "culture, ancestralité"
      },
      {
        "lari": "Bue ba tele?",
        "french": "Comment ça va ?"
      },
      {
        "lari": "Lumingu lu kwiza",
        "french": "la semaine prochaine"
      },
      {
        "lari": "Ngonda yi kuiza",
        "french": "le mois prochain"
      },
      {
        "lari": "Tsha nkoyi",
        "french": "à la prochaine"
      },
      {
        "lari": "Nkana mfuenge",
        "french": "il ressemble à un renard"
      },
      {
        "lari": "Funda na nkama nsambuadi na nsambuadi",
        "french": "1707"
      },
      {
        "lari": "Nzangu tu ta bula",
        "french": "Nous sommes en train de jouer au nzangu"
      },
      {
        "lari": "Nzangu lu ta bula?",
        "french": "Vous jouez au nzangu ?"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « bukongo » ?",
        "answer": "La sagesse kongo"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « kinzo » ?",
        "answer": "Art d'aménager l'espace domestique"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « la semaine » en Lari ?",
        "answer": "lumingu"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « buzitu » ?",
        "answer": "Le respect"
      },
      {
        "type": "matching",
        "question": "Associez chaque concept kongo à sa traduction.",
        "answer": "ntuni=voûte céleste, ntela=la maturité, luyalu=la gouvernance, bununu=la vieillesse"
      },
      {
        "type": "matching",
        "question": "Associez les expressions à leur sens.",
        "answer": "Bue ba tele?=Comment ça va ?, Tsha nkoyi=à la prochaine, Lumingu lu kwiza=la semaine prochaine, Ngonda yi kuiza=le mois prochain"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Kongo Tradition glyphs"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Mandombe — Kongo Tradition"
      }
    ]
  },
  {
    "id": "saisons-kongo",
    "title": "Les saisons Kongo",
    "level": "beginner",
    "topic": "saisons",
    "vocab": [
      {
        "lari": "Kintombo",
        "french": "Avril à mai"
      },
      {
        "lari": "Nkiela",
        "french": "Mai à juin"
      },
      {
        "lari": "Luanza",
        "french": "Juin à juillet"
      },
      {
        "lari": "Shihu",
        "french": "Juillet à août"
      },
      {
        "lari": "Lunkiesa",
        "french": "Août à septembre"
      },
      {
        "lari": "Senza kiamasanza",
        "french": "Septembre à octobre"
      },
      {
        "lari": "Mbangala",
        "french": "Octobre à novembre"
      },
      {
        "lari": "Kumpua",
        "french": "Novembre à décembre"
      },
      {
        "lari": "Vila",
        "french": "Décembre à janvier"
      },
      {
        "lari": "Akunde",
        "french": "Janvier à février"
      },
      {
        "lari": "Kundi",
        "french": "Février à mars"
      },
      {
        "lari": "Kundi kianene",
        "french": "Mars à avril"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle saison correspond à avril–mai ?",
        "answer": "Kintombo"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle saison va d'octobre à novembre ?",
        "answer": "Mbangala"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle période couvre 'Vila' ?",
        "answer": "Décembre à janvier"
      },
      {
        "type": "matching",
        "question": "Associez chaque saison à sa période",
        "answer": "Kintombo=April–May, Shihu=July–August, Kumpua=November–December, Akunde=January–February"
      },
      {
        "type": "mandombe-recognition",
        "question": "Reconnaître les saisons en Mandombe"
      }
    ]
  },
  {
    "id": "binama-bia-nitu",
    "title": "Binama bia nitu",
    "level": "beginner",
    "topic": "binama",
    "vocab": [
      {
        "lari": "Moyo",
        "french": "Ventre, cœur"
      },
      {
        "lari": "Bubelo",
        "french": "Maladie"
      },
      {
        "lari": "Nsuki",
        "french": "Les cheveux"
      },
      {
        "lari": "Disu dia kulu",
        "french": "La malléole externe"
      },
      {
        "lari": "Meso ma kulu",
        "french": "Les malléoles externes"
      },
      {
        "lari": "Ntu",
        "french": "Tête"
      },
      {
        "lari": "Meso",
        "french": "Les yeux"
      },
      {
        "lari": "Kulu",
        "french": "Pied"
      },
      {
        "lari": "Nima",
        "french": "Dos"
      },
      {
        "lari": "Yelo",
        "french": "Barbe"
      },
      {
        "lari": "Sakalala",
        "french": "Aller mieux, se rétablir"
      },
      {
        "lari": "Diatulu",
        "french": "Comportement"
      },
      {
        "lari": "Moyo tatika.",
        "french": "J'ai mal au ventre (enfants)."
      },
      {
        "lari": "Moyo tatika wu ta ku ntatika.",
        "french": "J'ai mal au ventre (adultes)."
      },
      {
        "lari": "Bubelo nje.",
        "french": "Je suis malade."
      },
      {
        "lari": "Muana yema ka ta yema.",
        "french": "L'enfant tète."
      },
      {
        "lari": "Muana mabeni ka ta nua.",
        "french": "L'enfant tète."
      },
      {
        "lari": "Muana wu sakalale, dia ka ta dia.",
        "french": "L'enfant se porte mieux, il mange."
      },
      {
        "lari": "Kinienia wa zolo bia fua.",
        "french": "La fourmi qui aime ce qui est mort."
      },
      {
        "lari": "Muana nkiri ku nima.",
        "french": "J'ai mis l'enfant au dos."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Bubelo nje' ?",
        "answer": "I am sick"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Sakalale ?' ?",
        "answer": "Are you feeling better?"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Nous nous portons mieux' en lari ?",
        "answer": "Tu sakalale"
      },
      {
        "type": "fill-in-blank",
        "question": "Aujourd'hui je lave ___ cheveux.",
        "answer": "zani"
      },
      {
        "type": "fill-in-blank",
        "question": "J'ai mis l'enfant au ___.",
        "answer": "nkiri"
      },
      {
        "type": "matching",
        "question": "Associez les parties du corps à leur signification",
        "answer": "Nsuki=Hair, Meso=Eyes, Ntu=Head, Kulu=Foot"
      },
      {
        "type": "mandombe-recognition",
        "question": "Lire le Mandombe – Corps et santé"
      }
    ]
  },
  {
    "id": "mpashi-zo-ntama",
    "title": "Mpashi zo ntama za tuka",
    "level": "intermediate",
    "topic": "mpashi",
    "vocab": [
      {
        "lari": "Ntama",
        "french": "Longtemps"
      },
      {
        "lari": "Tuka",
        "french": "Venir de (u long) / insulter (u court)"
      },
      {
        "lari": "Nsoni",
        "french": "Honte"
      },
      {
        "lari": "Mpasi",
        "french": "Souffrance"
      },
      {
        "lari": "Vuka",
        "french": "Échapper, survivre"
      },
      {
        "lari": "Tambula",
        "french": "Accepter"
      },
      {
        "lari": "Matondo",
        "french": "Merci"
      },
      {
        "lari": "Nsaba",
        "french": "Jardin"
      },
      {
        "lari": "Dema",
        "french": "Poids"
      },
      {
        "lari": "Fumu",
        "french": "Tabac"
      },
      {
        "lari": "Ndala | Mandala",
        "french": "Palme(s)"
      },
      {
        "lari": "Mpe",
        "french": "Aussi, et"
      },
      {
        "lari": "Mazono",
        "french": "Hier"
      },
      {
        "lari": "Buaubu",
        "french": "Maintenant"
      },
      {
        "lari": "Mbaji",
        "french": "Demain"
      },
      {
        "lari": "Musualu",
        "french": "Vite"
      },
      {
        "lari": "Mpamba",
        "french": "Vide"
      },
      {
        "lari": "Fuluka",
        "french": "Plein"
      },
      {
        "lari": "Mpashi zo ntama za tuka.",
        "french": "Ces souffrances durent depuis longtemps."
      },
      {
        "lari": "Nsoni kua beno!",
        "french": "Honte à vous !"
      },
      {
        "lari": "Nsoni na mpasi ta tamburi tala fua tala vuka.",
        "french": "S'il est question de vie ou de mort, on accepte qu'on se moque de nous."
      },
      {
        "lari": "Matondo, Mama Ntangu.",
        "french": "Merci le soleil."
      },
      {
        "lari": "Nsaba ya toma.",
        "french": "Le jardin est beau."
      },
      {
        "lari": "Nsaba ya beto ya nene.",
        "french": "Notre jardin est grand."
      },
      {
        "lari": "Sa musualu!",
        "french": "Fais vite, dépêche-toi."
      },
      {
        "lari": "Dema dia dingi.",
        "french": "C'est lourd."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nsoni kua beno!' ?",
        "answer": "Shame on you!"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Je viens de France' (1ère personne) ?",
        "answer": "Ku Mputu ntukidi"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'mazono' ?",
        "answer": "Yesterday"
      },
      {
        "type": "fill-in-blank",
        "question": "Je viens de France.",
        "answer": "ntukidi"
      },
      {
        "type": "matching",
        "question": "Associez les mots temporels à leur signification",
        "answer": "Mazono=Yesterday, Buaubu=Now, Mbaji=Tomorrow, Ntama=A long time"
      },
      {
        "type": "mandombe-recognition",
        "question": "Lire le Mandombe – Proverbes et expressions"
      }
    ]
  },
  {
    "id": "nkombo-kue-ye",
    "title": "Nkombo kue ye?",
    "level": "intermediate",
    "topic": "nkombo",
    "vocab": [
      {
        "lari": "Nkombo",
        "french": "Chèvre"
      },
      {
        "lari": "Ngulu",
        "french": "Cochon"
      },
      {
        "lari": "Mbua",
        "french": "Chien"
      },
      {
        "lari": "Mbuma",
        "french": "Chat"
      },
      {
        "lari": "Nuni | Banuni",
        "french": "Oiseau(x)"
      },
      {
        "lari": "Dimpa | Mampa",
        "french": "Pain(s)"
      },
      {
        "lari": "Binkuti",
        "french": "Habits, vêtements"
      },
      {
        "lari": "Mbuata | Mbuata",
        "french": "Bouteille(s)"
      },
      {
        "lari": "Mapapa",
        "french": "Chaussures"
      },
      {
        "lari": "Kintu | Bintu",
        "french": "Ananas"
      },
      {
        "lari": "Nsafu",
        "french": "Safou"
      },
      {
        "lari": "Luzala | Nzala",
        "french": "Ongle(s)"
      },
      {
        "lari": "Lukuba | Tukuba",
        "french": "Coussin(s)"
      },
      {
        "lari": "Bitenda",
        "french": "Bouts de tissu"
      },
      {
        "lari": "Nkumbu",
        "french": "Nom"
      },
      {
        "lari": "Nkombo kue ye?",
        "french": "Où est la chèvre ?"
      },
      {
        "lari": "Ngulu kue ye?",
        "french": "Où est le cochon ?"
      },
      {
        "lari": "Mbua kue ye?",
        "french": "Où est le chien ?"
      },
      {
        "lari": "Tshibuka tshi tsha muntu teshe?",
        "french": "Est-ce que cette place appartient à quelqu'un ?"
      },
      {
        "lari": "Bakento bole.",
        "french": "Deux femmes."
      },
      {
        "lari": "Nuni zole.",
        "french": "Deux oiseaux."
      },
      {
        "lari": "Nzo zole.",
        "french": "2 maisons."
      },
      {
        "lari": "Mapapa mole.",
        "french": "2 chaussures."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment demande-t-on 'Où est la chèvre ?' en lari ?",
        "answer": "Nkombo kue ye?"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Dimpa di moshi' ?",
        "answer": "1 bread"
      },
      {
        "type": "multiple-choice",
        "question": "Comment demande-t-on 'Où sont les safous ?' (pluriel) ?",
        "answer": "Nsafu kue ze?"
      },
      {
        "type": "fill-in-blank",
        "question": "3 pains.",
        "answer": "ma"
      },
      {
        "type": "matching",
        "question": "Associez les formes de localisation singulier/pluriel",
        "answer": "Nsafu kue ye?=Where is the safou?, Nsafu kue ze?=Where are the safous?, Dimpa kue die?=Where is the bread?, Mampa kue me?=Where are the breads?"
      },
      {
        "type": "mandombe-recognition",
        "question": "Lire le Mandombe – Animaux et objets"
      }
    ]
  },
  {
    "id": "bala-ba-ngulu-bia-bitatu",
    "title": "Bala ba ngulu bia bitatu",
    "level": "intermediate",
    "topic": "bala",
    "vocab": [
      {
        "lari": "Bilongo",
        "french": "Médicaments"
      },
      {
        "lari": "Nsayi",
        "french": "Joie, contentement"
      },
      {
        "lari": "Tolo",
        "french": "Sommeil"
      },
      {
        "lari": "Nsatu",
        "french": "Faim"
      },
      {
        "lari": "Bikua",
        "french": "Ignames"
      },
      {
        "lari": "Bangula",
        "french": "Expliquer"
      },
      {
        "lari": "Nsamba",
        "french": "Vin de palme, scarifications"
      },
      {
        "lari": "Tshibete | Bibete",
        "french": "Graines de courges écrasées et cuites"
      },
      {
        "lari": "Nkekoso",
        "french": "Oiseaux tisserands"
      },
      {
        "lari": "Tshivvuadangu",
        "french": "Canard"
      },
      {
        "lari": "Masangu",
        "french": "Maïs"
      },
      {
        "lari": "Madia",
        "french": "Nourriture"
      },
      {
        "lari": "Duka",
        "french": "Sortir"
      },
      {
        "lari": "Telama",
        "french": "Se lever"
      },
      {
        "lari": "Zakala",
        "french": "S'asseoir"
      },
      {
        "lari": "Sala",
        "french": "Rester"
      },
      {
        "lari": "Dia",
        "french": "Manger"
      },
      {
        "lari": "Diama",
        "french": "Ensevelir"
      },
      {
        "lari": "Bamina",
        "french": "Gronder"
      },
      {
        "lari": "Bala ba ngulu bia bitatu.",
        "french": "Les 3 petits cochons."
      },
      {
        "lari": "Madia ma bele mpimpa.",
        "french": "La nourriture de la nuit dernière."
      },
      {
        "lari": "Bo bu wa tshiri na meno, dia masangu.",
        "french": "Tant que tu as des dents, mange le maïs."
      },
      {
        "lari": "Na yikidi.",
        "french": "Je suis heureux/heureuse."
      },
      {
        "lari": "Na yikidi ntshana muana nsusu.",
        "french": "Je suis devenu comme un poussin."
      },
      {
        "lari": "Tolo tua tu bote.",
        "french": "Dors bien (que ton sommeil soit bon)."
      },
      {
        "lari": "Duka!",
        "french": "Sors !"
      },
      {
        "lari": "Dukeno.",
        "french": "Sortez."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Bo bu wa tshiri na meno, dia masangu' ?",
        "answer": "As long as you have teeth, eat corn"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Sortons' en lari ?",
        "answer": "Ta dukeno."
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Je n'ai pas faim' ?",
        "answer": "Ka njena na nsatu ko"
      },
      {
        "type": "fill-in-blank",
        "question": "Je suis content(e).",
        "answer": "Nsayi"
      },
      {
        "type": "fill-in-blank",
        "question": "Je vais acheter des médicaments.",
        "answer": "sumba"
      },
      {
        "type": "matching",
        "question": "Associez les impératifs à leur signification",
        "answer": "Duka!=Go out!, Telama.=Stand up., Zakala.=Sit down., Sala.=Stay!"
      },
      {
        "type": "mandombe-recognition",
        "question": "Lire le Mandombe – Impératifs et sentiments"
      }
    ]
  },
  {
    "id": "mvula-ze-nani",
    "title": "Mvula makumatatu na tanu ze nani",
    "level": "intermediate",
    "topic": "mvula",
    "vocab": [
      {
        "lari": "Mvula",
        "french": "Année, pluie"
      },
      {
        "lari": "Mvuka",
        "french": "Décennie"
      },
      {
        "lari": "Muatu",
        "french": "Un tel, une telle"
      },
      {
        "lari": "Mpeho",
        "french": "Vent"
      },
      {
        "lari": "Binsono",
        "french": "Notre écriture"
      },
      {
        "lari": "Ndinga",
        "french": "Langue"
      },
      {
        "lari": "Vuku",
        "french": "Faillir"
      },
      {
        "lari": "Zitusu",
        "french": "Le respect"
      },
      {
        "lari": "Nsombe",
        "french": "Larve du palmier"
      },
      {
        "lari": "Kongo dia mona",
        "french": "Le nouveau Kongo"
      },
      {
        "lari": "Mvula makumatatu na tanu ze nani.",
        "french": "J'ai 35 ans."
      },
      {
        "lari": "Mvula lusambuadi na tanu ze naku.",
        "french": "Tu as 75 ans."
      },
      {
        "lari": "Mvula nkama ze nani.",
        "french": "J'ai cent ans."
      },
      {
        "lari": "Mvula makumaya na ya ze nani.",
        "french": "J'ai 44 ans."
      },
      {
        "lari": "Mvuka kumi.",
        "french": "Une décennie, dix ans."
      },
      {
        "lari": "Mvukulu bua.",
        "french": "J'ai failli tomber."
      },
      {
        "lari": "Wa wuna yoka wa zakala ba ku tunguridi.",
        "french": "Le menteur finit toujours par être dénoncé."
      },
      {
        "lari": "Kua wirir?",
        "french": "T'as compris ?"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'J'ai 35 ans' en lari ?",
        "answer": "Mvula makumatatu na tanu ze nani"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Ya beto' ?",
        "answer": "Ours"
      },
      {
        "type": "multiple-choice",
        "question": "Quel démonstratif signifie 'ce livre-ci' ?",
        "answer": "Buku dio"
      },
      {
        "type": "fill-in-blank",
        "question": "Tu as 75 ans.",
        "answer": "lusambuadi"
      },
      {
        "type": "fill-in-blank",
        "question": "La pluie commence à tomber.",
        "answer": "yeka"
      },
      {
        "type": "matching",
        "question": "Associez les pronoms possessifs à leur signification",
        "answer": "Ya me=Mine, Ya nge=Yours, Ya yandi=His/hers, Ya beto=Ours"
      },
      {
        "type": "mandombe-recognition",
        "question": "Lire le Mandombe – Âge et démonstratifs"
      }
    ]
  },
  {
    "id": "survival-verbs-2",
    "title": "Kwiza, Banza, Futa",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Kwiza",
        "french": "Venir"
      },
      {
        "lari": "Banza",
        "french": "Penser"
      },
      {
        "lari": "Futa",
        "french": "Payer"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'je suis venu' en Kikongo Lari ?",
        "answer": "njijiri"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'mbo ni banza' ?",
        "answer": "I will think"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le passé de 'Futa' pour 'je' ?",
        "answer": "mfutiri"
      },
      {
        "type": "matching",
        "question": "Associez chaque forme verbale à sa signification.",
        "answer": "njijiri=I came, mbendji=I thought, mfutiri=I paid, mbo ni kuiza=I will come"
      },
      {
        "type": "matching",
        "question": "Associez le verbe à son sens infinitif.",
        "answer": "Kwiza=To come, Banza=To think, Futa=To pay"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbo ni ___ (Je viendrai)",
        "answer": "kuiza"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Kwiza, Banza, Futa"
      }
    ]
  },
  {
    "id": "survival-verbs-3",
    "title": "Wa, Mona, Zola",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Wa",
        "french": "Sentir, entendre"
      },
      {
        "lari": "Mona",
        "french": "Voir, ressentir"
      },
      {
        "lari": "Zola",
        "french": "Aimer, vouloir"
      },
      {
        "lari": "Nsunga",
        "french": "Odeur"
      },
      {
        "lari": "Tshioji",
        "french": "Froid"
      },
      {
        "lari": "Tiya",
        "french": "Chaleur, feu"
      },
      {
        "lari": "Nsatu",
        "french": "Faim"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'j'ai faim' en Kikongo Lari ?",
        "answer": "Nsatu ni ta mona"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'nzololo' ?",
        "answer": "I love/want"
      },
      {
        "type": "multiple-choice",
        "question": "Quel verbe utilise-t-on pour exprimer qu'on sent une odeur ?",
        "answer": "Wa"
      },
      {
        "type": "matching",
        "question": "Associez la sensation à son expression.",
        "answer": "Nsunga ni ta wa=I smell something, Tshioji ni ta mona=I feel cold, Tiya ni ta mona=I feel hot, Nsatu ni ta mona=I am hungry"
      },
      {
        "type": "matching",
        "question": "Associez chaque forme au passé à sa signification.",
        "answer": "muini=I saw, na zolo=I loved, wa zolo=You loved, tiya mwini=I felt hot"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ni ta mona (J'ai froid)",
        "answer": "tshioji"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Wa, Mona, Zola"
      }
    ]
  },
  {
    "id": "survival-verbs-4",
    "title": "Hana musua, Sala",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Hana",
        "french": "Donner"
      },
      {
        "lari": "Musua",
        "french": "Permission, permission"
      },
      {
        "lari": "Hana musua",
        "french": "Permettre"
      },
      {
        "lari": "Sala",
        "french": "Travailler, fabriquer"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Hana musua' ?",
        "answer": "To permit"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'j'ai travaillé' en Kikongo Lari ?",
        "answer": "nsaridi"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le passé de 'Hana musua' pour 'je' ?",
        "answer": "musua ngeni"
      },
      {
        "type": "matching",
        "question": "Associez chaque forme verbale à son temps.",
        "answer": "ni ta sala=I am working, nsaridi=I worked, musua ngeni=I permitted, musua ni ta hana=I am permitting"
      },
      {
        "type": "matching",
        "question": "Associez le verbe à sa signification.",
        "answer": "Hana=To give, Musua=Permission, Sala=To work/make"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbo ni hana ___ (Je permettrai)",
        "answer": "musua"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Hana musua, Sala"
      }
    ]
  },
  {
    "id": "adjectives-noun-classes",
    "title": "Mvindu, Toma, Ntalu, Mbote",
    "level": "intermediate",
    "topic": "adjectives",
    "vocab": [
      {
        "lari": "Mvindu",
        "french": "Sale"
      },
      {
        "lari": "Toma",
        "french": "Beau/Belle"
      },
      {
        "lari": "Ntalu",
        "french": "Cher"
      },
      {
        "lari": "Mbote / Bote",
        "french": "Bon/Bonne"
      },
      {
        "lari": "Meza",
        "french": "Table"
      },
      {
        "lari": "Ndonga",
        "french": "Assiette"
      },
      {
        "lari": "Tshinkuti",
        "french": "Chemise"
      },
      {
        "lari": "Buku",
        "french": "Livre"
      },
      {
        "lari": "Nlele",
        "french": "Pagne"
      },
      {
        "lari": "Mamba",
        "french": "Eau"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Meza mvindu me(na)' ?",
        "answer": "The table is dirty"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'La chemise est belle' en Lari ?",
        "answer": "Tshinkuti tshi tshia toma"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la forme accordée de 'bon' pour 'buku' (livre) ?",
        "answer": "Dibote"
      },
      {
        "type": "matching",
        "question": "Associez le nom avec son accord de classe pour 'sale'.",
        "answer": "Meza mvindu=me(na), Ndonga mvindu=ye(na), Kopa mvindu=die(na), Mamba mvindu=me(na)"
      },
      {
        "type": "matching",
        "question": "Associez l'adjectif à sa signification.",
        "answer": "Mvindu=Dirty, Toma=Beautiful, Ntalu=Expensive, Mbote=Good"
      },
      {
        "type": "fill-in-blank",
        "question": "Tshinkuti tshi ka tshiena ___ ko (La chemise n'est pas chère)",
        "answer": "ntalu"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Adjectives & Noun Classes"
      }
    ]
  },
  {
    "id": "states-emotions",
    "title": "Sa mayela, Dzuna, Lungu",
    "level": "intermediate",
    "topic": "states",
    "vocab": [
      {
        "lari": "Sa mayela",
        "french": "Fais attention"
      },
      {
        "lari": "Tomo sa mayela",
        "french": "Sois très prudent"
      },
      {
        "lari": "Lungu",
        "french": "Ennui"
      },
      {
        "lari": "Dzuna",
        "french": "Calme / Calme-toi"
      },
      {
        "lari": "Kwa dzuna",
        "french": "C'est calme"
      },
      {
        "lari": "Kue na dingi",
        "french": "C'est silencieux"
      },
      {
        "lari": "Tsha lembo mpashi",
        "french": "C'est simple / facile"
      },
      {
        "lari": "Luaza",
        "french": "Bruit"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Lungu ni ta lungu' ?",
        "answer": "I am bored"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle phrase signifie 'Calme-toi !' (ordre ferme) ?",
        "answer": "Ta dzuna"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'exprime 'Tsha lembo mpashi' ?",
        "answer": "It is simple/easy"
      },
      {
        "type": "matching",
        "question": "Associez l'expression Lari à sa signification.",
        "answer": "Sa mayela=Be careful, Kwa dzuna=It is calm, Luaza=Noise, Kue na dingi=It is silent"
      },
      {
        "type": "matching",
        "question": "Associez 'Nsayi ye...' au pronom correct.",
        "answer": "Nsayi ye nani=With me, Nsayi ye naku=With you, Nsayi ye nandi=With him/her, Nsayi ye neto=With us"
      },
      {
        "type": "fill-in-blank",
        "question": "Kua lembo ___ (Il n'y a pas de bruit)",
        "answer": "luaza"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — States & Emotions"
      }
    ]
  },
  {
    "id": "superlative-negation",
    "title": "Yokele, Ka...ko",
    "level": "intermediate",
    "topic": "négation",
    "vocab": [
      {
        "lari": "Yokele",
        "french": "Surpasser / Le plus"
      },
      {
        "lari": "Ka...ko",
        "french": "Négation (ne...pas)"
      },
      {
        "lari": "Bubote",
        "french": "Beauté"
      },
      {
        "lari": "Longoka",
        "french": "Étudier / Apprendre"
      },
      {
        "lari": "Nimba",
        "french": "S'endormir / Somnoler"
      },
      {
        "lari": "Bele mpimpa",
        "french": "La nuit (il fait nuit)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mwana nkento wu yokele bubote' ?",
        "answer": "The girl is the most beautiful"
      },
      {
        "type": "multiple-choice",
        "question": "Comment négativer 'wa toma' (il/elle est beau/belle) ?",
        "answer": "Kena wa toma ko"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'ni ta longoka' ?",
        "answer": "I am studying"
      },
      {
        "type": "matching",
        "question": "Associez la phrase Lari à sa signification.",
        "answer": "Yokele bubote=The most beautiful, Yokele mayela=The smartest, Yokele ntalu=The most expensive"
      },
      {
        "type": "matching",
        "question": "Associez la conjugaison à la personne correcte.",
        "answer": "ni ta nimba=I (am dozing), ta nimba=You (are dozing), ka ta nimba=He/She (is dozing), ba ta nimba=They (are dozing)"
      },
      {
        "type": "fill-in-blank",
        "question": "Mwana nkento wu ___ bubote (La fille est la plus belle)",
        "answer": "yokele"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read the Mandombe — Superlative & Negation"
      }
    ]
  },
  {
    "id": "animals-bibulu",
    "title": "Les Animaux",
    "level": "beginner",
    "topic": "animals",
    "vocab": [
      {
        "lari": "Ngamalu",
        "french": "Chameau"
      },
      {
        "lari": "Ngombe",
        "french": "Vache / Bœuf"
      },
      {
        "lari": "Ngoko",
        "french": "Taureau"
      },
      {
        "lari": "Ngongolo",
        "french": "Chenille"
      },
      {
        "lari": "Ngola",
        "french": "Poisson-chat"
      },
      {
        "lari": "Nioka",
        "french": "Serpent"
      },
      {
        "lari": "Nkala",
        "french": "Crabe"
      },
      {
        "lari": "Nkami",
        "french": "Fourmi rouge géante"
      },
      {
        "lari": "Nkamvu",
        "french": "Bélier"
      },
      {
        "lari": "Nkelele",
        "french": "Pintade"
      },
      {
        "lari": "Nkusu",
        "french": "Perroquet"
      },
      {
        "lari": "Nsombe",
        "french": "Ver de palmier"
      },
      {
        "lari": "Buluku",
        "french": "Âne"
      },
      {
        "lari": "Ngulu ya mfinda",
        "french": "Phacochère"
      },
      {
        "lari": "Nioka yina yi yikele ya nene",
        "french": "Ce serpent est très grand"
      },
      {
        "lari": "Nkala yi yikele mu mamba",
        "french": "Le crabe est dans l'eau"
      },
      {
        "lari": "Ngombe yi yi pe malari",
        "french": "La vache donne du lait"
      },
      {
        "lari": "Nkusu yi ta zonza",
        "french": "Le perroquet parle"
      },
      {
        "lari": "Buluku yi ta nata bintu",
        "french": "L'âne porte des charges"
      },
      {
        "lari": "Ngongolo yi ta dia matiti",
        "french": "La chenille mange des feuilles"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nioka' ?",
        "answer": "Snake"
      },
      {
        "type": "multiple-choice",
        "question": "Quel animal est 'Nkusu' ?",
        "answer": "Parrot"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Ngulu ya mfinda' ?",
        "answer": "Warthog"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom d'animal en Lari à sa traduction",
        "answer": "Ngombe=Cow, Buluku=Donkey, Nkelele=Guinea fowl, Nkamvu=Ram"
      },
      {
        "type": "matching",
        "question": "Associez l'animal à son environnement",
        "answer": "Nkala=Water (Mamba), Ngongolo=Leaves (Matiti), Ngola=River (Nto), Nkami=Ground (Ntoto)"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ yi ta zonza (Le _____ parle)",
        "answer": "Nkusu"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ yi ta nata bintu (Le _____ porte des charges)",
        "answer": "Buluku"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Animal Names in Mandombe"
      }
    ]
  },
  {
    "id": "body-actions",
    "title": "Corps et Actions",
    "level": "beginner",
    "topic": "body",
    "vocab": [
      {
        "lari": "Bunda",
        "french": "Cuisse / Hanche"
      },
      {
        "lari": "Bundi",
        "french": "Mâchoire / Joue"
      },
      {
        "lari": "Beni",
        "french": "Sein"
      },
      {
        "lari": "Mabeni",
        "french": "Seins (pluriel)"
      },
      {
        "lari": "Bito",
        "french": "Pattes d'animal"
      },
      {
        "lari": "Bueta",
        "french": "Écraser / Presser"
      },
      {
        "lari": "Buila",
        "french": "Attraper"
      },
      {
        "lari": "Buka",
        "french": "Guérir"
      },
      {
        "lari": "Benda",
        "french": "Traîner / Se dépêcher"
      },
      {
        "lari": "Beta",
        "french": "Aplatir / Gronder"
      },
      {
        "lari": "Betama",
        "french": "Se pencher / S'agenouiller"
      },
      {
        "lari": "Bumba",
        "french": "Étreindre / Embrasser"
      },
      {
        "lari": "Buka mwana",
        "french": "Guéris l'enfant"
      },
      {
        "lari": "Benda mbote",
        "french": "Dépêche-toi bien"
      },
      {
        "lari": "Buila mbisi",
        "french": "Attrape le poisson"
      },
      {
        "lari": "Beta nkanda",
        "french": "Aplatir le tissu"
      },
      {
        "lari": "Betama na ntoto",
        "french": "Agenouille-toi par terre"
      },
      {
        "lari": "Bumba yandi",
        "french": "Embrasse-le/la"
      },
      {
        "lari": "Bueta makazu",
        "french": "Écrase les noix de palme"
      },
      {
        "lari": "Bunda yi kele ya mpasi",
        "french": "La cuisse fait mal"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Buka' ?",
        "answer": "To cure / To heal"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle partie du corps est 'Bundi' ?",
        "answer": "Jaw / Cheek"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Betama' ?",
        "answer": "To bend over / To kneel"
      },
      {
        "type": "matching",
        "question": "Associez chaque verbe à sa signification",
        "answer": "Buila=To catch, Bueta=To crush, Bumba=To embrace, Benda=To drag / hurry"
      },
      {
        "type": "matching",
        "question": "Associez chaque partie du corps à sa traduction",
        "answer": "Bunda=Thigh / Hip, Bundi=Jaw / Cheek, Beni=Breast, Bito=Animal paws"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ mwana (Guéris l'enfant)",
        "answer": "Buka"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Body & Action Words in Mandombe"
      }
    ]
  },
  {
    "id": "social-concepts",
    "title": "Respect et Enfance — Concepts sociaux",
    "level": "intermediate",
    "topic": "social",
    "vocab": [
      {
        "lari": "Bumwana",
        "french": "Enfance"
      },
      {
        "lari": "Bukuluntu",
        "french": "Qualité d'être l'aîné"
      },
      {
        "lari": "Buyaya",
        "french": "Qualité d'être plus âgé"
      },
      {
        "lari": "Buzitu",
        "french": "Respect"
      },
      {
        "lari": "Zitisa",
        "french": "Respecter / Honorer"
      },
      {
        "lari": "Bukundi",
        "french": "Faveur / Grâce / Affection"
      },
      {
        "lari": "Buatu",
        "french": "Pirogue"
      },
      {
        "lari": "Bulu",
        "french": "Trou"
      },
      {
        "lari": "Binsono",
        "french": "Écrits / Lettres"
      },
      {
        "lari": "Bungu",
        "french": "Motte de terre"
      },
      {
        "lari": "Bimba",
        "french": "Goûter / Savourer"
      },
      {
        "lari": "Bioka",
        "french": "Roter"
      },
      {
        "lari": "Bilongo",
        "french": "Médecine / Médicaments"
      },
      {
        "lari": "Ndala",
        "french": "Feuille de palmier"
      },
      {
        "lari": "Buzitu bu kele bwa ntalu",
        "french": "Le respect est précieux"
      },
      {
        "lari": "Zitisa bakuluntu",
        "french": "Respecte les aînés"
      },
      {
        "lari": "Bumwana bu kele bwa mbote",
        "french": "L'enfance est belle"
      },
      {
        "lari": "Buatu bu kele mu mamba",
        "french": "La pirogue est dans l'eau"
      },
      {
        "lari": "Bilongo bi ta buka",
        "french": "La médecine guérit"
      },
      {
        "lari": "Bimba madia",
        "french": "Goûte la nourriture"
      },
      {
        "lari": "Binsono bi kele bia ntalu",
        "french": "Les écrits sont précieux"
      },
      {
        "lari": "Bukundi bu kele bwa Nzambi",
        "french": "La grâce vient de Dieu"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Buzitu' ?",
        "answer": "Respect"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Buatu' ?",
        "answer": "A canoe / pirogue"
      },
      {
        "type": "multiple-choice",
        "question": "Quel mot signifie 'goûter' ?",
        "answer": "Bimba"
      },
      {
        "type": "matching",
        "question": "Associez chaque concept abstrait à sa signification",
        "answer": "Bumwana=Childhood, Bukuluntu=Eldership, Buzitu=Respect, Bukundi=Favor / Grace"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot à sa traduction",
        "answer": "Buatu=Canoe, Bulu=Hole, Bilongo=Medicine, Ndala=Palm leaf"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ bakuluntu (Respecte les aînés)",
        "answer": "Zitisa"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Social Concepts in Mandombe"
      }
    ]
  },
  {
    "id": "bisakumunu-na-mutoto",
    "title": "Salutations na la Terre",
    "level": "beginner",
    "topic": "bisakumunu",
    "vocab": [
      {
        "lari": "Mutoto",
        "french": "la Terre"
      },
      {
        "lari": "Mutoto wa mukaka",
        "french": "partout sur la terre"
      },
      {
        "lari": "Mutoto wa mvimba",
        "french": "partout sur terre"
      },
      {
        "lari": "Mbote zêno",
        "french": "bonjour à vous"
      },
      {
        "lari": "Mbote aku",
        "french": "bonjour à toi"
      },
      {
        "lari": "Mbote zawu",
        "french": "bonjour à eux"
      },
      {
        "lari": "Batata mbote zawu",
        "french": "bonjour aux parents"
      },
      {
        "lari": "Lu kolele?",
        "french": "Vous allez bien ?"
      },
      {
        "lari": "Vumbukidi?",
        "french": "Bien réveillé ?"
      },
      {
        "lari": "Lu vumbukidi?",
        "french": "Vous êtes bien réveillés ?"
      },
      {
        "lari": "Sikama",
        "french": "tenir bon"
      },
      {
        "lari": "Shama",
        "french": "sois en bonne santé"
      },
      {
        "lari": "Chemi?",
        "french": "ça va ?"
      },
      {
        "lari": "Lu chemi?",
        "french": "vous allez bien ?"
      },
      {
        "lari": "Sala",
        "french": "travailler / rester"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'bonjour à vous' en Kikongo Lari ?",
        "answer": "Mbote zêno"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Vumbukidi ?' ?",
        "answer": "Well awoken?"
      },
      {
        "type": "matching",
        "question": "Associez chaque expression Lari à sa signification",
        "answer": "Mbote aku=Hello to you (sing.), Lu kolele?=Are you well?, Sikama=Hold firm, Shama=Be in good health"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbote _____! (bonjour à vous)",
        "answer": "zêno"
      },
      {
        "type": "fill-in-blank",
        "question": "Lu _____? (Vous êtes bien réveillés ?)",
        "answer": "vumbukidi"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Greetings in Mandombe"
      }
    ]
  },
  {
    "id": "noun-classes-mu-ba-mi",
    "title": "Classes nominales — mu/ba, mu/mi",
    "level": "intermediate",
    "topic": "noun",
    "vocab": [
      {
        "lari": "Muntu | Bantu",
        "french": "personne | personnes"
      },
      {
        "lari": "Muana | Bala",
        "french": "enfant | enfants"
      },
      {
        "lari": "Mutekolo | Batekolo",
        "french": "petit-enfant | petits-enfants"
      },
      {
        "lari": "Nkaka | Bankaka",
        "french": "grand-parent | grands-parents"
      },
      {
        "lari": "Nkento | Bakento",
        "french": "femme | femmes"
      },
      {
        "lari": "Mbutukulu",
        "french": "naissance"
      },
      {
        "lari": "Mulele | Milele",
        "french": "habit | habits"
      },
      {
        "lari": "Muti | Miti",
        "french": "arbre | arbres"
      },
      {
        "lari": "Mulembo | Milembo",
        "french": "doigt | doigts"
      },
      {
        "lari": "Mulumba | Milumba",
        "french": "palmeraie | palmeraies"
      },
      {
        "lari": "Mutshila | Mitshila",
        "french": "queue d'animal | queues"
      },
      {
        "lari": "Nsonso",
        "french": "larve du palmier"
      },
      {
        "lari": "Mbulu",
        "french": "chacal"
      },
      {
        "lari": "Mbuma",
        "french": "fruit"
      },
      {
        "lari": "Mbua",
        "french": "chien"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de 'Muti' (arbre) ?",
        "answer": "Miti"
      },
      {
        "type": "multiple-choice",
        "question": "Quel couple de préfixes est utilisé pour les humains ?",
        "answer": "mu/ba"
      },
      {
        "type": "multiple-choice",
        "question": "Lequel de ces noms est invariable en N- (même forme au singulier et au pluriel) ?",
        "answer": "Mbua"
      },
      {
        "type": "matching",
        "question": "Associez chaque singulier à son pluriel",
        "answer": "Muntu=Bantu, Muti=Miti, Mulele=Milele, Mutekolo=Batekolo"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ → Batekolo (petit-enfant → petits-enfants)",
        "answer": "Mutekolo"
      },
      {
        "type": "fill-in-blank",
        "question": "Mulumba → _____ (palmeraie → palmeraies)",
        "answer": "Milumba"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Noun Class Words in Mandombe"
      }
    ]
  },
  {
    "id": "noun-classes-ki-lu-ku",
    "title": "Classes nominales — ki/bi, lu/ma, ku/ma",
    "level": "intermediate",
    "topic": "noun",
    "vocab": [
      {
        "lari": "Kizengi | Bizengi",
        "french": "imbécile | imbéciles"
      },
      {
        "lari": "Kikoba | Bikoba",
        "french": "lèvre | lèvres"
      },
      {
        "lari": "Kibanga | Bibanga",
        "french": "menton | mentons"
      },
      {
        "lari": "Kiamvu | Biamvu",
        "french": "pont | ponts"
      },
      {
        "lari": "Kihota | Bihota",
        "french": "conjonctivite"
      },
      {
        "lari": "Kizongo | Bizongo",
        "french": "coup de fusil | coups de fusil"
      },
      {
        "lari": "Lembe | Malembe",
        "french": "cigogne | cigognes"
      },
      {
        "lari": "Lukaya | Makaya",
        "french": "feuille | feuilles"
      },
      {
        "lari": "Luwa | Buwa",
        "french": "champignon | champignons"
      },
      {
        "lari": "Lumbembemba | Tumbembemba",
        "french": "papillon | papillons"
      },
      {
        "lari": "Lubo | Tubo",
        "french": "onctuosité d'une sauce"
      },
      {
        "lari": "Lumbuetete | Mbuetete",
        "french": "étoile | étoiles"
      },
      {
        "lari": "Kulu | Malu",
        "french": "pied | pieds"
      },
      {
        "lari": "Kutu | Makutu",
        "french": "oreille | oreilles"
      },
      {
        "lari": "Kuku | Makuku",
        "french": "pierre du foyer | pierres du foyer"
      },
      {
        "lari": "Zu | Mazu",
        "french": "bruit, voix, langue | bruits, voix, langues"
      },
      {
        "lari": "Lala dia nsa | Malala dia nsa",
        "french": "citron | citrons"
      },
      {
        "lari": "Boria | Maboria",
        "french": "tique | tiques"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de 'Kikoba' (lèvre) ?",
        "answer": "Bikoba"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de 'Lukaya' (feuille) ?",
        "answer": "Makaya"
      },
      {
        "type": "multiple-choice",
        "question": "À quelle classe appartient 'Kulu | Malu' (pied | pieds) ?",
        "answer": "ku/ma"
      },
      {
        "type": "matching",
        "question": "Associez chaque singulier à son pluriel",
        "answer": "Kikoba=Bikoba, Lukaya=Makaya, Lumbembemba=Tumbembemba, Kulu=Malu"
      },
      {
        "type": "fill-in-blank",
        "question": "Kutu → _____ (oreille → oreilles)",
        "answer": "Makutu"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ → Bibanga (menton → mentons)",
        "answer": "Kibanga"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize Noun Classes in Mandombe"
      }
    ]
  },
  {
    "id": "mia-mingi-longokele",
    "title": "Mia mingi longokele — Le passé composé avec LONGOKA",
    "level": "intermediate",
    "topic": "mia",
    "vocab": [
      {
        "lari": "Longoka",
        "french": "Apprendre"
      },
      {
        "lari": "Mia",
        "french": "Les choses (reprise anaphorique)"
      },
      {
        "lari": "Mabanza",
        "french": "Pensées"
      },
      {
        "lari": "Nzololo",
        "french": "J'aimerais"
      },
      {
        "lari": "Yika",
        "french": "Ajouter"
      },
      {
        "lari": "Diambu",
        "french": "Chose, parole"
      },
      {
        "lari": "Tshimoko",
        "french": "Discussion"
      },
      {
        "lari": "Bimoko",
        "french": "Discussions (pluriel)"
      },
      {
        "lari": "Nzo",
        "french": "Maison"
      },
      {
        "lari": "Bua",
        "french": "Beaucoup"
      },
      {
        "lari": "Mbazi",
        "french": "Dehors"
      },
      {
        "lari": "Huma",
        "french": "Endroit (là-bas)"
      },
      {
        "lari": "Mia mingi ndongokele",
        "french": "J'ai appris beaucoup de choses"
      },
      {
        "lari": "Mabanza ma nzololo yika ni ma we ma",
        "french": "J'aimerais ajouter ces pensées-ci"
      },
      {
        "lari": "Diambu di nzololo yika ni dia we di",
        "french": "La chose que je veux ajouter, c'est celle-ci"
      },
      {
        "lari": "Diambu di na zolo yika ni dia we di",
        "french": "La chose que j'ai voulu ajouter, c'est celle-ci"
      },
      {
        "lari": "Tshimoko tshi na zolo yika ni tsha we tshi",
        "french": "La discussion que je voulais ajouter, ce n'est pas celle-ci"
      },
      {
        "lari": "Bimoko bi na zolo ni bia we bi",
        "french": "Les discussions que je voulais ajouter, ce ne sont pas celles-ci"
      },
      {
        "lari": "Tshimoko tshi na zolo yika, ka tsha wa ko",
        "french": "La discussion que je voulais ajouter, ce n'est pas celle-là"
      },
      {
        "lari": "Mu nzo mu mua mubote mue",
        "french": "L'intérieur de cette maison est bien"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'J'ai appris beaucoup de choses' en Lari ?",
        "answer": "Mia mingi ndongokele"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle forme signifie 'ils/elles ont appris beaucoup de choses' ?",
        "answer": "Mia mingi ba longokele"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle particule d'accord utilise 'diambu' ?",
        "answer": "DI"
      },
      {
        "type": "fill-in-blank",
        "question": "Mabanza _____ nzololo yika ni ma we ma",
        "answer": "ma"
      },
      {
        "type": "fill-in-blank",
        "question": "Tshimoko _____ na zolo yika ni tsha we tshi",
        "answer": "tshi"
      },
      {
        "type": "fill-in-blank",
        "question": "_____ mbazi kua kubi",
        "answer": "Ku"
      },
      {
        "type": "matching",
        "question": "Associez chaque phrase Lari à sa traduction",
        "answer": "Mia mingi ndongokele=I have learned many things, Mu nzo mu mua mubote mue=The inside of this house is nice, Ku mbazi kua kubi=Outside, the weather is bad, Huma ho ha habote he=That place over there is"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize LONGOKA vocabulary in Mandombe"
      }
    ]
  },
  {
    "id": "particules-accord-substantif",
    "title": "Particules d'accord — Substantif + particule + verbe/pronom",
    "level": "intermediate",
    "topic": "particules",
    "vocab": [
      {
        "lari": "Tshinkuti",
        "french": "Vêtement"
      },
      {
        "lari": "Lukaya",
        "french": "Feuille"
      },
      {
        "lari": "Binzu",
        "french": "Marmites"
      },
      {
        "lari": "Mbua",
        "french": "Chien"
      },
      {
        "lari": "Tari",
        "french": "Pierre"
      },
      {
        "lari": "Bititi",
        "french": "Herbe (petite quantité)"
      },
      {
        "lari": "Bubelo",
        "french": "Maladie"
      },
      {
        "lari": "Malala",
        "french": "Oranges"
      },
      {
        "lari": "Ba",
        "french": "Palmier"
      },
      {
        "lari": "Muti | Nti",
        "french": "Arbre"
      },
      {
        "lari": "Mutima",
        "french": "Cœur"
      },
      {
        "lari": "Dinu",
        "french": "Dent"
      },
      {
        "lari": "Kiamvu",
        "french": "Pont"
      },
      {
        "lari": "Nsusu",
        "french": "Poule"
      },
      {
        "lari": "Ludimi",
        "french": "Langue (anatomie)"
      },
      {
        "lari": "Buatu",
        "french": "Pirogue"
      },
      {
        "lari": "Kulu",
        "french": "Jambe"
      },
      {
        "lari": "Buatu bumoshi mu nzari bue",
        "french": "La pirogue est sur le fleuve"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle particule d'accord utilise 'lukaya' (feuille) ?",
        "answer": "lu"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'un pont' en Lari ?",
        "answer": "Kiamvu kimoshi"
      },
      {
        "type": "fill-in-blank",
        "question": "Lukaya _____ buidi (la feuille est tombée)",
        "answer": "lu"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbua _____ tatikidi (le chien a mordu)",
        "answer": "yi"
      },
      {
        "type": "fill-in-blank",
        "question": "Bubelo _____ (ta maladie)",
        "answer": "buaku"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom à sa particule d'accord",
        "answer": "Tshinkuti=tshi, Lukaya=lu, Binzu=bi, Mbua=yi"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize agreement nouns in Mandombe"
      }
    ]
  },
  {
    "id": "derivation-verbale-extensions",
    "title": "Dérivation verbale — Extensions et formes passives",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "Ta",
        "french": "Dire"
      },
      {
        "lari": "Tela",
        "french": "Dire à quelqu'un"
      },
      {
        "lari": "Sa",
        "french": "Faire"
      },
      {
        "lari": "Sila",
        "french": "Faire pour"
      },
      {
        "lari": "Tala",
        "french": "Voir"
      },
      {
        "lari": "Tadila",
        "french": "Voir pour (tadila/tarila)"
      },
      {
        "lari": "Londa",
        "french": "Coudre"
      },
      {
        "lari": "Londela",
        "french": "Coudre avec/pour"
      },
      {
        "lari": "Gana",
        "french": "Donner"
      },
      {
        "lari": "Ganina",
        "french": "Donner à, donner pour"
      },
      {
        "lari": "Nata",
        "french": "Porter"
      },
      {
        "lari": "Natina",
        "french": "Porter pour"
      },
      {
        "lari": "Diata",
        "french": "Marcher"
      },
      {
        "lari": "Diatila",
        "french": "Marcher pour"
      },
      {
        "lari": "Tsala",
        "french": "Mépriser"
      },
      {
        "lari": "Tsadila",
        "french": "Mépriser pour (tsadila/tsarila)"
      },
      {
        "lari": "Yabama",
        "french": "Se couvrir, être couvert"
      },
      {
        "lari": "Yabamana",
        "french": "Être couvert pour"
      },
      {
        "lari": "Pokama",
        "french": "Bouillir"
      },
      {
        "lari": "Pokamana",
        "french": "Bouillir pour"
      },
      {
        "lari": "Bemba",
        "french": "Toucher"
      },
      {
        "lari": "Bembesa",
        "french": "Faire toucher"
      },
      {
        "lari": "Bua",
        "french": "Tomber"
      },
      {
        "lari": "Buisa",
        "french": "Abattre, ruiner, faire tomber"
      },
      {
        "lari": "Kia",
        "french": "Cueillir"
      },
      {
        "lari": "Nzo yi yidi",
        "french": "La maison a brûlé"
      },
      {
        "lari": "Makondi ma bueki",
        "french": "Les bananes sont mûres"
      },
      {
        "lari": "Nuni zi tilumukini",
        "french": "Les oiseaux se sont envolés"
      },
      {
        "lari": "Tolo tua bakiriki?",
        "french": "As-tu bien dormi ?"
      },
      {
        "lari": "Muntu we na bukindi",
        "french": "Une personne brave"
      },
      {
        "lari": "Madezo ma bala",
        "french": "Un pot de vin (littéralement : les haricots des enfants)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel type d'extension est '-esa' dans 'bembesa' (faire toucher) ?",
        "answer": "Causative"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'sasuka' ?",
        "answer": "To be torn"
      },
      {
        "type": "multiple-choice",
        "question": "Quel type d'extension représente '-ana' dans 'zabana' ?",
        "answer": "Reciprocal"
      },
      {
        "type": "fill-in-blank",
        "question": "Bemba → _____ (faire toucher)",
        "answer": "Bembesa"
      },
      {
        "type": "fill-in-blank",
        "question": "Kela → _____ (s'attendre l'un l'autre)",
        "answer": "Kelana"
      },
      {
        "type": "fill-in-blank",
        "question": "Zingumuna → _____ (être déroulé)",
        "answer": "Zingumuka"
      },
      {
        "type": "matching",
        "question": "Associez chaque verbe de base à sa forme dérivée",
        "answer": "Ta (dire)=Tela (say to someone), Bua (tomber)=Buisa (knock down), Kela (attendre)=Kelana (wait for each other), Sasuna (déchirer)=Sasuka (be torn)"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize verb extensions in Mandombe"
      }
    ]
  },
  {
    "id": "pa-pe-pi-po-pu-vocabulaire",
    "title": "Vocabulaire en Pa-, Pe-, Pi-, Po-, Pu-",
    "level": "intermediate",
    "topic": "pa",
    "vocab": [
      {
        "lari": "Pela",
        "french": "Demander respectueusement"
      },
      {
        "lari": "Mpoteka",
        "french": "Pâte résiduelle de la distillation du mélange manioc-maïs"
      },
      {
        "lari": "Poteka",
        "french": "Enduire d'un produit pâteux"
      },
      {
        "lari": "Potopoto",
        "french": "Boue, substance pâteuse"
      },
      {
        "lari": "Polo|mampolo",
        "french": "Nouvelles échangées pendant les salutations"
      },
      {
        "lari": "Pamu",
        "french": "Effrayant, effrayé"
      },
      {
        "lari": "Pamu|bipamu",
        "french": "Crainte inspirée à quelqu'un, personne qui inspire la crainte"
      },
      {
        "lari": "Pamuna",
        "french": "Inspirer la crainte"
      },
      {
        "lari": "Pamuka",
        "french": "Craindre, éprouver un étonnement mêlé de crainte"
      },
      {
        "lari": "Patu",
        "french": "Écrasé"
      },
      {
        "lari": "Patumuna",
        "french": "Jeter, laisser tomber"
      },
      {
        "lari": "Patumuka",
        "french": "Patauger, s'éclater au sol, s'écraser en tombant"
      },
      {
        "lari": "Patapata",
        "french": "Barbotant, pataugeant"
      },
      {
        "lari": "Patasa",
        "french": "Faire parler avec arrogance"
      },
      {
        "lari": "Patana",
        "french": "Parler avec arrogance"
      },
      {
        "lari": "Patakasa",
        "french": "Embrouiller"
      },
      {
        "lari": "Patakana",
        "french": "Être embrouillé"
      },
      {
        "lari": "Patanga",
        "french": "Barboter"
      },
      {
        "lari": "Palipali",
        "french": "Inquiet, inquiète; inquiétude"
      },
      {
        "lari": "Bupalipali",
        "french": "Inquiétude"
      },
      {
        "lari": "Impala|mimpala",
        "french": "Jeune homme"
      },
      {
        "lari": "Tshimpala|bimpala",
        "french": "Jalousie"
      },
      {
        "lari": "Bumpala",
        "french": "Jeunesse"
      },
      {
        "lari": "Pakapaka",
        "french": "Tremblant"
      },
      {
        "lari": "Pakama",
        "french": "Avoir la fièvre, bouillir"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Pamuka' ?",
        "answer": "To fear, to feel astonishment mixed with fear"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Potopoto' ?",
        "answer": "Mud, pasty substance"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'Patasa' et 'Patana' ?",
        "answer": "Patasa = to make someone speak arrogantly, Patana = to speak arrogantly"
      },
      {
        "type": "multiple-choice",
        "question": "Que désigne 'Mpoli' ?",
        "answer": "Ethiopian pepper, medicinal plant"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = inquiétude (forme en Bu-)",
        "answer": "Bupalipali"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = s'assombrir",
        "answer": "Pinda"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = déchirer en morceaux",
        "answer": "Pasuzula"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = trouver par hasard",
        "answer": "Palukila"
      }
    ]
  },
  {
    "id": "spiritualite-cosmologie-kongo",
    "title": "Cosmologie et spiritualité Kongo",
    "level": "advanced",
    "topic": "spiritualite",
    "vocab": [
      {
        "lari": "Nza ya nseke",
        "french": "Le monde de la matière dense où la mémoire spirituelle peut être perdue"
      },
      {
        "lari": "Mpemba",
        "french": "L'univers invisible"
      },
      {
        "lari": "Nzi",
        "french": "Monde des possibilités"
      },
      {
        "lari": "Nza ya Mpemba",
        "french": "Le monde des Ancêtres"
      },
      {
        "lari": "Kalunga",
        "french": "Point de passage énergétique entre le monde visible et invisible"
      },
      {
        "lari": "Kumi dimosi",
        "french": "Une dizaine"
      },
      {
        "lari": "Kibula, tshibula, bula|bibula",
        "french": "Écorce, enveloppe"
      },
      {
        "lari": "Bula",
        "french": "Hauteur, grandeur, longueur; obscurité, noirceur"
      },
      {
        "lari": "Fuisa",
        "french": "Faire honte"
      },
      {
        "lari": "Fuila",
        "french": "S'attarder à regarder, souffrir à la place de quelqu'un"
      },
      {
        "lari": "Binga",
        "french": "Chasser"
      },
      {
        "lari": "Mbingi|bibingi",
        "french": "Personne en train de chasser, chasseur"
      },
      {
        "lari": "Bingulu|bibingulu",
        "french": "Lieu de chasse, instrument de chasse"
      },
      {
        "lari": "Mbingulu",
        "french": "Fait de chasser"
      },
      {
        "lari": "Fuombombo",
        "french": "Robuste, fertile"
      },
      {
        "lari": "Bufuasi",
        "french": "Gaspillage"
      },
      {
        "lari": "Fuasa",
        "french": "Gaspiller, laisser se détériorer"
      },
      {
        "lari": "Fuasakani",
        "french": "Malpropre"
      },
      {
        "lari": "Fuasakana",
        "french": "Se brouiller"
      },
      {
        "lari": "Fuanikisa",
        "french": "Rendre semblable"
      },
      {
        "lari": "Bumpembe",
        "french": "Blancheur"
      },
      {
        "lari": "Mpemba",
        "french": "Kaolin, argile blanche utilisée pour la fabrication de la porcelaine et les rites du Nga mpemba"
      },
      {
        "lari": "Nga mpemba",
        "french": "Médecin traditionnel spécialisé dans la géophagie, géologie, géomédecine"
      },
      {
        "lari": "Mpemba",
        "french": "La raison, le bon droit"
      },
      {
        "lari": "Mama Ntoto",
        "french": "La planète Terre"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que représente 'Kalunga' dans la tradition Kongo ?",
        "answer": "Energetic crossing point between the visible and invisible worlds"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Nza ya nseke' ?",
        "answer": "The world of dense matter where spiritual memory can be lost"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'Fuasa' et 'Fuasakana' ?",
        "answer": "Fuasa = to waste, Fuasakana = to fall out/quarrel"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = l'univers invisible (tradition Kongo)",
        "answer": "Mpemba"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = gaspillage (forme en Bu-)",
        "answer": "Bufuasi"
      },
      {
        "type": "fill-in-blank",
        "question": "______ = rendre semblable",
        "answer": "Fuanikisa"
      },
      {
        "type": "matching",
        "question": "Associez le concept à sa signification",
        "answer": "Nza ya nseke=World of dense matter, Mpemba=The invisible universe, Nzi=World of possibilities, Kalunga=Crossing point"
      },
      {
        "type": "matching",
        "question": "Associez le verbe Lari à sa signification",
        "answer": "Fuisa=To shame, Fuila=To linger watching, Fuasa=To waste, Fuasakana=To fall out"
      }
    ]
  },
  {
    "id": "animaux-habitats",
    "title": "Les animaux et leurs habitats",
    "level": "beginner",
    "topic": "animaux",
    "vocab": [
      {
        "lari": "Mpaka",
        "french": "Le poulailler"
      },
      {
        "lari": "Tshikaku | Bikaku",
        "french": "L'enclos"
      },
      {
        "lari": "Sangi",
        "french": "La forêt"
      },
      {
        "lari": "Mukobo",
        "french": "La savane"
      },
      {
        "lari": "Mamba",
        "french": "L'eau"
      },
      {
        "lari": "Makanga",
        "french": "La terre ferme"
      },
      {
        "lari": "Hata",
        "french": "Le village"
      },
      {
        "lari": "Mpe",
        "french": "Aussi"
      },
      {
        "lari": "Nsusu",
        "french": "La poule"
      },
      {
        "lari": "Nkombo",
        "french": "La chèvre"
      },
      {
        "lari": "Tshindongo | Bindongo",
        "french": "Le mouton | Les moutons"
      },
      {
        "lari": "Ngo",
        "french": "La panthère"
      },
      {
        "lari": "Ngombulu",
        "french": "Le lion"
      },
      {
        "lari": "Nkabi",
        "french": "L'antilope"
      },
      {
        "lari": "Mbulu",
        "french": "Le chacal"
      },
      {
        "lari": "Tshimbungu | Bimbungu",
        "french": "La hyène | Les hyènes"
      },
      {
        "lari": "Tshibibu | Bibibu",
        "french": "Le gorille | Les gorilles"
      },
      {
        "lari": "Nguvu",
        "french": "L'hippopotame"
      },
      {
        "lari": "Ngandu",
        "french": "Le crocodile"
      },
      {
        "lari": "Nzau",
        "french": "L'éléphant"
      },
      {
        "lari": "Mpakasa",
        "french": "Le buffle"
      },
      {
        "lari": "Nioka",
        "french": "Le serpent"
      },
      {
        "lari": "Ngongolo",
        "french": "Le mille-pattes"
      },
      {
        "lari": "Nkelele",
        "french": "Le mille-pattes"
      },
      {
        "lari": "Mpangu",
        "french": "La grenouille"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Où vit la poule ?",
        "answer": "Ku mpaka (chicken coop)"
      },
      {
        "type": "multiple-choice",
        "question": "Quel accord est utilisé pour 'Ngandu' (crocodile) au pluriel ?",
        "answer": "ji ba"
      },
      {
        "type": "fill-in-blank",
        "question": "Ngo ku ______ yi ba.",
        "answer": "sangi"
      },
      {
        "type": "fill-in-blank",
        "question": "Nguvu mu ______ yi ba.",
        "answer": "mamba"
      },
      {
        "type": "matching",
        "question": "Reliez chaque animal à son habitat.",
        "answer": "Nsusu=Ku mpaka (chicken coop), Ngo=Ku sangi (forest), Ngombulu=Ku mukobo (savannah), Nguvu=Mu mamba (water)"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe – Animals"
      },
      {
        "type": "multiple-choice",
        "question": "Quel accord utilise-t-on pour 'Tshindongo' (mouton) au singulier ?",
        "answer": "ka ba"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Les souris habitent au village' ?",
        "answer": "Matutu ku hata ma ba"
      }
    ]
  },
  {
    "id": "mambumbu-na-makoka",
    "title": "Les termites comestibles – Mambumbu na Makoka",
    "level": "beginner",
    "topic": "mambumbu",
    "vocab": [
      {
        "lari": "Mambumbu",
        "french": "Sorte de termites comestibles"
      },
      {
        "lari": "Makoka",
        "french": "Sorte de termites comestibles"
      },
      {
        "lari": "Tshisama | Kisama | Sama | Bisama",
        "french": "La termitière | Les termitières"
      },
      {
        "lari": "Mutoto",
        "french": "La terre, le sol"
      },
      {
        "lari": "Ma ka(ka)",
        "french": "D'autres (accord nominal)"
      },
      {
        "lari": "Nguri",
        "french": "La mère"
      },
      {
        "lari": "Bila",
        "french": "Hauteur"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Où vivent les termites Mambumbu ?",
        "answer": "Ku nsi ya mutoto (underground)"
      },
      {
        "type": "fill-in-blank",
        "question": "Mambumbu ma ka(ka) mu ______ ma ba.",
        "answer": "bisama"
      },
      {
        "type": "matching",
        "question": "Reliez chaque mot à sa signification.",
        "answer": "Mambumbu=Edible termite, Bisama=Termite mounds, Mutoto=The ground, Nguri=Mother"
      }
    ]
  },
  {
    "id": "mukaka-na-mukono",
    "title": "Plein et entamé – Mukaka na Mukono",
    "level": "beginner",
    "topic": "mukaka",
    "vocab": [
      {
        "lari": "Mukaka",
        "french": "Entier, pas entamé"
      },
      {
        "lari": "Mukono",
        "french": "Entamé"
      },
      {
        "lari": "Mbuata",
        "french": "La bouteille"
      },
      {
        "lari": "Kani",
        "french": "Non"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mukaka' ?",
        "answer": "Whole, unopened"
      },
      {
        "type": "fill-in-blank",
        "question": "Kani, ya ______.",
        "answer": "mukono"
      }
    ]
  },
  {
    "id": "keri-kala",
    "title": "Keri — Le retour / La forme passée",
    "level": "intermediate",
    "topic": "keri",
    "vocab": [
      {
        "lari": "Keri",
        "french": "Tu es de retour"
      },
      {
        "lari": "Kala",
        "french": "Être de retour"
      },
      {
        "lari": "Ngolo",
        "french": "Force"
      },
      {
        "lari": "Babakala",
        "french": "Hommes"
      },
      {
        "lari": "Bakento",
        "french": "Femmes"
      },
      {
        "lari": "Ngombe",
        "french": "Bœuf"
      },
      {
        "lari": "Hata",
        "french": "Village, ville, agglomération"
      },
      {
        "lari": "Kampe",
        "french": "Peut-être"
      },
      {
        "lari": "Nzila",
        "french": "Route, chemin"
      },
      {
        "lari": "Tuila",
        "french": "Élever (des animaux)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "D'où vient 'Keri' ?",
        "answer": "Kala"
      },
      {
        "type": "fill-in-blank",
        "question": "Bantu ______ ngolo = des personnes fortes",
        "answer": "ba"
      },
      {
        "type": "matching",
        "question": "Associez chaque mot Lari à sa signification",
        "answer": "Keri=You are back, Kala=To be back, Ngombe=Ox / Cow, Kampe=Maybe"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read and recognise — Keri & ba ngolo"
      }
    ]
  },
  {
    "id": "pronoms-possession",
    "title": "Ta longoka mu zaba zonza — Pronoms & Possession",
    "level": "beginner",
    "topic": "pronoms",
    "vocab": [
      {
        "lari": "Me / Meno",
        "french": "Je, moi"
      },
      {
        "lari": "Nge",
        "french": "Tu, toi"
      },
      {
        "lari": "Yandi",
        "french": "Il, elle"
      },
      {
        "lari": "Beto",
        "french": "Nous"
      },
      {
        "lari": "Beno",
        "french": "Vous"
      },
      {
        "lari": "Bawu",
        "french": "Eux, elles"
      },
      {
        "lari": "Mwana",
        "french": "Enfant"
      },
      {
        "lari": "Tata",
        "french": "Père"
      },
      {
        "lari": "Yaya",
        "french": "Aîné(e), grand-frère/sœur"
      },
      {
        "lari": "Mama",
        "french": "Mère"
      },
      {
        "lari": "Nzo",
        "french": "Maison"
      },
      {
        "lari": "Mbele",
        "french": "Couteau"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quelle particule signifie 'mon / ma / mes' ?",
        "answer": "-ani"
      },
      {
        "type": "fill-in-blank",
        "question": "Tata ______ = ton père",
        "answer": "aku"
      },
      {
        "type": "matching",
        "question": "Associez chaque particule possessive à sa signification",
        "answer": "-ani=My / Mine, -aku=Your / Yours (sg.), -andi=His / Her, -eto=Our / Ours"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read and recognise — Pronouns & Possession"
      }
    ]
  },
  {
    "id": "kue-where",
    "title": "Kue? — Où ?",
    "level": "beginner",
    "topic": "kue",
    "vocab": [
      {
        "lari": "Kue",
        "french": "Où"
      },
      {
        "lari": "Vumbuka",
        "french": "Aller bien, se réveiller"
      },
      {
        "lari": "Nzonzolo",
        "french": "La façon de parler"
      },
      {
        "lari": "Bambuka",
        "french": "Se souvenir"
      },
      {
        "lari": "Muntu",
        "french": "Personne"
      },
      {
        "lari": "Nto",
        "french": "Rivière"
      },
      {
        "lari": "Mamba",
        "french": "Eau"
      },
      {
        "lari": "Mwana",
        "french": "Enfant"
      },
      {
        "lari": "Buyele",
        "french": "Intelligent"
      },
      {
        "lari": "Djuna",
        "french": "Calme"
      },
      {
        "lari": "Kinzu",
        "french": "Marmite en terre cuite (sg.)"
      },
      {
        "lari": "Binzu",
        "french": "Marmites en terre cuite (pl.)"
      },
      {
        "lari": "Lukaya",
        "french": "Feuille"
      },
      {
        "lari": "Bima",
        "french": "Nourriture"
      },
      {
        "lari": "Tolo",
        "french": "Sommeil"
      },
      {
        "lari": "Baka",
        "french": "Gagner, attraper, trouver"
      },
      {
        "lari": "Tabuka",
        "french": "Se casser"
      },
      {
        "lari": "Bua",
        "french": "Tomber"
      },
      {
        "lari": "Yiri",
        "french": "Être prêt, cuit"
      },
      {
        "lari": "Tatiri",
        "french": "Avoir brûlé"
      },
      {
        "lari": "Kue nge?",
        "french": "Où suis-je ?"
      },
      {
        "lari": "Mvumbukiri",
        "french": "Je vais bien"
      },
      {
        "lari": "Mbambukiri",
        "french": "Je me souviens"
      },
      {
        "lari": "Ka ni ta bambuka ko",
        "french": "Je ne me souviens pas"
      },
      {
        "lari": "Mwana buyele we",
        "french": "Cet enfant est intelligent"
      },
      {
        "lari": "Kinzu ki tabukidi",
        "french": "La marmite en terre est cassée"
      },
      {
        "lari": "Tolo tua bakiri?",
        "french": "As-tu bien dormi ?"
      },
      {
        "lari": "Ntomono dia",
        "french": "J'ai bien mangé"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel type d'extension verbale est '-uka' dans 'Vumbuka' ?",
        "answer": "Reversive passive (-uka)"
      },
      {
        "type": "fill-in-blank",
        "question": "Vumb______ = se réveiller / aller bien",
        "answer": "uka"
      },
      {
        "type": "matching",
        "question": "Associez chaque expression lari à sa signification",
        "answer": "Kue nge?=Where am I?, Mvumbukiri=I am well, Mbambukiri=I remember, Kinzu ki tabukidi=The pot is broken"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read & Recognize — Kue? Lesson"
      }
    ]
  },
  {
    "id": "bijinga-etangs",
    "title": "Les étangs de pêche",
    "level": "beginner",
    "topic": "bijinga",
    "vocab": [
      {
        "lari": "Tshijinga / Bijinga",
        "french": "Étang artificiel (sg./pl.)"
      },
      {
        "lari": "Loba",
        "french": "Pêcher"
      },
      {
        "lari": "Bala",
        "french": "Enfants"
      },
      {
        "lari": "Tilapia",
        "french": "Tilapia"
      },
      {
        "lari": "Tueri",
        "french": "Quatre"
      },
      {
        "lari": "Bieri",
        "french": "Trois"
      },
      {
        "lari": "Neto",
        "french": "Nous"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Loba' ?",
        "answer": "To fish"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Beto bala' ?",
        "answer": "We the children"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Tshijinga tshina' ?",
        "answer": "That pond"
      },
      {
        "type": "fill-in-blank",
        "question": "Beto bala mu tshijinga tshina tueri ___.",
        "answer": "loba"
      },
      {
        "type": "fill-in-blank",
        "question": "Bijinga bia ___ bieri.",
        "answer": "tilapia"
      },
      {
        "type": "matching",
        "question": "Associez les expressions lari à leur traduction",
        "answer": "Loba=To fish, Bala=Children, Tshijinga=Pond, Tueri=Four"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize pond vocabulary"
      }
    ]
  },
  {
    "id": "lubakusu",
    "title": "Aide et urgences",
    "level": "intermediate",
    "topic": "lubakusu",
    "vocab": [
      {
        "lari": "bakisa",
        "french": "aider"
      },
      {
        "lari": "sarisa",
        "french": "aider, faire travailler"
      },
      {
        "lari": "sadisa",
        "french": "aider, faire travailler"
      },
      {
        "lari": "lubakusu",
        "french": "aide"
      },
      {
        "lari": "lusalusu",
        "french": "aide, secours"
      },
      {
        "lari": "luala",
        "french": "blesser"
      },
      {
        "lari": "baluka",
        "french": "dévier, prendre une autre direction"
      },
      {
        "lari": "lemvoka",
        "french": "pardonner"
      },
      {
        "lari": "muivi",
        "french": "voleur"
      },
      {
        "lari": "benga",
        "french": "crevasse, trou"
      },
      {
        "lari": "musualu",
        "french": "vitesse, rapidité"
      },
      {
        "lari": "nzila",
        "french": "chemin"
      },
      {
        "lari": "jimbakane",
        "french": "perdu (chemin)"
      },
      {
        "lari": "nsatu",
        "french": "besoin, nécessité"
      },
      {
        "lari": "mayela",
        "french": "attention, intelligence"
      },
      {
        "lari": "mawasu",
        "french": "énergie, activité"
      },
      {
        "lari": "nlemvu",
        "french": "s'il vous plaît, pardon"
      },
      {
        "lari": "Benga dia Tiya",
        "french": "l'enfer (tradition chrétienne)"
      },
      {
        "lari": "Mbakisa",
        "french": "J'ai besoin d'aide"
      },
      {
        "lari": "Mbakisa eno",
        "french": "Aidez-moi"
      },
      {
        "lari": "Tu bakisa eno",
        "french": "Aidez-nous"
      },
      {
        "lari": "Ba bakisa eno",
        "french": "Aidez-les"
      },
      {
        "lari": "Yiza ku mbakisa sa malu",
        "french": "Viens m'aider rapidement"
      },
      {
        "lari": "Sa malu",
        "french": "Vite"
      },
      {
        "lari": "Sa mayela",
        "french": "Fais attention"
      },
      {
        "lari": "Bua ka bua",
        "french": "Il/elle va tomber"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Mbakisa' ?",
        "answer": "I need help"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'Sa mayela' ?",
        "answer": "Pay attention"
      },
      {
        "type": "multiple-choice",
        "question": "Pourquoi un ancien Kongo dit-il 'Bua ka bua' (il/elle va tomber) en parlant de lui-même ?",
        "answer": "The elders knew they were not their bodies"
      },
      {
        "type": "multiple-choice",
        "question": "Qu'est-ce que 'Benga dia Tiya' dans la tradition Kongo ?",
        "answer": "Hell — but only in Christian tradition; it does not exist in Kongo tradition"
      },
      {
        "type": "fill-in-blank",
        "question": "Nzila yi ___ jimbakane = Il/elle a perdu son chemin",
        "answer": "mu"
      },
      {
        "type": "fill-in-blank",
        "question": "Lusalusu lue ___ nsatu = Nous avons besoin d'aide",
        "answer": "neto"
      },
      {
        "type": "fill-in-blank",
        "question": "___ luele = Vous êtes blessés",
        "answer": "Lu"
      },
      {
        "type": "fill-in-blank",
        "question": "Lusalusu lue ___ nsatu = Ils/elles ont besoin d'aide",
        "answer": "nawu"
      }
    ]
  },
  {
    "id": "zingi-na-ndambu",
    "title": "Quantités et négation",
    "level": "intermediate",
    "topic": "zingi",
    "vocab": [
      {
        "lari": "zingi",
        "french": "beaucoup"
      },
      {
        "lari": "ndambu",
        "french": "un peu, une petite quantité"
      },
      {
        "lari": "fioti",
        "french": "un petit peu, petit, peu"
      },
      {
        "lari": "manga",
        "french": "mangue(s)"
      },
      {
        "lari": "nduku",
        "french": "ami(s)"
      },
      {
        "lari": "loso",
        "french": "riz"
      },
      {
        "lari": "dia",
        "french": "manger"
      },
      {
        "lari": "nua",
        "french": "boire"
      },
      {
        "lari": "kani",
        "french": "non"
      },
      {
        "lari": "ninja",
        "french": "si (affirmatif)"
      },
      {
        "lari": "hehe",
        "french": "oui"
      },
      {
        "lari": "ka",
        "french": "mais"
      },
      {
        "lari": "tala",
        "french": "si (conditionnel)"
      },
      {
        "lari": "ze",
        "french": "particule de possession / d'attente"
      },
      {
        "lari": "mankondi",
        "french": "banane(s)"
      },
      {
        "lari": "Manga za jingi ze",
        "french": "Il y a beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze neto",
        "french": "Nous avons beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze nawu",
        "french": "Ils ont beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze neno",
        "french": "Vous avez beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze nandi",
        "french": "Elle a beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze naku",
        "french": "Tu as beaucoup de mangues."
      },
      {
        "lari": "Manga za jingi ze nani",
        "french": "J'ai beaucoup de mangues."
      },
      {
        "lari": "Kena na nduku za zingi ko",
        "french": "Elle n'a pas beaucoup d'amis."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie 'zingi' ?",
        "answer": "A lot, many"
      },
      {
        "type": "fill-in-blank",
        "question": "Manga za jingi ze ___ = J'ai beaucoup de mangues.",
        "answer": "nani"
      },
      {
        "type": "matching",
        "question": "Associe chaque expression lari à sa traduction française",
        "answer": "Manga za jingi=Many mangos, Ndambu loso=A little rice, Kena na nduku za zingi ko=She doesn't have many friends, Mankondi nzololo dia=You like to eat bananas"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'Tu n'as pas beaucoup d'amis' en lari ?",
        "answer": "Kuena na nduku za zingi ko"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize quantity vocabulary"
      }
    ]
  },
  {
    "id": "zeba-na-djoka",
    "title": "Se promener et courir",
    "level": "intermediate",
    "topic": "zeba",
    "vocab": [
      {
        "lari": "zeba",
        "french": "se promener, se balader"
      },
      {
        "lari": "djoka",
        "french": "courir"
      },
      {
        "lari": "bandumuna",
        "french": "courir vite, se sauver, battre en retraite"
      },
      {
        "lari": "balumuna",
        "french": "courir vite, détaler"
      },
      {
        "lari": "vikuna",
        "french": "se sauver, décamper, prendre la poudre d'escampette"
      },
      {
        "lari": "ntinu",
        "french": "vite"
      },
      {
        "lari": "shika",
        "french": "jouer (du tam-tam, de la musique, d'un instrument)"
      },
      {
        "lari": "sika",
        "french": "jouer (du tam-tam, de la musique, d'un instrument)"
      },
      {
        "lari": "nsaki",
        "french": "musique du battement de main"
      },
      {
        "lari": "nguri ya",
        "french": "très"
      },
      {
        "lari": "nkati ka",
        "french": "très (synonyme de nguri ya)"
      },
      {
        "lari": "toma",
        "french": "joli(e), beau/belle"
      },
      {
        "lari": "nsadisi",
        "french": "j'écris"
      },
      {
        "lari": "nkanda",
        "french": "lettre, livre"
      },
      {
        "lari": "moko",
        "french": "les mains"
      },
      {
        "lari": "sukula",
        "french": "laver"
      },
      {
        "lari": "waya",
        "french": "vouloir, avoir l'envie de"
      },
      {
        "lari": "buishi",
        "french": "le jour, la lumière du jour"
      },
      {
        "lari": "tsha",
        "french": "cueillir"
      },
      {
        "lari": "kia",
        "french": "cueillir (variante de tsha)"
      },
      {
        "lari": "yila",
        "french": "se coucher (pour le soleil)"
      },
      {
        "lari": "yiriri",
        "french": "est couché"
      },
      {
        "lari": "ntsha",
        "french": "donc"
      },
      {
        "lari": "ntshangu",
        "french": "donc"
      },
      {
        "lari": "ni mu bungu",
        "french": "donc"
      },
      {
        "lari": "Muini we ku, ntsha tuele zeba",
        "french": "Il fait beau donc nous sommes allées nous promener."
      },
      {
        "lari": "Ni mu bungu dio, tuele zeba",
        "french": "Il fait beau donc nous sommes allées nous promener."
      },
      {
        "lari": "Tala nsayi na naku, shika nsaki",
        "french": "Si tu es heureux, tape des mains."
      },
      {
        "lari": "Wa nguri ya toma we",
        "french": "Elle est très jolie."
      },
      {
        "lari": "Wa nkati ka toma we",
        "french": "Elle est très jolie."
      },
      {
        "lari": "Nsadisi nkanda",
        "french": "J'écris une lettre."
      },
      {
        "lari": "Moko ni ta sukula",
        "french": "Je me lave les mains."
      },
      {
        "lari": "Djoka ntinu",
        "french": "Courir vite."
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quels mots sont des synonymes de 'courir vite' ?",
        "answer": "bandumuna, balumuna, vikuna"
      },
      {
        "type": "fill-in-blank",
        "question": "Ku nsaba ___ kuenda ka buishi bu yiriri. = Je voulais aller au jardin mais la nuit est tombée.",
        "answer": "ngueyi"
      },
      {
        "type": "matching",
        "question": "Associe chaque expression lari à sa traduction française",
        "answer": "Djoka ntinu=Run fast, Nsadisi nkanda=I write a letter, Tala nsayi na naku, shika nsaki=If you are happy, clap your hands, Buishi bu tshele=The day has risen"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la différence entre 'malaki' et 'matanga' ?",
        "answer": "Malaki celebrates an event; matanga expresses gratitude after hardship"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize movement vocabulary"
      }
    ]
  },
  {
    "id": "phonologie-a1",
    "title": "La façon de parler",
    "level": "beginner",
    "topic": "phonologie",
    "vocab": [
      {
        "lari": "mpangi",
        "french": "frère / sœur"
      },
      {
        "lari": "mbote",
        "french": "bonjour"
      },
      {
        "lari": "nzila",
        "french": "chemin"
      },
      {
        "lari": "nzo",
        "french": "maison"
      },
      {
        "lari": "ngombe",
        "french": "bœuf"
      },
      {
        "lari": "nkaka",
        "french": "grand-parent"
      },
      {
        "lari": "njila",
        "french": "route"
      },
      {
        "lari": "ntoto",
        "french": "terre"
      },
      {
        "lari": "mfumu",
        "french": "chef"
      },
      {
        "lari": "mvula",
        "french": "pluie"
      },
      {
        "lari": "lumbu",
        "french": "jour"
      },
      {
        "lari": "tondele",
        "french": "remercier"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que signifie « Wa » (ton haut) ?",
        "answer": "You (tu)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Wà » (ton bas) ?",
        "answer": "She (elle)"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Tondele » (H-H-H) ?",
        "answer": "You thank"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Tôndele » (B-H-H) ?",
        "answer": "He/she thanks"
      },
      {
        "type": "multiple-choice",
        "question": "Dans la paire Wa / Wà, qu'est-ce qui change le sens ?",
        "answer": "The tone (high vs low)"
      },
      {
        "type": "matching",
        "question": "Associez chaque forme tonale à son sens",
        "answer": "Wa (ton H)=you, Wà (ton B)=she, Tondele (H-H-H)=you thank, Tôndele (B-H-H)=he/she thanks"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle affirmation est correcte sur les paires minimales tonales en lari ?",
        "answer": "The same sounds with different tones can have different meanings"
      },
      {
        "type": "fill-in-blank",
        "question": "Dans le mot « mpangi », la consonne prénasalisée est ___",
        "answer": "mp"
      }
    ]
  },
  {
    "id": "sala-na-longoka",
    "title": "Travailler et apprendre",
    "level": "beginner",
    "topic": "sala",
    "vocab": [
      {
        "lari": "Sala",
        "french": "Travailler"
      },
      {
        "lari": "Salu",
        "french": "Le travail, le bureau"
      },
      {
        "lari": "Kuiza",
        "french": "Venir"
      },
      {
        "lari": "Dila",
        "french": "Pleurer"
      },
      {
        "lari": "Seha",
        "french": "Rire"
      },
      {
        "lari": "Sumba",
        "french": "Acheter"
      },
      {
        "lari": "Binkuti",
        "french": "Les vêtements"
      },
      {
        "lari": "Mbazi",
        "french": "Dehors"
      },
      {
        "lari": "Nsaba",
        "french": "Le jardin"
      },
      {
        "lari": "Zungana",
        "french": "Se promener"
      },
      {
        "lari": "Lumfikini",
        "french": "Chauve-souris"
      },
      {
        "lari": "Mazono",
        "french": "Hier"
      },
      {
        "lari": "Kinsangu",
        "french": "Réputation, notoriété"
      },
      {
        "lari": "Nsangu",
        "french": "Les nouvelles"
      },
      {
        "lari": "Kinsasa",
        "french": "Institut supérieur"
      },
      {
        "lari": "Malavu",
        "french": "L'alcool"
      },
      {
        "lari": "Bala ba tomene sala",
        "french": "Les enfants ont bien travaillé"
      },
      {
        "lari": "Toko toma djunisa ntima aku",
        "french": "D'abord, calme-toi"
      },
      {
        "lari": "Nketi kuenda ka mvula yi nokene",
        "french": "Je voulais partir, mais il pleuvait"
      },
      {
        "lari": "Ku nsaba lumfikini na mueni mazono",
        "french": "Hier, j'ai vu une chauve-souris dans le jardin"
      },
      {
        "lari": "Ka nguri ya nsangu a ko",
        "french": "Ce ne sont pas des nouvelles importantes"
      },
      {
        "lari": "Mu mitela kua mbele",
        "french": "J'étais seulement debout"
      },
      {
        "lari": "Mu manzakala mbele",
        "french": "J'étais assise"
      },
      {
        "lari": "Nsaridi",
        "french": "Je viens de travailler"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « j'ai travaillé » en lari ?",
        "answer": "na saridi"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « mbo ni sala » ?",
        "answer": "I will work"
      },
      {
        "type": "multiple-choice",
        "question": "Comment met-on « na saridi » (j'ai travaillé) à la forme négative ?",
        "answer": "ka na saridi a ko"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ni sala (je travaillerai)",
        "answer": "mbo"
      },
      {
        "type": "fill-in-blank",
        "question": "Bu ni ___ kuani (Quand je pleure)",
        "answer": "dila"
      },
      {
        "type": "matching",
        "question": "Associez la conjugaison à sa traduction",
        "answer": "na saridi=I worked, mbo ni sala=I will work, sala ndieri sala=I was working, ka na saridi a ko=I didn't work"
      },
      {
        "type": "matching",
        "question": "Associez la clause temporelle à son sens",
        "answer": "Bu ni dila kuani=When I cry, Bu seha kuaku=When you laugh, Bu ka dila kuandi=When he/she cries, Bu tu seha kueto=When we laugh"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Work & Conjugations"
      }
    ]
  },
  {
    "id": "nitu-na-kimbevo",
    "title": "Le corps et la maladie",
    "level": "beginner",
    "topic": "nitu",
    "vocab": [
      {
        "lari": "Ntu",
        "french": "La tête"
      },
      {
        "lari": "Meso",
        "french": "Les yeux"
      },
      {
        "lari": "Meno",
        "french": "Les dents"
      },
      {
        "lari": "Ludimi",
        "french": "La langue"
      },
      {
        "lari": "Kulu",
        "french": "Le pied"
      },
      {
        "lari": "Malu",
        "french": "Les pieds"
      },
      {
        "lari": "Moko",
        "french": "La main"
      },
      {
        "lari": "Milembo",
        "french": "Les doigts"
      },
      {
        "lari": "Hembo",
        "french": "L'épaule"
      },
      {
        "lari": "Tshinkoso",
        "french": "Le coude"
      },
      {
        "lari": "Nsuki",
        "french": "Les cheveux"
      },
      {
        "lari": "Tshibanga",
        "french": "Le menton"
      },
      {
        "lari": "Tshivumu",
        "french": "Le ventre"
      },
      {
        "lari": "Mputa",
        "french": "Plaie, blessure"
      },
      {
        "lari": "Mpashi",
        "french": "La douleur"
      },
      {
        "lari": "Nkeshi",
        "french": "La colère, la douleur"
      },
      {
        "lari": "Mululu",
        "french": "Saignement du nez, épistaxis"
      },
      {
        "lari": "Bilongo",
        "french": "Les médicaments"
      },
      {
        "lari": "Mbevo",
        "french": "Un malade"
      },
      {
        "lari": "Kimbevo",
        "french": "La maladie"
      },
      {
        "lari": "Mbuki",
        "french": "Le médecin"
      },
      {
        "lari": "Tshibuki",
        "french": "Un guérisseur"
      },
      {
        "lari": "Tiya",
        "french": "La fièvre, le feu"
      },
      {
        "lari": "Mpele",
        "french": "Les boutons d'allergie"
      },
      {
        "lari": "Tatika",
        "french": "Mordre"
      },
      {
        "lari": "Wiri?",
        "french": "As-tu compris ?"
      },
      {
        "lari": "Kua wiri?",
        "french": "Tu as compris ?"
      },
      {
        "lari": "Nua bilongo",
        "french": "Prendre des médicaments"
      },
      {
        "lari": "Bi bingiri ya",
        "french": "C'est déjà cuit"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « j'ai mal à la tête » en lari ?",
        "answer": "Ntu nkeshi wu ta sa"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « bilongo » ?",
        "answer": "Medicine"
      },
      {
        "type": "multiple-choice",
        "question": "Quel marqueur de classe accompagne « kulu » (pied) ?",
        "answer": "ku"
      },
      {
        "type": "fill-in-blank",
        "question": "Mputa ___ yi ta yama (Ma plaie me fait mal)",
        "answer": "yama"
      },
      {
        "type": "fill-in-blank",
        "question": "___ ni ta bela (Je suis malade)",
        "answer": "bela"
      },
      {
        "type": "matching",
        "question": "Associez la partie du corps à son marqueur de classe dans les expressions de douleur",
        "answer": "Ntu (head)=wu, Kulu (foot)=ku, Moko (hand)=ma, Ludimi (tongue)=lu"
      },
      {
        "type": "matching",
        "question": "Associez le terme médical à sa traduction",
        "answer": "Mbuki=Doctor, Bilongo=Medicine, Kimbevo=Illness, Mululu=Nosebleed"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Body & Health"
      }
    ]
  },
  {
    "id": "bika-zonza-na-zeba",
    "title": "Saluer, parler et voyager",
    "level": "beginner",
    "topic": "bika",
    "vocab": [
      {
        "lari": "Bika",
        "french": "Saluer"
      },
      {
        "lari": "Zonza",
        "french": "Parler"
      },
      {
        "lari": "Zeba",
        "french": "Voyager, bon voyage"
      },
      {
        "lari": "Nkumbu",
        "french": "Le nom"
      },
      {
        "lari": "Mvula",
        "french": "Année, pluie"
      },
      {
        "lari": "Tuka",
        "french": "Venir de"
      },
      {
        "lari": "Lami",
        "french": "Le téléphone, fil de fer"
      },
      {
        "lari": "Lendi",
        "french": "Tu peux"
      },
      {
        "lari": "Malembe",
        "french": "Lentement"
      },
      {
        "lari": "Lumputu",
        "french": "Le français"
      },
      {
        "lari": "Mupepe",
        "french": "L'avion"
      },
      {
        "lari": "Nanguka",
        "french": "S'envoler, se soulever"
      },
      {
        "lari": "Tshibuka",
        "french": "Un lieu, une chambre"
      },
      {
        "lari": "Fulu",
        "french": "Lieu"
      },
      {
        "lari": "Ntalu",
        "french": "Le prix"
      },
      {
        "lari": "Madia ma pari",
        "french": "Le petit-déjeuner"
      },
      {
        "lari": "Mpimpa",
        "french": "La nuit"
      },
      {
        "lari": "Ntshila mulemvo",
        "french": "Pardonne-moi"
      },
      {
        "lari": "Mutela",
        "french": "La taille, être debout"
      },
      {
        "lari": "Buzitu",
        "french": "Le respect"
      },
      {
        "lari": "Mpila za bikila",
        "french": "Les façons de saluer"
      },
      {
        "lari": "Ntindu mia bikila",
        "french": "Les manières de saluer"
      },
      {
        "lari": "Tolo tua bakiri?",
        "french": "As-tu bien dormi ?"
      },
      {
        "lari": "Mwana ni diata keka diata",
        "french": "L'enfant commence à marcher"
      },
      {
        "lari": "Nsayi ku yokele mutela",
        "french": "Nsayi est plus grande que toi"
      },
      {
        "lari": "Ka ku mbakisa ka ko",
        "french": "Il ne m'aide pas"
      },
      {
        "lari": "Ka ni ta duka na nge ko",
        "french": "Je ne sors pas avec toi"
      },
      {
        "lari": "Ka ndendi na duka na ku ko",
        "french": "Je ne peux pas sortir avec toi"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « comment t'appelles-tu ? » en lari ?",
        "answer": "Nkumbu aku nani?"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « au revoir » (à une personne) en lari ?",
        "answer": "Sala"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « mupepe » ?",
        "answer": "Airplane"
      },
      {
        "type": "fill-in-blank",
        "question": "Nkumbu ___ nani ? (Comment t'appelles-tu ?)",
        "answer": "aku"
      },
      {
        "type": "fill-in-blank",
        "question": "Mvula kumi ze ___ (Il a 10 ans)",
        "answer": "nandi"
      },
      {
        "type": "matching",
        "question": "Associez l'expression d'au revoir à son sens",
        "answer": "Sala=Goodbye (one person), Saleno=Goodbye (group), Yenda bu bote=Have a good trip, Nzila ya bote=Have a safe journey"
      },
      {
        "type": "matching",
        "question": "Associez l'origine à la personne",
        "answer": "na tuka=I come from, wa tuka=You come from, ka tuka=He/she comes from, ba tuka=They come from"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Greetings & Travel"
      }
    ]
  },
  {
    "id": "bisalu-bia-lumbu",
    "title": "Le travail d'une journée entière",
    "level": "intermediate",
    "topic": "bisalu",
    "vocab": [
      {
        "lari": "Nene",
        "french": "Grand, gros"
      },
      {
        "lari": "Nguba",
        "french": "Arachide"
      },
      {
        "lari": "Lombo",
        "french": "Le fruit"
      },
      {
        "lari": "Lala",
        "french": "L'orange"
      },
      {
        "lari": "Mfulu",
        "french": "Le lit"
      },
      {
        "lari": "Mbuata",
        "french": "La bouteille"
      },
      {
        "lari": "Ntoto",
        "french": "La terre"
      },
      {
        "lari": "Ndonga",
        "french": "L'assiette"
      },
      {
        "lari": "Dimpa",
        "french": "Le pain"
      },
      {
        "lari": "Makondo",
        "french": "Les bananes"
      },
      {
        "lari": "Nuni",
        "french": "Les oiseaux"
      },
      {
        "lari": "Mamba",
        "french": "L'eau"
      },
      {
        "lari": "Kafi",
        "french": "Le café"
      },
      {
        "lari": "Dema",
        "french": "Lourd"
      },
      {
        "lari": "Teka",
        "french": "Vendre"
      },
      {
        "lari": "Yarika",
        "french": "Vendre"
      },
      {
        "lari": "Ngana",
        "french": "Donne-moi"
      },
      {
        "lari": "Lenda",
        "french": "Pouvoir"
      },
      {
        "lari": "Duka",
        "french": "Sortir"
      },
      {
        "lari": "Mona",
        "french": "Nouveau, voir"
      },
      {
        "lari": "Nkenke",
        "french": "Le lièvre"
      },
      {
        "lari": "Nkoko tuvi",
        "french": "Un bousier"
      },
      {
        "lari": "Mikanda",
        "french": "Les lettres, les peaux"
      },
      {
        "lari": "Lukanda",
        "french": "Arc-en-ciel"
      },
      {
        "lari": "Tshikeri",
        "french": "Galettes traditionnelles"
      },
      {
        "lari": "Makondo ma bueki",
        "french": "Les bananes sont mûres"
      },
      {
        "lari": "Nuni zi tilumukini",
        "french": "Les oiseaux se sont envolés"
      },
      {
        "lari": "Tuvi tua mbiji",
        "french": "Le caca d'un animal"
      },
      {
        "lari": "Ntangu ya mona",
        "french": "Un nouveau cycle / Il est temps de regarder"
      },
      {
        "lari": "Ntangu ya dia yi fueni",
        "french": "Il est temps de manger"
      },
      {
        "lari": "Ntangu ya longoka mandombe yi fueni",
        "french": "Il est temps d'apprendre le mandombe"
      },
      {
        "lari": "Dimpa dia bakiri?",
        "french": "As-tu trouvé du pain ?"
      },
      {
        "lari": "Dia dimpa",
        "french": "Mange du pain"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel marqueur de classe prend « nguba » (arachide) avec « nene » (grand) ?",
        "answer": "ya...ye"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « ai-je une assiette ? » en lari ?",
        "answer": "Ndonga ye nani?"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mamba ma mingi » ?",
        "answer": "There is a lot of water"
      },
      {
        "type": "fill-in-blank",
        "question": "Nguba ___ nene ye (Cette arachide est grosse)",
        "answer": "ya"
      },
      {
        "type": "fill-in-blank",
        "question": "Ndonga ye ___ ? (As-tu une assiette ?)",
        "answer": "naku"
      },
      {
        "type": "matching",
        "question": "Associez le pattern d'accord de classe nominale",
        "answer": "Nguba (peanut)=ya nene ye, Lombo (fruit)=dia die nene die, Ntoto (earth)=wa nene we, Meso (eyes)=mama nene me"
      },
      {
        "type": "matching",
        "question": "Associez l'expression à son sens",
        "answer": "Makondo ma bueki=The bananas are ripe, Nuni zi tilumukini=The birds flew away, Mamba ma mingi=There's a lot of water, Kena ku nzo ko=He's not at home"
      },
      {
        "type": "mandombe-recognition",
        "question": "Read Mandombe — Daily Life"
      }
    ]
  },
  {
    "id": "phonologie-laadi",
    "title": "Phonologie du laadi",
    "level": "beginner",
    "topic": "phonologie",
    "vocab": [
      {
        "lari": "puka",
        "french": "divaguer"
      },
      {
        "lari": "buka",
        "french": "se fendre"
      },
      {
        "lari": "fuka",
        "french": "couvrir"
      },
      {
        "lari": "vula",
        "french": "être supérieur"
      },
      {
        "lari": "pfuka",
        "french": "pleuvoir finement"
      },
      {
        "lari": "bvuka",
        "french": "rassembler"
      },
      {
        "lari": "tala",
        "french": "regarder attentivement"
      },
      {
        "lari": "sala",
        "french": "travailler"
      },
      {
        "lari": "kala",
        "french": "refuser"
      },
      {
        "lari": "gana",
        "french": "donner"
      },
      {
        "lari": "noka",
        "french": "pleuvoir"
      },
      {
        "lari": "moka",
        "french": "bavarder"
      },
      {
        "lari": "loka",
        "french": "maudire"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Combien de phonèmes consonantiques le laadi possède-t-il ?",
        "answer": "27"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie 'tala' en laadi ?",
        "answer": "to look carefully"
      },
      {
        "type": "matching",
        "question": "Associez chaque verbe laadi à sa signification",
        "answer": "sala=to work, tala=to look carefully, kala=to refuse, lamba=to cook"
      },
      {
        "type": "multiple-choice",
        "question": "Combien de voyelles le laadi possède-t-il ?",
        "answer": "5"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize phonology vocabulary in Mandombe"
      }
    ]
  },
  {
    "id": "classes-nominales-base",
    "title": "Classes nominales (base)",
    "level": "beginner",
    "topic": "classes",
    "vocab": [
      {
        "lari": "muntu",
        "french": "personne"
      },
      {
        "lari": "bantu",
        "french": "personnes"
      },
      {
        "lari": "nkento",
        "french": "femme"
      },
      {
        "lari": "bakento",
        "french": "femmes"
      },
      {
        "lari": "muana",
        "french": "enfant"
      },
      {
        "lari": "nzo",
        "french": "maison"
      },
      {
        "lari": "bakala",
        "french": "mâle, mari"
      },
      {
        "lari": "babakala",
        "french": "mâles, maris"
      },
      {
        "lari": "bumuntu",
        "french": "humanité"
      },
      {
        "lari": "bukento",
        "french": "féminité"
      },
      {
        "lari": "laadi",
        "french": "langue laadi"
      },
      {
        "lari": "halaadi",
        "french": "membre de l'ethnie laadi"
      },
      {
        "lari": "balaadi",
        "french": "membres de l'ethnie laadi"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le préfixe pluriel du genre 1 (mu-) ?",
        "answer": "ba-"
      },
      {
        "type": "fill-in-blank",
        "question": "___ntu (personnes, pluriel de muntu)",
        "answer": "ba"
      },
      {
        "type": "matching",
        "question": "Associez les formes singulier et pluriel",
        "answer": "muntu=bantu, nkento=bakento, bakala=babakala, halaadi=balaadi"
      },
      {
        "type": "multiple-choice",
        "question": "Combien de genres nominaux le laadi possède-t-il ?",
        "answer": "19"
      },
      {
        "type": "multiple-choice",
        "question": "Que crée le préfixe bu- ?",
        "answer": "abstract nouns"
      }
    ]
  },
  {
    "id": "structure-phrase-laadi",
    "title": "Structure de la phrase",
    "level": "beginner",
    "topic": "structure",
    "vocab": [
      {
        "lari": "buta",
        "french": "produire"
      },
      {
        "lari": "butuka",
        "french": "naître"
      },
      {
        "lari": "kaba",
        "french": "partager"
      },
      {
        "lari": "kota",
        "french": "entrer"
      },
      {
        "lari": "batika",
        "french": "commencer"
      },
      {
        "lari": "nua",
        "french": "boire"
      },
      {
        "lari": "lia",
        "french": "manger"
      },
      {
        "lari": "mana",
        "french": "finir"
      },
      {
        "lari": "futa",
        "french": "payer"
      },
      {
        "lari": "zibika",
        "french": "fermer"
      },
      {
        "lari": "zibula",
        "french": "ouvrir"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment la négation est-elle formée en laadi ?",
        "answer": "discontinuous ka...ko"
      },
      {
        "type": "matching",
        "question": "Associez les verbes à leur signification",
        "answer": "buta=to produce, butuka=to be born, zibika=to close, zibula=to open"
      },
      {
        "type": "fill-in-blank",
        "question": "tu___ (nous buvons)",
        "answer": "nua"
      },
      {
        "type": "multiple-choice",
        "question": "Combien de modes le verbe laadi possède-t-il ?",
        "answer": "5"
      }
    ]
  },
  {
    "id": "derivation-verbale",
    "title": "Dérivation verbale",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "bikisa",
        "french": "faire attendre"
      },
      {
        "lari": "butisa",
        "french": "faire produire"
      },
      {
        "lari": "kabisa",
        "french": "faire partager"
      },
      {
        "lari": "filila",
        "french": "conduire à"
      },
      {
        "lari": "butila",
        "french": "produire à (pour)"
      },
      {
        "lari": "kabila",
        "french": "partager à (pour)"
      },
      {
        "lari": "butuka",
        "french": "naître (être produit)"
      },
      {
        "lari": "fuluka",
        "french": "être plein"
      },
      {
        "lari": "zibama",
        "french": "être fermé"
      },
      {
        "lari": "zibuka",
        "french": "être ouvert, s'ouvrir"
      },
      {
        "lari": "zibula",
        "french": "ouvrir"
      },
      {
        "lari": "bvukana",
        "french": "se rencontrer"
      },
      {
        "lari": "fulusa",
        "french": "remplir"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que fait l'affixe causatif -is- ?",
        "answer": "means 'to cause someone to do X'"
      },
      {
        "type": "matching",
        "question": "Associez le verbe dérivé au type d'affixe",
        "answer": "bikisa=causative (-is-), butila=applicative (-il-), butuka=passive (-uk-), bvukana=reciprocal (-an-)"
      },
      {
        "type": "fill-in-blank",
        "question": "buta → but___a (faire produire)",
        "answer": "is"
      },
      {
        "type": "fill-in-blank",
        "question": "zibika → zib___a (être fermé)",
        "answer": "am"
      },
      {
        "type": "multiple-choice",
        "question": "Combien d'affixes de dérivation de la racine le laadi possède-t-il ?",
        "answer": "30"
      }
    ]
  },
  {
    "id": "derivation-nominale",
    "title": "Dérivation nominale",
    "level": "intermediate",
    "topic": "derivation",
    "vocab": [
      {
        "lari": "bumuntu",
        "french": "humanité"
      },
      {
        "lari": "bukento",
        "french": "féminité"
      },
      {
        "lari": "babantu",
        "french": "les humains (générique)"
      },
      {
        "lari": "lufua",
        "french": "la mort"
      },
      {
        "lari": "nkoka",
        "french": "descente(s)"
      },
      {
        "lari": "mfumba",
        "french": "cercle"
      },
      {
        "lari": "nkabulu",
        "french": "fait de partager"
      },
      {
        "lari": "ntatu",
        "french": "troisièmement"
      },
      {
        "lari": "ntete",
        "french": "premièrement"
      },
      {
        "lari": "lukuni",
        "french": "morceau de bois"
      },
      {
        "lari": "nkuni",
        "french": "morceaux de bois"
      }
    ],
    "exercises": [
      {
        "type": "matching",
        "question": "Associez chaque nom à sa source de dérivation",
        "answer": "bumuntu=muntu (person), lufua=fua (to die), ntete=tete (one), mfumba=fumba (to bend)"
      },
      {
        "type": "multiple-choice",
        "question": "Quel préfixe crée des noms abstraits en laadi ?",
        "answer": "bu-"
      },
      {
        "type": "fill-in-blank",
        "question": "fua (mourir) → lu___ (la mort)",
        "answer": "fua"
      }
    ]
  },
  {
    "id": "syntaxe-avancee",
    "title": "Syntaxe avancée",
    "level": "advanced",
    "topic": "syntaxe",
    "vocab": [
      {
        "lari": "mu",
        "french": "à, dans (lieu)"
      },
      {
        "lari": "ku",
        "french": "à (lieu distinct)"
      },
      {
        "lari": "ga",
        "french": "à (surface)"
      },
      {
        "lari": "na",
        "french": "avec"
      },
      {
        "lari": "na",
        "french": "et"
      },
      {
        "lari": "keti",
        "french": "ou bien"
      },
      {
        "lari": "giena",
        "french": "être (copule)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on 'nous qui buvons' en mode relatif ?",
        "answer": "beto tunua"
      },
      {
        "type": "matching",
        "question": "Associez les prépositions à leur sens spatial",
        "answer": "mu=interior / duration, ku=distinct place, ga=surface / instant, na=with / and"
      },
      {
        "type": "fill-in-blank",
        "question": "___ tunua (nous qui buvons, mode relatif)",
        "answer": "beto"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle préposition locative indique l''intérieur' ou la 'durée' ?",
        "answer": "mu"
      }
    ]
  },
  {
    "id": "neutralisations-morphophonologie",
    "title": "Neutralisations et morphophonologie",
    "level": "advanced",
    "topic": "neutralisations",
    "vocab": [
      {
        "lari": "bika",
        "french": "saluer"
      },
      {
        "lari": "bikabika",
        "french": "saluer d'habitude"
      },
      {
        "lari": "bikabinga",
        "french": "saluer régulièrement"
      },
      {
        "lari": "kalanga",
        "french": "frire"
      },
      {
        "lari": "patanga",
        "french": "barboter"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que se passe-t-il pour l'opposition f/pf après une consonne nasale ?",
        "answer": "they are neutralized under PF"
      },
      {
        "type": "matching",
        "question": "Associez l'affixe à son sens aspectuel",
        "answer": "-ak-=habitual, -a·ng-=repetitive, -ang-=durative middle, -ing-=durative active"
      },
      {
        "type": "fill-in-blank",
        "question": "bika → bika___a (saluer d'habitude)",
        "answer": "bik"
      }
    ]
  },
  {
    "id": "pronoms-personnels-demonstratifs",
    "title": "Pronoms personnels et démonstratifs",
    "level": "beginner",
    "topic": "pronoms",
    "vocab": [
      {
        "lari": "Me / Meno",
        "french": "je, moi (forme emphatique)"
      },
      {
        "lari": "Nge",
        "french": "tu, toi"
      },
      {
        "lari": "Yandi",
        "french": "il, elle, lui"
      },
      {
        "lari": "Beto",
        "french": "nous"
      },
      {
        "lari": "Beno",
        "french": "vous (pluriel)"
      },
      {
        "lari": "Bau",
        "french": "ils, elles, eux"
      },
      {
        "lari": "yaya",
        "french": "celui-ci, celle-ci (proche)"
      },
      {
        "lari": "yayi",
        "french": "celui-là, celle-là (loin)"
      },
      {
        "lari": "baba",
        "french": "ceux-ci (proche, pluriel)"
      },
      {
        "lari": "babi",
        "french": "ceux-là (loin, pluriel)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "En lari parlé, quel marqueur remplace « je » dans une phrase au passé ?",
        "answer": "NA"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « Mbaji ku zandu NI kwenda » ?",
        "answer": "Tomorrow I will go to the market"
      },
      {
        "type": "matching",
        "question": "Associez chaque pronom à sa traduction",
        "answer": "Me / Meno=I (emphatic), Nge=you, Yandi=he/she, Beto=we"
      },
      {
        "type": "fill-in-blank",
        "question": "Mazuji ku Mfua ___ yele (hier j'étais à Mfua)",
        "answer": "NA"
      },
      {
        "type": "fill-in-blank",
        "question": "Mbaji ku zandu ___ kwenda (demain j'irai au marché)",
        "answer": "NI"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize pronouns in Mandombe"
      }
    ]
  },
  {
    "id": "systeme-verbal-temps-aspects",
    "title": "Système verbal : temps et aspects",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "sala",
        "french": "travailler"
      },
      {
        "lari": "kwenda",
        "french": "aller"
      },
      {
        "lari": "dia",
        "french": "manger"
      },
      {
        "lari": "mona",
        "french": "voir"
      },
      {
        "lari": "bika",
        "french": "saluer"
      },
      {
        "lari": "mazuji",
        "french": "hier"
      },
      {
        "lari": "mazono",
        "french": "avant-hier / il y a longtemps"
      },
      {
        "lari": "mbaji",
        "french": "demain"
      },
      {
        "lari": "tama",
        "french": "être en train de"
      },
      {
        "lari": "fueti",
        "french": "devoir"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Hier j'ai travaillé » en lari ?",
        "answer": "Mazuji NA sala"
      },
      {
        "type": "multiple-choice",
        "question": "Comment la négation se forme-t-elle au futur ?",
        "answer": "ka NI verb ko"
      },
      {
        "type": "matching",
        "question": "Associez chaque phrase à son temps",
        "answer": "Mazuji NA sala=past (yesterday), NI kusala=present, Mbaji NI kwenda=future (tomorrow), NI tama kusala=progressive"
      },
      {
        "type": "fill-in-blank",
        "question": "Ka ___ kwenda ko (je n'irai pas)",
        "answer": "NI"
      },
      {
        "type": "fill-in-blank",
        "question": "Mazuji ___ mona (hier j'ai vu)",
        "answer": "NA"
      }
    ]
  },
  {
    "id": "numeration-quantificateurs",
    "title": "Numération et quantificateurs",
    "level": "intermediate",
    "topic": "numeration",
    "vocab": [
      {
        "lari": "mosi",
        "french": "un (1)"
      },
      {
        "lari": "zole",
        "french": "deux (2)"
      },
      {
        "lari": "tatu",
        "french": "trois (3)"
      },
      {
        "lari": "ya",
        "french": "quatre (4)"
      },
      {
        "lari": "tanu",
        "french": "cinq (5)"
      },
      {
        "lari": "sambanu",
        "french": "six (6)"
      },
      {
        "lari": "nsambwadi",
        "french": "sept (7)"
      },
      {
        "lari": "nana",
        "french": "huit (8)"
      },
      {
        "lari": "vwa",
        "french": "neuf (9)"
      },
      {
        "lari": "kumi",
        "french": "dix (10)"
      },
      {
        "lari": "nkama",
        "french": "cent (100)"
      },
      {
        "lari": "ntete",
        "french": "premier"
      },
      {
        "lari": "nzole",
        "french": "deuxième"
      },
      {
        "lari": "ntatu",
        "french": "troisième"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « sept » en lari ?",
        "answer": "nsambwadi"
      },
      {
        "type": "matching",
        "question": "Associez chaque nombre à sa traduction en lari",
        "answer": "mosi=1, tatu=3, tanu=5, kumi=10"
      },
      {
        "type": "fill-in-blank",
        "question": "kumi na ___ = 11",
        "answer": "mosi"
      },
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « premier » en lari ?",
        "answer": "ntete"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize numbers in Mandombe"
      }
    ]
  },
  {
    "id": "ideophones-expressivite",
    "title": "Idéophones et expressivité",
    "level": "advanced",
    "topic": "ideophones",
    "vocab": [
      {
        "lari": "pi",
        "french": "silence total, vide complet"
      },
      {
        "lari": "fyu",
        "french": "passage rapide, envol"
      },
      {
        "lari": "nye",
        "french": "douleur aiguë, cri perçant"
      },
      {
        "lari": "ti",
        "french": "immobilité absolue"
      },
      {
        "lari": "wa",
        "french": "étonnement, bouche bée"
      },
      {
        "lari": "nsi",
        "french": "bruit aigu continu"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Qu'exprime l'idéophone « pi » ?",
        "answer": "total silence"
      },
      {
        "type": "matching",
        "question": "Associez chaque idéophone à ce qu'il exprime",
        "answer": "nsi=high-pitched sound, fyu=swift passage, pi=total silence, nye=sharp pain"
      },
      {
        "type": "fill-in-blank",
        "question": "Ndeke katuka ___! (l'oiseau est parti — FIOU !)",
        "answer": "fyu"
      },
      {
        "type": "multiple-choice",
        "question": "Où les idéophones se placent-ils habituellement dans la phrase ?",
        "answer": "after the verb, at the end"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize ideophones in Mandombe"
      }
    ]
  },
  {
    "id": "systeme-vocalique",
    "title": "Le système vocalique",
    "level": "intermediate",
    "topic": "systeme",
    "vocab": [
      {
        "lari": "kaba",
        "french": "partager"
      },
      {
        "lari": "kabu",
        "french": "partagé"
      },
      {
        "lari": "bika",
        "french": "saluer"
      },
      {
        "lari": "tuela",
        "french": "produire"
      },
      {
        "lari": "kota",
        "french": "entrer"
      },
      {
        "lari": "nuaa",
        "french": "bouche(s)"
      },
      {
        "lari": "sumba",
        "french": "acheter"
      },
      {
        "lari": "lenga",
        "french": "se faner"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Combien de voyelles le lari possède-t-il ?",
        "answer": "10"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle voyelle est la plus fréquente dans le lexique lari ?",
        "answer": "a"
      },
      {
        "type": "matching",
        "question": "Associez chaque voyelle à son degré d'aperture",
        "answer": "i, u=1st degree (minimal), e, o=2nd degree (medium), a=3rd degree (maximal)"
      },
      {
        "type": "fill-in-blank",
        "question": "Une voyelle longue peut porter ___ ton(s), une brève n'en porte qu'un.",
        "answer": "2"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize vowels in Mandombe script"
      }
    ]
  },
  {
    "id": "tons-du-laari",
    "title": "Les tons du Laari",
    "level": "intermediate",
    "topic": "tons",
    "vocab": [
      {
        "lari": "mbazi",
        "french": "cour(s)"
      },
      {
        "lari": "mbazi",
        "french": "lendemain"
      },
      {
        "lari": "mbangala",
        "french": "bâton(s)"
      },
      {
        "lari": "mbangala",
        "french": "saison(s) chaude(s)"
      },
      {
        "lari": "muana",
        "french": "enfant"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Combien de registres tonals le lari possède-t-il ?",
        "answer": "2"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « mbazi » avec un ton montant ?",
        "answer": "courtyard(s)"
      },
      {
        "type": "fill-in-blank",
        "question": "Une voyelle longue porte ___ ton(s) car elle vaut deux mores.",
        "answer": "2"
      },
      {
        "type": "matching",
        "question": "Associez le schéma tonal au sens de « mbangala »",
        "answer": "mbangala (ton haut)=stick(s), mbangala (ton bas)=hot season(s)"
      },
      {
        "type": "multiple-choice",
        "question": "Quel registre tonal est le plus fréquent en lari ?",
        "answer": "low"
      }
    ]
  },
  {
    "id": "derivation-verbale",
    "title": "La dérivation verbale",
    "level": "intermediate",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "bika",
        "french": "saluer"
      },
      {
        "lari": "bikisa",
        "french": "faire saluer (causatif)"
      },
      {
        "lari": "bikila",
        "french": "saluer pour/à (applicatif)"
      },
      {
        "lari": "ziba",
        "french": "fermer"
      },
      {
        "lari": "zibuka",
        "french": "s'ouvrir (réversif)"
      },
      {
        "lari": "zibula",
        "french": "ouvrir (réversif moyen)"
      },
      {
        "lari": "fumba",
        "french": "courber"
      },
      {
        "lari": "fumbama",
        "french": "être courbé (statif)"
      },
      {
        "lari": "buta",
        "french": "produire"
      },
      {
        "lari": "butisa",
        "french": "faire produire"
      },
      {
        "lari": "bikabika",
        "french": "saluer d'habitude"
      },
      {
        "lari": "bvukana",
        "french": "se rencontrer (réciproque)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Qu'exprime le suffixe « -is » dans les verbes lari ?",
        "answer": "causative (make do)"
      },
      {
        "type": "matching",
        "question": "Associez chaque suffixe à sa signification",
        "answer": "-is=causative (make do), -il=applicative (do for), -uk=reversive (undo), -am=stative (be in state)"
      },
      {
        "type": "fill-in-blank",
        "question": "bika → bik___a = « saluer pour quelqu'un » (applicatif)",
        "answer": "il"
      },
      {
        "type": "fill-in-blank",
        "question": "ziba → zib___a = « s'ouvrir » (réversif)",
        "answer": "uk"
      },
      {
        "type": "multiple-choice",
        "question": "Que signifie « fumbama » ?",
        "answer": "to be bent"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize derived verbs in Mandombe"
      }
    ]
  },
  {
    "id": "negation-ka-ko",
    "title": "La négation « kà...ko » — Le sandwich négatif",
    "level": "beginner",
    "topic": "négation",
    "vocab": [
      {
        "lari": "kà...ko",
        "french": "ne...pas (négation discontinue)"
      },
      {
        "lari": "kà kábá ko",
        "french": "il ne partage pas"
      },
      {
        "lari": "kà tùkábá ko",
        "french": "nous ne partageons pas"
      },
      {
        "lari": "kà lùbúlá ándi",
        "french": "ne cassez pas !"
      },
      {
        "lari": "ká nkàbìlí ko",
        "french": "je ne partageais pas (éloigné)"
      },
      {
        "lari": "ká nkàbílì kó",
        "french": "je ne partageais pas (défini)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « il ne partage pas » en lari ?",
        "answer": "kà kábá ko"
      },
      {
        "type": "fill-in-blank",
        "question": "___ tùkábá ___ (nous ne partageons pas)",
        "answer": "kà...ko"
      },
      {
        "type": "multiple-choice",
        "question": "Dans l'impératif négatif « kà lùbúlá ándi », pourquoi n'y a-t-il pas de « ko » à la fin ?",
        "answer": "ko disappears in negative commands without a direct object"
      },
      {
        "type": "matching",
        "question": "Associez chaque phrase lari à son sens en français",
        "answer": "kà kábá ko=he does not share, kà tùkábá ko=we do not share, kà lùbúlá ándi=do not break!"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize negation patterns in Mandombe"
      }
    ]
  },
  {
    "id": "fonctionnels-locatifs",
    "title": "Les fonctionnels locatifs — kù, gà, mù",
    "level": "beginner",
    "topic": "fonctionnels",
    "vocab": [
      {
        "lari": "kù",
        "french": "à, vers (lieu distinct)"
      },
      {
        "lari": "gà",
        "french": "sur, à (lieu ponctuel)"
      },
      {
        "lari": "mù",
        "french": "dans, pendant"
      },
      {
        "lari": "nà",
        "french": "avec (accompagnement)"
      },
      {
        "lari": "gata",
        "french": "village"
      },
      {
        "lari": "toto",
        "french": "sol, terre"
      },
      {
        "lari": "bulu",
        "french": "trou"
      },
      {
        "lari": "mbele",
        "french": "couteau"
      },
      {
        "lari": "mbazi",
        "french": "cour"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel mot signifie « sur » ou « à la surface de » en lari ?",
        "answer": "gà"
      },
      {
        "type": "fill-in-blank",
        "question": "___ bulu nàbuá (je suis tombé dans le trou)",
        "answer": "mù"
      },
      {
        "type": "matching",
        "question": "Associez chaque locatif à sa signification",
        "answer": "kù=to, at (direction), gà=on (surface), mù=in, inside, nà=with (accompaniment)"
      },
      {
        "type": "multiple-choice",
        "question": "Dans « mù mbele bàkúlùlìlá », que signifie « mù » ?",
        "answer": "with (instrument)"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize locatives in Mandombe"
      }
    ]
  },
  {
    "id": "termes-de-parente",
    "title": "Les termes de parenté — Ta·ta, Ma·ma, Gia·gia",
    "level": "beginner",
    "topic": "termes",
    "vocab": [
      {
        "lari": "taata",
        "french": "père, parent paternel, monsieur"
      },
      {
        "lari": "bataata",
        "french": "pères, parents paternels"
      },
      {
        "lari": "maama",
        "french": "mère, parent maternel, madame"
      },
      {
        "lari": "giagia",
        "french": "aîné, grand-parent"
      },
      {
        "lari": "magiagia",
        "french": "aînés, grands-parents"
      },
      {
        "lari": "tá Malonga",
        "french": "Père Malonga, Monsieur Malonga"
      },
      {
        "lari": "má Malonga",
        "french": "Mère Malonga, Madame Malonga"
      },
      {
        "lari": "giá Malonga",
        "french": "Grand-Parent Malonga"
      },
      {
        "lari": "ngulu",
        "french": "mère (forme spéciale)"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Comment dit-on « Monsieur Malonga » en lari ?",
        "answer": "tá Malonga"
      },
      {
        "type": "fill-in-blank",
        "question": "___ Malonga (Madame/Mère Malonga)",
        "answer": "má"
      },
      {
        "type": "matching",
        "question": "Associez chaque terme lari à sa signification",
        "answer": "taata=father, maama=mother, giagia=elder / grandparent, bataata=fathers (plural)"
      },
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de « giagia » (aîné) ?",
        "answer": "magiagia"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize family terms in Mandombe"
      }
    ]
  },
  {
    "id": "nominal-genres",
    "title": "Les genres nominaux (classes nominales)",
    "level": "intermediate",
    "topic": "nominal",
    "vocab": [
      {
        "lari": "mùntù",
        "french": "personne"
      },
      {
        "lari": "bàntù",
        "french": "personnes"
      },
      {
        "lari": "kìtú",
        "french": "tête"
      },
      {
        "lari": "bìtú",
        "french": "têtes"
      },
      {
        "lari": "ngùlù",
        "french": "cochon"
      },
      {
        "lari": "dìkúngù",
        "french": "réunion"
      },
      {
        "lari": "màkúngù",
        "french": "réunions"
      },
      {
        "lari": "lùfuá",
        "french": "la mort"
      },
      {
        "lari": "bùlwèzì",
        "french": "maladie"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Quel est le pluriel de 'mùntù' (personne) ?",
        "answer": "bàntù"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle paire de préfixes marque les objets et instruments ?",
        "answer": "ki-/bi-"
      },
      {
        "type": "fill-in-blank",
        "question": "Le pluriel de kìtú (tête) est ___",
        "answer": "bìtú"
      },
      {
        "type": "matching",
        "question": "Associez chaque nom à son préfixe de classe",
        "answer": "mùntù=mu- (humans), kìtú=ki- (objects), ngùlù=N- (animals), dìkúngù=di- (collectives)"
      },
      {
        "type": "multiple-choice",
        "question": "Combien de genres nominaux le Kikongo Lari possède-t-il ?",
        "answer": "19"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize noun classes in Mandombe"
      }
    ]
  },
  {
    "id": "verbal-derivation",
    "title": "La dérivation verbale (suffixes)",
    "level": "advanced",
    "topic": "verbes",
    "vocab": [
      {
        "lari": "kàbá",
        "french": "partager"
      },
      {
        "lari": "kàbísá",
        "french": "faire partager"
      },
      {
        "lari": "kàbìlá",
        "french": "partager pour/à"
      },
      {
        "lari": "kàbàká",
        "french": "partager habituellement"
      },
      {
        "lari": "zìbìká",
        "french": "fermer"
      },
      {
        "lari": "zìbùká",
        "french": "être ouvert"
      },
      {
        "lari": "zìbùlá",
        "french": "ouvrir"
      },
      {
        "lari": "zìbàmá",
        "french": "être fermé / se fermer"
      },
      {
        "lari": "bìkà",
        "french": "saluer"
      },
      {
        "lari": "bìkísá",
        "french": "faire saluer"
      },
      {
        "lari": "bìkílá",
        "french": "saluer à / pour"
      },
      {
        "lari": "bìkàká",
        "french": "saluer habituellement"
      }
    ],
    "exercises": [
      {
        "type": "multiple-choice",
        "question": "Que fait le suffixe -is- ajouté à un verbe ?",
        "answer": "Causative (make do)"
      },
      {
        "type": "fill-in-blank",
        "question": "kàbá signifie 'partager'. kàb___á signifie 'faire partager' (causatif).",
        "answer": "ís"
      },
      {
        "type": "matching",
        "question": "Associez chaque suffixe à sa fonction",
        "answer": "-is-=Causative (make do), -il-=Applicative (do for), -uk-=Passive (be in state), -ul-=Reversive (undo)"
      },
      {
        "type": "multiple-choice",
        "question": "Quelle est la forme réversive de 'zìbìká' (fermer) ?",
        "answer": "zìbùlá"
      },
      {
        "type": "fill-in-blank",
        "question": "bìkà (saluer) → bìk___á (saluer habituellement)",
        "answer": "àk"
      },
      {
        "type": "mandombe-recognition",
        "question": "Recognize derived verbs in Mandombe"
      }
    ]
  }
];

export function filterLessons(level?: string, topic?: string): LessonSummary[] {
  return LESSONS_CORPUS.filter((l) => {
    if (level && l.level !== level) return false;
    if (topic && !l.topic.toLowerCase().includes(topic.toLowerCase())) return false;
    return true;
  });
}

export function getExercisesByLesson(lessonId?: string, type?: string) {
  const lessons = lessonId ? LESSONS_CORPUS.filter((l) => l.id === lessonId) : LESSONS_CORPUS;
  const result: { lesson_id: string; exercises: any[] }[] = [];
  for (const l of lessons) {
    const ex = type ? l.exercises.filter((e) => e.type === type) : l.exercises;
    if (ex.length) result.push({ lesson_id: l.id, exercises: ex });
  }
  return result;
}
