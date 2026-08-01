import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  // Formats .svelte components through prettier-plugin-svelte.
  svelte: true,
  // Replaces the Biome useSortedClasses rule.
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "tw"],
  },
});
