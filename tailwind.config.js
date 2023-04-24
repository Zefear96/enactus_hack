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
				primary: "#988CE1",
				secondary: "#FFD437",
				bluelogin: "#4526FF",
				yellowlogin: "#FFD437",
				greybase: "#F5F5F5",
				blackplaceholder: "rgba(0, 0, 0, 0.6)",
				greybg: "#F3F3F3",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			screens: {},
		},
	},
	plugins: [],
};
