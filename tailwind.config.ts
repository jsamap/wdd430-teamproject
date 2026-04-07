import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        primary: '#6496FA',
        secondary: '#FCB33D',
        neutral: '#F7F7F7',
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
      fontFamily: {
        sans: ['var(--font-roboto)'],
        serif: ['var(--font-merriweather)'],
      }
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
