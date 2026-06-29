module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        brand: {
          950: '#0f172a',
          900: '#111827',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f8fafc'
        },
        accent: '#d59f1f'
      },
      boxShadow: {
        glow: '0 20px 80px rgba(213, 159, 31, 0.18)'
      }
    }
  },
  plugins: []
};
