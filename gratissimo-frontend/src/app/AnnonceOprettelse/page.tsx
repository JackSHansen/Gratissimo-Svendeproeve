"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdForm from "@/components/AnnonceFormel/AnnonceFormel";
import styles from "./AnnonceOprettelse.module.scss";

export default function AnnonceOprettelsePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  if (!isLoggedIn) {
    return (
      <div className={styles.unauthorized}>
        <h2>Du skal være logget ind for at oprette en annonce.</h2>
        <Link href="/Login" className={styles.loginLink}>
          Gå til Login
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <h1>Opret en annonce og find frivillige til din forening</h1>
        <p>
          Gratissimo er gratis for alle. Frivillige, organisationer og foreninger.
          Du skaber det frivillige liv og får frivillige til din forening, når du
          bruger platformen.
        </p>
        <Link href="/MyPage">Gå til min side</Link>
      </section>
      <section className={styles.formSection}>
        <AdForm />
      </section>
    </div>
  );
}