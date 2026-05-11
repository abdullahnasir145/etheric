/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./container/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-regular": ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },

      colors: {
        primary: "#00E5FF",
        lightPrimary: "#78c7d0",
        secondary: "#00FFA3",
        terniary: "#FF3B30",
        appBg: "#0F172A",
        lightPurple: "#283044",
        Gray: "#5C5C5C",
        lightGray: "#E0E0E0",
        darkPurple: "#4b556d",
      },
    },
  },
  plugins: [],
};
