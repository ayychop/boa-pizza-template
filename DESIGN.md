---
name: Forno Rosso
description: The backlit menu board over a late-night slice counter, built as a pizza shop ordering app.
colors:
  ember: "#FF2E2E"
  blaze: "#E60000"
  blaze-hot: "#FF1A1A"
  flame: "#FF7A1A"
  ink: "#0A0A0A"
  coal: "#121111"
  ash: "#8A8580"
  cream: "#F5EFE0"
typography:
  display:
    fontFamily: "Anton, Impact, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(5rem, 23vw, 13.5rem)"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "0.005em"
    fontFeature: "'tnum'"
  headline:
    fontFamily: "Anton, Impact, 'Arial Narrow Bold', sans-serif"
    fontSize: "clamp(4.25rem, 13vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.85
    letterSpacing: "0.005em"
  title:
    fontFamily: "Anton, Impact, 'Arial Narrow Bold', sans-serif"
    fontSize: "2.15rem"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.005em"
  price:
    fontFamily: "Anton, Impact, 'Arial Narrow Bold', sans-serif"
    fontSize: "2.75rem"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "0.005em"
    fontFeature: "'tnum'"
  body:
    fontFamily: "Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.625
  body-sm:
    fontFamily: "Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.625
  label:
    fontFamily: "Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "11px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  tab: "10px"
  control: "12px"
  panel: "16px"
  board-row: "20px"
  board: "22px"
  sheet: "28px"
  drawer: "32px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "32px"
  container: "1280px"
  grid-gap: "16px"
  grid-gap-md: "20px"
  card-pad: "20px"
  card-pad-md: "24px"
components:
  button-primary:
    backgroundColor: "{colors.blaze}"
    textColor: "#FFFFFF"
    typography: "{typography.title}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blaze-hot}"
    textColor: "#FFFFFF"
  button-hero:
    backgroundColor: "{colors.blaze}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: "0 56px"
    height: "96px"
  button-ghost:
    backgroundColor: "rgba(245, 239, 224, 0.06)"
    textColor: "{colors.cream}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "44px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 46, 46, 0.08)"
  board-card:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.board}"
    padding: "{spacing.card-pad}"
  board-row:
    backgroundColor: "{colors.coal}"
    textColor: "{colors.cream}"
    rounded: "{rounded.board-row}"
    padding: "12px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.tab}"
    padding: "10px 20px"
  tab-active:
    backgroundColor: "{colors.blaze}"
    textColor: "#FFFFFF"
  tag:
    backgroundColor: "{colors.blaze}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "6px"
    padding: "4px 8px"
  ticker-band:
    backgroundColor: "{colors.blaze}"
    textColor: "#FFFFFF"
    padding: "12px 0"
  ticket:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "0 0 18px 18px"
    padding: "24px 32px 40px"
---

# Design System: Forno Rosso

## Overview

**Creative North Star: "The Lit Board Over the Counter"**

The site is the backlit menu board above a late-night slice counter, loud enough to read from the door. A near-black room, one electric red that behaves like a light source, and cream type set in a condensed poster face at sizes that fill the window. Every price is set as loud as the name. Photography is fire-lit and graded hot and dark so it sinks into the board rather than punching holes in it.

Depth comes from light, not from layers of grey. Board panels are grained near-black with a warm backlight pooling from their top edge; when pointed at, the frame lights red. The primary action is a solid red block that glows. A red ticker band runs the shop's facts like the sign over the door, and on first paint the wordmark's neon tube stutters on, then the band catches. Glass exists only on what floats above the page, and it is tinted red.

The world rejects the fine-dining arrangement (italic serif, quiet cards, whispered prices) and the chain arrangement (deal tiles, coupon clutter). Forno Rosso is demo branding for a template; the system is the board, the red light and the poster type, not the name.

**Key Characteristics:**
- Near-black ground (ink), one electric red in two strengths (ember for light and text, blaze for filled blocks), cream type.
- Anton, uppercase, tight, at poster scale for names, headlines, prices and button labels; Manrope for everything read as a sentence.
- Red glow is the elevation system for anything actionable or live.
- Grained, backlit board panels with a thick frame; glass only on floating surfaces.
- One shared night grade on all food photography.

## Colors

One red, lit, on a black room, with cream doing all the reading.

### Primary
- **Electric Sign Red** (ember): the light. Highlighted words in headlines, prices on featured items, the cart total, active indicators, focus rings, selection, borders that light on hover, every glow. Text-safe on ink.
- **Filled Sign Red** (blaze): the deeper red used as a fill under white text, so white passes AA. Primary buttons, the ticker band, active tabs, add buttons, open-now tags, tracker progress fill.
- **Hot Sign Red** (blaze-hot): primary button hover fill only.

### Tertiary
- **Ember Orange** (flame): fire only. Floating embers in the oven and tracker scenes, the warm cast in the photo grade. Never a UI color.

### Neutral
- **Late-Night Ink** (ink): page ground, scrollbar track, the ticket's type, the dark mode chip on the ticket.
- **Board Coal** (coal): the board panel fill under grain and backlight; also the fade under card photos.
- **Ash** (ash): low-priority warm grey for muted tracker text.
- **Menu Cream** (cream): all text on dark, at stepped opacities (100 headings, 85 hero body, 65-70 descriptions, 55-60 secondary labels), plus the tracker's paper ticket ground.

### Named Rules
**The Red Is Light Rule.** Red appears either as light (ember text, ember glow, ember borders) or as a filled sign (blaze under white). Never use red as a tint wash over large areas, and never set white text on ember.

**The Fire-Only Orange Rule.** Flame orange belongs to fire: embers and photo grade. It never marks a state, a price or a control.

**The Cream Ladder Rule.** Hierarchy on dark is cream at opacity steps, not new greys.

## Typography

**Display Font:** Anton (with Impact, Arial Narrow Bold)
**Body Font:** Manrope 400-800 (with system-ui)

**Character:** A sign-painter's condensed sans shouting from across the room, paired with a clean geometric sans that explains quietly underneath. Anton is always uppercase and tight; Manrope is never used for names or prices.

### Hierarchy
- **Display** (Anton, clamp(5rem, 23vw, 13.5rem), line-height 0.84): the hero headline only, two lines, second line in ember with the red glow.
- **Headline** (Anton, clamp(4.25rem, 13vw, 10rem), line-height 0.85): section titles (The menu, Find us), one word often in ember. The oven story runs a smaller clamp(3rem, 10.5vw, 6rem).
- **Category** (Anton, 3.25rem to 4.5rem): menu category headings.
- **Title** (Anton, 2.15rem; 2.75-3.5rem featured; 1.5-1.6rem in compact rows and modal legends): item names, drawer and popover titles.
- **Price** (Anton, tabular, 2.75rem on cards, 3.5rem featured, 1.9rem in rows, 3.25rem cart total): prices are set at or above the name's size.
- **Button** (Anton, uppercase, 0.02em tracking): every button label, from 1.125rem up to 2.5rem on the hero action.
- **Body** (Manrope 500, 17-18px, relaxed): hero sentence and section intros, max width about 28rem.
- **Body small** (Manrope 500, 13-14px, relaxed): item descriptions, two-line clamp on standard cards.
- **Label** (Manrope 800, 11-13px, uppercase, 0.06-0.1em tracking): nav links, tabs, tags, the "from" before a price, ticket field names, the live door-time line. Labels always name an adjacent value or act as a control.

### Named Rules
**The Loud Price Rule.** A price is set in Anton at least as large as the item's name. Never whisper a price in body type.

**The Poster Setting Rule.** Anton is uppercase, tracked 0.005em, leading 0.84-0.92, tabular figures. Never italic, never sentence case, never Anton for running text.

## Layout

A centered 1280px container with 20px gutters on phones and 32px from 768px. The hero is full-bleed, at least the full viewport, with type anchored bottom-left over a left and bottom scrim so the pizza on the right stays visible; the ticker band is pinned to its bottom edge. The menu grid is one column, two from 640px, three from 1024px, with 16px gaps (20px from 768px); the featured item spans two columns. Sides and drinks use compact horizontal rows in one or two columns. Category tabs stick below the 72px header with a fading ink backdrop. Vertical rhythm between categories is 64px (96px desktop). On phones a fixed 72px bottom navigation replaces the header links and the page pads for it plus the safe area; a floating order bar appears once the cart has items. The cart is a right-hand drawer (460px from 640px, full-width below); the item sheet rises from the bottom on phones and centers as a split photo/options dialog on desktop.

## Elevation & Depth

Depth is light. Two families: soft black ambient shadows that seat floating things, and red glow that marks anything actionable, selected or live. Board panels also carry an internal warm backlight from the top edge. A 5% animated film grain overlays the whole page; boards and the ticket carry their own fine grain.

### Shadow Vocabulary
- **Float** (`--shadow-float`, four-layer black, up to 0 64px 120px -32px rgba(0,0,0,.8)): glass sheets, drawer, popovers.
- **Red glow** (`--glow-red`: 1px ember ring at .55, 0 10px 30px -8px and 0 0 64px -12px ember): primary buttons at rest, active states.
- **Red glow hot** (`--glow-red-hot`): primary button hover.
- **Board backlight** (inset 2px warm top line, inset warm wash, faint warm halo, deep black drop): boards at rest.
- **Board lit** (ember 1px ring at .35 and 0 24px 60px -24px ember at .55): boards on hover and focus.
- **Text glow** (0 0 24px ember .55): the one red word in a headline and the cart total.
- **Numeral glow** (0 0 40px ember .75, 0 0 90px ember .45): the tracker's big stage numeral.
- **Ticket drop** (drop-shadow filter, 0 18px 30px black .6): the masked paper ticket, which cannot take box-shadow.

### Named Rules
**The Glow Means Go Rule.** Red glow sits on primary actions, selected options, active tabs and nav indicators, live numerals and the ticker band. These are deliberate, brief-pinned decisions, not decoration to strip. Inert content never glows.

**The Glass Floats Rule.** Glass (blurred, red-tinted, red-edged) appears only on surfaces floating over the page: item sheet, cart drawer, tracker popover, map address card. Small round and square controls on photos use the cream soft-glass. In-flow content is a board, never glass.

## Shapes

Softly squared, never pill-shaped for primary actions. Controls and photo insets use 12px; tabs 10px; popovers and option groups 16px; compact board rows 20px; menu cards 22px; the phone item sheet 28px top corners; the cart drawer 32px on its open edge. Full circles are reserved for icon close buttons, status dots and radio marks. Board frames are thick (3px), with a warmer top edge. The tracker ticket has a perforated top edge cut by a mask, square top and 18px bottom corners.

## Components

### Buttons
Solid, heavy, lit.
- **Shape:** gently squared (12px).
- **Primary:** blaze fill, white Anton label, an inner top highlight and a 3px darker bottom lip like a pressed key, plus the red glow. Heights 44-48px in chrome, 56-64px in sheets and the floating bar, 88-96px for the hero action.
- **Hover:** fill brightens to blaze-hot, glow intensifies, and a single white sheen sweeps across (800ms). Hover only on fine pointers.
- **Active:** scale 0.97 with an inset press shadow.
- **Ghost:** cream at 6% with a 2px cream 16% border, cream Anton label; on hover the border turns ember over a faint red wash. On the cream ticket the ghost inverts to a 2px ink border.

### Chips and Tags
- **Tags:** 11px Manrope 800 uppercase on small 6px-radius blocks: blaze fill for HOT or open-now, cream 10% for neutral flags.
- **Tabs:** uppercase labels on 10px radius; the active tab is a blaze block with a soft red glow that slides between tabs.

### Cards / Containers
- **Corner Style:** 22px menu cards, 20px compact rows.
- **Background:** coal under grain, with a warm backlight pooling from the top and a dark fall-off at the bottom.
- **Border:** 3px cream 20%, top edge warm; lights ember on hover or keyboard focus while the card lifts 4px.
- **Internal Padding:** 20px (24px from 768px). Photo on top with a coal fade into the text; name, two-line description, then the price and a 48px blaze add block that rotates its plus on hover.

### Inputs / Fields
- **Option cards (size):** 14px radius, 2px inset ring cream 10%; selected gets an ember ring, ember 12% fill and a soft red glow, with a thick-ringed radio dot.
- **Segmented (crust):** a 16px ink tray with a sliding 12px blaze block under the selected segment.
- **Checks (add-ons):** rows in a bordered list; checked boxes fill blaze with a red glow.
- **Focus:** a 2px ember outline offset 3px on everything.

### Navigation
- **Header:** wordmark left (flame tile plus Anton name with the neon red half), 13px uppercase links centered, phone and a compact primary Order button right.
- **Mobile:** fixed bottom bar on ink 85% with heavy blur, three items with 11px uppercase labels; the active item has an ember icon and a glowing 3px ember bar along the top edge; the cart count is a small blaze badge.

### Ticker Band
A full-width blaze band pinned to the hero's bottom, running Anton facts at 1.35-1.6rem on a 38s loop with flame-icon separators, a lit-tube text glow, a hot inner top edge and red bloom above. It pauses on hover and stops under reduced motion. On first paint it switches on after the wordmark.

### Neon Wordmark
The red half of the name is a lit tube: crisp red core with a tight edge glow and a faint wide bloom. Used once, on the wordmark, with a one-time stutter-on at load.

### Kitchen Ticket
The tracker's order slip: cream thermal paper with grain and a perforated torn top edge, ink type, dashed tear line, an Anton ETA numeral, and a stage track where red marks what has happened and ink what is pending. Above it the stage name runs at poster scale under a huge ember numeral carrying the numeral glow.

### Photography
Every food photo goes through one night grade (saturated, contrasty, slightly sepia, darkened, warm multiply and vignette). Per-photo art direction lives on the item data as `look`: zoom and origin crop strays out of frame, and tone `dim` sinks a bright studio shot to the board's value.

## Do's and Don'ts

### Do:
- **Do** set every name, headline, price and button label in Anton uppercase, and make prices at least as loud as names.
- **Do** keep the red as light: ember for text, borders and glow; blaze as the fill under white.
- **Do** put the red glow on primary actions, selected options, active tabs, the ticker band, the hero's red line and the tracker numeral. These are brief-pinned; keep them.
- **Do** build in-flow content as grained, backlit boards with a 3px frame that lights ember on hover and focus.
- **Do** reserve glass (red-tinted, 28px blur) for surfaces floating over the page.
- **Do** run every food photo through the shared night grade and fix outliers with the item's `look`, not with a new filter.
- **Do** use the shared curves: ease-out (0.23, 1, 0.32, 1) for responses, expo (0.16, 1, 0.3, 1) for reveals, drawer (0.32, 0.72, 0, 1) for sheets; honor reduced motion.

### Don't:
- **Don't** use italic or serif display type, quiet bordered cards or small grey prices; that is the fine-dining look this world replaced.
- **Don't** add deal tiles, coupon bursts or promo clutter; facts belong on the ticker band.
- **Don't** use flame orange for UI states, prices or controls.
- **Don't** put glass on in-flow cards or sections.
- **Don't** make primary buttons pill-shaped or outline-only; the primary is a solid lit block.
- **Don't** add small uppercase labels above headlines; uppercase labels only name a value or act as a control.
- **Don't** introduce light page sections; the only light surface is the paper ticket.
