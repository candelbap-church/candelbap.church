# Canva Master Review — 2026-09-26

Reviewed designs:

| Design | ID | Type | Pages | Covers |
| --- | --- | --- | --- | --- |
| CCBC Brand Guide — Master | DAHWGUzdEP0 | Canva Doc | 10 | Guide pages 1–9 |
| CCBC Brand Guide — Pages 10–18 | DAHWGQSPoDg | Canva Doc | 9 | Guide pages 10–18 |
| CCBC Photography Standard v2 | DAHWNmPpaA4 | A4 fixed layout | 1 | Replacement page 12 |
| CCBC Bulletin Application v2 | DAHWNm43QP8 | A4 fixed layout | 1 | Replacement page 15 |

## Structural (blocking)

| # | Issue | Resolution |
| --- | --- | --- |
| S1 | Both main designs are Canva Docs, not A4 print designs. Content reflows, pages overflow (logo overview, typography, photography, website all spill past one page), and margins/bleed cannot be controlled. Spec §13–14 requires A4 portrait print. | Rebuild as one A4 fixed-layout design. The two v2 pages already use the correct format and are the quality bar. |
| S2 | Guide is split across four separate designs. | Merge into a single 18-page master. |
| S3 | Master pages 4 and 10 render blank. Brand pillars copy exists but does not appear on page 4. | Resolved by rebuild. |
| S4 | Working title "CCBC Brand Guide — Pages 10–18" appears as running text on every page of the second design. | Remove; use a single consistent folio. |
| S5 | Page numbering is inconsistent: "01 / 18", "02", "FOLIO 06", "07", "09", "Page 16". | One folio style, bottom outer corner, all pages. |

## Brand compliance

| # | Page | Issue | Resolution |
| --- | --- | --- | --- |
| B1 | 15 (Bulletin v2, full-color) | Logo sits in an improvised white rectangle on the navy field. Page 8 of the guide explicitly forbids this. | Place logo on the cream area, or use a reversed asset if one exists (none currently does). |
| B2 | 17 (Event poster) | Poster mockup carries invented event details: "Sat, May 24 · 6:00 PM · City Hall Plaza · Register today". Spec and plan forbid invented events. | Use only "Community Fellowship", "Date · Time · Location", "Learn more". |
| B3 | 14 (Voice) | Speech-bubble text "palabras que edifican y dan vida" is Spanish, not Filipino. | Replace with a Filipino line or remove the bubbles. |
| B4 | 1 (Cover) | Hero image is an AI-generated modern building unrelated to CCBC and carries no AI disclosure label, unlike the photography page. | Use a labeled AI style reference, an actual CCBC photo, or a non-photo cover. |
| B5 | 8 (Logo misuse) | Four boxes show only an ✕ and a word. No actual misuse examples. Spec §14 item 4 requires misuse examples. | Show the real logo distorted in each box (stretched, recolored, rotated, boxed). |
| B6 | 7 (Clear space) | Clear space is a 3×3 table of the words "Clear space". Not a diagram. | Draw the logo with a measured C-height clear-space boundary. |
| B7 | 9 (Palette) | Swatch labels wrap mid-word ("supportin g", "backgroun d"). Gold swatch label is gold-on-gold. | Widen swatches; use Deep Navy label text on Gold and Clear Sky swatches. |
| B8 | 6 (Logo overview) | Generator scaffolding left in copy: "FOLIO 06", "FIELD / EDITABLE LABEL" table, "RESTRAINTS" heading. | Delete. |
| B9 | 1 (Cover) | "CCBC Brand Guide" appears twice (hero and body), plus a stray ↗ glyph and a "CCBC" bar with "01 / 18" pill. | One title, one tagline, one formal name, one folio. |
| B10 | 2 | Empty blue bar with a slash, and a Clear Sky pill reading "source of truth" in lowercase. | Remove bar; make the pill a proper subheading. |
| B11 | 10–18 section openers | Each opener repeats the page title twice (hero band, then H1 below). | Keep one. |
| B12 | 16 (Website/newsletter) | Mockups are text with highlighted labels, not layouts. | Build simple framed mockups like the bulletin v2 page. |
| B13 | All | Fonts not verifiable from thumbnails. | Confirm Manrope headings and Inter body in the editor before export. |

## Keep as-is

- Photography Standard v2: strong, correctly labeled AI style references, matches spec §10. Use as page 12 and as the layout template for other pages.
- Bulletin v2: correct format and hierarchy. Fix B1 only.
- Color combinations page (10): approved/prohibited pairings table is complete and uses ✓/✕ markers, not color alone.
- Copy throughout matches the approved copy file; no new brand claims found.

## Resolution — 2026-09-26

Rebuilt as `CCBC Brand Guide — Master v2` (ID `DAHWRXp4nGM`), A4 fixed layout, 18 pages, single design. See `build-progress.md` for the page map.

| # | Resolution |
| --- | --- |
| S1–S5 | Resolved by rebuild: fixed A4 pages, one design, no blank pages, no working title, one folio style. |
| B1 | Fixed. Logo moved onto a cream band; white box removed on both bulletin variants. |
| B2 | Fixed. Poster mockup uses "Community Fellowship", "Date · Time · Location", "Learn more" only. |
| B3 | Fixed. Speech bubbles dropped; example uses the approved Filipino line. |
| B4 | Fixed. Cover is a typographic blue field with the real logo on cream; no AI image. |
| B5 | Fixed. Misuse page shows the real logo on a busy photo, rotated, boxed on dark, and cropped. |
| B6 | Fixed. Clear-space page has a measured X-height boundary diagram. |
| B7 | Fixed. Swatch labels no longer wrap; navy text on all swatch cards. |
| B8–B11 | Fixed. No scaffolding, no duplicate titles. |
| B12 | Fixed. Website and newsletter shown as framed mockups. |
| B13 | Open in editor. API cannot set font family; set Manrope/Inter by hand. Also recolor v2 navy to `#172554`. |

## Status

Rebuild complete. Remaining: B13 editor pass, then Task 5 export.
