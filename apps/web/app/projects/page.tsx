import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectsPageClient } from './ProjectsPageClient';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ProjectsPageClient />
      </main>
      <Footer />
    </div>
  );
}
