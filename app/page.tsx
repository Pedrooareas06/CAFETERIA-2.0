import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { MarqueeBanner } from "@/components/ui/marquee-banner";
import { PromoSection } from "@/components/ui/promoSection";
import { AboutSection } from "@/components/ui/about-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { MenuSection } from "@/components/ui/menu-section";
import { TestimonialsSection } from "@/components/ui/testimonials";
import { OrderingSection } from "@/components/ui/ordering-section";
import { ContactSection } from "@/components/ui/contactSection";
import { Footer } from "@/components/ui/Footer";
import { AIChatbot } from "@/components/ui/ai-chatbot";
import { WhatsAppButton } from "@/components/ui/whatsappButton";

export default function Page() {
  return (
    <main>
      <Navigation />
      <HeroSection />
      <MarqueeBanner />
      <PromoSection />
      <AboutSection />
      <FeaturesSection />
      <MenuSection />
      <TestimonialsSection />
      <OrderingSection />
      <ContactSection />
      <Footer />
      <AIChatbot />
      <WhatsAppButton />
    </main>
  );
}
