"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Filter.module.scss";

export default function Filter() {
  const router = useRouter();
  const [region, setRegion] = useState("");
  const [kategori, setKategori] = useState("");
  const [arbejdstid, setArbejdstid] = useState("");
  const [hjemmearbejde, setHjemmearbejde] = useState("");

  const applyFilter = () => {
    const params = new URLSearchParams();
    if (region) params.append("region", region);
    if (kategori) params.append("kategori", kategori);
    if (arbejdstid) params.append("arbejdstid", arbejdstid);
    if (hjemmearbejde) params.append("hjemmearbejde", hjemmearbejde);

    router.push(`/Soeg?${params.toString()}`);
  };

  const resetFilter = () => {
    setRegion("");
    setKategori("");
    setArbejdstid("");
    setHjemmearbejde("");
    router.push("/Soeg");
  };

  return (
    <div className={styles.filterContainer}>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="">Region</option>
        <option value="Aalborg">Aalborg</option>
        <option value="Aarhus">Aarhus</option>
      </select>

      <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
        <option value="">Kategorier</option>
        <option value="Bartender">Bartender</option>
        <option value="Håndværk">Håndværk</option>
      </select>

      <select value={arbejdstid} onChange={(e) => setArbejdstid(e.target.value)}>
        <option value="">Arbejdstid</option>
        <option value="Deltid">Deltid</option>
        <option value="Fuldtid">Fuldtid</option>
        <option value="Flex">Flex</option>
      </select>

      <select value={hjemmearbejde} onChange={(e) => setHjemmearbejde(e.target.value)}>
        <option value="">Hjemmearbejde</option>
        <option value="On-site">On-site</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <button onClick={applyFilter} className={styles.filterButton}>
        Filtrer
      </button>
      <button onClick={resetFilter} className={styles.resetButton}>
        Nulstil
      </button>
    </div>
  );
}