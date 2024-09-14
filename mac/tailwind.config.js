// tailwind.config.js
module.exports = {
  darkMode: "class", // or 'media' if you prefer
  theme: {
    extend: {
      colors: {
        // Define your custom colors here if needed
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"]
    }
  },
  plugins: []
};
