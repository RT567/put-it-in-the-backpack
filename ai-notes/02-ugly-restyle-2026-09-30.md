# 02 — deliberately ugly restyle (2026-09-30)

## Why

Rob looked at the first version (doc 01) and said to make the styling "like half as good", then
"shouldn't actually look good". The polished sticker-book art was working against the joke. A pointless
site should look like someone's first HTML page or an MS Paint drawing. He also asked that every silly
site have a proper desktop layout as well as a phone one.

## What it looks like now

- Flat yellow background (`#ffff66`), browser-default Times font, and a blue underlined `h1` left-aligned
  in the corner. No Google Fonts.
- Crude, wobbly SVGs with solid primary colours and black outlines of uneven width. There are no
  highlights, no shadows and no detailing:
  - backpack: a lumpy red blob with a handle loop, a flap line and a wonky pocket rectangle
  - basketball: an orange circle with two wobbly lines
  - shoes: two blue blobs
  - cup: a lopsided white trapezoid with a handle
  - clothes: a blue blob (jeans), a green T-shirt and a pink sock
- The congratulations message is a grey Windows-95-style box (`#c0c0c0`, `3px outset`, Arial 15px).
  It just appears and disappears, with no animation. It's at the bottom on desktop and at the top on
  portrait phones. The text is set with `textContent` on each click.
- No bobbing, wiggle or steam. Items still have `cursor: pointer`.

## What didn't change

Behaviour is identical. Items hide instantly (`visibility: hidden`, no layout shift). The backpack never
changes and can't be clicked. Clothes run `window.close()` and then `location.replace('about:blank')`.
The CSS grid layout is the same too: 3 columns on landscape/desktop, and a 2-column
above/backpack/below layout under `max-aspect-ratio: 1/1`.

## Desktop sizing

The px caps on item sizes were removed and `.scene` max-width went from 1100 to 1700px. Everything now
scales with `min(vw, vh)`, so the scene fills 1366×768 and 1920×1080 instead of sitting as a small
cluster. Checked in Chrome at 1366×768, 1920×1080 and 390×844 (mobile/touch). All items were
clickable, and nothing scrolls.

## Still to do

Nothing.
