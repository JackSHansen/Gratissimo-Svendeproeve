"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./AnnonceCards.module.scss";

interface AnnonceProps {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  address?: string;
  organization: string;
  workType?: string;
  workHome?: string;
  createdAt: string;
  onFavoriteRemove?: (id: number) => void;
  isFavoriteTab?: boolean;
  isOwner?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export default function AnnonceCards(props: AnnonceProps) {
  const { id, title, category, description, location, address, organization, workType, workHome, createdAt, onFavoriteRemove, isFavoriteTab, isOwner, onDelete, onEdit } = props;
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const saveFavorite = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setMsg("Du skal være logget ind for at gemme favoritter");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ jobListingId: id }),
      });
      if (res.ok) {
        setIsSaved(true);
        setMsg("Gemt som favorit!");
      }
    } catch {
      setMsg("Fejl ved gemning af favorit.");
    }
  };

  return (
    <div className={`${styles.card} ${open ? styles.open : ""}`}>
      <div className={styles.content}>
        <p className={styles.category}>{organization} / {category}</p>
        <h3>{title}</h3>
        
        {!open ? (
          <p className={styles.description}>{description}</p>
        ) : (
          <div className={styles.details}>
            <section><h4>Beskrivelse</h4><p>{description}</p></section>
            <section><h4>Erfaring</h4><p>Der er ikke oplyst særlige krav til erfaring.</p></section>
            <section><h4>Arbejdsopgaver</h4><p>Arbejdsopgaverne fremgår af beskrivelsen ovenfor.</p></section>
          </div>
        )}
      </div>

      <div className={styles.sideContent}>
        <p className={styles.location}>Lokation: {location}</p>
        <p className={styles.createdAt}>Indrykket: {new Date(createdAt).toLocaleDateString("da-DK")}</p>

        {open && (
          <>
            {workType && <p className={styles.workType}>Arbejdstid: {workType}</p>}
            {workHome && <p className={styles.workHome}>Hjemmearbejde: {workHome}</p>}
            <div className={styles.contact}>
              <h4>Kontakt</h4>
              <p>{organization}</p>
              {address && <p>{address}</p>}
            </div>
          </>
        )}

        {msg && <p className={styles.message}>{msg}</p>}

        <div className={styles.actions}>
          {isOwner ? (
            <>
              <button onClick={() => onDelete?.(id)} className={styles.removeBtn}>Slet</button>
              <button onClick={() => onEdit?.(id)} className={styles.toggleBtn}>Rediger</button>
            </>
          ) : (
            <button
              onClick={isFavoriteTab ? () => onFavoriteRemove?.(id) : isSaved ? undefined : saveFavorite}
              className={isFavoriteTab || isSaved ? styles.removeBtn : styles.saveBtn}
              disabled={isSaved && !isFavoriteTab}
            >
              <span>{isFavoriteTab ? "Fjern" : isSaved ? "Gemt" : "Gem"}</span>
              {!isFavoriteTab && !isSaved && <Image src="/Icon/icons8-favorite-50.png" alt="Favorit ikon" width={16} height={16} />}
            </button>
          )}

          {!isOwner && (
            <button onClick={() => setOpen(!open)} className={styles.toggleBtn}>
              {open ? "Luk" : "Åben"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}