"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NewsCards from "@/components/NewsCards/NewsCards";
import styles from "./News.module.scss";

interface NewsItem {
  id: string | number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
}

export default function NewsPage() {
  const router = useRouter();
  const selectedId = useSearchParams().get("id");
  const [allNews, setAllNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
      .then((res) => res.json())
      .then(setAllNews)
      .catch(() => setAllNews([]));
  }, []);

  const selected = allNews.find((n) => String(n.id) === String(selectedId)) || allNews[0];

  const select = (id: string | number) => {
    router.push(`/News?id=${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {selected && (
        <article className={styles.selectedArticle}>
          {selected.imageUrl && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "")}${selected.imageUrl}`}
              alt={selected.title}
              className={styles.featureImage}
            />
          )}
          <div className={styles.featureContent}>
            <h1>{selected.title}</h1>
            <p className={styles.meta}>
              d. {new Date(selected.createdAt).toLocaleDateString("da-DK")} af {selected.author}
            </p>
            <p className={styles.featureText}>{selected.content}</p>
          </div>
        </article>
      )}

      <h3 className={styles.sectionTitle}>Alle Nyheder</h3>
      <div className={styles.newsGrid}>
        {allNews.map((n) => (
          <div
            key={n.id}
            onClick={() => select(n.id)}
            onKeyDown={(e) => ["Enter", " "].includes(e.key) && select(n.id)}
            className={`${styles.cardWrapper} ${String(selected?.id) === String(n.id) ? styles.selectedCard : ""}`}
            role="button"
            tabIndex={0}
          >
            <NewsCards {...n} id={String(n.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}