import { defineConfig } from "oxfmt";

// Oxfmt does not support .astro files yet. The Astro VS Code extension
// formats those.
export default defineConfig({
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "es5",
  arrowParens: "always",
  endOfLine: "lf",

  sortImports: true,
  sortPackageJson: true,

  // Formats .svelte components through prettier-plugin-svelte.
  svelte: true,

  sortTailwindcss: {
    stylesheet: "src/styles/global.css",
    functions: ["clsx", "cn", "cva", "tw"],
  },

  ignorePatterns: [
    "dist",
    ".astro",
    "public",
    "bun.lock",
    "astro.config.mjs",
    "src/content/**",
  ],
});
