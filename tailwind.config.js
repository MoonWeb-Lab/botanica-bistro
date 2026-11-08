/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bistro: {
          bg: '#FAF7F2',
          cream: '#F4EFE6',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          elevated: '#F8F5EE',
          dark: '#1C1814',
          text: '#2C2520',
          muted: '#766D64',
          subtle: '#A89F95',
          border: 'rgba(44, 37, 32, 0.1)',
          terracotta: '#B65338',
          'terracotta-light': '#D47359',
          'terracotta-dark': '#8E3821',
          olive: '#475B42',
          'olive-light': '#6E8468',
          sage: '#D7E0D3',
          sand: '#EAE4D7',
          paper: '#FDFBF7',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-lift': '0 12px 32px -8px rgba(44, 37, 32, 0.08)',
        'paper-card': '0 4px 20px -2px rgba(44, 37, 32, 0.05)',
        'terracotta-glow': '0 8px 24px -4px rgba(182, 83, 56, 0.25)',
      },
    },
  },
  plugins: [],
};
