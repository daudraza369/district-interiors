'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SuccessPageClientProps {
  sessionId?: string;
}

export function SuccessPageClient({ sessionId }: SuccessPageClientProps) {
  const heroRef = useScrollAnimation<HTMLElement>();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Optionally verify session with Stripe
      // For now, just show success
      setVerified(true);
    }
  }, [sessionId]);

  return (
    <>
      <section ref={heroRef.ref} className="relative py-32 bg-pear overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10" />
        <div className="container-luxury relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroRef.isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <CheckCircle className="w-24 h-24 mx-auto text-night-green mb-6" />
            <h1 className="text-night-green mb-6">Thank You!</h1>
            <p className="text-xl text-slate-moss mb-4">
              Your order has been received and is being processed.
            </p>
            <p className="text-slate-moss/80 mb-8">
              We'll send you a confirmation email shortly with your order details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/collection">
                <Button variant="default" size="lg">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="heroOutline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

