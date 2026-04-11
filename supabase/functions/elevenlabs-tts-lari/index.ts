import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEFAULT_VOICE_ID = Deno.env.get("LARI_VOICE_ID") || "rfRMgjypJCXUzWdJfLMs";

/**
 * Convert Lari orthography to French-compatible spelling for TTS.
 * Based on Jacquot's phonological rules for Kikongo/Lari.
 * The idea: French shares key phoneme-grapheme correspondences with Lari,
 * so we respell Lari words using French conventions, then use language_code: "fr".
 */
function lariToFrenchPhonetic(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map(w => convertWord(w)).join(" ");
}

function convertWord(word: string): string {
  const lower = word.toLowerCase();
  let result = "";
  let i = 0;

  while (i < lower.length) {
    // "ns" → "nts" (Jacquot: initial ns = /nts/)
    if (lower.startsWith("ns", i) && (i === 0 || !/[a-z]/.test(lower[i - 1]))) {
      result += "nts";
      i += 2;
      continue;
    }

    // "kua" → "kou-a" (force hiatus, prevent /kwa/ glide)
    if (lower.startsWith("kua", i)) {
      result += "kou-a";
      i += 3;
      continue;
    }

    // Intervocalic "s" → "ss" (prevent French /z/ between vowels)
    if (lower[i] === "s" && i > 0 && i < lower.length - 1) {
      const prev = lower[i - 1];
      const next = lower[i + 1];
      if ("aeiou".includes(prev) && "aeiou".includes(next)) {
        result += "ss";
        i++;
        continue;
      }
    }

    // "u" → "ou" (Lari /u/ = French "ou", not French /y/)
    if (lower[i] === "u") {
      // Don't double-convert if already preceded by "o" (part of "ou")
      if (i > 0 && lower[i - 1] === "o") {
        result += "u";
      } else {
        result += "ou";
      }
      i++;
      continue;
    }

    // Word-final "e" or "e" before consonant → "é" (prevent French mute e)
    if (lower[i] === "e") {
      const nextChar = i + 1 < lower.length ? lower[i + 1] : null;
      if (!nextChar || (nextChar && !"aeiou".includes(nextChar))) {
        result += "é";
      } else {
        result += "e";
      }
      i++;
      continue;
    }

    // "j" → "z" — Lari /ʒ/ is better triggered by "z" with the cloned voice
    if (lower[i] === "j") {
      result += "z";
      i++;
      continue;
    }

    // Everything else passes through (mb, nd, nk, etc. are fine in French)
    result += lower[i];
    i++;
  }

  // Preserve original casing for first letter
  if (word[0] === word[0].toUpperCase()) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    const { text, voiceId } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const selectedVoice = voiceId || DEFAULT_VOICE_ID;
    const frenchText = lariToFrenchPhonetic(text);
    console.log(`TTS Lari: "${text}" → French phonetic: "${frenchText}" | voice: ${selectedVoice}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: frenchText,
          model_id: "eleven_v3",
          language_code: "fr",
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.75,
            style: 0.15,
            use_speaker_boost: false,
            speed: 0.88,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ElevenLabs TTS error:", errorData);
      
      if (response.status === 422 || response.status === 403) {
        console.log("Falling back to eleven_multilingual_v2...");
        const fallbackResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?output_format=mp3_44100_128`,
          {
            method: "POST",
            headers: {
              "xi-api-key": ELEVENLABS_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: frenchText,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.65,
                similarity_boost: 0.75,
                style: 0.15,
                use_speaker_boost: false,
                speed: 0.88,
              },
            }),
          }
        );

        if (!fallbackResponse.ok) {
          const fallbackError = await fallbackResponse.text();
          console.error("Fallback TTS error:", fallbackError);
          return new Response(
            JSON.stringify({ error: "TTS generation failed", details: fallbackError }),
            { status: fallbackResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const fallbackBuffer = await fallbackResponse.arrayBuffer();
        const fallbackBase64 = base64Encode(fallbackBuffer);
        return new Response(
          JSON.stringify({ audioContent: fallbackBase64, model: "eleven_multilingual_v2" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "TTS generation failed", details: errorData }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = base64Encode(audioBuffer);

    return new Response(
      JSON.stringify({ audioContent: base64Audio, model: "eleven_v3" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
