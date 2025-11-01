/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}',
		"./src/**/*.{html,js}",
	],
	theme: {
		extend: {
			colors: {
				orange: '#DC7000',
				orangeGradient: 'linear-gradient(92.48deg, #FA8305 2.08%, #FB9E3C 117.25%)',
				background: '#070707',
				mainBgr: 'linear-gradient(to top, #08070A, #271E4E)',
				greyForm: '#89878F',
				greyBorder: '#CECECE',
			},
		}
	},
	plugins: [],
}

