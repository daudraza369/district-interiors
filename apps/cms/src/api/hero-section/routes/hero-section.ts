/**
 * Hero Section routes
 *
 * Use the standard Strapi core router for the single type.
 * This registers `/api/hero-section` automatically, and our
 * custom controller handles the logic.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::hero-section.hero-section');

