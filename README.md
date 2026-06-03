# Maggi - Interactive Scroll Experience & Culinary Hub

Welcome to the **Maggi Interactive Scroll Experience & Culinary Hub**! This is a state-of-the-art, premium multi-page web application featuring high-performance kinetic scroll animations, synthesizer audio effects, modern UI layouts, and full responsive compatibility.

---

## ✨ Features

- **Kinetic Scroll Experience:** An interactive 3D-like preparation journey mapped frame-by-frame (240 frames) to the user's scroll progress, rendered on a high-performance HTML5 Canvas.
- **Dynamic Glassmorphic Narration Cards:** Multi-stage recipe storyboards that fade, slide, and scale into view as the user scrolls.
- **Procedural Sound Synthesizer:** Real-time interactive audio synthesis (boiling water, roasting spices, ticking timers) that matches the speed and status of scroll progress using the Web Audio API.
- **Multi-Page Hub:**
  - **Our World (Home):** Interactive scroll experience and brand storytelling.
  - **Products Catalog:** Dynamic product grids with interactive filter capsules, blur hover animations, and hover-triggered nutritional sheets.
  - **Recipes Feed:** A masonry grid layout containing recipe cards, search capability, and tag filters.
  - **Kitchen Story:** Historical brand heritage storytelling with parallax headers.
  - **Impact Initiatives:** Eco-friendly circular economy dashboards structured as a modern Bento Grid.
  - **Join Club Modal:** Overlay subscription form returning users cleanly to their referring page upon close.
- **Responsive Navigation Drawer:** Floating glassmorphic header that hides on scroll down and reveals on scroll up, incorporating an automated dynamic drawer for smaller devices.
- **Dark Mode Support:** Smooth support for theme variants across typography and layouts.

---

## 🛠️ Tech Stack

- **Core:** HTML5, Modern ECMAScript (Vanilla JS).
- **Styling:** Tailwind CSS (loaded via CDN) & Custom CSS Custom Properties (`index.css`).
- **Interactive Canvas Rendering:** Linear interpolation (lerp) for smooth frame pacing.
- **Interactive Audio:** Web Audio API oscillator synthesis.
- **Build System:** Vite 5.x with custom Rollup multi-page input bundle parameters.

---

## 🚀 Quick Start

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then run:
```bash
npm install
```

### 2. Run Locally in Development
Start the local Vite server:
```bash
npm run dev
```
Open the output URL (usually `http://localhost:5173/`) in your browser.

### 3. Build for Production
Bundle the multi-page static assets into the `dist/` directory:
```bash
npm run build
```

---

## ☁️ Vercel Deployment

This project is fully ready for deployment on **Vercel** with clean URLs routing enabled.

1. Push this repository to your GitHub account.
2. In the Vercel Dashboard, select **Add New Project** and import your repository.
3. Vercel will automatically identify the Vite configuration.
4. Keep the default build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**!

*Note: The configured [vercel.json](vercel.json) file handles clean path resolving automatically (e.g. `/Product` resolves cleanly to `/Product.html` on Vercel).*

---

## 📱 Responsiveness

- **Mobile Header:** Responsive navigation bar that keeps search/cart options available, replacing desktop links with a hamburger toggle button.
- **Mobile Menu Drawer:** Dynamic sliding glassmorphic drawer containing cloned navigation links and Join Club redirects.
- **Bento & Masonry Grids:** Auto-adapting grid column spans that scale down to 1 column on smaller viewport screens.
