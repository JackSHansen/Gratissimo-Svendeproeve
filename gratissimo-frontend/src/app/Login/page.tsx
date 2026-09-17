"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/LoginFormel/LoginFormel";
import styles from "./Login.module.scss";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/MyPage");
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
        <Link href="/Registrer">Log ind for at gå til min side</Link>
      </section>

      <section className={styles.loginSection}>
        <h2>Log ind</h2>
        <LoginForm onSuccess={handleLoginSuccess} />
      </section>
    </div>
  );
}