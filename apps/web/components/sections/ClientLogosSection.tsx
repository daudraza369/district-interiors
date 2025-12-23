'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { getImageUrl } from '@/lib/media-utils';
import type { ClientLogosSection as ClientLogosSectionType } from '@/lib/cms';

interface ClientLogosSectionProps {
  data?: ClientLogosSectionType;
}

// Define a proper type for client items (discriminated union)
type ClientItem = 
  | { name: string; placeholder: true }
  | { name: string; logo: { data: any }; websiteUrl?: string; placeholder: false };

const defaultClients: ClientItem[] = [
  { name: 'PepsiCo', placeholder: true },
  { name: 'Savvy', placeholder: true },
  { name: 'Crowne Plaza', placeholder: true },
  { name: 'Client 4', placeholder: true },
  { name: 'Client 5', placeholder: true },
  { name: 'Client 6', placeholder: true },
];

export function ClientLogosSection({ data }: ClientLogosSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  // Extract title, subtitle, and logos from Strapi data
  const title = data?.title || 'Trusted By Leading Brands';
  const subtitle = data?.subtitle || 'Proud collaborations with top names in hospitality and design.';

  // Helper to convert logo items to client format
  const convertLogosToClients = (logos?: ClientLogosSectionType['row1Logos']): ClientItem[] => {
    if (!logos || logos.length === 0) return [];
    return logos.map((logoItem) => ({
      name: logoItem.clientName,
      logo: logoItem.logo,
      websiteUrl: logoItem.websiteUrl,
      placeholder: false as const,
    }));
  };

  // Get logos for each row (with fallback to defaults if no Strapi data)
  const row1Clients: ClientItem[] = data && data.row1Logos && data.row1Logos.length > 0
    ? convertLogosToClients(data.row1Logos)
    : defaultClients;
  
  const row2Clients: ClientItem[] = data && data.row2Logos && data.row2Logos.length > 0
    ? convertLogosToClients(data.row2Logos)
    : defaultClients;

  // Visibility flags (default to true if not specified)
  const showRow1 = data?.showRow1 !== false; // Show by default
  const showRow2 = data?.showRow2 !== false; // Show by default

  return (
    <section ref={ref} className="section-padding bg-[#E0E8C0] overflow-hidden">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-night-green mb-4">{title}</h2>
          {subtitle && (
            <p className="text-body-large text-slate-moss max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="marquee-wrapper">
        {/* First Marquee Row - Separate Section */}
        {showRow1 && (
          <div className="marquee">
            <div className="marquee__group">
              {row1Clients.map((client, index) => (
                <div
                  key={`row1-${index}`}
                  className="marquee__item"
                >
                  {client.placeholder ? (
                    <div className="w-32 h-16 flex items-center justify-center opacity-40">
                      <div className="w-24 h-10 bg-slate-moss/30 rounded flex items-center justify-center">
                        <span className="text-night-green/60 text-xs font-semibold tracking-wider">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  ) : client.logo ? (
                    <img
                      src={getImageUrl(client.logo) || ''}
                      alt={client.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee__group">
              {row1Clients.map((client, index) => (
                <div
                  key={`row1-duplicate-${index}`}
                  className="marquee__item"
                >
                  {client.placeholder ? (
                    <div className="w-32 h-16 flex items-center justify-center opacity-40">
                      <div className="w-24 h-10 bg-slate-moss/30 rounded flex items-center justify-center">
                        <span className="text-night-green/60 text-xs font-semibold tracking-wider">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  ) : client.logo ? (
                    <img
                      src={getImageUrl(client.logo) || ''}
                      alt={client.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Second Marquee Row - Separate Section (Reversed - Right to Left) */}
        {showRow2 && (
          <div className="marquee marquee--reverse">
            <div className="marquee__group">
              {row2Clients.map((client, index) => (
                <div
                  key={`row2-${index}`}
                  className="marquee__item"
                >
                  {client.placeholder ? (
                    <div className="w-32 h-16 flex items-center justify-center opacity-40">
                      <div className="w-24 h-10 bg-slate-moss/30 rounded flex items-center justify-center">
                        <span className="text-night-green/60 text-xs font-semibold tracking-wider">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  ) : client.logo ? (
                    <img
                      src={getImageUrl(client.logo) || ''}
                      alt={client.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  ) : null}
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee__group">
              {row2Clients.map((client, index) => (
                <div
                  key={`row2-duplicate-${index}`}
                  className="marquee__item"
                >
                  {client.placeholder ? (
                    <div className="w-32 h-16 flex items-center justify-center opacity-40">
                      <div className="w-24 h-10 bg-slate-moss/30 rounded flex items-center justify-center">
                        <span className="text-night-green/60 text-xs font-semibold tracking-wider">
                          {client.name}
                        </span>
                      </div>
                    </div>
                  ) : client.logo ? (
                    <img
                      src={getImageUrl(client.logo) || ''}
                      alt={client.name}
                      className="h-12 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
