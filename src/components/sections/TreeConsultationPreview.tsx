import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import oliveTree from '@/assets/olive-tree.jpg';

export function TreeConsultationPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="section-padding bg-ivory">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-night-green mb-6">Guided Tree Design, Tailored to Your Space</h2>
            <p className="text-xl text-slate-moss mb-4">
              From idea to installation, we help you choose, customize, and install trees that transform your environment.
            </p>
            <p className="text-body text-slate-moss/80 leading-relaxed mb-8">
              Our consultation process ensures each project fits seamlessly within your environment, budget, and design intent. We guide you through every stage: choosing the right tree type, defining size and material, and planning the installation timeline.
            </p>
            <Link to="/tree-solutions">
              <Button variant="default" size="lg" className="group">
                Book a Consultation & Get Your Tree
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-video rounded-sm overflow-hidden shadow-2xl">
              <img
                src={oliveTree}
                alt="Custom olive tree installation"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-pear/40 rounded-sm -z-10"
            />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-night-green/20 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
