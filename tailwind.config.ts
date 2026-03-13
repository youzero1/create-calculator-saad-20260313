import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'calc-bg': '#1a1a2e',
        'calc-screen': '#16213e',
        'calc-btn': '#0f3460',
        'calc-btn-hover': '#e94560',
        'calc-operator': '#e94560',
        'calc-equals': '#e94560',
      },
    },
  },
  plugins: [],
};

export default config;
