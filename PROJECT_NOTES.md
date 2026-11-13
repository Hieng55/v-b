# V&B Nails Prescott: build notes

Last updated: November 14, 2026

## Confirmed requirements

- Position the brand for clients who prefer a refined, luxury, high-end experience.
- Use gold with tonal variation. Gold is an accent, not the full-page background.
- Use only `Jost` and `Forum`.
- No visible font size may be smaller than `12px`.
- Keep the style system explicit, the code clean, and components reusable.
- Build exactly one section per approval round. Do not start the next section until the client approves the current one.
- Select information according to the purpose of each section. Do not place every supplied detail everywhere.
- Maintain this file so the next developer can see decisions, progress, and the next task.

## Shared design system

- `Forum`: brand and display moments.
- `Jost`: body copy, navigation, buttons, labels, and UI.
- Palette: warm ivory surfaces, espresso text, dark umber utility surfaces, restrained metallic-gold gradient accents.
- Gold gradient: `--gold-gradient` in `styles.css`. Reuse the token; do not recreate local gradients.
- Layout width: `--shell-width`; responsive page gutter: `--gutter`.
- Spacing: 4px-based scale (`--space-1` through `--space-10`).
- Corners are intentionally square to feel tailored and architectural.
- UI motion is short and restrained, with a reduced-motion fallback.
- Accessibility baseline: semantic landmarks, keyboard focus, Escape-to-close mobile menu, 44px+ tap controls, minimum 12px text.

## Information inventory

- Address: 1260 Gail Gardner Way #123, Prescott, AZ 86305
- Phone: (928) 541-9521
- Facebook: https://www.facebook.com/vandbnailprescott/
- Instagram: https://www.instagram.com/vbnailsprescott/
- Google Maps: https://maps.google.com/?cid=10515550225017140876
- Hours: Monday to Saturday, 9:30 AM to 6:30 PM. Sunday closed.

Usage note: the header uses a shortened address and phone only. Social links and full hours are reserved for Contact/Footer, where visitors expect them.

## Required brand SVG resources

For Facebook, Instagram and Google Maps, use the original-color SVG assets from `thesvg.org`. This is a client requirement, not an optional styling preference.

Approved source pages:

- Facebook: https://thesvg.org/icon/facebook
- Instagram: https://thesvg.org/icon/instagram
- Google Maps: https://thesvg.org/icon/google-maps

Project assets downloaded from the direct theSVG endpoints:

- `images/icons/facebook.svg`
- `images/icons/instagram.svg`
- `images/icons/google-maps.svg`

Implementation rules:

- Preserve every SVG's original embedded brand colors.
- Use the SVG as an `<img>` or another method that preserves its internal fills and gradients.
- Do not replace the original colors with the website gold palette.
- Do not apply CSS `fill`, `stroke`, `color`, `filter`, `mask`, `mix-blend-mode`, opacity tinting or monochrome variants to these brand icons.
- Backgrounds and spacing around an icon may follow the site design, but they must not visually recolor or obscure the icon.
- Keep an accessible text label or `aria-label` on the parent link. A decorative icon inside an already labeled link should use empty `alt` text.
- Reuse the stored local files instead of downloading duplicate variants in later sections.

## Completed: header

- Added a two-level sticky header with a dark utility bar and ivory primary navigation.
- Navigation order follows the visitor journey: Home, About Us, Services, Gallery, Contact Us.
- `Book Appointment` is visually separated as the primary action and currently calls the salon because no online booking URL was supplied.
- Reused the supplied V&B logo without redrawing or replacing it.
- Added responsive mobile navigation, keyboard behavior, active state, hover/focus/pressed states, and reduced-motion support.
- Added foundational CSS tokens for future sections.

Files:

- `index.html`: semantic header markup and future page insertion point.
- `styles.css`: shared tokens, global foundation, header component, responsive states.
- `script.js`: mobile menu behavior and reusable Home hero slider controller.
- `PROJECT_NOTES.md`: requirements and handoff log.

## Completed: Home hero slider

- Added a full-viewport Home hero with three coordinated editorial nail images.
- Slider motion uses a slow image push and controlled crossfade. It avoids aggressive movement that would conflict with the luxury direction.
- Added previous/next controls, direct slide pagination, touch swipe, autoplay, hover/focus pause, page-visibility pause, and reduced-motion behavior.
- Kept one fixed message across the slides so visitors can read without moving copy.
- Added a localized left-side scrim on desktop and bottom scrim on mobile. The photographs remain visible instead of receiving a full-frame overlay.
- Mobile uses a separate crop, bottom-aligned copy, and reachable controls.
- Generated images are illustrative beauty campaign assets, not claims or photographs of the physical salon.
- Optimized delivery JPGs are used in the page. Original PNG generations remain in `images/` as project source assets.

Hero copy:

- Headline: `Made beautiful. Made yours.`
- Supporting text: `Nail care shaped with precision, comfort and an eye for timeless detail.`
- Primary action: `Book Appointment` using the existing temporary phone action.
- Secondary action: `Explore Services` pointing to the future Services section.

Hero image prompts used the built-in image-generation workflow with one shared art direction: photorealistic luxury beauty campaign, subjects on the right, negative space on the left, warm ivory, espresso and champagne gold, no text, logos, watermarks or fictional salon interior.

### Hero refinement after review

- Client feedback: the first hero direction was acceptable but felt too rigid.
- Root causes identified: three-line headline block, square CTA and arrow controls, line-style pagination, and a straight left-to-right scrim.
- Softened the composition without changing the approved images: two-line offset headline, fine curved gold flourish, elliptical local scrim, circular arrows and pagination, rounded hero CTA, gentler casing, slower crossfade and slower image drift.
- The shared header component remains unchanged. These softer shapes are scoped to the Hero only.

### Mobile header and Hero rebuild after review

- Client feedback: the earlier phone view felt crude and looked like a compressed desktop layout.
- Research and visual audit identified four causes: a two-row header consuming too much height, an icon-only framed menu, a full-height photograph darkened to support all copy, and too many elements stacked vertically over the image.
- Mobile now uses a compact single-row header with the logo, a visible `Call` action and a labeled `Menu` control. Desktop header behavior is unchanged.
- The phone Hero is separately art-directed as an editorial cover: the brighter slider occupies the upper plane and an ivory copy sheet overlaps it from below.
- Hero text is now dark on a dedicated ivory surface, so the photograph no longer needs a heavy full-frame shade. Only a narrow local gradient remains behind the slider controls.
- Slider controls sit at the image-to-paper seam; headline, supporting copy and both actions remain visible in the opening viewport on common phone sizes.
- The implementation brief and layer contract are recorded in `MOBILE_HERO_BRIEF.md`.
- Verified requirements remain in force: Jost and Forum only, visible text at least 12px, restrained motion and a complete reduced-motion state.

### Mobile app-shell correction after second review

- Client feedback: the ivory editorial-sheet direction still felt like a brochure and did not express the requested modern web-app character.
- Replaced the mobile-only editorial sheet with a cohesive midnight-blue application surface derived from the salon's blue interior details and the Services palette.
- The fixed mobile app bar, photographic stage, compact slider capsule and booking actions now read as one interface system instead of separate poster elements.
- Removed the mobile decorative flourish and large white foreground plane. Luxury now comes from material contrast, restrained gold, typography and photographic scale.
- Slider arrows and pagination are consolidated into one compact control capsule. Booking and Services use a consistent two-action dock.
- Desktop Header and Hero remain unchanged.

### White 100vh mobile Hero correction

- Client explicitly rejected `#0b2d38` as the mobile Hero background.
- Mobile Header, full-screen menu and Hero content surface now use true white.
- The mobile Hero is exactly `100svh` with a 640px safety minimum for compact phones and no desktop-style maximum-height cap.
- The headline and supporting copy are centered. The primary booking button sits directly below the copy, followed by the quieter Services link.
- Slider controls retain the compact app capsule but switch to a white surface with dark controls and restrained gold state.
- Desktop remains unchanged.

### Mobile slider control removal

- Client requested removal of the arrow and pagination capsule on mobile.
- The capsule is hidden only below `52rem`; desktop slider controls remain visible.
- Mobile visitors can swipe horizontally directly on the Hero image to change slides. Vertical page scrolling remains available through `touch-action: pan-y`.
- Autoplay remains enabled unless the visitor prefers reduced motion.

## Completed: About Us

- Built an editorial About section using the three real salon photos supplied by the client.
- The symmetrical manicure view is the anchor image. Pedicure and manicure detail views overlap as supporting layers instead of repeating equal cards.
- Added a soft circular gold join, curved image corners, subtle scroll entrance and restrained image hover movement to continue the softer direction approved for the Hero.
- Added concise factual copy about the salon space and experience without inventing years in business, awards, testimonials or service claims.
- Included the supplied location, operating hours and direct Facebook, Instagram and Google Maps links after explicit client approval to show them in About Us.
- About hours are displayed compactly as Monday to Saturday, 9:30 AM to 6:30 PM; Sunday closed.
- Facebook, Instagram and Google Maps use the stored original-color theSVG assets without recoloring.
- Original PNG files remain unchanged. Optimized JPG delivery copies are used by the page.
- Mobile stacks the gallery above the copy and recomposes the three-image collage instead of shrinking the desktop layout.

## Completed: Services

- Transcribed the supplied printed service menus into semantic HTML. The menu photos are reference material only; text remains selectable, responsive and accessible.
- Organized the full menu into four keyboard-accessible tabs: Pedicure, Nail Services, Polish & Extras, and Waxing.
- Preserved all supplied prices and the `& Up` starting-price wording.
- Pedicure levels, add-ons, nail enhancements, fills, dipping powder, nail care, polish changes, removal, repair, paraffin wax and waxing are represented.
- Added a concise pricing note for extra-service fees, the 3% card merchant fee and the missed-appointment charge.
- The section uses a deep blue ground derived from the salon interior so it is visually distinct from the cream About section while retaining the gold accent system.
- Desktop uses a sticky category ledger. Mobile uses an accessible 2 by 2 category grid and a single-column price list.

### Services mobile refinement after review

- Client feedback: the first mobile Services layout felt unbalanced.
- Root causes identified: horizontally clipped category tabs, an oversized intro area and tall pedicure blocks with prices separated from service names.
- Replaced the horizontal rail with a fully visible 2 by 2 category grid on mobile.
- Reduced mobile intro spacing without dropping below the 12px typography floor.
- Pedicure names and prices now share one row, with supporting descriptions directly below.
- Tightened panel headings, group spacing and footer rhythm. Desktop Services remains unchanged.

### Services white-background revision

- Client requested a white background for Services on both desktop and mobile.
- Replaced the deep-blue Services canvas with white while preserving the existing structure, content and accessible tab behavior.
- Introduced reusable Services color tokens for white canvas, warm off-white active surfaces, espresso text, muted brown copy, gold accents and subtle warm dividers.
- Dark-mode white borders and pale-gold text were replaced with contrast-safe warm brown and deeper gold values.

### Mobile service selector refinement

- Client requested a more considered treatment for the four mobile category buttons.
- Rebuilt them as a reusable 2 by 2 selector inside one warm-ivory app tray instead of four unrelated outlined pills.
- Each option now shows an index, title and short description. The selected option uses espresso, ivory and one restrained gold marker.
- Added surface depth, active elevation and clear focus/tap states without changing tab semantics or keyboard behavior.

## Completed: Customer Reviews & Recognition

- Built one standalone Reviews section using the salon's real award wall as the primary proof point.
- Preserved the supplied full-resolution source at `images/V & B Nails Award Wall.png` and added the delivery-optimized `images/award-wall.jpg` used by the page.
- The award caption reflects what is visibly documented on the wall: 17 recognized years spanning 2003 through 2025. No unsupported star rating or review count is shown.
- Included three short public customer excerpts with direct links to their Nextdoor and Loc8NearMe source pages.
- Added a clear Google Maps action for visitors who want to read more reviews.
- Desktop uses an editorial split composition: a review ledger beside an arched award photograph. Mobile changes the reviews into a touch-scrollable, snap-aligned rail and stacks the award image at full readable width.
- Reused the existing Forum/Jost type system, gold tokens and reveal behavior; all visible copy remains at least 12px.

### Reviews white-background revision

- Client requested a white background for the Reviews section.
- Replaced the original espresso canvas with white, warm off-white review surfaces, espresso typography, deeper gold accents and warm brown dividers.
- Preserved the approved editorial layout, award image, review sources and mobile swipe behavior.

### Shared section rhythm revision

- Client found the transitions from About Us to Services and from Services to Customer Reviews too far apart.
- Added the reusable `--section-bridge-space` token and applied it symmetrically to both sides of those section boundaries.
- Kept the larger opening space above About Us, while tightening only the approved internal page sequence on desktop and mobile.

### Reviews year-strip removal

- Removed the decorative year timeline from the bottom of Customer Reviews at the client's request.
- Removed its unused responsive CSS. The concise `17 years recognized` caption remains beside the award image.

## Completed: Contact Us

- Built a single appointment-focused Contact section on a white page canvas with one warm-ivory concierge surface.
- Used only supplied business information: phone, address, operating hours, Facebook, Instagram and Google Maps.
- The primary action calls the salon directly. The location panel opens the supplied Google Maps destination.
- Reused a real salon interior photograph and the stored original-color theSVG social and Google Maps assets.
- Deliberately omitted a contact form because no email destination or booking system has been supplied; the page does not present a false submission flow.
- Desktop uses an asymmetric split between booking copy and the salon image. Mobile becomes a single-column composition with full-width tap targets and a location card kept inside the image boundary.
- All visible text remains at least 12px and uses the established Forum/Jost typography system.

## Completed: Footer

- Added a semantic site footer on a light ivory surface to close the page without introducing another dark section.
- The footer contains the real logo, a concise brand line, direct phone booking, links to sections that currently exist, the supplied address and hours, plus original-color Facebook, Instagram and Google Maps SVGs.
- Gallery is intentionally omitted from the footer navigation until that section exists, avoiding a new dead link.
- Desktop uses a restrained editorial information row. Tablet changes to two columns and mobile to one column with a two-column navigation list.
- Phone, address, social and back-to-top actions are real links with visible focus and hover states. All visible text remains at least 12px.
- The Contact-to-Footer transition reuses `--section-bridge-space` so the page ending does not introduce the oversized gap removed elsewhere.

### Transparent logo replacement

- Replaced the white-background logo in both Header and Footer with the client-supplied `images/V&B Nails Prescott Logo.png`.
- Verified the replacement is an 811 by 551, 32-bit PNG with a genuine alpha-transparent background.
- The original logo remains in `images/` as source material but is no longer referenced by the page.

### Footer production credits

- Added linked production credits after the copyright: `Designed by TD Transactions` and `Developed by Webs4V`.
- Verified and linked the official destinations `https://tdtransactionsllc.com/` and `https://webs4v.vn/`; both open in a new tab with safe `rel` handling.

## Multi-page navigation architecture

- Home remains `index.html` and continues to contain every approved homepage section.
- Header navigation now opens independent URLs: `about.html`, `services.html`, `gallery.html` and `contact.html`.
- `section-page.js` treats Home as the canonical content source, then loads only the requested section plus the shared Header and Footer into each independent page. Section HTML therefore remains single-source and does not drift between duplicated files.
- Services tabs, mobile navigation, reveal behavior and active-page state are initialized after the shared content is mounted.
- Footer navigation uses the same page URLs. Reviews remains Home-only and links to `index.html#reviews`.
- Gallery has an independent route and a restrained pending state, but no Gallery content was invented because that section has not yet been designed and approved.
- Standalone pages include unique titles and descriptions. Mobile section pages reserve space for the fixed app header.

### Mobile Reviews clipping fix

- Fixed the Award Wall card being clipped on the right edge on mobile.
- Root cause: the intentionally full-bleed swipe rail contributed an oversized intrinsic width to the one-column Reviews grid; the section's hidden overflow masked it from page-level overflow checks.
- The mobile Reviews grid now uses `minmax(0, 1fr)` and explicitly allows its content and proof columns to shrink within the viewport. The swipe rail remains full-bleed and horizontally scrollable.

## Next task after client approval

Build the Gallery section only. Do not build Contact or Footer in the same approval round.

## Open decisions

- No online booking URL has been supplied. The current CTA uses `tel:` as a safe temporary action.
- Three verified salon interior photos are now supplied and used in About Us. Generated Hero imagery remains editorial mood imagery rather than documentation of the location.
- Service list and pricing were supplied as two photographed printed menus and transcribed into the Services section.
