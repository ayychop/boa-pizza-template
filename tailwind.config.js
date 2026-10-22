/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0A09',
        coal: '#141110',
        smoke: '#1E1A17',
        ash: '#8C8379',
        cream: '#F5EFE0',
        ember: '#D62828',
        flame: '#F4732A',
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Didot', '"Bodoni 72"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.28em' },
      transitionTimingFunction: { expo: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
