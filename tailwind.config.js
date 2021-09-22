const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require("tailwindcss/colors");
process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      indigo: {
        light: "#b3bcf5",
        DEFAULT: "#5c6ac4",
        dark: "#202e78",
      },
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
    },

    spacing: {
      13: "1.25rem",
      15: "3.75rem",
      128: "32rem",
      144: "36rem",
      "1/4": "25%",
    },
    extend: {
      margin: {
        "-72": "-18rem",
      },
    },
  },
  variants: {
    extend: {},
  },

  // theme: {
  //   colors: {
  //     indigo: {
  //       light: "#b3bcf5",
  //       DEFAULT: "#5c6ac4",
  //       dark: "#202e78",
  //     },
  //   },
  // },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
