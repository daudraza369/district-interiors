'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/cms';
import type { CollectionPreview as CollectionPreviewType } from '@/lib/cms';

interface CollectionPreviewSectionProps {
  data?: CollectionPreviewType;
}

const oliveTreeImg = '/collection-olive-tree.jpg';
const ficusTreeImg = '/collection-ficus-tree.jpg';
const palmTreeImg = '/collection-palm-tree.jpg';
const flowersImg = '/flowers-collection.jpg';
const greenWallImg = '/green-wall.jpg';
const plantersImg = '/planters.jpg';

// Default fallback data - exact same as before
const defaultData: CollectionPreviewType = {
  title: 'Explore Our Collection',
  subtitle: 'Premium greenery solutions for every environment.',
  collections: [{
    title: 'Trees',
    description: 'Curated artificial and natural trees sized for villas, offices, and commercial spaces.',
    imageUrl: oliveTreeImg,
    displayOrder: 0
  }, {
    title: 'Flowers',
    description: 'Floral arrangements and stems that add refined color and softness.',
    imageUrl: flowersImg,
    displayOrder: 1
  }, {
    title: 'Leaves/Foliage',
    description: 'Dense, realistic foliage to build volume and texture into your designs.',
    imageUrl: ficusTreeImg,
    displayOrder: 2
  }, {
    title: 'Green Walls',
    description: 'Vertical installations that bring nature into every corner.',
    imageUrl: greenWallImg,
    displayOrder: 3
  }, {
    title: 'Trunks and Branches',
    description: 'Custom trunks and branch structures for unique sculptural statements.',
    imageUrl: palmTreeImg,
    displayOrder: 4
  }, {
    title: 'Planters',
    description: 'GRC, acrylic, and stone planters tailored to your space.',
    imageUrl: plantersImg,
    displayOrder: 5
  }]
};

export function CollectionPreviewSection({ data }: CollectionPreviewSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;
  const title = sectionData.title;
  const subtitle = sectionData.subtitle;
  const collections = sectionData.collections || [];
  
  return (
    <section ref={ref} className="section-padding bg-pear">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">{title}</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Collection Grid - 3 per row consistent with services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, index) => {
            // Get image URL - use Strapi image if available, otherwise use imageUrl fallback
            const imageUrl = item.image ? (getImageUrl(item.image) || oliveTreeImg) : (item.imageUrl || oliveTreeImg);
            return (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="h-full"
              >
                <Link href="/collection" className="group block bg-ivory rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                  {/* Image - same aspect ratio as services */}
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-night-green/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center shadow-md">
                      <span className="text-ivory flex items-center gap-2 text-sm uppercase tracking-wider font-semibold">
                        View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Content - same padding and structure as services */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-night-green mb-3 text-lg group-hover:text-slate-moss transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-moss text-sm leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
