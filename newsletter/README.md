# CCBC newsletter: Going and Growing

A quarterly newsletter template in Canva, built on brand guide version 1.1.

Spec: `../docs/superpowers/specs/2026-09-29-ccbc-newsletter-design.md`

## Deliverables

| Item | Location |
| --- | --- |
| Canva template | Design ID `DAHWjlYrtF0`, "CCBC Newsletter — Going and Growing — Template", in the "CCBC Brand Guide" folder |
| PDF of the blank template | `exports/CCBC-Newsletter-Template.pdf` |
| Renders, color and grayscale | `qa/rendered/` |

The social image set is not built yet.

## Pages

| Page | ID | Contents | Master donor page |
| --- | --- | --- | --- |
| 1 | `PBNSBXLCX8jDHHVR` | Masthead, theme strip, lead story, pastor's note | 13 |
| 2 | `PB2lt2NqKwKCzhVM` | Ministry updates, calendar, prayer, thanksgiving, contact panel | 14 |

## Workflow for each issue

1. Open the template in Canva and make a copy: File, then Make a copy. Never edit the template itself.
2. Type over every bracketed placeholder. Filipino or English are both welcome.
3. Drag the lead photograph and the event poster onto their frames.
4. Delete any row, item, or ministry column you do not need.
5. Check that no square brackets remain.
6. For print: Share, then Download, then PDF Print. Print double sided, flipped on the long edge.
7. For sharing: Share, then Download, then PDF Standard.

## Assets

| Asset | ID |
| --- | --- |
| Theme strip, 2366 × 520 px, from the wide trial `DAHWi85PczA` | `MAHWjuM3WmI` |
| Photo placeholder, 3:2 | `MAHWjsuUK28` |
| Poster placeholder | `MAHWjgvDQL0` |
| Logo master | `MAHWeD4TVG0` |

## Checks, 2026-09-29

| Check | Result |
| --- | --- |
| Pages | 2, A4 portrait |
| Fonts | Manrope Bold, Inter Bold, Inter Regular |
| Placeholders | 34 |
| Leftover brand guide text | None |
| Renders viewed | Both pages, in color |
| Grayscale renders | Made, not reviewed |
| Test print | Not done |

## Known limits

- The pages were applied by a helper agent and checked from the exported PDF and renders.
- Page names in Canva still show the donor names. The connection cannot rename pages.
- The name "Going and Growing" has not been checked against other churches or publications.
- The social icons are recolored to White. Each platform's rules on recoloring have not been checked.
- There is no check script for the newsletter yet.

## Brand Templates, 2026-09-29

The three templates were published as Canva Brand Templates. Publishing converted each design into a Brand Template, so the old design IDs no longer resolve and the templates no longer appear in a folder. They are under Brand, then Brand Templates.

| Template | Brand Template ID | Former design ID |
| --- | --- | --- |
| CCBC Sunday Bulletin — Template | `EAHWjxAq6HI` | `DAHWjeEq9uA` |
| CCBC Sunday Bulletin — Trifold Template | `EAHWjzmIaZQ` | `DAHWjQOnG6s` |
| CCBC Newsletter — Going and Growing — Template | `EAHWj09_UgE` | `DAHWjlYrtF0` |

The publish call returned "Not allowed to access brand template", but the templates were created. To change a template, make a draft from the Brand Template, edit the draft, and publish it again.

### Editable masters, 2026-09-29

The owner could not see the templates after they became Brand Templates, so an editable copy of each was made from its Brand Template and filed in the folder "1 Templates — copy, never edit" (`FAHWjyK-uC0`).

| Template | Editable master design ID |
| --- | --- |
| CCBC Sunday Bulletin — Template | `DAHWj5XxPFs` |
| CCBC Sunday Bulletin — Trifold Template | `DAHWj8teK0w` |
| CCBC Newsletter — Going and Growing — Template | `DAHWj6U18i4` |

The bifold copy was exported and passes `check_bulletin.py`. The trifold and newsletter copies were not exported. Element and page IDs in these copies differ from the IDs recorded earlier in this file.

Through the Canva connection, making a draft of a Brand Template fails with "User does not have permission", while creating a design from one works.
