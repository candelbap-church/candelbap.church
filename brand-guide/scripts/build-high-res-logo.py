#!/usr/bin/env python3
"""Trace the existing CCBC wordmark and pair it with the approved round seal."""

import base64
from io import BytesIO
from math import ceil
from pathlib import Path
from xml.sax.saxutils import escape

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
LOGO_SOURCE = ROOT.parent / "CCBC Logo.png"
SEAL_SOURCE = ASSETS / "ccbc-seal-round-final.png"
SVG_OUTPUT = ASSETS / "ccbc-logo-high-resolution.svg"
PNG_OUTPUT = ASSETS / "ccbc-logo-high-resolution.png"
WORDMARK_BLUE = (38, 60, 143)
TRACE_THRESHOLD = 128
RENDER_OVERSAMPLE = 2
# Measured from the source PNG's visible seal boundary. The adjacent C begins
# at x=102 and overlaps the old one-third-width heuristic, so keep the boundary
# explicit rather than allowing wordmark pixels into the seal scale estimate.
SOURCE_SEAL_BOX = (18, 24, 100, 106)


def add_edge(edges, start, end):
    edges.append((start, end))


def edge_loops(mask):
    """Trace closed pixel-boundary loops from a binary mask."""
    width, height = mask.size
    foreground = mask.load()
    edges = []
    for y in range(height):
        for x in range(width):
            if not foreground[x, y]:
                continue
            if y == 0 or not foreground[x, y - 1]:
                add_edge(edges, (x, y), (x + 1, y))
            if x + 1 == width or not foreground[x + 1, y]:
                add_edge(edges, (x + 1, y), (x + 1, y + 1))
            if y + 1 == height or not foreground[x, y + 1]:
                add_edge(edges, (x + 1, y + 1), (x, y + 1))
            if x == 0 or not foreground[x - 1, y]:
                add_edge(edges, (x, y + 1), (x, y))

    outgoing = {}
    for edge_id, (start, _) in enumerate(edges):
        outgoing.setdefault(start, []).append(edge_id)
    unused = set(range(len(edges)))
    loops = []

    while unused:
        first_id = min(unused)
        start, end = edges[first_id]
        unused.remove(first_id)
        loop = [start]
        current_start, current_end = start, end
        safety = len(edges) + 1
        while current_end != start and safety:
            loop.append(current_end)
            candidates = [i for i in outgoing.get(current_end, []) if i in unused]
            if not candidates:
                raise RuntimeError(f"Open contour at {current_end}; trace is incomplete")
            in_dir = direction(current_start, current_end)

            def turn_priority(edge_id):
                _, candidate_end = edges[edge_id]
                turn = (direction(current_end, candidate_end) - in_dir) % 4
                return {1: 0, 0: 1, 3: 2, 2: 3}[turn]

            next_id = min(candidates, key=turn_priority)
            unused.remove(next_id)
            current_start, current_end = edges[next_id]
            safety -= 1
        if current_end != start:
            raise RuntimeError("Contour tracing exceeded safety limit")
        loop = remove_collinear(loop)
        if len(loop) >= 3:
            loops.append(loop)
    return loops


def direction(a, b):
    delta = (b[0] - a[0], b[1] - a[1])
    return {(1, 0): 0, (0, 1): 1, (-1, 0): 2, (0, -1): 3}[delta]


def remove_collinear(points):
    result = []
    count = len(points)
    for i, point in enumerate(points):
        previous = points[(i - 1) % count]
        following = points[(i + 1) % count]
        a = (point[0] - previous[0], point[1] - previous[1])
        b = (following[0] - point[0], following[1] - point[1])
        if a[0] * b[1] != a[1] * b[0]:
            result.append(point)
    return result


def signed_area(points):
    return sum(points[i][0] * points[(i + 1) % len(points)][1]
               - points[(i + 1) % len(points)][0] * points[i][1]
               for i in range(len(points))) / 2


def midpoint(a, b):
    return ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)


def svg_path(points):
    start = midpoint(points[-1], points[0])
    parts = [f"M {start[0]:.2f} {start[1]:.2f}"]
    for i, point in enumerate(points):
        end = midpoint(point, points[(i + 1) % len(points)])
        parts.append(f"Q {point[0]:.2f} {point[1]:.2f} {end[0]:.2f} {end[1]:.2f}")
    parts.append("Z")
    return " ".join(parts)


def smoothed_polygon(points, steps=3):
    """Sample the SVG quadratic contour for a clean raster preview/export."""
    result = []
    for i, point in enumerate(points):
        start = midpoint(points[i - 1], point)
        end = midpoint(point, points[(i + 1) % len(points)])
        for step in range(steps + 1):
            t = step / steps
            one_minus = 1 - t
            x = one_minus * one_minus * start[0] + 2 * one_minus * t * point[0] + t * t * end[0]
            y = one_minus * one_minus * start[1] + 2 * one_minus * t * point[1] + t * t * end[1]
            result.append((x, y))
    return result


def encode_png_image(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG", optimize=True)
    return base64.b64encode(buffer.getvalue()).decode("ascii")


def main():
    logo = Image.open(LOGO_SOURCE).convert("RGBA")
    seal = Image.open(SEAL_SOURCE).convert("RGBA")
    seal_box = seal.getchannel("A").getbbox()
    if not seal_box:
        raise ValueError("Approved seal has no visible pixels")
    seal = seal.crop(seal_box)

    logo_alpha = logo.getchannel("A")
    logo_left, logo_top, logo_right, logo_bottom = logo_alpha.getbbox()
    source_seal_box = SOURCE_SEAL_BOX
    if logo_alpha.crop(source_seal_box).getbbox() != (0, 0, 82, 82):
        raise ValueError("Source seal bounds no longer match the measured 82x82 seal")
    word_alpha = logo_alpha.crop((source_seal_box[2], 0, logo.width, logo.height))
    word_box_local = word_alpha.getbbox()
    if not source_seal_box or not word_box_local:
        raise ValueError("Could not locate both the original seal and wordmark")

    word_left = source_seal_box[2] + word_box_local[0]
    word_top = word_box_local[1]
    word_right = source_seal_box[2] + word_box_local[2]
    word_bottom = word_box_local[3]
    word_mask = logo_alpha.crop((word_left, word_top, word_right, word_bottom))
    binary_mask = word_mask.point(lambda alpha: 255 if alpha >= TRACE_THRESHOLD else 0, mode="L")
    loops = edge_loops(binary_mask)
    if not loops:
        raise ValueError("Wordmark tracing found no contours")

    source_seal_width = source_seal_box[2] - source_seal_box[0]
    scale = seal.width / source_seal_width
    # Preserve the source PNG's right-side breathing room so the final glyph
    # cannot sit flush against the SVG/PNG canvas edge.
    output_width = ceil((logo.width - logo_left) * scale)
    output_height = seal.height
    text_x = (word_left - logo_left) * scale
    text_y = (word_top - logo_top) * scale

    paths = [svg_path(loop) for loop in loops]
    combined_path = " ".join(paths)
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="{output_width}px" height="{output_height}px"
     viewBox="0 0 {output_width} {output_height}">
  <image x="0" y="0" width="{seal.width}" height="{seal.height}"
         href="data:image/png;base64,{encode_png_image(seal)}"/>
  <path transform="translate({text_x:.4f} {text_y:.4f}) scale({scale:.8f})"
        fill="#{WORDMARK_BLUE[0]:02x}{WORDMARK_BLUE[1]:02x}{WORDMARK_BLUE[2]:02x}"
        fill-rule="evenodd" d="{escape(combined_path)}"/>
</svg>
'''
    SVG_OUTPUT.write_text(svg, encoding="utf-8")

    oversample = RENDER_OVERSAMPLE
    mask_large = Image.new("L", (output_width * oversample, output_height * oversample), 0)
    draw = ImageDraw.Draw(mask_large)
    for loop in sorted(loops, key=lambda p: signed_area(p) < 0):
        fill = 0 if signed_area(loop) < 0 else 255
        poly = smoothed_polygon(loop)
        scaled = [((text_x + x * scale) * oversample,
                   (text_y + y * scale) * oversample) for x, y in poly]
        draw.polygon(scaled, fill=fill)
    letter_mask = mask_large.resize((output_width, output_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (output_width, output_height), (0, 0, 0, 0))
    canvas.alpha_composite(seal, (0, 0))
    letters = Image.new("RGBA", (output_width, output_height), (*WORDMARK_BLUE, 0))
    letters.putalpha(letter_mask)
    canvas.alpha_composite(letters)
    canvas.save(PNG_OUTPUT, format="PNG", optimize=True)

    hole_count = sum(1 for loop in loops if signed_area(loop) < 0)
    print(f"Wrote {SVG_OUTPUT} ({output_width}x{output_height})")
    print(f"Wrote {PNG_OUTPUT} ({output_width}x{output_height}); "
          f"traced {len(loops) - hole_count} outer contours and {hole_count} counters")


if __name__ == "__main__":
    main()
