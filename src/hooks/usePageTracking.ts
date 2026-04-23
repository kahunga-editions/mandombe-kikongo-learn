import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "nzo_session_id";
const GEO_KEY = "nzo_geo_cache";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function detectDevice(): string {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

interface GeoData {
  country_name?: string;
  country_code?: string;
  city?: string;
}

async function getGeo(): Promise<GeoData> {
  const cached = sessionStorage.getItem(GEO_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return {};
    const data = await res.json();
    const geo: GeoData = {
      country_name: data.country_name,
      country_code: data.country_code,
      city: data.city,
    };
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return {};
  }
}

export function usePageTracking() {
  const location = useLocation();
  const lastPathRef = useRef<string>("");

  useEffect(() => {
    const path = location.pathname + location.search;
    if (path === lastPathRef.current) return;
    lastPathRef.current = path;

    (async () => {
      try {
        const sessionId = getSessionId();
        const geo = await getGeo();
        const { data: { user } } = await supabase.auth.getUser();

        await supabase.from("page_views").insert({
          session_id: sessionId,
          user_id: user?.id ?? null,
          user_email: user?.email ?? null,
          page_path: path,
          country: geo.country_name ?? null,
          country_code: geo.country_code ?? null,
          city: geo.city ?? null,
          device: detectDevice(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });
      } catch (e) {
        // Silent fail — never break the app for analytics
        console.debug("page_view tracking failed", e);
      }
    })();
  }, [location.pathname, location.search]);
}
