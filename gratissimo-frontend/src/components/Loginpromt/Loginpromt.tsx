"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Loginpromt.module.scss";

export default function Loginpromt() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(Boolean(localStorage.getItem("token")));
    // Prompten vises kun, når der ikke findes et login-token.
    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  if (isLoggedIn) return null;

  return (
    <header className={styles.header}>
      <h2 className={styles.title}>
        Vi hjælper dig på vej til dit næste frivillige job
      </h2>
      <Link href="/Login" className={styles.loginLink}>
        Log ind eller opret dig
      </Link>
    </header>
  );
}