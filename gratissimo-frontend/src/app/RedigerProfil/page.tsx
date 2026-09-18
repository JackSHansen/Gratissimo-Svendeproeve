"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrugerRedigeringsFormel from "@/components/BrugerRedigeringsFormel/BrugerRedigeringsFormel";
import styles from "./RedigerProfil.module.scss";

export default function RedigerProfil() {
  const [user, setUser] = useState<{ email: string; firstname: string; lastname: string; phone: string } | null>(null);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Brugeroplysningerne hentes fra den gemte login-session.
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleUpdate = async (updatedData: typeof user) => {
    // Opdaterer profilen via det beskyttede API-endpoint.
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const savedUser = await res.json();
        localStorage.setItem("user", JSON.stringify(savedUser));
        router.push("/MyPage");
      } else {
        const data = await res.json().catch(() => null);
        setMsg(data?.error || "Kunne ikke opdatere profilen.");
      }
    } catch {
      setMsg("Fejl ved opdatering.");
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <section className={styles.profileIntro}>
        <h1>Velkommen {user.firstname || "Bruger"}</h1>
        <p>
          Rediger eller slet dine annoncer. Du kan også danne dig et overblik
          over de annoncer du har gemt som favorit, samt fjerne dem igen.
        </p>
        <div className={styles.profileLinks}>
          <Link href="/Login">Log ud</Link>
          <Link href="/MyPage">Min side</Link>
        </div>
      </section>

      <section className={styles.editSection}>
        <h2>Rediger profil</h2>
        <BrugerRedigeringsFormel initialData={user} onSubmit={handleUpdate} />
        {msg && <p className={styles.message}>{msg}</p>}
      </section>
    </div>
  );
}