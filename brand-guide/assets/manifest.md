# Asset Manifest

| Asset | Source path | Dimensions | Approved use | Restriction |
| --- | --- | --- | --- | --- |
| CCBC full logo, master | `brand-guide/assets/ccbc-logo-typeset-high-resolution.png` and `.svg` | 3701 × 1083 px, transparent, no padding | Light backgrounds only | Preserve exactly; rebuild only with `scripts/build-typeset-high-res-logo.py` |
| CCBC full logo, original | `CCBC Logo.png` | 320 × 130 px | Reference for proportions only | Superseded by the master; not for production |
| CCBC full logo, traced | `brand-guide/assets/ccbc-logo-high-resolution.png` and `.svg` | 3989 × 1083 px | None | Rejected: jagged edges and a misshapen B; kept locally, not committed |
| Church family photograph | `../CBAP Coffee Table copy.jpg` | 2550 × 1650 px | Photography example and contextual mockup | Existing artwork contains embedded text and graphics; do not present it as an unedited master photo |
| Walk with Jesus banner | `../Youtube Banner (6).png` | 2560 × 1440 px | Historical comparison only | Not part of the new master identity |
| CCBC seal, standalone | `brand-guide/assets/ccbc-seal-round-final.png` | 1162 × 1162 px, transparent | Secondary mark where the full logo cannot fit | Preserve exactly; never pair with a retyped wordmark |
| CCBC seal, first round version | `brand-guide/assets/ccbc-seal-round.png` | 1162 × 1162 px, transparent | Superseded by the final file | Not for production |
| CCBC seal, working source | `brand-guide/assets/ccbc-seal-crop.png` | 1254 × 1254 px | Source for the standalone seal only | Not for production; stretched about 4% vertically and slightly transparent |
| AI photography style references | `brand-guide/assets/photography/*.png` | 3:2 landscape | Illustrative examples inside the brand guide | Fictional people; keep the "AI-generated style reference" label; never present as CCBC members |

## Asset policy

Use only approved source files. Do not reconstruct the logo from screenshots or social media copies.

## Logo master

Approved 2026-09-28 to replace `CCBC Logo.png` throughout the guide. Canva asset `MAHWeD4TVG0`.

The master pairs `ccbc-seal-round-final.png` with the wordmark CCBC typeset in Montserrat Bold, color `#263c8f`. Measured against `CCBC Logo.png`: letter height is 0.600 of the seal against 0.598, and the letter shapes overlap 94% at the original size. The gap between seal and first C is 0.03 of the seal width; the original measures between 0.024 and 0.037, which is as close as its resolution allows.

The wordmark is vector in the SVG. The seal is a 1083 px raster in both files.

## Standalone seal

Approved 2026-09-28 as a secondary mark without the wordmark. The full logo stays the primary institutional mark.

Approved uses: profile images, favicons, stamps, and small badges. Clear space is at least half the seal's width on every side.

`ccbc-seal-round.png` is derived from `ccbc-seal-crop.png` with no redrawing: height rescaled to restore the round proportions of the seal in `CCBC Logo.png`, circular mask applied just inside the gold rim, artwork made fully opaque. Before-and-after evidence is in `qa/seal-compare-cream.png` and `qa/seal-compare-navy.png`.

`ccbc-seal-round-final.png` is the approved file, used in the Canva master as asset `MAHWdp1TBCs`. It has the same size and position as `ccbc-seal-round.png`. `scripts/simplify-inner-gold-trim-gradient.py` writes it by recoloring the inner gold trim between about 2 and 6 o'clock with a smooth gradient. The script reads `ccbc-seal-round-proportion-preview.png`, which is no longer in this directory, so it cannot be rerun as is.

