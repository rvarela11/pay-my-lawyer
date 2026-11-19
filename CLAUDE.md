# CLAUDE.md

## Getting started

- `/start-ticket <number>` creates the branch, moves the ticket to In progress and summarizes it for discussion before any building.
- The setup wizard has its own `src/pages/CreateAccountSetup/CLAUDE.md` (how it flows, adding a screen or provider, gotchas).

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
- Colocate types: a type lives next to the value or code it's derived from or describes (`FIELDS` with `FieldName`, `SCREEN_IDS` with `ScreenId`, a schema with its `InferType`). Props and option types stay private to their file. No catch-all `types.ts` or `utils.ts`.
- One component per file. Never put a JSX-returning function inside a component (`const renderActions = (row) => (...)`) or a second component/JSX helper in another component's file. Make it a real component in its own file and pass it plain props and callbacks, no render-prop functions (see `components/owners/OwnersList/`: `OwnerActions`, `OwnerDetail`). A child component used by only one parent gets its own folder inside that parent's folder (`components/owners/OwnersList/OwnersTable/`); helpers the children share stay at the parent's root.
- Import across folders from `src/` with the `@/` alias (`import { PATHS } from '@/routes/paths.ts'`), set in both `vite.config.ts` (`resolve.alias`) and `tsconfig.app.json` (`paths`); change both together. Keep relative paths only for `./` and a single `../`; never climb two or more folders.
- Use type assertions (`as`) only as a last resort. First type the source (generics such as `useFormContext<Values>()`, typed hooks, type guards, `satisfies`), and if a cast is still needed, add a comment saying why. `as const` is fine. Example: the owners screens type their form with `useFormContext<UsioValues>()`, so `useWatch` and `errors` need no casts.
- Module order: imports first (packages, then `@/…` imports, then relative paths, each sorted alphabetically, case-insensitive), then types, then constants, then functions (components and hooks included), each group alphabetical (case-insensitive). A type derived from a constant sits directly under that constant. A constant that another constant reads while the module loads comes first. Keep a comment with the declaration it describes.
- Keep components focused on rendering. Move stateful logic (data loading, persistence, multi-step navigation, anything with its own state and effects) into custom hooks in a `hooks/` folder beside the component (`src/pages/CreateAccountSetup/hooks/useSetupProgress.ts`). DOM event handlers (`handleSubmit`, `handleClick`) stay in the component. Don't use container components.
- Order a component body: hooks and state, then derived values, then handlers, then `useEffect`s, then early returns (loading states, `<Navigate>` redirects) directly above the main `return`. Nothing goes between the early returns and the main `return`.
- Error messages: an empty field says "<Label> is required" ("Email is required"); a wrong format or range says how to fix it, starting with "Enter" ("Enter a valid email", "Enter a 9-digit EIN"). Check an existing page before writing new copy.
- Name a function that handles an event `handle` + the event or action (`handleClose`, `handleSubmit`), and pass it to an `on`-prefixed prop (`onClose={handleClose}`). Callback props a component accepts keep the `on` prefix (`onClick`).

## Styling

- `src/theme/` is the one place for shared styling: `palette.ts` (colors), `typography.ts` (type scale), `components.ts` (MUI component overrides and global rules). A look repeated across components belongs there, not copied into several CSS Modules.
- Typography comes from MUI (`src/theme/typography.ts` and `Typography` variants), set in Inter Tight. Don't set `font-size`, `font-weight` or `letter-spacing` in CSS; pick a variant, or change the theme. `font-variant-numeric: tabular-nums` is fine for aligning numbers.
- Lay out with MUI `Stack` (`direction`, `spacing`, `useFlexGap`) and `Grid` (`container`, `size`, `spacing`), not hand-written `display: flex|grid` CSS. Use only those props, with breakpoint objects for responsive changes (`direction={{ md: 'row', xs: 'column' }}`). Never use `sx`: alignment, margins, widths and show/hide go in the component's CSS Module through `className` (module classes win over MUI's styles because of `StyledEngineProvider injectFirst`).
- CSS Modules with `className` for a component's own visuals (colors, borders, sizes, animations). Read colors and spacing from `var(--mui-palette-*)` and `var(--mui-spacing)`.
- Global rules go only in `MuiCssBaseline` in `src/theme/components.ts`. It holds rules on elements only, not utility classes: the focus ring (`3px solid currentColor` on links, buttons and `[tabindex]`) and a list reset for `ul`/`ol` with `role='list'`, so don't add either in CSS. A shared look is a component or a theme override, not a global class. Dialog action padding also comes from the theme (`MuiDialogActions`).
- Outlined buttons (`variant='outlined'`) are a 2px ink pill that fills in when `aria-current='page'`; that comes from the theme.
- Don't use CSS Modules `composes`. Share layout through components in `src/components`: `Container` sets the side gutters and max width (`size='narrow'` for 28rem form pages, `'medium'` for the 40rem wizard), `Section` sets the vertical padding for page sections and the footer (`component='footer'`), `HeroPanel` is the accent panel at the top of a page (`fullHeight` on Home), `LabeledSection` is a section that opens with a `SectionLabel` and a wide gap, `FormPage` is the narrow heading + subtitle + alert + form page for Sign in and Create account, `VisuallyHidden` is screen-reader-only text (`component='caption'`, `'p'`, `'span'` or `'thead'`), `PageHero` is the title hero plus intro used by every page but Home, and `SectionLabel` is a section's heading with the line that grows as it scrolls in.
- To override `Section`'s padding, include the element in the selector (`section.hero`, `footer.footer`). A bare class ties with `.section`, and whichever stylesheet loads last wins.
- Palette only (`BRAND` in `src/theme/palette.ts`): accent Paid green `#9DC08B`, ink `#0D0D0D`, background `#F3F4EE` and surfaces `#FBFCF8`. The Home product rows also fill with apricot `#E8B08A`, rose `#E7A6B8`, seafoam `#93C8B8`, dusty blue `#A9BEE8` and butter `#EAD38A` on hover. No gradients.
- Button heights come from the theme (`src/theme/components.ts`): 44px, or 48px with `size='large'`. Don't set `min-height` on a `Button` in CSS.
- Paid green and the row colors fail AA as text on the off-whites. Use them as fills behind ink text (which passes AA on all of them), or for borders and decoration; never as a text color.
- Declarations in alphabetical order. Breakpoints are MUI's `sm`, `md` and `lg`: CSS writes them as literal 600, 900 and 1200px (CSS Modules can't read the theme), and JS reads `theme.breakpoints.up(…)` instead of writing pixel values.
- Meet WCAG 2.1 AA, stay responsive down to 320px, and respect `prefers-reduced-motion`.
- A page-specific component gets its own folder under the page (`src/pages/Home/PaymentDemo/`).
- When a page grows, group its files by role: `screens/` (one per route), `components/`, `hooks/` and `data/` (JSON files and fetch/storage boundaries). Config files (`fields.ts`, `validation.ts`) stay at the page root (see `src/pages/CreateAccountSetup/`). Once `components/` holds more than a handful of folders, group it too: `form/` (inputs and form layout), `wizard/` (the multi-step chrome) and one folder per feature the screens share (`owners/`).
- Screens that belong to one payment provider go in `screens/providers/<provider>/`, in a lowercase folder for that provider (`screens/providers/usio/UsioBusinessScreen/`). Screens shared by every path stay at the root of `screens/`. Component names keep the provider prefix so they stay unique. Each provider has its own React Hook Form form, so its folder has its own `fields.ts` (plain field names and each screen's field list) and `validation.ts` (its Yup schema and values type). Rules the providers share live in `screens/providers/rules.ts`. Providers with a form are listed in `screens/providers/schemas.ts` (`PROVIDER_SCHEMAS`), and `hooks/useSetupForms.ts` creates one form per entry in the layout so each provider keeps its answers. Look forms up by provider id; don't branch on each provider.
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

Ask before adding dependencies or global styles (global styles live in `MuiCssBaseline`).
