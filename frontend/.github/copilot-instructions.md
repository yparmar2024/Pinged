<!-- Copilot instructions for the Pinged frontend (Expo + TypeScript) -->

```markdown
<!-- Copilot instructions for the Pinged frontend (Expo + TypeScript) -->

# Copilot instructions — frontend (concise)

Short, actionable facts to help an AI agent make safe, useful changes in this Expo + TypeScript app.

- Project entry: file-based routing lives in `app/`. Top-level layouts: `app/_layout.tsx` and `app/(tabs)/_layout.tsx`.
- Scripts: see `package.json` — use `npm run start|ios|android|web`. Reset helper: `npm run reset-project` -> `scripts/reset-project.js` (interactive; may move `app/` to `app-example`).
- Path alias: imports use `@/` (root). Update `tsconfig.json` if changing aliases and adjust IDE settings.

Key patterns & files (check these before editing)

- Theming: `constants/theme.ts`, `hooks/use-color-scheme.ts`, `hooks/use-theme-color.ts`, `components/themed-text.tsx`, `components/themed-view.tsx`. Prefer these for colors instead of hardcoded values.
- Routing & navigation: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`. Add screens by creating files under `app/` (e.g., `app/screens/MyFeature.tsx` or `app/(tabs)/myfeature.tsx`) and register Tabs in `(tabs)/_layout.tsx`.
- Icons: SF Symbol names are used and translated in `components/ui/icon-symbol.tsx` via a MAPPING to platform icons — update MAPPING when adding new symbol names.
- Tabs & haptics: Tab bar uses `components/haptic-tab.tsx` as `tabBarButton` — follow its props when adding custom tab buttons.
- Firebase: `config/firebase.ts` initializes Firebase from EXPO_PUBLIC_* env vars. Do not hardcode secrets; use environment variables and add local env files to `.gitignore`.

Developer commands & quick checks

- Install: `npm ci` (project expects Node 18+).
- Start: `npm run start` (or `npm run ios|android|web`).
- Lint: `npm run lint` (expo lint).
- If native errors appear: run `expo doctor` and verify `react-native-reanimated` is imported where required.

Project-specific gotchas

- `@/` imports: renaming paths or moving files commonly breaks many imports — run a global search after refactors.
- Reanimated: avoid moving or duplicating the reanimated import; keep any side-effect imports near root layout if present.
- Firebase: `config/firebase.ts` uses EXPO_PUBLIC_* env vars (see file); it's hot-reload safe (uses `getApps()` guard).

Examples (concrete)

- Add a tab screen: create `app/(tabs)/new.tsx` exporting default component, then add a `<Tabs.Screen name="new" .../>` entry in `app/(tabs)/_layout.tsx` using `IconSymbol` for icons.
- Use themed color: `const bg = useThemeColor({ light: 'white', dark: 'black' }, 'background')` or wrap with `<ThemedView>`.
- Add icon mapping: edit `components/ui/icon-symbol.tsx` MAPPING to map a new SF name to Material icon name.

When in doubt

- Run the app locally and visually verify UI changes (no test suite present).
- Ask the repo owner before changing `scripts/reset-project.js` or build-time configuration.

Keep edits short and reference files above. Ask for any missing context.

```
- Routing & layout: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`
