/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        black30: "rgb(0 0 0 / 30%)",
        black50: "rgb(0 0 0 / 50%)",
      },
      fontFamily: {
        ubaskervville: ["Baskervville", "serif"],
        uinter: ["Inter", "sans-serif"],
        ununito: ["Inter", "sans-serif"],
        ununitoSans: ["Nunito Sans", "sans-serif"],
        umono: ["PT Mono", "monospace"],
      },
      gridTemplateColumns: {
        "1fr": "1fr",
      },
      gridColumn: {
        "1/2": "1/2",
      },
      gridTemplateRows: {
        "1fr": "1fr",
      },
      gridRow: {
        "1/2": "1/2",
      },
    },
  },
  plugins: [],
};
