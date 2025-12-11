import bootstrapPermissions from './bootstrap';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

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

