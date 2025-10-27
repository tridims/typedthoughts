// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    site: "https://dimastri.com",
    markdown: {
        shikiConfig: {
            // themes: {
            //     light: "one-light",
            //     dark: "one-dark-pro",
            // },
            theme: "one-dark-pro",
            wrap: true,
        },
    },
    integrations: [mdx(), sitemap(), react()],
});
