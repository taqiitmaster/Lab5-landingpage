/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Strict monochrome. No accent colour, no gradients anywhere.
      colors: {
        ink: '#0A0A0A',
        paper: '#FAFAFA',
        g: { 900: '#141414', 800: '#1C1C1C', 700: '#262626', 600: '#3A3A3A', 500: '#5E5E5E', 400: '#8A8A8A', 300: '#B3B3B3', 200: '#D9D9D9', 100: '#EDEDED' },
      },
      fontFamily: {
        display: ['"Inter Tight Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Archivo Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
      },
      animation: { blink: 'blink 1s steps(1) infinite', marquee: 'marquee 40s linear infinite' },
    },
  },
  plugins: [],
}
