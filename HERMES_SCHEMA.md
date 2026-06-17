# Hermes Agent Data Schema

**IMPORTANT**: After generating data.json, run the generator script to create the HTML:
```bash
node scripts/generate-digest.js
# Or for specific date:
node scripts/generate-digest.js YYYY-MM-DD
```

Generate daily digest JSON matching this exact structure:

```json
{
  "date": "June 15, 2026",
  "dayOfWeek": "Monday",
  "articles": [
    {
      "category": "AI|HARDWARE|SECURITY|NEWS",
      "cols": 12,
      "title": "Article Title",
      "source": "Source Name",
      "date": "Jun 15, 2026",
      "summary": "Summary text",
      "url": "https://..."
    }
  ],
  "physicsContent": [
    {"type": "section_heading", "text": "EXPLANATION"},
    {"type": "heading", "text": "Main Heading"},
    {"type": "paragraph", "text": "Text with inline \\(math\\)"},
    {"type": "formula", "text": "\\[ formula \\]"},
    {"type": "subheading", "text": "Subheading"}
  ],
  "mathContent": [
    {"type": "section_heading", "text": "CONCEPT"},
    {"type": "heading", "text": "Topic Title"},
    {"type": "paragraph", "text": "Explanation"},
    {"type": "formula", "text": "\\[ formula \\]"},
    {"type": "video", "video": {
      "title": "Video Title",
      "channel": "Channel Name",
      "duration": "20:45",
      "url": "https://youtube.com/..."
    }}
  ],
  "deepContent": [
    {"type": "section_heading", "text": "ANALYSIS"},
    {"type": "heading", "text": "Topic"},
    {"type": "paragraph", "text": "Analysis text"},
    {"type": "subheading", "text": "Section"}
  ]
}
```

## Rules
- First article MUST have `cols: 12` (hero)
- Grid cols must total 12 per row: use 8+4, 6+6, 4+4+4
- Categories: AI, HARDWARE, SECURITY, NEWS only
- Math: inline `\\(x\\)`, display `\\[ x \\]`
- Save to: `YYYY-MM-DD/data.json`
