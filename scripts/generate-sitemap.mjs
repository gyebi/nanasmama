import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, site } from "../src/site-pages.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sitemapPath = resolve(root, "public/sitemap.xml");
const lastmod = new Date().toISOString().slice(0, 10);

const xmlEscape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const urls = pages
  .filter((page) => page.sitemap)
  .map((page) => {
    const loc = new URL(page.path, site.origin).href;
    return [
      "  <url>",
      `    <loc>${xmlEscape(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      "  </url>"
    ].join("\n");
  })
  .join("\n");

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  "</urlset>",
  ""
].join("\n");

await mkdir(dirname(sitemapPath), { recursive: true });
await writeFile(sitemapPath, sitemap);

console.log(`Generated ${sitemapPath}`);
