// /** @type {import('tailwindcss').Config} */
const konstaConfig = require("konsta/config");
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     colors: {
//       'primary': 'var(--color-primary)',
//       'secondary': 'var(--color-secondary)',
//     },
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = konstaConfig({
	content: ["./index.html", "./src/**/*.{vue,js,ts,jxs,tsx}"],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				base: "var(--color-base)",
				dark: "var(--color-dark)",
				secondary: "var(--color-secondary)",
				'dark-hover': "var(--color-dark-hover)",
				'dark-base': "var(--color-dark-base)",
				'primary-tint': "var(--color-primary-tint)",
				'primary-hover': "var(--color-primary-hover)",
				'danger': "var(--color-danger)",
				'danger-hover': "var(--color-danger-hover)",
				'secondary-hover': "var(--color-secondary-hover)",
				'secondary-tint': "var(--color-secondary-tint)",
				'disabled-color': "var(--disabled-color)",
			},
		},
		fontFamily: {
			ios: 'League Spartan',
			material: 'League Spartan'
		  },
	},
});
