import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { LESSONS_CORPUS, filterLessons, getExercisesByLesson } from "../_shared/lessons-corpus.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const level = url.searchParams.get("level") ?? undefined;
    const topic = url.searchParams.get("topic") ?? undefined;
    const lessonId = url.searchParams.get("lesson_id") ?? undefined;
    const type = url.searchParams.get("type") ?? undefined;
    const mode = url.searchParams.get("mode") ?? "lessons";

    let payload: unknown;
    if (mode === "exercises") {
      payload = getExercisesByLesson(lessonId, type);
    } else {
      payload = level || topic ? filterLessons(level, topic) : LESSONS_CORPUS;
    }

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
