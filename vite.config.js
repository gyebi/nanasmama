import { defineConfig } from "vite";
import { resolve } from "node:path";
import { pages, pageByFile, site } from "./src/site-pages.js";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const upsertMeta = (html, selector, tag) => {
  const nameMatch = selector.match(/^meta\[name="(.+)"\]$/);
  const propertyMatch = selector.match(/^meta\[property="(.+)"\]$/);

  if (nameMatch) {
    const pattern = new RegExp(`<meta\\s+name=["']${nameMatch[1]}["'][^>]*>`, "i");
    return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
  }

  if (propertyMatch) {
    const pattern = new RegExp(`<meta\\s+property=["']${propertyMatch[1]}["'][^>]*>`, "i");
    return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
  }

  return html;
};

const upsertLink = (html, rel, tag) => {
  const pattern = new RegExp(`<link\\s+rel=["']${rel}["'][^>]*>`, "i");
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace("</head>", `  ${tag}\n</head>`);
};

const optimizeImages = (html) => {
  let prioritizedContentImage = false;

  return html.replace(/<img\b([^>]*)>/gi, (tag, attributes) => {
    if (/data-work-lightbox-image/i.test(attributes)) {
      return tag;
    }

    let nextTag = tag;
    const isLogo = /logo/i.test(attributes);
    const isFooterLogo = /footer-logo/i.test(attributes);
    const hasLoading = /\sloading=/i.test(attributes);
    const hasDecoding = /\sdecoding=/i.test(attributes);
    const hasFetchPriority = /\sfetchpriority=/i.test(attributes);
    const shouldPrioritize = !isLogo && !prioritizedContentImage;

    if (shouldPrioritize) {
      prioritizedContentImage = true;
    }

    if (!hasDecoding) {
      nextTag = nextTag.replace(/>$/, ' decoding="async">');
    }

    if (!hasLoading) {
      nextTag = nextTag.replace(/>$/, ` loading="${shouldPrioritize || (isLogo && !isFooterLogo) ? "eager" : "lazy"}">`);
    }

    if (shouldPrioritize && !hasFetchPriority) {
      nextTag = nextTag.replace(/>$/, ' fetchpriority="high">');
    }

    return nextTag;
  });
};

const siteManagementPlugin = () => ({
  name: "nanasmama-site-management",
  transformIndexHtml(html, ctx) {
    const fileName = ctx.filename?.split(/[\\/]/).pop();
    const page = pageByFile.get(fileName);

    if (!page) {
      return optimizeImages(html);
    }

    const canonicalUrl = new URL(page.path, site.origin).href;
    const imageUrl = new URL(site.defaultImage, site.origin).href;
    let nextHtml = html
      .replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`);

    nextHtml = upsertMeta(nextHtml, 'meta[name="description"]', `<meta name="description" content="${escapeHtml(page.description)}">`);
    nextHtml = upsertLink(nextHtml, "canonical", `<link rel="canonical" href="${canonicalUrl}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:type"]', '<meta property="og:type" content="website">');
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:site_name"]', `<meta property="og:site_name" content="${escapeHtml(site.name)}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:title"]', `<meta property="og:title" content="${escapeHtml(page.title)}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:description"]', `<meta property="og:description" content="${escapeHtml(page.description)}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:url"]', `<meta property="og:url" content="${canonicalUrl}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[property="og:image"]', `<meta property="og:image" content="${imageUrl}">`);
    nextHtml = upsertMeta(nextHtml, 'meta[name="twitter:card"]', '<meta name="twitter:card" content="summary_large_image">');

    if (page.noindex) {
      nextHtml = upsertMeta(nextHtml, 'meta[name="robots"]', '<meta name="robots" content="noindex, nofollow">');
    }

    return optimizeImages(nextHtml);
  }
});

export default defineConfig({
  plugins: [siteManagementPlugin()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.key, resolve(__dirname, page.file)])
      )
    }
  }
});
