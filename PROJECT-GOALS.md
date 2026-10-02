# PROJECT-GOALS.md

Goals for FloodSpy Weather (`tobidontplay/floodspyweather-`), read on 2026-10-01. A stated goal is a sentence the repo already makes. An inferred goal is a purpose a reader might assume. Inferred goals are marked with a confidence tag and are questions until the owner answers them.

## Stated goals

| Source | Goal |
|---|---|
| `README.md` | A cyberpunk-themed weather monitoring application with a 3D globe, weather cards, a news feed, a timeline, a live feed, and particle rain. |
| `AGENTS.md` §1 | A cyberpunk weather board with those same panels. |
| `CASE-STUDY.md` | Flood information is easier to ignore as a table than as a place on a globe. The approach in this repo is a Next.js client with a Three.js globe and panels, and no report database. |
| `specs/project-brief.md` | A visual weather client. The brief says the README lists the panels and that this docs pass confirmed the component files. It says a live weather provider was not confirmed. |
| `specs/features/001-weather-board.md` | The page shows a globe, weather cards, news, a timeline, a live feed, and particle rain. The written acceptance checks are that the component files exist and that the README lists them. |
| `docs/architecture/decisions/001-separate-visual-client.md` | This repo stays the visual client. It does not point `project.yaml` at the sibling FloodSpy Supabase project. |
| `TODO.md` | Confirm the repo stays in the fleet. Name the weather data source or confirm the panels are fixtures. Confirm the port. If it stays, add the provider URL to `docs/architecture/api.md`. Tests are listed under Someday. |
| `docs/architecture/overview.md` | Name the weather API if one is intended. Decide whether this repo and `floodspy` merge or stay two repos. |

## Inferred goals

These are not written as commitments. They are the readings that the UI copy invites, and they conflict with the case study.

| Reading | Why someone would infer it | Tag |
|---|---|---|
| The board monitors real floods in real time. | README title "weather monitoring", card subtitle "Real-time monitoring of severe conditions", footer `ONLINE`, live feed "Connected". | `[LOW]` |
| The board is a fiction demo set in 2077, and the fixtures are the product. | Every city name is invented. Dates are `2077-05-*`. News sources include "CyberNet News" and "Resistance Radio". The case study says a confirmed live feed is not in the tree. | `[MED]` |
| The globe should teach geography. | The word "globe" and city names that echo real places (Tokyo, Shanghai, Delhi, Lagos, Berlin, Cairo, Sydney, Rio). | `[LOW]` |
| The May 2025 React edit was meant to make `npm install` succeed. | Commit messages say "Fix dependency conflict" for `date-fns` and for React versus `react-day-picker`. | `[MED]` |
| The September 2026 work was meant to make the repo legible to Ariadne, not to finish the product. | Those commits add docs, `project.yaml`, and an empty verification table. They do not change `app/` or `components/`. | `[HIGH]` |
| A later maintainer should keep flood reports in the other repo. | ADR 001. | `[HIGH]` as a documented decision. The owner can still reverse it. |

## Success criteria

| Criterion | Source | Met in this tree | Tag |
|---|---|---|---|
| `npm run dev` renders the globe, cards, news, timeline, feed, and rain. | `specs/project-brief.md` checkbox, still unchecked | Not run in the 2026 docs pass (`feat-001` verification plan says "Not run"). Not run in this audit. | `[HIGH]` that it is unchecked. `[LOW]` that the command succeeds. |
| If a weather API is added, the same change names it in the project brief. | `specs/project-brief.md` | No API has been added. | `[HIGH]` |
| Component files named in the README exist. | `feat-001` acceptance | The files exist. The page mounts `persistent-globe.tsx`. `globe-interface.tsx` also exists and is unimported. | `[HIGH]` |
| A feature is shipped only when tests, a manual check, and a user opinion are recorded. | `docs/verification.md` | The verification table is empty. `feat-001` `stage` is `implemented` with `verified_by: null`. | `[HIGH]` |
| The data source is either named or explicitly declared to be fixtures. | `TODO.md` Now | Neither sentence is in the code. Fixtures are what the code contains. The TODO is still open. | `[HIGH]` |
| Port is recorded. | `TODO.md`, `project.yaml` | Port is `null`. | `[HIGH]` |

The feature spec's "Done" status uses a weaker bar than the verification log. For a tutor: file existence is the spec's bar. A recorded manual check is the verification log's bar. They are different bars, and only the first one is satisfied.

## Non-goals

| Non-goal | Source |
|---|---|
| Flood-report accounts and the report database. Those are attributed to `tobidontplay/floodspy`. | `specs/project-brief.md`, ADR 001, `CASE-STUDY.md` |
| Inventing a shared API between the two repos during a docs pass. | ADR 001 alternatives |
| A test suite, as written in the project brief's Out of Scope. | `specs/project-brief.md` |
| Tests, as a Someday item, which pulls the opposite direction from the brief. | `TODO.md` |

The brief and the TODO disagree about tests. The brief says a test suite is out of scope. The TODO says tests are someday work. This audit does not pick a winner.

Other boundaries that are true of the code, and that nobody has promoted to a written non-goal:

| Boundary in the code | Tag |
|---|---|
| No login, no profile store, no saved bookmarks on a server. | `[HIGH]` |
| No server routes. | `[HIGH]` |
| No geographic dataset. | `[HIGH]` |
| No deployment config. | `[HIGH]` |

## Target user

| Reader | What the repo says | Tag |
|---|---|---|
| A visitor watching the weather UI | `specs/project-brief.md`. The same file marks the absence of an account system as inferred. | `[MED]` |
| The owner, learning to talk about this repo the way a senior engineer would | This audit's task. The learning docs (`docs/learning/`) are a glossary and a path, with mastery still at 0. | `[HIGH]` for the learning docs. `[LOW]` for any specific course outcome. |
| A future agent | `AGENTS.md` is the operating manual. `project.yaml` is the Ariadne run contract. | `[HIGH]` |
| An operator who needs a real flood alert | Not stated. The case study's problem sentence is about seeing a flood as a place. The data that would serve an operator is the thing the TODO says is unconfirmed. | `[LOW]` |

There is no account system, so there is no signed-in user to name.

## Stage

| Lens | Stage | Why |
|---|---|---|
| Product | Paused prototype | App code stopped on 2025-05-03. The audit brief says the Ariadne fleet status is paused. `auto_start` is false. | 
| Implementation of the panels | Code present, behavior unverified | `feat-001` `stage: implemented`, `target_stage: verified`, validation unknown. |
| Data | Fixture demo | Constants and `Math.random()`. No provider module. |
| Engineering hygiene | Not a releasable contract | Lockfile drift, build ignores type and lint errors, no tests, no CI, empty verification log. |
| Docs | Onboarded for Ariadne in September 2026 | `project.yaml`, specs, architecture notes, AI log entry 0001. Several of those notes still describe the README or the unmounted globe. |

Maturity word used in `PROJECT-CONTEXT.yaml`: `prototype`.

## Questions for the user

Answer these before an agent changes application code. Each one blocks a different kind of work.

1. Does this repo stay in the fleet, or is paused the lasting state? `TODO.md` already asks this.
2. Are the eight cities and the 2077 copy the product, or a skin waiting for a real feed? If they are the product, say so in `docs/architecture/api.md` and close the "name the provider" TODO. If they are a skin, name the provider in one module before any new panel.
3. Should this repo ever merge with `tobidontplay/floodspy`, or does ADR 001 stay accepted?
4. Which React is the contract: `package.json` (`^18.2.0`) or the lockfile (`19.1.0`)? The globe libraries' peers say 19. `react-day-picker@8.10.1` says 18, and the page does not mount the calendar that needs it.
5. Should `expo`, `expo-asset`, `expo-file-system`, `expo-gl`, and `react-native` remain direct dependencies? No application file imports them. Fiber lists them as optional peers.
6. What port should `project.yaml` record?
7. Is a test suite in scope? The brief says no. The TODO says someday.
8. Should the mounted globe be `PersistentGlobe` (what the page uses) or `GlobeInterface` (what the architecture diagram names, and the only file with layer buttons)?
9. Who is the visitor: someone looking at a portfolio piece, or someone who needs flood information?
