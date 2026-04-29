# Nana's Mama

Multi-page storefront for Nana's Mama, set up as a Vite project for easier development and future growth.

## Site Management

Shared page metadata lives in `src/site-pages.js`. Use that file when adding, removing, renaming, or changing SEO details for a page.

The same registry powers:

- Vite multi-page build inputs
- canonical, Open Graph, Twitter, and robots meta tags
- production image loading hints
- sitemap generation

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Regenerate the sitemap after route or SEO changes:

```bash
npm run manage:sitemap
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build:

```bash
npm run preview
```
