"use client";

import { useState, FormEvent } from "react";
import styles from "./LoginFormel.module.scss";

export default function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))),
      });
      const data = await res.json();

      if (!res.ok) return setMsg(data.message || "Forkert e-mail eller adgangskode.");

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));
      onSuccess?.();
    } catch {
      setMsg("Kunne ikke forbinde til serveren.");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className={styles.form}>
        <label htmlFor="username">Email</label>
        <input id="username" name="username" type="email" placeholder="Skriv din email..." required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Skriv dit password..." required />

        <button type="submit">Log ind</button>
      </form>

      {msg && <p className={styles.message}>{msg}</p>}
      <a href="/Registrer" className={styles.registerLink}>Opret bruger</a>
    </>
  );
}