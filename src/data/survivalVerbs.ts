// Genere par scripts/build_survival_verbs.py depuis « Zonza Lari - Verbes de survie ».
// Ne pas editer a la main : relancer le script.
export interface SurvivalRow {
  person: string;
  lari: string;
  mandombe?: string;
  fr: string;
  en: string;
  note?: string;
  verbForm?: string;
}
export interface SurvivalTense {
  tense: string;
  tenseEn: string;
  rule?: string;
  rows: SurvivalRow[];
}
export interface SurvivalVerb {
  verb: string;
  meaning: string;
  meaningEn: string;
  note?: string;
  tenses: SurvivalTense[];
}

export const survivalVerbs: SurvivalVerb[] = [
  {
    "verb": "Ba",
    "meaning": "être",
    "meaningEn": "to be",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "Njena",
            "fr": "Je suis.",
            "en": "I am.",
            "verbForm": null,
            "note": "Forme courte : Nje."
          },
          {
            "person": "Tu",
            "lari": "Wena",
            "fr": "Tu es.",
            "en": "You are.",
            "verbForm": null,
            "note": "Forme courte : We."
          },
          {
            "person": "Il/Elle",
            "lari": "Kena",
            "fr": "Il/Elle est.",
            "en": "He/She is.",
            "verbForm": null,
            "note": "Forme courte : Ke."
          },
          {
            "person": "Nous",
            "lari": "Tuena",
            "fr": "Nous sommes.",
            "en": "We are.",
            "verbForm": null,
            "note": "Forme courte : Tue."
          },
          {
            "person": "Vous",
            "lari": "Luena",
            "fr": "Vous êtes.",
            "en": "You (pl.) are.",
            "verbForm": null,
            "note": "Forme courte : Lue."
          },
          {
            "person": "Ils/Elles",
            "lari": "Bena",
            "fr": "Ils/Elles sont.",
            "en": "They are.",
            "verbForm": null,
            "note": "Forme courte : Be."
          }
        ]
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbele",
            "fr": "J'ai été.",
            "en": "I was.",
            "verbForm": "bele",
            "note": "Homographe : mbele veut aussi dire couteau."
          },
          {
            "person": "Tu",
            "lari": "bele",
            "fr": "Tu as été.",
            "en": "You were.",
            "verbForm": "bele"
          },
          {
            "person": "Il/Elle",
            "lari": "ka bele",
            "fr": "Il/Elle a été.",
            "en": "He/She was.",
            "verbForm": "bele"
          },
          {
            "person": "Nous",
            "lari": "tu bele",
            "fr": "Nous avons été.",
            "en": "We were.",
            "verbForm": "bele"
          },
          {
            "person": "Vous",
            "lari": "lu bele",
            "fr": "Vous avez été.",
            "en": "You (pl.) were.",
            "verbForm": "bele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba bele",
            "fr": "Ils/Elles ont été.",
            "en": "They were.",
            "verbForm": "bele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni ba",
            "fr": "Je serai.",
            "en": "I will be.",
            "verbForm": "ba"
          },
          {
            "person": "Tu",
            "lari": "mbo ba",
            "fr": "Tu seras.",
            "en": "You will be.",
            "verbForm": "ba"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka ba",
            "fr": "Il/Elle sera.",
            "en": "He/She will be.",
            "verbForm": "ba"
          },
          {
            "person": "Nous",
            "lari": "mbo tu ba",
            "fr": "Nous serons.",
            "en": "We will be.",
            "verbForm": "ba"
          },
          {
            "person": "Vous",
            "lari": "mbo lu ba",
            "fr": "Vous serez.",
            "en": "You (pl.) will be.",
            "verbForm": "ba"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba ba",
            "fr": "Ils/Elles seront.",
            "en": "They will be.",
            "verbForm": "ba"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Sa",
    "meaning": "faire",
    "meaningEn": "to do, to make",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "sa ni ta sa",
            "fr": "Je fais.",
            "en": "I do.",
            "verbForm": "sa"
          },
          {
            "person": "Tu",
            "lari": "sa ta sa",
            "fr": "Tu fais.",
            "en": "You do.",
            "verbForm": "sa"
          },
          {
            "person": "Il/Elle",
            "lari": "sa ka ta sa",
            "fr": "Il/Elle fait.",
            "en": "He/She does.",
            "verbForm": "sa"
          },
          {
            "person": "Nous",
            "lari": "sa tu ta sa",
            "fr": "Nous faisons.",
            "en": "We do.",
            "verbForm": "sa"
          },
          {
            "person": "Vous",
            "lari": "sa lu ta sa",
            "fr": "Vous faites.",
            "en": "You (pl.) do.",
            "verbForm": "sa"
          },
          {
            "person": "Ils/Elles",
            "lari": "sa ba ta sa",
            "fr": "Ils/Elles font.",
            "en": "They do.",
            "verbForm": "sa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ntshiri",
            "fr": "J'ai fait.",
            "en": "I did.",
            "verbForm": "shiri",
            "note": "Homographe : shiri est aussi le passé de sa:la (rester)."
          },
          {
            "person": "Tu",
            "lari": "shiri",
            "fr": "Tu as fait.",
            "en": "You did.",
            "verbForm": "shiri"
          },
          {
            "person": "Il/Elle",
            "lari": "shiri",
            "fr": "Il/Elle a fait.",
            "en": "He/She did.",
            "verbForm": "shiri"
          },
          {
            "person": "Nous",
            "lari": "tu shiri",
            "fr": "Nous avons fait.",
            "en": "We did.",
            "verbForm": "shiri"
          },
          {
            "person": "Vous",
            "lari": "lu shiri",
            "fr": "Vous avez fait.",
            "en": "You (pl.) did.",
            "verbForm": "shiri"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba shiri",
            "fr": "Ils/Elles ont fait.",
            "en": "They did.",
            "verbForm": "shiri"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni sa",
            "fr": "Je ferai.",
            "en": "I will do.",
            "verbForm": "sa"
          },
          {
            "person": "Tu",
            "lari": "mbo sa",
            "fr": "Tu feras.",
            "en": "You will do.",
            "verbForm": "sa"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka sa",
            "fr": "Il/Elle fera.",
            "en": "He/She will do.",
            "verbForm": "sa"
          },
          {
            "person": "Nous",
            "lari": "mbo tu sa",
            "fr": "Nous ferons.",
            "en": "We will do.",
            "verbForm": "sa"
          },
          {
            "person": "Vous",
            "lari": "mbo lu sa",
            "fr": "Vous ferez.",
            "en": "You (pl.) will do.",
            "verbForm": "sa"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba sa",
            "fr": "Ils/Elles feront.",
            "en": "They will do.",
            "verbForm": "sa"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Dia",
    "meaning": "manger",
    "meaningEn": "to eat",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "dia ni ta dia",
            "fr": "Je mange.",
            "en": "I eat.",
            "verbForm": "dia"
          },
          {
            "person": "Tu",
            "lari": "dia ta dia",
            "fr": "Tu manges.",
            "en": "You eat.",
            "verbForm": "dia"
          },
          {
            "person": "Il/Elle",
            "lari": "dia ka ta dia",
            "fr": "Il/Elle mange.",
            "en": "He/She eats.",
            "verbForm": "dia"
          },
          {
            "person": "Nous",
            "lari": "dia tu ta dia",
            "fr": "Nous mangeons.",
            "en": "We eat.",
            "verbForm": "dia"
          },
          {
            "person": "Vous",
            "lari": "dia lu ta dia",
            "fr": "Vous mangez.",
            "en": "You (pl.) eat.",
            "verbForm": "dia"
          },
          {
            "person": "Ils/Elles",
            "lari": "dia ba ta dia",
            "fr": "Ils/Elles mangent.",
            "en": "They eat.",
            "verbForm": "dia"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ndidi",
            "fr": "J'ai mangé.",
            "en": "I ate.",
            "verbForm": "didi",
            "note": "Variante : ndiri."
          },
          {
            "person": "Tu",
            "lari": "didi",
            "fr": "Tu as mangé.",
            "en": "You ate.",
            "verbForm": "didi",
            "note": "Variante : diri."
          },
          {
            "person": "Il/Elle",
            "lari": "didi",
            "fr": "Il/Elle a mangé.",
            "en": "He/She ate.",
            "verbForm": "didi",
            "note": "Variante : diri."
          },
          {
            "person": "Nous",
            "lari": "tu didi",
            "fr": "Nous avons mangé.",
            "en": "We ate.",
            "verbForm": "didi",
            "note": "Variante : tu diri."
          },
          {
            "person": "Vous",
            "lari": "lu didi",
            "fr": "Vous avez mangé.",
            "en": "You (pl.) ate.",
            "verbForm": "didi",
            "note": "Variante : lu diri."
          },
          {
            "person": "Ils/Elles",
            "lari": "ba didi",
            "fr": "Ils/Elles ont mangé.",
            "en": "They ate.",
            "verbForm": "didi",
            "note": "Variante : ba diri."
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni dia",
            "fr": "Je mangerai.",
            "en": "I will eat.",
            "verbForm": "dia"
          },
          {
            "person": "Tu",
            "lari": "mbo dia",
            "fr": "Tu mangeras.",
            "en": "You will eat.",
            "verbForm": "dia"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka dia",
            "fr": "Il/Elle mangera.",
            "en": "He/She will eat.",
            "verbForm": "dia"
          },
          {
            "person": "Nous",
            "lari": "mbo tu dia",
            "fr": "Nous mangerons.",
            "en": "We will eat.",
            "verbForm": "dia"
          },
          {
            "person": "Vous",
            "lari": "mbo lu dia",
            "fr": "Vous mangerez.",
            "en": "You (pl.) will eat.",
            "verbForm": "dia"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba dia",
            "fr": "Ils/Elles mangeront.",
            "en": "They will eat.",
            "verbForm": "dia"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Nua",
    "meaning": "boire",
    "meaningEn": "to drink",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "nua ni ta nua",
            "fr": "Je bois.",
            "en": "I drink.",
            "verbForm": "nua"
          },
          {
            "person": "Tu",
            "lari": "nua ta nua",
            "fr": "Tu bois.",
            "en": "You drink.",
            "verbForm": "nua"
          },
          {
            "person": "Il/Elle",
            "lari": "nua ka ta nua",
            "fr": "Il/Elle boit.",
            "en": "He/She drinks.",
            "verbForm": "nua"
          },
          {
            "person": "Nous",
            "lari": "nua tu ta nua",
            "fr": "Nous buvons.",
            "en": "We drink.",
            "verbForm": "nua"
          },
          {
            "person": "Vous",
            "lari": "nua lu ta nua",
            "fr": "Vous buvez.",
            "en": "You (pl.) drink.",
            "verbForm": "nua"
          },
          {
            "person": "Ils/Elles",
            "lari": "nua ba ta nua",
            "fr": "Ils/Elles boivent.",
            "en": "They drink.",
            "verbForm": "nua"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nuini",
            "fr": "J'ai bu.",
            "en": "I drank.",
            "verbForm": "nuini"
          },
          {
            "person": "Tu",
            "lari": "nuini",
            "fr": "Tu as bu.",
            "en": "You drank.",
            "verbForm": "nuini"
          },
          {
            "person": "Il/Elle",
            "lari": "nuini",
            "fr": "Il/Elle a bu.",
            "en": "He/She drank.",
            "verbForm": "nuini"
          },
          {
            "person": "Nous",
            "lari": "tu nuini",
            "fr": "Nous avons bu.",
            "en": "We drank.",
            "verbForm": "nuini"
          },
          {
            "person": "Vous",
            "lari": "lu nuini",
            "fr": "Vous avez bu.",
            "en": "You (pl.) drank.",
            "verbForm": "nuini"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba nuini",
            "fr": "Ils/Elles ont bu.",
            "en": "They drank.",
            "verbForm": "nuini"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni nua",
            "fr": "Je boirai.",
            "en": "I will drink.",
            "verbForm": "nua"
          },
          {
            "person": "Tu",
            "lari": "mbo nua",
            "fr": "Tu boiras.",
            "en": "You will drink.",
            "verbForm": "nua"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka nua",
            "fr": "Il/Elle boira.",
            "en": "He/She will drink.",
            "verbForm": "nua"
          },
          {
            "person": "Nous",
            "lari": "mbo tu nua",
            "fr": "Nous boirons.",
            "en": "We will drink.",
            "verbForm": "nua"
          },
          {
            "person": "Vous",
            "lari": "mbo lu nua",
            "fr": "Vous boirez.",
            "en": "You (pl.) will drink.",
            "verbForm": "nua"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba nua",
            "fr": "Ils/Elles boiront.",
            "en": "They will drink.",
            "verbForm": "nua"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Hana musua",
    "meaning": "permettre, donner la permission",
    "meaningEn": "to allow, to give permission",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "musua ni ta hana",
            "fr": "Je permets.",
            "en": "I allow.",
            "verbForm": "hana"
          },
          {
            "person": "Tu",
            "lari": "musua ta hana",
            "fr": "Tu permets.",
            "en": "You allow.",
            "verbForm": "hana"
          },
          {
            "person": "Il/Elle",
            "lari": "musua ka ta hana",
            "fr": "Il/Elle permet.",
            "en": "He/She allows.",
            "verbForm": "hana"
          },
          {
            "person": "Nous",
            "lari": "musua tu ta hana",
            "fr": "Nous permettons.",
            "en": "We allow.",
            "verbForm": "hana"
          },
          {
            "person": "Vous",
            "lari": "musua lu ta hana",
            "fr": "Vous permettez.",
            "en": "You (pl.) allow.",
            "verbForm": "hana"
          },
          {
            "person": "Ils/Elles",
            "lari": "musua ba ta hana",
            "fr": "Ils/Elles permettent.",
            "en": "They allow.",
            "verbForm": "hana"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "musua ngeni",
            "fr": "J'ai permis.",
            "en": "I allowed.",
            "verbForm": "heni",
            "note": "Forme de la première personne : ngeni."
          },
          {
            "person": "Tu",
            "lari": "musua heni",
            "fr": "Tu as permis.",
            "en": "You allowed.",
            "verbForm": "heni"
          },
          {
            "person": "Il/Elle",
            "lari": "musua ka heni",
            "fr": "Il/Elle a permis.",
            "en": "He/She allowed.",
            "verbForm": "heni"
          },
          {
            "person": "Nous",
            "lari": "musua tu heni",
            "fr": "Nous avons permis.",
            "en": "We allowed.",
            "verbForm": "heni"
          },
          {
            "person": "Vous",
            "lari": "musua lu heni",
            "fr": "Vous avez permis.",
            "en": "You (pl.) allowed.",
            "verbForm": "heni"
          },
          {
            "person": "Ils/Elles",
            "lari": "musua ba heni",
            "fr": "Ils/Elles ont permis.",
            "en": "They allowed.",
            "verbForm": "heni"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni hana musua",
            "fr": "Je permettrai.",
            "en": "I will allow.",
            "verbForm": "hana"
          },
          {
            "person": "Tu",
            "lari": "mbo hana musua",
            "fr": "Tu permettras.",
            "en": "You will allow.",
            "verbForm": "hana"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka hana musua",
            "fr": "Il/Elle permettra.",
            "en": "He/She will allow.",
            "verbForm": "hana"
          },
          {
            "person": "Nous",
            "lari": "mbo tu hana musua",
            "fr": "Nous permettrons.",
            "en": "We will allow.",
            "verbForm": "hana"
          },
          {
            "person": "Vous",
            "lari": "mbo lu hana musua",
            "fr": "Vous permettrez.",
            "en": "You (pl.) will allow.",
            "verbForm": "hana"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba hana musua",
            "fr": "Ils/Elles permettront.",
            "en": "They will allow.",
            "verbForm": "hana"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Lenda",
    "meaning": "pouvoir",
    "meaningEn": "to be able to, can",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "ndendi",
            "fr": "Je peux.",
            "en": "I can.",
            "verbForm": "lendi"
          },
          {
            "person": "Tu",
            "lari": "lendi",
            "fr": "Tu peux.",
            "en": "You can.",
            "verbForm": "lendi"
          },
          {
            "person": "Il/Elle",
            "lari": "lendi",
            "fr": "Il/Elle peut.",
            "en": "He/She can.",
            "verbForm": "lendi"
          },
          {
            "person": "Nous",
            "lari": "tu lendi",
            "fr": "Nous pouvons.",
            "en": "We can.",
            "verbForm": "lendi"
          },
          {
            "person": "Vous",
            "lari": "lu lendi",
            "fr": "Vous pouvez.",
            "en": "You (pl.) can.",
            "verbForm": "lendi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba lendi",
            "fr": "Ils/Elles peuvent.",
            "en": "They can.",
            "verbForm": "lendi"
          }
        ]
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "na lendi",
            "fr": "J'ai pu.",
            "en": "I could.",
            "verbForm": "lendi"
          },
          {
            "person": "Tu",
            "lari": "wa lendi",
            "fr": "Tu as pu.",
            "en": "You could.",
            "verbForm": "lendi"
          },
          {
            "person": "Il/Elle",
            "lari": "wa lendi",
            "fr": "Il/Elle a pu.",
            "en": "He/She could.",
            "verbForm": "lendi"
          },
          {
            "person": "Nous",
            "lari": "tua lendi",
            "fr": "Nous avons pu.",
            "en": "We could.",
            "verbForm": "lendi"
          },
          {
            "person": "Vous",
            "lari": "lua lendi",
            "fr": "Vous avez pu.",
            "en": "You (pl.) could.",
            "verbForm": "lendi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba lendi",
            "fr": "Ils/Elles ont pu.",
            "en": "They could.",
            "verbForm": "lendi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni lenda",
            "fr": "Je pourrai.",
            "en": "I will be able to.",
            "verbForm": "lenda"
          },
          {
            "person": "Tu",
            "lari": "mbo lenda",
            "fr": "Tu pourras.",
            "en": "You will be able to.",
            "verbForm": "lenda"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka lenda",
            "fr": "Il/Elle pourra.",
            "en": "He/She will be able to.",
            "verbForm": "lenda"
          },
          {
            "person": "Nous",
            "lari": "mbo tu lenda",
            "fr": "Nous pourrons.",
            "en": "We will be able to.",
            "verbForm": "lenda"
          },
          {
            "person": "Vous",
            "lari": "mbo lu lenda",
            "fr": "Vous pourrez.",
            "en": "You (pl.) will be able to.",
            "verbForm": "lenda"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba lenda",
            "fr": "Ils/Elles pourront.",
            "en": "They will be able to.",
            "verbForm": "lenda"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "Le passé na lendi / wa lendi… est homographe avec le passé de landa (suivre)."
  },
  {
    "verb": "Bonga",
    "meaning": "prendre",
    "meaningEn": "to take",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "bonga ni ta bonga",
            "fr": "Je prends.",
            "en": "I take.",
            "verbForm": "bonga"
          },
          {
            "person": "Tu",
            "lari": "bonga ta bonga",
            "fr": "Tu prends.",
            "en": "You take.",
            "verbForm": "bonga"
          },
          {
            "person": "Il/Elle",
            "lari": "bonga ka ta bonga",
            "fr": "Il/Elle prend.",
            "en": "He/She takes.",
            "verbForm": "bonga"
          },
          {
            "person": "Nous",
            "lari": "bonga tu ta bonga",
            "fr": "Nous prenons.",
            "en": "We take.",
            "verbForm": "bonga"
          },
          {
            "person": "Vous",
            "lari": "bonga lu ta bonga",
            "fr": "Vous prenez.",
            "en": "You (pl.) take.",
            "verbForm": "bonga"
          },
          {
            "person": "Ils/Elles",
            "lari": "bonga ba ta bonga",
            "fr": "Ils/Elles prennent.",
            "en": "They take.",
            "verbForm": "bonga"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbongele",
            "fr": "J'ai pris.",
            "en": "I took.",
            "verbForm": "bongele"
          },
          {
            "person": "Tu",
            "lari": "bongele",
            "fr": "Tu as pris.",
            "en": "You took.",
            "verbForm": "bongele"
          },
          {
            "person": "Il/Elle",
            "lari": "bongele",
            "fr": "Il/Elle a pris.",
            "en": "He/She took.",
            "verbForm": "bongele"
          },
          {
            "person": "Nous",
            "lari": "tu bongele",
            "fr": "Nous avons pris.",
            "en": "We took.",
            "verbForm": "bongele"
          },
          {
            "person": "Vous",
            "lari": "lu bongele",
            "fr": "Vous avez pris.",
            "en": "You (pl.) took.",
            "verbForm": "bongele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba bongele",
            "fr": "Ils/Elles ont pris.",
            "en": "They took.",
            "verbForm": "bongele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni bonga",
            "fr": "Je prendrai.",
            "en": "I will take.",
            "verbForm": "bonga"
          },
          {
            "person": "Tu",
            "lari": "mbo bonga",
            "fr": "Tu prendras.",
            "en": "You will take.",
            "verbForm": "bonga"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka bonga",
            "fr": "Il/Elle prendra.",
            "en": "He/She will take.",
            "verbForm": "bonga"
          },
          {
            "person": "Nous",
            "lari": "mbo tu bonga",
            "fr": "Nous prendrons.",
            "en": "We will take.",
            "verbForm": "bonga"
          },
          {
            "person": "Vous",
            "lari": "mbo lu bonga",
            "fr": "Vous prendrez.",
            "en": "You (pl.) will take.",
            "verbForm": "bonga"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba bonga",
            "fr": "Ils/Elles prendront.",
            "en": "They will take.",
            "verbForm": "bonga"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Zaba",
    "meaning": "savoir, connaître",
    "meaningEn": "to know",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "nzebi",
            "fr": "Je sais.",
            "en": "I know.",
            "verbForm": "zebi"
          },
          {
            "person": "Tu",
            "lari": "zebi",
            "fr": "Tu sais.",
            "en": "You know.",
            "verbForm": "zebi"
          },
          {
            "person": "Il/Elle",
            "lari": "zebi",
            "fr": "Il/Elle sait.",
            "en": "He/She knows.",
            "verbForm": "zebi"
          },
          {
            "person": "Nous",
            "lari": "tu zebi",
            "fr": "Nous savons.",
            "en": "We know.",
            "verbForm": "zebi"
          },
          {
            "person": "Vous",
            "lari": "lu zebi",
            "fr": "Vous savez.",
            "en": "You (pl.) know.",
            "verbForm": "zebi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba zebi",
            "fr": "Ils/Elles savent.",
            "en": "They know.",
            "verbForm": "zebi"
          }
        ]
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "na zebi",
            "fr": "J'ai su.",
            "en": "I knew.",
            "verbForm": "zebi"
          },
          {
            "person": "Tu",
            "lari": "wa zebi",
            "fr": "Tu as su.",
            "en": "You knew.",
            "verbForm": "zebi"
          },
          {
            "person": "Il/Elle",
            "lari": "wa zebi",
            "fr": "Il/Elle a su.",
            "en": "He/She knew.",
            "verbForm": "zebi"
          },
          {
            "person": "Nous",
            "lari": "ta zebi",
            "fr": "Nous avons su.",
            "en": "We knew.",
            "verbForm": "zebi",
            "note": "Variante : tua zebi."
          },
          {
            "person": "Vous",
            "lari": "lua zebi",
            "fr": "Vous avez su.",
            "en": "You (pl.) knew.",
            "verbForm": "zebi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba zebi",
            "fr": "Ils/Elles ont su.",
            "en": "They knew.",
            "verbForm": "zebi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni zaba",
            "fr": "Je saurai.",
            "en": "I will know.",
            "verbForm": "zaba"
          },
          {
            "person": "Tu",
            "lari": "mbo zaba",
            "fr": "Tu sauras.",
            "en": "You will know.",
            "verbForm": "zaba"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka zaba",
            "fr": "Il/Elle saura.",
            "en": "He/She will know.",
            "verbForm": "zaba"
          },
          {
            "person": "Nous",
            "lari": "mbo tu zaba",
            "fr": "Nous saurons.",
            "en": "We will know.",
            "verbForm": "zaba"
          },
          {
            "person": "Vous",
            "lari": "mbo lu zaba",
            "fr": "Vous saurez.",
            "en": "You (pl.) will know.",
            "verbForm": "zaba"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba zaba",
            "fr": "Ils/Elles sauront.",
            "en": "They will know.",
            "verbForm": "zaba"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Kuiza",
    "meaning": "venir",
    "meaningEn": "to come",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "mwizu ni ta kwiza",
            "fr": "Je viens.",
            "en": "I come.",
            "verbForm": "kwiza"
          },
          {
            "person": "Tu",
            "lari": "mwizu ta kwiza",
            "fr": "Tu viens.",
            "en": "You come.",
            "verbForm": "kwiza"
          },
          {
            "person": "Il/Elle",
            "lari": "mwizu ka ta kwiza",
            "fr": "Il/Elle vient.",
            "en": "He/She comes.",
            "verbForm": "kwiza"
          },
          {
            "person": "Nous",
            "lari": "mwizu tu ta kwiza",
            "fr": "Nous venons.",
            "en": "We come.",
            "verbForm": "kwiza"
          },
          {
            "person": "Vous",
            "lari": "mwizu lu ta kwiza",
            "fr": "Vous venez.",
            "en": "You (pl.) come.",
            "verbForm": "kwiza"
          },
          {
            "person": "Ils/Elles",
            "lari": "mwizu ba ta kwiza",
            "fr": "Ils/Elles viennent.",
            "en": "They come.",
            "verbForm": "kwiza"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "njijiri",
            "fr": "Je suis venu.",
            "en": "I came.",
            "verbForm": null
          },
          {
            "person": "Tu",
            "lari": "wijiri",
            "fr": "Tu es venu.",
            "en": "You came.",
            "verbForm": null
          },
          {
            "person": "Il/Elle",
            "lari": "wijiri",
            "fr": "Il/Elle est venu.",
            "en": "He/She came.",
            "verbForm": null,
            "note": "Le i est long à l'oral : /wi:jiri/."
          },
          {
            "person": "Nous",
            "lari": "tuijiri",
            "fr": "Nous sommes venus.",
            "en": "We came.",
            "verbForm": null
          },
          {
            "person": "Vous",
            "lari": "luijiri",
            "fr": "Vous êtes venus.",
            "en": "You (pl.) came.",
            "verbForm": null
          },
          {
            "person": "Ils/Elles",
            "lari": "bijiri",
            "fr": "Ils/Elles sont venus.",
            "en": "They came.",
            "verbForm": null,
            "note": "Le i est long à l'oral : /bi:jiri/."
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni kuiza",
            "fr": "Je viendrai.",
            "en": "I will come.",
            "verbForm": "kuiza"
          },
          {
            "person": "Tu",
            "lari": "mbo kuiza",
            "fr": "Tu viendras.",
            "en": "You will come.",
            "verbForm": "kuiza"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka kuiza",
            "fr": "Il/Elle viendra.",
            "en": "He/She will come.",
            "verbForm": "kuiza"
          },
          {
            "person": "Nous",
            "lari": "mbo tu kuiza",
            "fr": "Nous viendrons.",
            "en": "We will come.",
            "verbForm": "kuiza"
          },
          {
            "person": "Vous",
            "lari": "mbo lu kuiza",
            "fr": "Vous viendrez.",
            "en": "You (pl.) will come.",
            "verbForm": "kuiza"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba kuiza",
            "fr": "Ils/Elles viendront.",
            "en": "They will come.",
            "verbForm": "kuiza"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Banza",
    "meaning": "penser",
    "meaningEn": "to think",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "banza ni ta banza",
            "fr": "Je pense.",
            "en": "I think.",
            "verbForm": "banza"
          },
          {
            "person": "Tu",
            "lari": "banza ta banza",
            "fr": "Tu penses.",
            "en": "You think.",
            "verbForm": "banza"
          },
          {
            "person": "Il/Elle",
            "lari": "banza ka ta banza",
            "fr": "Il/Elle pense.",
            "en": "He/She thinks.",
            "verbForm": "banza"
          },
          {
            "person": "Nous",
            "lari": "banza tu ta banza",
            "fr": "Nous pensons.",
            "en": "We think.",
            "verbForm": "banza"
          },
          {
            "person": "Vous",
            "lari": "banza lu ta banza",
            "fr": "Vous pensez.",
            "en": "You (pl.) think.",
            "verbForm": "banza"
          },
          {
            "person": "Ils/Elles",
            "lari": "banza ba ta banza",
            "fr": "Ils/Elles pensent.",
            "en": "They think.",
            "verbForm": "banza"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbendji",
            "fr": "J'ai pensé.",
            "en": "I thought.",
            "verbForm": "bendji",
            "mandombe": "mbenji",
            "note": "En Mandombe on écrit mbenji ; la translittération latine reste mbendji."
          },
          {
            "person": "Tu",
            "lari": "bendji",
            "fr": "Tu as pensé.",
            "en": "You thought.",
            "verbForm": "bendji",
            "mandombe": "benji"
          },
          {
            "person": "Il/Elle",
            "lari": "bendji",
            "fr": "Il/Elle a pensé.",
            "en": "He/She thought.",
            "verbForm": "bendji",
            "mandombe": "benji"
          },
          {
            "person": "Nous",
            "lari": "tu bendji",
            "fr": "Nous avons pensé.",
            "en": "We thought.",
            "verbForm": "bendji",
            "mandombe": "tu benji"
          },
          {
            "person": "Vous",
            "lari": "lu bendji",
            "fr": "Vous avez pensé.",
            "en": "You (pl.) thought.",
            "verbForm": "bendji",
            "mandombe": "lu benji"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba bendji",
            "fr": "Ils/Elles ont pensé.",
            "en": "They thought.",
            "verbForm": "bendji",
            "mandombe": "ba benji"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni banza",
            "fr": "Je penserai.",
            "en": "I will think.",
            "verbForm": "banza",
            "note": "Le a de banza est long à l'oral : /ba:nza/."
          },
          {
            "person": "Tu",
            "lari": "mbo banza",
            "fr": "Tu penseras.",
            "en": "You will think.",
            "verbForm": "banza"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka banza",
            "fr": "Il/Elle pensera.",
            "en": "He/She will think.",
            "verbForm": "banza"
          },
          {
            "person": "Nous",
            "lari": "mbo tu banza",
            "fr": "Nous penserons.",
            "en": "We will think.",
            "verbForm": "banza"
          },
          {
            "person": "Vous",
            "lari": "mbo lu banza",
            "fr": "Vous penserez.",
            "en": "You (pl.) will think.",
            "verbForm": "banza"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba banza",
            "fr": "Ils/Elles penseront.",
            "en": "They will think.",
            "verbForm": "banza"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Futa",
    "meaning": "payer",
    "meaningEn": "to pay",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "futa ni ta futa",
            "fr": "Je paie.",
            "en": "I pay.",
            "verbForm": "futa"
          },
          {
            "person": "Tu",
            "lari": "futa ta futa",
            "fr": "Tu paies.",
            "en": "You pay.",
            "verbForm": "futa",
            "note": "Le ta est long à l'oral : /ta:/."
          },
          {
            "person": "Il/Elle",
            "lari": "futa ka ta futa",
            "fr": "Il/Elle paie.",
            "en": "He/She pays.",
            "verbForm": "futa"
          },
          {
            "person": "Nous",
            "lari": "futa tu ta futa",
            "fr": "Nous payons.",
            "en": "We pay.",
            "verbForm": "futa"
          },
          {
            "person": "Vous",
            "lari": "futa lu ta futa",
            "fr": "Vous payez.",
            "en": "You (pl.) pay.",
            "verbForm": "futa"
          },
          {
            "person": "Ils/Elles",
            "lari": "futa ba ta futa",
            "fr": "Ils/Elles paient.",
            "en": "They pay.",
            "verbForm": "futa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mfutiri",
            "fr": "J'ai payé.",
            "en": "I paid.",
            "verbForm": "futiri"
          },
          {
            "person": "Tu",
            "lari": "futiri",
            "fr": "Tu as payé.",
            "en": "You paid.",
            "verbForm": "futiri"
          },
          {
            "person": "Il/Elle",
            "lari": "futiri",
            "fr": "Il/Elle a payé.",
            "en": "He/She paid.",
            "verbForm": "futiri"
          },
          {
            "person": "Nous",
            "lari": "tu futiri",
            "fr": "Nous avons payé.",
            "en": "We paid.",
            "verbForm": "futiri"
          },
          {
            "person": "Vous",
            "lari": "lu futiri",
            "fr": "Vous avez payé.",
            "en": "You (pl.) paid.",
            "verbForm": "futiri"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba futiri",
            "fr": "Ils/Elles ont payé.",
            "en": "They paid.",
            "verbForm": "futiri"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni futa",
            "fr": "Je paierai.",
            "en": "I will pay.",
            "verbForm": "futa"
          },
          {
            "person": "Tu",
            "lari": "mbo futa",
            "fr": "Tu paieras.",
            "en": "You will pay.",
            "verbForm": "futa"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka futa",
            "fr": "Il/Elle paiera.",
            "en": "He/She will pay.",
            "verbForm": "futa"
          },
          {
            "person": "Nous",
            "lari": "mbo tu futa",
            "fr": "Nous paierons.",
            "en": "We will pay.",
            "verbForm": "futa"
          },
          {
            "person": "Vous",
            "lari": "mbo lu futa",
            "fr": "Vous paierez.",
            "en": "You (pl.) will pay.",
            "verbForm": "futa"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba futa",
            "fr": "Ils/Elles paieront.",
            "en": "They will pay.",
            "verbForm": "futa"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Wa",
    "meaning": "entendre, comprendre, sentir",
    "meaningEn": "to hear, to understand, to smell",
    "tenses": [
      {
        "tense": "Présent — sentir une odeur",
        "tenseEn": "Present — to smell",
        "rows": [
          {
            "person": "Je",
            "lari": "nsunga ni ta wa",
            "fr": "Je sens une odeur.",
            "en": "I smell.",
            "verbForm": "wa"
          },
          {
            "person": "Tu",
            "lari": "nsunga ta wa",
            "fr": "Tu sens une odeur.",
            "en": "You smell.",
            "verbForm": "wa"
          },
          {
            "person": "Il/Elle",
            "lari": "nsunga ka ta wa",
            "fr": "Il/Elle sent une odeur.",
            "en": "He/She smells.",
            "verbForm": "wa"
          },
          {
            "person": "Nous",
            "lari": "nsunga tu ta wa",
            "fr": "Nous sentons une odeur.",
            "en": "We smell.",
            "verbForm": "wa"
          },
          {
            "person": "Vous",
            "lari": "nsunga lu ta wa",
            "fr": "Vous sentez une odeur.",
            "en": "You (pl.) smell.",
            "verbForm": "wa"
          },
          {
            "person": "Ils/Elles",
            "lari": "nsunga ba ta wa",
            "fr": "Ils/Elles sentent une odeur.",
            "en": "They smell.",
            "verbForm": "wa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      }
    ]
  },
  {
    "verb": "Mona",
    "meaning": "voir",
    "meaningEn": "to see",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "mona ni ta mona",
            "fr": "Je vois.",
            "en": "I see.",
            "verbForm": "mona"
          },
          {
            "person": "Tu",
            "lari": "mona ta mona",
            "fr": "Tu vois.",
            "en": "You see.",
            "verbForm": "mona"
          },
          {
            "person": "Il/Elle",
            "lari": "mona ka ta mona",
            "fr": "Il/Elle voit.",
            "en": "He/She sees.",
            "verbForm": "mona"
          },
          {
            "person": "Nous",
            "lari": "mona tu ta mona",
            "fr": "Nous voyons.",
            "en": "We see.",
            "verbForm": "mona"
          },
          {
            "person": "Vous",
            "lari": "mona lu ta mona",
            "fr": "Vous voyez.",
            "en": "You (pl.) see.",
            "verbForm": "mona"
          },
          {
            "person": "Ils/Elles",
            "lari": "mona ba ta mona",
            "fr": "Ils/Elles voient.",
            "en": "They see.",
            "verbForm": "mona"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "muini",
            "fr": "J'ai vu.",
            "en": "I saw.",
            "verbForm": "muini"
          },
          {
            "person": "Tu",
            "lari": "muini",
            "fr": "Tu as vu.",
            "en": "You saw.",
            "verbForm": "muini"
          },
          {
            "person": "Il/Elle",
            "lari": "muini",
            "fr": "Il/Elle a vu.",
            "en": "He/She saw.",
            "verbForm": "muini"
          },
          {
            "person": "Nous",
            "lari": "tu muini",
            "fr": "Nous avons vu.",
            "en": "We saw.",
            "verbForm": "muini"
          },
          {
            "person": "Vous",
            "lari": "lu muini",
            "fr": "Vous avez vu.",
            "en": "You (pl.) saw.",
            "verbForm": "muini"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba muini",
            "fr": "Ils/Elles ont vu.",
            "en": "They saw.",
            "verbForm": "muini"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni mona",
            "fr": "Je verrai.",
            "en": "I will see.",
            "verbForm": "mona"
          },
          {
            "person": "Tu",
            "lari": "mbo mona",
            "fr": "Tu verras.",
            "en": "You will see.",
            "verbForm": "mona"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka mona",
            "fr": "Il/Elle verra.",
            "en": "He/She will see.",
            "verbForm": "mona"
          },
          {
            "person": "Nous",
            "lari": "mbo tu mona",
            "fr": "Nous verrons.",
            "en": "We will see.",
            "verbForm": "mona"
          },
          {
            "person": "Vous",
            "lari": "mbo lu mona",
            "fr": "Vous verrez.",
            "en": "You (pl.) will see.",
            "verbForm": "mona"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba mona",
            "fr": "Ils/Elles verront.",
            "en": "They will see.",
            "verbForm": "mona"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Tshioji ... mona",
    "meaning": "avoir froid (litt. sentir le froid)",
    "meaningEn": "to be cold (lit. to feel the cold)",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "tshioji ni ta mona",
            "fr": "J'ai froid.",
            "en": "I am cold.",
            "verbForm": "mona"
          },
          {
            "person": "Tu",
            "lari": "tshioji ta mona",
            "fr": "Tu as froid.",
            "en": "You are cold.",
            "verbForm": "mona"
          },
          {
            "person": "Il/Elle",
            "lari": "tshioji ka ta mona",
            "fr": "Il/Elle a froid.",
            "en": "He/She is cold.",
            "verbForm": "mona"
          },
          {
            "person": "Nous",
            "lari": "tshioji tu ta mona",
            "fr": "Nous avons froid.",
            "en": "We are cold.",
            "verbForm": "mona"
          },
          {
            "person": "Vous",
            "lari": "tshioji lu ta mona",
            "fr": "Vous avez froid.",
            "en": "You (pl.) are cold.",
            "verbForm": "mona"
          },
          {
            "person": "Ils/Elles",
            "lari": "tshioji ba ta mona",
            "fr": "Ils/Elles ont froid.",
            "en": "They are cold.",
            "verbForm": "mona"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      }
    ]
  },
  {
    "verb": "Tiya ... mona",
    "meaning": "avoir chaud (litt. sentir la chaleur)",
    "meaningEn": "to be hot (lit. to feel the heat)",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "tiya ni ta mona",
            "fr": "J'ai chaud.",
            "en": "I am hot.",
            "verbForm": "mona"
          },
          {
            "person": "Tu",
            "lari": "tiya ta mona",
            "fr": "Tu as chaud.",
            "en": "You are hot.",
            "verbForm": "mona"
          },
          {
            "person": "Il/Elle",
            "lari": "tiya ka ta mona",
            "fr": "Il/Elle a chaud.",
            "en": "He/She is hot.",
            "verbForm": "mona"
          },
          {
            "person": "Nous",
            "lari": "tiya tu ta mona",
            "fr": "Nous avons chaud.",
            "en": "We are hot.",
            "verbForm": "mona"
          },
          {
            "person": "Vous",
            "lari": "tiya lu ta mona",
            "fr": "Vous avez chaud.",
            "en": "You (pl.) are hot.",
            "verbForm": "mona"
          },
          {
            "person": "Ils/Elles",
            "lari": "tiya ba ta mona",
            "fr": "Ils/Elles ont chaud.",
            "en": "They are hot.",
            "verbForm": "mona"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "Tiya mwini",
            "fr": "J'ai eu chaud.",
            "en": "I felt the heat.",
            "verbForm": "mwini"
          },
          {
            "person": "Tu",
            "lari": "Tiya mwini",
            "fr": "Tu as eu chaud.",
            "en": "You felt the heat.",
            "verbForm": "mwini"
          },
          {
            "person": "Il/Elle",
            "lari": "Tiya ka mwini",
            "fr": "Il/Elle a eu chaud.",
            "en": "He/She felt the heat.",
            "verbForm": "mwini"
          },
          {
            "person": "Nous",
            "lari": "Tiya tu mwini",
            "fr": "Nous avons eu chaud.",
            "en": "We felt the heat.",
            "verbForm": "mwini"
          },
          {
            "person": "Vous",
            "lari": "Tiya lu mwini",
            "fr": "Vous avez eu chaud.",
            "en": "You (pl.) felt the heat.",
            "verbForm": "mwini"
          },
          {
            "person": "Ils/Elles",
            "lari": "Tiya ba mwini",
            "fr": "Ils/Elles ont eu chaud.",
            "en": "They felt the heat.",
            "verbForm": "mwini"
          }
        ]
      }
    ]
  },
  {
    "verb": "Baka nsatu",
    "meaning": "avoir faim (litt. obtenir la faim)",
    "meaningEn": "to be hungry (lit. to get hunger)",
    "tenses": [
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni baka nsatu",
            "fr": "Je sentirai la faim.",
            "en": "I will be hungry.",
            "verbForm": "baka"
          },
          {
            "person": "Tu",
            "lari": "mbo baka nsatu",
            "fr": "Tu sentiras la faim.",
            "en": "You will be hungry.",
            "verbForm": "baka"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka baka nsatu",
            "fr": "Il/Elle sentira la faim.",
            "en": "He/She will be hungry.",
            "verbForm": "baka"
          },
          {
            "person": "Nous",
            "lari": "mbo tu baka nsatu",
            "fr": "Nous sentirons la faim.",
            "en": "We will be hungry.",
            "verbForm": "baka"
          },
          {
            "person": "Vous",
            "lari": "mbo lu baka nsatu",
            "fr": "Vous sentirez la faim.",
            "en": "You (pl.) will be hungry.",
            "verbForm": "baka"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba baka nsatu",
            "fr": "Ils/Elles sentiront la faim.",
            "en": "They will be hungry.",
            "verbForm": "baka"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "baka = avoir, obtenir."
  },
  {
    "verb": "Zola",
    "meaning": "aimer, vouloir",
    "meaningEn": "to love, to want",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "nzololo",
            "fr": "Je veux.",
            "en": "I want.",
            "verbForm": "zololo"
          },
          {
            "person": "Tu",
            "lari": "zololo",
            "fr": "Tu veux.",
            "en": "You want.",
            "verbForm": "zololo"
          },
          {
            "person": "Il/Elle",
            "lari": "zololo",
            "fr": "Il/Elle veut.",
            "en": "He/She wants.",
            "verbForm": "zololo"
          },
          {
            "person": "Nous",
            "lari": "tu zololo",
            "fr": "Nous voulons.",
            "en": "We want.",
            "verbForm": "zololo"
          },
          {
            "person": "Vous",
            "lari": "lu zololo",
            "fr": "Vous voulez.",
            "en": "You (pl.) want.",
            "verbForm": "zololo"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba zololo",
            "fr": "Ils/Elles veulent.",
            "en": "They want.",
            "verbForm": "zololo"
          }
        ]
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "na zolo",
            "fr": "J'ai voulu.",
            "en": "I wanted.",
            "verbForm": "zolo"
          },
          {
            "person": "Tu",
            "lari": "wa zolo",
            "fr": "Tu as voulu.",
            "en": "You wanted.",
            "verbForm": "zolo"
          },
          {
            "person": "Il/Elle",
            "lari": "wa zolo",
            "fr": "Il/Elle a voulu.",
            "en": "He/She wanted.",
            "verbForm": "zolo"
          },
          {
            "person": "Nous",
            "lari": "ta zolo",
            "fr": "Nous avons voulu.",
            "en": "We wanted.",
            "verbForm": "zolo"
          },
          {
            "person": "Vous",
            "lari": "lua zolo",
            "fr": "Vous avez voulu.",
            "en": "You (pl.) wanted.",
            "verbForm": "zolo"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba zolo",
            "fr": "Ils/Elles ont voulu.",
            "en": "They wanted.",
            "verbForm": "zolo"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni zolo",
            "fr": "Je voudrai.",
            "en": "I will want.",
            "verbForm": "zolo"
          },
          {
            "person": "Tu",
            "lari": "mbo zolo",
            "fr": "Tu voudras.",
            "en": "You will want.",
            "verbForm": "zolo"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka zolo",
            "fr": "Il/Elle voudra.",
            "en": "He/She will want.",
            "verbForm": "zolo"
          },
          {
            "person": "Nous",
            "lari": "mbo tu zolo",
            "fr": "Nous voudrons.",
            "en": "We will want.",
            "verbForm": "zolo"
          },
          {
            "person": "Vous",
            "lari": "mbo lu zolo",
            "fr": "Vous voudrez.",
            "en": "You (pl.) will want.",
            "verbForm": "zolo"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba zolo",
            "fr": "Ils/Elles voudront.",
            "en": "They will want.",
            "verbForm": "zolo"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Sala",
    "meaning": "travailler, fabriquer",
    "meaningEn": "to work, to make",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "sala ni ta sala",
            "fr": "Je travaille.",
            "en": "I work.",
            "verbForm": "sala"
          },
          {
            "person": "Tu",
            "lari": "sala ta sala",
            "fr": "Tu travailles.",
            "en": "You work.",
            "verbForm": "sala"
          },
          {
            "person": "Il/Elle",
            "lari": "sala ka ta sala",
            "fr": "Il/Elle travaille.",
            "en": "He/She works.",
            "verbForm": "sala"
          },
          {
            "person": "Nous",
            "lari": "sala tu ta sala",
            "fr": "Nous travaillons.",
            "en": "We work.",
            "verbForm": "sala"
          },
          {
            "person": "Vous",
            "lari": "sala lu ta sala",
            "fr": "Vous travaillez.",
            "en": "You (pl.) work.",
            "verbForm": "sala"
          },
          {
            "person": "Ils/Elles",
            "lari": "sala ba ta sala",
            "fr": "Ils/Elles travaillent.",
            "en": "They work.",
            "verbForm": "sala"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nsaridi",
            "fr": "J'ai travaillé.",
            "en": "I worked.",
            "verbForm": "saridi"
          },
          {
            "person": "Tu",
            "lari": "saridi",
            "fr": "Tu as travaillé.",
            "en": "You worked.",
            "verbForm": "saridi"
          },
          {
            "person": "Il/Elle",
            "lari": "saridi",
            "fr": "Il/Elle a travaillé.",
            "en": "He/She worked.",
            "verbForm": "saridi",
            "note": "Le a est long à l'oral : /sa:ridi/."
          },
          {
            "person": "Nous",
            "lari": "tu saridi",
            "fr": "Nous avons travaillé.",
            "en": "We worked.",
            "verbForm": "saridi"
          },
          {
            "person": "Vous",
            "lari": "lu saridi",
            "fr": "Vous avez travaillé.",
            "en": "You (pl.) worked.",
            "verbForm": "saridi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba saridi",
            "fr": "Ils/Elles ont travaillé.",
            "en": "They worked.",
            "verbForm": "saridi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni sala",
            "fr": "Je travaillerai.",
            "en": "I will work.",
            "verbForm": "sala"
          },
          {
            "person": "Tu",
            "lari": "mbo sala",
            "fr": "Tu travailleras.",
            "en": "You will work.",
            "verbForm": "sala"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka sala",
            "fr": "Il/Elle travaillera.",
            "en": "He/She will work.",
            "verbForm": "sala"
          },
          {
            "person": "Nous",
            "lari": "mbo tu sala",
            "fr": "Nous travaillerons.",
            "en": "We will work.",
            "verbForm": "sala"
          },
          {
            "person": "Vous",
            "lari": "mbo lu sala",
            "fr": "Vous travaillerez.",
            "en": "You (pl.) will work.",
            "verbForm": "sala"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba sala",
            "fr": "Ils/Elles travailleront.",
            "en": "They will work.",
            "verbForm": "sala"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Sala",
    "meaning": "rester",
    "meaningEn": "to stay",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "sala ni ta sala",
            "fr": "Je reste.",
            "en": "I stay.",
            "verbForm": "sala"
          },
          {
            "person": "Tu",
            "lari": "sala ta sala",
            "fr": "Tu restes.",
            "en": "You stay.",
            "verbForm": "sala"
          },
          {
            "person": "Il/Elle",
            "lari": "sala ka ta sala",
            "fr": "Il/Elle reste.",
            "en": "He/She stays.",
            "verbForm": "sala"
          },
          {
            "person": "Nous",
            "lari": "sala tu ta sala",
            "fr": "Nous restons.",
            "en": "We stay.",
            "verbForm": "sala"
          },
          {
            "person": "Vous",
            "lari": "sala lu ta sala",
            "fr": "Vous restez.",
            "en": "You (pl.) stay.",
            "verbForm": "sala"
          },
          {
            "person": "Ils/Elles",
            "lari": "sala ba ta sala",
            "fr": "Ils/Elles restent.",
            "en": "They stay.",
            "verbForm": "sala"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ntshiri",
            "fr": "Je suis resté.",
            "en": "I stayed.",
            "verbForm": "shiri",
            "note": "Homographe : ntshiri / shiri est aussi le passé de sa (faire)."
          },
          {
            "person": "Tu",
            "lari": "shiri",
            "fr": "Tu es resté.",
            "en": "You stayed.",
            "verbForm": "shiri"
          },
          {
            "person": "Il/Elle",
            "lari": "shiri",
            "fr": "Il/Elle est resté.",
            "en": "He/She stayed.",
            "verbForm": "shiri",
            "note": "Le i est long à l'oral : /shi:ri/."
          },
          {
            "person": "Nous",
            "lari": "tu shiri",
            "fr": "Nous sommes restés.",
            "en": "We stayed.",
            "verbForm": "shiri"
          },
          {
            "person": "Vous",
            "lari": "lu shiri",
            "fr": "Vous êtes restés.",
            "en": "You (pl.) stayed.",
            "verbForm": "shiri"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba shiri",
            "fr": "Ils/Elles sont restés.",
            "en": "They stayed.",
            "verbForm": "shiri"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni sala",
            "fr": "Je resterai.",
            "en": "I will stay.",
            "verbForm": "sala"
          },
          {
            "person": "Tu",
            "lari": "mbo sala",
            "fr": "Tu resteras.",
            "en": "You will stay.",
            "verbForm": "sala"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka sala",
            "fr": "Il/Elle restera.",
            "en": "He/She will stay.",
            "verbForm": "sala"
          },
          {
            "person": "Nous",
            "lari": "mbo tu sala",
            "fr": "Nous resterons.",
            "en": "We will stay.",
            "verbForm": "sala"
          },
          {
            "person": "Vous",
            "lari": "mbo lu sala",
            "fr": "Vous resterez.",
            "en": "You (pl.) will stay.",
            "verbForm": "sala"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba sala",
            "fr": "Ils/Elles resteront.",
            "en": "They will stay.",
            "verbForm": "sala"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "À l'oral, le a de sa:la (rester) est long : c'est ce qui le distingue de sala (travailler)."
  },
  {
    "verb": "Sukula",
    "meaning": "laver",
    "meaningEn": "to wash",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "sukula ni ta sukula",
            "fr": "Je lave.",
            "en": "I wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Tu",
            "lari": "sukula ta sukula",
            "fr": "Tu laves.",
            "en": "You wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Il/Elle",
            "lari": "sukula ka ta sukula",
            "fr": "Il/Elle lave.",
            "en": "He/She washes.",
            "verbForm": "sukula"
          },
          {
            "person": "Nous",
            "lari": "sukula tu ta sukula",
            "fr": "Nous lavons.",
            "en": "We wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Vous",
            "lari": "sukula lu ta sukula",
            "fr": "Vous lavez.",
            "en": "You (pl.) wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Ils/Elles",
            "lari": "sukula ba ta sukula",
            "fr": "Ils/Elles lavent.",
            "en": "They wash.",
            "verbForm": "sukula"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nsukuri",
            "fr": "J'ai lavé.",
            "en": "I washed.",
            "verbForm": "sukuri"
          },
          {
            "person": "Tu",
            "lari": "sukuri",
            "fr": "Tu as lavé.",
            "en": "You washed.",
            "verbForm": "sukuri"
          },
          {
            "person": "Il/Elle",
            "lari": "sukuri",
            "fr": "Il/Elle a lavé.",
            "en": "He/She washed.",
            "verbForm": "sukuri",
            "note": "Le u est long à l'oral : /su:kuri/."
          },
          {
            "person": "Nous",
            "lari": "tu sukuri",
            "fr": "Nous avons lavé.",
            "en": "We washed.",
            "verbForm": "sukuri"
          },
          {
            "person": "Vous",
            "lari": "lu sukuri",
            "fr": "Vous avez lavé.",
            "en": "You (pl.) washed.",
            "verbForm": "sukuri"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba sukuri",
            "fr": "Ils/Elles ont lavé.",
            "en": "They washed.",
            "verbForm": "sukuri"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni sukula",
            "fr": "Je laverai.",
            "en": "I will wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Tu",
            "lari": "mbo sukula",
            "fr": "Tu laveras.",
            "en": "You will wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka sukula",
            "fr": "Il/Elle lavera.",
            "en": "He/She will wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Nous",
            "lari": "mbo tu sukula",
            "fr": "Nous laverons.",
            "en": "We will wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Vous",
            "lari": "mbo lu sukula",
            "fr": "Vous laverez.",
            "en": "You (pl.) will wash.",
            "verbForm": "sukula"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba sukula",
            "fr": "Ils/Elles laveront.",
            "en": "They will wash.",
            "verbForm": "sukula"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "Suaka veut aussi dire laver, mais il est peu usité."
  },
  {
    "verb": "Soba",
    "meaning": "changer",
    "meaningEn": "to change",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "soba ni ta soba",
            "fr": "Je change.",
            "en": "I change.",
            "verbForm": "soba"
          },
          {
            "person": "Tu",
            "lari": "soba ta soba",
            "fr": "Tu changes.",
            "en": "You change.",
            "verbForm": "soba"
          },
          {
            "person": "Il/Elle",
            "lari": "soba ka ta soba",
            "fr": "Il/Elle change.",
            "en": "He/She changes.",
            "verbForm": "soba"
          },
          {
            "person": "Nous",
            "lari": "soba tu ta soba",
            "fr": "Nous changeons.",
            "en": "We change.",
            "verbForm": "soba"
          },
          {
            "person": "Vous",
            "lari": "soba lu ta soba",
            "fr": "Vous changez.",
            "en": "You (pl.) change.",
            "verbForm": "soba"
          },
          {
            "person": "Ils/Elles",
            "lari": "soba ba ta soba",
            "fr": "Ils/Elles changent.",
            "en": "They change.",
            "verbForm": "soba"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nsobele",
            "fr": "J'ai changé.",
            "en": "I changed.",
            "verbForm": "sobele"
          },
          {
            "person": "Tu",
            "lari": "sobele",
            "fr": "Tu as changé.",
            "en": "You changed.",
            "verbForm": "sobele"
          },
          {
            "person": "Il/Elle",
            "lari": "sobele",
            "fr": "Il/Elle a changé.",
            "en": "He/She changed.",
            "verbForm": "sobele"
          },
          {
            "person": "Nous",
            "lari": "tu sobele",
            "fr": "Nous avons changé.",
            "en": "We changed.",
            "verbForm": "sobele"
          },
          {
            "person": "Vous",
            "lari": "lu sobele",
            "fr": "Vous avez changé.",
            "en": "You (pl.) changed.",
            "verbForm": "sobele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba sobele",
            "fr": "Ils/Elles ont changé.",
            "en": "They changed.",
            "verbForm": "sobele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni soba",
            "fr": "Je changerai.",
            "en": "I will change.",
            "verbForm": "soba"
          },
          {
            "person": "Tu",
            "lari": "mbo soba",
            "fr": "Tu changeras.",
            "en": "You will change.",
            "verbForm": "soba"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka soba",
            "fr": "Il/Elle changera.",
            "en": "He/She will change.",
            "verbForm": "soba"
          },
          {
            "person": "Nous",
            "lari": "mbo tu soba",
            "fr": "Nous changerons.",
            "en": "We will change.",
            "verbForm": "soba"
          },
          {
            "person": "Vous",
            "lari": "mbo lu soba",
            "fr": "Vous changerez.",
            "en": "You (pl.) will change.",
            "verbForm": "soba"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba soba",
            "fr": "Ils/Elles changeront.",
            "en": "They will change.",
            "verbForm": "soba"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Teka",
    "meaning": "vendre, trahir",
    "meaningEn": "to sell, to betray",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "teka ni ta teka",
            "fr": "Je vends.",
            "en": "I sell.",
            "verbForm": "teka"
          },
          {
            "person": "Tu",
            "lari": "teka ta teka",
            "fr": "Tu vends.",
            "en": "You sell.",
            "verbForm": "teka"
          },
          {
            "person": "Il/Elle",
            "lari": "teka ka ta teka",
            "fr": "Il/Elle vend.",
            "en": "He/She sells.",
            "verbForm": "teka"
          },
          {
            "person": "Nous",
            "lari": "teka tu ta teka",
            "fr": "Nous vendons.",
            "en": "We sell.",
            "verbForm": "teka"
          },
          {
            "person": "Vous",
            "lari": "teka lu ta teka",
            "fr": "Vous vendez.",
            "en": "You (pl.) sell.",
            "verbForm": "teka"
          },
          {
            "person": "Ils/Elles",
            "lari": "teka ba ta teka",
            "fr": "Ils/Elles vendent.",
            "en": "They sell.",
            "verbForm": "teka"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ntekele",
            "fr": "J'ai vendu.",
            "en": "I sold.",
            "verbForm": "tekele"
          },
          {
            "person": "Tu",
            "lari": "tekele",
            "fr": "Tu as vendu.",
            "en": "You sold.",
            "verbForm": "tekele"
          },
          {
            "person": "Il/Elle",
            "lari": "tekele",
            "fr": "Il/Elle a vendu.",
            "en": "He/She sold.",
            "verbForm": "tekele"
          },
          {
            "person": "Nous",
            "lari": "tu tekele",
            "fr": "Nous avons vendu.",
            "en": "We sold.",
            "verbForm": "tekele"
          },
          {
            "person": "Vous",
            "lari": "lu tekele",
            "fr": "Vous avez vendu.",
            "en": "You (pl.) sold.",
            "verbForm": "tekele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba tekele",
            "fr": "Ils/Elles ont vendu.",
            "en": "They sold.",
            "verbForm": "tekele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni teka",
            "fr": "Je vendrai.",
            "en": "I will sell.",
            "verbForm": "teka"
          },
          {
            "person": "Tu",
            "lari": "mbo teka",
            "fr": "Tu vendras.",
            "en": "You will sell.",
            "verbForm": "teka"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka teka",
            "fr": "Il/Elle vendra.",
            "en": "He/She will sell.",
            "verbForm": "teka"
          },
          {
            "person": "Nous",
            "lari": "mbo tu teka",
            "fr": "Nous vendrons.",
            "en": "We will sell.",
            "verbForm": "teka"
          },
          {
            "person": "Vous",
            "lari": "mbo lu teka",
            "fr": "Vous vendrez.",
            "en": "You (pl.) will sell.",
            "verbForm": "teka"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba teka",
            "fr": "Ils/Elles vendront.",
            "en": "They will sell.",
            "verbForm": "teka"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Tanga",
    "meaning": "lire, chanter",
    "meaningEn": "to read, to sing",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "tanga ni ta tanga",
            "fr": "Je lis.",
            "en": "I read.",
            "verbForm": "tanga"
          },
          {
            "person": "Tu",
            "lari": "tanga ta tanga",
            "fr": "Tu lis.",
            "en": "You read.",
            "verbForm": "tanga"
          },
          {
            "person": "Il/Elle",
            "lari": "tanga ka ta tanga",
            "fr": "Il/Elle lit.",
            "en": "He/She reads.",
            "verbForm": "tanga"
          },
          {
            "person": "Nous",
            "lari": "tanga tu ta tanga",
            "fr": "Nous lisons.",
            "en": "We read.",
            "verbForm": "tanga"
          },
          {
            "person": "Vous",
            "lari": "tanga lu ta tanga",
            "fr": "Vous lisez.",
            "en": "You (pl.) read.",
            "verbForm": "tanga"
          },
          {
            "person": "Ils/Elles",
            "lari": "tanga ba ta tanga",
            "fr": "Ils/Elles lisent.",
            "en": "They read.",
            "verbForm": "tanga"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ntengi",
            "fr": "J'ai lu.",
            "en": "I read.",
            "verbForm": "tengi"
          },
          {
            "person": "Tu",
            "lari": "tengi",
            "fr": "Tu as lu.",
            "en": "You read.",
            "verbForm": "tengi"
          },
          {
            "person": "Il/Elle",
            "lari": "tengi",
            "fr": "Il/Elle a lu.",
            "en": "He/She read.",
            "verbForm": "tengi"
          },
          {
            "person": "Nous",
            "lari": "tu tengi",
            "fr": "Nous avons lu.",
            "en": "We read.",
            "verbForm": "tengi"
          },
          {
            "person": "Vous",
            "lari": "lu tengi",
            "fr": "Vous avez lu.",
            "en": "You (pl.) read.",
            "verbForm": "tengi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba tengi",
            "fr": "Ils/Elles ont lu.",
            "en": "They read.",
            "verbForm": "tengi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni tanga",
            "fr": "Je lirai.",
            "en": "I will read.",
            "verbForm": "tanga"
          },
          {
            "person": "Tu",
            "lari": "mbo tanga",
            "fr": "Tu liras.",
            "en": "You will read.",
            "verbForm": "tanga"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka tanga",
            "fr": "Il/Elle lira.",
            "en": "He/She will read.",
            "verbForm": "tanga"
          },
          {
            "person": "Nous",
            "lari": "mbo tu tanga",
            "fr": "Nous lirons.",
            "en": "We will read.",
            "verbForm": "tanga"
          },
          {
            "person": "Vous",
            "lari": "mbo lu tanga",
            "fr": "Vous lirez.",
            "en": "You (pl.) will read.",
            "verbForm": "tanga"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba tanga",
            "fr": "Ils/Elles liront.",
            "en": "They will read.",
            "verbForm": "tanga"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Sola",
    "meaning": "choisir",
    "meaningEn": "to choose",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "sola ni ta sola",
            "fr": "Je choisis.",
            "en": "I choose.",
            "verbForm": "sola"
          },
          {
            "person": "Tu",
            "lari": "sola ta sola",
            "fr": "Tu choisis.",
            "en": "You choose.",
            "verbForm": "sola"
          },
          {
            "person": "Il/Elle",
            "lari": "sola ka ta sola",
            "fr": "Il/Elle choisit.",
            "en": "He/She chooses.",
            "verbForm": "sola"
          },
          {
            "person": "Nous",
            "lari": "sola tu ta sola",
            "fr": "Nous choisissons.",
            "en": "We choose.",
            "verbForm": "sola"
          },
          {
            "person": "Vous",
            "lari": "sola lu ta sola",
            "fr": "Vous choisissez.",
            "en": "You (pl.) choose.",
            "verbForm": "sola"
          },
          {
            "person": "Ils/Elles",
            "lari": "sola ba ta sola",
            "fr": "Ils/Elles choisissent.",
            "en": "They choose.",
            "verbForm": "sola"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nsolele",
            "fr": "J'ai choisi.",
            "en": "I chose.",
            "verbForm": "solele"
          },
          {
            "person": "Tu",
            "lari": "solele",
            "fr": "Tu as choisi.",
            "en": "You chose.",
            "verbForm": "solele"
          },
          {
            "person": "Il/Elle",
            "lari": "solele",
            "fr": "Il/Elle a choisi.",
            "en": "He/She chose.",
            "verbForm": "solele"
          },
          {
            "person": "Nous",
            "lari": "tu solele",
            "fr": "Nous avons choisi.",
            "en": "We chose.",
            "verbForm": "solele"
          },
          {
            "person": "Vous",
            "lari": "lu solele",
            "fr": "Vous avez choisi.",
            "en": "You (pl.) chose.",
            "verbForm": "solele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba solele",
            "fr": "Ils/Elles ont choisi.",
            "en": "They chose.",
            "verbForm": "solele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni sola",
            "fr": "Je choisirai.",
            "en": "I will choose.",
            "verbForm": "sola"
          },
          {
            "person": "Tu",
            "lari": "mbo sola",
            "fr": "Tu choisiras.",
            "en": "You will choose.",
            "verbForm": "sola"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka sola",
            "fr": "Il/Elle choisira.",
            "en": "He/She will choose.",
            "verbForm": "sola"
          },
          {
            "person": "Nous",
            "lari": "mbo tu sola",
            "fr": "Nous choisirons.",
            "en": "We will choose.",
            "verbForm": "sola"
          },
          {
            "person": "Vous",
            "lari": "mbo lu sola",
            "fr": "Vous choisirez.",
            "en": "You (pl.) will choose.",
            "verbForm": "sola"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba sola",
            "fr": "Ils/Elles choisiront.",
            "en": "They will choose.",
            "verbForm": "sola"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Yela",
    "meaning": "essayer",
    "meaningEn": "to try",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "yela ni ta yela",
            "fr": "J'essaie.",
            "en": "I try.",
            "verbForm": "yela"
          },
          {
            "person": "Tu",
            "lari": "yela ta yela",
            "fr": "Tu essaies.",
            "en": "You try.",
            "verbForm": "yela"
          },
          {
            "person": "Il/Elle",
            "lari": "yela ka ta yela",
            "fr": "Il/Elle essaie.",
            "en": "He/She tries.",
            "verbForm": "yela"
          },
          {
            "person": "Nous",
            "lari": "yela tu ta yela",
            "fr": "Nous essayons.",
            "en": "We try.",
            "verbForm": "yela"
          },
          {
            "person": "Vous",
            "lari": "yela lu ta yela",
            "fr": "Vous essayez.",
            "en": "You (pl.) try.",
            "verbForm": "yela"
          },
          {
            "person": "Ils/Elles",
            "lari": "yela ba ta yela",
            "fr": "Ils/Elles essaient.",
            "en": "They try.",
            "verbForm": "yela"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "njelele",
            "fr": "J'ai essayé.",
            "en": "I tried.",
            "verbForm": "yelele"
          },
          {
            "person": "Tu",
            "lari": "yelele",
            "fr": "Tu as essayé.",
            "en": "You tried.",
            "verbForm": "yelele"
          },
          {
            "person": "Il/Elle",
            "lari": "yelele",
            "fr": "Il/Elle a essayé.",
            "en": "He/She tried.",
            "verbForm": "yelele"
          },
          {
            "person": "Nous",
            "lari": "tu yelele",
            "fr": "Nous avons essayé.",
            "en": "We tried.",
            "verbForm": "yelele"
          },
          {
            "person": "Vous",
            "lari": "lu yelele",
            "fr": "Vous avez essayé.",
            "en": "You (pl.) tried.",
            "verbForm": "yelele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba yelele",
            "fr": "Ils/Elles ont essayé.",
            "en": "They tried.",
            "verbForm": "yelele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni yela",
            "fr": "J'essaierai.",
            "en": "I will try.",
            "verbForm": "yela"
          },
          {
            "person": "Tu",
            "lari": "mbo yela",
            "fr": "Tu essaieras.",
            "en": "You will try.",
            "verbForm": "yela"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka yela",
            "fr": "Il/Elle essaiera.",
            "en": "He/She will try.",
            "verbForm": "yela"
          },
          {
            "person": "Nous",
            "lari": "mbo tu yela",
            "fr": "Nous essaierons.",
            "en": "We will try.",
            "verbForm": "yela"
          },
          {
            "person": "Vous",
            "lari": "mbo lu yela",
            "fr": "Vous essaierez.",
            "en": "You (pl.) will try.",
            "verbForm": "yela"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba yela",
            "fr": "Ils/Elles essaieront.",
            "en": "They will try.",
            "verbForm": "yela"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Bakisa",
    "meaning": "aider",
    "meaningEn": "to help",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "bakisa ni ta bakisa",
            "fr": "J'aide.",
            "en": "I help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Tu",
            "lari": "bakisa ta bakisa",
            "fr": "Tu aides.",
            "en": "You help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Il/Elle",
            "lari": "bakisa ka ta bakisa",
            "fr": "Il/Elle aide.",
            "en": "He/She helps.",
            "verbForm": "bakisa"
          },
          {
            "person": "Nous",
            "lari": "bakisa tu ta bakisa",
            "fr": "Nous aidons.",
            "en": "We help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Vous",
            "lari": "bakisa lu ta bakisa",
            "fr": "Vous aidez.",
            "en": "You (pl.) help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Ils/Elles",
            "lari": "bakisa ba ta bakisa",
            "fr": "Ils/Elles aident.",
            "en": "They help.",
            "verbForm": "bakisa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbakishi",
            "fr": "J'ai aidé.",
            "en": "I helped.",
            "verbForm": "bakishi"
          },
          {
            "person": "Tu",
            "lari": "bakishi",
            "fr": "Tu as aidé.",
            "en": "You helped.",
            "verbForm": "bakishi"
          },
          {
            "person": "Il/Elle",
            "lari": "bakishi",
            "fr": "Il/Elle a aidé.",
            "en": "He/She helped.",
            "verbForm": "bakishi"
          },
          {
            "person": "Nous",
            "lari": "tu bakishi",
            "fr": "Nous avons aidé.",
            "en": "We helped.",
            "verbForm": "bakishi"
          },
          {
            "person": "Vous",
            "lari": "lu bakishi",
            "fr": "Vous avez aidé.",
            "en": "You (pl.) helped.",
            "verbForm": "bakishi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba bakishi",
            "fr": "Ils/Elles ont aidé.",
            "en": "They helped.",
            "verbForm": "bakishi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni bakisa",
            "fr": "J'aiderai.",
            "en": "I will help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Tu",
            "lari": "mbo bakisa",
            "fr": "Tu aideras.",
            "en": "You will help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka bakisa",
            "fr": "Il/Elle aidera.",
            "en": "He/She will help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Nous",
            "lari": "mbo tu bakisa",
            "fr": "Nous aiderons.",
            "en": "We will help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Vous",
            "lari": "mbo lu bakisa",
            "fr": "Vous aiderez.",
            "en": "You (pl.) will help.",
            "verbForm": "bakisa"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba bakisa",
            "fr": "Ils/Elles aideront.",
            "en": "They will help.",
            "verbForm": "bakisa"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Lamba",
    "meaning": "préparer la nourriture, cuire",
    "meaningEn": "to prepare food, to cook",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "lamba ni ta lamba",
            "fr": "Je prépare.",
            "en": "I cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Tu",
            "lari": "lamba ta lamba",
            "fr": "Tu prépares.",
            "en": "You cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Il/Elle",
            "lari": "lamba ka ta lamba",
            "fr": "Il/Elle prépare.",
            "en": "He/She cooks.",
            "verbForm": "lamba"
          },
          {
            "person": "Nous",
            "lari": "lamba tu ta lamba",
            "fr": "Nous préparons.",
            "en": "We cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Vous",
            "lari": "lamba lu ta lamba",
            "fr": "Vous préparez.",
            "en": "You (pl.) cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Ils/Elles",
            "lari": "lamba ba ta lamba",
            "fr": "Ils/Elles préparent.",
            "en": "They cook.",
            "verbForm": "lamba"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ndembi",
            "fr": "J'ai préparé.",
            "en": "I cooked.",
            "verbForm": "lembi"
          },
          {
            "person": "Tu",
            "lari": "lembi",
            "fr": "Tu as préparé.",
            "en": "You cooked.",
            "verbForm": "lembi"
          },
          {
            "person": "Il/Elle",
            "lari": "lembi",
            "fr": "Il/Elle a préparé.",
            "en": "He/She cooked.",
            "verbForm": "lembi"
          },
          {
            "person": "Nous",
            "lari": "tu lembi",
            "fr": "Nous avons préparé.",
            "en": "We cooked.",
            "verbForm": "lembi"
          },
          {
            "person": "Vous",
            "lari": "lu lembi",
            "fr": "Vous avez préparé.",
            "en": "You (pl.) cooked.",
            "verbForm": "lembi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba lembi",
            "fr": "Ils/Elles ont préparé.",
            "en": "They cooked.",
            "verbForm": "lembi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni lamba",
            "fr": "Je préparerai.",
            "en": "I will cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Tu",
            "lari": "mbo lamba",
            "fr": "Tu prépareras.",
            "en": "You will cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka lamba",
            "fr": "Il/Elle préparera.",
            "en": "He/She will cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Nous",
            "lari": "mbo tu lamba",
            "fr": "Nous préparerons.",
            "en": "We will cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Vous",
            "lari": "mbo lu lamba",
            "fr": "Vous préparerez.",
            "en": "You (pl.) will cook.",
            "verbForm": "lamba"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba lamba",
            "fr": "Ils/Elles prépareront.",
            "en": "They will cook.",
            "verbForm": "lamba"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "Préparer son sac se dit yirika, pas lamba."
  },
  {
    "verb": "Landa",
    "meaning": "suivre",
    "meaningEn": "to follow",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "landa ni ta landa",
            "fr": "Je suis.",
            "en": "I follow.",
            "verbForm": "landa"
          },
          {
            "person": "Tu",
            "lari": "landa ta landa",
            "fr": "Tu suis.",
            "en": "You follow.",
            "verbForm": "landa"
          },
          {
            "person": "Il/Elle",
            "lari": "landa ka ta landa",
            "fr": "Il/Elle suit.",
            "en": "He/She follows.",
            "verbForm": "landa"
          },
          {
            "person": "Nous",
            "lari": "landa tu ta landa",
            "fr": "Nous suivons.",
            "en": "We follow.",
            "verbForm": "landa"
          },
          {
            "person": "Vous",
            "lari": "landa lu ta landa",
            "fr": "Vous suivez.",
            "en": "You (pl.) follow.",
            "verbForm": "landa"
          },
          {
            "person": "Ils/Elles",
            "lari": "landa ba ta landa",
            "fr": "Ils/Elles suivent.",
            "en": "They follow.",
            "verbForm": "landa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ndendi",
            "fr": "J'ai suivi.",
            "en": "I followed.",
            "verbForm": "lendi",
            "note": "Homographe : ndendi / lendi est aussi le passé de lenda (pouvoir)."
          },
          {
            "person": "Tu",
            "lari": "lendi",
            "fr": "Tu as suivi.",
            "en": "You followed.",
            "verbForm": "lendi"
          },
          {
            "person": "Il/Elle",
            "lari": "lendi",
            "fr": "Il/Elle a suivi.",
            "en": "He/She followed.",
            "verbForm": "lendi"
          },
          {
            "person": "Nous",
            "lari": "tu lendi",
            "fr": "Nous avons suivi.",
            "en": "We followed.",
            "verbForm": "lendi"
          },
          {
            "person": "Vous",
            "lari": "lu lendi",
            "fr": "Vous avez suivi.",
            "en": "You (pl.) followed.",
            "verbForm": "lendi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba lendi",
            "fr": "Ils/Elles ont suivi.",
            "en": "They followed.",
            "verbForm": "lendi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni landa",
            "fr": "Je suivrai.",
            "en": "I will follow.",
            "verbForm": "landa"
          },
          {
            "person": "Tu",
            "lari": "mbo landa",
            "fr": "Tu suivras.",
            "en": "You will follow.",
            "verbForm": "landa"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka landa",
            "fr": "Il/Elle suivra.",
            "en": "He/She will follow.",
            "verbForm": "landa"
          },
          {
            "person": "Nous",
            "lari": "mbo tu landa",
            "fr": "Nous suivrons.",
            "en": "We will follow.",
            "verbForm": "landa"
          },
          {
            "person": "Vous",
            "lari": "mbo lu landa",
            "fr": "Vous suivrez.",
            "en": "You (pl.) will follow.",
            "verbForm": "landa"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba landa",
            "fr": "Ils/Elles suivront.",
            "en": "They will follow.",
            "verbForm": "landa"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "À l'impératif, suis-moi se dit Ndanda."
  },
  {
    "verb": "Seha",
    "meaning": "rire, rigoler, se moquer",
    "meaningEn": "to laugh, to mock",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "seha ni ta seha",
            "fr": "Je rigole.",
            "en": "I laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Tu",
            "lari": "seha ta seha",
            "fr": "Tu rigoles.",
            "en": "You laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Il/Elle",
            "lari": "seha ka ta seha",
            "fr": "Il/Elle rigole.",
            "en": "He/She laughs.",
            "verbForm": "seha"
          },
          {
            "person": "Nous",
            "lari": "seha tu ta seha",
            "fr": "Nous rigolons.",
            "en": "We laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Vous",
            "lari": "seha lu ta seha",
            "fr": "Vous rigolez.",
            "en": "You (pl.) laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Ils/Elles",
            "lari": "seha ba ta seha",
            "fr": "Ils/Elles rigolent.",
            "en": "They laugh.",
            "verbForm": "seha"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nsehele",
            "fr": "J'ai rigolé.",
            "en": "I laughed.",
            "verbForm": "sehele"
          },
          {
            "person": "Tu",
            "lari": "sehele",
            "fr": "Tu as rigolé.",
            "en": "You laughed.",
            "verbForm": "sehele"
          },
          {
            "person": "Il/Elle",
            "lari": "sehele",
            "fr": "Il/Elle a rigolé.",
            "en": "He/She laughed.",
            "verbForm": "sehele"
          },
          {
            "person": "Nous",
            "lari": "tu sehele",
            "fr": "Nous avons rigolé.",
            "en": "We laughed.",
            "verbForm": "sehele"
          },
          {
            "person": "Vous",
            "lari": "lu sehele",
            "fr": "Vous avez rigolé.",
            "en": "You (pl.) laughed.",
            "verbForm": "sehele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba sehele",
            "fr": "Ils/Elles ont rigolé.",
            "en": "They laughed.",
            "verbForm": "sehele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni seha",
            "fr": "Je rigolerai.",
            "en": "I will laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Tu",
            "lari": "mbo seha",
            "fr": "Tu rigoleras.",
            "en": "You will laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka seha",
            "fr": "Il/Elle rigolera.",
            "en": "He/She will laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Nous",
            "lari": "mbo tu seha",
            "fr": "Nous rigolerons.",
            "en": "We will laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Vous",
            "lari": "mbo lu seha",
            "fr": "Vous rigolerez.",
            "en": "You (pl.) will laugh.",
            "verbForm": "seha"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba seha",
            "fr": "Ils/Elles rigoleront.",
            "en": "They will laugh.",
            "verbForm": "seha"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Bua",
    "meaning": "tomber",
    "meaningEn": "to fall",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "bua ni ta bwa",
            "fr": "Je tombe.",
            "en": "I fall.",
            "verbForm": "bwa"
          },
          {
            "person": "Tu",
            "lari": "bua ta bwa",
            "fr": "Tu tombes.",
            "en": "You fall.",
            "verbForm": "bwa"
          },
          {
            "person": "Il/Elle",
            "lari": "bua ka ta bwa",
            "fr": "Il/Elle tombe.",
            "en": "He/She falls.",
            "verbForm": "bwa"
          },
          {
            "person": "Nous",
            "lari": "bua tu ta bwa",
            "fr": "Nous tombons.",
            "en": "We fall.",
            "verbForm": "bwa"
          },
          {
            "person": "Vous",
            "lari": "bua lu ta bwa",
            "fr": "Vous tombez.",
            "en": "You (pl.) fall.",
            "verbForm": "bwa"
          },
          {
            "person": "Ils/Elles",
            "lari": "bua ba ta bwa",
            "fr": "Ils/Elles tombent.",
            "en": "They fall.",
            "verbForm": "bwa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbuidi",
            "fr": "Je suis tombé.",
            "en": "I fell.",
            "verbForm": "buidi"
          },
          {
            "person": "Tu",
            "lari": "buidi",
            "fr": "Tu es tombé.",
            "en": "You fell.",
            "verbForm": "buidi"
          },
          {
            "person": "Il/Elle",
            "lari": "buidi",
            "fr": "Il/Elle est tombé.",
            "en": "He/She fell.",
            "verbForm": "buidi"
          },
          {
            "person": "Nous",
            "lari": "tu buidi",
            "fr": "Nous sommes tombés.",
            "en": "We fell.",
            "verbForm": "buidi"
          },
          {
            "person": "Vous",
            "lari": "lu buidi",
            "fr": "Vous êtes tombés.",
            "en": "You (pl.) fell.",
            "verbForm": "buidi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba buidi",
            "fr": "Ils/Elles sont tombés.",
            "en": "They fell.",
            "verbForm": "buidi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni bua",
            "fr": "Je tomberai.",
            "en": "I will fall.",
            "verbForm": "bua"
          },
          {
            "person": "Tu",
            "lari": "mbo bua",
            "fr": "Tu tomberas.",
            "en": "You will fall.",
            "verbForm": "bua"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka bua",
            "fr": "Il/Elle tombera.",
            "en": "He/She will fall.",
            "verbForm": "bua"
          },
          {
            "person": "Nous",
            "lari": "mbo tu bua",
            "fr": "Nous tomberons.",
            "en": "We will fall.",
            "verbForm": "bua"
          },
          {
            "person": "Vous",
            "lari": "mbo lu bua",
            "fr": "Vous tomberez.",
            "en": "You (pl.) will fall.",
            "verbForm": "bua"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba bua",
            "fr": "Ils/Elles tomberont.",
            "en": "They will fall.",
            "verbForm": "bua"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Fua",
    "meaning": "mourir",
    "meaningEn": "to die",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "fua ni ta fua",
            "fr": "Je meurs.",
            "en": "I die.",
            "verbForm": "fua"
          },
          {
            "person": "Tu",
            "lari": "fua ta fua",
            "fr": "Tu meurs.",
            "en": "You die.",
            "verbForm": "fua"
          },
          {
            "person": "Il/Elle",
            "lari": "fua ka ta fua",
            "fr": "Il/Elle meurt.",
            "en": "He/She dies.",
            "verbForm": "fua"
          },
          {
            "person": "Nous",
            "lari": "fua tu ta fua",
            "fr": "Nous mourons.",
            "en": "We die.",
            "verbForm": "fua"
          },
          {
            "person": "Vous",
            "lari": "fua lu ta fua",
            "fr": "Vous mourez.",
            "en": "You (pl.) die.",
            "verbForm": "fua"
          },
          {
            "person": "Ils/Elles",
            "lari": "fua ba ta fua",
            "fr": "Ils/Elles meurent.",
            "en": "They die.",
            "verbForm": "fua"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mfuidi",
            "fr": "Je suis mort.",
            "en": "I died.",
            "verbForm": "fuidi"
          },
          {
            "person": "Tu",
            "lari": "fuidi",
            "fr": "Tu es mort.",
            "en": "You died.",
            "verbForm": "fuidi"
          },
          {
            "person": "Il/Elle",
            "lari": "fuidi",
            "fr": "Il/Elle est mort.",
            "en": "He/She died.",
            "verbForm": "fuidi"
          },
          {
            "person": "Nous",
            "lari": "tu fuidi",
            "fr": "Nous sommes morts.",
            "en": "We died.",
            "verbForm": "fuidi"
          },
          {
            "person": "Vous",
            "lari": "lu fuidi",
            "fr": "Vous êtes morts.",
            "en": "You (pl.) died.",
            "verbForm": "fuidi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba fuidi",
            "fr": "Ils/Elles sont morts.",
            "en": "They died.",
            "verbForm": "fuidi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni fua",
            "fr": "Je mourrai.",
            "en": "I will die.",
            "verbForm": "fua"
          },
          {
            "person": "Tu",
            "lari": "mbo fua",
            "fr": "Tu mourras.",
            "en": "You will die.",
            "verbForm": "fua"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka fua",
            "fr": "Il/Elle mourra.",
            "en": "He/She will die.",
            "verbForm": "fua"
          },
          {
            "person": "Nous",
            "lari": "mbo tu fua",
            "fr": "Nous mourrons.",
            "en": "We will die.",
            "verbForm": "fua"
          },
          {
            "person": "Vous",
            "lari": "mbo lu fua",
            "fr": "Vous mourrez.",
            "en": "You (pl.) will die.",
            "verbForm": "fua"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba fua",
            "fr": "Ils/Elles mourront.",
            "en": "They will die.",
            "verbForm": "fua"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Butuka",
    "meaning": "naître",
    "meaningEn": "to be born",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "butuka ni ta butuka",
            "fr": "Je nais.",
            "en": "I am born.",
            "verbForm": "butuka"
          },
          {
            "person": "Tu",
            "lari": "butuka ta butuka",
            "fr": "Tu nais.",
            "en": "You am born.",
            "verbForm": "butuka"
          },
          {
            "person": "Il/Elle",
            "lari": "butuka ka ta butuka",
            "fr": "Il/Elle naît.",
            "en": "He/She is born.",
            "verbForm": "butuka"
          },
          {
            "person": "Nous",
            "lari": "butuka tu ta butuka",
            "fr": "Nous naissons.",
            "en": "We am born.",
            "verbForm": "butuka"
          },
          {
            "person": "Vous",
            "lari": "butuka lu ta butuka",
            "fr": "Vous naissez.",
            "en": "You (pl.) am born.",
            "verbForm": "butuka"
          },
          {
            "person": "Ils/Elles",
            "lari": "butuka ba ta butuka",
            "fr": "Ils/Elles naissent.",
            "en": "They am born.",
            "verbForm": "butuka"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mbutukidi",
            "fr": "Je suis né.",
            "en": "I was born.",
            "verbForm": "butukidi"
          },
          {
            "person": "Tu",
            "lari": "butukidi",
            "fr": "Tu es né.",
            "en": "You was born.",
            "verbForm": "butukidi"
          },
          {
            "person": "Il/Elle",
            "lari": "butukidi",
            "fr": "Il/Elle est né.",
            "en": "He/She was born.",
            "verbForm": "butukidi"
          },
          {
            "person": "Nous",
            "lari": "tu butukidi",
            "fr": "Nous sommes nés.",
            "en": "We was born.",
            "verbForm": "butukidi"
          },
          {
            "person": "Vous",
            "lari": "lu butukidi",
            "fr": "Vous êtes nés.",
            "en": "You (pl.) was born.",
            "verbForm": "butukidi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba butukidi",
            "fr": "Ils/Elles sont nés.",
            "en": "They was born.",
            "verbForm": "butukidi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni butuka",
            "fr": "Je naîtrai.",
            "en": "I will be born.",
            "verbForm": "butuka"
          },
          {
            "person": "Tu",
            "lari": "mbo butuka",
            "fr": "Tu naîtras.",
            "en": "You will be born.",
            "verbForm": "butuka"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka butuka",
            "fr": "Il/Elle naîtra.",
            "en": "He/She will be born.",
            "verbForm": "butuka"
          },
          {
            "person": "Nous",
            "lari": "mbo tu butuka",
            "fr": "Nous naîtrons.",
            "en": "We will be born.",
            "verbForm": "butuka"
          },
          {
            "person": "Vous",
            "lari": "mbo lu butuka",
            "fr": "Vous naîtrez.",
            "en": "You (pl.) will be born.",
            "verbForm": "butuka"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba butuka",
            "fr": "Ils/Elles naîtront.",
            "en": "They will be born.",
            "verbForm": "butuka"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Djoka",
    "meaning": "courir",
    "meaningEn": "to run",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "djoka ni ta djoka",
            "fr": "Je cours.",
            "en": "I run.",
            "verbForm": "djoka",
            "mandombe": "joka ni ta joka"
          },
          {
            "person": "Tu",
            "lari": "djoka ta djoka",
            "fr": "Tu cours.",
            "en": "You run.",
            "verbForm": "djoka",
            "mandombe": "joka ta joka"
          },
          {
            "person": "Il/Elle",
            "lari": "djoka ka ta djoka",
            "fr": "Il/Elle court.",
            "en": "He/She runs.",
            "verbForm": "djoka",
            "mandombe": "joka ka ta joka"
          },
          {
            "person": "Nous",
            "lari": "djoka tu ta djoka",
            "fr": "Nous courons.",
            "en": "We run.",
            "verbForm": "djoka",
            "mandombe": "joka tu ta joka"
          },
          {
            "person": "Vous",
            "lari": "djoka lu ta djoka",
            "fr": "Vous courez.",
            "en": "You (pl.) run.",
            "verbForm": "djoka",
            "mandombe": "joka lu ta joka"
          },
          {
            "person": "Ils/Elles",
            "lari": "djoka ba ta djoka",
            "fr": "Ils/Elles courent.",
            "en": "They run.",
            "verbForm": "djoka",
            "mandombe": "joka ba ta joka"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "ndjokele",
            "fr": "J'ai couru.",
            "en": "I ran.",
            "verbForm": "djokele",
            "mandombe": "njokele"
          },
          {
            "person": "Tu",
            "lari": "djokele",
            "fr": "Tu as couru.",
            "en": "You ran.",
            "verbForm": "djokele",
            "mandombe": "jokele"
          },
          {
            "person": "Il/Elle",
            "lari": "djokele",
            "fr": "Il/Elle a couru.",
            "en": "He/She ran.",
            "verbForm": "djokele",
            "mandombe": "jokele"
          },
          {
            "person": "Nous",
            "lari": "tu djokele",
            "fr": "Nous avons couru.",
            "en": "We ran.",
            "verbForm": "djokele",
            "mandombe": "tu jokele"
          },
          {
            "person": "Vous",
            "lari": "lu djokele",
            "fr": "Vous avez couru.",
            "en": "You (pl.) ran.",
            "verbForm": "djokele",
            "mandombe": "lu jokele"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba djokele",
            "fr": "Ils/Elles ont couru.",
            "en": "They ran.",
            "verbForm": "djokele",
            "mandombe": "ba jokele"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni djoka",
            "fr": "Je courrai.",
            "en": "I will run.",
            "verbForm": "djoka",
            "mandombe": "mbo ni joka"
          },
          {
            "person": "Tu",
            "lari": "mbo djoka",
            "fr": "Tu courras.",
            "en": "You will run.",
            "verbForm": "djoka",
            "mandombe": "mbo joka"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka djoka",
            "fr": "Il/Elle courra.",
            "en": "He/She will run.",
            "verbForm": "djoka",
            "mandombe": "mbo ka joka"
          },
          {
            "person": "Nous",
            "lari": "mbo tu djoka",
            "fr": "Nous courrons.",
            "en": "We will run.",
            "verbForm": "djoka",
            "mandombe": "mbo tu joka"
          },
          {
            "person": "Vous",
            "lari": "mbo lu djoka",
            "fr": "Vous courrez.",
            "en": "You (pl.) will run.",
            "verbForm": "djoka",
            "mandombe": "mbo lu joka"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba djoka",
            "fr": "Ils/Elles courront.",
            "en": "They will run.",
            "verbForm": "djoka",
            "mandombe": "mbo ba joka"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "En Mandombe le dj s'écrit j : joka, njokele. La translittération latine garde dj."
  },
  {
    "verb": "Noka",
    "meaning": "pleuvoir",
    "meaningEn": "to rain",
    "tenses": [
      {
        "tense": "Les trois temps",
        "tenseEn": "The three tenses",
        "rows": [
          {
            "person": "Présent",
            "lari": "noka ka ta noka",
            "fr": "Il pleut.",
            "en": "It is raining.",
            "verbForm": "noka"
          },
          {
            "person": "Passé",
            "lari": "nokene",
            "fr": "Il a plu.",
            "en": "It rained.",
            "verbForm": "nokene"
          },
          {
            "person": "Futur",
            "lari": "mbo ka noka",
            "fr": "Il pleuvra.",
            "en": "It will rain.",
            "verbForm": "noka"
          }
        ]
      }
    ],
    "note": "Verbe impersonnel : seule la troisième personne est employée."
  },
  {
    "verb": "Zakasa",
    "meaning": "asseoir",
    "meaningEn": "to seat, to sit down",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "zakasa ni ta zakasa",
            "fr": "J'assois.",
            "en": "I seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Tu",
            "lari": "zakasa ta zakasa",
            "fr": "Tu assois.",
            "en": "You seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Il/Elle",
            "lari": "zakasa ka ta zakasa",
            "fr": "Il/Elle assoit.",
            "en": "He/She seats.",
            "verbForm": "zakasa"
          },
          {
            "person": "Nous",
            "lari": "zakasa tu ta zakasa",
            "fr": "Nous assoyons.",
            "en": "We seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Vous",
            "lari": "zakasa lu ta zakasa",
            "fr": "Vous assoyez.",
            "en": "You (pl.) seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Ils/Elles",
            "lari": "zakasa ba ta zakasa",
            "fr": "Ils/Elles assoient.",
            "en": "They seat.",
            "verbForm": "zakasa"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nzakase",
            "fr": "J'ai assis.",
            "en": "I seated.",
            "verbForm": "zakase"
          },
          {
            "person": "Tu",
            "lari": "zakase",
            "fr": "Tu as assis.",
            "en": "You seated.",
            "verbForm": "zakase"
          },
          {
            "person": "Il/Elle",
            "lari": "zakase",
            "fr": "Il/Elle a assis.",
            "en": "He/She seated.",
            "verbForm": "zakase"
          },
          {
            "person": "Nous",
            "lari": "tu zakase",
            "fr": "Nous avons assis.",
            "en": "We seated.",
            "verbForm": "zakase"
          },
          {
            "person": "Vous",
            "lari": "tu zakase",
            "fr": "Vous avez assis.",
            "en": "You (pl.) seated.",
            "verbForm": "zakase",
            "note": "Le document écrit touzacassé pour le pluriel : Biba touzacassé = vous avez assis les ancêtres."
          },
          {
            "person": "Ils/Elles",
            "lari": "ba zakase",
            "fr": "Ils/Elles ont assis.",
            "en": "They seated.",
            "verbForm": "zakase"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni zakasa",
            "fr": "J'assoirai.",
            "en": "I will seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Tu",
            "lari": "mbo zakasa",
            "fr": "Tu assoiras.",
            "en": "You will seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka zakasa",
            "fr": "Il/Elle assoira.",
            "en": "He/She will seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Nous",
            "lari": "mbo tu zakasa",
            "fr": "Nous assoirons.",
            "en": "We will seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Vous",
            "lari": "mbo lu zakasa",
            "fr": "Vous assoirez.",
            "en": "You (pl.) will seat.",
            "verbForm": "zakasa"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba zakasa",
            "fr": "Ils/Elles assoiront.",
            "en": "They will seat.",
            "verbForm": "zakasa"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ],
    "note": "Asseoir les ancêtres (Biba touzacassé) : installer un petit autel dans une nouvelle maison pour que les ancêtres s'y asseyent."
  },
  {
    "verb": "Nanguna",
    "meaning": "lever",
    "meaningEn": "to lift, to raise",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "nanguna ni ta nanguna",
            "fr": "Je lève.",
            "en": "I lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Tu",
            "lari": "nanguna ta nanguna",
            "fr": "Tu lèves.",
            "en": "You lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Il/Elle",
            "lari": "nanguna ka ta nanguna",
            "fr": "Il/Elle lève.",
            "en": "He/She lifts.",
            "verbForm": "nanguna"
          },
          {
            "person": "Nous",
            "lari": "nanguna tu ta nanguna",
            "fr": "Nous levons.",
            "en": "We lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Vous",
            "lari": "nanguna lu ta nanguna",
            "fr": "Vous levez.",
            "en": "You (pl.) lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Ils/Elles",
            "lari": "nanguna ba ta nanguna",
            "fr": "Ils/Elles lèvent.",
            "en": "They lift.",
            "verbForm": "nanguna"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "nanguni",
            "fr": "J'ai levé.",
            "en": "I lifted.",
            "verbForm": "nanguni"
          },
          {
            "person": "Tu",
            "lari": "nanguni",
            "fr": "Tu as levé.",
            "en": "You lifted.",
            "verbForm": "nanguni"
          },
          {
            "person": "Il/Elle",
            "lari": "nanguni",
            "fr": "Il/Elle a levé.",
            "en": "He/She lifted.",
            "verbForm": "nanguni"
          },
          {
            "person": "Nous",
            "lari": "tu nanguni",
            "fr": "Nous avons levé.",
            "en": "We lifted.",
            "verbForm": "nanguni"
          },
          {
            "person": "Vous",
            "lari": "lu nanguni",
            "fr": "Vous avez levé.",
            "en": "You (pl.) lifted.",
            "verbForm": "nanguni"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba nanguni",
            "fr": "Ils/Elles ont levé.",
            "en": "They lifted.",
            "verbForm": "nanguni"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni nanguna",
            "fr": "Je lèverai.",
            "en": "I will lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Tu",
            "lari": "mbo nanguna",
            "fr": "Tu lèveras.",
            "en": "You will lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka nanguna",
            "fr": "Il/Elle lèvera.",
            "en": "He/She will lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Nous",
            "lari": "mbo tu nanguna",
            "fr": "Nous lèverons.",
            "en": "We will lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Vous",
            "lari": "mbo lu nanguna",
            "fr": "Vous lèverez.",
            "en": "You (pl.) will lift.",
            "verbForm": "nanguna"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba nanguna",
            "fr": "Ils/Elles lèveront.",
            "en": "They will lift.",
            "verbForm": "nanguna"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  },
  {
    "verb": "Vutula",
    "meaning": "rendre",
    "meaningEn": "to give back",
    "tenses": [
      {
        "tense": "Présent",
        "tenseEn": "Present",
        "rows": [
          {
            "person": "Je",
            "lari": "vutula ni ta vutula",
            "fr": "Je rends.",
            "en": "I give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Tu",
            "lari": "vutula ta vutula",
            "fr": "Tu rends.",
            "en": "You give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Il/Elle",
            "lari": "vutula ka ta vutula",
            "fr": "Il/Elle rend.",
            "en": "He/She gives back.",
            "verbForm": "vutula"
          },
          {
            "person": "Nous",
            "lari": "vutula tu ta vutula",
            "fr": "Nous rendons.",
            "en": "We give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Vous",
            "lari": "vutula lu ta vutula",
            "fr": "Vous rendez.",
            "en": "You (pl.) give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Ils/Elles",
            "lari": "vutula ba ta vutula",
            "fr": "Ils/Elles rendent.",
            "en": "They give back.",
            "verbForm": "vutula"
          }
        ],
        "rule": "thème + particule du pronom + ta + verbe"
      },
      {
        "tense": "Passé",
        "tenseEn": "Past",
        "rows": [
          {
            "person": "Je",
            "lari": "mvutudi",
            "fr": "J'ai rendu.",
            "en": "I gave back.",
            "verbForm": "vutudi"
          },
          {
            "person": "Tu",
            "lari": "vutudi",
            "fr": "Tu as rendu.",
            "en": "You gave back.",
            "verbForm": "vutudi"
          },
          {
            "person": "Il/Elle",
            "lari": "vutudi",
            "fr": "Il/Elle a rendu.",
            "en": "He/She gave back.",
            "verbForm": "vutudi"
          },
          {
            "person": "Nous",
            "lari": "tu vutudi",
            "fr": "Nous avons rendu.",
            "en": "We gave back.",
            "verbForm": "vutudi"
          },
          {
            "person": "Vous",
            "lari": "lu vutudi",
            "fr": "Vous avez rendu.",
            "en": "You (pl.) gave back.",
            "verbForm": "vutudi"
          },
          {
            "person": "Ils/Elles",
            "lari": "ba vutudi",
            "fr": "Ils/Elles ont rendu.",
            "en": "They gave back.",
            "verbForm": "vutudi"
          }
        ]
      },
      {
        "tense": "Futur",
        "tenseEn": "Future",
        "rows": [
          {
            "person": "Je",
            "lari": "mbo ni vutula",
            "fr": "Je rendrai.",
            "en": "I will give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Tu",
            "lari": "mbo vutula",
            "fr": "Tu rendras.",
            "en": "You will give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Il/Elle",
            "lari": "mbo ka vutula",
            "fr": "Il/Elle rendra.",
            "en": "He/She will give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Nous",
            "lari": "mbo tu vutula",
            "fr": "Nous rendrons.",
            "en": "We will give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Vous",
            "lari": "mbo lu vutula",
            "fr": "Vous rendrez.",
            "en": "You (pl.) will give back.",
            "verbForm": "vutula"
          },
          {
            "person": "Ils/Elles",
            "lari": "mbo ba vutula",
            "fr": "Ils/Elles rendront.",
            "en": "They will give back.",
            "verbForm": "vutula"
          }
        ],
        "rule": "mbo + particule du pronom + infinitif"
      }
    ]
  }
];
