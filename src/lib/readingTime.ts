const WORDS_PER_MINUTE = 200;

/**
 * Estimate reading time for a post body.
 *
 * Strips common Markdown/MDX syntax so code fences, images, and links don't
 * inflate the word count, then divides the remaining word count by an average
 * reading speed (~200 wpm).
 *
 * @param body Raw Markdown/MDX content (e.g. `post.body`)
 * @returns Estimated reading time in whole minutes (minimum 1)
 */
export function getReadingTime(body: string | undefined): number {
  if (!body) {
    return 1;
  }

  const text = body
    .replace(/```[\s\S]*?```/g, "") // fenced code blocks
    .replace(/`[^`]*`/g, "") // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> keep link text
    .replace(/[#>*_~\-]/g, " "); // misc markdown punctuation

  const words = text.split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/**
 * Format an estimated reading time as a human-friendly label.
 *
 * @param body Raw Markdown/MDX content (e.g. `post.body`)
 * @returns A label like `~5 min read`
 */
export function formatReadingTime(body: string | undefined): string {
  return `~${getReadingTime(body)} min read`;
}
