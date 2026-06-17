# Implementation Guide

## For Hermes Agent

### Daily Workflow
1. Generate `YYYY-MM-DD/data.json` using `HERMES_SCHEMA.md`
2. Run digest generator:
   ```bash
   node scripts/generate-digest.js
   # This generates YYYY-MM-DD/index.html with:
   # - 5 theme options (parchment, sepia, nordic, dusk, graphite)
   # - Full responsive design (mobile/tablet/desktop)
   # - Theme switching with localStorage
   ```
3. Commit: `git add . && git commit -m "Daily digest YYYY-MM-DD"`
4. Push: `git push origin main`

### Data Requirements
- **Tech News**: 8 articles, first is hero (cols: 12)
- **Physics**: 1 concept with formulas
- **Math**: 1 topic with formulas, optional video
- **Deep Dive**: 1 analysis piece

### Formula Syntax
- Inline: `\\(x^2\\)`
- Display: `\\[ \\int_0^1 x dx \\]`
- Use KaTeX-compatible LaTeX

## Design Spec
All CSS/layout from `claude design/Nishants Daily Digest.dc.html` - DO NOT modify:
- Nav: 64px black bar
- Tabs: Parchment theme tabs
- Grid: 12-col CSS Grid for articles
- Typography: IBM Plex Sans + Georgia serif
- Colors: CSS variables (5 themes included)

## File Structure
```
YYYY-MM-DD/
  data.json          # Hermes generates
  index.html         # Script generates
```

## Push Checklist
1. Verify `data.json` schema
2. Test local: `open YYYY-MM-DD/index.html`
3. Commit with message
4. Push to GitHub
