"use client";

import { useState } from "react";
import styles from "./Filter.module.scss";

export interface FilterValues {
  region: string;
  kategori: string;
  arbejdstid: string;
  periode: string;
  hjemmearbejde: string;
}

const EMPTY: FilterValues = { region: "", kategori: "", arbejdstid: "", periode: "", hjemmearbejde: "" };

const SELECTS: { key: keyof FilterValues; label: string; options: string[] }[] = [
  { key: "region", label: "Region", options: ["Nordjylland", "Midtjylland", "Sønderjylland", "Fyn", "Sjælland", "Bornholm"] },
  { key: "kategori", label: "Kategorier", options: ["Undervisning", "Teknologi", "Kultur", "Håndværk", "Industri", "Service", "Kommunikation", "Kontor", "Øvrige"] },
  { key: "arbejdstid", label: "Arbejdstid", options: ["Deltid", "Fuldtid", "Flex"] },
  { key: "periode", label: "Periode", options: ["Denne uge", "Denne måned"] },
  { key: "hjemmearbejde", label: "Hjemmearbejde", options: ["On-site", "Remote", "Hybrid"] },
];

export default function Filter({ initialValues, onChange }: { initialValues?: Partial<FilterValues>; onChange?: (f: FilterValues) => void }) {
  const [filters, setFilters] = useState<FilterValues>({ ...EMPTY, ...initialValues });

  const update = (next: FilterValues) => {
    setFilters(next);
    onChange?.(next);
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.filterLabel}>Filtrer:</span>

      {SELECTS.map(({ key, label, options }) => (
        <select key={key} value={filters[key]} onChange={(e) => update({ ...filters, [key]: e.target.value })}>
          <option value="">{label}</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ))}

      <button type="button" onClick={() => update(EMPTY)} className={styles.resetButton}>
        Nulstil
      </button>
    </div>
  );
}