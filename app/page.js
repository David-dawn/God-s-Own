import HeroSection from "@/components/HeroSection";
import ConfidenceSection from "@/components/ConfidenceSection";
import EncouragementSection from "@/components/EncouragementSection";
import ScriptureSection from "@/components/ScriptureSection";
import LetterSection from "@/components/LetterSection";
import FinalSection from "@/components/FinalSection";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(247,215,123,0.14),transparent_24%),linear-gradient(180deg,#050716_0%,#080b1f_46%,#050716_100%)]" />
      <HeroSection />
      <ConfidenceSection />
      <EncouragementSection />
      <ScriptureSection />
      <LetterSection />
      <FinalSection />
    </main>
  );
}
