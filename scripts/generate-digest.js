const fs = require('fs');
const path = require('path');

const date = process.argv[2] || new Date().toISOString().split('T')[0];
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.css">
<script>
MathJax = {
  tex: { inlineMath: [['\\\\(', '\\\\)']], displayMath: [['\\\\[', '\\\\]']] },
  svg: { fontCache: 'global' },
  options: { enableMenu: false }
};
</script>
<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<script src="../claude design/support.js"></script>
<link rel="stylesheet" href="../claude design/_ds/nishant-sharma-portfolio-design-system-acfe106c-c7e5-46cd-96cd-4b3b2923a881/tokens/fonts.css">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; font-family: 'IBM Plex Sans', system-ui, sans-serif; }
html { scroll-behavior: smooth; }

/* Parchment Theme (default) */
:root, [data-theme="parchment"] {
  --nav-bg: #0A0A0A; --nav-text: #FFFFFF;
  --tabs-bg: #F2EEE2; --tabs-border: #DDDACA; --tab-active: #0A0A0A; --tab-muted: #7A7260;
  --footer-bg: #F2EEE2; --footer-border: #DDDACA; --footer-text: #5A5040;
  --tn-bg: #F8F5E8; --tn-card: #FEFCF4; --tn-ink: #3A3E18; --tn-accent: #3A3E18;
  --tn-sage: #7A9E5A; --tn-border: #B0C280; --tn-meta: rgba(58,62,24,0.48);
  --ph-bg: #FAF8F0; --ph-text: #2A2218; --ph-accent: #7A5218; --ph-fbg: rgba(122,82,24,0.05);
  --mt-bg: #F8F6EE; --mt-text: #1E1C18; --mt-accent: #9B6C00; --mt-fbg: rgba(155,108,0,0.05); --mt-vbg: rgba(155,108,0,0.07);
}

/* Sepia Theme */
[data-theme="sepia"] {
  --nav-bg: #2C1A0E; --nav-text: #F5E8D4;
  --tabs-bg: #F6EDD8; --tabs-border: #DCC898; --tab-active: #2C1A0E; --tab-muted: #906040;
  --footer-bg: #F6EDD8; --footer-border: #DCC898; --footer-text: #704020;
  --tn-bg: #FBF5E8; --tn-card: #FDF8EE; --tn-ink: #3A1E08; --tn-accent: #3A1E08;
  --tn-sage: #A06828; --tn-border: #D0A870; --tn-meta: rgba(58,30,8,0.45);
  --ph-bg: #FBF5E8; --ph-text: #3A1E08; --ph-accent: #8B2500; --ph-fbg: rgba(139,37,0,0.05);
  --mt-bg: #FAF2E0; --mt-text: #2E1408; --mt-accent: #A84018; --mt-fbg: rgba(168,64,24,0.05); --mt-vbg: rgba(168,64,24,0.07);
}

/* Nordic Theme */
[data-theme="nordic"] {
  --nav-bg: #1E2D3A; --nav-text: #E8EFF8;
  --tabs-bg: #ECF1F8; --tabs-border: #C4D4E8; --tab-active: #1E2D3A; --tab-muted: #5A7890;
  --footer-bg: #ECF1F8; --footer-border: #C4D4E8; --footer-text: #3A5870;
  --tn-bg: #F2F7FC; --tn-card: #FFFFFF; --tn-ink: #1E2D3A; --tn-accent: #1E2D3A;
  --tn-sage: #2060B8; --tn-border: #88B4D8; --tn-meta: rgba(30,45,58,0.45);
  --ph-bg: #ECF1F8; --ph-text: #1E2D3A; --ph-accent: #0A4CA0; --ph-fbg: rgba(10,76,160,0.06);
  --mt-bg: #EEF3FA; --mt-text: #101C2E; --mt-accent: #007890; --mt-fbg: rgba(0,120,144,0.06); --mt-vbg: rgba(0,120,144,0.08);
}

/* Dusk Theme (dark) */
[data-theme="dusk"] {
  --nav-bg: #131022; --nav-text: #E2DBF8;
  --tabs-bg: #1A1730; --tabs-border: #302C54; --tab-active: #9278E8; --tab-muted: #605880;
  --footer-bg: #1A1730; --footer-border: #302C54; --footer-text: #807AAA;
  --tn-bg: #171428; --tn-card: #1E1A38; --tn-ink: #E2DBF8; --tn-accent: #C0B0FF;
  --tn-sage: #A090E0; --tn-border: #342E60; --tn-meta: rgba(226,219,248,0.42);
  --ph-bg: #141228; --ph-text: #E2DBF8; --ph-accent: #9278E8; --ph-fbg: rgba(146,120,232,0.10);
  --mt-bg: #12101E; --mt-text: #D8D0F4; --mt-accent: #B090F0; --mt-fbg: rgba(176,144,240,0.10); --mt-vbg: rgba(176,144,240,0.12);
}

/* Graphite Theme (dark) */
[data-theme="graphite"] {
  --nav-bg: #080B10; --nav-text: #DDE6F4;
  --tabs-bg: #0E1320; --tabs-border: #1E2A3A; --tab-active: #2AB8A8; --tab-muted: #4A6070;
  --footer-bg: #0E1320; --footer-border: #1E2A3A; --footer-text: #587080;
  --tn-bg: #0C1220; --tn-card: #141E2C; --tn-ink: #DDE6F4; --tn-accent: #2AB8A8;
  --tn-sage: #3DD4C4; --tn-border: #1C3048; --tn-meta: rgba(221,230,244,0.38);
  --ph-bg: #080E18; --ph-text: #DDE6F4; --ph-accent: #2AB8A8; --ph-fbg: rgba(42,184,168,0.08);
  --mt-bg: #080C16; --mt-text: #D4E0F0; --mt-accent: #26A898; --mt-fbg: rgba(38,168,152,0.08); --mt-vbg: rgba(38,168,152,0.10);
}

/* Smooth transitions for theme changes */
#root, #root * {
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
}

.mjx-chtml { color: inherit; }

/* Theme switching dots */
.theme-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  border: none;
  box-shadow: none;
  transition: all 200ms ease;
  display: block;
}
.theme-dot:hover {
  transform: scale(1.3);
}
.theme-dot.active {
  width: 15px;
  height: 15px;
  box-shadow: 0 0 0 2px rgba(255,255,255,0.85);
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(128,128,128,0.4); }
::-webkit-scrollbar-track { background: transparent; }

/* Tablet: 768px-1024px (iPad) */
@media (min-width: 768px) and (max-width: 1024px) {
  #tech-grid > * { grid-column: span 6 !important; }
  #tech-grid > *:first-child { grid-column: span 12 !important; }
  #tech-grid { gap: 20px !important; }
}

/* Mobile: <768px */
@media (max-width: 767px) {
  #tech-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
  #tech-grid > * { grid-column: auto !important; }

  nav { height: 56px !important; padding: 0 16px !important; }
  .nav-title { font-size: 10px !important; }
  .nav-date { font-size: 10px !important; }

  .tabs-container { padding: 0 4px !important; }
  .tab-button { padding: 14px 16px !important; font-size: 13px !important; }

  footer { height: 56px !important; padding: 0 16px !important; }
  .footer-button { font-size: 12px !important; padding: 6px 12px !important; }
  .footer-page-num { font-size: 10px !important; }

  .tech-news-container { padding: 24px 16px 40px !important; }
  .tech-news-container h1 { font-size: 28px !important; padding-bottom: 16px !important; margin-bottom: 24px !important; }

  .article-title-large { font-size: 28px !important; margin-bottom: 16px !important; }
  .article-title-small { font-size: 20px !important; margin-bottom: 12px !important; }
  .article-summary { font-size: 15px !important; }

  .content-container { padding: 32px 16px 48px !important; }
  .content-heading { font-size: 26px !important; }
  .content-subheading { font-size: 20px !important; }
  .content-paragraph { font-size: 17px !important; }

  .video-card { flex-direction: column !important; }
  .video-card a { width: 100% !important; text-align: center !important; }

  .formula-block { overflow-x: auto !important; font-size: 14px !important; }
}
</style>
</head>
<body>
<div id="root" data-theme="parchment" style="height: 100vh; display: flex; flex-direction: column;">
  <nav style="background: var(--nav-bg); color: var(--nav-text); height: 64px; display: flex; align-items: center; padding: 0 24px; gap: 16px;">
    <span class="nav-title" style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; flex: 1;">Nishant's Daily Digest</span>
    <span class="nav-date" style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; opacity: 0.5;">${data.dayOfWeek}, ${data.date}</span>
    <div style="display: flex; gap: 8px; align-items: center;" title="Theme">
      <button class="theme-dot" data-theme="parchment" style="background: #8BAF6E;" title="Parchment" onclick="setTheme('parchment')"></button>
      <button class="theme-dot" data-theme="sepia" style="background: #C4944A;" title="Sepia" onclick="setTheme('sepia')"></button>
      <button class="theme-dot" data-theme="nordic" style="background: #4A90C4;" title="Nordic" onclick="setTheme('nordic')"></button>
      <button class="theme-dot" data-theme="dusk" style="background: #9278E8;" title="Dusk" onclick="setTheme('dusk')"></button>
      <button class="theme-dot" data-theme="graphite" style="background: #2AB8A8;" title="Graphite" onclick="setTheme('graphite')"></button>
    </div>
  </nav>
  <div class="tabs-container" style="background: var(--tabs-bg); border-bottom: 1px solid var(--tabs-border); display: flex; padding: 0 8px;">
    ${['Tech News', 'Physics', 'Mathematics', 'Deep Dive'].map((t, i) =>
      `<button onclick="showTab(${i})" id="tab${i}" class="tab-button" style="background: transparent; border: none; border-bottom: 2px solid transparent; cursor: pointer; padding: 16px 20px; font-size: 14px; font-family: 'IBM Plex Sans'; color: var(--tab-muted);">${t}</button>`
    ).join('')}
  </div>
  <main id="content" style="flex: 1; overflow-y: auto;"></main>
  <footer style="background: var(--footer-bg); height: 64px; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; border-top: 1px solid var(--footer-border);">
    <button onclick="prevTab()" class="footer-button" style="background: transparent; border: none; padding: 8px 16px; font-size: 13px; font-family: 'IBM Plex Sans'; color: var(--footer-text); cursor: pointer;">← Previous</button>
    <span id="pageNum" class="footer-page-num" style="font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--footer-text); text-transform: uppercase;">Page 1 of 4</span>
    <button onclick="nextTab()" class="footer-button" style="background: transparent; border: none; padding: 8px 16px; font-size: 13px; font-family: 'IBM Plex Sans'; color: var(--footer-text); cursor: pointer;">Next →</button>
  </footer>
</div>
<script>
const data = ${JSON.stringify(data)};
let tab = 0;

// Theme switching functionality
function setTheme(themeName) {
  const root = document.getElementById('root');
  root.setAttribute('data-theme', themeName);

  // Update active state on theme dots
  document.querySelectorAll('.theme-dot').forEach(dot => {
    if (dot.getAttribute('data-theme') === themeName) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Persist theme preference to localStorage
  try {
    localStorage.setItem('digest-theme', themeName);
  } catch(e) {
    console.error('Failed to save theme preference:', e);
  }
}

// Load saved theme on page load
function loadSavedTheme() {
  try {
    const savedTheme = localStorage.getItem('digest-theme');
    if (savedTheme && ['parchment', 'sepia', 'nordic', 'dusk', 'graphite'].includes(savedTheme)) {
      setTheme(savedTheme);
    } else {
      setTheme('parchment');
    }
  } catch(e) {
    console.error('Failed to load theme preference:', e);
    setTheme('parchment');
  }
}

function renderTechNews() {
  return \`<div class="tech-news-container" style="background: var(--tn-bg); padding: 48px 24px 80px; min-height: 100%;">
    <h1 style="font-family: Georgia, serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: var(--tn-accent); border-bottom: 4px solid var(--tn-accent); padding-bottom: 24px; margin-bottom: 48px;">Tech News — \${data.date}</h1>
    <div id="tech-grid" style="display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px;">
      \${data.articles.map(a => \`<div style="grid-column: span \${a.cols}; background: var(--tn-card); border: 2px solid var(--tn-border); padding: 24px;">
        <span style="display: inline-block; background: var(--tn-accent); color: var(--tn-bg); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; padding: 3px 10px; margin-bottom: 16px; font-family: 'IBM Plex Mono'; text-transform: uppercase;">\${a.category}</span>
        <h2 class="\${a.cols === 12 ? 'article-title-large' : 'article-title-small'}" style="font-family: Georgia, serif; font-size: \${a.cols === 12 ? '36px' : '20px'}; font-weight: 700; color: var(--tn-ink); line-height: 1.12; margin-bottom: \${a.cols === 12 ? '20px' : '12px'};">\${a.title}</h2>
        <p style="font-family: 'IBM Plex Mono'; font-size: 11px; color: var(--tn-meta); margin-bottom: 14px;">\${a.source} · \${a.date}</p>
        <p class="article-summary" style="font-family: 'IBM Plex Sans'; font-size: \${a.cols === 12 ? '16px' : '14px'}; line-height: 1.65; color: var(--tn-ink); opacity: 0.78;">\${a.summary}</p>
        <a href="\${a.url}" target="_blank" style="display: inline-block; font-size: 12px; font-weight: 600; color: var(--tn-accent); border-bottom: 1.5px solid var(--tn-accent); margin-top: 20px; text-decoration: none;">Read Full Article →</a>
      </div>\`).join('')}
    </div>
  </div>\`;
}

function renderContent(blocks, bgVar, textVar, accentVar, fbgVar) {
  return blocks.map(b => {
    if (b.type === 'section_heading') return \`<p style="font-family: 'IBM Plex Mono'; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(\${accentVar}); opacity: 0.65; margin-bottom: 16px;">\${b.text}</p>\`;
    if (b.type === 'heading') return \`<h2 class="content-heading" style="font-family: Georgia, serif; font-size: 30px; font-weight: 700; color: var(\${accentVar}); margin-bottom: 24px;">\${b.text}</h2>\`;
    if (b.type === 'paragraph') return \`<p class="content-paragraph" style="font-family: Georgia, serif; font-size: 18px; line-height: 1.8; color: var(\${textVar}); text-align: justify; margin-bottom: 20px;">\${b.text}</p>\`;
    if (b.type === 'formula') return \`<div class="formula-block" style="padding: 28px 20px; margin: 32px 0; text-align: center; border-left: 3px solid var(\${accentVar}); background: var(\${fbgVar}); color: var(\${textVar});">\${b.text}</div>\`;
    if (b.type === 'subheading') return \`<h3 class="content-subheading" style="font-family: Georgia, serif; font-size: 22px; font-weight: 600; color: var(\${textVar}); margin-top: 44px; margin-bottom: 20px;">\${b.text}</h3>\`;
    if (b.type === 'video') return \`<div class="video-card" style="background: var(--mt-vbg); border: 2px solid var(\${accentVar}); border-radius: 6px; padding: 24px; margin: 32px 0; display: flex; align-items: center; gap: 20px;">
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
  else if (n === 1) content.innerHTML = \`<div class="content-container" style="background: var(--ph-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.physicsContent, '--ph-bg', '--ph-text', '--ph-accent', '--ph-fbg')}</div></div>\`;
  else if (n === 2) content.innerHTML = \`<div class="content-container" style="background: var(--mt-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.mathContent, '--mt-bg', '--mt-text', '--mt-accent', '--mt-fbg')}</div></div>\`;
  else content.innerHTML = \`<div class="content-container" style="background: var(--mt-bg); padding: 64px 32px 96px; min-height: 100%;"><div style="max-width: 896px; margin: 0 auto;">\${renderContent(data.deepContent, '--mt-bg', '--mt-text', '--mt-accent', '--mt-fbg')}</div></div>\`;

  if (window.MathJax) {
    MathJax.typesetPromise([document.getElementById('content')]).catch(e => {});
  }
}

function nextTab() { if (tab < 3) showTab(tab + 1); }
function prevTab() { if (tab > 0) showTab(tab - 1); }

// Initialize on page load
loadSavedTheme();
showTab(0);
</script>
</body>
</html>`;

const outPath = path.join(process.cwd(), date, 'index.html');
fs.writeFileSync(outPath, html);
console.log(`Generated: ${outPath}`);
