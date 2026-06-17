# Hermes Agent Integration Guide

## Overview
You have **two different digest systems**:
1. **OLD**: 6-section multi-theme system (`base/HERMES_INSTRUCTIONS.md`)
2. **NEW**: 4-section Claude Design system (`HERMES_SCHEMA.md`)

Choose **ONE** system for your cron job.

---

## Option 1: Use NEW Claude Design System (RECOMMENDED)

### Files Hermes Needs
1. **HERMES_SCHEMA.md** - Data schema
2. **scripts/generate-digest.js** - Generator script
3. **claude design/** folder - Design assets

### Daily Workflow
```bash
# 1. Generate data.json from schema
cd /path/to/nishant-digest
DATE=$(date +%Y-%m-%d)
mkdir -p $DATE

# Hermes creates:
cat > $DATE/data.json << 'EOF'
{
  "date": "June 15, 2026",
  "dayOfWeek": "Monday",
  "articles": [...],
  "physicsContent": [...],
  "mathContent": [...],
  "deepContent": [...]
}
EOF

# 2. Generate HTML (IMPORTANT: This creates the full UI)
node scripts/generate-digest.js
# Output: YYYY-MM-DD/index.html with complete theme system + responsive design

# 3. Commit
git add $DATE/
git commit -m "Daily digest $DATE"
git push origin main
```

### ✨ What the Generator Creates

The `generate-digest.js` script creates a complete, production-ready HTML file with:

**🎨 5 Beautiful Themes:**
- Parchment (default sage green)
- Sepia (warm amber)
- Nordic (cool blue)
- Dusk (dark purple)
- Graphite (dark teal)

**📱 Responsive Design:**
- Mobile (<768px): 1 column, touch-optimized
- Tablet (768-1024px): 2 columns, hero full-width
- Desktop (>1024px): Full 12-column grid

**✨ Features:**
- Theme switching dots in nav
- localStorage persistence
- Smooth transitions
- Better scrollbars
- MathJax support

### Hermes Config Updates Needed
**Create new Hermes instruction file** that references:
- `HERMES_SCHEMA.md` for data structure
- 4 sections: Tech News, Physics, Math, Deep Dive
- Claude Design layout (don't modify)

**Remove/ignore:**
- `base/HERMES_INSTRUCTIONS.md` (old 6-section system)
- `base/hermes-prompt-template.md` (old system)
- Multi-theme concepts (new system is single parchment theme)

---

## Option 2: Use OLD Multi-Theme System

### Files Hermes Needs
1. **base/HERMES_INSTRUCTIONS.md** - Full instructions
2. **base/digest-schema.json** - Data schema
3. **base/generate-digest.js** - Generator
4. **base/feeds.opml** - RSS feeds

### Daily Workflow
```bash
# Follow base/HERMES_INSTRUCTIONS.md workflow
# Generates 6 sections with theme variants
```

### Note
The old system is **more complex**:
- 6 sections vs 4
- RSS feed integration
- Headline deduplication
- Multiple themes (modern-news, vintage-scholar, claude)
- Curriculum tracking

---

## Recommended: Choose NEW System

### Why?
1. **Simpler** - 4 sections, single theme
2. **Better design** - Professional Claude Design layout
3. **Cleaner code** - Single generator script
4. **Easier to maintain** - Less moving parts

### Migration Steps

#### 1. Update Hermes Instructions
Create `HERMES_DAILY_PROMPT.md`:

```markdown
# Daily Digest Generator

Generate daily digest with exact structure from HERMES_SCHEMA.md

## Data Structure (data.json)
{
  "date": "Month DD, YYYY",
  "dayOfWeek": "Monday",
  "articles": [
    {
      "category": "AI|HARDWARE|SECURITY|NEWS",
      "cols": 12,  // First article MUST be 12 (hero)
      "title": "Article title",
      "source": "Source name",
      "date": "Mon DD, YYYY",
      "summary": "Summary text",
      "url": "https://..."
    }
  ],
  "physicsContent": [
    {"type": "section_heading", "text": "EXPLANATION"},
    {"type": "heading", "text": "Topic Title"},
    {"type": "paragraph", "text": "Content with \\(inline\\) math"},
    {"type": "formula", "text": "\\[ display \\]"},
    {"type": "subheading", "text": "Subsection"}
  ],
  "mathContent": [...],  // Same structure + video field
  "deepContent": [...]   // Same structure
}

## Content Requirements

### Tech News (8 articles)
- First article: cols=12 (hero)
- Grid layout: use 8+4, 6+6, or 4+4+4 per row
- Categories: AI, HARDWARE, SECURITY, NEWS
- Length: 150-200 words per article

### Physics (1 topic)
- Day rotation: Mon=Quantum, Tue=Thermo, Wed=Classical, etc.
- Include LaTeX: \\(inline\\) and \\[display\\]
- Length: 1000-1200 words

### Math (1 topic + video)
- Must include YouTube video link
- Channels: 3Blue1Brown, Numberphile, etc.
- Length: 1200-1500 words
- Video format:
  {
    "type": "video",
    "video": {
      "title": "Video title",
      "channel": "3Blue1Brown",
      "duration": "20:45",
      "url": "https://youtube.com/..."
    }
  }

### Deep Dive (1 topic)
- Rotating: AI, Math, Physics, ML, Business
- In-depth analysis
- Length: 1500-2000 words

## Daily Execution
1. Create YYYY-MM-DD/data.json
2. Run: npm run generate
3. Commit: git add . && git commit -m "Daily digest YYYY-MM-DD"
4. Push: git push origin main

## Important Rules
- Hero article MUST be cols=12
- Grid cols must sum to 12 per row
- Use exact LaTeX syntax: \\( \\) and \\[ \\]
- Save as: YYYY-MM-DD/data.json
- Physics topics follow day rotation
- Math MUST include video link
```

#### 2. Configure Cron Job
```bash
crontab -e

# Add:
0 6 * * * cd /path/to/nishant-digest && /path/to/hermes-generate-digest.sh

# hermes-generate-digest.sh:
#!/bin/bash
DATE=$(date +%Y-%m-%d)
cd /path/to/nishant-digest
mkdir -p $DATE

# Hermes generates data.json here
hermes-agent --prompt HERMES_DAILY_PROMPT.md --output $DATE/data.json

# Generate HTML
npm run generate

# Commit
git add $DATE/
git commit -m "Daily digest $DATE"
git push origin main
```

#### 3. Test Before Deployment
```bash
# Test with sample data
DATE=$(date +%Y-%m-%d)
mkdir -p $DATE

# Create test data.json (use 2026-06-15 as reference)
# Then run generator
npm run generate

# Verify output
open $DATE/index.html

# Check design matches Claude Design reference
```

---

## Files to Ignore

### If Using NEW System
❌ Ignore:
- `base/HERMES_INSTRUCTIONS.md`
- `base/hermes-prompt-template.md`
- `base/digest-schema.json`
- `base/generate-digest.js`
- `base/feeds.opml`
- `base/headline-tracker.js`
- `HERMES_SETUP.md`

✅ Use:
- `HERMES_SCHEMA.md`
- `scripts/generate-digest.js`
- `claude design/`

### If Using OLD System
❌ Ignore:
- `HERMES_SCHEMA.md`
- `scripts/generate-digest.js`
- `IMPLEMENTATION.md`

✅ Use:
- `base/HERMES_INSTRUCTIONS.md`
- `base/digest-schema.json`
- `base/generate-digest.js`

---

## Key Differences Summary

| Feature | OLD System | NEW System |
|---------|-----------|------------|
| Sections | 6 (Industry, Startups, Research, Math, ML, Topic) | 4 (Tech News, Physics, Math, Deep Dive) |
| Themes | 3 themes (modern-news, vintage-scholar, claude) | 1 theme (parchment) |
| RSS Feeds | Automatic RSS integration | Manual content curation |
| Dedup | Headline tracker | None (manual) |
| Layout | Multi-theme complex | Single clean design |
| Generator | `base/generate-digest.js` | `scripts/generate-digest.js` |
| Complexity | High | Low |
| Design | Multiple styles | Claude Design exact |

---

## Recommendation

**Use NEW System** (`HERMES_SCHEMA.md` + `scripts/generate-digest.js`)

**Reasons:**
1. Cleaner, simpler workflow
2. Better visual design (Claude Design)
3. Easier to maintain
4. Matches your request for "exact design"
5. Less prone to errors

**Cleanup:**
```bash
# Move old files to archive
mkdir -p archive/old-system
mv base/HERMES_INSTRUCTIONS.md archive/old-system/
mv base/hermes-prompt-template.md archive/old-system/
mv HERMES_SETUP.md archive/old-system/
```

---

## Next Steps

1. **Decide** which system to use
2. **Create** Hermes daily prompt (see above)
3. **Test** generation locally
4. **Configure** cron job
5. **Monitor** first week of automated runs
6. **Cleanup** unused files

---

## Questions to Answer

Before setting up cron:
- [ ] Which system do you want? (NEW recommended)
- [ ] How does Hermes access this repo? (local path? API?)
- [ ] What time zone for 6 AM generation?
- [ ] Git credentials configured for auto-push?
- [ ] Error notification strategy?

---

## Support

If you choose **NEW system**, Hermes needs:
1. Access to `HERMES_SCHEMA.md` for data format
2. Knowledge of grid layout rules (cols must sum to 12)
3. LaTeX syntax for formulas
4. YouTube video integration for math

If you choose **OLD system**, Hermes needs:
1. RSS feed parsing capability
2. Headline deduplication logic
3. Multi-theme rendering
4. More complex workflow

**My recommendation: Go with NEW. Simpler is better for automation.**
