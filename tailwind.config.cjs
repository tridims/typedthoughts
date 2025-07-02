/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                mplus: ["'proxima-soft'", "Verdana", "sans-serif"],
                inter: ["Inter", "sans-serif"],
                hack: ["Hack", "monospace"],
                mpl: ["M PLUS Rounded 1c", "sans-serif"],
            },
        },
    },
    plugins: [],
};
