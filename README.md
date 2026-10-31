# MORNI — All-Day Breakfast & Specialty Coffee

An editorial, high-fidelity digital experience crafted for **MORNI**, a boutique all-day breakfast room and specialty coffee bar located in **Canggu, Bali**. 

Built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, **GSAP (ScrollTrigger)**, and **Lenis Smooth Scroll**, this project delivers a pixel-perfect recreation of the Figma design with fluid momentum scrolling, zero-clip typography, and rich interactive features.

---

## Brand Philosophy

> *"Good morning, All day. Still serving sunrise."*

A former surf-repair shop on the road to Batu Bolong transformed into a sunlit breakfast room. Big windows, one long table, single-origin beans roasted two kilometres down the road, and pancakes until close. No cut-offs, no brunch surcharges, and no judgement.

- **Location**: Jl. Pantai Batu Bolong 56, Canggu, Bali 80361
- **Hours**: Every day, 7:00 – 17:00 WITA (Kitchen open until close)
- **Coffee**: Bali Kintamani & Flores Bajawa beans, 10-day rested, medium roast

---

## Design System & Palette

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| **Obsidian Charcoal** | `#191E1B` | Primary background, root layout, dark tiles |
| **Deep Forest Surface** | `#232B25` | Component containers, cards, image backdrops |
| **Antique Cream** | `#F1EAD9` | Primary typography, headlines, icons, body copy |
| **Champagne Gold** | `#D4B879` | Primary CTA buttons, accents, badges, border rules |
| **Muted Gold Divider** | `rgba(212, 184, 121, 0.4)` | Hairline rules, category outlines, frame borders |
| **Soft Cream Divider** | `rgba(241, 234, 217, 0.4)` | Footer separators, subtle borders |

### Typography
- **Display Serif**: `Cormorant Garamond` — High-contrast, editorial serif with custom line-height and padding masks for deep descenders (`y`, `p`, `g`).
- **Body Sans**: `Manrope` — Clean geometric sans-serif for legible reading, metadata, times, and tabular pricing.

---

## Key Features & Sections

### 1. Navigation (`components/Navbar.tsx`)
- Sticky glassmorphic bar with subtle blur (`backdrop-blur-md`) and scroll-state detection.
- **Live Bali Time Indicator**: Real-time WITA (UTC+8) clock that automatically updates the cafe's open/closed status.
- Desktop quick-links with animated gold underlines.
- Mobile drawer navigation with responsive hamburger toggle.
- Direct "Find us ↗" action opening the interactive directions modal.

### 2. Hero Section (`components/Hero.tsx`)
- Monumental 180px display headline (*"All day"*) with tailored overflow clearance eliminating descender clipping.
- Opening narrative framing the Canggu breakfast ritual.
- Featured photo (*The Peach Stack at the counter*) with scale-settle entrance and scroll-scrubbed parallax.
- Floating "Featured Daily" badge on hover.

### 3. About MORNI (`components/About.tsx`)
- Editorial narrative: *"We don’t do breakfast hours."*
- Multi-perspective photography:
  - Left column: Tall dining room portrait with narrative caption.
  - Right column: Asymmetrical photo cascade (*Breakfast table gatherings* and *Guests enjoying morning light*).
  - Parallax depth mapping between foreground and background imagery.

### 4. Menu & Category Filtering (`components/Menu.tsx`)
- Headline: *"Same at menu 7 am and 4 pm."*
- Category filter pill selector (*All, Sweet, Savoury, Bakery, Coffee*).
- Staggered dish entrance animation (`0.85s` duration, `0.08s` interval).
- Hover-interactive dish rows displaying item name, price, ingredients, and dietary notes.
- Quick link to the complete dietary guide & full menu modal.

### 5. Specialty Coffee Bar (`components/Coffee.tsx`)
- House blend showcase with origin details (*Bali Kintamani & Flores Bajawa*) and roast specifications.
- **Interactive Tasting Method Switcher**: Dynamic tab switching between *Espresso*, *V60 Filter*, and *Table Moka* with live tasting notes.
- 3-column quick facts grid: *2 km to roaster*, *10 days rested*, *7:00 first pour*.

### 6. Photo Journal (`components/PhotoJournal.tsx`)
- *"One day at MORNI"* visual chronology across 8 key daily moments (7:15 AM to 4:45 PM).
- Dynamic 2-row layout with alternating vertical card offsets (`pt-[64px]`).
- Smooth card hover states with *"View Moment ↗"* overlay.
- Clicking any card opens the high-resolution lightbox viewer.

### 7. Visit & Location (`components/Visit.tsx`)
- Cormorant Garamond dual-line heading: *"Come hungry. Come whenever."*
- Structured information: address, operating hours, and copy-to-clipboard email contact.
- Prominent gold *"Get directions"* button.
- Counter photo showcase with walk-in policy badge.

### 8. Interactive Modals
- **Directions Modal (`components/DirectionsModal.tsx`)**:
  - Embedded OpenStreetMap interactive view of Jl. Pantai Batu Bolong.
  - One-click "Copy Address" with feedback tooltip.
  - Distance benchmarks (Batu Bolong Beach, Echo Beach, Love Anchor, Deus Ex Machina).
  - Direct links to Google Maps and Apple Maps.
- **Full Menu Modal (`components/FullMenuModal.tsx`)**:
  - Live search input querying dish names, descriptions, and dietary tags.
  - Category filters (*Sweet, Savoury, Bakery, Coffee*).
  - Interactive ordering counter with simulated bill calculation (`K IDR`).
  - Allergen tags (Vegetarian, Gluten-Free, Vegan, Dairy-Free).
- **Photo Lightbox (`components/LightboxModal.tsx`)**:
  - High-resolution modal carousel with keyboard navigation (`←`, `→`, `Escape`).
  - Interactive thumbnail strip for quick jumping.
  - Photo timestamp and story captions.

### 9. Editorial Footer (`components/Footer.tsx`)
- Closing statement: *"Still serving sunrise."*
- Giant responsive display wordmark (1280px vector asset).
- Social links, email copy trigger, and smooth back-to-top button.

### 10. Favicon & Brand Icon System
- Bespoke vector **"M" Monogram** ([app/icon.svg](file:///d:/Projects/Restaurant%20Websites/casko/app/icon.svg) & [public/icon.svg](file:///d:/Projects/Restaurant%20Websites/casko/public/icon.svg)) with a golden rising sun accent dot.
- High-compatibility 32×32 binary ICO icon ([public/favicon.ico](file:///d:/Projects/Restaurant%20Websites/casko/public/favicon.ico)).

---

## Tech Stack & Architecture

- **Framework**: [Next.js 16.4.3](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation Engine**: [GSAP 3.15](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll**: [Lenis 1.3.27](https://lenis.darkroom.engineering/) synchronized with GSAP's requestAnimationFrame ticker
- **Typography**: `next/font/google` ([Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Manrope](https://fonts.google.com/specimen/Manrope))
- **Language**: TypeScript

```
casko/
├── app/
│   ├── globals.css         # Tailwind v4 theme variables & base styles
│   ├── icon.svg            # Next.js SVG site icon
│   ├── layout.tsx          # Root layout, Google fonts, metadata
│   └── page.tsx            # Main page composition & modal state
├── components/
│   ├── About.tsx           # About section & gallery
│   ├── Coffee.tsx          # House blend & interactive brew method switcher
│   ├── DirectionsModal.tsx # Embedded map, address copy, distances
│   ├── Footer.tsx          # Giant wordmark, links, back to top
│   ├── FullMenuModal.tsx   # Searchable menu, bill calculator, allergens
│   ├── Hero.tsx            # All day display hero & peach stack visual
│   ├── LightboxModal.tsx   # Keyboard-controlled photo lightbox carousel
│   ├── Menu.tsx            # Featured dish list & category filter
│   ├── Navbar.tsx          # Responsive sticky navigation & live Bali time
│   ├── PhotoJournal.tsx    # One day at MORNI 8-moment photo grid
│   ├── SmoothScroll.tsx    # Lenis + GSAP RAF synchronization provider
│   └── Visit.tsx           # Hours, location, counter visual
├── data/
│   ├── journal.ts          # Photo journal moments metadata
│   └── menu.ts             # Featured & extended menu database
├── lib/
│   └── gsap.ts             # Client-safe GSAP & ScrollTrigger registration
├── public/
│   ├── favicon.ico         # Binary 32x32 multi-platform fallback icon
│   ├── icon.svg            # Direct SVG icon asset
│   └── images/             # Vectors, logos, and high-res photography
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js `20.x` or higher
- `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd casko
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the assigned port) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts local Next.js development server with Turbopack |
| `pnpm build` | Creates an optimized static/production build |
| `pnpm start` | Runs the production server locally |
| `pnpm lint` | Runs ESLint checks |

---

## Performance & Motion Guidelines

- **Zero Text Clipping**: Cormorant Garamond's deep descenders are protected by dedicated negative-margin clearance masks (`pb-6 -mb-6` to `pb-10 -mb-10`), preventing bottom pixel cutoff.
- **Instant Clarity Motion**: All reveals utilize rapid opacity ramps (`0.4s - 0.5s`) coupled with smooth positional settling (`0.85s - 1.0s`, `power3.out`), avoiding sluggish low-opacity lingering.
- **Hardware Acceleration**: GPU layer promotion (`will-change: transform, opacity`) applied across all animating containers for consistent 60fps performance.
- **Lenis Synchronization**: Lenis scroll updates directly trigger `ScrollTrigger.update()` inside GSAP's ticker to eliminate scroll stutter.

---

## License

Private project. All rights reserved by **MORNI Canggu**.
