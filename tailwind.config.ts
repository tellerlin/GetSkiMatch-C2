import { type Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue
        secondary: '#3B82F6', // Light blue
        accent: '#F59E0B', // Orange
        background: '#F9FAFB', // Light gray
        text: '#1F2937', // Dark gray
      },
    },
  },
  plugins: [],
};

export default config;
