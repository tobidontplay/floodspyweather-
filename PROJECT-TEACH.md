# PROJECT-TEACH.md

Teaching notes for FloodSpy Weather. A claim is included when a file, a commit, or a small piece of arithmetic supports it. Runtime behavior that was not watched is marked `[LOW]` or left as a question. Jargon is defined on first use.

Readers: the owner (a CS student learning to sound senior), a future agent, and a tutor writing a quiz.

## Mental model

FloodSpy Weather is one Next.js page that dresses up as an operations board.

Next.js is the React framework that maps files in `app/` to URLs. This repo uses the App Router: `app/page.tsx` is the URL `/`. The page file starts with `"use client"`, which means the browser runs it. There is no second program on the server that fetches weather and hands it down. `app/layout.tsx` is the HTML document around that page. `app/loading.tsx` is the framework's loading slot, and it returns `null`, so the framework has nothing to show while the page loads.

The page keeps a handful of `useState` values: which tab, which city, whether the sidebar is open, whether particles are on, and a time-slider number. On first render an effect copies eight weather objects and eight news objects into state. Those objects are written in the file. A comment above them says "Simulate fetching data". The simulation is the assignment itself. `fetch` does not appear anywhere in the TypeScript.

A second effect watches `selectedLocation`. When it changes, the page waits one second and stores a new object built with `Math.random()`. That is why a city can be "critical" on one click and "stable" on the next. The globe markers carry a different population string, written as a constant in `components/world-map.tsx`. The detail view does not read that constant.

The 3D view is a sphere. React Three Fiber (the library `@react-three/fiber`) lets React describe a WebGL scene. WebGL is the browser API that draws triangles on a canvas. The sphere's texture is painted in code onto an offscreen canvas: dark blue, random blobs, and a grid. Markers are small spheres at xyz coordinates the author typed. They are multiplied by 2 and placed in the group. There is no latitude or longitude function. The word "globe" in the README is the product name for this sphere.

Everything that says "live", "online", or "12m ago" is a string or a timer. The live feed's timer runs every 8 seconds and, when a random check passes, prepends one of two sentences. That is a client timer. It is not a socket. A WebSocket is a long-lived network connection. This repo does not open one. The September 2026 log already warned that the component name is not proof of a socket. That warning still holds.

The shadcn folder `components/ui/` is a kit of unstyled-behavior primitives (buttons, dialogs, charts) generated with the page. The page's import graph reaches about a dozen of them. The rest are in the repo because the initial commit brought the kit. Dead code is code no import reaches from the entry. `components/globe-interface.tsx` is the important case: it is a second globe, with layer buttons, and no file imports it. `docs/architecture/overview.md` still draws an arrow to it.

## Architecture

```
app/layout.tsx
  app/globals.css
  app/page.tsx          ("use client")
    ParticleRain        canvas, 200 dots, optional
    Sidebar             eight cities work; other buttons toast
    PersistentGlobe     mounted twice (CSS shows one)
      WorldMap          sphere, markers, patterns, GSAP
    WeatherCard[]       fixture alerts
    NewsCard[]          fixture headlines
    LiveFeed            fixture + setInterval + local composer
    TimelineViewer      fixture events
    LocationDetail      random snapshot + template history
```

| Fact | Evidence |
|---|---|
| One route, `/` | Only `app/page.tsx`. No `app/api/`. |
| No database | No database directory. State and constants only. `docs/architecture/data-model.md` agrees. |
| Sibling product stays separate | ADR 001. This tree has no Supabase client. |
| Docs diagram is stale | Overview names `components/globe-interface.tsx`. The page imports `components/persistent-globe.tsx`. |
| Both globe instances mount | The desktop wrapper uses `hidden lg:flex`. The mobile wrapper uses `lg:hidden`. `hidden` changes CSS display. React still runs both components' effects. Whether a given GPU drops a WebGL context is `[LOW]`; the double mount is `[HIGH]`. |
| Build will not fail on type errors | `next.config.mjs` sets `typescript.ignoreBuildErrors` and `eslint.ignoreDuringBuilds`. |

Data flow, in one sentence: the page owns the selected city, and children either receive that string as a prop or read their own constants. There is no store library and no cache.

`PersistentGlobe` creates `activeLayer` and passes `"standard"` into `WorldMap` for the life of the page. `WorldMap` knows how to draw weather, population, and risk labels, and it knows how to show storm meshes when the layer is `"weather"` or when `timeScale > 0`. The buttons that would change the layer are in the unmounted file. The time slider is the only mounted control that flips those meshes on.

## Key decisions

| Decision | Where it shows up | Consequence |
|---|---|---|
| Visual client, not the flood-report app | ADR 001, 2026-09-25, status Accepted | Agents must not wire this `project.yaml` at FloodSpy's Supabase. A merge is a later product decision. |
| Fixtures written inline | `app/page.tsx`, `live-feed.tsx`, `timeline-viewer.tsx`, `world-map.tsx` | Each panel can drift. Populations already disagree between the globe and the detail view. |
| Procedural texture instead of an image URL | `createFallbackTexture` and the `useMemo` canvases in `world-map.tsx` | The globe has no network dependency and no geographic content. |
| React range edited without the lockfile | Commits `737c08e` and `d2c21b1` touch `package.json` only | See Technologies. The commit message describes an intent. The lockfile is still the previous resolution. |
| Feature "Done" means files exist | `specs/features/001-weather-board.md` acceptance list | A tutor who quizzes "is the feature done?" must say which definition. The spec says yes. The verification log has no row. |
| Ignore type and lint errors during `next build` | `next.config.mjs` | A green build is not a typecheck. |
| v0 scaffold kept | `package.json` name `my-v0-project`, layout generator `v0.dev`, full `components/ui/` | The kit is larger than the product. Agents should trace imports before editing a UI file. |

ADR means Architecture Decision Record: a short note that says what was decided, why, and what was rejected. This repo has one real ADR and a template.

## Technologies

| Name | Plain definition | Version evidence | Why it is in this repo |
|---|---|---|---|
| TypeScript | JavaScript with a type checker. | `typescript` `5.8.3` in the lockfile. `strict: true`. | The page and components are `.tsx`. The build is configured to ignore type errors anyway. |
| React | UI library built from components and state. | `package.json` `^18.2.0`. Lockfile resolves `19.1.0`. | The whole UI. |
| Next.js | React framework: routing, bundling, `next dev` / `next build`. | `15.2.4` in both files. | Scripts `dev`, `build`, `start`, `lint`. |
| Tailwind CSS | Utility class names that compile to CSS. | `3.4.17`. | Classes like `bg-black` and `text-cyan-400` on the page. `tailwind.config.ts` also redefines some cyan and purple shades. |
| Radix UI | Accessible behavior for controls (tabs, slider, switch). shadcn copies that behavior into `components/ui/`. | Pinned package versions in `package.json`. | Tabs, slider, switch, scroll area, progress, tooltip. |
| React Three Fiber | React renderer for Three.js. | `9.1.2`. Peer dependency `react: ^19.0.0`. | `<Canvas>` in the globe. |
| drei | Helpers for fiber: camera, orbit controls, HTML labels. | `10.0.6`. Peer `react: ^19` and fiber `^9`. | `PerspectiveCamera`, `OrbitControls`, `Html`. |
| Three.js | The 3D library under fiber. | `0.175.0`. | Geometries, materials, `CanvasTexture`. |
| GSAP | An animation library. GreenSock Animation Platform. | `3.12.7`. | One `gsap.to` on globe rotation. |
| Lucide | Icon components. | `^0.454.0`. | Menu, search, weather glyphs. |

A peer dependency is a package the library expects the app to install, at a version the library was built against. It is not always installed for you. Fiber's peer on React is required. Fiber's peers on `expo` and `react-native` are marked optional in `peerDependenciesMeta`. This repo lists those optional peers as direct dependencies with version `"latest"`, and no application file imports them. The likely story is that they were added because the 3D toolkit mentioned them. That story is `[LOW]` as author intent and `[HIGH]` as a fact about the manifest: they are declared, optional for fiber, and unused by this source.

### The React split, in numbers

| File | React | date-fns |
|---|---|---|
| `package.json` after `d2c21b1` | `^18.2.0` | `^3.0.0` |
| Lockfile root `packages[""]` | `^19` | `4.1.0` |
| Lockfile `node_modules/react` | `19.1.0` | `4.1.0` under `node_modules/date-fns` |
| README and `docs/architecture/tech-stack.md` | React 19 | Not the subject of those lines |

`react-day-picker@8.10.1` declares peers `react` 16, 17, or 18, and `date-fns` 2 or 3. `@react-three/fiber@9.1.2` declares peer `react` `^19.0.0`. Both statements are in the lockfile. They cannot be satisfied by one React major version. The calendar is unused. The globe is the mounted feature. An agent that "finishes" the May 2025 downgrade by regenerating the lockfile from `package.json` moves the tree onto React 18, which is the major version fiber 9 says it does not peer. An agent that trusts the lockfile stays on React 19, which is the version the downgrade commit said it was leaving, and which `react-day-picker` 8 does not list. This audit did not run either install. The conflict is the metadata. The installer's exit code is `[MED]` until someone runs it.

`npm ci` installs from the lockfile and errors when `package.json` and the lockfile disagree. That sentence is the documented behavior of npm, not a command this audit ran. Tag the prediction `[MED]`.

## Failure modes

Each mode is a mechanism in the source. The pixel outcome of the animation fights is `[MED]` because two clocks run and this audit did not film them. The code that causes the fight is `[HIGH]`.

### 1. Timeline transport

`isPlaying` is read in the button icon and written in `togglePlayback`. Nothing else reads it. A senior description: the state is a latch for the icon, not a clock. `timeScale` in this component is a different variable from the page's time slider. It is rendered into a toast sentence.

`navigateDate` calls `setCurrentDate` and then filters with `currentDate` from the render that built the function. React state updates are visible on the next render, not on the next line. The list never consults `currentDate` at all. It maps `filteredEvents`, which is filtered by city only.

### 2. Focus tween versus the render loop

`useFrame` runs once per frame inside fiber and sets:

```
rotation.y = clock.getElapsedTime() * rotationSpeed * 0.5
```

That is an absolute angle, proportional to time since load. `gsap.to` animates the same `rotation.y` toward an angle derived from the marker. On every later frame the assignment runs again. A tween cannot hold a property that another loop overwrites with a fresh absolute value.

Changing `rotationSpeed` on hover has the same shape. Angle equals time times speed. If speed changes, the angle jumps, because the code does not integrate speed over time. It recomputes from zero.

### 3. Toasts

`hooks/use-toast.ts` keeps an array outside any one component and exposes `toast()`. `components/ui/toaster.tsx` is the component that maps that array to DOM nodes. `app/layout.tsx` does not render it. Call sites still run. The visitor's screen has no node subscribed to the store. Search "not found", the bell, settings, and the sidebar menus all use this path.

### 4. Two canvases

React mounts children even when a parent has `display: none`, unless the component is omitted with a condition. The page always renders both `PersistentGlobe` elements and uses Tailwind to hide one. Two `<Canvas>` elements mean two WebGL contexts created when the effects run. Context limits are machine-specific. Tag the risk `[LOW]` and the mount `[HIGH]`.

### 5. Particle cleanup

`requestAnimationFrame` schedules the next draw. The effect's cleanup removes the resize listener and does not keep the frame id. Unmounting the component (the particle switch) drops the React tree and leaves the callback chain holding the canvas and context. That is a leak of work, visible in the cleanup function.

### 6. Random detail

`Math.random()` inside the selection effect means the detail view is not a function of the city name. Tests would flake. A visitor cannot quote a number twice. The globe's `population` field is unused by this effect.

### 7. A build that hides the failure

`ignoreBuildErrors` means `next build` can emit a production bundle while TypeScript is unhappy. Combined with no test script, the repo has no automatic referee for the bugs above.

### 8. Stale teaching surfaces

An agent that trusts `docs/architecture/overview.md` will edit `globe-interface.tsx` and never see the page change. An agent that trusts `docs/architecture/tech-stack.md` will say React 19, which matches the lockfile and the README and disagrees with `package.json`. An agent that trusts `AGENTS.md` §1 will say the last commit was 2025-05-03. The last app commit was that day. The last commit on `main` is the 2026-09-26 merge `f137f45`.

## Conventions

| Convention | What to do |
|---|---|
| Plan before code | `AGENTS.md`: a feature needs `specs/features/NNN-name.md` before implementation. `001` already exists and its acceptance bar is file existence. A behavior fix needs a tighter spec or an updated acceptance list. |
| Do not invent an API | ADR 001 and `docs/architecture/api.md`. A URL that is not in the tree does not go in the docs. |
| Logging | Next AI log number after this audit is `0003`. Template: `docs/ai-log/entries/0000-template.md`. Index: `docs/ai-log/index.md`. |
| Verification | A row in `docs/verification.md` with tests, manual, and opinion. `feat-001` must not be marked `accepted` without the user. |
| Frontmatter | Feature stage lives in the YAML block at the top of `specs/features/*.md`. Prose status lines in the same file can drift. They already have: body says Status Done, validation is unknown. |
| Imports | `@/*` maps to the repo root (`tsconfig.json` paths). |
| Styling | Tailwind on the component. Shared tokens in `app/globals.css`. Do not revive `styles/globals.css` without a reason. It is the unused sheet. |
| Data | If a provider is added, put the URL in one module and name it in `docs/architecture/api.md` in the same change. The case study asks for that. |
| UI kit | Edit `components/ui/*` only when the page imports that file. Prefer the app components in `components/*.tsx` for product behavior. |
| Identity | Repo slug includes the trailing hyphen. `package.json` name `my-v0-project` is the scaffold name, not the product name. |

## Open questions

The owner-facing list is in `PROJECT-GOALS.md`. These are the ones a tutor can still ask after reading the code, because the code does not answer them.

| Question | Why the code is silent | Tag if you guess |
|---|---|---|
| Is paused the intended fleet state? | No status field in `project.yaml`. The brief for this audit says paused. | `[LOW]` |
| Are fixtures the product? | TODO is open. Screen copy says real-time. Case study says the feed is unconfirmed. | `[LOW]` |
| Did the author mean React 18 or React 19? | Commit message says 18. Lockfile says 19. README says 19. | `[LOW]` |
| Were Expo packages added only to quiet fiber's optional peers? | They match the optional peer names and are `"latest"`. No comment says so. | `[LOW]` |
| Does the zoom button fight OrbitControls? | Both write the camera. Not watched. | `[LOW]` |
| Does the GSAP tween flash for one frame before `useFrame` overwrites it? | Two animation clocks. Not filmed. | `[LOW]` |
| Does `npm ci` fail today? | Manifests disagree. Command not run. | `[MED]` as a prediction, `[LOW]` as an observed exit code. |
| Would fiber 9 render on React 18? | Peer says `^19`. Not run. | `[LOW]` |
| Is the GSAP standard license acceptable for this public repo? | The lockfile records GSAP's license note. This audit is not a legal opinion. | `[LOW]` |
| What port should the monitor use? | `null`. | `[LOW]` |
| Should tests exist? | Brief says out of scope. TODO says someday. | `[LOW]` |

## Claims a tutor should not treat as proven

| Claim | Why it is not proven |
|---|---|
| The page paints in a browser. | No server was started. |
| `npm ci` exits non-zero. | Inferred from npm's sync rule and the two files. |
| The globe fails to focus, as a visual fact. | The overwrite is in the source. The frame was not recorded. |
| Two canvases exhaust WebGL. | The double mount is certain. The failure depends on the GPU. |
| The owner wants a real flood tool. | The case study and the fiction copy point at a demo. The README says monitoring. The owner has not chosen. |
| Fleet status is stored in the repo. | It was supplied with the audit task. |
| Personal identity beyond git trailers. | App commits say `User <user@example.com>`. One docs commit carries a co-author trailer. That is the whole record. |
