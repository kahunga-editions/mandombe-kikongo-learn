import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { texts, targetLang } = await req.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ error: "texts array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const langMap: Record<string, string> = {
      pt: "Portuguese", en: "English", fr: "French", es: "Spanish",
      it: "Italian", ln: "Lingala", el: "Greek", ko: "Korean", de: "German",
    };
    const langName = langMap[targetLang] || "French";

    // Build a numbered list for the AI
    const numberedList = texts.map((t: string, i: number) => `${i + 1}. ${t}`).join("\n");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `You are a translator. Translate each numbered French phrase to ${langName}. Return ONLY a JSON array of strings in the same order. No explanations, no numbering, just the JSON array. Example input: "1. Bonjour\n2. Merci" Example output: ["Olá","Obrigado"]`
          },
          { role: "user", content: numberedList }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || "[]";

    // Extract and repair JSON array from the response
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    let translations: string[] = [];
    if (jsonMatch) {
      let jsonStr = jsonMatch[0];
      // Repair common LLM JSON issues
      jsonStr = jsonStr.replace(/,\s*]/g, "]"); // trailing commas
      jsonStr = jsonStr.replace(/'\s*([^']*?)'\s*/g, '"$1"'); // single quotes to double
      jsonStr = jsonStr.replace(/,\s*,/g, ","); // double commas
      try {
        translations = JSON.parse(jsonStr);
      } catch {
        // Last resort: extract quoted strings manually
        const strings = [...jsonStr.matchAll(/"([^"]*?)"/g)].map(m => m[1]);
        translations = strings;
        console.warn("JSON repair fallback used. Raw:", jsonStr.substring(0, 200));
      }
    }

    return new Response(JSON.stringify({ translations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("translate-batch error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
