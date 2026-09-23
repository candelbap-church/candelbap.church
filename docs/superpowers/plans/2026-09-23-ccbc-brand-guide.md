# CCBC Brand Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce an editable Canva master and a verified, print-ready PDF brand guide for CCBC.

**Architecture:** Treat the approved design specification as the source for content and rules, then translate it into a locked page system using a design-first prompt, reusable Canva page patterns, and realistic application examples. Canva is the editable source of truth; the PDF is the approved distribution artifact. Local repository files preserve exact copy, the build brief, asset provenance, Canva link, export, and QA evidence.

**Tech Stack:** Canva, Manrope, Inter, Markdown, PDF export, Poppler PDF inspection/rendering, ImageMagick montage or equivalent contact sheet

**Spec:** `docs/superpowers/specs/2026-09-23-ccbc-brand-guide-design.md`

## Global Constraints

- Preserve the existing CCBC logo exactly; do not redraw, recolor, separate, rearrange, distort, or add effects.
- Lead with `CCBC`; use `Candelaria Conservative Baptist Church` for formal identification and first-use clarity.
- Render the tagline exactly as `Going for Christ, Growing in Christ`.
- Use Manrope for headings and Inter for body text; use Arial only as a fallback.
- Use only `#1E3A8A`, `#172554`, `#C8A64B`, `#6DB7DD`, `#FAF8F3`, `#1F2937`, and `#FFFFFF` as brand colors.
- Keep the visual balance near 60% light neutral, 25% blue/navy, 10% Clear Sky, and 5% gold.
- Keep the voice warm, clear, encouraging, biblical, Christ-centered, and naturally bilingual when context calls for it.
- Cover bulletins, website, newsletters, and event posters; exclude sermon slides and ministry sub-identities.
- Use an A4 portrait document so the guide prints cleanly on professional and church-office equipment.
- Canva is the editable master; the final PDF must be exported from the approved Canva design.

## Review Focus

- The 320 × 130 raster logo may become visibly soft in print; test it at every shown size and never enlarge it past acceptable visual quality.
- Gold and Clear Sky may fail contrast on light backgrounds; verify all small text and functional labels against WCAG AA contrast expectations.
- Long formal church names and bilingual copy may overflow; test the longest approved examples without shrinking body text below the established scale.
- Office printers may clip edge content or turn subtle colors muddy; verify safe margins, grayscale readability, and a low-ink sample page.
- Canva-to-PDF export may substitute fonts, rasterize poorly, or clip elements; render every exported page and compare it with the Canva master.

---

### Task 1: Establish the production source package

**Files:**
- Create: `brand-guide/README.md`
- Create: `brand-guide/content/ccbc-brand-guide-copy.md`
- Create: `brand-guide/assets/manifest.md`
- Reference: `CCBC Logo.png`
- Reference: `../CBAP Coffee Table copy.jpg`
- Reference: `../Youtube Banner (6).png`

**Interfaces:**
- Consumes: approved brand-guide specification
- Produces: exact page copy and asset provenance used by the Canva build

- [ ] **Step 1: Create the source directories**

Run:

```bash
mkdir -p brand-guide/content brand-guide/assets brand-guide/prompts brand-guide/exports brand-guide/qa
```

Expected: all five directories exist under `website/brand-guide/`.

- [ ] **Step 2: Write the exact guide copy**

Create `brand-guide/content/ccbc-brand-guide-copy.md` with these 18 numbered page sections:

1. Cover — `CCBC Brand Guide` and `Going for Christ, Growing in Christ`
2. How to use this guide
3. Brand foundation
4. Brand pillars
5. Name and tagline
6. Logo overview
7. Logo clear space and minimum size
8. Logo misuse
9. Core color palette
10. Color combinations and accessibility
11. Typography
12. Photography
13. Graphic elements and layout
14. Voice and bilingual writing
15. Bulletin application
16. Website and newsletter applications
17. Event poster application
18. Production standards and pre-publication checklist

Copy the approved rules from the spec without introducing new brand claims. Include the approved bilingual voice example verbatim.

- [ ] **Step 3: Record every source asset and restriction**

Create `brand-guide/assets/manifest.md` with this table:

```markdown
| Asset | Source path | Dimensions | Approved use | Restriction |
| --- | --- | --- | --- | --- |
| CCBC full logo | `CCBC Logo.png` | 320 × 130 px | Light backgrounds only | Preserve exactly; do not upscale beyond verified legibility |
| Church family photograph | `../CBAP Coffee Table copy.jpg` | 2550 × 1650 px | Photography example and contextual mockup | Existing artwork contains embedded text and graphics; do not present it as an unedited master photo |
| Walk with Jesus banner | `../Youtube Banner (6).png` | 2560 × 1440 px | Historical comparison only | Not part of the new master identity |
```

- [ ] **Step 4: Verify content and paths**

Run:

```bash
test -f brand-guide/content/ccbc-brand-guide-copy.md
test -f brand-guide/assets/manifest.md
test -f 'CCBC Logo.png'
test -f '../CBAP Coffee Table copy.jpg'
test -f '../Youtube Banner (6).png'
```

Expected: exit code 0.

- [ ] **Step 5: Commit the source package**

```bash
git add brand-guide/README.md brand-guide/content/ccbc-brand-guide-copy.md brand-guide/assets/manifest.md
git commit -m "docs: add CCBC brand guide source package"
```

### Task 2: Produce the locked Canva build brief

**Files:**
- Create: `brand-guide/prompts/ccbc-canva-build-brief.md`
- Read: `brand-guide/content/ccbc-brand-guide-copy.md`
- Read: `docs/superpowers/specs/2026-09-23-ccbc-brand-guide-design.md`

**Interfaces:**
- Consumes: exact page copy and approved design tokens
- Produces: a Canva-ready prompt that locks format, grid, hierarchy, type, color, imagery, copy, and negative constraints

- [ ] **Step 1: Write the GOAL and FORMAT block**

Specify:

```text
GOAL
- Create the official CCBC institutional brand guide.
- Primary audience: current CCBC members and communicators.
- Secondary audience: young families in Candelaria.
- Success: welcoming, biblical, family-oriented, clear contemporary, easy to print and maintain.

FORMAT
- A4 portrait, 210 × 297 mm.
- 18 pages.
- 15 mm outer safe margin; 18 mm binding-side margin.
- 3 mm bleed for full-bleed professional-print pages.
```

- [ ] **Step 2: Write the LAYOUT and TYPE SYSTEM block**

Specify a six-column grid, 4 mm gutters, 8 pt baseline rhythm, large left-aligned headings, one dominant message per page, Manrope 700/800 for display, Manrope 600 for subheads, Inter 400 for body, and Inter 600 for labels. Require body text at least 10.5 pt in print and captions at least 8.5 pt.

- [ ] **Step 3: Write the COLOR, IMAGERY, and COPY blocks**

List the seven approved colors and their roles exactly. Require warm natural photography, natural skin tones, authentic multigenerational community, and a 60/40 candid-to-polished target. Point COPY to the exact numbered sections in `ccbc-brand-guide-copy.md`; forbid paraphrasing the church name, tagline, palette values, and logo rules.

- [ ] **Step 4: Write the CONSTRAINTS and NEGATIVE PROMPT blocks**

Include:

```text
CONSTRAINTS
- FONT: Manrope + Inter only.
- STYLE: Clear Contemporary.
- MODE: Warm light with confident blue fields.
- CHANGE POLICY: During review, vary only one of crop, accent placement, or card arrangement at a time.

NEGATIVE PROMPT
- No logo reconstruction, recoloring, stretching, cropping, or effects.
- No extra colors, script fonts, glass effects, neon, 3D decoration, or generic megachurch stock imagery.
- No invented Scripture, ministry names, service times, contact details, or claims.
- No extra text beyond the approved copy.
- No text smaller than the specified print minimums.
```

- [ ] **Step 5: Validate the prompt against the spec**

Run:

```bash
rg -n 'A4 portrait|18 pages|Manrope|Inter|#1E3A8A|#172554|#C8A64B|#6DB7DD|#FAF8F3|#1F2937|#FFFFFF|Going for Christ, Growing in Christ|No logo reconstruction' brand-guide/prompts/ccbc-canva-build-brief.md
```

Expected: every required lock appears at least once.

- [ ] **Step 6: Commit the build brief**

```bash
git add brand-guide/prompts/ccbc-canva-build-brief.md
git commit -m "docs: add Canva build brief for CCBC brand guide"
```

### Task 3: Build the Canva master

**Files:**
- Modify: `brand-guide/README.md`
- Read: `brand-guide/prompts/ccbc-canva-build-brief.md`
- Read: `brand-guide/content/ccbc-brand-guide-copy.md`

**Interfaces:**
- Consumes: locked Canva brief, exact copy, logo, and approved source imagery
- Produces: editable 18-page Canva design URL and design ID

- [ ] **Step 1: Create the A4 portrait Canva design**

Use the Canva creation workflow with the exact build brief. Title the design `CCBC Brand Guide — Master`. Keep all text editable and use native Canva shapes rather than flattened page screenshots.

- [ ] **Step 2: Establish three reusable page patterns**

Create and reuse:

1. **Statement page:** one dominant heading, short support copy, large blue field or warm neutral field.
2. **Standards page:** heading, explanatory copy, labeled examples, and a compact rule block.
3. **Application page:** realistic mockup at dominant scale with a concise annotation column.

Expected: all 18 pages derive from these patterns while retaining varied composition.

- [ ] **Step 3: Apply exact copy and assets**

Place the existing logo without modification. Use the church family image only where its embedded legacy graphics are contextually identified; do not present it as a clean original photograph. Where an additional future CCBC photograph would be helpful, use a non-photo layout in the final PDF rather than a fake or unrelated image.

- [ ] **Step 4: Create the four application examples**

Build realistic examples for:

- A calm Sunday bulletin cover with a low-ink alternate view
- A responsive website hero crop
- A story-led newsletter opening
- An event poster with one headline, one visual idea, and a grouped details block

Use only generic, non-factual sample copy such as `Community Fellowship`, `Date · Time · Location`, and `Learn more`; do not invent real events or schedules.

- [ ] **Step 5: Record the Canva source**

Update `brand-guide/README.md` with the actual Canva title, design ID, edit URL, A4 portrait format, 18-page count, and statement that the Canva master is the source of truth. Do not leave angle-bracket placeholders.

- [ ] **Step 6: Commit the source reference**

```bash
git add brand-guide/README.md
git commit -m "docs: record CCBC Canva brand guide master"
```

### Task 4: Review and correct the Canva master

**Files:**
- Create: `brand-guide/qa/canva-review.md`
- Modify: Canva design `CCBC Brand Guide — Master`

**Interfaces:**
- Consumes: editable Canva master
- Produces: reviewed master with a recorded issue-and-resolution log

- [ ] **Step 1: Perform a brand compliance review**

Check every page for the exact palette, Manrope/Inter only, unchanged logo, correct tagline, intended voice, and no ministry sub-identities or sermon-slide content. Record every issue by page number in `brand-guide/qa/canva-review.md`.

- [ ] **Step 2: Perform layout and accessibility review**

At 100% view, check safe margins, reading order, body type minimums, contrast, image/text collisions, and long-name wrapping. Test the full phrase `Candelaria Conservative Baptist Church` and the bilingual voice example on their final pages.

- [ ] **Step 3: Perform office-print review**

Confirm that the bulletin application includes a white-background, low-ink version; all essential distinctions survive grayscale; and no required content sits inside common non-printable edge areas.

- [ ] **Step 4: Correct every clear issue in Canva**

Change one variable at a time—crop, accent placement, or arrangement—while keeping all locked tokens unchanged. Record each correction beside its original issue.

- [ ] **Step 5: Confirm no open issues remain**

Run:

```bash
rg -n 'OPEN|BLOCKED|FIXME|TBD|TODO' brand-guide/qa/canva-review.md
```

Expected: no matches.

- [ ] **Step 6: Commit the completed review log**

```bash
git add brand-guide/qa/canva-review.md
git commit -m "docs: record CCBC Canva guide review"
```

### Task 5: Export and verify the final PDF

**Files:**
- Create: `brand-guide/exports/CCBC-Brand-Guide-v1.pdf`
- Create: `brand-guide/qa/pdf-info.txt`
- Create: `brand-guide/qa/pdf-text.txt`
- Create: `brand-guide/qa/rendered-pages/`
- Create: `brand-guide/qa/contact-sheet.png`

**Interfaces:**
- Consumes: approved Canva master
- Produces: final distribution PDF plus objective and visual QA evidence

- [ ] **Step 1: Export from Canva**

Export all 18 pages as `PDF Print`, with crop marks and bleed disabled for the standard office-distribution copy. Save it as `brand-guide/exports/CCBC-Brand-Guide-v1.pdf`.

- [ ] **Step 2: Verify PDF structure**

Run:

```bash
pdfinfo brand-guide/exports/CCBC-Brand-Guide-v1.pdf > brand-guide/qa/pdf-info.txt
pdftotext -layout brand-guide/exports/CCBC-Brand-Guide-v1.pdf brand-guide/qa/pdf-text.txt
rg -n '^Pages:[[:space:]]+18$' brand-guide/qa/pdf-info.txt
rg -n 'CCBC Brand Guide|Going for Christ, Growing in Christ|Candelaria Conservative Baptist Church|#1E3A8A|Manrope|Inter' brand-guide/qa/pdf-text.txt
```

Expected: 18 pages and all six required text checks appear.

- [ ] **Step 3: Render every page**

Run:

```bash
mkdir -p brand-guide/qa/rendered-pages
pdftoppm -png -r 144 brand-guide/exports/CCBC-Brand-Guide-v1.pdf brand-guide/qa/rendered-pages/page
```

Expected: 18 PNG files.

- [ ] **Step 4: Create a contact sheet**

Run:

```bash
magick montage brand-guide/qa/rendered-pages/page-*.png -thumbnail 300x -tile 3x -geometry +12+12 brand-guide/qa/contact-sheet.png
```

Expected: one legible overview image containing all pages in order.

- [ ] **Step 5: Inspect full pages and contact sheet**

Inspect the contact sheet for consistency, then inspect every page at full rendered size for clipping, overlaps, missing elements, soft logo rendering, broken glyphs, and unintentional blank areas. Re-export and repeat Steps 2–5 after any correction.

- [ ] **Step 6: Commit the approved deliverables**

```bash
git add brand-guide/exports/CCBC-Brand-Guide-v1.pdf brand-guide/qa/pdf-info.txt brand-guide/qa/pdf-text.txt brand-guide/qa/contact-sheet.png
git commit -m "feat: add approved CCBC brand guide"
```

### Task 6: Final handoff and maintenance notes

**Files:**
- Modify: `brand-guide/README.md`

**Interfaces:**
- Consumes: approved Canva master, PDF, and QA evidence
- Produces: a maintainable handoff for future CCBC communicators

- [ ] **Step 1: Document the update workflow**

Add instructions to edit only the Canva master, duplicate the design before major revisions, retain locked tokens, update the version number and date, export a fresh PDF, and repeat the PDF QA sequence.

- [ ] **Step 2: Document the known asset limitation**

State that `CCBC Logo.png` is 320 × 130 px and that a verified vector or higher-resolution official master should replace it when available without changing the logo design.

- [ ] **Step 3: Add final deliverable links**

Link the Canva edit URL, `brand-guide/exports/CCBC-Brand-Guide-v1.pdf`, the approved spec, and the QA contact sheet.

- [ ] **Step 4: Verify repository state**

Run:

```bash
git status --short
git log -6 --oneline
```

Expected: no uncommitted plan-owned files; the task commits appear in order.

- [ ] **Step 5: Commit the handoff**

```bash
git add brand-guide/README.md
git commit -m "docs: add CCBC brand guide maintenance workflow"
```

