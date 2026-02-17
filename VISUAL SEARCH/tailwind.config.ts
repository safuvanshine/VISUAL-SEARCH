import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    50: '#FBF8F3',
                    100: '#F5E6C8',
                    200: '#EBD494',
                    300: '#D4AF37', // Classic Gold
                    400: '#AA8C2C',
                    500: '#8A701E',
                    600: '#6B5614',
                    700: '#4D3D0C',
                    800: '#2E2406',
                    900: '#151002',
                },
                black: {
                    50: '#1a1a1a',
                    100: '#000000',
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #AA8C2C 100%)',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-playfair)'],
            }
        },
    },
    plugins: [],
};
export default config;
