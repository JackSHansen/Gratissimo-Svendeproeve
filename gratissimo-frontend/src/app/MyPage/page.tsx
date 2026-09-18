"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnnonceCards from "@/components/AnnonceCards/AnnonceCards";
import styles from "./Mypage.module.scss";

const toAnnonce = (job: any) => ({
  // Tilpasser API-data til de felter, annoncekortet forventer.
  id: job.id,
  title: job.title,
  description: job.description,
  organization: job.organization,
  address: job.address,
  location: job.region?.name || job.city,
  category: job.jobCategory?.name || "Forening",
  workType: job.workType?.type,
  workHome: job.workHome,
  createdAt: job.createdAt,
});

export default function MyPage() {
  const [tab, setTab] = useState<"mine" | "favoritter">("mine");
  const [user, setUser] = useState<any>(null);
  const [myAnnoncer, setMyAnnoncer] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    // Henter brugerens egne annoncer og gemte favoritter.
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userData) setUser(JSON.parse(userData));
    if (!token) return;

    const api = process.env.NEXT_PUBLIC_API_URL;
    const currentUser = userData ? JSON.parse(userData) : null;

    fetch(`${api}/job-listings`)
      .then((r) => r.json())
      .then((jobs) => setMyAnnoncer(jobs.filter((j: any) => j.userId === currentUser?.id).map(toAnnonce)))
      .catch(() => setMyAnnoncer([]));

    fetch(`${api}/favorites`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((items) => setFavorites(items.map((i: any) => ({ ...toAnnonce(i.jobListing), favoriteId: i.id }))))
      .catch(() => setFavorites([]));
  }, []);

  const deleteItem = async (endpoint: string, id: number, setFn: any) => {
    // Sletter en annonce eller favorit og fjerner den fra den viste liste.
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setFn((prev: any[]) => prev.filter((i) => (endpoint === "favorites" ? i.favoriteId : i.id) !== id));
  };

  const currentList = tab === "mine" ? myAnnoncer : favorites;

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h2>Velkommen {user?.firstname || "Bruger"}</h2>
        <p className={styles.text}> Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de </p>
        <p>annoncer du har gemt som favoritter.</p>
        <div className={styles.profileActions}>
          <Link href="/RedigerProfil" className={styles.editLink}>Rediger Profil</Link>
        </div>
      </div>

      <div className={styles.tabs}>
        <button onClick={() => setTab("mine")} className={`${styles.tabButton} ${tab === "mine" ? styles.active : ""}`}>
          Mine annoncer
        </button>
        <button onClick={() => setTab("favoritter")} className={`${styles.tabButton} ${tab === "favoritter" ? styles.active : ""}`}>
          Mine favoritter
        </button>
      </div>

      <div>
        {currentList.map((item) => (
          <AnnonceCards
            key={item.id}
            {...item}
            isOwner={tab === "mine"}
            isFavoriteTab={tab === "favoritter"}
            onDelete={(id) => deleteItem("job-listings", id, setMyAnnoncer)}
            onFavoriteRemove={() => deleteItem("favorites", item.favoriteId ?? item.id, setFavorites)}
          />
        ))}
      </div>
    </div>
  );
}