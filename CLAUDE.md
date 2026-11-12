# CLAUDE.md

## Commands

```bash
npm run dev      # Vite dev server on localhost:3000
npm run build    # tsc -b && vite build && cp dist/index.html dist/404.html
npm run lint     # ESLint
```

No test runner. Verify changes with `npx tsc -b && npm run lint && npm run build`.

## Gotchas

- CI (GitHub Pages deploy) runs on Linux, which is case-sensitive. Keep file and folder casing consistent and use `git mv` for case-only renames.
- The site is served under `/pay-my-lawyer/`. `base` in `vite.config.ts` sets it, and the router basename reads `import.meta.env.BASE_URL`. Build static asset URLs from `import.meta.env.BASE_URL` (or `%BASE_URL%` in `index.html`).
- The build copies `index.html` to `404.html` as the SPA fallback, so real routes return HTTP 404 on GitHub Pages.
- Path constants live in `src/routes/paths.ts`. `/sign-in` and `/create-account` have no routes yet.

## Styling

- Use MUI theme defaults (`src/theme.ts`); no custom font sizes in CSS.
- CSS Modules with `className`. Read colors and spacing from `var(--mui-palette-*)` and `var(--mui-spacing)`.
- Palette only: cream `#EDF1D6`, sage `#9DC08B`, green `#609966`, ink `#40513B`. No gradients.
- Declarations in alphabetical order; literal breakpoints at 600, 900 and 1200px.
- Meet WCAG 2.1 AA, stay responsive down to 320px, and respect `prefers-reduced-motion`.
- Page data (`audiences.ts`, `products.ts`) sits in a file beside the page.

## SEO

All meta, Open Graph and JSON-LD tags are static in `index.html` (link-preview crawlers don't run JS), with one `<title>`. The site is hidden with `noindex` and `robots.txt` `Disallow: /` until launch.

### Launch checklist

1. In `index.html`, replace `https://rvarela11.github.io/pay-my-lawyer` with `https://paymylawyer.cc` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url` and `logo`).
2. Set `base: '/'` in `vite.config.ts`.
3. Remove the `noindex` meta tag.
4. `robots.txt`: allow all and add a `Sitemap:` line; add `sitemap.xml`.

## Rules

Ask before adding dependencies or global styles.
