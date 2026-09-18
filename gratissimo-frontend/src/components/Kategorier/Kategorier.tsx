"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Kategorier.module.scss";

interface Category {
  id: number;
  name: string;
  count: number;
}

interface JobListing {
  jobCategoryId: number;
}

export default function Kategorier() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Henter kategorier og tæller, hvor mange annoncer hver kategori har.
    Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-categories`).then((res) =>
        res.json(),
      ),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-listings`).then((res) =>
        res.json(),
      ),
    ])
      .then(([categoryData, jobData]) => {
        const categoriesWithCount = categoryData.map(
          (category: Omit<Category, "count">) => ({
            ...category,
            count: jobData.filter(
              (job: JobListing) => job.jobCategoryId === category.id,
            ).length,
          }),
        );
        setCategories(categoriesWithCount);
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className={styles.categoryGrid}>
      {categories.map((cat) => (
        /* Klik på en kategori åbner søgeresultaterne med filteret valgt. */
        <button
          key={cat.id}
          onClick={() =>
            router.push(`/Soeg?kategori=${encodeURIComponent(cat.name)}`)
          }
          className={styles.categoryCard}
        >
          <strong>{cat.name}</strong>
          <p>{cat.count}</p>
        </button>
      ))}
    </div>
  );
}