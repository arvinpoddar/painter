/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /grid-cols-(3|4|5|6|7|8)/,
    },
    {
      pattern: /grid-rows-(3|4|5|6|7|8)/,
    },
  ],
  plugins: [],
};
