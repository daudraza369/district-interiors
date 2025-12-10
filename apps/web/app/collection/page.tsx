import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CollectionPageClient } from './CollectionPageClient';

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <CollectionPageClient />
      </main>
      <Footer />
    </div>
  );
}
