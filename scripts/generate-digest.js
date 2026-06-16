import fs from 'fs';
import path from 'path';

const date = new Date().toISOString().split('T')[0];
const dataPath = path.join(process.cwd(), date, 'data.json');

if (!fs.existsSync(dataPath)) {
  console.error(`Missing: ${dataPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" crossorigin="anonymous"></script>
<script src="../claude design/support.js"></script>
<link rel="stylesheet" href="../claude design/_ds/nishant-sharma-portfolio-design-system-acfe106c-c7e5-46cd-96cd-4b3b2923a881/tokens/fonts.css">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; font-family: 'IBM Plex Sans', system-ui, sans-serif; }
:root {
  --nav-bg: #0A0A0A; --nav-text: #FFFFFF;
  --tabs-bg: #F2EEE2; --tabs-border: #DDDACA; --tab-active: #0A0A0A; --tab-muted: #7A7260;
  --footer-bg: #F2EEE2; --footer-border: #DDDACA; --footer-text: #5A5040;
  --tn-bg: #F8F5E8; --tn-card: #FEFCF4; --tn-ink: #3A3E18; --tn-accent: #3A3E18;
  --tn-sage: #7A9E5A; --tn-border: #B0C280; --tn-meta: rgba(58,62,24,0.48);
  --ph-bg: #FAF8F0; --ph-text: #2A2218; --ph-accent: #7A5218; --ph-fbg: rgba(122,82,24,0.05);
  --mt-bg: #F8F6EE; --mt-text: #1E1C18; --mt-accent: #9B6C00; --mt-fbg: rgba(155,108,0,0.05); --mt-vbg: rgba(155,108,0,0.07);
}
.katex { color: inherit; }
</style>
</head>
<body>
<div style="height: 100vh; display: flex; flex-direction: column;">
  <nav style="background: var(--nav-bg); color: var(--nav-text); height: 64px; display: flex; align-items: center; padding: 0 24px; gap: 16px;">
    <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; flex: 1;">Nishant's Daily Digest</span>
    <span style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; opacity: 0.5;">${data.dayOfWeek}, ${data.date}</span>
  </nav>
  <div style="background: var(--tabs-bg); border-bottom: 1px solid var(--tabs-border); display: flex; padding: 0 8px;">
    ${['Tech News', 'Physics', 'Mathematics', 'Deep Dive'].map((t, i) =>
      `<button onclick="showTab(${i})" id="tab${i}" style="background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; padding: 16px 20px; font-size: 14px; font-family: 'IBM Plex Sans'; color: var(--tab-muted);">${t}</button>`
    ).join('')}
  </div>
  <main id="content" style="flex: 1; overflow-y: auto;"></main>
  <footer style="background: var(--footer-bg); height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-top: 1px solid var(--footer-border);">
    <button onclick="prevTab()" style="background: transparent; border: none; padding: 8px 16px; font-size: 13px; font-family: 'IBM Plex Sans'; color: var(--footer-text); cursor: pointer;">← Previous</button>
    <span id="pageNum" style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--footer-text); text-transform: uppercase;">Page 1 of 4</span>
    <button onclick="nextTab()" style="background: transparent; border: none; padding: 8px 16px; font-size: 13px; font-family: 'IBM Plex Sans'; color: var(--footer-text); cursor: pointer;">Next →</button>
  </footer>
</div>
<script>
const data = ${JSON.stringify(data)};
let tab = 0;

function renderTechNews() {
  return \`<div style="background: var(--tn-bg); padding: 48px 24px 80px; min-height: 100%;">
    <h1 style="font-family: Georgia, serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: var(--tn-accent); border-bottom: 4px solid var(--tn-accent); padding-bottom: 24px; margin-bottom: 48px;">Tech News — \${data.date}</h1>
    <div style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
      \${data.articles.map(a => \`<div style="grid-column: span \${a.cols}; background: var(--tn-card); border: 2px solid var(--tn-border); padding: 24px;">
        <span style="display: inline-block; background: var(--tn-accent); color: var(--tn-bg); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; padding: 3px 10px; margin-bottom: 16px; font-family: 'IBM Plex Mono'; text-transform: uppercase;">\${a.category}</span>
        <h2 style="font-family: Georgia, serif; font-size: \${a.cols === 12 ? '36px' : '20px'}; font-weight: 700; color: var(--tn-ink); line-height: 1.12; margin-bottom: \${a.cols === 12 ? '20px' : '12px'};">\${a.title}</h2>
        <p style="font-family: 'IBM Plex Mono'; font-size: 11px; color: var(--tn-meta); margin-bottom: 14px;">\${a.source} · \${a.date}</p>
        <p style="font-family: 'IBM Plex Sans'; font-size: \${a.cols === 12 ? '16px' : '14px'}; line-height: 1.65; color: var(--tn-ink); opacity: 0.78;">\${a.summary}</p>
        <a href="\${a.url}" target="_blank" style="display: inline-block; font-size: 12px; font-weight: 600; color: var(--tn-accent); border-bottom: 1.5px solid var(--tn-accent); margin-top: 20px; text-decoration: none;">Read Full Article →</a>
      </div>\`).join('')}
    </div>
  </div>\`;
}

function renderContent(blocks, bgVar, textVar, accentVar, fbgVar) {
  return blocks.map(b => {
    if (b.type === 'section_heading') return \`<p style="font-family: 'IBM Plex Mono'; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(\${accentVar}); opacity: 0.65; margin-bottom: 16px;">\${b.text}</p>\`;
    if (b.type === 'heading') return \`<h2 style="font-family: Georgia, serif; font-size: 30px; font-weight: 700; color: var(\${accentVar}); margin-bottom: 24px;">\${b.text}</h2>\`;
    if (b.type === 'paragraph') return \`<p style="font-family: Georgia, serif; font-size: 18px; line-height: 1.8; color: var(\${textVar}); text-align: justify; margin-bottom: 20px;">\${b.text}</p>\`;
    if (b.type === 'formula') return \`<div style="padding: 28px 20px; margin: 32px 0; text-align: center; border-left: 3px solid var(\${accentVar}); background: var(\${fbgVar}); color: var(\${textVar});">\${b.text}</div>\`;
    if (b.type === 'subheading') return \`<h3 style="font-family: Georgia, serif; font-size: 22px; font-weight: 600; color: var(\${textVar}); margin-top: 44px; margin-bottom: 20px;">\${b.text}</h3>\`;
    if (b.type === 'video') return \`<div style="background: var(--mt-vbg); border: 2px solid var(\${accentVar}); border-radius: 6px; padding: 24px; margin: 32px 0; display: flex; align-items: center; gap: 20px;">
      <span style="font-size: 30px;">🎥</span>
      <div style="flex: 1;">
        <p style="font-family: 'IBM Plex Sans'; font-weight: 700; font-size: 16px; margin-bottom: 6px;">\${b.video.title}</p>
        <p style="font-family: 'IBM Plex Mono'; font-size: 12px; opacity: 0.6;">\${b.video.channel} · \${b.video.duration}</p>
      </div>
      <a href="\${b.video.url}" target="_blank" style="background: var(\${accentVar}); color: var(\${bgVar}); padding: 10px 22px; font-size: 13px; font-weight: 600; border-radius: 4px; text-decoration: none;">Watch</a>
    </div>\`;
    return '';
  }).join('');
}

function showTab(n) {
  tab = n;
  document.querySelectorAll('[id^=tab]').forEach((el, i) => {
    el.style.borderBottomColor = i === n ? 'var(--tab-active)' : 'transparent';
    el.style.color = i === n ? 'var(--tab-active)' : 'var(--tab-muted)';
    el.style.fontWeight = i === n ? '600' : '400';
  });
  document.getElementById('pageNum').textContent = \`Page \${n + 1} of 4\`;

  const content = document.getElementById('content');
  if (n === 0) content.innerHTML = renderTechNews();
  else if (n === 1) content.innerHTML = \`<div style="background: var(--ph-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.physicsContent, '--ph-bg', '--ph-text', '--ph-accent', '--ph-fbg')}</div></div>\`;
  else if (n === 2) content.innerHTML = \`<div style="background: var(--mt-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.mathContent, '--mt-bg', '--mt-text', '--mt-accent', '--mt-fbg')}</div></div>\`;
  else content.innerHTML = \`<div style="background: var(--mt-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.deepContent, '--mt-bg', '--mt-text', '--mt-accent', '--mt-fbg')}</div></div>\`;

  if (window.katex) {
    document.querySelectorAll('.katex').forEach(el => {
      try {
        const math = el.textContent.replace(/^\\\\\[/, '').replace(/\\\\\]$/, '').trim();
        el.innerHTML = window.katex.renderToString(math, { displayMode: true });
      } catch(e) {}
    });
  }
}

function nextTab() { if (tab < 3) showTab(tab + 1); }
function prevTab() { if (tab > 0) showTab(tab - 1); }

showTab(0);
</script>
</body>
</html>`;

const outPath = path.join(process.cwd(), date, 'index.html');
fs.writeFileSync(outPath, html);
console.log(`Generated: ${outPath}`);
