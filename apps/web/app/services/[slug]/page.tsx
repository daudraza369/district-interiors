import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServiceDetailClient } from './ServiceDetailClient';
import { getServiceBySlug } from '@/lib/cms';
import { notFound } from 'next/navigation';

// Force dynamic rendering since we fetch from Strapi
export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ServiceDetailClient service={service} />
      </main>
      <Footer />
    </div>
  );
}

