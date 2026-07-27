# Mermaid Zoomable Diagram Component

**Date:** 2026-07-28  
**Status:** Approved for implementation  
**Scope:** Opt-in zoom/pan Mermaid wrapper for large diagrams only

## Goal

Authors keep small diagrams as fenced ` ```mermaid ` blocks (existing `Mermaid`). For large diagrams, they opt into a separate MDX component with wheel zoom, drag pan, and +/−/reset controls.

## Non-goals

- Do not change the remark-mermaid alias or default `Mermaid` behavior
- Do not auto-detect “large” diagrams
- Do not build custom transform math (use existing `react-zoom-pan-pinch`)
- Do not add fullscreen / minimap / export in v1

## API

Registered as `MermaidZoomable` in MDX components (same pattern as `Quiz`).

```mdx
<MermaidZoomable
  height={480}
  chart={`flowchart TD
    A --> B`}
/>
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| `chart` | `string` | required | Mermaid source; `\n` normalized like existing `Mermaid` |
| `height` | `number` | `480` | Viewport height in px |
| `className` | `string` | optional | Extra class on outer shell |

## Interaction (Approach A)

- Wheel zoom inside the viewport
- Click-drag to pan
- Pinch zoom on touch where supported by the library
- Overlay controls: zoom in, zoom out, reset
- Cursor: grab / grabbing while panning
- Page scroll still works when the pointer is outside the viewport

## Architecture

```
MermaidZoomable (client)
  ├─ shared mermaid render/theme (extracted from Mermaid)
  ├─ TransformWrapper / TransformComponent (react-zoom-pan-pinch)
  │    └─ SVG from mermaid.render
  └─ control bar (+ / − / reset)
```

1. Extract theme variables + `mermaid.render` flow from `lib/components/mermaid.client.tsx` into a small shared helper (e.g. `lib/components/mermaid-shared.ts` or colocated hook) so both components stay theme-consistent.
2. Keep `Mermaid` visually/behaviorally the same for fenced blocks.
3. New `lib/components/mermaid-zoomable.client.tsx` wraps rendered SVG in a fixed-height viewport with pan/zoom.
4. Export via `lib/components/index.ts` and register in `lib/mdx-components/index.tsx`.
5. CSS in `app/globals.css` under `.pensieve-mermaid-zoomable` — reuse the purple chrome of `.pensieve-mermaid`, but disable the horizontal-scroll / `min-width: 42rem` behavior that fights a zoom viewport (SVG should size naturally inside the transform layer).

## Visual / UX details

- Outer shell matches existing diagram card (border, radius, purple gradient wash).
- Controls: small corner cluster (top-right), non-intrusive, keyboard-accessible buttons with `aria-label`.
- Default scale fits the diagram in the viewport on first render when practical (`initialScale` / `centerOnInit` via library options); reset returns to that baseline.
- Dark/light theme follows the same MutationObserver pattern as `Mermaid`.

## Error handling

- Render failures: log to console (same as today); leave empty viewport (no crash).
- Empty `chart`: render nothing / empty shell.

## Files touched

| File | Change |
|------|--------|
| `lib/components/mermaid.client.tsx` | Use shared render helper |
| `lib/components/mermaid-shared.ts` (new) | Theme + render helper |
| `lib/components/mermaid-zoomable.client.tsx` (new) | Zoomable UI |
| `lib/components/index.ts` | Export |
| `lib/mdx-components/index.tsx` | Register `MermaidZoomable` |
| `app/globals.css` | Zoomable styles |

## Success criteria

- Fenced mermaid diagrams unchanged
- `<MermaidZoomable chart={...} />` works in MDX pages
- Wheel zoom, drag pan, and +/−/reset work
- Theme switch still re-renders correctly
- Optional `height` controls viewport size

## Out of scope follow-ups

- Double-click reset
- Ctrl+wheel only mode
- Fullscreen button
