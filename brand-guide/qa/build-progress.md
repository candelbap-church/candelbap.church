# Master v2 build progress — 2026-09-26

Design: `CCBC Brand Guide — Master v2` · ID `DAHWRXp4nGM` (stable; the `canva.com/d/…` edit links rotate, so open by ID or from the README)
Format: A4 fixed layout, 794 × 1123 px, 18 pages, all committed.

## Build status

All 18 pages laid out, styled, committed, and in final order. Built in three committed batches after an earlier single long transaction was lost to a connector drop.

| Page | Content | Page ID |
| --- | --- | --- |
| 1 | Cover | PBTnGrjljc1cn9Mv |
| 2 | How to use this guide | PBG8gHPklLjL6qpR |
| 3 | Brand foundation | PBbJn9jq9Dk51bt9 |
| 4 | Brand pillars | PBl3sM0nCGNDHTjv |
| 5 | Name and tagline | PBx1MrGhdZkmnmtZ |
| 6 | Logo overview | PBYXjYLPGYHWSfGM |
| 7 | Clear space and minimum size | PBYS0yQ6RxpLTyst |
| 8 | Logo misuse | PBqySND1TBTSXxQN |
| 9 | Core color palette | PBtR5mX50Y0tPcQ6 |
| 10 | Color combinations and accessibility | PBng4lQ3zVMY1vHn |
| 11 | Typography | PBzR8s6cv6jFrWN5 |
| 12 | Photography (merged v2) | PBwVD6Zw0WbtL20n |
| 13 | Graphic elements and layout | PBrg5cBV7YhWpGsl |
| 14 | Voice and bilingual writing | PBjxpwSRJWB9CVqz |
| 15 | Bulletin application (merged v2, logo fix applied) | PBNDw7Hybwb2Zg6N |
| 16 | Website and newsletter applications | PB2QM2fvKf0SVX5w |
| 17 | Event poster application | PBF6TJqNCgCQ7rfP |
| 18 | Production standards and checklist | PBX5JSfdJrMsd6Rg |

## Assets

| Asset | ID |
| --- | --- |
| CCBC logo master (3701 × 1083) | MAHWeD4TVG0 |
| CCBC logo, original (320 × 130), superseded | MAHWFhROQpA |
| Candid fellowship photo (AI style ref) | MAHWNvnmTtc |
| Family portrait (AI style ref) | MAHWNggQlNI |
| Bible study (AI style ref) | MAHWNndoUn0 |
| CCBC seal, standalone, final (1162 × 1162) | MAHWdp1TBCs |
| CCBC seal, first round version, superseded | MAHWcZ1YOUs |

## Standalone seal — 2026-09-28

Page 6 gained a "Standalone seal" section and now calls the full logo the primary mark. Page 8 points to the approved seal file. The copy file carries the same wording. The spec still says "sole institutional mark" and is unchanged.

## Layout system used

- Margins 56 px left/right (15 mm). Content width 682. Label at top 44, title at 87, body from 168.
- Footer: gold rule 682 × 2 at top 1038; tagline at (56, 1065) 12 px charcoal; folio at (698, 1065) 13 px bold navy right-aligned.
- Text: label 12 bold #172554; title 40 bold #172554 lh 1.1; section heading 20 bold; body 15 #1F2937 lh 1.5; card body white 15 lh 1.5; card heading 24–28 bold white.

## Editor finishing pass (cannot be done through the API)

1. Fonts. `add_text` has no font-family control, so all new text is in the design default (Arial-like). Set Manrope on headings and Inter on body per page.
2. Navy recolor on pages 12 and 15: `#102556` / `#1e3964` → `#172554`.
3. Page 12 and 15 body font also differs from the rest; unify to Inter.
4. Optional: the API crops images instead of stretching, so the misuse page shows "on a busy photo, rotated, boxed on dark, cropped". Add a stretched example by hand if wanted.

## Editor pass — 2026-09-28

Done by hand in the editor, then verified by reading the design:

- Titles, section headings, and card headings share one heading font; body text shares one body family on all pages. Font names are not readable through the API.
- Navy on pages 12 and 15 is `#172554`.

Spacing fixes after the font change: page 4 card body text to top 320; page 7 title to size 36 with body at top 178; page 9 "10% Sky · 5% Gold" label widened and right-aligned; page 10 content below the title moved down 16 px.

## PDF QA — 2026-09-28

Export v1: 18 pages, A4, fonts Manrope and Inter by name. All pages reviewed at 144 dpi.

Fixed after the first export, then re-exported:

- Page 10: the approved "Deep Navy on Clear Sky" card sat under "Prohibited pairings"; moved to a third approved row.
- Page 13: the rising line was nearly invisible; redrawn as a filled gold shape.
- Page 18: title broke inside "pre-publication"; title box narrowed to 500. Checklist card shortened to 240.

Left as is: page 11 "Display · Manrope ExtraBold" sample is set in Bold; pages 5 and 16 display text is in Inter.

## Lessons

- Commit after every batch. An open `keep_open` transaction does not survive an MCP reconnect.
- Parallel `edit-design` calls on different pages within one transaction are safe.
- `merge-designs` accepts one operation per call.

## Logo master swap — 2026-09-28

All 16 logo placements on pages 1, 6, 7, 8, 15, 16 and 17 now use the logo master. The old file had transparent padding and the master has none, so each frame was resized to keep the visible logo the same size.

Page 7: the clear-space diagram was redrawn around the tight logo box with X equal to the measured C height, 0.6 of the logo height. The minimum size text now names the 3701 × 1083 master.

`update_fill` zooms the new image and clips it. Follow it with `crop_media` at left 0, top 0 and the frame size.

Editing transactions expire after a few minutes idle. Open one only when ready to apply and commit.
