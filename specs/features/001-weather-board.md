---
id: feat-001
title: "Cyberpunk weather board"
status: Done
stage: implemented
target_stage: verified
final_result: "The page shows a globe, weather cards, news, a timeline, a live feed, and particle rain."
acceptance:
  - "components/globe-interface.tsx and persistent-globe.tsx exist."
  - "weather-card, news-card, timeline-viewer, live-feed, and particle-rain exist."
  - "The README lists those panels."
validation:
  tests: unknown
  manual: unknown
  user_opinion: unknown
  verified_by: null
---

# Feature Spec: Cyberpunk weather board
- Status: Done
- Owner: FloodSpy Weather
- Linked ADRs: none yet
- Linked AI Log Entries: [docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md](../../docs/ai-log/entries/0001-2026-09-25-fleet-onboarding.md)
## 1. Objective
The page shows a globe, weather cards, news, a timeline, a live feed, and particle rain.
## 2. Requirements
### Functional
- components/globe-interface.tsx and persistent-globe.tsx exist.
- weather-card, news-card, timeline-viewer, live-feed, and particle-rain exist.
- The README lists those panels.
### Non-Functional
- A live weather provider was not confirmed.
## 3. Technical Plan
- Affected Files: app/page.tsx, components/globe-interface.tsx, components/weather-card.tsx, components/news-card.tsx, components/timeline-viewer.tsx, components/live-feed.tsx, components/particle-rain.tsx
- Data Model Changes: None found.
- API Changes: None found.
- Steps:
  1. Compose the panels on the page.
  2. Keep data sources explicit when they exist.
## 4. Verification Plan
No tests. Manual: npm run dev and look at each panel. Not run in this pass.
## 5. Content Angle
Hook: the component files match the README, and the data source does not.
## 6. Open Questions
- Which API, if any, fills the cards and the feed?
