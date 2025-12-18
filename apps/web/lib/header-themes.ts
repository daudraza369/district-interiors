/**
 * Header Theme Configuration
 * Defines 4 color themes for the dynamic header
 * Colors are placeholders - will be updated with exact hex codes
 */

export type HeaderTheme = 'default' | 'green-gold' | 'purple' | 'dark';

export interface ThemeConfig {
  name: HeaderTheme;
  // Background colors
  background: {
    transparent: string; // When at top (transparent)
    solid: string; // When scrolled (solid background)
  };
  // Logo colors
  logo: {
    transparent: string; // Logo color when header is transparent
    solid: string; // Logo color when header is solid
  };
  // Navigation link colors
  navLinks: {
    transparent: string; // Default nav link color when transparent
    solid: string; // Default nav link color when solid
    active: string; // Active/hovered nav link color
  };
  // CTA Button
  cta: {
    bg: {
      transparent: string; // CTA background when transparent
      solid: string; // CTA background when solid
    };
    text: {
      transparent: string; // CTA text color when transparent
      solid: string; // CTA text color when solid
    };
    label: string; // CTA button text
  };
  // Active navigation item (for highlighting)
  activeNavItem?: string; // Which nav item should be highlighted (e.g., 'INTERIORS', 'FLOWERS')
}

export const headerThemes: Record<HeaderTheme, ThemeConfig> = {
  // Theme 1: Default (White theme)
  default: {
    name: 'default',
    background: {
      transparent: 'transparent',
      solid: 'bg-[#2a3a2f]', // Dark grey-green (placeholder - will update with exact hex)
    },
    logo: {
      transparent: 'text-white',
      solid: 'text-white', // White logo when scrolled
    },
    navLinks: {
      transparent: 'text-white',
      solid: 'text-white',
      active: 'text-white',
    },
    cta: {
      bg: {
        transparent: 'bg-white', // White background when transparent (at top)
        solid: 'bg-[#E0E8C0]', // Light green/beige background when scrolled
      },
      text: {
        transparent: 'text-[#2a3a2f]', // Dark text on white when transparent
        solid: 'text-[#2a3a2f]', // Dark text on light background when scrolled
      },
      label: 'REQUEST A CONSULTATION',
    },
  },

  // Theme 2: Green/Gold theme (for INTERIORS)
  'green-gold': {
    name: 'green-gold',
    background: {
      transparent: 'transparent',
      solid: 'bg-[#2a3a2f]', // Same dark grey-green as default
    },
    logo: {
      transparent: 'text-[#d4c5a9]', // Light green/gold (placeholder)
      solid: 'text-[#d4c5a9]',
    },
    navLinks: {
      transparent: 'text-white',
      solid: 'text-white',
      active: 'text-[#d4c5a9]', // Green/gold for active link
    },
    cta: {
      bg: {
        transparent: 'bg-[#d4c5a9]',
        solid: 'bg-[#d4c5a9]',
      },
      text: {
        transparent: 'text-[#2a3a2f]',
        solid: 'text-[#2a3a2f]',
      },
      label: 'REQUEST A CONSULTATION',
    },
    activeNavItem: 'INTERIORS',
  },

  // Theme 3: Purple theme (for FLOWERS)
  purple: {
    name: 'purple',
    background: {
      transparent: 'transparent',
      solid: 'bg-[#2a3a2f]', // Same dark grey-green
    },
    logo: {
      transparent: 'text-[#b8a9d9]', // Light purple/lavender (placeholder)
      solid: 'text-[#b8a9d9]',
    },
    navLinks: {
      transparent: 'text-white',
      solid: 'text-white',
      active: 'text-[#b8a9d9]', // Purple for active link
    },
    cta: {
      bg: {
        transparent: 'bg-[#b8a9d9]',
        solid: 'bg-[#b8a9d9]',
      },
      text: {
        transparent: 'text-[#2a3a2f]',
        solid: 'text-[#2a3a2f]',
      },
      label: 'BUY FLOWERS IN BULK', // Different CTA text!
    },
    activeNavItem: 'FLOWERS',
  },

  // Theme 4: Dark theme
  dark: {
    name: 'dark',
    background: {
      transparent: 'transparent',
      solid: 'bg-[#1a1a1a]', // Very dark/black (placeholder)
    },
    logo: {
      transparent: 'text-white',
      solid: 'text-white',
    },
    navLinks: {
      transparent: 'text-white',
      solid: 'text-white',
      active: 'text-white',
    },
    cta: {
      bg: {
        transparent: 'bg-[#b8a9d9]', // Light purple
        solid: 'bg-[#b8a9d9]',
      },
      text: {
        transparent: 'text-white',
        solid: 'text-white',
      },
      label: 'REQUEST A CONSULTATION',
    },
  },
};

/**
 * Get theme based on route/pathname
 * Can be customized to return different themes for different pages
 */
export function getThemeForRoute(pathname: string): HeaderTheme {
  // Route-based theme selection
  if (pathname.startsWith('/flowers')) {
    return 'purple';
  }
  if (pathname.startsWith('/interiors')) {
    return 'green-gold';
  }
  // Default theme for home and other pages
  return 'default';
}





