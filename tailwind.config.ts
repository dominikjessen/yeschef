import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-rows-1',
    'grid-rows-2',
    'grid-rows-3',
    'grid-rows-4',
    'grid-rows-5',
    'grid-rows-6',
    'grid-rows-7'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: {
          DEFAULT: 'hsl(var(--foreground))',
          lighter: 'hsl(var(--foreground-lighter))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        destructive: 'hsl(var(--destructive))',
        inactive: {
          DEFAULT: 'hsl(var(--inactive))',
          recipes: 'hsl(var(--inactive-recipes))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))'
      },
      keyframes: {
        in: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        out: {
          from: { opacity: '1' },
          to: { opacity: '0' }
        },
        rollDice: {
          '0%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-20deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        in: 'in 200ms ease-in-out',
        out: 'out 200ms ease-in-out',
        rollDice: 'rollDice 1000ms ease-in-out'
      },
      gridTemplateRows: {
        '7': 'repeat(7, minmax(0, 1fr))'
      }
    }
  },
  plugins: []
};
export default config;
