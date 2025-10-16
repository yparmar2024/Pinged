<!-- Copilot instructions for the Pinged frontend (Expo + TypeScript) -->

# Copilot instructions — frontend

Short, actionable notes to help an AI assistant make productive code changes in this Expo + React Native (expo-router) TypeScript project.

- Project type: Expo app using expo-router + React Navigation. Entry point is `app/` (file-based routing). TypeScript config uses the `@/*` path alias to root.
- Run & dev: use `npm run start` (maps to `expo start`). Platform flags: `npm run ios`, `npm run android`, `npm run web`.
- Quick reset: `npm run reset-project` runs `scripts/reset-project.js` and will move existing app files to `app-example` or delete them (prompted).

Key architectural notes

- Routing: File-based routing under `app/` (see `app/_layout.tsx` and `(tabs)/_layout.tsx`). Modals are ordinary routes (e.g. `app/modal.tsx`) and are wired in `app/_layout.tsx` via Stack screens.
- Theming: App uses a simple theme system. See `constants/theme.ts`, `hooks/use-color-scheme.ts`, and `hooks/use-theme-color.ts`. Components use `@/components/themed-*` helpers to pick light/dark colors.
- Icons: Uses SF Symbols names in code but maps to MaterialIcons for Android/Web in `components/ui/icon-symbol.tsx`. When adding new SF Symbol names, update the MAPPING there.
- Native vs Web: Platform-specific behavior exists (e.g. `use-color-scheme.web.ts` for hydration, `icon-symbol.ios.tsx` fallback file). Prefer cross-platform-safe APIs unless implementing platform-specific files.
- Firebase: `firebase` is a dependency but `config/firebaseConfig.ts` is empty. If integrating Firebase, follow Expo web/native considerations (do not commit secrets; prefer env files and `process.env` with build-time injection).

Project conventions and patterns

- Absolute imports use `@/` root alias (configured in `tsconfig.json`). Use `@/components/...`, `@/hooks/...`, etc.
- UI primitives: `ThemedView` and `ThemedText` are used pervasively. Prefer them for new screens to ensure correct theming.
- Tab bar: Tabs use a custom `HapticTab` button (see `components/haptic-tab.tsx`). When adding tabs, wire icons via `components/ui/icon-symbol.tsx`.
- Styling: Inline StyleSheet objects are used frequently. Keep component styles local and small; follow existing style keys (e.g., `titleContainer`, `stepContainer`).
- Code generation / resets: Avoid editing `scripts/reset-project.js` unless intentionally changing reset behavior. The starter intends to be forked as a template.

Examples (how to make small, correct edits)

- Add a new screen route: create `app/screens/MyFeature.tsx` and export a default component. To add a tab, create `app/(tabs)/myfeature.tsx` and add a `Tabs.Screen` entry in `(tabs)/_layout.tsx`.
- Use themed colors: const bg = useThemeColor({ light: 'white', dark: 'black' }, 'background') or use `ThemedView`.
- Add an icon mapping: update `MAPPING` in `components/ui/icon-symbol.tsx` mapping SF names to Material icon names.

Developer workflows & commands (macOS / zsh)

- Install: `npm ci` (uses package-lock.json). Project expects Node 18+.
- Start dev server: `npm run start` (open Expo UI) or `npm run ios` / `npm run android` / `npm run web`.
- Lint: `npm run lint` (runs `expo lint`).
- Reset app template: `npm run reset-project` (interactive; moves current `app/` to `app-example`).

Edges & gotchas an AI should watch for

- There are no test suites in this repo. Any change should be validated by running the Expo dev server locally.
- `config/firebaseConfig.ts` is present but empty — don't assume Firebase is configured yet. If adding keys, use env vars and add `.env*.local` to `.gitignore`.
- Many components rely on the `@/` path alias; updating tsconfig paths requires coordinating IDE settings and imports.
- Reanimated and native modules: `react-native-reanimated` is installed and imported once in `app/_layout.tsx` (`'react-native-reanimated'`). Keep its import at top-level in layout to avoid runtime issues.

Files to inspect for context when changing code

- Routing & layout: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`
- Theming: `constants/theme.ts`, `hooks/use-theme-color.ts`, `components/themed-*` files
- Utilities & platform helpers: `components/ui/icon-symbol.tsx`, `components/haptic-tab.tsx`
- Project scripts: `package.json`, `scripts/reset-project.js`

If uncertain, run these checks locally

- Start Expo dev server and open the platform (iOS/Android/Web) to verify UI changes.
- Run `expo doctor` from the repo root if native module errors appear.

If you update this file: try to keep it short and include concrete file references or command examples. Ask the repo owner before changing global build or reset scripts.
