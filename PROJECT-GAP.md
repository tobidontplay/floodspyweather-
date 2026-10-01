# PROJECT-GAP.md

Gap means the distance between a capability the README, the spec, or the screen copy promises and the behavior the source implements. Status words match `PROJECT-STATE.md`: `done`, `partial`, `broken`, `planned`, `absent`. Severity is how hard this gap hits the stated purpose (a weather board), not how many lines it would take to change.

Evidence for every row is the file cited in `PROJECT-STATE.md`. This audit did not boot the app.

## Gap table

| ID | Capability | Status | Promise | Actual | Gap | Severity | Tag |
|---|---|---|---|---|---|---|---|
| shell | Board shell | `partial` | A monitoring console that reports system status. | Header, tabs, sidebar, and footer render from local React state. Status and clock strings are literals. | The shell looks like an instrument and reports no instrument. | Med | `[HIGH]` |
| globe | 3D view | `partial` | Interactive 3D globe (`README.md`). | A sphere, orbit controls, zoom buttons, and eight colored markers. | A sphere is on the page path. A geographic globe is not. | Med | `[HIGH]` |
| geography | Real places | `absent` | City names that echo real cities, on a "world" map. | xyz triples in `LOCATIONS`. Texture is procedural noise. | Nothing maps a city to Earth. | High if the user is meant to find a real flood. Low if the cities are fiction. | `[HIGH]` code. `[LOW]` intent. |
| globe-layers | Map layers | `broken` | `GlobeInterface` offers Standard, Weather, Population, and Risk. | Mounted globe never leaves `"standard"`. | The layer control the author wrote is on the unused component. | Med | `[HIGH]` |
| time-scale | Forecast scrubber | `partial` | Slider label `+Nh` reads as "see the future". | It toggles visibility of fixture storm meshes and adds a wobble. Card numbers stay put. | The control's label over-claims the effect. | Med | `[HIGH]` |
| globe-focus | Focus on selection | `broken` | Selecting a marker should turn the globe toward it (`gsap.to` in `world-map.tsx`). | `useFrame` assigns `rotation.y` every frame. | Two writers, one property. The frame loop's assignment is absolute. | Med | `[HIGH]` code. `[MED]` pixels. |
| weather-cards | Alert cards | `partial` | "Real-time weather monitoring". | Eight literal objects. "12m ago" is constant. | Cards are a styled list. | High | `[HIGH]` |
| news | News archive | `partial` | "News feed with weather-related articles". | Eight headlines, one shared body, toast stubs for share and view. | Headlines exist. Articles do not. | Med | `[HIGH]` |
| live-feed | Live feed | `partial` | "Live feed of weather updates". | Seed array plus `setInterval`. "Connected" is always on. | The feed is a timer. There is no network. | High | `[HIGH]` |
| timeline | Timeline list | `partial` | "Timeline viewer for historical data". | Twelve literals. Impact stats are the same for every event. | History is copy, and it is not filtered by the date header. | High | `[HIGH]` |
| timeline-playback | Playback | `broken` | Play, pause, skip, and a speed slider. | Play flips an icon. Speed is only mentioned in a toast string. | The transport does not move time. | High | `[HIGH]` |
| timeline-date-nav | Date navigation | `broken` | Arrows change the day. | Header state changes. The list does not filter by that day. The follow-up filter reads the previous day. | The header and the list diverge. | High | `[HIGH]` |
| particle-rain | Rain | `partial` | Particle rain for visual enhancement. | 200 dots. Toggle works in state. Frame loop is not cancelled. | The effect is real code. Cleanup is incomplete. | Low | `[HIGH]` |
| location-detail | City detail | `partial` | A selected place has a status. | One-second timeout, then `Math.random()`. | A second click invents a new city. | High | `[HIGH]` |
| location-history | City history | `partial` | History tab per location. | One template for years 2073–2077. | Cities do not have their own past. | Med | `[HIGH]` |
| search | Search | `partial` | "Search locations or events". | Desktop-only match against weather location names. Events are not searched. | Half the placeholder is unimplemented, and small screens have no field. | Med | `[HIGH]` |
| chrome-actions | Menus, bell, settings, profile | `planned` | Icons imply those tools. | Toasts say the next update. Badge `3` is a literal. | The controls are labels. | Low | `[HIGH]` |
| toasts | Feedback | `broken` | Those handlers tell the visitor something. | The store updates. The renderer is never mounted. | The feedback path ends in memory. | Med | `[HIGH]` |
| data-provider | Data source | `absent` | Monitoring, and the TODO that says to name a source or confirm fixtures. | No fetch, no env, no module whose job is "get weather". | The decision is unmade. The code silently chose fixtures. | Blocking | `[HIGH]` |
| persistence | Memory across reloads | `absent` | Save, reply, and citizen reports sound stored. | Component and page state. | A reload restores the seed data. | Med | `[HIGH]` |
| auth | Accounts | `absent` | A user icon and "your collection". | No session. | There is no user. | Low until a product decision says otherwise. | `[HIGH]` |
| http-api | Server API | `absent` | A monitor often has one. This repo's API doc says none was found. | No routes. | Nothing for a second client to call. | Med | `[HIGH]` |
| tests | Tests | `absent` | Verification log: shipped means tests plus a manual check plus an opinion. Brief: tests are out of scope. TODO: someday. | No tests. | The project has three policies and zero tests. | High for any claim of "done". | `[HIGH]` |
| ci-deploy | CI and deploy | `absent` | `project.yaml` leaves CI null. | No workflow, no port, no host config. | Ariadne cannot treat a green build as evidence. The build is also told to ignore type and lint errors. | High | `[HIGH]` |
| install-contract | Dependencies | `broken` | Two commits say the dependency conflict is fixed. | `package.json` and `package-lock.json` diverged in those commits. Fiber 9 requires React 19. | A fixer cannot know which file to trust. | High | `[HIGH]` |
| theme | Theme | `absent` | `next-themes` and a provider file exist. | Unmounted. Page classes are fixed. | Dead theme path. | Low | `[HIGH]` |
| camera-report | Camera | `planned` | A camera button on the feed. | Toast. | No capture API. | Low | `[HIGH]` |
| article-view | Article | `planned` | View button. | Toast. | No article route. | Low | `[HIGH]` |
| share | Share | `planned` | Share button. | Toast. | No share call. | Low | `[HIGH]` |

## Three biggest gaps

### 1. No data provider, and no decision that fixtures are enough

`app/page.tsx` comments say "Simulate fetching data" and then assign arrays. `live-feed.tsx` and `timeline-viewer.tsx` ship their own arrays. Location stats are `Math.random()`. `TODO.md` still asks the owner to name a source or confirm fixtures. `CASE-STUDY.md` says the author would put the data URL in one module on day one so a later audit can tell a demo from a monitor.

That split is the product. A demo can be honest about fiction. A monitor has to say where the numbers come from. This repo's screen copy says monitor. Its case study says demo. The code implements the demo and leaves the sentence unwritten.

### 2. The interactive half of the board does not do what the controls say

The timeline play button does not advance time. The date header does not filter events. The globe's GSAP focus fights `useFrame`. Layer buttons exist on a component the page does not mount. Toasts are written to a store the layout does not render. Search ignores events and disappears below the `md` breakpoint. Sidebar entries other than the eight cities toast a future update.

`feat-001` can still say Done, because its acceptance checks are file names. The verification log, which asks for a manual pass, is empty. The gap is between "the panel file exists" and "the control changes the thing it names."

### 3. The install contract is two contracts

`737c08e` changed `date-fns` from `4.1.0` to `^3.0.0` in `package.json` only. `d2c21b1` changed React and React DOM from `^19` to `^18.2.0`, and the type packages the same way, in `package.json` only. `package-lock.json` still records React `^19` resolved to `19.1.0` and `date-fns` `4.1.0`.

`@react-three/fiber@9.1.2` peers `react: ^19.0.0`. `@react-three/drei@10.0.6` peers `react: ^19`. `react-day-picker@8.10.1` peers React 16, 17, or 18, and `date-fns` 2 or 3. The calendar that needs `react-day-picker` is not mounted. The globe that needs React 19 is mounted. The "fix" edited the manifest toward the unused widget and left the lockfile on the globe's major version.

`next.config.mjs` sets `ignoreBuildErrors` and `ignoreDuringBuilds`. A build that succeeds under those flags does not referee this.

## Blocking gap

The blocking gap is the unnamed data source.

The README's purpose is weather monitoring. Monitoring needs a source of observations, even if that source is "these eight literals, on purpose." The code has the literals. The repo has not accepted them. `TODO.md`, `docs/architecture/api.md`, `CASE-STUDY.md`, and `docs/learning/questions.md` all still ask what fills the cards.

Until that sentence exists, an agent that adds a chart, a socket, or a second page is guessing the product. ADR 001 already forbids guessing a shared API with `floodspy`. The same discipline applies here: one module, one URL or an explicit fixture flag, named in `docs/architecture/api.md` in the same change.

The install split is the blocker for a proof that the demo boots. It is not the blocker for knowing what the app is. This audit did not run `npm ci` or `npm run dev`, so the boot failure is a `[MED]` prediction from the lockfile mismatch and the peer ranges, and the missing provider is a `[HIGH]` fact.
