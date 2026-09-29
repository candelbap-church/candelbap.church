# CCBC Sunday Bulletin Template Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable bifold Sunday bulletin template in Canva, with cover B and labeled placeholders, that a volunteer can fill in each week.

**Architecture:** One Canva design with three A4 landscape pages. Pages are made by copying text-rich pages from the brand guide master and resizing the copy to landscape, because only existing text keeps Manrope and Inter. Every donor text element is rewritten, restyled, and moved; donor shapes are deleted and new shapes and images are inserted. A small Python check reads the exported PDF.

**Tech Stack:** Canva connection tools (`copy-design`, `resize-design`, `read-design`, `edit-design`, `export-design`, `create-upload-url`, `move-item-to-folder`), Python 3 with Pillow, poppler tools (`pdfinfo`, `pdffonts`, `pdftotext`, `pdftoppm`).

**Spec:** `docs/superpowers/specs/2026-09-29-ccbc-sunday-bulletin-design.md`

## Global Constraints

- Page size 1123 × 794 px. Each panel is 561.5 px wide. Fold at x = 561.5. No printed fold line.
- Panel margins 40 px. Left panel text spans x 40 to 521. Right panel text spans x 602 to 1083. Text stays between y 40 and y 754.
- Palette only: CCBC Blue `#1E3A8A`, Deep Navy `#172554`, Gold `#C8A64B`, Clear Sky `#6DB7DD`, Warm Cream `#FAF8F3`, Charcoal `#1F2937`, White `#FFFFFF`.
- Fonts: heading Manrope, fontRef starts `YAHWcQr43_8`. Body Inter, fontRef starts `YAFdJvSyp_k`. Never use `add_text`; it produces the default font.
- No text smaller than 12 px. Gold and Clear Sky never used for small text.
- Real content is only: "Walk with Jesus", "Going for Christ, Growing in Christ", "Sunday Worship Service, 7:30 AM", "Wednesday Midweek Prayer, 11:00 AM", "Friday Prayer Meeting, 6:00 PM". Everything else is a bracketed placeholder.
- Never edit `DAHHG2knYAI` (the owner's Banners) or `DAHWRXp4nGM` (the brand guide master). Work on copies.
- Canva transactions expire after a few idle minutes. Apply edits with `finalize: keep_open`, check the thumbnail, then commit in a separate call with empty `operations`.
- `update_fill` and resized image boxes can zoom or clip. Follow with `crop_media`.
- Git: commit or push only when the owner says so. Work on branch `bulletin-template`, made from `brand-guide-v1`.
- Downloads use Python `urllib` with header `User-Agent: Mozilla/5.0`. `curl` and `wget` are blocked in this repository.

## Review Focus

1. A volunteer types a long song title or announcement: the text box grows downward and must not run into the next row. Rows need spare height.
2. A volunteer deletes unused rows: the panel must still look intentional with seven rows or three announcements.
3. Printing flips on the long edge by mistake: the inside prints upside down. The how-to page must name the short edge.
4. Grayscale printing: the cover strip and the verse panel must stay readable.
5. A placeholder left unfilled: brackets must be visible enough to catch before printing.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `bulletin/README.md` | Deliverables, Canva IDs, weekly workflow, known limits |
| `bulletin/scripts/check_bulletin.py` | Checks the exported PDF against the spec |
| `bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf` | Print export of pages 1 and 2 |
| `bulletin/qa/rendered/page-1.png`, `page-2.png` | Renders for visual review |
| `bulletin/qa/build-notes.md` | Element IDs, donor pages, anything set by hand |
| Scratchpad `bulletin/ops_p1.json`, `ops_p2.json`, `ops_p3.json` | Canva operation lists |

---

### Task 1: Prove the font method and pick donor pages

**Files:**
- Create: `bulletin/qa/build-notes.md`

**Interfaces:**
- Produces: `TEMPLATE_ID` (the new design ID), page IDs `P1`, `P2`, `P3`, and for each page the list of text element IDs by font family. Later tasks rewrite these elements.

- [ ] **Step 1: Count text elements on every master page**

Call `read-design` on `DAHWRXp4nGM` with `open_transaction: true`, one page at a time, then cancel the transaction. For each page record the number of text elements whose `fontRef` starts with `YAHWcQr43_8` (Manrope) and with `YAFdJvSyp_k` (Inter). Count group children too.

- [ ] **Step 2: Choose three donor pages**

Needs per page:

| Page | Manrope | Inter |
| --- | --- | --- |
| 1, outside | 5 | 12 |
| 2, inside | 2 | 22 |
| 3, how-to | 1 | 2 |

Pick the master pages that meet or exceed each row. One master page may serve twice.

- [ ] **Step 3: Copy and resize**

Call `copy-design` on `DAHWRXp4nGM` with `page_numbers` set to the three donor pages, in the order outside, inside, how-to. Then call `resize-design` on the copy with `{"type": "custom", "width": 1123, "height": 794}`. The resized design is `TEMPLATE_ID`.

- [ ] **Step 4: Verify fonts survived**

Call `read-design` on `TEMPLATE_ID` with `open_transaction: true`. Confirm page dimensions are 1123 × 794 and the font counts match step 1. Expected: counts unchanged.

If no master page has 22 Inter elements, stop and report. The fallback is that the owner sets fonts by hand: select all text, choose Inter, then set the panel headings to Manrope.

- [ ] **Step 5: Title, folder, and notes**

In the open transaction apply `{"type": "update_title", "title": "CCBC Sunday Bulletin — Template"}` and commit. Move the design to folder `FAHWimpNmB0` with `move-item-to-folder`. Record `TEMPLATE_ID`, page IDs, donor pages, and element IDs in `bulletin/qa/build-notes.md`. Note the two leftover designs from copy and resize so the owner can delete them.

---

### Task 2: Prepare the cover strip image

**Files:**
- Create: scratchpad `bulletin/strip.png`

**Interfaces:**
- Produces: `STRIP_ASSET_ID`, a Canva image asset 1748 × 1000 px.

- [ ] **Step 1: Ask about the theme typeface**

Ask the owner whether they have changed the theme words to Manrope in `DAHWi0kisnY`. Build from whatever the design holds at that moment.

- [ ] **Step 2: Export and crop**

Export `DAHWi0kisnY` as PNG at width 1748. Download it. Crop with Pillow:

```python
from PIL import Image
im = Image.open("vertical.png").convert("RGB")
assert im.size == (1748, 2480), im.size
im.crop((0, 560, 1748, 1560)).save("strip.png")
```

- [ ] **Step 3: Measure sharpness**

The strip prints 148.5 mm wide. 1748 px across 148.5 mm is 299 ppi, which is enough. The photograph inside it was enlarged, so also read the photo asset `MAHHG7J1n7o` size with `get-assets` and compute its effective ppi: `original_width / 4633 * 1748 / 5.846`. Record the number in the build notes. Below 150 ppi, tell the owner the photo will print soft.

- [ ] **Step 4: Upload**

Upload `strip.png` with `create-upload-url`. Record `STRIP_ASSET_ID`.

---

### Task 3: Build page 1, outside of the sheet

**Interfaces:**
- Consumes: `TEMPLATE_ID`, `P1` element IDs, `STRIP_ASSET_ID`. Logo asset `MAHWeD4TVG0`. Seal asset `MAHWdp1TBCs`.

For every text element: `replace_text`, then `format_text`, then `resize_element` with width only, then `position_element`, then `layer_element` front. Delete every donor shape and image first, and every unused donor text element last.

- [ ] **Step 1: Shapes and images**

| Element | top | left | width | height | Fill |
| --- | --- | --- | --- | --- | --- |
| Page background | set page background by inserting a rect 0, 0, 1123, 794 | | | | `#FAF8F3` |
| Cover strip image | 0 | 561.5 | 561.5 | 321 | `STRIP_ASSET_ID` |
| Gold rule under strip | 321 | 561.5 | 561.5 | 3 | `#C8A64B` |
| Logo | 364 | 602 | 230 | 67.3 | `MAHWeD4TVG0` |
| Cover foot rule | 706 | 602 | 481 | 2 | `#C8A64B` |
| Back foot rule | 674 | 40 | 481 | 2 | `#C8A64B` |
| Seal | 690 | 40 | 64 | 64 | `MAHWdp1TBCs` |

After inserting each image, apply `crop_media` with left 0, top 0, and the element's width and height.

- [ ] **Step 2: Cover text, right panel**

| Font | Text | top | left | width | size | weight | color |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Inter | `[Sunday, date]` | 462 | 602 | 481 | 14 | bold | `#1E3A8A` |
| Manrope | `Welcome to our church family.` | 492 | 602 | 481 | 30 | bold | `#172554` |
| Inter | `[Welcome text. Two short lines that greet members and first-time guests.]` | 580 | 602 | 440 | 13 | normal | `#1F2937` |
| Inter | `Going for Christ, Growing in Christ` | 722 | 602 | 481 | 12 | normal | `#1F2937` |

Heading line height 1.15. Body line height 1.5.

- [ ] **Step 3: Back text, left panel**

| Font | Text | top | size | weight | color |
| --- | --- | --- | --- | --- | --- |
| Manrope | `New here?` | 40 | 24 | bold | `#172554` |
| Inter | `[Visitor welcome. Three lines on what to expect and who to talk to.]` | 78 | 13 | normal | `#1F2937` |
| Manrope | `Join us` | 170 | 24 | bold | `#172554` |
| Inter | `Sunday Worship Service · 7:30 AM` | 208 | 14 | bold | `#1E3A8A` |
| Inter | `Wednesday Midweek Prayer · 11:00 AM` | 234 | 14 | bold | `#1E3A8A` |
| Inter | `Friday Prayer Meeting · 6:00 PM` | 260 | 14 | bold | `#1E3A8A` |
| Manrope | `Giving` | 320 | 24 | bold | `#172554` |
| Inter | `[Giving details. Two lines.]` | 358 | 13 | normal | `#1F2937` |
| Manrope | `Contact` | 440 | 24 | bold | `#172554` |
| Inter | `[Address]` | 478 | 13 | normal | `#1F2937` |
| Inter | `[Phone]` | 504 | 13 | normal | `#1F2937` |
| Inter | `[Social links]` | 530 | 13 | normal | `#1F2937` |

All at left 40, width 481.

- [ ] **Step 4: Check and commit**

Look at the thumbnail. Confirm in the returned document that no text element has left below 40, right edge above 521 on the left panel, left below 602 on the right panel, or bottom above 754. Commit the transaction.

---

### Task 4: Build page 2, inside of the sheet

**Interfaces:**
- Consumes: `TEMPLATE_ID`, `P2` element IDs.

- [ ] **Step 1: Shapes**

| Element | top | left | width | height | Fill |
| --- | --- | --- | --- | --- | --- |
| Background rect | 0 | 0 | 1123 | 794 | `#FAF8F3` |
| Heading rule, left | 80 | 40 | 60 | 3 | `#C8A64B` |
| Heading rule, right | 80 | 602 | 60 | 3 | `#C8A64B` |
| Sermon marker | 410 | 40 | 4 | 60 | `#C8A64B` |
| Verse panel | 634 | 602 | 481 | 120 | `#172554` |

- [ ] **Step 2: Order of service, left panel**

Manrope heading `Order of service` at top 40, left 40, size 24, bold, `#172554`.

Ten Inter rows at left 40, width 481, size 13, line height 1.5, `#1F2937`. Each row is one text box holding a label line and a detail line. Row pitch 60 px from top 104. The sermon row sits at left 56.

| Row | top | Text |
| --- | --- | --- |
| 1 | 104 | `[Item]\n[Detail]` |
| 2 | 164 | `[Item]\n[Detail]` |
| 3 | 224 | `[Song]\n[Song title]` |
| 4 | 284 | `[Scripture reading]\n[Reference]` |
| 5 | 344 | `[Song]\n[Song title]` |
| 6 | 410 | `[Sermon title]\n[Speaker] · [Scripture reference]` |
| 7 | 476 | `[Item]\n[Detail]` |
| 8 | 536 | `[Song]\n[Song title]` |
| 9 | 596 | `[Item]\n[Detail]` |
| 10 | 656 | `[Item]\n[Detail]` |

Row 6 is bold.

- [ ] **Step 3: Announcements, right panel**

Manrope heading `Announcements` at top 40, left 602, size 24, bold, `#172554`.

Five blocks, pitch 104 px from top 104. Each block is two Inter text boxes at left 602, width 481:

| Part | offset | Text | size | weight | color |
| --- | --- | --- | --- | --- | --- |
| Title | 0 | `[Announcement title]` | 14 | bold | `#1E3A8A` |
| Body | 24 | `[Date and time]\n[Details. Two short lines.]` | 13 | normal | `#1F2937` |

- [ ] **Step 4: Verse panel**

| Font | Text | top | left | width | size | color |
| --- | --- | --- | --- | --- | --- | --- |
| Inter | `[Verse of the week]` | 654 | 626 | 433 | 14 | `#FFFFFF` |
| Inter | `[Reference]` | 706 | 626 | 433 | 12 | `#FFFFFF` |

Both layered to front, above the panel.

- [ ] **Step 5: Check and commit**

Same margin check as Task 3. Also confirm row 10 ends above y 754 and block 5 ends above y 634. Commit.

---

### Task 5: Build page 3, the how-to page

**Interfaces:**
- Consumes: `TEMPLATE_ID`, `P3` element IDs.

- [ ] **Step 1: Shapes**

Background rect 0, 0, 1123, 794, `#FFFFFF`. Gold bar at top 40, left 40, width 6, height 60.

- [ ] **Step 2: Text**

Manrope heading at top 40, left 64, width 900, size 30, bold, `#172554`:

`How to use this template · do not print this page`

Inter body at top 130, left 64, width 900, size 16, line height 1.7, `#1F2937`, numbered list with `list_level: 1` and `list_marker: "decimal"`:

```
Make a copy: File, then Make a copy. Never edit the template itself.
Type over every bracketed placeholder. Filipino or English are both welcome.
Delete any row or announcement you do not need.
Check that no square brackets remain.
Share, then Download, then PDF Print. Choose pages 1 and 2 only.
Print double sided, flipped on the short edge.
Fold once, with the cover on the outside.
```

- [ ] **Step 3: Check and commit**

Look at the thumbnail and commit.

---

### Task 6: PDF check script

**Files:**
- Create: `bulletin/scripts/check_bulletin.py`

- [ ] **Step 1: Write the check**

```python
"""Check an exported CCBC bulletin PDF against the template spec."""
import re
import subprocess
import sys

REAL = [
    "Going for Christ, Growing in Christ",
    "Sunday Worship Service · 7:30 AM",
    "Wednesday Midweek Prayer · 11:00 AM",
    "Friday Prayer Meeting · 6:00 PM",
    "Welcome to our church family.",
]
HEADINGS = ["New here?", "Join us", "Giving", "Contact", "Order of service", "Announcements"]
EXPECTED_PLACEHOLDERS = 45


def run(*cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout


def check(pdf):
    info = run("pdfinfo", pdf)
    assert re.search(r"^Pages:\s+2$", info, re.M), info
    w, h = map(float, re.search(r"Page size:\s+([\d.]+) x ([\d.]+)", info).groups())
    assert abs(w - 842) < 2 and abs(h - 595) < 2, (w, h)

    fonts = {line.split()[0].split("+")[-1] for line in run("pdffonts", pdf).splitlines()[2:]}
    stray = {f for f in fonts if not f.startswith(("Manrope", "Inter"))}
    assert not stray, stray

    text = " ".join(run("pdftotext", pdf, "-").split())
    for phrase in REAL + HEADINGS:
        assert phrase in text, phrase
    found = len(re.findall(r"\[[^\]]+\]", text))
    assert found == EXPECTED_PLACEHOLDERS, found


if __name__ == "__main__":
    check(sys.argv[1])
    print("ok")
```

Placeholder count: cover 2, back 5, order of service 21, announcements 15, verse 2, total 45. Recount from the built pages and correct the constant if a table above changed.

- [ ] **Step 2: Run it against the brand guide PDF to see it fail**

Run: `python3 bulletin/scripts/check_bulletin.py brand-guide/exports/CCBC-Brand-Guide-v1.1-screen.pdf`
Expected: `AssertionError` on the page count.

---

### Task 7: Export, check, and document

**Files:**
- Create: `bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf`, `bulletin/qa/rendered/page-1.png`, `bulletin/qa/rendered/page-2.png`, `bulletin/README.md`
- Modify: `bulletin/qa/build-notes.md`

- [ ] **Step 1: Export**

Call `export-design` on `TEMPLATE_ID` with `{"type": "pdf", "export_quality": "pro", "size": "a4", "pages": [1, 2]}`. Download to `bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf`.

- [ ] **Step 2: Run the check**

Run: `python3 bulletin/scripts/check_bulletin.py bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf`
Expected: `ok`

- [ ] **Step 3: Render and review**

Run: `pdftoppm -r 100 -png bulletin/exports/CCBC-Sunday-Bulletin-Template.pdf bulletin/qa/rendered/page`

Open both renders. Check: nothing crosses the fold, nothing overlaps, the strip is not clipped, the logo is not distorted.

- [ ] **Step 4: Grayscale review**

```python
from PIL import Image
for n in (1, 2):
    Image.open(f"bulletin/qa/rendered/page-{n}.png").convert("L").save(f"bulletin/qa/rendered/page-{n}-gray.png")
```

Open both. The theme words and the verse panel text must stay readable.

- [ ] **Step 5: Long text and deleted rows**

In a transaction that will be cancelled, replace row 3 with `[Song]\nA very long song title that runs well past the width of the panel and wraps` and delete rows 9 and 10. Check the thumbnail: row 3 must not touch row 4, and the panel must not look broken. Cancel the transaction.

- [ ] **Step 6: Write the README**

`bulletin/README.md` holds: the template ID and folder, the weekly steps from the how-to page, the test print instruction, and the known limits from the spec. Record anything the owner must set by hand.

- [ ] **Step 7: Ask the owner for a test print**

Ask the owner to print the PDF double sided, flipped on the short edge, fold it, and confirm the reading order: cover, inside left, inside right, back.

- [ ] **Step 8: Commit, on the owner's word only**

```bash
git switch -c bulletin-template
git add bulletin docs/superpowers/specs/2026-09-29-ccbc-sunday-bulletin-design.md docs/superpowers/plans/2026-09-29-ccbc-sunday-bulletin.md
git status --porcelain
git diff --staged --stat
git commit -m "feat: Sunday bulletin bifold template"
git show --stat HEAD
```
