

## Add Advanced Lessons: Verb Conjugations, Negation, Imperative, and Travel with Time

Three new lessons will be added to `src/data/lessons.ts`, drawing from the advanced PDF content. Each includes rich vocabulary, conjugation tables, key phrases, and creative exercises with Mandombe script.

### New Lessons

**Lesson 7: "To Be" Conjugation -- Kena (Advanced)**
- Full conjugation of the verb "to be" (ba/kena) across all persons: ngiena, wena, kena, tuena, luena, bena
- Adjective phrases: mavimpi (healthy), kiese (happy), diela (intelligent)
- Negation pattern: "ka ... ko" (e.g., "Mavimpi ka tuena ko" = We are not healthy)
- Exercises:
  - Multiple choice: identify correct pronoun form
  - Fill-in-blank: complete conjugation rows
  - Matching: pair "kena" forms with translations
  - Creative "Sentence Builder": given an adjective and person, pick the right conjugation
  - Negation exercise: transform affirmative sentences to negative using "ka...ko"

**Lesson 8: Imperative Mood and Commands -- Tuma**
- Vocabulary from the house activities and time PDFs: kanga (to close/lock), vungula (to open), lala (to sleep), duka (to go out), diata (to walk), djoka (to run/escape), lomba (to ask)
- Imperative forms: singular command vs. plural command (e.g., "Kang'eno vungula" = Lock the door)
- Key phrases with commands used in daily life
- Exercises:
  - Multiple choice: identify imperative vs. other moods
  - Fill-in-blank: complete command sentences
  - Matching: pair commands with their meanings
  - Creative "What would you say?": situational exercise (e.g., "It's bedtime, what do you tell the children?" -> "Lala bua mbote")

**Lesson 9: Travel and Places -- Kwenda**
- Based on the rich travel conjugation content from the time PDF: "Mazuji ku Mpumbu ma bele" (The day before yesterday I went to Kinshasa), future forms with "mbaji"
- Full conjugation of "kwenda" (to go) in past tense with real place names (Mpumbu, Matadi, Mfua, Linzolo, Kinkala, Mbamu)
- Future tense: "Mbaji ku Lubomo tu kwenda" (Tomorrow we will go to Lubomo)
- Additional verbs: kwiza (to come), mona (to see)
- Exercises:
  - Multiple choice: translate travel sentences
  - Fill-in-blank: complete sentences with correct pronoun markers
  - Matching: pair places with sentences
  - Creative "Plan your trip": given a destination and time expression, construct a sentence

### Technical Changes

**File: `src/data/lessons.ts`**
- Append 3 new lesson objects to the `lessons` array
- Each lesson follows the existing `Lesson` interface with `vocabulary`, `conjugations`, `phrases`, and `exercises` arrays
- All Mandombe fields use accent-free Latin characters matching existing conventions
- Exercise types use all three existing components: `MultipleChoice`, `FillInBlank`, `MatchingExercise`

No new components or routes needed -- the existing `/lessons` page and `/lessons/:lessonId` detail page will automatically pick up the new lessons.

