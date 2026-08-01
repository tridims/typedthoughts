# TypedThoughts 💭

> *Where ideas meet code and thoughts become reality*

Welcome to my little corner of the internet! This is my personal website built with love, caffeine, and a healthy dose of curiosity. It's a space where I share my thoughts, experiences, and whatever happens to be bouncing around in my head.

## ✨ What's This All About?

TypedThoughts is my digital garden - a place where I cultivate ideas, share learnings, and document my journey through the world of technology and beyond. Think of it as my personal blog with a twist of personality and a sprinkle of code magic.

## 🛠 Built With

- **[Astro](https://astro.build)** - Because it's fast, modern, and lets me focus on writing
- **Markdown & MDX** - For that sweet, sweet content authoring experience
- **Tailwind CSS** - Utility-first styling that keeps my CSS clean and maintainable
- **TypeScript** - Type safety keeps the bugs away
- **Love & Coffee** ☕ - The most important ingredients
- **LLM & AI Stuff** 🤖 - Healthy amount of help from AI to keep things moving smoothly

## 🚀 Getting Started

Want to run this locally? Here's how:

```bash
# Clone the repo
git clone https://github.com/tridims/typedthoughts.git

# Install dependencies
bun install

# Fire up the dev server
bun dev
```

Then visit `http://localhost:4321` and voilà! 🎉

## 📁 Project Structure

```
typedthoughts/
├── public/          # Static assets
├── src/
│   ├── assets/      # assets like images and icons
│   ├── components/  # Reusable UI components
│   ├── content/     # Blog posts and content
│   ├── layouts/     # Page layouts
│   └── pages/       # Routes and pages
├── astro.config.mjs
└── package.json
```

## 🎯 Available Commands

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `bun dev`         | Starts the development server    |
| `bun build`       | Builds for production            |
| `bun preview`     | Preview production build locally |
| `bun astro add`   | Add integrations                 |
| `bun astro check` | Type-check your project          |

## 🧹 Linting & Formatting

This project uses the **[Oxc](https://oxc.rs)** toolchain: **oxlint** for linting and **oxfmt** for formatting. **[Ultracite](https://github.com/haydenbleasel/ultracite)** supplies the base presets — a strict, opinionated ruleset.

```bash
# Lint
bunx oxlint .

# Lint with auto-fixes
bunx oxlint --fix .

# Check formatting without writing
bunx oxfmt --check .

# Format
bunx oxfmt .
```

The lint config lives in `oxlint.config.ts`. It extends the `core`, `react`, `svelte`, and `astro` presets from Ultracite. The format config lives in `oxfmt.config.ts`. It enables Svelte formatting and Tailwind class sorting.

Note: oxfmt does not support `.astro` files yet, and oxlint only reads the component script. The Astro VS Code extension formats `.astro` templates instead.

## 🎨 Design Philosophy

This site embraces:
- **Simplicity** - Clean, distraction-free reading
- **Performance** - Fast loading times and smooth interactions  
- **Accessibility** - Everyone should be able to enjoy the content
- **Personal Touch** - It's my space, so it reflects who I am

## 📄 License

MIT License - feel free to fork, modify, and make it your own!

---

*Made with ❤️ and probably too much coffee*
