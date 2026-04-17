# Riffinity Real Estate — Website Report & DNA

## Executive Summary

This document provides a comprehensive overview of the Riffinity Real Estate luxury property website — a sophisticated, editorial-style React application built for a boutique real estate agency operating in Marbella, Costa del Sol, and Morocco.

---

## Table of Contents

1. [Brand DNA & Design Philosophy](#brand-dna--design-philosophy)
2. [Technical Architecture](#technical-architecture)
3. [Design System](#design-system)
4. [Features & Functionality](#features--functionality)
5. [Page Structure](#page-structure)
6. [Component Architecture](#component-architecture)
7. [Animation & Interaction Strategy](#animation--interaction-strategy)
8. [Responsive Design](#responsive-design)
9. [Multilingual Support](#multilingual-support)
10. [Performance & SEO Considerations](#performance--seo-considerations)

---

## Brand DNA & Design Philosophy

### Core Brand Identity

**Riffinity Real Estate** positions itself as a **boutique luxury agency** serving ultra-high-net-worth individuals seeking premium properties in Mediterranean destinations. The brand DNA centers around:

- **Quiet Luxury**: Understated elegance without ostentation
- **Editorial Sophistication**: Magazine-quality typography and layout
- **Mediterranean Warmth**: Balanced with professional precision
- **Boutique Approach**: Personalized service over volume
- **International Appeal**: Multilingual, cross-border clientele

### Brand Positioning

- **Target Market**: €1.6M+ property buyers, international investors
- **Geographic Focus**: Marbella (Golden Mile, Puerto Banús, Sierra Blanca), Costa del Sol, Morocco
- **Service Philosophy**: "Excellence is not a service feature — it is our founding principle"
- **Differentiator**: 100% boutique approach with multilingual capabilities (EN/FR/ES)

---

## Technical Architecture

### Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | React | 18.3.1 | UI component framework |
| **Routing** | React Router | 7.13.0 | Client-side navigation (Data mode) |
| **Styling** | Tailwind CSS | 4.1.12 | Utility-first CSS framework |
| **Animation** | Motion (Framer Motion) | 12.23.24 | Scroll reveals, page transitions, 3D effects |
| **Icons** | Lucide React | 0.487.0 | Icon library |
| **Build Tool** | Vite | 6.3.5 | Fast development & optimized builds |
| **Component Library** | Radix UI | Various | Accessible UI primitives |

### Project Structure

```
/src
├── /app
│   ├── App.tsx                      # Root application component
│   ├── routes.tsx                   # React Router configuration
│   ├── /components
│   │   ├── Layout.tsx               # Shared layout (nav, footer)
│   │   ├── /figma
│   │   │   └── ImageWithFallback.tsx
│   │   └── /ui                      # Radix UI component library
│   ├── /data
│   │   └── properties.ts            # Property data model & content
│   └── /pages
│       ├── HomePage.tsx             # Landing page
│       ├── PropertyListingPage.tsx  # 3D gallery + grid view
│       ├── PropertyDetailPage.tsx   # Individual property pages
│       └── NotFound.tsx             # 404 page
└── /styles
    ├── index.css                    # Global styles entry
    ├── tailwind.css                 # Tailwind configuration
    ├── theme.css                    # Design tokens & CSS variables
    └── fonts.css                    # Google Fonts imports
```

### Routing Architecture

**React Router Data Mode** implementation with nested routes:

```typescript
/                    → Layout wrapper
├── /                → HomePage (index)
├── /properties      → PropertyListingPage
├── /property/:id    → PropertyDetailPage
└── /*               → NotFound (404)
```

**Key Features:**
- Client-side routing for instant navigation
- Dynamic route parameters for property details
- Shared layout with persistent navigation/footer
- Programmatic redirects for invalid property IDs

---

## Design System

### Color Palette

The color system embodies **"quiet luxury"** through a refined, editorial palette:

#### Primary Colors
- **Ivory** `#F9F6F1` — Primary background, warmth & elegance
- **Champagne Gold** `#B8975A` — Accent color, luxury highlight
- **Midnight Navy** `#0C1020` — Headers, footers, depth

#### Semantic Colors
```css
--color-bg:               #F9F6F1  (Ivory background)
--color-surface:          #FFFFFF  (Card backgrounds)
--color-surface-2:        #F5F1EB  (Section backgrounds)
--color-text:             #1A1410  (Primary text)
--color-text-muted:       #6B6158  (Secondary text)
--color-text-faint:       #ADA49A  (Tertiary text)
--color-primary:          #B8975A  (Champagne Gold)
--color-primary-hover:    #9B7D42  (Darker gold on hover)
--color-border:           #D4CECC  (Subtle borders)
--color-divider:          #E0DAD1  (Section dividers)
```

#### Dark Mode Support
Dark theme with adjusted values for accessibility:
- Background: `#0C0A08` (Deep charcoal)
- Primary: `#D4AA72` (Lighter gold for contrast)
- Text: `#E8E2D8` (Warm off-white)

### Typography

**Dual Font System** for editorial sophistication:

#### Display Font: Cormorant Garamond
- **Usage**: Headlines, prices, section titles
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold)
- **Character**: Classical serif, editorial elegance
- **Source**: Google Fonts

#### Body Font: Satoshi
- **Usage**: Body text, UI elements, buttons
- **Weights**: 300, 400, 500, 700
- **Character**: Modern sans-serif, high readability
- **Source**: FontShare

#### Type Scale (Fluid Typography)
```css
--text-xs:    clamp(0.75rem,  0.7rem + 0.25vw,  0.875rem)
--text-sm:    clamp(0.875rem, 0.8rem + 0.35vw,  1rem)
--text-base:  clamp(1rem,     0.95rem + 0.25vw, 1.125rem)
--text-lg:    clamp(1.125rem, 1rem + 0.75vw,    1.5rem)
--text-xl:    clamp(1.5rem,   1.2rem + 1.25vw,  2.25rem)
--text-2xl:   clamp(2rem,     1.2rem + 2.5vw,   3.5rem)
--text-3xl:   clamp(2.5rem,   1rem + 4vw,       5rem)
--text-hero:  clamp(3rem,     0.5rem + 7vw,     8rem)
```

**Key Principle**: Fluid typography scales seamlessly from mobile (320px) to desktop (1920px+)

### Spacing System

Consistent spacing scale based on 4px baseline:

```css
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-24: 6rem     (96px)
--space-32: 8rem     (128px)
```

### Border Radius

```css
--radius-sm:   0.25rem   (Subtle, for inputs/buttons)
--radius-md:   0.375rem  (Standard cards)
--radius-lg:   0.625rem  (Larger elements)
--radius-xl:   1rem      (Hero sections)
--radius-full: 9999px    (Circular elements)
```

### Shadows

Soft, natural shadows for depth:

```css
--shadow-sm: 0 1px 3px oklch(0.15 0.02 60 / 0.08)   (Subtle lift)
--shadow-md: 0 4px 16px oklch(0.15 0.02 60 / 0.10)  (Cards)
--shadow-lg: 0 16px 48px oklch(0.15 0.02 60 / 0.14) (Hover states)
```

### Transitions

Consistent timing for polished interactions:

```css
--transition: 200ms cubic-bezier(0.16, 1, 0.3, 1)  /* Ease-out-quad */
```

---

## Features & Functionality

### 1. Hero Section (Home Page)

**Full-screen immersive hero** with parallax-style overlay:
- **Background**: Luxury villa image from Unsplash
- **Gradient Overlay**: Subtle dark gradient for text legibility
- **Animated Elements**:
  - Tagline: "Marbella · Costa del Sol · Morocco" (fade-up, 0.2s delay)
  - H1: "Where Luxury Meets the Mediterranean" (fade-up, 0.4s delay)
  - Body copy (fade-up, 0.6s delay)
  - CTA buttons (fade-up, 0.8s delay)
- **Scroll Indicator**: Animated pulse effect at bottom-right

**CTAs:**
- Primary: "Explore Properties" (Champagne gold background)
- Secondary: "Private Consultation" (Outlined)

### 2. Stats Bar

**4-column statistics display** with scroll-reveal animations:
- €1.6M+ Starting Price
- 2 Countries
- 3 Languages Spoken
- 100% Boutique Approach

### 3. About Section

**Split layout** with asymmetric grid:
- **Left**: Luxury interior image (4:5 aspect ratio)
- **Right**: Brand story with:
  - Section label ("Our Story")
  - Decorative divider line
  - Headline: "A Boutique Firm Built on Passion"
  - Pull quote: "Excellence is not a service feature — it is our founding principle"
  - Body copy (2 paragraphs)
  - CTA link to services

### 4. Services Section

**3-pillar service offering** with numbered cards:

1. **Property Sales & Acquisitions**
   - Expert guidance, exclusive off-market listings
   - Icon: House outline

2. **Short-Term Luxury Rentals**
   - Curated holiday properties
   - Icon: Calendar

3. **Luxury Concierge**
   - Transportation, yacht charters, event access
   - Icon: Star

**Card Features:**
- Large background number (01, 02, 03)
- Icon in brand gold
- Hover effect: -4px lift + shadow increase

### 5. Featured Properties (Home Page)

**3-column grid** of property cards:
- **Image**: 4:3 aspect ratio with tag overlay
- **Location**: Icon + "Golden Mile · Marbella"
- **Property Name**: Display font
- **Specifications**: Beds, Baths, m² with icons
- **Price**: Large display in Champagne Gold
- **Hover Effects**:
  - Image scale: 1.04x (600ms transition)
  - Card lift: -6px vertical translation
  - Shadow: sm → lg

### 6. Contact Form

**Dual-column layout** (contact info + form):

**Left Column:**
- Email address (clickable)
- Instagram handle
- Physical location

**Right Column:**
- First Name / Last Name (grid)
- Email
- Service dropdown
- Message textarea
- Submit button

**Form Features:**
- Input border highlight on focus (Champagne Gold)
- Placeholder text
- Accessible labels

### 7. Navigation Header

**Fixed navigation** with scroll-triggered background:

**Default State** (transparent):
- Translucent background
- Large padding (py-5)

**Scrolled State** (>60px):
- Dark background with backdrop blur
- Reduced padding (py-3)
- Subtle bottom border

**Desktop Nav Items:**
- About, Services, Properties, Contact
- Language selector (EN/FR/ES)
- Theme toggle (light/dark)
- "Enquire" CTA button

**Mobile Menu:**
- Hamburger icon
- Full-screen overlay (slide-in from right)
- Large nav items (font-display)
- Body scroll lock when open

### 8. Footer

**4-column grid layout** on desktop:

1. **Brand Column**:
   - Logo + brand name
   - Tagline
   - Social icons (Instagram, Email)

2. **Properties**:
   - For Sale
   - Holiday Rentals

3. **Services**:
   - Property Sales
   - Luxury Concierge

4. **Areas**:
   - Marbella
   - Golden Mile
   - Puerto Banús

**Bottom Bar:**
- Copyright notice
- Privacy Policy / Legal Notice links

### 9. Property Listing Page

**Dual View Modes** (3D Gallery + Traditional Grid):

#### Gallery View (Default)
**3D Showcase** with perspective transforms:
- **Main Card**: Large image + info panel (1.2:1 grid ratio)
- **3D Animation**: rotateY transform on card switch
- **Navigation**: Left/right arrow buttons overlaid on image
- **Thumbnail Carousel**: Clickable property previews below
- **Progress Indicator**: Animated dot navigation
- **Card Specs**: Large stat display (beds, baths, m²)
- **Dual CTAs**: "View Details" + "Enquire Now"

**Animation Details:**
- Enter: opacity 0→1, rotateY 20°→0°, scale 0.9→1 (600ms ease-out)
- Exit: Reverse animation

#### Grid View
**Traditional 3-column layout**:
- Staggered entrance animations (100ms per card)
- Hover effects:
  - Card lift (-8px)
  - Image scale (1.1x)
  - Dark gradient overlay
  - Info reveal at bottom
- Perspective: 1000px for subtle 3D depth

**View Toggle:**
- Icon buttons (LayoutGrid / Grid3x3)
- Active state: Champagne Gold background
- AnimatePresence for smooth mode transitions

### 10. Property Detail Page

**Individual property showcase** with:

#### Image Gallery
- **Main Image**: Large hero (4:3 aspect)
- **Thumbnail Grid**: 4-column clickable carousel
- **Active State**: 2px Champagne Gold ring
- **Tag Overlay**: Property status badge

#### Property Information
- Location breadcrumb with icon
- Property name (h1)
- Price + status indicator
- **Specifications Grid** (3 columns):
  - Bedrooms (icon + number)
  - Bathrooms
  - Built area (m²)

#### Key Features Section
- **Background**: Surface-2 (off-white)
- **Layout**: 2-column grid
- **Items**: Checkmark icon + feature text
- **Animation**: Staggered entrance (50ms delay per item)

**Features Include:**
- Private swimming pool
- South-facing terraces
- Gourmet kitchen
- Master suite with spa bathroom
- Home automation
- Landscaped gardens
- Etc.

#### Similar Properties
**3-column grid** showing related listings with same card design as homepage

#### Back Navigation
- "Back to Properties" link with arrow
- Returns to homepage anchor (#properties)

### 11. 404 Page

Custom Not Found page with:
- Error messaging
- Brand-consistent styling
- Navigation back to home

---

## Component Architecture

### Layout Component (`Layout.tsx`)

**Shared wrapper** for all pages providing:
- Fixed navigation header
- Mobile menu overlay
- Footer
- Theme management (localStorage persistence)
- Language state (EN/FR/ES)
- Scroll detection for header styling

**State Management:**
```typescript
- theme: 'light' | 'dark'
- scrolled: boolean
- mobileMenuOpen: boolean
- language: 'EN' | 'FR' | 'ES'
```

### Data Model (`properties.ts`)

**TypeScript interface** for type safety:

```typescript
interface Property {
  id: string;              // URL slug
  name: string;            // Property title
  location: string;        // Neighborhood
  area: string;            // City/region
  price: number;           // Price in EUR
  beds: number;
  baths: number;
  sqm: number;             // Built area
  tag: string;             // "Exclusive", "New", "Sea Views"
  type: 'villa' | 'penthouse' | 'apartment';
  status: 'for-sale' | 'sold' | 'reserved';
  image: string;           // Primary image URL
  images: string[];        // Gallery images (4 total)
  description: string;     // Full description
  features: string[];      // Key features list
}
```

**Current Properties:**
1. **Villa Palomeras** — Las Lomas de Río Verde (€1,650,000)
2. **Sky Penthouse** — Marina Front (€2,100,000)
3. **Casa Serena** — Contemporary Estate (€3,850,000)

### Page Components

#### HomePage.tsx
- Hero section
- Stats bar
- About section
- Services (3 cards)
- Featured properties (3 cards)
- Contact form

#### PropertyListingPage.tsx
- Header with view mode toggle
- Gallery view (3D showcase)
- Grid view (traditional cards)
- AnimatePresence for transitions

#### PropertyDetailPage.tsx
- Back navigation
- Image gallery with thumbnails
- Property info sidebar
- Key features grid
- Similar properties carousel

#### NotFound.tsx
- 404 error page
- Navigation back to home

---

## Animation & Interaction Strategy

### Motion Library (Framer Motion)

All animations use **Motion** (modern Framer Motion):

```typescript
import { motion, AnimatePresence } from 'motion/react';
```

### Animation Patterns

#### 1. Scroll-Reveal Animations
**Fade-up entrance** for content sections:

```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
```

**Staggered Children:**
```typescript
delay: index * 0.1  // 100ms cascade
```

#### 2. Hero Animations
**Sequential entrance** with increasing delays:

```typescript
Tagline:    delay: 0.2s
Headline:   delay: 0.4s
Body:       delay: 0.6s
CTAs:       delay: 0.8s
```

#### 3. 3D Gallery Transforms
**Perspective card rotation:**

```typescript
style={{ perspective: '2000px' }}

initial={{ opacity: 0, rotateY: 20, scale: 0.9 }}
animate={{ opacity: 1, rotateY: 0, scale: 1 }}
transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
```

**Easing**: Custom cubic-bezier for luxury feel

#### 4. Hover Effects

**Property Cards:**
```css
hover: {
  translateY: -6px,
  shadow: lg,
  image scale: 1.04
}
transition: 600ms
```

**Service Cards:**
```css
hover: {
  translateY: -4px,
  shadow: md
}
```

#### 5. View Mode Transitions
**AnimatePresence** for smooth swaps:

```typescript
<AnimatePresence mode="wait">
  {viewMode === 'gallery' ? <GalleryView /> : <GridView />}
</AnimatePresence>
```

#### 6. Scroll Indicator
**Custom keyframe animation:**

```css
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; scaleY: 0.7; }
  50%      { opacity: 1; scaleY: 1; }
}
```

---

## Responsive Design

### Breakpoint Strategy

Tailwind CSS breakpoints:

```css
sm:  640px   (Small tablets)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

### Mobile-First Approach

All layouts start mobile and enhance:

#### Grid Layouts
```typescript
grid-cols-1                    // Mobile (default)
md:grid-cols-2                 // Tablets (2 columns)
lg:grid-cols-3                 // Desktop (3 columns)
```

#### Typography
**Fluid clamp() functions** eliminate breakpoints:

```css
font-size: clamp(min, preferred, max)
```

Example:
```css
--text-hero: clamp(3rem, 0.5rem + 7vw, 8rem);
```
- Mobile (320px): 3rem (48px)
- Viewport-scaled: 0.5rem + 7% of viewport width
- Desktop (1920px+): 8rem (128px)

#### Navigation
- **Desktop**: Horizontal menu, language selector, theme toggle
- **Mobile**: Hamburger → full-screen overlay

#### Property Listing Gallery
- **Desktop**: Side-by-side image + info (1.2:1 grid)
- **Mobile**: Stacked (image top, info bottom)

#### Footer
- **Desktop**: 4-column grid
- **Tablet**: 2-column grid
- **Mobile**: 1-column stack

### Touch Optimization

- **Minimum tap targets**: 44x44px (Apple HIG standard)
- **Swipe-friendly**: Mobile menu slide animation
- **No hover-dependent interactions**: All hover states have tap equivalents

---

## Multilingual Support

### Current Implementation

**Language selector** in navigation:
```typescript
const [language, setLanguage] = useState<'EN' | 'FR' | 'ES'>('EN');
```

**UI State Only** (currently):
- Active language highlighted in Champagne Gold
- Button group in header
- State persists during session

### Future Internationalization Strategy

**Recommended Implementation**:
1. Use `react-i18next` for content translation
2. JSON translation files per language:
   ```
   /locales/en.json
   /locales/fr.json
   /locales/es.json
   ```
3. Dynamic content switching without page reload
4. URL structure: `/en/properties`, `/fr/proprietes`, `/es/propiedades`
5. Property data localization in `properties.ts`

**Content to Translate**:
- Navigation menu items
- Section headings
- Body copy
- Form labels
- Property descriptions
- Features lists
- Footer links

---

## Performance & SEO Considerations

### Current Optimizations

#### 1. Image Loading
- **Unsplash CDN**: Optimized delivery with query params
  ```
  ?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080
  ```
- **Lazy Loading**: Automatic via browser
- **Responsive Images**: Size parameter based on viewport

#### 2. Code Splitting
- **React Router**: Automatic route-based splitting
- **Dynamic Imports**: Potential for component-level splitting

#### 3. CSS Optimization
- **Tailwind CSS**: PurgeCSS removes unused styles in production
- **CSS Variables**: Dynamic theming without JS
- **Critical CSS**: Inline in `<head>` via Vite

#### 4. Animation Performance
- **GPU Acceleration**: `transform` and `opacity` only (no layout thrashing)
- **will-change**: Implicit via Motion library
- **Reduced Motion**: Respects `prefers-reduced-motion` (via Tailwind)

### SEO Strategy

#### Current Implementation
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **Descriptive Alt Text**: All images have meaningful alt attributes
- **Accessible Forms**: Labels linked to inputs via `htmlFor`
- **ARIA Labels**: Navigation buttons, icons

#### Recommended Enhancements

1. **Meta Tags** (add to each page):
   ```html
   <title>Villa Palomeras — Luxury Villa in Marbella | Riffinity</title>
   <meta name="description" content="Exclusive 4-bed villa..." />
   <meta property="og:image" content="..." />
   ```

2. **Structured Data** (Schema.org):
   ```json
   {
     "@type": "RealEstateAgent",
     "name": "Riffinity Real Estate",
     "areaServed": ["Marbella", "Costa del Sol"],
     "priceRange": "€€€€"
   }
   ```

3. **Sitemap.xml**: Auto-generate from routes

4. **Server-Side Rendering**: Consider Next.js migration for:
   - Static generation of property pages
   - Improved SEO crawlability
   - Faster initial load

---

## Accessibility (WCAG 2.1)

### Current Compliance

#### Level A (Basic)
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Focus indicators (`:focus-visible`)
- ✅ Sufficient color contrast (4.5:1 for body text)
- ✅ Form labels

#### Level AA (Target)
- ✅ Focus order follows DOM order
- ✅ No keyboard traps
- ⚠️ Skip navigation link (not implemented)
- ✅ Animated content respects `prefers-reduced-motion`

#### Enhancements Needed
1. **Skip Link**: Jump to main content
2. **ARIA Landmarks**: `<nav role="navigation">`, `<main>`, `<footer>`
3. **Live Regions**: Announce property card changes
4. **Form Validation**: Error messages with `aria-describedby`
5. **Screen Reader Testing**: Validate with NVDA/JAWS

---

## Brand Voice & Content Strategy

### Tone of Voice

**Characteristics:**
- **Elegant**: Never flashy or sales-y
- **Confident**: Assured without arrogance
- **Intimate**: Boutique, personal approach
- **International**: Multilingual sophistication
- **Editorial**: Magazine-quality writing

**Writing Guidelines:**
- Use em dashes (—) for editorial flair
- Italicize key phrases sparingly
- Short, impactful sentences
- Active voice preferred
- Avoid real estate clichés ("stunning", "dream home")

### Copywriting Examples

**Hero Headline:**
> "Where Luxury Meets the Mediterranean"

**Pull Quote:**
> "Excellence is not a service feature — it is our founding principle."

**Property Description:**
> "Exceptional villa located in the prestigious Las Lomas de Río Verde on Marbella's Golden Mile. This elegant property combines contemporary design with Mediterranean charm, offering panoramic views and ultimate privacy."

### Content Principles

1. **Specificity Over Generics**:
   - ❌ "Beautiful location"
   - ✅ "Las Lomas de Río Verde on Marbella's Golden Mile"

2. **Features → Benefits**:
   - ❌ "4 bedrooms"
   - ✅ "Master suite with walk-in closet and spa bathroom"

3. **Emotional Resonance**:
   - ❌ "Large terrace"
   - ✅ "South-facing terraces with all-day sun"

---

## Technical Debt & Future Enhancements

### Phase 2 Roadmap

#### High Priority
1. **Real Property Data Integration**:
   - Connect to property management system API
   - Replace static `properties.ts` with CMS
   - Live availability status

2. **Form Functionality**:
   - Backend integration (Supabase, SendGrid, or similar)
   - Form validation with `react-hook-form`
   - GDPR-compliant data handling
   - Auto-responder emails

3. **Search & Filtering**:
   - Price range slider
   - Location filter
   - Property type (villa/penthouse/apartment)
   - Bedrooms/bathrooms filters
   - Sort by: Price, Size, Date Added

4. **Map Integration**:
   - Mapbox GL JS for luxury aesthetic
   - Property markers
   - Interactive neighborhood exploration

#### Medium Priority
5. **Virtual Tours**:
   - 360° image viewers
   - Video walkthrough integration
   - Matterport 3D scans

6. **Save/Favorite System**:
   - localStorage for guest users
   - Account system for registered users
   - Email alerts for saved properties

7. **Blog/News Section**:
   - Market insights
   - Neighborhood guides
   - Lifestyle content

8. **Performance Monitoring**:
   - Google Analytics 4
   - Hotjar heatmaps
   - Core Web Vitals tracking

#### Low Priority
9. **Comparison Tool**:
   - Side-by-side property comparison
   - Saved comparisons

10. **Agent Profiles**:
    - Team member bios
    - Direct agent contact

---

## Deployment & DevOps

### Current Setup

**Build Tool**: Vite 6.3.5
- Lightning-fast dev server
- Optimized production builds
- CSS/JS minification
- Asset optimization

**Build Command**:
```bash
pnpm build
```

**Output**: `/dist` directory with static assets

### Recommended Hosting

1. **Vercel** (Recommended):
   - Automatic deployments from Git
   - Edge network CDN
   - Zero-config SSL
   - Preview deployments
   - Analytics built-in

2. **Netlify**:
   - Similar features to Vercel
   - Form handling (useful for contact form)
   - Split testing

3. **Cloudflare Pages**:
   - Global CDN
   - DDoS protection
   - Free SSL

### Environment Variables

**For Production**:
```env
VITE_API_URL=https://api.riffinity.com
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
VITE_MAPBOX_TOKEN=pk.ey...
```

---

## Analytics & Conversion Tracking

### Key Metrics to Track

1. **Traffic**:
   - Page views per route
   - Unique visitors
   - Traffic sources (organic, direct, referral)

2. **Engagement**:
   - Average session duration
   - Bounce rate per page
   - Scroll depth (especially on property details)

3. **Conversions**:
   - Contact form submissions
   - "Request Viewing" clicks
   - Property card clicks
   - CTA button engagement

4. **User Behavior**:
   - Property view-to-contact ratio
   - Most viewed properties
   - Gallery view vs grid view usage
   - Language selection distribution

### Event Tracking Setup

**Google Analytics 4 Events**:
```typescript
gtag('event', 'property_view', {
  property_id: 'villa-palomeras',
  property_price: 1650000,
  location: 'Golden Mile'
});

gtag('event', 'contact_form_submit', {
  service: 'buying'
});
```

---

## Security Considerations

### Current Status
- ✅ No sensitive data stored client-side
- ✅ No authentication system (no attack surface)
- ✅ HTTPS enforced via hosting

### Future Backend Requirements

When adding form submissions or user accounts:

1. **Input Validation**:
   - Sanitize all form inputs
   - CSRF token for forms
   - Rate limiting on submissions

2. **Data Protection**:
   - GDPR compliance (EU users)
   - Privacy policy update
   - Cookie consent banner
   - Data retention policies

3. **API Security**:
   - API key rotation
   - Rate limiting
   - CORS configuration

---

## Browser Support

### Target Browsers

**Modern Browsers** (Last 2 versions):
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS & iOS)

**Graceful Degradation**:
- CSS Grid with fallback
- Motion animations: `prefers-reduced-motion` respected
- JavaScript: ES2020 features (transpiled via Vite)

### Polyfills Not Required
- All target browsers support:
  - CSS Grid
  - CSS Custom Properties
  - Async/Await
  - Fetch API
  - IntersectionObserver (for scroll reveals)

---

## Design System Governance

### Updating the Design System

**CSS Variables** in `/src/styles/theme.css`:

1. **Add New Color**:
   ```css
   --color-accent-coral: #FF6B6B;
   ```

2. **Update Typography Scale**:
   ```css
   --text-4xl: clamp(3rem, 2rem + 5vw, 6rem);
   ```

3. **Extend Spacing**:
   ```css
   --space-40: 10rem;
   ```

### Component Standards

**When creating new components**:
1. Use Tailwind utility classes first
2. Extract to `theme.css` variables for repeated values
3. Follow existing naming conventions
4. Add TypeScript interfaces
5. Include accessibility attributes

**File Naming**:
- Components: PascalCase (`PropertyCard.tsx`)
- Pages: PascalCase (`PropertyListingPage.tsx`)
- Data: camelCase (`properties.ts`)
- Styles: kebab-case (`theme.css`)

---

## Conclusion

The Riffinity Real Estate website successfully embodies **quiet luxury** through:

✅ **Editorial Design System**: Sophisticated typography, refined color palette  
✅ **Advanced Interactions**: 3D gallery transforms, scroll-reveal animations  
✅ **Responsive Architecture**: Fluid typography, mobile-first layouts  
✅ **Boutique Brand Identity**: Multilingual, international, personalized  
✅ **Modern Tech Stack**: React, Tailwind CSS 4, Motion, React Router 7  
✅ **Scalable Foundation**: Extensible data model, component library, routing  

### Next Steps

**Immediate Priorities**:
1. Connect contact form to backend (Supabase + SendGrid)
2. Add real property data source
3. Implement search/filtering
4. Deploy to production (Vercel)
5. Set up analytics tracking

**Long-Term Vision**:
- Full CMS integration
- Virtual tour capabilities
- Client portal for saved properties
- Market insights blog
- Multi-currency support (EUR/USD/GBP)

---

## Technical Specifications Summary

| Aspect | Details |
|--------|---------|
| **Framework** | React 18.3.1 |
| **Routing** | React Router 7.13.0 (Data mode) |
| **Styling** | Tailwind CSS 4.1.12 |
| **Animation** | Motion 12.23.24 |
| **Icons** | Lucide React 0.487.0 |
| **Build Tool** | Vite 6.3.5 |
| **Languages** | TypeScript + JSX |
| **Component Library** | Radix UI (Accessible primitives) |
| **Fonts** | Cormorant Garamond (display), Satoshi (body) |
| **Color Palette** | Ivory (#F9F6F1), Champagne Gold (#B8975A), Midnight Navy (#0C1020) |
| **Breakpoints** | 640px (sm), 768px (md), 1024px (lg), 1280px (xl) |
| **Max Content Width** | 1280px |
| **Design Philosophy** | Quiet luxury, Editorial sophistication, Boutique approach |

---

**Document Version**: 1.0  
**Last Updated**: April 16, 2026  
**Prepared For**: Riffinity Real Estate  
**Contact**: riffinityrealestate@gmail.com  
**Website**: [Instagram @riffinityrealestate](https://www.instagram.com/riffinityrealestate/)
