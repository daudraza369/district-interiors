'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { getImageUrl, getMediaUrl, isVideo } from '@/lib/cms';
import type { HeroSection as HeroSectionType } from '@/lib/cms';
import { BeforeAfterSlider } from '@/components/ui/before-after-slider';

interface HeroSectionProps {
  data?: HeroSectionType;
}

const defaultHeroImage = '/hero-interior.jpg';

export function HeroSection({ data }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Use Strapi data if available, otherwise use defaults
  const title = data?.title || 'Where Design Takes Root';
  const subtitle = data?.subtitle || 'Partnering with architects, designers, and fit-out specialists to deliver premium plantscaping and custom greenery for modern interiors.';
  const description = data?.description || 'District Interiors helps invigorate spaces with thoughtful greenery. From bespoke artificial trees and living plant installations to ongoing maintenance, our work blends craftsmanship with smart design to keep every environment fresh and enduring.';
  const primaryButtonText = data?.primaryButtonText || 'Explore Our Work';
  const secondaryButtonText = data?.secondaryButtonText || 'Request a Consultation';
  // Use beforeImage/afterImage for slider, fallback to backgroundImage/heroImage
  // Debug: Log the data to see what we're getting
  if (typeof window !== 'undefined') {
    console.log('Hero Section Data:', data);
    console.log('Before Image:', data?.beforeImage);
    console.log('After Image:', data?.afterImage);
  }
  
  const beforeImageUrl = data?.beforeImage 
    ? getImageUrl(data.beforeImage) 
    : (data?.backgroundImage ? getImageUrl(data.backgroundImage) : defaultHeroImage);
  const afterImageUrl = data?.afterImage 
    ? getImageUrl(data.afterImage) 
    : (data?.heroImage ? getMediaUrl(data.heroImage) : defaultHeroImage);
  
  if (typeof window !== 'undefined') {
    console.log('Before Image URL:', beforeImageUrl);
    console.log('After Image URL:', afterImageUrl);
  }
  // Keep backgroundImageUrl for background (if needed)
  const backgroundImageUrl = data?.backgroundImage ? getImageUrl(data.backgroundImage) : defaultHeroImage;
  const heroMediaUrl = data?.heroImage ? getMediaUrl(data.heroImage) : defaultHeroImage;
  const isHeroVideo = data?.heroImage ? isVideo(data.heroImage) : false;

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  const handlePrimaryButton = () => {
    if (data?.primaryButtonAction === 'link' && data?.primaryButtonLink) {
      window.location.href = data.primaryButtonLink;
    } else {
      const target = data?.primaryButtonScrollTarget || 'portfolio';
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSecondaryButton = () => {
    if (data?.secondaryButtonAction === 'link' && data?.secondaryButtonLink) {
      window.location.href = data.secondaryButtonLink;
    } else {
      const target = data?.secondaryButtonScrollTarget || 'contact';
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact';
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-night-green overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-night-green via-night-green/95 to-night-green/70 z-10" />
        <motion.img
          src={backgroundImageUrl}
          alt="Luxury interior with greenery"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      <div className="absolute inset-0 pattern-overlay z-20 opacity-30" />

      <div className="relative z-30 min-h-screen flex items-center py-0">
        <div className="container-luxury px-6 md:px-12 lg:px-20 py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: '"Kalice-Trial", "Playfair Display", Georgia, serif',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.025em',
                  fontSize: '6rem',
                  lineHeight: 1,
                  marginBottom: '1.5rem',
                  fontWeight: 500, // Kalice-Trial Medium
                  color: '#E0E8C0',
                }}
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl text-stone font-body mb-6 leading-relaxed"
              >
                {subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-body text-stone/80 mb-10 leading-relaxed"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="hero" size="lg" onClick={handlePrimaryButton}>
                  {primaryButtonText}
                </Button>
                <Button variant="heroOutline" size="lg" onClick={handleSecondaryButton}>
                  {secondaryButtonText}
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden border border-ivory/20">
                <motion.div
                  initial={{ height: '100%' }}
                  animate={{ height: '0%' }}
                  transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 right-0 bg-night-green z-[1]"
                />
                <BeforeAfterSlider
                  beforeImage={beforeImageUrl}
                  afterImage={afterImageUrl}
                  beforeLabel="Before"
                  afterLabel="After"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-green/40 to-transparent z-[2] pointer-events-none" />
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 w-40 h-40 bg-pear/20 rounded-full blur-3xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-ivory/60 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-ivory/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
