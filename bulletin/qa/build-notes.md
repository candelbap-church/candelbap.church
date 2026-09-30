# Bulletin template build notes

Built 2026-09-29 from `docs/superpowers/plans/2026-09-29-ccbc-sunday-bulletin.md`.

## Canva designs

| Design | ID | Note |
| --- | --- | --- |
| CCBC Sunday Bulletin — Template | `DAHWjeEq9uA` | The template. In folder `FAHWimpNmB0`. |
| Donor copy, portrait | `DAHWjWeO3_g` | Leftover from the build. Safe to delete. |
| Walk with Jesus — vertical trial | `DAHWi0kisnY` | Source of the cover strip |
| Walk with Jesus — brand color trial, wide | `DAHWi85PczA` | Not used by the bulletin |
| Banners, the owner's original | `DAHHG2knYAI` | Untouched |

## Font method

Text made through the Canva connection cannot choose a typeface. The template pages are copies of brand guide master pages, resized to 1123 × 794 px. Every text box is an existing Manrope or Inter box, rewritten and moved.

| Template page | Master page | Manrope boxes | Inter boxes |
| --- | --- | --- | --- |
| 1, outside | 20 | 5 | 16 |
| 2, inside | 9 | 2 | 22 |
| 3, how-to | 2 | 3 | 9 |

Page 2 uses every Inter box the donor page has. Adding a text box to page 2 through the connection is not possible without losing the font. Add boxes by hand in Canva, by duplicating an existing one.

## Assets

| Asset | ID |
| --- | --- |
| Cover strip, 1748 × 1000 px | `MAHWjXFgYPk` |
| Logo master | `MAHWeD4TVG0` |
| Standalone seal | `MAHWdp1TBCs` |
| Theme photograph | `MAHHG7J1n7o`, 2917 × 1562 px |

The strip is rows 560 to 1560 of the vertical trial export. The theme photograph prints at about 188 ppi inside the strip: 2917 px stretched to 4633 px on a 1748 px page that prints 148.5 mm wide.

## Decisions made during the build

- The welcome heading fits on one line, so the welcome text sits at top 544, not 580.
- The theme keeps its original typeface. The vertical trial had not been changed when the strip was made.
- The sermon marker is 44 px tall, not 60, to match the height of the two-line sermon row.
- Order of service rows are 440 px wide, not 481, to keep lines short.
- The verse reference sits at top 694, not 706, to stay inside the panel.
- Pages 2 and 3 were applied by a helper agent, against the owner's choice of native execution. They were then checked in this session from the exported PDF and renders.

## Page IDs

| Page | ID |
| --- | --- |
| 1, outside | `PBcKNZnqmw5SC63X` |
| 2, inside | `PBDxFWNtMmTrhzn2` |
| 3, how-to | `PBGPZJqDqDNr6mRr` |

Canva still shows the donor page titles: "11 Typography", "09 Palette", and "02 How to use". The connection cannot rename pages.

## Checks, 2026-09-29

| Check | Result |
| --- | --- |
| `check_bulletin.py` on the two-page PDF | ok |
| Fonts in the PDF | Manrope Bold, Inter Bold, Inter Regular |
| Placeholders | 45 |
| Page size | A4 landscape |
| Grayscale render | Readable. "JESUS" in Gold turns mid gray and is the weakest element. |
| Long song title, tested in a discarded draft | A title that wraps to a second line ends 6.6 px above the next row. A title that wraps to a third line would overlap it. |
| Two rows deleted, tested in a discarded draft | The panel holds together, with empty space at the foot. |
| Test print and fold | Not done. The owner's step. |

## Trifold, 2026-09-29

| Design | ID | Note |
| --- | --- | --- |
| CCBC Sunday Bulletin — Trifold Template | `DAHWjQOnG6s` | The template. In folder `FAHWimpNmB0`. |
| Donor copy, portrait, three pages | `DAHWjY_lpfE` | Leftover. Safe to delete. |
| Donor copy, portrait, one page | `DAHWjrcf9as` | Leftover. Safe to delete. |
| Donor copy, landscape, one page | `DAHWjsGypk8` | Leftover. Safe to delete. |

| Page | ID | Master donor page |
| --- | --- | --- |
| 1, outside | `PBTHw6l2yM6rD5PJ` | 11 |
| 2, inside | `PBLtVkywPyYM7RNs` | 14 |
| 3, how-to | `PBzL3F1lg2yR1BZy` | 2 |

Folds on page 1 at x = 369 and 746. Folds on page 2 at x = 377 and 754. Panel margins are 28 px.

The first outside page was built on master page 20, which has five Manrope boxes. The greeting needed a sixth, so the page was rebuilt on master page 11 and the first version was deleted.

| Asset | ID |
| --- | --- |
| Cover artwork, rows 330 to 2000 of the vertical trial | `MAHWjpWdkDY` |
| Poster placeholder, 313 × 319 | `MAHWjgvDQL0` |
| Poster placeholder, 313 × 235, no longer used | `MAHWjouTke0` |

Pages were applied by helper agents, with the owner's agreement, and checked in this session from the exported PDFs and renders.

## Contact details and icons, 2026-09-29

Both templates carry the address, phone, email, four social icons, and the single handle `candelbap.church`. The icons are vector shapes inserted from SVG paths.

## Checks, final

| Check | Bifold | Trifold |
| --- | --- | --- |
| `check_bulletin.py` | ok | ok |
| Placeholders | 42 | 40 |
| Grayscale renders | Made | Made, not yet reviewed |
| Test print and fold | Not done | Not done |

## White background and welcome versions, 2026-09-29

- Pages 1 and 2 of both templates have a White page background, set with `recolor_element` on the page ID. The owner expects to print on white paper.
- The cover welcome and the visitor welcome are in Filipino.
- Page 4 of each template holds twelve cover welcome versions in English and Filipino. It was built on a copy of master page 9.

| Template | Page 4 ID |
| --- | --- |
| Bifold | `PBd4nTF06ygRbzqs` |
| Trifold | `PBcf0QtKjs7JV5B4` |

Element IDs change when a page is inserted into another design with `merge-designs`. They are kept by `copy-design` and `resize-design`. Read the page before writing operations for it.

Leftover donor designs, safe to delete: `DAHWjiZEu7o` and `DAHWjv7_NUg`.

| Check | Bifold | Trifold |
| --- | --- | --- |
| `check_bulletin.py` | ok | ok |
| Placeholders | 40 | 38 |
| Fonts in the full PDF | Manrope, Inter | Manrope, Inter |
| Page 4: twelve "Week" entries, no donor text | Yes | Yes |
| Page 4 render | Viewed | Identical to the bifold render |
| Filipino checked by a native speaker | No | No |
| Test print and fold | Not done | Not done |
