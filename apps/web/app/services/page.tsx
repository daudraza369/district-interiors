import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesPageClient } from './ServicesPageClient';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ServicesPageClient />
      </main>
      <Footer />
    </div>
  );
}
