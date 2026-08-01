import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import svelte from "ultracite/oxlint/svelte";

export default defineConfig({
  extends: [core, react, svelte, astro],
  ignorePatterns: [...(core.ignorePatterns ?? []), "**/astro.config.mjs"],
});
