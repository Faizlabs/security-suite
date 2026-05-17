/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050508',
          surface: '#0c0c12',
          card: '#111118',
          border: '#1e1e2e',
          cyan: '#00f5d4',
          green: '#00ff88',
          red: '#ff3366',
          amber: '#ffb020',
          muted: '#6b7280',
        },

        themebg: 'var(--theme-bg)',
        themecard: 'var(--theme-card)',
        themetext: 'var(--theme-text)',
        thememuted: 'var(--theme-muted)',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },

      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 245, 212, 0.25)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.25)',
      },
    },
  },

  plugins: [],
};