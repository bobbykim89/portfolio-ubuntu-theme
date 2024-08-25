import { mclTheme } from '@bobbykim/manguito-theme/mcl-theme'
import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,ts,js,cjs}',
    './pages/**/*.{vue,ts,js,cjs}',
    './layouts/**/*.{vue,ts,js,cjs}',
    './node_modules/@bobbykim/**/*.{vue,ts,js,cjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    mclTheme({
      colors: {
        primary: '#312e81',
        info: '#14532d',
        warning: '#e95420',
        'dark-2': '#383838',
        'dark-3': '#1d1d1d',
        'dark-4': '#222222',
      },
    }),
  ],
}
