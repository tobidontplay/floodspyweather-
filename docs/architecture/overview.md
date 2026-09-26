# System Architecture Overview
## 1. Purpose
Cyberpunk weather board: globe, weather cards, news, timeline, live feed, and particle rain.
## 2. High-Level Diagram
```mermaid
graph TD
    Page[app/page.tsx] --> Globe[components/globe-interface.tsx]\n    Page --> Cards[components/weather-card.tsx]\n    Page --> News[components/news-card.tsx]\n    Page --> Feed[components/live-feed.tsx]
```
## 3. Components
| Component | Responsibility | Tech | Location |
|---|---|---|---|
| Globe | 3D globe interface | Three.js, named in the README | components/globe-interface.tsx, components/persistent-globe.tsx |
| Weather card | Location weather UI | React | components/weather-card.tsx, components/location-detail.tsx |
| News and feed | News cards and a live feed list | React | components/news-card.tsx, components/live-feed.tsx |
| Timeline | Historical timeline UI | React | components/timeline-viewer.tsx |
| Rain | Particle effect | React | components/particle-rain.tsx |
## 4. Data Flow
1. app/page.tsx composes the visual panels.
2. A live data source was not identified in this pass. Treat feeds as UI until you confirm an API.
## 5. Key Decisions
- This repo is a visual client, separate from floodspy's Supabase reports. See ADR 001.
## 6. Future Considerations
- Name the weather API if one is intended. Do not invent the URL.
- Decide whether this and floodspy should merge or stay two repos.
