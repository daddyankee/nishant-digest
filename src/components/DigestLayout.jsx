import React, { useState, useEffect } from 'react';

export default function DigestLayout({ digest }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="../index.html" className="text-sm font-semibold tracking-wider uppercase">
              Nishant's Daily Digest
            </a>
            <div className="text-xs tracking-wide opacity-70 hidden md:block">
              {formatDate(digest.date)}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="px-3 py-1.5 text-xs font-semibold border border-white hover:bg-white hover:text-black transition-colors rounded"
                aria-label="Toggle theme"
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-2xl"
                aria-label="Toggle menu"
              >
                &#9776;
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Jump to
          </h3>
          <ul className="space-y-3">
            {digest.sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  onClick={() => setSidebarOpen(false)}
                >
                  {section.title.split('—')[0].trim()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-12 text-center border-b-2 border-black dark:border-white pb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Daily Research Digest
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>📅 {formatDate(digest.date)}</span>
              <span>📄 ~{digest.meta.wordCount.toLocaleString()} words</span>
              <span>⏱ ~{digest.meta.readingMinutes} min read</span>
            </div>
            <p className="text-lg italic text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {digest.meta.topicTeaser}
            </p>
          </header>

          {/* Sections */}
          {digest.sections.map((section, index) => (
            <Section key={section.id} section={section} index={index} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="md:ml-64 border-t-2 border-black dark:border-white mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Generated on {formatDate(digest.date)} by{' '}
            <a href="https://hermes-agent.nousresearch.com" target="_blank" rel="noopener" className="underline">
              Hermes Agent
            </a>
          </p>
          <p>
            <a href="https://github.com/daddyankee/nishant-digest" target="_blank" rel="noopener" className="underline">
              Source on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({ section, index }) {
  const getThemeClass = () => {
    if (section.theme === 'modern-news') return 'theme-modern-news';
    if (section.theme === 'vintage-scholar') return 'theme-vintage-scholar';
    if (section.theme === 'claude') return 'theme-claude';
    return '';
  };

  return (
    <section id={section.id} className={`mb-16 ${getThemeClass()}`}>
      <div className="border-b-2 border-current pb-4 mb-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl md:text-4xl font-bold">{section.title}</h2>
          <span className="text-xs uppercase tracking-wide opacity-60">
            {section.readingMinutes} min read
          </span>
        </div>
      </div>

      {section.id === 'tech-news' ? (
        <NewsGrid content={section.content} />
      ) : (
        <div className="space-y-8">
          {section.content.map((item, i) => (
            <ContentItem key={i} item={item} sectionTheme={section.theme} />
          ))}
        </div>
      )}
    </section>
  );
}

function NewsGrid({ content }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {content.map((item, i) => (
        <div
          key={i}
          className="bg-gray-50 dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
        >
          <div className="text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-2">
            {item.type}
          </div>
          <h3 className="text-xl font-bold mb-2 leading-tight">{item.title}</h3>
          {item.subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-3">{item.subtitle}</p>
          )}
          {item.body.map((para, j) => (
            <p key={j} className="text-sm mb-3 leading-relaxed">
              {para}
            </p>
          ))}
          {item.keyTakeaway && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-blue-600 dark:border-blue-400 p-3 my-4">
              <p className="text-sm font-medium">{item.keyTakeaway}</p>
            </div>
          )}
          {item.sources && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {item.sources.map((source, k) => (
                <a
                  key={k}
                  href={source.url}
                  target="_blank"
                  rel="noopener"
                  className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {source.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ContentItem({ item, sectionTheme }) {
  const isVintage = sectionTheme === 'vintage-scholar';

  return (
    <div className={`${isVintage ? 'font-serif' : ''}`}>
      <div className="mb-4">
        <div className="text-xs uppercase tracking-wider opacity-60 mb-2 font-semibold">
          {item.type}
        </div>
        <h3 className={`${isVintage ? 'text-2xl' : 'text-xl'} font-bold mb-2`}>
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm opacity-70 italic">{item.subtitle}</p>
        )}
      </div>

      <div className={`space-y-4 ${isVintage ? 'text-lg leading-relaxed text-justify' : 'text-base'}`}>
        {item.body.map((para, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
        ))}
      </div>

      {item.keyTakeaway && (
        <div className="my-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-current p-4 italic">
          <p>{item.keyTakeaway}</p>
        </div>
      )}

      {item.video && (
        <div className="my-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">🎥</span>
            <h4 className="font-semibold">{item.video.title}</h4>
          </div>
          <p className="text-sm opacity-70 mb-3">
            {item.video.channel} {item.video.duration && `· ${item.video.duration}`}
          </p>
          <a
            href={item.video.url}
            target="_blank"
            rel="noopener"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Watch Video →
          </a>
        </div>
      )}

      {item.sources && (
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {item.sources.map((source, i) => (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener"
              className="inline-block mr-4 text-sm font-semibold hover:underline opacity-70 hover:opacity-100"
            >
              [{source.label}]
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
