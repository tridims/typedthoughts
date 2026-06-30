# Site Feature Roadmap

Features to add to typedthoughts-astro, ordered by priority.

---

## 1. Tags / Categories on Blog Posts ⬅ start here

**Goal:** Let readers filter posts by topic. Useful now, becomes essential as the post count grows.

**What to do:**
- Add `tags: z.array(z.string()).optional()` to the blog schema in `src/content.config.ts`
- Add tags to existing post frontmatter (e.g. `tags: [golang, devops, security]`)
- Show tags as small badges on `ArticleListItem.astro` and the blog post layout `BlogPost.astro`
- Create a `/tags` index page listing all tags
- Create `/tags/[tag]` dynamic route that filters and lists posts by tag

**Files to touch:**
- `src/content.config.ts`
- `src/components/blogs/ArticleListItem.astro`
- `src/layouts/BlogPost.astro`
- `src/pages/tags/index.astro` (new)
- `src/pages/tags/[tag].astro` (new)

---

## 2. Uses / Gear Page ⬅ start here

**Goal:** Showcase your hardware, software, tools, and homelab setup. Popular in the dev community.

**What to do:**
- Create `/uses` page at `src/pages/uses.astro`
- Organize into sections: Hardware, Daily Software, Dev Tools, Homelab, etc.
- Add a link to it in the Header nav

**Files to touch:**
- `src/pages/uses.astro` (new)
- `src/components/header/Header.astro` (add nav link)

**Reference:** [uses.tech](https://uses.tech) for format inspiration

---

## 3. Reading Time Estimate

**Goal:** Show `~N min read` on article list items and blog post pages.

**What to do:**
- Write a utility function `src/lib/readingTime.ts` that counts words in post body and divides by ~200 wpm
- Display it next to the date on `ArticleListItem.astro` and in the post header on `BlogPost.astro`
- Astro content collections expose the raw body via `post.body`, so no external library needed

**Files to touch:**
- `src/lib/readingTime.ts` (new)
- `src/components/blogs/ArticleListItem.astro`
- `src/layouts/BlogPost.astro`

---

## 4. Now Page

**Goal:** A living document of what you're currently working on, learning, or experimenting with. Low maintenance, adds a lot of personality.

**What to do:**
- Create `src/pages/now.astro`
- Content sections: current job focus, what you're building/experimenting with, what you're reading/watching
- Update it whenever things change (no pressure to keep it perfectly current)
- Add a link in the Header or About page

**Files to touch:**
- `src/pages/now.astro` (new)
- `src/components/header/Header.astro` or `src/pages/about.astro` (add link)

**Reference:** [nownownow.com](https://nownownow.com) for concept

---

## 5. TIL (Today I Learned)

**Goal:** Short, atomic notes separate from full blog posts. Lowers the barrier to publishing — no need for a polished article.

**What to do:**
- Add a new `til` content collection in `src/content.config.ts` with its own schema (title, date, tags, body)
- Create `src/content/til/` directory for the MDX notes
- Create `src/pages/til/index.astro` listing all TIL entries
- Create `src/pages/til/[...slug].astro` for individual entries
- Optionally surface the latest 1-2 TILs on the homepage sidebar

**Files to touch:**
- `src/content.config.ts`
- `src/content/til/` (new directory)
- `src/pages/til/index.astro` (new)
- `src/pages/til/[...slug].astro` (new)

---

## 6. RSS Improvements

**Goal:** Make the existing RSS feed more visible and complete.

**What to do:**
- Add an RSS icon/link in the footer or header (currently `rss.xml` exists but isn't linked in the UI)
- Ensure the feed includes full post descriptions, not just titles
- Optionally add a separate `/til/rss.xml` feed once TIL is built
- Consider adding the `<link rel="alternate">` tag in `BaseHead.astro` for auto-discovery by RSS readers

**Files to touch:**
- `src/components/header/BaseHead.astro` (add `<link rel="alternate">`)
- `src/components/footer/Footer.astro` (add RSS icon link)
- `src/pages/rss.xml.js` (review content completeness)

---

## 7. Open Graph Image Generation

**Goal:** Auto-generate OG images for blog posts so links shared on LinkedIn/X look polished instead of using a generic cover.

**What to do:**
- Use Astro's built-in endpoint approach with `satori` + `@resvg/resvg-js` to render OG images at build time
- Create `src/pages/og/[slug].png.ts` endpoint that generates a PNG per post using title, date, and tags
- Update `BaseHead.astro` to reference the generated OG image URL
- Design: keep it simple — site name, post title, maybe a subtle background pattern

**Files to touch:**
- `src/pages/og/[slug].png.ts` (new)
- `src/components/header/BaseHead.astro`

**Dependencies to add:**
- `satori` 
- `@resvg/resvg-js`

---

## Priority Order

| # | Feature | Effort | Value |
|---|---------|--------|-------|
| 1 | Tags / Categories | Medium | High |
| 2 | Uses / Gear Page | Low | High |
| 3 | Reading Time | Low | Medium |
| 4 | Now Page | Low | Medium |
| 5 | TIL | Medium | Medium |
| 6 | RSS Improvements | Low | Low |
| 7 | Open Graph Images | Medium | Medium |
