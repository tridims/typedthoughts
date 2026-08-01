import { defineConfig } from "oxlint";

// Oxlint parses the script/frontmatter block of .astro and .svelte files only.
// Template markup is not linted.
export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "promise",
    "react",
    "jsx-a11y",
  ],

  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
    pedantic: "off",
    style: "off",
    restriction: "off",
    nursery: "off",
  },

  env: {
    browser: true,
  },

  ignorePatterns: [
    "dist",
    ".astro",
    "public",
    "bun.lock",
    "astro.config.mjs",
    "**/*.d.ts",
  ],

  rules: {
    // Astro and the modern JSX runtime do not need React in scope.
    "react/react-in-jsx-scope": "off",

    // Hook rules sit in the pedantic category, but they catch real bugs.
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "warn",

    // Allow unused function args and vars that start with an underscore.
    "eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // Restriction rules that are worth keeping on for site code.
    "eslint/no-console": "warn",
    "typescript/no-explicit-any": "warn",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "typescript/consistent-type-imports": "error",
  },

  overrides: [
    {
      // Build scripts and content collection config run in Node.
      files: [
        "*.config.{ts,mts,mjs,js}",
        "scripts/**",
        "src/content.config.ts",
      ],
      env: {
        node: true,
      },
      rules: {
        "eslint/no-console": "off",
      },
    },
  ],
});
