# AGENTS.md — Repository Operating Instructions
> Every AI agent must read this first. Every AI agent must append to the AI log
> after every interaction, regardless of model or platform.
## 1. Project Identity
- Name: FloodSpy Weather
- Purpose: Cyberpunk weather board: globe, weather cards, news, timeline, live feed, and particle rain.
- Status: Public. Three commits. Last commit 2025-05-03. Repo name ends in a hyphen.
- Owner: GitHub account tobidontplay (repository tobidontplay/floodspyweather-). Personal name is not written here unless the repo already records it.
## 2. Golden Rules
1. Plan before code. No implementation without a spec in /specs/features/.
2. Log everything. Every prompt and reply goes into /docs/ai-log/.
3. Verify before completion. Tests, lint, or manual proof required.
4. Explain for a learner. Define jargon. Explain why, not just what.
5. Propose architecture, don't assume it. Unclear? Write an ADR and ask.
6. Elegant over hacky. If it feels like a hack, stop.
7. Update architecture docs when structure changes.
8. Harvest prompts. Any prompt used twice gets added to /docs/workflow/prompt-library.md.
9. Feed the content engine. Every session produces content angles. Log them.
## 3. AI Logging Protocol (MANDATORY)
After EVERY AI interaction (Cursor, Codex, Claude Code, ChatGPT, DeepSeek, local):
1. Create /docs/ai-log/entries/NNNN-YYYY-MM-DD-slug.md (next zero-padded number).
2. Use template at /docs/ai-log/entries/0000-template.md. Fill EVERY section.
3. Append one-line row to /docs/ai-log/index.md.
4. If new concept → add to /docs/learning/concepts.md.
5. If non-trivial decision → create ADR in /docs/architecture/decisions/.
6. If architecture changed → update /docs/architecture/overview.md.
7. If a prompt worked well → add to /docs/workflow/prompt-library.md.
8. If a technique is new → add to /docs/workflow/prompt-patterns.md.
9. If the session contains a teachable moment → add a row to /docs/content/ideas.md.
## 4. Feature Spec Protocol
Before implementing any feature:
1. Copy /specs/features/000-template.md → /specs/features/NNN-name.md
2. Fill it out completely.
3. Only then implement.
4. Link the spec from every related AI log entry.
## 5. ADR Protocol
Non-trivial decision → /docs/architecture/decisions/NNN-title.md using template.
## 6. Agent Persona
Senior full-stack engineer, 20+ years production. Values correctness, clarity,
maintainability. Explains reasoning. Writes clean, tested, documented code.
Never marks work complete without proof. See specs/agent-rules.md.
## 7. Content Awareness (always on)
Every task you do is potential content. Throughout every session:
- Notice moments worth talking about (a tricky bug, a clean refactor, a plan
  that saved time, a mistake caught early).
- When you finish a task, note at least ONE of:
  - A 15-second hook that could open a video about this.
  - A teachable concept for a beginner audience.
  - A "senior signal" moment worth highlighting (e.g. plan-before-code,
    verification loop, cost-aware routing).
- Append these to /docs/content/ideas.md. Never skip this.
## 8. Cost Awareness
If a task uses paid APIs, estimate cost and log it in /docs/workflow/cost-log.md.
Flag any single task over $1.
## 9. Conflict Resolution
If this file conflicts with a direct user request, ASK before proceeding.

## 10. Ariadne Integration
- This repo is monitored by Ariadne. project.yaml at the repo root
  describes how to run, test, and build it.
- Feature status lives in specs/features/*.md frontmatter. Do not
  duplicate status in prose.
- Verification evidence lives in docs/verification.md.
- Quiz transcripts live in docs/learning/quiz-log.jsonl.
- Concept mastery lives in docs/learning/concepts.md frontmatter.
- When you complete a feature, update its frontmatter: stage, validation
  fields, verified_by. Do not mark "accepted" without user validation.

## Project Analysis Artifacts

Deep analysis kit, written 2026-10-01. Read these before changing application code. They are additive docs. They do not change how the app runs.

- [PROJECT-STATE.md](./PROJECT-STATE.md) — tables of identity, stack, components, capabilities, endpoints, dependencies, data, tests, dead code, static end-to-end traces, and broken behavior. Confidence tags are `[HIGH]`, `[MED]`, and `[LOW]`.
- [PROJECT-GOALS.md](./PROJECT-GOALS.md) — stated goals, inferred goals, success criteria, non-goals, target user, stage, and questions for the owner.
- [PROJECT-GAP.md](./PROJECT-GAP.md) — one row per capability, the three biggest gaps, and the blocking gap.
- [PROJECT-TEACH.md](./PROJECT-TEACH.md) — mental model, architecture, decisions, technologies, failure modes, conventions, and open questions. Claims that were not executed are marked.
- [PROJECT-CONTEXT.yaml](./PROJECT-CONTEXT.yaml) — machine-readable context for Ariadne. `analysis_version: 1`. Unknowns are `null`.

Fleet status at analysis time: paused, from the audit brief. This repo does not store a fleet-status field. `project.yaml` has `auto_start: false`.

`specs/features/001-weather-board.md` `stage: implemented` means the panel files exist. It does not mean the board monitors live weather. `docs/verification.md` has no data rows. Do not mark that feature accepted without the user.

Application code was last edited on 2025-05-03 (`d2c21b1`). The sentence in §1 that says three commits and last commit 2025-05-03 describes that app history. `main` also has the 2026 documentation commits. Trust `git log` when the two disagree.
