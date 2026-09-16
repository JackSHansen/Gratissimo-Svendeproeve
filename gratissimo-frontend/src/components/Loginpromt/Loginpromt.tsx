import Link from "next/link";
import styles from "./Loginpromt.module.scss";

export default function Loginpromt() {
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