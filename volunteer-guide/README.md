# CCBC volunteer guide

A seven-page guide for the volunteers who prepare the Sunday bulletin and the quarterly newsletter in Canva.

## Deliverables

| Item | Location |
| --- | --- |
| Canva design | Design ID `DAHWj7fGVes`, "CCBC Volunteer Guide", in the "CCBC Brand Guide" folder |
| PDF | `exports/CCBC-Volunteer-Guide.pdf` |
| Wording | `../.docs/volunteer-guide-copy.md` |
| Renders and contact sheet | `qa/` |

## Canva folders

Inside "CCBC Brand Guide", folder ID `FAHWimpNmB0`:

| Folder | ID |
| --- | --- |
| 1 Templates — copy, never edit | `FAHWjyK-uC0` |
| 2 Bulletins — weekly issues | `FAHWj-l8gC4` |
| 3 Newsletters — quarterly issues | `FAHWj6QCirA` |
| 4 Artwork and posters | `FAHWjwB3Ua0` |
| Archive — do not edit | `FAHWin8DhaI` |

## Pages

| Page | ID | Title |
| --- | --- | --- |
| 1 | `PB2DlzGKZfVh17R6` | Volunteer guide |
| 2 | `PBCYgMKRQKy0Jhts` | How the account is organized |
| 3 | `PB0bYWSxP7YQbHPZ` | The Sunday bulletin |
| 4 | `PB0GVB3gln8DmLyG` | The newsletter |
| 5 | `PBk5QP2lMd6TjNpg` | Brand rules in brief |
| 6 | `PBZqMxsVbK3rcW1D` | Check before you print |
| 7 | `PBh5s5rhtY3PbNhc` | Bringing in a new volunteer |

## Open items

- Page 1 has a blank for how to reach the account owner: `[How to reach Jeth]`.
- Canva menu names were written from memory of the app and have not been checked against the live screens.
- On page 5, the Warm Cream and White swatches show only thin Gold lines above and below, since they match the page.

## Checks, 2026-09-29

| Check | Result |
| --- | --- |
| Pages | 7, A4 portrait |
| Fonts | Manrope Bold, Inter Bold, Inter Regular |
| Leftover brand guide text | None |
| All seven pages viewed on the contact sheet | Yes. Nothing overlaps. |

## Build notes

- Pages were applied by a helper agent and checked from the exported PDF.
- Some donor text boxes carry an all-capitals setting that the connection cannot see or change. On page 7 the helper avoided three such boxes. If capitals appear after an edit, use a different text box.

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
