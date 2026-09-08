#!/usr/bin/env python3
"""Genere src/data/survivalVerbs.ts depuis le corpus « Zonza Lari - Verbes de survie ».

Regle absolue : aucune forme n'est completee par analogie. Chaque ligne provient
du document. Les allongements notes avec « : » et les accents du document sont
des indications de prononciation, pas de l'orthographe : ils deviennent des notes.
"""
import json

PERSONS = ["Je", "Tu", "Il/Elle", "Nous", "Vous", "Ils/Elles"]


def frv(a, b, c, d, e, f):
    subj = ["Je", "Tu", "Il/Elle", "Nous", "Vous", "Ils/Elles"]
    out = []
    for s, v in zip(subj, [a, b, c, d, e, f]):
        if s == "Je" and v[0] in "aeiouhé":
            out.append("J'" + v + ".")
        else:
            out.append(s + " " + v + ".")
    return out


def env(a, b, c, d, e, f):
    subj = ["I", "You", "He/She", "We", "You (pl.)", "They"]
    return [s + " " + v + "." for s, v in zip(subj, [a, b, c, d, e, f])]


def en_same(v, v3=None):
    v3 = v3 or v
    return env(v, v, v3, v, v, v)


def en_will(v):
    return env(*(["will " + v] * 6))


def prog(theme, verb):
    return [
        f"{theme} ni ta {verb}",
        f"{theme} ta {verb}",
        f"{theme} ka ta {verb}",
        f"{theme} tu ta {verb}",
        f"{theme} lu ta {verb}",
        f"{theme} ba ta {verb}",
    ]


def fut(verb, comp=""):
    tail = (" " + comp) if comp else ""
    return [
        f"mbo ni {verb}{tail}",
        f"mbo {verb}{tail}",
        f"mbo ka {verb}{tail}",
        f"mbo tu {verb}{tail}",
        f"mbo lu {verb}{tail}",
        f"mbo ba {verb}{tail}",
    ]


def mandombe_of(lari):
    """Le digramme « dj » de la translittération s'ecrit « j » en Mandombe."""
    return lari.replace("dj", "j").replace("Dj", "J")


def tense(label, label_en, lari, fr, en, verb_form, notes=None, rule=None):
    rows = []
    for i in range(len(lari)):
        row = {
            "person": PERSONS[i] if len(lari) == 6 else PERSONS[i],
            "lari": lari[i],
            "fr": fr[i],
            "en": en[i],
            "verbForm": verb_form,
        }
        m = mandombe_of(lari[i])
        if m != lari[i]:
            row["mandombe"] = m
        if notes and notes.get(i):
            row["note"] = notes[i]
        rows.append(row)
    t = {"tense": label, "tenseEn": label_en, "rows": rows}
    if rule:
        t["rule"] = rule
    return t


PRESENT = ("Présent", "Present")
PAST = ("Passé", "Past")
FUTURE = ("Futur", "Future")
FUT_RULE = "mbo + particule du pronom + infinitif"
PROG_RULE = "thème + particule du pronom + ta + verbe"

V = []


def verb(v, meaning, meaning_en, tenses, note=None):
    entry = {"verb": v, "meaning": meaning, "meaningEn": meaning_en, "tenses": tenses}
    if note:
        entry["note"] = note
    V.append(entry)


# ---------------------------------------------------------------- BA = etre
verb(
    "Ba", "être", "to be",
    [
        tense(*PRESENT,
              ["Njena", "Wena", "Kena", "Tuena", "Luena", "Bena"],
              frv("suis", "es", "est", "sommes", "êtes", "sont"),
              env("am", "are", "is", "are", "are", "are"),
              None,
              {0: "Forme courte : Nje.", 1: "Forme courte : We.", 2: "Forme courte : Ke.",
               3: "Forme courte : Tue.", 4: "Forme courte : Lue.", 5: "Forme courte : Be."}),
        tense(*PAST,
              ["mbele", "bele", "ka bele", "tu bele", "lu bele", "ba bele"],
              frv("ai été", "as été", "a été", "avons été", "avez été", "ont été"),
              env("was", "were", "was", "were", "were", "were"),
              "bele",
              {0: "Homographe : mbele veut aussi dire couteau."}),
        tense(*FUTURE, fut("ba"),
              frv("serai", "seras", "sera", "serons", "serez", "seront"),
              en_will("be"), "ba", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- SA = faire
verb(
    "Sa", "faire", "to do, to make",
    [
        tense(*PRESENT, prog("sa", "sa"),
              frv("fais", "fais", "fait", "faisons", "faites", "font"),
              en_same("do", "does"), "sa", None, PROG_RULE),
        tense(*PAST, ["ntshiri", "shiri", "shiri", "tu shiri", "lu shiri", "ba shiri"],
              frv("ai fait", "as fait", "a fait", "avons fait", "avez fait", "ont fait"),
              en_same("did"), "shiri",
              {0: "Homographe : shiri est aussi le passé de sa:la (rester)."}),
        tense(*FUTURE, fut("sa"),
              frv("ferai", "feras", "fera", "ferons", "ferez", "feront"),
              en_will("do"), "sa", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- DIA = manger
verb(
    "Dia", "manger", "to eat",
    [
        tense(*PRESENT, prog("dia", "dia"),
              frv("mange", "manges", "mange", "mangeons", "mangez", "mangent"),
              en_same("eat", "eats"), "dia", None, PROG_RULE),
        tense(*PAST,
              ["ndidi", "didi", "didi", "tu didi", "lu didi", "ba didi"],
              frv("ai mangé", "as mangé", "a mangé", "avons mangé", "avez mangé", "ont mangé"),
              en_same("ate"), "didi",
              {0: "Variante : ndiri.", 1: "Variante : diri.", 2: "Variante : diri.",
               3: "Variante : tu diri.", 4: "Variante : lu diri.", 5: "Variante : ba diri."}),
        tense(*FUTURE, fut("dia"),
              frv("mangerai", "mangeras", "mangera", "mangerons", "mangerez", "mangeront"),
              en_will("eat"), "dia", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- NUA = boire
verb(
    "Nua", "boire", "to drink",
    [
        tense(*PRESENT, prog("nua", "nua"),
              frv("bois", "bois", "boit", "buvons", "buvez", "boivent"),
              en_same("drink", "drinks"), "nua", None, PROG_RULE),
        tense(*PAST, ["nuini", "nuini", "nuini", "tu nuini", "lu nuini", "ba nuini"],
              frv("ai bu", "as bu", "a bu", "avons bu", "avez bu", "ont bu"),
              en_same("drank"), "nuini"),
        tense(*FUTURE, fut("nua"),
              frv("boirai", "boiras", "boira", "boirons", "boirez", "boiront"),
              en_will("drink"), "nua", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- HANA MUSUA
verb(
    "Hana musua", "permettre, donner la permission", "to allow, to give permission",
    [
        tense(*PRESENT, prog("musua", "hana"),
              frv("permets", "permets", "permet", "permettons", "permettez", "permettent"),
              en_same("allow", "allows"), "hana", None, PROG_RULE),
        tense(*PAST,
              ["musua ngeni", "musua heni", "musua ka heni", "musua tu heni",
               "musua lu heni", "musua ba heni"],
              frv("ai permis", "as permis", "a permis", "avons permis", "avez permis", "ont permis"),
              en_same("allowed"), "heni", {0: "Forme de la première personne : ngeni."}),
        tense(*FUTURE, fut("hana", "musua"),
              frv("permettrai", "permettras", "permettra", "permettrons", "permettrez", "permettront"),
              en_will("allow"), "hana", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- LENDA
verb(
    "Lenda", "pouvoir", "to be able to, can",
    [
        tense(*PRESENT, ["ndendi", "lendi", "lendi", "tu lendi", "lu lendi", "ba lendi"],
              frv("peux", "peux", "peut", "pouvons", "pouvez", "peuvent"),
              env("can", "can", "can", "can", "can", "can"), "lendi"),
        tense(*PAST, ["na lendi", "wa lendi", "wa lendi", "tua lendi", "lua lendi", "ba lendi"],
              frv("ai pu", "as pu", "a pu", "avons pu", "avez pu", "ont pu"),
              en_same("could"), "lendi"),
        tense(*FUTURE, fut("lenda"),
              frv("pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"),
              en_will("be able to"), "lenda", None, FUT_RULE),
    ],
    note="Le passé na lendi / wa lendi… est homographe avec le passé de landa (suivre).",
)

# ---------------------------------------------------------------- BONGA
verb(
    "Bonga", "prendre", "to take",
    [
        tense(*PRESENT, prog("bonga", "bonga"),
              frv("prends", "prends", "prend", "prenons", "prenez", "prennent"),
              en_same("take", "takes"), "bonga", None, PROG_RULE),
        tense(*PAST, ["mbongele", "bongele", "bongele", "tu bongele", "lu bongele", "ba bongele"],
              frv("ai pris", "as pris", "a pris", "avons pris", "avez pris", "ont pris"),
              en_same("took"), "bongele"),
        tense(*FUTURE, fut("bonga"),
              frv("prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"),
              en_will("take"), "bonga", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- ZABA
verb(
    "Zaba", "savoir, connaître", "to know",
    [
        tense(*PRESENT, ["nzebi", "zebi", "zebi", "tu zebi", "lu zebi", "ba zebi"],
              frv("sais", "sais", "sait", "savons", "savez", "savent"),
              en_same("know", "knows"), "zebi"),
        tense(*PAST, ["na zebi", "wa zebi", "wa zebi", "ta zebi", "lua zebi", "ba zebi"],
              frv("ai su", "as su", "a su", "avons su", "avez su", "ont su"),
              en_same("knew"), "zebi", {3: "Variante : tua zebi."}),
        tense(*FUTURE, fut("zaba"),
              frv("saurai", "sauras", "saura", "saurons", "saurez", "sauront"),
              en_will("know"), "zaba", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- KUIZA
verb(
    "Kuiza", "venir", "to come",
    [
        tense(*PRESENT, prog("mwizu", "kwiza"),
              frv("viens", "viens", "vient", "venons", "venez", "viennent"),
              en_same("come", "comes"), "kwiza", None, PROG_RULE),
        tense(*PAST, ["njijiri", "wijiri", "wijiri", "tuijiri", "luijiri", "bijiri"],
              frv("suis venu", "es venu", "est venu", "sommes venus", "êtes venus", "sont venus"),
              env("came", "came", "came", "came", "came", "came"), None,
              {2: "Le i est long à l'oral : /wi:jiri/.", 5: "Le i est long à l'oral : /bi:jiri/."}),
        tense(*FUTURE, fut("kuiza"),
              frv("viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"),
              en_will("come"), "kuiza", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- BANZA
verb(
    "Banza", "penser", "to think",
    [
        tense(*PRESENT, prog("banza", "banza"),
              frv("pense", "penses", "pense", "pensons", "pensez", "pensent"),
              en_same("think", "thinks"), "banza", None, PROG_RULE),
        tense(*PAST, ["mbendji", "bendji", "bendji", "tu bendji", "lu bendji", "ba bendji"],
              frv("ai pensé", "as pensé", "a pensé", "avons pensé", "avez pensé", "ont pensé"),
              en_same("thought"), "bendji",
              {0: "En Mandombe on écrit mbenji ; la translittération latine reste mbendji."}),
        tense(*FUTURE, fut("banza"),
              frv("penserai", "penseras", "pensera", "penserons", "penserez", "penseront"),
              en_will("think"), "banza",
              {0: "Le a de banza est long à l'oral : /ba:nza/."}, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- FUTA
verb(
    "Futa", "payer", "to pay",
    [
        tense(*PRESENT, prog("futa", "futa"),
              frv("paie", "paies", "paie", "payons", "payez", "paient"),
              en_same("pay", "pays"), "futa",
              {1: "Le ta est long à l'oral : /ta:/."}, PROG_RULE),
        tense(*PAST, ["mfutiri", "futiri", "futiri", "tu futiri", "lu futiri", "ba futiri"],
              frv("ai payé", "as payé", "a payé", "avons payé", "avez payé", "ont payé"),
              en_same("paid"), "futiri"),
        tense(*FUTURE, fut("futa"),
              frv("paierai", "paieras", "paiera", "paierons", "paierez", "paieront"),
              en_will("pay"), "futa", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- WA
verb(
    "Wa", "entendre, comprendre, sentir", "to hear, to understand, to smell",
    [
        tense("Présent — sentir une odeur", "Present — to smell", prog("nsunga", "wa"),
              frv("sens une odeur", "sens une odeur", "sent une odeur",
                  "sentons une odeur", "sentez une odeur", "sentent une odeur"),
              en_same("smell", "smells"), "wa", None, PROG_RULE),
    ],
)

# ---------------------------------------------------------------- MONA
verb(
    "Mona", "voir", "to see",
    [
        tense(*PRESENT, prog("mona", "mona"),
              frv("vois", "vois", "voit", "voyons", "voyez", "voient"),
              en_same("see", "sees"), "mona", None, PROG_RULE),
        tense(*PAST, ["muini", "muini", "muini", "tu muini", "lu muini", "ba muini"],
              frv("ai vu", "as vu", "a vu", "avons vu", "avez vu", "ont vu"),
              en_same("saw"), "muini"),
        tense(*FUTURE, fut("mona"),
              frv("verrai", "verras", "verra", "verrons", "verrez", "verront"),
              en_will("see"), "mona", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- expressions du corps
verb(
    "Tshioji ... mona", "avoir froid (litt. sentir le froid)", "to be cold (lit. to feel the cold)",
    [
        tense(*PRESENT, prog("tshioji", "mona"),
              frv("ai froid", "as froid", "a froid", "avons froid", "avez froid", "ont froid"),
              env("am cold", "are cold", "is cold", "are cold", "are cold", "are cold"),
              "mona", None, PROG_RULE),
    ],
)

verb(
    "Tiya ... mona", "avoir chaud (litt. sentir la chaleur)", "to be hot (lit. to feel the heat)",
    [
        tense(*PRESENT, prog("tiya", "mona"),
              frv("ai chaud", "as chaud", "a chaud", "avons chaud", "avez chaud", "ont chaud"),
              env("am hot", "are hot", "is hot", "are hot", "are hot", "are hot"),
              "mona", None, PROG_RULE),
        tense(*PAST, ["Tiya mwini", "Tiya mwini", "Tiya ka mwini", "Tiya tu mwini",
                      "Tiya lu mwini", "Tiya ba mwini"],
              frv("ai eu chaud", "as eu chaud", "a eu chaud", "avons eu chaud",
                  "avez eu chaud", "ont eu chaud"),
              en_same("felt the heat"), "mwini"),
    ],
)

verb(
    "Baka nsatu", "avoir faim (litt. obtenir la faim)", "to be hungry (lit. to get hunger)",
    [
        tense(*FUTURE, fut("baka", "nsatu"),
              frv("sentirai la faim", "sentiras la faim", "sentira la faim",
                  "sentirons la faim", "sentirez la faim", "sentiront la faim"),
              en_will("be hungry"), "baka", None, FUT_RULE),
    ],
    note="baka = avoir, obtenir.",
)

# ---------------------------------------------------------------- ZOLA
verb(
    "Zola", "aimer, vouloir", "to love, to want",
    [
        tense(*PRESENT, ["nzololo", "zololo", "zololo", "tu zololo", "lu zololo", "ba zololo"],
              frv("veux", "veux", "veut", "voulons", "voulez", "veulent"),
              en_same("want", "wants"), "zololo"),
        tense(*PAST, ["na zolo", "wa zolo", "wa zolo", "ta zolo", "lua zolo", "ba zolo"],
              frv("ai voulu", "as voulu", "a voulu", "avons voulu", "avez voulu", "ont voulu"),
              en_same("wanted"), "zolo"),
        tense(*FUTURE, fut("zolo"),
              frv("voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"),
              en_will("want"), "zolo", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- SALA travailler
verb(
    "Sala", "travailler, fabriquer", "to work, to make",
    [
        tense(*PRESENT, prog("sala", "sala"),
              frv("travaille", "travailles", "travaille", "travaillons", "travaillez", "travaillent"),
              en_same("work", "works"), "sala", None, PROG_RULE),
        tense(*PAST, ["nsaridi", "saridi", "saridi", "tu saridi", "lu saridi", "ba saridi"],
              frv("ai travaillé", "as travaillé", "a travaillé", "avons travaillé",
                  "avez travaillé", "ont travaillé"),
              en_same("worked"), "saridi", {2: "Le a est long à l'oral : /sa:ridi/."}),
        tense(*FUTURE, fut("sala"),
              frv("travaillerai", "travailleras", "travaillera", "travaillerons",
                  "travaillerez", "travailleront"),
              en_will("work"), "sala", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- SALA rester
verb(
    "Sala", "rester", "to stay",
    [
        tense(*PRESENT, prog("sala", "sala"),
              frv("reste", "restes", "reste", "restons", "restez", "restent"),
              en_same("stay", "stays"), "sala", None, PROG_RULE),
        tense(*PAST, ["ntshiri", "shiri", "shiri", "tu shiri", "lu shiri", "ba shiri"],
              frv("suis resté", "es resté", "est resté", "sommes restés", "êtes restés", "sont restés"),
              en_same("stayed"), "shiri",
              {0: "Homographe : ntshiri / shiri est aussi le passé de sa (faire).",
               2: "Le i est long à l'oral : /shi:ri/."}),
        tense(*FUTURE, fut("sala"),
              frv("resterai", "resteras", "restera", "resterons", "resterez", "resteront"),
              en_will("stay"), "sala", None, FUT_RULE),
    ],
    note="À l'oral, le a de sa:la (rester) est long : c'est ce qui le distingue de sala (travailler).",
)

# ---------------------------------------------------------------- SUKULA
verb(
    "Sukula", "laver", "to wash",
    [
        tense(*PRESENT, prog("sukula", "sukula"),
              frv("lave", "laves", "lave", "lavons", "lavez", "lavent"),
              en_same("wash", "washes"), "sukula", None, PROG_RULE),
        tense(*PAST, ["nsukuri", "sukuri", "sukuri", "tu sukuri", "lu sukuri", "ba sukuri"],
              frv("ai lavé", "as lavé", "a lavé", "avons lavé", "avez lavé", "ont lavé"),
              en_same("washed"), "sukuri", {2: "Le u est long à l'oral : /su:kuri/."}),
        tense(*FUTURE, fut("sukula"),
              frv("laverai", "laveras", "lavera", "laverons", "laverez", "laveront"),
              en_will("wash"), "sukula", None, FUT_RULE),
    ],
    note="Suaka veut aussi dire laver, mais il est peu usité.",
)

# ---------------------------------------------------------------- SOBA
verb(
    "Soba", "changer", "to change",
    [
        tense(*PRESENT, prog("soba", "soba"),
              frv("change", "changes", "change", "changeons", "changez", "changent"),
              en_same("change", "changes"), "soba", None, PROG_RULE),
        tense(*PAST, ["nsobele", "sobele", "sobele", "tu sobele", "lu sobele", "ba sobele"],
              frv("ai changé", "as changé", "a changé", "avons changé", "avez changé", "ont changé"),
              en_same("changed"), "sobele"),
        tense(*FUTURE, fut("soba"),
              frv("changerai", "changeras", "changera", "changerons", "changerez", "changeront"),
              en_will("change"), "soba", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- TEKA
verb(
    "Teka", "vendre, trahir", "to sell, to betray",
    [
        tense(*PRESENT, prog("teka", "teka"),
              frv("vends", "vends", "vend", "vendons", "vendez", "vendent"),
              en_same("sell", "sells"), "teka", None, PROG_RULE),
        tense(*PAST, ["ntekele", "tekele", "tekele", "tu tekele", "lu tekele", "ba tekele"],
              frv("ai vendu", "as vendu", "a vendu", "avons vendu", "avez vendu", "ont vendu"),
              en_same("sold"), "tekele"),
        tense(*FUTURE, fut("teka"),
              frv("vendrai", "vendras", "vendra", "vendrons", "vendrez", "vendront"),
              en_will("sell"), "teka", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- TANGA
verb(
    "Tanga", "lire, chanter", "to read, to sing",
    [
        tense(*PRESENT, prog("tanga", "tanga"),
              frv("lis", "lis", "lit", "lisons", "lisez", "lisent"),
              en_same("read", "reads"), "tanga", None, PROG_RULE),
        tense(*PAST, ["ntengi", "tengi", "tengi", "tu tengi", "lu tengi", "ba tengi"],
              frv("ai lu", "as lu", "a lu", "avons lu", "avez lu", "ont lu"),
              en_same("read"), "tengi"),
        tense(*FUTURE, fut("tanga"),
              frv("lirai", "liras", "lira", "lirons", "lirez", "liront"),
              en_will("read"), "tanga", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- SOLA
verb(
    "Sola", "choisir", "to choose",
    [
        tense(*PRESENT, prog("sola", "sola"),
              frv("choisis", "choisis", "choisit", "choisissons", "choisissez", "choisissent"),
              en_same("choose", "chooses"), "sola", None, PROG_RULE),
        tense(*PAST, ["nsolele", "solele", "solele", "tu solele", "lu solele", "ba solele"],
              frv("ai choisi", "as choisi", "a choisi", "avons choisi", "avez choisi", "ont choisi"),
              en_same("chose"), "solele"),
        tense(*FUTURE, fut("sola"),
              frv("choisirai", "choisiras", "choisira", "choisirons", "choisirez", "choisiront"),
              en_will("choose"), "sola", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- YELA
verb(
    "Yela", "essayer", "to try",
    [
        tense(*PRESENT, prog("yela", "yela"),
              frv("essaie", "essaies", "essaie", "essayons", "essayez", "essaient"),
              en_same("try", "tries"), "yela", None, PROG_RULE),
        tense(*PAST, ["njelele", "yelele", "yelele", "tu yelele", "lu yelele", "ba yelele"],
              frv("ai essayé", "as essayé", "a essayé", "avons essayé", "avez essayé", "ont essayé"),
              en_same("tried"), "yelele"),
        tense(*FUTURE, fut("yela"),
              frv("essaierai", "essaieras", "essaiera", "essaierons", "essaierez", "essaieront"),
              en_will("try"), "yela", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- BAKISA
verb(
    "Bakisa", "aider", "to help",
    [
        tense(*PRESENT, prog("bakisa", "bakisa"),
              frv("aide", "aides", "aide", "aidons", "aidez", "aident"),
              en_same("help", "helps"), "bakisa", None, PROG_RULE),
        tense(*PAST, ["mbakishi", "bakishi", "bakishi", "tu bakishi", "lu bakishi", "ba bakishi"],
              frv("ai aidé", "as aidé", "a aidé", "avons aidé", "avez aidé", "ont aidé"),
              en_same("helped"), "bakishi"),
        tense(*FUTURE, fut("bakisa"),
              frv("aiderai", "aideras", "aidera", "aiderons", "aiderez", "aideront"),
              en_will("help"), "bakisa", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- LAMBA
verb(
    "Lamba", "préparer la nourriture, cuire", "to prepare food, to cook",
    [
        tense(*PRESENT, prog("lamba", "lamba"),
              frv("prépare", "prépares", "prépare", "préparons", "préparez", "préparent"),
              en_same("cook", "cooks"), "lamba", None, PROG_RULE),
        tense(*PAST, ["ndembi", "lembi", "lembi", "tu lembi", "lu lembi", "ba lembi"],
              frv("ai préparé", "as préparé", "a préparé", "avons préparé", "avez préparé", "ont préparé"),
              en_same("cooked"), "lembi"),
        tense(*FUTURE, fut("lamba"),
              frv("préparerai", "prépareras", "préparera", "préparerons", "préparerez", "prépareront"),
              en_will("cook"), "lamba", None, FUT_RULE),
    ],
    note="Préparer son sac se dit yirika, pas lamba.",
)

# ---------------------------------------------------------------- LANDA
verb(
    "Landa", "suivre", "to follow",
    [
        tense(*PRESENT, prog("landa", "landa"),
              frv("suis", "suis", "suit", "suivons", "suivez", "suivent"),
              en_same("follow", "follows"), "landa", None, PROG_RULE),
        tense(*PAST, ["ndendi", "lendi", "lendi", "tu lendi", "lu lendi", "ba lendi"],
              frv("ai suivi", "as suivi", "a suivi", "avons suivi", "avez suivi", "ont suivi"),
              en_same("followed"), "lendi",
              {0: "Homographe : ndendi / lendi est aussi le passé de lenda (pouvoir)."}),
        tense(*FUTURE, fut("landa"),
              frv("suivrai", "suivras", "suivra", "suivrons", "suivrez", "suivront"),
              en_will("follow"), "landa", None, FUT_RULE),
    ],
    note="À l'impératif, suis-moi se dit Ndanda.",
)

# ---------------------------------------------------------------- SEHA
verb(
    "Seha", "rire, rigoler, se moquer", "to laugh, to mock",
    [
        tense(*PRESENT, prog("seha", "seha"),
              frv("rigole", "rigoles", "rigole", "rigolons", "rigolez", "rigolent"),
              en_same("laugh", "laughs"), "seha", None, PROG_RULE),
        tense(*PAST, ["nsehele", "sehele", "sehele", "tu sehele", "lu sehele", "ba sehele"],
              frv("ai rigolé", "as rigolé", "a rigolé", "avons rigolé", "avez rigolé", "ont rigolé"),
              en_same("laughed"), "sehele"),
        tense(*FUTURE, fut("seha"),
              frv("rigolerai", "rigoleras", "rigolera", "rigolerons", "rigolerez", "rigoleront"),
              en_will("laugh"), "seha", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- BUA
verb(
    "Bua", "tomber", "to fall",
    [
        tense(*PRESENT, prog("bua", "bwa"),
              frv("tombe", "tombes", "tombe", "tombons", "tombez", "tombent"),
              en_same("fall", "falls"), "bwa", None, PROG_RULE),
        tense(*PAST, ["mbuidi", "buidi", "buidi", "tu buidi", "lu buidi", "ba buidi"],
              frv("suis tombé", "es tombé", "est tombé", "sommes tombés", "êtes tombés", "sont tombés"),
              en_same("fell"), "buidi"),
        tense(*FUTURE, fut("bua"),
              frv("tomberai", "tomberas", "tombera", "tomberons", "tomberez", "tomberont"),
              en_will("fall"), "bua", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- FUA
verb(
    "Fua", "mourir", "to die",
    [
        tense(*PRESENT, prog("fua", "fua"),
              frv("meurs", "meurs", "meurt", "mourons", "mourez", "meurent"),
              en_same("die", "dies"), "fua", None, PROG_RULE),
        tense(*PAST, ["mfuidi", "fuidi", "fuidi", "tu fuidi", "lu fuidi", "ba fuidi"],
              frv("suis mort", "es mort", "est mort", "sommes morts", "êtes morts", "sont morts"),
              en_same("died"), "fuidi"),
        tense(*FUTURE, fut("fua"),
              frv("mourrai", "mourras", "mourra", "mourrons", "mourrez", "mourront"),
              en_will("die"), "fua", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- BUTUKA
verb(
    "Butuka", "naître", "to be born",
    [
        tense(*PRESENT, prog("butuka", "butuka"),
              frv("nais", "nais", "naît", "naissons", "naissez", "naissent"),
              en_same("am born", "is born"), "butuka", None, PROG_RULE),
        tense(*PAST, ["mbutukidi", "butukidi", "butukidi", "tu butukidi", "lu butukidi", "ba butukidi"],
              frv("suis né", "es né", "est né", "sommes nés", "êtes nés", "sont nés"),
              en_same("was born"), "butukidi"),
        tense(*FUTURE, fut("butuka"),
              frv("naîtrai", "naîtras", "naîtra", "naîtrons", "naîtrez", "naîtront"),
              en_will("be born"), "butuka", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- DJOKA
verb(
    "Djoka", "courir", "to run",
    [
        tense(*PRESENT, prog("djoka", "djoka"),
              frv("cours", "cours", "court", "courons", "courez", "courent"),
              en_same("run", "runs"), "djoka", None, PROG_RULE),
        tense(*PAST, ["ndjokele", "djokele", "djokele", "tu djokele", "lu djokele", "ba djokele"],
              frv("ai couru", "as couru", "a couru", "avons couru", "avez couru", "ont couru"),
              en_same("ran"), "djokele"),
        tense(*FUTURE, fut("djoka"),
              frv("courrai", "courras", "courra", "courrons", "courrez", "courront"),
              en_will("run"), "djoka", None, FUT_RULE),
    ],
    note="En Mandombe le dj s'écrit j : joka, njokele. La translittération latine garde dj.",
)

# ---------------------------------------------------------------- NOKA
V.append({
    "verb": "Noka",
    "meaning": "pleuvoir",
    "meaningEn": "to rain",
    "tenses": [{
        "tense": "Les trois temps",
        "tenseEn": "The three tenses",
        "rows": [
            {"person": "Présent", "lari": "noka ka ta noka", "fr": "Il pleut.", "en": "It is raining.", "verbForm": "noka"},
            {"person": "Passé", "lari": "nokene", "fr": "Il a plu.", "en": "It rained.", "verbForm": "nokene"},
            {"person": "Futur", "lari": "mbo ka noka", "fr": "Il pleuvra.", "en": "It will rain.", "verbForm": "noka"},
        ],
    }],
    "note": "Verbe impersonnel : seule la troisième personne est employée.",
})

# ---------------------------------------------------------------- ZAKASA
verb(
    "Zakasa", "asseoir", "to seat, to sit down",
    [
        tense(*PRESENT, prog("zakasa", "zakasa"),
              frv("assois", "assois", "assoit", "assoyons", "assoyez", "assoient"),
              en_same("seat", "seats"), "zakasa", None, PROG_RULE),
        tense(*PAST, ["nzakase", "zakase", "zakase", "tu zakase", "tu zakase", "ba zakase"],
              frv("ai assis", "as assis", "a assis", "avons assis", "avez assis", "ont assis"),
              en_same("seated"), "zakase",
              {4: "Le document écrit touzacassé pour le pluriel : Biba touzacassé = vous avez assis les ancêtres."}),
        tense(*FUTURE, fut("zakasa"),
              frv("assoirai", "assoiras", "assoira", "assoirons", "assoirez", "assoiront"),
              en_will("seat"), "zakasa", None, FUT_RULE),
    ],
    note="Asseoir les ancêtres (Biba touzacassé) : installer un petit autel dans une nouvelle maison pour que les ancêtres s'y asseyent.",
)

# ---------------------------------------------------------------- NANGUNA
verb(
    "Nanguna", "lever", "to lift, to raise",
    [
        tense(*PRESENT, prog("nanguna", "nanguna"),
              frv("lève", "lèves", "lève", "levons", "levez", "lèvent"),
              en_same("lift", "lifts"), "nanguna", None, PROG_RULE),
        tense(*PAST, ["nanguni", "nanguni", "nanguni", "tu nanguni", "lu nanguni", "ba nanguni"],
              frv("ai levé", "as levé", "a levé", "avons levé", "avez levé", "ont levé"),
              en_same("lifted"), "nanguni"),
        tense(*FUTURE, fut("nanguna"),
              frv("lèverai", "lèveras", "lèvera", "lèverons", "lèverez", "lèveront"),
              en_will("lift"), "nanguna", None, FUT_RULE),
    ],
)

# ---------------------------------------------------------------- VUTULA
verb(
    "Vutula", "rendre", "to give back",
    [
        tense(*PRESENT, prog("vutula", "vutula"),
              frv("rends", "rends", "rend", "rendons", "rendez", "rendent"),
              en_same("give back", "gives back"), "vutula", None, PROG_RULE),
        tense(*PAST, ["mvutudi", "vutudi", "vutudi", "tu vutudi", "lu vutudi", "ba vutudi"],
              frv("ai rendu", "as rendu", "a rendu", "avons rendu", "avez rendu", "ont rendu"),
              en_same("gave back"), "vutudi"),
        tense(*FUTURE, fut("vutula"),
              frv("rendrai", "rendras", "rendra", "rendrons", "rendrez", "rendront"),
              en_will("give back"), "vutula", None, FUT_RULE),
    ],
)


HEADER = '''// Genere par scripts/build_survival_verbs.py depuis « Zonza Lari - Verbes de survie ».
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

export const survivalVerbs: SurvivalVerb[] = '''

out = HEADER + json.dumps(V, ensure_ascii=False, indent=2) + ";\n"
out = out.replace("\u2019", "'")
with open("src/data/survivalVerbs.ts", "w", encoding="utf-8") as fh:
    fh.write(out)
print("verbes:", len(V), "lignes:", sum(len(t["rows"]) for v in V for t in v["tenses"]))
