# Amaze Design System

The single source of truth for visual and interaction design across all Amaze products (Amaze app, Amaze Mall, Amaze Member, Amaze Affiliate, and related services).

---

## 1. Brand Identity

### Logo
- **Wordmark**: "Amaze" set in a friendly, rounded sans-serif. Lowercase "a" is the typographic anchor.
- **Mark**: A stylized circular ring/spark sitting above the wordmark, used as a standalone icon at small sizes (e.g., favicons, splash, app tile).
- **Clear space**: Maintain padding equal to the height of the lowercase "a" on all sides.
- **Minimum size**: 24px height (digital), 16mm height (print).

### Tone
Friendly, rewarding, optimistic. Visual language leans into rewards, points, and celebration (coins, sparkles, gift motifs).

---

## 2. Color

### Primary — Amaze Blue
| Token | Hex | Usage |
|---|---|---|
| `--color-primary-900` | `#0B2A6B` | Headers, deepest gradient stop |
| `--color-primary-700` | `#1E47B8` | Primary surfaces, hero backgrounds |
| `--color-primary-500` | `#2F6BFF` | Primary buttons, links, active states |
| `--color-primary-300` | `#7BA4FF` | Hover/focus tints, secondary fills |
| `--color-primary-100` | `#E6EEFF` | Subtle backgrounds, badge fills |

Hero/header surfaces use a top-down gradient:
`linear-gradient(180deg, var(--color-primary-900) 0%, var(--color-primary-500) 100%)`

### Accent — Reward Gold
| Token | Hex | Usage |
|---|---|---|
| `--color-accent-600` | `#E8A317` | Points, currency, hero numerals |
| `--color-accent-400` | `#FFC940` | Highlights, coin motifs |
| `--color-accent-100` | `#FFF4D6` | Reward badge backgrounds |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `--color-success` | `#16A34A` | "สำเร็จ" status, confirmations |
| `--color-warning` | `#F59E0B` | Pending, attention |
| `--color-danger` | `#DC2626` | Errors, destructive |
| `--color-info` | `#0EA5E9` | Informational chips |

### Neutral
| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#F4F6FB` | App background |
| `--color-surface` | `#FFFFFF` | Cards, sheets |
| `--color-border` | `#E3E7EF` | Dividers, card outlines |
| `--color-text-primary` | `#0F172A` | Body text, titles |
| `--color-text-secondary` | `#5A6478` | Subtitles, captions |
| `--color-text-tertiary` | `#9099AB` | Placeholders, disabled |

---

## 3. Typography

### Font Stack
- **Primary**: `"LINE Seed Sans TH", "IBM Plex Sans Thai", "Inter", -apple-system, system-ui, sans-serif`
- Must render both Thai and Latin glyphs at consistent optical size.

### Type Scale
| Token | Size / Line | Weight | Usage |
|---|---|---|---|
| `display-xl` | 32 / 40 | 800 | Hero numerals (e.g., reward points) |
| `display-lg` | 24 / 32 | 700 | Section titles ("รายการสั่งซื้อของฉัน") |
| `title-md` | 18 / 26 | 700 | Card titles, screen titles |
| `title-sm` | 16 / 24 | 600 | List items, button labels |
| `body-md` | 14 / 22 | 400 | Default body |
| `body-sm` | 13 / 20 | 400 | Secondary copy |
| `caption` | 12 / 16 | 500 | Tile labels, metadata |
| `overline` | 11 / 14 | 600 | Tags, status badges (uppercase optional) |

---

## 4. Spacing & Layout

### Spacing Scale (4pt base)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`

Tokens: `--space-1` … `--space-10`.

### Grid
- Mobile: 4-column fluid grid, 16px gutters, 16px outer padding.
- Tile grids (quick actions): 4 columns on mobile, 6 columns on tablet+.
- Maximum content width on web: 1200px.

### Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Inputs, small chips |
| `--radius-md` | 12px | Tile cards |
| `--radius-lg` | 16px | Standard cards, sheets |
| `--radius-xl` | 24px | Hero panels, modals |
| `--radius-pill` | 999px | Buttons, search bar, status pills |

### Elevation
| Token | Shadow |
|---|---|
| `--elev-1` | `0 1px 2px rgba(15,23,42,.06)` — list rows |
| `--elev-2` | `0 4px 12px rgba(15,23,42,.08)` — cards |
| `--elev-3` | `0 10px 24px rgba(15,23,42,.12)` — sheets, popovers |

---

## 5. Iconography

- **Style**: Filled, friendly, multi-color illustrative tiles for service entries; outlined monochrome for nav and utility.
- **Grid**: 24×24 base, 2px stroke for outlined icons.
- **Tile icons** sit on a colored rounded square (`--radius-md`) at 56×56 with the glyph centered.
- **Brand mascots/illustrations**: Used in promo cards and empty states; never in functional UI like buttons.

---

## 6. Components

### Buttons
| Variant | Background | Text | Notes |
|---|---|---|---|
| Primary | `--color-primary-500` | `#FFFFFF` | Default CTA, pill radius |
| Secondary | `--color-surface` | `--color-primary-500` | 1px `--color-primary-500` border |
| Tertiary / Text | transparent | `--color-primary-500` | No border |
| Destructive | `--color-danger` | `#FFFFFF` | Confirmation actions |

- Height: 44px (default), 36px (compact), 52px (prominent).
- Padding: 16px horizontal min.
- Disabled: 40% opacity, no shadow.

### Search Bar
- Pill radius, 44px height, white surface on tinted hero, leading search icon, optional trailing actions (notifications, cart).

### Cards
- Surface `--color-surface`, radius `--radius-lg`, padding 16px, shadow `--elev-2`.
- **Promo card**: Full-bleed image with gradient overlay; bold display headline plus CTA pill.
- **Service tile**: Vertical layout — colored icon block on top, caption below, centered.
- **Order card**: Header row (shop logo + name + status pill), product row (thumb + name + qty + price), footer with secondary + primary action buttons.

### Status Pills
- Height 22px, radius pill, `caption` weight 600.
- Success: `--color-success` on `#E7F8EE`.
- Pending: `--color-warning` on `#FEF4E2`.
- Failed: `--color-danger` on `#FCE9E9`.

### Bottom Navigation
- 5 items max: หน้าหลัก, ไลฟ์พอยท์, แอมเมซรีวอร์ด (center, elevated), แอมเมซมอลล์, บัญชี.
- Center action is a 56px circular highlighted button overlapping the bar (-20px offset).
- Inactive: `--color-text-tertiary`. Active: `--color-primary-500` with label weight 600.

### Lists & Tabs
- Tabs: pill-shaped, active uses `--color-primary-500` fill on white; inactive is text-only on a light track.
- List rows: 56px min height, 16px horizontal padding, divider `--color-border`.

### Form Inputs
- 44px height, radius `--radius-md`, 1px `--color-border`, focus ring `--color-primary-300` 2px.
- Labels above input, helper/error text below at `caption`.

---

## 7. Motion

- **Duration**: 150ms (micro), 240ms (standard), 360ms (entrance).
- **Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` for entrances; `ease-in` for exits.
- Reward/celebration moments may use a brief scale-bounce (1.0 → 1.06 → 1.0) on the gold accent.

---

## 8. Imagery & Illustration

- Promotional banners use saturated brand blue backgrounds with energetic illustrations (people, gifts, coins, sparkles).
- Coin/spark motifs reinforce the rewards narrative — reserve for promo and reward surfaces, not utilitarian UI.
- Partner logos (e.g., 7-Eleven, Lotus's, makro, True 5G) appear on white tile chips with even visual weight — do not recolor partner marks.

---

## 9. Content & Language

- Default language: Thai. Latin numerals are acceptable for prices, points, and dates.
- Currency: `฿` precedes the value with no space (`฿260.00`). Always two decimal places.
- Points: Use the word "พอยท์" after the numeric value; numerals bolded in `--color-accent-600` on promo surfaces.
- Dates: `DD MMM YY HH:mm` (e.g., `15 เม.ย. 26 15:59`).

---

## 10. Accessibility

- Minimum contrast: 4.5:1 for body text, 3:1 for large text and UI components.
- Tap targets: ≥44×44px.
- Never rely on color alone — pair status colors with icons and text.
- Support Dynamic Type up to 200%; layouts must reflow without truncation.

---

## 11. Tokens (Reference)

All values above are published as design tokens. Use the token name in code rather than the raw value. Token format: `--color-*`, `--space-*`, `--radius-*`, `--elev-*`, `--font-*`. Platform mappings (iOS / Android / Web) are generated from a single `tokens.json`.

---

## 12. Governance

- Any new component must be proposed against this document before shipping.
- Brand color, logo, and the reward visual motifs are owned by the Amaze brand team — changes require review.
- File issues and proposals in the `amaze-design-system` repo.
