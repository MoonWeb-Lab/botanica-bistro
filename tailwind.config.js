/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bistro: {
          bg: '#0E1411',
          surface: '#141C18',
          card: '#1A2420',
          elevated: '#23302A',
          border: 'rgba(216, 168, 104, 0.16)',
          moss: '#3B4E42',
          olive: '#6F8066',
          sage: '#9EB097',
          honey: '#D8A868',
          'honey-light': '#ECD0A0',
          'honey-dark': '#B58645',
          terracotta: '#C86E4B',
          cream: '#F7F5EE',
          linen: '#EBE7DE',
          muted: '#8E9C94',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'honey-glow': '0 0 25px -5px rgba(216, 168, 104, 0.22)',
        'bistro-card': '0 12px 36px -10px rgba(0, 0, 0, 0.65)',
      },
    },
  },
  plugins: [],
};
