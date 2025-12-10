import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ContactPageClient } from './ContactPageClient';

export const revalidate = 3600;

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <ContactPageClient />
      </main>
      <Footer />
    </div>
  );
}

