#!/usr/bin/env python3
"""
Export W6KEY -> name from all CSV files into a single JSON for id-to-name lookup.
Usage: python mapping.py [--csv-dir DIR] [--out FILE]
"""
from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path
from typing import Dict, Any


def table_name_from_path(path: Path) -> str:
    """W6DEPARTMENT-0.csv -> DEPARTMENT; W6TASK_TYPES-0.csv -> TASK_TYPES."""
    stem = path.stem
    if stem.startswith("W6"):
        stem = stem[2:]
    stem = re.sub(r"-\d+$", "", stem)
    return stem or path.stem


def load_csv_mapping(csv_path: Path) -> Dict[str, str]:
    """Read CSV with W6KEY and NAME columns; return { W6KEY: name } (keys as str)."""
    out: Dict[str, str] = {}
    with open(csv_path, newline="", encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        if "W6KEY" not in reader.fieldnames or "NAME" not in reader.fieldnames:
            return out
        for row in reader:
            key = row.get("W6KEY", "").strip()
            name = row.get("NAME", "").strip()
            if key:
                out[str(key)] = name or ""
    return out


def main() -> None:
    ap = argparse.ArgumentParser(
        description="Export W6KEY->name from all CSVs into one JSON for id transform."
    )
    ap.add_argument(
        "--csv-dir",
        type=str,
        default=".",
        help="Directory containing W6*.csv files (default: current dir)",
    )
    ap.add_argument(
        "--out",
        type=str,
        default="w6key_name_mapping.json",
        help="Output JSON path (default: w6key_name_mapping.json)",
    )
    ap.add_argument(
        "--pattern",
        type=str,
        default="*.csv",
        help="Glob for CSV files (default: *.csv)",
    )
    args = ap.parse_args()

    csv_dir = Path(args.csv_dir).resolve()
    if not csv_dir.is_dir():
        raise FileNotFoundError(f"Not a directory: {csv_dir}")

    out_path = Path(args.out).resolve()
    result: Dict[str, Any] = {}
    if out_path.exists():
        try:
            loaded = json.loads(out_path.read_text(encoding="utf-8"))
            if isinstance(loaded, dict):
                result = loaded
        except Exception:
            result = {}

    meta = result.get("_meta") if isinstance(result.get("_meta"), dict) else {}
    meta.update(
        {
            "description": "W6KEY -> name per table for id-to-name transform",
            "source_dir": str(csv_dir),
        }
    )
    result["_meta"] = meta

    for csv_path in sorted(csv_dir.glob(args.pattern)):
        if not csv_path.is_file():
            continue
        table = table_name_from_path(csv_path)
        mapping = load_csv_mapping(csv_path)
        if mapping:
            result[table] = mapping
            print(f"[{table}] {csv_path.name} -> {len(mapping)} entries")

    out_path.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
