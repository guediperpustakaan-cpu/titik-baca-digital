---
name: Palembang Digital Library System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#444653'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#0060ac'
  on-secondary: '#ffffff'
  secondary-container: '#64a8fe'
  on-secondary-container: '#003c70'
  tertiary: '#303539'
  on-tertiary: '#ffffff'
  tertiary-container: '#474c4f'
  on-tertiary-container: '#b8bcc0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#dfe3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is anchored in the principles of **Institutional Trust, Accessibility, and Modern Utility**. It is designed specifically for an official government entity, requiring a balance between authority and approachability. The aesthetic follows a **Corporate / Modern** direction, drawing inspiration from high-grade institutional design systems.

The personality is professional and dependable, ensuring that citizens feel secure and supported while navigating digital archives. The UI avoids unnecessary ornamentation, focusing instead on clarity of information, high-contrast legibility, and a logical information hierarchy that guides the user through complex catalogs of information.

## Colors

The palette is centered on "Trustworthy Blue" (#1E40AF), a deep, authoritative shade that signifies stability and official status. This is supported by a range of functional grays and a high-contrast white base to ensure maximum readability.

- **Primary**: Used for core branding, primary actions, and active states.
- **Secondary**: A lighter blue used for accents, hover states, and illustrative elements.
- **Surface/Tertiary**: A light gray used for background tiling and grouping content without adding visual weight.
- **Neutral**: High-contrast slate used for body text and labels to meet WCAG AA accessibility standards.
- **Feedback**: Standardized green (#15803D) for success, red (#B91C1C) for error, and amber (#B45309) for warnings.

## Typography

The design system utilizes **Inter** across all levels to ensure maximum legibility and a systematic feel. 

- **Headlines**: Use SemiBold or Bold weights with slight negative letter-spacing for a modern, compact look.
- **Body Text**: Optimized for long-form reading in digital catalogs. Line heights are kept generous (1.5x) to reduce cognitive load.
- **Labels**: Small caps or increased letter spacing are used sparingly for metadata (e.g., ISBN, Publisher details) to distinguish them from body content.

## Layout & Spacing

This design system uses a **Fluid-Fixed Hybrid Grid**. 
- **Desktop**: A 12-column grid with a maximum container width of 1280px. Gutters are fixed at 24px.
- **Tablet**: An 8-column grid with 24px margins.
- **Mobile**: A 4-column grid with 16px margins.

Spacing follows a base-4 scale, emphasizing a strict vertical rhythm. Internal component padding should prioritize `md` (16px) for standard elements and `lg` (24px) for prominent cards or sections.

## Elevation & Depth

Depth is communicated through **Tonal Layers** and **Low-Contrast Outlines**. Avoid heavy, dramatic shadows.

- **Level 0 (Base)**: White (#FFFFFF) or light tint (#F8FAFC).
- **Level 1 (Cards)**: White background with a 1px border in #E2E8F0. A very soft, subtle shadow (0px 2px 4px rgba(0,0,0,0.05)) is used only to distinguish interactive cards from the background.
- **Level 2 (Dropdowns/Modals)**: White background with a more defined border and a medium shadow (0px 10px 15px -3px rgba(0,0,0,0.1)) to indicate floating priority.
- **Dividers**: Use a subtle 1px line in #F1F5F9 to separate list items and table rows.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional but modern look that feels more updated than sharp corners while maintaining the seriousness of an official service. 

- **Small elements** (buttons, inputs, checkboxes): 4px (0.25rem).
- **Medium elements** (cards, alert banners): 8px (0.5rem).
- **Large elements** (modals, hero sections): 12px (0.75rem).

## Components

### Buttons
- **Primary**: Solid Trustworthy Blue (#1E40AF) with white text. High-contrast and clear.
- **Secondary**: Outlined Trustworthy Blue with 1px border.
- **Tertiary**: Ghost style with blue text, used for less critical actions like "Cancel."

### Cards
- Used for book listings and category previews. Cards feature a 1px #E2E8F0 border. The image/book cover should be at the top, followed by a title in SemiBold and a secondary label for the author.

### Professional Tables
- Header rows must have a subtle background (#F8FAFC) and bold labels.
- Rows should have a 1px bottom border (#F1F5F9) for clear scanning.
- Include clear "Status" chips within rows (e.g., "Available", "Borrowed").

### Input Fields
- Standard height of 44px.
- Borders are #CBD5E1. On focus, the border shifts to Primary Blue with a 2px outer glow (ring).
- Errors are indicated by a red border and a small helper text below the field.

### Feedback States
- **Success**: Green banner at the top of the content area.
- **Error**: Red banner with a clear "Retry" or "Close" action.
- **Loading**: A simple, branded blue spinner or skeleton screens for catalog listings to maintain perceived performance.