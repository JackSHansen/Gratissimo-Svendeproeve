"use client";
import { useState, FormEvent } from "react";
import styles from "./NyhedsbrevsTilmeldning.module.scss";

export default function NyhedsbrevsTilmelding() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMsg("Du skal være logget ind for at tilmelde dig nyhedsbrevet.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (res.ok) {
        setMsg("Tak for din tilmelding!");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        setMsg(data?.error || "Der opstod en fejl.");
      }
    } catch {
      setMsg("Kunne ikke forbinde til serveren.");
    }
  };

  return (
    <div className={styles.newsletter}>
      <h4>Vil du have jobs direkte i din indbakke?</h4>
      <p>Tilmeld dig vores elektroniske</p>
      <p>nyhedsbrev</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Indtast email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Tilmeld
        </button>
      </form>

      {msg && <p className={styles.message}>{msg}</p>}
    </div>
  );
}
