import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      shorts: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          image: image(),
          source: z.string().optional(),
          owner: z.string().optional(),
        })
        .optional(),
      externalPost: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

const til = defineCollection({
  // Load Markdown and MDX files in the `src/content/til/` directory.
  loader: glob({ base: "./src/content/til", pattern: "**/*.{md,mdx}" }),
  // Today-I-Learned notes are short and atomic, so the schema is lighter.
  schema: () =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      description: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, til };
