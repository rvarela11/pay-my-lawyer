# CLAUDE.md

## Commands

```bash
npm run dev      # Vite dev server on localhost:3000
npm run build    # tsc -b && vite build && cp dist/index.html dist/404.html
npm run lint     # ESLint
npm test         # Vitest (watch mode; `npm test -- --run` runs once)
```

Verify changes with `npx tsc -b && npm run lint && npm test -- --run && npm run build`. Every pull request runs lint, tests and the build (`ci.yml`). Deploys run the tests and the build (`deploy.yml`).

## Tests

- Vitest + React Testing Library + user-event on jsdom. Test files sit beside the code they test (`CreateAccount.test.tsx` next to `CreateAccount.tsx`).
- Test what the user sees and does: query by role or label, interact with `user-event`, and assert with jest-dom matchers (`toHaveFocus`, `toHaveAccessibleDescription`). Don't test implementation details.
- Prefer page-level tests through the UI. Unit-test a schema or helper only when it has its own logic (conditional `.when()`, cross-field rules, custom `.test()`), not to re-test Yup or temporary JSON fakes.
- Use the real router (`createMemoryRouter`) and the real JSON responses. For delays, use fake timers with `shouldAdvanceTime`.

## Gotchas

- CI (GitHub Pages deploy) runs on Linux, which is case-sensitive. Keep file and folder casing consistent and use `git mv` for case-only renames.
- The site is served under `/pay-my-lawyer/`. `base` in `vite.config.ts` sets it, and the router basename reads `import.meta.env.BASE_URL`. Build static asset URLs from `import.meta.env.BASE_URL` (or `%BASE_URL%` in `index.html`).
- The build copies `index.html` to `404.html` as the SPA fallback, so real routes return HTTP 404 on GitHub Pages.
- Path constants live in `src/routes/paths.ts` (`PATHS`). `/forgot-password` has no route yet.

## Components

- Module-level constants that never change (fixed numbers and strings, data objects, `as const` maps) use `CONSTANT_CASE`: `PATHS`, `NAV_ITEMS`, `TRAVEL_MS`. Values built at runtime (`theme`, `router`) and anything inside a function stay camelCase. This follows the Google TypeScript Style Guide.
- A props type that lives in the component's file and isn't exported is named `Props` (see `src/components/Section/Section.tsx`).
- Keep components focused on rendering. Move stateful logic (data loading, persistence, multi-step navigation, anything with its own state and effects) into custom hooks in a `hooks/` folder beside the component (`src/pages/CreateAccountSetup/hooks/useSetupProgress.ts`). DOM event handlers (`handleSubmit`, `handleClick`) stay in the component. Don't use container components.
- Order a component body: hooks and state, then derived values, then handlers, then `useEffect`s, then early returns (loading states, `<Navigate>` redirects) directly above the main `return`. Nothing goes between the early returns and the main `return`.
- Name a function that handles an event `handle` + the event or action (`handleClose`, `handleSubmit`), and pass it to an `on`-prefixed prop (`onClose={handleClose}`). Callback props a component accepts keep the `on` prefix (`onClick`).

## Styling

- Typography comes from MUI (`src/theme.ts` and `Typography` variants). Don't set `font-size`, `font-weight` or `letter-spacing` in CSS; pick a variant, or change the theme. `font-variant-numeric: tabular-nums` is fine for aligning numbers. Exception: the Header's bold current-page nav link.
- CSS Modules with `className`. Read colors and spacing from `var(--mui-palette-*)` and `var(--mui-spacing)`.
- Don't use CSS Modules `composes`. Share layout through components in `src/components`: `Container` sets the max width and side gutters, and `Section` sets the vertical padding for page sections and the footer (`component='footer'`).
- Palette only: cream `#EDF1D6`, sage `#9DC08B`, green `#609966`, ink `#40513B`. No gradients.
- Button heights come from the theme (`src/theme.ts`): 44px, or 48px with `size='large'`. Don't set `min-height` on a `Button` in CSS.
- Sage and green fail AA as body text on ink or white. Use them for large text, borders and decoration only.
- Declarations in alphabetical order; literal breakpoints at 600, 900 and 1200px.
- Meet WCAG 2.1 AA, stay responsive down to 320px, and respect `prefers-reduced-motion`.
- A page-specific component gets its own folder under the page (`src/pages/Home/PaymentDemo/`).
- When a page grows, group its files by role: `screens/` (one per route), `components/`, `hooks/` and `data/` (JSON files and fetch/storage boundaries). Config files (`fields.ts`, `validation.ts`) stay at the page root (see `src/pages/CreateAccountSetup/`).
- Data sits in a file beside the page or component that uses it (`products.ts`, `PaymentDemo/demo.ts`).

## SEO

All meta, Open Graph and JSON-LD tags are static in `index.html` (link-preview crawlers don't run JS), with one `<title>`. The site is hidden with `noindex` and `robots.txt` `Disallow: /` until launch.

### Launch checklist

1. Before launch, the build must write an HTML file per route (`dist/products/index.html`, …), each with its own canonical, `og:url` and `<title>`. Otherwise GitHub Pages serves real routes from `404.html` with HTTP 404 and crawlers won't index them.
2. In `index.html`, replace `https://rvarela11.github.io/pay-my-lawyer` with `https://paymylawyer.cc` (canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url` and `logo`).
3. Set `base: '/'` in `vite.config.ts`.
4. Remove the `noindex` meta tag.
5. `robots.txt`: allow all and add a `Sitemap:` line; add `sitemap.xml`.
6. Point `paymylawyer.cc` DNS at GitHub Pages, set the custom domain in the repo's Pages settings, and enable Enforce HTTPS. Deploys use Actions, so no `CNAME` file is needed.

## Rules

Ask before adding dependencies or global styles.
