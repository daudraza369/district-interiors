import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetailClient } from './ProjectDetailClient';
import { getProjectBySlug } from '@/lib/cms';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

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

