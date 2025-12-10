import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartPageClient } from './CartPageClient';
import { getProducts, getShippingOptions } from '@/lib/cms';

export const revalidate = 3600;

export default async function CartPage() {
  const [productsData, shippingOptions] = await Promise.all([
    getProducts({ page: 1, pageSize: 1000 }),
    getShippingOptions(),
  ]);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <CartPageClient 
          allProducts={productsData.data}
          shippingOptions={shippingOptions}
        />
      </main>
      <Footer />
    </div>
  );
}

