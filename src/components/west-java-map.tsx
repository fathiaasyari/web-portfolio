"use client";

import { useState, type CSSProperties } from "react";
import { hero } from "@/content/site";
import "@/components/folio.css";
const TILES: Record<string, { col: number; row: number }> = {
  "Kota Depok": { col: 1, row: 0 },
  "Kota Bekasi": { col: 2, row: 0 },
  "Kab. Bekasi": { col: 3, row: 0 },
  "Kab. Karawang": { col: 4, row: 0 },
  "Kab. Subang": { col: 5, row: 0 },
  "Kab. Indramayu": { col: 6, row: 0 },
  "Kota Cirebon": { col: 7, row: 0 },

  "Kab. Bogor": { col: 1, row: 1 },
  "Kota Bogor": { col: 2, row: 1 },
  "Kab. Purwakarta": { col: 3, row: 1 },
  "Kab. Bandung Barat": { col: 4, row: 1 },
  "Kab. Sumedang": { col: 5, row: 1 },
  "Kab. Majalengka": { col: 6, row: 1 },
  "Kab. Cirebon": { col: 7, row: 1 },

  "Kab. Sukabumi": { col: 0, row: 2 },
  "Kota Sukabumi": { col: 1, row: 2 },
  "Kab. Cianjur": { col: 2, row: 2 },
  "Kota Cimahi": { col: 3, row: 2 },
  "Kota Bandung": { col: 4, row: 2 },
  "Kab. Garut": { col: 5, row: 2 },
  "Kab. Ciamis": { col: 6, row: 2 },
  "Kab. Kuningan": { col: 7, row: 2 },

  "Kab. Bandung": { col: 4, row: 3 },
  "Kab. Tasikmalaya": { col: 5, row: 3 },
  "Kota Tasikmalaya": { col: 6, row: 3 },
  "Kota Banjar": { col: 7, row: 3 },

  "Kab. Pangandaran": { col: 6, row: 4 },
};
/** An abstract index: each mark is one region, with keyboard and touch equivalents. */
export function WestJavaMap({ regions, caption }: { regions: readonly string[]; caption: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const active = hovered ?? selected;
  return (
    <div className={"folio-regionIndex"}>
      <div className={"folio-regions"} onPointerLeave={() => setHovered(null)}>
        {regions.filter((name) => TILES[name]).map((name, index) => {
          const tile = TILES[name];
          const city = name.startsWith("Kota");
          return (
            <button key={name} type="button" aria-label={name} aria-pressed={selected === name} className={"folio-region"} data-city={city} data-active={active === name} style={{ "--column": tile.col + 1, "--row": tile.row + 1, "--delay": `${index * 12}ms` } as CSSProperties}
              onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(name); }}
              onFocus={() => setHovered(name)} onBlur={() => setHovered(null)}
              onClick={() => setSelected((previous) => previous === name ? null : name)}>
              <span aria-hidden className={"folio-regionMark"} />
            </button>
          );
        })}
      </div>
      <p className={"folio-regionCaption"} aria-live="polite" aria-atomic="true">{active ?? caption}</p>
      <div className={"folio-regionLegend"}>
        <span><i aria-hidden />{hero.regencyLabel}</span>
        <span><i aria-hidden />{hero.cityLabel}</span>
        <span className={"folio-regionHint"}>{hero.regionHint}</span>
      </div>
    </div>
  );
}

