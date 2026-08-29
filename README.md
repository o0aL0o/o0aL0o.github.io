# Adrian Law — Personal Site

Modern dark-editorial portfolio for [adrianlaw1127.github.io](https://o0aL0o.github.io) — built with **Astro 7 + MDX + Tailwind 4**.

## Stack

- **Astro 7.2.9** — static-site generator, zero JS by default
- **@astrojs/mdx** — project case studies + gallery entries
- **@astrojs/sitemap** — auto-generates `sitemap-index.xml`
- **@tailwindcss/vite** (Tailwind 4) with custom design tokens via `@theme`
- **Sharp** — image optimization
- **Content Collections v2** (`astro/loaders`) — `projects`, `digital`, `ai`

## Local dev

```bash
npm install
npm run dev      # http://127.0.0.1:4321
npm run build    # → dist/
npm run preview  # serve the built site
```

## Adding a project

1. Drop images into `public/images/projects/<slug>/`
2. Add `src/content/projects/<slug>.mdx` with frontmatter:
   ```yaml
   ---
   title: "Project title"
   subtitle: "One-line subtitle"
   year: 2025
   role: "Solo · Designer / Dev"
   team: "Solo"
   status: "shipped"
   cover: "/images/projects/<slug>/hero.jpg"
   summary: "Two-sentence summary for the index card."
   tags: [unity, ui, ai]
   order: 1
   featured: true
   links: []
   ---
   ```
3. Build. The slug auto-derives from the filename.

## Adding gallery art

Same idea — drop image in `public/images/digital/` or `public/images/ai/`, add MDX in `src/content/digital/` or `src/content/ai/`. The gallery layout is automatic.

## Deploy

Push to `main` triggers `.github/workflows/deploy.yml` which builds and publishes to GitHub Pages.

## License

Code: MIT. Artwork and content: all rights reserved by the author.
