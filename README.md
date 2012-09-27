slider.js
---

A basic jQuery slider, uses `position: absolute` and the `left` css property to move the slides left and right. Currently only supports a slide animation.

You can navigate either via the buttons on the left / right, or by the navigation at the bottom.

I needed a slider for a website mockup, and decided to write one myself, eventually extending it to use on production websites.

It uses jquery.swipe (plugins.jquery.com/project/swipe) to add swipe functionality.

In the future I hope to:
- Add swipe/keyboard events
- Different transitions
- Rewrite to not rely on jQuery