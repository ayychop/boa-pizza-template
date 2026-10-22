# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Two audiences. Confirmed by the owner (2026-10-22): this is a template sold to independent pizza shops, and "Forno Rosso" is demo branding.

- **The client:** an independent pizza shop owner who wants an ordering site and app experience that feels better than the big chains. They swap in their own name, address, phone, menu, prices and photos.
- **The client's customer** (inferred from the brief): someone hungry, often in the evening or late, usually on a phone, picking a pizza and wanting to know exactly when it lands.

## Product Purpose
A one-page ordering experience for a single pizza shop: browse the menu, customise a pizza (size, crust, add-ons), build an order, choose delivery or collection, check out, and follow the order through a live tracker. Success: an independent shop's site that competes with Domino's on vibe and speed of ordering (owner's stated benchmark).

## Positioning
The chain sites lead with deals and coupons. This template leads with the shop's own fire, dough and timing, and makes the time the pizza reaches you tonight visible on the first screen.

## Constraints and brand commitments
- Stack: React, Vite, Tailwind, Framer Motion, Lenis. Keep app logic intact when restyling.
- Scroll reveals fire once (IntersectionObserver). Mobile-first; bottom nav and modals must hold at phone width.
- No em-dashes in paragraph text.
- All business details, menu items, prices and photos in the demo are sample content for the client to replace. Never invent customers, reviews, ratings or press.
- Visual identity (owner's brief, 2026-10-22): bold American pizza, Anton display with Manrope body, near-black ground, electric red, cream text.

## Open decisions
- Real checkout and payments are not wired; checkout opens the demo tracker.
- Whether clients can keep the dark world or need a light variant.
