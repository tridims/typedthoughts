import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { SITE_TITLE } from "../../consts";

export async function GET(context) {
  const entries = (await getCollection("til")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: `${SITE_TITLE} — TIL`,
    description: "Short, atomic notes on things I learned recently.",
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description ?? entry.data.title,
      link: `/til/${entry.id}/`,
      categories: entry.data.tags ?? [],
    })),
    customData: "<language>en-us</language>",
  });
}
