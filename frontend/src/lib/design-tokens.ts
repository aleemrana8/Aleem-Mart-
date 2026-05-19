/**
 * ALEEM MART — DESIGN TOKEN ARCHITECTURE
 * 
 * Enterprise-grade scalable token system.
 * Single source of truth for all visual properties.
 */

// === BRAND COLORS ===
export const colors = {
  brand: {
    primary: '#F5A623',       // Electric Amber Gold
    primaryLight: '#F7C948',  // Gold Light
    primaryDark: '#D4850C',   // Amber Dark
    secondary: '#0F1B2D',     // Deep Navy
    secondaryLight: '#1A2E4A',
    midnight: '#0A1628',      // Ultra dark
    electric: '#4F46E5',      // Electric Blue (AI indicator)
    electricLight: '#6366F1',
    accent: '#3B82F6',        // Blue accent
  },
  semantic: {
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#3B82F6',
    infoLight: '#DBEAFE',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#09090B',
  },
  chart: ['#F5A623', '#3B82F6', '#10B981', '#8B5CF6', '#EF4444', '#06B6D4', '#F59E0B', '#EC4899'],
} as const;

// === TYPOGRAPHY SCALE ===
export const typography = {
  fontFamily: {
    display: "'Inter', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
  },
  scale: {
    'display-xl': { size: '4.5rem', lineHeight: '1', weight: 800, tracking: '-0.02em' },
    'display-lg': { size: '3.75rem', lineHeight: '1.05', weight: 700, tracking: '-0.02em' },
    'display': { size: '3rem', lineHeight: '1.1', weight: 700, tracking: '-0.015em' },
    'heading-xl': { size: '2.25rem', lineHeight: '1.15', weight: 700, tracking: '-0.015em' },
    'heading-lg': { size: '1.875rem', lineHeight: '1.2', weight: 600, tracking: '-0.01em' },
    'heading': { size: '1.5rem', lineHeight: '1.3', weight: 600, tracking: '-0.01em' },
    'heading-sm': { size: '1.25rem', lineHeight: '1.35', weight: 600, tracking: '-0.005em' },
    'body-lg': { size: '1.125rem', lineHeight: '1.6', weight: 400, tracking: '0' },
    'body': { size: '1rem', lineHeight: '1.6', weight: 400, tracking: '0' },
    'body-sm': { size: '0.875rem', lineHeight: '1.5', weight: 400, tracking: '0' },
    'caption': { size: '0.75rem', lineHeight: '1.4', weight: 400, tracking: '0' },
    'overline': { size: '0.6875rem', lineHeight: '1.2', weight: 600, tracking: '0.08em' },
  },
} as const;

// === SPACING SYSTEM (8pt grid) ===
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// === BREAKPOINTS ===
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1400px',
  '3xl': '1600px',
} as const;

// === ELEVATION (SHADOW) SYSTEM ===
export const elevation = {
  0: 'none',
  1: '0 1px 2px rgba(15,27,45,0.04)',
  2: '0 2px 4px rgba(15,27,45,0.06)',
  3: '0 4px 12px rgba(15,27,45,0.08)',
  4: '0 8px 24px rgba(15,27,45,0.12)',
  5: '0 16px 48px rgba(15,27,45,0.16)',
  glow: '0 0 20px rgba(245,166,35,0.25)',
  'glow-lg': '0 0 40px rgba(245,166,35,0.35)',
} as const;

// === BORDER RADIUS ===
export const radius = {
  none: '0',
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// === ANIMATION TIMING ===
export const motion = {
  duration: {
    instant: '50ms',
    fast: '150ms',
    base: '250ms',
    slow: '400ms',
    slower: '600ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// === GRADIENTS ===
export const gradients = {
  brand: 'linear-gradient(135deg, #F7931E 0%, #F15A24 50%, #ED1C24 100%)',
  gold: 'linear-gradient(135deg, #F5A623 0%, #F7C948 100%)',
  navy: 'linear-gradient(135deg, #0F1B2D 0%, #1A2E4A 50%, #243B5C 100%)',
  premium: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  ai: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)',
  sunset: 'linear-gradient(135deg, #F5A623 0%, #F7931E 50%, #EF4444 100%)',
  ocean: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #6366F1 100%)',
  emerald: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const;

// === Z-INDEX SCALE ===
export const zIndex = {
  dropdown: 50,
  sticky: 100,
  fixed: 200,
  modalBackdrop: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
} as const;
