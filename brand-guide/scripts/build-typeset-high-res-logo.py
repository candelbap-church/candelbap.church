#!/usr/bin/env python3
"""Typeset a clean CCBC wordmark beside the approved circular seal."""

import base64
from io import BytesIO
from math import ceil
from pathlib import Path
from xml.sax.saxutils import escape

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
SEAL_SOURCE = ASSETS / "ccbc-seal-round-final.png"
FONT_SOURCE = Path("/Users/jethroguce/Library/Fonts/Montserrat-Bold.ttf")
SVG_OUTPUT = ASSETS / "ccbc-logo-typeset-high-resolution.svg"
PNG_OUTPUT = ASSETS / "ccbc-logo-typeset-high-resolution.png"
WORDMARK = "CCBC"
WORDMARK_BLUE = (38, 60, 143)
CAP_HEIGHT_RATIO = 0.60
# Ink-to-ink gap between seal and first C, as a fraction of seal width.
# CCBC Logo.png measures 2 to 3 px on an 82 px seal; its low resolution cannot
# pin this closer than about 0.024 to 0.037.
GAP_RATIO = 0.03
# No padding: the canvas is the tight bounding box, so centering by box is true.
RIGHT_PADDING_RATIO = 0.0
RENDER_OVERSAMPLE = 2


def png_data_uri(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    return base64.b64encode(buffer.getvalue()).decode("ascii")


def main():
    seal = Image.open(SEAL_SOURCE).convert("RGBA")
    seal_box = seal.getchannel("A").getbbox()
    if not seal_box:
        raise ValueError("Approved seal has no visible pixels")
    seal = seal.crop(seal_box)
    font = TTFont(FONT_SOURCE)
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    metrics = font["hmtx"].metrics
    units_per_em = font["head"].unitsPerEm

    glyphs = []
    min_x = None
    max_x = 0
    min_y = None
    max_y = None
    cursor = 0
    for char in WORDMARK:
        glyph_name = cmap[ord(char)]
        glyph = glyph_set[glyph_name]
        bounds = BoundsPen(glyph_set)
        glyph.draw(bounds)
        if bounds.bounds:
            gx0, gy0, gx1, gy1 = bounds.bounds
            min_x = cursor + gx0 if min_x is None else min(min_x, cursor + gx0)
            max_x = max(max_x, cursor + gx1)
            min_y = gy0 if min_y is None else min(min_y, gy0)
            max_y = gy1 if max_y is None else max(max_y, gy1)
        glyphs.append((glyph_name, cursor))
        cursor += metrics[glyph_name][0]

    if min_y is None or max_y is None or max_y <= min_y:
        raise ValueError("Could not measure wordmark font outlines")

    target_cap_height = seal.height * CAP_HEIGHT_RATIO
    scale = target_cap_height / (max_y - min_y)
    gap = round(seal.width * GAP_RATIO)
    right_padding = round(seal.width * RIGHT_PADDING_RATIO)
    word_width = (max_x - min_x) * scale
    output_width = ceil(seal.width + gap + word_width + right_padding)
    output_height = seal.height

    # Align the new capital letters to the original lockup's approximate
    # vertical center while preserving the seal as the unchanged source image.
    word_top = (seal.height - target_cap_height) / 2
    baseline = word_top + max_y * scale
    word_origin_x = seal.width + gap - min_x * scale
    font_svg = []
    path_strings = []
    for glyph_name, advance in glyphs:
        pen = SVGPathPen(glyph_set)
        glyph_set[glyph_name].draw(pen)
        d = pen.getCommands()
        path_strings.append(
            f'<path transform="translate({advance:.3f} 0)" d="{escape(d)}"/>'
        )

    blue = f"#{WORDMARK_BLUE[0]:02x}{WORDMARK_BLUE[1]:02x}{WORDMARK_BLUE[2]:02x}"
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{output_width}px" height="{output_height}px" viewBox="0 0 {output_width} {output_height}">
  <image x="0" y="0" width="{seal.width}" height="{seal.height}" href="data:image/png;base64,{png_data_uri(seal)}"/>
  <g fill="{blue}" transform="translate({word_origin_x:.4f} {baseline:.4f}) scale({scale:.8f} {-scale:.8f})">
    {''.join(path_strings)}
  </g>
</svg>
'''
    SVG_OUTPUT.write_text(svg, encoding="utf-8")

    oversample = RENDER_OVERSAMPLE
    mask = Image.new("L", (output_width * oversample, output_height * oversample), 0)
    # Pillow's requested point size is an em size, whereas target_cap_height is
    # the actual capital outline height. Convert using the font's measured cap
    # bounds so PNG and SVG use the same visible letter size.
    raster_font_size = round(target_cap_height * oversample * units_per_em / (max_y - min_y))
    raster_font = ImageFont.truetype(str(FONT_SOURCE), raster_font_size)
    raster_x = round((seal.width + gap) * oversample)
    raster_y = round((output_height - target_cap_height) / 2 * oversample)
    # Font bounding boxes include side bearings, so place the wordmark by its
    # rendered ink instead: draw on a scratch layer, crop to the ink, paste.
    scratch = Image.new("L", (mask.width + raster_font_size, mask.height + raster_font_size), 0)
    ImageDraw.Draw(scratch).text((raster_font_size // 2, raster_font_size // 2),
                                 WORDMARK, font=raster_font, fill=255)
    ink = scratch.crop(scratch.getbbox())
    mask.paste(ink, (raster_x, raster_y))
    glyph_mask = mask.resize((output_width, output_height), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (output_width, output_height), (0, 0, 0, 0))
    canvas.alpha_composite(seal, (0, 0))
    letters = Image.new("RGBA", canvas.size, (*WORDMARK_BLUE, 0))
    letters.putalpha(glyph_mask)
    canvas.alpha_composite(letters)
    canvas.save(PNG_OUTPUT, format="PNG", optimize=True)

    print(f"Font: Montserrat Bold; wordmark: {WORDMARK}; color: {blue}")
    print(f"Wrote {SVG_OUTPUT} ({output_width}x{output_height})")
    print(f"Wrote {PNG_OUTPUT} ({output_width}x{output_height})")


if __name__ == "__main__":
    main()
