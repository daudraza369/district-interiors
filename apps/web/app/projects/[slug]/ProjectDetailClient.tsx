'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';
import { StrapiEntity, Project, getImageUrl, getImageUrlArray } from '@/lib/cms';

interface ProjectDetailClientProps {
  project: StrapiEntity<Project>;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const heroRef = useScrollAnimation<HTMLElement>();
  const contentRef = useScrollAnimation<HTMLElement>();
  
  const attrs = project.attributes;
  const heroImageUrl = attrs.heroImage ? getImageUrl(attrs.heroImage) : null;
  const galleryImages = getImageUrlArray(attrs.gallery);

  return (
    <>
      <section ref={heroRef.ref} className="relative min-h-[70vh] bg-night-green overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/90 to-night-green/60 z-10" />
            <Image src={heroImageUrl} alt={attrs.title} fill className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 pattern-overlay z-20 opacity-20" />
        
        <div className="relative z-30 min-h-[70vh] flex items-end">
          <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={heroRef.isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-sm uppercase tracking-wider text-pear mb-4 block">
                {attrs.projectType} {attrs.location && `· ${attrs.location}`}
              </span>
              <h1 className="text-ivory mb-4">{attrs.title}</h1>
              {attrs.clientName && (
                <p className="text-xl text-stone">{attrs.clientName}</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {attrs.description && (
        <section ref={contentRef.ref} className="section-padding bg-ivory">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <div dangerouslySetInnerHTML={{ __html: attrs.description }} />
            </div>
          </div>
        </section>
      )}

      {attrs.highlights && attrs.highlights.length > 0 && (
        <section className="section-padding bg-pear/20">
          <div className="container-luxury">
            <h2 className="text-night-green mb-8 text-center">Project Highlights</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {attrs.highlights.map((highlight: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentRef.isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-ivory p-6 rounded-sm"
                >
                  <p className="text-slate-moss">{highlight.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {galleryImages.length > 0 && (
        <section className="section-padding bg-ivory">
          <div className="container-luxury">
            <h2 className="text-night-green mb-12 text-center">Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src={img}
                    alt={`${attrs.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {attrs.servicesUsed && attrs.servicesUsed.data && attrs.servicesUsed.data.length > 0 && (
        <section className="section-padding bg-night-green pattern-overlay">
          <div className="container-luxury relative z-10">
            <h2 className="text-ivory mb-8 text-center">Services Used</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {attrs.servicesUsed.data.map((service: any) => (
                <span
                  key={service.id}
                  className="px-6 py-2 bg-ivory/10 text-ivory rounded-sm border border-ivory/20"
                >
                  {service.attributes.title}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

