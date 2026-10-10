# THRIVE Power Bites — Research & Strategy

**Document 01 of the website programme · Status: for client approval · Oct 2026**

This document is the architecture phase. Nothing is built yet. It defines *what* we will build, *why*, and *how we will know it worked*. Every later step (storyboard frames, design, code) must trace back to a decision here.

---

## 0. Executive summary

- **The idea:** "I weigh 20 grams." The whole site is the first-person life story of one THRIVE bite, told through scroll-driven 3D, from seed to your hand — and the story itself is the shop.
- **The goal:** one cinematic, single-page experience that (a) tells the complete brand story, (b) sells directly, and (c) is good enough to compete for Awwwards SOTD, FWA of the Day, CSS Design Awards and the Webby Awards.
- **What the research says matters most:** juries reward *execution* over effects. On Awwwards, Design (40%) and Usability (30%) outweigh Creativity (20%) and Content (10%). A beautiful site that is slow, confusing or janky on mobile loses.
- **India reality:** 66–77% of Indian web traffic and ~80% of e-commerce transactions are on mobile. The mobile experience is the primary design, not a cut-down version.
- **Critical finding:** the current packaging claims "100% Natural". Under FSSAI rules a composite food cannot be called "natural", and FSSAI advised in May 2025 against using "100%" claims. The website copy must not repeat this; packaging should be reviewed (see §6).
- **Next step after approval:** Document 02 — frame-by-frame storyboard and style frames.

---

## 1. Inputs we have

| Input | File | Notes |
|---|---|---|
| Real product photo | `assets/reference/real-product-photo.jpg` | Date-based ball, glossy reddish-brown, chunky peanuts / cashews / almonds, red berry pieces, hand-rolled |
| Brand board | `assets/reference/brand-board.png` | Wordmark, two-leaf symbol, palette, tagline "Nourishing Everyday. The Natural Way." |
| Packaging + dimensions | `assets/reference/packaging-and-dimensions.png` | 5 box designs, sliding tray, hanging display, dieline, specs |
| Concept renders (AI) | `assets/concepts/*.png` | Hero, 20 g scale, cross-section, ingredient burst — **concept only, not production** |

### Product facts (from the spec sheet)

| Spec | Value |
|---|---|
| Bite weight | 20 g |
| Diameter | 35 mm nominal (33–37 mm tolerance) |
| Pack | 3 pieces / 60 g |
| Outer box | 150 × 55 × 40 mm, 300–350 GSM food-grade SBS |
| Inner tray | 135 × 50 × 25 mm, PET / PPET, 40 mm cavities, 22–25 mm deep, 42–45 mm centre-to-centre |
| Hanging hole | 30 × 10 mm, reinforced |
| Wrap | Gold foil per bite |

These real numbers are a storytelling asset. Award juries love specificity: "35 millimetres. 20 grams. Wrapped in gold." is stronger than any adjective.

### Brand palette (sampled from the board — to be confirmed with source files)

| Role | Colour | Approx. hex |
|---|---|---|
| Primary dark | Forest green | `#1F3A2B` |
| Secondary | Olive / leaf | `#6B7F3A` |
| Accent | Gold | `#C9A04E` |
| Light | Warm cream | `#F4EBDD` |
| Earth | Cocoa brown | `#6B3E26` |

---

## 2. Award landscape — what we are designing against

### 2.1 Judging criteria

| Award | What is scored | What this means for us |
|---|---|---|
| **Awwwards** (SOTD, Dev Award) | Design 40%, Usability 30%, Creativity 20%, Content 10%. Min. 18 jurors, outliers removed, 5-day vote. Honourable Mention needs ≥ 6.5. Separate Dev Award scores Semantics/SEO, Animations, Accessibility, Performance (WPO), Responsive, Markup. | Typography, composition and motion polish carry the score. Navigation must stay obvious. Real copy only — placeholder text is penalised. |
| **FWA** (FOTD → FOTM → FOTY) | Innovation, Design, Creativity, Content, User experience. Favours experimental, motion-heavy, WebGL work. | We need at least one *never-seen-before* moment — our gold-foil wrap and 3D box fold. |
| **CSS Design Awards** | Visual design, Usability (incl. accessibility, responsive, task completion), Creativity, Content, Technical execution. | "Task completion" = buying must be easy. Progressive enhancement is scored. |
| **Webby Awards** | Content, Structure & Navigation, Visual Design, Functionality, Interactivity, Innovation, Overall Experience. Explicitly values speed, cross-browser, accessibility, low-bandwidth users. | Relevant categories: *Best Visual Design – Aesthetic*, *Best User Experience*, *Technical Achievement*, *Food & Beverage* (Websites). Accessibility is part of visual-design judging. |

### 2.2 Recent food & drink winners we studied

| Site | Award | What they did well | Lesson for THRIVE |
|---|---|---|---|
| **La Revoltosa** (Spanish soda, by Waka) | Awwwards SOTD | Written entirely in **first person** — the brand tells you its life story in chapters. 3D bottle with scroll + mouse interaction. Each flavour is "its own world": 3D, background, palette and copy change together. WebGL + GSAP + Three.js, CMS-managed content. | Adopt the first-person voice. Make each chapter a distinct "room". Keep content editable by the client. |
| **More Nutrition – Iced Matcha** | Awwwards SOTD (Nov 2025) | Tightly controlled palette; product made to feel "tangible and alive". 3D section is a **scroll-driven frame sequence drawn to `<canvas>`** (not video, not real-time 3D) — image-swap was laggy, canvas was smooth. | For the most photoreal shots, pre-rendered frame sequences on canvas beat real-time 3D on mid-range phones. |
| **Savor** (by Resn) | Awwwards SOTD (Sep 2025) | Food science story told through bold typography, scroll animation and a strong product page. | Typography animation is a cheap, high-impact way to score Design points. |
| **Mammoth Meatball** | Awwwards SOTD (2023) | One product, one surprising story, 3D + storytelling, minimal palette. | A single product with a clear narrative can win — no catalogue needed. |

### 2.3 What separates winners from near-misses

1. **Choreography, not decoration.** Scroll, cursor, type and media respond continuously. Parallax heroes are now table stakes.
2. **Disciplined layout.** Big type, generous whitespace, small palette. The motion is the decoration.
3. **Considered loading and transitions** that hide load time.
4. **Real device performance.** Jurors open it on phones. Jank costs more than ambition earns.
5. **Ship finished.** Juries score what ships; submit only when everything is polished (Awwwards gives 3 months from approval to win SOTD).

---

## 3. Market & competitor research (India)

### 3.1 Category context

- Indian healthy snacking is moving from "dry fruits as a commodity / festive gift" to **branded, portion-controlled, functional everyday snacks**.
- Consumers are increasingly **ingredient-conscious**: sugar, preservatives, additives and processing are actively checked.
- Protein bars lead quick-commerce healthy snacks; date-and-nut balls / laddoos are a growing white space.
- Distribution battleground: own D2C site + Amazon / Flipkart + quick commerce (Blinkit, Zepto, Instamart).

### 3.2 Competitors

| Brand | Product | Positioning | Gap THRIVE can own |
|---|---|---|---|
| **Nutty Gritties – Daily Date** | Date-based indulgent sweet | 130-year dry-fruit legacy; "post-meal sweet craving" moment | They own *after-meal*; THRIVE can own *the energy moment* (morning, workout, 4 pm slump). |
| **NutraNation** | Protein laddoos (oats, almonds, dates) | "Real Laddoo. Real Protein." Price-led (~₹33–39 / laddoo) | They compete on protein & price. THRIVE competes on **craft & premium feel** (gold wrap, gift-worthy box). |
| **Kibi Kibi** | Date-based protein balls, pea/rice protein | Plant-based, no added sugar, playful flavours | Isolate-based protein vs THRIVE's whole-ingredient story. |
| **Handful of Health** | Premium nuts, Medjool dates, hampers, bars | Premium sourcing, gifting, omnichannel | Commodity-led; no single hero product story. |
| **Millwize** | Millet snacks sweetened with dates & jaggery | Science-led, millet superfood | Different base ingredient. |

### 3.3 THRIVE's position (proposed)

> **The everyday bite that feels like a gift.**
> Whole dates, nuts and seeds, hand-rolled into one 20-gram bite and wrapped in gold.

- **Against protein brands:** we don't sell numbers, we sell a ritual — a premium moment you give yourself.
- **Against dry-fruit brands:** we are a finished, designed product, not a commodity.
- **Signature asset:** the gold-foil wrap. No competitor owns it. It is also the website's hero animation.

> ⚠️ Positioning claims must be backed by the real recipe and nutrition panel, which we do not yet have (see §11).

---

## 4. Audience

India-first, English now, multilingual next. Mobile-first.

| Persona | Who | When they eat it | What they need from the site | Buys |
|---|---|---|---|---|
| **The Busy Professional** (26–40, metro) | Office-goer, skips breakfast, 4 pm slump | Desk drawer, commute | Fast proof it's clean; quick reorder / subscription | 3-pack, monthly box |
| **The Fitness Regular** (20–35) | Gym / run / yoga | Pre- or post-workout | Ingredient + nutrition clarity, energy per bite | Multi-packs |
| **The Conscious Parent** (30–45) | Wants a better tiffin sweet | Kids' lunchbox, evening snack | Reassurance: ingredients, no added sugar (if true), allergens | Family packs |
| **The Gifter** (25–55) | Diwali, Rakhi, corporate gifting | Festivals, thank-yous | Beautiful packaging, gift message, bulk / corporate order | Gift boxes, hampers |

The site's chapter "Life moments" maps directly to these four personas.

---

## 5. Narrative platform — the brand story

### 5.1 The voice

**First person, the bite speaks.** Warm, confident, short sentences. Never preachy. (Proven by La Revoltosa's SOTD.)

> *"I weigh 20 grams. I am 35 millimetres across. And I took a long journey to get to your hand."*

### 5.2 Story arc (8 chapters on one page)

| # | Chapter | Story beat (what the visitor understands) | Emotion |
|---|---|---|---|
| 0 | **Arrival** | A gold leaf draws itself. *"Every great thing starts small."* | Curiosity |
| 1 | **Hello, I'm Thrive** | The bite, alone, in light. Its exact size and weight. | Intrigue |
| 2 | **Where I come from** | Dates, almonds, cashews, peanuts, berries, seeds — where they grow. | Warmth, trust |
| 3 | **How I'm made** | Ingredients pull together and are hand-rolled into one sphere. | Fascination |
| 4 | **What's inside me** | The bite splits; every ingredient is labelled. Nutrition panel. | Reassurance |
| 5 | **Dressed in gold** | Gold foil wraps the bite. *Signature moment.* | Delight, "wow" |
| 6 | **My home** | The box folds itself; three bites drop into the tray. **Choose your pack → Add to cart.** | Desire |
| 7 | **When you need me** | Morning, desk, gym, tiffin, gifting. | Belonging |
| 8 | **Take me with you** | Final call to action, reviews, subscription, FAQ. | Decision |

### 5.3 Draft copy lines (compliance-safe — to be verified against the real recipe)

- *"I weigh 20 grams. Every one of them earns its place."*
- *"Dates. Almonds. Cashews. Peanuts. Seeds. Rolled by hand."*
- *"No added sugar. No preservatives."* — **only if lab-verified** (see §6)
- *"Wrapped in gold, because you are worth it every day."*
- *"Nourishing Everyday."* (tagline, shortened — see §6)

---

## 6. Compliance findings — must resolve before copywriting

> This is research, not legal advice. Have an FSSAI labelling consultant confirm before launch.

| Claim (current) | Issue | Recommendation |
|---|---|---|
| **"100% Natural"** (packaging badge) | FSSAI (Advertising & Claims) Regulations 2018, Schedule V: a **composite food cannot be described as "natural"**; it may say **"made from natural ingredients"** only if every ingredient meets the conditions. FSSAI's advisory of **28 May 2025** asks food businesses to **discontinue "100%"** claims. Products have received notices for exactly this wording. | Replace with **"Made from natural ingredients"** (if all ingredients qualify) or list the ingredients plainly. Do not use on the website. Review packaging. |
| **"The Natural Way"** (tagline) | Phrases like "nature's way" / "natural goodness" are cited as exaggerated uses of "natural". "The Natural Way" is close to this. | Use **"Nourishing Everyday."** on the site; get legal view before printing the full tagline again. |
| **"No Preservatives"** | Allowed if true, must be substantiated. | Keep only with lab / formulation evidence. |
| **"Rich in Nutrients"** | Nutrient-content claims ("rich in", "high in") need specific thresholds per nutrient. | Replace with a specific, verified claim (e.g. "source of fibre") once the nutrition panel exists. |
| **"Natural Energy" / "Energy Booster"** | Functional claims must be scientifically substantiated. | Prefer descriptive language: "a 20 g bite of dates and nuts". |
| **"Plant Based"** | Generally fine if no animal-derived ingredients (e.g. honey, ghee, milk solids). | Confirm recipe. |

Website copy will be written **only** from the verified ingredient list and nutrition panel.

---

## 7. Experience architecture

### 7.1 Page structure (single cinematic homepage + light utility pages)

```
/                      Cinematic story + shop (chapters 0–8)
/shop/[pack]           Product detail (SEO, sharing, ads landing) — reuses chapter 6 scene
/cart (drawer)         Slide-in cart, never leaves the story
/checkout              Shopify / Razorpay checkout (UPI first)
/gifting               Corporate & festive gifting enquiry
/our-story, /faq       Plain, accessible text versions of the story (SEO + accessibility)
/legal/*               Privacy, terms, shipping, refunds, FSSAI licence no.
```

### 7.2 Scene-by-scene blueprint (to be expanded into frames in Doc 02)

| Ch. | Visual | Motion & interaction | Technique | Commerce hook | Mobile version | Reduced-motion fallback |
|---|---|---|---|---|---|---|
| 0 Arrival | Gold leaf on forest green | Leaf stroke draws as assets load; real load % | SVG path animation | — | Same | Static logo, instant |
| 1 Hello | Hero bite, rim light (concept: `thrive-hero-single-bite.png`) | Light orbits with scroll; bite tilts toward cursor | Real-time 3D (photogrammetry model) | Persistent "Shop" pill | Gyroscope tilt | Still photo |
| 1b 20 g truth | Bite on scale (concept: `thrive-20g-scale.png`) | Bite drops with weighted bounce; digits count 0 → 20 g | 3D + physics easing | — | Same, simplified | Still + "20 g" text |
| 2 Origins | Ingredients and their origins | Horizontal journey; ingredients float, react to cursor | 3D instanced meshes + illustrated map | — | Vertical stack | Ingredient grid |
| 3 Making | Ingredient burst → sphere (concept: `thrive-ingredient-burst.png`) | Scroll pulls ingredients inward, reversible | **Pre-rendered frame sequence on canvas** (photoreal) | — | Lower-res frame set | 3 key stills |
| 4 Inside | Bite splits (concept: `thrive-cross-section.png`) | Halves separate; labels draw to each ingredient; nutrition panel slides in | Frame sequence + HTML labels | "See ingredients" | Same | Static cross-section + table |
| 5 Gold wrap | Foil wraps bite | Foil folds, crinkles and catches light, scrubbed by scroll | Frame sequence (cloth sim rendered in Blender) or custom shader | — | Same, shorter | Wrapped still |
| 6 My home | Dieline → box → tray | Box folds; tray slides; 3 bites drop in. Drag to rotate. Switch between 5 designs | Real-time 3D (glTF box) | **Pack selector, Add to cart in-scene; box flies into cart icon** | Tap to rotate; sticky buy bar | Product cards + button |
| 7 Moments | 4–5 life scenes | Horizontal scroll; lighting / colour of the bite changes per time of day | Photo/video + 3D bite overlay | "Subscribe & save" | Swipeable cards | Static cards |
| 8 Finale | Bite flies to camera → gold → logo | Final burst, then calm CTA area | 3D + DOM | Buy, subscribe, gifting, reviews, FAQ | Same | Static |

### 7.3 Navigation & usability rules (30% of the Awwwards score)

- Always-visible minimal header: logo · chapter progress · language · cart.
- **Chapter index**: a progress rail that lets users jump to any chapter (and skip straight to "Shop").
- Scroll must feel natural: smooth, but never hijacked so hard the user loses control.
- Cart, pack selection and checkout must work with keyboard and screen reader.
- Sound off by default; one clear toggle.

---

## 8. Commerce design

- **Engine (recommended):** Shopify (products, inventory, orders, discounts, subscriptions) used headless via the **Storefront API**, with a custom Next.js front end. Client manages catalogue without developers.
- **Payments:** UPI first (≈ 60–65% of Indian online payments), cards, wallets, COD. Shopify Payments / Razorpay (Magic Checkout for one-tap mobile checkout).
- **Catalogue v1:** 3-pc / 60 g · 6-pc · 12-pc · festive gift box · monthly subscription.
- **Conversion features:** sticky mobile buy bar from Chapter 6 onward, in-scene add-to-cart, slide-in cart, free-shipping threshold indicator, reviews, gift message, pin-code delivery check.
- **Marketplaces later:** Amazon, Flipkart, Blinkit / Zepto / Instamart — the site links out once listed.
- Mobile converts at roughly half the desktop rate in India; every extra step on mobile checkout costs sales.

---

## 9. Multilingual strategy

- **v1: English only**, but built i18n-ready from day one: no text baked into images or videos; all copy in a CMS / translation files; URLs like `/en/…`.
- **v2 candidates:** Hindi, then Tamil / Telugu / Kannada / Marathi / Bengali based on order data. Arabic later for Gulf export (requires right-to-left layout support — planned in CSS from the start).
- Typography: pick fonts with **Devanagari and other Indic script companions** now, so the luxury look holds in every language (e.g. a serif family with matching Indic cuts).
- Translations by native copywriters, not machine-only — the first-person voice must survive translation.

---

## 10. Technical architecture & performance budget

### 10.1 Stack (proposed)

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | SEO, i18n routing, Shopify integration, image optimisation |
| 3D | Three.js via React Three Fiber, custom GLSL shaders | Industry standard on award sites (used by La Revoltosa) |
| Scroll & motion | GSAP + ScrollTrigger, Lenis smooth scroll | Proven award-site combination |
| Photoreal scenes | Pre-rendered frame sequences (Blender) drawn to `<canvas>` | Smooth on mid-range phones (More Nutrition approach) |
| Assets | glTF + Draco/Meshopt, KTX2 textures, AVIF/WebP frames | Small downloads |
| Sound | Howler.js (optional, off by default) | — |
| Commerce | Shopify Storefront API + checkout | — |
| CMS | Shopify metaobjects or a headless CMS (Sanity) | Client edits copy and translations |
| Hosting | Vercel (or similar) with an Indian edge region | Fast in India |

### 10.2 Performance budget (mobile, mid-range Android, 4G)

| Metric | Target |
|---|---|
| First meaningful view (hero visible) | < 2.5 s (LCP) |
| Interaction responsiveness (INP) | < 200 ms |
| Layout shift (CLS) | < 0.1 |
| Initial JS | < 200 KB gzipped |
| Hero 3D asset | < 1.5 MB |
| Frame rate | 60 fps desktop, ≥ 45 fps steady on mid-range mobile |
| Total page weight | Progressive: chapters stream in as the user approaches them |

Device tiers: high-end gets full real-time 3D; low-end / data-saver gets frame sequences or stills automatically.

### 10.3 Accessibility (scored by Awwwards Dev Award, CSSDA and Webby)

- WCAG 2.2 AA target: contrast, focus states, keyboard navigation, alt text, captions.
- `prefers-reduced-motion` respected — full story still told with stills and text.
- Every 3D scene has a semantic HTML equivalent (also good for SEO).

---

## 11. Asset production plan

| Asset | Source | Priority |
|---|---|---|
| **Photogrammetry 3D scan** of a real bite (60–100 macro photos) | Shoot real product | Critical |
| Gold-foil wrapped bite (photo + 3D) | Shoot + Blender | Critical |
| Ingredient 3D models (date, almond, cashew, peanut, berry, seeds) | Scan or model | High |
| Box + tray 3D model from the real dieline | Model from spec sheet | High |
| Macro photography & short video (making, hands rolling) | Shoot | High |
| Lifestyle photography for 4 personas | Shoot | Medium |
| Sound design (forest ambience, foil crinkle, soft UI sounds) | Commission / license | Medium |
| Logo, fonts, vector files (source) | **Client** | Critical |
| Verified ingredient list, nutrition panel, FSSAI licence no. | **Client** | Critical |

The AI concept renders in `assets/concepts/` are for storyboarding only. Production visuals must show the real product, for both authenticity (jurors and customers) and advertising compliance.

---

## 12. Success measures

| Goal | KPI |
|---|---|
| Awards | Awwwards HM → SOTD; FWA of the Day; CSSDA WOTD; Webby nomination |
| Story engagement | ≥ 60% of visitors reach Chapter 5 (gold wrap); avg. engagement time > 90 s |
| Commerce | Add-to-cart rate, mobile conversion rate, checkout completion, subscription uptake |
| Performance | Core Web Vitals "Good" on ≥ 75% of mobile visits |
| Brand | Social shares, press / design-blog features, branded search growth |

---

## 13. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Heavy 3D slows mobile and hurts sales | Device tiering, frame sequences, streaming chapters, strict budget |
| Story delays the purchase | Persistent Shop pill, chapter jump, sticky buy bar, direct `/shop` pages for ads |
| Non-compliant claims | Copy only from verified data; FSSAI consultant review |
| Visuals don't match real product | Photogrammetry of the real bite; no AI imagery in production |
| Gold-foil scene is technically hard | Prototype it first (Doc 03), with a pre-rendered fallback |
| Translations break layout / voice | i18n-ready layout, Indic fonts chosen now, native copywriters |

---

## 14. Open questions for the client

1. Exact **recipe / ingredient list** and **nutrition panel** per bite (calories, protein, fibre, sugars)?
2. Is there **any added sugar, honey, ghee or milk**? (affects "no added sugar", "plant based")
3. Are there **flavours** beyond the original? Planned?
4. **Price** for 3-pc / 60 g and other packs? Subscription interest?
5. Which of the **5 box designs** is the launch design (or should the site let users choose)?
6. **Shelf life** and storage (affects shipping promises and the gold-foil story)?
7. Who makes it, where, and how? (Founder story, hand-rolled or machine-formed — the story must be true.)
8. Do you already have **Shopify** or another store / payment account?
9. Domain name, FSSAI licence number, GST details for checkout?
10. Can we arrange a **product shoot and 3D scan**?

---

## 15. Next steps (after approval of this document)

1. **Doc 02 — Storyboard & style frames:** frame-by-frame script for every chapter, final copy drafts, key visual frames on desktop and mobile.
2. **Doc 03 — Technical prototypes:** gold-foil wrap scene and box-fold scene on real mid-range phones.
3. **Design system:** type, colour, motion principles, components.
4. **Build:** chapter by chapter, with commerce integrated from the start.
5. **Polish & QA:** performance, accessibility, device lab, sound.
6. **Launch → award submissions** (case-study video, screenshots, write-up).

---

## Sources

- Awwwards — Evaluation System: https://www.awwwards.com/about-evaluation/
- Awwwards — La Revoltosa SOTD & case study: https://www.awwwards.com/sites/la-revoltosa · https://www.awwwards.com/la-revoltosa-rebooting-a-70-year-old-spanish-soda-brand-for-the-scroll-generation.html
- Awwwards — More Nutrition case study: https://www.awwwards.com/more-nutrition-you-deserve-more.html
- Awwwards — Savor SOTD: https://www.awwwards.com/sites/savor
- Awwwards — Mammoth Meatball SOTD: https://www.awwwards.com/sites/mammoth-meatball
- The FWA — About: https://thefwa.com/about/about-fwa
- The Webby Awards — Judging criteria & categories: https://www.webbyawards.com/judging-criteria/ · https://www.webbyawards.com/about/categories/
- CSS Design Awards — Judging: https://cssawards.org/judging
- Nutty Gritties interview (Daily Date): https://www.medianews4u.com/consumers-globally-are-becoming-far-more-ingredient-conscious-and-informed-dinika-bhatia-nutty-gritties/
- NutraNation: https://nutranation.co.in/ · Kibi Kibi: https://www.eatkibikibi.com/collections/protein-balls
- Handful of Health profile: https://www.recurclub.com/company/handful-of-health-private-limited
- Millwize launch: https://www.prittleprattlenews.com/food/millwize-millet-snacking-startup-launch-india-d2c/
- FSSAI claims ("natural", composite foods): https://foodsafetyworks.com/insights/conditions-behind-the-conditional-claims/ · https://www.foodlabelsolutions.com/info-centre/Packaged-Foods/decoding-food-labelling-claims-in-india-what-you-need-to-know/ · https://www.thehindu.com/news/national/explained-misleading-food-ads-and-regulations-to-curtail-them/article66815388.ece
- FSSAI non-compliant product notices (May 2025 "100%" advisory referenced): https://currentbokaro.com/wp-content/uploads/2026/09/List-of-Non-Compliant-Product.pdf
- Mobile share India: https://gs.statcounter.com/platform-market-share/desktop-mobile/india · https://prioridata.com/data/mobile-internet-traffic/
- India m-commerce & UPI share: https://www.digiflute.com/blogs/ecommerce-vs-mcommerce-strategy-indian-smes-2026/
- Shopify mobile vs desktop conversion: https://www.shopify.com/in/blog/mobile-vs-desktop-conversion-rates
- Shopify headless / Storefront API: https://www.shopify.com/in/enterprise/blog/headless-commerce
