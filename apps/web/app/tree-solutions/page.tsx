import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TreeSolutionsPageClient } from './TreeSolutionsPageClient';

export default function TreeSolutionsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <TreeSolutionsPageClient />
      </main>
      <Footer />
    </div>
  );
}
