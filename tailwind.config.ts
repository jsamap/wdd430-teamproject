import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hhblue: {
          300: '#9DBEFF',
          400: '#6496FA',
          500: '#0858F7',
          600: '#05389E',
          700: '#032872',
        },
        hhorange: {
          300: '#ffc76d',
          400: '#FCB33D',
          500: '#FB9C04',
          600: '#CE8003',
          700: '#b36f02',
        }
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
