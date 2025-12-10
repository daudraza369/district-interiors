import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main className="flex items-center justify-center min-h-[60vh]">
        <div className="container-luxury text-center">
          <h1 className="text-night-green mb-4">404</h1>
          <h2 className="text-night-green mb-6">Page Not Found</h2>
          <p className="text-slate-moss mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button variant="default" size="lg">
              Back to Home
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

