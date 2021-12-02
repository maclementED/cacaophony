const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,css}',
    "./public/index.html",
  ],
  darkMode: 'media',
  theme: {
    colors: {
      ...colors,
      gray: colors.gray,
    },
    extend: {
      animation: {
        'bounce-once': 'bounce-once 0.25s ease-out',
      },
      keyframes: {
        'bounce-once': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
            animationTimingFunction: 'ease-out',
          },
          '100%': {
            opacity: '1',
            transform: 'none',
            animationTimingFunction: 'ease-out',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],

  daisyui: {
    logs: false,
    themes: [
      {
        'light': {
          'primary': colors.blue[600],
          'primary-focus': colors.blue[700],
          'primary-content': '#ffffff',
          'secondary': colors.gray[200],
          'secondary-focus': colors.gray[300],
          'secondary-content': '#000000',
          'accent': 'red',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          'neutral': '#000000',
          'neutral-focus': '#000000',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': colors.blue[600],
          'success': colors.green[600],
          'warning': colors.yellow[500],
          'error': colors.red[600],
        },
      }
    ]
  },
}