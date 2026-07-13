import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import ProcessSection from "./components/ProcessSection";
import ProfileSection from "./components/ProfileSection";
import DocumentsSection from "./components/DocumentsSection";
import BenefitsSection from "./components/BenefitsSection";
import PricingSection from "./components/PricingSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import TrustSection from "./components/TrustSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ProblemSection />
        <ProcessSection />
        <ProfileSection />
        <DocumentsSection />
        <BenefitsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
    </>
  );
}

