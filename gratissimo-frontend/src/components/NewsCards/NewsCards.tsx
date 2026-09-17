import Link from "next/link";
import styles from "./NewsCards.module.scss";

interface NewsProps {
  id: string;
  title: string;
  teaser: string;
}

export default function NewsCards({ id, title, teaser }: NewsProps) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p className={styles.teaser}>{teaser}</p>
      <Link href={`/News?id=${id}`} className={styles.readMoreLink}>
        Læs mere
      </Link>
    </div>
  );
}