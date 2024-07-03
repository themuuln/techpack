import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#001644',
        accent: '#BDE1FF',
        background: '#483EFF',
        muted: '#ADB5BD',
        field: '#f8f9fe',
        Arcade: '#FEAF7E',
        Advanced: '#FD8392',
        Pro: '#483EFE',
      },
    },
  },
  plugins: [],
};
export default config;
