"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/Login";
  };

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