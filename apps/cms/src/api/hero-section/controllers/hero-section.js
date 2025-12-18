"use strict";
/**
 * Hero Section controller
 *
 * We override the default single-type "find" so that:
 * - It always returns 200 with either the single hero record or null
 * - It uses publicationState=live and populates the heroImage
 *
 * This avoids the 404 "Not Found" error that was causing the frontend
 * to fall back to hard-coded defaults.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::hero-section.hero-section', ({ strapi }) => ({
    async find(ctx) {
        // Fetch the hero single-type; Strapi may return an array or single object depending on internals
        const entities = await strapi.entityService.findMany('api::hero-section.hero-section', {
            populate: ['heroImage', 'backgroundImage', 'beforeImage', 'afterImage'],
            publicationState: 'live',
        });
        const entity = Array.isArray(entities) ? entities[0] : entities;
        // Sanitize output using Strapi's built-in helper
        const sanitized = entity ? await this.sanitizeOutput(entity, ctx) : null;
        ctx.body = { data: sanitized };
    },
}));
