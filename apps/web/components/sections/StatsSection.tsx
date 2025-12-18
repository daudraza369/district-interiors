'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, useCountAnimation } from '@/hooks/useScrollAnimation';
import type { StatsSection as StatsSectionType, StatItem } from '@/lib/cms';

interface StatsSectionProps {
  data?: StatsSectionType;
}

// Default fallback data - exact same as before
const defaultData: StatsSectionType = {
  title: 'Growing Impact Across the Region',
  stats: [
    { value: 250, suffix: '+', label: 'Projects Completed across the Kingdom', isText: false, displayOrder: 0 },
    { value: 97, suffix: '', label: 'Locations Maintained monthly', isText: false, displayOrder: 1 },
    { value: 1200, suffix: '+', label: 'Plants Installed and cared for', isText: false, displayOrder: 2 },
    { value: 3, suffix: '–5 Days', label: 'Average installation turnaround', isText: true, displayOrder: 3 },
  ],
};

function StatCard({ stat, index, isVisible }: { stat: StatItem; index: number; isVisible: boolean }) {
  const count = useCountAnimation(stat.isText ? 0 : stat.value, 2000, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="text-center p-8 bg-ivory border border-stone/20 rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-5xl md:text-6xl font-heading text-night-green mb-3">
        {stat.isText ? (
          <span>{stat.value}{stat.suffix}</span>
        ) : (
          <span>{count}{stat.suffix}</span>
        )}
      </div>
      <p className="text-slate-moss text-sm leading-relaxed">{stat.label}</p>
    </motion.div>
  );
}

export function StatsSection({ data }: StatsSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  
  // Use Strapi data if available, otherwise use defaults
  const sectionData = data || defaultData;
  const title = sectionData.title || 'Growing Impact Across the Region';
  const stats = sectionData.stats || [];

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

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={`${stat.label}-${index}`} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
