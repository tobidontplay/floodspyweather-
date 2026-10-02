# PROJECT-STATE.md

Inventory of `tobidontplay/floodspyweather-` as of 2026-10-01. Tables only. Confidence tags: `[HIGH]` the file says this. `[MED]` this follows if the framework behaves as its own peer metadata and React rules say. `[LOW]` not executed, or the repo never states it.

| Rule | Value |
|---|---|
| Method | Static read of the tree, `git log`, and `package-lock.json`. No dev server. No `npm install`. No browser. |
| Runtime proof | Absent. Any row about pixels, WebGL contexts, or `npm ci` exit codes is `[LOW]` or `[MED]`, never `[HIGH]`. |
| Fleet status | The audit brief says Ariadne fleet status is paused. The repo has no fleet-status field. `project.yaml` sets `auto_start: false`. |
| App vs docs | Application files last changed in `d2c21b1` (2025-05-03). Documentation last changed in merge `f137f45` (2026-09-26). |

## Identity

| Field | Value | Evidence | Tag |
|---|---|---|---|
| Product name | FloodSpy Weather | `README.md`, `AGENTS.md` | `[HIGH]` |
| npm package name | `my-v0-project` version `0.1.0`, `private: true` | `package.json` | `[HIGH]` |
| GitHub slug | `tobidontplay/floodspyweather-` (trailing hyphen is part of the name) | `project.yaml`, `git remote` | `[HIGH]` |
| Visibility | Public | `AGENTS.md` | `[HIGH]` |
| Generator mark | Layout metadata title `v0 App`, description `Created with v0`, generator `v0.dev` | `app/layout.tsx` | `[HIGH]` |
| Owner account | GitHub `tobidontplay` | `AGENTS.md`, `project.yaml` | `[HIGH]` |
| App-commit author string | `User <user@example.com>` on the three May 2025 commits | `git log` | `[HIGH]` |
| Docs-commit co-author trailer | `Tobi Aribo <tobidontplay@users.noreply.github.com>` on `c2f2ed7` | `git log` | `[HIGH]` |
| Commit count on `main` | 5: `55d77af` initial app, `737c08e` date-fns range, `d2c21b1` React range, `c2f2ed7` Ariadne docs, `f137f45` merge of those docs | `git log --oneline` | `[HIGH]` |
| `AGENTS.md` commit sentence | Says "Three commits. Last commit 2025-05-03." That sentence matches the app history and is stale against the two 2026 doc commits. | `AGENTS.md` §1 vs `git log` | `[HIGH]` |
| Last application edit | 2025-05-03, `package.json` only (`d2c21b1`) | `git log` | `[HIGH]` |
| Last tree edit | 2026-09-26, docs and Ariadne files | `f137f45` | `[HIGH]` |
| Ariadne fleet status | Paused, per this audit's task brief. Not stored in the repo. | Task brief; `TODO.md` still asks whether the repo stays in the fleet | `[MED]` |
| `project.yaml` path comment | `/agent/repos/floodspyweather-` marked inferred | `project.yaml` | `[HIGH]` |
| Port | `null` in `project.yaml`. `next.config.mjs` does not set one. | `project.yaml`, `next.config.mjs` | `[HIGH]` |
| Env contract | `project.yaml` names `.env.local`. No source file reads `process.env`. No `.env.example`. | `project.yaml`; ripgrep of `*.ts`/`*.tsx` | `[HIGH]` |
| CI | `project.yaml` `github.ci: null`. No `.github/` workflows. | `project.yaml`; file search | `[HIGH]` |
| Feature spec stage | `feat-001` `stage: implemented`, `status: Done`, `verified_by: null`, tests/manual/user_opinion `unknown` | `specs/features/001-weather-board.md` | `[HIGH]` |
| Verification log | Header plus an empty table | `docs/verification.md` | `[HIGH]` |

## Stack

| Layer | Declared in `package.json` | Resolved in `package-lock.json` | What the running page imports | Tag |
|---|---|---|---|---|
| Language | TypeScript `^5` (dev) | TypeScript `5.8.3` | `strict: true` in `tsconfig.json`. `next.config.mjs` sets `typescript.ignoreBuildErrors: true`. | `[HIGH]` |
| App framework | `next` `15.2.4` | `15.2.4` | App Router: `app/page.tsx`, `app/layout.tsx`, `app/loading.tsx`. No `pages/`. No `app/api/`. | `[HIGH]` |
| UI library | `react` `^18.2.0`, `react-dom` `^18.2.0` | Lock root still says `react: ^19`, `react-dom: ^19`. `node_modules/react` and `react-dom` are `19.1.0`. | Page is `"use client"`. | `[HIGH]` |
| React types | `@types/react` `^18.2.0`, `@types/react-dom` `^18.2.0` | Lock root still says `@types/react: ^19`, `@types/react-dom: ^19` | Types only | `[HIGH]` |
| README / tech-stack doc | README and `docs/architecture/tech-stack.md` say React 19 | Lockfile matches that sentence. `package.json` does not. | Three different answers exist in the tree. | `[HIGH]` |
| 3D | `three` `latest`, `@react-three/fiber` `latest`, `@react-three/drei` `latest` | `three` `0.175.0`, fiber `9.1.2`, drei `10.0.6` | `components/world-map.tsx`, `components/persistent-globe.tsx` | `[HIGH]` |
| Fiber peer | Not written in `package.json` | fiber `9.1.2` peer `react: ^19.0.0`, `react-dom: ^19.0.0`, `three: >=0.156`. `expo`, `expo-asset`, `expo-file-system`, `expo-gl`, `react-native` are optional peers. | The React 18 edit in `package.json` disagrees with this peer. | `[HIGH]` |
| drei peer | Not written in `package.json` | drei `10.0.6` peer `@react-three/fiber: ^9`, `react: ^19`, `three: >=0.159` | Same split | `[HIGH]` |
| Motion | `gsap` `latest` | `3.12.7` | `gsap.to` in `components/world-map.tsx` | `[HIGH]` |
| Style | Tailwind `^3.4.17` (dev), `tailwindcss-animate`, Radix packages pinned, `lucide-react` `^0.454.0`, `class-variance-authority`, `clsx`, `tailwind-merge` | Tailwind `3.4.17` | `app/globals.css`, `tailwind.config.ts`, `components.json` (shadcn schema) | `[HIGH]` |
| Date widgets | `date-fns` `^3.0.0`, `react-day-picker` `8.10.1` | Lock root `date-fns: 4.1.0`. Resolved `date-fns` `4.1.0`. `react-day-picker` `8.10.1` peers: `date-fns` `^2.28.0 \|\| ^3.0.0`, `react` `^16.8 \|\| ^17 \|\| ^18`. | Only `components/ui/calendar.tsx` imports `react-day-picker`. The page never imports that file. | `[HIGH]` |
| Forms kit | `react-hook-form`, `@hookform/resolvers`, `zod` | Present in the lockfile | Only `components/ui/form.tsx` imports `react-hook-form`. Page does not import it. | `[HIGH]` |
| Charts | `recharts` `2.15.0` | Locked with the initial commit | Only `components/ui/chart.tsx`. Page does not import it. | `[HIGH]` |
| Themes | `next-themes` `^0.4.4` | Locked | `components/theme-provider.tsx` and `components/ui/sonner.tsx`. Neither is imported by `app/layout.tsx`. | `[HIGH]` |
| Native stack | `expo`, `expo-asset`, `expo-file-system`, `expo-gl`, `react-native`, all `latest` | expo `52.0.46`, expo-asset `11.0.5`, expo-file-system `18.0.12`, expo-gl `15.0.5`, react-native `0.79.1` | No `*.ts`/`*.tsx` file imports them. They match fiber's optional peers. | `[HIGH]` |
| Lint | Script `next lint`. `eslint.ignoreDuringBuilds: true`. | No `eslint` package in `package.json`. No eslintrc file. | Lint script is a name without a configured linter in the tree. | `[HIGH]` |
| Tests | No `test` script | No test runner in `package.json` | No `*.test.*` or `*.spec.*` files | `[HIGH]` |
| Node version | Not pinned | Not pinned | No `.nvmrc`, no `engines` field | `[HIGH]` |
| Lockfile sync | `package.json` and the lockfile root `packages[""].dependencies` disagree on React, React DOM, their type packages, and `date-fns` | `737c08e` and `d2c21b1` edited `package.json` only. `package-lock.json` last changed in `55d77af`. | `npm ci` sync behavior was not executed. | `[HIGH]` for the mismatch. `[MED]` that a current npm will refuse `npm ci` on this pair. |

## Components

| Component | File | Lines | Reachable from `app/page.tsx` | Role in the tree | Tag |
|---|---|---|---|---|---|
| Home page | `app/page.tsx` | 526 | Root client page | Holds fixture arrays, tab state, search, and composes every mounted panel | `[HIGH]` |
| Root layout | `app/layout.tsx` | 20 | Yes | HTML shell. Imports `./globals.css`. Does not mount `Toaster` or `ThemeProvider`. | `[HIGH]` |
| Loading UI | `app/loading.tsx` | 3 | Next.js convention | Returns `null` | `[HIGH]` |
| Global CSS | `app/globals.css` | 121 | Yes | Tailwind layers, cyberpunk scrollbar, `.glitch` keyframes | `[HIGH]` |
| Unused global CSS | `styles/globals.css` | 94 | No import found | Default shadcn light theme variables. Layout does not import this file. | `[HIGH]` |
| `cn` helper | `lib/utils.ts` | 6 | Via UI primitives | `twMerge(clsx(...))` | `[HIGH]` |
| Persistent globe | `components/persistent-globe.tsx` | 80 | Yes, twice | R3F `Canvas`, zoom buttons, `WorldMap`. `activeLayer` state is created and never updated. | `[HIGH]` |
| World map | `components/world-map.tsx` | 579 | Via persistent globe | Procedural sphere, 8 marker groups, GSAP focus tween, weather meshes | `[HIGH]` |
| Globe interface | `components/globe-interface.tsx` | 109 | No importer | Near-copy of the persistent globe plus Standard/Weather/Population/Risk buttons | `[HIGH]` |
| Weather card | `components/weather-card.tsx` | 115 | Yes | Renders one fixture alert. "Updated: 12m ago" is a constant. | `[HIGH]` |
| News card | `components/news-card.tsx` | 147 | Yes | Fixture headline plus one shared body paragraph. Save is component state. Share and View call `toast`. | `[HIGH]` |
| Live feed | `components/live-feed.tsx` | 369 | Yes | `INITIAL_FEED` plus `setInterval` every 8s. Composer writes React state. | `[HIGH]` |
| Timeline | `components/timeline-viewer.tsx` | 401 | Yes | 12 fixture events. Date chrome, play button, speed slider. | `[HIGH]` |
| Particle rain | `components/particle-rain.tsx` | 98 | Yes, when `showParticles` is true | 200 canvas dots. Cleanup removes the resize listener and does not cancel `requestAnimationFrame`. | `[HIGH]` |
| Sidebar | `components/sidebar.tsx` | 234 | Yes | Location list calls `onSelectLocation`. Other menu buttons call `toast`. | `[HIGH]` |
| Location detail | `components/location-detail.tsx` | 609 | Yes, when a location tab is active | Overview, weather, news, history. History copy is a year template. | `[HIGH]` |
| Glitch text | `components/glitch-text.tsx` | 71 | Yes | Swaps characters on a timer and on hover | `[HIGH]` |
| Theme provider | `components/theme-provider.tsx` | 11 | No importer | Wraps `next-themes` | `[HIGH]` |
| Toast hook | `hooks/use-toast.ts` | 194 | Yes | In-memory toast store, limit 1 | `[HIGH]` |
| Toast renderer | `components/ui/toaster.tsx` | 35 | No importer | Would render the hook's toasts. Nothing mounts it. | `[HIGH]` |
| Mobile hook | `hooks/use-mobile.tsx` | 19 | Only from `components/ui/sidebar.tsx` | Breakpoint 768. That sidebar file is the shadcn sidebar, not `components/sidebar.tsx`. | `[HIGH]` |
| Duplicate mobile hook | `components/ui/use-mobile.tsx` | 19 | No importer outside itself | Same 768 breakpoint as `hooks/use-mobile.tsx` | `[HIGH]` |
| Duplicate toast hook | `components/ui/use-toast.ts` | Present | No app importer | Second copy of the shadcn toast store | `[HIGH]` |
| shadcn primitives the page reaches | `components/ui/{avatar,badge,button,card,input,label,progress,scroll-area,slider,switch,tabs,toast,tooltip}.tsx` | Various | Yes | Used by the panels above. `progress.tsx` accepts `indicatorClassName`, which location detail passes. | `[HIGH]` |
| shadcn primitives nothing in the page tree imports | accordion, alert, alert-dialog, aspect-ratio, breadcrumb, calendar, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, menubar, navigation-menu, pagination, popover, radio-group, resizable, select, separator, sheet, sidebar, skeleton, sonner, table, textarea, toggle, toggle-group | `components/ui/` | No | Scaffold from the initial v0 commit. `ui/sidebar.tsx` is 763 lines and is a different component from `components/sidebar.tsx`. | `[HIGH]` |

## Capabilities

Status words: `done`, `partial`, `broken`, `planned`, `absent`.

| ID | Capability | Status | What the code does | Tag |
|---|---|---|---|---|
| shell | Cyberpunk board shell: header, tabs, footer, sidebar chrome | `partial` | `app/page.tsx` renders the shell from local state. Footer text `SYS.STATUS: ONLINE` and `DATA REFRESH: 12:43:21` are string literals. | `[HIGH]` |
| globe | 3D globe the visitor can orbit | `partial` | `PersistentGlobe` mounts a Canvas and `WorldMap` draws a sphere of radius 2 with a canvas texture of noise and grid lines. Eight markers use hand-written xyz triples scaled by 2. OrbitControls allow rotate, pan, zoom. | `[HIGH]` |
| geography | Markers sit on real cities | `absent` | No latitude, longitude, or GeoJSON. City names are fiction (Neo Tokyo, Quantum Rio, and six others). | `[HIGH]` |
| globe-layers | Standard / weather / population / risk layers | `broken` | Buttons exist in `GlobeInterface`. The mounted globe keeps `activeLayer` at `"standard"` and never calls the setter. Hover labels for the other layers are therefore unreachable on the page. | `[HIGH]` |
| time-scale | Time slider changes the forecast | `partial` | Slider state is `0..100` and the label shows `+Nh`. `WeatherPatterns` adds a small rotation when `timeScale > 0` and becomes visible for that reason. Weather card numbers do not change. | `[HIGH]` |
| globe-focus | Selecting a city turns the globe to face it | `broken` | A `gsap.to` writes `rotation.y`. The `useFrame` loop assigns `rotation.y = elapsedTime * rotationSpeed * 0.5` every frame, which replaces an absolute angle. Steady state follows the frame loop. | `[HIGH]` for the two writers. `[MED]` for the on-screen result, because the two animation clocks were not watched in a browser. |
| weather-cards | Weather alert cards | `partial` | Eight objects are assigned in a `useEffect` in `app/page.tsx`. Fields: id, location, severity, type, temperature, humidity, windSpeed. No fetch. | `[HIGH]` |
| news | News archive | `partial` | Eight fixture articles. Every card renders the same body sentence about "the ongoing environmental crisis". Share and View are toasts. Save flips local state. | `[HIGH]` |
| live-feed | Live updates | `partial` | Five seed items. An 8 second interval sometimes prepends one of two sentences. The composer appends to the same array, capped at 20 for generated items. The green "Connected" label is unconditional. | `[HIGH]` |
| timeline | Historical timeline | `partial` | Twelve fixture events dated 2077-05-11 through 2077-05-15. The list renders `filteredEvents` and does not filter that list by `currentDate`. | `[HIGH]` |
| timeline-playback | Play, pause, and time scale move through history | `broken` | `isPlaying` toggles the icon and a toast string. No effect reads `isPlaying`. `timeScale` is only interpolated into that toast. Skip buttons call `navigateDate`. | `[HIGH]` |
| timeline-date-nav | Day arrows change which events are listed | `broken` | `navigateDate` calls `setCurrentDate` and then filters with the old `currentDate` from the closure. The list itself is not date-filtered. | `[HIGH]` |
| particle-rain | Particle rain | `partial` | Canvas of 200 particles. A switch in the globe controls mounts or unmounts it. The animation frame id is not cancelled in the effect cleanup. | `[HIGH]` |
| location-detail | Per-city detail | `partial` | On select, a 1 second timeout stores `Math.random()` population, status, water, air, temperature, rainfall, forecast, control, and threat. Globe marker populations are a different set of constants. | `[HIGH]` |
| location-history | Per-city history | `partial` | Years 2073–2077 use one shared paragraph template. The location name appears in the intro sentence. | `[HIGH]` |
| search | Search locations | `partial` | Desktop form (`hidden md:block`) substring-matches fixture `weatherData.location` and sets `selectedLocation`. No mobile search field. | `[HIGH]` |
| chrome-actions | Notifications, settings, profile, sidebar menus other than locations | `planned` | Handlers toast "will be available in the next update" or a fixed "3 unread alerts". Badge text `3` is a literal. | `[HIGH]` |
| toasts | Visible toast feedback | `broken` | Many handlers call `toast` from `hooks/use-toast.ts`. `app/layout.tsx` never renders `components/ui/toaster.tsx` or the sonner toaster. | `[HIGH]` |
| data-provider | Named weather or news source | `absent` | No `fetch`, no `process.env`, no Supabase client, no `app/api`. `docs/architecture/api.md` says no HTTP routes were found. | `[HIGH]` |
| persistence | Saved reports, bookmarks, or feed posts survive reload | `absent` | React `useState` only. `docs/architecture/data-model.md` says there is no persisted store. | `[HIGH]` |
| auth | Accounts | `absent` | No auth middleware, no session code. `docs/architecture/security.md` says none was found. Profile button is a toast. | `[HIGH]` |
| http-api | Server endpoints | `absent` | No `app/api`, no route handlers | `[HIGH]` |
| tests | Automated tests | `absent` | No test files, no test script. `project.yaml` test field is a TODO string. | `[HIGH]` |
| ci-deploy | CI and a deployment manifest | `absent` | No workflow files, no Dockerfile, no Vercel project file. `docs/architecture/deployment.md` says no workflow and no port. | `[HIGH]` |
| install-contract | One install story | `broken` | `package.json` and `package-lock.json` name different React and date-fns ranges. Fiber 9 and drei 10 peers require React 19. The May 2025 "downgrade" commits did not rewrite the lockfile. | `[HIGH]` |
| theme | Light/dark theme provider | `absent` | `ThemeProvider` is unmounted. The page hard-codes black and cyan classes. CSS still defines `.dark` variables. | `[HIGH]` |
| camera-report | Photo report from the live feed | `planned` | Camera button toasts that the function arrives in the next update | `[HIGH]` |
| article-view | Full article page | `planned` | View button toasts the same future tense | `[HIGH]` |
| share | Share an article | `planned` | Share button toasts the same future tense | `[HIGH]` |

## Endpoints

| Method | Path | Handler | Status | Tag |
|---|---|---|---|---|
| — | `/` | `app/page.tsx` via the App Router | The only page. Client component. | `[HIGH]` |
| — | none | No `route.ts`, no `pages/api` | `absent` | `[HIGH]` |
| — | WebSocket or SSE | No client constructor | `absent`. The live-feed filename is not a socket. | `[HIGH]` |

## External dependencies

| Dependency | Kind | Used by mounted code | Notes | Tag |
|---|---|---|---|---|
| npm registry packages in `package.json` | Install-time | Mixed. See Stack. | Several are only reachable from unused shadcn files or from no file. | `[HIGH]` |
| Weather HTTP API | Runtime data | No | No URL in source or in `docs/architecture/api.md` | `[HIGH]` |
| Supabase or the sibling `floodspy` database | Runtime data | No | ADR 001 says this repo does not point `project.yaml` at FloodSpy's Supabase | `[HIGH]` |
| Map tile or Earth texture host | Runtime asset | No | Earth and cloud textures are drawn on an offscreen canvas inside `world-map.tsx` | `[HIGH]` |
| `/placeholder.svg`, `/placeholder-user.jpg` | Static files in `public/` | News cards and live-feed avatars | Both files are in `git ls-files public/` | `[HIGH]` |
| Paid API | None referenced | No | `docs/workflow/cost-log.md` has a template row only | `[HIGH]` |

## Data model

There is no database. Shapes below live in module constants or `useState`.

| Entity | Fields the code actually stores | Where | Survives reload | Tag |
|---|---|---|---|---|
| Weather alert | `id`, `location`, `severity`, `type`, `temperature`, `humidity`, `windSpeed` | `useState` set once in `app/page.tsx` | No. Reloading re-runs the same literals. | `[HIGH]` |
| News item | `id`, `title`, `location`, `timestamp`, `source`, `category` | Same effect | No | `[HIGH]` |
| News body | One shared sentence, not a field | `components/news-card.tsx` | Constant | `[HIGH]` |
| Globe marker | `name`, `position[3]`, `severity`, `color`, `population`, `events`, `alerts` | `LOCATIONS` in `world-map.tsx` | Constant. Populations differ from location-detail's random string. | `[HIGH]` |
| Weather pattern | `type`, `position`, `rotation`, `radius` or `size`, `color`, `opacity` | `WEATHER_PATTERNS` in `world-map.tsx` | Constant | `[HIGH]` |
| Location snapshot | `name`, `population`, `status`, `waterLevel`, `airQuality`, `temperature`, `rainfall`, `forecast`, `controlStatus`, `threatLevel` | `setTimeout` in `app/page.tsx` using `Math.random()` | No. A new click rolls new numbers. | `[HIGH]` |
| Live item | `id`, `type` (`alert` \| `social` \| `update`), `content`, `timestamp`, `severity`, `location`, optional `user`, `verified` | `INITIAL_FEED` plus `setFeed` | No | `[HIGH]` |
| Timeline event | `id`, `title`, `date`, `time`, `location`, `category`, `description` | `TIMELINE_EVENTS` | Constant. Detail pane adds the same impact numbers for every event: Severe, 42 km², Critical. | `[HIGH]` |
| Sidebar location | string name | `LOCATIONS` in `sidebar.tsx` | Same eight names as the weather fixtures | `[HIGH]` |
| Bookmark | boolean `isSaved` | `NewsCard` state | No | `[HIGH]` |
| Toast | title, description, variant | Module store in `hooks/use-toast.ts` | No, and nothing renders it | `[HIGH]` |

## Tests

| Check | Result | Tag |
|---|---|---|
| Unit, integration, or e2e files | None | `[HIGH]` |
| `package.json` scripts | `dev`, `build`, `start`, `lint`. No `test`. | `[HIGH]` |
| `docs/verification.md` rows | Empty | `[HIGH]` |
| `feat-001` validation | `tests: unknown`, `manual: unknown`, `user_opinion: unknown`, `verified_by: null` | `[HIGH]` |
| This audit's runtime | Not run, by scope. "What works end to end" below is a static trace. | `[HIGH]` |

## Dead code

| Item | Why it is unused | Tag |
|---|---|---|
| `components/globe-interface.tsx` | No import. `docs/architecture/overview.md` still draws the page pointing at this file. The page imports `persistent-globe.tsx`. | `[HIGH]` |
| `components/theme-provider.tsx` | No import | `[HIGH]` |
| `styles/globals.css` | No import. `app/globals.css` is the sheet that loads. | `[HIGH]` |
| `components/ui/use-toast.ts` | App code imports `hooks/use-toast.ts` | `[HIGH]` |
| `components/ui/use-mobile.tsx` | Nothing imports it. `hooks/use-mobile.tsx` is imported only by the unused shadcn sidebar. | `[HIGH]` |
| shadcn files listed in the Components table as unreachable | No import path from `app/page.tsx` | `[HIGH]` |
| `expo`, `expo-asset`, `expo-file-system`, `expo-gl`, `react-native` | No source import. Optional peers of fiber, declared as direct dependencies at `"latest"`. | `[HIGH]` |
| `date-fns`, `react-day-picker`, `recharts`, `react-hook-form`, `zod`, `next-themes` | Reachable only through unmounted UI files, or through none | `[HIGH]` |
| `activeLayer` setter inside `PersistentGlobe` | State is initialized to `"standard"` and the setter is never referenced | `[HIGH]` |

`components/ui/toaster.tsx` is unmounted, and the toast hook is live. That pair is broken wiring, recorded under capability `toasts`, rather than a file with zero callers.

## What works end to end

Static trace only. "Works" here means the code path assigns the state the UI reads. It does not mean a browser was opened.

| Flow | Static trace | Runtime seen | Tag |
|---|---|---|---|
| Open `/` | `app/page.tsx` is the client page. Layout wraps it with v0 metadata and `app/globals.css`. | No | `[LOW]` for paint. `[HIGH]` for the file that Next would treat as the page. |
| See eight weather cards | Effect writes the eight-city array. Cards map that array. | No | `[HIGH]` for the data path. `[LOW]` for paint. |
| See news cards | Same pattern for `newsData` on the archive tab. | No | `[HIGH]` / `[LOW]` as above |
| Toggle particle rain | `showParticles` mounts or unmounts `ParticleRain`. | No | `[HIGH]` for the branch. `[LOW]` for paint. |
| Move the time slider | State updates the label and is passed into `WorldMap` as `timeScale`. | No | `[HIGH]` for the prop. `[MED]` for a visible pattern shift. |
| Pick a sidebar city | `onSelectLocation` sets `selectedLocation`. A timeout then fills `locationData` and switches the tab to `location`. | No | `[HIGH]` for the state machine. `[LOW]` for paint. |
| Search a fixture name on a wide viewport | Case-insensitive `includes` on the eight locations. A hit sets `selectedLocation`. | No | `[HIGH]` for the match. `[LOW]` for the toast the handler also fires. |
| Type into the live-feed box and press Enter | `handleSendMessage` prepends a social item whose user name is `"User"`. | No | `[HIGH]` for the state update. `[LOW]` for paint. |
| Click a timeline event | `selectedEvent` renders that event's title, date, and description, plus the shared impact numbers. | No | `[HIGH]` for the branch. `[LOW]` for paint. |

## What is broken

| ID | Failure | Evidence | Tag |
|---|---|---|---|
| B1 | Install files disagree | `package.json` React `^18.2.0` and `date-fns` `^3.0.0`. Lock root React `^19` and `date-fns` `4.1.0`. Lockfile not edited after `55d77af`. | `[HIGH]` |
| B2 | React 18 declaration fights the globe stack | fiber `9.1.2` peer `react: ^19.0.0`. drei `10.0.6` peer `react: ^19`. The downgrade commit exists to satisfy `react-day-picker` `8.10.1`, which only the unused calendar imports. | `[HIGH]` |
| B3 | Toasts never render | Call sites use the hook. Layout has no `<Toaster />`. | `[HIGH]` |
| B4 | Timeline play does not play | `togglePlayback` sets `isPlaying` and returns. | `[HIGH]` |
| B5 | Timeline day header does not filter the list | List maps `filteredEvents` with no `event.date === currentDate` check. `navigateDate` also reads stale state after `setCurrentDate`. | `[HIGH]` |
| B6 | Globe focus tween is overwritten | `useFrame` assigns `rotation.y` from elapsed time every frame. `gsap.to` targets the same property. | `[HIGH]` code. `[MED]` pixels. |
| B7 | Layer switch is not on the mounted globe | Setter unused in `persistent-globe.tsx`. Buttons live in unimported `globe-interface.tsx`. | `[HIGH]` |
| B8 | Two globe canvases are mounted together | Page renders one `PersistentGlobe` inside `hidden lg:flex` and another inside `lg:hidden`. Both are in the React tree. | `[HIGH]` for the double mount. `[LOW]` for context-loss on a real GPU. |
| B9 | Particle loop is not cancelled | Cleanup in `particle-rain.tsx` removes `resize` and does not call `cancelAnimationFrame`. | `[HIGH]` |
| B10 | Build ignores the checks that would catch the above | `eslint.ignoreDuringBuilds: true`, `typescript.ignoreBuildErrors: true` | `[HIGH]` |
| B11 | "Real-time" labels describe constants | Footer clock, card "12m ago", notification count, sidebar sensor percent, live-feed "Connected" | `[HIGH]` |
| B12 | Location numbers are a new random roll | `Math.random()` inside the selection effect | `[HIGH]` |
| B13 | Architecture diagram names the unmounted globe | `docs/architecture/overview.md` edge `Page --> Globe[components/globe-interface.tsx]` | `[HIGH]` |
| B14 | Spec says Done from file existence | Acceptance bullets in `feat-001` are "the files exist" and "the README lists those panels" | `[HIGH]` |
| B15 | Loading state is a fixed 60% bar | `app/page.tsx` loading overlay uses `style={{ width: "60%" }}` during the 1 second timeout. `app/loading.tsx` returns `null`. | `[HIGH]` |
| B16 | Hover changes rotation speed by rewriting absolute angle | `rotation.y = elapsed * speed`, so a speed change jumps the angle. | `[HIGH]` math. `[LOW]` whether a visitor notices. |
