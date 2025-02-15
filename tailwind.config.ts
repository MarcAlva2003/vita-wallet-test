import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: '#010E11',
        gray: {
          1: '#B9C1C2',
          2: '#DEE0E0',
          3: '#F5F6F6',
          50: '#fcfbfb',
          100: '#f9f8f7',
          200: '#f0efed',
          300: '#e3e1df',
          400: '#bdbab5',
          500: '#9b9891',
          600: '#7b7872',
          700: '#5f5d58',
          800: '#46443f',
          900: '#312f2c',
          950: '#21201e'
        },
        white: '#F9F9FA',
        blue: {
          1: '#167287',
          2: '#05BCB9'
        },
        red: '#CE3434',
        'custom-gradient': 'linear-gradient(90deg, #05BCB9 0%, #167287 100%)'
      },
      backgroundColor: {
        'custom-gradient': 'linear-gradient(90deg, #05BCB9 0%, #167287 100%)'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2340px',
      '5xl': '2560px',
    }
  },
  plugins: []
} satisfies Config
