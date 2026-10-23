/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amil: {
          red: '#B32B2B',
          'red-dark': '#8F2424',
        },
        charcoal: {
          DEFAULT: '#1A1815',
          text: '#231F1C',
        },
        ivory: {
          DEFAULT: '#F6F1E9',
        },
        'warm-white': '#FBF8F3',
        'muted-gold': '#B08D57',
        'border-light': '#DED5C9',
        'text-muted': '#756E67',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        montserrat: ['Montserrat', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.15em',
        'luxury-wide': '0.25em',
      },
      boxShadow: {
        'soft-luxury': '0 10px 30px -10px rgba(26, 24, 21, 0.08)',
        'elevated': '0 20px 40px -15px rgba(26, 24, 21, 0.15)',
      }
    },
  },
  plugins: [],
}
