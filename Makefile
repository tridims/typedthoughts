.PHONY: help install dev build preview astro check lint format clean

help:
	@echo "Available targets:"
	@echo "  install   Install dependencies with bun"
	@echo "  dev       Start the Astro dev server"
	@echo "  build     Build the site for production"
	@echo "  preview   Preview the production build"
	@echo "  check     Run Biome checks (lint + format, no writes)"
	@echo "  lint      Run Biome lint with autofix"
	@echo "  format    Run Biome format with autofix"
	@echo "  clean     Remove build artifacts and caches"

install:
	bun install

dev:
	bun run dev

build:
	bun install
	bun run build

preview:
	bun run preview

check:
	bunx biome check .

lint:
	bunx biome lint --write .

format:
	bunx biome format --write .

clean:
	rm -rf dist .astro/data-store.json
