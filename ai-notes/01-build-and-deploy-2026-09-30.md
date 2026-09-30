# put-it-in-the-backpack — "Put It In The Backpack". What it is, how it's built, how it's deployed

Live: https://rt567.github.io/put-it-in-the-backpack/  ·  Repo: github.com/RT567/put-it-in-the-backpack
(branch `main`, legacy Pages serving `/`). Local: `~/silly/put-it-in-the-backpack`.

## The idea (Rob's brief, verbatim)

> It's just a picture of like a cartoonish backpack in the middle and you can click on items, a few
> items around the screen. There's like a basketball, there's a pair of shoes, there's a cup, there's a
> pile of clothes. Note with the pile of clothes, when you click on the pile of clothes, it closes the
> website. Bit of a pun on clothes. Anyway, this website is really stupid. There's no intention of any
> utility at all. It's just clicking things and putting them in the backpack. When you click on
> something, it says congratulations. You put an item into the backpack. Nothing about the backpack
> changes, the item just disappears. Really stupid, really simple.

So: one of Rob's "silly little websites". The joke is the flatness. **The backpack must never change**
(no bulge, no wobble, no hover, not even clickable). Items just vanish.

## Timeline

| date | event |
|---|---|
| 2026-09-30 | Built and deployed in one go (single commit + notes). Verified in Chrome at desktop (1366×800), phone portrait (390×844) and phone landscape (844×390). |

## Files

- `index.html` — the whole scene. All art is inline SVG, hand-written, in the page: backpack, basketball,
  shoes (one `<g id="shoe">` in `<defs>` drawn twice with `<use>`), mug, clothes pile (jeans, pink
  jumper sleeve, green tee, striped sock).
- `style.css` — palette as CSS variables on `:root`, CSS grid layout, idle bob / hover wiggle, toast.
- `script.js` — ~25 lines: item click → hide + toast; clothes click → close.
- `favicon.svg` — mini backpack.
- No build step, no dependencies except Google Fonts (Bagel Fat One for headings, Gaegu for body).
  All paths relative (served under `/put-it-in-the-backpack/`).

## Design decisions

- **Look:** children's-sticker-book. Warm paper background with a dot grid, thick dark-brown ink
  outlines (`--ink #2b211c`, stroke ~5.5–7), flat saturated fills, one white highlight stroke per
  object, soft ellipse ground shadows. Tomato-red backpack with a mustard front pocket and star patch.
- **Layout:** CSS grid. Landscape/desktop: 3 columns, backpack spans the middle column, ball+cup on the
  left, shoes+clothes on the right. Portrait (`max-aspect-ratio: 1/1`): ball+shoes above, backpack in
  the middle, cup+clothes below. Sizes are `min(vw, vh, px)` per item so nothing scrolls
  (`body { overflow: hidden }`, `100dvh`).
- **Items are `<button>`s** with aria-labels; the drawing (`svg`) bobs, the button itself doesn't move.
  This matters: the chrome-devtools click tool refused to click a constantly animating button, and a
  still hit-target is nicer on touch anyway.
- **Disappearing:** `.gone { visibility: hidden }`, instant, no animation, and layout doesn't shift.
  Deadpan beats a poof. The button is also `disabled`.
- **Message:** exact wording "Congratulations! You put an item into the backpack." in a yellow sticker
  toast that springs in for 2.6 s. Bottom of the screen on desktop, top on portrait phones (at the
  bottom it covered the clothes pile). The text is injected on each click so the `role="status"` live
  region re-announces it.
- **No reset.** Once the ball, shoes and cup are gone the only thing left to click is the clothes. Reload
  to start again.

## Clothes → closes

```js
window.close();                                   // works only if script opened this tab
setTimeout(() => location.replace('about:blank'), 120);
```

Browsers only let `window.close()` close windows that script opened, so in a normal tab it's a no-op
and the fallback navigates to `about:blank`. Chose `about:blank` (via `location.replace`, so Back
skips over the site) as the funnier option: the site just goes, and you're staring at a blank white
page with no explanation. Both paths verified in Chrome: a `window.open`ed copy of the page closed
its own tab; a normal tab became `about:blank`, and Back went to the page before it.

## Deployment

- `gh repo create RT567/put-it-in-the-backpack --public --source . --push`
- Legacy Pages from `main` `/`: `gh api -X POST repos/RT567/put-it-in-the-backpack/pages -f 'source[branch]=main' -f 'source[path]=/'`
- Check a build: `gh api repos/RT567/put-it-in-the-backpack/pages/builds/latest --jq .status`
- Pushing to `main` redeploys. The landing page (`RT567.github.io`) is maintained separately; don't
  edit it from here.

## Gotchas

- Test locally with `python3 -m http.server 8762 --directory ~/silly/put-it-in-the-backpack`.
- Testing the clothes in a browser automation tab will blank or close that tab. Expected.
- `.beads/` and `.claude/` are committed (house convention); they're harmlessly public on Pages too.

## Still to do

Nothing. It's done. It's meant to be this stupid.
