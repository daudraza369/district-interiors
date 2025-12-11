/**
 * Bootstrap script to set up Strapi permissions automatically
 * This runs once when Strapi starts in development mode
 */

export default async ({ strapi }) => {
  // Run in both development and production
  // Skip if this is the first run (no database connection yet)
  try {
    console.log('🔧 Setting up permissions...');

    // Get the Public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.log('⚠️  Public role not found, skipping permission setup');
      return;
    }

    // Content types that should be publicly readable
    const publicReadableTypes = [
      'api::category.category',
      'api::product.product',
      'api::service.service',
      'api::project.project',
      'api::testimonial.testimonial',
      'api::client-logo.client-logo',
      'api::stat.stat',
      'api::page-section.page-section',
      'api::shipping-option.shipping-option',
    ];

    // Content types that should NOT be publicly accessible
    const privateTypes = [
      'api::order.order',
      'api::discount.discount',
    ];

    // Get all permissions
    const permissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({
        where: {
          role: publicRole.id,
        },
      });

    // Update permissions for public-readable types
    for (const contentType of publicReadableTypes) {
      const findPermission = permissions.find(
        (p) => p.action === 'find' && p.subject === contentType
      );
      const findOnePermission = permissions.find(
        (p) => p.action === 'findOne' && p.subject === contentType
      );

      // Enable find
      if (findPermission && !findPermission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: findPermission.id },
            data: { enabled: true },
          });
        console.log(`✅ Enabled 'find' for ${contentType}`);
      }

      // Enable findOne
      if (findOnePermission && !findOnePermission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({
            where: { id: findOnePermission.id },
            data: { enabled: true },
          });
        console.log(`✅ Enabled 'findOne' for ${contentType}`);
      }

      // Disable create, update, delete
      const actionsToDisable = ['create', 'update', 'delete'];
      for (const action of actionsToDisable) {
        const permission = permissions.find(
          (p) => p.action === action && p.subject === contentType
        );
        if (permission && permission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: false },
            });
          console.log(`❌ Disabled '${action}' for ${contentType}`);
        }
      }
    }

    // Disable all permissions for private types
    for (const contentType of privateTypes) {
      const typePermissions = permissions.filter(
        (p) => p.subject === contentType
      );
      for (const permission of typePermissions) {
        if (permission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: permission.id },
              data: { enabled: false },
            });
          console.log(`❌ Disabled '${permission.action}' for ${contentType}`);
        }
      }
    }

    console.log('✅ Permissions setup complete!');
  } catch (error) {
    console.error('❌ Error setting up permissions:', error);
    console.error('⚠️  Continuing Strapi startup despite permission setup error...');
    // Don't throw - let Strapi start even if permissions setup fails
    // This is critical for production deployments
  }
};

