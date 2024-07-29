/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#FF8159',
        color1: '#F5F7FD',

      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #FBF3F1 0%, rgba(245, 248, 253, 0) 48.23%)',
      },
    },
  },
  plugins: [],
}