import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { CollectionPreviewSection } from '@/components/sections/CollectionPreviewSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSnapshotSection } from '@/components/sections/AboutSnapshotSection';
import { DualCTASection } from '@/components/sections/DualCTASection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TreeConsultationPreview } from '@/components/sections/TreeConsultationPreview';
import { MaintenanceSection } from '@/components/sections/MaintenanceSection';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <HeroSection />
        <WhyChooseUsSection />
        <CollectionPreviewSection />
        <ServicesSection />
        <AboutSnapshotSection />
        <DualCTASection />
        <StatsSection />
        <ClientLogosSection />
        <PortfolioSection />
        <GallerySection />
        <TestimonialsSection />
        <TreeConsultationPreview />
        <MaintenanceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
