"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      // Holder navigationens links synkroniseret med login-tokenet.
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Fjerner sessionen og sender brugeren til login.
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    window.location.href = "/Login";
  };

  if (isLoggedIn === null) {
    return <nav className={styles.navbar} />;
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/Soeg">Alle Jobs</Link>
        <Link href="/AnnonceOprettelse">Opret annonce</Link>
        <Link href="/News">Nyheder</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link href="/MyPage">Min side</Link>
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontWeight: 500 }}>
              Log ud
            </button>
          </>
        ) : (
          <>
            <Link href="/Registrer">Opret Profil</Link>
            <Link href="/Login" className={styles.loginLink}>Log ind</Link>
          </>
        )}
      </div>
    </nav>
  );
}