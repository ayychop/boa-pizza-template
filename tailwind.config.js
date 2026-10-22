/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // hover: utilities only apply on devices that can actually hover, so taps never leave a stuck hover state.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        coal: '#121111',
        smoke: '#1B1A19',
        ash: '#8A8580',
        cream: '#F5EFE0',
        ember: '#FF2E2E', // electric red: highlights, active states, glow
        blaze: '#E60000', // deeper red for filled buttons (white text passes AA)
        flame: '#FF7A1A', // fire only: embers, heat
      },
      fontFamily: {
        display: ['Anton', 'Impact', '"Arial Narrow Bold"', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
}
