# CCBC Brand Guide

This directory contains the approved copy, build brief, asset manifest, export, and QA evidence for the CCBC institutional brand guide.

The editable Canva master is the source of truth. The PDF export is the distribution copy.

## Deliverables

| Item | Location |
| --- | --- |
| Canva master | Design ID `DAHWRXp4nGM`, title "CCBC Brand Guide — Master v2" |
| Distribution PDF, print quality | `exports/CCBC-Brand-Guide-v1.pdf` |
| Distribution PDF, smaller file for email and screens | `exports/CCBC-Brand-Guide-v1-screen.pdf` |
| Logo master | `assets/ccbc-logo-typeset-high-resolution.png` and `.svg` |
| Standalone seal | `assets/ccbc-seal-round-final.png` |
| Approved spec | `../docs/superpowers/specs/2026-09-23-ccbc-brand-guide-design.md` |
| Approved copy | `content/ccbc-brand-guide-copy.md` |
| QA contact sheet | `qa/contact-sheet.png` |
| Asset manifest | `assets/manifest.md` |

Canva edit links rotate, so find the master by its design ID or title in the CCBC Canva account.

The earlier Canva Docs (`DAHWGUzdEP0`, `DAHWGQSPoDg`) and the two standalone v2 pages (`DAHWNmPpaA4`, `DAHWNm43QP8`) are superseded.

## Status

- Canva master: A4 portrait, fixed layout, 18 pages. Manrope headings, Inter body.
- Version 1.0, September 2026. PDFs exported 2026-09-28, QA passed.

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
pdfinfo brand-guide/exports/CCBC-Brand-Guide-v1.pdf > brand-guide/qa/pdf-info.txt
pdftotext -layout brand-guide/exports/CCBC-Brand-Guide-v1.pdf brand-guide/qa/pdf-text.txt
pdffonts brand-guide/exports/CCBC-Brand-Guide-v1.pdf
pdftoppm -png -r 144 brand-guide/exports/CCBC-Brand-Guide-v1.pdf brand-guide/qa/rendered-pages/page
```

Expect 18 A4 pages and only Manrope and Inter, plus fallback fonts for the ✓, ✕ and ☐ symbols. Then inspect every rendered page for clipping, overlaps, and missing elements.

The cover sets "CCBC Brand Guide" on two lines, so a text search for that exact phrase in `pdf-text.txt` finds nothing. Search page 1 for "Brand Guide".

## Known limitations

- The logo master `assets/ccbc-logo-typeset-high-resolution.png` is 3701 × 1083 px. Its wordmark is vector in the SVG, but the seal is a 1083 px raster in both files, so the seal limits very large print sizes.
- `scripts/build-typeset-high-res-logo.py` needs Montserrat Bold at `~/Library/Fonts/Montserrat-Bold.ttf`.
- The standalone seal `assets/ccbc-seal-round-final.png` is derived from a raster crop. See `assets/manifest.md`.
- Photographs in the guide are AI-generated style references and are labeled as such. They are not CCBC members.
- The Canva API cannot set font families. Text added through the API needs its font set by hand in the editor.
