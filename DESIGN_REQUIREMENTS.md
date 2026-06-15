# Design Requirements: Nishant's Daily Digest

**Version:** 1.0
**Date:** June 15, 2026
**Platform:** Static Web Application (React + Tailwind CSS)
**Deployment:** GitHub Pages (Static HTML/CSS/JS)

---

## 1. Platform Overview

### What It Is
A daily research digest that compiles curated content across 4 main sections:
1. **Tech News** - 15-25 tech articles from the last 24 hours
2. **Physics** - Deep dive into one physics topic (rotates daily)
3. **Mathematics** - Mathematical concept with video resources
4. **Deep Dive** - Random interesting topic (AI/ML/Business/Finance)

### Technical Stack
- **Frontend:** React 19 + Tailwind CSS 4
- **Build Tool:** Vite
- **Hosting:** GitHub Pages (purely static, no backend)
- **Content Source:** JSON files generated daily by AI agent (Hermes)
- **Navigation:** Page-based (tabs), not scrolling

### User Flow
1. User lands on page → sees page 1 (Tech News)
2. Clicks tabs at top to switch between sections OR uses Previous/Next buttons
3. Each section loads as a separate view (no scrolling between sections)
4. Dark mode toggle available in top-right
5. External links open in new tabs

---

## 2. Global Layout Structure

### Navigation Bar (Fixed Top)
**Background:** Black (#000000)
**Text:** White (#FFFFFF)
**Height:** 64px

**Elements:**
- **Left:** Site title "NISHANT'S DAILY DIGEST" (uppercase, tracking-wider, text-sm)
- **Center:** Current date "Monday, June 15, 2026" (text-xs, opacity 70%)
- **Right:** Dark mode toggle button (☀️/🌙 emoji, bordered, hover effect)

### Tab Navigation (Below Top Nav)
**Background:** Light gray (#F5F5F5) / Dark gray (#1F2937) in dark mode
**Border:** Bottom border on entire section

**Elements:**
- 4 tabs: "Tech News", "Physics", "Mathematics", "Deep Dive"
- **Active tab:** Bold, black bottom border (2px)
- **Inactive tab:** Gray text, transparent border, hover effect
- Horizontal scrollable on mobile

### Main Content Area
- **Full height:** Takes remaining viewport height
- **Scrollable:** Only within the current section
- **No sidebar:** Full-width content

### Footer Navigation (Fixed Bottom)
**Background:** Light gray (#F5F5F5) / Dark gray (#1F2937) in dark mode
**Height:** 64px

**Elements:**
- **Left:** "← Previous" button (disabled on first page)
- **Center:** Page counter "Page 1 of 4"
- **Right:** "Next →" button (disabled on last page)

---

## 3. Section-Specific Requirements

---

## 📰 SECTION 1: Tech News (Modern Magazine Layout)

### Color Palette
- **Primary (Olive):** #41431B (headings, borders, category tags)
- **Secondary (Sage):** #AEB784 (accents, hover states)
- **Tertiary (Warm Beige):** #E3DBBB (subtle backgrounds)
- **Background (Cream):** #F8F3E1 (card backgrounds)

### Layout Structure

#### Header
- **Title:** "Tech News — June 15, 2026"
  - Font: Serif, 3rem (48px), bold
  - Color: #41431B
  - Bottom border: 4px solid #41431B
  - Padding bottom: 1.5rem

#### Article Grid
**Grid System:** CSS Grid, 12 columns, gap: 1.5rem

**Card Size Variations:**
1. **Hero Article (First Item):**
   - Full width (12 columns)
   - Larger title (2.5rem / 40px)
   - Larger summary text (1.125rem / 18px)

2. **Large Cards:**
   - 8 columns on desktop, full on mobile
   - Appears every 5th article (index % 5 === 1)

3. **Small Cards:**
   - 4 columns on desktop, full on mobile
   - Appears every 5th article (index % 5 === 2)

4. **Medium Cards:**
   - 6 columns on desktop, full on mobile
   - Appears every 3rd article (index % 3 === 0)

5. **Default Cards:**
   - 4 columns on desktop, full on mobile

### Individual Article Card Components

**Container:**
- Background: #F8F3E1
- Border: 2px solid #AEB784
- Padding: 1.5rem
- Hover: Box shadow elevation

**Elements (in order):**

1. **Category Tag**
   - Text: "NEWS", "AI", "HARDWARE", etc. (uppercase)
   - Background: #41431B
   - Text color: #F8F3E1
   - Font size: 0.75rem (12px)
   - Padding: 0.25rem 0.75rem
   - Font weight: Bold

2. **Article Title**
   - Font: Serif, bold
   - Color: #41431B
   - Size: 1.5rem (24px) for standard, 2.5rem (40px) for hero
   - Line height: Tight
   - Hover: Color changes to #AEB784

3. **Meta Information**
   - Source name • Date
   - Font: Sans-serif
   - Size: 0.875rem (14px)
   - Color: #41431B at 60% opacity
   - Separator: "•" between items

4. **Summary Text**
   - Font: Sans-serif
   - Size: 1rem (16px) for standard, 1.125rem (18px) for hero
   - Color: #41431B at 80% opacity
   - Line height: Relaxed (1.625)
   - Max lines: No truncation

5. **Read More Link**
   - Text: "Read Full Article →"
   - Font size: 0.875rem (14px)
   - Font weight: Semibold
   - Color: #41431B
   - Bottom border: 2px solid #41431B
   - Hover: Both text and border change to #AEB784

### Data Fields Required for Each Article
```json
{
  "category": "NEWS" | "AI" | "HARDWARE" | "SECURITY",
  "title": "Article headline",
  "source": "The Verge",
  "date": "June 15, 2026",
  "summary": "Brief description of the article (2-3 sentences)",
  "url": "https://example.com/article"
}
```

### Responsive Behavior
- **Desktop (≥768px):** Grid layout as described
- **Mobile (<768px):** All cards full width, stacked vertically

---

## 📚 SECTION 2: Physics (Academic Layout)

### Color Palette
- **Background (Light):** #F9F7F1 (vintage paper)
- **Background (Dark):** #2B2722 (dark brown)
- **Text (Light):** #2B2722
- **Text (Dark):** #F9F7F1
- **Accent (Light):** #8B4513 (saddle brown)
- **Accent (Dark):** #D2691E (chocolate)

### Layout Structure

#### Container
- Max width: 56rem (896px)
- Centered
- Padding: 2rem horizontal, 4rem vertical

#### Header Section
- **Title:** "Physics — Quantum Entanglement Fundamentals"
  - Font: Serif, 3rem (48px), bold
  - Color: Accent color
  - Margin bottom: 1rem
- **Subtitle (optional):** Italic, 1.25rem (20px), 80% opacity
- **Bottom border:** 3px solid accent color
- **Padding bottom:** 2rem
- **Margin bottom:** 4rem

#### Content Blocks

**1. Section Heading**
- Text: "EXPLANATION"
- Font size: 0.75rem (12px)
- Uppercase, bold
- Color: Accent at 70% opacity
- Margin bottom: 1rem

**2. Content Heading**
- Text: "The Strange Reality of Quantum Entanglement"
- Font: Serif, 2rem (32px), bold
- Color: Accent
- Margin bottom: 1.5rem

**3. Body Text**
- Font: Serif
- Size: 1.125rem (18px)
- Line height: Relaxed (1.625)
- Text align: Justified
- Color: Main text color
- Spacing: 1rem between paragraphs

**4. Mathematical Formulas**
- Display: Block, centered
- Font family: Monospace or LaTeX rendered (MathJax)
- Background: Subtle gray (5% opacity)
- Padding: 1rem
- Margin: 2rem 0

**5. Subheadings**
- Font: Serif, 1.5rem (24px), semibold
- Color: Main text at 90% opacity
- Margin: 2rem 0 1rem

### Data Fields Required
```json
{
  "id": "physics",
  "title": "Physics — Quantum Entanglement Fundamentals",
  "subtitle": "Understanding spooky action at a distance",
  "content": [
    {
      "type": "section_heading",
      "text": "EXPLANATION"
    },
    {
      "type": "heading",
      "text": "The Strange Reality of Quantum Entanglement"
    },
    {
      "type": "paragraph",
      "text": "Body text with proper LaTeX: \\(\\psi\\rangle = \\frac{1}{\\sqrt{2}}\\)"
    }
  ]
}
```

### Responsive Behavior
- **Desktop:** Full layout as described
- **Mobile:** Reduce padding to 1rem, font sizes scale down slightly

---

## 🔢 SECTION 3: Mathematics (Academic Layout + Video)

### Color Palette
- **Background (Light):** #F7F5F2 (warm white)
- **Background (Dark):** #1A1816 (dark charcoal)
- **Text (Light):** #1A1816
- **Text (Dark):** #F7F5F2
- **Accent (Light):** #CC6600 (dark orange)
- **Accent (Dark):** #FF9933 (bright orange)

### Layout Structure
**Same as Physics section** with the following addition:

#### Video Card Component
**Container:**
- Background: Accent color at 10% opacity
- Border: 2px solid accent color
- Border radius: 0.5rem
- Padding: 1.5rem
- Margin: 2rem 0

**Layout:** Flex row (horizontal)

**Elements:**
1. **Video Icon**
   - Emoji: 🎥
   - Size: 2.5rem (40px)
   - Flex: None

2. **Video Info (Flex: 1)**
   - **Title:** Font bold, 1.125rem (18px)
   - **Channel & Duration:** Font size 0.875rem (14px), 70% opacity
   - Example: "3Blue1Brown • 15:23"

3. **Watch Button**
   - Background: Accent color
   - Text: "Watch"
   - Text color: Background color (high contrast)
   - Padding: 0.5rem 1rem
   - Font weight: Semibold
   - Border radius: 0.25rem
   - Hover: Slight brightness increase

### Data Fields Required
```json
{
  "id": "math",
  "title": "Mathematics — Fourier Transform Deep Dive",
  "content": [
    {
      "type": "heading",
      "text": "Understanding the Fourier Transform"
    },
    {
      "type": "paragraph",
      "text": "Mathematical explanation with LaTeX formulas"
    },
    {
      "type": "video",
      "video": {
        "title": "But what is the Fourier Transform? A visual introduction",
        "channel": "3Blue1Brown",
        "duration": "20:45",
        "url": "https://youtube.com/watch?v=example"
      }
    }
  ]
}
```

---

## 🌐 SECTION 4: Deep Dive (Same as Math)

**Identical layout to Mathematics section** but with different topic (AI, ML, Business, Finance, etc.)

---

## 4. Typography System

### Font Families
- **Serif (Academic sections):** Georgia, Palatino, Times New Roman, serif
- **Sans-serif (Tech News, UI):** -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif
- **Monospace (Code/Math):** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas

### Font Scale
- **text-xs:** 0.75rem (12px) - Category tags, meta info
- **text-sm:** 0.875rem (14px) - Navigation, buttons
- **text-base:** 1rem (16px) - Body text (Tech News)
- **text-lg:** 1.125rem (18px) - Body text (Physics/Math)
- **text-xl:** 1.25rem (20px) - Subtitles
- **text-2xl:** 1.5rem (24px) - Card titles
- **text-3xl:** 1.875rem (30px) - Section headings
- **text-4xl:** 2.25rem (36px) - Hero titles
- **text-5xl:** 3rem (48px) - Main section titles

### Font Weights
- **Regular:** 400 (body text)
- **Medium:** 500 (navigation)
- **Semibold:** 600 (buttons, links)
- **Bold:** 700 (headings, titles)

---

## 5. Interactive Elements

### Buttons

**Primary (Dark Mode Toggle):**
- Border: 1px solid white/black
- Padding: 0.375rem 0.75rem
- Font size: 0.75rem
- Font weight: Semibold
- Hover: Invert colors (bg becomes white, text becomes black)
- Transition: 150ms

**Navigation (Prev/Next):**
- No border
- Padding: 0.5rem 1rem
- Font size: 0.875rem
- Font weight: Medium
- Disabled state: 30% opacity, cursor not-allowed
- Hover: Blue color (#0066FF)

### Links

**Article Links:**
- Underline: 2px bottom border
- Color: Section-specific
- Hover: Color + border color change
- Transition: 150ms

**External Links:**
- Open in new tab (target="_blank")
- Include rel="noopener noreferrer"

### Tabs

**Default State:**
- Text color: Gray (#6B7280)
- Border bottom: 2px transparent
- Hover: Text becomes black

**Active State:**
- Text color: Black
- Border bottom: 2px black
- Font weight: Medium

---

## 6. Spacing System

### Grid Gaps
- **Tech News Grid:** 1.5rem (24px)
- **Content spacing:** 3rem (48px) between major sections

### Padding
- **Cards:** 1.5rem (24px)
- **Page container (Tech):** 1.5rem horizontal, 3rem vertical
- **Page container (Academic):** 2rem horizontal, 4rem vertical

### Margins
- **Section header bottom:** 3-4rem
- **Paragraph spacing:** 1rem
- **Heading top margin:** 2rem

---

## 7. Dark Mode Specifications

### Global Changes
- Toggle via button in top-right
- Preference saved to localStorage
- Applies class "dark" to document root

### Color Adaptations

**Tech News (Magazine):**
- No dark mode variant (always light cream background)

**Physics:**
- Background: #2B2722
- Text: #F9F7F1
- Accent: #D2691E

**Math/Deep Dive:**
- Background: #1A1816
- Text: #F7F5F2
- Accent: #FF9933

**Navigation/Footer:**
- Background: #1F2937 (dark gray)
- Text: White
- Borders: #374151 (lighter gray)

---

## 8. Responsive Breakpoints

```css
/* Mobile First */
Default: < 640px (mobile)
sm: 640px (small tablets)
md: 768px (tablets, where grid activates)
lg: 1024px (desktop)
xl: 1280px (large desktop)
```

### Key Responsive Changes

**Tech News Grid:**
- Mobile: 1 column (all cards full-width)
- Tablet (md+): 12-column grid with varied sizes
- Desktop (lg+): Same as tablet, wider gaps

**Academic Sections:**
- Mobile: Padding reduced to 1rem, font sizes slightly smaller
- Desktop: Full padding and sizing

**Navigation:**
- Mobile: Tabs scroll horizontally, hamburger menu potential
- Desktop: All tabs visible

---

## 9. Accessibility Requirements

### ARIA Labels
- Dark mode button: `aria-label="Toggle theme"`
- Navigation buttons: Proper disabled states
- Links: Descriptive text, no "click here"

### Keyboard Navigation
- Tab order: Top nav → Tabs → Content → Footer
- Focus indicators: Visible outline on all interactive elements

### Color Contrast
- **Minimum ratio:** 4.5:1 for text
- All color combinations tested and compliant

### Screen Readers
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<footer>`
- Heading hierarchy: h1 → h2 → h3 properly structured

---

## 10. Content Generation & Data Flow

### JSON Input Format
Each day, the AI agent (Hermes) generates a JSON file with this structure:

```json
{
  "date": "2026-06-15",
  "title": "Daily Research Digest",
  "description": "Brief summary of today's digest",
  "sections": [
    {
      "id": "tech-news",
      "title": "Tech News — June 15, 2026",
      "content": [
        {
          "category": "NEWS",
          "title": "Article title",
          "source": "The Verge",
          "date": "June 15, 2026",
          "summary": "Article summary",
          "url": "https://..."
        }
      ]
    },
    {
      "id": "physics",
      "title": "Physics — Quantum Entanglement Fundamentals",
      "subtitle": "Understanding spooky action at a distance",
      "content": [
        {
          "heading": "The Strange Reality",
          "text": "Body text with LaTeX: \\(\\psi\\rangle\\)"
        }
      ]
    },
    {
      "id": "math",
      "title": "Mathematics — Fourier Transform",
      "content": [
        {
          "heading": "Understanding Fourier",
          "text": "Mathematical content",
          "video": {
            "title": "Visual introduction",
            "channel": "3Blue1Brown",
            "duration": "20:45",
            "url": "https://youtube.com/..."
          }
        }
      ]
    },
    {
      "id": "random-topic",
      "title": "Deep Dive — AI Export Controls",
      "content": [/* same as math/physics */]
    }
  ]
}
```

### Build Process
1. Agent generates `YYYY-MM-DD-digest.json`
2. Build script runs: `npm run build-digest YYYY-MM-DD-digest.json`
3. React app compiles JSON into static HTML/CSS/JS
4. Output saved to `YYYY-MM-DD/` folder
5. Deployed to GitHub Pages at `https://daddyankee.github.io/nishant-digest/YYYY-MM-DD/`

---

## 11. Design Deliverables Requested

### Mockups Needed
1. **Tech News Page (Desktop):**
   - Full page view showing magazine grid with varied card sizes
   - Show 6-8 articles with different layouts
   - Include navigation bars (top & bottom)

2. **Tech News Page (Mobile):**
   - Stacked card layout
   - Show responsive navigation

3. **Physics Page (Desktop):**
   - Academic layout with heading, body text, LaTeX formulas
   - Show proper typography and spacing

4. **Math Page with Video (Desktop):**
   - Same as physics but with video card component

5. **Dark Mode Variants:**
   - Physics page in dark mode
   - Math page in dark mode

6. **Component Library:**
   - Individual article card (Tech News)
   - Video card component
   - Button styles
   - Tab navigation
   - Typography samples

### File Format
- **Design tool:** Figma preferred (shareable link)
- **Export:** PNG/SVG for key components
- **Annotations:** Spacing, colors, font sizes clearly marked

### Color Swatches
Please provide exact hex codes for all colors used:
- Tech News palette (4 colors)
- Physics palette (light & dark, 6 colors total)
- Math palette (light & dark, 6 colors total)
- UI elements (navigation, buttons, 4 colors)

---

## 12. Future Enhancements (Nice to Have)

### Phase 2 Features
- [ ] Article images/thumbnails in Tech News cards
- [ ] Share buttons (Twitter, LinkedIn)
- [ ] Search functionality across all digests
- [ ] Archive page showing all past digests
- [ ] Reading progress indicator
- [ ] Bookmark/save articles feature
- [ ] Print-friendly CSS
- [ ] RSS feed generation

### Potential Layout Improvements
- [ ] Masonry layout option for Tech News
- [ ] Collapsible sections in academic pages
- [ ] Floating table of contents for long articles
- [ ] Inline image support for Physics/Math explanations
- [ ] Interactive diagrams for mathematical concepts

---

## Contact & Questions

**Project Owner:** Nishant
**Repository:** https://github.com/daddyankee/nishant-digest
**Live Demo:** https://daddyankee.github.io/nishant-digest/2026-06-15/

For design questions or clarifications, please refer to the live demo and inspect the current implementation.

---

**Document Version:** 1.0
**Last Updated:** June 15, 2026
**Status:** Ready for Design Phase
