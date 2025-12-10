import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductDetailClient } from './ProductDetailClient';
import { getProductBySlug } from '@/lib/cms';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

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

