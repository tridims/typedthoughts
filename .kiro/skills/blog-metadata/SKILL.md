---
name: blog-metadata
description: Generate and fill in shorts, description, tags, and categories for a completed blog post. Use when a blog post body is written and the metadata fields need to be populated.
---

# Generate Blog Post Metadata

When the user asks to generate metadata for a blog post, read the active or specified blog post file, then generate and write `shorts`, `description`, `tags`, and `categories` directly into its frontmatter.

## Process

1. Read the full content of the blog post file (active editor file, or a file the user specifies).
2. Analyze the content: what problem it solves, the technologies involved, the key insight or takeaway.
3. Generate all four fields following the rules below.
4. Write the generated values directly into the file's frontmatter using the correct YAML keys.

## Field rules

### `description`
- 1–3 sentences in third person.
- Cover: what problem is being solved + the solution/approach + the context (tech stack, environment).
- Should be informative enough to stand alone as a post summary (used in meta tags and post listings).
- Example: *"When running Airflow on GKE, worker pod logs are lost when the pods are deleted. The standard log persistence feature in the Helm chart doesn't work out-of-the-box because it requires a shared volume (ReadWriteMany), which GKE's default storage doesn't provide. This article shows how to solve this by using the GCS Fuse CSI Driver to mount a Google Cloud Storage bucket as the shared volume for logs."*

### `shorts`
- A single sentence prefixed with `> `.
- Must use YAML block scalar format with `|`.
- This is the hook/teaser — engaging and punchy. Focus on the curiosity or value angle, not just a dry summary.
- Example:
  ```yaml
  shorts: |
      > This article explains how to configure persistent logging for Apache Airflow on GKE...
  ```

### `tags` and `categories`
- Use the same values for both fields. Always keep them in sync.
- 2–5 items. PascalCase or the canonical casing of the technology (e.g. `Go`, `GKE`, `OpenAPI`, `Kubernetes`).
- Derived from: the main technology/tool, the domain/topic, and any important supporting tech mentioned.

## Output

Update the frontmatter in the file directly. Do not output a separate code block — edit the file. The result should look like:

```yaml
---
title: "..."
author: "Dimas Tri Mustakim"
pubDate: "YYYY-MM-DD"
updateDate: "YYYY-MM-DD"
categories: ["Tag1", "Tag2", "Tag3"]
tags: ["Tag1", "Tag2", "Tag3"]
description: "Full descriptive summary of the post in third person."
shorts: |
    > Punchy one-liner hook for the post.
---
```

## Language handling

If the blog post body is written in a language other than English (e.g. Indonesian), generate `description` and `shorts` in the same language as the post body. Tags and categories should still use the canonical English/technical name of each technology.

## After updating the file

Briefly summarize what was written for each field so the user can review and tweak if needed:

> - **description**: summarized the problem and solution
> - **shorts**: framed as a curiosity hook
> - **tags / categories**: `["Tag1", "Tag2", "Tag3"]`
