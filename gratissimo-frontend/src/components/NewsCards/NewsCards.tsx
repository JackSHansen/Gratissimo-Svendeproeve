import Link from "next/link";
import Image from "next/image";
import styles from "./NewsCards.module.scss";

interface NewsProps {
  id: string;
  author: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}

export default function NewsCards({ id, author, createdAt, content, imageUrl }: NewsProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "");
  const imageSource = imageUrl ? `${apiUrl}${imageUrl}` : "";
  const date = new Date(createdAt).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className={styles.card}>
      {imageSource && (
        <Image
          src={imageSource}
          alt=""
          width={360}
          height={180}
          className={styles.image}
          unoptimized
        />
      )}
      <p className={styles.meta}>d. {date} - {author}</p>
      <p className={styles.teaser}>{content}</p>
      <Link href={`/News?id=${id}`} className={styles.readMoreLink}>
        Læs mere
      </Link>
    </div>
  );
}