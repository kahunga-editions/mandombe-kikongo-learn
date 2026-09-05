import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PageTracker } from "./components/PageTracker";
import { CookieConsent } from "./components/CookieConsent";

// Retries a dynamic import once, then forces a single hard reload.
// Handles stale chunk hashes after a new deployment.
const lazyWithRetry = <T extends { default: React.ComponentType<any> }>(
  importer: () => Promise<T>
) =>
  lazy(async () => {
    const RELOAD_KEY = "chunk-reload-attempted";
    try {
      const mod = await importer();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (error) {
      if (!sessionStorage.getItem(RELOAD_KEY)) {
        sessionStorage.setItem(RELOAD_KEY, "1");
        window.location.reload();
        return new Promise<T>(() => {});
      }
      throw error;
    }
  });

const Index = lazyWithRetry(() => import("./pages/Index"));
const Lessons = lazyWithRetry(() => import("./pages/Lessons"));
const LessonDetail = lazyWithRetry(() => import("./pages/LessonDetail"));
const Auth = lazyWithRetry(() => import("./pages/Auth"));
const Dictionary = lazyWithRetry(() => import("./pages/Dictionary"));
const Flashcards = lazyWithRetry(() => import("./pages/Flashcards"));
const MandombeScript = lazyWithRetry(() => import("./pages/MandombeScript"));
const Translator = lazyWithRetry(() => import("./pages/Translator"));
const AdminCorrections = lazyWithRetry(() => import("./pages/AdminCorrections"));
const AdminAnalytics = lazyWithRetry(() => import("./pages/AdminAnalytics"));
const AdminIllustrations = lazyWithRetry(() => import("./pages/AdminIllustrations"));
const MbutaMatondo = lazyWithRetry(() => import("./pages/MbutaMatondo"));
const Privacy = lazyWithRetry(() => import("./pages/Privacy"));
const Mvita = lazyWithRetry(() => import("./pages/Mvita"));
const Conjugations = lazyWithRetry(() => import("./pages/Conjugations"));

const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const routeFallback = (
  <div className="min-h-screen bg-background text-muted-foreground grid place-items-center">
    Chargement...
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <PageTracker />
            <Suspense fallback={routeFallback}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/lessons" element={<Lessons />} />
                <Route path="/lessons/:lessonId" element={<LessonDetail />} />
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/conjugations" element={<Conjugations />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/mandombe" element={<MandombeScript />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/admin/corrections" element={<AdminCorrections />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/illustrations" element={<AdminIllustrations />} />

                <Route path="/mbuta-matondo" element={<MbutaMatondo />} />
                <Route path="/mvita" element={<Mvita />} />
                
                <Route path="/privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <CookieConsent />
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
