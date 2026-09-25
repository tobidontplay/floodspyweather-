# Case Study: FloodSpy Weather
## Problem
Flood information is easier to ignore as a table than as a place on a globe.
## Approach
A Next.js client with a Three.js globe and a set of panels. No report database in this repo.
## Result
The panels exist as components. Three commits, dormant since 2025-05-03. No tests and no named data provider in the audit.
## What I'd do differently
I would put the data URL in one module on day one so a later audit can tell a demo from a monitor.
## Metrics
- Time to first working version: Three commits, last 2025-05-03.
- Total AI spend: Not recorded.
- Features shipped: The visual board is in the tree. A confirmed live feed is not.
