'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { DualCTA } from '@/lib/cms';

interface DualCTASectionProps {
  data?: DualCTA;
}

// Default fallback data - exact same as original hardcoded content
const defaultData: DualCTA = {
  leftTitle: 'Interior Plantscaping',
  leftSubtitle: 'For offices, hotels, and restaurants',
  leftButtonLabel: 'Explore Plantscaping',
  leftButtonHref: '/services/plantscaping',
  rightTitle: 'Tree Customization & Restoration',
  rightSubtitle: 'For villas, malls, and public spaces',
  rightButtonLabel: 'View Tree Solutions',
  rightButtonHref: '/tree-solutions',
};

export function DualCTASection({ data }: DualCTASectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="grid md:grid-cols-2 md:h-[450px]">
        {/* Left Panel - Interior Plantscaping */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative group h-full"
        >
          <div className="bg-lavender section-padding h-full flex flex-col justify-center items-center text-center transition-colors duration-500 group-hover:bg-lavender/90">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-night-green/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="text-night-green mb-3">{sectionData.leftTitle}</h3>
              {sectionData.leftSubtitle && (
                <p className="text-slate-moss mb-8">{sectionData.leftSubtitle}</p>
              )}
              <Link href={sectionData.leftButtonHref}>
                <Button variant="default" className="group/btn">
                  {sectionData.leftButtonLabel}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Tree Customization */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative group h-full"
        >
          <div className="bg-mauve section-padding h-full flex flex-col justify-center items-center text-center transition-colors duration-500 group-hover:bg-mauve/90">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-bl from-night-green/20 to-transparent" />
            </div>

            <div className="relative z-10 max-w-md">
              <h3 className="text-night-green mb-3">{sectionData.rightTitle}</h3>
              {sectionData.rightSubtitle && (
                <p className="text-slate-moss mb-8">{sectionData.rightSubtitle}</p>
              )}
              <Link href={sectionData.rightButtonHref}>
                <Button variant="default" className="group/btn">
                  {sectionData.rightButtonLabel}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
