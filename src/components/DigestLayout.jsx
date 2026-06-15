import React, { useState, useEffect } from 'react';

export default function DigestLayout({ digest }) {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const currentSection = digest.sections[currentPage];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-sm font-semibold tracking-wider uppercase">
              Nishant's Daily Digest
            </h1>
            <div className="text-xs tracking-wide opacity-70">
              {formatDate(digest.date)}
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1.5 text-xs font-semibold border border-white hover:bg-white hover:text-black transition-colors rounded"
              aria-label="Toggle theme"
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>

      {/* Page Navigation Tabs */}
      <div className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto">
            {digest.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentPage(index)}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  currentPage === index
                    ? 'border-black dark:border-white text-black dark:text-white'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {section.title.split('—')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {currentSection.id === 'tech-news' ? (
          <TechNewsPage section={currentSection} />
        ) : (
          <StandardPage section={currentSection} darkMode={darkMode} />
        )}
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="px-4 py-2 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage + 1} of {digest.sections.length}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(digest.sections.length - 1, currentPage + 1))}
              disabled={currentPage === digest.sections.length - 1}
              className="px-4 py-2 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tech News Magazine Layout
function TechNewsPage({ section }) {
  const items = section.content;

  return (
    <div className="magazine-theme min-h-full">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-12 pb-6 border-b-4 border-[#41431B]">
          <h2 className="text-5xl font-bold text-[#41431B] mb-2 font-serif">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-lg text-[#41431B]/70 italic">{section.subtitle}</p>
          )}
        </header>

        {/* Magazine Grid - Mix of large and small cards */}
        <div className="grid grid-cols-12 gap-6">
          {items.map((item, index) => {
            // Create varied layout: some full-width, some half, some third
            let colSpan = 'col-span-12';
            if (index === 0) colSpan = 'col-span-12'; // Hero article
            else if (index % 5 === 1) colSpan = 'col-span-12 md:col-span-8'; // Large
            else if (index % 5 === 2) colSpan = 'col-span-12 md:col-span-4'; // Small
            else if (index % 3 === 0) colSpan = 'col-span-12 md:col-span-6'; // Half
            else colSpan = 'col-span-12 md:col-span-4'; // Third

            const isHero = index === 0;

            return (
              <article
                key={index}
                className={`${colSpan} bg-[#F8F3E1] border-2 border-[#AEB784] overflow-hidden hover:shadow-xl transition-shadow group`}
              >
                <div className="p-6">
                  {/* Category Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#41431B] text-[#F8F3E1]">
                      {item.category || 'News'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif font-bold text-[#41431B] mb-3 group-hover:text-[#AEB784] transition-colors ${
                    isHero ? 'text-4xl leading-tight' : 'text-2xl'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-sm text-[#41431B]/60 mb-4 font-sans">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  {/* Summary */}
                  <p className={`text-[#41431B]/80 leading-relaxed mb-4 ${
                    isHero ? 'text-lg' : 'text-base'
                  }`}>
                    {item.summary}
                  </p>

                  {/* Read More Link */}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-semibold text-[#41431B] hover:text-[#AEB784] transition-colors border-b-2 border-[#41431B] hover:border-[#AEB784]"
                    >
                      Read Full Article →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Physics/Math Standard Layout
function StandardPage({ section, darkMode }) {
  const getThemeColors = () => {
    switch (section.id) {
      case 'physics':
        return {
          bg: darkMode ? '#2b2722' : '#f9f7f1',
          text: darkMode ? '#f9f7f1' : '#2b2722',
          accent: darkMode ? '#d2691e' : '#8b4513',
          border: darkMode ? '#8b4513' : '#8b4513'
        };
      case 'math':
      case 'random-topic':
        return {
          bg: darkMode ? '#1a1816' : '#f7f5f2',
          text: darkMode ? '#f7f5f2' : '#1a1816',
          accent: darkMode ? '#ff9933' : '#cc6600',
          border: darkMode ? '#cc6600' : '#cc6600'
        };
      default:
        return {
          bg: darkMode ? '#1a1a1a' : '#ffffff',
          text: darkMode ? '#ffffff' : '#000000',
          accent: darkMode ? '#4d9fff' : '#0066ff',
          border: darkMode ? '#4d9fff' : '#0066ff'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div
      className="min-h-full font-serif"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="mb-16 pb-8" style={{ borderBottom: `3px solid ${colors.border}` }}>
          <h2
            className="text-5xl font-bold mb-4"
            style={{ color: colors.accent }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-xl italic opacity-80">{section.subtitle}</p>
          )}
        </header>

        {/* Content */}
        <div className="space-y-12">
          {section.content.map((item, index) => (
            <article key={index} className="space-y-6">
              {item.heading && (
                <h3 className="text-3xl font-bold" style={{ color: colors.accent }}>
                  {item.heading}
                </h3>
              )}

              {item.subheading && (
                <h4 className="text-2xl font-semibold opacity-90">
                  {item.subheading}
                </h4>
              )}

              {item.text && (
                <div
                  className="text-lg leading-relaxed text-justify space-y-4"
                  dangerouslySetInnerHTML={{ __html: item.text.replace(/\n\n/g, '</p><p class="mt-4">').replace(/^/, '<p>').replace(/$/, '</p>') }}
                />
              )}

              {item.video && (
                <div className="my-8 p-6 rounded" style={{ backgroundColor: `${colors.accent}10`, border: `2px solid ${colors.accent}` }}>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🎥</span>
                    <div className="flex-1">
                      <h5 className="font-bold text-lg mb-1">{item.video.title}</h5>
                      <p className="text-sm opacity-70">
                        {item.video.channel} • {item.video.duration}
                      </p>
                    </div>
                    <a
                      href={item.video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 font-semibold rounded transition-colors"
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.bg
                      }}
                    >
                      Watch
                    </a>
                  </div>
                </div>
              )}

              {item.link && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 font-semibold hover:underline"
                  style={{ color: colors.accent }}
                >
                  {item.link.text} →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
