module.exports = {
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active']
  },
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
    themes: ['light', 'dark', 'cupcake', 'emerald', 'cmyk', 'winter', 'retro', 'lemonade', 'autumn', 'aqua', 'bumblebee', 'valentine', {
      mytheme: {

        "primary": "#67e8f9",

        "secondary": "#fef08a",

        "accent": "#f3cc30",

        "neutral": "#111827",

        "base-100": "#ffffff",

        "info": "#53c0f3",

        "success": "#60a5fa",

        "warning": "#f3cc30",

        "error": "#e24056",
                 }
    }]
  }
};
