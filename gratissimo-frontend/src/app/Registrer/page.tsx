"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@/components/RegistrerFormel/RegistrerFormel";
import styles from "./Registrer.module.scss";

export default function RegistrerPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    // Nye brugere sendes videre til login efter oprettelsen.
    router.push("/Login");
  };

  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <h1>Log ind eller opret dig som bruger</h1>
        <p>
          Når du opretter en profil på Gratissimo får du adgang til at oprette,
          søge og redigere i job annoncer. Som privatperson får du mulighed for
          at gemme de jobs du kunne være interesseret i.
        </p>
        <Link href="/Login">Log ind for at gå til min side</Link>
      </section>

      <section className={styles.registerSection}>
        <h2>Opret ny profil</h2>
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </section>
    </div>
  );
}