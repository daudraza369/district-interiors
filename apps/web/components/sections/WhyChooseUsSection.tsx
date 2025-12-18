'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Leaf, Palette, Recycle, Award, Building2, Shield, Clock, Users, Heart, Star } from 'lucide-react';
import type { WhyChooseUs as WhyChooseUsType } from '@/lib/cms';

interface WhyChooseUsSectionProps {
  data?: WhyChooseUsType;
}

// Icon mapping
const iconMap: Record<string, typeof Leaf> = {
  leaf: Leaf,
  palette: Palette,
  recycle: Recycle,
  award: Award,
  building2: Building2,
  shield: Shield,
  clock: Clock,
  users: Users,
  heart: Heart,
  star: Star,
};

// Default fallback data
const defaultData: WhyChooseUsType = {
  title: 'Why Clients Choose District Interiors',
  subtitle: 'Trusted by leading companies for our flexibility, fast turnaround, and dependable delivery in office environments.',
  features: [
    {
      icon: 'leaf',
      title: 'Dual Expertise',
      description: 'Specialists in both natural and artificial greenery.',
      displayOrder: 0,
    },
    {
      icon: 'palette',
      title: 'Customization',
      description: 'Trees, planters, and layouts tailored to every project.',
      displayOrder: 1,
    },
    {
      icon: 'recycle',
      title: 'Sustainability',
      description: 'Eco-focused solutions and long-term maintenance.',
      displayOrder: 2,
    },
    {
      icon: 'award',
      title: 'Quality Assurance',
      description: 'Realistic greenery and reliable upkeep.',
      displayOrder: 3,
    },
    {
      icon: 'building2',
      title: 'Luxury Reach',
      description: 'Serving villas, hotels, and premium corporate projects.',
      displayOrder: 4,
    },
  ],
};

export function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;
  const title = sectionData.title;
  const subtitle = sectionData.subtitle;
  const features = sectionData.features || [];

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-night-green mb-4">{title}</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Feature Cards - Horizontal scroll on mobile, 5 columns on desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:pb-0 scrollbar-hide">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Leaf;
            return (
              <motion.div
                key={`${feature.title}-${index}`}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5 }}
                className="group flex-shrink-0 w-[260px] sm:w-[220px] lg:w-auto snap-center bg-[#E0E8C0] p-5 lg:p-6 hover:bg-pear/10 transition-all duration-500"
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-night-green/10 flex items-center justify-center mb-5 group-hover:bg-pear/40 transition-colors duration-300"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : {}}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <motion.div
                    animate={isVisible ? { 
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ 
                      delay: index * 0.2,
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <IconComponent className="w-7 h-7 text-night-green" />
                  </motion.div>
                </motion.div>
                <h4 className="text-night-green mb-2 text-base lg:text-lg">{feature.title}</h4>
                <p className="text-slate-moss text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
