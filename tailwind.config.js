module.exports = {
  mode: 'jit',
  content: [
    './client/dist/**/*.html',
    './client/src/**/*.{js,jsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['light', 'dark', 'cupcake', 'emerald']
  }
};
