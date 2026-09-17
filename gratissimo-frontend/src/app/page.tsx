"use client";

import { useEffect, useState } from "react";
import Søg from "@/components/Søg/Søg";
import Filter, { FilterValues } from "@/components/Filter/Filter";
import Kategorier from "@/components/Kategorier/Kategorier";
import NewsCards from "@/components/NewsCards/NewsCards";
import Slider from "@/components/Slider/Slider";
import styles from "./page.module.scss";

interface NewsItem {
  id: string;
  author: string;
  createdAt: string;
  content: string;
  imageUrl?: string;
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    region: "",
    kategori: "",
    arbejdstid: "",
    periode: "",
    hjemmearbejde: "",
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
      .then((res) => res.json())
      .then((data) => setNews(data.slice(0, 3)))
      .catch(() => setNews([]));
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.searchSection}>
        <h2>Søg frivilligt arbejde:</h2>
        <Søg filters={filters} />
        <Filter onChange={setFilters} />
      </section>

      <section className={styles.categorySection}>
        <h2>Søg frivilligt arbejde:</h2>
        <Kategorier />
      </section>

      <section className={styles.newsSection}>
        <h2>Udvalgte Nyheder</h2>
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <NewsCards
              key={item.id}
              id={item.id}
              author={item.author}
              createdAt={item.createdAt}
              content={item.content}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </section>

      <Slider />
    </div>
  );
}