# CCBC Sunday bulletin

Two reusable bulletin templates in Canva, a bifold and a trifold, built on brand guide version 1.1.

Spec: `../docs/superpowers/specs/2026-09-29-ccbc-sunday-bulletin-design.md`

## Deliverables

| Item | Location |
| --- | --- |
| Bifold template | Design ID `DAHWjeEq9uA`, "CCBC Sunday Bulletin — Template", in the "CCBC Brand Guide" folder |
| Trifold template | Design ID `DAHWjQOnG6s`, "CCBC Sunday Bulletin — Trifold Template", same folder |
| Print PDF of the blank bifold | `exports/CCBC-Sunday-Bulletin-Template.pdf` |
| Print PDF of the blank trifold | `exports/CCBC-Sunday-Bulletin-Trifold-Template.pdf` |
| PDF check | `scripts/check_bulletin.py` |
| Cover welcome copy, twelve versions | `content/welcome-copy.md`, and page 4 of each template |
| Build notes | `qa/build-notes.md` |

## Bifold format

One A4 sheet, landscape, printed both sides, folded once into four A5 panels.

| Side | Left panel | Right panel |
| --- | --- | --- |
| Outside, page 1 | Back: visitor welcome, schedules, giving, contact | Cover: theme, logo, date, welcome |
| Inside, page 2 | Order of service | Announcements and verse |

Page 3 is a how-to page and page 4 holds the twelve cover welcome versions. Do not print either.

## Trifold format

One A4 sheet, landscape, printed both sides, folded twice into six panels. The inside flap is 2 mm narrower than the other panels.

| Side | Left panel | Middle panel | Right panel |
| --- | --- | --- | --- |
| Outside, page 1 | Inside flap: special announcements, two poster frames | Back: visitor welcome, schedules, giving, contact | Cover: theme, logo, date, welcome |
| Inside, page 2 | Order of service | Sermon notes, with ruled lines | Announcements and verse |

Fold the right panel in first, then the left panel over it, so the cover is on the outside.

Special announcements are events that come with a poster. Drag each poster onto a frame. The poster carries its own title, date, and place, so the frames have no captions.

## Weekly workflow

1. Open the template in Canva and make a copy: File, then Make a copy. Never edit the template itself.
2. Type over every bracketed placeholder. Filipino or English are both welcome.
3. Delete any row or announcement you do not need.
4. Check that no square brackets remain.
5. Share, then Download, then PDF Print. Choose pages 1 and 2 only.
6. Print double sided, flipped on the short edge.
7. Fold once, with the cover on the outside.

## Checking the blank template

```bash
python3 bulletin/scripts/check_bulletin.py bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf bifold
python3 bulletin/scripts/check_bulletin.py bulletin/exports/CCBC-Sunday-Bulletin-Trifold-Template.pdf trifold
```

The check expects the blank template. A filled-in bulletin fails it, because the placeholders are gone.

## Real content in the template

- Theme: Walk with Jesus
- Tagline: Going for Christ, Growing in Christ
- Sunday Worship Service, 7:30 AM
- Wednesday Midweek Prayer, 11:00 AM
- Friday Prayer Meeting, 6:00 PM
- Greeting: Welcome to our church family.
- Cover welcome: Masaya kaming narito ka. Unang beses mo man o matagal ka nang kasama, halika at lumakad kasama si Hesus.
- Visitor welcome: Maligayang pagdating. Umupo ka kahit saan, sundan ang bulletin na ito, at magtanong sa sinuman sa amin.
- Address: Bansalagin St. Bgy. Pahinga Norte, Candelaria, Quezon
- Phone: 042-585-8829
- Email: hello@candelbap.church
- Facebook, Instagram, YouTube, and website: candelbap.church

Update these in the templates themselves if they change.

## Known limits

- The theme artwork keeps its original typeface and does not follow the guide's photography rules, by the owner's choice.
- The Canva connection cannot choose a typeface or lock elements. Add new text boxes by duplicating an existing one in Canva.
- The theme changes once a year. Replace the cover strip image in the template when it does.
- The Facebook, Instagram, and YouTube icons come from the Simple Icons set, recolored to Deep Navy. The globe icon was drawn for this template. Each platform's own rules on recoloring its logo have not been checked.
- The Filipino welcome copy was drafted by Claude and has not been checked by a native speaker.
- The page background is White, for printing on white paper. The brand guide's calm direction uses Warm Cream, which would print as a tint with a white border on an office printer.

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
