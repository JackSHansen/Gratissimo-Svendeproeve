"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./Soeg.module.scss"; // Tilpas stien hvis din fil hedder noget andet

export default function Søg() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/Soeg?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchForm}>
      <div className={styles.inputWrapper}>
        <Image
          src="/Icon/icons8-search-50.png"
          alt="Søg"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Søg..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Søg
      </button>
    </form>
  );
}