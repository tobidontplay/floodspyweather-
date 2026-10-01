# Entry 0002 — Deep analysis and teaching kit
- Date: 2026-10-01
- Agent: Cursor
- Model: Grok 4.7
- Session Goal: Write a layered documentation kit that audits floodspyweather- for the owner, a future agent, and a tutor.
- Duration: one cloud-agent session
## Prompt(s) Sent
> 1. TASK: Deep analysis and teaching kit for one project.
>
> You are a senior engineer performing a full audit of a single codebase.
> Your output is not application code. It is a layered documentation kit for three readers: the owner (CS student learning to sound senior), a future AI agent, and a Tutor who will quiz from these docs.
>
> The repo is floodspyweather- at the repository root (GitHub tobidontplay/floodspyweather-). Status in Ariadne fleet: paused — still analyze honestly.
>
> Produce five files at the repo root. Additive docs only. Do not modify application code. Allowed: create PROJECT-STATE.md, PROJECT-GOALS.md, PROJECT-GAP.md, PROJECT-TEACH.md, PROJECT-CONTEXT.yaml; append Project Analysis Artifacts section to AGENTS.md; create ai-log entry and update index.
>
> READ FIRST (do not skim): every file; git log --oneline -100; specs/, docs/, README, CHANGELOG, CASE-STUDY, TODO if present.
>
> FILE 1 PROJECT-STATE.md — tables only: Identity, Stack, Components, Capabilities (done|partial|broken|planned|absent), Endpoints, External Dependencies, Data Model, Tests, Dead code, What works E2E, What is broken. Mark [HIGH]/[MED]/[LOW].
> FILE 2 PROJECT-GOALS.md — stated/inferred goals, success criteria, non-goals, target user, stage, questions for user.
> FILE 3 PROJECT-GAP.md — gap table for every capability; three biggest gaps; blocking gap.
> FILE 4 PROJECT-TEACH.md — mental model, architecture, key decisions, technologies, failure modes, conventions, open questions; defendable claims only.
> FILE 5 PROJECT-CONTEXT.yaml — exact Ariadne schema (project, purpose, stage, maturity, last_analysis, confidence, analysis_version:1, goals, capabilities, stack, architecture, risks, decisions, open_questions, roadmap, links, teaching_hooks). null not missing.
> STEP 6 append AGENTS.md Project Analysis Artifacts section.
> STEP 7 ai-log entry from template.
> DO NOT modify app code, delete, reorganize, add deps, start servers, touch Ariadne.
> DONE: PR commit "docs: deep analysis and teaching kit for floodspyweather-". Final report with line counts, what it is, 3 gaps, blocking gap, [LOW] claims, questions, defend paragraph.
## Reply Summary
Static audit of a paused Next.js visual prototype. Five root docs plus an AGENTS.md section, this log, concept rows, and content ideas. No application code, no server, no dependency install.

The page is a client component of fixtures. The blocking product gap is the unnamed data source. The install files disagree: `package.json` asks for React 18.2 and date-fns 3, and the lockfile still resolves React 19.1.0 and date-fns 4.1.0. Line counts at write time: PROJECT-STATE.md 224, PROJECT-GOALS.md 99, PROJECT-GAP.md 71, PROJECT-TEACH.md 186, PROJECT-CONTEXT.yaml 468.
## Full Reply / Key Excerpts
FloodSpy Weather is one client page. Eight fictional cities, a procedural sphere, and timers. The README says monitoring. The case study says the feed was never confirmed. `feat-001` is `implemented` because the files exist. The verification table is empty.

Three gaps: no data decision, controls that do not do what they say, and two dependency contracts. The blocking gap is the unnamed data source.

`[LOW]` claims stay inside PROJECT-STATE.md and PROJECT-TEACH.md. They cover unrun browser proof, unrun `npm ci`, GPU context loss, author intent, and the fleet status, which the task brief supplied and the repo does not store.

`PROJECT-CONTEXT.yaml` parses with the required keys. `analysis_version` is the integer 1. Unknowns are `null`.
## Considerations
- The task allow-list is docs. Application files were not edited. `docs/architecture/overview.md` is wrong about the globe import and was left in place so this kit can point at the drift instead of silently rewriting history.
- Feature frontmatter was not moved to `accepted`. Validation is still unknown.
- AGENTS.md §3 also requires concept rows and a content idea when the session teaches something. Those appends are in `docs/learning/concepts.md` and `docs/content/ideas.md`.
- No paid metered API was called from this repo. No dollar figure is invented in `docs/workflow/cost-log.md`.
- Fleet status "paused" is recorded as coming from the task brief. `project.yaml` only says `auto_start: false`.
## Alternatives Considered
- Alternative A: boot `npm run dev` and screenshot the board. Rejected because the task says not to start servers, and a screenshot would not fix the data-source question.
- Alternative B: regenerate the lockfile or pin React inside this PR. Rejected because that is application-contract work, and the owner has not chosen React 18 or React 19.
- Alternative C: mark `feat-001` verified. Rejected because the verification log requires a manual check and a user opinion, and this pass did not run the app.
## Learning Notes (For the Human)
- Concept introduced: a lockfile is a second contract. Changing `package.json` without it leaves the install on the previous resolution.
- Why it matters: the May 2025 commits say the React conflict is fixed. The locked tree is still React 19.1.0, which is the major version the globe libraries peer, and the opposite of the commit message. Sounding senior here is quoting both files.
- Where to read more: `PROJECT-TEACH.md` section "The React split, in numbers", `package.json`, and the root package entry of `package-lock.json`.
## Content Angles
> At least one. This feeds /docs/content/ideas.md.
- Type: teaching
- Idea: A Done spec whose tests are filenames
- Hook: The play button only swaps an icon, and the spec still says Done because the file exists.
## Files Changed
- PROJECT-STATE.md — table inventory of the tree
- PROJECT-GOALS.md — stated and inferred goals, questions for the owner
- PROJECT-GAP.md — gap table, three gaps, blocking gap
- PROJECT-TEACH.md — mental model and failure modes with confidence tags
- PROJECT-CONTEXT.yaml — Ariadne context, analysis_version 1
- AGENTS.md — appended Project Analysis Artifacts
- docs/ai-log/entries/0002-2026-10-01-deep-analysis-teaching-kit.md — this entry
- docs/ai-log/index.md — row 0002
- docs/learning/concepts.md — lockfile, peer dependency, file-existence acceptance, two writers
- docs/content/ideas.md — three angles from this pass
## Verification
YAML loaded with `yaml.safe_load`. Required keys present. `analysis_version` is integer 1. Capability list length 29. No dev server, no `npm install`, no browser. `git status` used to confirm application paths were not edited before commit.
## Follow-ups / Open Questions
- [ ] Does the repo stay in the fleet?
- [ ] Are the panels fixtures on purpose?
- [ ] Which React major is the contract?
- [ ] Should the unused Expo and React Native dependencies stay?
- [ ] What port belongs in `project.yaml`?
- [ ] Are tests in scope?
- [ ] Which globe component should the page mount?
- [ ] Who is the visitor?
