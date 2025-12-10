import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Suspense } from 'react';

async function SuccessContent() {
  // In a real implementation, you could verify the Stripe session here
  // and fetch order details from Strapi using the session ID
  
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <section className="section-padding bg-ivory">
          <div className="container-luxury max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle2 className="w-24 h-24 mx-auto text-pear mb-6" />
              <h1 className="text-night-green mb-4">Order Confirmed!</h1>
              <p className="text-xl text-slate-moss mb-6">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <p className="text-slate-moss/80 mb-8">
                You will receive an email confirmation shortly with your order details and tracking information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection">
                <Button variant="default" size="lg">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary" size="lg">
                  View Our Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-night-green"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
