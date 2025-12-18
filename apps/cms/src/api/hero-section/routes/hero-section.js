"use strict";
/**
 * Hero Section routes
 *
 * Use the standard Strapi core router for the single type.
 * This registers `/api/hero-section` automatically, and our
 * custom controller handles the logic.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::hero-section.hero-section');
