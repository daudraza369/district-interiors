import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "District Interiors transformed our corporate headquarters with stunning greenery that our employees and clients love. The attention to detail was remarkable.",
    name: "Sarah Al-Hassan",
    role: "Facilities Director",
    company: "Tech Solutions Co.",
  },
  {
    quote: "The custom olive trees they created for our hotel lobby are absolutely breathtaking. Guests constantly compliment the natural ambiance.",
    name: "Mohammed Al-Rashid",
    role: "General Manager",
    company: "Crowne Plaza Riyadh",
  },
  {
    quote: "Working with District was seamless. From design to installation, their team exceeded our expectations in every way.",
    name: "Fatima Ahmed",
    role: "Interior Designer",
    company: "Savvy Design Studio",
  },
];

export function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="section-padding bg-lavender relative overflow-hidden">
      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">What Our Clients Say</h2>
          <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
            The trust behind every tree we plant.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-ivory rounded-sm p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Quote className="w-10 h-10 text-pear" />
            </div>

            {/* Testimonial Content */}
            <div className="pt-8 md:pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <blockquote className="text-xl md:text-2xl text-night-green leading-relaxed mb-8 font-body">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {/* Logo Placeholder */}
                    <div className="w-12 h-12 rounded-full bg-stone/30 flex items-center justify-center">
                      <span className="text-night-green/40 text-xs font-bold">
                        {testimonials[currentIndex].name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-night-green">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-slate-moss">
                        {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-night-green/10 hover:bg-night-green hover:text-ivory flex items-center justify-center transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-night-green/10 hover:bg-night-green hover:text-ivory flex items-center justify-center transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:bottom-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-night-green w-6' : 'bg-stone'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
