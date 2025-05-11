![mason-it-cover](/docs/assets/mason-it-cover.png)

<br>

# <img src="docs/assets/mason-it-github-logo.png" alt="mason-it logo" width="48" /> mason-it

[![npm version](https://img.shields.io/npm/v/mason-it.svg)](https://www.npmjs.com/package/mason-it)
[![license](https://img.shields.io/npm/l/mason-it.svg?cache=false)](https://github.com/Druhin13/mason-it/blob/main/LICENSE)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/mason-it/badge)](https://www.jsdelivr.com/package/npm/mason-it)

<br>

## Table of Contents

- [About](#so-youve-wasted-half-your-life-trying-to-make-a-masonry-layout-work)
- [Why mason-it](#heres-why-you-absolutely-need-this)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Advanced Configuration](#advanced-configuration-for-the-overachievers)
- [A Note on CSS for Optimal Results](#a-note-on-css-for-optimal-results)
- [Browser Support](#browser-support)
- [License](#license-legal-mumbo-jumbo)
- [Final Thoughts](#final-thoughts)

<br>

## So you've wasted half your life trying to make a masonry layout work?

Me too! And let me tell you, I was _this close_ to throwing my laptop out the window.

4 different libraries, 27 Stack Overflow answers, and enough caffeine to kill a small horse later, I still had images overlapping, layouts breaking on resize, and a client breathing down my neck.

That's when I decided: screw it, I'll just make my own masonry library that actually works. And here we are!

`mason-it` was born from pure frustration and an unhealthy dose of spite.
<br>

_You're welcome._

<br>

## Here's why you absolutely need this

Because other masonry libraries are allergic to your CSS Grid. There, I said it. While you’re trying to build a clean, modern layout with CSS Grid (you know, like a sane person)… these libraries are off in the corner doing their own weird thing. Completely ignoring your carefully crafted grid settings. Adding bizarre margins. Treating CSS Grid like it’s a communicable disease.

Most masonry libraries basically say "That's a nice CSS Grid you've got there... would be a shame if someone COMPLETELY IGNORED IT." Then they proceed to hijack your layout with their own proprietary nonsense that requires a Ph.D in their documentation just to add a 12px gap between items.

#### But here's the revolutionary idea behind `mason-it`:

What if... and stay with me here... we just let you design your grid however the hell you want, and then _just `mason it`_? Crazy, right? You keep your grid-template-columns, you keep your gap property, you keep everything exactly how you designed it. We just make it masonry.

That's it. No hostile takeover of your CSS. No "our way or the highway" attitude.

Now, do you really want to spend the next 3 hours reading documentation just to make some boxes line up nicely? Yeah, didn't think so.

<br>

## Features

- **Zero dependencies**: Because your website shouldn't need to download half the internet just to display some boxes in a pretty pattern.
- **Stupidly simple API**: One attribute. ONE. `data-mason-it`. That's it. If you can't handle that, maybe try finger painting instead of web development.
- **Actual CSS Grid-based**: Unlike those _other_ libraries that just pretend CSS Grid doesn't exist, like it's their ex from high school they're avoiding at the reunion. `mason-it` respects your grid.
- **Silky-smooth updates**: Leverages `requestAnimationFrame` for fluid layout adjustments when content changes or the window resizes, eliminating jank and layout shifts. Your users will thank you.
- **Blazing fast & Ridiculously responsive**: So fast, it makes other libraries look like they're stuck in molasses. Recalculates layouts instantly, making it feel native and snappy.
- **Doesn't break when images load**: Take that, other libraries! (not name-shaming anyone in particular… _uhm… uhm…_ it's in the name… _uhm hmm_)
- **Microscopic footprint**: The entire library is just over 6KB minified and gzipped. That's smaller than this README that you're reading, and I'm not even joking.

<br>

## Installation

### For the Keyboard Warriors (npm)

You know the drill. You're probably already typing before you finished reading this:

```bash
npm install mason-it
```

```js
// Import it, because this is what peak modern web development looks like
import MasonIt from "mason-it";

// Magic time (call after your grid elements are in the DOM)
// e.g., inside a DOMContentLoaded listener or your framework's onMount/useEffect hook
MasonIt.init(".standard-grid");
```

Boom. Done. Now go get some coffee.

<br>

## For the Copy-Paste Professionals (CDN)

Just slap this `<script>` tag at the end of your body. (That's what she... nevermind).

```html
<!-- right before your closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/mason-it@1.0.1/dist/mason-it.min.js"></script>
```

<br>

## Usage

### Step 1: Make a normal, standard, boring CSS Grid

```css
.standard-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* Or your preferred column setup */
  gap: 20px; /* Your desired gap */

  /* Recommended for true masonry behavior with varying item heights: */
  align-items: start; /* or align-items: flex-start */
  grid-auto-rows: min-content; /* If you want items to take up only as much space as their content needs */
}
```

_(See "A Note on CSS for Optimal Results" below for more on `align-items` and `grid-auto-rows`)_

### Step 2: Add the magic attribute

```bash
data-mason-it
```

```html
<div class="standard-grid" data-mason-it>
  <div class="item">I'm a boring box</div>
  <div class="item" style="height: 150px;">
    I'm taller than the other boxes and insecure about it
  </div>
  <div class="item" style="height: 50px;">I'm short but mighty</div>
  <!-- Add as many as you want, no one's judging... except me -->
</div>
```

`mason-it` will automatically initialize on elements with the `data-mason-it` attribute when the DOM is ready.

### Step 3: There is no step 3

That's literally it. If you were expecting more, sorry to disappoint.

<br>

## Advanced Configuration (for the overachievers)

Want to delay the layout? Set a poll interval? Fine, here's how:

```html
<!-- HTML attribute style, for the purists -->
<div
  class="standard-grid"
  data-mason-it="mason-delay:{500} mason-poll-interval:{2000}"
>
  <!-- Your unruly children... I mean elements -->
</div>
```

```js
// JavaScript style, for the control freaks
// Ensure you call this *after* the DOM elements are available
MasonIt.init(".standard-grid", {
  masonDelay: 500, // Wait 500ms before first layout
  masonPollInterval: 2000, // Check for changes every 2 seconds (useful for dynamically added content if not using MutationObserver or manual refresh)
});
```

**Public API Methods:**

```js
// Manually initialize grids (if you're not using data-mason-it or need more control)
MasonIt.init(".another-grid");

// Refresh layout (e.g., after adding/removing items or changing visibility)
// This is now super smooth thanks to requestAnimationFrame!
MasonIt.refresh(".standard-grid");

// Destroy layout (when your relationship with mason-it isn't working out)
MasonIt.destroy(".standard-grid");

// Enable debug mode (for when you absolutely must know what's happening under the hood)
MasonIt.debug(true); // Check your console!

// Get the version (why? I don't know, but here it is anyway)
console.log(MasonIt.version()); // Outputs "1.0.1"

// Count active grids (if you're into that sort of thing)
console.log(MasonIt.count());
```

<br>

## A Note on CSS for Optimal Results

`mason-it` works by adjusting the `margin-top` of your grid items. To get the best "true" masonry effect where items retain their natural height and don't stretch to fill rows:

1.  **`align-items: start;` (or `flex-start`) on your grid container:** This is crucial. CSS Grid's default `align-items: stretch;` will make all items in a row the same height, negating the visual masonry effect for height differences.
2.  **`grid-auto-rows: min-content;` (optional but recommended):** This tells the grid rows to be only as tall as the tallest item in that implicit row _before_ `mason-it` does its magic. This can lead to more predictable layouts if your items have intrinsic heights.

**Example:**

```css
.my-masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  align-items: start; /* Essential! */
  /* grid-auto-rows: min-content; */ /* Consider this for content-driven heights */
}
```

`mason-it` will then handle the vertical stacking.

<br>

## So Your Grid Skills Are Actually Pretty Decent?

Perfect! That's exactly what we want. Unlike those other libraries that try to compensate for your supposed incompetence, mason-it actually _respects_ your CSS Grid skills. You know your way around `grid-template-columns` and `gap`? Great! We're just here to add that final touch of masonry goodness.

Think of us as the sous chef that doesn't try to take over your kitchen - you've done all the hard work creating a beautiful grid, and we just plate it up with a fancy masonry garnish. No judgment, no overriding your carefully crafted styles, just pure masonry enhancement.

The better your grid is designed, the better mason-it makes it look. We're in this together. You bring the grid skills, we bring the masonry magic. Deal?

<br>

## Browser Support

Works everywhere except Internet Explorer, because it's May 11, 2025 and if you're still supporting IE, you have bigger problems than masonry layouts. `mason-it` relies on `window.getComputedStyle` and `window.requestAnimationFrame`.

<br>

## License (Legal Mumbo Jumbo)

It's MIT. Take it. Use it. Don't sue me if your website collapses like a poorly built brick wall. That's on you.

<br>
<br>

## Final Thoughts

If you've read this far, congratulations on having way too much time on your hands. Now go make your grids look pretty, and remember: when in doubt, _just mason it_.
