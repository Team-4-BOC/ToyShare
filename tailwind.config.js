module.exports = {
  mode: 'jit',
  content: [
    './client/dist/**/*.html',
    './client/src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true
  }
};
