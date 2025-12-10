import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AboutPageClient } from './AboutPageClient';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <AboutPageClient />
      </main>
      <Footer />
    </div>
  );
}
