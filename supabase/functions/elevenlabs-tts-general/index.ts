import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sarah – standard multilingual voice
const SARAH_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";
// Mbilia – Lingala voice (user's account)
const MBILIA_VOICE_ID = "9d5gN66gJ67fuz9yl7IQ";

const langMapping: Record<string, string> = {
  fr: "fr",
  en: "en",
  pt: "pt",
  es: "es",
  it: "it",
  el: "el",
  ko: "ko",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      throw new Error("ELEVENLABS_API_KEY is not configured");
    }

    const { text, lang } = await req.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: "text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isLingala = lang === "ln";
    const voiceId = isLingala ? MBILIA_VOICE_ID : SARAH_VOICE_ID;
    const modelId = isLingala ? "eleven_v3" : "eleven_multilingual_v2";
    const languageCode = isLingala ? "lin" : (langMapping[lang] || "en");

    console.log(`TTS General: "${text.substring(0, 60)}" | lang: ${lang} → ${languageCode} | model: ${modelId} | voice: ${isLingala ? "Mbilia" : "Sarah"}`);

    const bodyPayload: Record<string, unknown> = {
      text,
      model_id: modelId,
      voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("ElevenLabs TTS error:", errorData);
      return new Response(
        JSON.stringify({ error: "TTS generation failed", details: errorData }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    const base64Audio = base64Encode(audioBuffer);

    return new Response(
      JSON.stringify({ audioContent: base64Audio }),
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
