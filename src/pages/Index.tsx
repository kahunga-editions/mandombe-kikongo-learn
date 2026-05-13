import Navbar from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import LearningPaths from "@/components/LearningPaths";
import VerbeBaSection from "@/components/VerbeBaSection";
import NtaluSection from "@/components/NtaluSection";
import VocabularyPreview from "@/components/VocabularyPreview";
import StoryPreview from "@/components/StoryPreview";
import KilolakaPreview from "@/components/KilolakaPreview";
import PremiumSection from "@/components/PremiumSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Nzo Mikanda — Apprendre le Kikongo Lari et le Mandombe"
        description="Plateforme d'apprentissage autonome du Kikongo Lari et de l'écriture Mandombe : leçons, dictionnaire, traducteur, contes et exercices interactifs."
        path="/"
      />
      <Navbar />
      <HeroSection />
      <LearningPaths />
      <VerbeBaSection />
      <NtaluSection />
      <VocabularyPreview />
      <StoryPreview />
      <KilolakaPreview />
      <PremiumSection />
      <Footer />
    </div>
  );
};

export default Index;
