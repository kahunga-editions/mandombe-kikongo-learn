

# SSML phoneme-based pronunciation for Lari TTS

## Approach
Replace the current French-phonetic respelling strategy with SSML `<phoneme>` tags to give ElevenLabs exact IPA targets for problematic words (starting with "mpangi"). This is more robust than spelling hacks.

## Changes — single file: `supabase/functions/elevenlabs-tts-lari/index.ts`

### 1. New function: `wrapWithSsmlPhonemes(text)`
Before calling `lariToFrenchPhonetic()`, pre-process the input text to identify words that need IPA overrides. For each match, produce a `<phoneme>` tag.

Phoneme dictionary (extensible):
```typescript
const IPA_OVERRIDES: Record<string, string> = {
  "mpangi": "m.pan.ɡi",
  // add more words here as needed
};
```

The function scans the text word-by-word (case-insensitive). For matched words, it emits `<phoneme alphabet="ipa" ph="...">word</phoneme>`. For unmatched words, it still runs `lariToFrenchPhonetic()` on them individually.

The final output is wrapped in `<speak>...</speak>`.

### 2. Modify ElevenLabs API call
In the request body, add `text_type: "ssml"` so ElevenLabs interprets the SSML tags. This applies to both the primary `eleven_v3` call and the `eleven_multilingual_v2` fallback.

### 3. Keep existing `lariToFrenchPhonetic()` for non-override words
Words not in the IPA dictionary still go through the French-phonetic conversion (u→ou, e→é, ns→nts, etc.). Only words with known pronunciation issues get the SSML phoneme override.

### 4. Remove the `n-gu` rule (line 100-104)
Since "mpangi" (and similar ng+vowel words) will now use IPA phonemes directly, the hyphen-insertion hack is no longer needed for those. Remove it to avoid conflicts with SSML output.

## Example transformation

Input text: `"Mbote mpangi na ngai"`

Output SSML sent to ElevenLabs:
```xml
<speak>Mboté <phoneme alphabet="ipa" ph="m.pan.ɡi">mpangi</phoneme> na ngaï</speak>
```

## Risk
- ElevenLabs SSML support with `eleven_v3` — if it rejects SSML, the fallback to `eleven_multilingual_v2` will also use SSML. If both fail, we'll see it in logs immediately.
- The `<phoneme>` tag is well-documented in ElevenLabs' API, so this should work.

