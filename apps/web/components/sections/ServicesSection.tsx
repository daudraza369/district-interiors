'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getImageUrl } from '@/lib/media-utils';
import type { ServicesSection as ServicesSectionType } from '@/lib/cms';

interface ServicesSectionProps {
  data?: ServicesSectionType;
}

const plantscapingImg = '/plantscaping-service.jpg';
const treeCustomizationImg = '/tree-customization-service.jpg';
const treeRestorationImg = '/tree-restoration-service.jpg';
const greenWallImg = '/green-wall.jpg';
const customPlanterImg = '/custom-planter-service.jpg';
const maintenanceImg = '/maintenance-service.jpg';

// Default fallback data - exact same as before
const defaultData: ServicesSectionType = {
  title: 'Explore Our Services',
  services: [
    {
      title: 'Office & F&B Plantscaping',
      description: 'Greenery that works as hard as your space. Purposeful greenery that improves focus, comfort, and the way people experience space.',
      cta: 'Learn More',
      href: '/services/plantscaping',
      imageUrl: plantscapingImg,
      displayOrder: 0,
    },
    {
      title: 'Tree Customization',
      description: 'Your vision, brought to life in green. We design custom artificial trees with bespoke sizing, foliage density, and finishes that match your project\'s scale and aesthetic.',
      cta: 'Book a Consultation',
      href: '/services/tree-customization',
      imageUrl: treeCustomizationImg,
      displayOrder: 1,
    },
    {
      title: 'Tree Restoration',
      description: 'Breathe new life into your existing trees. Our specialists revive artificial and natural trees with UV-graded materials, extending beauty and lifespan.',
      cta: 'View More',
      href: '/services/tree-restoration',
      imageUrl: treeRestorationImg,
      displayOrder: 2,
    },
    {
      title: 'Green Wall Installations',
      description: 'Design vertical landscapes that inspire. We create artificial, natural, and preserved moss walls, integrating irrigation and lighting for lasting impact.',
      cta: 'Discover',
      href: '/services/green-walls',
      imageUrl: greenWallImg,
      displayOrder: 3,
    },
    {
      title: 'Custom Planter Design',
      description: 'Planters made to match your design vision. Crafted in GRC, acrylic, or stone, our planters complement interiors and exteriors with elegance and durability.',
      cta: 'See Collection',
      href: '/services/planters',
      imageUrl: customPlanterImg,
      displayOrder: 4,
    },
    {
      title: 'Natural Plant Maintenance',
      description: 'Keeping every plant at its best. Routine watering, pruning, and replacement programs ensure your greenery remains vibrant and flawless.',
      cta: 'Learn More',
      href: '/services/maintenance',
      imageUrl: maintenanceImg,
      displayOrder: 5,
    },
  ],
};

export function ServicesSection({ data }: ServicesSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;
  const title = sectionData.title || 'Explore Our Services';
  const services = sectionData.services || [];

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green">{title}</h2>
        </motion.div>

        {/* Services Grid - 3 per row on all breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // Get image URL - use Strapi image if available, otherwise use imageUrl fallback
            const imageUrl = service.image ? (getImageUrl(service.image) || plantscapingImg) : (service.imageUrl || plantscapingImg);
            return (
              <motion.div
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group h-full"
              >
                <div className="bg-ivory border border-stone/30 rounded-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[4/3] relative overflow-hidden flex-shrink-0">
                    <img
                      src={imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-night-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-night-green mb-3 text-lg">{service.title}</h4>
                  <p className="text-slate-moss text-sm leading-relaxed mb-5 flex-grow">
                    {service.description}
                  </p>
                  <Link href={service.href || service.link || '#'}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="group/btn w-full sm:w-auto"
                    >
                      {service.cta}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
