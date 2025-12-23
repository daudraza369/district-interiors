import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetailClient } from './ProjectDetailClient';
import { getProjectBySlug } from '@/lib/cms';
import { notFound } from 'next/navigation';

// Force dynamic rendering since we fetch from Strapi
export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ProjectDetailClient project={project} />
      </main>
      <Footer />
    </div>
  );
}

