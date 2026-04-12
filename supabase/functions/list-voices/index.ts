const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
  const res = await fetch("https://api.elevenlabs.io/v2/voices?search=Mbilia", {
    headers: { "xi-api-key": ELEVENLABS_API_KEY! },
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
