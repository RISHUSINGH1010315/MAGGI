---
name: Culinary Kinetic
colors:
  surface: '#fef8f4'
  surface-dim: '#dfd9d5'
  surface-bright: '#fef8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f2ef'
  surface-container: '#f3ede9'
  surface-container-high: '#ede7e3'
  surface-container-highest: '#e7e1de'
  on-surface: '#1d1b19'
  on-surface-variant: '#4d4632'
  inverse-surface: '#32302e'
  inverse-on-surface: '#f6f0ec'
  outline: '#7f765f'
  outline-variant: '#d1c6ab'
  surface-tint: '#725c00'
  primary: '#725c00'
  on-primary: '#ffffff'
  primary-container: '#ffd100'
  on-primary-container: '#6f5a00'
  inverse-primary: '#edc200'
  secondary: '#bb0013'
  on-secondary: '#ffffff'
  secondary-container: '#e71520'
  on-secondary-container: '#fffbff'
  tertiary: '#7d5700'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffce7a'
  on-tertiary-container: '#7a5500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe07f'
  primary-fixed-dim: '#edc200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#564500'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000d'
  tertiary-fixed: '#ffdeaa'
  tertiary-fixed-dim: '#f8bc4c'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5f4100'
  background: '#fef8f4'
  on-background: '#1d1b19'
  surface-variant: '#e7e1de'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  title-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter-mobile: 16px
  gutter-desktop: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  container-max: 1280px
---

## Brand & Style
The design system translates the high-energy, nostalgic warmth of a global kitchen staple into a premium digital experience. It is built on the philosophy of **"Appetizing Precision,"** combining the visceral joy of food with the sophisticated polish of a modern technology product.

The visual style is a fusion of **Corporate Modern** and **Glassmorphism**, elevated by 3D depth. We utilize light-refracting surfaces and soft, layered shadows to create a sense of tactile premiumness. Every interaction should feel as satisfying and fluid as steam rising from a fresh bowl. The audience is global, diverse, and expects an interface that is both functionally efficient and emotionally resonant.

## Colors
The palette is rooted in the "Iconic Yellow" and "Vibrant Red" legacy, but expanded for digital depth. 

- **Primary (Iconic Yellow):** Used for primary actions and brand anchoring. It is high-energy and evokes appetite.
- **Secondary (Vibrant Red):** Used sparingly for critical highlights, notifications, and "hot" interactions.
- **Tertiary (Deep Gold):** Adds a premium, metallic layer to gradients and 3D shadows, moving the brand away from "budget" and toward "world-class."
- **Warm Accents:** Orange is used for secondary interactive elements to maintain the warmth of the food photography.
- **Neutral:** A deep, warm charcoal (#211F1D) is used for typography instead of pure black to maintain a culinary, organic feel.

## Typography
Typography is architectural and bold. We use **Montserrat** for all display and headline roles to convey strength and modern geometry. Its wide aperture and heavy weights feel confident and premium.

For body text and functional labels, we use **Plus Jakarta Sans**. Its slightly rounded terminals and open counters provide exceptional legibility and a friendly, approachable tone that balances the aggressive headlines. Text hierarchy is enforced through generous line heights to ensure a "breathable" and airy layout despite the vibrant color palette.

## Layout & Spacing
The layout follows a **Fluid Grid** system designed to showcase high-fidelity food photography. 
- **Desktop:** 12-column grid with 24px gutters. Content should feel spacious, using asymmetric layouts to mimic the "scattered ingredients" aesthetic seen in brand visuals.
- **Mobile:** 4-column grid with 16px gutters. Elements stack vertically, but maintain horizontal breathing room.

Spacing follows an 8px base unit. We prioritize "Optical Spacing"—internal padding in glass cards should be generous (typically 32px or 40px) to prevent the vibrant background colors from feeling cluttered.

## Elevation & Depth
Depth is the cornerstone of this design system. We use a **Multi-layered Glassmorphism** approach:
1.  **The Canvas:** Rich, warm gradients or blurred food photography.
2.  **The Glass Base:** Surfaces use `backdrop-filter: blur(20px)` with a subtle white border (0.5px, 20% opacity) to catch light.
3.  **The 3D Shadow:** We avoid flat shadows. Instead, we use "Umbra" shadows—multi-layered, diffused shadows that include a hint of the brand's Deep Gold (#B07D05) to simulate realistic lighting on a warm surface.
4.  **The Floating Layer:** Interactive elements like CTA buttons use a higher z-index and "squishy" scaling animations (e.g., scale 1.05 on hover) to emphasize 3D presence.

## Shapes
Shapes are friendly and organic. We utilize a **Rounded (0.5rem base)** logic to mirror the curves of bowls and ingredients. 
- **Small elements (Tags, Chips):** Use 0.5rem (8px).
- **Standard Cards:** Use 1rem (16px).
- **Feature Hero Cards:** Use 1.5rem (24px) to create a soft, high-end "Apple-esque" feel.
- **Buttons:** Fully pill-shaped (rounded-xl) for a tactile, inviting look.

## Components
- **Buttons:** The primary button is a vibrant Red-to-Orange gradient with a subtle inner glow. On hover, it increases in depth via a gold-tinted shadow.
- **Glass Cards:** Containers for content should be semi-transparent with a soft "frost" effect, allowing the background colors to peak through while maintaining text legibility via high-contrast typography.
- **Appetite Chips:** Small, pill-shaped tags used for categories (e.g., "Spicy," "Quick"). These should use the Iconic Yellow with dark neutral text.
- **Input Fields:** Minimalist with a focus on the active state—a glowing yellow bottom border and a subtle glass background.
- **3D Floating Elements:** Use real-time shadows for floating food assets (nodules, vegetables) to create an immersive, parallax effect as the user scrolls.
- **Progress Bars:** Designed as "Cooking Indicators," moving from cool to hot (Yellow to Red) as they fill.