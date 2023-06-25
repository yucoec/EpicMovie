/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(auto-fit, 220px)",
        17: "repeat(auto-fit, 162px)",
        18: "repeat(auto-fill, minmax(280px,1fr))"
      },
    },
  },
}