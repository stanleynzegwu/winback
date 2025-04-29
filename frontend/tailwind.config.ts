import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {		
		screens: {
		"xs": "500px",
	  	},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			primaryColor: {
  				light: '#d1fae5',
  				DEFAULT: '#150D22',
  				dark: '#065f46'
  			},
  			secondaryColor: {
  				light: '#bfdbfe',
  				DEFAULT: '#3b82f6',
  				dark: '#1e3a8a'
  			},
  			accentColor: {
  				light: '#fca5a5',
  				DEFAULT: '#ef4444',
  				dark: '#b91c1c'
  			},
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			violet: {
				50: "#fdf2ff",
				100: "#fbe5ff",
				200: "#f6c9ff",
				300: "#f39fff",
				400: "#ee67ff",
				500: "#df2eff",
				600: "#c70dec",
				700: "#ad07c9",
				800: "#8c08a0",
				900: "#750d82",
				950: "#4f0059",
			},
			purple: {
				50: "#f4f3ff",
				100: "#ebeafd",
				200: "#dad7fd",
				300: "#bfb8fa",
				400: "#9e8ff6",
				500: "#7e62f0",
				600: "#6335e5",
				700: "#5c2ed3",
				800: "#4d26b1",
				900: "#412191",
				950: "#271362",
			},
  		},
  		blur: {
  			'4xl': '70px',
  			'5xl': '85px',
  			'6xl': '90px',
  			'7xl': '100px',
  			'8xl': '150px',
  			'9xl': '200px',
  			'base': '250px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
