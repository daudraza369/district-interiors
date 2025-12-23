import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailClient } from './ProductDetailClient';
import { getProductBySlug } from '@/lib/cms';
import { notFound } from 'next/navigation';

// Force dynamic rendering since we fetch from Strapi
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </div>
  );
}

