#!/usr/bin/env python3
"""
Vygeneruje obrázky přes Gemini API ze souboru s bloky `=== nazev`.

Formát vstupu je stejný jako u prompty.py ze skillu gemini-obrazky-basic,
ale výsledkem jsou soubory PNG, ne text:

    vystupy/<datum_cas>/01_nazev.png
    vystupy/<datum_cas>/_souhrn.txt      (OK nebo CHYBA u každého bloku)

Použití:
    python obrazky.py prompty.txt --env ~/Downloads/.env
    python obrazky.py prompty.txt --env ~/Downloads/.env --jen sablona-09-hreben sablona-14-hraz

Klíč se čte z proměnné GEMINI_API_KEY nebo ze souboru .env (--env).
Klíč se nikam nevypisuje.

Instalace: pip install google-genai
"""

import argparse
import os
import re
import sys
import time
import unicodedata
from datetime import datetime
from pathlib import Path

ODDELOVAC = re.compile(r"^===\s*(.*)$")


def nacti_env(cesta: Path) -> None:
    if not cesta.exists():
        return
    for radek in cesta.read_text(encoding="utf-8").splitlines():
        radek = radek.strip()
        if not radek or radek.startswith("#") or "=" not in radek:
            continue
        klic, hodnota = radek.split("=", 1)
        os.environ.setdefault(klic.strip(), hodnota.strip().strip('"').strip("'"))


def slug(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text[:60] or "obrazek"


def rozdel(obsah: str) -> list[tuple[str, str]]:
    bloky, nazev, radky = [], None, []
    for radek in obsah.splitlines():
        m = ODDELOVAC.match(radek)
        if m:
            if nazev is not None:
                bloky.append((nazev, "\n".join(radky).strip()))
            nazev, radky = m.group(1).strip(), []
        else:
            radky.append(radek)
    if nazev is not None:
        bloky.append((nazev, "\n".join(radky).strip()))
    return [(n, t) for n, t in bloky if t]


def vygeneruj(client, types, model: str, text: str, pomer: str, pokusy: int = 3) -> bytes:
    config = types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(aspect_ratio=pomer),
    )
    posledni = None
    for i in range(1, pokusy + 1):
        try:
            odp = client.models.generate_content(model=model, contents=text, config=config)
            for kandidat in odp.candidates or []:
                for cast in (kandidat.content.parts if kandidat.content else []) or []:
                    data = getattr(cast, "inline_data", None)
                    if data and data.data:
                        return data.data
            posledni = RuntimeError("model nevrátil obrázek")
        except Exception as e:  # noqa: BLE001
            posledni = e
        if i < pokusy:
            time.sleep(5 * i)
    raise posledni or RuntimeError("neznámá chyba")


def main() -> None:
    p = argparse.ArgumentParser(description="Vygeneruje obrázky z bloků === přes Gemini.")
    p.add_argument("soubor")
    p.add_argument("--env", default=None, help="cesta k .env s GEMINI_API_KEY")
    p.add_argument("--model", default="gemini-2.5-flash-image")
    p.add_argument("--pomer", default="16:9", help="poměr stran, např. 16:9 nebo 1:1")
    p.add_argument("--vystup", default=None, help="kořen výstupů (výchozí: vystupy vedle .env)")
    p.add_argument("--jen", nargs="*", default=None, help="vygeneruj jen tyto bloky")
    a = p.parse_args()

    env = Path(a.env).expanduser() if a.env else Path(a.soubor).resolve().parent / ".env"
    nacti_env(env)
    klic = os.getenv("GEMINI_API_KEY")
    if not klic:
        sys.exit("Chybí GEMINI_API_KEY v prostředí nebo v .env")

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        sys.exit("Chybí knihovna: pip install google-genai")

    bloky = rozdel(Path(a.soubor).read_text(encoding="utf-8"))
    if a.jen:
        bloky = [(n, t) for n, t in bloky if n in set(a.jen)]
    if not bloky:
        sys.exit("Nenašel jsem žádný blok ===")

    koren = Path(a.vystup).expanduser() if a.vystup else env.parent / "vystupy"
    cil = koren / datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    cil.mkdir(parents=True, exist_ok=True)
    print(f"Model: {a.model} | obrázků: {len(bloky)} | složka: {cil}", flush=True)

    client = genai.Client(api_key=klic)
    souhrn = []
    for i, (nazev, text) in enumerate(bloky, 1):
        jmeno = f"{i:02d}_{slug(nazev)}"
        print(f"[{i}/{len(bloky)}] {nazev}", flush=True)
        try:
            data = vygeneruj(client, types, a.model, text, a.pomer)
            (cil / f"{jmeno}.png").write_bytes(data)
            souhrn.append(f"OK\t{jmeno}.png\t{nazev}")
        except Exception as e:  # noqa: BLE001
            (cil / f"{jmeno}_chyba.txt").write_text(f"{nazev}\n\n{text}\n\nCHYBA: {e}\n", encoding="utf-8")
            souhrn.append(f"CHYBA\t{jmeno}\t{nazev}\t{str(e)[:200]}")
            print(f"   chyba: {str(e)[:200]}", flush=True)

    (cil / "_souhrn.txt").write_text("\n".join(souhrn) + "\n", encoding="utf-8")
    print(f"Hotovo: {cil}", flush=True)


if __name__ == "__main__":
    main()
