/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // Scan the shared UI package
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: '#E65100', // Burnt Orange
                },
                gold: {
                    DEFAULT: '#C5A059', // Muted Gold
                }
            },
            fontFamily: {
                serif: ['"Noto Serif JP"', 'serif'],
            },
            extend: {
                colors: {
                    background: "var(--background)",
                    foreground: "var(--foreground)",
                },
            }
        },
    },
    plugins: [],
}
