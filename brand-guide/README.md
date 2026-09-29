# CCBC Brand Guide

This directory contains the approved copy, build brief, asset manifest, export, and QA evidence for the CCBC institutional brand guide.

The editable Canva master is the source of truth. The PDF export is the distribution copy.

## Deliverables

| Item | Location |
| --- | --- |
| Canva master | Design ID `DAHWRXp4nGM`, title "CCBC Brand Guide — Master" |
| Canva Brand Kit | "CCBC", ID `kAGm289Zlqg`: logo, seal, seven colors, Manrope and Inter, brand voice |
| Canva backup of version 1.0 | Design ID `DAHWiZsxb_k`, title "CCBC Brand Guide — v1.0 backup (2026-09-29)" |
| Distribution PDF, print quality | `exports/CCBC-Brand-Guide-v1.1.pdf` |
| Distribution PDF, smaller file for email and screens | `exports/CCBC-Brand-Guide-v1.1-screen.pdf` |
| Logo master | `assets/ccbc-logo-typeset-high-resolution.png` and `.svg` |
| Standalone seal | `assets/ccbc-seal-round-final.png` |
| Approved spec | `../docs/superpowers/specs/2026-09-23-ccbc-brand-guide-design.md` |
| Approved copy | `content/ccbc-brand-guide-copy.md` |
| QA contact sheet | `qa/contact-sheet.png` |
| Asset manifest | `assets/manifest.md` |

Canva edit links rotate, so find the master by its design ID or title in the CCBC Canva account.

## Canva folders

| Folder | Contents |
| --- | --- |
| CCBC Brand Guide (`FAHWimpNmB0`) | The master. Edit only this design. |
| CCBC Brand Guide / Archive — do not edit (`FAHWin8DhaI`) | The two original documents, the two standalone v2 pages, and the version 1.0 backup. Titles start with "ARCHIVED". |

Canva designs cannot be deleted or locked through the API. To remove an archived design for good, move it to the trash in Canva.

The earlier Canva Docs (`DAHWGUzdEP0`, `DAHWGQSPoDg`) and the two standalone v2 pages (`DAHWNmPpaA4`, `DAHWNm43QP8`) are superseded.

## Status

- Canva master: A4 portrait, fixed layout, 20 pages. Manrope headings, Inter body.
- Version 1.1, September 2026. PDFs exported 2026-09-29, QA passed.
- Version 1.1 added the subtitles and body text from the two original Canva documents, and a second page each for photography and the bulletin. See `qa/copy-additions-proposal.md`.

## Updating the guide

1. Edit only the Canva master. Never edit the PDF.
2. Duplicate the design in Canva before a major revision, so the previous version stays intact.
3. Keep the palette, typefaces, and logo rules as defined in the spec. Change them in the spec first if they must change.
4. Update `content/ccbc-brand-guide-copy.md` to match any wording change.
5. Update the version line on the cover, under the church name.
6. Export a fresh PDF as A4 with no crop marks or bleed, and save it with a new version number and date. Use print quality for the main file: the standard export shrinks the logo to about 120 ppi.
7. Repeat the PDF checks below.

## PDF checks

Run from the `website/` directory:

```bash
pdfinfo brand-guide/exports/CCBC-Brand-Guide-v1.1.pdf > brand-guide/qa/pdf-info.txt
pdftotext -layout brand-guide/exports/CCBC-Brand-Guide-v1.1.pdf brand-guide/qa/pdf-text.txt
pdffonts brand-guide/exports/CCBC-Brand-Guide-v1.1.pdf
pdftoppm -png -r 144 brand-guide/exports/CCBC-Brand-Guide-v1.1.pdf brand-guide/qa/rendered-pages/page
```

Expect 20 A4 pages and only Manrope and Inter, plus fallback fonts for the ✓, ✕ and ☐ symbols. Then inspect every rendered page for clipping, overlaps, and missing elements.

The cover sets "CCBC Brand Guide" on two lines, so a text search for that exact phrase in `pdf-text.txt` finds nothing. Search page 1 for "Brand Guide".

## Known limitations

- The logo master `assets/ccbc-logo-typeset-high-resolution.png` is 3701 × 1083 px. Its wordmark is vector in the SVG, but the seal is a 1083 px raster in both files, so the seal limits very large print sizes.
- `scripts/build-typeset-high-res-logo.py` needs Montserrat Bold at `~/Library/Fonts/Montserrat-Bold.ttf`.
- The standalone seal `assets/ccbc-seal-round-final.png` is derived from a raster crop. See `assets/manifest.md`.
- Photographs in the guide are AI-generated style references and are labeled as such. They are not CCBC members.
- The Canva API cannot set font families. New text added through the API arrives in a default font. To avoid that, copy an existing page with `merge-designs`, rewrite its text elements, and delete the original. Version 1.1 was built this way.
- Page names in the Canva page list are stale on the rebuilt pages, since the API cannot rename pages. The page numbers printed on each page are correct.
