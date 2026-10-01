# Concepts Learned
Running glossary. Every new concept gets a row.
Mastery starts at 0 until a quiz in docs/learning/quiz-log.jsonl raises it.

| Concept | Plain-English | Why It Matters | Date | Mastery | Last Reviewed | Next Review | Related Files |
|---|---|---|---|---|---|---|---|
| UI without a named source | Components can render from constants or from a fetch. The folder list does not tell you which. | Do not write an API table for a fetch you did not find. | 2026-09-25 | 0 | null | null | components/weather-card.tsx |
| Lockfile drift | `package.json` names the range you want. `package-lock.json` records the tree last installed. Editing one file leaves the other on the old resolution. | A commit message that says the dependency conflict is fixed can still leave `npm` with two contracts. | 2026-10-01 | 0 | null | null | package.json |
| Peer dependency | A library declares the host package it was built against. Optional peers are listed in `peerDependenciesMeta`. | Fiber 9 peers React 19. The unused calendar peers React 18. Expo is an optional peer that this app also installed and never imports. | 2026-10-01 | 0 | null | null | package-lock.json |
| File-existence acceptance | A spec can pass because the files exist, while a button only toggles an icon. | `feat-001` stage `implemented` is that weaker bar. The verification log is the stricter one, and it is empty. | 2026-10-01 | 0 | null | null | specs/features/001-weather-board.md |
| Two writers, one property | If a render loop assigns `rotation.y` from elapsed time every frame, a GSAP tween of the same property cannot hold. | Read the animation loop before trusting a focus effect. | 2026-10-01 | 0 | null | null | components/world-map.tsx |
