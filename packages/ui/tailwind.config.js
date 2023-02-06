/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

const colors = require('tailwindcss/colors')
delete colors['lightBlue']
delete colors['warmGray']
delete colors['trueGray']
delete colors['coolGray']
delete colors['blueGray']

module.exports = {
  // darkMode: "media",
  // mode: "jit",
  // extract: {
  //   include: ["./**/*.tsx"],
  // },
  content: [
    "./src/main.tsx",
    "./src/**/*.tsx",
  ], //https://tailwindcss.com/docs/upgrade-guide#configure-content-sources
  theme:{
    ringOffset: colors,
    colors: {
      ...colors,
      remotelist: {
        30: "rgb(8 8 8)",
        40: `rgb(10 10 10)`,
        base: `rgb(33 33 33)`,

        60: `rgb(55 55 55)`,
        70: "rgb(88 88 88)",
        80: "rgb(111 111 111)",
        dark: "rgb(0 0 0)",
      }
    }
  },
  // plugins: [
  //   require('@tailwindcss/line-clamp'),
  // ]
};
