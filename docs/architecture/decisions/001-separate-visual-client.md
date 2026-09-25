# ADR 001: Weather UI stays a separate repo from FloodSpy reports
- Date: 2026-09-25
- Status: Accepted
## Context
floodspy and floodspyweather- are both public, both last touched on 2025-05-03, and they do not share a database in the trees that were read.
## Decision
Document this repo as the visual weather client it contains. Do not point its project.yaml at FloodSpy's Supabase.
## Consequences
- Positive: Ariadne will not boot the wrong app.
- Negative: Two dormant repos to feed, or one of them should be excluded.
- Neutral: They can be merged later without this doc pass moving files.
## Alternatives Considered
- Alternative A: Treat this folder as a package inside floodspy. Rejected because they are separate GitHub repos.
- Alternative B: Invent a shared API. Rejected because no shared client exists in this tree.
