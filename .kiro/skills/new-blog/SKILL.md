---
name: new-blog
description: Scaffold a new bootstrapped blog post entry. Use when creating a new blog post or when asked to bootstrap a blog file.
---

# Create a New Blog Post

When the user asks to create a new blog post, follow this process.

## File naming convention

Files live in `src/content/blog/` and follow this pattern:

```
YYYY-MM-DD-kebab-case-slug.mdx
```

Use today's date for `YYYY-MM-DD`. Derive the slug from the post title: lowercase, spaces replaced with hyphens, special characters stripped, keep it concise (3–6 words).

## Frontmatter

Required fields: `title`, `description`, `shorts`, `pubDate`
Optional fields: `author`, `updateDate`, `categories`, `tags`, `heroImage`, `externalPost`

```yaml
---
title: "Full descriptive title of the post"
author: "Dimas Tri Mustakim"
pubDate: "YYYY-MM-DD"
updateDate: "YYYY-MM-DD"
categories: ["Category1", "Category2"]
tags: ["Tag1", "Tag2"]
description: "A full, informative sentence or two that summarizes the problem, solution, and context. This shows up in meta and post listings."
shorts: |
    > A punchy one-liner or hook that draws readers in. Think of it as the tweet-length pitch for the article.
---
```

### Field notes

- `title`: Specific and descriptive. Can be a how-to ("How to Set Up X") or a topic statement ("Analyzing Web APIs: Turning Network Logs into OpenAPI Specs").
- `description`: 1–3 sentences. Cover what problem is solved, how, and in what context. Written in third person.
- `shorts`: A single sentence prefixed with `> `. This is the hook/teaser. Use the block scalar `|` format.
- `pubDate` / `updateDate`: Use `YYYY-MM-DD` string format.
- `categories` and `tags`: Use the same values for both. 2–5 PascalCase technology/topic labels.
- `author`: Always `"Dimas Tri Mustakim"` unless told otherwise.

## Body content structure

1. **Opening paragraph** (no heading): Set the scene — describe the problem or what motivated the post. 2–4 sentences. First person is fine.
2. **Sections with `##` headings**: Break content into logical steps or concepts. Each section should be focused.
3. **Code blocks**: Use fenced code blocks with the correct language identifier. For highlighted lines or titles use Astro/MDX-compatible syntax e.g. ` ```yaml title="values.yaml" ` or ` ```bash {2,5} `.
4. **References / Attribution** (optional): Add a `## References` or `## Attribution` section at the end if citing external sources.

### Tone and style

- First person, direct, practical. Write like you solved a real problem and are explaining it to a colleague.
- No fluff. Get to the point quickly.
- Commands and config snippets should be copy-pasteable and complete.
- Use placeholders like `<YOUR_VALUE>` when the user must substitute their own value.

## What to ask the user if not provided

Draft the full post from the topic given. Only ask if the topic is genuinely too vague (e.g. "write a blog post" with no subject).

## After creating the file

Tell the user the filename and full path, e.g.:
> Created `src/content/blog/2026-07-08-my-new-blog-post.mdx`
