import bootstrapPermissions from './bootstrap';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Register custom routes with GET and PUT support
    // IMPORTANT: PUT routes must be registered to allow content population via API
    // These routes override default Strapi REST API routes but add PUT support
    try {
      strapi.server.routes([
      {
        method: 'GET',
        path: '/api/hero-section',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::hero-section.hero-section', {
              populate: ['backgroundImage', 'heroImage', 'beforeImage', 'afterImage'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, backgroundImage, heroImage, beforeImage, afterImage, ...otherAttributes } = entity;
            
            // Format media
            const formatMedia = (media: any) => {
              if (!media) return null;
              // If already formatted (has data property), return as is
              if (media.data) return media;
              // Handle array of media
              if (Array.isArray(media)) {
                return {
                  data: media.map((m: any) => {
                    const { id: mediaId, ...mediaAttributes } = m;
                    return {
                      id: mediaId,
                      attributes: mediaAttributes
                    };
                  })
                };
              }
              // Handle single media object - check if it's a Strapi entity structure
              if (media.id && media.url) {
                // Direct media object from entityService
                const { id: mediaId, ...mediaAttributes } = media;
                return {
                  data: {
                    id: mediaId,
                    attributes: mediaAttributes
                  }
                };
              }
              // Fallback: assume it's already in the right format or handle differently
              return media;
            };
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  backgroundImage: formatMedia(backgroundImage),
                  heroImage: formatMedia(heroImage),
                  beforeImage: formatMedia(beforeImage),
                  afterImage: formatMedia(afterImage)
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'HeroSectionError',
                message: error.message || 'Error fetching Hero Section',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      // PUT handler for Hero Section - temporarily disabled to fix Gateway Timeout
      // Will be re-enabled after Strapi is stable
      // {
      //   method: 'PUT',
      //   path: '/api/hero-section',
      //   handler: async (ctx) => {
      //     try {
      //       const existing = await strapi.entityService.findMany('api::hero-section.hero-section');
      //       const entity = Array.isArray(existing) ? existing[0] : existing;
      //       const data = ctx.request.body?.data || ctx.request.body;
      //       
      //       if (entity && entity.id) {
      //         const updated = await strapi.entityService.update('api::hero-section.hero-section', entity.id, {
      //           data,
      //           populate: ['backgroundImage', 'heroImage', 'beforeImage', 'afterImage'],
      //         });
      //         ctx.body = { data: { id: updated.id, attributes: updated } };
      //       } else {
      //         const created = await strapi.entityService.create('api::hero-section.hero-section', {
      //           data,
      //           populate: ['backgroundImage', 'heroImage', 'beforeImage', 'afterImage'],
      //         });
      //         ctx.body = { data: { id: created.id, attributes: created } };
      //       }
      //       ctx.status = 200;
      //     } catch (error: any) {
      //       console.error('PUT /api/hero-section error:', error);
      //       ctx.status = 500;
      //       ctx.body = { error: { status: 500, name: 'HeroSectionError', message: error.message } };
      //     }
      //   },
      //   config: { auth: false, policies: [], middlewares: [] },
      // },
      {
        method: 'GET',
        path: '/api/why-choose-us',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::why-choose-us.why-choose-us', {
              populate: ['features'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, ...otherAttributes } = entity;
            
            ctx.body = { 
              data: {
                id,
                attributes: otherAttributes
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'WhyChooseUsError',
                message: error.message || 'Error fetching Why Choose Us',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/why-choose-us',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::why-choose-us.why-choose-us');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::why-choose-us.why-choose-us', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::why-choose-us.why-choose-us', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/collection-preview',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::collection-preview.collection-preview', {
              populate: ['collections', 'collections.image'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, collections, ...otherAttributes } = entity;
            
            // Format collections with images
            const formatMedia = (media: any) => {
              if (!media) return null;
              const { id: mediaId, ...mediaAttributes } = media;
              return {
                data: {
                  id: mediaId,
                  attributes: mediaAttributes
                }
              };
            };
            
            const formattedCollections = (collections || []).map((collection: any) => {
              const { image, ...rest } = collection;
              return {
                ...rest,
                image: formatMedia(image)
              };
            });
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  collections: formattedCollections
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'CollectionPreviewError',
                message: error.message || 'Error fetching Collection Preview',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/collection-preview',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::collection-preview.collection-preview');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::collection-preview.collection-preview', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::collection-preview.collection-preview', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/services-section',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::services-section.services-section', {
              populate: ['services', 'services.image'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, services, ...otherAttributes } = entity;
            
            // Format services with images
            const formatMedia = (media: any) => {
              if (!media) return null;
              const { id: mediaId, ...mediaAttributes } = media;
              return {
                data: {
                  id: mediaId,
                  attributes: mediaAttributes
                }
              };
            };
            
            const formattedServices = (services || []).map((service: any) => {
              const { image, ...rest } = service;
              return {
                ...rest,
                image: formatMedia(image)
              };
            });
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  services: formattedServices
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'ServicesSectionError',
                message: error.message || 'Error fetching Services Section',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/services-section',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::services-section.services-section');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::services-section.services-section', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::services-section.services-section', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/about-snapshot',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::about-snapshot.about-snapshot', {
              populate: ['image'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, image, ...otherAttributes } = entity;
            
            // Format image
            const formatMedia = (media: any) => {
              if (!media) return null;
              const { id: mediaId, ...mediaAttributes } = media;
              return {
                data: {
                  id: mediaId,
                  attributes: mediaAttributes
                }
              };
            };
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  image: formatMedia(image)
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'AboutSnapshotError',
                message: error.message || 'Error fetching About Snapshot',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/about-snapshot',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::about-snapshot.about-snapshot');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::about-snapshot.about-snapshot', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::about-snapshot.about-snapshot', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/dual-cta',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::dual-cta.dual-cta', {
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, ...otherAttributes } = entity;
            
            ctx.body = { 
              data: {
                id,
                attributes: otherAttributes
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'DualCTAError',
                message: error.message || 'Error fetching Dual CTA',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/dual-cta',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::dual-cta.dual-cta');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::dual-cta.dual-cta', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::dual-cta.dual-cta', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/stats-section',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::stats-section.stats-section', {
              populate: ['stats'],
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, stats, ...otherAttributes } = entity;
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  stats: stats || []
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'StatsSectionError',
                message: error.message || 'Error fetching Stats Section',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/stats-section',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::stats-section.stats-section');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::stats-section.stats-section', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::stats-section.stats-section', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'GET',
        path: '/api/client-logos',
        handler: async (ctx) => {
          try {
            const entities = await strapi.entityService.findMany('api::client-logo.client-logo', {
              populate: {
                row1Logos: {
                  populate: {
                    logo: true,
                  },
                },
                row2Logos: {
                  populate: {
                    logo: true,
                  },
                },
              },
              publicationState: 'live',
            });
            const entity = Array.isArray(entities) ? entities[0] : entities;
            
            if (!entity) {
              ctx.body = { data: null };
              return;
            }
            
            const { id, row1Logos, row2Logos, ...otherAttributes } = entity;
            
            // Format media helper
            const formatMedia = (media: any) => {
              if (!media) return null;
              
              // If media is already in Strapi format { data: { id, attributes } }
              if (media.data) {
                // Ensure attributes exist
                if (!media.data.attributes && media.data.id) {
                  // Media object from component - extract attributes
                  const { id, ...attributes } = media.data;
                  return {
                    data: {
                      id,
                      attributes
                    }
                  };
                }
                return media;
              }
              
              // If media is a direct object with id
              if (media.id) {
                const { id: mediaId, ...mediaAttributes } = media;
                return {
                  data: {
                    id: mediaId,
                    attributes: mediaAttributes
                  }
                };
              }
              
              return null;
            };
            
            // Format logos array helper
            const formatLogos = (logos: any[]) => {
              if (!logos || !Array.isArray(logos)) return [];
              return logos.map((logoItem: any) => {
                const { logo, ...rest } = logoItem;
                return {
                  ...rest,
                  logo: formatMedia(logo)
                };
              }).sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));
            };
            
            ctx.body = { 
              data: {
                id,
                attributes: {
                  ...otherAttributes,
                  row1Logos: formatLogos(row1Logos || []),
                  row2Logos: formatLogos(row2Logos || []),
                }
              }
            };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              data: null,
              error: {
                status: 500,
                name: 'ClientLogosError',
                message: error.message || 'Error fetching Client Logos Section',
              },
            };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
      {
        method: 'PUT',
        path: '/api/client-logos',
        handler: async (ctx) => {
          try {
            const existing = await strapi.entityService.findMany('api::client-logo.client-logo');
            const entity = Array.isArray(existing) ? existing[0] : existing;
            const data = ctx.request.body?.data || ctx.request.body;
            
            if (entity && entity.id) {
              const updated = await strapi.entityService.update('api::client-logo.client-logo', entity.id, { data });
              ctx.body = { data: { id: updated.id, attributes: updated } };
            } else {
              const created = await strapi.entityService.create('api::client-logo.client-logo', { data });
              ctx.body = { data: { id: created.id, attributes: created } };
            }
          } catch (error: any) {
            ctx.status = 500;
            ctx.body = { error: { status: 500, message: error.message } };
          }
        },
        config: {
          auth: false,
          policies: [],
          middlewares: [],
        },
      },
    ]);
    } catch (error) {
      console.error('❌ Error registering custom routes:', error);
      // Don't throw - allow Strapi to continue starting even if routes fail
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Set up permissions automatically
    // Wrap in try-catch to ensure Strapi starts even if bootstrap fails
    try {
      await bootstrapPermissions({ strapi });
    } catch (error) {
      console.error('❌ Bootstrap error (non-fatal):', error);
      // Don't throw - allow Strapi to continue starting
    }
  },
};

