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
    "candelbap.church",
    "Masaya kaming narito ka.",
    "Maligayang pagdating.",
    "042-585-8829",
    "hello@candelbap.church",
    "Bansalagin St. Bgy. Pahinga Norte, Candelaria, Quezon",
]
HEADINGS = ["New here?", "Join us", "Giving", "Contact", "Order of service", "Announcements"]
LAYOUTS = {
    "bifold": ([], 40),
    "trifold": (["Special announcements", "Sermon notes"], 38),
}


def run(*cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout


def check(pdf, layout):
    extra, expected = LAYOUTS[layout]
    info = run("pdfinfo", pdf)
    assert re.search(r"^Pages:\s+2$", info, re.M), info
    w, h = map(float, re.search(r"Page size:\s+([\d.]+) x ([\d.]+)", info).groups())
    assert abs(w - 842) < 2 and abs(h - 595) < 2, (w, h)

    fonts = {line.split()[0].split("+")[-1] for line in run("pdffonts", pdf).splitlines()[2:]}
    stray = {f for f in fonts if not f.startswith(("Manrope", "Inter"))}
    assert not stray, stray

    text = " ".join(run("pdftotext", pdf, "-").split())
    for phrase in REAL + HEADINGS + extra:
        assert phrase in text, phrase
    found = len(re.findall(r"\[[^\]]+\]", text))
    assert found == expected, found


if __name__ == "__main__":
    check(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "bifold")
    print("ok")
