'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getImageUrl } from '@/lib/media-utils';
import type { AboutSnapshot } from '@/lib/cms';

interface AboutSnapshotSectionProps {
  data?: AboutSnapshot;
}

const defaultImage = '/hotel-atrium.jpg';

// Default fallback data - exact same as before
const defaultData: AboutSnapshot = {
  title: 'Designed to Breathe Life Into Spaces',
  subtitle: 'A design-driven approach to greenery.',
  description: 'District Interiors specializes in transforming indoor and outdoor environments through expert plantscaping, luxury softscaping, and custom tree fabrication. Our mission is simple: to merge natural aesthetics with architectural precision to deliver beauty, sustainability, and comfort.',
  imageUrl: defaultImage,
  imageAlt: 'Luxury hotel atrium with greenery installations',
};

export function AboutSnapshotSection({ data }: AboutSnapshotSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;
  const title = sectionData.title || 'Designed to Breathe Life Into Spaces';
  const subtitle = sectionData.subtitle || 'A design-driven approach to greenery.';
  const description = sectionData.description || defaultData.description;
  const imageUrl = sectionData.image ? (getImageUrl(sectionData.image) || defaultImage) : (sectionData.imageUrl || defaultImage);
  const imageAlt = sectionData.imageAlt || 'Luxury hotel atrium with greenery installations';

  return (
    <section ref={ref} className="section-padding bg-night-green pattern-overlay relative overflow-hidden">
      <div className="container-luxury relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-ivory mb-6">{title}</h2>
            {subtitle && <p className="text-xl text-stone mb-4">{subtitle}</p>}
            <p className="text-body text-stone/80 leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-green/30 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pear/20 rounded-sm -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-ivory/20 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Background decorative element */}
      <div className="absolute top-1/2 right-0 w-1/3 h-1/2 bg-gradient-to-l from-pear/5 to-transparent -translate-y-1/2" />
    </section>
  );
}
