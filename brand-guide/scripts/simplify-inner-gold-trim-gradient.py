#!/usr/bin/env python3
"""Replace the lower-right inner-trim stroke with one smooth gold gradient."""

from math import atan2, hypot, pi
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "ccbc-seal-round-proportion-preview.png"
OUTPUT = ROOT / "assets" / "ccbc-seal-round-final.png"

# This sector covers the gold fill from about 2 to 6 o'clock. Keep its existing
# boundaries and recolor only the gold pixels; do not paint over the silver or
# blue edge details.
INNER_RADIUS = 382.0
OUTER_RADIUS = 422.0
ARC_START = -30 * pi / 180  # about 2 o'clock
ARC_END = 90 * pi / 180     # 6 o'clock
ARC_FEATHER = 12 * pi / 180
GOLD_START = (197.0, 151.0, 63.0)
GOLD_END = (239.0, 199.0, 101.0)


def smoothstep(value):
    value = min(1.0, max(0.0, value))
    return value * value * (3.0 - 2.0 * value)


def gradient(t):
    eased = smoothstep(t)
    return tuple(round(start + (end - start) * eased)
                 for start, end in zip(GOLD_START, GOLD_END))


def angular_weight(angle):
    if ARC_START <= angle <= ARC_END:
        return 1.0
    if ARC_START - ARC_FEATHER < angle < ARC_START:
        return smoothstep((angle - (ARC_START - ARC_FEATHER)) / ARC_FEATHER)
    if ARC_END < angle < ARC_END + ARC_FEATHER:
        return 1.0 - smoothstep((angle - ARC_END) / ARC_FEATHER)
    return 0.0


def main():
    image = Image.open(SOURCE).convert("RGBA")
    width, height = image.size
    if width != height:
        raise ValueError(f"Expected square seal, got {width}x{height}")

    center = (width - 1) / 2
    output = image.copy()
    src = image.load()
    dst = output.load()
    extent = int(OUTER_RADIUS + 2)

    for y in range(max(0, int(center - extent)), min(height, int(center + extent + 1))):
        for x in range(max(0, int(center - extent)), min(width, int(center + extent + 1))):
            dx, dy = x - center, y - center
            radius = hypot(dx, dy)
            angle = atan2(dy, dx)
            angular = angular_weight(angle)
            if angular <= 0.0:
                continue

            if not (INNER_RADIUS - 2.0 <= radius <= OUTER_RADIUS + 2.0):
                continue

            r, g, b, alpha = src[x, y]
            # Preserve the true silver and blue boundaries while smoothing all
            # gold-tone pixels, including the narrow lines within the trim.
            goldness = smoothstep((r - g - 5.0) / 25.0) * smoothstep((g - b - 5.0) / 20.0)
            if goldness <= 0.0:
                continue

            amount = goldness * angular
            t = (radius - INNER_RADIUS) / (OUTER_RADIUS - INNER_RADIUS)
            target = gradient(t)
            dst[x, y] = tuple(round(src_channel * (1.0 - amount) + target_channel * amount)
                              for src_channel, target_channel in zip((r, g, b), target)) + (alpha,)

    output.save(OUTPUT, format="PNG", optimize=True)
    print(f"Saved {OUTPUT}; baseline preview left untouched")


if __name__ == "__main__":
    main()
