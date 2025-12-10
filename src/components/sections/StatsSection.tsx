import { motion } from 'framer-motion';
import { useScrollAnimation, useCountAnimation } from '@/hooks/useScrollAnimation';

const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed across the Kingdom' },
  { value: 97, suffix: '', label: 'Locations Maintained monthly' },
  { value: 1200, suffix: '+', label: 'Plants Installed and cared for' },
  { value: 3, suffix: '–5 Days', label: 'Average installation turnaround', isText: true },
];

function StatCard({ stat, index, isVisible }: { stat: typeof stats[0]; index: number; isVisible: boolean }) {
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

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

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
          <h2 className="text-night-green">Growing Impact Across the Region</h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
