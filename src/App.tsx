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

const Index = lazy(() => import("./pages/Index"));
const Lessons = lazy(() => import("./pages/Lessons"));
const LessonDetail = lazy(() => import("./pages/LessonDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const Dictionary = lazy(() => import("./pages/Dictionary"));
const Flashcards = lazy(() => import("./pages/Flashcards"));
const MandombeScript = lazy(() => import("./pages/MandombeScript"));
const Translator = lazy(() => import("./pages/Translator"));
const AdminCorrections = lazy(() => import("./pages/AdminCorrections"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics"));
const MbutaMatondo = lazy(() => import("./pages/MbutaMatondo"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Mvita = lazy(() => import("./pages/Mvita"));
const MotsCroisesPilote = lazy(() => import("./pages/MotsCroisesPilote"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/mandombe" element={<MandombeScript />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/admin/corrections" element={<AdminCorrections />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/mbuta-matondo" element={<MbutaMatondo />} />
                <Route path="/mvita" element={<Mvita />} />
                <Route path="/mots-croises/pilote" element={<MotsCroisesPilote />} />
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
