#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Распаковка e:\\food_images_split.zip и обновление data-img в index.html
в порядке записей в архиве (тот же порядок, что и позиции меню сверху вниз).
"""
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ZIP_PATH = Path(r"e:\food_images_split.zip")
INDEX_PATH = ROOT / "index.html"
OUT_DIR = ROOT / "food_images"

IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"}


def collect_image_entries(z: zipfile.ZipFile) -> list[str]:
    names = []
    for n in z.namelist():
        if n.endswith("/"):
            continue
        if n.startswith("__MACOSX") or "/__MACOSX/" in n:
            continue
        suf = Path(n).suffix.lower()
        if suf in IMG_EXT:
            names.append(n)
    return names


def norm_suffix(s: str) -> str:
    if s.lower() == ".jpeg":
        return ".jpg"
    return s or ".jpg"


def main() -> None:
    if not ZIP_PATH.is_file():
        raise SystemExit(f"Нет архива: {ZIP_PATH}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(ZIP_PATH, "r") as z:
        entries = collect_image_entries(z)
        if not entries:
            raise SystemExit("В архиве не найдено изображений.")

        rel_paths: list[str] = []
        for i, name in enumerate(entries, start=1):
            suf = norm_suffix(Path(name).suffix)
            dest = OUT_DIR / f"{i:02d}{suf}"
            dest.write_bytes(z.read(name))
            rel_paths.append(f"food_images/{dest.name}")

    html = INDEX_PATH.read_text(encoding="utf-8")
    pattern_menu = re.compile(r'data-img="food_images/\d{2}\.jpg"')
    pattern_picsum = re.compile(r'data-img="https://picsum\.phot[^"]*"')

    if pattern_menu.search(html):
        matches = list(pattern_menu.finditer(html))
    else:
        matches = list(pattern_picsum.finditer(html))
        needle = "picsum"

    if len(matches) != len(rel_paths):
        raise SystemExit(
            f"В меню {len(matches)} placeholder(ов), в архиве {len(rel_paths)} изображений. Должно совпадать."
        )

    parts: list[str] = []
    pos = 0
    for m, path in zip(matches, rel_paths):
        parts.append(html[pos : m.start()])
        parts.append(f'data-img="{path}"')
        pos = m.end()
    parts.append(html[pos:])
    INDEX_PATH.write_text("".join(parts), encoding="utf-8")

    print(f"OK: {len(rel_paths)} файлов в {OUT_DIR}")
    print(f"Обновлён {INDEX_PATH}")


if __name__ == "__main__":
    main()
