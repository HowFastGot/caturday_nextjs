import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			jost: ['Jost', 'arial'],
		},
		colors: {
			white: '#FFFFFF',
			prewhite: '#F8F8F7',
			black: '#1D1D1D',
			less_black: '#282828',
			peach: '#FF868E',
			pale_peach: '#FBE0DC',
			pale_blue: '#B3B7FF',
			green: '#97EAB9',
			orange: '#FFD280',
			dark_gray: '#8C8C8C',
			night_gray: '#B2B2B2',
			gray: '#C4C4C4',
			borderColor: 'rgba(255, 255, 255, 0.60)',
			catCartHover: 'rgba(255, 134, 142, 0.60)',
		},
		extend: {
			colors: {
				desc: 'rgba(140, 140, 140, 1)',
			},
			fontSize: {
				'44px': '3.15rem',
			},
			maxWidth: {
				container: '1293px',
			},
			backgroundImage: {
				input_lense: "url('/assets/search_bar/input_lense.svg')",
				input_lense_wh: "url('/assets/search_bar/input_lense-wh.svg')",
				arrow_left_wh: "url('/assets/left_white_arrow.svg')",
				arrow_left_red: "url('/assets/left_red_arrow.svg')",
				green_smile: "url('/assets/voiting_page/green_like_smile.svg')",
				red_small_heart: "url('/assets/red_smal_heart.svg')",
				white_solid_small_heart: "url('/assets/wh_solid_smal_heart.svg')",
				yellow_dislike: "url('/assets/dislike_yellow.svg')",
				//
				a_b_icon: "url('/assets/breeds/a_b_sort.svg')",
				b_a_icon: "url('/assets/breeds/b_a_sort.svg')",
				a_b_red_icon: "url('/assets/breeds/a_b_red_sort.svg')",
				b_a_red_icon: "url('/assets/breeds/b_a_red_sort.svg')",

				upload_red: "url('/assets/gallery/upload_red.svg')",
				upload_wh: "url('/assets/gallery/upload_wh.svg')",

				//
			},
		},
	},
	plugins: [],
};
export default config
