import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./NewsCards.module.scss";

interface NewsProps {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}

export default function NewsCards({ id, title, author, createdAt, content, imageUrl }: NewsProps) {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "");
  // Billederne ligger på API-serveren, mens URL'en kommer fra artiklen.
  const imageSource = imageUrl ? `${apiUrl}${imageUrl}` : "";
  const date = new Date(createdAt).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/News?id=${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        // Gør kortet tilgængeligt med tastaturets Enter- og mellemrumstast.
        if (event.key === "Enter" || event.key === " ") {
          router.push(`/News?id=${id}`);
        }
      }}
    >
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
      <h3>{title}</h3>
      <p className={styles.teaser}>{content}</p>
    </div>
  );
}