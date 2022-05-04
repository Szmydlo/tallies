module.exports = {
	mode: "jit",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			boxShadow: {
				"3xl": "0 2px 8px rgba(0, 0, 0, 0.25)",
			},
		},
	},
	plugins: [],
};
