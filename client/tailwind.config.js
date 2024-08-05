import { nextui } from '@nextui-org/react';

export default {
  content: ['./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '0.25rem',
          medium: '0.375rem',
          large: '0.5rem',
        },
      },
    }),
  ],
};
