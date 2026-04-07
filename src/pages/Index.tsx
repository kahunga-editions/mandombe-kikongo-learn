import Navbar from "@/components/Navbar";
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
