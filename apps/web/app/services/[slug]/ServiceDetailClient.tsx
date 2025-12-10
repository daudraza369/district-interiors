'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { StrapiEntity, Service, getImageUrl } from '@/lib/cms';

interface ServiceDetailClientProps {
  service: StrapiEntity<Service>;
}

export function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const heroRef = useScrollAnimation<HTMLElement>();
  const contentRef = useScrollAnimation<HTMLElement>();
  
  const attrs = service.attributes;
  const heroImageUrl = attrs.heroImage ? getImageUrl(attrs.heroImage) : null;

  return (
    <>
      <section ref={heroRef.ref} className="relative min-h-[60vh] bg-night-green overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/95 to-night-green/70 z-10" />
            <Image src={heroImageUrl} alt={attrs.title} fill className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 pattern-overlay z-20 opacity-20" />
        
        <div className="relative z-30 min-h-[60vh] flex items-center">
          <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-ivory mb-6"
            >
              {attrs.title}
            </motion.h1>
            {attrs.shortDescription && (
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-stone max-w-2xl"
              >
                {attrs.shortDescription}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {attrs.longDescription && (
        <section ref={contentRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: attrs.longDescription }} />
            </div>
          </div>
        </section>
      )}

      {attrs.keyBenefits && attrs.keyBenefits.length > 0 && (
        <section className="section-padding bg-pear/20">
          <div className="container-luxury">
            <h2 className="text-night-green mb-12 text-center">Key Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attrs.keyBenefits.map((benefit: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={contentRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-ivory p-6 rounded-sm"
                >
                  <h3 className="text-night-green mb-3">{benefit.title}</h3>
                  {benefit.description && (
                    <p className="text-slate-moss/80">{benefit.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {attrs.processSteps && attrs.processSteps.length > 0 && (
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="text-night-green mb-12 text-center">Our Process</h2>
            <div className="space-y-8 max-w-3xl mx-auto">
              {attrs.processSteps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  animate={contentRef.isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-night-green text-ivory flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-night-green mb-2">{step.title}</h3>
                    {step.description && (
                      <p className="text-slate-moss/80">{step.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-night-green pattern-overlay">
        <div className="container-luxury relative z-10 text-center">
          <h2 className="text-ivory mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-stone mb-8 max-w-2xl mx-auto">
            Contact us to discuss your project and learn how we can help.
          </p>
          <Link href="/contact">
            <Button variant="hero" size="lg">
              Request a Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

