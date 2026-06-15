/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern News Theme
        'news-bg': '#ffffff',
        'news-bg-dark': '#0a0a0a',
        'news-text': '#000000',
        'news-text-dark': '#ffffff',
        'news-accent': '#0066ff',
        'news-accent-dark': '#4d94ff',

        // Vintage Scholar Theme
        'scholar-bg': '#f9f7f1',
        'scholar-bg-dark': '#1c1815',
        'scholar-paper': '#fefdfb',
        'scholar-paper-dark': '#242019',
        'scholar-text': '#2b2722',
        'scholar-text-dark': '#e8e0d5',
        'scholar-accent': '#704214',
        'scholar-accent-dark': '#d4a574',

        // Claude Theme
        'claude-bg': '#f7f5f2',
        'claude-bg-dark': '#1a1611',
        'claude-text': '#2c2416',
        'claude-text-dark': '#ebe6dd',
        'claude-accent': '#c4622d',
        'claude-accent-dark': '#e88b5c',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'serif': ['Georgia', 'Palatino', 'Times New Roman', 'serif'],
        'mono': ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
