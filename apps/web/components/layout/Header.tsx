'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import logo from '@/public/district-logo.png';
import { headerThemes, getThemeForRoute, type HeaderTheme } from '@/lib/header-themes';

// Updated navigation structure
const navItems = [
  { label: 'DISTRICT', href: '/district' },
  { label: 'FLOWERS', href: '/flowers' },
  {
    label: 'INTERIORS',
    href: '/interiors',
    children: [
      { label: 'PLANTSCAPING', href: '/interiors/plantscaping' },
      { label: 'TREE SOLUTIONS', href: '/interiors/tree-solutions' },
      { label: 'PLANT MAINTENANCE', href: '/interiors/maintenance' },
      { label: 'CUSTOM PLANTERS', href: '/interiors/planters' },
      { label: 'GREEN WALLS', href: '/interiors/green-walls' },
    ],
  },
  { label: 'HOSPITALITY', href: '/hospitality' },
  { label: 'PROJECTS', href: '/projects' },
];

interface HeaderProps {
  theme?: HeaderTheme; // Optional theme prop, otherwise auto-detected from route
}

export function Header({ theme: propTheme }: HeaderProps = {} as HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Determine theme: use prop if provided, otherwise auto-detect from route
  const themeName = propTheme || getThemeForRoute(pathname);
  const theme = headerThemes[themeName];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCTAClick = () => {
    setIsMobileMenuOpen(false);
    // Handle CTA based on theme or default behavior
    if (themeName === 'purple' && theme.cta.label.includes('FLOWERS')) {
      // Navigate to flowers e-commerce or external link
      router.push('/flowers');
    } else {
      const consultationForm = document.getElementById('consultation-form');
      const contactSection = document.getElementById('contact');
      
      if (consultationForm) {
        consultationForm.scrollIntoView({ behavior: 'smooth' });
      } else if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/contact');
      }
    }
  };

  const handleDropdownItemClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(null);
    router.push(href);
  };

  // Determine colors based on scroll state
  const logoColor = isScrolled ? theme.logo.solid : theme.logo.transparent;
  const navLinkColor = isScrolled ? theme.navLinks.solid : theme.navLinks.transparent;
  const ctaBg = isScrolled ? theme.cta.bg.solid : theme.cta.bg.transparent;
  const ctaText = isScrolled ? theme.cta.text.solid : theme.cta.text.transparent;
  const backgroundClass = isScrolled ? theme.background.solid : theme.background.transparent;
  
              // Extract hex color from background class for inline style if needed
              const getBackgroundColor = () => {
                if (!isScrolled) return 'transparent';
                // On Interiors (home) page when scrolled, use #20322A
                if ((pathname === '/' || pathname === '/interiors') && isScrolled) {
                  return '#20322A'; 
                }
                const bgClass = theme.background.solid;
                // Extract hex from bg-[#hex] format
                const hexMatch = bgClass.match(/#[0-9a-fA-F]{6}/);
                return hexMatch ? hexMatch[0] : undefined;
              };

  // Extract hex color from CTA button background class
  const getCTABackgroundColor = () => {
    // When transparent (not scrolled), always use white
    if (!isScrolled) {
      return '#ffffff';
    }
    // When scrolled, use the theme's solid background
    const bgClass = theme.cta.bg.solid;
    // Handle white background
    if (bgClass === 'bg-white') {
      return '#ffffff';
    }
    // Extract hex from bg-[#hex] format
    const hexMatch = bgClass.match(/#[0-9a-fA-F]{6}/);
    return hexMatch ? hexMatch[0] : undefined;
  };

  // Check if we're on District page and scrolled - use custom background
  const isDistrictPageScrolled = pathname === '/' && isScrolled;
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'backdrop-blur-md shadow-lg py-3'
          : 'py-6',
        // Only apply theme background class if NOT on District page when scrolled
        !isDistrictPageScrolled && backgroundClass !== 'transparent' && backgroundClass
      )}
      style={{
        backgroundColor: isScrolled ? getBackgroundColor() : 'transparent',
        ...(isDistrictPageScrolled && { backgroundColor: '#20322A' }), // Force #20322A for District page when scrolled
      }}
    >
      <div className="container-luxury px-6 md:px-12 lg:px-20">
        <nav className="flex items-center justify-between">
          {/* DISTRICT Logo */}
          <Link href="/interiors" className="relative z-[60]">
            <Image
              src={logo}
              alt="District Interiors"
              height={56}
              width={200}
              className={cn(
                'h-12 md:h-14 w-auto transition-all duration-300',
                isMobileMenuOpen 
                  ? 'brightness-100' 
                  : !isScrolled
                    ? 'brightness-0 invert' // White logo on transparent background
                    : 'brightness-100'
              )}
              style={{
                filter: isScrolled && !isMobileMenuOpen
                  ? 'brightness(0) saturate(100%) invert(88%) sepia(4%) saturate(1800%) hue-rotate(52deg) brightness(118%)' // #E0E8C0 color filter - more accurate
                  : !isScrolled && !isMobileMenuOpen
                    ? 'brightness(0) invert(1)' // White logo on transparent background
                    : undefined
              }}
            />
          </Link>

          {/* Desktop Navigation - Centered (slightly adjusted left) */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2" style={{ transform: 'translateX(calc(-50% - 20px))' }}>
            {navItems.map((item) => {
              const isActive = theme.activeNavItem === item.label;
              // On home page (interiors): INTERIORS gets #E0E8C0 when scrolled, white when not scrolled
              const isHomePage = pathname === '/' || pathname === '/interiors';
              const isInteriorsItem = item.label === 'INTERIORS';
              const shouldHighlightInteriors = isHomePage && isInteriorsItem;
              
              let linkColor = isActive ? theme.navLinks.active : navLinkColor;
              let linkStyle: React.CSSProperties = {};
              
              if (shouldHighlightInteriors) {
                // INTERIORS: white when not scrolled, #E0E8C0 when scrolled
                linkStyle.color = isScrolled ? '#E0E8C0' : '#ffffff';
              } else {
                // All other nav items: always white
                linkStyle.color = '#ffffff';
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <Link
                      href={item.href}
                                  className={cn(
                                    'flex items-center gap-1 text-sm uppercase tracking-wider font-bold transition-colors duration-300 font-nav cursor-pointer',
                                    !shouldHighlightInteriors && linkColor
                                  )}
                      style={linkStyle}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )} style={linkStyle} />
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                                  className={cn(
                                    'flex items-center gap-1 text-sm uppercase tracking-wider font-bold transition-colors duration-300 font-nav',
                                    !shouldHighlightInteriors && linkColor
                                  )}
                      style={linkStyle}
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in z-[100]">
                      <div className="bg-ivory rounded-sm shadow-xl py-3 min-w-[280px] border border-stone/30">
                        {item.children.map((child) => (
                          <button
                            key={child.label}
                            onClick={(e) => handleDropdownItemClick(e, child.href)}
                            className="block w-full text-left px-5 py-3 text-sm text-night-green transition-colors duration-200 font-nav font-bold uppercase"
                            style={{
                              backgroundColor: 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#E0E8C0';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* CTA Button */}
          <button
            onClick={handleCTAClick}
            className={cn(
              'hidden lg:block px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 font-nav',
              ctaText,
              'hover:scale-[1.03] hover:shadow-lg'
            )}
            style={{
              backgroundColor: getCTABackgroundColor() || undefined,
              borderRadius: '3px',
            }}
          >
            {theme.cta.label}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-[60] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-night-green" />
            ) : (
              <Menu
                className={cn(
                  'w-6 h-6',
                  navLinkColor
                )}
              />
            )}
          </button>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            'fixed inset-0 bg-ivory z-50 lg:hidden transition-all duration-500 overflow-y-auto',
            isMobileMenuOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="flex flex-col items-center justify-center min-h-full gap-5 py-24 px-6">
            {navItems.map((item, index) => (
              <div key={item.label} className="text-center">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-heading text-night-green hover:text-slate-moss transition-colors font-nav font-bold uppercase"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mt-3 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm text-slate-moss hover:text-night-green transition-colors font-nav font-bold uppercase"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleCTAClick}
              className={cn(
                'mt-6 px-8 py-4 text-base font-bold uppercase tracking-wider transition-all duration-300 rounded-sm font-nav',
                theme.cta.bg.solid,
                theme.cta.text.solid,
                'hover:scale-[1.03] hover:shadow-lg'
              )}
            >
              {theme.cta.label}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
