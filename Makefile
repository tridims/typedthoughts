.PHONY: help install dev build preview astro check lint format clean

help:
	@echo "Available targets:"
	@echo "  install   Install dependencies with bun"
	@echo "  dev       Start the Astro dev server"
	@echo "  build     Build the site for production"
	@echo "  preview   Preview the production build"
	@echo "  check     Run oxlint + oxfmt checks (no writes)"
	@echo "  lint      Run oxlint with autofix"
	@echo "  format    Run oxfmt with autofix"
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
	bunx oxlint .
	bunx oxfmt --check .

lint:
	bunx oxlint --fix .

format:
	bunx oxfmt .

clean:
	rm -rf dist .astro/data-store.json
