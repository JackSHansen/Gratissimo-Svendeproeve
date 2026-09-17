"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AnnonceCards.module.scss";

interface AnnonceProps {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  onFavoriteRemove?: (id: string) => void;
  isFavoriteTab?: boolean;
}

export default function AnnonceCards({
  id,
  title,
  category,
  description,
  location,
  onFavoriteRemove,
  isFavoriteTab,
}: AnnonceProps) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const saveFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMsg("Du skal være logget ind for at gemme favoritter!");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ annonceId: id }),
      });
      if (res.ok) setMsg("Gemt som favorit!");
    } catch {
      setMsg("Fejl ved gemning af favorit.");
    }
  };

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.category}>{category}</p>
      <p className={styles.location}>Lokation: {location}</p>
      <p className={styles.description}>{description}</p>

      {open && (
        <div className={styles.details}>
          <p>
            <strong>Kontakt:</strong> Firma A/S - Tlf: 12345678
          </p>
        </div>
      )}

      {msg && <p className={styles.message}>{msg}</p>}

      <div className={styles.actions}>
        {!isFavoriteTab ? (
          <button onClick={saveFavorite} className={styles.saveBtn}>
            <span>Gem</span>
            <Image
              src="/Icon/icons8-favorite-50.png"
              alt="Favorit ikon"
              width={16}
              height={16}
            />
          </button>
        ) : (
          <button
            onClick={() => onFavoriteRemove && onFavoriteRemove(id)}
            className={styles.removeBtn}
          >
            <span>Fjern</span>
            <Image
              src="/Icon/icons8-favorite-50.png"
              alt="Favorit ikon"
              width={16}
              height={16}
            />
          </button>
        )}
        <button onClick={() => setOpen(!open)} className={styles.toggleBtn}>
          {open ? "Luk" : "Åben"}
        </button>
      </div>
    </div>
  );
}