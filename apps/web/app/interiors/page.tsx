import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { CollectionPreviewSection } from '@/components/sections/CollectionPreviewSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
// import { AboutSnapshotSection } from '@/components/sections/AboutSnapshotSection';
import { DualCTASection } from '@/components/sections/DualCTASection';
import { StatsSection } from '@/components/sections/StatsSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
// import { PortfolioSection } from '@/components/sections/PortfolioSection';
// import { GallerySection } from '@/components/sections/GallerySection';
// import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { TreeConsultationPreview } from '@/components/sections/TreeConsultationPreview';
import { MaintenanceSection } from '@/components/sections/MaintenanceSection';
import { ContactSection } from '@/components/sections/ContactSection';
import {
  getHeroSection,
  getPageSections,
  getWhyChooseUs,
  getCollectionPreview,
  getServicesSection,
  getAboutSnapshot,
  getDualCTA,
  getStatsSection,
  getClientLogos,
} from '@/lib/cms';

// Force dynamic rendering to always fetch fresh data from Strapi
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InteriorsPage() {
  // Fetch all data from Strapi (gracefully handle errors)
  const [
    heroData,
    pageSections,
    whyChooseUsData,
    collectionPreviewData,
    servicesSectionData,
    aboutSnapshotData,
    dualCTAData,
    statsSectionData,
    clientLogosData,
  ] = await Promise.all([
    getHeroSection().catch(() => null), // Return null on error
    getPageSections('home').catch(() => []), // Return empty array on error
    getWhyChooseUs().catch(() => null), // Return null on error
    getCollectionPreview().catch(() => null), // Return null on error
    getServicesSection().catch(() => null), // Return null on error
    getAboutSnapshot().catch(() => null), // Return null on error
    getDualCTA().catch(() => null), // Return null on error
    getStatsSection().catch(() => null), // Return null on error
    getClientLogos().catch(() => null), // Return null on error
  ]);

  // Create a map of sections by key for easy access
  const sectionsMap = new Map();
  if (pageSections && Array.isArray(pageSections)) {
    pageSections.forEach(section => {
      sectionsMap.set(section.attributes.sectionKey, section.attributes.content);
    });
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <HeroSection data={heroData?.attributes} />
        <ClientLogosSection data={clientLogosData?.attributes} />
        <WhyChooseUsSection data={whyChooseUsData?.attributes} />
        {/* <CollectionPreviewSection data={collectionPreviewData?.attributes} /> */}
        <ServicesSection data={servicesSectionData?.attributes} />
        {/* <AboutSnapshotSection data={aboutSnapshotData?.attributes} /> */}
        <DualCTASection data={dualCTAData?.attributes} />
        <StatsSection data={statsSectionData?.attributes} />
        {/* <PortfolioSection /> */}
        {/* <GallerySection /> */}
        {/* <TestimonialsSection /> */}
        <TreeConsultationPreview />
        <MaintenanceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}






