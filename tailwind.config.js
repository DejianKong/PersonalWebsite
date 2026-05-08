/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#F5F2EC',
        topsoil:  { DEFAULT: '#D3C49A', dark: '#A08840' },
        sediment: { DEFAULT: '#B8C9A3', dark: '#5C7A3E' },
        limestone:{ DEFAULT: '#C8D8C0', dark: '#4A7060' },
        shale:    { DEFAULT: '#A8B8C8', dark: '#4A6080' },
        schist:   { DEFAULT: '#7A9090', dark: '#2A5060' },
        granite:  { DEFAULT: '#5A4040', dark: '#3A2020' },
        magma:    { DEFAULT: '#3A2828' },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        mono:  ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
