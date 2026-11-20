# Create Account setup wizard

## How it flows

- `CreateAccountSetup.tsx` is the layout. It renders the step indicator, the current screen (`<Outlet />`) inside one `<form>`, and Back/Next.
- The provider choice (`ProviderScreen`, its own small form in `validation.ts`) picks the path. `steps.ts` defines every screen in `SCREENS` (path, title, the fields Next checks) and each provider's order in `STAGES`. Order always comes from `STAGES`, never from numbers.
- Each provider with a form has its own React Hook Form, created in `hooks/useSetupForms.ts` from `PROVIDER_SCHEMAS` (`screens/providers/schemas.ts`), so providers never share a field. The forms live in the layout, so answers survive switching providers back and forth. "Later" has no form.
- Next (`hooks/useWizardNavigation.ts`) validates only the current screen's `fields` with `trigger`, marks them touched, then moves on and records the furthest screen reached. Opening a screen past that redirects to the furthest one. Back to the provider choice with answers opens the Start over dialog.
- Progress is in memory only (`hooks/useSetupProgress.ts`): every visit starts at the provider choice. No resume, by design.
- Routes come from `SCREENS` in `createAccountSetupRoute.tsx`. Screens with the date picker load lazily (`LAZY_SCREENS`). A screen without an element yet shows `PlaceholderScreen`.

## Validation

- Each provider's schema is in `screens/providers/<provider>/validation.ts`, built from rules shared in `screens/providers/rules.ts`.
- Beneficial owners: each owner is checked in the owner dialog's own form (`components/owners/OwnerDialog/validation.ts`), which gets `remaining` % as Yup context. `OWNERS_RULE` checks on Next that the applicant's % plus the owners' % is at most 100.

## Adding a screen

1. Add its id to `SCREEN_IDS` (`ids.ts`) and its path to `PATHS` (`src/routes/paths.ts`).
2. Add it to `SCREENS` and to the provider's `STAGES` in `steps.ts`.
3. Add its fields to the provider's `fields.ts` (as a `<SCREEN>_FIELDS` list) and its rules to the provider's schema.
4. Create the screen in `screens/providers/<provider>/` and register it in `createAccountSetupRoute.tsx` (lazily if it uses the date picker).

## Adding a provider

Add its id to `PROVIDER_IDS`, add a `screens/providers/<provider>/` folder (`fields.ts`, `validation.ts`, screens), and add an entry to `PROVIDER_SCHEMAS` with a matching `useForm` line in `useSetupForms.ts` (TypeScript fails the build if they don't match). Then add its option to `PROVIDER_OPTIONS` (`ProviderScreen`) and its `STAGES`.

## Gotchas

- Dialogs render through a portal, but React events still bubble to the wizard's `<form>`. A dialog with its own form calls `event.stopPropagation()` on submit, or it triggers Next.
- The owners screens read owners with `useWatch`: `getValues` is one render stale after `append`/`remove`. The applicant uses `getValues`, since it doesn't change on that screen.
- Don't `autoFocus` inside a MUI Dialog. Under StrictMode the focus trap moves focus to the dialog box. Focus in the transition's `onEntered` instead (`StartOverDialog`).
- Tests render the wizard in `<StrictMode>` through the real router (`CreateAccountSetup.test.tsx`).
