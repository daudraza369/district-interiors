import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const clients = [
  { name: 'PepsiCo', placeholder: true },
  { name: 'Savvy', placeholder: true },
  { name: 'Crowne Plaza', placeholder: true },
  { name: 'Client 4', placeholder: true },
  { name: 'Client 5', placeholder: true },
  { name: 'Client 6', placeholder: true },
];

export function ClientLogosSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  // Duplicate for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <section ref={ref} className="section-padding bg-ivory overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">Trusted By Leading Brands</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            Proud collaborations with top names in hospitality and design.
          </p>
        </motion.div>
      </div>

      {/* Logo Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 px-12 md:px-16 lg:px-20 flex items-center justify-center group cursor-pointer"
            >
              {/* Logo Placeholder */}
              <div className="w-32 h-16 flex items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                <div className="text-center">
                  <div className="w-24 h-10 bg-slate-moss/30 rounded flex items-center justify-center">
                    <span className="text-night-green/60 text-xs font-semibold tracking-wider">
                      {client.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
