import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://esim.whytobe.com';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const newestDate = posts[0]?.data.date.toISOString().slice(0, 10) ?? '2026-11-24';

  const urls = [
    { loc: `${SITE}/`, lastmod: newestDate },
    ...posts.map((post) => ({
      loc: `${SITE}/blog/${post.id}/`,
      lastmod: post.data.date.toISOString().slice(0, 10),
    })),
  ];

  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
