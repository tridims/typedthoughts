import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";
import { SITE_TITLE } from "@/consts";

// Build-time Open Graph image generation.
//
// Generates one PNG per blog post and TIL entry so links shared on
// LinkedIn/X get a polished, on-brand preview instead of a generic cover.
// Images are emitted to `/og/blog/<id>.png` and `/og/til/<id>.png`.

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

interface OGPage {
  title: string;
  pubDate: Date;
  description?: string;
  tags?: string[];
}

const [blogPosts, tilEntries] = await Promise.all([
  getCollection("blog"),
  getCollection("til"),
]);

const pages: Record<string, OGPage> = Object.fromEntries([
  ...blogPosts.map((post) => [
    `blog/${post.id}`,
    {
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      tags: post.data.tags,
    } satisfies OGPage,
  ]),
  ...tilEntries.map((entry) => [
    `til/${entry.id}`,
    {
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description,
      tags: entry.data.tags,
    } satisfies OGPage,
  ]),
]);

// Build the small meta line shown under the title: site · date · #tags
function buildSubtitle(page: OGPage): string {
  const parts = [SITE_TITLE, dateFormatter.format(page.pubDate)];
  if (page.tags && page.tags.length > 0) {
    parts.push(page.tags.slice(0, 3).map((tag) => `#${tag}`).join("  "));
  }
  return parts.join("   ·   ");
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: OGPage) => ({
    title: page.title,
    description: buildSubtitle(page),
    // Deep charcoal → violet gradient, matching the site's dark theme.
    bgGradient: [
      [24, 23, 34],
      [43, 34, 64],
    ],
    // Warm orange accent bar, echoing the site's link/accent color.
    border: {
      color: [237, 137, 54],
      width: 24,
      side: "inline-start",
    },
    padding: 70,
    font: {
      title: {
        color: [245, 244, 248],
        size: 66,
        weight: "Bold",
        lineHeight: 1.15,
        families: ["Rubik"],
      },
      description: {
        color: [186, 180, 205],
        size: 30,
        weight: "Normal",
        lineHeight: 1.4,
        families: ["Rubik"],
      },
    },
    fonts: [
      "./src/assets/fonts/Rubik-Regular.ttf",
      "./src/assets/fonts/Rubik-Bold.ttf",
    ],
  }),
});
