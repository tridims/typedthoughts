set windows-shell := ["pwsh.exe", "-NoLogo", "-Command"]

default:
    @just --list

# Install dependencies with bun
install:
    bun install

# Run oxlint + oxfmt with autofix
fix:
    bunx oxlint --fix .
    bunx oxfmt .

# Run oxlint + oxfmt checks without writing
check:
    bunx oxlint .
    bunx oxfmt --check .

# Start the Astro dev server
dev:
    bun run dev
